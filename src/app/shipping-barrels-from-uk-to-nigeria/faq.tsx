'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const ukBarrelFaqItems = [
  {
    question: 'How do I ship a barrel from the UK to Nigeria?',
    answer:
      'To ship a barrel from the UK to Nigeria, contact County Cargo with the dimensions, estimated weight, contents and your Nigerian destination. Our team will provide an up-to-date quotation, packing advice, and either schedule a doorstep collection across Greater London and nationwide UK or provide instructions to drop off/deliver at our UK warehouse. Once checked and documented, your barrel is dispatched via air or ocean sea cargo.',
  },
  {
    question: 'Can County Cargo collect my barrel from my home in the UK?',
    answer:
      'Yes! County Cargo provides doorstep collection services across Greater London (including Wembley, Peckham, Woolwich, Barking, Croydon, Lewisham, and Tottenham) as well as coordinated collections across Birmingham, Manchester, Liverpool, Leeds, and nationwide UK through our courier and logistics network.',
  },
  {
    question: 'How much does it cost to ship a barrel from the UK to Nigeria?',
    answer:
      'The cost depends on whether you select ocean sea freight or standard air cargo, the volume (e.g. 55-gallon standard plastic/fiber drum or 75-gallon jumbo drum), total gross weight, and the destination state in Nigeria (Lagos, Abuja, Port Harcourt, Kano, etc.). Contact County Cargo directly to get a transparent, itemized quotation with zero hidden fees.',
  },
  {
    question: 'Is air or sea cargo better for a barrel?',
    answer:
      'Sea freight is the most economical and popular option for shipping heavy, bulky barrels, personal household effects, non-perishable foods and large consignments. Air cargo is much faster and recommended for smaller cartons, urgent goods, or time-sensitive commercial items.',
  },
  {
    question: 'What items cannot be placed inside a barrel?',
    answer:
      'Prohibited items include firearms, ammunition, dangerous chemicals, combustible liquids, unsealed leaking liquids, counterfeit goods, cash, perishables, and items barred under the Nigeria Customs Service import prohibition list. Loose lithium-ion battery packs and power banks must be declared in advance.',
  },
  {
    question: 'Can my barrel be delivered outside Lagos?',
    answer:
      'Yes. County Cargo arranges deliveries to Abuja, Port Harcourt, Benin City, Ibadan, Kano, Kaduna, Enugu, Owerri, Onitsha, Warri, Asaba, Ilorin, and all 36 states across Nigeria. Onward delivery arrangements, transit schedules, and any regional handling charges will be clearly confirmed during your quote.',
  },
  {
    question: 'How should I label and secure my barrel?',
    answer:
      'Ensure the lid is tightly secured with a heavy-duty locking ring, security tamper seal, or heavy zip ties. Write the sender’s full name, receiver’s legal name, complete delivery address in Nigeria, and two active Nigerian phone numbers directly on the drum using permanent waterproof marker. Also affix a waterproof document sleeve containing your itemized packing list.',
  },
  {
    question: 'Can I ship several barrels together?',
    answer:
      'Yes, you can ship multiple barrels, cartons, and crates together as a consolidated consignment. Shipping multiple barrels at once is an excellent cost-saving solution for families, student groups, religious organizations, and commercial traders in the UK.',
  },
];

export function UkBarrelFaq() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ukBarrelFaqItems.map((item) => ({
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
            Help &amp; Guidance
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Practical answers about shipping barrels, boxes and personal belongings from the UK to Nigeria.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {ukBarrelFaqItems.map((item, index) => (
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
