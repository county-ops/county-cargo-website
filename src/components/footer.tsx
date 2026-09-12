
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Truck, Facebook, Mail, Phone, MapPin, Instagram } from 'lucide-react';

export function Footer() {
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-10 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Horizontal Global Office Locations Grid */}
                <div className="border-b border-gray-800 pb-8 mb-8 sm:mb-10">
                    <h3 className="text-base sm:text-lg font-semibold mb-4 text-center sm:text-left text-white flex items-center justify-center sm:justify-start gap-2">
                        <MapPin className="h-5 w-5 text-primary" /> Our Global Offices &amp; Warehouses
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-sm">
                        <div className="bg-gray-800/40 p-4 rounded-xl border border-gray-700/50 text-center sm:text-left">
                            <span className="font-semibold text-white block mb-1 text-base">🇳🇬 Nigeria Hub (Lagos)</span>
                            <a href="https://www.google.com/maps/search/?api=1&query=Suite%20F8%2C%20Magnet%20Shopping%20Plaza%2C%20525%20Agege%20Motor%20Rd%2C%20Ladipo-Oshodi%2C%20Lagos%20102214%2C%20Lagos%2C%20Nigeria" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors leading-relaxed block text-xs">
                                Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos
                            </a>
                        </div>
                        <div className="bg-gray-800/40 p-4 rounded-xl border border-gray-700/50 text-center sm:text-left">
                            <span className="font-semibold text-white block mb-1 text-base">🇳🇬 Nigeria Office (Abuja)</span>
                            <a href="https://www.google.com/maps/search/?api=1&query=Shop%20HF426%2C%20Turai%20Yar%27adua%20Block%2C%20Wuye%20Ultra%20Modern%20Market%2C%20697%20Idris%20Gidado%20Street%2C%20Abuja" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors leading-relaxed block text-xs">
                                Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market, Abuja-FCT
                            </a>
                        </div>
                        <div className="bg-gray-800/40 p-4 rounded-xl border border-gray-700/50 text-center sm:text-left">
                            <span className="font-semibold text-white block mb-1 text-base">🇬🇧 UK Receiving Depot</span>
                            <a href="https://www.google.com/maps/search/?api=1&query=Unit%20G6%2C%20Queens%20Dock%20Commercial%20Centre%2C%2067-83%20Norfolk%20Street%2C%20Liverpool%2C%20L1%200BG" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors leading-relaxed block text-xs">
                                Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG
                            </a>
                        </div>
                        <div className="bg-gray-800/40 p-4 rounded-xl border border-gray-700/50 text-center sm:text-left">
                            <span className="font-semibold text-white block mb-1 text-base">🇺🇸 US Warehouse (Texas)</span>
                            <a href="https://www.google.com/maps/search/?api=1&query=1234%20N%20Belt%20Line%20Rd%2C%20Irving%2C%20TX%2075061" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors leading-relaxed block text-xs">
                                1234 N Belt Line Rd, Irving, TX 75061, United States
                            </a>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
                    <div className="text-center sm:text-left">
                        <div className="flex justify-center sm:justify-start items-center mb-3 sm:mb-4">
                            <Image src="/county-logo.png" alt="County Cargo Logo" width={280} height={80} className="h-16 sm:h-20 w-auto" />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            County Cargo (operated by County Service Group) delivers reliable air freight, sea freight, express parcel delivery, and customs clearance between the UK, USA, and Nigeria.
                        </p>
                    </div>
                    
                    <div className="text-center sm:text-left">
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Core Routes</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/shipping-from-uk-to-nigeria" className="text-gray-400 hover:text-white transition-colors">UK to Nigeria Cargo</Link></li>
                            <li><Link href="/shipping-from-nigeria-to-uk" className="text-gray-400 hover:text-white transition-colors">Nigeria to UK Cargo</Link></li>
                            <li><Link href="/export-from-nigeria" className="text-gray-400 hover:text-white transition-colors">Nigeria Export Hub</Link></li>
                            <li><Link href="/shipping-barrels-from-uk-to-nigeria" className="text-gray-400 hover:text-white transition-colors">UK Barrels Shipping</Link></li>
                            <li><Link href="/shipping-barrels-from-the-usa-to-nigeria" className="text-gray-400 hover:text-white transition-colors">US Barrels Shipping</Link></li>
                            <li><Link href="/shipping-from-nigeria-to-usa" className="text-gray-400 hover:text-white transition-colors">Nigeria to USA Cargo</Link></li>
                        </ul>
                    </div>

                    <div className="text-center sm:text-left">
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Company &amp; Guides</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Hubs</Link></li>
                            <li><Link href="/blog" className="text-primary font-bold hover:underline transition-colors">All Shipping Guides &amp; Blog Index</Link></li>
                            <li><a href="https://ship.countycargo.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Track Shipment</a></li>
                            <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">Route FAQ</Link></li>
                            <li><Link href="/info" className="text-gray-400 hover:text-white transition-colors">Rates &amp; Terms</Link></li>
                        </ul>
                    </div>

                    <div className="text-center sm:text-left">
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact &amp; Social</h3>
                        <ul className="space-y-3 text-gray-400 text-sm mb-4">
                            <li className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left">
                                <Phone className="h-4 w-4 mb-1 sm:mb-0 sm:mr-2 shrink-0 text-primary" />
                                <a href="tel:+2348110000421" className="hover:text-white transition-colors">+234 811 000 0421</a>
                            </li>
                            <li className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" className="h-4 w-4 mb-1 sm:mb-0 sm:mr-2 shrink-0 text-[#25D366]" aria-hidden="true">
                                    <path d="M24 4C12.95 4 4 12.95 4 24c0 3.55.93 6.88 2.55 9.77L4 44l10.5-2.5A19.87 19.87 0 0 0 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4zm8.78 24.24c-.48-.24-2.84-1.4-3.28-1.56-.44-.16-.76-.24-1.08.24-.32.48-1.24 1.56-1.52 1.88-.28.32-.56.36-1.04.12-.48-.24-2.04-.75-3.88-2.39-1.44-1.28-2.4-2.86-2.68-3.34-.28-.48-.03-.74.21-.98.22-.22.48-.56.72-.84.24-.28.32-.48.48-.8.16-.32.08-.6-.04-.84-.12-.24-1.08-2.6-1.48-3.56-.4-.96-.8-.82-1.08-.84-.28-.02-.6-.02-.92-.02s-.84.12-1.28.6c-.44.48-1.68 1.64-1.68 4s1.72 4.64 1.96 4.96c.24.32 3.38 5.16 8.2 7.24 1.15.5 2.04.8 2.74 1.02 1.15.36 2.2.31 3.03.19.92-.14 2.84-1.16 3.24-2.28.4-1.12.4-2.08.28-2.28-.12-.2-.44-.32-.92-.56z" />
                                </svg>
                                <a href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20need%20a%20shipping%20quote" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Us</a>
                            </li>
                            <li className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left">
                                <Mail className="h-4 w-4 mb-1 sm:mb-0 sm:mr-2 shrink-0 text-primary" />
                                <a href="mailto:info@countycargo.com" className="hover:text-white transition-colors">info@countycargo.com</a>
                            </li>
                        </ul>
                        <div className="flex space-x-3 justify-center sm:justify-start">
                            <Link href="https://www.facebook.com/CountyCargo" target="_blank" rel="noopener noreferrer me" aria-label="County Cargo on Facebook" className="text-blue-600 transition-opacity hover:opacity-80"><Facebook className="h-5 w-5" /></Link>
                            <Link href="https://x.com/CountyCargo" target="_blank" rel="noopener noreferrer me" aria-label="County Cargo on X (Twitter)" className="text-white transition-opacity hover:opacity-80">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                                </svg>
                            </Link>
                            <Link href="https://www.tiktok.com/@countycargong" target="_blank" rel="noopener noreferrer me" aria-label="County Cargo on TikTok" className="text-cyan-400 transition-opacity hover:opacity-80">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </Link>
                            <Link href="https://www.instagram.com/countycargo/" target="_blank" rel="noopener noreferrer me" aria-label="County Cargo on Instagram" className="text-pink-500 transition-opacity hover:opacity-80"><Instagram className="h-5 w-5" /></Link>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
                     <p>&copy; {year || '...'} County Cargo. All rights reserved. | Built by <a href="https://nocodek.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Nocodek</a></p>
                     <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2">
                        <Link href="/info" className="text-shiny-red hover:opacity-80 transition-opacity">Info, Prices &amp; Terms</Link>
                        <span className="text-gray-500">|</span>
                        <Link href="/faq" className="text-shiny-red hover:opacity-80 transition-opacity">FAQ</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
