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
    question: 'What documents are required to import commercial goods into Nigeria?',
    answer:
      'Commercial import clearance requires a Commercial Invoice, Packing List, Certificate of Origin, Bill of Lading or Airway Bill, Form M (for shipments over $10,000 USD), and PAAR (Pre-Arrival Assessment Report) issued by Nigeria Customs. SONCAP certification is required for regulated industrial and consumer products.',
  },
  {
    question: 'Can County Cargo consolidate commercial cargo from multiple UK suppliers?',
    answer:
      'Yes. County Cargo provides supplier consolidation services at our UK receiving warehouse in Liverpool and London. You can ship goods from multiple UK wholesalers to your free County Cargo account, and we will combine them into a single consolidated air or sea shipment to lower your freight costs.',
  },
  {
    question: 'How are commercial customs duties paid?',
    answer:
      'Customs duties are calculated on the CIF (Cost, Insurance, Freight) value according to the Harmonized System (HS) code. County Cargo can calculate and handle duty payments on your behalf through our integrated door-to-door clearing service.',
  },
];

export function Faq() {
  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions: Commercial Cargo</h2>
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
