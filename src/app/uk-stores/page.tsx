
import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shop from UK Stores | County Cargo',
  description: 'Browse a list of popular UK online stores and ship your purchases to Nigeria with County Cargo.',
};

const stores = [
    { name: "Marks & Spencer", domain: "marksandspencer.com" }, { name: "Tesco", domain: "tesco.com" },
    { name: "ASOS", domain: "asos.com" }, { name: "John Lewis", domain: "johnlewis.com" },
    { name: "Next", domain: "next.co.uk" }, { name: "Boots", domain: "boots.com" },
    { name: "Currys", domain: "currys.co.uk" }, { name: "JD Sports", domain: "jdsports.co.uk" },
    { name: "Amazon UK", domain: "amazon.co.uk" }, { name: "eBay UK", domain: "ebay.co.uk" },
    { name: "Argos", domain: "argos.co.uk" }, { name: "Very", domain: "very.co.uk" },
    { name: "Boohoo", domain: "boohoo.com" }, { name: "PrettyLittleThing", domain: "prettylittlething.com" },
    { name: "River Island", domain: "riverisland.com" }, { name: "Sports Direct", domain: "sportsdirect.com" },
    { name: "Debenhams", domain: "debenhams.com" }, { name: "Selfridges", domain: "selfridges.com" },
    { name: "Harrods", domain: "harrods.com" }, { name: "Superdrug", domain: "superdrug.com" },
    { name: "Primark", domain: "primark.com" }, { name: "Zara", domain: "zara.com" },
    { name: "H&M", domain: "hm.com" }, { name: "Matalan", domain: "matalan.co.uk" },
    { name: "The Body Shop", domain: "thebodyshop.com" }, { name: "Waitrose", domain: "waitrose.com" },
    { name: "Sainsbury's", domain: "sainsburys.co.uk" }, { name: "Asda", domain: "asda.com" },
    { name: "TK Maxx", domain: "tkmaxx.com" }, { name: "Dunelm", domain: "dunelm.com" },
    { name: "The Range", domain: "therange.co.uk" }, { name: "IKEA UK", domain: "ikea.com" },
    { name: "PC World", domain: "currys.co.uk" },
    { name: "AO.com", domain: "ao.com" },
    { name: "Apple UK", domain: "apple.com" },
    { name: "Nike UK", domain: "nike.com" },
    { name: "Adidas UK", domain: "adidas.co.uk" },
    { name: "Footasylum", domain: "footasylum.com" },
    { name: "Schuh", domain: "schuh.co.uk" },
    { name: "Clarks", domain: "clarks.co.uk" },
    { name: "LookFantastic", domain: "lookfantastic.com" },
    { name: "Cult Beauty", domain: "cultbeauty.co.uk" },
    { name: "Space NK", domain: "spacenk.com" },
    { name: "Feelunique", domain: "sephora.co.uk" },
    { name: "New Look", domain: "newlook.com" },
    { name: "Topshop", domain: "asos.com" },
];


export default function UkStoresPage() {
  return (
    <>
      <Header />
      <main className="pt-24 bg-white">
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Shop from UK Stores</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">Browse a list of popular UK online stores and ship your purchases to Nigeria with County Cargo.</p>
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
