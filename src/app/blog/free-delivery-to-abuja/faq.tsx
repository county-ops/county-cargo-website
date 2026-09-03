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
    question: 'Is shipping from the UK to Abuja completely free?',
    answer:
      'No. The offer covers eligible local delivery in Abuja after the cargo arrives. International freight, handling, and any applicable customs charges are still payable.',
  },
  {
    question: 'What is the minimum weight for free delivery to Abuja?',
    answer:
      'A shipment must weigh at least 10 kg to qualify for the free-delivery offer.',
  },
  {
    question: 'Can I combine several items to reach 10 kg?',
    answer:
      'Eligible items may be consolidated into one shipment where permitted. Contact County Cargo to confirm the consolidation arrangements.',
  },
  {
    question: 'Can County Cargo collect my package in London?',
    answer:
      'Collection may be available depending on the location and shipment arrangements. Confirm availability and any collection charge before booking.',
  },
  {
    question: 'Can I send food from the UK to Abuja?',
    answer:
      'Some properly packaged food products may be accepted, while others may be restricted. Send County Cargo a complete list before bringing the shipment.',
  },
  {
    question: 'Can I send phones or other electronics?',
    answer:
      'Approved electronics may be accepted, but they must be declared before shipment. Special charges, documentation, or packaging requirements may apply.',
  },
  {
    question: 'How long does cargo from the UK to Abuja take?',
    answer:
      'Transit times depend on the selected service, shipment schedule, customs clearance, and operational conditions. Request the current estimated timeframe when booking.',
  },
  {
    question: 'Will County Cargo deliver anywhere in Abuja?',
    answer:
      'Delivery is subject to confirmation of the recipient’s address and County Cargo’s approved delivery coverage. Provide the complete address before shipping.',
  },
];

export function Faq() {
  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions</h2>
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
