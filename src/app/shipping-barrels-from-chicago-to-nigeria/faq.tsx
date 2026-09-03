'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const chicagoFaqItems = [
  {
    question: 'How do I ship a barrel from Chicago to Nigeria?',
    answer:
      'To ship a barrel from Chicago to Nigeria, first contact County Cargo to request an up-to-date quotation based on your barrel size, estimated weight and destination in Nigeria. Our team will provide packing recommendations and detailed instructions for dispatching or delivering your prepared barrel to our designated US processing warehouse. Once received and processed, your barrel is scheduled for shipping to Nigeria.',
  },
  {
    question: 'Can County Cargo collect my barrel in Chicago?',
    answer:
      'Any local collection or third-party courier pickup service in Chicago and surrounding Illinois communities is strictly subject to scheduling, location availability and advance confirmation. Alternatively, customers can arrange for their barrel or boxes to be transported directly to our designated US warehouse following our provided receiving instructions.',
  },
  {
    question: 'How much does it cost to ship a barrel to Nigeria?',
    answer:
      'The cost to ship a barrel to Nigeria depends on whether you choose ocean sea freight or air cargo, the dimensions and weight of the barrel, and the final destination city in Nigeria (such as Lagos, Abuja, or other states). Because freight rates, fuel surcharges and carrier tariffs can fluctuate, please contact County Cargo directly for a current, transparent quotation before dispatching.',
  },
  {
    question: 'Is air or sea cargo better for a barrel?',
    answer:
      'Sea freight is generally the most economical and practical option for shipping heavy, high-volume standard 55-gallon or 75-gallon barrels and large household boxes. Air cargo is faster and best suited for smaller packages, time-sensitive goods or urgent commercial samples where speed is the primary priority.',
  },
  {
    question: 'What items cannot be placed inside a barrel?',
    answer:
      'You must not pack illegal goods, firearms, ammunition, hazardous chemicals, flammable liquids, loose combustible substances, leaking liquids, cash, perishable fresh foods, or items prohibited by Nigeria Customs Service. Standalone lithium-ion batteries and powered electronics must always be declared in advance.',
  },
  {
    question: 'Can my barrel be delivered outside Lagos?',
    answer:
      'Yes. County Cargo coordinates deliveries across Nigeria, including Abuja, Port Harcourt, Benin City, Ibadan, Kano, Kaduna, Enugu, Owerri, Onitsha, Warri, Asaba, and Ilorin. For destinations outside Lagos, delivery is arranged via agreed regional transport carriers, collection parks or dedicated local drivers, with delivery terms and any applicable onward fees confirmed during quotation.',
  },
  {
    question: 'How should I label and secure my barrel?',
    answer:
      'Ensure the lid is tightly sealed using a heavy-duty locking ring clamp, tamper-evident security seal or heavy-gauge zip ties. Clearly write the sender’s name, full receiver’s name, destination city in Nigeria and two active Nigerian phone numbers directly on the barrel with permanent marker and attach a weatherproof document pouch containing a detailed packing list.',
  },
  {
    question: 'Can I ship several barrels together?',
    answer:
      'Yes, you can ship multiple barrels, large cartons, and crates together in a single consolidated consignment. Shipping multiple barrels at once is an excellent way for families, churches, community groups and businesses in Illinois to optimize their logistics and streamline clearance in Nigeria.',
  },
];

export function ChicagoFaq() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: chicagoFaqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-gray-50 border-t border-gray-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full mb-3">
            Help &amp; Clarifications
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Practical answers about shipping barrels, boxes and personal effects from Chicago and Illinois to Nigeria.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {chicagoFaqItems.map((item, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              className="bg-white p-5 sm:p-6 rounded-xl shadow-xs border border-gray-200/80"
            >
              <AccordionTrigger className="w-full text-left flex justify-between items-center text-lg sm:text-xl font-semibold text-secondary focus:outline-none hover:no-underline hover:text-primary transition-colors">
                <span>{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="mt-4 text-gray-700 leading-relaxed text-sm sm:text-base border-t border-gray-100 pt-4">
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
