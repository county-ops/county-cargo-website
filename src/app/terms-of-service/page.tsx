import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Terms of Service – County Cargo',
  description: 'Read the Terms of Service for using County Cargo\'s freight and logistics services.',
};

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="pt-24 bg-white">
        <section className="py-16 non-copyable">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-secondary mb-8 text-center">Terms &amp; Conditions</h1>
             <p className="text-center text-gray-500 mb-12">Last Updated: November 04, 2024</p>
            <div className="prose lg:prose-xl max-w-none text-gray-800 space-y-6">
              
              <div>
                <h2 className="text-2xl font-bold text-secondary">1. General Disclaimer</h2>
                <p>All information on the County Cargo website is for general informational purposes only. It does not constitute professional, legal, or financial advice. County Cargo and affiliates disclaim all liability for any loss, damage, or expense arising from reliance on website content.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-secondary">2. About County Cargo</h2>
                <p>County Cargo is a company registered in England and Wales, providing international freight, shipping, and logistics services, including air freight, sea freight, and cargo delivery worldwide.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-secondary">3. Website Access</h2>
                <p>Website access is temporary. County Cargo reserves the right to amend, suspend, or discontinue the website or services at any time without notice.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-secondary">4. Payment and Delivery Policies</h2>
                <ul className="list-disc list-inside">
                  <li>Payments must be made in full before cargo is released.</li>
                  <li>Storage fees may apply if cargo is stored beyond the agreed period.</li>
                  <li>Uncollected items may be sold or disposed of to recover charges.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-secondary">5. Packaging Requirements</h2>
                <p>Customers are responsible for properly packing all cargo. County Cargo is not liable for damage caused by inadequate packaging. Professional packing is available by arrangement.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-secondary">6. Shipping from Overseas</h2>
                <p>Customers shipping to our UK terminal must provide valid identification such as a passport and proof of address. Failure to provide required documents may result in cargo refusal.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-secondary">7. Prohibited and Restricted Items</h2>
                <ul className="list-disc list-inside">
                  <li>Firearms, weapons, ammunition</li>
                  <li>Illegal drugs/substances</li>
                  <li>Counterfeit currency or documents</li>
                  <li>Expired medicines, hazardous materials</li>
                  <li>Perishable goods without arrangement</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-secondary">8. Fragile & High-Value Items</h2>
                <p>Fragile and high-value items must be securely packed. County Cargo is not liable unless additional insurance is purchased.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-secondary">9. Service Availability</h2>
                <p>Services may vary depending on destination, customs, and regulations. County Cargo is not liable for service disruptions caused by authorities.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-secondary">10. Pickup and Collection</h2>
                <p>Payments must be through authorized channels. Customers are responsible for loading cargo unless prior arrangements are made.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-secondary">11. Liability and Insurance</h2>
                <p>County Cargo’s liability per shipment is limited unless additional insurance is purchased. Items like jewelry, musical instruments, and fragile goods may be excluded unless insured.</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-secondary">12. Vehicle Shipping</h2>
                <p>Vehicles must be clean, free of fluids, and roadworthy. County Cargo is not responsible for internal contents or mechanical issues unless additional services are arranged.</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-secondary">13. Delivery Times</h2>
                <p>Delivery times are estimates and may be affected by weather, customs, or logistics delays. Guarantees are subject to these variables.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-secondary">14. Customs, Duties & Taxes</h2>
                <p>Customers are responsible for all customs duties, taxes, and fees. County Cargo does not cover these charges.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-secondary">15. Intellectual Property</h2>
                <p>All content on the County Cargo website is owned or licensed by us. Unauthorized use is prohibited.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-secondary">16. External Links</h2>
                <p>County Cargo is not responsible for third-party websites. Linking does not imply endorsement.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-secondary">17. Governing Law</h2>
                <p>These terms are governed by the laws of England and Wales. Disputes fall under the exclusive jurisdiction of its courts.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-secondary">18. Changes to Terms</h2>
                <p>County Cargo reserves the right to update these Terms at any time. Updates are effective upon posting.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
