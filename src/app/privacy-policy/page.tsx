
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
            <h1 className="text-4xl font-bold text-secondary mb-8 text-center">Privacy Policy – County Cargo</h1>
            <p className="text-center text-gray-500 mb-12">Last Updated: October 27, 2023</p>

            <div className="prose lg:prose-xl max-w-none text-gray-800 space-y-8">
              <p>
                County Cargo (“we,” “our,” or “us”) is committed to protecting the privacy of our customers, partners, and website visitors. This Privacy Policy explains how we collect, use, store, and protect personal information in relation to our freight and logistics services and outlines your rights regarding your data.
              </p>
              <p>
                By using our services, you consent to the practices described in this Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold text-secondary">1. Information We Collect</h2>
              <p>
                We collect information that is necessary to provide, manage, and improve our services, which may include:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Personal Identification Information:</strong> Name, address, phone number, email address, and company details.
                </li>
                <li>
                  <strong>Shipping Information:</strong> Details related to freight shipments, including origin, destination, package contents, and delivery instructions.
                </li>
                <li>
                  <strong>Payment Information:</strong> Credit card details or other payment methods necessary to process transactions securely.
                </li>
                <li>
                  <strong>Technical Information:</strong> IP address, browser type, operating system, and browsing behavior when interacting with our website.
                </li>
                <li>
                  <strong>Other Information:</strong> Any information you voluntarily provide, such as customer feedback, inquiries, or correspondence with our support team.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-secondary">2. How We Use Your Information</h2>
              <p>We use the collected information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Service Provision:</strong> To process freight shipments, track deliveries, and provide customer support.</li>
                <li><strong>Communication:</strong> To inform you of updates, promotions, or important service announcements.</li>
                <li><strong>Payment Processing:</strong> To securely handle payment transactions and manage billing.</li>
                <li><strong>Compliance and Legal Requirements:</strong> To fulfill our legal obligations and protect our legal rights.</li>
                <li><strong>Service Improvement:</strong> To analyze and enhance our services, website functionality, and customer experience.</li>
                <li><strong>Fraud Prevention:</strong> To detect and prevent fraudulent or unauthorized activities on our platform.</li>
              </ul>

              <h2 className="text-2xl font-bold text-secondary">3. How We Share Your Information</h2>
              <p>We may share your information under the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating our business, such as shipping partners, payment processors, and IT support.</li>
                <li><strong>Legal Compliance:</strong> When required by law or in response to a valid legal process, such as a subpoena or court order.</li>
                <li><strong>Business Transactions:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.</li>
                <li><strong>Protection of Rights:</strong> To protect the rights, property, or safety of County Cargo, our clients, or others.</li>
              </ul>
              <p><strong>Note:</strong> We do not sell or rent personal information to third parties.</p>

              <h2 className="text-2xl font-bold text-secondary">4. Insurance and Liability Policy</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Customers are encouraged to purchase shipping insurance for all shipments.</li>
                <li>Without insurance, the maximum payout for a lost or missing package is $39 USD.</li>
                <li>County Cargo is not liable for damages, loss, or delays exceeding the insured or stated payout limit.</li>
                <li>Insurance coverage and claims procedures are provided at the time of shipment booking.</li>
              </ul>

              <h2 className="text-2xl font-bold text-secondary">5. Data Security</h2>
              <p>
                We implement a range of security measures to protect your personal information, including encryption, access control, and secure storage methods. While we strive to use commercially acceptable means to protect your data, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-bold text-secondary">6. Data Retention</h2>
              <p>We retain personal information only as long as necessary to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Fulfill the purposes for which it was collected</li>
                <li>Comply with legal, regulatory, or contractual obligations</li>
                <li>Resolve disputes and enforce our agreements</li>
              </ul>

              <h2 className="text-2xl font-bold text-secondary">7. Your Rights and Choices</h2>
              <p>Depending on your location and applicable law, you may have rights regarding your personal information, including:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Access and Correction:</strong> Request access to your data or correct inaccurate information.</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal obligations.</li>
                <li><strong>Opt-Out of Marketing:</strong> Unsubscribe from marketing communications via email links or by contacting us directly.</li>
                <li><strong>Data Portability and Restriction:</strong> Request data portability or limit certain processing activities.</li>
              </ul>
              <p>To exercise your rights, please contact us using the details below.</p>

              <h2 className="text-2xl font-bold text-secondary">8. Cookies and Tracking Technologies</h2>
              <p>
                We may use cookies, web beacons, and similar technologies to collect information about your website activity. You can manage cookie preferences in your browser settings. Please note that some features of the website may not function correctly without cookies.
              </p>

              <h2 className="text-2xl font-bold text-secondary">9. International Data Transfers</h2>
              <p>
                If you access our services from outside Nigeria, your information may be transferred to and processed in countries with different data protection laws. We implement safeguards to ensure your data remains protected in accordance with this Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold text-secondary">10. Changes to This Privacy Policy</h2>
              <p>
                County Cargo may update this Privacy Policy periodically to reflect changes in practices, legal requirements, or operational needs. Updates will be posted on this page, and the “Last Updated” date will reflect the most recent version. We encourage you to review this policy periodically.
              </p>

              <h2 className="text-2xl font-bold text-secondary">11. Contact Us</h2>
              <p>For questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact us at:</p>
              <address className="not-italic">
                County Cargo<br />
                Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos 102214, Lagos, Nigeria<br />
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
