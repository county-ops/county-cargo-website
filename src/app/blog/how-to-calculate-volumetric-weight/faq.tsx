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
    question: 'What is the volumetric weight formula for air cargo?',
    answer:
      'The international IATA formula for air freight volumetric weight in centimeters is: Volumetric Weight (kg) = (Length x Width x Height in cm) / 5000.',
  },
  {
    question: 'Why did my shipment cost more than its actual scale weight?',
    answer:
      'Airlines bill shipments according to "chargeable weight", which is whichever is higher between actual scale weight and volumetric dimensional weight. If a lightweight item occupies a large physical space in the cargo hold, volumetric weight applies.',
  },
  {
    question: 'How can I reduce volumetric weight when packing boxes for Nigeria?',
    answer:
      'To reduce volumetric weight, use compact boxes that closely fit your contents, remove unnecessary void space, collapse air cushions, and avoid shipping empty air.',
  },
];

export function Faq() {
  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions: Volumetric Weight</h2>
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
