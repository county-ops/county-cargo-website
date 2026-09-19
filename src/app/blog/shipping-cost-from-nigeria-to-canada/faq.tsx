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
    question: 'How much does air cargo from Nigeria to Canada cost per kg?',
    answer:
      'Air cargo rates from Nigeria to Canada depend on cargo type, total chargeable weight, and service speed. Standard air cargo to major hubs like Toronto (YYZ) and Calgary (YYC) is billed per kilogram, plus local handling and documentation. Request a live quote from County Cargo for current tariffs.',
  },
  {
    question: 'Are there extra customs taxes when shipping parcels to Canada?',
    answer:
      'Canada imposes Goods and Services Tax (GST - 5%) or Harmonized Sales Tax (HST - up to 15% depending on the destination province such as Ontario or Alberta) on imported goods valued over CAD $20. Duty varies based on the product category.',
  },
  {
    question: 'How is chargeable weight calculated for Canada export cargo?',
    answer:
      'Chargeable weight is calculated by comparing actual scale weight against volumetric weight (Length x Width x Height in cm / 5000). Whichever is higher becomes the billed freight weight.',
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
          <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions: Shipping to Canada Costs</h2>
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
