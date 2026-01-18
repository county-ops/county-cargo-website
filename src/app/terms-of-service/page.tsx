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
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-secondary mb-8 text-center">Terms of Service</h1>
             <p className="text-center text-gray-500 mb-12">Last Updated: November 04, 2024</p>
            <div className="prose lg:prose-xl max-w-none text-gray-800 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-secondary">1. Definitions:</h2>
                <p><strong>1.1.</strong> In this shipping agreement, “we”, “our”, “us”, and “County Cargo” refer to County Cargo, its subsidiary, and its branches.</p>
                <p><strong>1.2.</strong> “You” and “Your” refer to the shipper and its employees, principals and agents. The shipper in this agreement is the person or entity who delivered the cargo to County Cargo, and who requested that the shipment be transported, and/ or any person/entity having an interest in the shipment and/or who acts as an agent of the shipper.</p>
                <p><strong>1.3.</strong> “Package” means any pallet, container, envelope, etc, that we accept for delivery, and includes items tendered by you using our automated application, manifests, or airway bills.</p>
                <p><strong>1.4.</strong> “Shipment” means one or more packages moving on a single house airway, an airway bill, an invoice number, or a shipment number, or manifested from an automated shipping application and accepted by us.</p>
                <p><strong>1.5.</strong> “Dangerous Goods” means cargo that is noxious, hazardous, inflammable, explosive, or offensive (including radioactive materials) or may become noxious, hazardous, inflammable, explosive offensive, or radioactive or may become liable to cause damage to any person or property whatsoever whether prescribed by laws or otherwise.</p>
                <p><strong>1.6.</strong> Airfreight Convention” means whichever may be applicable of the: Convention for the Unification of Certain Rules for International Carriage by Air signed at Montreal on 28 May 1999; or</p>
                <p><strong>1.7.</strong> Convention for the Unification of Certain Rules relating to International Carriage by Air, signed at Warsaw on 12 October 1929; either unamended or amended by The Hague Protocol 1955; at Guatemala City 197</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
