import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CheckCircle, ShieldCheck, Globe, Search, Award, Zap, Building2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About County Cargo | Professional Shipping & Logistics',
  description: 'Discover County Cargo—your premier logistics partner. We deliver fast, secure, and compliant shipping solutions connecting Nigeria, the UK, the USA, and worldwide.',
  alternates: {
    canonical: 'https://countycargo.com/about',
  },
};

const specialistServices = [
    { title: "Door-to-Door Delivery", desc: "Seamless nationwide delivery directly to your doorstep across Lagos and all states in Nigeria." },
    { title: "DHL Express (3-5 Day) Shipping", desc: "Rapid, high-priority transit for urgent documents and small parcels from Nigeria to the US, UK, and globally." },
    { title: "24hrs Express (UK & Nigeria)", desc: "Super-fast, next-day express cargo shipping operating to and from the United Kingdom and Nigeria for time-sensitive freight." }
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-16 bg-slate-50 min-h-screen">
        {/* Hero Section */}
        <section
          className="relative min-h-[40vh] sm:min-h-[45vh] flex items-center justify-center text-white overflow-hidden py-14 sm:py-0"
          style={{
            backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.65), rgba(15, 23, 42, 0.85)), url('/service-uk-nigeria-new.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10" data-aos="fade-up">
            <span className="text-blue-400 font-semibold tracking-wider uppercase text-xs sm:text-sm block mb-2">Connecting Continents</span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold hero-text-glow font-poppins">Our Story &amp; Mission</h1>
            <p className="text-base sm:text-lg md:text-xl mt-3 sm:mt-4 max-w-3xl mx-auto text-gray-300">
              Reliable, secure, and fully compliant international logistics tailored for businesses and individuals.
            </p>
          </div>
        </section>

        {/* Who We Are & Story Section */}
        <section id="about-content" className="py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* Text Side */}
              <div className="lg:col-span-7 space-y-6" data-aos="fade-right">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-2">
                  <Building2 className="w-4 h-4" />
                  <span>About County Cargo</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  Seamless Global Shipping, <br className="hidden md:block"/>Done Right.
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Operated by <strong>County Service Group</strong>, County Cargo is an international logistics provider specializing in seamless, reliable, and secure air freight, ocean shipping, and door-to-door cargo forwarding. We bridge the trade corridor between <strong>Nigeria, the United Kingdom, and the United States</strong>, offering scheduled consolidations built on transparency, compliance, and care.
                </p>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Our operational footprint integrates verified receiving hubs in <strong>Liverpool</strong> (Unit G6, Queens Dock Commercial Centre, L1 0BG), <strong>Lagos</strong> (Suite F8, Magnet Shopping Plaza, Ladipo-Oshodi), <strong>Abuja</strong> (Wuye Ultra Modern Market), and <strong>Texas</strong> (1234 N Belt Line Rd, Irving). This infrastructure enables us to coordinate smooth cargo consolidations, handle end-to-end customs clearance, and execute nationwide doorstep deliveries across Nigeria and the UK.
                </p>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  We operate in complete compliance with aviation safety regulations, UK HMRC &amp; DEFRA requirements, and Nigerian Customs Service protocols. Our focus is on clear communication, certified weight transparency, and dependable delivery schedules.
                </p>
              </div>

              {/* Graphic/Image Side */}
              <div className="lg:col-span-5 relative" data-aos="fade-left">
                <div className="absolute inset-0 bg-blue-600 rounded-3xl rotate-3 scale-95 opacity-10"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100/50">
                  <Image 
                    src="/nigeria to uk.jpg" 
                    alt="County Cargo Shipping Services" 
                    width={450} 
                    height={600} 
                    className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16" data-aos="fade-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">Why Choose County Cargo?</h2>
              <p className="text-lg text-slate-600 mt-4">
                We design our operations around reliability, speed, and safety, giving our clients maximum confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
              {/* Card 1 */}
              <div className="bg-blue-50/10 p-8 rounded-2xl border-2 border-blue-500 hover:border-blue-600 hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300" data-aos="fade-up" data-delay="100">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Robust Global Network</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Strategic shipping routes linking Nigeria directly to major trade corridors in the UK and USA, backed by dedicated sorting facilities and handling hubs.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-green-50/10 p-8 rounded-2xl border-2 border-green-500 hover:border-green-600 hover:shadow-xl hover:shadow-green-100/30 transition-all duration-300" data-aos="fade-up" data-delay="200">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-6">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Real-Time Client Portal</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Complete shipping visibility and end-to-end transparency. Track every shipment progress live through our client portal at <Link href="https://ship.countycargo.com" className="text-blue-600 hover:underline">ship.countycargo.com</Link>.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-purple-50/10 p-8 rounded-2xl border-2 border-purple-500 hover:border-purple-600 hover:shadow-xl hover:shadow-purple-100/30 transition-all duration-300" data-aos="fade-up" data-delay="300">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Uncompromising Compliance</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Strict adherence to aviation authorities and international airline safety protocols to ensure safe, secure, and hassle-free cargo transit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Specialist Services Section */}
        <section className="py-14 sm:py-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16" data-aos="fade-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">Our Specialist Services</h2>
              <p className="text-lg text-slate-600 mt-4">
                Tailored logistics packages structured around safety, strict compliance, and nationwide distribution.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specialistServices.map((service, index) => {
                const serviceColors = [
                  {
                    border: "border-blue-500 hover:border-blue-600 hover:shadow-blue-100/30",
                    bg: "bg-blue-50/10",
                    icon: "text-blue-600 bg-blue-50",
                  },
                  {
                    border: "border-pink-500 hover:border-pink-600 hover:shadow-pink-100/30",
                    bg: "bg-pink-50/10",
                    icon: "text-pink-600 bg-pink-50",
                  },
                  {
                    border: "border-purple-500 hover:border-purple-600 hover:shadow-purple-100/30",
                    bg: "bg-purple-50/10",
                    icon: "text-purple-600 bg-purple-50",
                  }
                ];
                const colors = serviceColors[index % serviceColors.length];
                return (
                  <div 
                    key={index} 
                    className={`flex gap-4 p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${colors.bg} ${colors.border}`} 
                    data-aos="fade-up"
                  >
                    <div className={`p-2 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center ${colors.icon}`}>
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
                      <p className="text-slate-600 leading-relaxed text-sm">{service.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Policies & Guidelines Section */}
        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-16" data-aos="fade-up">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Company Policies &amp; Guidelines</h2>
              <p className="text-slate-600 mt-3 sm:mt-4 text-base sm:text-lg">
                Essential operating policies that guarantee quality of service, security, and integrity across all cargos.
              </p>
            </div>
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 divide-y divide-slate-100" data-aos="fade-up">
              <div className="p-5 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0"></span>
                  No Refund Policy
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base lg:text-lg pl-4">
                  Once booking and consolidation are finalized, all shipments are legally processed and booked directly on international airline manifests. Consequently, shipments are final and non-refundable. We advise clients to thoroughly verify package weights, dimensions, and contents prior to transaction payments.
                </p>
              </div>

              <div className="p-5 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
                  Strict Airline Security &amp; Inspections
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base lg:text-lg pl-4">
                  Every parcel entering our UK, US, or Nigeria cargo centers is subject to comprehensive security screening and physical weight audits. This ensures strict compliance with aviation security standards and prevents transit of contraband or prohibited cargo.
                </p>
              </div>

              <div className="p-5 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0"></span>
                  Professional Handling &amp; Liability
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base lg:text-lg pl-4">
                  From safe sorting and consolidation to final dispatch and delivery, our logistics professionals treat all items with maximum accountability. County Cargo guarantees structured shipping procedures governed by standard carrier terms to protect your package integrity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Global CTA Section */}
        <section className="py-14 sm:py-20 bg-gradient-to-r from-blue-700 via-blue-800 to-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.3),transparent_45%)]"></div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8 z-10" data-aos="fade-up">
            <ShieldCheck className="h-12 w-12 sm:h-16 sm:w-16 text-blue-300 mx-auto animate-pulse" />
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight font-poppins">
              Experience Hassle-Free Global Logistics Today
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              No matter the corridor—Nigeria, the United Kingdom, or the United States—County Cargo is your trusted shipping gateway. Book your shipment, print shipping labels, and track transit progress from origin to destination instantly.
            </p>
            <div className="pt-2 sm:pt-4">
              <Link 
                href="https://ship.countycargo.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-800 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-xl hover:bg-blue-50 transition-all duration-300 group w-full sm:w-auto justify-center"
              >
                <span>Start Shipping Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
