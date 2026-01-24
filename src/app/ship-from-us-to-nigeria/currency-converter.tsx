
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRightLeft } from 'lucide-react';

// This is a fixed rate. For a real application, you'd fetch this from an API.
const USD_TO_NGN_RATE = 1500;

export function CurrencyConverter() {
  const [usd, setUsd] = useState('1');
  const [ngn, setNgn] = useState(USD_TO_NGN_RATE.toString());
  const [lastChanged, setLastChanged] = useState<'usd' | 'ngn'>('usd');

  useEffect(() => {
    if (lastChanged === 'usd') {
      const usdValue = parseFloat(usd);
      if (!isNaN(usdValue)) {
        setNgn((usdValue * USD_TO_NGN_RATE).toFixed(2));
      } else {
        setNgn('');
      }
    }
  }, [usd, lastChanged]);

  useEffect(() => {
    if (lastChanged === 'ngn') {
      const ngnValue = parseFloat(ngn);
      if (!isNaN(ngnValue)) {
        setUsd((ngnValue / USD_TO_NGN_RATE).toFixed(2));
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


  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Currency Converter</CardTitle>
        <CardDescription>
          Estimate conversion from USD to NGN.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="usd-input">USD ($)</Label>
            <Input id="usd-input" type="number" value={usd} onChange={handleUsdChange} placeholder="e.g. 100" />
          </div>
          <div className="mt-6">
            <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="ngn-input">NGN (₦)</Label>
            <Input id="ngn-input" type="number" value={ngn} onChange={handleNgnChange} placeholder="e.g. 150000" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          *Exchange rate is an estimate (1 USD ≈ {USD_TO_NGN_RATE} NGN) and may not reflect the actual rate.
        </p>
      </CardContent>
    </Card>
  );
}
