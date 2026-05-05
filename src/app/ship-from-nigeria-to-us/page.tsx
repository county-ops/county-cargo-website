
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
    price: '$8.00',
    per: '/lbs',
    features: [
      '10 lbs minimum chargeable weight',
      'Delivery in 7-14 working days',
      'No handling charges',
      'Full tracking included',
    ],
  },
  {
    title: 'Documents & Small Parcels',
    price: 'Contact Us',
    per: 'for rates',
    features: [
      'Ideal for documents and small items',
      'Express delivery available',
      'Full tracking included',
    ],
  },
];

export default function ShipFromNigeriaToUsPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="relative w-full aspect-[16/7] min-h-[500px] flex items-end overflow-hidden bg-gray-900 pb-12 md:pb-20">
          <Image
            src={placeholders.nigeriaUsHero.url}
            alt="Shipping from Nigeria to the US"
            fill
            className="object-cover object-top"
            data-ai-hint={placeholders.nigeriaUsHero.hint}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" data-aos="fade-right">
            <div className="max-w-2xl bg-transparent p-0">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight hero-text-glow">
                  Shipping from Nigeria <br /> to the US
                </h1>
                <p className="text-xl md:text-2xl text-white mb-8 max-w-xl hero-text-glow">
                  Fast, reliable, and affordable international shipping. We handle the logistics so you can focus on what matters.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-white text-destructive font-bold hover:bg-gray-100 transition-all shadow-lg hover:scale-105">
                    <Link href="#quote">Get a Quote Now</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all">
                    <Link href="#process">How it Works</Link>
                  </Button>
                </div>
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
                    <Link href="#quote">Start Shipping Now</Link>
                </Button>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
