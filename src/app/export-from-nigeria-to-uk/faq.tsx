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
    question: 'What is the minimum weight for shipping from Nigeria to the UK?',
    answer:
      'County Cargo’s standard Nigeria to UK service has a minimum weight of 10kg. Express shipping has no minimum weight. Please confirm current rates and availability before booking.',
  },
  {
    question: 'How much does it cost to send cargo from Nigeria to the UK?',
    answer:
      'The cost depends on the weight, dimensions, contents and selected service. Some lightweight but bulky packages may be charged according to volumetric weight. Contact County Cargo with the package details for an accurate quotation.',
  },
  {
    question: 'Can I send Nigerian food products to the UK?',
    answer:
      'Some properly packaged and approved food products may be accepted, while others are restricted or prohibited. Send a complete list of the products to County Cargo before booking.',
  },
  {
    question: 'Can County Cargo ship commercial goods to the UK?',
    answer:
      'Yes, eligible commercial goods can be shipped. The exporter and UK importer must provide the necessary customs and commercial documentation.',
  },
  {
    question: 'Will my package be inspected?',
    answer:
      'Packages may be inspected for safety, customs compliance or when there is visible damage or concern about the declared contents.',
  },
  {
    question: 'Can I send a small package below 10kg?',
    answer:
      'The standard service has a 10kg minimum. Smaller eligible packages may be sent using the express service.',
  },
];

export function Faq() {
  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions</h2>
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
