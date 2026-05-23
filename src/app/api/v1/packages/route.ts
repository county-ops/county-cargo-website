
import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '../lib/auth';
import { checkRateLimit } from '../lib/rate-limiter';
import {
    collection, addDoc, getDocs, query, where,
    orderBy, limit, Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { parseFirestoreDate } from '@/lib/utils';
import { z } from 'zod';

// ── CORS headers ────────────────────────────────────────────────────────────
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return new Response(null, { status: 204, headers: corsHeaders });
}

// ── Zod schema for incoming package data from ship.countycargo.com ───────────
const PackageSchema = z.object({
    /** The customer's County Cargo account UID (or email if UID unknown) */
    customerId:    z.string().optional(),
    customerName:  z.string(),
    customerEmail: z.string().email(),
    customerPhone: z.string().optional().default(''),

    trackingNumber: z.string().optional().default(''),
    courier:        z.string().optional().default(''),
    sender:         z.string().optional().default(''),
    weight:         z.number().optional().default(0),
    qty:            z.number().int().optional().default(1),
    length:         z.number().optional().nullable(),
    width:          z.number().optional().nullable(),
    height:         z.number().optional().nullable(),
    comment:        z.string().optional().default(''),

    /**
     * Warehouse location. Must be one of:
     * "UK Warehouse" | "US Warehouse" | "Lagos Warehouse" | "Out of State"
     */
    location: z.enum(['UK Warehouse', 'US Warehouse', 'Lagos Warehouse', 'Out of State']),

    /**
     * Region code: "UK" | "US" | "NG"
     * Defaults to location-based inference.
     */
    region: z.enum(['UK', 'US', 'NG']).optional(),

    /** Optional reference ID from ship.countycargo.com */
    externalRef: z.string().optional(),
});

const BulkPackageSchema = z.object({
    packages: z.array(PackageSchema).min(1).max(50),
});

// ── Infer region from location if not provided ────────────────────────────────
function inferRegion(location: string): 'UK' | 'US' | 'NG' {
    if (location.toLowerCase().includes('uk')) return 'UK';
    if (location.toLowerCase().includes('us')) return 'US';
    return 'NG';
}

// ═══════════════════════════════════════════════════════════════════════════════
// POST — Create one or more inbound packages from ship.countycargo.com
// ═══════════════════════════════════════════════════════════════════════════════
export async function POST(request: NextRequest) {
    try {
        // ── Auth ─────────────────────────────────────────────────────────────
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Unauthorized: Missing or malformed Authorization header.' },
                { status: 401, headers: corsHeaders }
            );
        }

        const apiKey = authHeader.split(' ')[1];
        const userProfile = await validateApiKey(apiKey);
        if (!userProfile) {
            return NextResponse.json(
                { error: 'Unauthorized: Invalid API key.' },
                { status: 401, headers: corsHeaders }
            );
        }

        // ── Rate limit ───────────────────────────────────────────────────────
        const rateLimitResponse = await checkRateLimit(apiKey, userProfile.email);
        if (rateLimitResponse) return rateLimitResponse;

        // ── Parse body — accept single package OR bulk array ─────────────────
        const raw = await request.json().catch(() => null);
        if (!raw) {
            return NextResponse.json(
                { error: 'Bad Request: Invalid JSON.' },
                { status: 400, headers: corsHeaders }
            );
        }

        // Normalise: wrap single package into array
        const bodyToValidate = Array.isArray(raw)
            ? { packages: raw }
            : raw.packages
                ? raw
                : { packages: [raw] };

        const validation = BulkPackageSchema.safeParse(bodyToValidate);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Validation failed.', details: validation.error.flatten() },
                { status: 400, headers: corsHeaders }
            );
        }

        const { packages } = validation.data;

        // ── Write each package to package_receipts ────────────────────────────
        const results: { trackingNumber: string; docId: string; status: string }[] = [];
        const errors: { trackingNumber?: string; error: string }[] = [];

        for (const pkg of packages) {
            try {
                const region = pkg.region ?? inferRegion(pkg.location);
                const now = Timestamp.now();

                const docRef = await addDoc(collection(db, 'package_receipts'), {
                    // ── Customer ─────────────────────────────────────────────
                    customerId:    pkg.customerId || '',
                    customerName:  pkg.customerName,
                    customerEmail: pkg.customerEmail,
                    customerPhone: pkg.customerPhone,

                    // ── Package details ───────────────────────────────────────
                    trackingNumber: pkg.trackingNumber,
                    courier:        pkg.courier,
                    sender:         pkg.sender,
                    weight:         pkg.weight,
                    qty:            pkg.qty,
                    length:         pkg.length ?? null,
                    width:          pkg.width ?? null,
                    height:         pkg.height ?? null,
                    comment:        pkg.comment,

                    // ── Location ──────────────────────────────────────────────
                    location: pkg.location,
                    region,

                    // ── Status — arrives as inbound, immediately visible ───────
                    status:            'inbound',
                    verificationStatus: 'pending',
                    verified:          false,
                    visibleToCustomer: true,

                    // ── Notification ──────────────────────────────────────────
                    notifiedAt:        now,
                    notifiedCustomer:  false,
                    notificationSent:  false,
                    notificationSentAt: null,
                    notifiedBy: {
                        uid:  userProfile.uid,
                        name: `${userProfile.firstname} ${userProfile.lastname}`,
                    },

                    // ── Shipment ──────────────────────────────────────────────
                    weeklyShipmentId: null,
                    invoiceId:        null,

                    // ── Source tracking ───────────────────────────────────────
                    source:      'ship.countycargo.com',
                    externalRef: pkg.externalRef ?? null,
                    createdByStaff: {
                        uid:  userProfile.uid,
                        name: `${userProfile.firstname} ${userProfile.lastname}`,
                    },
                    createdAt:  now,
                    updatedAt:  now,
                });

                // ── In-app notification for customer ──────────────────────────
                if (pkg.customerId) {
                    await addDoc(collection(db, 'notifications'), {
                        userId: pkg.customerId,
                        title: 'Package Received at Warehouse',
                        description: `Your package${pkg.trackingNumber ? ` (${pkg.trackingNumber})` : ''} has arrived at our ${pkg.location}.`,
                        href: `/dashboard/my-packages`,
                        createdAt: now,
                        read: false,
                    });
                }

                results.push({
                    trackingNumber: pkg.trackingNumber || '',
                    docId: docRef.id,
                    status: 'inbound',
                });
            } catch (err: any) {
                console.error('Package ingest error:', err);
                errors.push({
                    trackingNumber: pkg.trackingNumber,
                    error: err.message || 'Unknown error',
                });
            }
        }

        return NextResponse.json(
            {
                success: results.length,
                failed: errors.length,
                packages: results,
                errors: errors.length ? errors : undefined,
                message: `${results.length} package(s) added to Inbound. They are now visible in the County Cargo dashboard.`,
            },
            { status: results.length > 0 ? 201 : 400, headers: corsHeaders }
        );

    } catch (error: any) {
        console.error('Packages API error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500, headers: corsHeaders }
        );
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// GET — Retrieve inbound packages visible from this API key's scope
// ═══════════════════════════════════════════════════════════════════════════════
export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Unauthorized: Missing API key.' },
                { status: 401, headers: corsHeaders }
            );
        }

        const apiKey = authHeader.split(' ')[1];
        const userProfile = await validateApiKey(apiKey);
        if (!userProfile) {
            return NextResponse.json(
                { error: 'Unauthorized: Invalid API key.' },
                { status: 401, headers: corsHeaders }
            );
        }

        const rateLimitResponse = await checkRateLimit(apiKey, userProfile.email);
        if (rateLimitResponse) return rateLimitResponse;

        const url = new URL(request.url);
        const pageSize = Math.min(parseInt(url.searchParams.get('limit') ?? '50'), 200);
        const sourceFilter = url.searchParams.get('source'); // optional ?source=ship.countycargo.com

        // Build query
        let q = query(
            collection(db, 'package_receipts'),
            where('status', 'in', ['inbound', 'verified', 'shipment_created', 'invoiced']),
            orderBy('notifiedAt', 'desc'),
            limit(pageSize)
        );

        const snap = await getDocs(q);
        let packages = snap.docs.map(d => {
            const data = d.data();
            return {
                docId: d.id,
                trackingNumber: data.trackingNumber,
                customerName:   data.customerName,
                customerEmail:  data.customerEmail,
                location:       data.location,
                status:         data.status,
                source:         data.source ?? 'admin',
                externalRef:    data.externalRef ?? null,
                notifiedAt:     parseFirestoreDate(data.notifiedAt)?.toISOString() || new Date().toISOString(),
                invoiceId:      data.invoiceId ?? null,
            };
        });

        // Optional filter by source
        if (sourceFilter) {
            packages = packages.filter(p => p.source === sourceFilter);
        }

        return NextResponse.json(
            { count: packages.length, packages },
            { status: 200, headers: corsHeaders }
        );

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500, headers: corsHeaders }
        );
    }
}
