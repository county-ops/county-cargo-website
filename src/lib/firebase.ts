
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyBsk7bNrCqvZ61BMoMaMc7gdabxn5TYix4",
  authDomain: "studio-7985444708-3c482.firebaseapp.com",
  projectId: "studio-7985444708-3c482",
  storageBucket: "studio-7985444708-3c482.firebasestorage.app",
  messagingSenderId: "107562335601",
  appId: "1:107562335601:web:e5f18d2245166f1360cad0"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
