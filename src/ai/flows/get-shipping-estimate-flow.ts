

'use server';
/**
 * @fileOverview A shipping price estimation service.
 *
 * - getShippingEstimate - A function that calculates the shipping cost.
 * - GetShippingEstimateInput - The input type for the getShippingEstimate function.
 * - GetShippingEstimateOutput - The return type for the getShippingEstimate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import type { DhlCountry, DhlPricing } from '@/lib/pricing-types';
import { AppSettings, getSettings, ApplicableService, AdditionalCharge } from '@/lib/settings';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserProfile } from '@/lib/types';
import { parseFirestoreDate } from '@/lib/utils';


// Caching logic for DHL data
const dhlCountriesCacheRef = doc(db, 'cache', 'dhlCountries');
const dhlPricingCacheRef = doc(db, 'cache', 'dhlPricing');

async function getCachedDhlCountries(): Promise<DhlCountry[] | null> {
    const cacheDoc = await getDoc(dhlCountriesCacheRef);
    if (cacheDoc.exists()) {
        const data = cacheDoc.data();
        if (data.timestamp) {
            const lastFetched = parseFirestoreDate(data.timestamp);
            // Cache is valid for 24 hours
            if (lastFetched && (new Date().getTime() - lastFetched.getTime()) < 24 * 60 * 60 * 1000) {
                return data.countries;
            }
        }
    }
    
    // Fetch fresh data
    const countriesResponse = await fetch('https://script.google.com/macros/s/AKfycbwswey5v1XMO3FDLfxptcplZJRn6O8nYvM2Wjf5jh0_qOfsdOSmQEoqBZ6hMkG_q18/exec?action=getDHLCountries');
    if (!countriesResponse.ok) {
        console.error('Failed to fetch fresh DHL country data. Status:', countriesResponse.status);
        return null;
    };

    try {
        const countriesData = (await countriesResponse.json()) as DhlCountry[];
        // Update cache
        await setDoc(dhlCountriesCacheRef, {
            countries: countriesData,
            timestamp: Timestamp.now()
        });
        return countriesData;
    } catch (error) {
        console.error("Error parsing DHL countries JSON:", error);
        return null; // Return null if JSON parsing fails
    }
}


async function getCachedDhlPricing(): Promise<DhlPricing[] | null> {
    const cacheDoc = await getDoc(dhlPricingCacheRef);
    if (cacheDoc.exists()) {
        const data = cacheDoc.data();
        if (data.timestamp) {
            const lastFetched = parseFirestoreDate(data.timestamp);
            // Cache is valid for 24 hours
            if (lastFetched && (new Date().getTime() - lastFetched.getTime()) < 24 * 60 * 60 * 1000) {
                return data.pricing;
            }
        }
    }

    // Fetch fresh data
    const pricingUrl = 'https://script.google.com/macros/s/AKfycbyb3DOEM-JTAw_k8hAz7FKsKRusqlruMrshBebwoMZzY4M34YhkmX3GTYuGKw9gAJ_U/exec?action=getDHLExportPricing';
    const pricingResponse = await fetch(pricingUrl);
    if (!pricingResponse.ok) {
        console.error('Failed to fetch fresh DHL pricing data. Status:', pricingResponse.status);
        return null;
    }

    try {
        const pricingData = (await pricingResponse.json()) as DhlPricing[];
        // Update cache
        await setDoc(dhlPricingCacheRef, {
            pricing: pricingData,
            timestamp: Timestamp.now()
        });
        return pricingData;
    } catch (error) {
        console.error("Error parsing DHL pricing JSON:", error);
        return null; // Return null if JSON parsing fails
    }
}


const PackageSchema = z.object({
  weight: z.number(),
  length: z.number(),
  width: z.number(),
  height: z.number(),
  description: z.string().optional(),
  value: z.number().optional(),
  itemType: z.string().optional(), // For predefined items like 'new-phone'
  quantity: z.number().optional(), // For quantity of fixed-price items
});

const GetShippingEstimateInputSchema = z.object({
  address: z.string().describe('The full address of the non-Nigerian location for exports, or the origin country (e.g., "United States") for imports.'),
  destinationAddress: z.string().optional().describe('The destination address, required for imports.'),
  packages: z.array(PackageSchema).describe('An array of packages with their weight and dimensions.'),
  units: z.enum(['metric', 'imperial']).describe('The unit system for weight and dimensions (metric: kg/cm, imperial: lbs/in).'),
  shipmentType: z.enum(['import', 'export']).describe('The type of shipment.'),
  settings: z.custom<AppSettings>().optional().describe('Optional current pricing settings to use for calculation.'),
  customer: z.custom<UserProfile>().optional().describe('Optional customer profile to check for special pricing.'),
});
export type GetShippingEstimateInput = z.infer<typeof GetShippingEstimateInputSchema>;

const PackageCostSchema = z.object({
  cost: z.number(),
  billableWeight: z.number(),
  weightUsed: z.enum(['actual', 'volumetric']).optional(),
  description: z.string().optional(),
});
export type PackageCostFlow = z.infer<typeof PackageCostSchema>;

const AppliedChargeSchema = z.object({
  name: z.string(),
  amount: z.number(),
});

const ServiceEstimateSchema = z.object({
  serviceType: z.string(),
  serviceName: z.string(),
  estimate: z.number().optional(),
  perPackageCosts: z.array(PackageCostSchema).optional(),
  rate: z.number().optional(),
  billableWeight: z.number().optional(),
  exchangeRate: z.number().optional(),
  handlingFee: z.number().optional(),
  minimumWeightApplied: z.boolean().optional(),
  minimumWeight: z.number().optional(),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  baseCost: z.number().optional(),
  additionalCharges: z.array(AppliedChargeSchema).optional(),
});
export type ServiceEstimate = z.infer<typeof ServiceEstimateSchema>;

const GetShippingEstimateOutputSchema = z.object({
  estimates: z.array(ServiceEstimateSchema).optional(),
  error: z.string().optional(),
});
export type GetShippingEstimateOutput = z.infer<typeof GetShippingEstimateOutputSchema>;

export async function getShippingEstimate(
  input: GetShippingEstimateInput
): Promise<GetShippingEstimateOutput> {
  return getShippingEstimateFlow(input);
}

const fixedPriceMap = {
    us: {
        'used-phone': 50,
        'new-phone': 100,
        'used-laptop': 70,
        'new-laptop': 100,
    },
    uk: {
        'used-phone': 50,
        'new-phone': 100,
        'used-laptop': 70,
        'new-laptop': 120,
    }
};

const getShippingEstimateFlow = ai.defineFlow(
  {
    name: 'getShippingEstimateFlow',
    inputSchema: GetShippingEstimateInputSchema,
    outputSchema: GetShippingEstimateOutputSchema,
  },
  async (input) => {
    try {
      if (!input.destinationAddress && input.shipmentType === 'import') {
        return { error: 'Destination address in Nigeria is required for import estimates.' };
      }
      
      const settings = input.settings || await getSettings();
      const customer = input.customer;
      const isAgent = customer?.role === 'Agent';

      const { additionalCharges, ngnPerUsd, ngnPerGbp } = settings;
      
      const packagesWithBillableWeight = input.packages.map(pkg => {
         const actualWeight = Number(pkg.weight);
         const { length, width, height } = pkg;
         const divisor = input.units === 'imperial' ? 139 : 5000;
         const volumetricWeight = (length * width * height) / divisor;
         const billableWeight = Math.max(actualWeight, volumetricWeight);
         return {
          ...pkg,
          billableWeight: billableWeight,
          weightUsed: (volumetricWeight > actualWeight ? 'volumetric' : 'actual') as 'actual' | 'volumetric',
         }
      });
      
      const totalBillableWeight = packagesWithBillableWeight.reduce((sum, pkg) => sum + pkg.billableWeight, 0);
      const totalDeclaredValue = packagesWithBillableWeight.reduce((sum, pkg) => sum + (pkg.value || 0), 0);
      const estimates: ServiceEstimate[] = [];

      const applyAdditionalCharges = (baseEstimate: number, applicableService: ApplicableService) => {
        let finalEstimate = baseEstimate;
        const appliedCharges: { name: string; amount: number }[] = [];

        // Filter and sort charges for correct application order
        const declaredValueCharges = additionalCharges.filter(charge =>
          charge.enabled &&
          charge.appliesTo.includes(applicableService) &&
          charge.type === 'percentage_declared_value'
        );
        const fixedCharges = additionalCharges.filter(charge =>
          charge.enabled &&
          charge.appliesTo.includes(applicableService) &&
          charge.type === 'fixed_ngn'
        );
        const shipmentCostCharges = additionalCharges.filter(charge =>
          charge.enabled &&
          charge.appliesTo.includes(applicableService) &&
          charge.type === 'percentage_shipment_cost'
        );

        // 1. Apply charges based on declared value to the base estimate
        declaredValueCharges.forEach(charge => {
            const amount = totalDeclaredValue * (charge.value / 100);
            finalEstimate += amount;
            appliedCharges.push({ name: charge.name, amount });
        });
        
        // 2. Apply fixed charges
        fixedCharges.forEach(charge => {
            const amount = charge.value;
            finalEstimate += amount;
            appliedCharges.push({ name: charge.name, amount });
        });
        
        // 3. Apply charges based on the shipment cost so far
        shipmentCostCharges.forEach(charge => {
            const amount = finalEstimate * (charge.value / 100);
            finalEstimate += amount;
            appliedCharges.push({ name: charge.name, amount });
        });

        return { finalEstimate, appliedCharges };
      };


      // --- IMPORT PRICING ---
      if (input.shipmentType === 'import') {
          const isUSImport = input.address === "United States";
          const isUKImport = input.address === "United Kingdom";

          if (isUSImport) {
            let totalCostUSD = 0;
            const perPackageCosts: PackageCostFlow[] = [];
            const weightBasedPackages = [];

            for (const pkg of packagesWithBillableWeight) {
                const desc = pkg.description?.toLowerCase() || '';
                const itemType = pkg.itemType; // from admin dropdown
                let fixedCost: number | null = null;
                let itemDescription = '';
                
                if (itemType && fixedPriceMap.us[itemType as keyof typeof fixedPriceMap.us]) {
                    const singleItemCost = fixedPriceMap.us[itemType as keyof typeof fixedPriceMap.us];
                    const quantity = pkg.quantity || 1;
                    fixedCost = singleItemCost * quantity;
                    itemDescription = `${quantity}x ${itemType.replace(/-/g, ' ')}`;
                } 
                else {
                    if (desc.includes('phone')) {
                        if (desc.includes('used')) {
                            fixedCost = fixedPriceMap.us['used-phone'];
                            itemDescription = 'Used Phone';
                        } else {
                            fixedCost = fixedPriceMap.us['new-phone'];
                            itemDescription = 'New Phone';
                        }
                    } else if (desc.includes('laptop')) {
                         if (desc.includes('used')) {
                            fixedCost = fixedPriceMap.us['used-laptop'];
                            itemDescription = 'Used Laptop';
                        } else {
                            fixedCost = fixedPriceMap.us['new-laptop'];
                            itemDescription = 'New Laptop';
                        }
                    }
                }

                if (fixedCost !== null) {
                    totalCostUSD += fixedCost;
                    perPackageCosts.push({
                        cost: fixedCost,
                        billableWeight: 0,
                        description: itemDescription
                    });
                } else {
                    weightBasedPackages.push(pkg);
                }
            }
            
            const isLagos = /lagos/i.test(input.destinationAddress!);
            const ratePerLb = isAgent ? (isLagos ? settings.agentUsToLagosRate : settings.agentUsToOtherRate) : (isLagos ? settings.usToLagosRate : settings.usToOtherRate);
            let minimumWeightApplied = false;
            let finalBillableWeight = 0;
            let weightBasedCost = 0;

            if (weightBasedPackages.length > 0) {
                const roundedTotalBillableWeight = weightBasedPackages.reduce((sum, pkg) => {
                    return sum + Math.ceil(pkg.billableWeight);
                }, 0);
                
                const minWeight = settings.usMinWeight;
                finalBillableWeight = Math.max(roundedTotalBillableWeight, minWeight);
                minimumWeightApplied = finalBillableWeight > roundedTotalBillableWeight;

                weightBasedCost = finalBillableWeight * ratePerLb;
                totalCostUSD += weightBasedCost;

                perPackageCosts.push({
                    cost: weightBasedCost,
                    billableWeight: finalBillableWeight,
                    description: 'Weight-based items'
                });
            }
            
            const baseEstimateNGN = totalCostUSD * ngnPerUsd;
            const { finalEstimate, appliedCharges } = applyAdditionalCharges(baseEstimateNGN, 'valueImport-US');
            
            estimates.push({
              serviceType: 'valueImport',
              serviceName: 'Value Import (US)',
              estimate: finalEstimate,
              baseCost: baseEstimateNGN,
              additionalCharges: appliedCharges,
              perPackageCosts: perPackageCosts,
              rate: ratePerLb,
              billableWeight: finalBillableWeight,
              exchangeRate: ngnPerUsd,
              minimumWeightApplied,
              minimumWeight: settings.usMinWeight,
              description: 'Affordable shipping from the US to Nigeria.',
              features: ['Delivery in 5-10 business days', 'Delivery to collection point', 'No customs fee'],
            });

          } else if (isUKImport) {
            let totalCostGBP = 0;
            const perPackageCosts: PackageCostFlow[] = [];
            const weightBasedPackages = [];

            for (const pkg of packagesWithBillableWeight) {
                const itemType = pkg.itemType;
                let fixedCost: number | null = null;
                let itemDescription = '';

                if (itemType && fixedPriceMap.uk[itemType as keyof typeof fixedPriceMap.uk]) {
                    const singleItemCost = fixedPriceMap.uk[itemType as keyof typeof fixedPriceMap.uk];
                    const quantity = pkg.quantity || 1;
                    fixedCost = singleItemCost * quantity;
                    itemDescription = `${quantity}x ${itemType.replace(/-/g, ' ')}`;
                    
                    totalCostGBP += fixedCost;
                    perPackageCosts.push({
                        cost: fixedCost,
                        billableWeight: 0,
                        description: itemDescription
                    });
                } else {
                    weightBasedPackages.push(pkg);
                }
            }

            const isLagos = /lagos/i.test(input.destinationAddress!);
            const ratePerKg = isAgent ? (isLagos ? settings.agentUkToLagosRate : settings.agentUkToOtherRate) : (isLagos ? settings.ukToLagosRate : settings.ukToOtherRate);
            let minimumWeightApplied = false;
            let finalBillableWeight = 0;
            let weightBasedCost = 0;
            let handlingFeeGBP = 0;

            if (weightBasedPackages.length > 0) {
                const roundedTotalBillableWeight = weightBasedPackages.reduce((sum, pkg) => {
                    return sum + Math.ceil(pkg.billableWeight);
                }, 0);
                
                const minWeight = settings.ukMinWeight;
                finalBillableWeight = Math.max(roundedTotalBillableWeight, minWeight);
                minimumWeightApplied = finalBillableWeight > roundedTotalBillableWeight;

                weightBasedCost = finalBillableWeight * ratePerKg;
                totalCostGBP += weightBasedCost;
                
                // Only apply handling fee to weight-based items
                if (settings.ukHandlingFee > 0) {
                    handlingFeeGBP = settings.ukHandlingFee;
                    totalCostGBP += handlingFeeGBP;
                }

                perPackageCosts.push({
                    cost: weightBasedCost,
                    billableWeight: finalBillableWeight,
                    description: 'Weight-based items'
                });
            }
            
            const baseCostForeign = totalCostGBP;
            const baseEstimateNGN = baseCostForeign * ngnPerGbp;

            const { finalEstimate, appliedCharges } = applyAdditionalCharges(baseEstimateNGN, 'valueImport-UK');
            
            estimates.push({ 
              serviceType: 'valueImport',
              serviceName: 'Value Import (UK)',
              estimate: finalEstimate,
              baseCost: baseEstimateNGN,
              additionalCharges: appliedCharges,
              perPackageCosts: perPackageCosts,
              rate: ratePerKg,
              billableWeight: finalBillableWeight,
              exchangeRate: ngnPerGbp,
              handlingFee: handlingFeeGBP, // Report the fee if it was applied
              minimumWeightApplied,
              minimumWeight: settings.ukMinWeight,
              description: 'Affordable shipping from the UK to Nigeria.',
              features: ['Delivery in 5-10 business days', 'Delivery to collection point', 'No customs fee'],
            });
          }
          
          if (estimates.length > 0) {
            return { estimates };
          }
      }

      // --- EXPORT PRICING ---
      if (input.shipmentType === 'export') {
        const countriesData = await getCachedDhlCountries();
        if (!countriesData) {
            return { error: "Could not retrieve DHL country data. Please try again later." };
        }
        
        const addressString = input.address.toLowerCase();
        let countryInfo: DhlCountry | undefined;

        const isToUSA = /\b(usa|united states|united states of america)\b/i.test(input.address);
        const isToUK = /\b(uk|united kingdom)\b/i.test(input.address);

        if (isToUSA) {
            countryInfo = countriesData.find(c => c.Country === "United States");
        } else if (isToUK) {
            countryInfo = countriesData.find(c => c.Country === "United Kingdom");
        } else {
            const sortedCountries = countriesData.sort((a, b) => b.Country.length - a.Country.length);

            for (const c of sortedCountries) {
                if (addressString.endsWith(c.Country.toLowerCase())) {
                    countryInfo = c;
                    break;
                }
            }
        }
        
        if (countryInfo) {
            const zone = countryInfo.Zone;
            const pricingData = await getCachedDhlPricing();
            if (!pricingData) {
                return { error: "Could not retrieve DHL pricing data. Please try again later." };
            }
            const zonePricingData = pricingData.find(p => p.Zone === zone);

            if (zonePricingData) {
                const getPriceForWeight = (weight: number): number | { error: string } => {
                  let price: number | undefined;
                  let minApplicableWeight = Infinity;
                  
                  let lowestWeight = Infinity;
                  let lowestWeightPrice: number | undefined;

                  for (const weightKey in zonePricingData) {
                      if (weightKey === 'Zone' || weightKey.includes('+')) continue;
                      const keyWeight = parseFloat(weightKey.replace('kg', ''));
                      if (isNaN(keyWeight)) continue;
                      if (keyWeight < lowestWeight) {
                          lowestWeight = keyWeight;
                          lowestWeightPrice = zonePricingData[weightKey] as number;
                      }
                  }

                  if (weight <= lowestWeight && lowestWeightPrice !== undefined) {
                      return lowestWeightPrice;
                  }
                  
                  for (const weightKey in zonePricingData) {
                    if (weightKey === 'Zone' || weightKey.includes('+')) continue;
                    const keyWeight = parseFloat(weightKey.replace('kg', ''));
                    if (isNaN(keyWeight)) continue;
                    
                    if (weight <= keyWeight && keyWeight < minApplicableWeight) {
                      minApplicableWeight = keyWeight;
                      price = zonePricingData[weightKey] as number;
                    }
                  }

                  if (price !== undefined) {
                     return price;
                  }
                  
                  let maxWeight = 0;
                  let maxWeightPrice: number | undefined;
                  for(const weightKey in zonePricingData) {
                    if (weightKey === 'Zone' || weightKey.includes('+')) continue;
                    const keyWeight = parseFloat(weightKey.replace('kg', ''));
                    if (!isNaN(keyWeight) && keyWeight > maxWeight) {
                      maxWeight = keyWeight;
                      maxWeightPrice = zonePricingData[weightKey] as number;
                    }
                  }
                  
                  if (weight > maxWeight && maxWeightPrice !== undefined && maxWeight > 0) {
                     const overagePriceKey = Object.keys(zonePricingData).find(k => k.includes('+'));
                     if(overagePriceKey && zonePricingData[overagePriceKey] && typeof zonePricingData[overagePriceKey] === 'number') {
                        const basePrice = maxWeightPrice;
                        const extraWeight = weight - maxWeight;
                        const overageRate = zonePricingData[overagePriceKey] as number;
                        return basePrice + (extraWeight * overageRate);
                     }
                     return { error: `The package weight of ${weight.toFixed(2)}kg exceeds the maximum shippable weight of ${maxWeight}kg for this destination.` };
                  }
                  
                  return { error: `Could not determine a price for a shipment of ${weight.toFixed(2)}kg to Zone ${zone}. Please check weight.` };
                };
                
                const perPackageCosts: {cost: number, billableWeight: number, weightUsed?: 'actual' | 'volumetric'}[] = [];
                let totalEstimate = 0;
                let expressError: string | null = null;

                for (const pkg of packagesWithBillableWeight) {
                  const priceResult = getPriceForWeight(pkg.billableWeight);

                  if (typeof priceResult === 'object' && priceResult.error) {
                    expressError = `Package ${input.packages.indexOf(pkg) + 1}: ${priceResult.error}`;
                    break;
                  }
                  
                  const packageCost = priceResult as number;
                  perPackageCosts.push({
                      cost: packageCost,
                      billableWeight: pkg.billableWeight,
                      weightUsed: pkg.weightUsed,
                  });
                  totalEstimate += packageCost;
                }
                
                if (!expressError) {
                  const { finalEstimate, appliedCharges } = applyAdditionalCharges(totalEstimate, 'expressExport');
                  estimates.push({
                      serviceType: 'expressExport',
                      serviceName: 'Express Export',
                      estimate: finalEstimate,
                      baseCost: totalEstimate,
                      additionalCharges: appliedCharges,
                      perPackageCosts,
                      billableWeight: totalBillableWeight,
                      description: 'The fastest way to ship your items internationally.',
                      features: ['Delivery in 3-5 business days', 'Doorstep delivery', 'Shipment via DHL', 'Receiver is responsible for customs fees'],
                  });
                }
            }
        }
        
        if (isToUSA || isToUK) {
            const baseRatePerKg = isToUSA 
                ? (isAgent ? settings.agentValueExportToUSARate : settings.valueExportToUSARate)
                : (isAgent ? settings.agentValueExportToUKRate : settings.valueExportToUKRate);

            let effectiveRate = baseRatePerKg;
            let specialItemsKeywords: string[] = [];
            let specialRate = 0;

            if (isToUSA && settings.valueExportToUSASpecialItems) {
                specialItemsKeywords = settings.valueExportToUSASpecialItems.toLowerCase().split(',').map(k => k.trim()).filter(k => k);
                specialRate = settings.valueExportToUSASpecialRate;
            } else if (isToUK && settings.valueExportToUKSpecialItems) {
                specialItemsKeywords = settings.valueExportToUKSpecialItems.toLowerCase().split(',').map(k => k.trim()).filter(k => k);
                specialRate = settings.valueExportToUKSpecialRate;
            }

            const hasSpecialItem = packagesWithBillableWeight.some(pkg =>
                specialItemsKeywords.length > 0 && specialItemsKeywords.some(keyword =>
                    pkg.description?.toLowerCase().includes(keyword)
                )
            );

            if (hasSpecialItem) {
                effectiveRate += specialRate;
            }

            const totalRoundedBillableWeight = packagesWithBillableWeight.reduce((sum, pkg) => sum + Math.ceil(pkg.billableWeight), 0);
            
            const minWeight = isToUSA ? settings.usValueExportMinWeight : settings.ukValueExportMinWeight;
            const finalBillableWeight = Math.max(totalRoundedBillableWeight, minWeight);
            const minimumWeightApplied = finalBillableWeight > totalRoundedBillableWeight;

            const baseEstimateNGN = finalBillableWeight * effectiveRate;
            
            const { finalEstimate, appliedCharges } = applyAdditionalCharges(baseEstimateNGN, isToUSA ? 'valueExport-US' : 'valueExport-UK');

            estimates.push({
              serviceType: 'valueExport',
              serviceName: 'Value Export',
              estimate: finalEstimate,
              baseCost: baseEstimateNGN,
              additionalCharges: appliedCharges,
              rate: effectiveRate, // Use the final calculated rate
              billableWeight: finalBillableWeight,
              minimumWeightApplied,
              minimumWeight: minWeight,
              description: 'A more affordable option for your less urgent shipments.',
              features: ['Delivery in 10-15 business days', 'Doorstep delivery', 'No customs fee'],
            });
        }
        
        if (estimates.length > 0) {
          return { estimates: estimates.sort((a,b) => (a.estimate || Infinity) - (b.estimate || Infinity)) };
        } else {
          return { error: `Shipping to the specified destination is not available. Please ensure the country is spelled correctly.` };
        }

      }

      return { error: "Invalid shipment type specified." };

    } catch (err: any) {
      console.error("Error in getShippingEstimateFlow:", err);
      return { error: err.message || 'An unexpected error occurred while calculating the shipping estimate.' };
    }
  }
);

    

    