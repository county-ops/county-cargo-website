
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { createUserProfile, getUserProfile } from '@/lib/user-actions';
import { toast } from '@/hooks/use-toast';
import { UserProfile } from '@/lib/types';
import { User } from 'firebase/auth';

interface ProfileContextType {
  user: User | null;
  profile: UserProfile | null;
  profileLoading: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { authUser, loading: authLoading, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleAuthChange = async () => {
      if (authLoading) {
        setProfileLoading(true);
        return;
      }

      if (!authUser) {
        router.push('/login');
        return;
      }
      
      if (!authUser.emailVerified) {
        toast({
          variant: "destructive",
          title: "Email Not Verified",
          description: "Please check your inbox and verify your email before logging in.",
        });
        await signOut(); 
        return;
      }

      setProfileLoading(true);
      try {
        const userProfile = await getUserProfile(authUser.uid);
        if (userProfile) {
          setProfile(userProfile);
        } else {
           console.log("No profile found for user, attempting to create one...");
           const placeholderProfileData = {
              firstname: "New",
              lastname: "User",
              mobile: "",
              deliveryaddress: "",
              city: "",
              state: "",
              zip: "",
              country: "",
              howdoyouhearaboutus: "Unknown",
           };
           await createUserProfile(authUser.uid, authUser.email!, placeholderProfileData);
           const newUserProfile = await getUserProfile(authUser.uid);
           if (newUserProfile) {
              setProfile(newUserProfile);
           } else {
              throw new Error("Failed to create and retrieve user profile.");
           }
        }
      } catch (error) {
        console.error("Failed to fetch profile in layout:", error);
        toast({
          variant: "destructive",
          title: "Error Loading Data",
          description: "There was a problem fetching your profile. Please try again.",
        });
        await signOut();
      } finally {
        setProfileLoading(false);
      }
    };
    
    handleAuthChange();

  }, [authUser, authLoading, router, signOut]);

  if (authLoading || profileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!profile) {
    return (
        <div className="flex min-h-screen items-center justify-center flex-col gap-4">
            <p className="text-lg text-destructive">Could not load your profile.</p>
            <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
    );
  }

  return (
    <ProfileContext.Provider value={{ user: authUser, profile, profileLoading: authLoading || profileLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};
