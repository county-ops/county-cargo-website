
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Safely check if the environment variable is a non-empty string and looks like a JSON object
const isJsonString = (str: string | undefined) => {
    if (!str || str.trim() === '') return false;
    try {
        const obj = JSON.parse(str);
        return typeof obj === 'object' && obj !== null;
    } catch (e) {
        return false;
    }
}

const firebaseConfig = isJsonString(process.env.FIREBASE_WEBAPP_CONFIG)
  // On App Hosting, this is automatically provided and parsed.
  ? JSON.parse(process.env.FIREBASE_WEBAPP_CONFIG!)
  // For local development, use the .env.local file.
  : {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
