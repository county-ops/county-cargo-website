
import { NextRequest, NextResponse } from 'next/server';
import { getShippingEstimate, GetShippingEstimateInput, GetShippingEstimateOutput } from '@/ai/flows/get-shipping-estimate-flow';
import { getSettings } from '@/lib/settings';
import { validateApiKey } from '../../lib/auth';
import { checkRateLimit } from '../../lib/rate-limiter';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request: Request) {
    return new Response(null, {
        status: 204,
        headers: corsHeaders,
    });
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
        if (!userProfile) {
            return NextResponse.json({ error: 'Unauthorized: Invalid API key.' }, { status: 401, headers: corsHeaders });
        }

        const rateLimitResponse = await checkRateLimit(apiKey, userProfile.email);
        if (rateLimitResponse) return rateLimitResponse;
        
        if (userProfile.role !== 'Business') {
            return NextResponse.json({ error: 'Forbidden: This API key does not belong to a Business account.' }, { status: 403, headers: corsHeaders });
        }
        
        const shipmentDetails = await request.json();
        const { originAddress, destinationAddress, packages } = shipmentDetails;

        if (!packages || !originAddress || !destinationAddress) {
             return NextResponse.json({ error: 'Bad Request: The request body must contain originAddress, destinationAddress, and packages.' }, { status: 400, headers: corsHeaders });
        }

        let shipmentType: 'import' | 'export' | undefined;
        let flowAddress: string;
        let flowDestinationAddress: string | undefined;

        if (/nigeria/i.test(destinationAddress)) {
            shipmentType = 'import';
            if (/united states|usa/i.test(originAddress)) flowAddress = "United States";
            else if (/united kingdom|uk/i.test(originAddress)) flowAddress = "United Kingdom";
            else flowAddress = originAddress;
            flowDestinationAddress = destinationAddress;
        } else if (/nigeria/i.test(originAddress)) {
            shipmentType = 'export';
            flowAddress = destinationAddress;
            flowDestinationAddress = undefined;
        } else {
            return NextResponse.json({ error: 'Could not determine shipment type. Either origin or destination must be in Nigeria.' }, { status: 400, headers: corsHeaders });
        }

        const units = (shipmentType === 'import' && /united states|usa/i.test(originAddress)) ? 'imperial' : 'metric';
        
        const estimateInput: GetShippingEstimateInput = {
            address: flowAddress,
            destinationAddress: flowDestinationAddress,
            packages: packages,
            units: units,
            shipmentType: shipmentType,
            customer: userProfile,
            settings: await getSettings()
        };

        const result: GetShippingEstimateOutput = await getShippingEstimate(estimateInput);

        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: 400, headers: corsHeaders });
        }

        // Tag the response as test data for clarity
        return NextResponse.json({ ...result, environment: 'staging' }, { status: 200, headers: corsHeaders });

    } catch (error: any) {
        console.error('Test API Estimate Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: corsHeaders });
    }
}
