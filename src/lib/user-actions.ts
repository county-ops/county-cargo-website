

'use server';

import { doc, getDoc, setDoc, Timestamp, writeBatch, collection, getDocs, updateDoc, query, where, limit, addDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Address, Shipment, ShipmentStatus, UserProfile, Package, PackageReceipt, Invoice } from './types';
import { sendEmail } from './email';
import { getEmailSettings } from './email-settings';
import { addBusinessDays } from 'date-fns';
import { getShipmentWindow, getUKOffsetMs } from './shipment-window';
import { getSettings } from './settings';
import { parseFirestoreDate } from './utils';
import { cache } from 'react';

// Type for profile data during creation, where some fields are set by the server
type UserProfileCreationData = {
    firstname: string;
    lastname: string;
    mobile: string;
    altmobile?: string;
    companyname?: string;
    deliveryaddress: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    howdoyouhearaboutus?: string;
    creationTime?: string;
};

export type PackageLogData = {
    customer: UserProfile;
    qty: number;
    weight: number;
    length?: number;
    width?: number;
    height?: number;
    sender: string;
    courier: string;
    courierCode?: string;
    comment: string;
    trackingNumber?: string;
    location: 'US Warehouse' | 'UK Warehouse' | 'Lagos Warehouse' | 'Out of State';
    region: 'UK' | 'US' | 'NG';
};

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        
        // Check for old schema using a unique field like 'deliveryaddress'
        const isOldSchema = data.deliveryaddress !== undefined;

        if (isOldSchema) {
            // It's the old schema, migrate it to the new one and save it.
            const migratedDataForDb = {
                uid: uid,
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                phone_number: data.mobile || '',
                phone2: data.altmobile || '',
                company: data.companyname || '',
                address: data.deliveryaddress || '',
                city: data.city || '',
                state: data.state || '',
                zipCode: data.zip || '',
                country: data.country || data.Country || '',
                referrer: data.howdoyouhearaboutus || 'Unknown',
                created_time: data.createdat ? Timestamp.fromMillis(data.createdat) : Timestamp.now(),
                role: 'Customer', // Default role for migrated users
                apiKey: '',
                testApiKey: '',
                webhookUrl: '',
            };
            
            await setDoc(userDocRef, migratedDataForDb);

            return {
                ...migratedDataForDb,
                created_time: parseFirestoreDate(migratedDataForDb.created_time),
            } as UserProfile;

        } else {
            // It's the new schema, process as normal
            return {
                uid: userDocSnap.id,
                email: data.email || '',
                firstname: data.firstname || '',
                lastname: data.lastname || '',
                phone_number: data.phone_number || '',
                referrer: data.referrer || '',
                company: data.company || '',
                phone2: data.phone2 || '',
                country: data.country || '',
                created_time: parseFirestoreDate(data.created_time),
                role: data.role || 'Customer',
                apiKey: data.apiKey || '',
                testApiKey: data.testApiKey || '',
                webhookUrl: data.webhookUrl || '',
                address: data.address || '',
                city: data.city || '',
                state: data.state || '',
                zipCode: data.zipCode || '',
            } as UserProfile;
        }
    }
    return null;
}

export async function getUserProfileByEmail(email: string): Promise<{ profile: UserProfile, docId: string } | null> {
    if (!email) return null;
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where("email", "==", email), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return null;
    }

    const userDoc = querySnapshot.docs[0];
    const data = userDoc.data();
    
    const isOldSchema = data.deliveryaddress !== undefined;

    if (isOldSchema) {
        const profile = {
            uid: data.uid || userDoc.id,
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            phone_number: data.mobile || '',
            phone2: data.altmobile || '',
            company: data.companyname || '',
            address: data.deliveryaddress || '',
            city: data.city || '',
            state: data.state || '',
            zipCode: data.zip || '',
            country: data.country || data.Country || '',
            referrer: data.howdoyouhearaboutus || 'Unknown',
            created_time: parseFirestoreDate(data.createdat),
            role: 'Customer',
            apiKey: '',
            testApiKey: '',
            webhookUrl: '',
        } as UserProfile;
        return { profile, docId: userDoc.id };

    } else {
        const profile = {
            uid: data.uid || userDoc.id, // Prefer existing uid, fallback to doc id
            email: data.email || '',
            firstname: data.firstname || '',
            lastname: data.lastname || '',
            phone_number: data.phone_number || '',
            referrer: data.referrer || '',
            company: data.company || '',
            phone2: data.phone2 || '',
            country: data.country || '',
            created_time: parseFirestoreDate(data.created_time),
            role: data.role || 'Customer',
            apiKey: data.apiKey || '',
            testApiKey: data.testApiKey || '',
            webhookUrl: data.webhookUrl || '',
            address: data.address || '',
            city: data.city || '',
            state: data.state || '',
            zipCode: data.zipCode || '',
        } as UserProfile;
        
        return { profile, docId: userDoc.id };
    }
}


export async function createUserProfile(uid: string, email: string, profileData: UserProfileCreationData): Promise<void> {
    const userDocRef = doc(db, 'users', uid);

    const dataToSet: any = {
        uid: uid,
        email: email,
        firstname: profileData.firstname,
        lastname: profileData.lastname,
        phone_number: profileData.mobile || '',
        phone2: profileData.altmobile || '',
        company: profileData.companyname || '',
        address: profileData.deliveryaddress,
        city: profileData.city,
        state: profileData.state,
        zipCode: profileData.zip,
        country: profileData.country,
        referrer: profileData.howdoyouhearaboutus || 'Unknown',
        role: 'Customer', // Default role on creation
        walletBalance: 0, // Initialize wallet balance
        apiKey: '',
        testApiKey: '',
        webhookUrl: '',
    };
    
    // Set created_time based on whether it's an import or a new signup
    if (profileData.creationTime) {
        dataToSet.created_time = createTimestamp(profileData.creationTime);
    } else {
        dataToSet.created_time = Timestamp.fromDate(new Date());
    }


    await setDoc(userDocRef, dataToSet);
    
    // Send welcome email if enabled
    const emailSettings = await getEmailSettings();
    if (emailSettings.welcomeEmail.enabled) {
        const { subject, htmlBody } = emailSettings.welcomeEmail;
        const personalizedBody = htmlBody.replace(/{{firstname}}/g, profileData.firstname);
        
        await sendEmail({
             to: [{ email_address: { address: email, name: `${profileData.firstname} ${profileData.lastname}` } }],
             subject: subject,
             htmlBody: personalizedBody
        });
    }
}

export async function adminCreateCustomer(profileData: any): Promise<{ uid: string; email: string }> {
    const { email } = profileData;

    // 1. Check for existing user
    const existingUser = await getUserProfileByEmail(email);
    if (existingUser) {
        throw new Error(`A user with email ${email} already exists.`);
    }

    // 2. Create new user document
    const userDocRef = doc(collection(db, 'users'));
    
    const dataToSet = {
        uid: userDocRef.id,
        email: email,
        firstname: profileData.firstname,
        lastname: profileData.lastname,
        phone_number: profileData.mobile || '',
        phone2: profileData.altmobile || '',
        company: profileData.companyname || '',
        address: profileData.deliveryaddress || '',
        city: profileData.city || '',
        state: profileData.state || '',
        zipCode: profileData.zip || '',
        country: profileData.country || '',
        referrer: 'Admin Created',
        role: (profileData.role as 'Customer' | 'Staff' | 'Agent' | 'Business' | 'Admin') || 'Customer',
        apiKey: '',
        testApiKey: '',
        webhookUrl: '',
        created_time: Timestamp.now(),
    };

    await setDoc(userDocRef, dataToSet);

    return { uid: userDocRef.id, email: email };
}

/**
 * Calculates the next date for a given day of the week.
 * @param baseDate The date to calculate from.
 * @param shipmentDayOfWeek The target day of the week (0=Sun, 1=Mon, ..., 6=Sat).
 * @returns The upcoming Date for that weekday.
 */
function getNextShipmentDay(baseDate: Date, shipmentDayOfWeek: number): Date {
  const nextShipmentDate = new Date(baseDate);
  const currentDay = nextShipmentDate.getDay();
  let daysUntilShipment = shipmentDayOfWeek - currentDay;

  // If it's already past the shipment day this week, or it is the shipment day,
  // schedule it for the next week's shipment day.
  if (daysUntilShipment <= 0) {
    daysUntilShipment += 7;
  }
  
  nextShipmentDate.setDate(nextShipmentDate.getDate() + daysUntilShipment);
  return nextShipmentDate;
}


export async function updateShipmentStatuses(shipmentDocIds: string[], status: ShipmentStatus): Promise<void> {
    const batch = writeBatch(db);
    const emailSettings = await getEmailSettings();
    
    const sideEffectTasks: (() => Promise<void>)[] = [];

    // Step 1: Iterate through shipments and prepare batch updates and side effects
    for (const docId of shipmentDocIds) {
        const docRef = doc(db, 'shipments', docId);
        const shipmentSnap = await getDoc(docRef);

        if (!shipmentSnap.exists()) continue;

        const shipmentData = shipmentSnap.data();
        const shipment = {
            ...shipmentData,
            docId: shipmentSnap.id
        } as Shipment;

        const isNowProcessing = status === 'Processing' && shipment.status !== 'Processing';
        
        const updatePayload: { [key: string]: any } = { status };
        
        // If status is being set to 'Processing', calculate ETA
        if (isNowProcessing) {
            const processingDate = new Date();
            let finalEta: Date;
            
            const isUkImport = shipment.serviceType === 'valueImport' && shipment.originAddress.includes('United Kingdom');
            const isValueService = shipment.serviceType === 'valueImport' || shipment.serviceType === 'valueExport';

            if (isValueService) {
                // Value Export: 15 days; Value Import: 10 days
                const deliveryWindow = shipment.serviceType === 'valueExport' ? 15 : 10;
                let shipmentDate;
                if (isUkImport) {
                    // UK shipments are on Thursdays (4)
                    shipmentDate = getNextShipmentDay(processingDate, 4);
                } else {
                    // US imports and all Value Exports are on Fridays (5)
                    shipmentDate = getNextShipmentDay(processingDate, 5);
                }
                finalEta = addBusinessDays(shipmentDate, deliveryWindow);
            } else { // Assumes Express Export
                finalEta = addBusinessDays(processingDate, 5);
            }
            updatePayload.estimatedDelivery = finalEta;
        }
        
        // Add the update operation to the batch
        batch.update(docRef, updatePayload);
        
        // Prepare side effects to run after the batch commit
        sideEffectTasks.push(async () => {
            const userProfile = await getUserProfile(shipment.userId);
            if (!userProfile) return;
            
            // Webhook for all status updates for Business users
            if (userProfile.role === 'Business' && userProfile.webhookUrl) {
                const webhookPayload = {
                    event: 'shipment.updated',
                    data: {
                        id: shipment.id,
                        status: status,
                        paymentStatus: shipment.paymentStatus,
                        bookingDate: (shipment.bookingDate as any).toISOString ? (shipment.bookingDate as any).toISOString() : new Date(shipment.bookingDate).toISOString(),
                        estimatedDelivery: updatePayload.estimatedDelivery ? updatePayload.estimatedDelivery.toISOString() : (shipment.estimatedDelivery ? (shipment.estimatedDelivery as any).toISOString() : null),
                    }
                };

                fetch(userProfile.webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(webhookPayload),
                }).catch(error => {
                    console.error(`Failed to send webhook for shipment ${shipment.id} to ${userProfile.webhookUrl}`, error);
                });
            }

            // Admin notification for "On Hold" status
            if (status === 'On Hold') {
                await sendEmail({
                    to: [{ email_address: { address: 'info@countycargo.com', name: 'County Cargo' } }],
                    subject: `Shipment Placed on Hold - ${shipment.id}`,
                    htmlBody: `
                        <div>
                            <p>A shipment has been placed on hold by a customer.</p>
                            <ul>
                                <li><strong>Shipment ID:</strong> ${shipment.id}</li>
                                <li><strong>Customer:</strong> ${userProfile.firstname} ${userProfile.lastname}</li>
                                <li><strong>Customer Email:</strong> ${userProfile.email}</li>
                            </ul>
                            <p>Please review the shipment details in the admin dashboard.</p>
                        </div>
                    `
                });
            }

            // Create notification for all status updates
            await addDoc(collection(db, 'notifications'), {
                userId: shipment.userId,
                title: `Shipment ${status}`,
                description: `Your shipment ${shipment.id} is now ${status}.`,
                href: `/dashboard/my-shipments/${shipment.docId}`,
                createdAt: Timestamp.now(),
                read: false,
            });

            // Special email for 'Received at Hub'
            if (status === 'Received at Hub' && emailSettings.receivedAtHub.enabled) {
                 const { subject, htmlBody } = emailSettings.receivedAtHub;
                 
                 const packageDetailsHtml = `
                    <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                        <thead>
                            <tr>
                                <th style="text-align: left;">Description</th>
                                <th style="text-align: right;">Weight</th>
                                <th style="text-align: right;">Dimensions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${shipment.packages.map((pkg: Package) => `
                                <tr>
                                    <td>${pkg.description}</td>
                                    <td style="text-align: right;">${pkg.weight} ${shipment.units === 'imperial' ? 'lbs' : 'kg'}</td>
                                    <td style="text-align: right;">${pkg.length}x${pkg.width}x${pkg.height} ${shipment.units === 'imperial' ? 'in' : 'cm'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                 `;

                 const personalizedSubject = subject.replace(/{{shipmentId}}/g, shipment.id);
                 const personalizedBody = htmlBody
                    .replace(/{{firstname}}/g, userProfile.firstname)
                    .replace(/{{shipmentId}}/g, shipment.id)
                    .replace(/{{packageDetails}}/g, packageDetailsHtml);

                 await sendEmail({
                    to: [{ email_address: { address: userProfile.email, name: `${userProfile.firstname} ${userProfile.lastname}` } }],
                    subject: personalizedSubject,
                    htmlBody: personalizedBody
                });
            }
            // Generic email for other status updates
            else if (status !== 'Received at Hub' && emailSettings.shipmentStatusUpdate.enabled) {
                const { subject, htmlBody } = emailSettings.shipmentStatusUpdate;
                const personalizedSubject = subject.replace(/{{shipmentId}}/g, shipment.id).replace(/{{status}}/g, status);
                const personalizedBody = htmlBody.replace(/{{firstname}}/g, userProfile.firstname).replace(/{{shipmentId}}/g, shipment.id).replace(/{{status}}/g, status);
                
                await sendEmail({
                    to: [{ email_address: { address: userProfile.email, name: `${userProfile.firstname} ${userProfile.lastname}` } }],
                    subject: personalizedSubject,
                    htmlBody: personalizedBody
                });
            }
        });
    }

    // Step 2: Commit all the batched writes at once.
    await batch.commit();

    // Step 3: After the batch is successfully committed, execute all side effects.
    await Promise.all(sideEffectTasks.map(task => task()));
}


export async function updateShipmentsAsPaid(shipmentDocIds: string[]): Promise<void> {
    const batch = writeBatch(db);
    const emailSettings = await getEmailSettings();
    const sideEffectTasks: (() => Promise<void>)[] = [];

    for (const docId of shipmentDocIds) {
        const docRef = doc(db, 'shipments', docId);
        const shipmentSnap = await getDoc(docRef);

        if (!shipmentSnap.exists()) continue;

        const shipmentData = shipmentSnap.data();
        const shipment = {
            ...shipmentData,
            docId: shipmentSnap.id
        } as Shipment;
        
        const updatePayload: { [key: string]: any } = {
            paymentStatus: 'Paid',
            paymentDate: new Date(),
        };

        // If the shipment is currently 'Unpaid' or waiting, move it to 'Submitted'
        if (shipment.status === 'Unpaid' || shipment.status === 'Awaiting Confirmation') {
            updatePayload.status = 'Received at Hub';
        }

        batch.update(docRef, updatePayload);

        // Prepare side effect to send payment confirmation email and notification
        sideEffectTasks.push(async () => {
            const userProfile = await getUserProfile(shipment.userId);
            if (!userProfile) return;

            // Create notification
            await addDoc(collection(db, 'notifications'), {
                userId: shipment.userId,
                title: 'Payment Confirmed',
                description: `Your payment for shipment ${shipment.id} has been confirmed.`,
                href: `/dashboard/my-shipments/${shipment.docId}`,
                createdAt: Timestamp.now(),
                read: false,
            });

            if (emailSettings.paymentConfirmation.enabled) {
                const { subject, htmlBody } = emailSettings.paymentConfirmation;
                const personalizedSubject = subject.replace(/{{shipmentId}}/g, shipment.id);
                const personalizedBody = htmlBody.replace(/{{firstname}}/g, userProfile.firstname).replace(/{{shipmentId}}/g, shipment.id);
                
                await sendEmail({
                    to: [{ email_address: { address: userProfile.email, name: `${userProfile.firstname} ${userProfile.lastname}` } }],
                    subject: personalizedSubject,
                    htmlBody: personalizedBody
                });
            }
        });
    }

    await batch.commit();
    await Promise.all(sideEffectTasks.map(task => task()));
}



let cachedUsers: UserProfile[] | null = null;
let lastUsersFetch = 0;
const USERS_CACHE_TTL = 60 * 1000; // 1 minute

export const getAllUsers = cache(async (): Promise<UserProfile[]> => {
    const now = Date.now();
    if (cachedUsers && (now - lastUsersFetch < USERS_CACHE_TTL)) {
        return cachedUsers;
    }

    const usersCollectionRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollectionRef);

    if (usersSnapshot.empty) {
        cachedUsers = [];
        lastUsersFetch = now;
        return [];
    }

    const users = usersSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            uid: doc.id,
            email: data.email || '',
            firstname: data.firstname || '',
            lastname: data.lastname || '',
            phone_number: data.phone_number || '',
            referrer: data.referrer || '',
            company: data.company || '',
            phone2: data.phone2 || '',
            country: data.country || '',
            created_time: parseFirestoreDate(data.created_time),
            role: data.role || 'Customer',
            apiKey: data.apiKey || '',
            testApiKey: data.testApiKey || '',
            address: data.address || '',
            city: data.city || '',
            state: data.state || '',
            zipCode: data.zipCode || '',
        } as UserProfile;
    });

    cachedUsers = users;
    lastUsersFetch = now;
    return users;
});

export async function getCachedAllUsers(): Promise<UserProfile[]> {
    return await getAllUsers();
}

export async function searchUsers(searchTerm: string): Promise<UserProfile[]> {
    if (!searchTerm || searchTerm.trim().length < 2) {
        return [];
    }

    const allUsers = await getCachedAllUsers();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const searchWords = new Set(lowerCaseSearchTerm.split(/\s+/).filter(Boolean));

    if (searchWords.size === 0) {
        return [];
    }

    const filteredUsers = allUsers.filter(user => {
        const email = user.email?.toLowerCase() || '';
        // Prioritize email match on the full search term
        if (email.includes(lowerCaseSearchTerm)) {
            return true;
        }

        const userWords = new Set([user.firstname, user.lastname]
            .filter(Boolean)
            .flatMap(name => name.toLowerCase().trim().split(/\s+/).filter(Boolean)));
        
        if (userWords.size === 0) return false;

        // Check if all search words are a prefix of at least one of the user's name words
        for (const searchWord of searchWords) {
            let foundMatch = false;
            for (const userWord of userWords) {
                if (userWord.startsWith(searchWord)) {
                    foundMatch = true;
                    break;
                }
            }
            // If a search word doesn't match any user word prefix, this user is not a match
            if (!foundMatch) {
                return false;
            }
        }
        
        // If all search words found a prefix match, it's a valid result
        return true;
    });

    return filteredUsers.slice(0, 10);
}


type UserProfileUpdateData = {
    firstname: string;
    lastname: string;
    phone_number: string;
    phone2?: string;
    company?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    role?: 'Admin' | 'Customer' | 'Staff' | 'Agent' | 'Business';
    apiKey?: string;
    testApiKey?: string;
    webhookUrl?: string;
}

export async function updateUserProfile(uid: string, data: Partial<UserProfileUpdateData>): Promise<void> {
    const userDocRef = doc(db, 'users', uid);
    

    await updateDoc(userDocRef, data);
}

export async function generateApiKeyForCurrentUser(uid: string): Promise<{ apiKey: string; testApiKey: string }> {
    const userDocRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userDocRef);

    if (!userSnap.exists()) {
        throw new Error("User profile not found.");
    }
    
    const userProfile = userSnap.data() as Partial<UserProfile>;

    if (userProfile.role !== 'Business') {
        throw new Error("Only Business accounts can generate API keys.");
    }

    if (userProfile.apiKey && userProfile.testApiKey) {
        // If they already have both keys, just return them.
        return { apiKey: userProfile.apiKey, testApiKey: userProfile.testApiKey };
    }

    const newKey = `county_cargo_sk_${[...crypto.getRandomValues(new Uint8Array(24))]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('')}`;
        
    const newTestKey = `county_cargo_test_${[...crypto.getRandomValues(new Uint8Array(24))]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('')}`;
        
    const updateData: any = {};
    if (!userProfile.apiKey) updateData.apiKey = newKey;
    if (!userProfile.testApiKey) updateData.testApiKey = newTestKey;

    await updateDoc(userDocRef, updateData);

    return {
        apiKey: userProfile.apiKey || newKey,
        testApiKey: userProfile.testApiKey || newTestKey,
    };
}

export async function getAddresses(userId: string): Promise<Address[]> {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        return data.addresses || [];
    }
    return [];
}

export async function addAddress(userId: string, address: Address): Promise<void> {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
        addresses: arrayUnion(address)
    });
}

export async function updateAddress(userId: string, address: Address): Promise<void> {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const addresses: Address[] = userData.addresses || [];
        
        // Find and remove the old address
        const updatedAddresses = addresses.filter(a => a.id !== address.id);
        
        // Add the updated address
        updatedAddresses.push(address);

        await updateDoc(userDocRef, { addresses: updatedAddresses });
    } else {
        throw new Error("User not found to update address.");
    }
}

export async function deleteAddress(userId: string, addressId: string): Promise<void> {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);

     if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const addresses: Address[] = userData.addresses || [];
        const addressToDelete = addresses.find(a => a.id === addressId);

        if (addressToDelete) {
            await updateDoc(userDocRef, {
                addresses: arrayRemove(addressToDelete)
            });
        }
    } else {
        throw new Error("User not found to delete address.");
    }
}

// Helper to safely create a Timestamp from various date formats
const createTimestamp = (value: any): Timestamp | null => {
    if (!value) return null;
    if (value instanceof Timestamp) return value;
    if (value instanceof Date && !isNaN(value.getTime())) return Timestamp.fromDate(value);
    
    // Attempt to create a date from string or number, check for validity
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
        return Timestamp.fromDate(date);
    }

    // Handle Excel's integer-based dates (number of days since 1900)
    const num = Number(value);
    if (!isNaN(num) && num > 25569) { // Excel date number for 1970
        const excelEpoch = new Date(1899, 11, 30);
        const jsDate = new Date(excelEpoch.getTime() + num * 24 * 60 * 60 * 1000);
        if (!isNaN(jsDate.getTime())) {
            return Timestamp.fromDate(jsDate);
        }
    }
    
    return null;
};


export async function bulkImportData(collectionName: string, data: any[]): Promise<{ success: number; errors: number; skipped: number }> {
    if (!['users', 'shipments', 'transactions'].includes(collectionName)) {
        throw new Error('Invalid collection name.');
    }

    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;
    
    let existingEmails: Set<string> | null = null;
    if (collectionName === 'users') {
        const allUsers = await getCachedAllUsers();
        existingEmails = new Set(allUsers.map(user => user.email).filter(email => email));
    }
    
    const batchSize = 500; // Firestore batch limit
    for (let i = 0; i < data.length; i += batchSize) {
        const batch = writeBatch(db);
        const chunk = data.slice(i, i + batchSize);
        let chunkSuccessCount = 0;

        for (const rawRecord of chunk) {
            try {
                const docRef = doc(collection(db, collectionName));
                
                const record: { [key: string]: any } = {};
                for (const key in rawRecord) {
                    record[key.toLowerCase().replace(/[^a-z0-9]/g, '')] = rawRecord[key];
                }
        
                const findValue = (keys: string[]): any => {
                    for (const key of keys) {
                        if (record[key] !== undefined && record[key] !== null && record[key] !== '') {
                            return record[key];
                        }
                    }
                    return undefined;
                };

                let processedRecord: { [key: string]: any } = {};

                if (collectionName === 'users') {
                     processedRecord = {
                        uid: findValue(['uid']) || docRef.id,
                        email: findValue(['email']),
                        firstname: findValue(['firstname', 'firstname']),
                        lastname: findValue(['lastname', 'lastname']),
                        phone_number: findValue(['phonenumber', 'mobile', 'phonenumber']),
                        phone2: findValue(['phone2', 'altmobile']),
                        company: findValue(['company', 'companyname']),
                        address: findValue(['address', 'deliveryaddress']),
                        city: findValue(['city']),
                        state: findValue(['state']),
                        zipCode: findValue(['zipcode', 'zip']),
                        country: findValue(['country']),
                        referrer: findValue(['referrer', 'howdoyouhearaboutus']) || 'Unknown',
                        role: findValue(['role']) || 'Customer',
                        created_time: createTimestamp(findValue(['createdtime', 'createdat', 'creationtime', 'datejoined'])) || Timestamp.now(),
                        apiKey: findValue(['apikey']) || '',
                        testApiKey: findValue(['testapikey']) || '',
                        webhookUrl: findValue(['webhookurl']) || '',
                    };
                    if (!processedRecord.email) {
                        throw new Error(`Skipping user record due to missing email.`);
                    }
                    
                    if (existingEmails && existingEmails.has(processedRecord.email)) {
                        skippedCount++;
                        continue;
                    }
                    if (existingEmails) {
                        existingEmails.add(processedRecord.email);
                    }

                } else if (collectionName === 'shipments') {
                    const customerName = findValue(['customername', 'customerdetailname']) || "";
                    const [firstname, ...lastnameParts] = String(customerName).split(' ');
                    const lastname = lastnameParts.join(' ');
                    
                    processedRecord = {
                        id: findValue(['id', 'trackingid', 'trackingcode']) || `IMP-${Math.floor(100000 + Math.random() * 900000)}`,
                        userId: findValue(['userid', 'customerid']),
                        email: findValue(['email', 'customeremail', 'customerdetailemail']),
                        customer: {
                            uid: findValue(['userid', 'customerid']) || '',
                            firstname: findValue(['customerfirstname']) || firstname || 'N/A',
                            lastname: findValue(['customerlastname']) || lastname || 'N/A',
                            email: findValue(['email', 'customeremail', 'customerdetailemail']) || '',
                            phone_number: findValue(['customerphonenumber', 'customermobile']) || '',
                        },
                        shipper: {
                            name: findValue(['shippername']) || findValue(['customername', 'customerdetailname']) || 'N/A',
                            email: findValue(['shipperemail']) || findValue(['customeremail', 'customerdetailemail']) || '',
                            phone: findValue(['shipperphone']) || findValue(['customermobile']) || '',
                        },
                        receiver: {
                            name: findValue(['receivername']) || 'N/A',
                            email: findValue(['receiveremail']) || '',
                            phone: findValue(['receiverphone']) || '',
                        },
                        originAddress: findValue(['originaddress']) || 'N/A',
                        destinationAddress: findValue(['destinationaddress', 'deliveryaddress']) || 'N/A',
                        shipmentType: findValue(['shipmenttype']) || 'import',
                        serviceType: findValue(['servicetype']) || 'valueImport',
                        units: findValue(['units']) || 'metric',
                        status: findValue(['status', 'shipmentstatus']) || 'Unpaid',
                        bookingDate: createTimestamp(findValue(['bookingdate', 'createdat'])) || Timestamp.now(),
                        estimatedDelivery: createTimestamp(findValue(['estimateddelivery', 'duedate', 'eta'])),
                        paymentStatus: findValue(['paymentstatus']) ? (String(findValue(['paymentstatus'])).toLowerCase() === 'paid' ? 'Paid' : 'Unpaid') : 'Unpaid',
                        totalCost: String(findValue(['totalcost', 'totalcharge']) || 0),
                        originalCost: String(findValue(['originalcost', 'totalcharge']) || findValue(['totalcost']) || 0),
                        paymentDate: createTimestamp(findValue(['paymentdate'])),
                        pickupDate: createTimestamp(findValue(['pickupdate'])),
                        requestPickup: !!findValue(['requestpickup']),
                        rate: Number(findValue(['rate']) || 0),
                        billableWeight: Number(findValue(['billableweight', 'totalweight']) || 0),
                        exchangeRate: Number(findValue(['exchangerate']) || 0),
                        handlingFee: Number(findValue(['handlingfee']) || 0),
                        minimumWeight: Number(findValue(['minimumweight']) || 0),
                        minimumWeightApplied: !!findValue(['minimumweightapplied']),
                    };

                    let itemsData = findValue(['packages', 'items']);
                    if (typeof itemsData === 'string' && itemsData.startsWith('[')) {
                        try { itemsData = JSON.parse(itemsData); } catch (e) { itemsData = []; }
                    }
                    
                    processedRecord.packages = Array.isArray(itemsData) ? itemsData.map((p: any) => ({
                        weight: Number(p.weight || 0),
                        length: Number(p.length || 0),
                        width: Number(p.width || 0),
                        height: Number(p.height || 0),
                        description: p.description || 'N/A',
                        value: p.value ? Number(p.value) : 0,
                        cost: p.cost !== undefined ? Number(p.cost) : undefined,
                    })) : [];
                    
                    let chargesData = findValue(['additionalchargesapplied']);
                    if (typeof chargesData === 'string' && chargesData.startsWith('[')) {
                        try { chargesData = JSON.parse(chargesData); } catch (e) { chargesData = []; }
                    }
                    processedRecord.additionalChargesApplied = Array.isArray(chargesData) ? chargesData.map((c: any) => ({
                        name: c.name || 'Unknown Charge',
                        amount: Number(c.amount || 0),
                    })) : [];

                    if (!processedRecord.userId || !processedRecord.email) {
                        throw new Error(`Skipping shipment due to missing userId or email.`);
                    }
                } else { // transactions
                     processedRecord = {
                        id: findValue(['id', 'transactionid']) || `txn_${Date.now()}`,
                        date: createTimestamp(findValue(['date', 'createdat'])) || Timestamp.now(),
                        type: findValue(['type', 'transactiontype']),
                        amount: Number(findValue(['amount']) || 0),
                        description: findValue(['description', 'details']) || '',
                        shipmentId: findValue(['shipmentid', 'relatedshipment']) || null,
                    };
                    if(!processedRecord.type) {
                        throw new Error(`Skipping transaction due to missing type.`);
                    }
                }
                
                batch.set(docRef, processedRecord);
                chunkSuccessCount++;

            } catch (e: any) {
                console.error("Error processing record, skipping. Reason:", e.message, "Record:", rawRecord);
                errorCount++;
            }
        }
        
        try {
            await batch.commit();
            successCount += chunkSuccessCount;
        } catch (commitError) {
            console.error("Batch commit failed:", commitError);
            errorCount += chunkSuccessCount;
        }
    }
    
    return { success: successCount, errors: errorCount, skipped: skippedCount };
}

export async function deleteShipment(docId: string): Promise<void> {
    const shipmentRef = doc(db, 'shipments', docId);
    await deleteDoc(shipmentRef);
}

export async function bulkDeleteShipments(docIds: string[]): Promise<void> {
    const batchSize = 500;
    for (let i = 0; i < docIds.length; i += batchSize) {
        const chunk = docIds.slice(i, i + batchSize);
        const batch = writeBatch(db);
        chunk.forEach(id => {
            const docRef = doc(db, 'shipments', id);
            batch.delete(docRef);
        });
        await batch.commit();
    }
}

export async function sendPackageReceiptNotification({
    customerId,
    trackingNumbers,
    location,
    adminProfile
}: {
    customerId: string;
    trackingNumbers: string[];
    location: 'US Warehouse' | 'UK Warehouse' | 'Lagos Warehouse' | 'Out of State';
    adminProfile: UserProfile;
}): Promise<{ newReceipts: number; skipped: number }> {
    const customerProfile = await getUserProfile(customerId);
    if (!customerProfile) {
        throw new Error("Customer not found.");
    }
    
    // 1. Find existing tracking numbers
    const receiptsRef = collection(db, 'package_receipts');
    const validTrackingNumbers = trackingNumbers.filter(tn => tn && tn.trim() !== '');

    if (validTrackingNumbers.length === 0) {
        return { newReceipts: 0, skipped: 0 };
    }

    const q = query(receiptsRef, where('customerId', '==', customerId), where('trackingNumber', 'in', validTrackingNumbers));
    const existingReceiptsSnapshot = await getDocs(q);
    const existingTrackingNumbers = new Set(existingReceiptsSnapshot.docs.map(doc => doc.data().trackingNumber));

    const newTrackingNumbers = validTrackingNumbers.filter(tn => !existingTrackingNumbers.has(tn));
    const skippedCount = validTrackingNumbers.length - newTrackingNumbers.length;

    if (newTrackingNumbers.length === 0) {
        return { newReceipts: 0, skipped: skippedCount };
    }

    const batchOps = writeBatch(db);

    for (const trackingNumber of newTrackingNumbers) {
        // 2. Log the receipt for new numbers
        const receiptRef = doc(collection(db, 'package_receipts'));
        batchOps.set(receiptRef, {
            customerId: customerProfile.uid,
            customerName: `${customerProfile.firstname} ${customerProfile.lastname}`,
            customerEmail: customerProfile.email,
            trackingNumber,
            location,
            notifiedAt: Timestamp.now(),
            notifiedBy: {
                uid: adminProfile.uid,
                name: `${adminProfile.firstname} ${adminProfile.lastname}`,
            },
            // ── Visibility gate (REQUIRED before email) ──────────────────────
            verified: true,
            visibleToCustomer: true,
            notificationSent: false,   // set to true after email succeeds
            notificationSentAt: null,
            createdByStaff: { uid: adminProfile.uid, name: `${adminProfile.firstname} ${adminProfile.lastname}` },
            updatedAt: Timestamp.now(),
        });

        // 3. Create a user notification for new numbers
        const notificationRef = doc(collection(db, 'notifications'));
        batchOps.set(notificationRef, {
            userId: customerProfile.uid,
            title: 'Package Received at Warehouse',
            description: `Your package with tracking number ${trackingNumber} has arrived at our ${location}.`,
            createdAt: Timestamp.now(),
            read: false,
        });
    }
    
    await batchOps.commit();

    // 4. Send one consolidated email — ONLY after the batch is committed
    const emailSettings = await getEmailSettings();
    if (emailSettings.packageReceivedNotification.enabled) {
        const { subject, htmlBody } = emailSettings.packageReceivedNotification;
        
        const trackingListHtml = `<ul>${newTrackingNumbers.map(tn => `<li><strong>${tn}</strong></li>`).join('')}</ul>`;
        
        const personalizedSubject = subject;
        const personalizedBody = htmlBody
            .replace(/{{firstname}}/g, customerProfile.firstname)
            .replace(/{{trackingNumber}}/g, trackingListHtml)
            .replace(/{{location}}/g, location);
        
        try {
            await sendEmail({
                to: [{ email_address: { address: customerProfile.email, name: `${customerProfile.firstname} ${customerProfile.lastname}` } }],
                subject: personalizedSubject,
                htmlBody: personalizedBody
            });
            // Mark all new packages as email-notified AFTER successful send
            const markBatch = writeBatch(db);
            const pkgQ = query(
                collection(db, 'package_receipts'),
                where('customerId', '==', customerProfile.uid),
                where('trackingNumber', 'in', newTrackingNumbers),
                where('notificationSent', '==', false)
            );
            const pkgSnap = await getDocs(pkgQ);
            for (const pkgDoc of pkgSnap.docs) {
                markBatch.update(pkgDoc.ref, { notificationSent: true, notificationSentAt: Timestamp.now(), updatedAt: Timestamp.now() });
            }
            await markBatch.commit();
        } catch (emailErr) {
            console.error('Email failed for', customerProfile.email, emailErr);
        }
    }

    return { newReceipts: newTrackingNumbers.length, skipped: skippedCount };
}

export async function bulkProcessPackageReceipts({
    receipts,
    location,
    adminProfile,
}: {
    receipts: { customerName: string; trackingNumber: any }[];
    location: 'US Warehouse' | 'UK Warehouse' | 'Lagos Warehouse' | 'Out of State';
    adminProfile: UserProfile;
}): Promise<{ success: number; skipped: number; failed: number; errors: string[] }> {
    let successCount = 0;
    let skippedCount = 0;
    let failedCount = 0;
    const errors: string[] = [];

    const allUsers = await getAllUsers();
    const receiptsByCustomer = new Map<string, { profile: UserProfile; trackingNumbers: string[] }>();
    
    for (const [index, receipt] of receipts.entries()) {
         if (!receipt.customerName || typeof receipt.customerName !== 'string') {
            failedCount++;
            errors.push(`Row ${index + 2}: Missing or invalid customer name.`);
            continue;
        }
        
        const sheetCustomerName = receipt.customerName.toLowerCase().trim();
        const sheetWords = sheetCustomerName.split(/\s+/).filter(Boolean);

        const foundUser = allUsers.find(user => {
            const dbWords = [user.firstname, user.lastname]
                .filter(Boolean) // Remove empty/null names
                .map(name => name.toLowerCase().trim());
            
            if (dbWords.length === 0) return false;

            // Every word from the user's name in the DB must be present in the words from the sheet
            return dbWords.every(dbWord => sheetWords.includes(dbWord));
        });

        if (foundUser) {
            if (!receiptsByCustomer.has(foundUser.uid)) {
                receiptsByCustomer.set(foundUser.uid, { profile: foundUser, trackingNumbers: [] });
            }
            const customerData = receiptsByCustomer.get(foundUser.uid)!;
            customerData.trackingNumbers.push(String(receipt.trackingNumber).trim());
        } else {
            failedCount++;
            errors.push(`Row ${index + 2}: Customer "${receipt.customerName}" not found.`);
        }
    }

    for (const [customerId, { profile, trackingNumbers: rawTrackingNumbers }] of receiptsByCustomer.entries()) {
        const trackingNumbers = [...new Set(rawTrackingNumbers)]; // De-duplicate tracking numbers from the sheet

        const q = query(
            collection(db, 'package_receipts'),
            where('customerId', '==', customerId),
            where('trackingNumber', 'in', trackingNumbers)
        );
        const existingReceiptsSnapshot = await getDocs(q);
        const existingTrackingNumbers = new Set(existingReceiptsSnapshot.docs.map(d => d.data().trackingNumber));
        
        const newTrackingNumbers = trackingNumbers.filter(tn => !existingTrackingNumbers.has(tn));
        skippedCount += trackingNumbers.length - newTrackingNumbers.length;
        
        if (newTrackingNumbers.length > 0) {
            const batchOps = writeBatch(db);
            
            for (const trackingNumber of newTrackingNumbers) {
                const receiptRef = doc(collection(db, 'package_receipts'));
                batchOps.set(receiptRef, {
                    customerId: profile.uid,
                    customerName: `${profile.firstname} ${profile.lastname}`,
                    customerEmail: profile.email,
                    trackingNumber,
                    location,
                    notifiedAt: Timestamp.now(),
                    notifiedBy: { uid: adminProfile.uid, name: `${adminProfile.firstname} ${adminProfile.lastname}` },
                    // ── Visibility gate ─────────────────────────────────────
                    verified: true,
                    visibleToCustomer: true,
                    notificationSent: false,   // set to true after email succeeds
                    notificationSentAt: null,
                    createdByStaff: { uid: adminProfile.uid, name: `${adminProfile.firstname} ${adminProfile.lastname}` },
                    updatedAt: Timestamp.now(),
                });
                
                const notificationRef = doc(collection(db, 'notifications'));
                batchOps.set(notificationRef, {
                    userId: profile.uid,
                    title: 'Package Received at Warehouse',
                    description: `Your package with tracking number ${trackingNumber} has arrived at our ${location}.`,
                    createdAt: Timestamp.now(),
                    read: false,
                });
            }
            
            await batchOps.commit();

            const emailSettings = await getEmailSettings();
            if (emailSettings.packageReceivedNotification.enabled) {
                const { subject, htmlBody } = emailSettings.packageReceivedNotification;
                const trackingListHtml = `<ul>${newTrackingNumbers.map(tn => `<li><strong>${tn}</strong></li>`).join('')}</ul>`;
                const personalizedSubject = subject;
                const personalizedBody = htmlBody
                    .replace(/{{firstname}}/g, profile.firstname)
                    .replace(/{{trackingNumber}}/g, trackingListHtml)
                    .replace(/{{location}}/g, location);
                
                try {
                    await sendEmail({
                        to: [{ email_address: { address: profile.email, name: `${profile.firstname} ${profile.lastname}` } }],
                        subject: personalizedSubject,
                        htmlBody: personalizedBody
                    });
                    // Mark packages as email-notified AFTER successful send
                    const markBatch = writeBatch(db);
                    const pkgQ = query(
                        collection(db, 'package_receipts'),
                        where('customerId', '==', profile.uid),
                        where('trackingNumber', 'in', newTrackingNumbers),
                        where('notificationSent', '==', false)
                    );
                    const pkgSnap = await getDocs(pkgQ);
                    for (const pkgDoc of pkgSnap.docs) {
                        markBatch.update(pkgDoc.ref, { notificationSent: true, notificationSentAt: Timestamp.now(), updatedAt: Timestamp.now() });
                    }
                    await markBatch.commit();
                } catch (emailErr) {
                    console.error('Email failed for', profile.email, emailErr);
                }
            }
            successCount += newTrackingNumbers.length;
        }
    }
    
    return { success: successCount, skipped: skippedCount, failed: failedCount, errors };
}
    
export async function logPackageReceipts(packages: PackageLogData[], adminProfile: UserProfile, suppressEmail = false): Promise<{ success: number; failed: number }> {
    const batchOps = writeBatch(db);
    let successCount = 0;

    const packagesByCustomer = new Map<string, { profile: UserProfile, packages: PackageLogData[] }>();

    for (const pkg of packages) {
        try {
            const receiptRef = doc(collection(db, 'package_receipts'));
            batchOps.set(receiptRef, {
                customerId: pkg.customer.uid,
                customerName: `${pkg.customer.firstname} ${pkg.customer.lastname}`,
                customerEmail: pkg.customer.email,
                customerPhone: pkg.customer.phone_number || '',
                qty: pkg.qty,
                weight: pkg.weight,
                length: pkg.length || null,
                width: pkg.width || null,
                height: pkg.height || null,
                sender: pkg.sender,
                courier: pkg.courier,
                courierCode: pkg.courierCode || '',
                trackingNumber: pkg.trackingNumber || '',
                comment: pkg.comment || '',
                location: pkg.location,
                region: pkg.region || 'US',
                status: 'added',
                notifiedAt: Timestamp.now(),
                notifiedBy: {
                    uid: adminProfile.uid,
                    name: `${adminProfile.firstname} ${adminProfile.lastname}`,
                },
                notifiedCustomer: true,
                // ── Visibility gate ─────────────────────────────────────────
                verified: true,
                visibleToCustomer: true,
                notificationSent: false,   // set to true after email succeeds
                notificationSentAt: null,
                weeklyShipmentId: null,    // null until assigned to a weekly shipment
                createdByStaff: { uid: adminProfile.uid, name: `${adminProfile.firstname} ${adminProfile.lastname}` },
                updatedAt: Timestamp.now(),
            });

            const notificationRef = doc(collection(db, 'notifications'));
            batchOps.set(notificationRef, {
                userId: pkg.customer.uid,
                title: 'Package Received at Warehouse',
                description: `Your package with tracking number ${pkg.trackingNumber || 'N/A'} has arrived at our ${pkg.location}.`,
                createdAt: Timestamp.now(),
                read: false,
            });

            if (!packagesByCustomer.has(pkg.customer.uid)) {
                packagesByCustomer.set(pkg.customer.uid, { profile: pkg.customer, packages: [] });
            }
            packagesByCustomer.get(pkg.customer.uid)!.packages.push(pkg);

            successCount++;
        } catch (e) {
            console.error("Error logging package:", e);
        }
    }

    try {
        await batchOps.commit();

        // Fire and forget email sending AFTER batch is committed
        // visibleToCustomer is already true in DB before email fires
        if (!suppressEmail) Promise.resolve().then(async () => {
            try {
                const emailSettings = await getEmailSettings();
                if (emailSettings.packageReceivedNotification.enabled) {
                    const { subject, htmlBody } = emailSettings.packageReceivedNotification;
                    
                    for (const { profile, packages: custPkgs } of Array.from(packagesByCustomer.values())) {
                        const location = custPkgs[0].location;
                        const trackingListHtml = `
                        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 15px;">
                            <thead>
                                <tr>
                                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Tracking Number</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Courier</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Courier Code</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Description</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Weight</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${custPkgs.map(p => `
                                <tr>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${p.trackingNumber || 'N/A'}</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${p.courier || 'N/A'}</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${p.courierCode || 'N/A'}</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${p.comment || 'N/A'}</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${p.weight || 'N/A'}</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">Inbound</td>
                                </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        `;                        
                        const personalizedSubject = subject;
                        const personalizedBody = htmlBody
                            .replace(/{{firstname}}/g, profile.firstname)
                            .replace(/{{trackingNumber}}/g, trackingListHtml)
                            .replace(/{{location}}/g, location);
                        
                        try {
                            await sendEmail({
                                to: [{ email_address: { address: profile.email, name: `${profile.firstname} ${profile.lastname}` } }],
                                subject: personalizedSubject,
                                htmlBody: personalizedBody
                            });
                            // Mark packages as email-notified AFTER successful send
                            const trackingNums = custPkgs.map(p => p.trackingNumber).filter(Boolean);
                            if (trackingNums.length > 0) {
                                const markBatch = writeBatch(db);
                                const pkgQ = query(
                                    collection(db, 'package_receipts'),
                                    where('customerId', '==', profile.uid),
                                    where('trackingNumber', 'in', trackingNums),
                                    where('notificationSent', '==', false)
                                );
                                const pkgSnap = await getDocs(pkgQ);
                                for (const pkgDoc of pkgSnap.docs) {
                                    markBatch.update(pkgDoc.ref, { notificationSent: true, notificationSentAt: Timestamp.now(), updatedAt: Timestamp.now() });
                                }
                                await markBatch.commit();
                            }
                        } catch (emailErr) {
                            console.error('Email failed for', profile.email, emailErr);
                        }
                    }
                }
            } catch(e) {
                console.error("Error sending grouped emails in background:", e);
            }
        });

        return { success: successCount, failed: packages.length - successCount };
    } catch(e) {
        console.error("Error committing batch:", e);
        return { success: 0, failed: packages.length };
    }
}

export async function movePackagesToInbound(docIds: string[]): Promise<void> {
    const batch = writeBatch(db);
    const now = Timestamp.now();
    for (const docId of docIds) {
        const docRef = doc(db, 'package_receipts', docId);
        batch.update(docRef, {
            status: 'inbound',
            dateReady: now,
        });
    }
    await batch.commit();
}

export async function updatePackageReceipt(docId: string, data: Partial<Record<string, any>>): Promise<void> {
    const docRef = doc(db, 'package_receipts', docId);
    await updateDoc(docRef, data);
}

export async function deletePackageReceipt(docId: string): Promise<void> {
    const docRef = doc(db, 'package_receipts', docId);
    await deleteDoc(docRef);
}

export async function sendPackageInboundNotification({
    receipt,
    adminProfile,
}: {
    receipt: { docId: string; customerId: string; customerName: string; customerEmail: string; trackingNumber?: string; location: string };
    adminProfile: UserProfile;
}): Promise<void> {
    // ── Pre-flight visibility check ───────────────────────────────────────────
    // RULE: A package must NEVER be emailed unless it is saved as customer-visible.
    if (!receipt.customerEmail || !receipt.trackingNumber) {
        throw new Error('Package is missing customerEmail or trackingNumber. Cannot send notification.');
    }

    const pkgRef = doc(db, 'package_receipts', receipt.docId);
    const pkgSnap = await getDoc(pkgRef);
    if (!pkgSnap.exists()) {
        throw new Error('Package not found in database. Cannot send notification.');
    }

    const pkgData = pkgSnap.data();
    if (!pkgData.visibleToCustomer || !pkgData.verified) {
        throw new Error(
            'Package saved, but not visible to customer. Please fix before sending notification.'
        );
    }

    // ── Send email ────────────────────────────────────────────────────────────
    const emailSettings = await getEmailSettings();
    if (emailSettings.packageReceivedNotification.enabled) {
        const { subject, htmlBody } = emailSettings.packageReceivedNotification;
        const trackingDisplay = receipt.trackingNumber || 'N/A';
        const trackingListHtml = `
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 15px;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Tracking Number</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Courier</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Courier Code</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Description</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${trackingDisplay}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${pkgData?.courier || 'N/A'}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${pkgData?.courierCode || 'N/A'}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${pkgData?.comment || 'N/A'}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">Inbound</td>
                </tr>
            </tbody>
        </table>
        `;
        const firstName = receipt.customerName.split(' ')[0] || receipt.customerName;
        const personalizedBody = htmlBody
            .replace(/{{firstname}}/g, firstName)
            .replace(/{{trackingNumber}}/g, trackingListHtml)
            .replace(/{{location}}/g, receipt.location);
        await sendEmail({
            to: [{ email_address: { address: receipt.customerEmail, name: receipt.customerName } }],
            subject: subject,
            htmlBody: personalizedBody,
        });
    }

    // ── Mark as notified (atomic — only reaches here if email succeeded) ──────
    await updateDoc(pkgRef, {
        notifiedCustomer: true,
        notificationSent: true,
        notificationSentAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    });

    // ── In-app notification ───────────────────────────────────────────────────
    await addDoc(collection(db, 'notifications'), {
        userId: receipt.customerId,
        title: 'Package Received at Warehouse',
        description: `Your package${receipt.trackingNumber ? ` (${receipt.trackingNumber})` : ''} has arrived at our ${receipt.location}.`,
        createdAt: Timestamp.now(),
        read: false,
    });
}

export async function bulkSendPackageNotifications({
    receipts,
    adminProfile,
}: {
    receipts: { docId: string; customerId: string; customerName: string; customerEmail: string; trackingNumber?: string; location: string }[];
    adminProfile: UserProfile;
}): Promise<{ success: number; failed: number; errors: string[] }> {
    let success = 0;
    let failed = 0;
    const errors: string[] = [];

    const emailSettings = await getEmailSettings();

    for (const receipt of receipts) {
        try {
            // ── Pre-flight: verify package is visible before sending email ────
            const pkgRef = doc(db, 'package_receipts', receipt.docId);
            const pkgSnap = await getDoc(pkgRef);
            if (!pkgSnap.exists()) {
                throw new Error('Package not found in database.');
            }
            const pkgData = pkgSnap.data();
            if (!pkgData.visibleToCustomer || !pkgData.verified) {
                throw new Error(
                    'Package not visible to customer dashboard. Fix before sending notification.'
                );
            }

            // ── Send email ────────────────────────────────────────────────────
            if (emailSettings.packageReceivedNotification.enabled) {
                const { subject, htmlBody } = emailSettings.packageReceivedNotification;
                const trackingDisplay = receipt.trackingNumber || 'N/A';
                const trackingListHtml = `
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 15px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Tracking Number</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Courier</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Courier Code</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Description</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Weight</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">${trackingDisplay}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${pkgData?.courier || 'N/A'}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${pkgData?.courierCode || 'N/A'}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${pkgData?.comment || 'N/A'}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${pkgData?.weight || 'N/A'}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">Inbound</td>
                        </tr>
                    </tbody>
                </table>
                `;
                const firstName = receipt.customerName.split(' ')[0] || receipt.customerName;
                const personalizedBody = htmlBody
                    .replace(/{{firstname}}/g, firstName)
                    .replace(/{{trackingNumber}}/g, trackingListHtml)
                    .replace(/{{location}}/g, receipt.location);
                await sendEmail({
                    to: [{ email_address: { address: receipt.customerEmail, name: receipt.customerName } }],
                    subject,
                    htmlBody: personalizedBody,
                });
            }

            // ── Mark as notified AFTER successful email ───────────────────────
            await updateDoc(pkgRef, {
                notifiedCustomer: true,
                notificationSent: true,
                notificationSentAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            });

            await addDoc(collection(db, 'notifications'), {
                userId: receipt.customerId,
                title: 'Package Received at Warehouse',
                description: `Your package${receipt.trackingNumber ? ` (${receipt.trackingNumber})` : ''} has arrived at our ${receipt.location}.`,
                createdAt: Timestamp.now(),
                read: false,
            });
            success++;
        } catch (e: any) {
            failed++;
            errors.push(`${receipt.customerName}: ${e.message || 'Unknown error'}`);
        }
    }

    return { success, failed, errors };
}

// ─────────────────────────────────────────────────────────────────────────────
// WEEKLY SHIPMENT SYSTEM
// ─────────────────────────────────────────────────────────────────────────────


/** Mark a single package as verified */
export async function verifyPackage(docId: string, adminProfile: UserProfile): Promise<void> {
    const ref = doc(db, 'package_receipts', docId);
    const snap = await getDoc(ref);
    const existing = snap.data();

    await updateDoc(ref, {
        status: 'verified',
        verificationStatus: 'verified',
        verifiedAt: Timestamp.now(),
        verifiedBy: { uid: adminProfile.uid, name: `${adminProfile.firstname} ${adminProfile.lastname}` },
    });

    // Auto-create tracking receipt if one doesn't exist yet
    if (snap.exists() && !existing?.receiptId) {
        try {
            await createTrackingReceipt(docId, adminProfile);
        } catch (e) {
            console.warn('Could not auto-create tracking receipt:', e);
        }
    }
}


/** Revert a verified package back to added */
export async function unverifyPackage(docId: string): Promise<void> {
    const ref = doc(db, 'package_receipts', docId);
    await updateDoc(ref, {
        status: 'inbound',
        verificationStatus: 'pending',
        verifiedAt: null,
        verifiedBy: null,
    });
}

/**
 * Core cron logic — create a weekly shipment from eligible verified packages.
 * Can be called by the cron route OR manually by staff.
 */
export async function createWeeklyShipment(options: {
    auto: boolean;
    adminProfile?: UserProfile;
    nowOverride?: Date;
}): Promise<{ shipments: { shipmentDocId: string; packageCount: number; weekLabel: string; location: string }[] }> {
    const { auto, adminProfile, nowOverride } = options;
    const now = nowOverride ?? new Date();
    const { weekStart, cutoffDate, weekLabel } = getShipmentWindow(now);

    // Find packages within the window that haven't been assigned yet
    const pkgQ = query(
        collection(db, 'package_receipts'),
        where('weeklyShipmentId', '==', null)
    );
    const pkgSnap = await getDocs(pkgQ);

    // Filter by date window client-side (avoids composite index)
    const eligible = pkgSnap.docs.filter(d => {
        const data = d.data();
        const addedAt: Date = (data.notifiedAt as Timestamp).toDate();
        return addedAt >= weekStart && addedAt <= cutoffDate;
    });

    if (eligible.length === 0) {
        throw new Error('No eligible packages found for this shipment window.');
    }

    // Group packages by location
    const packagesByLocation: Record<string, typeof eligible> = {};
    for (const doc of eligible) {
        const loc = doc.data().location || 'Unknown Location';
        if (!packagesByLocation[loc]) {
            packagesByLocation[loc] = [];
        }
        packagesByLocation[loc].push(doc);
    }

    const createdShipments = [];
    const batch = writeBatch(db);

    for (const [location, locationPackages] of Object.entries(packagesByLocation)) {
        // Safe label for the location to use in shipment ID (e.g., "UK Warehouse" -> "UK-Warehouse")
        const safeLocName = location.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
        const locShipmentId = `${weekLabel}-${safeLocName}`;

        // Check if a shipment already exists for this exact week and location
        const existingQ = query(collection(db, 'weekly_shipments'), where('shipmentId', '==', locShipmentId));
        const existingSnap = await getDocs(existingQ);
        if (!existingSnap.empty) {
            console.warn(`Shipment ${locShipmentId} already exists, skipping these packages.`);
            continue;
        }

        const packageDocIds = locationPackages.map(d => d.id);
        const totalWeight = locationPackages.reduce((sum, d) => sum + (d.data().weight || 0), 0);

        // Create weekly_shipments document for this location
        const shipmentRef = doc(collection(db, 'weekly_shipments'));
        const shipmentData = {
            shipmentId: locShipmentId,
            weekStart: Timestamp.fromDate(weekStart),
            cutoffDate: Timestamp.fromDate(cutoffDate),
            location: location,
            packageCount: packageDocIds.length,
            totalWeight,
            packageDocIds,
            createdAutomatically: auto,
            verificationStatus: 'pending',
            notificationStatus: 'pending',
            createdAt: Timestamp.now(),
            createdBy: adminProfile
                ? { uid: adminProfile.uid, name: `${adminProfile.firstname} ${adminProfile.lastname}` }
                : { uid: 'cron', name: 'Automated Cron' },
            verifiedAt: null,
            verifiedBy: null,
        };
        batch.set(shipmentRef, shipmentData);

        // Batch-update all eligible packages in this location
        for (const d of locationPackages) {
            batch.update(doc(db, 'package_receipts', d.id), {
                status: 'shipment_created',
                weeklyShipmentId: shipmentRef.id,
                notificationStatus: 'pending',
            });
        }

        createdShipments.push({
            shipmentDocId: shipmentRef.id,
            packageCount: packageDocIds.length,
            weekLabel: locShipmentId,
            location: location,
        });
    }

    if (createdShipments.length === 0) {
        throw new Error('All eligible packages already have existing shipments for their location.');
    }

    await batch.commit();

    return { shipments: createdShipments };
}

/**
 * Staff: verify a shipment batch and send notifications to all customers.
 * Generates invoices, sends emails, moves packages to inbound.
 */
export async function verifyShipmentAndNotify(
    shipmentDocId: string,
    adminProfile: UserProfile
): Promise<{ notified: number; invoiced: number }> {
    const shipmentRef = doc(db, 'weekly_shipments', shipmentDocId);
    const shipmentSnap = await getDoc(shipmentRef);
    if (!shipmentSnap.exists()) throw new Error('Shipment not found.');

    const shipmentData = shipmentSnap.data();
    if (shipmentData.verificationStatus === 'verified') {
        throw new Error('Shipment already verified and notified.');
    }

    const packageDocIds: string[] = shipmentData.packageDocIds || [];

    const emailSettings = await getEmailSettings();
    let notified = 0;
    let invoiced = 0;

    const batch = writeBatch(db);

    for (const pkgDocId of packageDocIds) {
        const pkgRef = doc(db, 'package_receipts', pkgDocId);
        const pkgSnap = await getDoc(pkgRef);
        if (!pkgSnap.exists()) continue;

        const pkg = pkgSnap.data();

        // Generate invoice
        const invoiceRef = doc(collection(db, 'invoices'));
        const invoiceId = `INV-${shipmentData.shipmentId}-${String(invoiced + 1).padStart(3, '0')}`;
        
        let custAddress = '';
        let custEmail = pkg.customerEmail || '';
        let custPhone = pkg.customerPhone || '';
        let custName = pkg.customerName || '';
        if (pkg.customerId) {
            const custSnap = await getDoc(doc(db, 'users', pkg.customerId));
            if (custSnap.exists()) {
                const custData = custSnap.data();
                custAddress = custData.address || '';
                if (custData.email) custEmail = custData.email;
                custPhone = custData.phone_number || custData.phone || custPhone;
                if (custData.firstname && custData.lastname) {
                    custName = `${custData.firstname} ${custData.lastname}`;
                }
            }
        }

        batch.set(invoiceRef, {
            invoiceId,
            customerId: pkg.customerId,
            customerName: custName,
            customerEmail: custEmail,
            customerPhone: custPhone,
            customerAddress: custAddress,
            packageDocId: pkgDocId,
            trackingNumber: pkg.trackingNumber || '',
            courier: pkg.courier || '',
            description: pkg.comment || pkg.description || '',
            weeklyShipmentId: shipmentDocId,
            shipmentId: shipmentData.shipmentId,
            weight: pkg.weight || 0,
            amount: 0, // Staff edits this
            currency: 'GBP',
            status: 'draft',
            createdAt: Timestamp.now(),
            sentAt: null,
            paidAt: null,
        });

        // Update package
        batch.update(pkgRef, {
            status: 'inbound',
            notificationStatus: 'sent',
            notifiedCustomer: true,
            invoiceStatus: 'draft',
            invoiceId: invoiceRef.id,
            dateReady: Timestamp.now(),
        });

        // In-app notification
        const notifRef = doc(collection(db, 'notifications'));
        batch.set(notifRef, {
            userId: pkg.customerId,
            title: 'Your package is ready for collection',
            description: `Your package${pkg.trackingNumber ? ` (${pkg.trackingNumber})` : ''} has been processed and is now inbound at our ${pkg.location}.`,
            createdAt: Timestamp.now(),
            read: false,
        });

        invoiced++;

        // Send email notification
        if (emailSettings.packageReceivedNotification.enabled) {
            try {
                const { subject, htmlBody } = emailSettings.packageReceivedNotification;
                const firstName = pkg.customerName.split(' ')[0] || pkg.customerName;
                const trackingDisplay = pkg.trackingNumber || 'N/A';
                const trackingListHtml = `<ul><li><strong>${trackingDisplay}</strong></li></ul>`;
                const body = htmlBody
                    .replace(/{{firstname}}/g, firstName)
                    .replace(/{{trackingNumber}}/g, trackingListHtml)
                    .replace(/{{location}}/g, pkg.location || '');
                await sendEmail({
                    to: [{ email_address: { address: pkg.customerEmail, name: pkg.customerName } }],
                    subject,
                    htmlBody: body,
                });
                notified++;
            } catch (e) {
                console.error('Email failed for', pkg.customerEmail, e);
            }
        }
    }

    // Mark shipment as verified + notified
    batch.update(shipmentRef, {
        verificationStatus: 'verified',
        notificationStatus: 'sent',
        verifiedAt: Timestamp.now(),
        verifiedBy: { uid: adminProfile.uid, name: `${adminProfile.firstname} ${adminProfile.lastname}` },
    });

    await batch.commit();
    return { notified, invoiced };
}

/** Update any invoice fields */
export async function updateInvoice(docId: string, data: Record<string, any>): Promise<void> {
    const ref = doc(db, 'invoices', docId);
    const updates: Record<string, any> = { ...data };
    if (data.status === 'paid') updates.paidAt = Timestamp.now();
    if (data.status === 'sent') updates.sentAt = Timestamp.now();
    if (data.dueDate) updates.dueDate = Timestamp.fromDate(new Date(data.dueDate));
    await updateDoc(ref, updates);
}

/** Send an invoice email to the customer and mark as sent */
export async function sendInvoiceToCustomer(
    invoiceDocId: string,
    adminProfile: UserProfile
): Promise<void> {
    const ref = doc(db, 'invoices', invoiceDocId);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error('Invoice not found.');

    const inv = snap.data();
    if (inv.status !== 'ready_to_send' && inv.status !== 'generated') {
        throw new Error('Invoice must be verified before sending.');
    }

    const emailSettings = await getEmailSettings();
    if (emailSettings.packageReceivedNotification.enabled) {
        const body = `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
                <h2 style="color:#2563eb;">Invoice ${inv.invoiceId}</h2>
                <p>Dear ${inv.customerName},</p>
                <p>Please find your invoice details below:</p>
                <table style="width:100%;border-collapse:collapse;margin:16px 0;">
                    <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;">Invoice No.</td><td style="padding:8px;border:1px solid #e5e7eb;">${inv.invoiceId}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;">Tracking ID</td><td style="padding:8px;border:1px solid #e5e7eb;">${inv.trackingNumber || 'N/A'}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;">Shipment</td><td style="padding:8px;border:1px solid #e5e7eb;">${inv.shipmentId}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;">Amount Due</td><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;color:#2563eb;">${inv.currency} ${Number(inv.amount).toFixed(2)}</td></tr>
                </table>
                <p>Please contact us if you have any questions.</p>
                <p style="color:#6b7280;font-size:12px;">County Cargo</p>
            </div>`;
        await sendEmail({
            to: [{ email_address: { address: inv.customerEmail, name: inv.customerName } }],
            subject: `Invoice ${inv.invoiceId} from County Cargo`,
            htmlBody: body,
        });
    }

    await updateDoc(ref, {
        status: 'sent',
        sentAt: Timestamp.now(),
    });
}

/** Delete an invoice */
export async function deleteInvoice(docId: string): Promise<void> {
    await deleteDoc(doc(db, 'invoices', docId));
}

/** Get all weekly shipments (for the Weekly Shipments page) */
export async function getWeeklyShipments(): Promise<any[]> {
    const snap = await getDocs(collection(db, 'weekly_shipments'));
    return snap.docs.map(d => ({ ...d.data(), docId: d.id }));
}

/**
 * Create a tracking receipt for a scanned package.
 * Called immediately after a package row is saved in Batch Add.
 * Stores a doc in `tracking_receipts` and writes receiptId back to the package.
 */
export async function createTrackingReceipt(
    packageDocId: string,
    adminProfile: UserProfile,
): Promise<string> {
    const pkgRef = doc(db, 'package_receipts', packageDocId);
    const pkgSnap = await getDoc(pkgRef);
    if (!pkgSnap.exists()) throw new Error('Package not found');

    const pkg = pkgSnap.data();
    const now = Timestamp.now();

    // Generate receipt ID: RCP-YYYYMMDD-XXXX
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    const receiptId = `RCP-${datePart}-${randPart}`;

    const receiptRef = doc(collection(db, 'tracking_receipts'));
    await setDoc(receiptRef, {
        receiptId,
        packageDocId,
        customerId: pkg.customerId || '',
        customerName: pkg.customerName || '',
        customerEmail: pkg.customerEmail || '',
        trackingNumber: pkg.trackingNumber || '',
        scannedAt: now,
        scannedBy: {
            uid: adminProfile.uid,
            name: `${adminProfile.firstname} ${adminProfile.lastname}`.trim(),
        },
        warehouseLocation: pkg.location || '',
        courier: pkg.courier || '',
        statusAtScan: pkg.status || 'added',
        weight: pkg.weight || 0,
    });

    // Write receiptId back to the package
    await updateDoc(pkgRef, { receiptId: receiptRef.id });

    return receiptRef.id;
}

/**
 * Update a package status (admin) and append to the statusHistory array.
 * Also optionally sets collectionPoint.
 */
export async function updatePackageStatusAdmin(
    packageDocId: string,
    newStatus: string,
    adminProfile: UserProfile,
    options?: { collectionPoint?: string; note?: string },
): Promise<void> {
    const pkgRef = doc(db, 'package_receipts', packageDocId);
    const historyEntry = {
        status: newStatus,
        timestamp: Timestamp.now(),
        updatedBy: {
            uid: adminProfile.uid,
            name: `${adminProfile.firstname} ${adminProfile.lastname}`.trim(),
        },
        ...(options?.note ? { note: options.note } : {}),
    };

    const updatePayload: Record<string, any> = {
        status: newStatus,
        statusHistory: arrayUnion(historyEntry),
    };
    if (options?.collectionPoint !== undefined) {
        updatePayload.collectionPoint = options.collectionPoint;
    }

    await updateDoc(pkgRef, updatePayload);
}

export async function createPackageReceiptWithInvoice(data: Partial<PackageReceipt>, adminProfile: UserProfile): Promise<string> {
    const settings = await getSettings();
    const pkgRef = collection(db, 'package_receipts');
    
    // 1. Calculate Fees
    const weight = data.weight || 0;
    const region = data.region || 'UK';
    const isNG = region === 'NG';
    
    let rate = 0;
    let currency = 'GBP';
    
    if (region === 'UK') {
        rate = settings.ukToLagosRate;
        currency = 'GBP';
    } else if (region === 'US') {
        rate = settings.usToLagosRate;
        currency = 'USD';
    } else {
        rate = settings.valueExportToUKRate; // Default for NG outbound
        currency = 'NGN';
    }

    const handlingCharge = data.handlingCharge || 0;
    const consolidationFee = data.consolidationFee || 0;
    const palletFee = data.palletFee || 0;
    
    const subtotal = (weight * rate) + handlingCharge + consolidationFee + palletFee;
    const totalAmount = subtotal; // Simplified for now

    // 2. Create Package Receipt
    const receiptDoc = await addDoc(pkgRef, {
        ...data,
        status: 'received',
        invoiceStatus: 'unpaid',
        createdAt: Timestamp.now(),
        notifiedAt: Timestamp.now(),
        notifiedBy: { uid: adminProfile.uid, name: `${adminProfile.firstname} ${adminProfile.lastname}` },
        verificationStatus: 'pending'
    });

    // 3. Create Invoice
    const invoiceRef = collection(db, 'invoices');
    const invoiceId = `INV-${Date.now().toString().slice(-6)}`;
    
    let custAddress = '';
    let custEmail = data.customerEmail || '';
    let custPhone = data.customerPhone || '';
    let custName = data.customerName || '';
    if (data.customerId) {
        const custSnap = await getDoc(doc(db, 'users', data.customerId));
        if (custSnap.exists()) {
            const custData = custSnap.data();
            custAddress = custData.address || '';
            if (custData.email) custEmail = custData.email;
            custPhone = custData.phone_number || custData.phone || custPhone;
            if (custData.firstname && custData.lastname) {
                custName = `${custData.firstname} ${custData.lastname}`;
            }
        }
    }

    const invoiceDoc = await addDoc(invoiceRef, {
        invoiceId,
        invoiceDate: Timestamp.now(),
        customerId: data.customerId,
        customerName: custName,
        customerEmail: custEmail,
        customerPhone: custPhone,
        customerAddress: custAddress,
        packageDocId: receiptDoc.id,
        trackingNumber: data.trackingNumber || '',
        courier: data.courier || '',
        description: data.comment || '',
        location: data.location || '',
        weight,
        rate,
        handlingFee: handlingCharge,
        subtotal,
        amount: totalAmount,
        currency,
        status: 'generated',
        paymentStatus: 'unpaid',
        createdAt: Timestamp.now()
    });

    // 4. Link Invoice back to Package
    await updateDoc(receiptDoc, { 
        invoiceId: invoiceId, 
        invoiceDocId: invoiceDoc.id,
        status: 'invoiced'
    });

    return receiptDoc.id;
}

export async function confirmPaymentForPackage(packageDocId: string, adminProfile: UserProfile): Promise<void> {
    const pkgRef = doc(db, 'package_receipts', packageDocId);
    const pkgSnap = await getDoc(pkgRef);
    if (!pkgSnap.exists()) throw new Error("Package not found");
    
    const pkgData = pkgSnap.data() as PackageReceipt;
    
    // Update Package
    await updateDoc(pkgRef, {
        status: 'paid',
        invoiceStatus: 'paid',
        paymentConfirmedAt: Timestamp.now(),
        verificationStatus: 'verified'
    });

    // Update Invoice
    if (pkgData.invoiceId) {
        const invoicesRef = collection(db, 'invoices');
        const q = query(invoicesRef, where('invoiceId', '==', pkgData.invoiceId), limit(1));
        const invSnap = await getDocs(q);
        if (!invSnap.empty) {
            await updateDoc(invSnap.docs[0].ref, {
                status: 'paid',
                paymentStatus: 'paid',
                paidAt: Timestamp.now()
            });
        }
    }
}

/**
 * Admin repair action: fix a package where notification was sent but the package
 * is not visible on the customer dashboard. Sets visibleToCustomer = true,
 * verified = true, status = 'Received at Hub' atomically.
 *
 * Use case: "Notification Sent But Not Visible" error list.
 */
export async function fixPackageDashboardVisibility(
    packageDocId: string,
    adminProfile: UserProfile,
): Promise<void> {
    const pkgRef = doc(db, 'package_receipts', packageDocId);
    const pkgSnap = await getDoc(pkgRef);
    if (!pkgSnap.exists()) throw new Error('Package not found.');

    await updateDoc(pkgRef, {
        visibleToCustomer: true,
        verified: true,
        status: 'inbound', 
        updatedAt: Timestamp.now(),
        statusHistory: arrayUnion({
            status: 'inbound',
            timestamp: Timestamp.now(),
            updatedBy: {
                uid: adminProfile.uid,
                name: `${adminProfile.firstname} ${adminProfile.lastname}`.trim(),
            },
            note: 'Dashboard visibility repaired by admin.',
        }),
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTO-INVOICE SETTINGS
// ─────────────────────────────────────────────────────────────────────────────

export interface AutoInvoiceSettings {
    enabled: boolean;
    defaultDueDays: number;
    currency: string;
}

const DEFAULT_AUTO_INVOICE: AutoInvoiceSettings = { enabled: false, defaultDueDays: 7, currency: 'GBP' };

export async function getAutoInvoiceSettings(): Promise<AutoInvoiceSettings> {
    try {
        const snap = await getDoc(doc(db, 'settings', 'auto_invoice'));
        return snap.exists() ? { ...DEFAULT_AUTO_INVOICE, ...(snap.data() as AutoInvoiceSettings) } : DEFAULT_AUTO_INVOICE;
    } catch { return DEFAULT_AUTO_INVOICE; }
}

export async function saveAutoInvoiceSettings(settings: AutoInvoiceSettings): Promise<void> {
    await setDoc(doc(db, 'settings', 'auto_invoice'), settings, { merge: true });
}

// ─────────────────────────────────────────────────────────────────────────────
// GENERATE INVOICE FOR A PACKAGE
// ─────────────────────────────────────────────────────────────────────────────

export async function generateInvoiceForPackage(
    packageDocId: string,
    adminProfile: UserProfile,
    overrides?: { amount?: number; currency?: string; notes?: string; dueInDays?: number; shipmentId?: string; }
): Promise<{ invoiceId: string; invoiceDocId: string }> {
    const pkgRef = doc(db, 'package_receipts', packageDocId);
    const pkgSnap = await getDoc(pkgRef);
    if (!pkgSnap.exists()) throw new Error('Package not found.');
    const pkg = pkgSnap.data() as Record<string, any>;

    if (pkg.invoiceId) throw new Error(`Invoice ${pkg.invoiceId} already exists for this package.`);

    const settings = await getSettings();
    const autoInvSettings = await getAutoInvoiceSettings();
    const weight = pkg.weight || 0;
    const region = pkg.region || 'UK';
    const rate = region === 'UK' ? settings.ukToLagosRate : region === 'US' ? settings.usToLagosRate : settings.ukToLagosRate;
    const currency = overrides?.currency || (region === 'UK' ? 'GBP' : region === 'US' ? 'USD' : 'NGN');
    const handlingFee = pkg.handlingCharge || 0;
    const subtotal = overrides?.amount ?? ((weight * rate) + handlingFee + (pkg.consolidationFee || 0) + (pkg.palletFee || 0));
    const dueDays = overrides?.dueInDays ?? 0;
    const dueDate = new Date(Date.now() + dueDays * 864e5);
    const invoiceId = `INV-${Date.now().toString().slice(-7)}`;

    let custAddress = '';
    let custEmail = pkg.customerEmail || '';
    let custPhone = pkg.customerPhone || '';
    let custName = pkg.customerName || '';
    if (pkg.customerId) {
        const custSnap = await getDoc(doc(db, 'users', pkg.customerId));
        if (custSnap.exists()) {
            const custData = custSnap.data();
            custAddress = custData.address || '';
            if (custData.email) custEmail = custData.email;
            custPhone = custData.phone_number || custData.phone || custPhone;
            if (custData.firstname && custData.lastname) {
                custName = `${custData.firstname} ${custData.lastname}`;
            }
        }
    }

    const invoiceDoc = await addDoc(collection(db, 'invoices'), {
        invoiceId,
        invoiceDate: Timestamp.now(),
        dueDate: Timestamp.fromDate(dueDate),
        customerId: pkg.customerId || '',
        customerName: custName,
        customerEmail: custEmail,
        customerPhone: custPhone,
        customerAddress: custAddress,
        packageDocId,
        trackingNumber: pkg.trackingNumber || '',
        courier: pkg.courier || pkg.carrier || '',
        description: pkg.description || pkg.comment || '',
        location: pkg.location || '',
        weeklyShipmentId: overrides?.shipmentId || pkg.weeklyShipmentId || null,
        shipmentId: overrides?.shipmentId || pkg.weeklyShipmentId || '',
        weight, rate, handlingFee,
        deliveryFee: 0, storageFee: 0, discount: 0,
        subtotal, amount: subtotal, currency,
        status: 'generated',
        paymentStatus: 'unpaid',
        notes: overrides?.notes || '',
        createdBy: { uid: adminProfile.uid, name: `${adminProfile.firstname} ${adminProfile.lastname}` },
        createdAt: Timestamp.now(),
        sentAt: null, paidAt: null,
    });

    await updateDoc(pkgRef, {
        invoiceId, invoiceDocId: invoiceDoc.id,
        invoiceStatus: 'unpaid', status: 'invoiced',
        updatedAt: Timestamp.now(),
        statusHistory: arrayUnion({ status: 'invoiced', timestamp: Timestamp.now(), updatedBy: { uid: adminProfile.uid, name: `${adminProfile.firstname} ${adminProfile.lastname}` }, note: `Invoice ${invoiceId} generated.` }),
    });

    return { invoiceId, invoiceDocId: invoiceDoc.id };
}

// ─────────────────────────────────────────────────────────────────────────────
// MOVE PACKAGE TO SHIPMENT  (+ optional auto-invoice)
// ─────────────────────────────────────────────────────────────────────────────

export async function movePackageToShipment(
    packageDocId: string,
    adminProfile: UserProfile,
    shipmentId?: string,
): Promise<{ autoInvoiced: boolean; invoiceId?: string }> {
    const pkgRef = doc(db, 'package_receipts', packageDocId);
    const pkgSnap = await getDoc(pkgRef);
    if (!pkgSnap.exists()) throw new Error('Package not found.');
    const pkg = pkgSnap.data();

    await updateDoc(pkgRef, {
        status: 'shipment_created',
        weeklyShipmentId: shipmentId || pkg.weeklyShipmentId || null,
        updatedAt: Timestamp.now(),
        statusHistory: arrayUnion({ status: 'shipment_created', timestamp: Timestamp.now(), updatedBy: { uid: adminProfile.uid, name: `${adminProfile.firstname} ${adminProfile.lastname}` }, note: shipmentId ? `Moved to shipment ${shipmentId}.` : 'Manually moved to shipment.' }),
    });

    const autoSettings = await getAutoInvoiceSettings();
    if (autoSettings.enabled && !pkg.invoiceId) {
        try {
            const { invoiceId } = await generateInvoiceForPackage(packageDocId, adminProfile, { shipmentId });
            return { autoInvoiced: true, invoiceId };
        } catch (e) { console.warn('Auto-invoice failed:', e); }
    }
    return { autoInvoiced: false };
}

export async function bulkMovePackagesToShipment(
    packageDocIds: string[],
    adminProfile: UserProfile,
    shipmentId?: string,
): Promise<{ moved: number; invoiced: number }> {
    let moved = 0; let invoiced = 0;
    for (const id of packageDocIds) {
        try {
            const r = await movePackageToShipment(id, adminProfile, shipmentId);
            moved++;
            if (r.autoInvoiced) invoiced++;
        } catch (e) { console.error(`Failed to move ${id}:`, e); }
    }
    return { moved, invoiced };
}

// ─────────────────────────────────────────────────────────────────────────────
// DIRECT CHAINING: PROCESS STAGED PACKAGES DIRECTLY TO SHIPMENT & INVOICE
// ─────────────────────────────────────────────────────────────────────────────

export async function bulkProcessPackagesToShipmentAndInvoice(
    packageDocIds: string[],
    adminProfile: UserProfile
): Promise<{ shipmentsUpdated: number; invoicesGenerated: number }> {
    if (!packageDocIds?.length) return { shipmentsUpdated: 0, invoicesGenerated: 0 };

    const now = new Date();
    const { weekStart, cutoffDate, weekLabel } = getShipmentWindow(now);
    const packagesByLocation: Record<string, any[]> = {};

    // 1. Load packages grouped by location
    for (const id of packageDocIds) {
        const snap = await getDoc(doc(db, 'package_receipts', id));
        if (snap.exists()) {
            const data = snap.data();
            const loc = data.location || 'Unknown Location';
            if (!packagesByLocation[loc]) packagesByLocation[loc] = [];
            packagesByLocation[loc].push({ id, ...data });
        }
    }

    let shipmentsUpdated = 0;
    let invoicesGenerated = 0;

    for (const [location, locationPackages] of Object.entries(packagesByLocation)) {
        const safeLocName = location.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
        const locShipmentId = `${weekLabel}-${safeLocName}`;

        // Find or create weekly shipment
        const existingQ = query(collection(db, 'weekly_shipments'), where('shipmentId', '==', locShipmentId));
        const existingSnap = await getDocs(existingQ);
        
        let shipmentDocId = '';
        const pkgIdsInThisGroup = locationPackages.map(p => p.id);
        const groupWeight = locationPackages.reduce((sum, p) => sum + (parseFloat(p.weight) || 0), 0);

        if (!existingSnap.empty) {
            const existingDoc = existingSnap.docs[0];
            shipmentDocId = existingDoc.id;
            const existingData = existingDoc.data();
            const existingPkgIds = existingData.packageDocIds || [];
            // Merge unique IDs
            const mergedPkgIds = Array.from(new Set([...existingPkgIds, ...pkgIdsInThisGroup]));
            const additionalWeight = locationPackages
                .filter(p => !existingPkgIds.includes(p.id))
                .reduce((sum, p) => sum + (parseFloat(p.weight) || 0), 0);

            await updateDoc(doc(db, 'weekly_shipments', shipmentDocId), {
                packageDocIds: mergedPkgIds,
                packageCount: mergedPkgIds.length,
                totalWeight: (existingData.totalWeight || 0) + additionalWeight,
                updatedAt: Timestamp.now()
            });
            shipmentsUpdated++;
        } else {
            const shipmentRef = doc(collection(db, 'weekly_shipments'));
            shipmentDocId = shipmentRef.id;
            await setDoc(shipmentRef, {
                shipmentId: locShipmentId,
                weekStart: Timestamp.fromDate(weekStart),
                cutoffDate: Timestamp.fromDate(cutoffDate),
                location: location,
                packageCount: pkgIdsInThisGroup.length,
                totalWeight: groupWeight,
                packageDocIds: pkgIdsInThisGroup,
                createdAutomatically: false,
                verificationStatus: 'pending', // Keep pending so staff can still review or verify&send notifications if desired
                notificationStatus: 'pending',
                createdAt: Timestamp.now(),
                createdBy: { uid: adminProfile.uid, name: `${adminProfile.firstname} ${adminProfile.lastname}` },
                verifiedAt: null,
                verifiedBy: null,
            });
            shipmentsUpdated++;
        }

        // Process packages to shipment and generate invoices in parallel
        const packagePromises = locationPackages.map(async (pkg) => {
            // First update package status and weeklyShipmentId
            const pkgRef = doc(db, 'package_receipts', pkg.id);
            await updateDoc(pkgRef, {
                status: 'invoiced', // transitions fully to invoiced
                weeklyShipmentId: shipmentDocId,
                dateReady: Timestamp.now(),
                updatedAt: Timestamp.now(),
                statusHistory: arrayUnion({
                    status: 'shipment_created',
                    timestamp: Timestamp.now(),
                    updatedBy: { uid: adminProfile.uid, name: `${adminProfile.firstname} ${adminProfile.lastname}` },
                    note: `Instantly processed to shipment ${locShipmentId} and invoiced.`
                })
            });

            // Auto-generate premium invoice if not existing
            if (!pkg.invoiceId) {
                try {
                    await generateInvoiceForPackage(pkg.id, adminProfile, { shipmentId: locShipmentId });
                    return true;
                } catch (e) {
                    console.warn(`Could not generate invoice for ${pkg.id}:`, e);
                }
            }
            return false;
        });

        const results = await Promise.all(packagePromises);
        invoicesGenerated += results.filter(r => r === true).length;
    }

    return { shipmentsUpdated, invoicesGenerated };
}

