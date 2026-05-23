'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
    {
        question: 'What is sustainable logistics?',
        answer: 'Sustainable logistics refers to operations and processes aimed at reducing the environmental impact of shipping and supply chain activities. This includes lowering carbon emissions, minimizing waste, using eco-friendly packaging, and optimizing transport routes.'
    },
    {
        question: 'How does consolidated shipping help the environment?',
        answer: 'Consolidated shipping groups multiple small shipments into a single larger load (such as a full container or truckload). This reduces the total number of trips required, maximizes vehicle utilization, and significantly cuts down on greenhouse gas emissions per parcel.'
    },
    {
        question: 'What green logistics practices does County Cargo implement?',
        answer: 'County Cargo prioritizes consolidated cargo shipping, uses digital tracking to eliminate paper waste, actively advises clients on eco-friendly packaging, and coordinates efficient delivery routing to minimize fuel consumption.'
    },
    {
        question: 'Can businesses save money by choosing sustainable logistics?',
        answer: 'Yes! Sustainable practices like consolidation, reduced packaging weight, and route optimization not only lower carbon footprints but also decrease shipping and packaging costs for businesses.'
    },
    {
        question: 'How can I make my shipments more eco-friendly?',
        answer: 'You can make your shipments greener by using recycled or biodegradable packaging, compacting box sizes to avoid carrying empty space (which reduces volumetric weight and shipping energy), and choosing consolidated shipping services.'
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
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find answers to common questions about sustainable supply chain and logistics practices.</p>
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
