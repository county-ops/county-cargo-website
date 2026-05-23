
'use client'

import Link from "next/link"
import Image from "next/image"
import { Home, PackagePlus, History, Coins, ClipboardList, Wrench, BookUser, Users, PenSquare, Mail, ChevronLeft, ChevronRight, BookOpenCheck, Banknote, FileText, FileCode, Beaker, ShieldCheck, Activity, MailCheck, Truck, Receipt, MapPin, CheckCircle2, CreditCard, Package, ShieldAlert } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import React, { useState, useEffect } from "react"
import { useProfile } from "@/components/profile-provider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { Button } from "./ui/button"
import ContactLinks from "./contact-links"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"

const NavLink = ({ href, pathname, children, icon: Icon, isCollapsed, isExternal }: { href: string, pathname: string, children: React.ReactNode, icon: React.ElementType, isCollapsed: boolean, isExternal?: boolean }) => {
    const isActive = !isExternal && (href === '/dashboard' ? pathname === href : pathname.startsWith(href));
    
    const linkProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

    if (isCollapsed) {
        return (
            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                        <Link
                            href={href}
                            className={cn(
                                "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground",
                                isActive && "bg-muted"
                            )}
                            {...linkProps}
                            >
                            <Icon className="h-4 w-4" />
                            <span className="sr-only">{children}</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{children}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }

    return (
        <Link
        href={href}
        className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
            isActive 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
        )}
        {...linkProps}
        >
        <Icon className="h-4 w-4" />
        {children}
        </Link>
    );
};


export default function AppSidebar() {
  const pathname = usePathname();
  const { profile, profileLoading } = useProfile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const isApiDocsPage = pathname.startsWith('/dashboard/api-docs');
  const [userHasClosedApiDocs, setUserHasClosedApiDocs] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-collapsed");
    if (savedState) {
        setIsCollapsed(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    if (!isApiDocsPage) {
        setUserHasClosedApiDocs(false);
    }
  }, [isApiDocsPage]);
  
  const isApiDocsNavOpen = isApiDocsPage && !userHasClosedApiDocs;
  
  const handleApiDocsToggle = (e: React.MouseEvent) => {
    if (isApiDocsPage) {
      e.preventDefault();
      setUserHasClosedApiDocs(prev => !prev);
    }
  };


  if (profileLoading || !profile) {
    return (
        <div className="hidden border-r bg-background md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                 {/* Placeholder */}
            </div>
        </div>
    );
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
        { href: '/dashboard/address-book', label: 'My Address Book', icon: BookUser },
        isAdminOrStaff 
          ? { href: '/dashboard/admin/bookings', label: 'Manage Shipments', icon: ClipboardList }
          : { href: '/dashboard/my-shipments', label: 'My Shipments', icon: History },
        ...(!isAdminOrStaff ? [{ href: '/dashboard/my-packages', label: 'My Packages', icon: Package }] : []),
      ]
    }
  ];
  
  // Customer-only tracking nav items
  const customerTrackingNavItems = !isAdminOrStaff ? {
    title: 'Tracking & Orders',
    links: [
      { href: '/dashboard/tracking-receipts', label: 'Tracking Receipts', icon: Receipt },
      { href: '/dashboard/my-invoices', label: 'Invoices', icon: FileText },
      { href: '/dashboard/collection-point', label: 'Collection Point', icon: MapPin },
      { href: '/dashboard/delivered', label: 'Delivered Items', icon: CheckCircle2 },
    ],
  } : null;

  const resourcesNavItems = {
      title: 'Resources',
      links: [
        { href: '/dashboard/knowledge-base', label: 'Knowledge Base', icon: BookOpenCheck },
      ]
  };
  
  const getAdminNavGroups = () => {
    if (!isAdmin) return null;
    return [
      {
        title: 'Logistics',
        links: [
          { href: '/dashboard/admin/batch-add-package', label: 'Batch Add Package', icon: Package },
          { href: '/dashboard/admin/importer', label: 'Inbound Packages', icon: MailCheck },
          { href: '/dashboard/admin/book-shipment', label: 'Book Shipment', icon: Truck },
          { href: '/dashboard/admin/weekly-shipments', label: 'Weekly Shipments', icon: PackagePlus },
        ],
      },
      {
        title: 'Management',
        links: [
          { href: '/dashboard/admin/bookings', label: 'Manage Shipments', icon: ClipboardList },
          { href: '/dashboard/admin/users', label: 'Manage Users', icon: Users },
          { href: '/dashboard/admin/staff', label: 'Staff & Roles', icon: ShieldCheck },
          { href: '/dashboard/admin/invoices', label: 'Invoices', icon: FileText },
          { href: '/dashboard/admin/reports', label: 'Reports', icon: FileText },
          { href: '/dashboard/admin/finance', label: 'Finance', icon: Banknote },
        ],
      },
      {
        title: 'Settings',
        links: [
          { href: '/dashboard/admin/pricing', label: 'Pricing', icon: Coins },
          { href: '/dashboard/admin/services', label: 'Services', icon: Wrench },
          { href: '/dashboard/admin/email', label: 'Email', icon: Mail },
          { href: '/dashboard/admin/api-usage', label: 'API Usage', icon: Activity },
          { href: '/dashboard/admin/api-test', label: 'API Test Bed', icon: Beaker },
        ],
      },
    ];
  };

  const getSettingsLinks = () => {
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

  
  const toggleCollapse = () => {
    setIsCollapsed(prevState => {
        const newState = !prevState;
        localStorage.setItem("sidebar-collapsed", JSON.stringify(newState));
        return newState;
    });
  }

  return (
    <div className={cn("relative flex h-full max-h-screen flex-col border-r bg-background transition-all duration-300 md:sticky md:top-0", isCollapsed ? "w-16" : "w-[220px] lg:w-[280px]")}>
       <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-lg">
          <Image src="/logo.png" alt="County Cargo logo" width={24} height={24} />
          <span className={cn("transition-opacity duration-300", isCollapsed && "opacity-0 w-0")}>County Cargo</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
          <nav className={cn("grid items-start text-sm font-medium space-y-4", isCollapsed ? "px-2" : "px-2 lg:px-4")}>
            {navItems.map((item, index) => (
              <div key={index}>
                 <h3 className={cn("py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider", isCollapsed ? "hidden" : "px-3")}>{item.title}</h3>
                 <div className="grid gap-1">
                    {item.links.map(link => (
                      <NavLink key={link.href} href={link.href} pathname={pathname} icon={link.icon} isCollapsed={isCollapsed}>
                        {link.label}
                      </NavLink>
                    ))}
                  </div>
              </div>
            ))}
             <div>
               <h3 className={cn("py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider", isCollapsed ? "hidden" : "px-3")}>{resourcesNavItems.title}</h3>
               <div className="grid gap-1">
                  {resourcesNavItems.links.map(link => (
                    <NavLink key={link.href} href={link.href} pathname={pathname} icon={link.icon} isCollapsed={isCollapsed}>
                      {link.label}
                    </NavLink>
                  ))}
                </div>
            </div>
             {customerTrackingNavItems && (
               <div>
                 <h3 className={cn("py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider", isCollapsed ? "hidden" : "px-3")}>{customerTrackingNavItems.title}</h3>
                 <div className="grid gap-1">
                   {customerTrackingNavItems.links.map(link => (
                     <NavLink key={link.href} href={link.href} pathname={pathname} icon={link.icon} isCollapsed={isCollapsed}>
                       {link.label}
                     </NavLink>
                   ))}
                 </div>
               </div>
             )}
             {!isAdminOrStaff && <ContactLinks isCollapsed={isCollapsed} />}
             {isBusiness && (
                <div>
                    <h3 className={cn("py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider", isCollapsed ? "hidden" : "px-3")}>Developer</h3>
                    <div className="grid gap-1">
                        {isCollapsed ? (
                             <NavLink href="/dashboard/api-docs" pathname={pathname} icon={FileCode} isCollapsed={isCollapsed}>
                                API Docs
                            </NavLink>
                        ) : (
                            <Collapsible
                                open={isApiDocsNavOpen}
                                onOpenChange={(isOpen) => {
                                    if(isApiDocsPage) {
                                        setUserHasClosedApiDocs(!isOpen);
                                    }
                                }}
                                className="w-full"
                            >
                                <CollapsibleTrigger asChild>
                                    <Link
                                        href="/dashboard/api-docs"
                                        onClick={handleApiDocsToggle}
                                        className={cn(
                                            "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted",
                                             isApiDocsPage && "text-foreground bg-muted font-semibold"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileCode className="h-4 w-4" />
                                            API Docs
                                        </div>
                                        <ChevronRight className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isApiDocsNavOpen && "rotate-90")} />
                                    </Link>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <nav className="grid gap-1 pl-7 pr-3 py-1">
                                        <Link href="/dashboard/api-docs#authentication" className="block rounded-md py-2 px-2 text-sm transition-colors hover:bg-muted/50 text-muted-foreground">Authentication</Link>
                                        <Link href="/dashboard/api-docs#webhooks" className="block rounded-md py-2 px-2 text-sm transition-colors hover:bg-muted/50 text-muted-foreground">Webhooks</Link>
                                        <Link href="/dashboard/api-docs#get-estimate" className="block rounded-md py-2 px-2 text-sm transition-colors hover:bg-muted/50 text-muted-foreground">Get Estimate</Link>
                                        <Link href="/dashboard/api-docs#create-shipment" className="block rounded-md py-2 px-2 text-sm transition-colors hover:bg-muted/50 text-muted-foreground">Create Shipment</Link>
                                        <Link href="/dashboard/api-docs#get-shipment" className="block rounded-md py-2 px-2 text-sm transition-colors hover:bg-muted/50 text-muted-foreground">Get Shipment</Link>
                                        <Link href="/dashboard/api-docs#list-shipments" className="block rounded-md py-2 px-2 text-sm transition-colors hover:bg-muted/50 text-muted-foreground">List Shipments</Link>
                                        <Link href="/dashboard/api-docs#cancel-shipment" className="block rounded-md py-2 px-2 text-sm transition-colors hover:bg-muted/50 text-muted-foreground">Cancel Shipment</Link>

                                        <Link href="/dashboard/api-docs#bulk-estimate" className="block rounded-md py-2 px-2 text-sm transition-colors hover:bg-muted/50 text-muted-foreground">Bulk Estimate</Link>
                                        <Link href="/dashboard/api-docs#bulk-create" className="block rounded-md py-2 px-2 text-sm transition-colors hover:bg-muted/50 text-muted-foreground">Bulk Create</Link>
                                    </nav>
                                </CollapsibleContent>
                            </Collapsible>
                        )}
                    </div>
                </div>
            )}
             {/* Admin grouped nav */}
             {isAdmin && (getAdminNavGroups() ?? []).map((group) => (
               <div key={group.title}>
                 <h3 className={cn("py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider", isCollapsed ? "hidden" : "px-3")}>{group.title}</h3>
                 <div className="grid gap-1">
                   {group.links.map(link => (
                     <NavLink key={link.href} href={link.href} pathname={pathname} icon={link.icon} isCollapsed={isCollapsed}>
                       {link.label}
                     </NavLink>
                   ))}
                 </div>
               </div>
             ))}
             {/* Staff single section */}
             {isStaff && settingsNavItems.links.length > 0 && (
               <div>
                 <h3 className={cn("py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider", isCollapsed ? "hidden" : "px-3")}>{settingsNavItems.title}</h3>
                 <div className="grid gap-1">
                   {settingsNavItems.links.map(link => (
                     <NavLink key={link.href} href={link.href} pathname={pathname} icon={link.icon} isCollapsed={isCollapsed}>
                       {link.label}
                     </NavLink>
                   ))}
                 </div>
               </div>
             )}
          </nav>
      </div>
       <div className="mt-auto p-4 border-t">
          <div className={cn("flex items-center", isCollapsed ? 'justify-center' : 'justify-between')}>
             <div className={cn("text-xs text-muted-foreground text-center", isCollapsed && "hidden")}>
                Powered by <a href="https://nocodek.com" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">Nocodek</a>
             </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={toggleCollapse}>
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </div>
      </div>
    </div>
  )
}
