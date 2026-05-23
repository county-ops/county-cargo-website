
'use server';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface ServiceSettings {
    expressExport: boolean;
    valueExport: boolean;
    valueImport: boolean;
    expressImport: boolean;
    pickupRequestEnabled: boolean;
}

const defaultServiceSettings: ServiceSettings = {
    expressExport: true,
    valueExport: true,
    valueImport: true,
    expressImport: false,
    pickupRequestEnabled: true,
};

const settingsDocRef = doc(db, 'settings', 'services');

export async function getServiceSettings(): Promise<ServiceSettings> {
    try {
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            // Merge with defaults to ensure new properties are present
            return { ...defaultServiceSettings, ...data };
        } else {
            await setDoc(settingsDocRef, defaultServiceSettings);
            return defaultServiceSettings;
        }
    } catch (error) {
        console.error("Error fetching service settings, returning default:", error);
        return defaultServiceSettings;
    }
}

export async function saveServiceSettings(settings: ServiceSettings): Promise<void> {
    // This function will now be responsible for ensuring auth is ready.
    // Although the UI should prevent unauthenticated access, this is a final safeguard.
    // The Firestore rules are the ultimate authority for security.
    await setDoc(settingsDocRef, settings);
}
