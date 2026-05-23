
'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { useState, useEffect } from "react"
import { getShippingEstimate, GetShippingEstimateOutput, ServiceEstimate } from "@/ai/flows/get-shipping-estimate-flow"
import { addDoc, collection, serverTimestamp, updateDoc, doc, getDocs, query, where, limit, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useProfile } from "@/components/profile-provider";
import { Shipment, ShipmentStatus, ServiceType, Package, AppliedCharge } from "@/lib/types";
import { trackMetaEvent } from "@/lib/meta-pixel";
import { trackGAEvent } from "@/lib/google-analytics";

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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon, PackagePlus, Calculator, Loader2, AlertCircle, Copy, X, Banknote, ShieldCheck, ArrowLeft, CheckCircle, Info, Tag, User, Mail, Phone, Package2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AddressAutocomplete } from "@/components/address-autocomplete"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getServiceSettings, ServiceSettings } from "@/lib/service-settings"
import { getEmailSettings } from "@/lib/email-settings"
import { sendEmail } from "@/lib/email"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { updateUserProfile } from "@/lib/user-actions"
import { AppSettings, getSettings, AdditionalCharge } from "@/lib/settings";


const packageSchema = z.object({
  weight: z.coerce.number().optional(),
  length: z.coerce.number().optional(),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  description: z.string().min(3, { message: "Please describe the contents." }),
  value: z.coerce.number().optional(),
  itemType: z.string().optional(),
  quantity: z.coerce.number().optional(),
  trackingNumber: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.itemType) { // This is a fixed-price item
        if (!data.quantity || data.quantity < 1) { // It should only require quantity
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Quantity must be at least 1 for fixed-price items.",
                path: ["quantity"],
            });
        }
    } else { // This is a custom item
        if (data.weight === undefined || data.weight < 0.1) {
             ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Weight is required for custom items and must be at least 0.1.",
                path: ["weight"],
            });
        }
    }
});


const shipperReceiverSchema = z.object({
    name: z.string().min(2, "Name is required."),
    email: z.string().email("Please enter a valid email."),
    phone: z.string().min(1, "Phone number is required."),
});

const bookingFormSchema = z.object({
  originAddress: z.string().min(1, { message: "Please select a valid origin address." }),
  destinationAddress: z.string().min(1, { message: "Please select a valid destination address." }),
  selectedService: z.string().min(1, { message: "Please select a shipping service." }),
  requestPickup: z.boolean().default(false).optional(),
  pickupDate: z.date().optional(),
  packages: z.array(packageSchema).min(1, "At least one package is required.").max(3, "You can add a maximum of 3 packages."),
  shipper: shipperReceiverSchema,
  receiver: shipperReceiverSchema,
  useRegisteredAddress: z.boolean().optional(),
}).refine(data => {
    if (data.requestPickup) {
        return !!data.pickupDate;
    }
    return true;
}, {
    message: "A pickup date is required when requesting a pickup.",
    path: ["pickupDate"],
});


type BookingFormValues = z.infer<typeof bookingFormSchema>

const defaultValues: Partial<BookingFormValues> = {
  originAddress: "",
  destinationAddress: "",
  packages: [{ weight: '' as any, length: '' as any, width: '' as any, height: '' as any, description: "", value: '' as any, itemType: '', quantity: 1, trackingNumber: '' }],
  requestPickup: false,
  selectedService: "",
  shipper: { name: '', email: '', phone: '' },
  receiver: { name: '', email: '', phone: '' },
  useRegisteredAddress: true,
}

interface BookingFormProps {
    shipmentType: 'export' | 'import';
    serviceSettings: ServiceSettings | null;
}

const fixedPriceItems = {
    us: [
        { value: 'new-phone', label: 'New Phone - $100' },
        { value: 'used-phone', label: 'Used Phone - $50' },
        { value: 'new-laptop', label: 'New Laptop - $100' },
        { value: 'used-laptop', label: 'Used Laptop - $70' },
    ],
    uk: [
        { value: 'new-phone', label: 'New Phone - £100' },
        { value: 'used-phone', label: 'Used Phone - £50' },
        { value: 'new-laptop', label: 'New Laptop - £120' },
        { value: 'used-laptop', label: 'Used Laptop - £70' },
    ]
}


export default function BookingForm({ shipmentType, serviceSettings }: BookingFormProps) {
  const [step, setStep] = useState<'details' | 'confirm' | 'contacts' | 'payment'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimateResult, setEstimateResult] = useState<GetShippingEstimateOutput | null>(null);
  const [isEstimating, setIsEstimating] = useState(false);
  const [shipmentId, setShipmentId] = useState<string | null>(null);
  const { user, profile } = useProfile();
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
        ...defaultValues,
        packages: [{ weight: '' as any, length: '' as any, width: '' as any, height: '' as any, description: "", value: '' as any, itemType: '', quantity: 1, trackingNumber: '' }],
    },
    mode: "onChange",
  })

  useEffect(() => {
    if (profile) {
        form.setValue('shipper.name', `${profile.firstname} ${profile.lastname}`);
        form.setValue('shipper.email', profile.email);
        form.setValue('shipper.phone', profile.phone_number);
    }
  }, [profile, form]);
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "packages"
  });

  const watchedPackages = form.watch('packages');
  const watchedOrigin = form.watch("originAddress");
  const watchedDestination = form.watch("destinationAddress");
  const watchedRequestPickup = form.watch("requestPickup");
  const isExport = shipmentType === 'export';
  const isUSImport = !isExport && watchedOrigin === 'United States';
  const isUKImport = !isExport && watchedOrigin === 'United Kingdom';
  
  const userName = profile ? `${profile.firstname} ${profile.lastname}` : 'FirstName LastName';
  
  const usAddress = {
    line1: `${userName} (County Cargo)`,
    line2: '1234 N Belt Line Road',
    cityStateZip: 'lrving, Texas 75061',
    country: 'USA'
  };

  const ukAddress = {
    line1: `${userName}, Unit G6 (County Cargo)`,
    line2: '67-83 Queens Dock Commercial Centre',
    line3: 'Norfolk Street',
    cityPostcode: 'Liverpool, L1 0BG',
    country: 'United Kingdom'
  };

  const usAddressString = `${usAddress.line1}\n${usAddress.line2}\n${usAddress.cityStateZip}\n${usAddress.country}`;
  const ukAddressString = `${ukAddress.line1}\n${ukAddress.line2}\n${ukAddress.line3}\n${ukAddress.cityPostcode}\n${ukAddress.country}`;
  
  const fullRegisteredAddress = profile ? [profile.address, profile.city, profile.state, profile.zipCode].filter(Boolean).join(', ') : '';
  const useRegisteredAddress = form.watch('useRegisteredAddress');

  useEffect(() => {
    if (useRegisteredAddress && fullRegisteredAddress && !isExport) {
        form.setValue('destinationAddress', fullRegisteredAddress);
    } else if (useRegisteredAddress === false && !isExport) {
        form.setValue('destinationAddress', '');
    }
  }, [useRegisteredAddress, fullRegisteredAddress, isExport, form]);


  const handleCopy = (textToCopy: string, successMessage: string) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
        toast({
            title: successMessage,
        });
    });
  };
  
  const handleNewBooking = () => {
    form.reset({
        ...defaultValues,
        packages: [{ weight: '' as any, length: '' as any, width: '' as any, height: '' as any, description: "", value: '' as any, itemType: '', quantity: 1, trackingNumber: '' }],
        shipper: { 
            name: profile ? `${profile.firstname} ${profile.lastname}` : '',
            email: profile ? profile.email : '',
            phone: profile ? profile.phone_number : ''
        },
    });
    setEstimateResult(null);
    setStep('details');
    setIsEstimating(false);
    setIsSubmitting(false);
    setShipmentId(null);
  };
  
  const handleConfirmPayment = async () => {
    if (!shipmentId || !profile) return;

    try {
      const q = query(collection(db, "shipments"), where("id", "==", shipmentId), limit(1));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("Could not find the shipment to update.");
      }

      const shipmentDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, "shipments", shipmentDoc.id), {
        status: 'Awaiting Confirmation'
      });
      
      const selectedEstimate = estimateResult?.estimates?.find(e => e.serviceType === form.getValues('selectedService'));
      // Send notification email to admin
      await sendEmail({
          to: [{ email_address: { address: 'info@countycargo.com', name: 'County Cargo Admin' } }],
          subject: `Payment Confirmation Submitted for Shipment ${shipmentId}`,
          htmlBody: `
              <div>
                  <p>A customer has confirmed they have made payment for a shipment.</p>
                  <ul>
                      <li><strong>Shipment ID:</strong> ${shipmentId}</li>
                      <li><strong>Customer:</strong> ${profile.firstname} ${profile.lastname}</li>
                      <li><strong>Customer Email:</strong> ${profile.email}</li>
                      <li><strong>Amount:</strong> ${new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(selectedEstimate?.estimate || 0)}</li>
                  </ul>
                  <p>Please log in to the admin dashboard to verify the payment and update the shipment status.</p>
              </div>
          `
      });

      toast({
        title: "Confirmation Sent!",
        description: `Your shipment status has been updated. We will verify your payment shortly.`,
      });
    } catch (error) {
       console.error("Confirmation error:", error);
       toast({
            variant: "destructive",
            title: "Error",
            description: "Could not update shipment status. Please contact support."
       });
    } finally {
      handleNewBooking();
    }
  };


  const handleNumericInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: any, integerLimit: number, decimalLimit: number) => {
    let value = e.target.value;

    value = value.replace(/[^0-9.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) {
      value = `${parts[0]}.${parts.slice(1).join('')}`;
    }
    
    let [integerPart, decimalPart] = value.split('.');

    if (integerPart && integerPart.length > integerLimit) {
      integerPart = integerPart.slice(0, integerLimit);
    }
    
    if (decimalPart && decimalPart.length > decimalLimit) {
      decimalPart = decimalPart.slice(0, decimalLimit);
    }

    const newValue = decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;

    field.onChange(newValue);
  };

  async function onGetEstimate() {
    const isFormValid = await form.trigger(["originAddress", "destinationAddress", "packages"]);
    if (!isFormValid) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please fill out all required fields before getting an estimate.",
        });
        return;
    }

    const values = form.getValues();
    const addressForEstimate = isExport ? values.destinationAddress : values.originAddress;
    
    if (!addressForEstimate) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please provide an address and complete package details (weight and dimensions) to get an estimate.",
        });
        return;
    }
    
    if (!isExport && !values.destinationAddress) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please provide a destination address in Nigeria to get an estimate.",
        });
        return;
    }

    setIsEstimating(true);
    setEstimateResult(null);

    try {
        if (profile?.role !== 'Admin' && profile?.role !== 'Staff') {
            trackMetaEvent('Search', {
                search_string: isExport ? `export to ${addressForEstimate}` : `import from ${addressForEstimate}`
            });
        }
        
       const result = await getShippingEstimate({ 
            address: addressForEstimate,
            destinationAddress: !isExport ? values.destinationAddress : undefined,
            packages: values.packages.map(p => ({
                weight: Number(p.weight),
                length: Number(p.length),
                width: Number(p.width),
                height: Number(p.height),
                itemType: p.itemType,
                description: p.description,
                quantity: Number(p.quantity),
                value: Number(p.value),
                trackingNumber: p.trackingNumber,
            })),
            units: isUSImport ? 'imperial' : 'metric',
            shipmentType,
            customer: profile || undefined,
        });
        
        setEstimateResult(result);
        
        if (result.estimates && result.estimates.length > 0) {
            // Pre-select the cheapest option
            form.setValue('selectedService', result.estimates[0].serviceType);
            setStep('confirm');
        } else if (result.error) {
             setStep('confirm');
        }

    } catch (error) {
        console.error("Estimate error:", error);
        setEstimateResult({ error: "An unexpected error occurred while fetching the estimate." });
        setStep('confirm');
    } finally {
        setIsEstimating(false);
    }
  }

  async function onAcceptAndBook() {
     const isFormValid = await form.trigger(["selectedService"]);
     if (!isFormValid) {
        return;
    }

    const selectedServiceType = form.getValues('selectedService');
    const selectedEstimate = estimateResult?.estimates?.find(e => e.serviceType === selectedServiceType);

    if (profile?.role !== 'Admin' && profile?.role !== 'Staff' && selectedEstimate) {
        trackMetaEvent('Lead', {
            content_name: `Service Accepted - ${selectedEstimate.serviceName}`,
            value: selectedEstimate.estimate,
            currency: 'NGN'
        });
    }

    setStep('contacts');
  }
  
  async function onFinalSubmit() {
    const isContactsFormValid = await form.trigger(["shipper", "receiver"]);
    if (!isContactsFormValid) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please fill out all shipper and receiver details.",
        });
        return;
    }
    
    const data = form.getValues();
    if (!user || !profile) {
        toast({
            variant: "destructive",
            title: "Not Authenticated",
            description: "You must be logged in to book a shipment."
        });
        return;
    }

    setIsSubmitting(true);
    try {
        const serviceType = data.selectedService as ServiceType;
        const selectedEstimate = estimateResult?.estimates?.find(e => e.serviceType === serviceType);

        if (!selectedEstimate) {
            throw new Error("Selected service estimate not found.");
        }
        
        let baseRate = selectedEstimate.rate || 0;
        let finalRate = baseRate;
        let finalOriginalCost = Math.round(selectedEstimate.estimate || 0);

        if (serviceType === 'valueExport') {
            const settings = await getSettings();
            const isToUSA = data.destinationAddress.toLowerCase().includes('united states');
            const isToUK = data.destinationAddress.toLowerCase().includes('united kingdom');
            let specialRate = 0;
            let specialItemsKeywords: string[] = [];

            if (isToUSA && settings.valueExportToUSASpecialItems) {
                specialItemsKeywords = settings.valueExportToUSASpecialItems.toLowerCase().split(',').map(k => k.trim()).filter(k => k);
                specialRate = settings.valueExportToUSASpecialRate;
            } else if (isToUK && settings.valueExportToUKSpecialItems) {
                specialItemsKeywords = settings.valueExportToUKSpecialItems.toLowerCase().split(',').map(k => k.trim()).filter(k => k);
                specialRate = settings.valueExportToUKSpecialRate;
            }

            const hasSpecialItem = data.packages.some(pkg =>
                specialItemsKeywords.length > 0 && specialItemsKeywords.some(keyword =>
                    pkg.description.toLowerCase().includes(keyword)
                )
            );

            if (hasSpecialItem) {
                finalRate = baseRate + specialRate;
                const totalRoundedBillableWeight = data.packages.reduce((sum, pkg) => {
                    const actualWeight = Number(pkg.weight);
                    const { length, width, height } = pkg;
                    const divisor = 5000; // Value Export is always metric
                    const volumetricWeight = ((length || 0) * (width || 0) * (height || 0)) / divisor;
                    return sum + Math.ceil(Math.max(actualWeight, volumetricWeight));
                }, 0);
                
                const minWeight = isToUSA ? settings.usValueExportMinWeight : settings.ukValueExportMinWeight;
                const finalBillableWeight = Math.max(totalRoundedBillableWeight, minWeight);

                const newBaseCost = finalBillableWeight * finalRate;

                // Recalculate additional charges based on the new base cost
                const applyAdditionalCharges = (baseEstimate: number) => {
                    let finalEstimate = baseEstimate;
                    (settings.additionalCharges || []).forEach(charge => {
                        if (charge.enabled && charge.appliesTo.includes(isToUSA ? 'valueExport-US' : 'valueExport-UK')) {
                            if (charge.type === 'fixed_ngn') {
                                finalEstimate += charge.value;
                            } else if (charge.type === 'percentage_shipment_cost') {
                                finalEstimate += finalEstimate * (charge.value / 100);
                            } else if (charge.type === 'percentage_declared_value') {
                                const totalDeclaredValue = data.packages.reduce((sum, pkg) => sum + (pkg.value || 0), 0);
                                finalEstimate += totalDeclaredValue * (charge.value / 100);
                            }
                        }
                    });
                    return finalEstimate;
                };

                finalOriginalCost = Math.round(applyAdditionalCharges(newBaseCost));
            }
        }
        
        let prefix = "NG";
        if (shipmentType === 'import') {
            if (data.originAddress.includes("United States")) {
                prefix = "US";
            } else if (data.originAddress.includes("United Kingdom")) {
                prefix = "GB";
            }
        }
        const uniqueId = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
        setShipmentId(uniqueId);
        

        const shipmentData: Partial<Shipment> = {
          id: uniqueId,
          userId: user.uid,
          email: user.email!,
          customer: {
            uid: profile.uid,
            firstname: profile.firstname,
            lastname: profile.lastname,
            email: profile.email,
            phone_number: profile.phone_number,
          },
          originAddress: data.originAddress,
          destinationAddress: data.destinationAddress,
          shipper: data.shipper,
          receiver: data.receiver,
          shipmentType,
          serviceType: serviceType,
          units: isUSImport ? 'imperial' : 'metric',
          packages: data.packages.map((p, index) => {
              const newPackage: Partial<Package> = {
                weight: Number(p.weight),
                length: Number(p.length),
                width: Number(p.width),
                height: Number(p.height),
                description: p.description,
                value: p.value || 0,
                trackingNumber: p.trackingNumber,
              };
              if (selectedEstimate.perPackageCosts && selectedEstimate.perPackageCosts[index]) {
                newPackage.cost = selectedEstimate.perPackageCosts[index].cost;
              }
              return newPackage as Package;
          }),
          requestPickup: data.requestPickup,
          pickupDate: data.pickupDate || null,
          bookingDate: serverTimestamp() as any,
          estimatedDelivery: null, 
          originalCost: finalOriginalCost.toString(),
          rate: finalRate,
          billableWeight: selectedEstimate.billableWeight || null,
          exchangeRate: selectedEstimate.exchangeRate || null,
          handlingFee: selectedEstimate.handlingFee || null,
          minimumWeightApplied: selectedEstimate.minimumWeightApplied || false,
          minimumWeight: selectedEstimate.minimumWeight || null,
          additionalChargesApplied: selectedEstimate.additionalCharges,
          createdBy: {
            uid: profile.uid,
            name: `${profile.firstname} ${profile.lastname}`,
            role: profile.role,
          },
        };

        const isPaid = false;

        shipmentData.paymentStatus = 'Unpaid';
        shipmentData.status = 'Unpaid';
        shipmentData.totalCost = finalOriginalCost.toString();
        shipmentData.paymentDate = null;
        
        await addDoc(collection(db, "shipments"), shipmentData);
        
        if (profile?.role !== 'Admin' && profile?.role !== 'Staff') {
            trackMetaEvent('InitiateCheckout', {
                content_name: `New Shipment Booking - ${serviceType}`,
                currency: 'NGN',
                value: selectedEstimate.estimate || 0,
            });
        }

        // Track Google Analytics event for lead
        trackGAEvent({
            action: 'generate_lead',
            params: {
                currency: 'NGN',
                value: selectedEstimate.estimate || 0,
            }
        });

        const emailSettings = await getEmailSettings();
        if (emailSettings.newBookingConfirmation.enabled) {
            const { subject, htmlBody } = emailSettings.newBookingConfirmation;
            const personalizedSubject = subject.replace(/{{shipmentId}}/g, uniqueId);
            const personalizedBody = htmlBody
                .replace(/{{firstname}}/g, profile.firstname)
                .replace(/{{shipmentId}}/g, uniqueId);

            sendEmail({
                to: [{ email_address: { address: user.email!, name: `${profile.firstname} ${profile.lastname}` } }],
                subject: personalizedSubject,
                htmlBody: personalizedBody,
            });
        }
        
        if (isPaid) {
            handleNewBooking();
        } else {
            setStep('payment');
        }

    } catch (error) {
        console.error("Submission error:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "An unexpected error occurred during submission."
        });
    } finally {
        setIsSubmitting(false);
    }
  }
  
  if (!serviceSettings) {
      return (
        <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      );
  }

  const selectedServiceType = form.watch('selectedService');
  const finalEstimate = estimateResult?.estimates?.find(e => e.serviceType === selectedServiceType);

  if (step === 'payment') {
      const amount = finalEstimate?.estimate || 0;

      return (
         <Card className="w-full max-w-lg mx-auto">
            <CardHeader className="text-center">
                <ShieldCheck className="mx-auto h-12 w-12 text-green-500" />
                <CardTitle className="text-2xl">Confirm your Booking</CardTitle>
                <p className="text-muted-foreground">Please make payment to the account below to complete your booking.</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 space-y-3 bg-muted/50">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Account Name</span>
                        <span className="font-bold text-right">County Service Solution</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Bank Name</span>
                        <span className="font-bold text-right">Stanbic IBTC</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Account Number</span>
                        <div className="flex items-center gap-2">
                           <span className="font-bold text-lg">0001808080</span>
                           <TooltipProvider>
                               <Tooltip>
                                   <TooltipTrigger asChild>
                                       <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy('0001808080', 'Account Number Copied!')}>
                                           <Copy className="h-4 w-4" />
                                       </Button>
                                   </TooltipTrigger>
                                   <TooltipContent><p>Copy Account Number</p></TooltipContent>
                               </Tooltip>
                           </TooltipProvider>
                        </div>
                   </div>
                </div>
                
                 <div className="border rounded-lg p-4 flex justify-between items-center">
                    <span className="text-muted-foreground">Amount</span>
                    <div className="flex items-center gap-2">
                       <span className="font-bold text-lg">
                            {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount)}
                       </span>
                       <TooltipProvider>
                           <Tooltip>
                               <TooltipTrigger asChild>
                                   <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(amount.toString(), 'Amount Copied!')}>
                                       <Copy className="h-4 w-4" />
                                   </Button>
                               </TooltipTrigger>
                               <TooltipContent><p>Copy Amount</p></TooltipContent>
                           </Tooltip>
                       </TooltipProvider>
                    </div>
                </div>

                 <p className="text-xs text-muted-foreground text-center">
                    Please ensure the full amount is paid to avoid shipment delays. Once payment is made, please allow some time for verification.
                 </p>
                 <Button className="w-full" onClick={handleConfirmPayment}>
                    <PackagePlus className="mr-2 h-4 w-4" />
                    I have made payment
                </Button>
            </CardContent>
         </Card>
      );
  }

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="mx-auto max-w-2xl">
          {step === 'details' && (
            <div className="space-y-8">
              <div className="space-y-4">
                  <h3 className="text-lg font-medium">Addresses</h3>
                  <div className="space-y-8">
                      <FormField
                        control={form.control}
                        name="originAddress"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Origin Address *</FormLabel>
                              <FormDescription>
                                  {isExport ? 'Where is the shipment coming from? (Nigeria only)' : 'Where is the shipment coming from?'}
                              </FormDescription>
                              <FormControl>
                                { isExport ? (
                                  <AddressAutocomplete
                                    onAddressSelect={(addressObj) => {
                                        field.onChange(addressObj.description);
                                        form.trigger('originAddress');
                                    }}
                                    country="ng"
                                    placeholder="Start typing an origin address"
                                    defaultValue={field.value}
                                  />
                                ) : (
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a country" />
                                      </SelectTrigger>
                                    <SelectContent>
                                      {serviceSettings.valueImport && (
                                          <>
                                              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                              <SelectItem value="United States">United States</SelectItem>
                                          </>
                                      )}
                                    </SelectContent>
                                  </Select>
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                      />
                      
                      {!isExport && watchedOrigin === "United States" && (
                          <Card className="bg-muted border-dashed">
                              <CardContent className="p-4">
                                  <div className="flex justify-between items-start gap-4">
                                      <div className="text-sm">
                                          <p className="font-semibold">US Warehouse Address</p>
                                          <p className="text-muted-foreground">{usAddress.line1}</p>
                                          <p className="text-muted-foreground">{usAddress.line2}</p>
                                          <p className="text-muted-foreground">{usAddress.cityStateZip}</p>
                                          <p className="text-muted-foreground">{usAddress.country}</p>
                                      </div>
                                      <TooltipProvider>
                                          <Tooltip>
                                              <TooltipTrigger asChild>
                                                  <Button type="button" variant="ghost" size="icon" onClick={() => handleCopy(usAddressString, 'Address Copied!')}>
                                                      <Copy className="h-5 w-5" />
                                                  </Button>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                  <p>Copy Address</p>
                                              </TooltipContent>
                                          </Tooltip>
                                      </TooltipProvider>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-2">
                                      <span className="font-bold text-destructive">IMPORTANT!!!</span> Please send your items to the address above exactly as it is written to avoid delays.
                                  </p>
                              </CardContent>
                          </Card>
                      )}

                      {!isExport && watchedOrigin === "United Kingdom" && (
                          <Card className="bg-muted border-dashed">
                              <CardContent className="p-4">
                                  <div className="flex justify-between items-start gap-4">
                                      <div className="text-sm">
                                          <p className="font-semibold">UK Shipping Address</p>
                                          <p className="text-muted-foreground">{ukAddress.line1}</p>
                                          <p className="text-muted-foreground">{ukAddress.line2}</p>
                                          <p className="text-muted-foreground">{ukAddress.line3}</p>
                                          <p className="text-muted-foreground">{ukAddress.cityPostcode}</p>
                                          <p className="text-muted-foreground">{ukAddress.country}</p>
                                      </div>
                                      <TooltipProvider>
                                          <Tooltip>
                                              <TooltipTrigger asChild>
                                                  <Button type="button" variant="ghost" size="icon" onClick={() => handleCopy(ukAddressString, 'Address Copied!')}>
                                                      <Copy className="h-5 w-5" />
                                                  </Button>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                  <p>Copy Address</p>
                                              </TooltipContent>
                                          </Tooltip>
                                      </TooltipProvider>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-2">
                                      <span className="font-bold text-destructive">IMPORTANT!!!</span> Please send your items to the address above exactly as it is written to avoid delays.
                                  </p>
                              </CardContent>
                          </Card>
                      )}

                        <div className="space-y-4">
                          { !isExport && fullRegisteredAddress && (
                              <FormField
                                  control={form.control}
                                  name="useRegisteredAddress"
                                  render={({ field }) => (
                                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                          <FormControl>
                                              <Checkbox
                                                  checked={field.value}
                                                  onCheckedChange={field.onChange}
                                              />
                                          </FormControl>
                                          <div className="space-y-1 leading-none">
                                              <FormLabel>Use my registered delivery address</FormLabel>
                                              <FormDescription>
                                                  {fullRegisteredAddress}
                                              </FormDescription>
                                          </div>
                                      </FormItem>
                                  )}
                              />
                          )}
                          <FormField
                              control={form.control}
                              name="destinationAddress"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Destination Address *</FormLabel>
                                  <FormDescription>
                                    {isExport ? 'Where is the shipment going?' : 'Where is the shipment going? (Nigeria only)'}
                                  </FormDescription>
                                  <FormControl>
                                    <AddressAutocomplete
                                      onAddressSelect={(addressObj) => {
                                          field.onChange(addressObj.description);
                                          form.trigger('destinationAddress');
                                      }}
                                      country={isExport ? undefined : "ng"}
                                      placeholder={isExport ? "Start typing a destination address" : "Start typing a destination address in Nigeria"}
                                      defaultValue={field.value}
                                      disabled={!isExport && !!useRegisteredAddress && !!fullRegisteredAddress}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                          />
                        </div>
                  </div>
              </div>

              <Separator />

              <div className="space-y-4">
                  <h3 className="text-lg font-medium">Package Details</h3>
                  <div className="grid grid-cols-1 gap-y-6 pt-2">
                    
                    {fields.map((field, index) => {
                      const isFixedPriceItem = !!watchedPackages[index]?.itemType;
                      const items = isUSImport ? fixedPriceItems.us : (isUKImport ? fixedPriceItems.uk : []);

                      return (
                      <Card key={field.id} className="p-4 relative">
                          <CardContent className="p-0">
                            <div className="flex justify-between items-center mb-4">
                              <FormLabel className="text-base">Package {index + 1}</FormLabel>
                              {index > 0 && (
                                  <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                                      onClick={() => remove(index)}
                                  >
                                      <X className="h-5 w-5" />
                                  </Button>
                              )}
                            </div>
                              {(isUSImport || isUKImport) && (
                                  <div className="flex items-end gap-4 mb-4">
                                      <FormField
                                          control={form.control}
                                          name={`packages.${index}.itemType`}
                                          render={({ field: itemTypeField }) => (
                                              <FormItem className="flex-grow">
                                                  <FormLabel className="flex items-center gap-2 text-xs text-muted-foreground">
                                                      <Tag className="h-3 w-3" />
                                                      Fixed-Price Item (Optional)
                                                  </FormLabel>
                                                  <Select
                                                      onValueChange={(value) => {
                                                          const val = value === 'none' ? '' : value;
                                                          itemTypeField.onChange(val);
                                                          if (val) {
                                                              const selectedLabel = items.find(i => i.value === val)?.label || '';
                                                              form.setValue(`packages.${index}.description`, selectedLabel.split(' - ')[0]);
                                                              form.setValue(`packages.${index}.value`, Number(selectedLabel.split(' ')[2]?.replace(/[$,£]/, '')) || 0);
                                                              form.setValue(`packages.${index}.weight`, 0);
                                                              form.setValue(`packages.${index}.length`, 0);
                                                              form.setValue(`packages.${index}.width`, 0);
                                                              form.setValue(`packages.${index}.height`, 0);
                                                              form.setValue(`packages.${index}.quantity`, 1);
                                                          }
                                                      }}
                                                      defaultValue={itemTypeField.value}
                                                  >
                                                      <FormControl>
                                                          <SelectTrigger>
                                                              <SelectValue placeholder="Select a predefined item..." />
                                                          </SelectTrigger>
                                                      </FormControl>
                                                      <SelectContent>
                                                          <SelectItem value="none">Clear Selection</SelectItem>
                                                          {items.map(item => (
                                                              <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                                          ))}
                                                      </SelectContent>
                                                  </Select>
                                                  <FormMessage />
                                              </FormItem>
                                          )}
                                      />
                                      <FormField
                                          control={form.control}
                                          name={`packages.${index}.quantity`}
                                          render={({ field }) => (
                                              <FormItem className="w-24">
                                                  <FormLabel className="text-xs text-muted-foreground">Quantity</FormLabel>
                                                  <FormControl>
                                                      <Input
                                                          type="number"
                                                          min="1"
                                                          step="1"
                                                          {...field}
                                                          disabled={!isFixedPriceItem}
                                                      />
                                                  </FormControl>
                                                  <FormMessage />
                                              </FormItem>
                                          )}
                                      />
                                  </div>
                              )}

                            <div className={cn("grid sm:grid-cols-2 lg:grid-cols-5 gap-4", isFixedPriceItem && "hidden")}>
                              <FormField
                                  control={form.control}
                                  name={`packages.${index}.weight`}
                                  render={({ field }) => (
                                      <FormItem className="lg:col-span-1">
                                          <FormLabel className="text-xs text-muted-foreground">Weight ({isUSImport ? 'lbs' : 'kg'}) *</FormLabel>
                                          <FormControl>
                                              <Input 
                                                  type="text" 
                                                  placeholder="e.g. 1.5" 
                                                  {...field}
                                                  onChange={(e) => handleNumericInputChange(e, field, 2, 2)}
                                              />
                                          </FormControl>
                                          <FormMessage />
                                      </FormItem>
                                  )}
                              />
                              <FormField
                                  control={form.control}
                                  name={`packages.${index}.length`}
                                  render={({ field }) => (
                                      <FormItem className="lg:col-span-1">
                                          <FormLabel className="text-xs text-muted-foreground">Length ({isUSImport ? 'in' : 'cm'})</FormLabel>
                                          <FormControl>
                                              <Input 
                                                  type="text"
                                                  placeholder="e.g. 50"
                                                  {...field}
                                                  onChange={(e) => handleNumericInputChange(e, field, 4, 2)}
                                              />
                                          </FormControl>
                                          <FormMessage />
                                      </FormItem>
                                  )}
                              />
                              <FormField
                                  control={form.control}
                                  name={`packages.${index}.width`}
                                  render={({ field }) => (
                                      <FormItem className="lg:col-span-1">
                                          <FormLabel className="text-xs text-muted-foreground">Width ({isUSImport ? 'in' : 'cm'})</FormLabel>
                                          <FormControl>
                                              <Input
                                                  type="text"
                                                  placeholder="e.g. 50"
                                                  {...field}
                                                  onChange={(e) => handleNumericInputChange(e, field, 4, 2)}
                                              />
                                          </FormControl>
                                          <FormMessage />
                                      </FormItem>
                                  )}
                              />
                              <FormField
                                  control={form.control}
                                  name={`packages.${index}.height`}
                                  render={({ field }) => (
                                      <FormItem className="lg:col-span-1">
                                          <FormLabel className="text-xs text-muted-foreground">Height ({isUSImport ? 'in' : 'cm'})</FormLabel>
                                          <FormControl>
                                              <Input
                                                  type="text"
                                                  placeholder="e.g. 50"
                                                  {...field}
                                                  onChange={(e) => handleNumericInputChange(e, field, 4, 2)}
                                              />
                                          </FormControl>
                                          <FormMessage />
                                      </FormItem>
                                  )}
                              />
                              <FormField
                                  control={form.control}
                                  name={`packages.${index}.value`}
                                  render={({ field }) => (
                                      <FormItem className="lg:col-span-1">
                                          <FormLabel className="text-xs text-muted-foreground">Value (NGN)</FormLabel>
                                          <FormControl>
                                              <Input
                                                  type="text"
                                                  placeholder="e.g. 50000"
                                                  {...field}
                                                  onChange={(e) => handleNumericInputChange(e, field, 9, 2)}
                                              />
                                          </FormControl>
                                          <FormMessage />
                                      </FormItem>
                                  )}
                              />
                            </div>
                            <FormField
                                control={form.control}
                                name={`packages.${index}.description`}
                                render={({ field }) => (
                                    <FormItem className="mt-4">
                                        <FormLabel className="text-xs text-muted-foreground">Package Description *</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="e.g. 10 boxes of assorted books, 1 wooden table"
                                                className="resize-y"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             {!isExport && (
                                <FormField
                                    control={form.control}
                                    name={`packages.${index}.trackingNumber`}
                                    render={({ field }) => (
                                        <FormItem className="mt-4">
                                            <FormLabel className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Package2 className="h-3 w-3" />
                                                Inbound Tracking No. (Optional)
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Tracking number from online store" {...field} value={field.value ?? ''} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                             )}
                          </CardContent>
                      </Card>
                      )
                    })}
                      <div className="space-y-4">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => append({ weight: '' as any, length: '' as any, width: '' as any, height: '' as any, description: "", value: '' as any, itemType: '', quantity: 1, trackingNumber: '' })}
                          disabled={fields.length >= 3}
                        >
                          Add Another Package
                        </Button>
                        <FormField
                            name="packages"
                            control={form.control}
                            render={() => (
                              <FormMessage />
                            )}
                        />
                          
                          {isExport && serviceSettings.pickupRequestEnabled && watchedOrigin.toLowerCase().includes('lagos') && (
                            <FormField
                                  control={form.control}
                                  name="requestPickup"
                                  render={({ field }) => (
                                  <FormItem className="md:col-span-2 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                      <FormControl>
                                      <Checkbox
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                      />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                      <FormLabel>
                                          Request a Pickup
                                      </FormLabel>
                                      <FormDescription>
                                          Check this box if you want us to pick up the shipment from your origin address (Lagos only).
                                      </FormDescription>
                                      </div>
                                  </FormItem>
                                  )}
                              />
                          )}

                          {watchedRequestPickup && isExport && (
                              <FormField
                                  control={form.control}
                                  name="pickupDate"
                                  render={({ field }) => (
                                  <FormItem className="flex flex-col pt-2">
                                      <FormLabel>Requested Pickup Date</FormLabel>
                                      <Popover>
                                      <PopoverTrigger asChild>
                                          <FormControl>
                                          <Button
                                              variant={"outline"}
                                              className={cn(
                                              "pl-3 text-left font-normal",
                                              !field.value && "text-muted-foreground"
                                              )}
                                          >
                                              {field.value ? (
                                              format(field.value, "PPP")
                                              ) : (
                                              <span>Pick a date</span>
                                              )}
                                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                          </Button>
                                          </FormControl>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-auto p-0" align="start">
                                          <Calendar
                                          mode="single"
                                          selected={field.value}
                                          onSelect={field.onChange}
                                          disabled={(date) => {
                                            const now = new Date();
                                            const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                                            const day = date.getDay();

                                            if (date < startOfToday) {
                                                return true;
                                            }
                                            if (day === 0 || day === 6) { // 0 is Sunday, 6 is Saturday
                                              return true;
                                            }
                                            if (date.getTime() === startOfToday.getTime() && now.getHours() >= 12) {
                                                return true;
                                            }
                                            if (date > new Date("2100-01-01")) {
                                                return true;
                                            }
                                            return false;
                                          }}
                                          initialFocus
                                          />
                                      </PopoverContent>
                                      </Popover>
                                      <FormMessage />
                                  </FormItem>
                                  )}
                              />
                          )}
                      </div>
                  </div>
              </div>
            </div>
          )}
          
          {step === 'contacts' && (
              <Card className="mx-auto max-w-2xl">
                  <CardHeader>
                      <CardTitle>Contact Details</CardTitle>
                      <CardDescription>Please provide details for the shipper and receiver.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                      {/* Shipper Details */}
                      <div className="space-y-4 p-4 border rounded-lg">
                          <h3 className="font-medium flex items-center gap-2"><User className="h-5 w-5" /> Shipper Details</h3>
                          <FormField control={form.control} name="shipper.name" render={({ field }) => (
                              <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <div className="grid md:grid-cols-2 gap-4">
                              <FormField control={form.control} name="shipper.email" render={({ field }) => (
                                  <FormItem><FormLabel>Email *</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                              )} />
                              <FormField control={form.control} name="shipper.phone" render={({ field }) => (
                                  <FormItem><FormLabel>Phone *</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                              )} />
                          </div>
                          <div className="text-sm p-3 bg-muted rounded-md">
                              <p className="font-semibold">Shipper Address</p>
                              <p className="text-muted-foreground">{form.getValues('originAddress')}</p>
                          </div>
                      </div>

                      {/* Receiver Details */}
                      <div className="space-y-4 p-4 border rounded-lg">
                          <h3 className="font-medium flex items-center gap-2"><User className="h-5 w-5" /> Receiver Details</h3>
                          <FormField control={form.control} name="receiver.name" render={({ field }) => (
                              <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <div className="grid md:grid-cols-2 gap-4">
                              <FormField control={form.control} name="receiver.email" render={({ field }) => (
                                  <FormItem><FormLabel>Email *</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                              )} />
                              <FormField control={form.control} name="receiver.phone" render={({ field }) => (
                                  <FormItem><FormLabel>Phone *</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                              )} />
                          </div>
                          <div className="text-sm p-3 bg-muted rounded-md">
                              <p className="font-semibold">Receiver Address</p>
                              <p className="text-muted-foreground">{form.getValues('destinationAddress')}</p>
                          </div>
                      </div>
                  </CardContent>
              </Card>
          )}
        </div>

        <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl my-6">
                {isEstimating && (
                <div className="flex items-center justify-center text-muted-foreground">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>Calculating best price...</span>
                </div>
                )}
                {estimateResult && !isEstimating && step === 'confirm' && (
                <div className="space-y-4">
                    {estimateResult.estimates && estimateResult.estimates.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Choose a Service</CardTitle>
                                <CardDescription>Select your preferred shipping option below.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="selectedService"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                  <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="gap-4"
                                                >
                                                    {estimateResult.estimates?.map(service => (
                                                          <FormItem key={service.serviceType}>
                                                            <FormControl>
                                                                <RadioGroupItem value={service.serviceType} id={service.serviceType} className="peer sr-only" />
                                                            </FormControl>
                                                            <Label htmlFor={service.serviceType} className="flex flex-col items-start gap-4 rounded-lg border p-4 cursor-pointer transition-all hover:shadow-md peer-data-[state=checked]:border-primary peer-data-[state=checked]:shadow-lg [&:has([data-state=checked])]:border-primary">
                                                                <div className="flex justify-between w-full items-start">
                                                                    <div className="space-y-1">
                                                                        <span className="font-semibold text-lg">{service.serviceName}</span>
                                                                        <p className="text-sm text-muted-foreground">{service.description}</p>
                                                                    </div>
                                                                    <span className="font-bold text-primary text-xl whitespace-nowrap">
                                                                        {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(service.estimate || 0)}
                                                                    </span>
                                                                </div>
                                                                
                                                                {(service.baseCost && (service.additionalCharges && service.additionalCharges.length > 0)) && (
                                                                    <div className="w-full space-y-1 border-t pt-2">
                                                                        <div className="flex justify-between text-xs">
                                                                            <span className="text-muted-foreground">Base Shipping Cost</span>
                                                                            <span>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(service.baseCost || 0)}</span>
                                                                        </div>
                                                                        {service.additionalCharges.map((charge, index) => (
                                                                            <div key={index} className="flex justify-between text-xs">
                                                                                <span className="text-muted-foreground">{charge.name}</span>
                                                                                <span>+ {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(charge.amount)}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                                
                                                                {service.minimumWeightApplied && service.minimumWeight && (
                                                                    <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-2 py-1">
                                                                        <Info className="h-3.5 w-3.5" />
                                                                        <span>Price based on {service.minimumWeight}{isUSImport ? 'lbs' : 'kg'} minimum weight.</span>
                                                                    </div>
                                                                )}

                                                                {service.features && service.features.length > 0 && (
                                                                    <div className="space-y-2 pt-4 border-t w-full">
                                                                        {service.features.map((feature, index) => {
                                                                            const isWarning = feature.toLowerCase().includes('customs fees');
                                                                            return (
                                                                                <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                                                                                    {isWarning ? (
                                                                                        <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                                                                                    ) : (
                                                                                        <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                                                                                    )}
                                                                                    <span>{feature}</span>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                )}
                                                            </Label>
                                                        </FormItem>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage className="pt-2" />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    )}

                    {estimateResult.error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Could Not Get Estimate</AlertTitle>
                            <AlertDescription>{estimateResult.error}</AlertDescription>
                        </Alert>
                    )}
                </div>
                )}
            </div>
            
            <div className="flex items-center justify-center gap-4">
                {step === 'details' && (
                    <Button type="button" size="lg" onClick={onGetEstimate} disabled={isSubmitting || isEstimating}>
                        {isEstimating ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            <Calculator className="mr-2 h-5 w-5" />
                        )}
                        Get Estimate
                    </Button>
                )}

                {step === 'confirm' && estimateResult?.estimates && estimateResult.estimates.length > 0 && (
                    <>
                        <Button type="button" size="lg" variant="outline" onClick={() => setStep('details')} disabled={isSubmitting}>
                          <ArrowLeft className="mr-2 h-5 w-5" />
                            Go Back
                        </Button>
                        <Button type="button" size="lg" onClick={onAcceptAndBook} disabled={isSubmitting}>
                            {isSubmitting ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <Banknote className="mr-2 h-5 w-5" />
                            )}
                            Accept & Continue
                        </Button>
                    </>
                )}
                {step === 'confirm' && estimateResult?.error && (
                    <Button type="button" size="lg" variant="outline" onClick={() => setStep('details')} disabled={isSubmitting}>
                      <ArrowLeft className="mr-2 h-5 w-5" />
                        Go Back & Edit
                    </Button>
                )}

                {step === 'contacts' && (
                    <>
                        <Button type="button" size="lg" variant="outline" onClick={() => setStep('confirm')} disabled={isSubmitting}>
                          <ArrowLeft className="mr-2 h-5 w-5" />
                            Back to Services
                        </Button>
                        <Button type="button" size="lg" onClick={onFinalSubmit} disabled={isSubmitting}>
                            {isSubmitting ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <CheckCircle className="mr-2 h-5 w-5" />
                            )}
                            {isSubmitting ? 'Submitting...' : 'Confirm & Proceed to Payment'}
                        </Button>
                    </>
                )}
            </div>
        </div>
      </form>
    </Form>
  )
}
