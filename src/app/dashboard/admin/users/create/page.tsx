'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Loader2, ArrowLeft, UserPlus, ShieldCheck, Users, Briefcase, UserCog, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useProfile } from "@/components/profile-provider";
import { getAuth } from "firebase/auth";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const ROLE_INFO: Record<string, { icon: React.ElementType; description: string; colour: string; bg: string; border: string }> = {
  Customer: {
    icon: Users,
    description: 'Standard customer. Can view own packages, shipments, and invoices.',
    colour: 'text-slate-700',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
  },
  Staff: {
    icon: UserCog,
    description: 'Operational access. Can log packages, manage shipments, and view users.',
    colour: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  Agent: {
    icon: Briefcase,
    description: 'Partner agent. Can view and track shipments for their accounts.',
    colour: 'text-purple-700',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  Business: {
    icon: Briefcase,
    description: 'Business account with API access, webhooks, and bulk shipments.',
    colour: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  Admin: {
    icon: ShieldCheck,
    description: 'Full system access. Can manage everything including users and settings.',
    colour: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
};

const createAccountSchema = z.object({
  firstname: z.string().min(1, "First name is required."),
  lastname: z.string().min(1, "Last name is required."),
  mobile: z.string().min(1, "Phone number is required."),
  altmobile: z.string().optional(),
  companyname: z.string().optional(),
  deliveryaddress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email." }),
  country: z.string().optional(),
  role: z.enum(['Customer', 'Staff', 'Agent', 'Business', 'Admin'], {
    required_error: 'Please select a role.',
  }),
});

type FormValues = z.infer<typeof createAccountSchema>;

export default function CreateUserPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<{ name: string; email: string; role: string } | null>(null);
  const router = useRouter();
  const { profile } = useProfile();

  const form = useForm<FormValues>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      firstname: "", lastname: "", mobile: "", altmobile: "",
      companyname: "", deliveryaddress: "", city: "", state: "",
      zip: "", email: "", country: "", role: "Customer",
    },
  });

  const selectedRole = form.watch('role');
  const roleInfo = ROLE_INFO[selectedRole] || ROLE_INFO.Customer;

  const handleCreateAccount = async (values: FormValues) => {
    if (profile?.role !== 'Admin') {
      toast({ variant: "destructive", title: "Permission Denied", description: "Only Admins can create users." });
      return;
    }

    setIsLoading(true);
    try {
      // Get the current admin's ID token for server-side verification
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('Not authenticated.');
      const idToken = await currentUser.getIdToken();

      const res = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, idToken }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create user.');

      setSuccess({ name: `${values.firstname} ${values.lastname}`, email: values.email, role: values.role });
      form.reset({ firstname: "", lastname: "", mobile: "", altmobile: "", companyname: "", deliveryaddress: "", city: "", state: "", zip: "", email: "", country: "", role: "Customer" });

    } catch (error: any) {
      toast({ variant: "destructive", title: "Creation failed", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="rounded-xl" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="font-black text-2xl text-blue-950 tracking-tight flex items-center gap-2">
            <UserPlus className="h-6 w-6 text-blue-600" />
            Create New User
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            The new user will receive a password reset email to set their password.
          </p>
        </div>
      </div>

      {/* Success banner */}
      {success && (
        <div className="flex items-start gap-4 p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50">
          <CheckCircle2 className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold text-emerald-900">Account created successfully!</p>
            <p className="text-sm text-emerald-700 mt-1">
              <strong>{success.name}</strong> ({success.email}) has been added as <strong>{success.role}</strong>.
              They should use <em>Forgot Password</em> on the login page to set their password.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-emerald-300 text-emerald-700 rounded-xl hover:bg-emerald-100"
            onClick={() => setSuccess(null)}
          >
            Add another
          </Button>
        </div>
      )}

      <Card className="rounded-2xl border-2 border-blue-100 shadow-sm">
        <CardHeader className="bg-gradient-to-br from-blue-50/60 to-white border-b border-blue-100 rounded-t-2xl">
          <CardTitle className="text-blue-950">Account Details</CardTitle>
          <CardDescription>Fill in the details below. All fields marked * are required.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateAccount)} className="space-y-6">

              {/* Role picker — first and most important */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-blue-950">Role *</FormLabel>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {(['Customer', 'Staff', 'Agent', 'Business', 'Admin'] as const).map(role => {
                        const info = ROLE_INFO[role];
                        const Icon = info.icon;
                        const selected = field.value === role;
                        return (
                          <button
                            key={role}
                            type="button"
                            onClick={() => field.onChange(role)}
                            className={cn(
                              'flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-xs font-bold transition-all',
                              selected
                                ? `${info.border} ${info.bg} ${info.colour} shadow-sm`
                                : 'border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600'
                            )}
                          >
                            <Icon className="h-5 w-5" />
                            {role}
                          </button>
                        );
                      })}
                    </div>
                    <FormDescription className={cn('text-xs mt-2 px-1', roleInfo.colour)}>
                      {roleInfo.description}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="border-t border-blue-100 pt-6 space-y-5">
                {/* Name */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField control={form.control} name="firstname" render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name *</FormLabel>
                      <FormControl><Input className="rounded-xl" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="lastname" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name *</FormLabel>
                      <FormControl><Input className="rounded-xl" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                {/* Email */}
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address *</FormLabel>
                    <FormControl><Input type="email" className="rounded-xl" {...field} autoComplete="off" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Phones */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField control={form.control} name="mobile" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number *</FormLabel>
                      <FormControl><Input type="tel" className="rounded-xl" placeholder="+234..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="altmobile" render={({ field }) => (
                    <FormItem>
                      <FormLabel>2nd phone (optional)</FormLabel>
                      <FormControl><Input type="tel" className="rounded-xl" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                {/* Company */}
                <FormField control={form.control} name="companyname" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company name (optional)</FormLabel>
                    <FormControl><Input className="rounded-xl" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Address */}
                <FormField control={form.control} name="deliveryaddress" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl><Input className="rounded-xl" placeholder="123 Main St" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl><Input className="rounded-xl" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="state" render={({ field }) => (
                    <FormItem>
                      <FormLabel>State/Province</FormLabel>
                      <FormControl><Input className="rounded-xl" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="zip" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip/Postal Code</FormLabel>
                      <FormControl><Input className="rounded-xl" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="country" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country of residence</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-xl">
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
                )} />
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-blue-100">
                <p className="text-xs text-slate-400">
                  The user will receive an email to set their password.
                </p>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 gap-2"
                >
                  {isLoading
                    ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating...</>
                    : <><UserPlus className="h-4 w-4" /> Create {selectedRole} Account</>
                  }
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
