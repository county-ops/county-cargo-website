'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/components/profile-provider";
import { generateApiKeyForCurrentUser } from "@/lib/user-actions";
import { Loader2, ShieldCheck, FileText, Lock, AlertCircle, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function SlaPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user, profile } = useProfile();
    const router = useRouter();

    useEffect(() => {
        document.title = "API Service Level Agreement | County Cargo";
    }, []);
    
    // Redirect if user already has an API key
    useEffect(() => {
        if (profile?.apiKey) {
            router.replace('/dashboard/settings/profile');
        }
    }, [profile, router]);


    const handleAgree = async () => {
        if (!user) {
            toast({ variant: "destructive", title: "You are not logged in." });
            return;
        }
        setIsSubmitting(true);
        try {
            await generateApiKeyForCurrentUser(user.uid);
            toast({
                title: "API Key Generated!",
                description: "You will now be redirected to your profile to view your keys.",
            });
            router.push('/dashboard/settings/profile');
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error Generating Keys",
                description: error.message || "An unexpected error occurred.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const sections = [
        {
            title: "1. Service Availability & Uptime",
            icon: ShieldCheck,
            content: "County Cargo commits to a monthly uptime percentage of at least 99.5% for the Business API. Uptime calculation excludes scheduled maintenance, which will be announced at least 48 hours in advance via email or dashboard notification. This commitment does not cover issues resulting from external network failures or improper integration by the user."
        },
        {
            title: "2. Technical Support",
            icon: Info,
            content: "Dedicated technical support for API integration is available via email at info@countycargo.com. For Business accounts, we strive to provide an initial response to critical technical issues within 24 business hours and non-critical inquiries within 48 business hours."
        },
        {
            title: "3. Rate Limiting & Performance",
            icon: AlertCircle,
            content: "To ensure system stability and fair resource allocation, the API is subject to a rate limit of 60 requests per minute per API key. Exceeding this limit will result in temporary '429 Too Many Requests' errors. County Cargo reserves the right to adjust these limits or implement additional throttling measures during peak periods or in response to detected abuse."
        },
        {
            title: "4. Security & API Key Management",
            icon: Lock,
            content: "Users are solely responsible for maintaining the confidentiality of their Production and Staging API keys. Any action taken through your API key is deemed authorized by your account. If you suspect a key has been compromised, you must immediately regenerate it in your profile settings. County Cargo staff will never ask for your private API keys."
        },
        {
            title: "5. Data Accuracy & Estimates",
            icon: FileText,
            content: "Shipping estimates provided via the API are calculated based on current rates and the dimensions provided. These estimates are non-binding. The final billable amount is determined upon physical verification of the shipment at a County Cargo facility and may include adjustments for weight discrepancies or additional applicable surcharges."
        },
        {
            title: "6. Prohibited Activities",
            icon: AlertCircle,
            content: "You may not use the API to: (a) reverse-engineer or attempt to extract source code; (b) resell the API access as a standalone service; (c) scrape or crawl the system for competitive pricing data; (d) submit fraudulent shipment data; or (e) bypass any security or rate-limiting features. Violations will result in immediate suspension of API access."
        },
        {
            title: "7. Data Privacy & Webhooks",
            icon: ShieldCheck,
            content: "Users are responsible for the security of their configured Webhook URLs. County Cargo will transmit shipment status updates to these URLs. You agree to process any personal data received through the API in accordance with applicable data protection laws and the County Cargo Privacy Policy."
        },
        {
            title: "8. Limitation of Liability",
            icon: AlertCircle,
            content: "The API is provided 'as is' without warranties of any kind. County Cargo shall not be liable for any indirect, incidental, or consequential damages resulting from the use of, or inability to use, the API, including but not limited to loss of profits, business interruption, or shipping delays."
        }
    ];

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto py-6">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <h1 className="font-bold text-2xl md:text-3xl tracking-tight">Service Level Agreement</h1>
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">Version 1.1</Badge>
                </div>
                <p className="text-muted-foreground">
                    Please review our Business API terms carefully. By generating your keys, you agree to these conditions.
                </p>
            </div>

            <Card className="border-2">
                <CardHeader className="bg-muted/30 border-b pb-8">
                    <CardTitle>County Cargo Business API Terms of Service</CardTitle>
                    <CardDescription className="text-base pt-2">
                        Last Updated: February 2026
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-8 space-y-8">
                    {sections.map((section, index) => (
                        <div key={index} className="space-y-3">
                            <div className="flex items-center gap-2 text-foreground font-bold">
                                <section.icon className="h-5 w-5 text-primary" />
                                <h3 className="text-lg">{section.title}</h3>
                            </div>
                            <p className="text-sm leading-relaxed text-muted-foreground pl-7">
                                {section.content}
                            </p>
                            {index < sections.length - 1 && <Separator className="mt-6 opacity-50" />}
                        </div>
                    ))}

                    <div className="rounded-lg bg-blue-50 p-6 border border-blue-100 mt-10">
                        <div className="flex gap-4">
                            <Info className="h-6 w-6 text-blue-600 shrink-0" />
                            <div className="space-y-2">
                                <h4 className="font-bold text-blue-900">Ready to start?</h4>
                                <p className="text-sm text-blue-800 leading-relaxed">
                                    Upon clicking the button below, we will generate both a <strong>Staging Key</strong> (for development) and a <strong>Production Key</strong> (for real shipments). You can manage and regenerate these at any time in your profile.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex flex-col items-center gap-4">
                        <Button 
                            onClick={handleAgree} 
                            disabled={isSubmitting} 
                            size="lg" 
                            className="w-full sm:w-auto px-12 h-14 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
                        >
                            {isSubmitting ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <ShieldCheck className="mr-2 h-5 w-5" />
                            )}
                            Agree and Generate API Keys
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                            By clicking, you acknowledge that you have read and understood the terms above.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
