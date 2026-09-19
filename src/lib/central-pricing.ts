/**
 * Central Pricing System & Single Source of Truth for County Cargo
 *
 * Consolidates all shipping routes, service levels, fees, rules,
 * and rate calculations across the entire application and website.
 */

export type ServiceLevelId = 'value' | 'express' | 'special_express';

export interface ServiceComparisonCard {
  id: ServiceLevelId;
  name: string;
  badge?: 'Fastest' | 'Best Value' | 'Priority' | 'Economical';
  tagline: string;
  route: string;
  originCountry: string;
  originCity: string;
  destinationCountry: string;
  destinationCity: string;
  ratePerKg: number;
  ratePerKgDisplay: string;
  enteredWeight: number;
  chargeableWeight: number;
  minimumWeight: number;
  handlingFee: number;
  collectionFee: number;
  additionalCharges: number;
  totalEstimatedPrice: number;
  formattedTotal: string;
  currency: 'GBP' | 'NGN' | 'USD';
  convertedEstimate?: string;
  estimatedDeliveryTime: string;
  trackingAvailability: boolean;
  customsInformation: string;
  features: string[];
  termsAndConditions?: string;
  exclusions?: string;
  bookingUrl: string;
  whatsAppUrl: string;
}

export interface QuoteCalculationParams {
  fromCountry: string;
  fromCity: string;
  toCountry: string;
  toCity?: string;
  weight: number;
  length?: number;
  width?: number;
  height?: number;
  itemDescription?: string;
  packageCategory?: string;
  collectionType?: 'dropoff' | 'collection';
}

export interface CentralQuoteResponse {
  success: boolean;
  fromCountry: string;
  fromCity: string;
  toCountry: string;
  toCity: string;
  enteredWeight: number;
  volumetricWeight: number;
  chargeableWeight: number;
  services: ServiceComparisonCard[];
  error?: string;
}

// Exchange rates
export const DEFAULT_EXCHANGE_RATES = {
  ngnPerGbp: 1900,
  ngnPerUsd: 1500,
};

// Official Handover & Delivery Locations
export const ORIGIN_LOCATIONS = {
  Nigeria: [
    { id: 'lagos-hub', name: 'Lagos Drop-Off (Ladipo-Oshodi Plaza)', city: 'Lagos', hub: 'Lagos Hub' },
    { id: 'abuja-hub', name: 'Abuja Drop-Off (Wuye Ultra Modern Market)', city: 'Abuja', hub: 'Abuja Hub' },
    { id: 'lagos-pickup', name: 'Lagos Doorstep Collection', city: 'Lagos', hub: 'Lagos Hub', isCollection: true },
    { id: 'abuja-pickup', name: 'Abuja Doorstep Collection', city: 'Abuja', hub: 'Abuja Hub', isCollection: true },
  ],
  'United Kingdom': [
    { id: 'london-depot', name: 'London Charlton Depot (SE7 7RU)', city: 'London', hub: 'London Hub' },
    { id: 'liverpool-depot', name: 'Liverpool Queens Dock Depot (L1 0BG)', city: 'Liverpool', hub: 'Liverpool Hub' },
    { id: 'london-pickup', name: 'London Doorstep Collection', city: 'London', hub: 'London Hub', isCollection: true },
    { id: 'uk-nationwide-pickup', name: 'UK Nationwide Courier Collection', city: 'UK Nationwide', hub: 'UK Hub', isCollection: true },
  ],
  'United States': [
    { id: 'us-warehouse', name: 'Irving Texas Warehouse (TX 75061)', city: 'Dallas / Irving', hub: 'US Central Hub' },
    { id: 'us-nationwide-pickup', name: 'US Nationwide Courier Pickup', city: 'Nationwide USA', hub: 'US Hub', isCollection: true },
  ],
};

export const DESTINATION_CITIES: Record<string, string[]> = {
  Nigeria: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano', 'Kaduna', 'Enugu', 'Benin City', 'Warri', 'Calabar', 'Other States'],
  'United Kingdom': ['London', 'Liverpool', 'Manchester', 'Birmingham', 'Leeds', 'Newcastle', 'Glasgow', 'Nationwide UK'],
  'United States': ['Houston', 'Dallas', 'Atlanta', 'New York', 'Chicago', 'Maryland', 'Washington DC', 'Los Angeles', 'Nationwide USA'],
  Canada: ['Toronto', 'Calgary', 'Vancouver', 'Ottawa', 'Montreal', 'Edmonton'],
};

// Caching for live DHL data
interface DhlCountry {
  Country: string;
  Zone: number;
}
interface DhlPricing {
  Zone: number;
  [weightKey: string]: any;
}
let cachedDhlCountries: { data: DhlCountry[]; timestamp: number } | null = null;
let cachedDhlPricing: { data: DhlPricing[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000;

async function fetchDhlCountries(): Promise<DhlCountry[]> {
  if (cachedDhlCountries && Date.now() - cachedDhlCountries.timestamp < CACHE_TTL_MS) {
    return cachedDhlCountries.data;
  }
  try {
    const res = await fetch(
      'https://script.google.com/macros/s/AKfycbwswey5v1XMO3FDLfxptcplZJRn6O8nYvM2Wjf5jh0_qOfsdOSmQEoqBZ6hMkG_q18/exec?action=getDHLCountries',
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const data = (await res.json()) as DhlCountry[];
      if (Array.isArray(data) && data.length > 0) {
        cachedDhlCountries = { data, timestamp: Date.now() };
        return data;
      }
    }
  } catch (err) {
    console.error('Error fetching DHL countries in central pricing:', err);
  }
  return cachedDhlCountries?.data || [];
}

async function fetchDhlPricing(): Promise<DhlPricing[]> {
  if (cachedDhlPricing && Date.now() - cachedDhlPricing.timestamp < CACHE_TTL_MS) {
    return cachedDhlPricing.data;
  }
  try {
    const res = await fetch(
      'https://script.google.com/macros/s/AKfycbyb3DOEM-JTAw_k8hAz7FKsKRusqlruMrshBebwoMZzY4M34YhkmX3GTYuGKw9gAJ_U/exec?action=getDHLExportPricing',
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const data = (await res.json()) as DhlPricing[];
      if (Array.isArray(data) && data.length > 0) {
        cachedDhlPricing = { data, timestamp: Date.now() };
        return data;
      }
    }
  } catch (err) {
    console.error('Error fetching DHL pricing in central pricing:', err);
  }
  return cachedDhlPricing?.data || [];
}

/**
 * Normalizes country strings for consistent matching
 */
export function normalizeCountry(countryName: string): string {
  const norm = (countryName || '').trim().toLowerCase();
  if (norm.includes('nigeria') || norm === 'ng') return 'Nigeria';
  if (norm.includes('united kingdom') || norm === 'uk' || norm === 'great britain' || norm === 'gb') return 'United Kingdom';
  if (norm.includes('united states') || norm === 'usa' || norm === 'us' || norm === 'america') return 'United States';
  if (norm.includes('canada') || norm === 'ca') return 'Canada';
  if (norm.includes('emirates') || norm.includes('dubai') || norm === 'uae') return 'United Arab Emirates';
  if (norm.includes('germany') || norm === 'de') return 'Germany';
  if (norm.includes('france') || norm === 'fr') return 'France';
  if (norm.includes('china') || norm === 'cn') return 'China';
  if (norm.includes('australia') || norm === 'au') return 'Australia';
  if (norm.includes('india') || norm === 'in') return 'India';
  if (norm.includes('south africa') || norm === 'za') return 'South Africa';
  if (norm.includes('italy') || norm === 'it') return 'Italy';
  return countryName.trim();
}

/**
 * Master central quotation calculator
 */
export async function calculateCentralQuote(params: QuoteCalculationParams): Promise<CentralQuoteResponse> {
  const fromCountry = normalizeCountry(params.fromCountry);
  const toCountry = normalizeCountry(params.toCountry);
  const fromCity = (params.fromCity || '').trim() || 'Default Origin Hub';
  const toCity = (params.toCity || '').trim() || 'Main Hub';
  const weight = Number(params.weight);

  // Validation
  if (isNaN(weight) || weight <= 0) {
    return {
      success: false,
      fromCountry,
      fromCity,
      toCountry,
      toCity,
      enteredWeight: 0,
      volumetricWeight: 0,
      chargeableWeight: 0,
      services: [],
      error: 'Please enter a valid shipment weight greater than 0 kg.',
    };
  }

  if (!fromCountry || !toCountry) {
    return {
      success: false,
      fromCountry,
      fromCity,
      toCountry,
      toCity,
      enteredWeight: weight,
      volumetricWeight: 0,
      chargeableWeight: weight,
      services: [],
      error: 'Both origin country and destination country are required.',
    };
  }

  if (fromCountry === toCountry) {
    return {
      success: false,
      fromCountry,
      fromCity,
      toCountry,
      toCity,
      enteredWeight: weight,
      volumetricWeight: 0,
      chargeableWeight: weight,
      services: [],
      error: 'Origin country and destination country cannot be identical. Please choose a cross-border route.',
    };
  }

  // Calculate volumetric weight
  const length = Number(params.length) || 0;
  const width = Number(params.width) || 0;
  const height = Number(params.height) || 0;
  const volumetricWeight = length > 0 && width > 0 && height > 0 ? (length * width * height) / 5000 : 0;
  const chargeableWeight = Math.round(Math.max(weight, volumetricWeight) * 100) / 100;

  const isCollection = params.collectionType === 'collection' || fromCity.toLowerCase().includes('collection') || fromCity.toLowerCase().includes('pickup');
  const services: ServiceComparisonCard[] = [];

  const isNigeriaOrigin = fromCountry === 'Nigeria';
  const isUkOrigin = fromCountry === 'United Kingdom';
  const isUsOrigin = fromCountry === 'United States';

  const isNigeriaDest = toCountry === 'Nigeria';
  const isUkDest = toCountry === 'United Kingdom';
  const isUsDest = toCountry === 'United States';
  const isCanadaDest = toCountry === 'Canada';

  // Helper for generating parameterized booking links
  const createBookingUrl = (serviceId: string, quotedPrice: number, currency: string) => {
    const query = new URLSearchParams({
      redirect: '/book-shipment',
      service: serviceId,
      fromCountry,
      fromCity,
      toCountry,
      toCity,
      enteredWeight: String(weight),
      chargeableWeight: String(chargeableWeight),
      quotedPrice: String(quotedPrice),
      currency,
      category: params.packageCategory || 'general',
      description: params.itemDescription || '',
    });
    return `https://ship.countycargo.com/login?${query.toString()}`;
  };

  const createWhatsAppUrl = (serviceName: string, totalDisplay: string, transit: string) => {
    const text = `Hello County Cargo, I received a quote on your central calculator:
- Service: ${serviceName}
- Route: ${fromCountry} (${fromCity}) to ${toCountry} (${toCity})
- Weight: ${weight} kg (Chargeable: ${chargeableWeight} kg)
- Total Estimate: ${totalDisplay}
- Estimated Transit: ${transit}
${params.itemDescription ? `- Description: ${params.itemDescription}` : ''}

I would like to proceed with booking this shipment.`;
    return `https://wa.me/447883309489?text=${encodeURIComponent(text)}`;
  };

  // =========================================================================
  // ROUTE 1: UNITED KINGDOM -> NIGERIA
  // =========================================================================
  if (isUkOrigin && isNigeriaDest) {
    const isLagos = toCity.toLowerCase().includes('lagos');
    const isAbuja = toCity.toLowerCase().includes('abuja');

    // 1. Value Shipping (Air Cargo)
    const valueRate = isLagos ? 6.0 : isAbuja ? 6.5 : 7.0;
    const valueMinWeight = 10;
    const valueBillableWeight = Math.max(chargeableWeight, valueMinWeight);
    const valueHandlingFee = 15;
    let valueCollectionFee = 0;
    if (isCollection) {
      if (chargeableWeight >= 30 && fromCity.toLowerCase().includes('london')) {
        valueCollectionFee = 0; // Free London collection promo for 30kg+
      } else {
        valueCollectionFee = fromCity.toLowerCase().includes('nationwide') ? 25 : 20;
      }
    }
    const valueTotalGbp = Math.round((valueRate * valueBillableWeight + valueHandlingFee + valueCollectionFee) * 100) / 100;
    const valueNairaApprox = Math.round(valueTotalGbp * DEFAULT_EXCHANGE_RATES.ngnPerGbp);

    services.push({
      id: 'value',
      name: 'Value Shipping (Air Cargo)',
      badge: 'Best Value',
      tagline: 'Economical consolidated air freight to Lagos, Abuja, and nationwide.',
      route: `${fromCity}, UK → ${toCity}, Nigeria`,
      originCountry: fromCountry,
      originCity: fromCity,
      destinationCountry: toCountry,
      destinationCity: toCity,
      ratePerKg: valueRate,
      ratePerKgDisplay: `£${valueRate.toFixed(2)}/kg`,
      enteredWeight: weight,
      chargeableWeight: valueBillableWeight,
      minimumWeight: valueMinWeight,
      handlingFee: valueHandlingFee,
      collectionFee: valueCollectionFee,
      additionalCharges: 0,
      totalEstimatedPrice: valueTotalGbp,
      formattedTotal: `£${valueTotalGbp.toFixed(2)}`,
      currency: 'GBP',
      convertedEstimate: `Approx. ₦${valueNairaApprox.toLocaleString()} (est.)`,
      estimatedDeliveryTime: '5 to 10 working days',
      trackingAvailability: true,
      customsInformation: 'Full customs clearance included. Doorstep delivery available across all 36 states.',
      features: [
        '5 to 10 working days transit',
        `Minimum billable weight: ${valueMinWeight} kg`,
        'Includes export handling & customs clearance',
        'Doorstep delivery or hub collection',
      ],
      bookingUrl: createBookingUrl('value', valueTotalGbp, 'GBP'),
      whatsAppUrl: createWhatsAppUrl('Value Shipping', `£${valueTotalGbp.toFixed(2)}`, '5 to 10 working days'),
    });

    // 2. Express Shipping (Fast Commercial Air Freight)
    const expressRate = 8.5;
    const expressHandling = 20;
    const expressCollection = isCollection ? 20 : 0;
    const expressTotalGbp = Math.round((expressRate * chargeableWeight + expressHandling + expressCollection) * 100) / 100;
    const expressNairaApprox = Math.round(expressTotalGbp * DEFAULT_EXCHANGE_RATES.ngnPerGbp);

    services.push({
      id: 'express',
      name: 'Express Shipping',
      tagline: 'Fast international priority air cargo with scheduled weekly departures.',
      route: `${fromCity}, UK → ${toCity}, Nigeria`,
      originCountry: fromCountry,
      originCity: fromCity,
      destinationCountry: toCountry,
      destinationCity: toCity,
      ratePerKg: expressRate,
      ratePerKgDisplay: `£${expressRate.toFixed(2)}/kg`,
      enteredWeight: weight,
      chargeableWeight: chargeableWeight,
      minimumWeight: 5,
      handlingFee: expressHandling,
      collectionFee: expressCollection,
      additionalCharges: 0,
      totalEstimatedPrice: expressTotalGbp,
      formattedTotal: `£${expressTotalGbp.toFixed(2)}`,
      currency: 'GBP',
      convertedEstimate: `Approx. ₦${expressNairaApprox.toLocaleString()} (est.)`,
      estimatedDeliveryTime: '3 to 5 working days',
      trackingAvailability: true,
      customsInformation: 'Priority clearance with end-to-end milestone tracking.',
      features: [
        '3 to 5 working days delivery',
        'Shipment tracking from dispatch to arrival',
        'Fast flight dispatch from London Heathrow',
        'Direct delivery to Lagos & Abuja addresses',
      ],
      bookingUrl: createBookingUrl('express', expressTotalGbp, 'GBP'),
      whatsAppUrl: createWhatsAppUrl('Express Shipping', `£${expressTotalGbp.toFixed(2)}`, '3 to 5 working days'),
    });

    // 3. Special Express Shipping (ONLY UK <-> NIGERIA, £22/kg + £20 handling fee, 48-Hour)
    const specialRate = 22.0;
    const specialHandling = 20.0;
    const specialCollection = isCollection ? 20.0 : 0;
    const specialTotalGbp = Math.round((specialRate * chargeableWeight + specialHandling + specialCollection) * 100) / 100;
    const specialNairaApprox = Math.round(specialTotalGbp * DEFAULT_EXCHANGE_RATES.ngnPerGbp);

    services.push({
      id: 'special_express',
      name: 'Special Express Shipping (48-Hour)',
      badge: 'Fastest',
      tagline: 'Premium 48-hour flight schedule exclusively between the UK and Nigeria.',
      route: `${fromCity}, UK → ${toCity}, Nigeria`,
      originCountry: fromCountry,
      originCity: fromCity,
      destinationCountry: toCountry,
      destinationCity: toCity,
      ratePerKg: specialRate,
      ratePerKgDisplay: `£${specialRate.toFixed(2)}/kg`,
      enteredWeight: weight,
      chargeableWeight: chargeableWeight,
      minimumWeight: 1,
      handlingFee: specialHandling,
      collectionFee: specialCollection,
      additionalCharges: 0,
      totalEstimatedPrice: specialTotalGbp,
      formattedTotal: `£${specialTotalGbp.toFixed(2)}`,
      currency: 'GBP',
      convertedEstimate: `Approx. ₦${specialNairaApprox.toLocaleString()} (est.)`,
      estimatedDeliveryTime: '48-hour flight connection',
      trackingAvailability: true,
      customsInformation: 'Priority express customs clearance included.',
      features: [
        '48-hour scheduled express air freight',
        '£22/kg + £20 handling fee',
        'Top flight priority on direct flights',
        'Real-time priority dispatch alerts',
      ],
      termsAndConditions: 'The 48-hour delivery period begins once the consignment has cleared export security scanning and departed on the scheduled direct flight from London.',
      exclusions: 'Operational exclusions: Excludes weekends, UK/Nigerian bank holidays, and statutory customs security inspection holds.',
      bookingUrl: createBookingUrl('special_express', specialTotalGbp, 'GBP'),
      whatsAppUrl: createWhatsAppUrl('Special Express (48-Hour)', `£${specialTotalGbp.toFixed(2)}`, '48 hours'),
    });
  }

  // =========================================================================
  // ROUTE 2: NIGERIA -> UNITED KINGDOM
  // =========================================================================
  else if (isNigeriaOrigin && isUkDest) {
    const isAbuja = fromCity.toLowerCase().includes('abuja');

    // 1. Value Shipping (Export to UK)
    const valueRate = isAbuja ? 11000 : 10500;
    const valueMinWeight = 10;
    const valueBillableWeight = Math.max(chargeableWeight, valueMinWeight);
    const valueHandling = 0;
    const valueCollection = isCollection ? 5000 : 0;
    const valueTotalNgn = valueRate * valueBillableWeight + valueHandling + valueCollection;
    const valueGbpApprox = (valueTotalNgn / DEFAULT_EXCHANGE_RATES.ngnPerGbp).toFixed(2);

    services.push({
      id: 'value',
      name: 'Value Shipping',
      badge: 'Best Value',
      tagline: 'Economical consolidated air freight from Nigeria to the United Kingdom.',
      route: `${fromCity}, Nigeria → ${toCity}, UK`,
      originCountry: fromCountry,
      originCity: fromCity,
      destinationCountry: toCountry,
      destinationCity: toCity,
      ratePerKg: valueRate,
      ratePerKgDisplay: `₦${valueRate.toLocaleString()}/kg`,
      enteredWeight: weight,
      chargeableWeight: valueBillableWeight,
      minimumWeight: valueMinWeight,
      handlingFee: valueHandling,
      collectionFee: valueCollection,
      additionalCharges: 0,
      totalEstimatedPrice: valueTotalNgn,
      formattedTotal: `₦${valueTotalNgn.toLocaleString()}`,
      currency: 'NGN',
      convertedEstimate: `Approx. £${valueGbpApprox}`,
      estimatedDeliveryTime: '5 to 10 working days',
      trackingAvailability: true,
      customsInformation: 'Consolidated customs processing. Liverpool depot distribution and UK-wide doorstep delivery.',
      features: [
        '5 to 10 working days transit',
        `Minimum billable weight: ${valueMinWeight} kg`,
        'Liverpool depot L1 0BG handling',
        'Doorstep delivery to all UK postal codes',
      ],
      bookingUrl: createBookingUrl('value', valueTotalNgn, 'NGN'),
      whatsAppUrl: createWhatsAppUrl('Value Export to UK', `₦${valueTotalNgn.toLocaleString()}`, '5 to 10 working days'),
    });

    // 2. Express Shipping (DHL Partner Zone Export)
    const [dhlCountries, dhlPricing] = await Promise.all([fetchDhlCountries(), fetchDhlPricing()]);
    let expressTotalNgn = 0;
    let expressBillable = chargeableWeight <= 30 ? Math.ceil(chargeableWeight * 2) / 2 : Math.ceil(chargeableWeight);
    if (expressBillable < 0.5) expressBillable = 0.5;

    const ukDhl = dhlCountries.find((c) => c.Country === 'United Kingdom') || { Country: 'United Kingdom', Zone: 4 };
    const zonePricing = dhlPricing.find((z) => z.Zone === ukDhl.Zone);
    if (zonePricing && expressBillable <= 70) {
      const key = `${expressBillable.toFixed(1)}kg`;
      const base = Number(zonePricing[key]) || 0;
      expressTotalNgn = Math.round(base * 1.082855);
    } else {
      expressTotalNgn = Math.round(expressBillable * 28000 * 1.082855);
    }

    const expressCollectionFee = isCollection ? 5000 : 0;
    expressTotalNgn += expressCollectionFee;
    const expressGbpApprox = (expressTotalNgn / DEFAULT_EXCHANGE_RATES.ngnPerGbp).toFixed(2);

    services.push({
      id: 'express',
      name: 'Express Shipping',
      tagline: 'Fast international courier shipping from Nigeria via DHL global network.',
      route: `${fromCity}, Nigeria → ${toCity}, UK`,
      originCountry: fromCountry,
      originCity: fromCity,
      destinationCountry: toCountry,
      destinationCity: toCity,
      ratePerKg: Math.round(expressTotalNgn / expressBillable),
      ratePerKgDisplay: `₦${Math.round(expressTotalNgn / expressBillable).toLocaleString()}/kg`,
      enteredWeight: weight,
      chargeableWeight: expressBillable,
      minimumWeight: 0.5,
      handlingFee: 0,
      collectionFee: expressCollectionFee,
      additionalCharges: 0,
      totalEstimatedPrice: expressTotalNgn,
      formattedTotal: `₦${expressTotalNgn.toLocaleString()}`,
      currency: 'NGN',
      convertedEstimate: `Approx. £${expressGbpApprox}`,
      estimatedDeliveryTime: '3 to 5 working days',
      trackingAvailability: true,
      customsInformation: 'Shipment routed via DHL Express. Receiver is responsible for destination customs duties or VAT where applicable.',
      features: [
        '3 to 5 working days delivery',
        'DHL Express priority network',
        'Real-time door-to-door tracking',
        'Nationwide UK doorstep handover',
      ],
      bookingUrl: createBookingUrl('express', expressTotalNgn, 'NGN'),
      whatsAppUrl: createWhatsAppUrl('Express Shipping to UK', `₦${expressTotalNgn.toLocaleString()}`, '3 to 5 working days'),
    });

    // 3. Special Express Shipping (ONLY UK <-> NIGERIA, £22/kg + £20 handling, converted to Naira)
    const specialRateGbp = 22.0;
    const specialHandlingGbp = 20.0;
    const specialGbpTotal = specialRateGbp * chargeableWeight + specialHandlingGbp + (isCollection ? 5 : 0);
    const specialRateNgn = Math.round(specialRateGbp * DEFAULT_EXCHANGE_RATES.ngnPerGbp);
    const specialHandlingNgn = Math.round(specialHandlingGbp * DEFAULT_EXCHANGE_RATES.ngnPerGbp);
    const specialCollectionNgn = isCollection ? 5000 : 0;
    const specialTotalNgn = specialRateNgn * chargeableWeight + specialHandlingNgn + specialCollectionNgn;

    services.push({
      id: 'special_express',
      name: 'Special Express Shipping (48-Hour)',
      badge: 'Fastest',
      tagline: 'Premium 48-hour direct air freight connection exclusively between Nigeria and the UK.',
      route: `${fromCity}, Nigeria → ${toCity}, UK`,
      originCountry: fromCountry,
      originCity: fromCity,
      destinationCountry: toCountry,
      destinationCity: toCity,
      ratePerKg: specialRateNgn,
      ratePerKgDisplay: `₦${specialRateNgn.toLocaleString()}/kg (£${specialRateGbp}/kg)`,
      enteredWeight: weight,
      chargeableWeight: chargeableWeight,
      minimumWeight: 1,
      handlingFee: specialHandlingNgn,
      collectionFee: specialCollectionNgn,
      additionalCharges: 0,
      totalEstimatedPrice: specialTotalNgn,
      formattedTotal: `₦${specialTotalNgn.toLocaleString()}`,
      currency: 'NGN',
      convertedEstimate: `Approx. £${specialGbpTotal.toFixed(2)} (est.)`,
      estimatedDeliveryTime: '48-hour flight connection',
      trackingAvailability: true,
      customsInformation: 'Priority express export clearance included.',
      features: [
        '48-hour scheduled direct flight',
        '£22/kg + £20 handling fee (converted to NGN)',
        'Direct air dispatch from Murtala Muhammed Airport',
        'Real-time tracking and delivery confirmation',
      ],
      termsAndConditions: 'The 48-hour delivery countdown begins once the consignment has completed export security inspection and departed on the scheduled direct flight from Lagos.',
      exclusions: 'Operational exclusions: Excludes weekends, public holidays, and statutory customs clearance delays.',
      bookingUrl: createBookingUrl('special_express', specialTotalNgn, 'NGN'),
      whatsAppUrl: createWhatsAppUrl('Special Express (48-Hour)', `₦${specialTotalNgn.toLocaleString()}`, '48 hours'),
    });
  }

  // =========================================================================
  // ROUTE 3: NIGERIA -> UNITED STATES
  // (Special Express MUST NOT APPEAR)
  // =========================================================================
  else if (isNigeriaOrigin && isUsDest) {
    const isAbuja = fromCity.toLowerCase().includes('abuja');

    // 1. Value Shipping (Export to USA)
    const valueRate = isAbuja ? 17000 : 16000;
    const valueMinWeight = 10;
    const valueBillableWeight = Math.max(chargeableWeight, valueMinWeight);
    const valueCollection = isCollection ? 5000 : 0;
    const valueTotalNgn = valueRate * valueBillableWeight + valueCollection;
    const valueUsdApprox = (valueTotalNgn / DEFAULT_EXCHANGE_RATES.ngnPerUsd).toFixed(2);

    services.push({
      id: 'value',
      name: 'Value Export Shipping',
      badge: 'Best Value',
      tagline: 'Economical consolidated air cargo from Nigeria to the United States.',
      route: `${fromCity}, Nigeria → ${toCity}, USA`,
      originCountry: fromCountry,
      originCity: fromCity,
      destinationCountry: toCountry,
      destinationCity: toCity,
      ratePerKg: valueRate,
      ratePerKgDisplay: `₦${valueRate.toLocaleString()}/kg`,
      enteredWeight: weight,
      chargeableWeight: valueBillableWeight,
      minimumWeight: valueMinWeight,
      handlingFee: 0,
      collectionFee: valueCollection,
      additionalCharges: 0,
      totalEstimatedPrice: valueTotalNgn,
      formattedTotal: `₦${valueTotalNgn.toLocaleString()}`,
      currency: 'NGN',
      convertedEstimate: `Approx. $${valueUsdApprox}`,
      estimatedDeliveryTime: '10 to 15 working days',
      trackingAvailability: true,
      customsInformation: 'Consolidated air freight. 15% additional tariff on declared value applies for certain commercial goods.',
      features: [
        '10 to 15 working days transit',
        `Minimum billable weight: ${valueMinWeight} kg`,
        'Doorstep delivery across all 50 US states',
        '15% additional tariff advisory applies',
      ],
      bookingUrl: createBookingUrl('value', valueTotalNgn, 'NGN'),
      whatsAppUrl: createWhatsAppUrl('Value Export to US', `₦${valueTotalNgn.toLocaleString()}`, '10 to 15 working days'),
    });

    // 2. Express Shipping (DHL Partner Zone 3 Export)
    const [dhlCountries, dhlPricing] = await Promise.all([fetchDhlCountries(), fetchDhlPricing()]);
    let expressBillable = chargeableWeight <= 30 ? Math.ceil(chargeableWeight * 2) / 2 : Math.ceil(chargeableWeight);
    if (expressBillable < 0.5) expressBillable = 0.5;

    const usDhl = dhlCountries.find((c) => c.Country === 'United States') || { Country: 'United States', Zone: 3 };
    const zonePricing = dhlPricing.find((z) => z.Zone === usDhl.Zone);
    let expressTotalNgn = 0;

    if (zonePricing && expressBillable <= 70) {
      const key = `${expressBillable.toFixed(1)}kg`;
      const base = Number(zonePricing[key]) || 0;
      expressTotalNgn = Math.round(base * 1.082855);
    } else {
      expressTotalNgn = Math.round(expressBillable * 32000 * 1.082855);
    }

    const expressCollectionFee = isCollection ? 5000 : 0;
    expressTotalNgn += expressCollectionFee;
    const expressUsdApprox = (expressTotalNgn / DEFAULT_EXCHANGE_RATES.ngnPerUsd).toFixed(2);

    services.push({
      id: 'express',
      name: 'Express Shipping',
      badge: 'Fastest',
      tagline: 'Fast international courier shipping from Nigeria via DHL global express network.',
      route: `${fromCity}, Nigeria → ${toCity}, USA`,
      originCountry: fromCountry,
      originCity: fromCity,
      destinationCountry: toCountry,
      destinationCity: toCity,
      ratePerKg: Math.round(expressTotalNgn / expressBillable),
      ratePerKgDisplay: `₦${Math.round(expressTotalNgn / expressBillable).toLocaleString()}/kg`,
      enteredWeight: weight,
      chargeableWeight: expressBillable,
      minimumWeight: 0.5,
      handlingFee: 0,
      collectionFee: expressCollectionFee,
      additionalCharges: 0,
      totalEstimatedPrice: expressTotalNgn,
      formattedTotal: `₦${expressTotalNgn.toLocaleString()}`,
      currency: 'NGN',
      convertedEstimate: `Approx. $${expressUsdApprox}`,
      estimatedDeliveryTime: '3 to 5 working days',
      trackingAvailability: true,
      customsInformation: 'Shipment via DHL Express. Receiver is responsible for destination customs fees or duties where applicable.',
      features: [
        '3 to 5 working days delivery',
        'DHL Express priority global network',
        'Complete doorstep delivery',
        'Live tracking and milestone SMS updates',
      ],
      bookingUrl: createBookingUrl('express', expressTotalNgn, 'NGN'),
      whatsAppUrl: createWhatsAppUrl('Express Shipping to USA', `₦${expressTotalNgn.toLocaleString()}`, '3 to 5 working days'),
    });
  }

  // =========================================================================
  // ROUTE 4: NIGERIA -> CANADA
  // (Special Express MUST NOT APPEAR)
  // =========================================================================
  else if (isNigeriaOrigin && isCanadaDest) {
    // 1. Value Shipping to Canada
    const valueRate = 34000;
    const valueMinWeight = 10;
    const valueBillableWeight = Math.max(chargeableWeight, valueMinWeight);
    const valueCollection = isCollection ? 5000 : 0;
    const valueTotalNgn = valueRate * valueBillableWeight + valueCollection;

    services.push({
      id: 'value',
      name: 'Value Export Shipping',
      badge: 'Best Value',
      tagline: 'Economical consolidated air freight from Nigeria to Canada.',
      route: `${fromCity}, Nigeria → ${toCity}, Canada`,
      originCountry: fromCountry,
      originCity: fromCity,
      destinationCountry: toCountry,
      destinationCity: toCity,
      ratePerKg: valueRate,
      ratePerKgDisplay: `₦${valueRate.toLocaleString()}/kg`,
      enteredWeight: weight,
      chargeableWeight: valueBillableWeight,
      minimumWeight: valueMinWeight,
      handlingFee: 0,
      collectionFee: valueCollection,
      additionalCharges: 0,
      totalEstimatedPrice: valueTotalNgn,
      formattedTotal: `₦${valueTotalNgn.toLocaleString()}`,
      currency: 'NGN',
      estimatedDeliveryTime: '10 to 14 working days',
      trackingAvailability: true,
      customsInformation: 'CBSA customs clearance and CFIA dry foodstuffs compliance support included.',
      features: [
        '10 to 14 working days transit',
        `Minimum billable weight: ${valueMinWeight} kg`,
        'Service to Toronto, Calgary, Vancouver, Montreal',
        'Doorstep handover across Canadian provinces',
      ],
      bookingUrl: createBookingUrl('value', valueTotalNgn, 'NGN'),
      whatsAppUrl: createWhatsAppUrl('Value Export to Canada', `₦${valueTotalNgn.toLocaleString()}`, '10 to 14 working days'),
    });

    // 2. Express Shipping to Canada (DHL Zone 4/8)
    const [dhlCountries, dhlPricing] = await Promise.all([fetchDhlCountries(), fetchDhlPricing()]);
    let expressBillable = chargeableWeight <= 30 ? Math.ceil(chargeableWeight * 2) / 2 : Math.ceil(chargeableWeight);
    if (expressBillable < 0.5) expressBillable = 0.5;

    const caDhl = dhlCountries.find((c) => c.Country === 'Canada') || { Country: 'Canada', Zone: 4 };
    const zonePricing = dhlPricing.find((z) => z.Zone === caDhl.Zone);
    let expressTotalNgn = 0;

    if (zonePricing && expressBillable <= 70) {
      const key = `${expressBillable.toFixed(1)}kg`;
      const base = Number(zonePricing[key]) || 0;
      expressTotalNgn = Math.round(base * 1.082855);
    } else {
      expressTotalNgn = Math.round(expressBillable * 35000 * 1.082855);
    }

    const expressCollectionFee = isCollection ? 5000 : 0;
    expressTotalNgn += expressCollectionFee;

    services.push({
      id: 'express',
      name: 'Express Shipping',
      badge: 'Fastest',
      tagline: 'Fast international courier shipping from Nigeria via DHL global express network.',
      route: `${fromCity}, Nigeria → ${toCity}, Canada`,
      originCountry: fromCountry,
      originCity: fromCity,
      destinationCountry: toCountry,
      destinationCity: toCity,
      ratePerKg: Math.round(expressTotalNgn / expressBillable),
      ratePerKgDisplay: `₦${Math.round(expressTotalNgn / expressBillable).toLocaleString()}/kg`,
      enteredWeight: weight,
      chargeableWeight: expressBillable,
      minimumWeight: 0.5,
      handlingFee: 0,
      collectionFee: expressCollectionFee,
      additionalCharges: 0,
      totalEstimatedPrice: expressTotalNgn,
      formattedTotal: `₦${expressTotalNgn.toLocaleString()}`,
      currency: 'NGN',
      estimatedDeliveryTime: '3 to 5 working days',
      trackingAvailability: true,
      customsInformation: 'Shipment via DHL Express. Receiver is responsible for destination customs duties or GST/HST where applicable.',
      features: [
        '3 to 5 working days delivery',
        'DHL Express priority global network',
        'End-to-end doorstep delivery in Canada',
        'Live tracking and SMS delivery updates',
      ],
      bookingUrl: createBookingUrl('express', expressTotalNgn, 'NGN'),
      whatsAppUrl: createWhatsAppUrl('Express Shipping to Canada', `₦${expressTotalNgn.toLocaleString()}`, '3 to 5 working days'),
    });
  }

  // =========================================================================
  // ROUTE 5: NIGERIA -> SUPPORTED COUNTRIES WORLDWIDE (230+ COUNTRIES)
  // (Special Express MUST NOT APPEAR)
  // =========================================================================
  else if (isNigeriaOrigin) {
    const [dhlCountries, dhlPricing] = await Promise.all([fetchDhlCountries(), fetchDhlPricing()]);
    const matchedCountry = dhlCountries.find((c) => c.Country.toLowerCase() === toCountry.toLowerCase()) ||
      dhlCountries.find((c) => c.Country.toLowerCase().includes(toCountry.toLowerCase()) || toCountry.toLowerCase().includes(c.Country.toLowerCase()));

    if (!matchedCountry) {
      return {
        success: false,
        fromCountry,
        fromCity,
        toCountry,
        toCity,
        enteredWeight: weight,
        volumetricWeight,
        chargeableWeight,
        services: [],
        error: `Destination country '${toCountry}' is not currently active in our export network. Please contact support.`,
      };
    }

    const zoneId = matchedCountry.Zone;
    const zonePricing = dhlPricing.find((z) => z.Zone === zoneId);

    if (!zonePricing) {
      return {
        success: false,
        fromCountry,
        fromCity,
        toCountry,
        toCity,
        enteredWeight: weight,
        volumetricWeight,
        chargeableWeight,
        services: [],
        error: `Pricing not configured for Zone ${zoneId} (${matchedCountry.Country}).`,
      };
    }

    let expressBillable = chargeableWeight <= 30 ? Math.ceil(chargeableWeight * 2) / 2 : Math.ceil(chargeableWeight);
    if (expressBillable < 0.5) expressBillable = 0.5;

    let baseCost = 0;
    if (expressBillable <= 70) {
      const key = `${expressBillable.toFixed(1)}kg`;
      baseCost = Number(zonePricing[key]) || 0;
    } else {
      const base70 = Number(zonePricing['70.0kg']) || 0;
      const extraKg = expressBillable - 70;
      baseCost = base70 + extraKg * 25000;
    }

    const expressTotalNgn = Math.round(baseCost * 1.082855) + (isCollection ? 5000 : 0);
    let transitTime = '3 to 5 working days';
    if (['Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Belgium'].includes(matchedCountry.Country)) {
      transitTime = '3 to 5 working days';
    } else if (['China', 'United Arab Emirates', 'India'].includes(matchedCountry.Country)) {
      transitTime = '3 to 6 working days';
    } else {
      transitTime = '4 to 7 working days';
    }

    services.push({
      id: 'express',
      name: 'Express Shipping',
      badge: 'Fastest',
      tagline: `Fast international export from Nigeria to ${matchedCountry.Country} via DHL global network.`,
      route: `${fromCity}, Nigeria → ${matchedCountry.Country}`,
      originCountry: fromCountry,
      originCity: fromCity,
      destinationCountry: matchedCountry.Country,
      destinationCity: toCity,
      ratePerKg: Math.round(expressTotalNgn / expressBillable),
      ratePerKgDisplay: `₦${Math.round(expressTotalNgn / expressBillable).toLocaleString()}/kg`,
      enteredWeight: weight,
      chargeableWeight: expressBillable,
      minimumWeight: 0.5,
      handlingFee: 0,
      collectionFee: isCollection ? 5000 : 0,
      additionalCharges: 0,
      totalEstimatedPrice: expressTotalNgn,
      formattedTotal: `₦${expressTotalNgn.toLocaleString()}`,
      currency: 'NGN',
      estimatedDeliveryTime: transitTime,
      trackingAvailability: true,
      customsInformation: `Shipment routed via DHL Express. Receiver is responsible for destination customs duties, local VAT or taxes assessed by ${matchedCountry.Country}.`,
      features: [
        `${transitTime} delivery`,
        'DHL Express priority global network',
        'End-to-end doorstep delivery',
        'Live tracking and milestone notifications',
      ],
      bookingUrl: createBookingUrl('express', expressTotalNgn, 'NGN'),
      whatsAppUrl: createWhatsAppUrl('Express Shipping', `₦${expressTotalNgn.toLocaleString()}`, transitTime),
    });
  }

  // =========================================================================
  // ROUTE 6: UNITED STATES -> NIGERIA
  // (Special Express MUST NOT APPEAR)
  // =========================================================================
  else if (isUsOrigin && isNigeriaDest) {
    const isLagos = toCity.toLowerCase().includes('lagos');
    const valueRate = isLagos ? 5.0 : 5.5; // USD per kg
    const valueMinWeight = 10;
    const valueBillableWeight = Math.max(chargeableWeight, valueMinWeight);
    const valueHandling = 15;
    const valueTotalUsd = Math.round((valueRate * valueBillableWeight + valueHandling) * 100) / 100;
    const valueNgnApprox = Math.round(valueTotalUsd * DEFAULT_EXCHANGE_RATES.ngnPerUsd);

    services.push({
      id: 'value',
      name: 'Value Air Shipping',
      badge: 'Best Value',
      tagline: 'Economical consolidated air shipping from the USA to Lagos, Abuja, and nationwide.',
      route: `${fromCity}, USA → ${toCity}, Nigeria`,
      originCountry: fromCountry,
      originCity: fromCity,
      destinationCountry: toCountry,
      destinationCity: toCity,
      ratePerKg: valueRate,
      ratePerKgDisplay: `$${valueRate.toFixed(2)}/kg`,
      enteredWeight: weight,
      chargeableWeight: valueBillableWeight,
      minimumWeight: valueMinWeight,
      handlingFee: valueHandling,
      collectionFee: 0,
      additionalCharges: 0,
      totalEstimatedPrice: valueTotalUsd,
      formattedTotal: `$${valueTotalUsd.toFixed(2)}`,
      currency: 'USD',
      convertedEstimate: `Approx. ₦${valueNgnApprox.toLocaleString()} (est.)`,
      estimatedDeliveryTime: '7 to 14 working days',
      trackingAvailability: true,
      customsInformation: 'Consolidated air cargo with full Nigerian customs clearance included.',
      features: [
        '7 to 14 working days delivery',
        `Minimum billable weight: ${valueMinWeight} kg`,
        'Irving, Texas warehouse intake',
        'Doorstep delivery across all 36 Nigerian states',
      ],
      bookingUrl: createBookingUrl('value', valueTotalUsd, 'USD'),
      whatsAppUrl: createWhatsAppUrl('USA to Nigeria Value Shipping', `$${valueTotalUsd.toFixed(2)}`, '7 to 14 working days'),
    });

    const expressRate = 8.5;
    const expressHandling = 20;
    const expressTotalUsd = Math.round((expressRate * chargeableWeight + expressHandling) * 100) / 100;
    const expressNgnApprox = Math.round(expressTotalUsd * DEFAULT_EXCHANGE_RATES.ngnPerUsd);

    services.push({
      id: 'express',
      name: 'Express Air Shipping',
      badge: 'Fastest',
      tagline: 'Fast priority air cargo from USA to Nigeria.',
      route: `${fromCity}, USA → ${toCity}, Nigeria`,
      originCountry: fromCountry,
      originCity: fromCity,
      destinationCountry: toCountry,
      destinationCity: toCity,
      ratePerKg: expressRate,
      ratePerKgDisplay: `$${expressRate.toFixed(2)}/kg`,
      enteredWeight: weight,
      chargeableWeight: chargeableWeight,
      minimumWeight: 5,
      handlingFee: expressHandling,
      collectionFee: 0,
      additionalCharges: 0,
      totalEstimatedPrice: expressTotalUsd,
      formattedTotal: `$${expressTotalUsd.toFixed(2)}`,
      currency: 'USD',
      convertedEstimate: `Approx. ₦${expressNgnApprox.toLocaleString()} (est.)`,
      estimatedDeliveryTime: '3 to 5 working days',
      trackingAvailability: true,
      customsInformation: 'Priority express flight dispatch and expedited clearance.',
      features: [
        '3 to 5 working days delivery',
        'Direct airport dispatch',
        'Full online live tracking',
        'Doorstep delivery to Lagos & Abuja addresses',
      ],
      bookingUrl: createBookingUrl('express', expressTotalUsd, 'USD'),
      whatsAppUrl: createWhatsAppUrl('USA to Nigeria Express Shipping', `$${expressTotalUsd.toFixed(2)}`, '3 to 5 working days'),
    });
  }

  // Unsupported route fallback
  if (services.length === 0) {
    return {
      success: false,
      fromCountry,
      fromCity,
      toCountry,
      toCity,
      enteredWeight: weight,
      volumetricWeight,
      chargeableWeight,
      services: [],
      error: `No standard services currently configured between ${fromCountry} and ${toCountry}. Please contact our support team for a custom quote.`,
    };
  }

  return {
    success: true,
    fromCountry,
    fromCity,
    toCountry,
    toCity,
    enteredWeight: weight,
    volumetricWeight,
    chargeableWeight,
    services,
  };
}
