
'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Menu,
  History,
  Home,
  PackagePlus,
  Settings,
  Coins,
  ClipboardList,
  Wrench,
  BookUser,
  Users,
  PenSquare,
  Mail,
  Calculator,
  BookOpenCheck,
  Banknote,
  FileText,
  FileCode,
  Beaker,
  ShieldCheck,
  Activity,
  MailCheck,
  Truck,
  CheckSquare,
  Package,
  Receipt,
  Bell,
} from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { UserNav } from '@/components/user-nav'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useProfile } from "@/components/profile-provider"
import { NotificationsPanel } from './notifications-panel'
import ContactLinks from './contact-links'

const NavLink = ({ href, pathname, children, icon: Icon, onCloseSheet, isExternal }: { href: string, pathname: string, children: React.ReactNode, icon: React.ElementType, onCloseSheet?: () => void, isExternal?: boolean }) => {
    const isActive = !isExternal && (href === '/dashboard' ? pathname === href : pathname.startsWith(href));
    const linkProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
        <Link
        href={href}
        className={cn(
            "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
            isActive && "bg-muted text-foreground"
        )}
        onClick={onCloseSheet}
        {...linkProps}
        >
        <Icon className="h-5 w-5" />
        {children}
        </Link>
    );
};


export default function Header() {
  const pathname = usePathname();
  const { profile, profileLoading } = useProfile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  if (profileLoading || !profile) {
    return (
      <div className="flex w-full items-center justify-end gap-4">
        <UserNav />
      </div>
    )
  }

  const isAdmin = profile.role === 'Admin';
  const isStaff = profile.role === 'Staff';
  const isBusiness = profile.role === 'Business';
  const isAdminOrStaff = isAdmin || isStaff;
  
  const navItems = [
    { 
      title: 'Shipping',
      links: [
        { href: '/dashboard', label: 'Overview', icon: Home },
        ...(isAdmin ? [{ href: '/dashboard/admin/book-shipment', label: 'Book for Customer', icon: PenSquare }] : []),
        { href: '/dashboard/address-book', label: 'My Address Book', icon: BookUser },
        isAdminOrStaff 
          ? { href: '/dashboard/admin/bookings', label: 'Manage Shipments', icon: ClipboardList }
          : { href: '/dashboard/my-shipments', label: 'My Shipments', icon: History },
      ]
    }
  ];

  const resourcesNavItems = {
      title: 'Resources',
      links: [
        { href: '/dashboard/knowledge-base', label: 'Knowledge Base', icon: BookOpenCheck },
      ]
  };
  
  const getSettingsLinks = () => {
    if (isAdmin) {
      return [
        { href: '/dashboard/admin/importer', label: 'Inbound Packages', icon: MailCheck },
        { href: '/dashboard/admin/batch-add-package', label: 'Batch Add Package', icon: Truck },
        { href: '/dashboard/admin/weekly-shipments', label: 'Weekly Shipments', icon: Package },
        { href: '/dashboard/admin/invoices', label: 'Invoices', icon: Receipt },
        { href: '/dashboard/admin/notifications', label: 'Notifications', icon: Bell },
        { href: '/dashboard/admin/reports', label: 'Reports', icon: FileText },
        { href: '/dashboard/admin/users', label: 'Manage Users', icon: Users },
        { href: '/dashboard/admin/staff', label: 'Staff & Roles', icon: ShieldCheck },
        { href: '/dashboard/admin/api-usage', label: 'API Usage', icon: Activity },
        { href: '/dashboard/admin/pricing', label: 'Pricing', icon: Coins },
        { href: '/dashboard/admin/services', label: 'Services', icon: Wrench },
        { href: '/dashboard/admin/finance', label: 'Finance', icon: Banknote },
        { href: '/dashboard/admin/email', label: 'Email', icon: Mail },
        { href: '/dashboard/admin/api-test', label: 'API Test Bed', icon: Beaker },
      ];
    }
    if (isStaff) {
      return [
        { href: '/dashboard/admin/users', label: 'Manage Users', icon: Users },
      ];
    }
    return [];
  };

  const settingsNavItems = {
      title: 'Settings',
      links: getSettingsLinks(),
  };

  const handleSheetClose = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
           <div className="flex flex-col h-full bg-background">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                  <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-lg">
                      <Image src="/logo.png" alt="County Cargo logo" width={24} height={24} />
                      <span className="">County Cargo</span>
                  </Link>
              </div>
              <div className="flex-1 overflow-y-auto">
                  <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4 space-y-4">
                      {navItems.map((item, index) => (
                          <div key={index}>
                              <h3 className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">{item.title}</h3>
                              <div className="grid gap-1">
                                  {item.links.map(link => (
                                      <NavLink key={link.href} href={link.href} pathname={pathname} icon={link.icon} onCloseSheet={handleSheetClose}>
                                          {link.label}
                                      </NavLink>
                                  ))}
                              </div>
                          </div>
                      ))}
                        <div>
                           <h3 className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">{resourcesNavItems.title}</h3>
                           <div className="grid gap-1">
                              {resourcesNavItems.links.map(link => (
                                  <NavLink key={link.href} href={link.href} pathname={pathname} icon={link.icon} onCloseSheet={handleSheetClose}>
                                      {link.label}
                                  </NavLink>
                              ))}
                            </div>
                        </div>
                        {!isAdminOrStaff && <ContactLinks isCollapsed={false} onLinkClick={handleSheetClose} />}
                        {isBusiness && (
                          <div>
                            <h3 className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Developer</h3>
                              <div className="grid gap-1">
                                  <NavLink href="/dashboard/api-docs" pathname={pathname} icon={FileCode} onCloseSheet={handleSheetClose}>
                                      API Docs
                                  </NavLink>
                              </div>
                          </div>
                        )}
                      {isAdminOrStaff && settingsNavItems.links.length > 0 && (
                          <div>
                              <h3 className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">{settingsNavItems.title}</h3>
                              <div className="grid gap-1">
                                  {settingsNavItems.links.map(link => (
                                      <NavLink key={link.href} href={link.href} pathname={pathname} icon={link.icon} onCloseSheet={handleSheetClose}>
                                          {link.label}
                                      </NavLink>
                                  ))}
                              </div>
                          </div>
                      )}
                  </nav>
              </div>
              <div className="mt-auto p-4 text-center text-xs text-muted-foreground border-t">
                  Powered by <a href="https://nocodek.com" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">Nocodek</a>
              </div>
            </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        {/* Can add breadcrumbs or search here in the future */}
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <NotificationsPanel />
        <UserNav />
      </div>
    </div>
  )
}
