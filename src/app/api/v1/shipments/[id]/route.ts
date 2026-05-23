
import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs, query, where, limit, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { validateApiKey } from '../../lib/auth';
import { updateShipmentStatuses } from '@/lib/user-actions';
import { checkRateLimit } from '../../lib/rate-limiter';
import { parseFirestoreDate } from '@/lib/utils';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};


export async function OPTIONS(request: Request) {
    return new Response(null, {
        status: 204,
        headers: corsHeaders,
    });
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
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
        
        const shipmentId = id;

        const shipmentQuery = query(collection(db, 'shipments'), where('id', '==', shipmentId), limit(1));
        const shipmentSnapshot = await getDocs(shipmentQuery);

        if (shipmentSnapshot.empty) {
            return NextResponse.json({ error: 'Shipment not found.' }, { status: 404, headers: corsHeaders });
        }
        
        const shipmentDoc = shipmentSnapshot.docs[0];
        const shipmentData = shipmentDoc.data();

        // Security check
        if (shipmentData.userId !== userProfile.uid) {
            return NextResponse.json({ error: 'Forbidden: You do not have access to this shipment.' }, { status: 403, headers: corsHeaders });
        }

        const bookingDate = parseFirestoreDate(shipmentData.bookingDate);
        const estimatedDelivery = parseFirestoreDate(shipmentData.estimatedDelivery);

        const response = {
            id: shipmentData.id,
            status: shipmentData.status,
            paymentStatus: shipmentData.paymentStatus,
            bookingDate: bookingDate,
            estimatedDelivery: estimatedDelivery,
            origin: shipmentData.originAddress,
            destination: shipmentData.destinationAddress,
            service: shipmentData.serviceType,
            totalCost: parseFloat(shipmentData.totalCost || '0'),
            packages: shipmentData.packages
        };

        return NextResponse.json(response, { status: 200, headers: corsHeaders });

    } catch (error: any) {
        console.error('API Get Shipment Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: corsHeaders });
    }
}


export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
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
        
        const shipmentId = id;

        const shipmentQuery = query(collection(db, 'shipments'), where('id', '==', shipmentId), limit(1));
        const shipmentSnapshot = await getDocs(shipmentQuery);

        if (shipmentSnapshot.empty) {
            return NextResponse.json({ error: 'Shipment not found.' }, { status: 404, headers: corsHeaders });
        }
        
        const shipmentDoc = shipmentSnapshot.docs[0];
        const shipmentData = shipmentDoc.data();

        if (shipmentData.userId !== userProfile.uid) {
            return NextResponse.json({ error: 'Forbidden: You do not have access to this shipment.' }, { status: 403, headers: corsHeaders });
        }
        
        const cancellableStatuses = ['Unpaid', 'Awaiting Confirmation'];
        if (!cancellableStatuses.includes(shipmentData.status)) {
            return NextResponse.json({ error: `Shipment cannot be cancelled. Status is currently "${shipmentData.status}".` }, { status: 400, headers: corsHeaders });
        }
        
        await updateShipmentStatuses([shipmentDoc.id], 'Cancelled');
        
        return NextResponse.json({
            id: shipmentData.id,
            status: 'Cancelled',
            message: 'Shipment has been successfully cancelled.'
        }, { status: 200, headers: corsHeaders });

    } catch (error: any) {
        console.error('API Cancel Shipment Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: corsHeaders });
    }
}
