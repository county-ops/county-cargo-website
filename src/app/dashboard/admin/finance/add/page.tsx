'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState, useEffect } from "react"
import { toast } from "@/hooks/use-toast"
import { addDoc, collection, Timestamp, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format } from "date-fns"
import { Shipment } from "@/lib/types"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
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
import { Loader2, CalendarIcon, ArrowLeft, Save, ChevronsUpDown, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"


const formSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
  type: z.enum(['income', 'expense'], {
    required_error: "Please select a transaction type."
  }),
  amount: z.coerce.number().min(1, "Amount must be greater than 0."),
  description: z.string().min(3, "Description is required."),
  shipmentId: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function AddTransactionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loadingShipments, setLoadingShipments] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const fetchShipments = async () => {
        setLoadingShipments(true);
        const q = query(collection(db, 'shipments'), orderBy('bookingDate', 'desc'));
        const querySnapshot = await getDocs(q);
        const shipmentsData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                docId: doc.id,
            } as Shipment;
        });
        setShipments(shipmentsData);
        setLoadingShipments(false);
    };
    fetchShipments();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        date: new Date(),
        type: 'expense',
        amount: 0,
        description: "",
        shipmentId: "",
    },
  })
  
  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
        if (values.type === 'expense') {
            const transactionsQuery = query(collection(db, 'transactions'));
            const querySnapshot = await getDocs(transactionsQuery);
            let currentBalance = 0;
            querySnapshot.forEach(doc => {
                const data = doc.data();
                if (data.type === 'income') {
                    currentBalance += data.amount || 0;
                } else if (data.type === 'expense') {
                    currentBalance -= data.amount || 0;
                }
            });

            if (values.amount > currentBalance) {
                toast({
                    variant: "destructive",
                    title: "Insufficient Funds",
                    description: `The expense amount of ${new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(values.amount)} exceeds the available cash of ${new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(currentBalance)}.`,
                });
                setIsSubmitting(false);
                return;
            }
        }

        const uniqueId = `txn_${new Date().getTime()}`;
        const transactionData = {
          id: uniqueId,
          date: Timestamp.fromDate(values.date),
          type: values.type,
          amount: values.amount,
          description: values.description,
          shipmentId: values.shipmentId || null,
        };

        await addDoc(collection(db, "transactions"), transactionData);
        
        toast({
            title: "Transaction Added",
            description: "The new transaction has been successfully logged.",
        });
        form.reset({
          date: new Date(),
          type: 'expense',
          amount: 0,
          description: "",
          shipmentId: "",
      });
    } catch (error) {
        console.error("Error adding transaction:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "An unexpected error occurred."
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="font-semibold text-lg md:text-2xl">Add New Transaction</h1>
          <p className="text-muted-foreground text-sm">Manually log new cash deposits or office expenses.</p>
        </div>
      </div>
      <Card className="max-w-2xl mx-auto w-full">
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
          <CardDescription>Use this form to record cash movements.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Transaction Date</FormLabel>
                         <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
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
                                onSelect={(date) => {
                                  if (date) {
                                    field.onChange(date);
                                  }
                                  setIsCalendarOpen(false);
                                }}
                                disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transaction Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select transaction type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="income">Cash In (Deposit)</SelectItem>
                            <SelectItem value="expense">Cash Out (Expense)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Amount (NGN)</FormLabel>
                          <FormControl>
                              <Input type="number" step="0.01" {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                  />
                   <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                              <Textarea placeholder="e.g., Office rent for May, Petty cash deposit" {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                  />
                   <FormField
                        control={form.control}
                        name="shipmentId"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Shipment ID (Optional)</FormLabel>
                                <FormDescription>Link this expense to a specific shipment.</FormDescription>
                                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn("justify-between", !field.value && "text-muted-foreground")}
                                            >
                                                {field.value ? shipments.find((s) => s.id === field.value)?.id : "Select shipment..."}
                                                {loadingShipments ? <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin" /> : <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search shipment..." />
                                            <CommandEmpty>No shipment found.</CommandEmpty>
                                            <CommandGroup>
                                                {shipments.map((shipment) => (
                                                    <CommandItem
                                                        value={shipment.id}
                                                        key={shipment.id}
                                                        onSelect={() => {
                                                            form.setValue("shipmentId", shipment.id);
                                                            setPopoverOpen(false);
                                                        }}
                                                    >
                                                        <Check className={cn("mr-2 h-4 w-4", shipment.id === field.value ? "opacity-100" : "opacity-0")} />
                                                        {shipment.id}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                  <div className="flex justify-end pt-4">
                      <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                          {isSubmitting ? 'Saving...' : 'Save Transaction'}
                      </Button>
                  </div>
              </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
