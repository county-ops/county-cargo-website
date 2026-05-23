
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Robustly parses Firestore date values (Timestamp, Date, number, string) into a JavaScript Date object.
 * Prevents crashes when dealing with mixed-schema or legacy data that lacks the .toDate() method.
 */
export function parseFirestoreDate(val: any): Date | null {
    if (!val) return null;
    if (typeof val.toDate === 'function') return val.toDate();
    if (val instanceof Date) return val;
    if (typeof val === 'number' || typeof val === 'string') return new Date(val);
    if (val.seconds) return new Date(val.seconds * 1000);
    return null;
}

function getFlagEmoji(countryCode: string) {
    if (!countryCode || countryCode.length !== 2) return '';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

const countryData: { [key: string]: string[] } = {
  "AF": ["Afghanistan"],
  "AL": ["Albania"],
  "DZ": ["Algeria"],
  "AD": ["Andorra"],
  "AO": ["Angola"],
  "AR": ["Argentina"],
  "AM": ["Armenia"],
  "AU": ["Australia"],
  "AT": ["Austria"],
  "AZ": ["Azerbaijan"],
  "BS": ["Bahamas"],
  "BH": ["Bahrain"],
  "BD": ["Bangladesh"],
  "BB": ["Barbados"],
  "BY": ["Belarus"],
  "BE": ["Belgium"],
  "BZ": ["Belize"],
  "BJ": ["Benin"],
  "BT": ["Bhutan"],
  "BO": ["Bolivia"],
  "BA": ["Bosnia and Herzegovina"],
  "BW": ["Botswana"],
  "BR": ["Brazil"],
  "BN": ["Brunei"],
  "BG": ["Bulgaria"],
  "BF": ["Burkina Faso"],
  "BI": ["Burundi"],
  "CV": ["Cabo Verde", "Cape Verde"],
  "KH": ["Cambodia"],
  "CM": ["Cameroon"],
  "CA": ["Canada"],
  "CF": ["Central African Republic"],
  "TD": ["Chad"],
  "CL": ["Chile"],
  "CN": ["China"],
  "CO": ["Colombia"],
  "KM": ["Comoros"],
  "CG": ["Congo, Republic of the"],
  "CD": ["Congo, Democratic Republic of the"],
  "CR": ["Costa Rica"],
  "HR": ["Croatia"],
  "CU": ["Cuba"],
  "CY": ["Cyprus"],
  "CZ": ["Czech Republic", "Czechia"],
  "DK": ["Denmark"],
  "DJ": ["Djibouti"],
  "DM": ["Dominica"],
  "DO": ["Dominican Republic"],
  "EC": ["Ecuador"],
  "EG": ["Egypt"],
  "SV": ["El Salvador"],
  "GQ": ["Equatorial Guinea"],
  "ER": ["Eritrea"],
  "EE": ["Estonia"],
  "SZ": ["Eswatini", "Swaziland"],
  "ET": ["Ethiopia"],
  "FJ": ["Fiji"],
  "FI": ["Finland"],
  "FR": ["France"],
  "GA": ["Gabon"],
  "GM": ["Gambia"],
  "GE": ["Georgia"],
  "DE": ["Germany"],
  "GH": ["Ghana"],
  "GR": ["Greece"],
  "GD": ["Grenada"],
  "GT": ["Guatemala"],
  "GN": ["Guinea"],
  "GW": ["Guinea-Bissau"],
  "GY": ["Guyana"],
  "HT": ["Haiti"],
  "HN": ["Honduras"],
  "HU": ["Hungary"],
  "IS": ["Iceland"],
  "IN": ["India"],
  "ID": ["Indonesia"],
  "IR": ["Iran"],
  "IQ": ["Iraq"],
  "IE": ["Ireland"],
  "IL": ["Israel"],
  "IT": ["Italy"],
  "CI": ["Ivory Coast", "Côte d'Ivoire"],
  "JM": ["Jamaica"],
  "JP": ["Japan"],
  "JO": ["Jordan"],
  "KZ": ["Kazakhstan"],
  "KE": ["Kenya"],
  "KI": ["Kiribati"],
  "KW": ["Kuwait"],
  "KG": ["Kyrgyzstan"],
  "LA": ["Laos"],
  "LV": ["Latvia"],
  "LB": ["Lebanon"],
  "LS": ["Lesotho"],
  "LR": ["Liberia"],
  "LY": ["Libya"],
  "LI": ["Liechtenstein"],
  "LT": ["Lithuania"],
  "LU": ["Luxembourg"],
  "MG": ["Madagascar"],
  "MW": ["Malawi"],
  "MY": ["Malaysia"],
  "MV": ["Maldives"],
  "ML": ["Mali"],
  "MT": ["Malta"],
  "MH": ["Marshall Islands"],
  "MR": ["Mauritania"],
  "MU": ["Mauritius"],
  "MX": ["Mexico"],
  "FM": ["Micronesia"],
  "MD": ["Moldova"],
  "MC": ["Monaco"],
  "MN": ["Mongolia"],
  "ME": ["Montenegro"],
  "MA": ["Morocco"],
  "MZ": ["Mozambique"],
  "MM": ["Myanmar", "Burma"],
  "NA": ["Namibia"],
  "NR": ["Nauru"],
  "NP": ["Nepal"],
  "NL": ["Netherlands"],
  "NZ": ["New Zealand"],
  "NI": ["Nicaragua"],
  "NE": ["Niger"],
  "NG": ["Nigeria"],
  "KP": ["North Korea"],
  "MK": ["North Macedonia"],
  "NO": ["Norway"],
  "OM": ["Oman"],
  "PK": ["Pakistan"],
  "PW": ["Palau"],
  "PA": ["Panama"],
  "PG": ["Papua New Guinea"],
  "PY": ["Paraguay"],
  "PE": ["Peru"],
  "PH": ["Philippines"],
  "PL": ["Poland"],
  "PT": ["Portugal"],
  "QA": ["Qatar"],
  "RO": ["Romania"],
  "RU": ["Russia", "Russian Federation"],
  "RW": ["Rwanda"],
  "KN": ["Saint Kitts and Nevis"],
  "LC": ["Saint Lucia"],
  "VC": ["Saint Vincent and the Grenadines"],
  "WS": ["Samoa"],
  "SM": ["San Marino"],
  "ST": ["Sao Tome and Principe"],
  "SA": ["Saudi Arabia"],
  "SN": ["Senegal"],
  "RS": ["Serbia"],
  "SC": ["Seychelles"],
  "SL": ["Sierra Leone"],
  "SG": ["Singapore"],
  "SK": ["Slovakia"],
  "SI": ["Slovenia"],
  "SB": ["Solomon Islands"],
  "SO": ["Somalia"],
  "ZA": ["South Africa"],
  "KR": ["South Korea"],
  "SS": ["South Sudan"],
  "ES": ["Spain"],
  "LK": ["Sri Lanka"],
  "SD": ["Sudan"],
  "SR": ["Suriname"],
  "SE": ["Sweden"],
  "CH": ["Switzerland"],
  "SY": ["Syria"],
  "TW": ["Taiwan"],
  "TJ": ["Tajikistan"],
  "TZ": ["Tanzania"],
  "TH": ["Thailand"],
  "TL": ["Timor-Leste"],
  "TG": ["Togo"],
  "TO": ["Tonga"],
  "TT": ["Trinidad and Tobago"],
  "TN": ["Tunisia"],
  "TR": ["Turkey"],
  "TM": ["Turkmenistan"],
  "TV": ["Tuvalu"],
  "UG": ["Uganda"],
  "UA": ["Ukraine"],
  "AE": ["United Arab Emirates", "UAE"],
  "GB": ["United Kingdom", "UK"],
  "US": ["United States", "USA", "United States of America"],
  "UY": ["Uruguay"],
  "UZ": ["Uzbekistan"],
  "VU": ["Vanuatu"],
  "VA": ["Vatican City"],
  "VE": ["Venezuela"],
  "VN": ["Vietnam"],
  "YE": ["Yemen"],
  "ZM": ["Zambia"],
  "ZW": ["Zimbabwe"],
};

const usStates: { [key: string]: string } = {
    "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California",
    "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "FL": "Florida", "GA": "Georgia",
    "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa",
    "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland",
    "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri",
    "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey",
    "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio",
    "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina",
    "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont",
    "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming"
};

const caProvinces: { [key: string]: string } = {
    "AB": "Alberta", "BC": "British Columbia", "MB": "Manitoba", "NB": "New Brunswick",
    "NL": "Newfoundland and Labrador", "NS": "Nova Scotia", "ON": "Ontario", "PE": "Prince Edward Island",
    "QC": "Quebec", "SK": "Saskatchewan"
};

const ngStates: string[] = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
    "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
    "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
    "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "Federal Capital Territory"
];


export function formatAddress(address: string | undefined, countryCode?: string): string {
  if (!address) return 'N/A';

  const addressParts = address.split(',').map(p => p.trim());
  let identifiedCountryCode: string | undefined = countryCode;

  // 1. Determine Country Code from address string if not provided
  if (!identifiedCountryCode) {
    const sortedCountries = Object.entries(countryData).sort((a, b) => {
        const longestA = a[1].reduce((max, current) => current.length > max.length ? current : max, "");
        const longestB = b[1].reduce((max, current) => current.length > max.length ? current : max, "");
        return longestB.length - longestA.length;
    });

    for (const [code, names] of sortedCountries) {
        const matchFound = names.some(name => {
            const regex = new RegExp(`\\b${name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
            return regex.test(address);
        });
        if (matchFound) {
            identifiedCountryCode = code;
            break;
        }
    }
  }
  
  if (identifiedCountryCode) {
    const flag = getFlagEmoji(identifiedCountryCode);
    let stateOrRegion: string | undefined;

    // 2. Find State/Province/Region
    const regions: { [country: string]: { [key: string]: string } | string[] } = {
        'US': usStates,
        'CA': caProvinces,
        'NG': ngStates,
    };

    if (identifiedCountryCode in regions) {
        const regionSet = regions[identifiedCountryCode];
        for (const part of addressParts) {
            if (Array.isArray(regionSet)) { // For NG
                const foundState = regionSet.find(state => new RegExp(`\\b${state}\\b`, 'i').test(part));
                if (foundState) {
                    stateOrRegion = foundState;
                    break;
                }
            } else { // For US, CA
                 // Prioritize checking for abbreviation first as it's more unique
                for (const [abbr, name] of Object.entries(regionSet)) {
                    const abbrRegex = new RegExp(`\\b${abbr}\\b`); // Exact match for abbreviation
                    if (abbrRegex.test(part)) {
                        stateOrRegion = name;
                        break;
                    }
                }
                if (stateOrRegion) break;

                // If no abbreviation found, check for full name
                for (const [abbr, name] of Object.entries(regionSet)) {
                     const nameRegex = new RegExp(`\\b${name}\\b`, 'i');
                     if (nameRegex.test(part)) {
                        stateOrRegion = name;
                        break;
                    }
                }
            }
            if (stateOrRegion) break;
        }
    }

    // Generic check for a region (city) if a specific state wasn't found
    if (!stateOrRegion && addressParts.length > 1) {
       const potentialRegion = addressParts[addressParts.length - 2];
       if (potentialRegion && !/^\d+$/.test(potentialRegion.trim()) && !countryData[identifiedCountryCode].some(c => new RegExp(`\\b${c}\\b`, 'i').test(potentialRegion))) {
          stateOrRegion = potentialRegion.trim();
       }
    }
    
    // If still no state, try the first address part if it's not a number
    if (!stateOrRegion && addressParts.length > 0 && !/^\d/.test(addressParts[0])) {
      stateOrRegion = addressParts[0];
    }
    
    if (stateOrRegion) {
      const cleanedRegion = stateOrRegion.split(',')[0].trim();
      return `${flag} ${cleanedRegion}, ${identifiedCountryCode}`;
    }

    // 3. Fallback to Country Name and Code
    const countryName = countryData[identifiedCountryCode][0];
    return `${flag} ${countryName}, ${identifiedCountryCode}`;
  }

  // 4. Absolute Fallback
  if (addressParts.length > 1) {
    return `${addressParts[addressParts.length - 2]}, ${addressParts[addressParts.length - 1]}`;
  }
  
  return address;
}
