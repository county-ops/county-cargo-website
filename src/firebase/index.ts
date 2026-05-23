import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

interface FirebaseInstances {
    app: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
}

export async function initializeFirebase(): Promise<FirebaseInstances> {
    let app: FirebaseApp;
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    return { app, auth, firestore };
}

export * from './provider';
export * from './client-provider';
