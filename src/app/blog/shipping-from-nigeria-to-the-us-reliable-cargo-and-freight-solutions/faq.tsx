'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'How much does it cost to ship from Nigeria to the US?',
    answer:
      'The cost depends on the shipment’s weight, dimensions, contents, destination and transportation method. Standard air cargo starts from ₦15,500/kg (10kg minimum chargeable weight). Request a quotation based on your actual cargo details using our shipping calculator or by speaking with our team.',
  },
  {
    question: 'Can I ship food from Nigeria to the US?',
    answer:
      'Some food products may be permitted, but restrictions vary by product under US FDA and USDA regulations. Permitted commercially packaged and dried foods (such as egusi, garri, ogbono, plantain flour, yam flour, and dried spices) can typically be shipped. Perishable meats, dairy, and unprocessed agricultural seeds are restricted. Always confirm the acceptability of a specific food product before sending it.',
  },
  {
    question: 'Can I ship personal belongings from Nigeria to the US?',
    answer:
      'Permitted personal belongings and household goods can be shipped subject to applicable transportation, Nigerian export, and US Customs (CBP) import requirements.',
  },
  {
    question: 'Is air freight faster than sea freight to the US?',
    answer:
      'Generally, yes. Air freight is normally selected when speed is more important (taking 7–14 days for standard consolidated cargo or 3–5 days for express), while sea freight is commonly used for larger consignments and full containers where transit time is less critical.',
  },
  {
    question: 'Do I need export documentation from Nigeria?',
    answer:
      'Formal exports require appropriate documentation. The Nigerian Export Promotion Council (NEPC) provides guidance on exporter registration and export documentation (such as commercial invoices, packing lists, and Form NXP for commercial trade).',
  },
  {
    question: 'Does County Cargo ship to Atlanta, Houston, Dallas, and New York?',
    answer:
      'County Cargo provides international shipping solutions for US destinations nationwide, including Atlanta, Houston, Dallas, New York, Newark, Chicago, Washington D.C., Los Angeles, Philadelphia, and across all 50 states. Confirm destination coverage and delivery options when requesting your quotation.',
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
            Common questions regarding freight rates, food export rules, customs clearance, and delivery from Nigeria to the USA.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              className="bg-white border border-gray-200/80 p-5 sm:p-6 rounded-xl shadow-xs transition-all hover:border-primary/40"
              data-aos="fade-up"
              data-aos-delay={`${index * 60}`}
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
