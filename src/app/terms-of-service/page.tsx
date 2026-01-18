
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
            <div className="prose lg:prose-xl max-w-none text-gray-800 space-y-8">
              <p>
                [Please paste your Terms of Service content here.]
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
