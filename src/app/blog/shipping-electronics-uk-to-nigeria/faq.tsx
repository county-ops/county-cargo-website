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
    question: 'Can I ship laptops and iPhones with lithium batteries to Nigeria by air?',
    answer:
      'Yes, you can ship laptops, iPhones, tablets, and smartwatches containing lithium-ion batteries by air freight with County Cargo. However, batteries must be installed inside the device (contained in equipment) or packaged according to IATA Dangerous Goods Section II PI966/PI967 guidelines. Standalone loose power banks or spare lithium batteries cannot be sent via standard air cargo due to airline safety regulations.',
  },
  {
    question: 'How do I protect television screens and fragile monitors when shipping to Nigeria?',
    answer:
      'Flat-screen TVs and monitors must be packed in their original manufacturer packaging with corner foam brackets, or enclosed in a custom wooden crate with bubble wrap cushioning. Never ship unboxed TVs. County Cargo provides crating and reinforced packaging services at our UK receiving depots.',
  },
  {
    question: 'Are used laptops or refurbished electronics allowed into Nigeria?',
    answer:
      'Yes, used and refurbished laptops, phones, and computers are permitted for import into Nigeria for personal or commercial use, provided they are clean, functional, and not classified as electronic waste (e-waste) under NESREA (National Environmental Standards and Regulations Enforcement Agency) guidelines.',
  },
  {
    question: 'How are customs duties charged on electronics shipped from the UK?',
    answer:
      'Customs duties on electronics depend on the category and value. Personal laptops and phones sent via County Cargo air freight are typically cleared under consolidated express rates, which include customs clearing. Commercial bulk imports carry standard 5% to 10% duty plus 7.5% VAT.',
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
          <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions: Shipping Electronics to Nigeria</h2>
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
