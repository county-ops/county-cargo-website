
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';


const faqItems = [
    {
        question: 'How do I get a US shipping address?',
        answer: 'Simply create a free account with County Cargo, and we\'ll instantly provide you with your unique US shipping address. This is essential for anyone looking to ship from US to Nigeria. You can then use this address when shopping from any US online retailer. We can also consolidate multiple packages to save you money on your US to Nigeria cargo. You might even consider our US personal shopper Nigeria service for added convenience.'
    },
    {
        question: 'What is the cost of shipping from US to Nigeria?',
        answer: 'Our standard shipping rate is $5.00 per pound (lbs) for delivery to Lagos and $5.50 per pound (lbs) for all other cities in Nigeria. The minimum chargeable weight for any shipment is 5 lbs. This makes us one of the cheapest shipping to Nigeria options available. You can use our online calculator for an instant estimate for your US to Nigeria cargo.'
    },
    {
        question: 'How long does it take to ship from US to Nigeria?',
        answer: 'Standard shipping typically takes 5 to 10 working days. Delivery times are from when the parcel departs our US warehouse. We are committed to reliable shipping US Nigeria for all your packages.'
    },
    {
        question: 'Is my parcel insured when shipping from US to Nigeria?',
        answer: 'Yes, all our shipping options include basic insurance cover when you send parcel to Nigeria. Premium insurance is available with our express services for enhanced peace of mind. You can find more details in our terms and conditions, ensuring safe freight forwarding Nigeria.'
    },
     {
        question: 'Can I track my shipment from US to Nigeria?',
        answer: 'Absolutely! Full tracking is included with all our shipping services. You will receive a tracking number once your parcel is dispatched, allowing you to monitor its journey from our US warehouse to your doorstep in Nigeria. This ensures transparent US to Nigeria cargo delivery.'
    },
    {
        question: 'Can you consolidate multiple packages?',
        answer: 'Yes! Our package consolidation service is a great way to save money when you ship from US to Nigeria. You can shop from multiple US stores, have them all sent to your US address, and we will combine them into a single shipment. This reduces the overall weight and cost of your US to Nigeria cargo.'
    }
]

export function Faq() {
    return (
        <section id="faq" className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find answers to common questions about shipping from US to Nigeria with County Cargo.</p>
                </div>
                 <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqItems.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index} className="bg-white p-6 rounded-lg shadow-md border-b-0" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
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
