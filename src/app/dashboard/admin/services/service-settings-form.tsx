
'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Loader2, Save } from "lucide-react"
import { saveServiceSettings } from "@/lib/service-settings"
import { Switch } from "@/components/ui/switch"
import { useProfile } from "@/components/profile-provider"

const serviceSettingsSchema = z.object({
  expressExport: z.boolean().default(false),
  valueExport: z.boolean().default(false),
  valueImport: z.boolean().default(false),
  expressImport: z.boolean().default(false),
  pickupRequestEnabled: z.boolean().default(true),
});

type ServiceSettingsFormValues = z.infer<typeof serviceSettingsSchema>

interface ServiceSettingsFormProps {
  defaultValues: Partial<ServiceSettingsFormValues>;
}

export default function ServiceSettingsForm({ defaultValues }: ServiceSettingsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { profile, user, profileLoading } = useProfile();
  
  const form = useForm<ServiceSettingsFormValues>({
    resolver: zodResolver(serviceSettingsSchema),
    defaultValues: {
      expressExport: defaultValues.expressExport ?? true,
      valueExport: defaultValues.valueExport ?? false,
      valueImport: defaultValues.valueImport ?? true,
      expressImport: defaultValues.expressImport ?? false,
      pickupRequestEnabled: defaultValues.pickupRequestEnabled ?? true,
    },
    mode: "onChange",
  });

  async function onSubmit(data: ServiceSettingsFormValues) {
    if (!user || profile?.role !== 'Admin') {
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: "You must be an administrator to save settings."
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await saveServiceSettings(data);
      toast({
        title: "Settings Saved!",
        description: "Your service availability has been updated.",
      });
    } catch (error) {
      console.error("Failed to save service settings:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save settings. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Export Services</h3>
          <div className="space-y-6 pt-2 border p-4 rounded-lg">
            <FormField
              control={form.control}
              name="expressExport"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Express Export</FormLabel>
                    <FormDescription>
                      Allows users to ship from Nigeria to other countries (via DHL).
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="valueExport"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Value Export</FormLabel>
                    <FormDescription>
                      A more affordable export option for the USA & UK.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Import Services</h3>
          <div className="space-y-6 pt-2 border p-4 rounded-lg">
            <FormField
              control={form.control}
              name="valueImport"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Value Import</FormLabel>
                    <FormDescription>
                      Allows users to import from the US & UK to Nigeria.
                    </FormDescription>
                  </div>
                  <FormControl>
                     <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="expressImport"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Express Import</FormLabel>
                    <FormDescription>
                       (Not yet integrated) Allows users to import from other countries to Nigeria (via DHL).
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Additional Services</h3>
          <div className="space-y-6 pt-2 border p-4 rounded-lg">
            <FormField
              control={form.control}
              name="pickupRequestEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Enable Pickup Requests</FormLabel>
                    <FormDescription>
                      Allow customers to request shipment pickup within Lagos.
                    </FormDescription>
                  </div>
                  <FormControl>
                     <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg" disabled={isSubmitting || profileLoading}>
            {isSubmitting || profileLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Save className="mr-2 h-5 w-5" />
            )}
            Save Settings
          </Button>
        </div>
      </form>
    </Form>
  )
}
