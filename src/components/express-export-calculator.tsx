'use client';

import React, { useState, useEffect, useId } from 'react';
import {
  Plane,
  Truck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  Loader2,
  Info,
  HelpCircle,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ServiceEstimate {
  serviceType: string;
  title: string;
  tagline: string;
  price: number;
  formattedPrice: string;
  currency: string;
  billableWeight: number;
  basePrice?: number;
  formattedBasePrice?: string;
  packagingCharge?: number;
  formattedPackagingCharge?: string;
  deliveryTime: string;
  deliveryMethod: string;
  carrier: string;
  customsNote: string;
  features: string[];
  recommended?: boolean;
}

interface QuoteResponse {
  success?: boolean;
  origin: string;
  destination: string;
  zone: number;
  weight: number;
  estimates: {
    value: ServiceEstimate | null;
    express: ServiceEstimate;
  };
  error?: string;
}

const DEFAULT_POPULAR_COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Germany',
  'China',
  'United Arab Emirates',
  'Australia',
  'India',
  'South Africa',
  'Italy',
  'France',
  'Turkey',
  'Spain',
  'Netherlands',
  'Belgium',
  'Saudi Arabia',
  'Qatar',
  'Malaysia',
  'Ghana',
  'Kenya',
];

interface ExpressExportCalculatorProps {
  initialOrigin?: 'Lagos' | 'Abuja';
  initialDestination?: string;
  initialWeight?: number;
}

export function ExpressExportCalculator({
  initialOrigin = 'Abuja',
  initialDestination = 'United States',
  initialWeight = 16,
}: ExpressExportCalculatorProps) {
  const [origin, setOrigin] = useState<'Lagos' | 'Abuja'>(initialOrigin);
  const [destination, setDestination] = useState<string>(initialDestination);
  const [weight, setWeight] = useState<string>(String(initialWeight));
  const [countries, setCountries] = useState<string[]>(DEFAULT_POPULAR_COUNTRIES);
  const [loading, setLoading] = useState(false);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [quoteResult, setQuoteResult] = useState<QuoteResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const originSelectId = useId();
  const destinationSelectId = useId();
  const weightInputId = useId();

  // Fetch full countries list from the API on mount
  useEffect(() => {
    let mounted = true;
    async function loadCountries() {
      try {
        setCountriesLoading(true);
        const res = await fetch('/api/shipping/export-estimate');
        if (res.ok) {
          const json = await res.json();
          if (mounted && json.countries && Array.isArray(json.countries)) {
            const names = json.countries.map((c: any) => c.name);
            setCountries(names);
          }
        }
      } catch (err) {
        console.error('Failed to load destination countries:', err);
      } finally {
        if (mounted) setCountriesLoading(false);
      }
    }
    loadCountries();
    return () => {
      mounted = false;
    };
  }, []);

  // Listen for custom country selection events from destination cards
  useEffect(() => {
    const handleSelectCountry = (e: CustomEvent<string>) => {
      if (e.detail) {
        setDestination(e.detail);
        const calcElem = document.getElementById('express-calculator-widget');
        if (calcElem) {
          calcElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };

    window.addEventListener('selectExportCountry' as any, handleSelectCountry as any);
    return () => {
      window.removeEventListener('selectExportCountry' as any, handleSelectCountry as any);
    };
  }, []);

  // Perform calculation
  const handleCalculate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    const numWeight = parseFloat(weight);
    if (isNaN(numWeight) || numWeight <= 0) {
      setErrorMessage('Please enter a valid shipment weight greater than 0 kg.');
      return;
    }

    if (!destination) {
      setErrorMessage('Please choose a destination country.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/shipping/export-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin,
          destinationCountry: destination,
          weight: numWeight,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setErrorMessage(data.error || 'Unable to calculate quote. Please try again.');
        setQuoteResult(null);
      } else {
        setQuoteResult(data);
      }
    } catch (err: any) {
      setErrorMessage('Network error while fetching rates. Please check your connection.');
      setQuoteResult(null);
    } finally {
      setLoading(false);
    }
  };

  // Run initial calculation once on mount so users immediately see live numbers (like reference)
  useEffect(() => {
    handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buildPortalUrl = (service: ServiceEstimate) => {
    const numWeight = parseFloat(weight) || 1;
    const basePortal = 'https://ship.countycargo.com/login';
    const params = new URLSearchParams({
      redirect: '/book-shipment',
      serviceType: service.serviceType,
      originHub: origin,
      destinationCountry: destination,
      weight: String(numWeight),
      quotedPrice: String(service.price),
    });
    return `${basePortal}?${params.toString()}`;
  };

  const buildWhatsAppUrl = (service: ServiceEstimate) => {
    const numWeight = parseFloat(weight) || 1;
    const phone = '447883309489'; // County Cargo official WhatsApp line
    const breakdownText = service.packagingCharge && service.packagingCharge > 0
      ? `\n- Cost Breakdown: Express Shipping (${service.formattedBasePrice}) + Abuja Packaging (${service.billableWeight}kg × ₦2,000 = ${service.formattedPackagingCharge})`
      : '';
    const text = `Hello County Cargo, I received an Express Export quote on your website:
- Service: ${service.title} (${service.tagline})
- Origin: Nigeria (${origin} Hub)
- Destination: ${destination}
- Weight: ${numWeight} kg${breakdownText}
- Estimated Price: ${service.formattedPrice}
- Estimated Transit: ${service.deliveryTime}

I would like to proceed with booking this shipment.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="express-calculator-widget" className="w-full max-w-4xl mx-auto">
      {/* Calculator Container Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 backdrop-blur-sm">
        {/* Form Inputs Grid */}
        <form onSubmit={handleCalculate}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 items-end">
            {/* "From" Origin Location */}
            <div className="md:col-span-4 space-y-1.5">
              <Label
                htmlFor={originSelectId}
                className="text-sm font-semibold text-gray-700 flex items-center gap-1.5"
              >
                <span>From</span>
                <span className="text-xs text-primary font-medium">(Nigeria Hub)</span>
              </Label>
              <div className="relative">
                <select
                  id={originSelectId}
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value as 'Lagos' | 'Abuja')}
                  className="w-full h-12 px-3.5 bg-gray-50/80 border border-gray-300 rounded-xl text-gray-900 font-medium text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer"
                >
                  <option value="Lagos">Nigeria (Lagos)</option>
                  <option value="Abuja">Nigeria (Abuja)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* "To" Destination Country */}
            <div className="md:col-span-5 space-y-1.5">
              <Label
                htmlFor={destinationSelectId}
                className="text-sm font-semibold text-gray-700 flex items-center justify-between"
              >
                <span>To</span>
                {countriesLoading && (
                  <span className="text-xs text-muted-foreground animate-pulse">Loading destinations...</span>
                )}
              </Label>
              <div className="relative">
                <select
                  id={destinationSelectId}
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full h-12 px-3.5 bg-gray-50/80 border border-gray-300 rounded-xl text-gray-900 font-medium text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer"
                >
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* "Weight" in Kilograms */}
            <div className="md:col-span-3 space-y-1.5">
              <Label htmlFor={weightInputId} className="text-sm font-semibold text-gray-700">
                Weight
              </Label>
              <div className="relative flex items-center">
                <Input
                  id={weightInputId}
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 16"
                  className="h-12 pr-12 text-base font-semibold text-gray-900 rounded-xl bg-gray-50/80 border-gray-300 focus-visible:ring-primary"
                  required
                />
                <div className="absolute right-1.5 top-1.5 bottom-1.5 flex items-center justify-center px-3 bg-gray-200/80 text-gray-700 rounded-lg text-xs font-bold tracking-wider pointer-events-none">
                  kg
                </div>
              </div>
            </div>
          </div>

          {/* Calculate Quote Action Button */}
          <div className="mt-5">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-bold bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Connecting to Rate Engine...</span>
                </>
              ) : (
                <>
                  <span>Calculate Quote</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Error Alert Display */}
        {errorMessage && (
          <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Calculation Notice</p>
              <p className="mt-0.5 text-red-700">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Results Quotation Cards */}
        {quoteResult && (
          <div className="mt-8 pt-6 border-t border-gray-100 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row items-baseline justify-between mb-4 gap-1">
              <h3 className="text-lg font-bold text-gray-900">
                Available Shipping Services to {quoteResult.destination}:
              </h3>
              <span className="text-xs text-muted-foreground">
                Origin: Hub {quoteResult.origin} &bull; Billable: {quoteResult.weight} kg
              </span>
            </div>

            {/* Two Side-by-Side Cards on Desktop, Stacked on Mobile */}
            <div className={`grid gap-6 ${quoteResult.estimates.value ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-xl mx-auto'}`}>
              {/* Card 1: Value Export (if available) */}
              {quoteResult.estimates.value && (
                <div className="bg-gray-50/70 border border-gray-200 rounded-2xl p-6 flex flex-col justify-between hover:border-gray-300 transition-all shadow-sm">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-gray-900">
                        {quoteResult.estimates.value.title}
                      </h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
                        Economical
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-4">
                      {quoteResult.estimates.value.tagline}
                    </p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="text-3xl sm:text-4xl font-extrabold text-[#EA580C] tracking-tight">
                        {quoteResult.estimates.value.formattedPrice}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Consolidated Air Freight from Nigeria
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-6 text-sm text-gray-700">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{quoteResult.estimates.value.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{quoteResult.estimates.value.deliveryMethod}</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-amber-800 bg-amber-50/80 p-2.5 rounded-lg border border-amber-200/60">
                        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{quoteResult.estimates.value.customsNote}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full h-11 border-gray-300 hover:border-primary hover:text-primary font-semibold text-sm rounded-xl transition-all"
                    >
                      <a
                        href={buildPortalUrl(quoteResult.estimates.value)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Start Shipment
                      </a>
                    </Button>
                    <a
                      href={buildWhatsAppUrl(quoteResult.estimates.value)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full text-xs text-emerald-700 hover:text-emerald-800 font-medium py-1 gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Or Book via WhatsApp Specialist</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Card 2: Express Export (Always available for all 230+ DHL destinations) */}
              <div className="bg-white border-2 border-primary/40 hover:border-primary rounded-2xl p-6 flex flex-col justify-between shadow-md relative transition-all">
                {/* Recommended Badge */}
                <div className="absolute -top-3 right-6 bg-primary text-white text-xs font-bold px-3 py-0.5 rounded-full shadow-sm tracking-wide">
                  FASTEST DELIVERY
                </div>

                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-bold text-gray-900">
                      {quoteResult.estimates.express.title}
                    </h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-primary">
                      DHL Global Partner
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-4">
                    {quoteResult.estimates.express.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#EA580C] tracking-tight">
                      {quoteResult.estimates.express.formattedPrice}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Priority Express via DHL Global Network
                    </p>

                    {/* Abuja Express Packaging Charge Breakdown */}
                    {quoteResult.estimates.express.packagingCharge && quoteResult.estimates.express.packagingCharge > 0 ? (
                      <div className="mt-3 p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-xs space-y-1 text-left">
                        <div className="flex justify-between text-gray-600">
                          <span>Express shipping:</span>
                          <span className="font-semibold text-gray-800">{quoteResult.estimates.express.formattedBasePrice}</span>
                        </div>
                        <div className="flex justify-between text-orange-700">
                          <span>Abuja packaging ({quoteResult.estimates.express.billableWeight}kg × ₦2,000):</span>
                          <span className="font-bold text-orange-800">{quoteResult.estimates.express.formattedPackagingCharge}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-orange-200 font-bold text-gray-900">
                          <span>Total amount:</span>
                          <span className="text-[#EA580C]">{quoteResult.estimates.express.formattedPrice}</span>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-6 text-sm text-gray-700">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-gray-900">
                        {quoteResult.estimates.express.deliveryTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{quoteResult.estimates.express.deliveryMethod}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{quoteResult.estimates.express.carrier}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                      <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{quoteResult.estimates.express.customsNote}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2">
                  <Button
                    asChild
                    className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-bold text-sm rounded-xl shadow-md transition-all"
                  >
                    <a
                      href={buildPortalUrl(quoteResult.estimates.express)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Start Shipment
                    </a>
                  </Button>
                  <a
                    href={buildWhatsAppUrl(quoteResult.estimates.express)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full text-xs text-emerald-700 hover:text-emerald-800 font-medium py-1 gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Or Book via WhatsApp Specialist</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Disclaimer Footnote */}
            <p className="text-center text-xs text-muted-foreground mt-6 italic">
              *Final shipping costs are subject to change and will be confirmed after your items are received and officially weighed at our facility.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
