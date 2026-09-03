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
    question: 'How much is air freight per kg from the UK to Nigeria?',
    answer:
      'Standard air freight from the UK to Nigeria starts at £6.00 per kilogram (minimum 1kg) with a nominal £15 handling charge per shipment. Express air services are also available for urgent parcels.',
  },
  {
    question: 'Why is volumetric weight charged instead of actual weight?',
    answer:
      'Airlines charge based on space occupied as well as physical weight. If a lightweight parcel is bulky (such as a large box filled with pillows or hollow plastic), it is billed by volumetric weight: (Length x Width x Height in cm) / 5000.',
  },
  {
    question: 'Are there hidden customs fees when my cargo arrives in Nigeria?',
    answer:
      'No. County Cargo provides transparent door-to-door pricing that includes standard customs clearing for routine consolidated cargo. For commercial imports carrying specific HS code tariffs, duty assessments are clearly detailed prior to dispatch.',
  },
];

export function Faq() {
  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions: Shipping Costs</h2>
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
