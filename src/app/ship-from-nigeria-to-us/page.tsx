
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
        description: "We offer transparent and competitive pricing for shipping from Nigeria to the US, with no hidden charges."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary" />,
        title: "Fast & Reliable Delivery",
        description: "With our global network, we guarantee timely and reliable delivery to the US."
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
        name: 'Ayo Williams',
        review: '"I sent some documents to my son in Texas. County Cargo handled it perfectly. The package arrived faster than I expected!"',
        time: '3 weeks ago'
    },
    {
        initial: 'I',
        name: 'Ifeoma A.',
        review: '"As a business owner, I rely on County Cargo for my exports to the US. They are professional, and their rates are the best I\'ve found."',
        time: '1 month ago'
    },
    {
        initial: 'C',
        name: 'Chinedu E.',
        review: '"Sent a large package to New York. The process was seamless, and their customer support team was very helpful. I highly recommend County Cargo!"',
        time: '2 weeks ago'
    },
];

const transitRoutes = [
  { origin: 'Lagos', destination: 'New York', time: '7-14 working days' },
  { origin: 'Abuja', destination: 'Houston', time: '7-14 working days' },
  { origin: 'Port Harcourt', destination: 'Atlanta', time: '7-14 working days' },
  { origin: 'Lagos', destination: 'Los Angeles', time: '7-14 working days' },
  { origin: 'Kano', destination: 'Chicago', time: '7-14 working days' },
  { origin: 'Ibadan', destination: 'Washington D.C.', time: '7-14 working days' },
];

export default function ShipFromNigeriaToUsPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section
          className="min-h-[50vh] flex items-center justify-center text-white"
          style={{
            background: `linear-gradient(rgba(30, 64, 175, 0.5), rgba(31, 41, 55, 0.6)), url('/NIGERIA TO THE US.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold hero-text-glow">Shipping from Nigeria to the US</h1>
            <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto hero-text-glow">Reliable, fast, and affordable international shipping services from Nigeria to the United States.</p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-white text-destructive font-semibold hover:bg-gray-100 transition-colors">
                <Link href="#quote">Get a Quote</Link>
              </Button>
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
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingTiers.map((tier, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-8" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <h3 className="text-2xl font-semibold text-secondary mb-4">{tier.title}</h3>
                            <p className="text-4xl font-bold text-primary mb-4">
                                <span className="text-lg font-normal text-gray-500">{tier.title.includes('Bulk') || tier.title.includes('DHL') || tier.title.includes('Docs') ? '' : 'from '}</span>{tier.price}
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
                                <Link href={tier.title.includes('Standard') ? '#quote' : '/contact'}>
                                    {tier.title.includes('Standard') ? 'Get Started' : 'Contact Us'}
                                </Link>
                            </Button>
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
        
        <section id="routes" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
                <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Popular Routes & Estimated Transit Times</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find estimated transit times for our most popular shipping routes from Nigeria to the US.</p>
                </div>
                <div className="overflow-x-auto rounded-lg shadow-md border">
                    <table className="min-w-full bg-white">
                        <thead className="bg-primary text-primary-foreground">
                        <tr>
                            <th className="py-4 px-6 text-left font-semibold">Origin (Nigeria)</th>
                            <th className="py-4 px-6 text-left font-semibold">Destination (US)</th>
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
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose County Cargo for Shipping to the US?</h2>
                    <p className="mb-12 text-lg max-w-3xl mx-auto">We make shipping from Nigeria to the US simple, secure, and affordable.</p>
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
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Trusted for sending packages from Nigeria to the US.</p>
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
            </div>
        </section>

        <Faq />
        
        <section className="py-20 bg-primary text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ship from Nigeria to the US?</h2>
                <p className="text-lg mb-8">Get an instant quote and start shipping your packages to the US with County Cargo.</p>
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-200">
                    <Link href="#quote">Start Shipping Now</Link>
                </Button>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
