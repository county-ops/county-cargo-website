import { JsonLd } from '@/components/json-ld';
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
    question: 'How much does air cargo from London to Kano cost per kg?',
    answer:
      'Standard air cargo from London to Kano starts at £6.00 per kg (minimum 1kg) plus a £15 handling charge per shipment. Onward freight transfer fees apply for final Kano depot collection.',
  },
  {
    question: 'How long does cargo take to arrive in Kano from London?',
    answer:
      'Express Air Courier takes 3 to 5 working days, while Standard Air Cargo takes 6 to 10 working days including flight transit, customs clearance, and onward bonded transfer to Kano.',
  },
  {
    question: 'How does cargo reach Kano from London?',
    answer:
      'Cargo flies into Nigeria via airport gateways in Lagos or Abuja, undergoes customs clearance, and is immediately dispatched via secure bonded logistics trucks or feeder flights to our Kano commercial depot.',
  },
  {
    question: 'Where do I collect my cargo in Kano?',
    answer:
      'Consignments can be collected at our designated Kano commercial depot located in the Sabon Gari commercial district.',
  },
  {
    question: 'Can County Cargo collect my package from my house in London?',
    answer:
      'Yes! We collect doorstep packages across London including Barking, Woolwich, Peckham, Lewisham, Croydon, Wembley, Tottenham, and Enfield.',
  },
  {
    question: 'How is volumetric weight calculated for London to Kano shipments?',
    answer:
      'Volumetric weight is computed using the standard formula (Length x Width x Height in cm) / 5000. Billed weight is whichever is greater between actual scale weight and volumetric weight.',
  },
  {
    question: 'Can I send commercial merchandise and personal items to Kano?',
    answer:
      'Yes! Textile materials, clothing, personal effects, electronics, books, and non-perishable dry foodstuffs are permitted.',
  },
  {
    question: 'How do I request an accurate London-to-Kano cargo quotation?',
    answer:
      'Click "Request Quotation" on our website or contact our UK operations team via phone or WhatsApp (07405 556668) with your parcel weight and dimensions.',
  },
];

export function Faq() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions: London to Kano</h2>
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
    </>
  );
}
