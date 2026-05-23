

'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
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
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Loader2, Save, PlusCircle, X, Trash2, Coins } from "lucide-react"
import { saveSettings, AppSettings, ApplicableService } from "@/lib/settings"
import { useProfile } from "@/components/profile-provider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

const additionalChargeSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Charge name is required."),
  appliesTo: z.array(z.string()).min(1, "At least one service must be selected."),
  type: z.enum(['percentage_declared_value', 'percentage_shipment_cost', 'fixed_ngn']),
  value: z.coerce.number().min(0, "Value must be non-negative."),
  enabled: z.boolean(),
});

const pricingFormSchema = z.object({
  // Import
  usToLagosRate: z.coerce.number().min(0, "Rate must be positive."),
  usToOtherRate: z.coerce.number().min(0, "Rate must be positive."),
  usMinWeight: z.coerce.number().min(0, "Weight must be positive."),
  ukToLagosRate: z.coerce.number().min(0, "Rate must be positive."),
  ukToOtherRate: z.coerce.number().min(0, "Rate must be positive."),
  ukCargoRatePerKg: z.coerce.number().min(0, "Rate must be positive."),
  ukHandlingFee: z.coerce.number().min(0, "Fee must be positive."),
  ukMinWeight: z.coerce.number().min(0, "Weight must be positive."),
  // Export
  valueExportToUSARate: z.coerce.number().min(0, "Rate must be positive."),
  valueExportToUKRate: z.coerce.number().min(0, "Rate must be positive."),
  usValueExportMinWeight: z.coerce.number().min(0, "Weight must be positive."),
  ukValueExportMinWeight: z.coerce.number().min(0, "Weight must be positive."),
  valueExportToUSASpecialRate: z.coerce.number().min(0, "Rate must be non-negative."),
  valueExportToUSASpecialItems: z.string().optional(),
  valueExportToUKSpecialRate: z.coerce.number().min(0, "Rate must be non-negative."),
  valueExportToUKSpecialItems: z.string().optional(),
  // Agent Pricing
  agentUsToLagosRate: z.coerce.number().min(0, "Rate must be positive."),
  agentUsToOtherRate: z.coerce.number().min(0, "Rate must be positive."),
  agentUkToLagosRate: z.coerce.number().min(0, "Rate must be positive."),
  agentUkToOtherRate: z.coerce.number().min(0, "Rate must be positive."),
  agentValueExportToUSARate: z.coerce.number().min(0, "Rate must be positive."),
  agentValueExportToUKRate: z.coerce.number().min(0, "Rate must be positive."),
  // Global
  ngnPerUsd: z.coerce.number().min(0, "Rate must be positive."),
  ngnPerGbp: z.coerce.number().min(0, "Rate must be positive."),
  // Additional Charges
  additionalCharges: z.array(additionalChargeSchema),
});

type PricingFormValues = z.infer<typeof pricingFormSchema>

interface PricingFormProps {
  defaultValues: AppSettings;
}

const serviceOptions: { id: ApplicableService, label: string }[] = [
    { id: 'valueImport-US', label: 'Value Import (US)' },
    { id: 'valueImport-UK', label: 'Value Import (UK)' },
    { id: 'valueExport-US', label: 'Value Export (US)' },
    { id: 'valueExport-UK', label: 'Value Export (UK)' },
    { id: 'expressExport', label: 'Express Export' },
];

export default function PricingForm({ defaultValues }: PricingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { profile, user, profileLoading } = useProfile();
  
  const form = useForm<PricingFormValues>({
    resolver: zodResolver(pricingFormSchema),
    defaultValues: {
      ...defaultValues,
      additionalCharges: Array.isArray(defaultValues.additionalCharges) ? defaultValues.additionalCharges : [],
    },
    mode: "onChange",
  });
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "additionalCharges"
  });

  async function onSubmit(data: PricingFormValues) {
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
      await saveSettings(data as AppSettings);

      toast({
        title: "Settings Saved!",
        description: "The new pricing has been updated.",
      });

    } catch (error) {
      console.error("Failed to save settings:", error);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        
        {/* US Import Pricing Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <span className="text-blue-700 font-bold text-xs">US</span>
            </div>
            <h3 className="text-lg font-bold text-blue-950">US Import Pricing</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2 border border-blue-100 p-6 rounded-2xl bg-blue-50/30 shadow-sm">
            <FormField
              control={form.control}
              name="usToLagosRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-900 font-bold">Rate to Lagos ($ / lb)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" className="bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl h-11" placeholder="e.g. 5.00" {...field} />
                  </FormControl>
                  <FormDescription className="text-blue-600/70 text-xs">The per-pound rate for shipments to Lagos.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="usToOtherRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-900 font-bold">Rate to Other States ($ / lb)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" className="bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl h-11" placeholder="e.g. 5.50" {...field} />
                  </FormControl>
                  <FormDescription className="text-blue-600/70 text-xs">The per-pound rate for shipments outside Lagos.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="usMinWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-900 font-bold">Minimum Weight (lb)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" className="bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl h-11" placeholder="e.g. 1" {...field} />
                  </FormControl>
                  <FormDescription className="text-blue-600/70 text-xs">The minimum billable weight for US shipments.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* UK Import Pricing Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <span className="text-blue-700 font-bold text-xs">UK</span>
            </div>
            <h3 className="text-lg font-bold text-blue-950">UK Import Pricing</h3>
          </div>
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2 border border-blue-100 p-6 rounded-2xl bg-blue-50/30 shadow-sm">
            <FormField
              control={form.control}
              name="ukCargoRatePerKg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-900 font-bold">UK Cargo Rate (£ / kg)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" className="bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl h-11" placeholder="e.g. 6.00" {...field} />
                  </FormControl>
                  <FormDescription className="text-blue-600/70 text-xs">Default UK invoicing rate per kilogram (used in invoice calculator).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ukToLagosRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-900 font-bold">Rate to Lagos (£ / kg)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" className="bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl h-11" placeholder="e.g. 5.80" {...field} />
                  </FormControl>
                  <FormDescription className="text-blue-600/70 text-xs">The per-kilogram rate for shipments to Lagos.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ukToOtherRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-900 font-bold">Rate to Other States (£ / kg)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" className="bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl h-11" placeholder="e.g. 6.50" {...field} />
                  </FormControl>
                  <FormDescription className="text-blue-600/70 text-xs">The per-kilogram rate for shipments outside Lagos.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ukHandlingFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-900 font-bold">Handling Fee (£)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" className="bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl h-11" placeholder="e.g. 15.00" {...field} />
                  </FormControl>
                  <FormDescription className="text-blue-600/70 text-xs">A flat handling fee applied to all UK shipments.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ukMinWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-900 font-bold">Minimum Weight (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" className="bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl h-11" placeholder="e.g. 10" {...field} />
                  </FormControl>
                  <FormDescription className="text-blue-600/70 text-xs">The minimum billable weight for UK shipments.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Value Export Pricing Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Save className="h-4 w-4 text-emerald-700" />
            </div>
            <h3 className="text-lg font-bold text-blue-950">Value Export Pricing</h3>
          </div>
           <div className="space-y-8 pt-2 border border-blue-100 p-6 rounded-2xl bg-blue-50/30 shadow-sm">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FormField
                control={form.control}
                name="valueExportToUSARate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900 font-bold">Base Rate to USA (₦ / kg)</FormLabel>
                    <FormControl>
                      <Input type="number" step="1" className="bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl h-11" placeholder="e.g. 16000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="valueExportToUKRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900 font-bold">Base Rate to UK (₦ / kg)</FormLabel>
                    <FormControl>
                      <Input type="number" step="1" className="bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl h-11" placeholder="e.g. 9000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="usValueExportMinWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900 font-bold">USA Min Weight (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" className="bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl h-11" placeholder="e.g. 10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ukValueExportMinWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900 font-bold">UK Min Weight (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" className="bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl h-11" placeholder="e.g. 5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-blue-100">
                <FormField
                  control={form.control}
                  name="valueExportToUSASpecialRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-900 font-bold">USA Special Items Rate (₦ / kg)</FormLabel>
                      <FormControl>
                        <Input type="number" step="1" className="bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl h-11" placeholder="e.g. 1000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="valueExportToUSASpecialItems"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-900 font-bold">USA Special Items Keywords</FormLabel>
                      <FormControl>
                        <Textarea className="bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl min-h-[80px]" placeholder="e.g., food, dried fish, snails" {...field} />
                      </FormControl>
                      <FormDescription className="text-blue-600/70 text-xs">Comma-separated keywords. If a package description contains any of these, the special rate applies.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>

             <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-blue-100">
                <FormField
                  control={form.control}
                  name="valueExportToUKSpecialRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-900 font-bold">UK Special Items Rate (₦ / kg)</FormLabel>
                      <FormControl>
                        <Input type="number" step="1" className="bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl h-11" placeholder="e.g. 500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="valueExportToUKSpecialItems"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-900 font-bold">UK Special Items Keywords</FormLabel>
                      <FormControl>
                        <Textarea className="bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl min-h-[80px]" placeholder="e.g., food, dried fish, snails" {...field} />
                      </FormControl>
                      <FormDescription className="text-blue-600/70 text-xs">Comma-separated keywords. If a package description contains any of these, the special rate applies.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
          </div>
        </div>
        
        {/* Agent Pricing Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
              <PlusCircle className="h-4 w-4 text-amber-700" />
            </div>
            <h3 className="text-lg font-bold text-blue-950">Agent Pricing</h3>
          </div>
          <div className="space-y-8 pt-2 border border-blue-100 p-6 rounded-2xl bg-blue-50/30 shadow-sm">
            <h4 className="font-bold text-blue-900 text-sm uppercase tracking-wider">Import Agent Rates</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FormField control={form.control} name="agentUsToLagosRate" render={({ field }) => (
                    <FormItem><FormLabel className="text-blue-900 font-bold font-mono text-[10px]">US-LAGOS ($/lb)</FormLabel><FormControl><Input type="number" step="0.01" className="bg-white border-blue-200 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="agentUsToOtherRate" render={({ field }) => (
                    <FormItem><FormLabel className="text-blue-900 font-bold font-mono text-[10px]">US-OTHER ($/lb)</FormLabel><FormControl><Input type="number" step="0.01" className="bg-white border-blue-200 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="agentUkToLagosRate" render={({ field }) => (
                    <FormItem><FormLabel className="text-blue-900 font-bold font-mono text-[10px]">UK-LAGOS (£/kg)</FormLabel><FormControl><Input type="number" step="0.01" className="bg-white border-blue-200 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="agentUkToOtherRate" render={({ field }) => (
                    <FormItem><FormLabel className="text-blue-900 font-bold font-mono text-[10px]">UK-OTHER (£/kg)</FormLabel><FormControl><Input type="number" step="0.01" className="bg-white border-blue-200 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </div>
             <Separator className="bg-blue-100" />
             <h4 className="font-bold text-blue-900 text-sm uppercase tracking-wider">Export Agent Rates</h4>
             <div className="grid md:grid-cols-2 gap-6">
                 <FormField control={form.control} name="agentValueExportToUSARate" render={({ field }) => (
                    <FormItem><FormLabel className="text-blue-900 font-bold">USA Agent Rate (₦ / kg)</FormLabel><FormControl><Input type="number" step="1" className="bg-white border-blue-200 rounded-xl h-11" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="agentValueExportToUKRate" render={({ field }) => (
                    <FormItem><FormLabel className="text-blue-900 font-bold">UK Agent Rate (₦ / kg)</FormLabel><FormControl><Input type="number" step="1" className="bg-white border-blue-200 rounded-xl h-11" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
             </div>
          </div>
        </div>

        {/* Additional Charges Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
              <PlusCircle className="h-4 w-4 text-violet-700" />
            </div>
            <h3 className="text-lg font-bold text-blue-950">Additional Charges</h3>
          </div>
          <Card className="rounded-2xl border-blue-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-blue-50/50 border-b border-blue-100">
                <CardTitle className="text-blue-950">Manage Custom Charges</CardTitle>
                <CardDescription className="text-blue-700/70 font-medium">
                    Add or remove fixed or percentage-based charges that apply to specific services.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                <div className="grid gap-6">
                    {fields.map((field, index) => (
                        <div key={field.id} className="p-6 border border-blue-100 rounded-2xl relative space-y-6 bg-white hover:border-blue-300 transition-all shadow-sm group">
                             <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute top-4 right-4 text-blue-300 hover:text-red-500 hover:bg-red-50 rounded-full"
                                onClick={() => remove(index)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>

                            <FormField
                                control={form.control}
                                name={`additionalCharges.${index}.name`}
                                render={({ field }) => (
                                    <FormItem><FormLabel className="text-blue-900 font-bold">Charge Name</FormLabel><FormControl><Input className="bg-white border-blue-200 rounded-xl h-11 font-bold text-blue-950" placeholder="e.g., Insurance Surcharge" {...field} /></FormControl><FormMessage /></FormItem>
                                )}
                            />

                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name={`additionalCharges.${index}.type`}
                                    render={({ field }) => (
                                        <FormItem><FormLabel className="text-blue-900 font-bold">Charge Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl><SelectTrigger className="bg-white border-blue-200 rounded-xl h-11 text-blue-900 font-medium"><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                                                <SelectContent className="rounded-xl">
                                                    <SelectItem value="percentage_declared_value">Percentage of Declared Value</SelectItem>
                                                    <SelectItem value="percentage_shipment_cost">Percentage of Shipment Cost</SelectItem>
                                                    <SelectItem value="fixed_ngn">Fixed Amount (NGN)</SelectItem>
                                                </SelectContent>
                                            </Select><FormMessage /></FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`additionalCharges.${index}.value`}
                                    render={({ field }) => (
                                        <FormItem><FormLabel className="text-blue-900 font-bold">Value</FormLabel><FormControl><Input type="number" step="0.01" className="bg-white border-blue-200 rounded-xl h-11 font-bold" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}
                                />
                            </div>

                             <FormField
                                control={form.control}
                                name={`additionalCharges.${index}.appliesTo`}
                                render={({ field }) => (
                                    <FormItem className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                        <div className="mb-4"><FormLabel className="text-blue-900 font-bold">Applies to Services</FormLabel><FormDescription className="text-blue-600/70 text-xs">Select which services this charge will be added to.</FormDescription></div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {serviceOptions.map((item) => (
                                            <FormField
                                                key={item.id}
                                                control={form.control}
                                                name={`additionalCharges.${index}.appliesTo`}
                                                render={({ field }) => {
                                                return (
                                                    <FormItem key={item.id} className="flex flex-row items-center space-x-3 space-y-0 bg-white p-2 rounded-lg border border-blue-100 hover:border-blue-300 cursor-pointer">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(item.id)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                    ? field.onChange([...(field.value || []), item.id])
                                                                    : field.onChange(field.value?.filter((value) => value !== item.id))
                                                                }}
                                                                className="rounded border-blue-200 text-blue-600 focus:ring-blue-500"
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-bold text-xs text-blue-900 cursor-pointer">{item.label}</FormLabel>
                                                    </FormItem>
                                                )
                                                }}
                                            />
                                        ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`additionalCharges.${index}.enabled`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-xl border border-blue-100 p-4 shadow-sm bg-blue-50/30">
                                      <div className="space-y-0.5"><FormLabel className="text-blue-900 font-bold">Enabled</FormLabel><FormDescription className="text-blue-600/70 text-xs">If disabled, this charge will not be applied to new shipments.</FormDescription></div>
                                      <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-blue-600" /></FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}
                </div>
                 <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4 border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl font-bold h-10 px-4"
                    onClick={() => append({
                        id: `charge_${new Date().getTime()}`,
                        name: "",
                        appliesTo: [],
                        type: 'percentage_declared_value',
                        value: 0,
                        enabled: true
                    })}
                >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Charge
                </Button>
            </CardContent>
          </Card>
        </div>

        {/* Exchange Rate Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <Coins className="h-4 w-4 text-orange-700" />
            </div>
            <h3 className="text-lg font-bold text-blue-950">Exchange Rates</h3>
          </div>
           <div className="grid md:grid-cols-2 gap-8 pt-2 border border-blue-100 p-6 rounded-2xl bg-blue-50/30 shadow-sm">
            <FormField
              control={form.control}
              name="ngnPerUsd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-900 font-bold">NGN per USD (₦ / $)</FormLabel>
                  <FormControl>
                    <Input type="number" step="1" className="bg-white border-blue-200 rounded-xl h-11 font-bold" placeholder="e.g. 1500" {...field} />
                  </FormControl>
                  <FormDescription className="text-blue-600/70 text-xs">The conversion rate from USD to NGN.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ngnPerGbp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-900 font-bold">NGN per GBP (₦ / £)</FormLabel>
                  <FormControl>
                    <Input type="number" step="1" className="bg-white border-blue-200 rounded-xl h-11 font-bold" placeholder="e.g. 1900" {...field} />
                  </FormControl>
                  <FormDescription className="text-blue-600/70 text-xs">The conversion rate from GBP to NGN.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="flex justify-end pt-8 sticky bottom-0 bg-white/80 backdrop-blur-sm p-4 border-t border-blue-100 z-10 -mx-6 -mb-6 rounded-b-2xl">
          <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-10 rounded-xl shadow-lg shadow-blue-200 transition-all" disabled={isSubmitting || profileLoading}>
            {isSubmitting || profileLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Save className="mr-2 h-5 w-5" />
            )}
            Save County Cargo Pricing Settings
          </Button>
        </div>
      </form>
    </Form>
  )
}
