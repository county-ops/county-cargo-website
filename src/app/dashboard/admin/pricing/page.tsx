
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PricingForm from "./pricing-form";
import { Coins, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getSettings, AppSettings } from "@/lib/settings";

export default function PricingSettingsPage() {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Pricing Settings | County Cargo";
    async function fetchSettings() {
      try {
        const fetchedSettings = await getSettings();
        setSettings(fetchedSettings);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
        // Optionally handle error state in UI
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  return (
    <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
            <h1 className="font-semibold text-lg md:text-2xl">Pricing Settings</h1>
        </div>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Coins className="h-6 w-6" />
                    Pricing & Exchange Rates
                </CardTitle>
                <CardDescription>
                    Adjust the rates, fees, and exchange rates for all shipments. 
                    These values will be used in the "Get Estimate" calculation.
                </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : settings ? (
                <PricingForm defaultValues={settings} />
              ) : (
                <p className="text-center text-destructive">Could not load settings.</p>
              )}
            </CardContent>
        </Card>
    </div>
  )
}
