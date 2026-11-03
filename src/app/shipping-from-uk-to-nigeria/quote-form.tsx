'use client';

import { CentralQuotationForm } from '@/components/central-quotation-form';

export function UkNigeriaQuoteForm() {
  return (
    <CentralQuotationForm
      initialRoute="uk-to-ng"
      defaultFromCountry="United Kingdom"
      defaultFromCity="London Heathrow Depot"
      defaultToCountry="Nigeria"
      defaultToCity="Lagos"
      defaultWeight={5}
      title="UK to Nigeria Shipping Calculator"
      description="Calculate live air freight and express rates from our London and Liverpool depots to Nigeria."
    />
  );
}
