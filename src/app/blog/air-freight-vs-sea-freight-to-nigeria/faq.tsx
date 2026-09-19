import { JsonLd } from '@/components/json-ld';
import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'When should I choose Air Freight over Sea Freight for Nigeria?',
    answer:
      'Choose air freight when speed is your primary requirement (delivery in 3–10 days), for shipments under 100kg, or for high-value items such as electronics, smartphones, documents, and urgent personal effects.',
  },
  {
    question: 'What is the cost difference between Air and Sea Freight to Nigeria?',
    answer:
      'Air freight charges are based per kg (starting around £6.00/kg from the UK), making it economical for lighter parcels. Sea freight charges are based on volume (cubic meters / CBM or full 20ft/40ft containers), making it significantly cheaper per unit for shipments weighing over 200kg or measuring over 1 CBM.',
  },
  {
    question: 'How long does sea freight take from the UK/US to Lagos port?',
    answer:
      'Sea freight from UK ports (Tilbury, Liverpool, Felixstowe) or US ports (Houston, New York) to Lagos (Apapa/Tin Can) takes approximately 4 to 8 weeks, including ocean transit and port customs clearing.',
  },
];

export function Faq() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions: Air vs Sea Freight</h2>
        </div>
        <Accordion type="single" collapsible className="w-full bg-white rounded-xl border border-gray-200 p-4 shadow-2xs">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold text-secondary hover:text-primary text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
    </>
  );
}
