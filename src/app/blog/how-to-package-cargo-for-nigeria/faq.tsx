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
    question: 'What type of box is best for international shipping to Nigeria?',
    answer:
      'Always use heavy-duty, double-walled corrugated cardboard boxes. Standard single-wall supermarket boxes are prone to crushing during airline palletizing and ocean container stacking.',
  },
  {
    question: 'Can I use suit cases or plastic barrels for cargo to Nigeria?',
    answer:
      'Yes. Heavy-duty plastic shipping barrels and hard-shell suitcases are permitted for air and sea cargo to Nigeria. Suitcases must be locked and shrink-wrapped for protection.',
  },
  {
    question: 'How should I label my shipping boxes?',
    answer:
      'Label every box clearly on two opposite sides with the Recipient’s Full Name, Phone Number, Destination Address (Lagos, Abuja, etc.), and your County Cargo Tracking / Account Number.',
  },
];

export function Faq() {
  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions: Cargo Packaging</h2>
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
