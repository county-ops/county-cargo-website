
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EmailSettingsForm from "./email-settings-form";
import { Mail, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getEmailSettings, EmailSettings } from "@/lib/email-settings";

export default function EmailSettingsPage() {
  const [settings, setSettings] = useState<EmailSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Email Settings | County Cargo";
    async function fetchSettings() {
      try {
        const fetchedSettings = await getEmailSettings();
        setSettings(fetchedSettings);
      } catch (error) {
        console.error("Failed to fetch email settings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  return (
    <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
            <h1 className="font-semibold text-lg md:text-2xl">Email Settings</h1>
        </div>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Mail className="h-6 w-6" />
                    Email Notifications
                </CardTitle>
                <CardDescription>
                    Enable or disable automated emails sent to customers.
                </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : settings ? (
                <EmailSettingsForm defaultValues={settings} />
              ) : (
                <p className="text-center text-destructive">Could not load email settings.</p>
              )}
            </CardContent>
        </Card>
    </div>
  )
}
