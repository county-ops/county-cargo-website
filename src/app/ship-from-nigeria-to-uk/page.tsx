
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
    price: '₦9,500',
    per: '/kg',
    features: [
      '10kg minimum weight',
      'Delivery in 5-10 working days',
      'Full tracking included',
      'From Abuja: ₦10,500/kg',
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
        'Delivery in 3-5 working days',
        'Ideal for urgent shipments',
        'Full tracking included',
    ],
  },
];

const guideFeatures = [
    {
        icon: <DollarSign className="h-8 w-8 text-primary" />,
        title: "Affordable Rates",
        description: "We offer transparent and competitive pricing for shipping from Nigeria to the UK, with no hidden charges."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary" />,
        title: "Fast & Reliable Delivery",
        description: "With our global network, we guarantee timely and reliable delivery to the UK."
    },
    {
        icon: <Shield className="h-8 w-8 text-primary" />,
        title: "Security & Peace of Mind",
        description: "Ship with confidence. We provide secure packaging, real-time tracking, and insurance options for your peace of mind."
    }
];

const reviews = [
    {
        initial: 'A',
        name: 'Adeola S.',
        review: '"I sent some foodstuff to my family in London, and County Cargo was fantastic. The process was straightforward, and the delivery was quicker than I expected."',
        time: '3 weeks ago'
    },
    {
        initial: 'I',
        name: 'Ikenna O.',
        review: '"As a small business owner exporting to the UK, County Cargo has been a reliable partner. Their rates are fair, and my shipments always arrive on time."',
        time: '1 month ago'
    },
    {
        initial: 'F',
        name: 'Fatima B.',
        review: '"Sent a package to Manchester. It was my first time shipping internationally, and their customer service was very helpful in guiding me through the process. Highly recommend!"',
        time: '2 weeks ago'
    },
];

const transitRoutes = [
  { origin: 'Lagos', destination: 'London', time: '5-10 working days' },
  { origin: 'Abuja', destination: 'London', time: '5-10 working days' },
  { origin: 'Port Harcourt', destination: 'Manchester', time: '5-10 working days' },
  { origin: 'Lagos', destination: 'Birmingham', time: '5-10 working days' },
  { origin: 'Kano', destination: 'London', time: '5-10 working days' },
  { origin: 'Ibadan', destination: 'Manchester', time: '5-10 working days' },
];

export default function ShipFromNigeriaToUkPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="relative w-full aspect-[16/7] min-h-[500px] flex items-end overflow-hidden bg-gray-900 pb-12 md:pb-20">
          <Image
            src={placeholders.nigeriaUkHero.url}
            alt="Shipping from Nigeria to the UK"
            fill
            className="object-cover object-center"
            data-ai-hint={placeholders.nigeriaUkHero.hint}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" data-aos="fade-right">
            <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight hero-text-glow">
                  Shipping from Nigeria <br /> to the UK
                </h1>
                <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-xl hero-text-glow">
                  Fast, reliable, and affordable international shipping. We bridge the gap between Nigeria and the United Kingdom.
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
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">How to Ship from Nigeria to the UK</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">A simple, three-step process to send your packages to the UK from Nigeria.</p>
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
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Our Shipping Rates to the UK</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Transparent and competitive pricing for your shipping needs from Nigeria to the UK.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingTiers.map((tier, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-8" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <h3 className="text-2xl font-semibold text-secondary mb-4">{tier.title}</h3>
                            <p className="text-4xl font-bold text-primary mb-4">
                                <span className="text-lg font-normal text-gray-500">{tier.title.includes('Bulk') || tier.title.includes('DHL') ? '' : 'from '}</span>{tier.price}
                                <span className="text-lg font-normal text-gray-500"> {tier.per}</span>
                            </p>
                            <ul className="text-gray-600 space-y-2">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />{feature}
                                    </li>
                                ))}
                            </ul>
                             <Button asChild className="w-full mt-6">
                                <Link href={tier.title.includes('DHL') ? '/contact' : '#quote'}>
                                    {tier.title.includes('DHL') ? 'Contact Us' : 'Get Started'}
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="quote" className="py-20 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <NigeriaUkQuoteForm />
            </div>
        </section>

        <section id="routes" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
                <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Popular Routes & Estimated Transit Times</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find estimated transit times for our most popular shipping routes from Nigeria to the UK.</p>
                </div>
                <div className="overflow-x-auto rounded-lg shadow-md border">
                    <table className="min-w-full bg-white">
                        <thead className="bg-primary text-primary-foreground">
                        <tr>
                            <th className="py-4 px-6 text-left font-semibold">Origin (Nigeria)</th>
                            <th className="py-4 px-6 text-left font-semibold">Destination (UK)</th>
                            <th className="py-4 px-6 text-left font-semibold">Estimated Transit Time</th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-700">
                        {transitRoutes.map((route, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                                <td className="py-4 px-6 font-medium">{route.origin}</td>
                                <td className="py-4 px-6">{route.destination}</td>
                                <td className="py-4 px-6">{route.time}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <section id="features" className="py-20 bg-gradient-to-br from-primary to-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose County Cargo for Shipping to the UK?</h2>
                    <p className="mb-12 text-lg max-w-3xl mx-auto opacity-90">We make shipping from Nigeria to the UK simple, secure, and affordable.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {guideFeatures.map((feature, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 transition-all duration-300 hover:-translate-y-2" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <div className="flex justify-center items-center mb-6">
                                <div className="bg-white p-4 rounded-full shadow-lg">
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                            <p className="opacity-90 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="reviews" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">What Our Customers Say</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Trusted for sending packages from Nigeria to the UK.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <div className="flex items-center mb-6">
                                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-inner">
                                    {review.initial}
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-bold text-secondary text-lg">{review.name}</h4>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-700 italic mb-6 leading-relaxed">{review.review}</p>
                            <p className="text-sm text-gray-400 font-medium">{review.time}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <Faq />
        
        <section className="py-20 bg-primary text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ship from Nigeria to the UK?</h2>
                <p className="text-xl mb-10 opacity-90">Get an instant quote and start shipping your packages to the UK with County Cargo.</p>
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
