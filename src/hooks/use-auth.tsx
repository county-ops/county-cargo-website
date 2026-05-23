'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail as firebaseSendPasswordResetEmail, sendEmailVerification, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { createUserProfile, getUserProfileByEmail } from '@/lib/user-actions';
import { trackMetaEvent } from '@/lib/meta-pixel';
import { trackGAEvent } from '@/lib/google-analytics';
import { doc, setDoc, deleteDoc, Timestamp } from 'firebase/firestore';


interface AuthContextType {
  authUser: User | null; 
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<any>;
  signUp: (email: string, pass: string, profileData: any) => Promise<any>;
  signOut: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  sendVerificationEmail: (user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setLoading(false); 
    });
    return () => unsubscribe();
  }, []);
  

  const signIn = async (email: string, pass: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        if (!userCredential.user.emailVerified) {
          const error: any = new Error("Please verify your email before signing in.");
          error.code = 'auth/email-not-verified';
          error.user = userCredential.user;
          throw error;
        }
        router.push('/dashboard');
        return userCredential;
    } catch (error: any) {
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
            const existingUser = await getUserProfileByEmail(email);
            if (existingUser) {
                const suggestResetError: any = new Error("Incorrect password. Would you like to reset it?");
                suggestResetError.code = 'auth/wrong-password-suggest-reset';
                throw suggestResetError;
            }
        }

        let errorMessage = "An unknown error occurred.";
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = "No user found with this email.";
                break;
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                errorMessage = "Invalid credentials. Please check your email and password.";
                break;
            case 'auth/invalid-email':
                errorMessage = "The email address is not valid.";
                break;
            case 'auth/email-not-verified':
            case 'auth/wrong-password-suggest-reset':
                throw error; // Re-throw custom errors
            default:
                errorMessage = error.message;
                break;
        }
        
        const finalError: any = new Error(errorMessage);
        finalError.code = error.code;
        throw finalError;
    }
  };

  const signUp = async (email: string, pass: string, profileData: any) => {
    // Check for existing Firestore profile first
    const existingProfileData = await getUserProfileByEmail(email);

    if (existingProfileData) {
        // "Claim account" flow
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            const user = userCredential.user;

            // Copy old profile to new doc with UID as ID
            const newProfileDocRef = doc(db, 'users', user.uid);
            const oldProfile = existingProfileData.profile;
            
            await setDoc(newProfileDocRef, {
                ...oldProfile, // spread existing data
                uid: user.uid, // ensure uid is the new auth uid
                email: user.email, // ensure email is correct
                // Don't overwrite created_time if it exists
                created_time: oldProfile.created_time ? Timestamp.fromDate(new Date(oldProfile.created_time)) : Timestamp.now(),
            });

            // Delete the old doc if its ID is different from the new UID
            if (existingProfileData.docId !== user.uid) {
                const oldProfileDocRef = doc(db, 'users', existingProfileData.docId);
                await deleteDoc(oldProfileDocRef);
            }
            
            await firebaseSignOut(auth);

            // Throw custom error to be handled by the UI
            const claimError: any = new Error("Account claimed.");
            claimError.code = 'auth/account-claimed';
            throw claimError;

        } catch (error: any) {
            // Handle case where auth user *already* exists for this email
            if (error.code === 'auth/email-already-in-use') {
                 const finalError: any = new Error("This email is already registered. Please sign in or use 'Forgot Password'.");
                 finalError.code = error.code;
                 throw finalError;
            }
            // Rethrow other errors from createUserWithEmailAndPassword
            throw error;
        }
    } else {
        // "New user" flow (original logic)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            const user = userCredential.user;

            const { confirmPassword, ...restOfProfileData } = profileData;
            await createUserProfile(user.uid, user.email!, restOfProfileData);

            await sendEmailVerification(user);

            trackMetaEvent('CompleteRegistration', {
              content_name: 'Standard Registration',
              status: 'completed',
            });
            
            trackGAEvent({ action: 'sign_up', params: { method: 'Email' } });

            await firebaseSignOut(auth);
            
            return userCredential;

        } catch (error: any) {
            let errorMessage = "An unknown error occurred.";
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = "This email address is already in use.";
                    break;
                case 'auth/weak-password':
                    errorMessage = "The password is too weak.";
                    break;
                 case 'auth/invalid-email':
                    errorMessage = "The email address is not valid.";
                    break;
                default:
                    errorMessage = error.message;
                    break;
            }
            const finalError: any = new Error(errorMessage);
            finalError.code = error.code;
            throw finalError;
        }
    }
  };
  
  const sendVerificationEmail = async (user: User) => {
    try {
        await sendEmailVerification(user);
    } catch (error: any) {
        if (error.code === 'auth/too-many-requests') {
            throw new Error("Too many requests. Please wait a while before trying again.");
        }
        throw new Error("Failed to send verification email. Please try again later.");
    }
  };

  const sendPasswordResetEmail = async (email: string) => {
    try {
        // First, check if the user exists in Firestore.
        const firestoreUser = await getUserProfileByEmail(email);

        if (firestoreUser && firestoreUser.profile) {
            // User exists in the database. Now check Auth.
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);

            if (signInMethods.length === 0) {
                // User exists in DB but not in Auth. Create an auth record.
                const tempPassword = 'TempPass1!' + Math.random().toString(36).substring(2, 10);
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, tempPassword);
                    const user = userCredential.user;

                    // Update Firestore profile with the new auth UID
                    const newProfileDocRef = doc(db, 'users', user.uid);
                    const oldProfile = firestoreUser.profile;
                    
                    await setDoc(newProfileDocRef, {
                        ...oldProfile,
                        uid: user.uid,
                        email: user.email,
                        created_time: oldProfile.created_time ? Timestamp.fromDate(new Date(oldProfile.created_time)) : Timestamp.now(),
                    });

                    // Delete the old document if its ID was not the UID
                    if (firestoreUser.docId !== user.uid) {
                        const oldProfileDocRef = doc(db, 'users', firestoreUser.docId);
                        await deleteDoc(oldProfileDocRef);
                    }
                    
                    // Now that the auth user exists, send the reset email.
                    await firebaseSendPasswordResetEmail(auth, email);
                } catch (creationError: any) {
                    // This error is expected if there's a race condition where the auth user
                    // was created between the check and the creation attempt. We can ignore it
                    // because it means the auth account exists, and we can proceed.
                    if (creationError.code !== 'auth/email-already-in-use') {
                         // For other errors, we should log them and throw a user-friendly message.
                        console.error("Error creating auth user during password reset:", creationError);
                        throw new Error("Failed to set up account for password reset. Please contact support.");
                    }
                    // If the error was 'auth/email-already-in-use', we just fall through and send the email.
                    await firebaseSendPasswordResetEmail(auth, email);
                }
            } else {
                // User exists in both DB and Auth, so just send the reset email.
                await firebaseSendPasswordResetEmail(auth, email);
            }
        } else {
            // User does not exist in our database. Throw a specific error.
            const userNotFoundError = new Error("No account found with this email address.");
            (userNotFoundError as any).code = 'auth/user-not-found';
            throw userNotFoundError;
        }
    } catch (error: any) {
        let errorMessage = "An unknown error occurred.";
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = "No user found with this email address.";
                break;
            case 'auth/invalid-email':
                errorMessage = "The email address is not valid.";
                break;
            default:
                errorMessage = "Failed to send reset email. Please try again.";
                break;
        }
        const finalError: any = new Error(errorMessage);
        finalError.code = error.code;
        throw finalError;
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ authUser, loading, signIn, signUp, signOut, sendPasswordResetEmail, sendVerificationEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
