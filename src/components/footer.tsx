import Link from 'next/link';
import { Truck, Facebook, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-secondary text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center mb-4">
                            <Truck className="h-8 w-8 text-primary" />
                            <span className="ml-2 text-xl font-bold">County Cargo</span>
                        </div>
                        <p className="text-gray-400">Reliable logistics solutions for your business needs.</p>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li><Link href="/ship-from-uk-to-nigeria" className="text-gray-400 hover:text-white transition-colors">Ship from UK to Nigeria</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Ship from US to Nigeria</Link></li>
                            <li><Link href="/#services" className="text-gray-400 hover:text-white transition-colors">Freight Transportation</Link></li>
                            <li><Link href="/#services" className="text-gray-400 hover:text-white transition-colors">Warehousing</Link></li>
                            <li><Link href="/#services" className="text-gray-400 hover:text-white transition-colors">International Shipping</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
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
