import { NextRequest, NextResponse } from 'next/server';
import {
  fetchShipCountyCargoDestinations,
  fetchShipCountyCargoQuote,
} from '@/lib/central-pricing';

// GET handler: Return list of destination countries from Ship County Cargo API
export async function GET() {
  try {
    const countries = await fetchShipCountyCargoDestinations();
    const sorted = [...countries].sort((a, b) => a.Country.localeCompare(b.Country));
    return NextResponse.json({
      countries: sorted
        .filter((c) => c.Country !== 'Nigeria')
        .map((c) => ({
          name: c.Country,
          zone: c.Zone,
        })),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to retrieve destination countries.' },
      { status: 500 }
    );
  }
}

// POST handler: Calculate export quote via Ship County Cargo API
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { origin, destinationCountry, weight, length, width, height } = body;

    const validOrigins = ['Lagos', 'Abuja'];
    const originLocation =
      validOrigins.find((o) => o.toLowerCase() === (origin || '').toLowerCase().trim()) || 'Lagos';

    const originCity =
      originLocation === 'Abuja'
        ? 'Abuja Drop-off (Wuye Market)'
        : 'Lagos Drop-off (Ladipo-Oshodi)';

    const numWeight = Number(weight);
    if (isNaN(numWeight) || numWeight <= 0) {
      return NextResponse.json(
        { error: 'Please enter a valid shipment weight greater than 0 kg.' },
        { status: 400 }
      );
    }

    if (numWeight > 1000) {
      return NextResponse.json(
        {
          error:
            'Shipments over 1,000 kg require a dedicated cargo charter quote. Please contact our commercial cargo team.',
        },
        { status: 400 }
      );
    }

    if (!destinationCountry || typeof destinationCountry !== 'string') {
      return NextResponse.json(
        { error: 'Please select a destination country.' },
        { status: 400 }
      );
    }

    const quoteRes = await fetchShipCountyCargoQuote({
      originCountry: 'Nigeria',
      originCity,
      destinationCountry,
      destinationCity: '',
      weight: numWeight,
      length: length ? Number(length) : undefined,
      width: width ? Number(width) : undefined,
      height: height ? Number(height) : undefined,
      dimensionUnit: 'cm',
      handoverMethod: 'depot',
      category: 'General Goods',
    });

    if (!quoteRes.success || quoteRes.estimates.length === 0) {
      return NextResponse.json(
        { error: quoteRes.error || 'Could not calculate shipping estimate.' },
        { status: 400 }
      );
    }

    const valueEst = quoteRes.estimates.find((e) => e.serviceType === 'valueExport');
    const expressEst = quoteRes.estimates.find((e) => e.serviceType === 'expressExport');
    const specialEst = quoteRes.estimates.find((e) => e.serviceType === 'specialExpressExport');

    const formatQuoteCard = (est: typeof valueEst, recommended = false) => {
      if (!est) return null;
      const symbol = est.currency === 'GBP' ? '£' : est.currency === 'USD' ? '$' : '₦';
      const formattedPrice = `${symbol}${est.estimate.toLocaleString(undefined, {
        minimumFractionDigits: est.currency === 'NGN' ? 0 : 2,
        maximumFractionDigits: est.currency === 'NGN' ? 0 : 2,
      })}`;

      return {
        serviceType: est.serviceType,
        title: est.serviceName,
        tagline: est.description,
        price: est.estimate,
        baseCost: est.baseCost,
        handlingFee: est.handlingFee || 0,
        additionalCharges: est.additionalCharges || [],
        formattedPrice,
        currency: est.currency,
        rate: est.rate,
        billableWeight: est.billableWeight,
        actualWeight: quoteRes.actualWeight,
        volumetricWeight: quoteRes.volumetricWeight,
        weightUnit: est.weightUnit,
        minimumWeight: est.minimumWeight,
        minimumWeightApplied: est.minimumWeightApplied,
        approxNgnEstimate: est.approxNgnEstimate,
        deliveryTime: `Delivery in ${est.estimatedDelivery}`,
        estimatedDelivery: est.estimatedDelivery,
        deliveryMethod: est.deliveryMethod || 'Doorstep delivery',
        carrier:
          est.serviceType === 'expressExport'
            ? 'Shipment via DHL'
            : 'County Cargo Air Network',
        customsNote:
          est.customsInfo || 'Receiver is responsible for customs fees',
        features: est.features || [
          `Delivery in ${est.estimatedDelivery}`,
          est.deliveryMethod || 'Doorstep delivery',
          est.customsInfo || 'Receiver is responsible for customs fees',
        ],
        bookingUrl: est.bookingUrl,
        whatsAppUrl: est.whatsAppUrl,
        recommended,
      };
    };

    return NextResponse.json({
      success: true,
      origin: originLocation,
      originCity,
      destination: quoteRes.destination.country,
      weight: numWeight,
      actualWeight: quoteRes.actualWeight,
      volumetricWeight: quoteRes.volumetricWeight,
      chargeableWeight: quoteRes.chargeableWeight,
      estimates: {
        value: formatQuoteCard(valueEst, false),
        express: formatQuoteCard(expressEst, true),
        specialExpress: formatQuoteCard(specialEst, false),
      },
      rawEstimates: quoteRes.estimates,
    });
  } catch (err: any) {
    console.error('Error calculating export estimate:', err);
    return NextResponse.json(
      { error: err.message || 'Error calculating shipping estimate.' },
      { status: 500 }
    );
  }
}
