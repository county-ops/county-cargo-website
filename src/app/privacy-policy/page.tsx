
import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Privacy Policy – County Cargo',
  description: 'Learn how County Cargo collects, uses, and protects your personal information in relation to our freight and logistics services.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 bg-white">
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-secondary mb-8 text-center">Privacy Policy</h1>
            <p className="text-center text-gray-500 mb-12">Last Updated: November 04, 2024</p>

            <div className="prose lg:prose-xl max-w-none text-gray-800 space-y-8">
              <h2 className="text-2xl font-bold text-secondary">1. Information We Collect</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Personal information:</strong> Name, email, phone, address, company details</li>
                <li><strong>Shipping information:</strong> Origin, destination, package contents, instructions</li>
                <li><strong>Payment information</strong></li>
                <li><strong>Technical info:</strong> IP, browser, OS, browsing behavior</li>
              </ul>

              <h2 className="text-2xl font-bold text-secondary">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Process shipments and track deliveries</li>
                <li>Customer support and communication</li>
                <li>Secure payment processing</li>
                <li>Compliance with legal obligations</li>
                <li>Service improvement and analytics</li>
              </ul>

              <h2 className="text-2xl font-bold text-secondary">3. How We Share Your Information</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Service providers:</strong> shipping partners, payment processors, IT vendors</li>
                <li><strong>Legal compliance</strong></li>
                <li><strong>Business transactions:</strong> mergers, acquisitions</li>
                <li><strong>Protection of rights</strong></li>
              </ul>
              <p>We do not sell or rent personal information.</p>
              
              <h2 className="text-2xl font-bold text-secondary">4. Data Security</h2>
              <p>
                We implement encryption, access control, and secure storage. No method of internet transmission is 100% secure.
              </p>
              
              <h2 className="text-2xl font-bold text-secondary">5. Data Retention</h2>
              <p>We retain personal data only as long as necessary to fulfill services and legal obligations.</p>

              <h2 className="text-2xl font-bold text-secondary">6. Your Rights</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Access and correction</li>
                <li>Deletion (with exceptions)</li>
                <li>Opt-out of marketing</li>
                <li>Data portability and restriction of processing</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-secondary">7. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance website experience. Some features may not function without them.
              </p>

              <h2 className="text-2xl font-bold text-secondary">8. International Data Transfers</h2>
              <p>
                Your information may be transferred to countries with different privacy laws. County Cargo ensures appropriate safeguards.
              </p>
              
              <h2 className="text-2xl font-bold text-secondary">9. Changes to Privacy Policy</h2>
              <p>
                We may update this Privacy Policy. Updates are posted here with the updated "Last Updated" date.
              </p>

              <h2 className="text-2xl font-bold text-secondary">10. Contact Information</h2>
              <address className="not-italic">
                County Cargo<br />
                Asset Corp Plaza, C90, 21 Obafemi Awolowo Way, Ikeja, Lagos<br />
                Email: info@countycargo.com<br />
                Phone: +2348110000421 | +2348110000423
              </address>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
