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
    question: 'How long does Nigeria Customs clearance take at Lagos airport or port?',
    answer:
      'For air cargo arriving at Murtala Muhammed International Airport (LOS), customs clearance typically takes 24 to 48 hours when all documentation (airway bill, packing list, commercial invoice) is complete. For ocean cargo at Apapa or Tin Can Island port, clearance usually takes 3 to 7 working days depending on terminal processing, inspection channel, and duty settlement.',
  },
  {
    question: 'What is Form M and do I need it for personal cargo to Nigeria?',
    answer:
      'Form M is a mandatory import document issued by the Central Bank of Nigeria (CBN) for commercial import shipments valued above $10,000 USD (or equivalent). For small personal packages, door-to-door air freight, and personal belongings shipped via County Cargo, individual Form M filing is handled directly under our consolidated cargo clearing manifests.',
  },
  {
    question: 'How are Nigeria Customs import duties calculated?',
    answer:
      'Import duties in Nigeria are calculated based on the CIF value (Cost, Insurance, and Freight) of the goods using the Harmonized System (HS) code tariff schedule. Standard duty rates range between 5% and 35%, plus applicable taxes such as Value Added Tax (VAT - 7.5%), Import Adjustment Tax (IAT), and ECOWAS Trade Liberalization Scheme levies where applicable.',
  },
  {
    question: 'Why does Nigeria Customs hold or inspect shipping containers?',
    answer:
      'Customs holds occur if cargo contents do not match declared packing lists, if prohibited goods (such as restricted pharmaceuticals or used clothing) are detected, or if random physical examination (Red Channel inspection) is triggered by the Pre-Arrival Assessment Report (PAAR) system.',
  },
  {
    question: 'Can County Cargo handle door-to-door customs clearing in Nigeria?',
    answer:
      'Yes. County Cargo provides full-service customs clearing in Nigeria. Our experienced clearing agents manage manifest submission, customs assessment, terminal clearance, and final dispatch directly to your doorstep in Lagos, Abuja, Port Harcourt, Kano, and across Nigeria.',
  },
];

export function Faq() {
  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions: Nigeria Customs Clearance</h2>
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
