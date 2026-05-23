
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, XCircle, BookOpenCheck } from "lucide-react";
import { useEffect } from "react";

const ProhibitedItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start gap-2">
        <XCircle className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
        <span>{children}</span>
    </li>
);

const AllowedItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start gap-2">
        <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
        <span>{children}</span>
    </li>
);

export default function KnowledgeBasePage() {
    useEffect(() => {
        document.title = "Knowledge Base | County Cargo";
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <h1 className="font-semibold text-lg md:text-2xl">Knowledge Base</h1>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex items-start gap-4">
                        <BookOpenCheck className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>Our Services Explained</CardTitle>
                            <CardDescription>
                                Find detailed information about our shipping services, including timelines, what you can ship, and what is restricted.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {/* Value Import */}
                        <AccordionItem value="value-import">
                            <AccordionTrigger className="text-xl font-semibold">Value Import (from US & UK)</AccordionTrigger>
                            <AccordionContent className="pt-4 space-y-6">
                                <p className="text-muted-foreground">
                                    Our Value Import service is the most affordable way to ship items from the United States and the United Kingdom to Nigeria. It's perfect for personal shopping, gifts, and business inventory.
                                </p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold mb-2">What You Can Ship</h4>
                                        <ul className="space-y-2 text-sm">
                                            <AllowedItem>Clothing, shoes, and accessories</AllowedItem>
                                            <AllowedItem>Books and electronics (without lithium batteries)</AllowedItem>
                                            <AllowedItem>Cosmetics and skincare (non-flammable)</AllowedItem>
                                            <AllowedItem>Small home goods and non-perishable food items</AllowedItem>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">What You Can't Ship (Prohibited Items)</h4>
                                        <ul className="space-y-2 text-sm">
                                            <ProhibitedItem>Standalone or loose lithium-ion batteries</ProhibitedItem>
                                            <ProhibitedItem>Perfumes, body sprays, and aerosol cans</ProhibitedItem>
                                            <ProhibitedItem>Flammable liquids or solids</ProhibitedItem>
                                            <ProhibitedItem>Currency, jewelry, and precious metals</ProhibitedItem>
                                            <ProhibitedItem>Firearms, weapons, and explosives</ProhibitedItem>
                                        </ul>
                                    </div>
                                </div>
                                <div className="text-xs text-muted-foreground pt-4 border-t">
                                    <strong>Delivery Timeline:</strong> 5-10 business days from the weekly shipment date (Thursdays for UK, Fridays for US). This timeline begins after your package has been received at our warehouse and payment has been confirmed.
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* Value Export */}
                        <AccordionItem value="value-export">
                            <AccordionTrigger className="text-xl font-semibold">Value Export (to US & UK)</AccordionTrigger>
                            <AccordionContent className="pt-4 space-y-6">
                                <p className="text-muted-foreground">
                                    Value Export is a cost-effective solution for sending items from Nigeria to the United States and the United Kingdom. It is ideal for sending local products, documents, and personal items abroad.
                                </p>
                                 <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold mb-2">What You Can Ship</h4>
                                        <ul className="space-y-2 text-sm">
                                            <AllowedItem>Nigerian textiles and fabrics (e.g., Ankara, Aso-oke)</AllowedItem>
                                            <AllowedItem>Documents and books</AllowedItem>
                                            <AllowedItem>Handicrafts and art (non-fragile)</AllowedItem>
                                            <AllowedItem>
                                                <strong>Dried & Packaged Foods:</strong> Grains, beans, spices, dry pepper, ogbono, egusi (ground), crayfish (blended/dried), prawns, and dried fish.
                                            </AllowedItem>
                                             <AllowedItem>
                                                <strong>Sealed Liquids:</strong> Vegetable oil, palm oil, coconut oil, castor oil, etc.
                                            </AllowedItem>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">What You Can't Ship (Prohibited Items)</h4>
                                        <ul className="space-y-2 text-sm">
                                            <ProhibitedItem>Perishable food items (unless specified as allowed)</ProhibitedItem>
                                            <ProhibitedItem>Hazardous materials, chemicals, or powders</ProhibitedItem>
                                            <ProhibitedItem>Animal skins or parts</ProhibitedItem>
                                            <ProhibitedItem>Currency and negotiable instruments</ProhibitedItem>
                                            <ProhibitedItem>Cigarettes, alcohol, drugs</ProhibitedItem>
                                            <ProhibitedItem>Sharp objects and weapons</ProhibitedItem>
                                        </ul>
                                    </div>
                                </div>
                                <div className="pt-4 mt-6 border-t">
                                    <h4 className="font-semibold mb-2">Special Instructions for Food Items</h4>
                                    <ul className="space-y-2 text-sm">
                                        <AllowedItem><strong>Dried Fish:</strong> Maximum of 10kg per shipment (waybill).</AllowedItem>
                                        <AllowedItem><strong>Goat Meat (Dried):</strong> Maximum of 2kg per shipment (waybill).</AllowedItem>
                                        <AllowedItem><strong>Snails (Dried/Oven-Dried):</strong> Maximum of 2kg per shipment. A snail classification form is required.</AllowedItem>
                                    </ul>
                                </div>
                                <div className="text-xs text-muted-foreground pt-4 border-t">
                                    <strong>Delivery Timeline:</strong> 10-15 business days from the weekly shipment date (Fridays). This timeline begins after your package has been received at our Lagos drop-off location and payment has been confirmed.
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* Express Export */}
                        <AccordionItem value="express-export">
                            <AccordionTrigger className="text-xl font-semibold">Express Export (International)</AccordionTrigger>
                            <AccordionContent className="pt-4 space-y-6">
                                <p className="text-muted-foreground">
                                    Our Express Export service, powered by DHL, is the fastest and most reliable way to ship items from Nigeria to almost any country worldwide. This is the premium choice for urgent and time-sensitive shipments.
                                </p>
                                 <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold mb-2">What You Can Ship (with conditions)</h4>
                                        <ul className="space-y-2 text-sm">
                                            <AllowedItem><strong>Phones:</strong> A maximum of two phones are allowed per shipment (waybill).</AllowedItem>
                                            <AllowedItem><strong>Dried Fish:</strong> Limited to a maximum of 0.5kg per shipment (waybill).</AllowedItem>
                                            <AllowedItem><strong>Herbal Medicine:</strong> Requires a valid phytosanitary or quarantine certificate to be shipped.</AllowedItem>
                                            <AllowedItem><strong>Medication:</strong> Can be shipped to most countries (excluding Canada/US) with a signed and stamped doctor's prescription.</AllowedItem>
                                            <AllowedItem><strong>Skincare to Spain:</strong> The receiver must provide a sanitary import license for customs clearance.</AllowedItem>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">What You Can't Ship (Prohibited Items)</h4>
                                        <ul className="space-y-2 text-sm">
                                            <ProhibitedItem>Alcoholic beverages, perfumes, and other flammable liquids</ProhibitedItem>
                                            <ProhibitedItem>Ammunition, firearms, or explosives</ProhibitedItem>
                                            <ProhibitedItem>Bank bills, currency, gold, minerals, or precious stones</ProhibitedItem>
                                            <ProhibitedItem>Batteries (loose) and power banks</ProhibitedItem>
                                            <ProhibitedItem>Cooked meals, raw meat, snails, fruits, and vegetables</ProhibitedItem>
                                            <ProhibitedItem>Fireworks, hazardous waste, or radioactive materials</ProhibitedItem>
                                            <ProhibitedItem>Grains, pasta, and noodles</ProhibitedItem>
                                            <ProhibitedItem>Illegal items, according to law enforcement</ProhibitedItem>
                                            <ProhibitedItem>Live animals or pets</ProhibitedItem>
                                            <ProhibitedItem>Milk, dairy products, and palm oil</ProhibitedItem>
                                        </ul>
                                    </div>
                                </div>
                                 <div className="text-xs text-muted-foreground pt-4 border-t">
                                    <strong>Delivery Timeline:</strong> Typically 3-5 business days. The timeline begins after your package has been processed and payment is confirmed. Please note that the receiver is responsible for any customs duties or taxes in the destination country.
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}
