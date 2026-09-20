import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const PORTAL_TRACK_URL = process.env.PORTAL_TRACK_API_URL || 'https://ship.countycargo.com/api/track';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const rawNumber =
      searchParams.get('number') ||
      searchParams.get('code') ||
      searchParams.get('awb') ||
      searchParams.get('id') ||
      searchParams.get('trackingNumber');

    const cleanNumber = (rawNumber || '').trim().replace(/^#/, '');

    const notFoundResponse = NextResponse.json(
      { error: 'Tracking number not found. Please check the number and try again.' },
      { status: 404 }
    );

    if (!cleanNumber) {
      return notFoundResponse;
    }

    const targetUrl = `${PORTAL_TRACK_URL}?number=${encodeURIComponent(cleanNumber)}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'User-Agent': 'CountyCargoWebsite/1.0',
        },
        cache: 'no-store',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok || !data.success) {
        return NextResponse.json(
          { error: data.error || 'Tracking number not found. Please check the number and try again.' },
          { status: response.status || 404 }
        );
      }

      return NextResponse.json(data, {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      });
    } catch (fetchErr: any) {
      clearTimeout(timeoutId);
      console.error('Error contacting portal tracking API:', fetchErr);
      return notFoundResponse;
    }
  } catch (error: any) {
    console.error('Website /api/track route error:', error);
    return NextResponse.json(
      { error: 'Tracking number not found. Please check the number and try again.' },
      { status: 500 }
    );
  }
}
