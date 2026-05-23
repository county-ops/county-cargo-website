'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import React, { useState, useEffect, useMemo } from "react";
import { UserProfile } from "@/lib/types";
import { useProfile } from "@/components/profile-provider";
import { getCachedAllUsers, logPackageReceipts, PackageLogData } from "@/lib/user-actions";
import { getShippingOptions, addCustomSender, addCustomCourier, ShippingOptions } from "@/lib/shipping-options";


import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Loader2, PlusCircle, Trash2, Check, ChevronsUpDown, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";


// Schemas
const packageRowSchema = z.object({
  id: z.string(),
  customer: z.custom<UserProfile>().nullable().refine(val => val !== null, { message: "Customer is required." }),
  qty: z.coerce.number().min(1, "Qty must be at least 1."),
  weight: z.coerce.number().min(0.1, "Weight is required."),
  length: z.coerce.number().optional(),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  sender: z.string().min(2, "Sender is required."),
  courier: z.string().min(1, "Courier is required."),
  courierCode: z.string().optional(),
  trackingNumber: z.string().optional(),
  comment: z.string().optional(),
});

const batchPackageSchema = z.object({
  packageRows: z.array(packageRowSchema),
  location: z.enum(['US Warehouse', 'UK Warehouse', 'Lagos Warehouse', 'Out of State']),
});

// Data Lists
const otherSenders = ['Other', 'Unknown'];
const otherCouriers = ['Other'];


// Searchable Select Component
function SearchableSelect({ value, onChange, placeholder, groups, onAdd }: { value: string; onChange: (value: string) => void; placeholder: string; groups: { label: string; options: string[] }[], onAdd?: (value: string) => void }) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');

    const handleSelect = (selectedValue: string) => {
        onChange(selectedValue);
        setOpen(false);
        setSearch('');
    };

    const isNewItem = search && !groups.flatMap(g => g.options).some(opt => opt.toLowerCase() === search.toLowerCase());

    // Memoize the filtered groups to avoid re-calculating on every render
    const filteredGroups = React.useMemo(() => {
        if (!search) return groups;
        return groups
            .map(group => ({
                ...group,
                options: group.options.filter(option =>
                    option.toLowerCase().includes(search.toLowerCase())
                ),
            }))
            .filter(group => group.options.length > 0);
    }, [groups, search]);
    
    return (
        <Popover open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) {
                setSearch(''); // Reset search on close
            }
        }}>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button variant="outline" role="combobox" className={cn("w-full justify-between font-normal", !value && "text-muted-foreground")}>
                        {value || placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command shouldFilter={false}>
                    <CommandInput
                        placeholder={`Search ${placeholder.toLowerCase()}...`}
                        value={search}
                        onValueChange={setSearch}
                    />
                    <CommandList>
                        {isNewItem && search.length > 0 ? (
                             <CommandItem
                                value={search}
                                onSelect={() => {
                                    if (onAdd) {
                                        onAdd(search);
                                    }
                                    handleSelect(search);
                                }}
                             >
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add "{search}"
                            </CommandItem>
                        ) : <CommandEmpty>No results found.</CommandEmpty>}

                        {filteredGroups.map((group) => (
                           group.options.length > 0 && (
                             <CommandGroup key={group.label} heading={group.label}>
                                {group.options.map((option) => (
                                    <CommandItem
                                        key={option}
                                        value={option}
                                        onSelect={() => handleSelect(option)}
                                    >
                                        <Check className={cn("mr-2 h-4 w-4", value === option ? "opacity-100" : "opacity-0")} />
                                        {option}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                           )
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}


// Main Component
export default function BatchAddPackageForm() {
    const { profile: adminProfile } = useProfile();
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [shippingOptions, setShippingOptions] = useState<ShippingOptions | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof batchPackageSchema>>({
        resolver: zodResolver(batchPackageSchema),
        defaultValues: { 
            packageRows: [],
            location: 'US Warehouse'
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "packageRows",
    });

    const location = form.watch('location');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [userList, options] = await Promise.all([
                    getCachedAllUsers(),
                    getShippingOptions(),
                ]);
                setUsers(userList);
                setShippingOptions(options);
            } catch (err) {
                console.error("Failed to load data:", err);
                toast({ variant: "destructive", title: "Error", description: "Could not load initial data." });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAddSender = async (value: string) => {
        if (!value || !shippingOptions || [...(shippingOptions?.usSenders || []), ...(shippingOptions?.ukSenders || []), ...shippingOptions.customSenders].some(s => s.toLowerCase() === value.toLowerCase())) return;

        setShippingOptions(prev => prev ? ({ ...prev, customSenders: [...prev.customSenders, value].sort() }) : null);
        try {
            await addCustomSender(value);
        } catch (e) {
            toast({ variant: 'destructive', title: 'Error', description: 'Could not save new sender.' });
        }
    };
    
    const handleAddCourier = async (value: string) => {
        if (!value || !shippingOptions || [...(shippingOptions?.usCouriers || []), ...(shippingOptions?.ukCouriers || []), ...shippingOptions.customCouriers].some(c => c.toLowerCase() === value.toLowerCase())) return;
        
        setShippingOptions(prev => prev ? ({ ...prev, customCouriers: [...prev.customCouriers, value].sort() }) : null);
        try {
            await addCustomCourier(value);
        } catch (e) {
            toast({ variant: 'destructive', title: 'Error', description: 'Could not save new courier.' });
        }
    };

    const addRow = () => {
        append({
            id: crypto.randomUUID(),
            customer: null as unknown as UserProfile,
            qty: 1,
            weight: 0,
            length: '' as any,
            width: '' as any,
            height: '' as any,
            sender: '',
            courier: '',
            courierCode: '',
            trackingNumber: '',
            comment: '',
        });
    };
    
    const onFinalSubmit = async (data: z.infer<typeof batchPackageSchema>) => {
        if (!adminProfile) {
            toast({ variant: "destructive", title: "Error", description: "Could not identify current admin user." });
            return;
        }

        if (data.packageRows.length === 0) {
            toast({ variant: "destructive", title: "No Packages", description: "Please add at least one package to log." });
            return;
        }

        setIsSubmitting(true);
        
        const packagesToLog: PackageLogData[] = data.packageRows.map(row => {
            const loc = data.location;
            const region: 'UK' | 'US' | 'NG' = loc === 'US Warehouse' ? 'US' : (loc === 'UK Warehouse' ? 'UK' : 'NG');
            return {
                ...row,
                customer: row.customer!, // Already validated by zod
                location: loc,
                region,
                comment: row.comment || '',
                trackingNumber: row.trackingNumber || '',
                courierCode: row.courierCode || '',
            };
        });

        try {
            await logPackageReceipts(packagesToLog, adminProfile);

            toast({ title: "Packages Logged", description: `${packagesToLog.length} packages have been successfully logged.` });
            form.reset({ packageRows: [], location: data.location });

        } catch (e: any) {
            console.error(e);
            toast({ variant: 'destructive', title: 'Submission Failed', description: e.message || 'An unknown error occurred.' });
        } finally {
            setIsSubmitting(false);
        }
    }


    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFinalSubmit)}>
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem className="w-full max-w-xs">
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Select location" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="US Warehouse">US Warehouse</SelectItem>
                                            <SelectItem value="UK Warehouse">UK Warehouse</SelectItem>
                                            <SelectItem value="Lagos Warehouse">Lagos Warehouse</SelectItem>
                                            <SelectItem value="Out of State">Out of State</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-4">
                         {fields.length === 0 && (
                            <div className="flex items-center justify-center h-24 text-center text-muted-foreground border rounded-md border-dashed">
                                No packages added yet. Click "Add Package" to start.
                            </div>
                        )}
                        {fields.map((field, index) => (
                            <PackageEntry
                                key={field.id}
                                index={index}
                                users={users}
                                control={form.control}
                                remove={remove}
                                location={location}
                                setValue={form.setValue}
                                shippingOptions={shippingOptions}
                                onAddSender={handleAddSender}
                                onAddCourier={handleAddCourier}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={addRow}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Package
                        </Button>
                        <Button type="submit" disabled={isSubmitting || fields.length === 0}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Save className="mr-2 h-4 w-4" /> Save All
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}

// Package Entry Component
function PackageEntry({ index, users, control, remove, location, setValue, shippingOptions, onAddSender, onAddCourier }: { 
    index: number, 
    users: UserProfile[], 
    control: any, 
    remove: (index: number) => void, 
    location: string, 
    setValue: any,
    shippingOptions: ShippingOptions | null,
    onAddSender: (value: string) => void,
    onAddCourier: (value: string) => void,
}) {
    const [popoverOpen, setPopoverOpen] = useState(false);

    useEffect(() => {
        setValue(`packageRows.${index}.sender`, '');
        setValue(`packageRows.${index}.courier`, '');
    }, [location, index, setValue]);

    const senderGroups = useMemo(() => {
        const allCustomSenders = shippingOptions?.customSenders || [];
        const baseSenders = [...new Set([...(shippingOptions?.usSenders || []), ...(shippingOptions?.ukSenders || []), ...allCustomSenders])].sort();
        
        let groups = [];
        if (location === 'US Warehouse') {
            const options = [...new Set([...(shippingOptions?.usSenders || []), ...allCustomSenders])].sort();
            groups.push({ label: 'US Stores', options });
        } else if (location === 'UK Warehouse') {
            const options = [...new Set([...(shippingOptions?.ukSenders || []), ...allCustomSenders])].sort();
            groups.push({ label: 'UK Stores', options });
        } else {
            groups.push({ label: 'All Stores', options: baseSenders });
        }
        groups.push({ label: 'Other', options: otherSenders });
        return groups;
    }, [location, shippingOptions]);
        
    const courierGroups = useMemo(() => {
        const allCustomCouriers = shippingOptions?.customCouriers || [];
        const baseCouriers = [...new Set([...(shippingOptions?.usCouriers || []), ...(shippingOptions?.ukCouriers || []), ...allCustomCouriers])].sort();
        
        let groups = [];
        if (location === 'US Warehouse') {
            const options = [...new Set([...(shippingOptions?.usCouriers || []), ...allCustomCouriers])].sort();
            groups.push({ label: 'Couriers', options });
        } else if (location === 'UK Warehouse') {
            const options = [...new Set([...(shippingOptions?.ukCouriers || []), ...allCustomCouriers])].sort();
            groups.push({ label: 'Couriers', options });
        } else {
            groups.push({ label: 'Couriers', options: baseCouriers });
        }
        groups.push({ label: 'Other', options: otherCouriers });
        return groups;
    }, [location, shippingOptions]);


    return (
        <div className="border rounded-lg p-4 relative space-y-4">
             <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 text-muted-foreground hover:text-destructive h-7 w-7"
                onClick={() => remove(index)}
                >
                <Trash2 className="h-4 w-4" />
            </Button>
            
            <FormField
                control={control}
                name={`packageRows.${index}.customer`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Customer *</FormLabel>
                        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button variant="outline" role="combobox" className={cn("w-full justify-between font-normal", !field.value && "text-muted-foreground")}>
                                        {field.value ? `${field.value.firstname} ${field.value.lastname}` : "Select customer"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0">
                                <Command filter={(value, search) => value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0}>
                                    <CommandInput placeholder="Search customer..." />
                                    <CommandList>
                                        <CommandEmpty>No customer found.</CommandEmpty>
                                        <CommandGroup>
                                            {users.map((user) => (
                                                <CommandItem
                                                    value={`${user.firstname} ${user.lastname} ${user.email}`}
                                                    key={user.uid}
                                                    onSelect={() => {
                                                        field.onChange(user);
                                                        setPopoverOpen(false);
                                                    }}
                                                >
                                                    <Check className={cn("mr-2 h-4 w-4", user.uid === field.value?.uid ? "opacity-100" : "opacity-0")} />
                                                    {user.firstname} {user.lastname}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField control={control} name={`packageRows.${index}.trackingNumber`} render={({ field }) => (
                    <FormItem><FormLabel>Tracking Number</FormLabel><FormControl><Input placeholder="Inbound tracking..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={control} name={`packageRows.${index}.courierCode`} render={({ field }) => (
                    <FormItem><FormLabel>Courier Code</FormLabel><FormControl><Input placeholder="E.g., UPS, FedEx, DHL" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField
                    control={control}
                    name={`packageRows.${index}.sender`}
                    render={({ field }) => (
                        <FormItem>
                             <FormLabel>Sender *</FormLabel>
                            <SearchableSelect 
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Select Sender"
                                groups={senderGroups}
                                onAdd={onAddSender}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={control}
                    name={`packageRows.${index}.courier`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Courier *</FormLabel>
                             <SearchableSelect 
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Select Courier"
                                groups={courierGroups}
                                onAdd={onAddCourier}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <FormField control={control} name={`packageRows.${index}.qty`} render={({ field }) => (
                    <FormItem><FormLabel>Qty *</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={control} name={`packageRows.${index}.weight`} render={({ field }) => (
                    <FormItem><FormLabel>Weight (kg) *</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={control} name={`packageRows.${index}.length`} render={({ field }) => (
                    <FormItem><FormLabel>Length (cm)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={control} name={`packageRows.${index}.width`} render={({ field }) => (
                    <FormItem><FormLabel>Width (cm)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={control} name={`packageRows.${index}.height`} render={({ field }) => (
                    <FormItem><FormLabel>Height (cm)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </div>

             <FormField control={control} name={`packageRows.${index}.comment`} render={({ field }) => (
                <FormItem>
                    <FormLabel>Package Description</FormLabel>
                    <FormControl><Textarea {...field} placeholder="Add description or notes..." /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />

        </div>
    );
}
