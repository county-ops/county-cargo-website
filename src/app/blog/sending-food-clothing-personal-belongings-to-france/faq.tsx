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
    question: 'Can I send traditional Nigerian fashion and lace fabrics to France?',
    answer:
      'Yes! Tailored garments, Aso-Ebi, lace fabrics, and traditional fashion attire are widely shipped from Lagos to Paris, Lyon, and Marseille with no agricultural restrictions.',
  },
  {
    question: 'What African food products are allowed into France?',
    answer:
      'Fully dried, commercially packaged plant products (garri, egusi, ogbono, pounded yam flour, spices) are permitted. Meat and fresh dairy are strictly banned under EU biosecurity laws.',
  },
];

export function Faq() {
  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions: Food &amp; Fashion to France</h2>
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
  );
}
