'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
    {
        question: 'Does the aviation union action in Lagos affect my shipment?',
        answer: 'Flight operations have resumed following the 11 August 2026 disruption. However, if you have a time-sensitive shipment, we recommend building in a small amount of extra time and avoiding arranging important events around an estimated delivery date until your cargo has cleared.'
    },
    {
        question: 'Will United Cargo\'s new Market Disruption Fee affect my shipment from the USA?',
        answer: 'United Cargo introduced a revised Market Disruption Fee for air waybills issued from 15 August 2026. The impact depends on the carrier, routing and service used for your specific shipment. Not every County Cargo shipment from the USA will automatically increase in price. We recommend requesting a current quotation before sending large or heavy consignments.'
    },
    {
        question: 'Why have sea freight prices risen and how does this affect me?',
        answer: 'Drewry\'s World Container Index rose 1% to approximately $4,339 per 40-foot container during the week ending 13 August 2026. Infrastructure bottlenecks in West Africa and other regions are contributing to higher costs and reduced schedule reliability. Sailing and arrival dates should be treated as estimates, and customers should ship early when items are needed for a specific occasion.'
    },
    {
        question: 'Has Nigeria Customs introduced new rules I should know about?',
        answer: 'Nigeria Customs continues to implement the 2026 Fiscal Policy Measures and Tariff Amendments. These include revisions to import duties, adjustment taxes, the import and export prohibition lists, excise duties, Customs classifications and the ECOWAS Common External Tariff. Goods previously cleared under one classification may now require additional checks. We strongly recommend confirming your items before shipping, especially commercial goods, vehicles, food products, cosmetics, medicines and electrical equipment.'
    },
    {
        question: 'How does the exchange rate affect my Customs charges in Nigeria?',
        answer: 'The Central Bank of Nigeria recorded an official rate of approximately ₦1,357.61 to the US dollar on 14 August 2026. Nigerian Customs duties and locally assessed charges are calculated at the exchange rate on the date of assessment, so the final amount may differ from an earlier estimate. Customers importing high-value or commercial goods should request an up-to-date assessment.'
    },
    {
        question: 'What is the best way to avoid delays when shipping to Nigeria?',
        answer: 'Provide accurate item descriptions on your packing list, check that no restricted items are included, use strong packaging, ship early especially for events such as weddings or birthdays, and ensure all sender and recipient details are correct and clearly attached to the shipment. Contact County Cargo before packing if you are uncertain about any item.'
    },
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
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Common questions about shipping from the UK and USA to Nigeria today.</p>
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
