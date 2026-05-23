
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
    {
        question: 'How do I get a UK shipping address?',
        answer: 'Simply create a free account with County Cargo, and we\'ll instantly provide you with your unique UK shipping address. This is essential for anyone looking to ship from UK to Nigeria. You can then use this address when shopping from any UK online retailer. You might even consider our UK personal shopper Nigeria service for added convenience.'
    },
    {
        question: 'What is the cost of shipping from UK to Nigeria?',
        answer: 'Our shipping costs to Nigeria vary depending on the weight, dimensions, and chosen shipping speed (Standard, 48hrs Express, or 24hrs Express). We aim for the cheapest shipping to Nigeria without compromising service. Please refer to our pricing section above for detailed rates, starting from £6.00/kg. This covers your UK to Nigeria cargo needs.'
    },
    {
        question: 'How long does it take to ship from UK to Nigeria?',
        answer: 'Standard shipping typically takes 5-10 working days. For fast shipping Nigeria, our 48hrs Express option delivers in 2 working days, and our 24hrs Express option delivers in 1 working day. Delivery times are from when the parcel leaves our UK warehouse. We are committed to reliable shipping UK Nigeria for all your packages.'
    },
    {
        question: 'Is my parcel insured when shipping from UK to Nigeria?',
        answer: 'Yes, all our shipping options include basic insurance cover when you send parcel to Nigeria. Premium insurance is available with our express services for enhanced peace of mind. You can find more details in our terms and conditions, ensuring safe freight forwarding Nigeria.'
    },
     {
        question: 'Can I track my shipment from UK to Nigeria?',
        answer: 'Absolutely! Full tracking is included with all our shipping services. You will receive a tracking number once your parcel is dispatched, allowing you to monitor its journey from our UK warehouse to your doorstep in Nigeria. This ensures transparent UK to Nigeria cargo delivery.'
    },
]

export function Faq() {
    return (
        <section id="faq" className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find answers to common questions about shipping from UK to Nigeria with County Cargo.</p>
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
