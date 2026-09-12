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
    question: 'How much does shipping from London to Lagos cost per kg?',
    answer:
      'Standard air cargo from London to Lagos starts at £6.00 per kg (minimum 1kg) with a £15 handling charge per shipment. Express Air Courier options deliver faster with calculated tariffs.',
  },
  {
    question: 'How long does cargo take from London to Lagos?',
    answer:
      'Express Air Courier takes 3 to 5 working days, while Standard Air Cargo takes 5 to 10 working days from London collection to Lagos arrival and customs clearance.',
  },
  {
    question: 'Can County Cargo collect my shipment from my home in London?',
    answer:
      'Yes! We collect doorstep parcels across Greater London including Peckham, Woolwich, Lewisham, Croydon, Wembley, Barking, Dagenham, Tottenham, and Enfield.',
  },
  {
    question: 'Where do I pick up my cargo in Lagos?',
    answer:
      'Consignments can be collected at our central Lagos dispatch hub at Ladipo-Oshodi or delivered directly to your doorstep across Ikeja, Victoria Island, Lekki, Yaba, and all Lagos LGA areas.',
  },
  {
    question: 'How is volumetric weight calculated for London to Lagos air cargo?',
    answer:
      'Volumetric weight is calculated using the standard formula (Length x Width x Height in cm) / 5000. Billed weight is whichever is greater between actual scale weight and volumetric weight.',
  },
  {
    question: 'Can I send food and personal belongings from London to Lagos?',
    answer:
      'Yes! Non-perishable food, clothes, shoes, electronics, books, and household gifts can be shipped. Fresh uninspected meat/dairy and flammable liquids are prohibited.',
  },
  {
    question: 'Is express air shipping available from London to Lagos?',
    answer:
      'Yes, Express Air Courier service (via DHL network) is available for urgent parcels and documents with 3 to 5 working days delivery.',
  },
  {
    question: 'How do I request an accurate London-to-Lagos cargo quotation?',
    answer:
      'Click "Request Quotation" on our website or contact our UK operations team via phone or WhatsApp (07405 556668) with your item descriptions and weight.',
  },
];

export function Faq() {
  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions: London to Lagos</h2>
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
