'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    key: 'faq-1',
    question: 'How long does shipping from the UK or USA to Nigeria take?',
    answer: 'Air freight shipments typically take 5–10 working days, depending on customs clearance and the destination city (such as Lagos or Abuja). Sea freight shipments are more economical for bulk cargo but have a longer transit time, usually taking 5–6 weeks.'
  },
  {
    key: 'faq-2',
    question: 'Can I ship electronics, phones, and laptops to Nigeria?',
    answer: 'Yes, electronics can be shipped to Nigeria. However, they must be declared accurately on your packing list, and they may be subject to specific customs duties or safety inspections. Battery-powered items also have specific airline safety regulations for air cargo.'
  },
  {
    key: 'faq-3',
    question: 'Why does the Nigeria Customs Service inspect cargo shipments?',
    answer: 'Inspections are conducted to verify that the declared contents match the actual goods in the shipment, ensure compliance with import restrictions, check for prohibited items, and calculate the correct import customs duties based on current official tariff valuations.'
  },
  {
    key: 'faq-4',
    question: 'What happens if my shipping documentation is incomplete or incorrect?',
    answer: 'Incomplete or incorrect documentation is the leading cause of customs delays. It can result in cargo being held at the port or airport, additional storage fees, re-valuation charges, or in severe cases, seizure of the goods by customs officials.'
  },
  {
    key: 'faq-5',
    question: 'How does County Cargo assist with customs clearance in Nigeria?',
    answer: 'County Cargo handles the entire customs clearance process for consolidated air and sea freight. We verify your packing list, prepare the necessary manifest documentation, interface directly with customs officers at the port/airport, and handle the clearance fees as part of our shipping service.'
  }
];

export function Faq() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 border-t border-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-secondary mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Common questions and answers regarding Nigeria’s shipping industry and customs procedures.</p>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={item.key} className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
              <AccordionTrigger className="w-full text-left flex justify-between items-center text-xl font-semibold text-secondary focus:outline-none hover:no-underline">
                <span>{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="mt-4 text-gray-700 leading-relaxed">
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
