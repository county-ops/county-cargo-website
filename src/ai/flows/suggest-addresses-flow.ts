
'use server';
/**
 * @fileOverview An address suggestion service using the Google Places API (New).
 *
 * - suggestAddresses - A function that returns address suggestions based on a user's input.
 * - AddressSuggestion - The type for a single address suggestion.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SuggestAddressesInputSchema = z.object({
  query: z.string().describe('The partial address string to search for.'),
  country: z.string().optional().describe('An optional country code to restrict the search (e.g., "ng").'),
});

const AddressSuggestionSchema = z.object({
  description: z.string().describe('The full, formatted address string.'),
  countryCode: z.string().optional().describe('The two-letter country code (e.g., "NG", "US").'),
});
export type AddressSuggestion = z.infer<typeof AddressSuggestionSchema>;

const SuggestAddressesOutputSchema = z.object({
  suggestions: z.array(AddressSuggestionSchema).optional(),
  error: z.string().optional(),
});

export async function suggestAddresses(input: z.infer<typeof SuggestAddressesInputSchema>): Promise<z.infer<typeof SuggestAddressesOutputSchema>> {
  return suggestAddressesFlow(input);
}

const suggestAddressesFlow = ai.defineFlow(
  {
    name: 'suggestAddressesFlow',
    inputSchema: SuggestAddressesInputSchema,
    outputSchema: SuggestAddressesOutputSchema,
  },
  async (input) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API key is not configured.');
      return { error: 'Address service is currently unavailable.' };
    }

    if (!input.query) {
      return { suggestions: [] };
    }

    try {
      // Step 1: Get autocomplete suggestions
      const autocompleteRequestBody: any = {
        input: input.query,
        includedRegionCodes: input.country ? [input.country] : undefined,
        languageCode: 'en',
      };

      const autocompleteResponse = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'suggestions.placePrediction.place,suggestions.placePrediction.text.text,suggestions.placePrediction.structuredFormat',
        },
        body: JSON.stringify(autocompleteRequestBody),
      });

      if (!autocompleteResponse.ok) {
        const errorBodyText = await autocompleteResponse.text();
        let errorBody;
        try {
            errorBody = JSON.parse(errorBodyText);
        } catch(e) {
            errorBody = { error: { message: errorBodyText || "Unknown API Error" }};
        }
        console.error('Places Autocomplete API Error:', errorBody);
        return { error: `Failed to fetch address suggestions. Status: ${autocompleteResponse.status}` };
      }
      
      const responseText = await autocompleteResponse.text();
      if (!responseText) {
        // Handle empty successful response to prevent JSON parsing error
        return { suggestions: [] };
      }
      const autocompleteData = JSON.parse(responseText) as any;


      if (!autocompleteData.suggestions || autocompleteData.suggestions.length === 0) {
        return { suggestions: [] };
      }
      
       const suggestions: AddressSuggestion[] = await Promise.all(
        autocompleteData.suggestions.map(async (s: any) => {
          const placeId = s.placePrediction?.place;
          const mainText = s.placePrediction?.structuredFormat?.mainText?.text || '';
          const secondaryText = s.placePrediction?.structuredFormat?.secondaryText?.text || '';
          const fullText = s.placePrediction?.text?.text || [mainText, secondaryText].filter(Boolean).join(', ');
          
          if (!placeId) {
            // Manual check for country code if Place ID is missing
            const lowerFullText = fullText.toLowerCase();
            let detectedCountryCode: string | undefined = undefined;
            for (const [code, names] of Object.entries(countryData)) {
              if (names.some(name => lowerFullText.includes(name.toLowerCase()))) {
                detectedCountryCode = code;
                break;
              }
            }
            return { description: fullText, countryCode: detectedCountryCode };
          }

          // Step 2: Fetch Place Details for each suggestion
          const detailsResponse = await fetch(`https://places.googleapis.com/v1/${placeId}`, {
            headers: {
              'Content-Type': 'application/json',
              'X-Goog-Api-Key': apiKey,
              'X-Goog-FieldMask': 'addressComponents,formattedAddress',
            },
          });
          
          if (!detailsResponse.ok) {
             return { description: fullText, countryCode: undefined };
          }
          
          const detailsText = await detailsResponse.text();
          if (!detailsText) {
            return { description: fullText, countryCode: undefined };
          }
          const detailsData = JSON.parse(detailsText);
          const addressComponents = detailsData.addressComponents || [];
          
          const countryComponent = addressComponents.find((c: any) => c.types && c.types.includes('country'));
          const countryCode = countryComponent ? countryComponent.shortText : undefined;
          
          return {
            description: detailsData.formattedAddress || fullText,
            countryCode: countryCode,
          };
        })
      );
      
      const uniqueSuggestions = Array.from(new Map(suggestions.map(item => [item.description, item])).values());
      
      return { suggestions: uniqueSuggestions };

    } catch (err: any) {
      console.error('Error in suggestAddressesFlow:', err);
      return { error: err.message || 'An unexpected error occurred while fetching addresses.' };
    }
  }
);


const countryData: { [key: string]: string[] } = {
  "AF": ["Afghanistan"], "AL": ["Albania"], "DZ": ["Algeria"], "AD": ["Andorra"], "AO": ["Angola"],
  "AR": ["Argentina"], "AM": ["Armenia"], "AU": ["Australia"], "AT": ["Austria"], "AZ": ["Azerbaijan"],
  "BS": ["Bahamas"], "BH": ["Bahrain"], "BD": ["Bangladesh"], "BB": ["Barbados"], "BY": ["Belarus"],
  "BE": ["Belgium"], "BZ": ["Belize"], "BJ": ["Benin"], "BT": ["Bhutan"], "BO": ["Bolivia"],
  "BA": ["Bosnia and Herzegovina"], "BW": ["Botswana"], "BR": ["Brazil"], "BN": ["Brunei"], "BG": ["Bulgaria"],
  "BF": ["Burkina Faso"], "BI": ["Burundi"], "CV": ["Cabo Verde", "Cape Verde"], "KH": ["Cambodia"], "CM": ["Cameroon"],
  "CA": ["Canada"], "CF": ["Central African Republic"], "TD": ["Chad"], "CL": ["Chile"], "CN": ["China"],
  "CO": ["Colombia"], "KM": ["Comoros"], "CG": ["Congo, Republic of the"], "CD": ["Congo, Democratic Republic of the"],
  "CR": ["Costa Rica"], "HR": ["Croatia"], "CU": ["Cuba"], "CY": ["Cyprus"], "CZ": ["Czech Republic", "Czechia"],
  "DK": ["Denmark"], "DJ": ["Djibouti"], "DM": ["Dominica"], "DO": ["Dominican Republic"], "EC": ["Ecuador"],
  "EG": ["Egypt"], "SV": ["El Salvador"], "GQ": ["Equatorial Guinea"], "ER": ["Eritrea"], "EE": ["Estonia"],
  "SZ": ["Eswatini", "Swaziland"], "ET": ["Ethiopia"], "FJ": ["Fiji"], "FI": ["Finland"], "FR": ["France"],
  "GA": ["Gabon"], "GM": ["Gambia"], "GE": ["Georgia"], "DE": ["Germany"], "GH": ["Ghana"], "GR": ["Greece"],
  "GD": ["Grenada"], "GT": ["Guatemala"], "GN": ["Guinea"], "GW": ["Guinea-Bissau"], "GY": ["Guyana"],
  "HT": ["Haiti"], "HN": ["Honduras"], "HU": ["Hungary"], "IS": ["Iceland"], "IN": ["India"],
  "ID": ["Indonesia"], "IR": ["Iran"], "IQ": ["Iraq"], "IE": ["Ireland"], "IL": ["Israel"], "IT": ["Italy"],
  "CI": ["Ivory Coast", "Côte d'Ivoire"], "JM": ["Jamaica"], "JP": ["Japan"], "JO": ["Jordan"], "KZ": ["Kazakhstan"],
  "KE": ["Kenya"], "KI": ["Kiribati"], "KW": ["Kuwait"], "KG": ["Kyrgyzstan"], "LA": ["Laos"], "LV": ["Latvia"],
  "LB": ["Lebanon"], "LS": ["Lesotho"], "LR": ["Liberia"], "LY": ["Libya"], "LI": ["Liechtenstein"],
  "LT": ["Lithuania"], "LU": ["Luxembourg"], "MG": ["Madagascar"], "MW": ["Malawi"], "MY": ["Malaysia"],
  "MV": ["Maldives"], "ML": ["Mali"], "MT": ["Malta"], "MH": ["Marshall Islands"], "MR": ["Mauritania"],
  "MU": ["Mauritius"], "MX": ["Mexico"], "FM": ["Micronesia"], "MD": ["Moldova"], "MC": ["Monaco"],
  "MN": ["Mongolia"], "ME": ["Montenegro"], "MA": ["Morocco"], "MZ": ["Mozambique"], "MM": ["Myanmar", "Burma"],
  "NA": ["Namibia"], "NR": ["Nauru"], "NP": ["Nepal"], "NL": ["Netherlands"], "NZ": ["New Zealand"],
  "NI": ["Nicaragua"], "NE": ["Niger"], "NG": ["Nigeria"], "KP": ["North Korea"], "MK": ["North Macedonia"],
  "NO": ["Norway"], "OM": ["Oman"], "PK": ["Pakistan"], "PW": ["Palau"], "PA": ["Panama"], "PG": ["Papua New Guinea"],
  "PY": ["Paraguay"], "PE": ["Peru"], "PH": ["Philippines"], "PL": ["Poland"], "PT": ["Portugal"], "QA": ["Qatar"],
  "RO": ["Romania"], "RU": ["Russia", "Russian Federation"], "RW": ["Rwanda"], "KN": ["Saint Kitts and Nevis"],
  "LC": ["Saint Lucia"], "VC": ["Saint Vincent and the Grenadines"], "WS": ["Samoa"], "SM": ["San Marino"],
  "ST": ["Sao Tome and Principe"], "SA": ["Saudi Arabia"], "SN": ["Senegal"], "RS": ["Serbia"], "SC": ["Seychelles"],
  "SL": ["Sierra Leone"], "SG": ["Singapore"], "SK": ["Slovakia"], "SI": ["Slovenia"], "SB": ["Solomon Islands"],
  "SO": ["Somalia"], "ZA": ["South Africa"], "KR": ["South Korea"], "SS": ["South Sudan"], "ES": ["Spain"],
  "LK": ["Sri Lanka"], "SD": ["Sudan"], "SR": ["Suriname"], "SE": ["Sweden"], "CH": ["Switzerland"],
  "SY": ["Syria"], "TW": ["Taiwan"], "TJ": ["Tajikistan"], "TZ": ["Tanzania"], "TH": ["Thailand"],
  "TL": ["Timor-Leste"], "TG": ["Togo"], "TO": ["Tonga"], "TT": ["Trinidad and Tobago"], "TN": ["Tunisia"],
  "TR": ["Turkey"], "TM": ["Turkmenistan"], "TV": ["Tuvalu"], "UG": ["Uganda"], "UA": ["Ukraine"],
  "AE": ["United Arab Emirates", "UAE"], "GB": ["United Kingdom", "UK"], "US": ["United States", "USA", "United States of America"],
  "UY": ["Uruguay"], "UZ": ["Uzbekistan"], "VU": ["Vanuatu"], "VA": ["Vatican City"], "VE": ["Venezuela"],
  "VN": ["Vietnam"], "YE": ["Yemen"], "ZM": ["Zambia"], "ZW": ["Zimbabwe"],
};
