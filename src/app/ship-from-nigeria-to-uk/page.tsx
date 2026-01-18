
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
    title: 'Bulk & Commercial Goods',
    price: 'Contact Us',
    per: 'for rates',
    features: [
      'Tailored for business and bulk exports',
      'Sea and air freight options',
      'Customs clearance support',
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

export default function ShipFromNigeriaToUkPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section
          className="min-h-[50vh] flex items-center justify-center text-white"
          style={{
            background: `linear-gradient(rgba(30, 64, 175, 0.85), rgba(31, 41, 55, 0.9)), url('https://images.pexels.com/photos/4392033/pexels-photo-4392033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">Shipping from Nigeria to the UK</h1>
            <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto">Reliable, fast, and affordable international shipping services from Nigeria to the UK.</p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-white text-red-600 font-semibold hover:bg-gray-100 transition-colors">
                <Link href="/#quote">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="process" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">How to Ship from Nigeria to the UK</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">A simple, three-step process to send your packages to the UK from Nigeria.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-12 text-center">
                    {processSteps.map((step, index) => (
                        <div key={index} className="process-step">
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
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Our Shipping Rates to the UK</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Transparent and competitive pricing for your shipping needs from Nigeria to the UK.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingTiers.map((tier, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-2xl font-semibold text-secondary mb-4">{tier.title}</h3>
                            <p className="text-4xl font-bold text-primary mb-4">
                                {tier.price}
                                <span className="text-lg font-normal text-gray-500"> {tier.per}</span>
                            </p>
                            <ul className="text-gray-600 space-y-2">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                        <Check className="h-5 w-5 text-green-500 mr-2" />{feature}
                                    </li>
                                ))}
                            </ul>
                             <Button asChild className="w-full mt-6">
                                <Link href="/#quote">Get Started</Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="features" className="py-20 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose County Cargo for Shipping to the UK?</h2>
                    <p className="mb-12 text-lg max-w-3xl mx-auto">We make shipping from Nigeria to the UK simple, secure, and affordable.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {guideFeatures.map((feature, index) => (
                        <div key={index} className="bg-blue-800/40 backdrop-blur-sm p-8 rounded-xl transition-all duration-300 ease-in-out hover:bg-blue-900/60 hover:-translate-y-2 hover:shadow-2xl">
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
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">What Our Customers Say</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Trusted for sending packages from Nigeria to the UK.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div key={index} className="service-card bg-white rounded-lg shadow-md p-6">
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
            </div>
        </section>

        <Faq />
        
        <section id="support" className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Customer Support</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                    Have questions or need assistance? Our dedicated customer support team is here to help you with every step of your shipping process from Nigeria to the UK.
                </p>
                <Button asChild size="lg">
                    <Link href="/contact">Contact Us Now</Link>
                </Button>
            </div>
        </section>

        <section className="py-20 bg-primary text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ship from Nigeria to the UK?</h2>
                <p className="text-lg mb-8">Get an instant quote and start shipping your packages to the UK with County Cargo.</p>
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-200">
                    <Link href="/#quote">Start Shipping Now</Link>
                </Button>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

    