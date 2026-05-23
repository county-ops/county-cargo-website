
export interface DhlCountry {
  Country: string;
  Zone: number;
}

export interface DhlPricing {
  Zone: number;
  [weightKey: string]: number | string; // e.g., "0.5kg": 54084.72, "70.1+ kg": ""
}

export type ServiceType = 'expressExport' | 'valueExport' | 'expressImport' | 'valueImport';
