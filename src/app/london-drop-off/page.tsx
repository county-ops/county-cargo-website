import LondonCharltonDropOffPage, {
  metadata as baseMetadata,
} from '../shipping-from-london-to-nigeria/page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: 'https://countycargo.com/shipping-from-london-to-nigeria',
  },
};

export default LondonCharltonDropOffPage;
