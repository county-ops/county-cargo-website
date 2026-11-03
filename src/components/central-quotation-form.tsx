'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Calculator,
  Plane,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  MessageSquare,
  Package,
  Scale,
  Sparkles,
  RefreshCw,
  Info,
  Minus,
  Plus,
  Ruler,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  DEFAULT_EXPORT_DESTINATIONS,
  ShipQuoteApiResponse,
  ShipQuoteEstimate,
} from '@/lib/central-pricing';
import { SHIP_COUNTY_CARGO_QUOTE_URL } from '@/lib/constants';

export type RoutePreset = 'uk-to-ng' | 'us-to-ng' | 'ng-to-uk' | 'ng-to-us' | 'ng-to-world';

export interface CentralQuotationFormProps {
  initialRoute?: RoutePreset;
  defaultFromCountry?: string;
  defaultFromCity?: string;
  defaultToCountry?: string;
  defaultToCity?: string;
  defaultWeight?: number;
  defaultService?: string;
  showDimensionsByDefault?: boolean;
  compact?: boolean;
  title?: string;
  description?: string;
  onEstimateChange?: (estimate: number | null, currency?: string) => void;
}

interface OriginOption {
  id: string;
  label: string;
  country: string;
  city: string;
  unit: 'kg' | 'lb';
}

const ORIGIN_OPTIONS: OriginOption[] = [
  {
    id: 'NG-LOS',
    label: 'Nigeria (Lagos)',
    country: 'Nigeria',
    city: 'Lagos Drop-off (Ladipo-Oshodi)',
    unit: 'kg',
  },
  {
    id: 'NG-ABV',
    label: 'Nigeria (Abuja)',
    country: 'Nigeria',
    city: 'Abuja Drop-off (Wuye Market)',
    unit: 'kg',
  },
  {
    id: 'UK-LON',
    label: 'United Kingdom (London)',
    country: 'United Kingdom',
    city: 'London Heathrow Depot',
    unit: 'kg',
  },
  {
    id: 'UK-LIV',
    label: 'United Kingdom (Liverpool)',
    country: 'United Kingdom',
    city: 'Liverpool Queens Dock Depot (L1 0BG)',
    unit: 'kg',
  },
  {
    id: 'US-TX',
    label: 'United States (Irving, TX)',
    country: 'United States',
    city: 'US Warehouse (Irving, TX)',
    unit: 'lb',
  },
];

const NIGERIA_DESTINATIONS = [
  { id: 'Lagos', label: '🇳🇬 Nigeria — Lagos (Mainland & Island)', city: 'Lagos' },
  { id: 'Abuja', label: '🇳🇬 Nigeria — Abuja (FCT)', city: 'Abuja' },
  { id: 'Port Harcourt', label: '🇳🇬 Nigeria — Port Harcourt (Rivers)', city: 'Port Harcourt' },
  { id: 'Ibadan', label: '🇳🇬 Nigeria — Ibadan (Oyo)', city: 'Ibadan' },
  { id: 'Kano', label: '🇳🇬 Nigeria — Kano', city: 'Kano' },
  { id: 'Enugu', label: '🇳🇬 Nigeria — Enugu', city: 'Enugu' },
  { id: 'Benin City', label: '🇳🇬 Nigeria — Benin City (Edo)', city: 'Benin City' },
  { id: 'Warri', label: '🇳🇬 Nigeria — Warri / Asaba (Delta)', city: 'Warri' },
  { id: 'Owerri', label: '🇳🇬 Nigeria — Owerri (Imo)', city: 'Owerri' },
  { id: 'Uyo', label: '🇳🇬 Nigeria — Uyo / Calabar', city: 'Uyo' },
  { id: 'Other States', label: '🇳🇬 Nigeria — Other States Nationwide', city: 'Abuja' },
];

const PRIORITY_EXPORT_COUNTRIES = [
  { country: 'United Kingdom', flag: '🇬🇧' },
  { country: 'United States', flag: '🇺🇸' },
  { country: 'Canada', flag: '🇨🇦' },
  { country: 'Australia', flag: '🇦🇺' },
  { country: 'Germany', flag: '🇩🇪' },
  { country: 'France', flag: '🇫🇷' },
  { country: 'United Arab Emirates', flag: '🇦🇪' },
  { country: 'South Africa', flag: '🇿🇦' },
  { country: 'Ireland', flag: '🇮🇪' },
  { country: 'Italy', flag: '🇮🇹' },
  { country: 'Spain', flag: '🇪🇸' },
  { country: 'Netherlands', flag: '🇳🇱' },
  { country: 'Ghana', flag: '🇬🇭' },
  { country: 'Kenya', flag: '🇰🇪' },
  { country: 'China', flag: '🇨🇳' },
  { country: 'India', flag: '🇮🇳' },
];

function resolveInitialState(props: CentralQuotationFormProps) {
  const fromCountry = (props.defaultFromCountry || '').toLowerCase();
  const fromCity = (props.defaultFromCity || '').toLowerCase();
  const toCountry = (props.defaultToCountry || '').toLowerCase();
  const toCity = props.defaultToCity || '';

  if (props.initialRoute === 'us-to-ng' || fromCountry.includes('united states') || fromCountry === 'us' || fromCountry === 'usa') {
    return {
      originId: 'US-TX',
      destination: toCity && NIGERIA_DESTINATIONS.some((d) => d.id.toLowerCase() === toCity.toLowerCase()) ? toCity : 'Lagos',
      serviceFilter: props.defaultService || 'all',
    };
  }

  if (props.initialRoute === 'ng-to-uk' || (fromCountry.includes('nigeria') && (toCountry.includes('united kingdom') || toCountry === 'uk'))) {
    return {
      originId: fromCity.includes('abuja') ? 'NG-ABV' : 'NG-LOS',
      destination: 'United Kingdom',
      serviceFilter: props.defaultService || 'all',
    };
  }

  if (props.initialRoute === 'ng-to-us' || (fromCountry.includes('nigeria') && (toCountry.includes('united states') || toCountry === 'us' || toCountry === 'usa'))) {
    return {
      originId: fromCity.includes('abuja') ? 'NG-ABV' : 'NG-LOS',
      destination: 'United States',
      serviceFilter: props.defaultService || 'all',
    };
  }

  if (props.initialRoute === 'ng-to-world' || fromCountry.includes('nigeria')) {
    return {
      originId: fromCity.includes('abuja') ? 'NG-ABV' : 'NG-LOS',
      destination: props.defaultToCountry && props.defaultToCountry !== 'Nigeria' ? props.defaultToCountry : 'United Kingdom',
      serviceFilter: props.defaultService || 'all',
    };
  }

  if (props.initialRoute === 'uk-to-ng' || fromCountry.includes('united kingdom') || fromCountry === 'uk') {
    return {
      originId: fromCity.includes('liverpool') ? 'UK-LIV' : 'UK-LON',
      destination: toCity && NIGERIA_DESTINATIONS.some((d) => d.id.toLowerCase() === toCity.toLowerCase()) ? toCity : 'Lagos',
      serviceFilter: props.defaultService || 'all',
    };
  }

  // Default: Nigeria (Lagos) to United States (matching Haulam sample)
  return {
    originId: fromCity.includes('abuja') ? 'NG-ABV' : 'NG-LOS',
    destination: props.defaultToCountry || 'United States',
    serviceFilter: props.defaultService || 'all',
  };
}

export function CentralQuotationForm(props: CentralQuotationFormProps) {
  const {
    defaultWeight = 25,
    showDimensionsByDefault = false,
    compact = false,
    title = 'Instant Shipping Cost Calculator',
    description = 'Calculate live shipping rates powered by the Ship County Cargo quotation engine. Select your origin, destination, service, and package weight below.',
    onEstimateChange,
  } = props;

  const initial = resolveInitialState(props);

  const [originId, setOriginId] = useState<string>(initial.originId);
  const [destination, setDestination] = useState<string>(initial.destination);
  const [serviceFilter, setServiceFilter] = useState<string>(initial.serviceFilter);
  const [weightInput, setWeightInput] = useState<string>(String(defaultWeight));

  // Volumetric Dimensions
  const [showDimensions, setShowDimensions] = useState<boolean>(showDimensionsByDefault);
  const [lengthInput, setLengthInput] = useState<string>('');
  const [widthInput, setWidthInput] = useState<string>('');
  const [heightInput, setHeightInput] = useState<string>('');
  const [dimensionUnit, setDimensionUnit] = useState<'cm' | 'in'>(
    initial.originId.startsWith('US') ? 'in' : 'cm'
  );

  // Live destinations from Ship County Cargo API
  const [exportCountries, setExportCountries] = useState<string[]>(DEFAULT_EXPORT_DESTINATIONS);

  // API Response & Loading state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [quoteData, setQuoteData] = useState<ShipQuoteApiResponse | null>(null);

  const selectedOrigin = ORIGIN_OPTIONS.find((o) => o.id === originId) || ORIGIN_OPTIONS[0];
  const isUsOrigin = selectedOrigin.country === 'United Kingdom' ? false : selectedOrigin.country === 'United States';
  const isUkOrigin = selectedOrigin.country === 'United Kingdom';
  const isNigeriaOrigin = selectedOrigin.country === 'Nigeria';
  const weightUnit = selectedOrigin.unit;

  // Fetch live export destinations on mount
  useEffect(() => {
    let active = true;
    fetch('/api/shipping/quote')
      .then((res) => res.json())
      .then((data) => {
        if (active && Array.isArray(data?.countries) && data.countries.length > 0) {
          const filtered = Array.from(
            new Set(
              data.countries
                .map((c: string) => (typeof c === 'string' ? c.trim() : ''))
                .filter((c: string) => c.length > 0 && c !== 'Nigeria')
            )
          ) as string[];
          if (filtered.length > 0) {
            setExportCountries(filtered);
          }
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Available service options for the selected route
  const serviceOptions = React.useMemo(() => {
    const opts = [{ id: 'all', label: 'Compare All Available Services' }];
    if (isUsOrigin) {
      opts.push({
        id: 'valueImport',
        label: 'Value Shipping (Consolidated Air Cargo • 5–10 working days)',
      });
    } else if (isUkOrigin) {
      opts.push(
        {
          id: 'valueImport',
          label: 'Value Shipping (Standard Air Cargo • 5–10 working days)',
        },
        {
          id: 'expressImport',
          label: 'Express Shipping (Priority Air Courier • 3 to 5 working days)',
        }
      );
      if (destination === 'Lagos') {
        opts.push({
          id: 'specialExpressImport',
          label: 'Special Express (48 Hours • £22/kg + £20 handling)',
        });
      }
    } else if (isNigeriaOrigin) {
      opts.push(
        {
          id: 'valueExport',
          label: 'Value Shipping (10 kg min chargeable • 5–10 working days)',
        },
        {
          id: 'expressExport',
          label: 'Express Shipping (Priority DHL Courier • 3–5 working days)',
        }
      );
      if (originId === 'NG-LOS' && destination === 'United Kingdom') {
        opts.push({
          id: 'specialExpressExport',
          label: 'Special Express (48 Hours • £22/kg + £20 handling)',
        });
      }
    }
    return opts;
  }, [isUsOrigin, isUkOrigin, isNigeriaOrigin, destination, originId]);

  // Keep serviceFilter valid when route changes
  useEffect(() => {
    if (!serviceOptions.some((o) => o.id === serviceFilter)) {
      setServiceFilter('all');
    }
  }, [serviceOptions, serviceFilter]);

  const handleOriginChange = (newOriginId: string) => {
    setOriginId(newOriginId);
    setError(null);
    const nextOrigin = ORIGIN_OPTIONS.find((o) => o.id === newOriginId) || ORIGIN_OPTIONS[0];
    setDimensionUnit(nextOrigin.country === 'United States' ? 'in' : 'cm');

    if (nextOrigin.country === 'United Kingdom' || nextOrigin.country === 'United States') {
      if (!NIGERIA_DESTINATIONS.some((d) => d.id === destination)) {
        setDestination('Lagos');
      }
    } else {
      if (NIGERIA_DESTINATIONS.some((d) => d.id === destination) || destination === 'Nigeria') {
        setDestination('United Kingdom');
      }
    }
  };

  const calculateQuote = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      setError(null);

      const parsedWeight = parseFloat(weightInput);
      if (isNaN(parsedWeight) || parsedWeight <= 0) {
        setError(
          weightUnit === 'lb'
            ? 'Please enter a valid package weight greater than 0 lb.'
            : 'Please enter a valid package weight greater than 0 kg.'
        );
        return;
      }

      const l = showDimensions ? parseFloat(lengthInput) || 0 : 0;
      const w = showDimensions ? parseFloat(widthInput) || 0 : 0;
      const h = showDimensions ? parseFloat(heightInput) || 0 : 0;

      const destCountry = isUkOrigin || isUsOrigin ? 'Nigeria' : destination;
      const destCity =
        isUkOrigin || isUsOrigin
          ? NIGERIA_DESTINATIONS.find((d) => d.id === destination)?.city || 'Lagos'
          : '';

      setLoading(true);
      try {
        const res = await fetch('/api/shipping/quote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            originCountry: selectedOrigin.country,
            originCity: selectedOrigin.city,
            destinationCountry: destCountry,
            destinationCity: destCity,
            weight: parsedWeight,
            length: l > 0 ? l : undefined,
            width: w > 0 ? w : undefined,
            height: h > 0 ? h : undefined,
            dimensionUnit,
            handoverMethod: 'depot',
            category: 'General Goods',
          }),
        });

        const data: ShipQuoteApiResponse = await res.json();

        if (!res.ok || !data.success || !data.estimates || data.estimates.length === 0) {
          setError(data.error || 'We could not retrieve the current rate. Please try again.');
          setQuoteData(null);
          if (onEstimateChange) onEstimateChange(null);
        } else {
          setQuoteData(data);
          if (onEstimateChange && data.estimates[0]) {
            onEstimateChange(data.estimates[0].estimate, data.estimates[0].currency);
          }
        }
      } catch (err) {
        console.error('Error calculating quote:', err);
        setError('Unable to connect to the quotation service. Please try again.');
        setQuoteData(null);
      } finally {
        setLoading(false);
      }
    },
    [
      weightInput,
      weightUnit,
      showDimensions,
      lengthInput,
      widthInput,
      heightInput,
      dimensionUnit,
      isUkOrigin,
      isUsOrigin,
      destination,
      selectedOrigin,
      onEstimateChange,
    ]
  );

  // Automatically calculate initial quote and recalculate when inputs change
  useEffect(() => {
    const parsedWeight = parseFloat(weightInput);
    if (isNaN(parsedWeight) || parsedWeight <= 0) return;
    const timer = setTimeout(() => {
      calculateQuote();
    }, 250);
    return () => clearTimeout(timer);
  }, [originId, destination, weightInput, showDimensions, lengthInput, widthInput, heightInput, dimensionUnit, calculateQuote]);

  const displayedEstimates: ShipQuoteEstimate[] = React.useMemo(() => {
    if (!quoteData?.estimates) return [];
    if (serviceFilter === 'all') return quoteData.estimates;
    const filtered = quoteData.estimates.filter((est) => est.serviceType === serviceFilter);
    return filtered.length > 0 ? filtered : quoteData.estimates;
  }, [quoteData, serviceFilter]);

  const formatCurrency = (amount: number, currency: 'GBP' | 'USD' | 'NGN') => {
    const symbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '₦';
    return `${symbol}${amount.toLocaleString(undefined, {
      minimumFractionDigits: currency === 'NGN' ? 0 : 2,
      maximumFractionDigits: currency === 'NGN' ? 0 : 2,
    })}`;
  };

  const getMinWeightNote = (est: ShipQuoteEstimate, enteredWeight: number, volWeight: number) => {
    if (volWeight > enteredWeight && est.billableWeight === Math.max(volWeight, est.minimumWeight)) {
      return `Volumetric weight (${volWeight} ${est.weightUnit}) exceeds actual weight (${enteredWeight} ${est.weightUnit}). Airlines bill by chargeable weight (${est.billableWeight} ${est.weightUnit}).`;
    }
    if (est.serviceType === 'valueExport' && enteredWeight < 10) {
      return 'Minimum chargeable weight for Value Export is 10 kg.';
    }
    if (enteredWeight < est.minimumWeight) {
      return `Minimum chargeable weight for ${est.serviceName} is ${est.minimumWeight} ${est.weightUnit}.`;
    }
    if (Math.ceil(enteredWeight) > enteredWeight) {
      return `Shipments are billed at the next whole ${est.weightUnit} (${est.billableWeight} ${est.weightUnit}).`;
    }
    return null;
  };

  return (
    <div id="quote-calculator" className="w-full max-w-4xl mx-auto">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/90 p-6 sm:p-8">
        {/* Form Controls (Haulam layout & sequence: From, To, Weight + full-width Calculate Quote button) */}
        <form onSubmit={calculateQuote} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end text-left">
            {/* 1. From */}
            <div className="space-y-2">
              <Label htmlFor="calc-origin" className="text-sm font-semibold text-slate-900">
                From
              </Label>
              <select
                id="calc-origin"
                value={originId}
                onChange={(e) => handleOriginChange(e.target.value)}
                className="w-full h-11 px-3.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-medium shadow-xs focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all"
              >
                {ORIGIN_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. To */}
            <div className="space-y-2">
              <Label htmlFor="calc-destination" className="text-sm font-semibold text-slate-900">
                To
              </Label>
              <select
                id="calc-destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full h-11 px-3.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-medium shadow-xs focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all"
              >
                {isUkOrigin || isUsOrigin ? (
                  NIGERIA_DESTINATIONS.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.id}, Nigeria
                    </option>
                  ))
                ) : (
                  <>
                    <optgroup label="Popular Destinations">
                      {PRIORITY_EXPORT_COUNTRIES.map((c) => (
                        <option key={`priority-${c.country}`} value={c.country}>
                          {c.country}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="All Countries (A–Z)">
                      {exportCountries
                        .filter((c) => !PRIORITY_EXPORT_COUNTRIES.some((p) => p.country === c))
                        .map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                    </optgroup>
                  </>
                )}
              </select>
            </div>

            {/* 3. Weight */}
            <div className="space-y-2">
              <Label htmlFor="calc-weight" className="text-sm font-semibold text-slate-900">
                Weight
              </Label>
              <div className="flex gap-2">
                <input
                  id="calc-weight"
                  type="number"
                  min="0.5"
                  step="0.01"
                  value={weightInput}
                  onChange={(e) => setWeightInput(e.target.value)}
                  onBlur={() => {
                    const val = parseFloat(weightInput);
                    if (isNaN(val) || val <= 0) {
                      setWeightInput('1');
                    }
                  }}
                  className="h-11 flex-1 min-w-0 px-3.5 rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                  placeholder="e.g., 25"
                  required
                />
                <div className="flex items-center justify-center px-4 h-11 border border-slate-200 rounded-lg bg-slate-100 text-slate-700 font-semibold text-sm shrink-0">
                  {weightUnit}
                </div>
              </div>
            </div>
          </div>

          {/* Optional Volumetric Weight Dimensions Toggle */}
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
                  : 'Have a bulky box? Enter dimensions (L × W × H) for volumetric weight'}
              </span>
              {showDimensions ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showDimensions && (
              <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-left">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <Package className="w-4 h-4 text-primary" />
                    <span>Package Dimensions (Volumetric Weight Check)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-slate-500 font-medium">Unit:</span>
                    <button
                      type="button"
                      onClick={() => setDimensionUnit('cm')}
                      className={`px-2.5 py-1 rounded-md font-bold transition-colors ${
                        dimensionUnit === 'cm'
                          ? 'bg-primary text-white'
                          : 'bg-white border border-slate-200 text-slate-700'
                      }`}
                    >
                      cm
                    </button>
                    <button
                      type="button"
                      onClick={() => setDimensionUnit('in')}
                      className={`px-2.5 py-1 rounded-md font-bold transition-colors ${
                        dimensionUnit === 'in'
                          ? 'bg-primary text-white'
                          : 'bg-white border border-slate-200 text-slate-700'
                      }`}
                    >
                      in
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="calc-length" className="text-xs font-semibold text-slate-600">
                      Length ({dimensionUnit})
                    </Label>
                    <Input
                      id="calc-length"
                      type="number"
                      min="0"
                      step="1"
                      placeholder={dimensionUnit === 'cm' ? 'e.g. 50' : 'e.g. 20'}
                      value={lengthInput}
                      onChange={(e) => setLengthInput(e.target.value)}
                      className="mt-1 h-10 bg-white font-semibold"
                    />
                  </div>
                  <div>
                    <Label htmlFor="calc-width" className="text-xs font-semibold text-slate-600">
                      Width ({dimensionUnit})
                    </Label>
                    <Input
                      id="calc-width"
                      type="number"
                      min="0"
                      step="1"
                      placeholder={dimensionUnit === 'cm' ? 'e.g. 40' : 'e.g. 16'}
                      value={widthInput}
                      onChange={(e) => setWidthInput(e.target.value)}
                      className="mt-1 h-10 bg-white font-semibold"
                    />
                  </div>
                  <div>
                    <Label htmlFor="calc-height" className="text-xs font-semibold text-slate-600">
                      Height ({dimensionUnit})
                    </Label>
                    <Input
                      id="calc-height"
                      type="number"
                      min="0"
                      step="1"
                      placeholder={dimensionUnit === 'cm' ? 'e.g. 40' : 'e.g. 16'}
                      value={heightInput}
                      onChange={(e) => setHeightInput(e.target.value)}
                      className="mt-1 h-10 bg-white font-semibold"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Full-width Pill Calculate Quote Button (Haulam style) */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold text-base sm:text-lg shadow-md transition-all"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Calculating...
              </>
            ) : (
              'Calculate Quote'
            )}
          </Button>
        </form>

        {/* Error Banner */}
        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2.5 text-left">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Quote Results Section (Haulam 2-Card Diagonal Sequence) */}
        {loading && !quoteData ? (
          <div className="py-10 text-center space-y-2">
            <RefreshCw className="w-7 h-7 text-[#dc2626] animate-spin mx-auto" />
            <p className="text-sm font-medium text-slate-500">Calculating shipping quote...</p>
          </div>
        ) : displayedEstimates.length > 0 && quoteData ? (
          <div className="mt-8">
            <div
              className={`grid grid-cols-1 gap-6 text-left ${
                displayedEstimates.length === 1
                  ? 'max-w-xl mx-auto'
                  : displayedEstimates.length === 2
                    ? 'md:grid-cols-2'
                    : 'md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {displayedEstimates.map((est) => {
                const minWeightNote = getMinWeightNote(
                  est,
                  quoteData.actualWeight,
                  quoteData.volumetricWeight
                );
                const approxNgn =
                  est.approxNgnEstimate ||
                  (est.currency !== 'NGN' && est.exchangeRate
                    ? Math.round(est.estimate * est.exchangeRate)
                    : undefined);

                const featureList =
                  est.features && est.features.length > 0
                    ? est.features
                    : [
                        `Delivery in ${est.estimatedDelivery}`,
                        est.deliveryMethod || 'Doorstep delivery',
                        ...(est.serviceType.toLowerCase().includes('express') &&
                        !est.serviceType.toLowerCase().includes('special')
                          ? ['Shipment via DHL']
                          : []),
                        est.customsInfo || '15% additional tarrif on declared value applies',
                      ];

                return (
                  <div
                    key={est.serviceType}
                    className="rounded-xl border border-slate-200/90 bg-white p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
                  >
                    <div>
                      {/* 1. Service Name & Description */}
                      <div className="pb-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                          {est.serviceName}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">{est.description}</p>
                      </div>

                      {/* 2. Total Price */}
                      <div className="my-4">
                        <div className="text-3xl sm:text-4xl font-extrabold text-[#dc2626] tracking-tight">
                          {formatCurrency(est.estimate, est.currency)}
                        </div>
                        {approxNgn && est.currency !== 'NGN' && (
                          <div className="text-xs font-medium text-slate-500 mt-1">
                            Approx. ₦{approxNgn.toLocaleString()} NGN
                          </div>
                        )}
                      </div>

                      {/* 3. Feature List (Green checkmarks & Amber alert icons matching Haulam) */}
                      <ul className="space-y-2.5 text-sm text-slate-600 mb-5">
                        {featureList.map((feature, idx) => {
                          const isWarningItem =
                            feature.toLowerCase().includes('customs fees') ||
                            feature.toLowerCase().includes('tarrif') ||
                            feature.toLowerCase().includes('tariff');
                          return (
                            <li key={idx} className="flex items-start gap-2.5">
                              {isWarningItem ? (
                                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                              ) : (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              )}
                              <span>{feature}</span>
                            </li>
                          );
                        })}
                      </ul>

                      {/* 4. Compact Price & Weight Breakdown */}
                      <div className="text-xs text-slate-500 py-2.5 px-3 mb-5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                        <div className="flex justify-between">
                          <span>Chargeable Weight:</span>
                          <span className="font-semibold text-slate-700">
                            {est.billableWeight} {est.weightUnit}
                            {quoteData.volumetricWeight > 0
                              ? ` (Vol: ${quoteData.volumetricWeight} ${est.weightUnit})`
                              : ''}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rate / Base Cost:</span>
                          <span className="font-semibold text-slate-700">
                            {formatCurrency(est.baseCost, est.currency)} ({formatCurrency(est.rate, est.currency)}/{est.weightUnit})
                          </span>
                        </div>
                        {est.handlingFee !== undefined && est.handlingFee > 0 && (
                          <div className="flex justify-between">
                            <span>Handling Fee:</span>
                            <span className="font-semibold text-slate-700">
                              {formatCurrency(est.handlingFee, est.currency)}
                            </span>
                          </div>
                        )}
                        {minWeightNote && (
                          <div className="text-[11px] text-amber-700 pt-1 border-t border-slate-200/70">
                            {minWeightNote}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 5. Outlined Pill Action Button (Haulam style) */}
                    <div className="mt-auto pt-1">
                      <a
                        href={est.bookingUrl || SHIP_COUNTY_CARGO_QUOTE_URL}
                        className="w-full h-11 rounded-full font-semibold text-sm border border-[#dc2626]/80 text-[#dc2626] hover:bg-[#dc2626] hover:text-white bg-transparent transition-colors flex items-center justify-center"
                      >
                        Start Shipment
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footnote matching Haulam sample */}
            <p className="text-xs text-slate-500 mt-6 text-center italic">
              *Final shipping costs are subject to change and will be confirmed after your items are received and officially weighed at our facility.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
