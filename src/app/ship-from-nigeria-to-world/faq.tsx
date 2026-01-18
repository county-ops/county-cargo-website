
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
    {
        question: 'What countries can I ship to from Nigeria?',
        answer: 'You can ship to over 200 countries from Nigeria with County Cargo, including the USA, UK, Canada, China, and most of Europe and Asia. Our global network ensures your package reaches its destination.'
    },
    {
        question: 'What is the cost of international shipping from Nigeria?',
        answer: 'The cost varies depending on the destination, package weight, dimensions, and shipping service selected. We offer competitive rates and you can get a precise quote using our online shipping calculator.'
    },
    {
        question: 'How long does international shipping from Nigeria take?',
        answer: 'Delivery times depend on the destination and service. Express shipping can take as little as 2-5 business days to major destinations, while standard economy shipping takes longer but is more cost-effective.'
    },
    {
        question: 'What items are prohibited for international shipping?',
        answer: 'Prohibited items typically include hazardous materials, flammable liquids, batteries, perishable foods, illegal substances, and currency. Please check our detailed restricted items list or contact customer support for clarification.'
    },
     {
        question: 'How can I track my international shipment?',
        answer: 'Once your shipment is booked and dispatched, you will receive a unique tracking number via email. You can use this number on our website to monitor the status and location of your package in real-time.'
    },
]

export function Faq() {
    return (
        <section id="faq" className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find answers to common questions about shipping from Nigeria to the world.</p>
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
