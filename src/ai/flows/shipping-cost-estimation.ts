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
  destination: z.string().describe('The destination address for the package.'),
  weight: z.number().describe('The weight of the package in kilograms.'),
  length: z.number().describe('The length of the package in centimeters.'),
  width: z.number().describe('The width of the package in centimeters.'),
  height: z.number().describe('The height of the package in centimeters.'),
});
export type ShippingCostInput = z.infer<typeof ShippingCostInputSchema>;

const ShippingCostOutputSchema = z.object({
  estimatedCost: z.number().describe('The estimated shipping cost in USD.'),
  currency: z.string().describe('The currency of the estimated cost, which is USD.'),
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
  prompt: `You are an expert logistics cost estimator.  Given the package details, provide an estimated shipping cost in USD.

  Destination: {{{destination}}}
  Weight (kg): {{{weight}}}
  Dimensions (cm): {{{length}}}x{{{width}}}x{{{height}}}

  Consider these factors when estimating:
  - Base shipping fees
  - Distance to destination
  - Weight and size of the package
  - Any surcharges for oversized or heavy packages
  - Current fuel costs

  Provide a breakdown of how you arrived at the estimated cost in the details field.
  The currency should always be USD.
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
