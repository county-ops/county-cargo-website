/**
 * Central Pricing System & Single Source of Truth for County Cargo
 *
 * Connects to the live Ship County Cargo quotation API (https://ship.countycargo.com/api/quote
 * and https://ship.countycargo.com/api/export-destinations) and provides an identical
 * fallback calculation engine so both websites always apply the exact same pricing rules,
 * minimum weights, volumetric weight formulas, handling fees, and VAT.
 */

import { SHIP_COUNTY_CARGO_QUOTE_URL, SHIP_COUNTY_CARGO_URL } from '@/lib/constants';
import {
  HAULAM_EXPORT_COUNTRIES,
  HAULAM_EXPRESS_EXPORT_RATES,
} from '@/lib/haulam-pricing-table';

export type ServiceLevelId = 'value' | 'express' | 'special_express';

export type ShipServiceType =
  | 'valueImport'
  | 'expressImport'
  | 'specialExpressImport'
  | 'valueExport'
  | 'expressExport'
  | 'specialExpressExport';

export interface ShipAdditionalCharge {
  name: string;
  amount: number;
}

export interface ShipQuoteEstimate {
  serviceType: ShipServiceType | string;
  serviceName: string;
  estimate: number;
  baseCost: number;
  additionalCharges?: ShipAdditionalCharge[];
  rate: number;
  billableWeight: number;
  actualWeight?: number;
  volumetricWeight?: number;
  weightUnit: 'kg' | 'lb';
  exchangeRate?: number;
  currency: 'GBP' | 'USD' | 'NGN';
  handlingFee?: number;
  minimumWeightApplied: boolean;
  minimumWeight: number;
  approxNgnEstimate?: number;
  description: string;
  estimatedDelivery: string;
  deliveryMethod?: string;
  trackingInfo?: string;
  customsInfo?: string;
  features?: string[];
  isBestValue?: boolean;
  isFastest?: boolean;
  bookingUrl?: string;
  whatsAppUrl?: string;
}

export interface ShipQuoteRequestPayload {
  originCountry: string;
  originCity: string;
  destinationCountry: string;
  destinationCity?: string;
  weight: number;
  length?: number;
  width?: number;
  height?: number;
  dimensionUnit?: 'cm' | 'in';
  handoverMethod?: 'depot' | 'collection';
  category?: string;
  serviceType?: string;
}

export interface ShipQuoteApiResponse {
  success: boolean;
  origin: {
    country: string;
    city: string;
  };
  destination: {
    country: string;
    city: string;
  };
  weight: number;
  actualWeight: number;
  volumetricWeight: number;
  chargeableWeight: number;
  units: 'metric' | 'imperial';
  weightUnit: 'kg' | 'lb';
  dimensionUnit: 'cm' | 'in';
  length?: number;
  width?: number;
  height?: number;
  handoverMethod: 'depot' | 'collection';
  estimates: ShipQuoteEstimate[];
  source?: 'ship-county-cargo-api' | 'fallback-engine';
  error?: string;
}

export interface ServiceComparisonCard {
  id: ServiceLevelId;
  serviceType?: string;
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
  volumetricWeight?: number;
  chargeableWeight: number;
  weightUnit?: 'kg' | 'lb';
  minimumWeight: number;
  minimumWeightApplied?: boolean;
  baseCost?: number;
  handlingFee: number;
  collectionFee: number;
  additionalCharges: number;
  additionalChargesList?: ShipAdditionalCharge[];
  totalEstimatedPrice: number;
  formattedTotal: string;
  currency: 'GBP' | 'NGN' | 'USD';
  convertedEstimate?: string;
  approxNgnEstimate?: number;
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
  dimensionUnit?: 'cm' | 'in';
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
  weightUnit?: 'kg' | 'lb';
  services: ServiceComparisonCard[];
  estimates?: ShipQuoteEstimate[];
  error?: string;
}

// Exchange rates aligned with Ship County Cargo API
export const DEFAULT_EXCHANGE_RATES = {
  ngnPerGbp: 1998,
  ngnPerUsd: 1400,
};

// Default export destinations matching Ship County Cargo
export const DEFAULT_EXPORT_DESTINATIONS: string[] = [
  'United Kingdom',
  'United States',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'United Arab Emirates',
  'South Africa',
  'Ireland',
  'Italy',
  'Spain',
  'Netherlands',
  'Ghana',
  'Kenya',
  'China',
  'India',
  'Belgium',
  'Switzerland',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Austria',
  'Poland',
  'Portugal',
  'Saudi Arabia',
  'Qatar',
  'Kuwait',
  'Bahrain',
  'Oman',
  'Turkey',
  'Egypt',
  'Morocco',
  'Senegal',
  'Cameroon',
  'Ivory Coast',
  'Uganda',
  'Tanzania',
  'Rwanda',
  'Zambia',
  'Zimbabwe',
  'Brazil',
  'Mexico',
  'Japan',
  'South Korea',
  'Singapore',
  'Malaysia',
  'New Zealand',
];

// Official Handover & Delivery Locations
export const ORIGIN_LOCATIONS = {
  Nigeria: [
    { id: 'lagos-hub', name: 'Lagos Drop-off (Ladipo-Oshodi)', city: 'Lagos', hub: 'Lagos Hub' },
    { id: 'abuja-hub', name: 'Abuja Drop-off (Wuye Market)', city: 'Abuja', hub: 'Abuja Hub' },
    { id: 'lagos-pickup', name: 'Lagos Doorstep Collection', city: 'Lagos', hub: 'Lagos Hub', isCollection: true },
    { id: 'abuja-pickup', name: 'Abuja Doorstep Collection', city: 'Abuja', hub: 'Abuja Hub', isCollection: true },
  ],
  'United Kingdom': [
    { id: 'london-depot', name: 'London Heathrow Depot', city: 'London', hub: 'London Hub' },
    { id: 'liverpool-depot', name: 'Liverpool Queens Dock Depot (L1 0BG)', city: 'Liverpool', hub: 'Liverpool Hub' },
    { id: 'london-pickup', name: 'London Doorstep Collection', city: 'London', hub: 'London Hub', isCollection: true },
    { id: 'uk-nationwide-pickup', name: 'UK Nationwide Courier Collection', city: 'UK Nationwide', hub: 'UK Hub', isCollection: true },
  ],
  'United States': [
    { id: 'us-warehouse', name: 'US Warehouse (Irving, TX)', city: 'Dallas / Irving', hub: 'US Central Hub' },
    { id: 'us-nationwide-pickup', name: 'US Nationwide Courier Pickup', city: 'Nationwide USA', hub: 'US Hub', isCollection: true },
  ],
  Canada: [
    { id: 'ca-depot', name: 'Toronto Queensway Depot', city: 'Toronto', hub: 'Canada Central Hub' },
    { id: 'ca-nationwide-pickup', name: 'Canada Nationwide Courier Pickup', city: 'Nationwide Canada', hub: 'Canada Hub', isCollection: true },
  ],
};

export const DESTINATION_CITIES: Record<string, string[]> = {
  Nigeria: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano', 'Kaduna', 'Enugu', 'Benin City', 'Warri', 'Calabar', 'Other States'],
  'United Kingdom': ['London', 'Liverpool', 'Manchester', 'Birmingham', 'Leeds', 'Newcastle', 'Glasgow', 'Nationwide UK'],
  'United States': ['Houston', 'Dallas', 'Atlanta', 'New York', 'Chicago', 'Maryland', 'Washington DC', 'Los Angeles', 'Nationwide USA'],
  Canada: ['Toronto', 'Calgary', 'Vancouver', 'Ottawa', 'Montreal', 'Edmonton'],
};

/**
 * Builds the "Continue to Book" URL on Ship County Cargo carrying all quote details
 */
export function buildShipCountyCargoBookingUrl(params: {
  originCountry: string;
  originCity?: string;
  destinationCountry: string;
  destinationCity?: string;
  serviceType: string;
  serviceName: string;
  weight: number;
  weightUnit: 'kg' | 'lb';
  billableWeight: number;
  volumetricWeight?: number;
  length?: number;
  width?: number;
  height?: number;
  dimensionUnit?: 'cm' | 'in';
  estimate: number;
  baseCost?: number;
  handlingFee?: number;
  currency: 'GBP' | 'USD' | 'NGN';
  estimatedDelivery?: string;
  handoverMethod?: 'depot' | 'collection';
}): string {
  const query = new URLSearchParams();
  query.set('originCountry', params.originCountry);
  if (params.originCity) query.set('originCity', params.originCity);
  query.set('destinationCountry', params.destinationCountry);
  if (params.destinationCity) query.set('destinationCity', params.destinationCity);
  query.set('service', params.serviceType);
  query.set('serviceName', params.serviceName);
  query.set('weight', String(params.weight));
  query.set('weightUnit', params.weightUnit);
  query.set('chargeableWeight', String(params.billableWeight));
  if (params.volumetricWeight && params.volumetricWeight > 0) {
    query.set('volumetricWeight', String(params.volumetricWeight));
  }
  if (params.length && params.length > 0) query.set('length', String(params.length));
  if (params.width && params.width > 0) query.set('width', String(params.width));
  if (params.height && params.height > 0) query.set('height', String(params.height));
  if (params.dimensionUnit) query.set('dimensionUnit', params.dimensionUnit);
  query.set('quote', String(Math.round(params.estimate * 100) / 100));
  if (params.baseCost !== undefined) {
    query.set('baseCost', String(Math.round(params.baseCost * 100) / 100));
  }
  if (params.handlingFee !== undefined && params.handlingFee > 0) {
    query.set('handlingFee', String(params.handlingFee));
  }
  query.set('currency', params.currency);
  if (params.estimatedDelivery) query.set('estimatedDelivery', params.estimatedDelivery);
  if (params.handoverMethod) query.set('handoverMethod', params.handoverMethod);

  return `${SHIP_COUNTY_CARGO_QUOTE_URL}?${query.toString()}`;
}

/**
 * Builds a WhatsApp share URL for a calculated quote
 */
export function buildWhatsAppQuoteUrl(params: {
  originCountry: string;
  originCity?: string;
  destinationCountry: string;
  destinationCity?: string;
  serviceName: string;
  weight: number;
  weightUnit: 'kg' | 'lb';
  billableWeight: number;
  estimate: number;
  currency: 'GBP' | 'USD' | 'NGN';
  estimatedDelivery: string;
}): string {
  const symbol = params.currency === 'GBP' ? '£' : params.currency === 'USD' ? '$' : '₦';
  const formattedPrice = params.estimate.toLocaleString(undefined, {
    minimumFractionDigits: params.currency === 'NGN' ? 0 : 2,
    maximumFractionDigits: 2,
  });
  const routeText = `${params.originCountry}${params.originCity ? ` (${params.originCity})` : ''} → ${params.destinationCountry}${params.destinationCity ? ` (${params.destinationCity})` : ''}`;

  const text = `Hello County Cargo! Here is my quote:\n\n📦 Route: ${routeText}\n🚀 Service: ${params.serviceName}\n⚖️ Weight: ${params.weight} ${params.weightUnit} (Chargeable: ${params.billableWeight} ${params.weightUnit})\n💰 Final Total: ${symbol}${formattedPrice}\n⏱ Estimated Delivery: ${params.estimatedDelivery}\n\nPlease assist me with this shipment.`;
  return `https://wa.me/2348110000421?text=${encodeURIComponent(text)}`;
}

// Caching for live export destinations & DHL fallback data
interface DhlCountry {
  Country: string;
  Zone: number;
}
interface DhlPricing {
  Zone: number;
  [weightKey: string]: any;
}
let cachedExportDestinations: { data: DhlCountry[]; timestamp: number } | null = null;
let cachedDhlPricing: { data: DhlPricing[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000;

function getShipPortalConfig() {
  const baseUrl = (
    process.env.SHIP_COUNTY_CARGO_API_URL ||
    process.env.SHIP_PORTAL_API_URL ||
    SHIP_COUNTY_CARGO_URL
  ).replace(/\/$/, '');

  const apiKey =
    process.env.SHIP_COUNTY_CARGO_API_KEY ||
    process.env.SHIP_PORTAL_API_KEY ||
    '';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
    headers['x-api-key'] = apiKey;
  }

  return { baseUrl, headers };
}

/**
 * Fetches supported export destinations (233 countries aligned with Haulam & Ship County Cargo)
 */
export async function fetchShipCountyCargoDestinations(): Promise<DhlCountry[]> {
  return HAULAM_EXPORT_COUNTRIES;
}

/**
 * Normalizes country strings for consistent matching
 */
export function normalizeCountry(countryName: string): string {
  const norm = (countryName || '').trim().toLowerCase();
  if (norm.includes('nigeria') || norm === 'ng' || norm.startsWith('ng-')) return 'Nigeria';
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
  if (norm.includes('ireland') || norm === 'ie') return 'Ireland';
  if (norm.includes('spain') || norm === 'es') return 'Spain';
  if (norm.includes('netherlands') || norm === 'nl') return 'Netherlands';
  if (norm.includes('ghana') || norm === 'gh') return 'Ghana';
  if (norm.includes('kenya') || norm === 'ke') return 'Kenya';
  return countryName.trim();
}

/**
 * Computes volumetric weight using Ship County Cargo's exact rules:
 * - Metric routes (UK, Nigeria): Math.ceil((L_cm * W_cm * H_cm) / 5000) in kg
 * - Imperial route (US -> Nigeria): Math.ceil((L_in * W_in * H_in) / 139) in lb
 */
export function computeVolumetricWeight(params: {
  isImperialRoute: boolean;
  length?: number;
  width?: number;
  height?: number;
  dimensionUnit?: 'cm' | 'in';
}): {
  volumetricWeight: number;
  normalizedLength: number;
  normalizedWidth: number;
  normalizedHeight: number;
} {
  const rawL = Number(params.length) || 0;
  const rawW = Number(params.width) || 0;
  const rawH = Number(params.height) || 0;

  if (rawL <= 0 || rawW <= 0 || rawH <= 0) {
    return {
      volumetricWeight: 0,
      normalizedLength: 0,
      normalizedWidth: 0,
      normalizedHeight: 0,
    };
  }

  const inputUnit = params.dimensionUnit || (params.isImperialRoute ? 'in' : 'cm');

  if (params.isImperialRoute) {
    // Ship County Cargo expects inches for US -> Nigeria (divides by 139)
    const lengthIn = inputUnit === 'cm' ? rawL / 2.54 : rawL;
    const widthIn = inputUnit === 'cm' ? rawW / 2.54 : rawW;
    const heightIn = inputUnit === 'cm' ? rawH / 2.54 : rawH;
    const volLb = Math.ceil((lengthIn * widthIn * heightIn) / 139);
    return {
      volumetricWeight: volLb,
      normalizedLength: Math.round(lengthIn * 100) / 100,
      normalizedWidth: Math.round(widthIn * 100) / 100,
      normalizedHeight: Math.round(heightIn * 100) / 100,
    };
  } else {
    // Ship County Cargo expects cm for UK & Nigeria routes (divides by 5000)
    const lengthCm = inputUnit === 'in' ? rawL * 2.54 : rawL;
    const widthCm = inputUnit === 'in' ? rawW * 2.54 : rawW;
    const heightCm = inputUnit === 'in' ? rawH * 2.54 : rawH;
    const volKg = Math.ceil((lengthCm * widthCm * heightCm) / 5000);
    return {
      volumetricWeight: volKg,
      normalizedLength: Math.round(lengthCm * 100) / 100,
      normalizedWidth: Math.round(widthCm * 100) / 100,
      normalizedHeight: Math.round(heightCm * 100) / 100,
    };
  }
}

/**
 * Calls the live Ship County Cargo API (POST https://ship.countycargo.com/api/quote)
 * and enriches the estimates with booking URLs, WhatsApp URLs, and volumetric weight details.
 * Falls back to the identical local pricing engine only if the remote API cannot be reached.
 */
export async function fetchShipCountyCargoQuote(
  req: ShipQuoteRequestPayload
): Promise<ShipQuoteApiResponse> {
  const originCountry = normalizeCountry(req.originCountry);
  const destinationCountry = normalizeCountry(req.destinationCountry);
  const isUsOrigin = originCountry === 'United States';
  const isUkOrigin = originCountry === 'United Kingdom';
  const isNigeriaOrigin = originCountry === 'Nigeria';

  let originCity = (req.originCity || '').trim();
  if (!originCity) {
    if (isUkOrigin) originCity = 'London Heathrow Depot';
    else if (isUsOrigin) originCity = 'US Warehouse (Irving, TX)';
    else originCity = 'Lagos Drop-off (Ladipo-Oshodi)';
  } else if (isNigeriaOrigin) {
    if (originCity.toLowerCase().includes('abuja') && !originCity.toLowerCase().includes('drop-off')) {
      originCity = 'Abuja Drop-off (Wuye Market)';
    } else if (originCity.toLowerCase().includes('lagos') && !originCity.toLowerCase().includes('drop-off')) {
      originCity = 'Lagos Drop-off (Ladipo-Oshodi)';
    }
  }

  let destinationCity = (req.destinationCity || '').trim();
  if ((isUkOrigin || isUsOrigin) && destinationCountry === 'Nigeria') {
    if (!destinationCity) {
      destinationCity = 'Lagos';
    } else if (destinationCity.toLowerCase().includes('lagos')) {
      destinationCity = 'Lagos';
    } else if (destinationCity.toLowerCase().includes('abuja')) {
      destinationCity = 'Abuja';
    }
  }

  const weight = Number(req.weight);
  const isImperialRoute = isUsOrigin && destinationCountry === 'Nigeria';
  const weightUnit: 'kg' | 'lb' = isImperialRoute ? 'lb' : 'kg';
  const dimensionUnit: 'cm' | 'in' = req.dimensionUnit || (isImperialRoute ? 'in' : 'cm');

  if (isNaN(weight) || weight <= 0) {
    return {
      success: false,
      origin: { country: originCountry, city: originCity },
      destination: { country: destinationCountry, city: destinationCity },
      weight: 0,
      actualWeight: 0,
      volumetricWeight: 0,
      chargeableWeight: 0,
      units: isImperialRoute ? 'imperial' : 'metric',
      weightUnit,
      dimensionUnit,
      handoverMethod: req.handoverMethod || 'depot',
      estimates: [],
      error: isImperialRoute
        ? 'Please enter a valid weight in pounds (lb).'
        : 'Please enter a valid weight in kilograms (kg).',
    };
  }

  const { volumetricWeight, normalizedLength, normalizedWidth, normalizedHeight } =
    computeVolumetricWeight({
      isImperialRoute,
      length: req.length,
      width: req.width,
      height: req.height,
      dimensionUnit,
    });

  const handoverMethod = req.handoverMethod || 'depot';

  // For Nigeria export routes, use the Haulam-aligned export pricing table directly
  // so 25 kg Nigeria -> USA matches Haulam's ₦400,000 (Value Export) and ₦733,713 (Express Export).
  if (isNigeriaOrigin) {
    return calculateFallbackShipQuote({
      originCountry,
      originCity,
      destinationCountry,
      destinationCity,
      weight,
      volumetricWeight,
      length: req.length,
      width: req.width,
      height: req.height,
      dimensionUnit,
      handoverMethod,
    });
  }

  const { baseUrl, headers } = getShipPortalConfig();

  const upstreamPayload: Record<string, any> = {
    originCountry,
    originCity,
    destinationCountry,
    destinationCity,
    weight,
    handoverMethod,
    category: req.category || 'General Goods',
  };

  if (normalizedLength > 0 && normalizedWidth > 0 && normalizedHeight > 0) {
    upstreamPayload.length = normalizedLength;
    upstreamPayload.width = normalizedWidth;
    upstreamPayload.height = normalizedHeight;
  }

  try {
    const res = await fetch(`${baseUrl}/api/quote`, {
      method: 'POST',
      headers,
      body: JSON.stringify(upstreamPayload),
      cache: 'no-store',
    });

    const data = await res.json();

    if (res.ok && data && Array.isArray(data.estimates) && data.estimates.length > 0) {
      const enrichedEstimates: ShipQuoteEstimate[] = data.estimates.map((est: ShipQuoteEstimate) => {
        // Disable VAT on all quotes/payments: strip any VAT surcharge from upstream response
        const vatCharge = est.additionalCharges?.find((c) => c.name.toUpperCase() === 'VAT')?.amount || 0;
        const filteredCharges = (est.additionalCharges || []).filter(
          (c) => c.name.toUpperCase() !== 'VAT'
        );
        const cleanEstimate =
          vatCharge > 0
            ? est.baseCost !== undefined
              ? est.baseCost + (est.handlingFee || 0)
              : Math.max(0, est.estimate - vatCharge)
            : est.estimate;

        const bookingUrl = buildShipCountyCargoBookingUrl({
          originCountry,
          originCity,
          destinationCountry,
          destinationCity,
          serviceType: est.serviceType,
          serviceName: est.serviceName,
          weight,
          weightUnit: est.weightUnit || weightUnit,
          billableWeight: est.billableWeight,
          volumetricWeight,
          length: req.length,
          width: req.width,
          height: req.height,
          dimensionUnit,
          estimate: cleanEstimate,
          baseCost: est.baseCost,
          handlingFee: est.handlingFee,
          currency: est.currency,
          estimatedDelivery: est.estimatedDelivery,
          handoverMethod,
        });
        const whatsAppUrl = buildWhatsAppQuoteUrl({
          originCountry,
          originCity,
          destinationCountry,
          destinationCity,
          serviceName: est.serviceName,
          weight,
          weightUnit: est.weightUnit || weightUnit,
          billableWeight: est.billableWeight,
          estimate: cleanEstimate,
          currency: est.currency,
          estimatedDelivery: est.estimatedDelivery,
        });

        const defaultFeatures = est.features || [
          `Delivery in ${est.estimatedDelivery}`,
          est.deliveryMethod || 'Doorstep delivery',
          ...(est.serviceType.toLowerCase().includes('express') && !est.serviceType.toLowerCase().includes('special')
            ? ['Shipment via DHL']
            : []),
          est.customsInfo || '15% additional tarrif on declared value applies',
        ];

        return {
          ...est,
          estimate: cleanEstimate,
          additionalCharges: filteredCharges,
          features: defaultFeatures,
          actualWeight: weight,
          volumetricWeight,
          bookingUrl,
          whatsAppUrl,
        };
      });

      const primaryBillable = enrichedEstimates[0]?.billableWeight || Math.max(Math.ceil(weight), volumetricWeight, 1);

      return {
        success: true,
        origin: data.origin || { country: originCountry, city: originCity },
        destination: data.destination || { country: destinationCountry, city: destinationCity },
        weight,
        actualWeight: weight,
        volumetricWeight,
        chargeableWeight: primaryBillable,
        units: data.units || (isImperialRoute ? 'imperial' : 'metric'),
        weightUnit: data.weightUnit || weightUnit,
        dimensionUnit,
        length: req.length,
        width: req.width,
        height: req.height,
        handoverMethod,
        estimates: enrichedEstimates,
        source: 'ship-county-cargo-api',
      };
    }

    if (!res.ok && data?.error) {
      return {
        success: false,
        origin: { country: originCountry, city: originCity },
        destination: { country: destinationCountry, city: destinationCity },
        weight,
        actualWeight: weight,
        volumetricWeight,
        chargeableWeight: Math.max(weight, volumetricWeight),
        units: isImperialRoute ? 'imperial' : 'metric',
        weightUnit,
        dimensionUnit,
        handoverMethod,
        estimates: [],
        error: data.error,
      };
    }
  } catch (err) {
    console.error('Error reaching live Ship County Cargo API, using identical local fallback:', err);
  }

  // Identical local fallback calculation matching Ship County Cargo rules
  return calculateFallbackShipQuote({
    originCountry,
    originCity,
    destinationCountry,
    destinationCity,
    weight,
    volumetricWeight,
    length: req.length,
    width: req.width,
    height: req.height,
    dimensionUnit,
    handoverMethod,
  });
}

/**
 * Local fallback calculation matching https://ship.countycargo.com/api/quote 100%
 */
async function calculateFallbackShipQuote(params: {
  originCountry: string;
  originCity: string;
  destinationCountry: string;
  destinationCity: string;
  weight: number;
  volumetricWeight: number;
  length?: number;
  width?: number;
  height?: number;
  dimensionUnit: 'cm' | 'in';
  handoverMethod: 'depot' | 'collection';
}): Promise<ShipQuoteApiResponse> {
  const {
    originCountry,
    originCity,
    destinationCountry,
    destinationCity,
    weight,
    volumetricWeight,
    length,
    width,
    height,
    dimensionUnit,
    handoverMethod,
  } = params;

  const isUkOrigin = originCountry === 'United Kingdom';
  const isUsOrigin = originCountry === 'United States';
  const isNigeriaOrigin = originCountry === 'Nigeria';
  const isNigeriaDest = destinationCountry === 'Nigeria';
  const isImperialRoute = isUsOrigin && isNigeriaDest;
  const weightUnit: 'kg' | 'lb' = isImperialRoute ? 'lb' : 'kg';
  const roundedEnteredWeight = Math.max(1, Math.ceil(weight));
  const rawMaxWeight = Math.max(roundedEnteredWeight, volumetricWeight);

  const estimates: ShipQuoteEstimate[] = [];

  if (isUkOrigin && isNigeriaDest) {
    const isLagos = destinationCity.toLowerCase().includes('lagos');
    const billableWeight = Math.max(rawMaxWeight, 1);
    const minApplied = weight < 1 || volumetricWeight > weight;

    // 1. Value Import
    const valueRate = isLagos ? 6 : 6.5;
    const valueBase = valueRate * billableWeight;
    const valueHandling = 15;
    const valueEstimate = valueBase + valueHandling;
    estimates.push({
      serviceType: 'valueImport',
      serviceName: 'Value Import (UK)',
      estimate: valueEstimate,
      baseCost: valueBase,
      additionalCharges: [{ name: '15% Additional Tarrif', amount: 0 }],
      rate: valueRate,
      billableWeight,
      actualWeight: weight,
      volumetricWeight,
      weightUnit: 'kg',
      exchangeRate: 1998,
      currency: 'GBP',
      handlingFee: valueHandling,
      minimumWeightApplied: minApplied,
      minimumWeight: 1,
      description: 'Affordable shipping from the UK to Nigeria.',
      estimatedDelivery: '5-10 working days',
      deliveryMethod: 'Hub Pick-up or Doorstep',
      trackingInfo: 'Milestone tracking updates available',
      customsInfo: '15% additional tarrif on declared value applies',
      features: [
        'Delivery in 5-10 working days',
        'Doorstep or collection point delivery',
        'Includes £15 handling fee',
        '15% additional tarrif on declared value applies',
      ],
      isBestValue: true,
      isFastest: false,
    });

    // 2. Express Import
    const expressRate = 22;
    const expressBase = expressRate * billableWeight;
    const expressHandling = 20;
    const expressEstimate = expressBase + expressHandling;
    estimates.push({
      serviceType: 'expressImport',
      serviceName: 'Express Import',
      estimate: expressEstimate,
      baseCost: expressBase,
      additionalCharges: [{ name: '15% Additional Tarrif', amount: 0 }],
      rate: expressRate,
      billableWeight,
      actualWeight: weight,
      volumetricWeight,
      weightUnit: 'kg',
      exchangeRate: 1998,
      currency: 'GBP',
      handlingFee: expressHandling,
      minimumWeightApplied: minApplied,
      minimumWeight: 1,
      description: 'Fast and reliable import to Nigeria.',
      estimatedDelivery: '3-5 working days',
      deliveryMethod: 'Doorstep delivery',
      trackingInfo: 'Real-time end-to-end tracking included',
      customsInfo: '15% additional tarrif on declared value applies',
      features: [
        'Delivery in 3-5 working days',
        'Doorstep delivery',
        'Includes £20 priority handling fee',
        '15% additional tarrif on declared value applies',
      ],
      isBestValue: false,
      isFastest: !isLagos,
    });

    // 3. Special Express Shipping (48-Hour) - Lagos only
    if (isLagos) {
      estimates.push({
        serviceType: 'specialExpressImport',
        serviceName: 'Special Express (48-Hour)',
        estimate: expressEstimate,
        baseCost: expressBase,
        additionalCharges: [{ name: '15% Additional Tarrif', amount: 0 }],
        rate: expressRate,
        billableWeight,
        actualWeight: weight,
        volumetricWeight,
        weightUnit: 'kg',
        exchangeRate: 1998,
        currency: 'GBP',
        handlingFee: expressHandling,
        minimumWeightApplied: minApplied,
        minimumWeight: 1,
        approxNgnEstimate: Math.round(expressEstimate * 1998),
        description: 'Guaranteed 48-hour express delivery to Lagos.',
        estimatedDelivery: '48 hours',
        deliveryMethod: 'Priority Lagos Delivery',
        trackingInfo: 'Dedicated priority flight tracking',
        customsInfo: '15% additional tarrif on declared value applies',
        features: [
          'Delivery in 48 hours from flight departure',
          'Priority Lagos doorstep delivery',
          'Includes £20 priority handling fee',
          '15% additional tarrif on declared value applies',
        ],
        isBestValue: false,
        isFastest: true,
      });
    }
  } else if (isUsOrigin && isNigeriaDest) {
    const isLagos = destinationCity.toLowerCase().includes('lagos');
    const billableWeight = Math.max(rawMaxWeight, 1);
    const minApplied = weight < 1 || volumetricWeight > weight;
    const rate = isLagos ? 5 : 5.5;
    const baseCost = rate * billableWeight;

    estimates.push({
      serviceType: 'valueImport',
      serviceName: 'Value Import (US)',
      estimate: baseCost,
      baseCost,
      additionalCharges: [{ name: '15% Additional Tarrif', amount: 0 }],
      rate,
      billableWeight,
      actualWeight: weight,
      volumetricWeight,
      weightUnit: 'lb',
      exchangeRate: 1400,
      currency: 'USD',
      minimumWeightApplied: minApplied,
      minimumWeight: 1,
      description: 'Affordable shipping from the US to Nigeria.',
      estimatedDelivery: '5-10 working days',
      deliveryMethod: 'Doorstep or Hub Pick-up',
      trackingInfo: 'Milestone tracking updates available',
      customsInfo: '15% additional tarrif on declared value applies',
      features: [
        'Delivery in 5-10 working days',
        'Doorstep or collection point delivery',
        'No handling fee ($0)',
        '15% additional tarrif on declared value applies',
      ],
      isBestValue: true,
      isFastest: true,
    });
  } else if (isNigeriaOrigin) {
    const isAbuja = originCity.toLowerCase().includes('abuja');
    const isUkDest = destinationCountry === 'United Kingdom';
    const isUsDest = destinationCountry === 'United States';
    const isCanadaDest = destinationCountry === 'Canada';

    const matchedCountry =
      HAULAM_EXPORT_COUNTRIES.find(
        (c) => c.Country.toLowerCase() === destinationCountry.toLowerCase()
      ) ||
      HAULAM_EXPORT_COUNTRIES.find(
        (c) =>
          c.Country.toLowerCase().includes(destinationCountry.toLowerCase()) ||
          destinationCountry.toLowerCase().includes(c.Country.toLowerCase())
      ) || { Country: destinationCountry, Zone: isUkDest ? 1 : isUsDest || isCanadaDest ? 3 : 4 };

    const zoneRates = HAULAM_EXPRESS_EXPORT_RATES[matchedCountry.Zone] || HAULAM_EXPRESS_EXPORT_RATES[3];

    // 1. Value Export (10 kg minimum, matching Haulam Value Export)
    const valueBillable = Math.max(rawMaxWeight, 10);
    const valueMinApplied = weight < 10 || volumetricWeight > weight;
    let valueRate = 16000;
    let valueDelivery = '10-15 working days';
    let valueDescription = 'Economical shipping from Nigeria.';
    let valueCustomsNote = '15% additional tarrif on declared value applies';
    let valueFeatures: string[] = [
      'Delivery in 10-15 working days',
      'Doorstep delivery',
      '15% additional tarrif on declared value applies',
    ];

    if (isUkDest) {
      valueRate = isAbuja ? 11000 : 10000;
      valueDelivery = '5-10 working days';
      valueCustomsNote = 'No customs fee';
      valueFeatures = [
        'Delivery in 5-10 working days',
        'Doorstep delivery',
        'No customs fee',
      ];
    } else if (isUsDest) {
      valueRate = isAbuja ? 17000 : 16000;
      valueDelivery = '10-15 working days';
      valueCustomsNote = '15% additional tarrif on declared value applies';
      valueFeatures = [
        'Delivery in 10-15 working days',
        'Doorstep delivery',
        '15% additional tarrif on declared value applies',
      ];
    } else if (isCanadaDest) {
      valueRate = isAbuja ? 15500 : 14500;
      valueDelivery = '10-15 business days';
      valueDescription = 'Affordable shipping to Canada.';
      valueCustomsNote = 'Zero customs fees for receiver';
      valueFeatures = [
        'Delivery in 10-15 business days',
        'Doorstep delivery across Canada',
        'Zero customs fees for receiver',
        '10kg minimum billable weight',
      ];
    } else {
      // Other international destinations
      const tenKgExpress = zoneRates['10.0kg'] || 348240;
      valueRate = Math.round((tenKgExpress * 0.8) / 10);
    }

    const valueBaseCost = Math.round(valueRate * valueBillable);
    const valueEstimate = valueBaseCost;

    // Include Value Export on UK, US, Canada (and all destinations when comparing)
    if (isUkDest || isUsDest || isCanadaDest) {
      estimates.push({
        serviceType: 'valueExport',
        serviceName: 'Value Export',
        estimate: valueEstimate,
        baseCost: valueBaseCost,
        additionalCharges: [{ name: '15% Additional Tarrif', amount: 0 }],
        rate: valueRate,
        billableWeight: valueBillable,
        actualWeight: weight,
        volumetricWeight,
        weightUnit: 'kg',
        exchangeRate: 1400,
        currency: 'NGN',
        minimumWeightApplied: valueMinApplied,
        minimumWeight: 10,
        description: valueDescription,
        estimatedDelivery: valueDelivery,
        deliveryMethod: 'Doorstep delivery',
        trackingInfo: 'Milestone tracking updates available',
        customsInfo: valueCustomsNote,
        features: valueFeatures,
        isBestValue: true,
        isFastest: false,
      });
    }

    // 2. Express Export (matching Haulam Express Export: e.g., 25 kg Lagos -> US = ₦733,713)
    const effectiveRawWeight = Math.max(weight, volumetricWeight, 0.5);
    const lookupWeight =
      effectiveRawWeight <= 30
        ? Math.ceil(effectiveRawWeight * 2) / 2
        : Math.ceil(effectiveRawWeight);
    const expressBillable = Math.max(lookupWeight, 0.5);
    const expressMinApplied = weight < 0.5 || volumetricWeight > weight;

    let expressBaseCost = 0;
    if (lookupWeight <= 65) {
      const key = `${lookupWeight.toFixed(1)}kg`;
      expressBaseCost = zoneRates[key] || zoneRates[`${Math.ceil(lookupWeight).toFixed(1)}kg`] || 0;
    } else {
      const base65 = zoneRates['65.0kg'] || 1665416;
      const base64 = zoneRates['64.0kg'] || 1638000;
      const perKgIncrement = Math.max(base65 - base64, 25000);
      expressBaseCost = base65 + Math.round((lookupWeight - 65) * perKgIncrement);
    }

    if (isAbuja) {
      expressBaseCost += Math.max(Math.ceil(expressBillable), 10) * 1000;
    }

    const expressEstimate = Math.round(expressBaseCost);

    estimates.push({
      serviceType: 'expressExport',
      serviceName: 'Express Export',
      estimate: expressEstimate,
      baseCost: expressEstimate,
      additionalCharges: [],
      rate: Math.round(expressEstimate / Math.max(expressBillable, 1)),
      billableWeight: expressBillable,
      actualWeight: weight,
      volumetricWeight,
      weightUnit: 'kg',
      exchangeRate: 1400,
      currency: 'NGN',
      minimumWeightApplied: expressMinApplied,
      minimumWeight: 0.5,
      description: 'Fast international shipping from Nigeria.',
      estimatedDelivery: '3-5 working days',
      deliveryMethod: 'Doorstep delivery',
      trackingInfo: 'Shipment via DHL',
      customsInfo: 'Receiver is responsible for customs fees',
      features: [
        'Delivery in 3-5 working days',
        'Doorstep delivery',
        'Shipment via DHL',
        'Receiver is responsible for customs fees',
      ],
      isBestValue: !(isUkDest || isUsDest || isCanadaDest),
      isFastest: true,
    });
  }

  const enriched = estimates.map((est) => {
    return {
      ...est,
      bookingUrl: buildShipCountyCargoBookingUrl({
        originCountry,
        originCity,
        destinationCountry,
        destinationCity,
        serviceType: est.serviceType,
        serviceName: est.serviceName,
        weight,
        weightUnit: est.weightUnit,
        billableWeight: est.billableWeight,
        volumetricWeight,
        length,
        width,
        height,
        dimensionUnit,
        estimate: est.estimate,
        baseCost: est.baseCost,
        handlingFee: est.handlingFee,
        currency: est.currency,
        estimatedDelivery: est.estimatedDelivery,
        handoverMethod,
      }),
      whatsAppUrl: buildWhatsAppQuoteUrl({
        originCountry,
        originCity,
        destinationCountry,
        destinationCity,
        serviceName: est.serviceName,
        weight,
        weightUnit: est.weightUnit,
        billableWeight: est.billableWeight,
        estimate: est.estimate,
        currency: est.currency,
        estimatedDelivery: est.estimatedDelivery,
      }),
    };
  });

  if (enriched.length === 0) {
    return {
      success: false,
      origin: { country: originCountry, city: originCity },
      destination: { country: destinationCountry, city: destinationCity },
      weight,
      actualWeight: weight,
      volumetricWeight,
      chargeableWeight: rawMaxWeight,
      units: isImperialRoute ? 'imperial' : 'metric',
      weightUnit,
      dimensionUnit,
      handoverMethod,
      estimates: [],
      error: `No shipping services available between ${originCountry} and ${destinationCountry}.`,
    };
  }

  return {
    success: true,
    origin: { country: originCountry, city: originCity },
    destination: { country: destinationCountry, city: destinationCity },
    weight,
    actualWeight: weight,
    volumetricWeight,
    chargeableWeight: enriched[0].billableWeight,
    units: isImperialRoute ? 'imperial' : 'metric',
    weightUnit,
    dimensionUnit,
    length,
    width,
    height,
    handoverMethod,
    estimates: enriched,
    source: 'fallback-engine',
  };
}

/**
 * Master central quotation calculator returning both ShipQuoteEstimate[] and ServiceComparisonCard[]
 */
export async function calculateCentralQuote(params: QuoteCalculationParams): Promise<CentralQuoteResponse> {
  const fromCountry = normalizeCountry(params.fromCountry);
  const toCountry = normalizeCountry(params.toCountry);
  const fromCity = (params.fromCity || '').trim() || 'Default Origin Hub';
  const toCity = (params.toCity || '').trim() || (toCountry === 'Nigeria' ? 'Lagos' : '');
  const weight = Number(params.weight);

  const apiResult = await fetchShipCountyCargoQuote({
    originCountry: fromCountry,
    originCity: fromCity,
    destinationCountry: toCountry,
    destinationCity: toCity,
    weight,
    length: params.length,
    width: params.width,
    height: params.height,
    dimensionUnit: params.dimensionUnit,
    handoverMethod: params.collectionType === 'collection' ? 'collection' : 'depot',
    category: params.packageCategory || 'General Goods',
  });

  if (!apiResult.success || apiResult.estimates.length === 0) {
    return {
      success: false,
      fromCountry,
      fromCity,
      toCountry,
      toCity,
      enteredWeight: weight || 0,
      volumetricWeight: apiResult.volumetricWeight || 0,
      chargeableWeight: apiResult.chargeableWeight || 0,
      weightUnit: apiResult.weightUnit,
      services: [],
      estimates: [],
      error: apiResult.error || 'Could not calculate shipping quote.',
    };
  }

  const services: ServiceComparisonCard[] = apiResult.estimates.map((est) => {
    const isSpecial = est.serviceType.toLowerCase().includes('special');
    const isExpress = est.serviceType.toLowerCase().includes('express') && !isSpecial;
    const id: ServiceLevelId = isSpecial ? 'special_express' : isExpress ? 'express' : 'value';
    const symbol = est.currency === 'GBP' ? '£' : est.currency === 'USD' ? '$' : '₦';
    const formattedTotal = `${symbol}${est.estimate.toLocaleString(undefined, {
      minimumFractionDigits: est.currency === 'NGN' ? 0 : 2,
      maximumFractionDigits: 2,
    })}`;

    const approxNgn =
      est.approxNgnEstimate ||
      (est.currency !== 'NGN' && est.exchangeRate ? Math.round(est.estimate * est.exchangeRate) : undefined);

    return {
      id,
      serviceType: est.serviceType,
      name: est.serviceName,
      badge: est.isFastest ? 'Fastest' : est.isBestValue ? 'Best Value' : undefined,
      tagline: est.description,
      route: `${fromCountry} (${fromCity}) → ${toCountry}${toCity ? ` (${toCity})` : ''}`,
      originCountry: fromCountry,
      originCity: fromCity,
      destinationCountry: toCountry,
      destinationCity: toCity,
      ratePerKg: est.rate,
      ratePerKgDisplay: `${symbol}${est.rate.toLocaleString(undefined, {
        minimumFractionDigits: est.currency === 'NGN' ? 0 : 2,
        maximumFractionDigits: 2,
      })}/${est.weightUnit}`,
      enteredWeight: weight,
      volumetricWeight: apiResult.volumetricWeight,
      chargeableWeight: est.billableWeight,
      weightUnit: est.weightUnit,
      minimumWeight: est.minimumWeight,
      minimumWeightApplied: est.minimumWeightApplied,
      baseCost: est.baseCost,
      handlingFee: est.handlingFee || 0,
      collectionFee: 0,
      additionalCharges: 0,
      additionalChargesList: est.additionalCharges,
      totalEstimatedPrice: est.estimate,
      formattedTotal,
      currency: est.currency,
      convertedEstimate: approxNgn ? `~₦${approxNgn.toLocaleString()}` : undefined,
      approxNgnEstimate: approxNgn,
      estimatedDeliveryTime: est.estimatedDelivery,
      trackingAvailability: true,
      customsInformation: est.customsInfo || 'Standard customs processing included',
      features: [
        `Delivery in ${est.estimatedDelivery}`,
        `Minimum chargeable weight: ${est.minimumWeight} ${est.weightUnit}`,
        est.deliveryMethod || 'Doorstep or Hub delivery',
        est.customsInfo || 'Full milestone tracking included',
      ],
      bookingUrl: est.bookingUrl || SHIP_COUNTY_CARGO_QUOTE_URL,
      whatsAppUrl: est.whatsAppUrl || '',
    };
  });

  return {
    success: true,
    fromCountry,
    fromCity,
    toCountry,
    toCity,
    enteredWeight: weight,
    volumetricWeight: apiResult.volumetricWeight,
    chargeableWeight: apiResult.chargeableWeight,
    weightUnit: apiResult.weightUnit,
    services,
    estimates: apiResult.estimates,
  };
}
