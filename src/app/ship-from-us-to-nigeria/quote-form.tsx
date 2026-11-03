'use client';

import { CentralQuotationForm } from '@/components/central-quotation-form';

export function UsNigeriaQuoteForm({
  onEstimateChange,
}: {
  onEstimateChange?: (value: number | null) => void;
}) {
  return (
    <CentralQuotationForm
      initialRoute="us-to-ng"
      defaultFromCountry="United States"
      defaultFromCity="US Warehouse (Irving, TX)"
      defaultToCountry="Nigeria"
      defaultToCity="Lagos"
      defaultWeight={10}
      title="USA to Nigeria Shipping Calculator"
      description="Calculate live air cargo rates from our Irving, Texas warehouse to Lagos, Abuja, and nationwide Nigeria."
      onEstimateChange={(est) => {
        if (onEstimateChange) {
          onEstimateChange(est);
        }
      }}
    />
  );
}
