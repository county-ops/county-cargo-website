import Link from 'next/link';
import { BookOpen, ArrowRight, ShieldCheck, Truck, Scale, MapPin } from 'lucide-react';
import { SHIPPING_TIMEFRAMES } from '@/lib/constants';

export interface GuideLink {
  title: string;
  href: string;
  description: string;
}

const defaultGuides: GuideLink[] = [
  {
    title: 'Complete Shipping to Nigeria Guide',
    href: '/shipping-to-nigeria',
    description: 'The master pillar guide covering air freight, sea freight, rates, timelines and customs.',
  },
  {
    title: 'Nigeria Customs Clearance Guide',
    href: '/blog/nigeria-customs-clearance-guide',
    description: 'Detailed breakdown of Form M, PAAR, duty calculations, and customs processing at Lagos ports.',
  },
  {
    title: 'Cargo Shipping Cost to Nigeria',
    href: '/blog/cargo-shipping-cost-to-nigeria',
    description: 'Transparent pricing rules, actual vs volumetric weight explanations, and fee breakdowns.',
  },
  {
    title: 'UK to Nigeria Shipping Time',
    href: '/blog/uk-to-nigeria-shipping-time',
    description: `Compare express air cargo (${SHIPPING_TIMEFRAMES.EXPRESS_AIR_DAYS}), standard air (${SHIPPING_TIMEFRAMES.STANDARD_AIR}) and sea cargo (${SHIPPING_TIMEFRAMES.SEA_CARGO}) timelines.`,
  },
  {
    title: 'Prohibited Items List',
    href: '/blog/prohibited-items-shipping-to-nigeria',
    description: 'Official restrictions on food, liquids, electronics, hazardous items, and batteries.',
  },
  {
    title: 'The US Barrels Guide',
    href: '/shipping-barrels-from-the-usa-to-nigeria',
    description: 'The complete guide to shipping standard 55-gallon barrels, boxes, and personal effects from the USA to Nigeria.',
  },
  {
    title: 'UK Barrels Guide',
    href: '/shipping-barrels-from-uk-to-nigeria',
    description: 'Comprehensive guide for shipping standard barrels and boxes from London and across the UK to Nigeria.',
  },
  {
    title: 'Shipping Electronics Safely',
    href: '/blog/shipping-electronics-uk-to-nigeria',
    description: 'How to safely pack, insure, and clear phones, laptops, and appliances bound for Nigeria.',
  },
];

interface RelatedGuidesProps {
  guides?: GuideLink[];
  currentHref?: string;
}

export function RelatedGuides({ guides = defaultGuides, currentHref }: RelatedGuidesProps) {
  const filteredGuides = guides.filter((g) => g.href !== currentHref).slice(0, 4);

  return (
    <section className="my-12 p-6 sm:p-8 bg-gray-50 border border-gray-200 rounded-2xl not-prose">
      <div className="flex items-center gap-2 mb-4 text-secondary font-bold text-lg sm:text-xl">
        <BookOpen className="w-5 h-5 text-primary" />
        <h2>Related Shipping Guides &amp; Useful Resources</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {filteredGuides.map((guide, idx) => (
          <Link
            key={idx}
            href={guide.href}
            className="group p-4 bg-white border border-gray-200 rounded-xl hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <h3 className="font-semibold text-secondary group-hover:text-primary transition-colors flex items-center justify-between text-sm sm:text-base">
                <span>{guide.title}</span>
                <ArrowRight className="w-4 h-4 text-primary shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{guide.description}</p>
            </div>
            <div className="mt-3 text-xs font-semibold text-primary flex items-center gap-1">
              Read Guide <ArrowRight className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
