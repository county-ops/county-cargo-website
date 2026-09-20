'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'How long does shipping from the UK to Nigeria take?',
    answer: 'Standard air cargo is normally estimated at 5–10 working days, subject to flight availability, customs clearance and local handling. Eligible UK-to-Lagos express air cargo shipments take approximately 3–5 working days (with Special Express delivered in 48 hours to Lagos). These timeframes are estimates and not unconditional guarantees.',
  },
  {
    question: 'Can County Cargo deliver outside Lagos?',
    answer: 'Yes. Cargo can be arranged for Abuja, Kaduna, Kano and other Nigerian destinations. Outside Lagos, delivery may be coordinated through an agreed transport company, collection point, park or driver rather than direct doorstep delivery. Local delivery arrangements should be confirmed when requesting your quotation.',
  },
  {
    question: 'Why is my package charged by volumetric weight?',
    answer: 'Airlines charge for cargo based on either actual gross weight or volumetric (dimensional) weight, whichever is greater. Because aircraft cargo hold space is limited, large boxes containing lightweight items take up significant space and are billed according to the volume they occupy: (Length × Width × Height in cm) / 5000.',
  },
  {
    question: 'Can I ship a mobile phone or laptop?',
    answer: 'Yes, eligible electronics can be shipped, but they must be declared prior to sending or delivering to the warehouse. Phones, laptops and devices containing lithium batteries require special handling, documentation and may carry distinct shipping tariffs or battery handling fees.',
  },
  {
    question: 'What happens if my package misses the weekly cut-off?',
    answer: 'Packages that arrive at our UK or USA warehouse after the weekly cut-off or remain unpaid when the shipment is manifested will normally be held securely and scheduled for the next available weekly flight departure.',
  },
];

export function Faq() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-gray-50 border-t border-gray-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full mb-3">
            Quick Answers
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Practical answers to common questions about shipping cargo from the UK and USA to Nigeria this week.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              className="bg-white p-5 sm:p-6 rounded-xl shadow-xs border border-gray-200/80"
            >
              <AccordionTrigger className="w-full text-left flex justify-between items-center text-lg sm:text-xl font-semibold text-secondary focus:outline-none hover:no-underline hover:text-primary transition-colors">
                <span>{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="mt-4 text-gray-700 leading-relaxed text-sm sm:text-base border-t border-gray-100 pt-4">
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
