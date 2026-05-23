
'use server';

import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from './firebase';

export interface ShippingOptions {
    usSenders: string[];
    ukSenders: string[];
    customSenders: string[];
    usCouriers: string[];
    ukCouriers: string[];
    customCouriers: string[];
}

const defaultOptions: Omit<ShippingOptions, 'customSenders' | 'customCouriers'> = {
    usSenders: [
        'Adidas',
        'Allbirds',
        'Amazon US',
        'Apple',
        'Best Buy',
        'Chewy',
        'Costco',
        'CVS',
        'Dell',
        'eBay',
        'Etsy',
        'Fashion Nova',
        'Glossier',
        'Home Depot',
        'HP',
        'IKEA',
        'Kohl\'s',
        'Kroger',
        'Lowe\'s',
        'Macy\'s',
        'Newegg',
        'Nike',
        'Nordstrom',
        'Overstock',
        'Sephora',
        'Shein',
        'Target',
        'Walgreens',
        'Walmart',
        'Warby Parker',
        'Wayfair'
    ].sort(),
    ukSenders: [
        'Adidas',
        'AliExpress',
        'Amazon UK',
        'AO.com',
        'Apple',
        'Argos',
        'Asda',
        'ASOS',
        'B&Q',
        'Boohoo',
        'Boots',
        'Clarks',
        'Coach',
        'Converse',
        'Currys',
        'Dunelm',
        'Dunes',
        'eBay',
        'Ebuyer',
        'Etsy',
        'Foot Locker',
        'Gucci',
        'Gymshark',
        'H&M',
        'HelloFresh',
        'IKEA',
        'John Lewis',
        'Kurt Geiger',
        'Laced',
        'Lookfantastic',
        'LV',
        'Marks & Spencer',
        'Michael Kors',
        'Morrisons',
        'Next',
        'Nike',
        'Ocado',
        'Office',
        'OnBuy',
        'Papier',
        'PrettyLittleThing',
        'Puma',
        'Sainsbury’s',
        'Schuh',
        'Selfridges',
        'Shein',
        'Superdrug',
        'Ted Baker',
        'Tesco',
        'Wayfair',
        'Wickes',
        'Zalando',
        'Zara'
    ].sort(),
    usCouriers: ['UPS', 'FedEx', 'DHL', 'USPS'],
    ukCouriers: ['Royal Mail', 'DPD', 'Evri', 'Yodel', 'DX', 'EMS/Parcel Force'],
};

const optionsDocRef = doc(db, 'settings', 'shippingOptions');

export async function getShippingOptions(): Promise<ShippingOptions> {
    try {
        const docSnap = await getDoc(optionsDocRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            // Merge with defaults and ensure custom arrays exist
            return {
                ...defaultOptions,
                usSenders: [...new Set([...defaultOptions.usSenders, ...(data.usSenders || [])])].sort(),
                ukSenders: [...new Set([...defaultOptions.ukSenders, ...(data.ukSenders || [])])].sort(),
                usCouriers: [...new Set([...defaultOptions.usCouriers, ...(data.usCouriers || [])])].sort(),
                ukCouriers: [...new Set([...defaultOptions.ukCouriers, ...(data.ukCouriers || [])])].sort(),
                customSenders: data.customSenders || [],
                customCouriers: data.customCouriers || [],
            };
        } else {
            // If settings don't exist, create them with default values
            const initialSettings = { ...defaultOptions, customSenders: [], customCouriers: [] };
            await setDoc(optionsDocRef, initialSettings);
            return initialSettings;
        }
    } catch (error) {
        console.error("Error fetching shipping options, returning default:", error);
        return { ...defaultOptions, customSenders: [], customCouriers: [] };
    }
}

export async function addCustomSender(sender: string): Promise<void> {
    await updateDoc(optionsDocRef, {
        customSenders: arrayUnion(sender)
    });
}

export async function addCustomCourier(courier: string): Promise<void> {
    await updateDoc(optionsDocRef, {
        customCouriers: arrayUnion(courier)
    });
}
