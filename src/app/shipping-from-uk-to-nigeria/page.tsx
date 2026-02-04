
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
    price: '£5.80',
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

const stores1 = [
    { name: "Adidas UK", domain: "adidas.co.uk" }, { name: "AllSaints", domain: "allsaints.com" },
    { name: "Amazon UK", domain: "amazon.co.uk" }, { name: "AO.com", domain: "ao.com" },
    { name: "Apple UK", domain: "apple.com" }, { name: "Argos", domain: "argos.co.uk" },
    { name: "Asda", domain: "asda.com" }, { name: "ASOS", domain: "asos.com" },
];
const stores2 = [
    { name: "Footasylum", domain: "footasylum.com" }, { name: "H&M", domain: "hm.com" },
    { name: "Harrods", domain: "harrods.com" }, { name: "Harvey Nichols", domain: "harveynichols.com" },
    { name: "IKEA UK", domain: "ikea.com" }, { name: "JD Sports", domain: "jdsports.co.uk" },
    { name: "John Lewis", domain: "johnlewis.com" }, { name: "Liberty London", domain: "libertylondon.com" },
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
    {
        initial: 'O',
        name: 'Oluwaseun Balogun',
        review: '"Very affordable rates compared to other companies. I shipped my laptop and phone from Amazon UK to Abuja using standard shipping and everything arrived in perfect condition. Will definitely use again!"',
        time: '3 weeks ago'
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
      <main className="pt-16">
        <section className="relative w-full aspect-[16/7] min-h-[500px] flex items-end overflow-hidden bg-gray-900 pb-12 md:pb-20">
          <Image
            src={placeholders.ukNigeriaHero.url}
            alt="Shipping from UK to Nigeria"
            fill
            className="object-cover object-top"
            data-ai-hint={placeholders.ukNigeriaHero.hint}
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" data-aos="fade-right">
            <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight hero-text-glow">
                  Shipping from UK <br /> to Nigeria
                </h1>
                <p className="text-xl md:text-2xl text-white mb-8 max-w-xl font-medium hero-text-glow">
                  Fast, reliable, and affordable shipping from UK to Nigeria. Get your personal UK shipping address and start your shipping journey today!
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-primary text-white font-bold hover:bg-blue-700 transition-all shadow-lg hover:scale-105">
                    <Link href="https://ship.countycargo.com/register">Get Your Free UK Address</Link>
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
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">How Our Shipping From UK to Nigeria Works</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">A simple, three-step process to get your packages delivered when you ship from the UK to Nigeria.</p>
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
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Our Pricing to Ship from UK to Nigeria</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Transparent and competitive pricing for your shipping from UK to Nigeria needs.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingTiers.map((tier, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-8" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <h3 className="text-2xl font-semibold text-secondary mb-4">{tier.title}</h3>
                            <p className="text-4xl font-bold text-primary mb-4">
                                <span className="text-lg font-normal text-gray-500">from</span> {tier.price}
                                <span className="text-lg font-normal text-gray-500">{tier.per}</span>
                            </p>
                            <ul className="text-gray-600 space-y-2">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                        <Check className="h-5 w-5 text-green-500 mr-2" />{feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="quote" className="py-20 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <UkNigeriaQuoteForm />
            </div>
        </section>

        <section id="routes" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
                <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Popular Routes & Estimated Transit Times</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find estimated transit times for our most popular shipping routes from the UK to Nigeria.</p>
                </div>
                <div className="overflow-x-auto rounded-lg shadow-md border">
                    <table className="min-w-full bg-white">
                        <thead className="bg-primary text-primary-foreground">
                        <tr>
                            <th className="py-4 px-6 text-left font-semibold">Origin (UK City)</th>
                            <th className="py-4 px-6 text-left font-semibold">Destination (Nigeria City)</th>
                            <th className="py-4 px-6 text-left font-semibold">Estimated Transit Time</th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-700">
                        {transitRoutes.map((route, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                            <td className="py-4 px-6">{route.origin}</td>
                            <td className="py-4 px-6">{route.destination}</td>
                            <td className="py-4 px-6">{route.time}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <section id="features" className="py-20 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Ultimate Guide to Shipping from UK to Nigeria</h2>
                    <p className="mb-12 text-lg max-w-3xl mx-auto opacity-90">When it comes to shipping from UK to Nigeria, County Cargo is your most trusted partner. We've simplified the entire process, making it easier than ever for you to shop from your favourite UK stores and receive your goods in Nigeria without hassle.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {guideFeatures.map((feature, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <div className="flex justify-center items-center mb-4">
                                <div className="bg-white p-3 rounded-full">
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                            <p className="opacity-90">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <Faq />

        <section className="py-20 bg-primary text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Shipping from UK to Nigeria?</h2>
                <p className="text-lg mb-8 opacity-90">Join thousands of satisfied customers who trust County Cargo for their shipping needs.</p>
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-200">
                    <Link href="https://ship.countycargo.com/register">Get Your Free UK Address Now</Link>
                </Button>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
