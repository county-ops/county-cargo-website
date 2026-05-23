
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
                    <div className="text-center sm:text-left">
                        <div className="flex justify-center sm:justify-start items-center mb-3 sm:mb-4">
                            <Image src="/county-logo.png" alt="County Cargo Logo" width={280} height={80} className="h-16 sm:h-24 w-auto" />
                        </div>
                        <p className="text-gray-400 text-sm sm:text-base">Reliable logistics solutions for your business needs.</p>
                    </div>
                    
                    <div className="text-center sm:text-left">
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Company</h3>
                        <ul className="space-y-2 text-sm sm:text-base">
                            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div className="text-center sm:text-left">
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-gray-400 text-sm sm:text-base">
                            <li className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
                                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mb-2 sm:mb-0 sm:mr-3 shrink-0 text-primary" />
                                <a href="https://www.google.com/maps/search/?api=1&query=Suite%20F8%2C%20Magnet%20Shopping%20Plaza%2C%20525%20Agege%20Motor%20Rd%2C%20Ladipo-Oshodi%2C%20Lagos%20102214%2C%20Lagos%2C%20Nigeria" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos 102214, Lagos, Nigeria
                                </a>
                            </li>
                            <li className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left">
                                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mb-2 sm:mb-0 sm:mr-3 shrink-0 text-primary" />
                                <a href="tel:+2348110000421" className="hover:text-white transition-colors">+234 811 000 0421</a>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="text-center sm:text-left">
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Follow Us</h3>
                        <div className="flex space-x-4 justify-center sm:justify-start">
                            <Link href="https://www.facebook.com/CountyCargo" target="_blank" rel="noopener noreferrer" className="text-blue-600 transition-opacity hover:opacity-80"><Facebook className="h-6 w-6" /></Link>
                            <Link href="https://x.com/CountyCargo" target="_blank" rel="noopener noreferrer" className="text-white transition-opacity hover:opacity-80">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                                </svg>
                            </Link>
                            <Link href="https://www.tiktok.com/@countycargong" target="_blank" rel="noopener noreferrer" className="text-cyan-400 transition-opacity hover:opacity-80">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </Link>
                            <Link href="https://www.instagram.com/countycargo/" target="_blank" rel="noopener noreferrer" className="text-pink-500 transition-opacity hover:opacity-80"><Instagram className="h-6 w-6" /></Link>
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
