
import Link from 'next/link';
import { Truck, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-secondary text-white py-12">
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
                            <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 mr-3 mt-1 shrink-0" />
                                <span>Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos 102214, Lagos, Nigeria</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 mr-3 shrink-0" />
                                <a href="mailto:info@countycargo.com" className="hover:text-white transition-colors">info@countycargo.com</a>
                            </li>
                             <li className="flex items-center">
                                <Phone className="h-5 w-5 mr-3 shrink-0" />
                                <a href="tel:+2348110000421" className="hover:text-white transition-colors">+234 811 000 0421</a>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="h-6 w-6" /></Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="h-6 w-6" /></Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="h-6 w-6" /></Link>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                     <p>&copy; {new Date().getFullYear()} County Cargo. All rights reserved. | Built by <a href="https://nocodek.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Nocodek</a></p>
                </div>
            </div>
        </footer>
    );
}
