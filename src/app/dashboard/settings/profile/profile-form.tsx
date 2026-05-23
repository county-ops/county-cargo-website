
'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState, useEffect } from "react"
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
import { Label } from "@/components/ui/label"
import { Loader2, Save, KeyRound, Mail, Copy, Webhook, ShieldCheck, FlaskConical } from "lucide-react"
import { useProfile } from "@/components/profile-provider"
import { updateUserProfile } from "@/lib/user-actions"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/hooks/use-auth"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const profileFormSchema = z.object({
  firstname: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  phone_number: z.string().min(1, "Phone number is required."),
  phone2: z.string().optional(),
  company: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  webhookUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function ProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSendingReset, setIsSendingReset] = useState(false)
  const { profile, user, profileLoading } = useProfile()
  const { sendPasswordResetEmail, authUser } = useAuth();


  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phone_number: "",
      phone2: "",
      company: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      webhookUrl: "",
    },
    mode: "onChange",
  })

  useEffect(() => {
    if (profile) {
      form.reset({
        firstname: profile.firstname,
        lastname: profile.lastname,
        phone_number: profile.phone_number,
        phone2: profile.phone2 || "",
        company: profile.company || "",
        address: profile.address || "",
        city: profile.city || "",
        state: profile.state || "",
        zipCode: profile.zipCode || "",
        country: profile.country || "",
        webhookUrl: profile.webhookUrl || "",
      })
    }
  }, [profile, form])

  async function onSubmit(data: ProfileFormValues) {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Not Authenticated",
        description: "You must be logged in to update your profile.",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await updateUserProfile(user.uid, data)
      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully saved.",
      })
    } catch (error) {
      console.error("Failed to update profile:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save profile. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePasswordReset = async () => {
    if (!authUser?.email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not find your email address.",
      });
      return;
    }

    setIsSendingReset(true);
    try {
      await sendPasswordResetEmail(authUser.email);
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your inbox for a link to change your password.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error Sending Email",
        description: error.message,
      });
    } finally {
      setIsSendingReset(false);
    }
  };
  
  const handleCopy = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        toast({ title: `${label} copied to clipboard.` });
    });
  };
  
  if (profileLoading) {
      return (
          <div className="space-y-6">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-32" />
          </div>
      )
  }

  return (
    <div className="space-y-8">
        <div className="space-y-2">
            <Label>Email Address</Label>
            <div className="flex items-center gap-2 text-sm text-muted-foreground border rounded-md px-3 h-10">
                <Mail className="h-4 w-4" />
                <span>{profile?.email}</span>
            </div>
        </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-4">
              <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                      <Input placeholder="Your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                      <Input placeholder="Your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                    <Input type="tel" placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="phone2"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>2nd Phone Number (Optional)</FormLabel>
                    <FormControl>
                    <Input type="tel" placeholder="Alternative phone" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
          </div>
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Your company name" {...field} />
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
                  <Input placeholder="123 Main St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <div className="grid md:grid-cols-3 gap-4">
              <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                      <Input {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>State/Province</FormLabel>
                  <FormControl>
                      <Input {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
               <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Zip/Postal Code</FormLabel>
                  <FormControl>
                      <Input {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
          </div>
            <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Country of Residence</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="nigeria">Nigeria</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Update Profile
          </Button>
        </form>
      </Form>
      
        {profile?.role === 'Business' && (
            <>
                <Separator />
                 <div className="space-y-6">
                    <div className="space-y-2">
                        <h4 className="text-base font-medium flex items-center gap-2"><KeyRound className="h-5 w-5" /> API Keys</h4>
                        {profile.apiKey ? (
                             <p className="text-sm text-muted-foreground">
                                Use these keys to authenticate with the County Cargo API. Always use Staging for testing.
                            </p>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Generate API keys to programmatically interact with County Cargo services. You must agree to our Service Level Agreement to get started.
                            </p>
                        )}
                    </div>

                    {profile.apiKey ? (
                         <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1">
                                    <FlaskConical className="h-3 w-3 text-blue-600" /> Staging Key
                                </Label>
                                <div className="flex gap-2">
                                    <Input value={profile.testApiKey || 'No test key generated'} readOnly />
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() => handleCopy(profile.testApiKey as string, 'Staging API Key')}
                                        disabled={!profile.testApiKey}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                                <p className="text-[10px] text-muted-foreground">
                                    Use the Staging Key with the <code className="bg-muted px-1 rounded">/api/v1/test/</code> endpoints for safe testing.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Production Key</Label>
                                <div className="flex gap-2">
                                    <Input value={profile.apiKey} readOnly />
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() => handleCopy(profile.apiKey as string, 'Production API Key')}
                                        disabled={!profile.apiKey}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Button asChild>
                            <Link href="/dashboard/api-docs/sla">
                                <ShieldCheck className="mr-2 h-4 w-4" />
                                View SLA & Generate Key
                            </Link>
                        </Button>
                    )}
                </div>

                <Separator />

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <h4 className="text-base font-medium flex items-center gap-2"><Webhook className="h-5 w-5" /> Webhook URL</h4>
                            <p className="text-sm text-muted-foreground">
                                Enter a URL to receive real-time notifications about your shipment status updates.
                            </p>
                        </div>
                        <FormField
                            control={form.control}
                            name="webhookUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Webhook URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com/webhook" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        We will send a POST request with a JSON payload to this URL when a shipment's status changes.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Save Webhook URL
                        </Button>
                    </form>
                </Form>
            </>
        )}

      <Separator />

      <div className="space-y-4">
        <h4 className="text-base font-medium">Change Password</h4>
        <p className="text-sm text-muted-foreground">
            Click the button below to receive an email with a secure link to change your password.
        </p>
         <Button onClick={handlePasswordReset} disabled={isSendingReset} variant="outline">
          {isSendingReset ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <KeyRound className="mr-2 h-4 w-4" />
          )}
          Send Password Reset Link
        </Button>
      </div>

    </div>
  )
}
