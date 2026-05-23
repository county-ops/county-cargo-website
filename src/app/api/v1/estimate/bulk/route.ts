
import { NextRequest, NextResponse } from 'next/server';
import { getShippingEstimate, GetShippingEstimateInput, GetShippingEstimateOutput } from '@/ai/flows/get-shipping-estimate-flow';
import { getSettings } from '@/lib/settings';
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

const estimateRequestSchema = z.object({
    originAddress: z.string(),
    destinationAddress: z.string(),
    packages: z.array(packageSchema),
});

const bulkEstimateRequestSchema = z.array(estimateRequestSchema);

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
        const validation = bulkEstimateRequestSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: 'Bad Request: Invalid request body structure.', details: validation.error.flatten() }, { status: 400, headers: corsHeaders });
        }

        const estimateRequests = validation.data;
        const settings = await getSettings();

        const results = await Promise.all(estimateRequests.map(async (req, index) => {
            try {
                let shipmentType: 'import' | 'export';
                let flowAddress: string;
                let flowDestinationAddress: string | undefined;

                if (/nigeria/i.test(req.destinationAddress)) {
                    shipmentType = 'import';
                    if (/united states|usa/i.test(req.originAddress)) flowAddress = "United States";
                    else if (/united kingdom|uk/i.test(req.originAddress)) flowAddress = "United Kingdom";
                    else flowAddress = req.originAddress;
                    flowDestinationAddress = req.destinationAddress;
                } else if (/nigeria/i.test(req.originAddress)) {
                    shipmentType = 'export';
                    flowAddress = req.destinationAddress;
                    flowDestinationAddress = undefined;
                } else {
                    throw new Error('Could not determine shipment type. Either origin or destination must be in Nigeria.');
                }
                
                const units = (shipmentType === 'import' && /united states|usa/i.test(req.originAddress)) ? 'imperial' : 'metric';

                const estimateInput: GetShippingEstimateInput = {
                    address: flowAddress,
                    destinationAddress: flowDestinationAddress,
                    packages: req.packages,
                    units,
                    shipmentType,
                    customer: userProfile,
                    settings,
                };

                const result = await getShippingEstimate(estimateInput);
                return { index, success: true, data: result };
            } catch (error: any) {
                return { index, success: false, error: error.message || 'An unknown error occurred.' };
            }
        }));

        return NextResponse.json(results, { status: 200, headers: corsHeaders });

    } catch (error: any) {
        console.error('API Bulk Estimate Error:', error);
        if (error instanceof SyntaxError) {
            return NextResponse.json({ error: 'Bad Request: Invalid JSON in request body.' }, { status: 400, headers: corsHeaders });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: corsHeaders });
    }
}
