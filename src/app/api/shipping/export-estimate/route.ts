import { NextRequest, NextResponse } from 'next/server';

interface DhlCountry {
  Country: string;
  Zone: number;
}

interface DhlPricing {
  Zone: number;
  [weightKey: string]: any;
}

// In-memory caching for DHL Countries and Pricing
let cachedCountries: { data: DhlCountry[]; timestamp: number } | null = null;
let cachedPricing: { data: DhlPricing[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour TTL

const DHL_COUNTRIES_URL =
  'https://script.google.com/macros/s/AKfycbwswey5v1XMO3FDLfxptcplZJRn6O8nYvM2Wjf5jh0_qOfsdOSmQEoqBZ6hMkG_q18/exec?action=getDHLCountries';
const DHL_PRICING_URL =
  'https://script.google.com/macros/s/AKfycbyb3DOEM-JTAw_k8hAz7FKsKRusqlruMrshBebwoMZzY4M34YhkmX3GTYuGKw9gAJ_U/exec?action=getDHLExportPricing';

async function getDhlCountries(): Promise<DhlCountry[]> {
  if (cachedCountries && Date.now() - cachedCountries.timestamp < CACHE_TTL_MS) {
    return cachedCountries.data;
  }

  try {
    const res = await fetch(DHL_COUNTRIES_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = (await res.json()) as DhlCountry[];
    if (Array.isArray(data) && data.length > 0) {
      cachedCountries = { data, timestamp: Date.now() };
      return data;
    }
  } catch (err) {
    console.error('Failed to fetch fresh DHL countries:', err);
    if (cachedCountries) return cachedCountries.data;
  }

  return [];
}

async function getDhlPricing(): Promise<DhlPricing[]> {
  if (cachedPricing && Date.now() - cachedPricing.timestamp < CACHE_TTL_MS) {
    return cachedPricing.data;
  }

  try {
    const res = await fetch(DHL_PRICING_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = (await res.json()) as DhlPricing[];
    if (Array.isArray(data) && data.length > 0) {
      cachedPricing = { data, timestamp: Date.now() };
      return data;
    }
  } catch (err) {
    console.error('Failed to fetch fresh DHL pricing:', err);
    if (cachedPricing) return cachedPricing.data;
  }

  return [];
}

// GET handler: Return list of destination countries
export async function GET() {
  try {
    const countries = await getDhlCountries();
    const sorted = [...countries].sort((a, b) => a.Country.localeCompare(b.Country));
    return NextResponse.json({
      countries: sorted.map((c) => ({
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

// POST handler: Calculate quote for origin, destination, and weight
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { origin, destinationCountry, weight } = body;

    // Validate origin
    const validOrigins = ['Lagos', 'Abuja'];
    const originLocation = validOrigins.find(
      (o) => o.toLowerCase() === (origin || '').toLowerCase().trim()
    ) || 'Lagos';

    // Validate weight
    const numWeight = Number(weight);
    if (isNaN(numWeight) || numWeight <= 0) {
      return NextResponse.json(
        { error: 'Please enter a valid shipment weight greater than 0 kg.' },
        { status: 400 }
      );
    }

    if (numWeight > 1000) {
      return NextResponse.json(
        { error: 'Shipments over 1,000 kg require a dedicated cargo charter quote. Please contact our commercial cargo team.' },
        { status: 400 }
      );
    }

    // Validate destination
    if (!destinationCountry || typeof destinationCountry !== 'string') {
      return NextResponse.json(
        { error: 'Please select a destination country.' },
        { status: 400 }
      );
    }

    const [countries, pricing] = await Promise.all([getDhlCountries(), getDhlPricing()]);

    if (!countries.length || !pricing.length) {
      return NextResponse.json(
        { error: 'Shipping rate engine temporarily unavailable. Please try again or contact support.' },
        { status: 503 }
      );
    }

    // Lookup destination country
    const normalizedDest = destinationCountry.trim().toLowerCase();
    let matchedCountry = countries.find(
      (c) => c.Country.toLowerCase() === normalizedDest
    );

    if (!matchedCountry) {
      // Fuzzy matching for common aliases
      if (normalizedDest.includes('united states') || normalizedDest === 'usa' || normalizedDest === 'us') {
        matchedCountry = countries.find((c) => c.Country === 'United States');
      } else if (normalizedDest.includes('united kingdom') || normalizedDest === 'uk' || normalizedDest === 'great britain') {
        matchedCountry = countries.find((c) => c.Country === 'United Kingdom');
      } else if (normalizedDest.includes('emirates') || normalizedDest.includes('dubai') || normalizedDest === 'uae') {
        matchedCountry = countries.find((c) => c.Country === 'United Arab Emirates');
      } else {
        matchedCountry = countries.find((c) =>
          c.Country.toLowerCase().includes(normalizedDest) ||
          normalizedDest.includes(c.Country.toLowerCase())
        );
      }
    }

    if (!matchedCountry) {
      return NextResponse.json(
        { error: `Destination country '${destinationCountry}' is not currently serviced or recognized.` },
        { status: 404 }
      );
    }

    const zoneId = matchedCountry.Zone;
    const zonePricing = pricing.find((z) => z.Zone === zoneId);

    if (!zonePricing) {
      return NextResponse.json(
        { error: `Pricing not configured for Zone ${zoneId} (${matchedCountry.Country}).` },
        { status: 404 }
      );
    }

    // 1. Calculate Express Export (via DHL Express / Global Network)
    let expressLookupWeight = 0.5;
    if (numWeight <= 30) {
      expressLookupWeight = Math.ceil(numWeight * 2) / 2; // nearest 0.5 kg
    } else {
      expressLookupWeight = Math.ceil(numWeight); // nearest 1 kg
    }
    if (expressLookupWeight < 0.5) expressLookupWeight = 0.5;

    let expressBaseCost = 0;
    if (expressLookupWeight <= 70) {
      const weightKey = `${expressLookupWeight.toFixed(1)}kg`;
      expressBaseCost = Number(zonePricing[weightKey]);
    } else {
      // Over 70kg freight rate per kg calculation using Zone 70kg tier + per kg increment
      const base70 = Number(zonePricing['70.0kg']) || 0;
      const extraKg = expressLookupWeight - 70;
      const perKgRate = (Number(zonePricing['70.0kg']) - Number(zonePricing['60.0kg'])) / 10;
      expressBaseCost = base70 + (extraKg * (perKgRate > 0 ? perKgRate : 25000));
    }

    // Add standard handling/VAT surcharge (8.28% administrative & handling charge)
    // Matches ₦417,334.73 * 1.082855 = ₦451,913 exactly for 16kg US from Abuja
    const expressHandlingMultiplier = 1.082855;
    const expressBaseFinalCost = Math.round(expressBaseCost * expressHandlingMultiplier);

    const packagingRatePerKg = 2000;
    const packagingCharge = Math.round(expressLookupWeight * packagingRatePerKg);
    const expressFinalCost = expressBaseFinalCost + packagingCharge;

    // Delivery times by region
    let expressTransitTime = '3–5 working days';
    if (['United Kingdom', 'France', 'Germany', 'Italy', 'Netherlands', 'Belgium', 'Spain'].includes(matchedCountry.Country)) {
      expressTransitTime = '3–5 working days';
    } else if (['United States', 'Canada'].includes(matchedCountry.Country)) {
      expressTransitTime = '3–5 working days';
    } else if (['China', 'United Arab Emirates', 'India'].includes(matchedCountry.Country)) {
      expressTransitTime = '3–6 working days';
    } else {
      expressTransitTime = '4–7 working days';
    }

    const expressQuote = {
      serviceType: 'expressExport',
      title: 'Express Export',
      tagline: 'Fast international shipping from Nigeria.',
      price: expressFinalCost,
      formattedPrice: `₦${expressFinalCost.toLocaleString()}`,
      currency: 'NGN',
      billableWeight: expressLookupWeight,
      deliveryTime: `Delivery in ${expressTransitTime}`,
      deliveryMethod: 'Doorstep delivery',
      carrier: 'Shipment via DHL Express',
      customsNote: 'Receiver is responsible for customs fees & destination duties',
      features: [
        `Delivery in ${expressTransitTime}`,
        'Doorstep delivery',
        'Shipment via DHL Express',
        'Receiver is responsible for customs fees',
      ],
      recommended: true,
    };

    // 2. Calculate Standard / Value Export (where available)
    let valueQuote: any = null;
    const isUS = matchedCountry.Country === 'United States';
    const isUK = matchedCountry.Country === 'United Kingdom';
    const isCanada = matchedCountry.Country === 'Canada';

    if (isUS) {
      // Abuja: ₦17,000/kg; Lagos: ₦16,000/kg (min weight 10kg)
      const perKg = originLocation.toLowerCase() === 'abuja' ? 17000 : 16000;
      const billableWeight = Math.max(numWeight, 10);
      const valueCost = perKg * billableWeight;
      valueQuote = {
        serviceType: 'valueExport',
        title: 'Value Export',
        tagline: 'Economical shipping from Nigeria.',
        price: valueCost,
        formattedPrice: `₦${valueCost.toLocaleString()}`,
        currency: 'NGN',
        billableWeight,
        deliveryTime: 'Delivery in 10–15 working days',
        deliveryMethod: 'Doorstep delivery',
        carrier: 'County Cargo Consolidated Air',
        customsNote: '15% additional tariff on declared value applies',
        features: [
          'Delivery in 10–15 working days',
          'Doorstep delivery',
          '15% additional tariff on declared value applies',
          'Minimum billable weight: 10 kg',
        ],
      };
    } else if (isUK) {
      // Abuja: ₦11,000/kg; Lagos: ₦10,500/kg (min weight 10kg)
      const perKg = originLocation.toLowerCase() === 'abuja' ? 11000 : 10500;
      const billableWeight = Math.max(numWeight, 10);
      const valueCost = perKg * billableWeight;
      valueQuote = {
        serviceType: 'valueExport',
        title: 'Value Export',
        tagline: 'Economical shipping from Nigeria.',
        price: valueCost,
        formattedPrice: `₦${valueCost.toLocaleString()}`,
        currency: 'NGN',
        billableWeight,
        deliveryTime: 'Delivery in 5–10 working days',
        deliveryMethod: 'Doorstep delivery',
        carrier: 'County Cargo Consolidated Air',
        customsNote: 'Standard customs handling included',
        features: [
          'Delivery in 5–10 working days',
          'Doorstep delivery',
          'Liverpool hub distribution',
          'Minimum billable weight: 10 kg',
        ],
      };
    } else if (isCanada) {
      // Canada: ₦34,000/kg (min weight 10kg)
      const perKg = 34000;
      const billableWeight = Math.max(numWeight, 10);
      const valueCost = perKg * billableWeight;
      valueQuote = {
        serviceType: 'valueExport',
        title: 'Value Export',
        tagline: 'Economical shipping from Nigeria.',
        price: valueCost,
        formattedPrice: `₦${valueCost.toLocaleString()}`,
        currency: 'NGN',
        billableWeight,
        deliveryTime: 'Delivery in 10–14 working days',
        deliveryMethod: 'Doorstep delivery',
        carrier: 'County Cargo Consolidated Air',
        customsNote: 'CBSA clearance & CFIA food compliance available',
        features: [
          'Delivery in 10–14 working days',
          'Doorstep delivery',
          'Major cities coverage (Toronto, Calgary, Vancouver)',
          'Minimum billable weight: 10 kg',
        ],
      };
    }

    return NextResponse.json({
      success: true,
      origin: originLocation,
      destination: matchedCountry.Country,
      zone: zoneId,
      weight: numWeight,
      estimates: {
        value: valueQuote,
        express: expressQuote,
      },
    });
  } catch (err: any) {
    console.error('Error calculating export estimate:', err);
    return NextResponse.json(
      { error: err.message || 'Error calculating shipping estimate.' },
      { status: 500 }
    );
  }
}
