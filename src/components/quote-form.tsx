
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { estimateShippingCost, ShippingCostInput } from '@/ai/flows/shipping-cost-estimation';
import { Loader2 } from 'lucide-react';

const step1Schema = z.object({
  destination: z.string().min(2, 'Destination is required'),
});

const step2Schema = z.object({
  weight: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive('Weight must be positive')
  ),
  length: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive('Length must be positive')
  ),
  width: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive('Width must be positive')
  ),
  height: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive('Height must be positive')
  ),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

export function QuoteForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Step1Data & Step2Data>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    control: control1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { destination: '' },
  });

  const {
    control: control2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: { weight: 0, length: 0, width: 0, height: 0 },
  });

  const onStep1Submit = (data: Step1Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const onStep2Submit = async (data: Step2Data) => {
    const fullData = { ...formData, ...data } as ShippingCostInput;
    setFormData(fullData);
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const estimation = await estimateShippingCost(fullData);
      setResult(estimation);
      setStep(3);
    } catch (e) {
      setError('Failed to get estimation. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setFormData({});
    setResult(null);
    setError(null);
    (control1 as any).reset({ destination: '' });
    (control2 as any).reset({ weight: 0, length: 0, width: 0, height: 0 });
  };

  const progress = (step / 3) * 100;

  return (
    <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Get a Shipping Quote</CardTitle>
        <CardDescription>
          {step === 1 && 'Enter your destination to get started.'}
          {step === 2 && 'Provide package dimensions and weight.'}
          {step === 3 && 'Here is your estimated shipping cost.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="mb-6 h-2" />
        {step === 1 && (
          <form onSubmit={handleSubmit1(onStep1Submit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Controller
                  name="destination"
                  control={control1}
                  render={({ field }) => (
                    <Input id="destination" placeholder="e.g., New York, NY" {...field} />
                  )}
                />
                {errors1.destination && (
                  <p className="text-sm text-destructive">{errors1.destination.message}</p>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full mt-6">
              Next
            </Button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleSubmit2(onStep2Submit)}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Controller
                  name="weight"
                  control={control2}
                  render={({ field }) => (
                    <Input id="weight" type="number" placeholder="0.0" {...field} />
                  )}
                />
                {errors2.weight && (
                  <p className="text-sm text-destructive">{errors2.weight.message}</p>
                )}
              </div>
               <div className="space-y-2">
                <Label htmlFor="length">Length (cm)</Label>
                <Controller
                  name="length"
                  control={control2}
                  render={({ field }) => (
                    <Input id="length" type="number" placeholder="0.0" {...field} />
                  )}
                />
                 {errors2.length && (
                  <p className="text-sm text-destructive">{errors2.length.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="width">Width (cm)</Label>
                <Controller
                  name="width"
                  control={control2}
                  render={({ field }) => (
                    <Input id="width" type="number" placeholder="0.0" {...field} />
                  )}
                />
                {errors2.width && (
                  <p className="text-sm text-destructive">{errors2.width.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Controller
                  name="height"
                  control={control2}
                  render={({ field }) => (
                    <Input id="height" type="number" placeholder="0.0" {...field} />
                  )}
                />
                {errors2.height && (
                  <p className="text-sm text-destructive">{errors2.height.message}</p>
                )}
              </div>
            </div>
            <div className="flex gap-4 mt-6">
                <Button variant="outline" onClick={() => setStep(1)} className="w-full">
                    Back
                </Button>
                <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : 'Get Quote'}
                </Button>
            </div>
          </form>
        )}
        {step === 3 && result && (
          <div className="space-y-4">
            <div className="text-center">
                <p className="text-muted-foreground">Estimated Cost</p>
                <p className="text-4xl font-bold">${result.estimatedCost.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">{result.currency}</p>
            </div>
            <div className='p-4 bg-muted/50 rounded-lg'>
                <h4 className="font-semibold mb-2">Details</h4>
                <p className="text-sm text-muted-foreground">{result.details}</p>
            </div>
          </div>
        )}
         {error && <p className="text-destructive text-sm mt-4">{error}</p>}
      </CardContent>
      <CardFooter>
      {step === 3 ? (
        <Button onClick={handleReset} className="w-full" variant="outline">
          Start Over
        </Button>
      ) : (
        <p className="text-xs text-muted-foreground text-center w-full">
          Provide your shipping details to get an instant quote.
        </p>
      )}
      </CardFooter>
    </Card>
  );
}
