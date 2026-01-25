
import Image from 'next/image';
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
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Faq } from './faq';

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

const pricingTiers = [
  {
    title: 'Docs & Small Parcels',
    price: 'Contact Us',
    per: 'for rates',
    features: [
      'Ideal for documents and items up to 5kg',
      'Express delivery available',
      'Full tracking included',
    ],
  },
  {
    title: 'Medium to Large Boxes',
    price: 'Contact Us',
    per: 'for rates',
    features: [
      'For packages over 5kg',
      'Cost-effective air freight',
      'Full tracking included',
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
        description: "We offer transparent and competitive pricing for shipping from Nigeria to the world, with no hidden charges."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary" />,
        title: "Fast & Reliable Delivery",
        description: "With our global network, we guarantee timely and reliable delivery to major countries and destinations worldwide."
    },
    {
        icon: <Shield className="h-8 w-8 text-primary" />,
        title: "Security & Peace of Mind",
        description: "Ship with confidence. We provide secure packaging, real-time tracking, and insurance options for your peace of mind."
    }
];

const reviews = [
    {
        initial: 'T',
        name: 'Tola Adebayo',
        review: '"I used County Cargo to send important documents to the US. The process was smooth and delivery was surprisingly fast. Excellent service!"',
        time: '3 weeks ago'
    },
    {
        initial: 'B',
        name: 'Buchi Eze',
        review: '"Needed to export some craftwork to the UK for my business. County Cargo handled everything professionally, including the paperwork. My go-to for international shipping now!"',
        time: '1 month ago'
    },
    {
        initial: 'N',
        name: 'Ngozi Okoro',
        review: '"Sent a care package to my brother in Canada. The rates were affordable, and the package arrived in perfect condition. The tracking was very helpful."',
        time: '2 weeks ago'
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
      <main className="pt-16">
        <section
          className="min-h-[50vh] flex items-center justify-center text-white"
          style={{
            background: `linear-gradient(rgba(30, 64, 175, 0.5), rgba(31, 41, 55, 0.6)), url('https://images.pexels.com/photos/4392033/pexels-photo-4392033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold hero-text-glow">International Shipping from Nigeria to the World</h1>
            <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto hero-text-glow">Your #1 choice for shipping parcels, documents, and cargo from Nigeria to the UK, US, Canada, Europe, and over 200 countries worldwide.</p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-white text-destructive font-semibold hover:bg-gray-100 transition-colors">
                <Link href="/contact">Get a Custom Quote</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="process" className="py-20 bg-white">
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
        
        <section id="pricing" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Our International Shipping Services</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">We offer a range of services tailored to your needs. Contact us for competitive pricing on your international shipment from Nigeria.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingTiers.map((tier, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-8" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <h3 className="text-2xl font-semibold text-secondary mb-4">{tier.title}</h3>
                            <p className="text-4xl font-bold text-primary mb-4">
                                {tier.price}
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
                                <Link href="/contact">Get Custom Quote</Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="destinations" className="py-20 bg-white">
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
             <div className="text-center mt-8 text-lg text-gray-600" data-aos="fade-up">
              ...and many more across Europe, Asia, Americas, and Africa!
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose County Cargo for International Shipping?</h2>
                    <p className="mb-12 text-lg max-w-3xl mx-auto">We make shipping from Nigeria to anywhere in the world simple, secure, and affordable.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {guideFeatures.map((feature, index) => (
                        <div key={index} className="bg-blue-800/40 backdrop-blur-sm p-8 rounded-xl transition-all duration-300 ease-in-out hover:bg-blue-900/60 hover:-translate-y-2 hover:shadow-2xl" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <div className="flex justify-center items-center mb-4">
                                <div className="bg-white p-3 rounded-full">
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="reviews" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">What Our Customers Say</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Trusted for sending packages from Nigeria to the world.</p>
                    <div className="mt-4">
                        <Link href="https://www.google.com/search?q=county+cargo+reviews" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                            View our Google reviews
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div key={index} className="service-card bg-white rounded-lg shadow-md p-6" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {review.initial}
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-secondary">{review.name}</h4>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-3">{review.review}</p>
                            <p className="text-sm text-gray-400">{review.time}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12" data-aos="fade-up">
                    <Link href="https://www.google.com/search?q=county+cargo+reviews" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary font-semibold hover:underline">
                        Read More Reviews on Google
                        <ExternalLink className="h-5 w-5 ml-2" />
                    </Link>
                </div>
            </div>
        </section>

        <Faq />

        <section className="py-20 bg-primary text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ship from Nigeria?</h2>
                <p className="text-lg mb-8">Get a custom quote and start shipping your packages to anywhere in the world with County Cargo.</p>
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
