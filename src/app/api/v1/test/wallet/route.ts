
import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '../../lib/auth';
import { checkRateLimit } from '../../lib/rate-limiter';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

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

        return NextResponse.json({
            balance: 1000000, // Unlimited test balance
            currency: 'NGN',
            environment: 'staging'
        }, { status: 200, headers: corsHeaders });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: corsHeaders });
    }
}
