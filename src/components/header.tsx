'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, ChevronDown } from 'lucide-react';
import React from 'react';
import { RollingRibbon } from './rolling-ribbon';

const navLinks = [
  { href: '/', label: 'Home' },
  { 
    href: '#services', 
    label: 'Services',
    submenu: [
      { href: '/shipping-from-uk-to-nigeria', label: 'Shipping from UK to Nigeria' },
      { href: '/ship-from-us-to-nigeria', label: 'Shipping from US to Nigeria' },
      { href: '/ship-from-nigeria-to-uk', label: 'Shipping from Nigeria to UK' },
      { href: '/ship-from-nigeria-to-us', label: 'Shipping from Nigeria to US' },
      { href: '/ship-from-nigeria-to-world', label: 'Shipping from Nigeria to World' },
    ]
  },
  { href: '/about', label: 'About Us' },
  { href: 'https://ship.countycargo.com/', label: 'Track Shipment' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isSheetOpen, setSheetOpen] = React.useState(false);

  const desktopNav = (
     <div className="hidden md:flex items-center justify-center flex-1 space-x-6 lg:space-x-8">
      {navLinks.map((link) => (
        link.submenu ? (
          <DropdownMenu key={link.label}>
            <DropdownMenuTrigger asChild>
              <Link href={link.href} className="text-secondary hover:text-primary transition-colors flex items-center gap-1">
                {link.label} <ChevronDown className="w-4 h-4" />
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-primary border-none shadow-lg text-primary-foreground">
              {link.submenu.map(sublink => (
                <DropdownMenuItem key={sublink.label} asChild>
                  <Link href={sublink.href}>{sublink.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link key={link.label} href={link.href} className="text-secondary hover:text-primary transition-colors">
            {link.label}
          </Link>
        )
      ))}
    </div>
  );

  const mobileNav = (
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-gray-50">Home</Link>
        <Link href="#services" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-gray-50">Services</Link>
        <Link href="/shipping-from-uk-to-nigeria" className="block px-3 py-2 pl-6 text-sm text-gray-600 hover:text-primary hover:bg-gray-50">Shipping from UK to Nigeria</Link>
        <Link href="/ship-from-us-to-nigeria" className="block px-3 py-2 pl-6 text-sm text-gray-600 hover:text-primary hover:bg-gray-50">Shipping from US to Nigeria</Link>
        <Link href="/ship-from-nigeria-to-uk" className="block px-3 py-2 pl-6 text-sm text-gray-600 hover:text-primary hover:bg-gray-50">Shipping from Nigeria to UK</Link>
        <Link href="/ship-from-nigeria-to-us" className="block px-3 py-2 pl-6 text-sm text-gray-600 hover:text-primary hover:bg-gray-50">Shipping from Nigeria to US</Link>
        <Link href="/ship-from-nigeria-to-world" className="block px-3 py-2 pl-6 text-sm text-gray-600 hover:text-primary hover:bg-gray-50">Shipping from Nigeria to World</Link>
        <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-gray-50">About Us</Link>
        <Link href="https://ship.countycargo.com/" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-gray-50">Track Shipment</Link>
        <Link href="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-gray-50">Blog</Link>
        <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-gray-50">Contact</Link>
        
        <div className="border-t border-gray-200 pt-4 pb-2">
            <Link href="http://ship.countycargo.com/login" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-gray-50">Login</Link>
            <Link href="https://ship.countycargo.com/register" className="block px-3 py-2 mt-2 bg-primary text-white text-center rounded-md hover:bg-blue-700">Register</Link>
        </div>
    </div>
  )

  return (
    <>
      <RollingRibbon />
      <header className="bg-white shadow-lg fixed w-full z-50 top-[40px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <Image src="/county-logo.png" alt="County Cargo Logo" width={68.6} height={19.6} />
              </Link>
            </div>
            
            {desktopNav}

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="http://ship.countycargo.com/login">Login</Link>
              </Button>
               <Button asChild>
                <Link href="https://ship.countycargo.com/register">Register</Link>
              </Button>
            </div>

            <div className="md:hidden flex items-center">
              <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                   <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6 text-secondary" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-white w-full">
                  {mobileNav}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
