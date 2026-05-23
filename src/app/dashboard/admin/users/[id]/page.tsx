
'use client'

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getUserProfile, updateUserProfile } from '@/lib/user-actions';
import { UserProfile } from '@/lib/types';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Save, KeyRound, Copy, RefreshCw, Webhook, FlaskConical } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useProfile } from '@/components/profile-provider';

const editUserSchema = z.object({
  firstname: z.string().min(1, 'First name is required.'),
  lastname: z.string().min(1, 'Last name is required.'),
  phone_number: z.string().min(1, 'Phone number is required.'),
  company: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  role: z.enum(['Customer', 'Admin', 'Staff', 'Agent', 'Business']),
  apiKey: z.string().optional(),
  testApiKey: z.string().optional(),
  webhookUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
});

type EditUserFormValues = z.infer<typeof editUserSchema>;

export default function EditUserPage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const { profile: currentUserProfile } = useProfile();

    const form = useForm<EditUserFormValues>({
        resolver: zodResolver(editUserSchema),
    });

    useEffect(() => {
        if (typeof id !== 'string') return;

        const fetchUser = async () => {
            setLoading(true);
            try {
                const userProfile = await getUserProfile(id);
                if (userProfile) {
                    setUser(userProfile);
                    document.title = `Edit ${userProfile.firstname} ${userProfile.lastname} | County Cargo`;
                    form.reset({
                        firstname: userProfile.firstname,
                        lastname: userProfile.lastname,
                        phone_number: userProfile.phone_number,
                        company: userProfile.company || '',
                        address: userProfile.address || "",
                        city: userProfile.city || "",
                        state: userProfile.state || "",
                        zipCode: userProfile.zipCode || "",
                        country: userProfile.country || "",
                        role: userProfile.role,
                        apiKey: userProfile.apiKey || '',
                        testApiKey: userProfile.testApiKey || '',
                        webhookUrl: userProfile.webhookUrl || '',
                    });
                } else {
                    toast({ variant: 'destructive', title: 'Error', description: 'User not found.' });
                    router.push('/dashboard/admin/users');
                }
            } catch (error) {
                console.error("Fetch user error:", error);
                toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch user data.' });
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id, router, form]);

    const handleGenerateApiKeys = () => {
        const newProdKey = `county_cargo_sk_${[...crypto.getRandomValues(new Uint8Array(24))]
            .map(x => x.toString(16).padStart(2, '0'))
            .join('')}`;
        const newTestKey = `county_cargo_test_${[...crypto.getRandomValues(new Uint8Array(24))]
            .map(x => x.toString(16).padStart(2, '0'))
            .join('')}`;
            
        form.setValue('apiKey', newProdKey, { shouldDirty: true });
        form.setValue('testApiKey', newTestKey, { shouldDirty: true });
        
        toast({
            title: "API Keys Generated",
            description: "New keys have been generated. Click 'Save Changes' to apply them.",
        });
    };

    const handleCopy = (text: string, label: string) => {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            toast({ title: `${label} copied to clipboard.` });
        });
    };

    const onSubmit = async (data: EditUserFormValues) => {
        if (!user || currentUserProfile?.role !== 'Admin') {
            toast({ variant: 'destructive', title: 'Permission Denied', description: 'You do not have permission to perform this action.' });
            return;
        }
        setIsSubmitting(true);
        try {
            await updateUserProfile(user.uid, data);
            toast({
                title: 'User Updated',
                description: `${data.firstname} ${data.lastname}'s profile has been updated.`,
            });
            router.push('/dashboard/admin/users');
        } catch (error) {
            console.error('Update error:', error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to update user profile.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }
    
    if (!user) return null;

    const isStaff = currentUserProfile?.role === 'Staff';
    const isEditingSelf = currentUserProfile?.uid === user.uid;

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="font-semibold text-lg md:text-2xl">{isStaff ? 'View User Profile' : 'Edit User Profile'}</h1>
                    <p className="text-muted-foreground text-sm">Viewing profile for: {user.email}</p>
                </div>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>User Details</CardTitle>
                    <CardDescription>
                        {isStaff ? "Viewing user's information. Contact an admin to make changes." : "Modify the user's information and role below."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl><Input {...field} disabled={isStaff} /></FormControl>
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
                                            <FormControl><Input {...field} disabled={isStaff} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="phone_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl><Input type="tel" {...field} disabled={isStaff} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company (Optional)</FormLabel>
                                        <FormControl><Input {...field} disabled={isStaff} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField control={form.control} name="address" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl><Input {...field} disabled={isStaff} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <FormField control={form.control} name="city" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl><Input {...field} disabled={isStaff} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="state" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State/Province</FormLabel>
                                        <FormControl><Input {...field} disabled={isStaff} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="zipCode" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Zip/Postal Code</FormLabel>
                                        <FormControl><Input {...field} disabled={isStaff} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country of Residence</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value || ""} disabled={isStaff}>
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
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isStaff || isEditingSelf}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder="Select a role" /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Customer">Customer</SelectItem>
                                                <SelectItem value="Agent">Agent</SelectItem>
                                                <SelectItem value="Business">Business</SelectItem>
                                                <SelectItem value="Staff">Staff</SelectItem>
                                                <SelectItem value="Admin">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            

                             <Separator />

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <h3 className="font-medium flex items-center gap-2"><KeyRound className="h-5 w-5" /> API Key Management</h3>
                                    <p className="text-sm text-muted-foreground">
                                        API keys for programmatic access. Regenerating will invalidate old keys.
                                    </p>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="testApiKey"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-1.5"><FlaskConical className="h-3 w-3 text-blue-600" /> Staging Key</FormLabel>
                                            <div className="flex gap-2">
                                                <FormControl>
                                                    <Input {...field} readOnly placeholder="No staging key generated" disabled={isStaff} />
                                                </FormControl>
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    onClick={() => handleCopy(field.value || '', 'Staging Key')}
                                                    disabled={!field.value || isStaff}
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="apiKey"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Production Key</FormLabel>
                                            <div className="flex gap-2">
                                                <FormControl>
                                                    <Input {...field} readOnly placeholder="No production key generated" disabled={isStaff} />
                                                </FormControl>
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    onClick={() => handleCopy(field.value || '', 'Production Key')}
                                                    disabled={!field.value || isStaff}
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {!isStaff && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleGenerateApiKeys}
                                        disabled={isSubmitting}
                                    >
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Regenerate All Keys
                                    </Button>
                                )}
                            </div>
                            
                            <Separator />
                            
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <h3 className="font-medium flex items-center gap-2"><Webhook className="h-5 w-5" /> Webhook Management</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Set a URL for this user to receive webhook notifications for their shipments.
                                    </p>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="webhookUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Webhook URL</FormLabel>
                                            <FormControl><Input {...field} disabled={isStaff || user.role !== 'Business'} placeholder={user.role !== 'Business' ? "Only available for Business users" : "https://example.com/webhook"} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>


                            {!isStaff && (
                                <div className="flex justify-end pt-4">
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                        Save Changes
                                    </Button>
                                </div>
                            )}
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
