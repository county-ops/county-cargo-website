'use server';

/**
 * @fileOverview A shipping cost estimation mock/static agent.
 *
 * - estimateShippingCost - A function that estimates the shipping cost based on package details.
 * - ShippingCostInput - The input type for the estimateShippingCost function.
 * - ShippingCostOutput - The return type for the estimateShippingCost function.
 */

import { z } from 'zod';

export const ShippingCostInputSchema = z.object({
  from: z.string().describe('The origin city in the UK.'),
  to: z.string().describe('The destination city in Nigeria.'),
  weight: z.number().describe('The weight of the package in kilograms.'),
  length: z.number().describe('The length of the package in centimeters.'),
  width: z.number().describe('The width of the package in centimeters.'),
  height: z.number().describe('The height of the package in centimeters.'),
});
export type ShippingCostInput = z.infer<typeof ShippingCostInputSchema>;

export const ShippingCostOutputSchema = z.object({
  estimatedCost: z.number().describe('The estimated shipping cost in GBP.'),
  currency: z.string().describe('The currency of the estimated cost, which is GBP.'),
  details: z.string().describe('A breakdown of how the cost was estimated.'),
});
export type ShippingCostOutput = z.infer<typeof ShippingCostOutputSchema>;

export async function estimateShippingCost(input: ShippingCostInput): Promise<ShippingCostOutput> {
  // Volumetric weight formula: (Length x Width x Height) / 5000
  const volumetricWeight = (input.length > 0 && input.width > 0 && input.height > 0) ? (input.length * input.width * input.height) / 5000 : 0;
  const minWeight = 1; // UK to Nigeria: minimum chargeable weight is 1 kg
  const chargeableWeight = Math.max(input.weight, volumetricWeight, minWeight);
  
  const baseRatePerKg = 6.50; // GBP per kg
  const freightCost = chargeableWeight * baseRatePerKg;
  const handlingFee = 10.00; // Handling & documentation fee
  
  const destination = input.to.toLowerCase();
  const localDeliveryFee = destination.includes('lagos') ? 5.00 : 15.00;
  
  const estimatedCost = Math.round((freightCost + handlingFee + localDeliveryFee) * 100) / 100;
  
  const details = `Cost Breakdown:
- Volumetric Weight: ${volumetricWeight.toFixed(2)} kg (${input.length} x ${input.width} x ${input.height} cm / 5000)
- Actual Weight: ${input.weight.toFixed(2)} kg
- Chargeable Weight: ${chargeableWeight.toFixed(2)} kg (higher of actual, volumetric, or 1 kg minimum)
- Base Air Freight (UK to Nigeria): £${freightCost.toFixed(2)} (£${baseRatePerKg.toFixed(2)}/kg)
- Handling & Admin Fee: £${handlingFee.toFixed(2)}
- Local Delivery (${input.to}): £${localDeliveryFee.toFixed(2)}
- Total Estimated Shipping Cost: £${estimatedCost.toFixed(2)}`;

  return {
    estimatedCost,
    currency: 'GBP',
    details,
  };
}
