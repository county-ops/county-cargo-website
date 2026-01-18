
import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shop from US Stores | County Cargo',
  description: 'Browse a list of popular US online stores and ship your purchases to Nigeria with County Cargo.',
};

const stores = [
    { name: "Walmart", domain: "walmart.com" }, { name: "Target", domain: "target.com" },
    { name: "Amazon US", domain: "amazon.com" }, { name: "eBay US", domain: "ebay.com" },
    { name: "Best Buy", domain: "bestbuy.com" }, { name: "Home Depot", domain: "homedepot.com" },
    { name: "Lowe's", domain: "lowes.com" }, { name: "Macy's", domain: "macys.com" },
    { name: "Kohl's", domain: "kohls.com" }, { name: "Nordstrom", domain: "nordstrom.com" },
    { name: "Costco", domain: "costco.com" }, { name: "Sam's Club", domain: "samsclub.com" },
    { name: "Gap", domain: "gap.com" }, { name: "Old Navy", domain: "oldnavy.com" },
    { name: "Banana Republic", domain: "bananarepublic.com" }, { name: "Sephora", domain: "sephora.com" },
    { name: "Ulta Beauty", domain: "ulta.com" }, { name: "Foot Locker", domain: "footlocker.com" },
    { name: "Champs Sports", domain: "champssports.com" }, { name: "Finish Line", domain: "finishline.com" },
    { name: "Apple US", domain: "apple.com" }, { name: "Nike US", domain: "nike.com" },
    { name: "Adidas US", domain: "adidas.com" }, { name: "GameStop", domain: "gamestop.com" },
    { name: "Bath & Body Works", domain: "bathandbodyworks.com" }, { name: "Victoria's Secret", domain: "victoriassecret.com" },
    { name: "J.Crew", domain: "jcrew.com" }, { name: "American Eagle", domain: "ae.com" },
    { name: "Forever 21", domain: "forever21.com" }, { name: "Zara US", domain: "zara.com" },
    { name: "H&M US", domain: "hm.com" }, { name: "The Body Shop US", domain: "thebodyshop.com" },
];

export default function UsStoresPage() {
  return (
    <>
      <Header />
      <main className="pt-24 bg-white">
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Shop from US Stores</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">Browse a list of popular US online stores and ship your purchases to Nigeria with County Cargo.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {stores.map((store, index) => (
                <a
                  key={index}
                  href={`https://${store.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center text-center p-4 bg-gray-50 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-primary/5"
                >
                  <p className="font-semibold text-secondary group-hover:text-primary">{store.name}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop now <ExternalLink className="h-3 w-3 ml-1" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
