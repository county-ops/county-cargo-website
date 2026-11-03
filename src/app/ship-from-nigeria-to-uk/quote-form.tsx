'use client';

import { CentralQuotationForm } from '@/components/central-quotation-form';

export function NigeriaUkQuoteForm() {
  return (
    <CentralQuotationForm
      initialRoute="ng-to-uk"
      defaultFromCountry="Nigeria"
      defaultFromCity="Lagos"
      defaultToCountry="United Kingdom"
      defaultWeight={25}
      compact
      title="Nigeria to UK Shipping Calculator"
      description="Calculate live rates from Lagos or Abuja to the United Kingdom."
    />
  );
}
