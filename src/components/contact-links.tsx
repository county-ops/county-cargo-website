
'use client';

import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);


const NavLink = ({ href, pathname, children, icon: Icon, isCollapsed, isExternal, onLinkClick }: { href: string, pathname: string, children: React.ReactNode, icon: React.ElementType, isCollapsed: boolean, isExternal?: boolean, onLinkClick?: () => void }) => {
    const isActive = !isExternal && (href === '/dashboard' ? pathname === href : pathname.startsWith(href));
    
    const linkProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

    const handleClick = () => {
        if (onLinkClick) {
            onLinkClick();
        }
    };

    if (isCollapsed) {
        return (
            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                        <Link
                            href={href}
                            className={cn(
                                "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground",
                                isActive && "bg-accent text-accent-foreground"
                            )}
                            {...linkProps}
                            onClick={handleClick}
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
    
    // For mobile (non-collapsed) view
    if (!isCollapsed) {
        return (
            <Link
                href={href}
                className={cn(
                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                    isActive && "bg-muted text-foreground"
                )}
                {...linkProps}
                onClick={handleClick}
            >
                <Icon className="h-5 w-5" />
                {children}
            </Link>
        )
    }

    // For desktop (non-collapsed) view
    return (
        <Link
        href={href}
        className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted",
            isActive && "bg-muted"
        )}
        {...linkProps}
        onClick={handleClick}
        >
        <Icon className="h-4 w-4" />
        {children}
        </Link>
    );
};


interface ContactLinksProps {
    isCollapsed: boolean;
    onLinkClick?: () => void;
}

export default function ContactLinks({ isCollapsed, onLinkClick }: ContactLinksProps) {
    const pathname = usePathname();
    const WHATSAPP_NUMBER = '2348110000425';
    const CALL_NUMBER = '2348110000421';

    const contactLinks = [
        { href: `https://wa.me/${WHATSAPP_NUMBER}`, label: 'WhatsApp', icon: WhatsappIcon, isExternal: true },
        { href: 'mailto:info@countycargo.com', label: 'Email', icon: Mail, isExternal: true },
        { href: `tel:+${CALL_NUMBER}`, label: 'Call', icon: Phone, isExternal: true },
    ];
    
    const iconClass = isCollapsed ? 'h-4 w-4' : 'h-4 w-4';

    if (isCollapsed) {
        return (
            <div>
                 <h3 className={cn("py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider", isCollapsed ? "hidden" : "px-3")}>Contact Us</h3>
                 <div className="grid gap-1">
                    {contactLinks.map(link => (
                      <NavLink key={link.href} href={link.href} pathname={pathname} icon={link.icon} isCollapsed={isCollapsed} isExternal={link.isExternal}>
                        {link.label}
                      </NavLink>
                    ))}
                  </div>
              </div>
        )
    }

    return (
        <div>
           <h3 className={cn("px-3 py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider", isCollapsed ? "hidden" : "px-3")}>Contact Us</h3>
           <div className="grid gap-1">
              {contactLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onLinkClick}
                  >
                    <link.icon className={iconClass} />
                    {link.label}
                  </Link>
              ))}
            </div>
        </div>
    );
}
