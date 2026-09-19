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
    question: 'How does County Cargo door-to-door delivery work in Nigeria?',
    answer:
      'Once your air or sea shipment clears customs at Lagos airport or port, it is transferred to our central dispatch hub in Ladipo-Oshodi, Lagos. Our local delivery network dispatches the parcel directly to your address in Lagos, Abuja, Port Harcourt, Ibadan, Kano, or any of the 36 states.',
  },
  {
    question: 'Do I need to pay extra fees at my doorstep when the driver arrives?',
    answer:
      'No. County Cargo door-to-door shipping quotes include final-mile doorstep delivery. You will not be asked to pay unexpected cash fees upon arrival.',
  },
  {
    question: 'Can I track my door-to-door delivery within Nigeria?',
    answer:
      'Yes. Real-time online tracking is provided from the moment your cargo is received in the UK/US until final driver handover at your door in Nigeria.',
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
          <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions: Door-to-Door Delivery</h2>
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
