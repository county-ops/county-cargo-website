
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
  FormMessage,
} from "@/components/ui/form"
import { Loader2, Save, Tags } from "lucide-react"
import { saveEmailSettings, EmailSettings } from "@/lib/email-settings"
import { Switch } from "@/components/ui/switch"
import { useProfile } from "@/components/profile-provider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

const emailTemplateSchema = z.object({
  enabled: z.boolean(),
  subject: z.string().min(1, "Subject is required."),
  htmlBody: z.string().min(1, "Email body is required."),
});

const emailSettingsSchema = z.object({
  welcomeEmail: emailTemplateSchema,
  newBookingConfirmation: emailTemplateSchema,
  receivedAtHub: emailTemplateSchema,
  shipmentStatusUpdate: emailTemplateSchema,
  paymentConfirmation: emailTemplateSchema,
  adminBookingInvoice: emailTemplateSchema,
  packageReceivedNotification: emailTemplateSchema,
});

type EmailSettingsFormValues = z.infer<typeof emailSettingsSchema>

interface EmailSettingsFormProps {
  defaultValues: EmailSettings;
}

const TemplatePlaceholders: Record<keyof EmailSettingsFormValues, string[]> = {
  welcomeEmail: ["{{firstname}}"],
  newBookingConfirmation: ["{{firstname}}", "{{shipmentId}}"],
  receivedAtHub: ["{{firstname}}", "{{shipmentId}}", "{{packageDetails}}"],
  shipmentStatusUpdate: ["{{firstname}}", "{{shipmentId}}", "{{status}}"],
  paymentConfirmation: ["{{firstname}}", "{{shipmentId}}"],
  adminBookingInvoice: ["{{firstname}}", "{{shipmentId}}", "{{totalCost}}"],
  packageReceivedNotification: ["{{firstname}}", "{{trackingNumber}}", "{{location}}"],
};

export default function EmailSettingsForm({ defaultValues }: EmailSettingsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { profile, user, profileLoading } = useProfile();
  
  const form = useForm<EmailSettingsFormValues>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: EmailSettingsFormValues) {
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
      await saveEmailSettings(data);
      toast({
        title: "Settings Saved!",
        description: "Your email notification settings have been updated.",
      });
    } catch (error) {
      console.error("Failed to save email settings:", error);
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
        <Accordion type="multiple" className="w-full space-y-4">

          {/* Welcome Email */}
          <AccordionItem value="welcome-email" className="border rounded-lg px-4">
            <AccordionTrigger className="text-lg font-medium hover:no-underline">Welcome Email</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-6">
              <FormField
                control={form.control}
                name="welcomeEmail.enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Send Welcome Emails</FormLabel>
                      <FormDescription>Send an email when a new customer signs up.</FormDescription>
                    </div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="welcomeEmail.subject"
                render={({ field }) => (
                  <FormItem><FormLabel>Subject</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="welcomeEmail.htmlBody"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Body</FormLabel>
                    <FormControl><Textarea {...field} rows={8} /></FormControl>
                    <div className="flex items-center gap-2 pt-1">
                      <Tags className="h-4 w-4 text-muted-foreground" />
                      <div className="text-xs text-muted-foreground flex items-center gap-1">Available placeholders: {TemplatePlaceholders.welcomeEmail.map(p => <Badge variant="secondary" key={p}>{p}</Badge>)}</div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>

          {/* New Booking Confirmation */}
          <AccordionItem value="new-booking" className="border rounded-lg px-4">
            <AccordionTrigger className="text-lg font-medium hover:no-underline">New Booking Confirmation (Customer)</AccordionTrigger>
             <AccordionContent className="pt-4 space-y-6">
              <FormField
                control={form.control}
                name="newBookingConfirmation.enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Send Booking Confirmations</FormLabel>
                      <FormDescription>Send an email when a customer books a new shipment themselves.</FormDescription>
                    </div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newBookingConfirmation.subject"
                render={({ field }) => (
                  <FormItem><FormLabel>Subject</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newBookingConfirmation.htmlBody"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Body</FormLabel>
                    <FormControl><Textarea {...field} rows={8} /></FormControl>
                     <div className="flex items-center gap-2 pt-1">
                      <Tags className="h-4 w-4 text-muted-foreground" />
                      <div className="text-xs text-muted-foreground flex items-center gap-1">Available placeholders: {TemplatePlaceholders.newBookingConfirmation.map(p => <Badge variant="secondary" key={p}>{p}</Badge>)}</div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Admin Booking Invoice */}
          <AccordionItem value="admin-booking" className="border rounded-lg px-4">
            <AccordionTrigger className="text-lg font-medium hover:no-underline">Admin Booking Invoice</AccordionTrigger>
             <AccordionContent className="pt-4 space-y-6">
              <FormField
                control={form.control}
                name="adminBookingInvoice.enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Send Invoices for Admin Bookings</FormLabel>
                      <FormDescription>Send an email with payment info when an admin books for a customer.</FormDescription>
                    </div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="adminBookingInvoice.subject"
                render={({ field }) => (
                  <FormItem><FormLabel>Subject</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="adminBookingInvoice.htmlBody"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Body</FormLabel>
                    <FormControl><Textarea {...field} rows={8} /></FormControl>
                     <div className="flex items-center gap-2 pt-1">
                      <Tags className="h-4 w-4 text-muted-foreground" />
                      <div className="text-xs text-muted-foreground flex items-center gap-1">Available placeholders: {TemplatePlaceholders.adminBookingInvoice.map(p => <Badge variant="secondary" key={p}>{p}</Badge>)}</div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
          
          {/* Inbound Package Received */}
          <AccordionItem value="package-received" className="border rounded-lg px-4">
            <AccordionTrigger className="text-lg font-medium hover:no-underline">Inbound Package Received</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-6">
              <FormField
                control={form.control}
                name="packageReceivedNotification.enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Send Inbound Package Notifications</FormLabel>
                      <FormDescription>Send an email when a customer's package is logged at a warehouse (before shipment creation).</FormDescription>
                    </div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="packageReceivedNotification.subject"
                render={({ field }) => (
                  <FormItem><FormLabel>Subject</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="packageReceivedNotification.htmlBody"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Body</FormLabel>
                    <FormControl><Textarea {...field} rows={8} /></FormControl>
                    <div className="flex items-center gap-2 pt-1">
                      <Tags className="h-4 w-4 text-muted-foreground" />
                      <div className="text-xs text-muted-foreground flex items-center gap-1">Available placeholders: {TemplatePlaceholders.packageReceivedNotification.map(p => <Badge variant="secondary" key={p}>{p}</Badge>)}</div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>


          {/* Received at Hub */}
          <AccordionItem value="received-at-hub" className="border rounded-lg px-4">
            <AccordionTrigger className="text-lg font-medium hover:no-underline">Package Received at Hub (Shipment)</AccordionTrigger>
             <AccordionContent className="pt-4 space-y-6">
              <FormField
                control={form.control}
                name="receivedAtHub.enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Send Package Receipt Confirmations</FormLabel>
                      <FormDescription>Send a detailed email when a customer's package arrives at a facility.</FormDescription>
                    </div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="receivedAtHub.subject"
                render={({ field }) => (
                  <FormItem><FormLabel>Subject</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="receivedAtHub.htmlBody"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Body</FormLabel>
                    <FormControl><Textarea {...field} rows={8} /></FormControl>
                     <div className="flex items-center gap-2 pt-1">
                      <Tags className="h-4 w-4 text-muted-foreground" />
                      <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-1">Available placeholders: {TemplatePlaceholders.receivedAtHub.map(p => <Badge variant="secondary" key={p}>{p}</Badge>)}</div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>


          {/* Shipment Status Update */}
          <AccordionItem value="status-update" className="border rounded-lg px-4">
            <AccordionTrigger className="text-lg font-medium hover:no-underline">Shipment Status Update</AccordionTrigger>
             <AccordionContent className="pt-4 space-y-6">
              <FormField
                control={form.control}
                name="shipmentStatusUpdate.enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Send Status Updates</FormLabel>
                      <FormDescription>Send a generic email when a shipment's status is updated.</FormDescription>
                    </div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shipmentStatusUpdate.subject"
                render={({ field }) => (
                  <FormItem><FormLabel>Subject</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shipmentStatusUpdate.htmlBody"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Body</FormLabel>
                    <FormControl><Textarea {...field} rows={8} /></FormControl>
                     <div className="flex items-center gap-2 pt-1">
                      <Tags className="h-4 w-4 text-muted-foreground" />
                      <div className="text-xs text-muted-foreground flex items-center gap-1">Available placeholders: {TemplatePlaceholders.shipmentStatusUpdate.map(p => <Badge variant="secondary" key={p}>{p}</Badge>)}</div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
          
          {/* Payment Confirmation */}
          <AccordionItem value="payment-confirmation" className="border rounded-lg px-4">
            <AccordionTrigger className="text-lg font-medium hover:no-underline">Payment Confirmation</AccordionTrigger>
             <AccordionContent className="pt-4 space-y-6">
              <FormField
                control={form.control}
                name="paymentConfirmation.enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Send Payment Confirmations</FormLabel>
                      <FormDescription>Send an email when a shipment's payment is confirmed.</FormDescription>
                    </div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentConfirmation.subject"
                render={({ field }) => (
                  <FormItem><FormLabel>Subject</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentConfirmation.htmlBody"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Body</FormLabel>
                    <FormControl><Textarea {...field} rows={8} /></FormControl>
                     <div className="flex items-center gap-2 pt-1">
                      <Tags className="h-4 w-4 text-muted-foreground" />
                      <div className="text-xs text-muted-foreground flex items-center gap-1">Available placeholders: {TemplatePlaceholders.paymentConfirmation.map(p => <Badge variant="secondary" key={p}>{p}</Badge>)}</div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>

        </Accordion>
        
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
