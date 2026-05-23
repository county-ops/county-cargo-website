'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useAuth } from "@/hooks/use-auth"
import { useState, useEffect } from "react"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import NProgress from 'nprogress';
import { User } from "firebase/auth"


const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const createAccountSchema = z.object({
    firstname: z.string().min(1, "First name is required."),
    lastname: z.string().min(1, "Last name is required."),
    mobile: z.string().min(1, "Phone number is required."),
    altmobile: z.string().optional(),
    companyname: z.string().optional(),
    deliveryaddress: z.string().min(1, "Address is required."),
    city: z.string().min(1, "City is required."),
    state: z.string().min(1, "State is required."),
    zip: z.string().min(1, "Zip code is required."),
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string(),
    country: z.string().min(1, "Please select your country."),
    howdoyouhearaboutus: z.string().min(1, "Please tell us how you heard about us."),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});

const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address to send a reset link to." }),
});


export default function LoginPage() {
  const { signUp, signIn, sendPasswordResetEmail, sendVerificationEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isResendingVerification, setIsResendingVerification] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [showAccountClaimedDialog, setShowAccountClaimedDialog] = useState(false);
  const [unverifiedUser, setUnverifiedUser] = useState<User | null>(null);
  const [isPasswordResetDialogOpen, setIsPasswordResetDialogOpen] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('sign-in');
  const [showWrongPasswordDialog, setShowWrongPasswordDialog] = useState(false);
  const [wrongPasswordEmail, setWrongPasswordEmail] = useState('');


  useEffect(() => {
    document.title = "Login | County Cargo";
  }, []);


  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const createAccountForm = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      mobile: "",
      altmobile: "",
      companyname: "",
      deliveryaddress: "",
      city: "",
      state: "",
      zip: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
      howdoyouhearaboutus: "",
    }
  });
  
  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "" },
  });

  const handleSignIn = async (values: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    NProgress.start();
    try {
      await signIn(values.email, values.password);
      // Redirect is handled by the useAuth hook, NProgress.done() is in layout
    } catch (error: any) {
      if (error.code === 'auth/email-not-verified') {
        setUnverifiedUser(error.user);
      } else if (error.code === 'auth/wrong-password-suggest-reset') {
        setWrongPasswordEmail(values.email);
        setShowWrongPasswordDialog(true);
      } else {
         toast({
          variant: "destructive",
          title: "Sign in failed",
          description: error.message,
        });
      }
      NProgress.done();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!unverifiedUser) return;
    setIsResendingVerification(true);
    try {
        await sendVerificationEmail(unverifiedUser);
        toast({
            title: "Verification Email Sent",
            description: "A new verification link has been sent to your email address. Please check your inbox.",
        });
        setUnverifiedUser(null);
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Error",
            description: error.message,
        });
    } finally {
        setIsResendingVerification(false);
    }
};

  const handleCreateAccount = async (values: z.infer<typeof createAccountSchema>) => {
    setIsLoading(true);
    NProgress.start();
    try {
      const { email, password, ...profileData } = values;
      await signUp(email, password, profileData);
      setShowVerificationDialog(true);
    } catch (error: any) {
        if (error.code === 'auth/account-claimed') {
         setShowAccountClaimedDialog(true);
       } else {
         toast({
          variant: "destructive",
          title: "Sign up failed",
          description: error.message,
        });
       }
    } finally {
      setIsLoading(false);
      NProgress.done();
    }
  };
  
  const handlePasswordReset = async (values: z.infer<typeof resetPasswordSchema>) => {
    setIsResetting(true);
    try {
        await sendPasswordResetEmail(values.email);
        toast({
            title: "Password Reset Email Sent",
            description: "Please check your inbox for a link to reset your password.",
        });
        setIsPasswordResetDialogOpen(false); // Close the dialog on success
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Error Sending Reset Email",
            description: error.message,
        });
    } finally {
        setIsResetting(false);
    }
  };
  
  const handleVerificationDialogClose = () => {
    setShowVerificationDialog(false);
    createAccountForm.reset();
    signInForm.reset();
  };

  return (
    <div className="w-full max-w-lg">
      <Tabs defaultValue="sign-in" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Welcome to County Cargo</CardTitle>
                <CardDescription>
                  Sign in to your account or create a new one to get started.
                </CardDescription>
            </CardHeader>
             <div className="px-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sign-in">Sign in</TabsTrigger>
                <TabsTrigger value="create-account">Create an account</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="sign-in">
              <Form {...signInForm}>
                <form onSubmit={signInForm.handleSubmit(handleSignIn)}>
                  <CardContent className="space-y-4 pt-6">
                    <FormField
                      control={signInForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email address</FormLabel>
                          <FormControl>
                            <Input {...field} autoComplete="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signInForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                type={showSignInPassword ? "text" : "password"}
                                {...field}
                                autoComplete="current-password"
                                className="pr-10"
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:bg-transparent"
                              onClick={() => setShowSignInPassword((prev) => !prev)}
                              tabIndex={-1}
                            >
                              {showSignInPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              <span className="sr-only">{showSignInPassword ? "Hide password" : "Show password"}</span>
                            </Button>
                          </div>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Continue
                    </Button>
                    <AlertDialog open={isPasswordResetDialogOpen} onOpenChange={(open) => {
                        setIsPasswordResetDialogOpen(open);
                        if (open) {
                            signInForm.clearErrors();
                        }
                    }}>
                      <AlertDialogTrigger asChild>
                         <Button type="button" variant="link" className="w-full text-center text-sm text-muted-foreground hover:text-primary">
                            I forgot my password
                         </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <Form {...resetPasswordForm}>
                            <form onSubmit={resetPasswordForm.handleSubmit(handlePasswordReset)}>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Forgot Password?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Enter your email address below and we'll send you a link to reset your password.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="py-4">
                                     <FormField
                                          control={resetPasswordForm.control}
                                          name="email"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Email address</FormLabel>
                                              <FormControl>
                                                <Input placeholder="user@countycargo.com" {...field} autoComplete="email" />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                </div>
                                <AlertDialogFooter>
                                <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                                <AlertDialogAction type="submit" disabled={isResetting}>
                                     {isResetting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Send Reset Link
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </form>
                        </Form>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="create-account">
              <Form {...createAccountForm}>
                <form onSubmit={createAccountForm.handleSubmit(handleCreateAccount)}>
                  <CardContent className="space-y-4 pt-6">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <FormField control={createAccountForm.control} name="firstname" render={({ field }) => (
                              <FormItem>
                                  <FormLabel>First name</FormLabel>
                                  <FormControl><Input {...field} /></FormControl>
                                  <FormMessage />
                              </FormItem>
                          )} />
                          <FormField control={createAccountForm.control} name="lastname" render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Last name</FormLabel>
                                  <FormControl><Input {...field} /></FormControl>
                                  <FormMessage />
                              </FormItem>
                          )} />
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <FormField control={createAccountForm.control} name="mobile" render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Phone number</FormLabel>
                                  <FormControl><Input type="tel" placeholder="+234..." {...field} /></FormControl>
                                  <FormMessage />
                              </FormItem>
                          )} />
                          <FormField control={createAccountForm.control} name="altmobile" render={({ field }) => (
                              <FormItem>
                                  <FormLabel>2nd phone number (optional)</FormLabel>
                                  <FormControl><Input type="tel" {...field} /></FormControl>
                                  <FormMessage />
                              </FormItem>
                          )} />
                      </div>
                      <FormField control={createAccountForm.control} name="companyname" render={({ field }) => (
                          <FormItem>
                              <FormLabel>Company name (optional)</FormLabel>
                              <FormControl><Input {...field} /></FormControl>
                              <FormMessage />
                          </FormItem>
                      )} />
                      <FormField control={createAccountForm.control} name="deliveryaddress" render={({ field }) => (
                          <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                              <FormMessage />
                          </FormItem>
                      )} />
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                          <FormField control={createAccountForm.control} name="city" render={({ field }) => (
                              <FormItem>
                                  <FormLabel>City</FormLabel>
                                  <FormControl><Input {...field} /></FormControl>
                                  <FormMessage />
                              </FormItem>
                          )} />
                          <FormField control={createAccountForm.control} name="state" render={({ field }) => (
                              <FormItem>
                                  <FormLabel>State/Province</FormLabel>
                                  <FormControl><Input {...field} /></FormControl>
                                  <FormMessage />
                              </FormItem>
                          )} />
                           <FormField control={createAccountForm.control} name="zip" render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Zip/Postal Code</FormLabel>
                                  <FormControl><Input {...field} /></FormControl>
                                  <FormMessage />
                              </FormItem>
                          )} />
                      </div>
                      <FormField control={createAccountForm.control} name="email" render={({ field }) => (
                          <FormItem>
                              <FormLabel>Email address</FormLabel>
                              <FormControl><Input type="email" {...field} autoComplete="off" /></FormControl>
                              <FormMessage />
                          </FormItem>
                      )} />
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <FormField control={createAccountForm.control} name="password" render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Password</FormLabel>
                                  <div className="relative">
                                    <FormControl>
                                      <Input
                                        type={showCreatePassword ? "text" : "password"}
                                        {...field}
                                        autoComplete="new-password"
                                        className="pr-10"
                                      />
                                    </FormControl>
                                     <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:bg-transparent"
                                        onClick={() => setShowCreatePassword((prev) => !prev)}
                                        tabIndex={-1}
                                      >
                                        {showCreatePassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        <span className="sr-only">{showCreatePassword ? "Hide password" : "Show password"}</span>
                                      </Button>
                                  </div>
                                  <FormMessage />
                              </FormItem>
                          )} />
                          <FormField control={createAccountForm.control} name="confirmPassword" render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Confirm password</FormLabel>
                                  <div className="relative">
                                    <FormControl>
                                        <Input 
                                            type={showConfirmPassword ? "text" : "password"} 
                                            {...field} 
                                            autoComplete="new-password" 
                                            className="pr-10"
                                        />
                                    </FormControl>
                                     <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:bg-transparent"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        tabIndex={-1}
                                      >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                                      </Button>
                                  </div>
                                  <FormMessage />
                              </FormItem>
                          )} />
                      </div>
                      <FormField control={createAccountForm.control} name="country" render={({ field }) => (
                          <FormItem>
                              <FormLabel>Country of residence</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger><SelectValue placeholder="Select a country" /></SelectTrigger>
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
                      <FormField control={createAccountForm.control} name="howdoyouhearaboutus" render={({ field }) => (
                          <FormItem>
                              <FormLabel>How did you hear about us?</FormLabel>
                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="google">Google</SelectItem>
                                    <SelectItem value="instagram">Instagram</SelectItem>
                                    <SelectItem value="facebook">Facebook</SelectItem>
                                    <SelectItem value="x">X</SelectItem>
                                    <SelectItem value="tiktok">TikTok</SelectItem>
                                    <SelectItem value="friend">Family/friend</SelectItem>
                                    <SelectItem value="youtube">Youtube</SelectItem>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="referral">Referral</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                          </FormItem>
                      )} />
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                     <p className="px-4 text-center text-xs text-muted-foreground">
                        By clicking Continue, you agree to County Cargo's <Link href="https://county-cargo.com/privacy-policy/" className="underline">Privacy Policy</Link> and <Link href="https://county-cargo.com/terms/" className="underline">Terms of Use</Link>.
                     </p>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                       {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                       Continue
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </TabsContent>
        </Card>
      </Tabs>
      
      <AlertDialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Account Created!</AlertDialogTitle>
            <AlertDialogDescription>
              We've sent a verification link to your email address. Please check your inbox and click the link to activate your account before you can sign in.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleVerificationDialogClose}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showAccountClaimedDialog} onOpenChange={setShowAccountClaimedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Welcome Back!</AlertDialogTitle>
            <AlertDialogDescription>
              We found an existing account for your email and have linked it to the password you provided. Please sign in to continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => {
                setShowAccountClaimedDialog(false);
                setActiveTab('sign-in');
            }}>
                Go to Sign In
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <AlertDialog open={!!unverifiedUser} onOpenChange={(open) => !open && setUnverifiedUser(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Email Not Verified</AlertDialogTitle>
                <AlertDialogDescription>
                    Your email address has not been verified yet. Please check your inbox for a verification link, or click the button below to send a new one.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
                <AlertDialogAction onClick={handleResendVerification} disabled={isResendingVerification}>
                    {isResendingVerification && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Resend Verification Email
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showWrongPasswordDialog} onOpenChange={setShowWrongPasswordDialog}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Incorrect Password</AlertDialogTitle>
                <AlertDialogDescription>
                    The password you entered is incorrect. Would you like to reset your password?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Try Again</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                    setShowWrongPasswordDialog(false);
                    resetPasswordForm.setValue('email', wrongPasswordEmail);
                    setIsPasswordResetDialogOpen(true);
                }}>
                    Reset Password
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}
