'use client';

import { CentralQuotationForm, RoutePreset } from '@/components/central-quotation-form';

interface ShippingCalculatorProps {
  defaultOrigin?: 'UK-LON' | 'UK-LIV' | 'US-TX' | 'NG-LOS' | 'NG-ABV';
  defaultDestination?: 'Lagos' | 'Abuja' | 'Port Harcourt' | 'Other' | string;
  defaultService?: 'standard_air' | 'express_air' | 'special_express' | 'sea_cargo';
  title?: string;
  subtitle?: string;
}

export function ShippingCalculator({
  defaultOrigin = 'UK-LON',
  defaultDestination = 'Lagos',
  title = 'Instant Shipping Cost Calculator',
  subtitle = 'Calculate live shipping rates powered by the Ship County Cargo quotation API.',
}: ShippingCalculatorProps) {
  let initialRoute: RoutePreset = 'uk-to-ng';
  let defaultFromCountry = 'United Kingdom';
  let defaultFromCity = defaultOrigin === 'UK-LIV' ? 'Liverpool' : 'London';
  let defaultToCountry = 'Nigeria';
  let defaultToCity = defaultDestination === 'Other' ? 'Other States' : defaultDestination;

  if (defaultOrigin === 'US-TX') {
    initialRoute = 'us-to-ng';
    defaultFromCountry = 'United States';
    defaultFromCity = 'Irving, TX';
  } else if (defaultOrigin === 'NG-LOS' || defaultOrigin === 'NG-ABV') {
    defaultFromCountry = 'Nigeria';
    defaultFromCity = defaultOrigin === 'NG-ABV' ? 'Abuja' : 'Lagos';
    if (defaultDestination === 'United States' || defaultDestination === 'USA') {
      initialRoute = 'ng-to-us';
      defaultToCountry = 'United States';
      defaultToCity = '';
    } else if (defaultDestination === 'United Kingdom' || defaultDestination === 'UK') {
      initialRoute = 'ng-to-uk';
      defaultToCountry = 'United Kingdom';
      defaultToCity = '';
    } else {
      initialRoute = 'ng-to-world';
      defaultToCountry = defaultDestination && !['Lagos', 'Abuja', 'Port Harcourt', 'Other'].includes(defaultDestination)
        ? defaultDestination
        : 'United States';
      defaultToCity = '';
    }
  }

  return (
    <div className="my-8">
      <CentralQuotationForm
        initialRoute={initialRoute}
        defaultFromCountry={defaultFromCountry}
        defaultFromCity={defaultFromCity}
        defaultToCountry={defaultToCountry}
        defaultToCity={defaultToCity}
        defaultWeight={defaultOrigin.startsWith('NG') ? 25 : 10}
        title={title}
        description={subtitle}
      />
    </div>
  );
}
