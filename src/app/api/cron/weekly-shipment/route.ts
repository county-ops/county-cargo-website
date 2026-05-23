import { NextRequest, NextResponse } from 'next/server';
import { createWeeklyShipment } from '@/lib/user-actions';

/**
 * POST /api/cron/weekly-shipment
 *
 * Trigger: Every Wednesday at 17:00 Europe/London time.
 * Authorization: Bearer <CRON_SECRET> header required.
 *
 * Can be called by:
 *  - Firebase Cloud Scheduler
 *  - GitHub Actions
 *  - cron-job.org
 *  - Any HTTP scheduler
 *  - The "Run Now" button in the Weekly Shipments admin page
 *
 * Example curl:
 *   curl -X POST https://your-domain.com/api/cron/weekly-shipment \
 *     -H "Authorization: Bearer cc-weekly-cron-2025-secure-key"
 */
export async function POST(req: NextRequest) {
    // 1. Authenticate
    const authHeader = req.headers.get('authorization') || '';
    const secret = process.env.CRON_SECRET;

    if (!secret || authHeader !== `Bearer ${secret}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Validate UK time — only process if it's Wednesday and past 17:00 UK
    const now = new Date();
    const ukDow = parseInt(
        new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', weekday: 'short' })
            .format(now)
            .slice(0, 3) === 'Wed' ? '3' : '0'
    );
    // Allow up to 1 hour window after cutoff (17:00–18:00 UK) or bypass via ?force=1
    const force = req.nextUrl.searchParams.get('force') === '1';
    const ukHour = parseInt(
        new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: 'numeric', hour12: false })
            .format(now)
    );
    const isWednesdayAfterCutoff =
        new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', weekday: 'short' }).format(now) === 'Wed' &&
        ukHour >= 17;

    if (!force && !isWednesdayAfterCutoff) {
        return NextResponse.json({
            skipped: true,
            reason: 'Not Wednesday after 17:00 UK. Use ?force=1 to override.',
            ukTime: new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Europe/London',
                weekday: 'long', hour: '2-digit', minute: '2-digit',
            }).format(now),
        });
    }

    // 3. Run shipment creation
    try {
        const result = await createWeeklyShipment({ auto: true });
        return NextResponse.json({
            success: true,
            shipments: result.shipments,
        });
    } catch (e: any) {
        // "already exists" is not a server error — return 200 with message
        if (e.message?.includes('already exists')) {
            return NextResponse.json({ success: false, reason: e.message });
        }
        console.error('[Cron] Weekly shipment error:', e);
        return NextResponse.json({ error: e.message || 'Internal error' }, { status: 500 });
    }
}

// Health check
export async function GET() {
    const now = new Date();
    return NextResponse.json({
        status: 'ok',
        ukTime: new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Europe/London',
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
        }).format(now),
        schedule: 'Every Wednesday at 17:00 Europe/London',
    });
}
