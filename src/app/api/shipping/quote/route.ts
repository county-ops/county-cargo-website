import { NextRequest, NextResponse } from 'next/server';
import {
  calculateCentralQuote,
  ORIGIN_LOCATIONS,
  DESTINATION_CITIES,
  QuoteCalculationParams,
} from '@/lib/central-pricing';

const DHL_COUNTRIES_URL =
  'https://script.google.com/macros/s/AKfycbwswey5v1XMO3FDLfxptcplZJRn6O8nYvM2Wjf5jh0_qOfsdOSmQEoqBZ6hMkG_q18/exec?action=getDHLCountries';

export async function GET() {
  try {
    let dhlCountries: string[] = [];
    try {
      const res = await fetch(DHL_COUNTRIES_URL, { next: { revalidate: 3600 } });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          dhlCountries = data.map((c: any) => c.Country).sort();
        }
      }
    } catch (e) {
      console.warn('Fallback: Unable to fetch live DHL country list in quote API');
    }

    // Default top countries if fetch fails
    if (dhlCountries.length === 0) {
      dhlCountries = [
        'United Kingdom',
        'United States',
        'Canada',
        'Germany',
        'France',
        'China',
        'United Arab Emirates',
        'Australia',
        'India',
        'South Africa',
        'Italy',
        'Ghana',
        'Kenya',
        'Turkey',
      ];
    }

    return NextResponse.json({
      origins: ORIGIN_LOCATIONS,
      destinationCities: DESTINATION_CITIES,
      dhlCountries,
      supportedOriginCountries: ['United Kingdom', 'Nigeria', 'United States'],
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to retrieve quotation system configuration.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as QuoteCalculationParams;

    if (!body.fromCountry || !body.toCountry) {
      return NextResponse.json(
        { error: 'Both origin and destination countries are required.' },
        { status: 400 }
      );
    }

    const weight = Number(body.weight);
    if (isNaN(weight) || weight <= 0) {
      return NextResponse.json(
        { error: 'Weight must be a positive number greater than 0 kg.' },
        { status: 400 }
      );
    }

    const quote = await calculateCentralQuote(body);

    if (!quote.success || quote.error) {
      return NextResponse.json(
        { error: quote.error || 'Could not calculate quote for this route.' },
        { status: 400 }
      );
    }

    return NextResponse.json(quote, { status: 200 });
  } catch (err: any) {
    console.error('Error in central quote route:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error while processing quotation.' },
      { status: 500 }
    );
  }
}
