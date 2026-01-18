
import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Shop from UK Stores | County Cargo',
  description: 'Browse a list of popular UK online stores and ship your purchases to Nigeria with County Cargo.',
};

const JohnLewisLogo = ({ className }: { className?: string }) => (
    <svg className={cn("h-10 w-auto", className)} fill="currentColor" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>John Lewis & Partners</title><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.9 14.625h.9V9.375h-.9v5.25zm-3.6 2.625h.9V6.75h-.9v10.5zM15.6 17.25h.9V6.75h-.9v10.5zm3.6-2.625h.9V9.375h-.9v5.25z"/></svg>
);

const SheinLogo = ({ className }: { className?: string }) => (
    <svg
      className={cn("h-8 w-auto", className)}
      fill="currentColor"
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M110.19,94.13H49.11V78.27h88.35v15.47h-12.4l-0.42,0.4v30.41h12.82v15.85H49.11V124.5h61.08Zm0,14.54H65V124.5h45.15v-15.83Z M164.71,94.13v46.22h15.48V94.13Zm37.16,0v46.22h15.47V94.13Z M224,78.27v78.27h-15.48V94.13H170.5v46.22h-15.48V78.27h68.94Z" />
    </svg>
);

const stores = [
    { name: "Adidas UK", domain: "adidas.co.uk" },
    { name: "AllSaints", domain: "allsaints.com" },
    { name: "Amazon UK", domain: "amazon.co.uk" },
    { name: "AO.com", domain: "ao.com" },
    { name: "Apple UK", domain: "apple.com" },
    { name: "Argos", domain: "argos.co.uk" },
    { name: "Asda", domain: "asda.com" },
    { name: "ASOS", domain: "asos.com" },
    { name: "Beauty Bay", domain: "beautybay.com" },
    { name: "Boohoo", domain: "boohoo.com" },
    { name: "Boots", domain: "boots.com" },
    { name: "Charlotte Tilbury", domain: "charlottetilbury.com" },
    { name: "Clarks", domain: "clarks.co.uk" },
    { name: "Cult Beauty", domain: "cultbeauty.co.uk" },
    { name: "Currys", domain: "currys.co.uk" },
    { name: "Debenhams", domain: "debenhams.com" },
    { name: "Dunelm", domain: "dunelm.com" },
    { name: "eBay UK", domain: "ebay.co.uk" },
    { name: "Footasylum", domain: "footasylum.com" },
    { name: "H&M", domain: "hm.com" },
    { name: "Harrods", domain: "harrods.com" },
    { name: "Harvey Nichols", domain: "harveynichols.com" },
    { name: "IKEA UK", domain: "ikea.com" },
    { name: "JD Sports", domain: "jdsports.co.uk" },
    { name: "John Lewis", domain: "johnlewis.com" },
    { name: "Liberty London", domain: "libertylondon.com" },
    { name: "LookFantastic", domain: "lookfantastic.com" },
    { name: "Lush", domain: "lush.com" },
    { name: "Marks & Spencer", domain: "marksandspencer.com" },
    { name: "Matalan", domain: "matalan.co.uk" },
    { name: "Missguided", domain: "missguided.co.uk" },
    { name: "New Look", domain: "newlook.com" },
    { name: "Next", domain: "next.co.uk" },
    { name: "Nike UK", domain: "nike.com" },
    { name: "PrettyLittleThing", domain: "prettylittlething.com" },
    { name: "Primark", domain: "primark.com" },
    { name: "Reiss", domain: "reiss.com" },
    { name: "River Island", domain: "riverisland.com" },
    { name: "Sainsbury's", domain: "sainsburys.co.uk" },
    { name: "Schuh", domain: "schuh.co.uk" },
    { name: "Selfridges", domain: "selfridges.com" },
    { name: "Sephora UK", domain: "sephora.co.uk" },
    { name: "Shein", domain: "shein.co.uk" },
    { name: "Space NK", domain: "spacenk.com" },
    { name: "Sports Direct", domain: "sportsdirect.com" },
    { name: "Superdrug", domain: "superdrug.com" },
    { name: "Ted Baker", domain: "tedbaker.com" },
    { name: "Tesco", domain: "tesco.com" },
    { name: "The Body Shop", domain: "thebodyshop.com" },
    { name: "The Range", domain: "therange.co.uk" },
    { name: "TK Maxx", domain: "tkmaxx.com" },
    { name: "Topshop", domain: "asos.com" },
    { name: "Very", domain: "very.co.uk" },
    { name: "Waitrose", domain: "waitrose.com" },
    { name: "Zara", domain: "zara.com" },
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
              {stores.sort((a, b) => a.name.localeCompare(b.name)).map((store, index) => {
                let storeContent;
                if (store.name === 'John Lewis') {
                    storeContent = <JohnLewisLogo className="text-gray-800 group-hover:text-primary h-10 mx-auto" />
                } else if (store.name === 'Shein') {
                    storeContent = <SheinLogo className="text-gray-800 group-hover:text-primary h-8 mx-auto" />
                } else {
                    storeContent = <p className="font-semibold text-secondary group-hover:text-primary">{store.name}</p>
                }

                return (
                    <a
                    key={index}
                    href={`https://${store.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center justify-center text-center p-4 bg-gray-50 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-primary/5 h-24"
                    >
                    {storeContent}
                    <div className="flex items-center text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Shop now <ExternalLink className="h-3 w-3 ml-1" />
                    </div>
                    </a>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
