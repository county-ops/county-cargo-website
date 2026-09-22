'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
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
    href: '/#services', 
    label: 'Services',
    submenu: [
      { href: '/shipping-from-uk-to-nigeria', label: 'Shipping from UK to Nigeria' },
      { href: '/shipping-from-uk-to-lagos', label: 'Shipping from UK to Lagos' },
      { href: '/shipping-from-uk-to-abuja', label: 'Shipping from UK to Abuja' },
      { href: '/shipping-from-uk-to-port-harcourt', label: 'Shipping from UK to Port Harcourt' },
      { href: '/shipping-from-london-to-nigeria', label: 'London Charlton Drop-Off' },
      { href: '/shipping-from-usa-to-nigeria', label: 'Shipping from USA to Nigeria' },
      { href: '/shipping-from-usa-to-lagos', label: 'Shipping from USA to Lagos' },
      { href: '/shipping-from-usa-to-abuja', label: 'Shipping from USA to Abuja' },
      { href: '/shipping-from-usa-to-port-harcourt', label: 'Shipping from USA to Port Harcourt' },
      { href: '/shipping-from-nigeria-to-uk', label: 'Shipping from Nigeria to UK' },
      { href: '/ship-from-nigeria-to-us', label: 'Shipping from Nigeria to US' },
      { href: '/ship-from-nigeria-to-world', label: 'Shipping from Nigeria to World' },
      { href: '/express-export', label: 'Express Export (Worldwide)' },
      { href: '/uk-stores', label: 'Shop UK Online Stores' },
      { href: '/us-stores', label: 'Shop USA Online Stores' },
    ]
  },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/track', label: 'Track Shipment' },
];

export function Header() {
  const [isSheetOpen, setSheetOpen] = React.useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const desktopNav = (
     <div className="hidden lg:flex items-center justify-center flex-1 space-x-6 lg:space-x-8">
      {navLinks.map((link) => (
        link.submenu ? (
          <DropdownMenu key={link.label}>
            <DropdownMenuTrigger asChild>
              <span className="text-secondary hover:text-primary transition-colors inline-flex items-center gap-1 cursor-pointer select-none">
                {link.label} <ChevronDown className="w-4 h-4 shrink-0" />
              </span>
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
          <Link key={link.label} href={link.href} className="text-secondary hover:text-primary transition-colors inline-flex items-center">
            {link.label}
          </Link>
        )
      ))}
    </div>
  );

  const mobileNav = (
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-gray-50">Home</Link>
        <Link href="/#services" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-gray-50">Services</Link>
        <Link href="/shipping-from-uk-to-nigeria" className="block px-3 py-2 pl-6 text-sm text-gray-600 hover:text-primary hover:bg-gray-50">Shipping from UK to Nigeria</Link>
        <Link href="/shipping-from-uk-to-lagos" className="block px-3 py-2 pl-6 text-sm text-gray-600 hover:text-primary hover:bg-gray-50">Shipping from UK to Lagos</Link>
        <Link href="/shipping-from-uk-to-abuja" className="block px-3 py-2 pl-6 text-sm text-gray-600 hover:text-primary hover:bg-gray-50">Shipping from UK to Abuja</Link>
        <Link href="/shipping-from-uk-to-port-harcourt" className="block px-3 py-2 pl-6 text-sm text-gray-600 hover:text-primary hover:bg-gray-50">Shipping from UK to Port Harcourt</Link>
        <Link href="/shipping-from-london-to-nigeria" className="block px-3 py-2 pl-6 text-sm text-gray-600 hover:text-primary hover:bg-gray-50">London Charlton Drop-Off</Link>
        <Link href="/shipping-from-usa-to-nigeria" className="block px-3 py-2 pl-6 text-sm text-gray-600 hover:text-primary hover:bg-gray-50">Shipping from USA to Nigeria</Link>
        <Link href="/shipping-from-usa-to-lagos" className="block px-3 py-2 pl-6 text-sm text-gray-600 hover:text-primary hover:bg-gray-50">Shipping from USA to Lagos</Link>
        <Link href="/shipping-from-usa-to-abuja" className="block px-3 py-2 pl-6 text-sm text-gray-600 hover:text-primary hover:bg-gray-50">Shipping from USA to Abuja</Link>
        <Link href="/shipping-from-usa-to-port-harcourt" className="block px-3 py-2 pl-6 text-sm text-gray-600 hover:text-primary hover:bg-gray-50">Shipping from USA to Port Harcourt</Link>
        <Link href="/shipping-from-nigeria-to-uk" className="block px-3 py-2 pl-6 text-sm text-gray-600 hover:text-primary hover:bg-gray-50">Shipping from Nigeria to UK</Link>
        <Link href="/ship-from-nigeria-to-us" className="block px-3 py-2 pl-6 text-sm text-gray-600 hover:text-primary hover:bg-gray-50">Shipping from Nigeria to US</Link>
        <Link href="/ship-from-nigeria-to-world" className="block px-3 py-2 pl-6 text-sm text-gray-600 hover:text-primary hover:bg-gray-50">Shipping from Nigeria to World</Link>
        <Link href="/express-export" className="block px-3 py-2 pl-6 text-sm font-semibold text-primary hover:bg-blue-50">Express Export (Worldwide)</Link>
        <Link href="/uk-stores" className="block px-3 py-2 pl-6 text-sm text-gray-600 hover:text-primary hover:bg-gray-50">Shop UK Online Stores</Link>
        <Link href="/us-stores" className="block px-3 py-2 pl-6 text-sm text-gray-600 hover:text-primary hover:bg-gray-50">Shop USA Online Stores</Link>
        <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-gray-50">About Us</Link>
        <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-gray-50">Contact</Link>
        <Link href="/track" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-gray-50">Track Shipment</Link>
        
        <div className="border-t border-gray-200 pt-4 pb-2">
            <Link href="https://ship.countycargo.com/login" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-gray-50">Login</Link>
            <Link href="https://ship.countycargo.com/login" className="block px-3 py-2 mt-2 bg-primary text-white text-center rounded-md hover:bg-blue-700">Register</Link>
        </div>
    </div>
  )

  return (
    <>
      {isHome && (
        <div className="fixed w-full z-[65] top-0">
          <RollingRibbon />
        </div>
      )}
      <header className={`bg-white shadow-lg fixed w-full z-[100] ${isHome ? 'top-[36px]' : 'top-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/county-cargo-logo-transparent.png"
                  alt="County Cargo"
                  width={120}
                  height={34}
                  className="h-7 sm:h-8 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            {desktopNav}

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="https://ship.countycargo.com/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="https://ship.countycargo.com/login">Register</Link>
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden flex items-center">
              <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-md"
                    aria-label="Open navigation menu"
                  >
                    <Menu className="h-5 w-5 text-secondary" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-white w-[85vw] max-w-sm flex flex-col p-0 overflow-y-auto">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">Main navigation links for County Cargo</SheetDescription>

                  {/* Sheet header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <Link href="/" onClick={() => setSheetOpen(false)}>
                      <Image src="/county-logo.png" alt="County Cargo Logo" width={100} height={28} className="h-7 w-auto" />
                    </Link>
                  </div>

                  {/* Nav links */}
                  <nav className="flex-1 px-4 py-4 space-y-1">
                    {[
                      { href: '/', label: 'Home' },
                    ].map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setSheetOpen(false)}
                        className="flex items-center px-3 py-3 rounded-lg text-base font-semibold text-secondary hover:text-primary hover:bg-blue-50 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}

                    {/* Services accordion */}
                    <div className="px-3 pt-2 pb-1">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Services</p>
                      {[
                        { href: '/shipping-from-uk-to-nigeria', label: 'UK → Nigeria' },
                        { href: '/shipping-from-london-to-nigeria', label: 'London Charlton Drop-Off' },
                        { href: '/ship-from-us-to-nigeria', label: 'US → Nigeria' },
                        { href: '/ship-from-nigeria-to-uk', label: 'Nigeria → UK' },
                        { href: '/ship-from-nigeria-to-us', label: 'Nigeria → US' },
                        { href: '/ship-from-nigeria-to-world', label: 'Nigeria → World' },
                      ].map(link => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setSheetOpen(false)}
                          className="flex items-center px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:text-primary hover:bg-blue-50 transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>

                    {[
                      { href: '/about', label: 'About Us' },
                      { href: '/contact', label: 'Contact' },
                      { href: 'https://ship.countycargo.com/', label: 'Track Shipment' },
                    ].map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setSheetOpen(false)}
                        className="flex items-center px-3 py-3 rounded-lg text-base font-semibold text-secondary hover:text-primary hover:bg-blue-50 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile CTA */}
                  <div className="px-4 pb-6 pt-2 border-t border-gray-100 space-y-3">
                    <Link
                      href="https://ship.countycargo.com/login"
                      onClick={() => setSheetOpen(false)}
                      className="flex items-center justify-center w-full px-4 py-3 rounded-xl border-2 border-primary text-primary font-bold text-base hover:bg-blue-50 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="https://ship.countycargo.com/login"
                      onClick={() => setSheetOpen(false)}
                      className="flex items-center justify-center w-full px-4 py-3 rounded-xl bg-primary text-white font-bold text-base hover:bg-blue-700 transition-colors"
                    >
                      Register Free
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
