

'use client';

import { useEffect, useState, useMemo } from 'react';
import { doc, getDoc, updateDoc, Timestamp, collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter, useParams } from 'next/navigation';
import { Shipment, ShipmentStatus, Package as PackageType, UserProfile, Transaction, AppliedCharge } from '@/lib/types';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addBusinessDays, format } from 'date-fns';
import { getShippingEstimate, GetShippingEstimateOutput, ServiceEstimate } from '@/ai/flows/get-shipping-estimate-flow';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Save, User, Mail, Calendar, Package, MapPin, PlaneTakeoff, PlaneLanding, Scale, Box, FileText, PackagePlus, X, Calculator, AlertCircle, Phone, Banknote, TrendingDown, TrendingUp, PlusCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShipmentStatusBadge } from '@/components/shipment-status-badge';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { getEmailSettings } from '@/lib/email-settings';
import { sendEmail } from '@/lib/email';
import { getUserProfile, updateShipmentStatuses, updateShipmentsAsPaid, updateUserProfile } from '@/lib/user-actions';
import { AppSettings, getSettings } from '@/lib/settings';


const packageSchema = z.object({
  weight: z.coerce.number().min(0.1, { message: "Weight must be at least 0.1." }),
  length: z.coerce.number().min(1, { message: "Length must be at least 1." }),
  width: z.coerce.number().min(1, { message: "Width must be at least 1." }),
  height: z.coerce.number().min(1, { message: "Height must be at least 1." }),
  description: z.string().min(3, { message: "Please describe the contents." }),
  value: z.coerce.number().optional(),
  cost: z.number().optional(),
});

const shipperReceiverSchema = z.object({
    name: z.string().min(2, "Name is required."),
    email: z.string().email("Please enter a valid email."),
    phone: z.string().min(1, "Phone number is required."),
});

const appliedChargeSchema = z.object({
  name: z.string().min(1, "Description is required"),
  amount: z.coerce.number().min(0, "Amount must be non-negative"),
});


const editShipmentSchema = z.object({
    status: z.custom<ShipmentStatus>(),
    paymentStatus: z.enum(['Paid', 'Unpaid']),
    totalCost: z.string().optional(),
    packages: z.array(packageSchema).min(1, "At least one package is required.").max(3, "A maximum of 3 packages is allowed."),
    shipper: shipperReceiverSchema,
    receiver: shipperReceiverSchema,
    additionalChargesApplied: z.array(appliedChargeSchema).optional(),
});

type EditShipmentFormValues = z.infer<typeof editShipmentSchema>;

const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | React.ReactNode }) => (
    <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
        <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
            <span className="text-base font-semibold">{value}</span>
        </div>
    </div>
);


export default function EditBookingPage() {
    const [shipment, setShipment] = useState<Shipment | null>(null);
    const [customer, setCustomer] = useState<UserProfile | null>(null);
    const [expenses, setExpenses] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEstimating, setIsEstimating] = useState(false);
    const [newEstimate, setNewEstimate] = useState<ServiceEstimate | null>(null);
    const [estimateError, setEstimateError] = useState<string | null>(null);
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const form = useForm<EditShipmentFormValues>({
        resolver: zodResolver(editShipmentSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "packages"
    });
    
    const { fields: chargesFields, append: appendCharge, remove: removeCharge } = useFieldArray({
        control: form.control,
        name: "additionalChargesApplied"
    });
    
    useEffect(() => {
        if (typeof id !== 'string') return;
        
        const docRef = doc(db, 'shipments', id);
        const unsubShipment = onSnapshot(docRef, async (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                const shipmentData = {
                    ...data,
                    docId: docSnap.id,
                    bookingDate: data.bookingDate instanceof Timestamp ? data.bookingDate.toDate() : new Date(data.bookingDate),
                    estimatedDelivery: data.estimatedDelivery instanceof Timestamp ? data.estimatedDelivery.toDate() : (data.estimatedDelivery ? new Date(data.estimatedDelivery) : null),
                    paymentDate: data.paymentDate instanceof Timestamp ? data.paymentDate.toDate() : (data.paymentDate ? new Date(data.paymentDate) : null),
                    pickupDate: data.pickupDate instanceof Timestamp ? data.pickupDate.toDate() : (data.pickupDate ? new Date(data.pickupDate) : null),
                } as Shipment;
                setShipment(shipmentData);
                document.title = `Shipment ${shipmentData.id} | County Cargo`;

                if (!customer) {
                    const customerProfile = await getUserProfile(shipmentData.userId);
                    setCustomer(customerProfile);
                }

                form.reset({
                    status: shipmentData.status,
                    paymentStatus: shipmentData.paymentStatus || 'Unpaid',
                    totalCost: shipmentData.totalCost ? Math.round(parseFloat(shipmentData.totalCost)).toString() : '',
                    packages: shipmentData.packages.map(p => ({
                        ...p, 
                        weight: Number(p.weight), 
                        length: Number(p.length), 
                        width: Number(p.width), 
                        height: Number(p.height),
                        value: p.value ? Number(p.value) : ('' as any),
                    })),
                    shipper: shipmentData.shipper,
                    receiver: shipmentData.receiver,
                    additionalChargesApplied: shipmentData.additionalChargesApplied || [],
                });

                setLoading(false);
            } else {
                toast({ variant: 'destructive', title: 'Error', description: 'Shipment not found.' });
                router.push('/dashboard/admin/bookings');
                setLoading(false);
            }
        });

        // Fetch related expenses
        const expensesQuery = query(collection(db, 'transactions'), where('shipmentId', '==', id), where('type', '==', 'expense'));
        const unsubExpenses = onSnapshot(expensesQuery, (snapshot) => {
            const expensesData = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    docId: doc.id,
                    ...data,
                    date: (data.date as Timestamp).toDate(),
                } as Transaction;
            });
            setExpenses(expensesData);
        });

        return () => {
            unsubShipment();
            unsubExpenses();
        }
    }, [id, router, form, customer]);


    const handleRecalculate = async () => {
        if (!shipment) return;
        
        const currentPackages = form.getValues('packages');
        
        const isFormValid = await form.trigger('packages');
        if (!isFormValid) {
            toast({
                variant: "destructive",
                title: "Package Info Missing",
                description: "Please fill out all details for all packages.",
            });
            return;
        }

        setIsEstimating(true);
        setEstimateError(null);
        setNewEstimate(null);
        try {
            const isUSImport = shipment.shipmentType === 'import' && shipment.originAddress.includes('United States');
            
            const currentSettings = await getSettings();

            const result = await getShippingEstimate({
                address: shipment.shipmentType === 'export' ? shipment.destinationAddress : shipment.originAddress,
                destinationAddress: shipment.shipmentType === 'import' ? shipment.destinationAddress : undefined,
                packages: currentPackages.map(p => ({
                    weight: Number(p.weight),
                    length: Number(p.length),
                    width: Number(p.width),
                    height: Number(p.height),
                    description: p.description,
                })),
                units: shipment.units,
                shipmentType: shipment.shipmentType,
                settings: currentSettings, 
            });

            if (result.error) {
                setEstimateError(result.error);
                toast({ variant: 'destructive', title: 'Estimation Error', description: result.error });
            } else if (result.estimates && result.estimates.length > 0) {
                 const relevantEstimate = result.estimates.find(e => e.serviceType === shipment.serviceType);
                 if (relevantEstimate && relevantEstimate.estimate !== undefined) {
                    setNewEstimate(relevantEstimate); // Store the entire new estimate object

                    const newOriginalCost = Math.round(relevantEstimate.estimate);
                    const finalCost = newOriginalCost > 0 ? newOriginalCost : 0;
                    
                    form.setValue('totalCost', finalCost.toString(), { shouldValidate: true });
                    form.setValue('additionalChargesApplied', relevantEstimate.additionalCharges || []);


                    if ((shipment.serviceType === 'expressExport' || shipment.serviceType === 'valueImport') && relevantEstimate.perPackageCosts) {
                        const updatedPackages = currentPackages.map((pkg, index) => ({
                            ...pkg,
                            cost: relevantEstimate.perPackageCosts![index]?.cost
                        }));
                        form.setValue('packages', updatedPackages);
                    }

                    toast({ title: 'Estimate Updated', description: `New estimated cost is NGN ${new Intl.NumberFormat().format(finalCost)}. Save changes to apply.` });
                } else {
                     setEstimateError(`Could not find a matching service estimate for '${shipment.serviceType}'.`);
                     toast({ variant: 'destructive', title: 'Estimation Error', description: `Could not find a matching service estimate for '${shipment.serviceType}'.` });
                }
            }

        } catch (error: any) {
            setEstimateError(error.message || 'An unexpected error occurred.');
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to recalculate estimate.' });
        } finally {
            setIsEstimating(false);
        }
    };


    const onSubmit = async (data: EditShipmentFormValues) => {
        if (!shipment || !customer) return;
        setIsSubmitting(true);
        try {
            const docRef = doc(db, 'shipments', shipment.docId);
            const paymentStatusChangedToPaid = data.paymentStatus === 'Paid' && shipment.paymentStatus !== 'Paid';
            const statusChanged = data.status !== shipment.status;
            
            const costOfNewlyCalculatedShipment = parseFloat(data.totalCost || '0');

            const updateData: { [key: string]: any } = {
                paymentStatus: data.paymentStatus,
                totalCost: data.totalCost,
                shipper: data.shipper,
                receiver: data.receiver,
                packages: data.packages.map(p => {
                    const newPackage: Partial<PackageType> = {
                        weight: Number(p.weight),
                        length: Number(p.length),
                        width: Number(p.width),
                        height: Number(p.height),
                        description: p.description,
                        value: p.value || 0,
                    };
                    if (p.cost !== undefined) {
                        newPackage.cost = p.cost;
                    }
                    return newPackage;
                }),
                additionalChargesApplied: data.additionalChargesApplied,
            };
            
            // If there's a new estimate from recalculation, update relevant fields
            if (newEstimate) {
                updateData.originalCost = Math.round(newEstimate.estimate || 0).toString();
                updateData.billableWeight = newEstimate.billableWeight || shipment.billableWeight;
                // Add any other fields from the estimate you need to save
                updateData.rate = newEstimate.rate || shipment.rate;
                updateData.exchangeRate = newEstimate.exchangeRate || shipment.exchangeRate;
                updateData.handlingFee = newEstimate.handlingFee || shipment.handlingFee;
                updateData.minimumWeightApplied = newEstimate.minimumWeightApplied || shipment.minimumWeightApplied;
                updateData.minimumWeight = newEstimate.minimumWeight || shipment.minimumWeight;
            }

            if (paymentStatusChangedToPaid) {
                await updateShipmentsAsPaid([shipment.docId]);
            }
            
            await updateDoc(docRef, updateData);
            
            if (statusChanged) {
                await updateShipmentStatuses([shipment.docId], data.status);
            }

            toast({
                title: 'Shipment Updated',
                description: `Shipment ${shipment.id} has been successfully updated.`,
            });
            // Data is refetched by onSnapshot, no need to call fetchShipmentData
            setNewEstimate(null); // Reset new estimate after saving
            
        } catch (error) {
            console.error('Update error:', error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to update shipment.' });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const { totalExpenses, profit } = useMemo(() => {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const revenue = shipment ? parseFloat(shipment.totalCost || '0') : 0;
        const netProfit = revenue - total;
        return { totalExpenses: total, profit: netProfit };
    }, [expenses, shipment]);


    if (loading || !customer) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!shipment) {
        return null;
    }
    
    const isExport = shipment.shipmentType === 'export';
    const totalCostValue = form.watch('totalCost');

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="font-semibold text-lg md:text-2xl">Shipment Details</h1>
                    <p className="text-muted-foreground text-sm">Shipment ID: {shipment.id}</p>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-3">
                    <div className="space-y-8 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Shipment Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-x-6 gap-y-8 md:grid-cols-2">
                                    <DetailItem icon={User} label="Customer Email" value={shipment.email} />
                                    <DetailItem 
                                        icon={isExport ? PlaneTakeoff : PlaneLanding} 
                                        label="Shipment Type" 
                                        value={<Badge variant="outline" className="capitalize">{shipment.shipmentType}</Badge>} 
                                    />
                                    <DetailItem 
                                        icon={Calendar} 
                                        label="Booking Date" 
                                        value={shipment.bookingDate ? format(shipment.bookingDate, 'PPP') : 'N/A'} 
                                    />
                                    <DetailItem 
                                        icon={Calendar} 
                                        label="Estimated Delivery" 
                                        value={shipment.estimatedDelivery ? format(shipment.estimatedDelivery, 'PPP') : 'Pending'} 
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                             <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="font-medium flex items-center gap-2 text-primary"><User className="h-5 w-5" /> Shipper</h3>
                                    <FormField control={form.control} name="shipper.name" render={({ field }) => (
                                        <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name="shipper.email" render={({ field }) => (
                                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name="shipper.phone" render={({ field }) => (
                                        <FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                                        <p className="text-base font-semibold mt-2">{shipment.originAddress}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-medium flex items-center gap-2 text-primary"><User className="h-5 w-5" /> Receiver</h3>
                                     <FormField control={form.control} name="receiver.name" render={({ field }) => (
                                        <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name="receiver.email" render={({ field }) => (
                                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name="receiver.phone" render={({ field }) => (
                                        <FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                     <div>
                                        <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                                        <p className="text-base font-semibold mt-2">{shipment.destinationAddress}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>


                        <Card>
                            <CardHeader>
                                <CardTitle>Package Details</CardTitle>
                                <CardDescription>Edit package information and recalculate cost if needed.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {fields.map((item, index) => (
                                    <div key={item.id} className="relative rounded-lg border p-4">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h4 className="flex items-center gap-2 font-semibold"><Package className="h-5 w-5" /> Package {index + 1}</h4>
                                            {fields.length > 1 && (
                                                <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => remove(index)}>
                                                    <X className="h-5 w-5" />
                                                </Button>
                                            )}
                                        </div>
                                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                            <FormField control={form.control} name={`packages.${index}.weight`} render={({ field }) => (
                                                <FormItem className="lg:col-span-1"><FormLabel>Weight ({shipment.units === 'imperial' ? 'lbs' : 'kg'})</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <FormField control={form.control} name={`packages.${index}.length`} render={({ field }) => (
                                                <FormItem className="lg:col-span-1"><FormLabel>Length ({shipment.units === 'imperial' ? 'in' : 'cm'})</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <FormField control={form.control} name={`packages.${index}.width`} render={({ field }) => (
                                                <FormItem className="lg:col-span-1"><FormLabel>Width ({shipment.units === 'imperial' ? 'in' : 'cm'})</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <FormField control={form.control} name={`packages.${index}.height`} render={({ field }) => (
                                                <FormItem className="lg:col-span-1"><FormLabel>Height ({shipment.units === 'imperial' ? 'in' : 'cm'})</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <FormField control={form.control} name={`packages.${index}.value`} render={({ field }) => (
                                                <FormItem className="lg:col-span-1"><FormLabel>Value (NGN)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                        </div>
                                        <FormField control={form.control} name={`packages.${index}.description`} render={({ field }) => (
                                            <FormItem className="mt-4"><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="e.g. 10 boxes of books" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => append({ weight: 0.1, length: 1, width: 1, height: 1, description: "", value: '' as any })}
                                    disabled={fields.length >= 3}
                                >
                                    <PackagePlus className="mr-2 h-4 w-4" /> Add Package
                                </Button>
                                 <FormField
                                    name="packages"
                                    control={form.control}
                                    render={() => (
                                        <FormMessage />
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="sticky top-6">
                            <CardHeader>
                                <CardTitle>Shipment Management</CardTitle>
                                <CardDescription>Update payment status, shipping status, and cost.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Current Status</Label>
                                    <ShipmentStatusBadge status={shipment.status} />
                                </div>
                                <Separator />
                                <FormField control={form.control} name="status" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Manual Status Override</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Select a status" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="Unpaid">Unpaid</SelectItem>
                                                <SelectItem value="Awaiting Confirmation">Awaiting Confirmation</SelectItem>
                                                <SelectItem value="Received at Hub">Received at Hub</SelectItem>
                                                <SelectItem value="Processing">Processing</SelectItem>
                                                <SelectItem value="In Transit">In Transit</SelectItem>
                                                <SelectItem value="Awaiting Collection">Awaiting Collection</SelectItem>
                                                <SelectItem value="On Hold">On Hold</SelectItem>
                                                <SelectItem value="Delivered">Delivered</SelectItem>
                                                <SelectItem value="Delayed">Delayed</SelectItem>
                                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="paymentStatus" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Payment Status</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Select a payment status" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="Unpaid">Unpaid</SelectItem>
                                                <SelectItem value="Paid">Paid</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <Separator />

                                <div className="space-y-4">
                                    <Label>Additional Charges</Label>
                                    <div className="space-y-2">
                                        {chargesFields.map((field, index) => (
                                            <div key={field.id} className="flex items-center gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`additionalChargesApplied.${index}.name`}
                                                    render={({ field }) => (
                                                        <FormItem className="flex-grow">
                                                            <FormControl>
                                                                <Input {...field} placeholder="Charge description" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name={`additionalChargesApplied.${index}.amount`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input {...field} type="number" placeholder="Amount" className="w-32" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button type="button" variant="ghost" size="icon" className="shrink-0" onClick={() => removeCharge(index)}>
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => appendCharge({ name: '', amount: 0 })}
                                        className="mt-2"
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" /> Add Charge
                                    </Button>
                                    <FormField
                                        control={form.control}
                                        name="additionalChargesApplied"
                                        render={() => <FormMessage />}
                                    />
                                </div>
                                <Separator />
                                
                                <div className="space-y-2">
                                    <Label>Total Cost (NGN)</Label>
                                    <div className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm">
                                        {totalCostValue ? new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(Number(totalCostValue)) : 'N/A'}
                                    </div>
                                </div>
                                 <Button type="button" variant="secondary" className="w-full" onClick={handleRecalculate} disabled={isEstimating}>
                                    {isEstimating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Calculator className="mr-2 h-4 w-4" />}
                                    Recalculate Estimate
                                </Button>
                                {estimateError && (
                                     <Alert variant="destructive" className="text-xs">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>{estimateError}</AlertDescription>
                                    </Alert>
                                )}
                                 <FormField control={form.control} name="totalCost" render={({ field }) => (
                                    <FormItem className="hidden">
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <div className="flex justify-end pt-4">
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                        Save Changes
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </Form>
        </div>
    );
}
    

    




    

    


