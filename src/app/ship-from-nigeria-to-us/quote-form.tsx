'use client';

import { CentralQuotationForm } from '@/components/central-quotation-form';

export function NigeriaUsQuoteForm() {
  return (
    <CentralQuotationForm
      initialRoute="ng-to-us"
      defaultFromCountry="Nigeria"
      defaultFromCity="Lagos"
      defaultToCountry="United States"
      defaultWeight={25}
      title="Nigeria to USA Shipping Calculator"
      description="Calculate live Value Export and DHL Express rates from Nigeria to the United States."
    />
  );
}
