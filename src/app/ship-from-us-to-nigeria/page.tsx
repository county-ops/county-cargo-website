
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
import { UsStoreBanner } from '@/components/promo-banner';

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
    title: 'Standard Shipping (Other States)',
    price: '$5.50',
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
      <main className="pt-20 sm:pt-24 md:pt-28">
        <section className="relative w-full min-h-[400px] sm:min-h-[500px] flex items-center bg-white overflow-hidden py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div data-aos="fade-right" className="relative z-10 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4 sm:mb-6 leading-tight">
                Shipping from US <br /> to Nigeria (Door-to-Door)
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-xl mx-auto md:mx-0">
                Fast, Reliable &amp; Affordable Shipping. Get your free US shipping address to shop American stores.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="w-full sm:w-auto bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-lg">
                  <Link href="https://ship.countycargo.com/login">Get Your Free US Address</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                  <Link href="#process">How it Works</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-square w-full max-w-[520px] mx-auto" data-aos="fade-left">
              <Image
                src={placeholders.usNigeriaHero.url}
                alt="Shipping from US to Nigeria"
                fill
                className="object-contain object-center drop-shadow-2xl"
                data-ai-hint={placeholders.usNigeriaHero.hint}
                priority
              />
            </div>
          </div>
        </section>

        <UsStoreBanner />

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
                    {pricingTiers.map((tier, index) => {
                        const tierColors = [
                          { border: "border-blue-500 hover:border-blue-600 hover:shadow-blue-100/30", bg: "bg-blue-50/10" },
                          { border: "border-pink-500 hover:border-pink-600 hover:shadow-pink-100/30", bg: "bg-pink-50/10" },
                          { border: "border-purple-500 hover:border-purple-600 hover:shadow-purple-100/30", bg: "bg-purple-50/10" }
                        ];
                        const colors = tierColors[index % tierColors.length];
                        return (
                          <div key={index} className={`rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-xl flex flex-col justify-between ${colors.bg} ${colors.border}`} data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <div>
                                <h3 className="text-2xl font-semibold text-secondary mb-4">{tier.title}</h3>
                                <p className="text-4xl font-bold text-primary mb-4">
                                    {tier.price.startsWith('$') ? <>{tier.price}</> : tier.price}
                                    <span className="text-lg font-normal text-gray-500"> {tier.per}</span>
                                </p>
                                <ul className="text-gray-600 space-y-2 mb-6">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <Check className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                             <Button asChild className="w-full mt-auto">
                                <Link href={tier.title.includes('Standard') ? '#quote' : '/contact'}>
                                    {tier.title.includes('Standard') ? 'Get an Estimate' : 'Contact Us'}
                                </Link>
                            </Button>
                          </div>
                        );
                    })}
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
                    <Link href="https://ship.countycargo.com/login">Get Your Free US Address Now</Link>
                </Button>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
