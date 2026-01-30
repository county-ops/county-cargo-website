
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
    {
        question: 'What is the fastest way to ship from Nigeria?',
        answer: 'Air freight is the fastest shipping option for urgent and time-sensitive shipments from Nigeria, including express cargo, business samples, and high-value goods. It offers regular flight schedules and better tracking visibility.'
    },
    {
        question: 'When should I use sea freight for shipping from Nigeria?',
        answer: 'Sea freight is the best choice for bulk cargo, large commercial exports, palletized goods, and machinery where cost-effectiveness is more important than speed. It is ideal for non-urgent, high-volume shipments.'
    },
    {
        question: 'What is consolidated cargo shipping and why is it popular?',
        answer: 'Consolidated cargo combines multiple customers’ goods into a single shared shipment going to the same destination. It’s popular because it significantly lowers shipping costs, eliminates the need for a full container, and offers predictable weekly departures, making it ideal for small businesses and personal shipments.'
    },
    {
        question: 'What documents are required for exporting from Nigeria?',
        answer: 'Commonly required documents include a commercial invoice, a detailed packing list, sender and receiver contact information, an accurate product description, and a value declaration. County Cargo provides guidance on all necessary paperwork to prevent customs delays.'
    },
    {
        question: 'What are the main factors affecting shipping costs from Nigeria?',
        answer: 'Shipping costs are primarily determined by the chargeable weight (the greater of actual vs. volumetric weight), carton size, destination country, freight method (air vs. sea), customs category, and any additional handling or insurance fees.'
    }
];

export function Faq() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <section id="faq" className="py-20 bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find quick answers to common questions about the transportation market from Nigeria.</p>
                </div>
                 <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqItems.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index} className="bg-white p-6 rounded-lg shadow-md border-b-0">
                            <AccordionTrigger className="w-full text-left flex justify-between items-center text-xl font-semibold text-secondary focus:outline-none hover:no-underline">
                                <span>{item.question}</span>
                            </AccordionTrigger>
                            <AccordionContent className="mt-4 text-gray-800">
                                <p>{item.answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
