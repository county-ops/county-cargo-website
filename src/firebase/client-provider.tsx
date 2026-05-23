'use client';

import React, { ReactNode } from 'react';
import { initializeFirebase } from '.';
import { FirebaseProvider } from './provider';

// This ensures that Firebase is only initialized once on the client
const firebasePromise = initializeFirebase();

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
    const firebaseValue = React.use(firebasePromise);
    return <FirebaseProvider value={firebaseValue}>{children}</FirebaseProvider>;
}
