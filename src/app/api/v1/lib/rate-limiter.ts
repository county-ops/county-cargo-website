
'use server';

import { db } from '@/lib/firebase';
import { collection, doc, getDoc, setDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { NextResponse } from 'next/server';

const RATE_LIMIT_COUNT = 60; // 60 requests
const RATE_LIMIT_WINDOW_SECONDS = 60; // per minute

const rateLimitsRef = collection(db, 'api_rate_limits');

export async function checkRateLimit(apiKey: string, email?: string): Promise<NextResponse | null> {
    // Use a hash of the API key for the document ID to avoid storing the key directly
    const keyHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(apiKey))
        .then(hashBuffer => Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join(''));
        
    const docRef = doc(rateLimitsRef, keyHash);
    const now = Timestamp.now();
    const isTest = apiKey.startsWith('county_cargo_test_');

    try {
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            await setDoc(docRef, {
                count: 1,
                windowStart: now,
                email: email || null,
                isTest: isTest,
                lastRequest: now,
            });
            return null; // Allow request
        }

        const data = docSnap.data();
        const windowStart = data.windowStart as Timestamp;
        const secondsSinceWindowStart = now.seconds - windowStart.seconds;

        if (secondsSinceWindowStart > RATE_LIMIT_WINDOW_SECONDS) {
            // New window, reset counter
            await updateDoc(docRef, {
                count: 1,
                windowStart: now,
                email: email || data.email || null, // Keep existing email if not provided
                lastRequest: now,
            });
            return null; // Allow request
        }

        // Within current window
        if (data.count >= RATE_LIMIT_COUNT) {
            const timeLeft = RATE_LIMIT_WINDOW_SECONDS - secondsSinceWindowStart;
            const headers = { 'Retry-After': timeLeft.toString() };
            return NextResponse.json({ error: `Rate limit exceeded. Try again in ${timeLeft} seconds.` }, { status: 429, headers });
        }

        await updateDoc(docRef, {
            count: data.count + 1,
            email: email || data.email || null,
            lastRequest: now,
        });

        return null; // Allow request

    } catch (error) {
        console.error("Rate limiting error:", error);
        // Fail open in case of a Firestore error to not block legitimate requests
        return null;
    }
}
