
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  UserPlus,
  ShoppingCart,
  Gift,
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
import { UsNigeriaQuoteForm } from './quote-form';
import Image from 'next/image';
import placeholders from '@/app/lib/placeholder-images.json';

export const metadata: Metadata = {
  title: 'Shipping from US to Nigeria (Door-to-Door) | County Cargo',
  description: 'Fast, Reliable & Affordable Shipping from the US to Nigeria. Get your free US shipping address to shop American stores. We deliver to your doorstep in Nigeria.',
};

const processSteps = [
  {
    icon: <UserPlus className="h-10 w-10 text-white" />,
    title: '1. Get Your Free US Address',
    description: 'Create a free account to instantly receive your personal US shipping address. Use this address to shop from any US online retailer like Amazon, Walmart, and Shein.',
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-white" />,
    title: '2. Shop & Ship to Your US Address',
    description: 'Shop online at any US store. At checkout, simply use your dedicated County Cargo US address for delivery. We\'ll handle it from there.',
  },
  {
    icon: <Gift className="h-10 w-10 text-white" />,
    title: '3. We Deliver to Nigeria',
    description: 'We handle customs and deliver your packages straight to your doorstep in Nigeria. It\'s that simple!',
  },
];

const pricingTiers = [
  {
    title: 'Standard Shipping to Lagos',
    price: '$4.50',
    per: '/lbs',
    features: [
      'Minimum chargeable weight: 5 lbs',
      'Delivery in 5-10 working days',
      'No handling charges',
      'Full tracking included',
    ],
  },
  {
    title: 'Standard Shipping (Other States)',
    price: '$5.00',
    per: '/lbs',
    features: [
      'Minimum chargeable weight: 5 lbs',
      'Delivery in 5-10 working days',
      'No handling charges',
      'Full tracking included',
    ],
  },
  {
    title: 'Procurement Service',
    price: 'Shop & Ship',
    per: 'for you',
    features: [
      'We buy items from US stores on your behalf',
      'Access to stores that don\'t accept Nigerian cards',
      'Consolidation of multiple orders',
      'Seamless delivery to your doorstep',
    ],
  },
];

export default function ShipFromUsToNigeriaPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="relative w-full aspect-[14/6] min-h-[500px] flex items-end overflow-hidden bg-gray-900 pb-12 md:pb-20">
          <Image
            src={placeholders.usNigeriaHero.url}
            alt="Shipping from US to Nigeria (Door-to-Door)"
            fill
            className="object-cover object-top"
            data-ai-hint={placeholders.usNigeriaHero.hint}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" data-aos="fade-right">
            <div className="max-w-2xl bg-transparent p-0">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight hero-text-glow">
                  Shipping from US <br /> to Nigeria (Door-to-Door)
                </h1>
                <p className="text-xl md:text-2xl text-white mb-8 max-w-xl hero-text-glow">
                  Fast, Reliable & Affordable Shipping. Get your free US shipping address to shop American stores.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-white text-destructive font-bold hover:bg-gray-100 transition-all shadow-lg hover:scale-105">
                    <Link href="https://ship.countycargo.com/register">Get Your Free US Address</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all">
                    <Link href="#process">How it Works</Link>
                  </Button>
                </div>
            </div>
          </div>
        </section>

        <section id="process" className="py-12 bg-white border-y-2 border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">How to Ship from the US to Nigeria</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">Our seamless 3-step process makes US to Nigeria cargo and parcel forwarding effortless. Get your packages from US stores to your doorstep in Nigeria, hassle-free.</p>
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
        
        <section id="pricing" className="py-20 bg-gray-50 border-y-2 border-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Our Pricing to Ship from US to Nigeria</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Transparent and competitive pricing for your shipping from US to Nigeria needs.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingTiers.map((tier, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-8 flex flex-col" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <h3 className="text-2xl font-semibold text-secondary mb-4">{tier.title}</h3>
                            <p className="text-4xl font-bold text-primary mb-4">
                                {tier.price.startsWith('$') ? <>{tier.price}</> : tier.price}
                                <span className="text-lg font-normal text-gray-500"> {tier.per}</span>
                            </p>
                            <ul className="text-gray-600 space-y-2 flex-grow mb-6">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <Check className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                             <Button asChild className="w-full mt-auto">
                                <Link href={tier.title.includes('Standard') ? '#quote' : '/contact'}>
                                    {tier.title.includes('Standard') ? 'Get an Estimate' : 'Contact Us'}
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="quote" className="py-20 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <UsNigeriaQuoteForm />
            </div>
        </section>

        <Faq />

        <section className="py-20 bg-primary text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Shipping from US to Nigeria?</h2>
                <p className="text-lg mb-8 opacity-90">Join thousands of satisfied customers who trust County Cargo for their shipping needs.</p>
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-200">
                    <Link href="https://ship.countycargo.com/register">Get Your Free US Address Now</Link>
                </Button>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
