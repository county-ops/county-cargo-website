
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
import Image from 'next/image';
import { UkNigeriaQuoteForm } from './quote-form';
import placeholders from '@/app/lib/placeholder-images.json';
import { UkStoreBanner } from '@/components/promo-banner';

export const metadata: Metadata = {
  title: 'Shipping from UK to Nigeria | London, Liverpool to Lagos, Abuja | County Cargo',
  description: 'Looking to ship from UK to Nigeria? County Cargo offers fast, reliable, and affordable shipping from the UK to Nigeria. Get your free UK address today and enjoy seamless delivery of your goods.',
  keywords: 'ship from UK to Nigeria, shipping to Nigeria, UK to Nigeria cargo, send parcel to Nigeria, UK personal shopper Nigeria, cheapest shipping to Nigeria, fast shipping Nigeria, reliable shipping UK Nigeria, freight forwarding Nigeria, UK shipping address Nigeria, shipping to Lagos, shipping to Abuja, shipping to Kano, shipping to Kaduna, shipping to Port-Harcourt, shipping to Ibadan, Osun, Borno, shipping from Liverpool, shipping from London, shipping from Birmingham, shipping from Leicester, shipping from Nottingham, shipping from Leeds',
};

const processSteps = [
  {
    icon: <UserPlus className="h-10 w-10 text-white" />,
    title: '1. Get Your Free UK Shipping Address',
    description: 'Create your free account in minutes to receive your personal UK shipping address.',
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-white" />,
    title: '2. Shop in the UK',
    description: 'Shop from any online retailer in the UK and use your County Cargo UK shipping address at checkout.',
  },
  {
    icon: <Gift className="h-10 w-10 text-white" />,
    title: '3. We Handle the Rest',
    description: 'We process and deliver your packages to your doorstep or nearest collection point.',
  },
];

const pricingTiers = [
  {
    title: 'Standard Shipping',
    price: '£6.00',
    per: '/kg',
    features: [
      '1kg minimum weight',
      'Delivery in 5-10 working days',
      'Full tracking included',
      '£15 handling charge',
    ],
  },
  {
    title: '48hrs Express Shipping',
    price: '£22.00',
    per: '/kg',
    features: [
      '1kg minimum weight',
      'Fast delivery in 48 hours',
      'Full tracking included',
      '£20 handling charge',
    ],
  },
  {
    title: '24hrs Express Shipping',
    price: '£24.00',
    per: '/kg',
    features: [
      '1kg minimum weight',
      'Super-fast delivery in 24 hours',
      'Highest priority handling',
      '£20 handling charge',
    ],
  },
];

const guideFeatures = [
    {
        icon: <DollarSign className="h-8 w-8 text-primary" />,
        title: "Affordable Rates",
        description: "We offer the most competitive rates for shipping from UK to Nigeria. Our transparent pricing means you know exactly what you're paying for, with no hidden costs."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary" />,
        title: "Fast & Reliable Delivery",
        description: "With our standard and express options, you can choose the speed that fits your needs. We are committed to providing a fast and reliable ship from UK to Nigeria service every time."
    },
    {
        icon: <Shield className="h-8 w-8 text-primary" />,
        title: "Security & Peace of Mind",
        description: "Every parcel is handled with the utmost care. We offer tracking and insurance options so you can ship from UK to Nigeria with confidence, knowing your items are safe."
    }
];

const reviews = [
    {
        initial: 'A',
        name: 'Adewale Johnson',
        review: '"Excellent service! I\'ve been using County Cargo for over a year now to ship electronics from UK to Lagos. The 48hrs express option is incredibly fast and my items always arrive safely. Highly recommended!"',
        time: '2 weeks ago'
    },
    {
        initial: 'C',
        name: 'Chioma Okafor',
        review: '"Best shipping company for UK to Nigeria! Their customer service is top-notch. I love shopping from ASOS and Next, and County Cargo makes it so easy. The tracking system is very transparent too."',
        time: '1 month ago'
    },
];

const transitRoutes = [
  { origin: 'London', destination: 'Lagos', time: '5-10 working days' },
  { origin: 'Manchester', destination: 'Abuja', time: '5-10 working days' },
  { origin: 'Birmingham', destination: 'Port Harcourt', time: '5-10 working days' },
  { origin: 'Liverpool', destination: 'Lagos', time: '5-10 working days' },
  { origin: 'Leeds', destination: 'Abuja', time: '5-10 working days' },
];

export default function ShipFromUkToNigeriaPage() {
  return (
    <>
      <Header />
      <main className="pt-20 sm:pt-24 md:pt-28">
        <section className="relative w-full min-h-[400px] sm:min-h-[500px] flex items-center bg-white overflow-hidden py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div data-aos="fade-right" className="relative z-10 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4 sm:mb-6 leading-tight">
                Shipping from UK <br /> to Nigeria
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-xl mx-auto md:mx-0">
                Fast, reliable, and affordable shipping from UK to Nigeria. Get your personal UK shipping address and start your shipping journey today!
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="w-full sm:w-auto bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-lg">
                  <Link href="https://ship.countycargo.com/login">Get Your Free UK Address</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                  <Link href="#process">How it Works</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-square w-full max-w-[380px] sm:max-w-[520px] mx-auto" data-aos="fade-left">
              <Image
                src={placeholders.ukNigeriaHero.url}
                alt="Shipping from UK to Nigeria"
                fill
                className="object-contain object-center drop-shadow-2xl"
                data-ai-hint={placeholders.ukNigeriaHero.hint}
                priority
              />
            </div>
          </div>
        </section>

        <UkStoreBanner />

        <section id="process" className="py-14 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-16" data-aos="fade-up">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-3 sm:mb-4">How Our Shipping From UK to Nigeria Works</h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">A simple, three-step process to get your packages delivered when you ship from the UK to Nigeria.</p>
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
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-3 sm:mb-4">Our Pricing to Ship from UK to Nigeria</h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Transparent and competitive pricing for your shipping from UK to Nigeria needs.</p>
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
                                <span className="text-base sm:text-lg font-normal text-gray-500">from</span> {tier.price}
                                <span className="text-base sm:text-lg font-normal text-gray-500">{tier.per}</span>
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
                <UkNigeriaQuoteForm />
            </div>
        </section>

        <section id="routes" className="py-14 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
                <div className="text-center mb-10 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-3 sm:mb-4">Popular Routes &amp; Estimated Transit Times</h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Find estimated transit times for our most popular shipping routes from the UK to Nigeria.</p>
                </div>
                <div className="overflow-x-auto rounded-lg shadow-md border">
                    <table className="w-full min-w-[480px] bg-white">
                        <thead className="bg-primary text-primary-foreground">
                        <tr>
                            <th className="py-3 sm:py-4 px-4 sm:px-6 text-left font-semibold text-sm sm:text-base">Origin (UK City)</th>
                            <th className="py-3 sm:py-4 px-4 sm:px-6 text-left font-semibold text-sm sm:text-base">Destination (Nigeria City)</th>
                            <th className="py-3 sm:py-4 px-4 sm:px-6 text-left font-semibold text-sm sm:text-base">Estimated Transit Time</th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-700">
                        {transitRoutes.map((route, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                            <td className="py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base">{route.origin}</td>
                            <td className="py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base">{route.destination}</td>
                            <td className="py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base">{route.time}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <Faq />

        <section className="py-14 sm:py-20 bg-primary text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Start Shipping from UK to Nigeria?</h2>
                <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90">Join thousands of satisfied customers who trust County Cargo for their shipping needs.</p>
                <Button asChild size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-gray-200">
                    <Link href="https://ship.countycargo.com/login">Get Your Free UK Address Now</Link>
                </Button>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
