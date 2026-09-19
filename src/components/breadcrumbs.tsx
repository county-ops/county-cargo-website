import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { JsonLd } from './json-ld';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  currentUrl?: string;
}

export function Breadcrumbs({ items, currentUrl }: BreadcrumbsProps) {
  const allItems = [{ label: 'Home', href: '/' }, ...items];

  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => {
      const isLast = index === allItems.length - 1;
      const targetUrl = item.href
        ? `https://countycargo.com${item.href}`
        : isLast && currentUrl
        ? currentUrl
        : undefined;

      const listItem: Record<string, unknown> = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
      };

      if (targetUrl) {
        listItem.item = targetUrl;
      }

      return listItem;
    }),
  };

  return (
    <>
      <JsonLd data={breadcrumbListSchema} />
      <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 bg-gray-50/80 border-b border-gray-200/80 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-1.5 text-gray-600">
          <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors font-medium">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <div key={idx} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                {isLast || !item.href ? (
                  <span className="font-semibold text-secondary truncate max-w-[200px] sm:max-w-xs">{item.label}</span>
                ) : (
                  <Link href={item.href} className="hover:text-primary transition-colors font-medium truncate max-w-[150px] sm:max-w-xs">
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
