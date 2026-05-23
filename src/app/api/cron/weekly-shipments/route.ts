import { NextResponse } from 'next/server';
import { createWeeklyShipment } from '@/lib/user-actions';

// Vercel Cron or Cloud Scheduler can call this route
export async function GET(request: Request) {
  try {
    // Basic authorization check (if you set up a cron secret)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Call the automated weekly shipment logic
    const result = await createWeeklyShipment({ auto: true });
    
    return NextResponse.json({
      success: true,
      message: `${result.shipments.length} shipment(s) created successfully.`,
      data: result
    });
  } catch (error: any) {
    if (error.message.includes('No eligible verified packages found')) {
      return NextResponse.json({ success: true, message: 'No packages to batch this week.' });
    }
    if (error.message.includes('already have existing shipments')) {
      return NextResponse.json({ success: true, message: 'Shipments already created for eligible packages.' });
    }
    console.error('Error in weekly shipments cron:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
