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
    question: 'Where is County Cargo’s receiving warehouse located in Texas?',
    answer:
      'County Cargo’s US receiving facility is located at 1234 N Belt Line Rd, Irving, TX 75061 (Dallas-Fort Worth / Houston metro logistics hub). Shippers can send online purchases or drop off cargo directly at our warehouse.',
  },
  {
    question: 'How long does air shipping take from Texas/USA to Nigeria?',
    answer:
      'Air cargo from our Texas receiving hub to Lagos (Murtala Muhammed International Airport) takes 7 to 12 working days, including consolidation, flight transit, and customs clearing.',
  },
  {
    question: 'Can I shop online from Amazon, Walmart, or eBay US and ship to Nigeria?',
    answer:
      'Yes. When you register with County Cargo, you get your personalized US shipping address in Texas. You can shop from any US retailer and enter your County Cargo Texas address at checkout.',
  },
];

export function Faq() {
  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions: USA &amp; Texas Cargo</h2>
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
