import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageSquare, 
  HelpCircle, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact County Cargo | UK & Nigeria Offices & Support',
  description: 'Get in touch with County Cargo. Reach our logistics support teams in London, Lagos, and Abuja for help with air freight, sea freight, cargo shipping, or custom shipping quotes.',
  alternates: {
    canonical: 'https://countycargo.com/contact',
  },
  openGraph: {
    title: 'Contact County Cargo | UK & Nigeria Offices & Support',
    description: 'Get in touch with County Cargo. Reach our logistics support teams in London, Lagos, and Abuja for help with air freight, sea freight, cargo shipping, or custom shipping quotes.',
    url: 'https://countycargo.com/contact',
    siteName: 'County Cargo',
    images: [
      {
        url: '/cargo-plane-hero.png',
        width: 1200,
        height: 630,
        alt: 'Contact County Cargo Logistics Support',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact County Cargo | UK & Nigeria Offices & Support',
    description: 'Get in touch with County Cargo customer support for UK, USA, and Nigeria cargo and freight logistics.',
    images: ['/cargo-plane-hero.png'],
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-14 sm:pt-16 min-h-screen bg-gradient-to-tr from-blue-50/70 via-white to-sky-50/50">
        {/* Elegant Hero Banner */}
        <section
          className="min-h-[30vh] sm:min-h-[38vh] flex items-center justify-center relative overflow-hidden py-12 sm:py-16"
          style={{
            background: `linear-gradient(135deg, rgba(240, 249, 255, 0.94) 0%, rgba(224, 242, 254, 0.90) 50%, rgba(240, 249, 255, 0.94) 100%), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Subtle grid pattern and premium lighting glows */}
          <div className="absolute inset-0 bg-grid-blue-500/[0.03] bg-[size:30px_30px]" />
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-80 h-80 bg-sky-200/25 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 shadow-sm mb-4">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0a2a5e] drop-shadow-sm">
              Contact County Cargo
            </h1>
            <p className="text-base sm:text-lg md:text-xl mt-3 sm:mt-4 max-w-3xl mx-auto text-slate-600 font-medium">
              We are here to support your global shipping and logistics needs. Reach out to us today.
            </p>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto space-y-8 relative" data-aos="fade-up">
            {/* Decorative background glow behind contact info cards */}
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
            
            <div className="space-y-3 text-center">
              <h2 className="text-3xl font-extrabold text-[#0a2a5e] tracking-tight">Our Offices & Support</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                Have a question or want to get a custom quote? Reach out to our teams in Nigeria or the UK.
              </p>
            </div>

            {/* Direct Info Card */}
            <Card className="bg-white/95 backdrop-blur-md border border-blue-100/80 shadow-[0_10px_40px_rgba(59,130,246,0.04)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.08)] hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-600 to-sky-400 opacity-80" />
              <CardHeader className="pb-4 pt-6 px-6">
                <CardTitle className="text-xl font-extrabold text-[#0a2a5e] flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  Our Offices
                  </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 px-6 pb-6 text-slate-700">
                {/* London Charlton Drop-Off Point */}
                <div className="space-y-3 pb-5 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                      <span>🇬🇧 London Drop-Off Point (Charlton)</span>
                    </h3>
                    <Link
                      href="/shipping-from-london-to-nigeria"
                      className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
                    >
                      Full Details <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 shadow-sm border border-blue-100">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <a 
                        href="https://www.google.com/maps/dir/?api=1&destination=New+Lydenburg+Commercial+Estate,+New+Lydenburg+Street,+Charlton,+London,+SE7+8NF" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1 text-sm leading-relaxed group/link font-medium"
                      >
                        New Lydenburg Commercial Estate, New Lydenburg Street, Charlton, London, SE7 8NF
                        <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover/link:opacity-100 transition-opacity shrink-0" />
                      </a>
                      <p className="text-xs text-slate-400 mt-0.5">Drop-off &amp; local pickup (Free for air cargo 30kg+, sea cargo for a small fee) serving Charlton &amp; SE London</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 shadow-sm border border-blue-100">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <a href="tel:07405556668" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium block">07405 556668 (London Depot Line &amp; WhatsApp)</a>
                    </div>
                  </div>
                </div>

                {/* UK Office & Liverpool Depot */}
                <div className="space-y-3 pb-5 border-b border-slate-100">
                  <h3 className="font-extrabold text-sm text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                    <span>🇬🇧 United Kingdom Office &amp; Receiving Depot (Liverpool)</span>
                  </h3>
                  
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 shadow-sm border border-blue-100">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Unit%20G6%2C%20Queens%20Dock%20Commercial%20Centre%2C%2067-83%20Norfolk%20Street%2C%20Liverpool%2C%20L1%200BG" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1 text-sm leading-relaxed group/link font-medium"
                    >
                      Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG, United Kingdom
                      <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover/link:opacity-100 transition-opacity shrink-0" />
                    </a>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 shadow-sm border border-blue-100">
                      <Phone className="w-4 h-4" />
                    </div>
                    <a href="tel:+2348110000421" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium mt-1.5 block">+234 811 000 0421 (Support &amp; WhatsApp)</a>
                  </div>
                </div>

                {/* Lagos Office */}
                <div className="space-y-3 pb-5 border-b border-slate-100">
                  <h3 className="font-extrabold text-sm text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                    <span>🇳🇬 Nigeria Office (Lagos Hub &amp; Clearing)</span>
                  </h3>
                  
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 shadow-sm border border-blue-100">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Suite%20F8%2C%20Magnet%20Shopping%20Plaza%2C%20525%20Agege%20Motor%20Rd%2C%20Ladipo-Oshodi%2C%20Lagos%20102214%2C%20Lagos%2C%20Nigeria" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1 text-sm leading-relaxed group/link font-medium"
                    >
                      Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos, Nigeria
                      <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover/link:opacity-100 transition-opacity shrink-0" />
                    </a>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 shadow-sm border border-blue-100">
                      <Phone className="w-4 h-4" />
                    </div>
                    <a href="tel:+2348110000421" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium mt-1.5 block">+234 811 000 0421</a>
                  </div>
                </div>

                {/* Abuja Office */}
                <div className="space-y-3 pb-5 border-b border-slate-100">
                  <h3 className="font-extrabold text-sm text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                    <span>🇳🇬 Nigeria Office (Abuja Hub)</span>
                  </h3>
                  
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 shadow-sm border border-blue-100">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Shop+HF426+Turai+Yar+adua+Block+Wuye+Ultra+Modern+Market+697+Idris+Gidado+Street+Abuja" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1 text-sm leading-relaxed group/link font-medium"
                    >
                      Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market, 697 Idris Gidado Street, Abuja-FCT
                      <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover/link:opacity-100 transition-opacity shrink-0" />
                    </a>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 shadow-sm border border-blue-100">
                      <Phone className="w-4 h-4" />
                    </div>
                    <a href="tel:+2348110000423" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium mt-1.5 block">+234 811 000 0423</a>
                  </div>
                </div>

                {/* US Warehouse */}
                <div className="space-y-3 pb-5 border-b border-slate-100">
                  <h3 className="font-extrabold text-sm text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                    <span>🇺🇸 United States Receiving Warehouse (Texas)</span>
                  </h3>
                  
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 shadow-sm border border-blue-100">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=1234+N+Belt+Line+Rd+Irving+TX+75061" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1 text-sm leading-relaxed group/link font-medium"
                    >
                      1234 N Belt Line Rd, Irving, TX 75061, United States
                      <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover/link:opacity-100 transition-opacity shrink-0" />
                    </a>
                  </div>
                </div>

                {/* Hours Only */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 shadow-sm border border-blue-100">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-semibold text-[#0a2a5e] text-xs uppercase tracking-wider">Opening Hours</p>
                      <div className="text-slate-600 text-sm font-medium space-y-0.5">
                        <p>Monday – Friday: 9:00 AM – 5:00 PM</p>
                        <p>Saturday: 10:00 AM – 2:00 PM (Lagos &amp; Liverpool)</p>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 font-normal">Closed on Sundays &amp; Public Holidays</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Extra Help / Quick Links */}
            <Card className="bg-gradient-to-br from-white via-blue-50/20 to-sky-50/30 border border-blue-100 shadow-[0_10px_30px_rgba(59,130,246,0.03)] rounded-2xl overflow-hidden hover:shadow-[0_15px_40px_rgba(59,130,246,0.06)] hover:-translate-y-0.5 transition-all duration-300">
              <CardHeader className="pb-3 px-6 pt-5">
                <CardTitle className="text-lg font-extrabold text-[#0a2a5e] flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 shadow-sm border border-sky-100">
                    <HelpCircle className="w-4.5 h-4.5" />
                  </div>
                  Looking for Answers?
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-5 space-y-3">
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Find quick answers regarding our rates, restricted items, packaging rules, and delivery schedules:
                </p>
                <div className="flex flex-col gap-2.5 pt-1.5">
                  <Link href="/shipping-from-uk-to-nigeria" className="text-blue-600 hover:text-blue-700 text-sm font-bold flex items-center gap-1.5 transition-colors group/main">
                    Shipping from UK to Nigeria (Full Guide &amp; Instant Calculator)
                    <ArrowRight className="w-4 h-4 group-hover/main:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/shipping-from-uk-to-lagos" className="text-blue-600 hover:text-blue-700 text-sm font-bold flex items-center gap-1.5 transition-colors group/lagos">
                    UK to Lagos Cargo Services &amp; Ladipo Hub Pickup
                    <ArrowRight className="w-4 h-4 group-hover/lagos:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/shipping-from-uk-to-abuja" className="text-blue-600 hover:text-blue-700 text-sm font-bold flex items-center gap-1.5 transition-colors group/abuja">
                    Shipping from UK to Abuja (Wuye Market Hub &amp; Free Delivery Promo)
                    <ArrowRight className="w-4 h-4 group-hover/abuja:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/faq" className="text-blue-600 hover:text-blue-700 text-sm font-bold flex items-center gap-1.5 transition-colors group/faq">
                    Read our Frequently Asked Questions (FAQ) 
                    <ArrowRight className="w-4 h-4 group-hover/faq:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/info" className="text-blue-600 hover:text-blue-700 text-sm font-bold flex items-center gap-1.5 transition-colors group/rates">
                    Check Detailed Rates &amp; Pricing lists 
                    <ArrowRight className="w-4 h-4 group-hover/rates:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Map mockup section */}
        <section className="bg-gradient-to-b from-white via-blue-50/40 to-sky-50/30 py-12 sm:py-24 border-t border-blue-100/50 relative overflow-hidden">
          {/* Background glows for lighting effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-3xl pointer-events-none -z-10" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a2a5e] mb-3 sm:mb-4 tracking-tight">Find Us in Lagos</h3>
            <p className="text-slate-600 max-w-2xl mx-auto mb-8 sm:mb-12 font-medium text-base sm:text-lg leading-relaxed">
              We are located in Ladipo-Oshodi. You can easily find Magnet Shopping Plaza along the main Agege Motor Road. Visit us for package drop-offs or collections.
            </p>
            <div className="w-full h-[280px] sm:h-[380px] md:h-[450px] bg-white/70 p-2 sm:p-4 rounded-2xl sm:rounded-3xl backdrop-blur-md relative shadow-[0_20px_50px_rgba(59,130,246,0.08)] border border-blue-100/60 group">
              <iframe 
                src="https://maps.google.com/maps?q=County%20Cargo,%20525%20Agege%20Motor%20Rd,%20Ladipo-Oshodi,%20Lagos%20102214,%20Lagos,%20Nigeria&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl sm:rounded-2xl filter brightness-[1.01] contrast-[1.01] hover:brightness-100 hover:contrast-100 transition-all duration-500 shadow-inner"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
