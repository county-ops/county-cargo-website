'use client';

import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import React, { createContext, useContext, ReactNode } from 'react';


interface FirebaseContextValue {
    app: FirebaseApp;
    firestore: Firestore;
    auth: Auth;
}

const FirebaseContext = createContext<FirebaseContextValue | undefined>(undefined);

export function FirebaseProvider({
    children,
    value,
}: {
    children: ReactNode;
    value: FirebaseContextValue;
}) {
    return (
        <FirebaseContext.Provider value={value}>
            {children}

        </FirebaseContext.Provider>
    );
}

export const useFirebaseApp = () => {
    const context = useContext(FirebaseContext);
    if (context === undefined) {
        throw new Error('useFirebaseApp must be used within a FirebaseProvider');
    }
    return context.app;
};

export const useFirestore = () => {
    const context = useContext(FirebaseContext);
    if (context === undefined) {
        throw new Error('useFirestore must be used within a FirebaseProvider');
    }
    return context.firestore;
};

export const useAuth = () => {
    const context = useContext(FirebaseContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a FirebaseProvider');
    }
    return context.auth;
};

export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (context === undefined) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return {
        app: context.app,
        firestore: context.firestore,
        auth: context.auth,
        db: context.firestore, // for compatibility
    };
};
