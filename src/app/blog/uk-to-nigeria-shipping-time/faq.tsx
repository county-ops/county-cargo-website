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
    question: 'How many days does standard air shipping take from UK to Nigeria?',
    answer:
      'Standard air freight from County Cargo UK receiving depots in London or Liverpool to Lagos takes 5 to 10 working days, including customs inspection and door delivery.',
  },
  {
    question: 'Is express air shipping faster?',
    answer:
      'Yes. County Cargo Express Air Courier (powered by DHL Express integration) delivers urgent parcels and documents from the UK to Lagos or Abuja within 3 to 5 working days.',
  },
  {
    question: 'How long does sea cargo take from UK to Lagos port?',
    answer:
      'Sea freight shipping from UK ports to Apapa or Tin Can Island port in Lagos takes approximately 4 to 8 weeks, covering ocean transit, vessel discharge, and customs clearance.',
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
          <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions: Shipping Timelines</h2>
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
