import Link from 'next/link';
import { Package, FileText, CreditCard, Truck, MapPin, CheckCircle2 } from 'lucide-react';

const tabs = [
  { href: '/dashboard/my-packages', label: 'My Packages', icon: Package },
  { href: '/dashboard/my-packages/receipts', label: 'Tracking Receipts', icon: FileText },
  { href: '/dashboard/my-packages/invoices', label: 'Invoices', icon: CreditCard },
  { href: '/dashboard/my-packages/shipments', label: 'Shipments', icon: Truck },
  { href: '/dashboard/my-packages/collection', label: 'Collection Point', icon: MapPin },
  { href: '/dashboard/my-packages/delivered', label: 'Delivered', icon: CheckCircle2 },
];

export default function MyPackagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0">
      {/* Sub-navigation tabs */}
      <div className="border-b bg-white dark:bg-card mb-6 -mx-4 px-4 overflow-x-auto">
        <nav className="flex gap-1 min-w-max">
          {tabs.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-t-lg transition-colors whitespace-nowrap border-b-2 border-transparent data-[active=true]:border-blue-600 data-[active=true]:text-blue-700"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
      {children}
    </div>
  );
}
