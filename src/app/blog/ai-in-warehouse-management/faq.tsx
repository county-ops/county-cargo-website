'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
    {
        question: 'How is AI used in warehouse management?',
        answer: 'AI is used for inventory forecasting, predictive maintenance of automation hardware, layout optimization, smart sorting/slotting algorithms, automated guided vehicles (AGVs), and robot-assisted pick-and-pack operations.'
    },
    {
        question: 'Does AI warehouse management improve inventory accuracy?',
        answer: 'Yes! Automated sensor tracking, RFID sweeps, and AI-enabled computer vision systems scan goods in real-time, eliminating human data entry errors and keeping inventory records up to 99.9% accurate.'
    },
    {
        question: 'What are the benefits of predictive replenishment?',
        answer: 'Predictive replenishment analyzes historical sales velocity and trends to automatically schedule stock reorders before items go out of stock, minimizing stockouts and avoiding over-stocking fees.'
    },
    {
        question: 'Are AI systems suitable for small or medium-sized warehouses?',
        answer: 'Absolutely. Many modern software-as-a-service (SaaS) warehouse management systems (WMS) now integrate lightweight, plug-and-play AI algorithms for demand forecasting and routing, making the tech highly accessible to growing businesses.'
    },
    {
        question: 'How does County Cargo leverage automated warehousing?',
        answer: 'County Cargo uses digital scanning, smart load consolidation algorithms, and computerized transit tracking at our Lagos, London, and Houston warehouses to process shipments quickly and securely.'
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
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Learn how artificial intelligence and advanced automation are optimizing warehouse spaces.</p>
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
