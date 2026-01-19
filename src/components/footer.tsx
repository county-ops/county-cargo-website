
import Link from 'next/link';
import { Truck, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center mb-4">
                            <Truck className="h-8 w-8 text-primary" />
                            <span className="ml-2 text-xl font-bold">County Cargo</span>
                        </div>
                        <p className="text-gray-400">Reliable logistics solutions for your business needs.</p>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 mr-3 mt-1 shrink-0 text-primary" />
                                <a href="https://www.google.com/maps/search/?api=1&query=Suite%20F8%2C%20Magnet%20Shopping%20Plaza%2C%20525%20Agege%20Motor%20Rd%2C%20Ladipo-Oshodi%2C%20Lagos%20102214%2C%20Lagos%2C%20Nigeria" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos 102214, Lagos, Nigeria
                                </a>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 mr-3 shrink-0 text-primary" />
                                <a href="mailto:info@countycargo.com" className="hover:text-white transition-colors">info@countycargo.com</a>
                            </li>
                             <li className="flex items-center">
                                <Phone className="h-5 w-5 mr-3 shrink-0 text-primary" />
                                <a href="tel:+2348110000421" className="hover:text-white transition-colors">+234 811 000 0421</a>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-blue-600 transition-opacity hover:opacity-80"><Facebook className="h-6 w-6" /></Link>
                            <Link href="#" className="text-sky-500 transition-opacity hover:opacity-80"><Twitter className="h-6 w-6" /></Link>
                            <Link href="#" className="text-sky-700 transition-opacity hover:opacity-80"><Linkedin className="h-6 w-6" /></Link>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                     <p>&copy; {new Date().getFullYear()} County Cargo. All rights reserved. | Built by <a href="https://nocodek.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Nocodek</a></p>
                     <div className="mt-4">
                        <Link href="/legal" className="text-shiny-red hover:opacity-80 transition-opacity mx-2">Privacy Policy</Link>
                        <span className="text-gray-500">|</span>
                        <Link href="/legal" className="text-shiny-red hover:opacity-80 transition-opacity mx-2">Terms of Service</Link>
                        <span className="text-gray-500">|</span>
                        <Link href="/faq" className="text-shiny-red hover:opacity-80 transition-opacity mx-2">FAQ</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
