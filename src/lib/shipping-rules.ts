/**
 * Central Shipping Rules & Minimum Chargeable Weight Configuration
 * Single source of truth shared across County Cargo application and website.
 */

export const ROUTE_MINIMUM_WEIGHTS = {
  // United Kingdom to Nigeria: minimum chargeable weight is 1 kg
  UK_TO_NIGERIA_MIN_KG: 1,

  // United States to Nigeria: minimum chargeable weight is 1 lb (Pounds only)
  US_TO_NIGERIA_MIN_LB: 1,

  // Nigeria Value Shipping to any destination: minimum chargeable weight is 10 kg
  NIGERIA_VALUE_EXPORT_MIN_KG: 10,

  // Nigeria Express Shipping to any destination: minimum chargeable weight is 1 kg
  NIGERIA_EXPRESS_EXPORT_MIN_KG: 1,
} as const;

export interface ChargeableWeightInput {
  actualWeight: number;
  length?: number;
  width?: number;
  height?: number;
  originCountry: string;
  destinationCountry: string;
  serviceType?: string;
  units?: 'metric' | 'imperial';
}

export interface ChargeableWeightResult {
  actualWeight: number;
  volumetricWeight: number;
  minWeight: number;
  chargeableWeight: number;
  unit: 'kg' | 'lb';
  isMinWeightApplied: boolean;
}

/**
 * Normalizes route and determines the route minimum chargeable weight and unit.
 */
export function getRouteMinimumWeight(
  originCountry: string,
  destinationCountry: string,
  serviceType?: string
): { minWeight: number; unit: 'kg' | 'lb' } {
  const normOrigin = (originCountry || '').toLowerCase();
  const normDest = (destinationCountry || '').toLowerCase();
  const normService = (serviceType || '').toLowerCase();

  // US to Nigeria (Pounds only, 1 lb min)
  if (/united states|usa|us/i.test(normOrigin) && /nigeria/i.test(normDest)) {
    return { minWeight: ROUTE_MINIMUM_WEIGHTS.US_TO_NIGERIA_MIN_LB, unit: 'lb' };
  }

  // UK to Nigeria (1 kg min)
  if (/united kingdom|uk|great britain|gb/i.test(normOrigin) && /nigeria/i.test(normDest)) {
    return { minWeight: ROUTE_MINIMUM_WEIGHTS.UK_TO_NIGERIA_MIN_KG, unit: 'kg' };
  }

  // Nigeria Exports
  if (/nigeria/i.test(normOrigin) && !/nigeria/i.test(normDest)) {
    // Value Export: 10 kg minimum to any destination
    if (normService.includes('value') || normService.includes('standard')) {
      return { minWeight: ROUTE_MINIMUM_WEIGHTS.NIGERIA_VALUE_EXPORT_MIN_KG, unit: 'kg' };
    }
    // Express Export (DHL / Special Express): 1 kg minimum to any destination
    return { minWeight: ROUTE_MINIMUM_WEIGHTS.NIGERIA_EXPRESS_EXPORT_MIN_KG, unit: 'kg' };
  }

  // Default fallback
  return { minWeight: 1, unit: 'kg' };
}

/**
 * Calculates chargeable weight using the greater of:
 * 1. Actual weight
 * 2. Volumetric weight
 * 3. Applicable route minimum
 */
export function calculateChargeableWeight(input: ChargeableWeightInput): ChargeableWeightResult {
  const { actualWeight, length = 0, width = 0, height = 0, originCountry, destinationCountry, serviceType } = input;
  
  const { minWeight, unit } = getRouteMinimumWeight(originCountry, destinationCountry, serviceType);

  // Volumetric calculation: only when all 3 dimensions are strictly greater than 0
  let volumetricWeight = 0;
  if (length > 0 && width > 0 && height > 0) {
    if (unit === 'lb' || input.units === 'imperial') {
      // Imperial: (L x W x H in inches) / 139
      volumetricWeight = Math.round(((length * width * height) / 139) * 100) / 100;
    } else {
      // Metric: (L x W x H in cm) / 5000
      volumetricWeight = Math.round(((length * width * height) / 5000) * 100) / 100;
    }
  }

  const baseWeight = Math.max(actualWeight || 0, volumetricWeight);
  const chargeableWeight = Math.max(baseWeight, minWeight);

  return {
    actualWeight: actualWeight || 0,
    volumetricWeight,
    minWeight,
    chargeableWeight,
    unit,
    isMinWeightApplied: chargeableWeight > baseWeight,
  };
}
