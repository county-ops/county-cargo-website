

'use server';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

// This combines ServiceType with country specifics for finer control
export type ApplicableService = 
    | 'valueImport-US'
    | 'valueImport-UK'
    | 'valueExport-US'
    | 'valueExport-UK'
    | 'expressExport';

export interface AdditionalCharge {
    id: string;
    name: string;
    appliesTo: ApplicableService[];
    type: 'percentage_declared_value' | 'percentage_shipment_cost' | 'fixed_ngn';
    value: number;
    enabled: boolean;
}


export interface AppSettings {
    // Import
    usToLagosRate: number;
    usToOtherRate: number;
    usMinWeight: number;
    ukToLagosRate: number;
    ukToOtherRate: number;
    ukCargoRatePerKg: number;
    ukHandlingFee: number;
    ukMinWeight: number;
    // Export
    valueExportToUSARate: number;
    valueExportToUKRate: number;
    usValueExportMinWeight: number;
    ukValueExportMinWeight: number;
    valueExportToUSASpecialRate: number;
    valueExportToUSASpecialItems: string;
    valueExportToUKSpecialRate: number;
    valueExportToUKSpecialItems: string;
    // Agent Pricing
    agentUsToLagosRate: number;
    agentUsToOtherRate: number;
    agentUkToLagosRate: number;
    agentUkToOtherRate: number;
    agentValueExportToUSARate: number;
    agentValueExportToUKRate: number;
    // Global
    ngnPerUsd: number;
    ngnPerGbp: number;
    // Dynamic Additional Charges
    additionalCharges: AdditionalCharge[];
}

const defaultSettings: AppSettings = {
    // Import
    usToLagosRate: 5,
    usToOtherRate: 5.5,
    usMinWeight: 1,
    ukToLagosRate: 5.8,
    ukToOtherRate: 6.5,
    ukCargoRatePerKg: 6,
    ukHandlingFee: 15,
    ukMinWeight: 10,
    // Export
    valueExportToUSARate: 16000,
    valueExportToUKRate: 9000,
    usValueExportMinWeight: 10,
    ukValueExportMinWeight: 10,
    valueExportToUSASpecialRate: 0,
    valueExportToUSASpecialItems: '',
    valueExportToUKSpecialRate: 0,
    valueExportToUKSpecialItems: '',
    // Agent Pricing
    agentUsToLagosRate: 4.5,
    agentUsToOtherRate: 5,
    agentUkToLagosRate: 5.3,
    agentUkToOtherRate: 6,
    agentValueExportToUSARate: 15000,
    agentValueExportToUKRate: 8000,
    // Global
    ngnPerUsd: 1500,
    ngnPerGbp: 1900,
    // Dynamic Additional Charges
    additionalCharges: [],
};


const settingsDocRef = doc(db, 'settings', 'global');

async function getSettingsRaw(): Promise<AppSettings> {
    try {
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            // Merge with defaults to ensure new properties from the type are present
            const mergedSettings = { ...defaultSettings, ...data };
            // Ensure additionalCharges is always an array
            mergedSettings.additionalCharges = Array.isArray(data.additionalCharges) ? data.additionalCharges : defaultSettings.additionalCharges;
            return mergedSettings;
        } else {
            // If settings don't exist, create them with default values
            await setDoc(settingsDocRef, defaultSettings);
            return defaultSettings;
        }
    } catch (error) {
        console.error("Error fetching settings, returning default:", error);
        return defaultSettings;
    }
}

import { cache } from 'react';

export const getSettings = cache(async (): Promise<AppSettings> => {
    return await getSettingsRaw();
});

export async function saveSettings(settings: AppSettings): Promise<void> {
    await setDoc(settingsDocRef, settings);
}
