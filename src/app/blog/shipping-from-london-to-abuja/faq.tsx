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
    question: 'How much does shipping from London to Abuja cost per kg?',
    answer:
      'Standard air cargo from London to Abuja starts at £6.00 per kg (minimum 1kg) plus a £15 handling charge per shipment. Express Courier options are available with calculated tariffs.',
  },
  {
    question: 'How long does cargo take to arrive in Abuja from London?',
    answer:
      'Express Air Courier takes 3 to 5 working days, while Standard Air Cargo arrives in 5 to 8 working days including airport transit and customs clearance.',
  },
  {
    question: 'How does cargo reach Abuja from London?',
    answer:
      'Cargo flies into Nigeria via direct air routes. Depending on flight schedules, shipments arrive at Nnamdi Azikiwe International Airport (ABV) or clear at Lagos airport gateway before onward dispatch to our central Abuja depot.',
  },
  {
    question: 'Where do I collect my cargo in Abuja?',
    answer:
      'Consignments can be collected at our central Abuja depot (servicing Garki, Wuse, Utako, and Maitama) or delivered to your doorstep across the Federal Capital Territory (FCT).',
  },
  {
    question: 'Can County Cargo collect my shipment anywhere in London?',
    answer:
      'Yes, we provide doorstep pickup across Greater London including Woolwich, Peckham, Lewisham, Croydon, Wembley, Barking, Dagenham, Tottenham, and Enfield.',
  },
  {
    question: 'How is volumetric weight calculated for London to Abuja air cargo?',
    answer:
      'Volumetric weight is computed using the formula (Length x Width x Height in cm) / 5000. Billed weight is whichever is higher between actual scale weight and volumetric weight.',
  },
  {
    question: 'Can I send food and personal luggage from London to Abuja?',
    answer:
      'Yes! Non-perishable dry foodstuffs, personal clothes, shoes, electronics, and books are permitted. Fresh uninspected meat/dairy and flammable liquids are prohibited.',
  },
  {
    question: 'How do I request an accurate London-to-Abuja cargo quotation?',
    answer:
      'Click "Request Quotation" on our website or contact our UK team via phone or WhatsApp (+44 7438 827464) with your parcel weight and dimensions.',
  },
];

export function Faq() {
  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions: London to Abuja</h2>
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
