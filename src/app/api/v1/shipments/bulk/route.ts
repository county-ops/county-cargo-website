
import { NextRequest, NextResponse } from 'next/server';
import { createShipment, CreateShipmentInput } from '@/ai/flows/create-shipment-flow';
import { validateApiKey } from '../../lib/auth';
import { z } from 'zod';
import { checkRateLimit } from '../../lib/rate-limiter';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const packageSchema = z.object({
    weight: z.number(),
    length: z.number(),
    width: z.number(),
    height: z.number(),
    description: z.string(),
    value: z.number(),
});

const shipperReceiverSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
});

const createShipmentRequestSchema = z.object({
  originAddress: z.string(),
  destinationAddress: z.string(),
  packages: z.array(packageSchema),
  serviceType: z.enum(['expressExport', 'valueExport', 'expressImport', 'valueImport']),
  shipper: shipperReceiverSchema,
  receiver: shipperReceiverSchema,
});

const bulkCreateShipmentRequestSchema = z.array(createShipmentRequestSchema);


export async function OPTIONS(request: Request) {
    return new Response(null, { status: 204, headers: corsHeaders });
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
            return NextResponse.json({ error: 'Forbidden: Invalid API key or not a Business account.' }, { status: 403, headers: corsHeaders });
        }
        
        const body = await request.json();
        const validation = bulkCreateShipmentRequestSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: 'Bad Request: Invalid request body structure.', details: validation.error.flatten() }, { status: 400, headers: corsHeaders });
        }

        const shipmentRequests = validation.data;
        const results = [];
        
        // Process requests sequentially
        for (let i = 0; i < shipmentRequests.length; i++) {
            const req = shipmentRequests[i];
            try {
                const createShipmentInput: CreateShipmentInput = {
                    ...req,
                    customer: userProfile,
                };
                const result = await createShipment(createShipmentInput);
                results.push({ index: i, success: true, data: result });
            } catch (error: any) {
                 results.push({ index: i, success: false, error: error.message || 'An unknown error occurred.' });
            }
        }

        return NextResponse.json(results, { status: 200, headers: corsHeaders });

    } catch (error: any) {
        console.error('API Bulk Create Shipment Error:', error);
        if (error instanceof SyntaxError) {
            return NextResponse.json({ error: 'Bad Request: Invalid JSON in request body.' }, { status: 400, headers: corsHeaders });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: corsHeaders });
    }
}
