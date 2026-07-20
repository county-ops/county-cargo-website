
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Send,
  Box,
  Globe,
  Check,
  DollarSign,
  Truck,
  Shield,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Faq } from './faq';
import { NigeriaUkQuoteForm } from './quote-form';
import Image from 'next/image';
import placeholders from '@/app/lib/placeholder-images.json';

export const metadata: Metadata = {
  title: 'Shipping from Nigeria to UK | County Cargo',
  description: 'Ship packages from Nigeria to the UK. County Cargo offers fast, reliable, and affordable international shipping services. Get a quote today!',
  keywords: 'international shipping from nigeria to uk, ship from nigeria to uk, nigeria to uk cargo, send parcel from nigeria to uk, nigeria export services to uk, cheap shipping from nigeria to uk, fast shipping from nigeria to uk, reliable shipping from nigeria to uk',
  alternates: {
    canonical: 'https://countycargo.com/ship-from-nigeria-to-uk',
  },
};

const processSteps = [
  {
    icon: <Box className="h-10 w-10 text-white" />,
    title: '1. Package Your Items',
    description: 'Securely pack your items and get the dimensions and weight.',
  },
  {
    icon: <Send className="h-10 w-10 text-white" />,
    title: '2. Get a Quote & Book',
    description: 'Use our online tool to get a quote, book your shipment, and make payment.',
  },
  {
    icon: <Globe className="h-10 w-10 text-white" />,
    title: '3. We Ship to the UK',
    description: 'We handle customs and deliver your package to its destination in the UK safely.',
  },
];

const pricingTiers = [
  {
    title: 'Standard Shipping',
    price: '₦10,500',
    per: '/kg',
    features: [
      '10kg minimum weight',
      'Delivery in 5-10 working days',
      'Full tracking included',
      <span key="abuja-highlight" className="inline-flex items-center font-extrabold text-blue-900 bg-blue-100/60 px-2 py-0.5 rounded border border-blue-200 shadow-sm text-xs mt-1">From Abuja: ₦11,500/kg</span>,
    ],
  },
  {
    title: '48hrs Express Shipping',
    price: '£24.00',
    per: '/kg',
    features: [
      '1kg minimum weight',
      'Delivery in 2 working days',
      'Full tracking included',
      '£20 handling charge',
    ],
  },
  {
    title: 'DHL EXPRESS 3-5 DAY',
    price: 'Contact Us',
    per: 'for rates',
    features: [
        'Documents & small parcels shipping',
        'Delivery in 3-5 working days',
        'Ideal for urgent shipments',
        'Full tracking included',
    ],
  },
];

export default function ShipFromNigeriaToUkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Nigeria to UK Shipping Services",
            "provider": {
              "@type": "Organization",
              "name": "County Cargo",
              "url": "https://countycargo.com"
            },
            "serviceType": "Cargo & Shipping Freight Services",
            "areaServed": {
              "@type": "Country",
              "name": "United Kingdom"
            },
            "description": "Send packages, documents, and foodstuff from Nigeria to the United Kingdom with our economy and express cargo delivery services.",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "NGN",
              "description": "Export cargo shipping rates calculated per kg."
            }
          })
        }}
      />
      <Header />
      <main className="pt-20 sm:pt-24 md:pt-28">
        <section className="relative w-full min-h-[400px] sm:min-h-[500px] flex items-center bg-white overflow-hidden py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div data-aos="fade-right" className="relative z-10 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4 sm:mb-6 leading-tight">
                Shipping from Nigeria <br /> to the UK
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-xl mx-auto md:mx-0">
                Fast, reliable, and affordable international shipping. We bridge the gap between Nigeria and the United Kingdom.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="w-full sm:w-auto bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-lg">
                  <Link href="#quote">Get a Quote Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                  <Link href="#process">How it Works</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-square w-full max-w-[380px] sm:max-w-[520px] mx-auto" data-aos="fade-left">
              <Image
                src={placeholders.nigeriaUkHero.url}
                alt="Shipping from Nigeria to the UK"
                fill
                className="object-contain object-center drop-shadow-2xl"
                data-ai-hint={placeholders.nigeriaUkHero.hint}
                priority
              />
            </div>
          </div>
        </section>

        <section id="process" className="py-14 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-16" data-aos="fade-up">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-3 sm:mb-4">How to Ship from Nigeria to the UK</h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">A simple, three-step process to send your packages to the UK from Nigeria.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-center">
                    {processSteps.map((step, index) => (
                        <div key={index} className="process-step" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                {step.icon}
                            </div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-secondary mb-2 sm:mb-3">{step.title}</h3>
                            <p className="text-gray-600 text-sm sm:text-base">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        <section id="pricing" className="py-14 sm:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-16" data-aos="fade-up">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-3 sm:mb-4">Our Shipping Rates to the UK</h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Transparent and competitive pricing for your shipping needs from Nigeria to the UK.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8 max-w-6xl mx-auto">
                    {pricingTiers.map((tier, index) => {
                        const tierColors = [
                          { border: "border-blue-500 hover:border-blue-600 hover:shadow-blue-100/30", bg: "bg-blue-50/10" },
                          { border: "border-pink-500 hover:border-pink-600 hover:shadow-pink-100/30", bg: "bg-pink-50/10" },
                          { border: "border-purple-500 hover:border-purple-600 hover:shadow-purple-100/30", bg: "bg-purple-50/10" }
                        ];
                        const colors = tierColors[index % tierColors.length];
                        return (
                          <div key={index} className={`rounded-2xl border-2 p-5 sm:p-8 transition-all duration-300 hover:shadow-xl ${colors.bg} ${colors.border}`} data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <h3 className="text-xl sm:text-2xl font-semibold text-secondary mb-3 sm:mb-4">{tier.title}</h3>
                            <p className="text-3xl sm:text-4xl font-bold text-primary mb-3 sm:mb-4">
                                <span className="text-base sm:text-lg font-normal text-gray-500">{tier.title.includes('Bulk') || tier.title.includes('DHL') ? '' : 'from '}</span>{tier.price}
                                <span className="text-base sm:text-lg font-normal text-gray-500"> {tier.per}</span>
                            </p>
                            <ul className="text-gray-600 space-y-2">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-sm sm:text-base">
                                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />{feature}
                                    </li>
                                ))}
                            </ul>
                          </div>
                        );
                    })}
                </div>
            </div>
        </section>

        <section id="quote" className="py-20 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <NigeriaUkQuoteForm />
            </div>
        </section>

        <Faq />
        
        <section className="py-14 sm:py-20 bg-primary text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Ship from Nigeria to the UK?</h2>
                <p className="text-base sm:text-xl mb-8 sm:mb-10 opacity-90">Get an instant quote and start shipping your packages to the UK with County Cargo.</p>
                <Button asChild size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 font-bold px-10 py-6 text-lg rounded-full transition-all shadow-xl hover:scale-105">
                    <Link href="https://ship.countycargo.com">Start Shipping Now</Link>
                </Button>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
