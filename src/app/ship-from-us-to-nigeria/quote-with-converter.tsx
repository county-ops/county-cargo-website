
'use client';

import { useState } from 'react';
import { UsNigeriaQuoteForm } from './quote-form';
import { CurrencyConverter } from './currency-converter';

export function QuoteWithConverter() {
  const [estimatedUsd, setEstimatedUsd] = useState<number | null>(null);

  return (
    <div className="grid lg:grid-cols-5 gap-12 items-start">
      <div className="lg:col-span-3">
        <UsNigeriaQuoteForm onEstimateChange={setEstimatedUsd} />
      </div>
      <div className="lg:col-span-2">
        <CurrencyConverter usdAmount={estimatedUsd} />
      </div>
    </div>
  );
}
