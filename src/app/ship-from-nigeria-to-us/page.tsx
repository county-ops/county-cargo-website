
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
import { NigeriaUsQuoteForm } from './quote-form';
import Image from 'next/image';
import placeholders from '@/app/lib/placeholder-images.json';

export const metadata: Metadata = {
  title: 'Shipping from Nigeria to US | County Cargo',
  description: 'Ship packages from Nigeria to the US. County Cargo offers fast, reliable, and affordable international shipping services. Get a quote today!',
  keywords: 'international shipping from nigeria to us, ship from nigeria to us, nigeria to us cargo, send parcel from nigeria to us, nigeria export services to us, cheap shipping from nigeria to us, fast shipping from nigeria to us, reliable shipping from nigeria to us',
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
    title: '3. We Ship to the US',
    description: 'We handle customs and deliver your package to its destination in the US safely.',
  },
];

const pricingTiers = [
  {
    title: 'Standard Shipping',
    price: '₦15,500',
    per: '/kg',
    features: [
      '10kg minimum chargeable weight',
      'Delivery in 7-14 working days',
      'No handling charges',
      'Full tracking included',
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

export default function ShipFromNigeriaToUsPage() {
  return (
    <>
      <Header />
      <main className="pt-20 sm:pt-24 md:pt-28">
        <section className="relative w-full min-h-[400px] sm:min-h-[500px] flex items-center bg-white overflow-hidden py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div data-aos="fade-right" className="relative z-10 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4 sm:mb-6 leading-tight">
                Shipping from Nigeria <br /> to the US
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-xl mx-auto md:mx-0">
                Fast, reliable, and affordable international shipping. We handle the logistics so you can focus on what matters.
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
            <div className="relative aspect-square w-full max-w-[520px] mx-auto" data-aos="fade-left">
              <Image
                src={placeholders.nigeriaUsHero.url}
                alt="Shipping from Nigeria to the US"
                fill
                className="object-contain object-center drop-shadow-2xl"
                data-ai-hint={placeholders.nigeriaUsHero.hint}
                priority
              />
            </div>
          </div>
        </section>

        <section id="process" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">How to Ship from Nigeria to the US</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">A simple, three-step process to send your packages to the US from Nigeria.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-12 text-center">
                    {processSteps.map((step, index) => (
                        <div key={index} className="process-step" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-semibold text-secondary mb-3">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        <section id="pricing" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Our Shipping Rates to the US</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Transparent and competitive pricing for your shipping needs from Nigeria to the US.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {pricingTiers.map((tier, index) => {
                        const tierColors = [
                          { border: "border-blue-500 hover:border-blue-600 hover:shadow-blue-100/30", bg: "bg-blue-50/10" },
                          { border: "border-pink-500 hover:border-pink-600 hover:shadow-pink-100/30", bg: "bg-pink-50/10" }
                        ];
                        const colors = tierColors[index % tierColors.length];
                        return (
                          <div key={index} className={`rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-xl flex flex-col justify-between ${colors.bg} ${colors.border}`} data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <div>
                                <h3 className="text-2xl font-semibold text-secondary mb-4">{tier.title}</h3>
                                <p className="text-4xl font-bold text-primary mb-4">
                                    <span className="text-lg font-normal text-gray-500">{tier.title.includes('Contact') || tier.title.includes('DHL') || tier.title.includes('Documents') ? '' : 'from '}</span>{tier.price}
                                    <span className="text-lg font-normal text-gray-500"> {tier.per}</span>
                                </p>
                                <ul className="text-gray-600 space-y-2">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-center">
                                            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />{feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                          </div>
                        );
                    })}
                </div>
            </div>
        </section>
        
        <section id="quote" className="py-20 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <NigeriaUsQuoteForm />
            </div>
        </section>

        <Faq />
        
        <section className="py-20 bg-primary text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ship from Nigeria to the US?</h2>
                <p className="text-xl mb-10 opacity-90">Join thousands of satisfied businesses and individuals using County Cargo.</p>
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold px-10 py-6 text-lg rounded-full transition-all shadow-xl hover:scale-105">
                    <Link href="https://ship.countycargo.com">Start Shipping Now</Link>
                </Button>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
