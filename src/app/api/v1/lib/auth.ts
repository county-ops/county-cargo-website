
import { UserProfile } from '@/lib/types';
import { collection, getDocs, query, where, limit, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { parseFirestoreDate } from '@/lib/utils';

export async function validateApiKey(apiKey: string): Promise<UserProfile | null> {
    if (!apiKey) return null;

    const isProduction = apiKey.startsWith('county_cargo_sk_');
    const isTest = apiKey.startsWith('county_cargo_test_');

    if (!isProduction && !isTest) {
        return null;
    }

    const keyField = isProduction ? 'apiKey' : 'testApiKey';
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where(keyField, '==', apiKey), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return null;
    }

    const userDoc = querySnapshot.docs[0];
    const data = userDoc.data();
     return {
        uid: userDoc.id,
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        phone_number: data.phone_number || '',
        referrer: data.referrer,
        company: data.company,
        phone2: data.phone2,
        country: data.country,
        created_time: parseFirestoreDate(data.created_time),
        role: data.role,
        apiKey: data.apiKey || '',
        testApiKey: data.testApiKey || '',
    } as UserProfile;
}
