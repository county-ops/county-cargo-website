
'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState, useEffect } from "react"
import { toast } from "@/hooks/use-toast"
import { Address } from "@/lib/types"
import { AddressAutocomplete } from "@/components/address-autocomplete"
import { useProfile } from "@/components/profile-provider"
import { addAddress, updateAddress } from "@/lib/user-actions"

import { Button } from "@/components/ui/button"
import {
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
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
import { Loader2 } from "lucide-react"


const formSchema = z.object({
  addressName: z.string().min(2, {
    message: "Please enter a name for this address (e.g., Home, Office).",
  }),
  address: z.string().min(10, {
    message: "Please select a valid address.",
  }),
  contactName: z.string().min(2, { message: "Please enter a contact name." }),
  contactPhone: z.string().min(10, { message: "Please enter a valid phone number." }),
  contactEmail: z.string().email({ message: "Please enter a valid email." }),
})

type FormValues = z.infer<typeof formSchema>

interface AddressFormProps {
    addressToEdit?: Address | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (address: Address) => void;
}

export default function AddressForm({ addressToEdit, isOpen, onClose, onSave }: AddressFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, profile } = useProfile();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: addressToEdit ? {
        addressName: addressToEdit.addressName,
        address: addressToEdit.address,
        contactName: addressToEdit.contactName,
        contactPhone: addressToEdit.contactPhone,
        contactEmail: addressToEdit.contactEmail,
    } : {
        addressName: "",
        address: "",
        contactName: "",
        contactPhone: "",
        contactEmail: profile?.email || "",
    },
  })
  
  // Reset form when the address to edit changes or when dialog opens for a new address
  // Using the isOpen prop as a key on the Dialog component proved unreliable
  useEffect(() => {
    form.reset(addressToEdit ? {
        addressName: addressToEdit.addressName,
        address: addressToEdit.address,
        contactName: addressToEdit.contactName,
        contactPhone: addressToEdit.contactPhone,
        contactEmail: addressToEdit.contactEmail,
    } : {
        addressName: "",
        address: "",
        contactName: "",
        contactPhone: "",
        contactEmail: profile?.email || "",
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressToEdit, isOpen]);

  async function onSubmit(values: FormValues) {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Not Authenticated",
            description: "You must be logged in to save an address."
        });
        return;
    }

    setIsSubmitting(true);
    try {
        let savedAddress: Address;
        const addressData = {
          ...values,
          id: addressToEdit ? addressToEdit.id : new Date().toISOString(), // Simple unique ID
          userId: user.uid,
        };

        if (addressToEdit) {
           await updateAddress(user.uid, addressData);
           savedAddress = addressData;
        } else {
           await addAddress(user.uid, addressData);
           savedAddress = addressData;
        }
        
        onSave(savedAddress);
        toast({
            title: addressToEdit ? "Address Updated" : "Address Saved",
            description: "Your address has been successfully saved to your address book.",
        });
        onClose();
    } catch (error) {
        console.error("Error saving address:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "An unexpected error occurred while saving the address."
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{addressToEdit ? 'Edit Address' : 'Add New Address'}</DialogTitle>
          <DialogDescription>
            {addressToEdit ? 'Update the details of your saved address.' : 'Save a new address for faster booking in the future.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField
                    control={form.control}
                    name="addressName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Address Label</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Home, Office" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                               <AddressAutocomplete 
                                    onAddressSelect={(address) => field.onChange(address.description)}
                                    placeholder="Start typing your address..."
                                    defaultValue={field.value}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Contact Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., +1 234 567 890" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., johndoe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter className="pt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isSubmitting ? 'Saving...' : 'Save Address'}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
