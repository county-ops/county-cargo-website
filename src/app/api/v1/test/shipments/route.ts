
import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '../../lib/auth';
import { z } from 'zod';
import { collection, getDocs, query, where, Timestamp, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { checkRateLimit } from '../../lib/rate-limiter';
import { parseFirestoreDate } from '@/lib/utils';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const requestBodySchema = z.object({
  originAddress: z.string(),
  destinationAddress: z.string(),
  packages: z.array(z.object({
    weight: z.number(),
    length: z.number(),
    width: z.number(),
    height: z.number(),
    description: z.string(),
    value: z.number(),
  })),
  serviceType: z.enum(['expressExport', 'valueExport', 'expressImport', 'valueImport']),
  shipper: z.object({ name: z.string(), email: z.string().email(), phone: z.string() }),
  receiver: z.object({ name: z.string(), email: z.string().email(), phone: z.string() }),
});

export async function OPTIONS(request: Request) {
    return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized: Missing API key.' }, { status: 401, headers: corsHeaders });
        }
        const apiKey = authHeader.split(' ')[1];
        if (!apiKey.startsWith('county_cargo_test_')) {
            return NextResponse.json({ error: 'Forbidden: Use a Test API Key for the Staging API.' }, { status: 403, headers: corsHeaders });
        }
        
        const userProfile = await validateApiKey(apiKey);
        if (!userProfile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

        const rateLimitResponse = await checkRateLimit(apiKey, userProfile.email);
        if (rateLimitResponse) return rateLimitResponse;

        // Fetching without orderBy to avoid composite index requirement in sandbox
        const q = query(collection(db, 'test_shipments'), where('userId', '==', userProfile.uid));
        const snapshot = await getDocs(q);

        const shipments = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: data.id,
                status: data.status,
                paymentStatus: data.paymentStatus,
                bookingDate: parseFirestoreDate(data.bookingDate),
                origin: data.originAddress,
                destination: data.destinationAddress,
                totalCost: parseFloat(data.totalCost || '0'),
                environment: 'staging'
            };
        });

        // Perform manual sort by bookingDate descending
        shipments.sort((a, b) => {
            const dateA = a.bookingDate ? new Date(a.bookingDate).getTime() : 0;
            const dateB = b.bookingDate ? new Date(b.bookingDate).getTime() : 0;
            return dateB - dateA;
        });

        return NextResponse.json(shipments, { status: 200, headers: corsHeaders });
    } catch (error: any) {
        console.error('Test API List Shipments Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500, headers: corsHeaders });
    }
}

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized: Missing API key.' }, { status: 401, headers: corsHeaders });
        }
        const apiKey = authHeader.split(' ')[1];
        if (!apiKey.startsWith('county_cargo_test_')) {
            return NextResponse.json({ error: 'Forbidden: Use a Test API Key for the Staging API.' }, { status: 403, headers: corsHeaders });
        }

        const userProfile = await validateApiKey(apiKey);
        if (!userProfile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

        const rateLimitResponse = await checkRateLimit(apiKey, userProfile.email);
        if (rateLimitResponse) return rateLimitResponse;

        const body = await request.json();
        const validation = requestBodySchema.safeParse(body);
        if (!validation.success) return NextResponse.json({ error: 'Bad Request', details: validation.error.flatten() }, { status: 400, headers: corsHeaders });

        const data = validation.data;
        
        // Use a static test ID
        const uniqueId = `TEST-${Math.floor(100000 + Math.random() * 900000)}`;
        
        const shipmentData = {
            ...data,
            id: uniqueId,
            userId: userProfile.uid,
            status: 'Unpaid',
            paymentStatus: 'Unpaid',
            bookingDate: serverTimestamp(),
            isTest: true,
            totalCost: "5000", // Fixed price for testing
            environment: 'staging'
        };

        await addDoc(collection(db, 'test_shipments'), shipmentData);

        return NextResponse.json({
            shipmentId: uniqueId,
            totalCost: 5000,
            status: 'Unpaid',
            environment: 'staging',
            message: 'This is a test shipment and will not be processed.'
        }, { status: 201, headers: corsHeaders });

    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500, headers: corsHeaders });
    }
}
