
import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About County Cargo | Reliable Logistics Solutions',
  description: 'Learn about County Cargo, our commitment to providing fast, reliable, and secure cargo and parcel shipping services from the UK to Nigeria and worldwide.',
};

const specialistServices = [
    "Door-to-door cargo throughout Nigeria",
    "Air and sea consolidations",
    "Customs clearance and nationwide delivery",
    "Pre-shipment inspection facilities",
    "Form M / SONCAP documentation",
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section
          className="min-h-[40vh] flex items-center justify-center text-white"
           style={{
            background: `linear-gradient(rgba(30, 64, 175, 0.65), rgba(31, 41, 55, 0.7)), url('https://images.unsplash.com/photo-1577563908411-5077b6a5b348?auto=format&fit=crop&w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold">About County Cargo</h1>
            <p className="text-xl mt-4 max-w-3xl mx-auto">Your trusted partner in international logistics.</p>
          </div>
        </section>

        <section id="about-content" className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-1 gap-12 items-center">
                    <div data-aos="fade-up">
                        <p className="text-lg text-gray-800 mb-6">
                            At County Cargo, we are committed to providing fast, reliable, and secure cargo and parcel shipping services from the UK to Nigeria and destinations worldwide. With years of experience in international logistics, we pride ourselves on transparency, compliance, and professionalism in every shipment.
                        </p>
                        <p className="text-lg text-gray-800 mb-6">
                           We operate fully within the law, strictly adhering to regulations set by UK authorities and international airlines. Our services are designed to ensure your packages reach their destination safely, on time, and in full compliance with airline safety and security guidelines.
                        </p>
                        <p className="text-lg text-gray-800 mb-8">
                           We offer flexible shipping options, including door-to-door delivery and the traditional airport-to-airport service. With our extensive international network of air freight agents, we provide quick, competitive quotations and can often arrange shipments at short notice.
                        </p>

                        <div className="bg-gray-50 p-8 rounded-lg shadow-inner">
                            <h2 className="text-3xl font-bold text-secondary mb-6 text-center">Our Specialist Services</h2>
                            <ul className="space-y-4">
                                {specialistServices.map((service, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                                        <span className="text-lg text-gray-800">{service}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-12">
                             <h2 className="text-3xl font-bold text-secondary mb-6">Our Policies & Guidelines</h2>
                             <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-secondary mb-2">No Refund Policy</h3>
                                    <p className="text-lg text-gray-800">All shipments are final once booked to comply with airline regulations. Customers are advised to review shipment details carefully before payment.</p>
                                </div>
                                 <div>
                                    <h3 className="text-xl font-semibold text-secondary mb-2">Strict Airline Compliance</h3>
                                    <p className="text-lg text-gray-800">Every package is screened and handled according to airline rules to guarantee safe transport.</p>
                                </div>
                                 <div>
                                    <h3 className="text-xl font-semibold text-secondary mb-2">Professional Handling</h3>
                                    <p className="text-lg text-gray-800">From consolidation to delivery, our team treats every parcel with the utmost care and responsibility.</p>
                                </div>
                             </div>
                        </div>

                         <div className="mt-12 text-center bg-primary text-primary-foreground p-8 rounded-lg shadow-lg">
                            <p className="text-xl mb-4">
                               At County Cargo, we don’t just ship packages—we provide peace of mind. Our goal is to make international shipping seamless, secure, and reliable, offering comprehensive solutions to meet all your logistics needs.
                            </p>
                             <p className="text-xl font-semibold">
                               Trust, compliance, and accountability are the pillars of our service. Choosing County Cargo means choosing a cargo partner that prioritizes your shipments and your satisfaction within legal and professional boundaries.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
