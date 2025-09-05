'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About Us' },
];

export function Header() {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      onClick={() => isMobile && setSheetOpen(false)}
      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      {label}
    </Link>
  );

  const navContent = (
    <>
      {navLinks.map((link) => (
        <NavLink key={link.href} href={link.href} label={link.label} />
      ))}
    </>
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all ${
        isScrolled ? 'border-border bg-background/95 backdrop-blur-sm' : 'border-transparent bg-secondary'
      }`}
    >
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
            <Image src="/county-logo.png" alt="Pandex Logo" width={140} height={40} />
            </Link>
            <nav className="hidden items-center gap-6 md:flex">{navContent}</nav>
        </div>
        {isMobile ? (
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6 text-foreground" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background text-foreground">
              <nav className="grid gap-6 text-lg font-medium pt-8">
                <Link href="/" onClick={() => setSheetOpen(false)} className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <Image src="/county-logo.png" alt="Pandex Logo" width={140} height={40} />
                </Link>
                {navContent}
                 <Link href="#quote" onClick={() => setSheetOpen(false)}>
                  <Button className="w-full">Get a Quote</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
            <Link href="#quote">
              <Button>Get a Quote</Button>
            </Link>
        )}
      </div>
    </header>
  );
}
