'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'Can County Cargo ship from Nigeria to other countries?',
    answer:
      'Yes. County Cargo provides international export and freight forwarding services from Nigeria to more than 200 countries worldwide, including the UK, USA, Canada, Australia, Germany, across Europe, Africa, Asia, and the Middle East.',
  },
  {
    question: 'Does County Cargo offer door-to-door shipping from Nigeria?',
    answer:
      'Yes. County Cargo offers comprehensive door-to-door delivery services where your shipment can be picked up or accepted in Nigeria, processed for international flight or ocean dispatch, customs-cleared, and delivered directly to the recipient’s address abroad, subject to service availability and destination regulations.',
  },
  {
    question: 'Does County Cargo offer express shipping from Nigeria?',
    answer:
      'Yes. County Cargo offers a dedicated DHL Express 3–5 day delivery service for urgent documents, parcels, commercial samples, and priority packages, subject to destination customs processing.',
  },
  {
    question: 'Can I ship from Nigeria to the UK?',
    answer:
      'Yes. County Cargo provides regular air and sea freight solutions from Nigeria to the United Kingdom, including London, Manchester, Birmingham, Liverpool, Leeds, Sheffield, Glasgow, and destinations throughout England, Scotland, Wales, and Northern Ireland.',
  },
  {
    question: 'Can I ship from Nigeria to the USA?',
    answer:
      'Yes. County Cargo provides international shipping from Nigeria to the United States with full coverage across all 50 states, including major hubs such as New York, Houston, Atlanta, Dallas, Chicago, Washington D.C., and Los Angeles.',
  },
  {
    question: 'Can I ship from Nigeria to Canada?',
    answer:
      'Yes. We provide international cargo services to Toronto, Ottawa, Montreal, Vancouver, Calgary, Edmonton, Winnipeg, and across Canadian provinces, subject to Canadian CBSA import regulations.',
  },
  {
    question: 'Can I ship Nigerian food internationally?',
    answer:
      'Many permitted commercially packaged and dried Nigerian food products (such as egusi, garri, ogbono, plantain flour, yam flour, dried spices, stockfish, and dried seafood) can be shipped internationally. However, import restrictions vary by destination (e.g., US FDA, UK DEFRA, Australia Biosecurity). Perishable meats, dairy, and unprocessed seeds are strictly regulated or prohibited. Always confirm your specific food items before dispatch.',
  },
  {
    question: 'Does County Cargo collect cargo anywhere in Nigeria?',
    answer:
      'Yes. County Cargo provides collection and door-to-door services across all 36 Nigerian states and the Federal Capital Territory (Abuja), including Lagos, Port Harcourt, Ibadan, Kano, Benin City, Enugu, Kaduna, Jos, and beyond.',
  },
  {
    question: 'How long does international shipping from Nigeria take?',
    answer:
      'Transit times vary depending on the destination, selected shipping mode, and customs clearance. DHL Express takes 3–5 working days, standard consolidated air cargo typically takes 7–14 working days, while sea freight is designed for larger consignments where transit time is less critical.',
  },
  {
    question: 'How can I get a shipping price from Nigeria?',
    answer:
      'Provide your pickup location in Nigeria, destination country and city/postal code, cargo description, estimated weight, and package dimensions to receive an instant, accurate quotation.',
  },
];

export function Faq() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-gray-50/70 border-t border-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="inline-block px-3 py-1 bg-blue-50 text-primary text-xs font-bold tracking-wider uppercase rounded-full mb-3">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about international door-to-door shipping, express courier, foodstuff, and export procedures from Nigeria.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              className="bg-white border border-gray-200/80 p-5 sm:p-6 rounded-xl shadow-xs transition-all hover:border-primary/40"
              data-aos="fade-up"
              data-aos-delay={`${index * 40}`}
            >
              <AccordionTrigger className="w-full text-left flex justify-between items-center text-lg sm:text-xl font-semibold text-secondary focus:outline-none hover:no-underline gap-4">
                <span>{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="mt-3 sm:mt-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
