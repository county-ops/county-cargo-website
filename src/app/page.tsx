
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Truck,
  Package,
  Globe,
  ShoppingBag,
  UserPlus,
  Send,
  Gift,
  Users,
  DollarSign,
  Anchor,
  UserCheck,
  Plane,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CentralQuotationForm } from '@/components/central-quotation-form';
import blogPosts from '@/lib/blog-posts.json';

export const metadata: Metadata = {
  title: 'County Cargo | UK & USA to Nigeria Shipping, Cargo & Air Freight',
  description: 'Fast, reliable air and sea freight cargo shipping services from the UK and USA to Nigeria, and export services from Nigeria worldwide. Consolidated shipping and doorstep delivery.',
  alternates: {
    canonical: 'https://countycargo.com',
  },
  openGraph: {
    title: 'County Cargo | UK & USA to Nigeria Shipping, Cargo & Air Freight',
    description: 'Fast, reliable air and sea freight cargo shipping services from the UK and USA to Nigeria, and export services from Nigeria worldwide. Consolidated shipping and doorstep delivery.',
    url: 'https://countycargo.com',
    siteName: 'County Cargo',
    images: [
      {
        url: '/cargo-plane-hero.png',
        width: 1200,
        height: 630,
        alt: 'County Cargo — UK & USA to Nigeria Shipping, Air & Sea Freight',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'County Cargo | UK & USA to Nigeria Shipping, Cargo & Air Freight',
    description: 'Fast, reliable air and sea freight cargo shipping services from the UK and USA to Nigeria, and export services from Nigeria worldwide.',
    images: ['/cargo-plane-hero.png'],
  },
};

const services = [
  {
    icon: <Truck className="h-6 w-6 text-primary" />,
    title: 'Shipping from UK to Nigeria',
    description: 'Weekly air freight and sea cargo from London and Liverpool depots directly to your doorstep across Nigeria.',
    href: '/shipping-from-uk-to-nigeria',
    image: '/service-uk-to-nigeria-enhanced.png'
  },
  {
    icon: <Truck className="h-6 w-6 text-primary" />,
    title: 'Shipping from UK to Lagos',
    description: 'Air cargo from £6.00/kg to Murtala Muhammed Airport. Ladipo-Oshodi hub pickup or mainland & island doorstep delivery.',
    href: '/shipping-from-uk-to-lagos',
    image: '/london-to-lagos-freight.jpg'
  },
  {
    icon: <Truck className="h-6 w-6 text-primary" />,
    title: 'Shipping from UK to Abuja',
    description: 'Air cargo from £6.50/kg with Wuye Market depot pickup and 100% Free Doorstep Delivery on qualifying 10kg+ consignments.',
    href: '/shipping-from-uk-to-abuja',
    image: '/london-to-abuja-cargo.jpg'
  },
  {
    icon: <Package className="h-6 w-6 text-primary" />,
    title: 'Shipping from US to Nigeria',
    description: 'Seamless shipping from the US to Nigeria. We handle customs and delivery, whether it\'s a small parcel or a full container.',
    href: '/ship-from-us-to-nigeria',
    image: '/service-us-to-nigeria-enhanced.png'
  },
  {
    icon: <Truck className="h-6 w-6 text-primary" />,
    title: 'Shipping from Nigeria to UK',
    description: 'Send packages, documents, and foodstuff from Nigeria to the United Kingdom with our economy/express delivery services.',
    href: '/ship-from-nigeria-to-uk',
    image: '/service-nigeria-uk-enhanced.png'
  },
  {
    icon: <Globe className="h-6 w-6 text-primary" />,
    title: 'Shipping from Nigeria to the World',
    description: 'Export goods from Nigeria to over 200 countries worldwide with our reliable international courier partners.',
    href: '/ship-from-nigeria-to-world',
    image: '/nigeria-market-packing-enhanced.png'
  },
];

const processSteps = [
  {
    icon: <UserPlus className="h-10 w-10 text-white" />,
    title: '1. Register With Us',
    description: 'Create a free account to get your County Cargo shipping address.',
  },
  {
    icon: <Send className="h-10 w-10 text-white" />,
    title: '2. Send Your Items',
    description: 'Shop UK/US stores and ship to your County Cargo address, or drop off exports in Lagos or Abuja.',
  },
  {
    icon: <Gift className="h-10 w-10 text-white" />,
    title: '3. We Handle the Rest',
    description: 'We process and deliver your packages to your doorstep or nearest collection point.',
  },
];

const stats = [
  {
    icon: <Users className="h-12 w-12 mx-auto mb-4" />,
    value: '10k+',
    label: 'Customers Trust Us',
  },
  {
    icon: <DollarSign className="h-12 w-12 mx-auto mb-4" />,
    value: '68%',
    label: 'Savings on Shipping',
  },
  {
    icon: <Anchor className="h-12 w-12 mx-auto mb-4" />,
    value: '3,000',
    label: 'Tons Shipped Annually',
  },
  {
    icon: <UserCheck className="h-12 w-12 mx-auto mb-4" />,
    value: '500+',
    label: 'SMEs Served Annually',
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://countycargo.com/#organization",
              "name": "County Cargo",
              "url": "https://countycargo.com",
              "logo": "https://countycargo.com/county-logo.png",
              "sameAs": [
                "https://www.facebook.com/CountyCargo",
                "https://x.com/CountyCargo",
                "https://www.instagram.com/countycargo/",
                "https://www.tiktok.com/@countycargong"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+2348110000421",
                "contactType": "customer service",
                "areaServed": ["GB", "US", "NG"],
                "availableLanguage": ["en"]
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://countycargo.com/#lagos-office",
              "name": "County Cargo Lagos Office",
              "image": "https://countycargo.com/nigeria-market-packing-enhanced.png",
              "telephone": "+2348110000421",
              "url": "https://countycargo.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi",
                "addressLocality": "Lagos",
                "postalCode": "102214",
                "addressCountry": "NG"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 6.5484,
                "longitude": 3.3409
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "17:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "10:00",
                  "closes": "14:00"
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://countycargo.com/#abuja-office",
              "name": "County Cargo Abuja Office",
              "telephone": "+2348110000423",
              "url": "https://countycargo.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street",
                "addressLocality": "Abuja",
                "addressCountry": "NG"
              }
            }
          ])
        }}
      />
      <Header />
      <main>
        {/* Hero Section with Central Quotation System */}
        <section className="relative pt-24 sm:pt-28 lg:pt-24 pb-8 sm:pb-12 bg-gradient-to-b from-[#071630] via-[#0b2149] to-[#0a192f] text-white overflow-hidden">
          {/* Subtle Background Glows */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
              {/* Left Column: Headline, Subtitle, Live Tracking Form, Trust Indicators */}
              <div className="lg:col-span-4 pt-1 sm:pt-2 text-left" data-aos="fade-right">
                {/* Service Timeframe Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-[11px] font-semibold text-blue-200 mb-2.5 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>#1 UK, US &amp; Nigeria Freight Logistics</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-2xl sm:text-3xl lg:text-[27px] xl:text-3xl font-black text-white leading-tight tracking-tight">
                  Cheapest &amp; Most Reliable{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-red-400 underline decoration-primary/60">
                    Cargo Shipping
                  </span>{' '}
                  to Nigeria &amp; Worldwide
                </h1>

                {/* Subtitle */}
                <p className="mt-2 text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                  Fast door-to-door <strong>Standard Air (5 to 10 working days)</strong>, <strong>Express Freight (3 to 5 working days)</strong>, <strong>48-Hour Special Express</strong> and container <strong>Sea Cargo (4 to 8 weeks)</strong> directly to Lagos, Abuja, Port Harcourt, and all 36 Nigerian states. Full customs clearance included.
                </p>

                {/* Embedded Live Tracking Widget */}
                <div className="mt-3.5 p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-blue-200 mb-1.5 flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5 text-blue-300" />
                    <span>Track Your Shipment:</span>
                  </p>
                  <form action="https://ship.countycargo.com/" method="GET" target="_blank" className="flex gap-2">
                    <input
                      type="text"
                      name="trackingNumber"
                      placeholder="Airway Bill (AWB) or Tracking #..."
                      className="flex-1 h-9 px-3 bg-white text-gray-900 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                      required
                    />
                    <Button type="submit" className="h-9 px-3.5 bg-primary hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-md shrink-0">
                      Track Cargo
                    </Button>
                  </form>
                </div>

                {/* Trust Stats Counter */}
                <div className="mt-3.5 pt-3 border-t border-white/15 grid grid-cols-3 gap-2 text-left">
                  <div>
                    <div className="text-base sm:text-lg font-black text-white">5 to 10 Days</div>
                    <div className="text-[10px] text-blue-200 mt-0.5">Standard Air</div>
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-black text-emerald-400">100%</div>
                    <div className="text-[10px] text-blue-200 mt-0.5">Customs Cleared</div>
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-black text-white">36 States</div>
                    <div className="text-[10px] text-blue-200 mt-0.5">Doorstep Delivery</div>
                  </div>
                </div>

                {/* Portal Quick Access Buttons */}
                <div className="mt-3 flex items-center gap-2">
                  <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 text-xs font-bold rounded-lg h-8 px-3">
                    <Link href="https://ship.countycargo.com/login">Portal Login</Link>
                  </Button>
                  <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg h-8 px-3">
                    <Link href="https://ship.countycargo.com/login">Book Consignment</Link>
                  </Button>
                </div>
              </div>

              {/* Right Column: Prominent Central Quotation Form */}
              <div className="lg:col-span-8" data-aos="fade-left">
                <CentralQuotationForm defaultRouteId="uk-ng" />
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-14 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-16" data-aos="fade-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-3 sm:mb-4">Our Services</h2>
              <p className="text-base sm:text-lg text-gray-800 max-w-2xl mx-auto">Comprehensive logistics solutions tailored to meet your business needs</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {services.map((service, index) => (
                <div key={index} className="service-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 h-full group relative" data-aos="fade-up" data-aos-delay={`${100 * (index + 1)}`}>
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center shadow-lg">
                      {service.icon}
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                      <Link href={service.href}>
                        <span className="absolute inset-0 z-10" aria-hidden="true" />
                        {service.title}
                      </Link>
                    </h3>
                    <p className="text-gray-800 leading-relaxed text-sm sm:text-base">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="process" className="py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-16" data-aos="fade-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-3 sm:mb-4">How It Works</h2>
              <p className="text-base sm:text-lg text-gray-800 max-w-2xl mx-auto">A simple, three-step process to get your packages delivered.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-center">
              {processSteps.map((step, index) => (
                <div key={index} className="process-step" data-aos="fade-up" data-aos-delay={`${100 * (index + 1)}`}>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-secondary mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-gray-800 text-sm sm:text-base">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section id="stats" className="py-14 sm:py-20 text-white stats-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} data-aos="fade-up" data-aos-delay={`${100 * (index + 1)}`}>
                  {stat.icon}
                  <h3 className="text-3xl sm:text-4xl font-bold">{stat.value}</h3>
                  <p className="text-blue-200 text-sm sm:text-base">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-14 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div data-aos="fade-right">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-4 sm:mb-6">About County Cargo</h2>
                <p className="text-base sm:text-lg text-gray-800 mb-4 sm:mb-6">With over 15 years of experience, we provide reliable and efficient logistics solutions.</p>
                <Link href="/about" className="text-primary font-semibold hover:underline">Learn More About Us</Link>
              </div>
              <div data-aos="fade-left">
                <Image
                  src="/nigeria-market-packing-enhanced.png"
                  alt="County Cargo Professional Logistics Team"
                  data-ai-hint="vibrant nigerian market packing logistics"
                  width={640}
                  height={427}
                  className="rounded-xl shadow-2xl w-full h-56 sm:h-80 md:h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blog */}
        <section id="blog" className="py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-16" data-aos="fade-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-3 sm:mb-4">From Our Blog</h2>
              <p className="text-base sm:text-lg text-gray-800 max-w-2xl mx-auto">Latest news and insights from the logistics world.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.slice(0, 3).map((post, index) => (
                <div key={index} className="blog-card bg-gray-50 rounded-lg shadow-md overflow-hidden transition-all duration-300 group h-full flex flex-col" data-aos="fade-up" data-aos-delay={`${100 * (index + 1)}`}>
                  <div className="overflow-hidden">
                    <Image src={post.image} alt={post.title} data-ai-hint={post.imageHint} width={640} height={384} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-secondary mb-3">{post.title}</h3>
                    <p className="text-gray-800 mb-4 flex-grow">{post.description}</p>
                    <Link href={post.url} className="text-primary font-semibold hover:underline mt-auto">Read More &rarr;</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
