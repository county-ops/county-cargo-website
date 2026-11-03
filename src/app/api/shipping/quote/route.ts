import { NextRequest, NextResponse } from 'next/server';
import {
  calculateCentralQuote,
  fetchShipCountyCargoDestinations,
  fetchShipCountyCargoQuote,
} from '@/lib/central-pricing';

/**
 * GET /api/shipping/quote
 * Proxies Ship County Cargo's export destinations list (https://ship.countycargo.com/api/export-destinations)
 * while keeping server-side API credentials secure.
 */
export async function GET() {
  try {
    const destinations = await fetchShipCountyCargoDestinations();
    const sorted = [...destinations].sort((a, b) => a.Country.localeCompare(b.Country));
    return NextResponse.json({
      success: true,
      destinations: sorted,
      countries: sorted.map((d) => d.Country),
    });
  } catch (err: any) {
    console.error('Error in GET /api/shipping/quote:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve shipping destinations.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/shipping/quote
 * Connects directly to Ship County Cargo's live quotation API (https://ship.countycargo.com/api/quote)
 * so both websites use the exact same rates, volumetric weight formulas, minimum weights, and fees.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const originCountry = body.originCountry || body.fromCountry || '';
    const originCity = body.originCity || body.fromCity || '';
    const destinationCountry = body.destinationCountry || body.toCountry || '';
    const destinationCity = body.destinationCity ?? body.toCity ?? '';
    const weight = Number(body.weight);
    const length = body.length ? Number(body.length) : undefined;
    const width = body.width ? Number(body.width) : undefined;
    const height = body.height ? Number(body.height) : undefined;
    const dimensionUnit = body.dimensionUnit === 'in' ? 'in' : body.dimensionUnit === 'cm' ? 'cm' : undefined;
    const handoverMethod =
      body.handoverMethod === 'collection' || body.collectionType === 'collection'
        ? 'collection'
        : 'depot';

    const [shipApiResult, centralResult] = await Promise.all([
      fetchShipCountyCargoQuote({
        originCountry,
        originCity,
        destinationCountry,
        destinationCity,
        weight,
        length,
        width,
        height,
        dimensionUnit,
        handoverMethod,
        category: body.category || body.packageCategory || 'General Goods',
      }),
      calculateCentralQuote({
        fromCountry: originCountry,
        fromCity: originCity,
        toCountry: destinationCountry,
        toCity: destinationCity,
        weight,
        length,
        width,
        height,
        dimensionUnit,
        itemDescription: body.itemDescription,
        packageCategory: body.packageCategory || body.category,
        collectionType: handoverMethod === 'collection' ? 'collection' : 'dropoff',
      }),
    ]);

    if (!shipApiResult.success) {
      return NextResponse.json(
        {
          ...centralResult,
          ...shipApiResult,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ...centralResult,
      origin: shipApiResult.origin,
      destination: shipApiResult.destination,
      weight: shipApiResult.weight,
      actualWeight: shipApiResult.actualWeight,
      volumetricWeight: shipApiResult.volumetricWeight,
      chargeableWeight: shipApiResult.chargeableWeight,
      units: shipApiResult.units,
      weightUnit: shipApiResult.weightUnit,
      dimensionUnit: shipApiResult.dimensionUnit,
      handoverMethod: shipApiResult.handoverMethod,
      estimates: shipApiResult.estimates,
      source: shipApiResult.source,
    });
  } catch (err: any) {
    console.error('Error in POST /api/shipping/quote:', err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Internal server error calculating shipping quote.',
      },
      { status: 500 }
    );
  }
}
