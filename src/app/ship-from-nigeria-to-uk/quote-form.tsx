
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const nigerianCities = [
  "Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano", "Benin City", "Onitsha", "Aba",
  "Asaba", "Warri", "Owerri", "Uyo", "Calabar", "Enugu", "Awka", "Akure",
  "Ado-Ekiti", "Ilorin"
].sort();

const ukCities = [
  "London", "Manchester", "Birmingham", "Liverpool", "Leeds", "Sheffield",
  "Nottingham", "Leicester", "Coventry", "Milton Keynes", "Luton", "Reading",
  "Oxford", "Cambridge", "Bristol", "Cardiff", "Newcastle"
].sort();

const formSchema = z.object({
  from: z.string().min(1, 'Please select an origin city.'),
  to: z.string().min(1, 'Please select a destination city.'),
  serviceType: z.string().min(1, 'Please select a service type.'),
  weight: z.coerce.number().positive('Weight must be a positive number.'),
  length: z.coerce.number().positive('Length must be a positive number.'),
  width: z.coerce.number().positive('Width must be a positive number.'),
  height: z.coerce.number().positive('Height must be a positive number.'),
});

type ShippingCostOutput = {
  estimatedCost: number;
  currency: string;
  details: string;
}

export function NigeriaUkQuoteForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ShippingCostOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: '',
      to: '',
      serviceType: '',
      weight: 1,
      length: 10,
      width: 10,
      height: 10,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const { from, to, serviceType, weight, length, width, height } = values;

      let estimatedCost = 0;
      let details = '';
      let currency = 'GBP';

      const volumetricWeight = (length * width * height) / 5000;
      const chargeableWeight = Math.max(weight, volumetricWeight);

      if (serviceType === 'standard') {
        currency = 'NGN';
        const rate = from === 'Abuja' ? 10500 : 9500;
        const minWeight = 10;
        const finalChargeableWeight = Math.max(chargeableWeight, minWeight);
        estimatedCost = finalChargeableWeight * rate;

        details = `
Calculation based on Standard Shipping:
- Route: ${from} to ${to}
- Rate: ₦${rate.toLocaleString()}/kg
- Actual Weight: ${weight.toFixed(2)} kg
- Volumetric Weight: ${volumetricWeight.toFixed(2)} kg
- Chargeable Weight: ${chargeableWeight.toFixed(2)} kg
- Minimum Weight: ${minWeight} kg
- Final Chargeable Weight: ${finalChargeableWeight.toFixed(2)} kg
- Shipping Cost: ₦${estimatedCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        `.trim().replace(/^\s+/gm, '');

      } else { // Express service
        const rate = 24.00;
        const handlingCharge = 20;
        const minWeight = 1;

        const finalChargeableWeight = Math.max(chargeableWeight, minWeight);
        const shippingCost = finalChargeableWeight * rate;
        estimatedCost = shippingCost + handlingCharge;

        details = `
Calculation based on 48hrs Express Shipping:
- Route: ${from} to ${to}
- Rate: £${rate.toFixed(2)}/kg
- Actual Weight: ${weight.toFixed(2)} kg
- Volumetric Weight: ${volumetricWeight.toFixed(2)} kg
- Chargeable Weight: ${chargeableWeight.toFixed(2)} kg
- Minimum Weight: ${minWeight} kg
- Final Chargeable Weight: ${finalChargeableWeight.toFixed(2)} kg
- Shipping Cost: £${shippingCost.toFixed(2)}
- Handling Charge: £${handlingCharge.toFixed(2)}
        `.trim().replace(/^\s+/gm, '');
      }

      setResult({
        estimatedCost,
        currency,
        details
      });

    } catch (e) {
      setError('Failed to get estimation. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    form.reset();
    setResult(null);
    setError(null);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl my-12">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Instant Shipping Estimate</CardTitle>
        <CardDescription>
          Get an estimate for shipping from Nigeria to the UK.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!result ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From (Nigeria)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Nigerian city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {nigerianCities.map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To (UK)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select UK city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ukCities.map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="standard">Standard Shipping</SelectItem>
                      <SelectItem value="express48">48hrs Express Shipping</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
                <p className="text-sm font-medium">Package Details</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Length (cm)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="width"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Width (cm)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 15" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculating...</> : 'Get Estimate'}
            </Button>
          </form>
        </Form>
        ) : (
          <div className="space-y-4 text-center">
            <div>
                <p className="text-muted-foreground">Estimated Cost</p>
                <p className="text-5xl font-bold">{result.currency === 'GBP' ? '£' : '₦'}{result.estimatedCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className="text-sm text-muted-foreground">{result.currency}</p>
            </div>
            <div className='p-4 bg-muted/50 rounded-lg text-left'>
                <h4 className="font-semibold mb-2">Estimation Details</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.details}</p>
            </div>
          </div>
        )}

        {error && <p className="text-destructive text-sm mt-4 text-center">{error}</p>}
      </CardContent>
      <CardFooter>
        {result ? (
           <Button onClick={handleReset} className="w-full" variant="outline">
            Get another estimate
          </Button>
        ) : (
            <p className="text-xs text-muted-foreground text-center w-full">
            This is an estimate. Final costs may vary. Express shipments include a £20 handling charge.
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
