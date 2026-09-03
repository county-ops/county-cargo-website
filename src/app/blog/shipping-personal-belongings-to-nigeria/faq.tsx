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
    question: 'How much does it cost to ship personal belongings from the UK to Nigeria?',
    answer:
      'Standard air cargo for personal belongings starts at £6.00 per kg (minimum 1kg) with a nominal £15 handling charge. For large relocations or heavy household effects above 100kg, ocean freight options or volume rates provide substantial savings.',
  },
  {
    question: 'Can I send food items with my personal belongings?',
    answer:
      'You can include non-perishable packaged dry food (such as cereals, tinned goods, spices, chocolates) within personal cargo. However, fresh meats, dairy products, or perishable items are strictly prohibited by airline and customs rules.',
  },
  {
    question: 'Do I need to list every single item on the packing list?',
    answer:
      'Yes. A clear packing list summarizing your personal effects (e.g. "5x Men Shirts, 3x Pair of Shoes, 2x Used Laptops") is required for Nigeria Customs verification and smooth terminal release.',
  },
];

export function Faq() {
  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions: Personal Effects</h2>
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
