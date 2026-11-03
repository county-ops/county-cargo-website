'use client';

import React, { useState, useEffect, useId } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Clock,
  Loader2,
  Info,
  MessageCircle,
  Ruler,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SearchableCountrySelect } from '@/components/searchable-country-select';
import { SHIP_COUNTY_CARGO_QUOTE_URL } from '@/lib/constants';

interface ServiceEstimate {
  serviceType: string;
  title: string;
  tagline: string;
  price: number;
  baseCost?: number;
  handlingFee?: number;
  formattedPrice: string;
  currency: string;
  rate?: number;
  billableWeight: number;
  actualWeight?: number;
  volumetricWeight?: number;
  weightUnit?: string;
  minimumWeight?: number;
  minimumWeightApplied?: boolean;
  approxNgnEstimate?: number;
  deliveryTime: string;
  estimatedDelivery?: string;
  deliveryMethod: string;
  carrier: string;
  customsNote: string;
  features: string[];
  bookingUrl?: string;
  whatsAppUrl?: string;
  recommended?: boolean;
}

interface QuoteResponse {
  success?: boolean;
  origin: string;
  destination: string;
  weight: number;
  actualWeight?: number;
  volumetricWeight?: number;
  chargeableWeight?: number;
  estimates: {
    value: ServiceEstimate | null;
    express: ServiceEstimate | null;
    specialExpress?: ServiceEstimate | null;
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
  initialOrigin = 'Lagos',
  initialDestination = 'United States',
  initialWeight = 25,
}: ExpressExportCalculatorProps) {
  const [origin, setOrigin] = useState<'Lagos' | 'Abuja'>(initialOrigin);
  const [destination, setDestination] = useState<string>(initialDestination);
  const [selectedService, setSelectedService] = useState<string>('all');
  const [weight, setWeight] = useState<string>(String(initialWeight));

  // Volumetric Dimensions
  const [showDimensions, setShowDimensions] = useState<boolean>(false);
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');

  const [countries, setCountries] = useState<string[]>(DEFAULT_POPULAR_COUNTRIES);
  const [loading, setLoading] = useState(false);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [quoteResult, setQuoteResult] = useState<QuoteResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const originSelectId = useId();
  const destinationSelectId = useId();
  const serviceSelectId = useId();
  const weightInputId = useId();

  // Fetch full countries list from the Ship County Cargo API on mount
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
            if (names.length > 0) setCountries(names);
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

  // Perform calculation via Ship County Cargo API proxy
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

    const l = showDimensions ? parseFloat(length) || 0 : 0;
    const w = showDimensions ? parseFloat(width) || 0 : 0;
    const h = showDimensions ? parseFloat(height) || 0 : 0;

    try {
      setLoading(true);
      const res = await fetch('/api/shipping/export-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin,
          destinationCountry: destination,
          weight: numWeight,
          length: l > 0 ? l : undefined,
          width: w > 0 ? w : undefined,
          height: h > 0 ? h : undefined,
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

  // Run calculation automatically when inputs change
  useEffect(() => {
    const numWeight = parseFloat(weight);
    if (isNaN(numWeight) || numWeight <= 0 || !destination) return;
    const timer = setTimeout(() => {
      handleCalculate();
    }, 250);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin, destination, weight, showDimensions, length, width, height]);

  const formatMoney = (amount: number, currency: string) => {
    const sym = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '₦';
    return `${sym}${amount.toLocaleString(undefined, {
      minimumFractionDigits: currency === 'NGN' ? 0 : 2,
      maximumFractionDigits: currency === 'NGN' ? 0 : 2,
    })}`;
  };

  const cardsToShow: ServiceEstimate[] = React.useMemo(() => {
    if (!quoteResult?.estimates) return [];
    const all: ServiceEstimate[] = [];
    if (quoteResult.estimates.value) all.push(quoteResult.estimates.value);
    if (quoteResult.estimates.express) all.push(quoteResult.estimates.express);
    if (quoteResult.estimates.specialExpress) all.push(quoteResult.estimates.specialExpress);

    if (selectedService === 'all') return all;
    const filtered = all.filter((c) => c.serviceType === selectedService);
    return filtered.length > 0 ? filtered : all;
  }, [quoteResult, selectedService]);

  return (
    <div id="express-calculator-widget" className="w-full max-w-4xl mx-auto">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/90 p-6 sm:p-8">
        {/* Form Inputs Grid (Haulam sequence: From, To, Weight + full-width Calculate Quote button) */}
        <form onSubmit={handleCalculate} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end text-left">
            {/* 1. "From" Origin Location */}
            <div className="space-y-2">
              <Label
                htmlFor={originSelectId}
                className="text-sm font-semibold text-slate-900"
              >
                From
              </Label>
              <select
                id={originSelectId}
                value={origin}
                onChange={(e) => setOrigin(e.target.value as 'Lagos' | 'Abuja')}
                className="w-full h-11 px-3.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-medium text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all cursor-pointer"
              >
                <option value="Lagos">Nigeria (Lagos)</option>
                <option value="Abuja">Nigeria (Abuja)</option>
              </select>
            </div>

            {/* 2. "To" Destination Country */}
            <div className="space-y-2">
              <Label
                htmlFor={destinationSelectId}
                className="text-sm font-semibold text-slate-900 flex items-center justify-between"
              >
                <span>To</span>
                {countriesLoading && (
                  <span className="text-xs text-muted-foreground animate-pulse">
                    Loading...
                  </span>
                )}
              </Label>
              <SearchableCountrySelect
                id={destinationSelectId}
                value={destination}
                onChange={(c) => setDestination(c)}
                countries={countries}
                size="md"
                disabled={countriesLoading}
              />
            </div>

            {/* 3. Weight in Kilograms */}
            <div className="space-y-2">
              <Label htmlFor={weightInputId} className="text-sm font-semibold text-slate-900">
                Weight
              </Label>
              <div className="flex gap-2">
                <Input
                  id={weightInputId}
                  type="number"
                  min="0.5"
                  step="0.01"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="25"
                  className="h-11 flex-1 text-sm font-semibold text-slate-900 rounded-lg bg-white border-slate-300 focus-visible:ring-primary"
                  required
                />
                <div className="flex items-center justify-center px-4 h-11 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold shrink-0">
                  kg
                </div>
              </div>
            </div>
          </div>

          {/* Volumetric Weight Dimensions Toggle */}
          <div>
            <button
              type="button"
              onClick={() => setShowDimensions((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary transition-colors"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>
                {showDimensions
                  ? 'Hide package dimensions (volumetric weight)'
                  : 'Have a bulky box? Enter dimensions (L × W × H in cm) for volumetric weight'}
              </span>
              {showDimensions ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {showDimensions && (
              <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <Label className="text-xs font-semibold text-slate-600">Length (cm)</Label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="e.g. 50"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="mt-1 bg-white"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-600">Width (cm)</Label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="e.g. 40"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="mt-1 bg-white"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-600">Height (cm)</Label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="e.g. 40"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="mt-1 bg-white"
                    />
                  </div>
                </div>
                <p className="text-xs text-slate-500">
                  Volumetric weight formula: <code>(Length × Width × Height in cm) ÷ 5000</code>.
                  Shipments are billed on whichever is greater between actual and volumetric weight.
                </p>
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-full text-base sm:text-lg font-semibold bg-[#dc2626] hover:bg-[#b91c1c] text-white shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Calculating...</span>
              </>
            ) : (
              <span>Calculate Quote</span>
            )}
          </Button>
        </form>

        {/* Error Alert Display */}
        {errorMessage && (
          <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm text-left">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Calculation Notice</p>
              <p className="mt-0.5 text-red-700">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Results Quotation Cards (Haulam 2-Card Diagonal Sequence) */}
        {quoteResult && cardsToShow.length > 0 && (
          <div className="mt-8 animate-in fade-in duration-300">
            <div
              className={`grid gap-6 text-left ${
                cardsToShow.length === 1
                  ? 'grid-cols-1 max-w-xl mx-auto'
                  : cardsToShow.length === 2
                    ? 'grid-cols-1 md:grid-cols-2'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {cardsToShow.map((card) => {
                return (
                  <div
                    key={card.serviceType}
                    className="rounded-xl p-6 flex flex-col justify-between bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="pb-2">
                        <h4 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                          {card.title}
                        </h4>
                        <p className="text-sm text-slate-500 mt-1">{card.tagline}</p>
                      </div>

                      {/* Price Display */}
                      <div className="my-4">
                        <div className="text-3xl sm:text-4xl font-extrabold text-[#dc2626] tracking-tight">
                          {card.formattedPrice}
                        </div>
                        {card.approxNgnEstimate && card.currency !== 'NGN' && (
                          <div className="text-xs font-medium text-slate-500 mt-1">
                            Approx. ₦{card.approxNgnEstimate.toLocaleString()} NGN
                          </div>
                        )}
                      </div>

                      {/* Features Checklist (Green checkmarks & Amber alert icons matching Haulam) */}
                      <ul className="space-y-2.5 text-sm text-slate-600 mb-5">
                        {card.features.map((feat, idx) => {
                          const isWarningItem =
                            feat.toLowerCase().includes('customs fees') ||
                            feat.toLowerCase().includes('tarrif') ||
                            feat.toLowerCase().includes('tariff');
                          return (
                            <li key={idx} className="flex items-start gap-2.5">
                              {isWarningItem ? (
                                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                              ) : (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              )}
                              <span>{feat}</span>
                            </li>
                          );
                        })}
                      </ul>

                      {/* Compact Breakdown */}
                      <div className="text-xs text-slate-500 py-2.5 px-3 mb-5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                        <div className="flex justify-between">
                          <span>Chargeable Weight:</span>
                          <span className="font-semibold text-slate-700">
                            {card.billableWeight} {card.weightUnit || 'kg'}
                          </span>
                        </div>
                        {card.baseCost !== undefined && (
                          <div className="flex justify-between">
                            <span>Base Cost:</span>
                            <span className="font-semibold text-slate-700">
                              {formatMoney(card.baseCost, card.currency)}
                            </span>
                          </div>
                        )}
                        {card.handlingFee !== undefined && card.handlingFee > 0 && (
                          <div className="flex justify-between">
                            <span>Handling Fee:</span>
                            <span className="font-semibold text-slate-700">
                              {formatMoney(card.handlingFee, card.currency)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Outlined Pill Action Button (Haulam style) */}
                    <div className="mt-auto pt-1">
                      <a
                        href={card.bookingUrl || SHIP_COUNTY_CARGO_QUOTE_URL}
                        className="w-full h-11 rounded-full font-semibold text-sm border border-[#dc2626]/80 text-[#dc2626] hover:bg-[#dc2626] hover:text-white bg-transparent transition-colors flex items-center justify-center"
                      >
                        Start Shipment
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-xs text-slate-500 mt-6 italic">
              *Final shipping costs are subject to change and will be confirmed after your items are received and officially weighed at our facility.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
