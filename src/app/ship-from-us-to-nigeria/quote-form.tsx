
'use client';

import { useState, useEffect } from 'react';
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
import { Loader2, ArrowRightLeft } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';

const usCities = [
  "Atlanta", "Austin", "Boston", "Charlotte", "Chicago", "Columbus", "Dallas",
  "Denver", "Fort Worth", "Houston", "Indianapolis", "Jacksonville", "Los Angeles",
  "Miami", "New York", "Philadelphia", "Phoenix", "San Antonio", "San Diego",
  "San Francisco", "San Jose", "Seattle", "Washington D.C."
].sort();

const nigerianCities = [
  "Aba", "Abuja", "Ado-Ekiti", "Akure", "Asaba", "Awka", "Benin City", "Calabar",
  "Enugu", "Ibadan", "Ilorin", "Kano", "Lagos", "Onitsha", "Owerri",
  "Port Harcourt", "Uyo", "Warri"
].sort();

const formSchema = z.object({
  from: z.string().min(1, 'Please select an origin city.'),
  to: z.string().min(1, 'Please select a destination city.'),
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

// Currency Converter constants
const USD_TO_NGN_RATE = 1500;
const ADDITIONAL_NAIRA = 20;

export function UsNigeriaQuoteForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ShippingCostOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Currency converter state
  const [usd, setUsd] = useState('1');
  const [ngn, setNgn] = useState((1 * USD_TO_NGN_RATE + ADDITIONAL_NAIRA).toFixed(2));
  const [lastChanged, setLastChanged] = useState<'usd' | 'ngn'>('usd');


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: '',
      to: '',
      weight: 1,
      length: 10,
      width: 10,
      height: 10,
    },
  });

  // Effect to update currency converter when estimate is calculated
  useEffect(() => {
    if (result) {
      const newUsd = result.estimatedCost ?? 1;
      setUsd(newUsd.toFixed(2));
      setLastChanged('usd');
    }
  }, [result]);

  // Currency converter effects
  useEffect(() => {
    if (lastChanged === 'usd') {
      const usdValue = parseFloat(usd);
      if (!isNaN(usdValue)) {
        const ngnValue = usdValue * USD_TO_NGN_RATE + ADDITIONAL_NAIRA;
        setNgn(Math.max(1, ngnValue).toFixed(2));
      } else {
        setNgn('');
      }
    }
  }, [usd, lastChanged]);

  useEffect(() => {
    if (lastChanged === 'ngn') {
      const ngnValue = parseFloat(ngn);
      if (!isNaN(ngnValue)) {
        const usdValue = (ngnValue - ADDITIONAL_NAIRA) / USD_TO_NGN_RATE;
        setUsd(Math.max(1, usdValue).toFixed(2));
      } else {
        setUsd('');
      }
    }
  }, [ngn, lastChanged]);

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsd(e.target.value);
    setLastChanged('usd');
  };

  const handleNgnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNgn(e.target.value);
    setLastChanged('ngn');
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const { from, to, weight, length, width, height } = values;

      const currency = 'USD';

      // 1. Calculate volumetric weight in lbs
      const volumetricWeightInLbs = (length * width * height) / 5000 * 2.20462;

      // 2. Determine chargeable weight in lbs
      const chargeableWeightInLbs = Math.max(weight, volumetricWeightInLbs);
      
      // 3. Define minimum weight in lbs
      const minWeightInLbs = 5;

      // 4. Determine final chargeable weight in lbs, considering the minimum
      const finalChargeableWeightInLbs = Math.max(chargeableWeightInLbs, minWeightInLbs);

      const ratePerLbs = to === 'Lagos' ? 4.50 : 5.00;
      const estimatedCost = finalChargeableWeightInLbs * ratePerLbs;

      const details = `
Calculation based on Standard Shipping:
- Destination: ${from} to ${to}
- Rate: $${ratePerLbs.toFixed(2)}/lbs
- Actual Weight: ${weight.toFixed(2)} lbs
- Volumetric Weight: ${volumetricWeightInLbs.toFixed(2)} lbs
- Chargeable Weight: ${chargeableWeightInLbs.toFixed(2)} lbs
- Minimum Chargeable Weight: ${minWeightInLbs.toFixed(2)} lbs
- Final Chargeable Weight: ${finalChargeableWeightInLbs.toFixed(2)} lbs
      `.trim().replace(/^\s+/gm, '');


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
    setUsd('1');
    setLastChanged('usd');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl my-12">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Instant Shipping Estimate</CardTitle>
        <CardDescription>
          Get an estimate for shipping from the US to Nigeria.
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
                    <FormLabel>From (US)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select US city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {usCities.map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
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
                    <FormLabel>To (Nigeria)</FormLabel>
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
            </div>
            
            <div className="space-y-2">
                <p className="text-sm font-medium">Package Details</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (lbs)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 10" {...field} />
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
          <div className="space-y-6 text-center">
            <div>
                <p className="text-muted-foreground">Estimated Cost</p>
                <p className="text-5xl font-bold">${result.estimatedCost.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">{result.currency}</p>
            </div>
            <div className='p-4 bg-muted/50 rounded-lg text-left'>
                <h4 className="font-semibold mb-2">Estimation Details</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.details}</p>
            </div>
            
            <div className="border-t pt-6">
                <h4 className="text-xl font-semibold text-center mb-1">Currency Converter</h4>
                <p className="text-sm text-muted-foreground text-center mb-4">Estimate conversion from USD to NGN.</p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-1 w-full space-y-2 text-left">
                        <Label htmlFor="usd-input">USD ($)</Label>
                        <Input id="usd-input" type="number" value={usd} onChange={handleUsdChange} placeholder="e.g. 100" min="1" />
                    </div>
                    <div className="mt-6 hidden sm:block">
                        <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 w-full space-y-2 text-left">
                        <Label htmlFor="ngn-input">NGN (₦)</Label>
                        <Input id="ngn-input" type="number" value={ngn} onChange={handleNgnChange} placeholder="e.g. 150000" min="1" />
                    </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center hidden">
                    *Exchange rate is an estimate (1 USD ≈ {USD_TO_NGN_RATE} NGN + ₦{ADDITIONAL_NAIRA} fee) and may not reflect the actual rate.
                </p>
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
            This is an estimate. Final costs may vary based on package inspection.
          </p>
        )}
      </CardFooter>
    </Card>
  );
}

    