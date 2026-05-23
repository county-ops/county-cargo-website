
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ServiceSettingsForm from "./service-settings-form";
import { Wrench, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getServiceSettings, ServiceSettings } from "@/lib/service-settings";

export default function ServiceSettingsPage() {
  const [settings, setSettings] = useState<ServiceSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Service Settings | County Cargo";
    async function fetchSettings() {
      try {
        const fetchedSettings = await getServiceSettings();
        setSettings(fetchedSettings);
      } catch (error) {
        console.error("Failed to fetch service settings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  return (
    <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
            <h1 className="font-semibold text-lg md:text-2xl">Service Settings</h1>
        </div>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-6 w-6" />
                    Available Shipping Services
                </CardTitle>
                <CardDescription>
                    Enable or disable the shipping services available to customers on the booking page.
                </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : settings ? (
                <ServiceSettingsForm defaultValues={settings} />
              ) : (
                <p className="text-center text-destructive">Could not load service settings.</p>
              )}
            </CardContent>
        </Card>
    </div>
  )
}
