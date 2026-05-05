
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Send,
  Box,
  Globe,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Faq } from './faq';
import placeholders from '@/app/lib/placeholder-images.json';

export const metadata: Metadata = {
  title: 'International Shipping from Nigeria | Ship to 200+ Countries | County Cargo',
  description: 'Your #1 choice for international shipping from Nigeria. Ship parcels, documents, and cargo to the UK, US, Canada, Europe, and over 200 countries worldwide. Get a free quote today for reliable and affordable export services.',
  keywords: 'international shipping from nigeria, ship from nigeria, nigeria to world cargo, send parcel from nigeria, nigeria export services, cheap shipping from nigeria, fast shipping from nigeria, reliable shipping from nigeria, nigeria to usa, nigeria to uk, nigeria to canada, dhl nigeria',
};

const processSteps = [
  {
    icon: <Box className="h-10 w-10 text-white" />,
    title: '1. Package Your Items',
    description: 'Securely pack your items, get the dimensions and weight, then contact us for a quote.',
  },
  {
    icon: <Send className="h-10 w-10 text-white" />,
    title: '2. Drop-off & Payment',
    description: 'Bring your package to our office for final processing and payment. We ensure it\'s ready for international transit.',
  },
  {
    icon: <Globe className="h-10 w-10 text-white" />,
    title: '3. We Ship Worldwide',
    description: 'We handle the rest, from customs paperwork to final delivery to its global destination, safely and on time.',
  },
];

const popularDestinations = [
  { name: 'United States', flag: '🇺🇸' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'China', flag: '🇨🇳' },
  { name: 'UAE', flag: '🇦🇪' },
  { name: 'South Africa', flag: '🇿🇦' },
];

export default function ShipFromNigeriaToWorldPage() {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="relative w-full md:aspect-[12/5] min-h-[500px] flex items-center bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right" className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
                  International Shipping <br /> from Nigeria to the World
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-xl">
                  Your #1 choice for shipping parcels, documents, and cargo to the UK, US, Canada, Europe, and over 200 countries worldwide.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-primary text-white font-semibold hover:bg-primary/90 transition-colors">
                    <Link href="/contact">Get a Custom Quote</Link>
                  </Button>
                </div>
            </div>
            <div className="relative aspect-square w-full max-w-[500px] mx-auto" data-aos="fade-left">
              <Image
                src={placeholders.nigeriaWorldHero.url}
                alt="International Shipping from Nigeria to the World"
                fill
                className="object-contain object-top"
                data-ai-hint={placeholders.nigeriaWorldHero.hint}
                priority
              />
            </div>
          </div>
        </section>

        <section id="process" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">How to Ship Internationally from Nigeria</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our simple, three-step process makes it easy to send your packages from Nigeria to anywhere in the world.</p>
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
        
        <section id="destinations" className="py-20 bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Popular International Destinations</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">We ship to over 200 countries. Here are some of our most popular routes from Nigeria.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
              {popularDestinations.map((dest, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                  <div className="text-5xl mb-3">{dest.flag}</div>
                  <h3 className="text-xl font-semibold text-secondary">{dest.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Faq />

        <section className="py-20 bg-primary text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ship from Nigeria?</h2>
                <p className="text-lg mb-8 opacity-90">Get a custom quote and start shipping your packages to anywhere in the world with County Cargo.</p>
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-200">
                    <Link href="/contact">Start Shipping Now</Link>
                </Button>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
