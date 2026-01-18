'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
    {
        question: 'What is the cost of shipping from Nigeria to the UK?',
        answer: 'The cost varies depending on the package weight, dimensions, and the shipping service you choose (e.g., air freight, sea freight). We offer competitive rates and you can get a precise quote using our online shipping calculator or by contacting our customer service team.'
    },
    {
        question: 'How long does shipping from Nigeria to the UK take?',
        answer: 'Delivery times depend on the service. Air freight is the fastest option, typically taking 3-7 business days. Sea freight is more economical for larger shipments but takes longer, usually several weeks.'
    },
    {
        question: 'What items are prohibited for shipping to the UK?',
        answer: 'Prohibited items typically include hazardous materials, flammable liquids, batteries, perishable foods, illegal substances, and currency. There are also restrictions on certain food items and agricultural products. Please check our detailed restricted items list or contact customer support for clarification.'
    },
     {
        question: 'Do I need to handle customs clearance myself?',
        answer: 'County Cargo assists with the customs clearance process. We will guide you on the necessary documentation to ensure a smooth process. However, any customs duties or taxes imposed by the UK government are the responsibility of the recipient.'
    },
    {
        question: 'How can I track my shipment to the UK?',
        answer: 'Once your shipment is booked and dispatched, you will receive a unique tracking number via email. You can use this number on our website to monitor the status and location of your package in real-time as it makes its way to the UK.'
    },
]

export function Faq() {
    return (
        <section id="faq" className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find answers to common questions about shipping from Nigeria to the UK.</p>
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
