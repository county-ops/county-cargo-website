'use server';

/**
 * @fileOverview A shipping cost estimation AI agent.
 *
 * - estimateShippingCost - A function that estimates the shipping cost based on package details.
 * - ShippingCostInput - The input type for the estimateShippingCost function.
 * - ShippingCostOutput - The return type for the estimateShippingCost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ShippingCostInputSchema = z.object({
  from: z.string().describe('The origin city in the UK.'),
  to: z.string().describe('The destination city in Nigeria.'),
  weight: z.number().describe('The weight of the package in kilograms.'),
  length: z.number().describe('The length of the package in centimeters.'),
  width: z.number().describe('The width of the package in centimeters.'),
  height: z.number().describe('The height of the package in centimeters.'),
});
export type ShippingCostInput = z.infer<typeof ShippingCostInputSchema>;

const ShippingCostOutputSchema = z.object({
  estimatedCost: z.number().describe('The estimated shipping cost in GBP.'),
  currency: z.string().describe('The currency of the estimated cost, which is GBP.'),
  details: z.string().describe('A breakdown of how the cost was estimated.'),
});
export type ShippingCostOutput = z.infer<typeof ShippingCostOutputSchema>;

export async function estimateShippingCost(input: ShippingCostInput): Promise<ShippingCostOutput> {
  return estimateShippingCostFlow(input);
}

const estimateShippingCostPrompt = ai.definePrompt({
  name: 'estimateShippingCostPrompt',
  input: {schema: ShippingCostInputSchema},
  output: {schema: ShippingCostOutputSchema},
  prompt: `You are an expert logistics cost estimator. Given the package details for a shipment from the UK to Nigeria, provide an estimated shipping cost in GBP.

  From (UK): {{{from}}}
  To (Nigeria): {{{to}}}
  Weight (kg): {{{weight}}}
  Dimensions (cm): {{{length}}}x{{{width}}}x{{{height}}}

  Consider these factors when estimating:
  - Base shipping fees between the UK and Nigeria.
  - Distance from origin UK city to the airport and from the destination airport in Nigeria to the final city.
  - Weight and size of the package (volumetric weight).
  - Any surcharges for oversized or heavy packages.
  - Current fuel costs and currency conversion rates (to GBP).

  Provide a breakdown of how you arrived at the estimated cost in the details field.
  The currency should always be GBP.
  The estimated cost should be in pounds sterling (£).
`,
});

const estimateShippingCostFlow = ai.defineFlow(
  {
    name: 'estimateShippingCostFlow',
    inputSchema: ShippingCostInputSchema,
    outputSchema: ShippingCostOutputSchema,
  },
  async input => {
    const {output} = await estimateShippingCostPrompt(input);
    return output!;
  }
);
