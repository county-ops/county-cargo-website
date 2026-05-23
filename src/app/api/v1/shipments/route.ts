
import { NextRequest, NextResponse } from 'next/server';
import { createShipment, CreateShipmentInput } from '@/ai/flows/create-shipment-flow';
import { validateApiKey } from '../lib/auth';
import { z } from 'zod';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { checkRateLimit } from '../lib/rate-limiter';
import { parseFirestoreDate } from '@/lib/utils';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Zod schema for request body validation
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
  shipper: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
  }),
  receiver: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
  }),
});


export async function OPTIONS(request: Request) {
    return new Response(null, {
        status: 204,
        headers: corsHeaders,
    });
}

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized: Missing API key.' }, { status: 401, headers: corsHeaders });
        }

        const apiKey = authHeader.split(' ')[1];
        
        // 1. Validate API Key
        const userProfile = await validateApiKey(apiKey);
        if (!userProfile) {
            return NextResponse.json({ error: 'Unauthorized: Invalid API key.' }, { status: 401, headers: corsHeaders });
        }

        // 2. Check Rate Limit with Attribution
        const rateLimitResponse = await checkRateLimit(apiKey, userProfile.email);
        if (rateLimitResponse) return rateLimitResponse;

        if (userProfile.role !== 'Business') {
            return NextResponse.json({ error: 'Forbidden: This API key does not belong to a Business account.' }, { status: 403, headers: corsHeaders });
        }
        
        // Fetch shipments for the user
        const shipmentsQuery = query(
            collection(db, 'shipments'),
            where('userId', '==', userProfile.uid)
        );
        const shipmentsSnapshot = await getDocs(shipmentsQuery);

        if (shipmentsSnapshot.empty) {
            return NextResponse.json([], { status: 200, headers: corsHeaders });
        }
        
        const shipments = shipmentsSnapshot.docs.map(shipmentDoc => {
            const shipmentData = shipmentDoc.data();
            const bookingDate = parseFirestoreDate(shipmentData.bookingDate);
            const estimatedDelivery = parseFirestoreDate(shipmentData.estimatedDelivery);

            return {
                id: shipmentData.id,
                status: shipmentData.status,
                paymentStatus: shipmentData.paymentStatus,
                bookingDate: bookingDate,
                estimatedDelivery: estimatedDelivery,
                origin: shipmentData.originAddress,
                destination: shipmentData.destinationAddress,
                service: shipmentData.serviceType,
                totalCost: parseFloat(shipmentData.totalCost || '0'),
            };
        });

        // Manual sort by bookingDate descending
        shipments.sort((a, b) => {
            const dateA = a.bookingDate ? new Date(a.bookingDate).getTime() : 0;
            const dateB = b.bookingDate ? new Date(b.bookingDate).getTime() : 0;
            return dateB - dateA;
        });

        return NextResponse.json(shipments, { status: 200, headers: corsHeaders });

    } catch (error: any) {
        console.error('API List Shipments Error:', error);
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

        // 1. Validate API Key
        const userProfile = await validateApiKey(apiKey);
        if (!userProfile) {
            return NextResponse.json({ error: 'Unauthorized: Invalid API key.' }, { status: 401, headers: corsHeaders });
        }

        // 2. Check Rate Limit with Attribution
        const rateLimitResponse = await checkRateLimit(apiKey, userProfile.email);
        if (rateLimitResponse) return rateLimitResponse;
        
        if (userProfile.role !== 'Business') {
            return NextResponse.json({ error: 'Forbidden: This API key does not belong to a Business account.' }, { status: 403, headers: corsHeaders });
        }
        
        const body = await request.json();
        
        const validation = requestBodySchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: 'Bad Request: Invalid request body.', details: validation.error.flatten() }, { status: 400, headers: corsHeaders });
        }

        const createShipmentInput: CreateShipmentInput = {
            ...validation.data,
            customer: userProfile,
        };

        const result = await createShipment(createShipmentInput);

        return NextResponse.json(result, { status: 201, headers: corsHeaders });

    } catch (error: any) {
        console.error('API Create Shipment Error:', error);
        if (error instanceof SyntaxError) {
            return NextResponse.json({ error: 'Bad Request: Invalid JSON in request body.' }, { status: 400, headers: corsHeaders });
        }
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500, headers: corsHeaders });
    }
}
