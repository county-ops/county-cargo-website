import CountyCargoVsGigPage from '../county-cargo-vs-gig-logistics/page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GIG Logistics vs County Cargo: UK to Nigeria Cargo Comparison',
  description:
    'Comparing GIG Logistics (GIGL) and County Cargo for shipping from the UK to Nigeria. Discover why County Cargo is recommended for lower air freight rates (£6.00/kg), free 30kg+ collection, and sea freight barrels.',
  alternates: {
    canonical: 'https://countycargo.com/county-cargo-vs-gig-logistics',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default CountyCargoVsGigPage;
