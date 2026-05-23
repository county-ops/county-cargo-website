'use client';

import React from 'react';
import { UserProfile } from '@/lib/types';
import { Phone, Building, Home, User as UserIcon, Globe, Webhook } from 'lucide-react';

const DetailItem = ({ icon: Icon, label, value, className }: { icon: React.ElementType, label: string, value: React.ReactNode, className?: string }) => (
    <div className={`flex items-start gap-3 ${className}`}>
        <Icon className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
        <div className="flex flex-col">
            <span className="text-xs font-medium text-muted-foreground">{label}</span>
            <span className="text-sm font-semibold break-all">{value || 'N/A'}</span>
        </div>
    </div>
);

const DetailSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{title}</h4>
        <div className="space-y-4">{children}</div>
    </div>
);

interface UserDetailsProps {
  user: UserProfile;
}

export const UserDetails = ({ user }: UserDetailsProps) => {
    const fullAddress = [user.address, user.city, user.state, user.zipCode].filter(Boolean).join(', ');

    return (
        <div className="p-6 grid gap-8 md:grid-cols-3 bg-muted/20 animate-in fade-in slide-in-from-top-2 duration-300">
            <DetailSection title="Personal Info">
                <DetailItem icon={Phone} label="Primary Phone" value={user.phone_number} />
                {user.phone2 && <DetailItem icon={Phone} label="Secondary Phone" value={user.phone2} />}
                {user.company && <DetailItem icon={Building} label="Company" value={user.company} />}
                <DetailItem icon={Home} label="Address" value={fullAddress || 'N/A'} />
            </DetailSection>

            <DetailSection title="Account Details">
                <DetailItem icon={Globe} label="Country of Residence" value={user.country} />
                {user.referrer && <DetailItem icon={UserIcon} label="Referral Source" value={user.referrer} />}
            </DetailSection>
            
            <DetailSection title="API Access">
                {user.role === 'Business' && user.webhookUrl && (
                    <DetailItem icon={Webhook} label="Webhook URL" value={user.webhookUrl} />
                )}
            </DetailSection>
        </div>
    );
};
