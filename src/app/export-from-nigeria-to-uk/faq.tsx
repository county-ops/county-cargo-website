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
    question: 'How long does air freight take to export from Nigeria to the UK?',
    answer:
      'Air freight from Nigeria to the UK typically takes 3 to 5 business days with our Express Courier service, or 5 to 7 business days with our Standard Air Cargo service. This includes customs processing and scheduled departure from Lagos (LOS) or Abuja (ABV) to London Heathrow or our Liverpool distribution hub.',
  },
  {
    question: 'What is the minimum weight for shipping cargo from Nigeria to the UK?',
    answer:
      'Our Standard Nigeria to UK air cargo service has a minimum weight of 10kg. If you have a smaller urgent parcel or documents below 10kg, you can send it using our Express Courier service, which has a 1 kg minimum chargeable weight.',
  },
  {
    question: 'How much does it cost to send cargo from Nigeria to the UK?',
    answer:
      'Rates depend on gross weight, volumetric dimensions (Length x Width x Height in cm / 5000), commodity type, and service level (Standard vs Express). Rates for standard cargo start from competitive per-kilogram pricing. Contact our team on WhatsApp or request a quote for real-time rates.',
  },
  {
    question: 'Can I export Nigerian foodstuffs (egusi, garri, dried fish) to the UK?',
    answer:
      'Yes, properly packaged, dried, and vacuum-sealed food items such as garri, egusi, ogbono, yam flour, dried fish, crayfish, dried snails, and local spices are accepted in full compliance with UK Port Health and DEFRA guidelines. Fresh perishable meat, poultry, and uncertified beans are strictly prohibited.',
  },
  {
    question: 'Can County Cargo ship commercial merchandise and assist with NEPC / Form NXP?',
    answer:
      'Yes. For registered exporters sending commercial merchandise (such as African fashion, agro-commodities, cosmetics, or retail stock), we support NEPC export documentation, Form NXP electronic filings, commercial invoices, and UK customs declaration assistance.',
  },
  {
    question: 'Will the receiver pay customs charges, duty, or VAT in the UK?',
    answer:
      'Shipments entering the UK are subject to UK HM Revenue and Customs (HMRC) regulations. Personal gifts below statutory thresholds may enter duty-free. Commercial goods and items above duty relief thresholds will be assessed for UK Import VAT (usually 20%) and applicable customs duties under the UK Global Tariff or Developing Countries Trading Scheme (DCTS).',
  },
  {
    question: 'Where can I drop off cargo in Nigeria, and where does it deliver in the UK?',
    answer:
      'In Nigeria, we operate main reception centers in Lagos (Ikeja) and Abuja, along with nationwide doorstep collection across major cities. In the UK, we offer direct depot collection at our Liverpool warehouse (L1 0BG) as well as nationwide door-to-door courier delivery to London, Manchester, Birmingham, Leeds, Glasgow, and all UK postcodes.',
  },
  {
    question: 'How should I package my shipment before drop-off in Nigeria?',
    answer:
      'Use heavy-duty double-walled cardboard boxes or plastic shipping crates. Ensure liquids and food items are vacuum-sealed to prevent leakage and odor. Bubble wrap fragile items and tape all box seams with industrial PVC packing tape. County Cargo also provides professional packing and vacuum-sealing services at our Lagos hub.',
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
            <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions: Nigeria to UK Export</h2>
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
