'use client';

import React, { useState, useEffect, useId } from 'react';
import {
  Plane,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Info,
  AlertCircle,
  Loader2,
  MessageCircle,
  HelpCircle,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Layers,
  Box,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ORIGIN_LOCATIONS,
  DESTINATION_CITIES,
  ServiceComparisonCard,
  CentralQuoteResponse,
} from '@/lib/central-pricing';

interface QuickRoute {
  id: string;
  label: string;
  fromCountry: string;
  fromCity: string;
  toCountry: string;
  toCity: string;
}

const QUICK_ROUTES: QuickRoute[] = [
  {
    id: 'uk-ng',
    label: 'UK to Nigeria',
    fromCountry: 'United Kingdom',
    fromCity: 'London Charlton Depot (SE7 7RU)',
    toCountry: 'Nigeria',
    toCity: 'Lagos',
  },
  {
    id: 'ng-uk',
    label: 'Nigeria to UK',
    fromCountry: 'Nigeria',
    fromCity: 'Lagos Drop-Off (Ladipo-Oshodi Plaza)',
    toCountry: 'United Kingdom',
    toCity: 'London',
  },
  {
    id: 'us-ng',
    label: 'USA to Nigeria',
    fromCountry: 'United States',
    fromCity: 'Irving Texas Warehouse (TX 75061)',
    toCountry: 'Nigeria',
    toCity: 'Lagos',
  },
  {
    id: 'ng-us',
    label: 'Nigeria to USA',
    fromCountry: 'Nigeria',
    fromCity: 'Lagos Drop-Off (Ladipo-Oshodi Plaza)',
    toCountry: 'United States',
    toCity: 'Houston',
  },
  {
    id: 'ng-world',
    label: 'Nigeria to World',
    fromCountry: 'Nigeria',
    fromCity: 'Lagos Drop-Off (Ladipo-Oshodi Plaza)',
    toCountry: 'Canada',
    toCity: 'Toronto',
  },
];

const POPULAR_DESTINATIONS = [
  'Nigeria',
  'United Kingdom',
  'United States',
  'Canada',
  'Germany',
  'France',
  'China',
  'United Arab Emirates',
  'Australia',
  'India',
  'South Africa',
  'Italy',
  'Ghana',
  'Kenya',
  'Turkey',
  'Spain',
  'Netherlands',
];

interface CentralQuotationFormProps {
  defaultRouteId?: string;
  compact?: boolean;
}

export function CentralQuotationForm({
  defaultRouteId = 'uk-ng',
  compact = false,
}: CentralQuotationFormProps) {
  const [activeRouteTab, setActiveRouteTab] = useState<string>(defaultRouteId);
  const [fromCountry, setFromCountry] = useState<string>('United Kingdom');
  const [fromCity, setFromCity] = useState<string>('London Charlton Depot (SE7 7RU)');
  const [toCountry, setToCountry] = useState<string>('Nigeria');
  const [toCity, setToCity] = useState<string>('Lagos');

  const [weight, setWeight] = useState<string>('10');
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [itemDescription, setItemDescription] = useState<string>('');
  const [packageCategory, setPackageCategory] = useState<string>('general');
  const [collectionType, setCollectionType] = useState<'dropoff' | 'collection'>('dropoff');

  const [showDimensions, setShowDimensions] = useState<boolean>(false);
  const [allCountries, setAllCountries] = useState<string[]>(POPULAR_DESTINATIONS);
  const [loading, setLoading] = useState<boolean>(false);
  const [quoteResult, setQuoteResult] = useState<CentralQuoteResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fromCountryId = useId();
  const fromCityId = useId();
  const toCountryId = useId();
  const toCityId = useId();
  const weightInputId = useId();
  const categoryId = useId();

  // Load destination countries list on mount
  useEffect(() => {
    let isMounted = true;
    async function loadCountryList() {
      try {
        const res = await fetch('/api/shipping/quote');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.dhlCountries && Array.isArray(data.dhlCountries)) {
            // Merge with Nigeria & popular countries
            const fullList = Array.from(
              new Set(['Nigeria', 'United Kingdom', 'United States', 'Canada', ...data.dhlCountries])
            ).sort();
            setAllCountries(fullList);
          }
        }
      } catch (err) {
        console.warn('Failed to load full country list:', err);
      }
    }
    loadCountryList();
    return () => {
      isMounted = false;
    };
  }, []);

  // Volumetric weight live calculation
  const numLength = parseFloat(length) || 0;
  const numWidth = parseFloat(width) || 0;
  const numHeight = parseFloat(height) || 0;
  const volumetricWeight =
    numLength > 0 && numWidth > 0 && numHeight > 0
      ? Math.round(((numLength * numWidth * numHeight) / 5000) * 10) / 10
      : 0;
  const enteredNumWeight = parseFloat(weight) || 0;
  const effectiveChargeableWeight = Math.max(enteredNumWeight, volumetricWeight);

  // Quick route switcher handler
  const handleSelectRouteTab = (route: QuickRoute) => {
    setActiveRouteTab(route.id);
    setFromCountry(route.fromCountry);
    setFromCity(route.fromCity);
    setToCountry(route.toCountry);
    setToCity(route.toCity);
    triggerCalculation(route.fromCountry, route.fromCity, route.toCountry, route.toCity, enteredNumWeight);
  };

  const triggerCalculation = async (
    fCountry = fromCountry,
    fCity = fromCity,
    tCountry = toCountry,
    tCity = toCity,
    w = enteredNumWeight
  ) => {
    setErrorMessage(null);
    if (!w || w <= 0) {
      setErrorMessage('Please enter a valid weight in kg greater than 0.');
      return;
    }
    if (fCountry === tCountry) {
      setErrorMessage('Origin and destination countries cannot be identical.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/shipping/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromCountry: fCountry,
          fromCity: fCity,
          toCountry: tCountry,
          toCity: tCity,
          weight: w,
          length: numLength,
          width: numWidth,
          height: numHeight,
          itemDescription,
          packageCategory,
          collectionType,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMessage(data.error || 'Failed to calculate quote. Please check your inputs.');
        setQuoteResult(null);
      } else {
        setQuoteResult(data);
      }
    } catch (err: any) {
      setErrorMessage('Network connection error while calculating quote. Please try again.');
      setQuoteResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerCalculation();
  };

  // Perform initial calculation on mount
  useEffect(() => {
    triggerCalculation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handover locations based on selected origin country
  const currentHandoverLocations =
    ORIGIN_LOCATIONS[fromCountry as keyof typeof ORIGIN_LOCATIONS] || [
      { id: 'hub', name: `${fromCountry} Hub Drop-off`, city: fromCountry },
    ];

  // Destination cities based on selected destination country
  const currentDestinationCities =
    DESTINATION_CITIES[toCountry] || ['Major International Hub', 'Capital City', 'Doorstep Address'];

  return (
    <div id="quote-calculator" className="w-full">
      {/* Calculator Main Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100/80 overflow-hidden">
        {/* Quick Route Tabs */}
        <div className="bg-slate-50 border-b border-gray-200/90 px-3 pt-2 flex items-center gap-1 overflow-x-auto scrollbar-none">
          {QUICK_ROUTES.map((route) => {
            const isActive = activeRouteTab === route.id;
            return (
              <button
                key={route.id}
                type="button"
                onClick={() => handleSelectRouteTab(route)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-t-lg transition-all whitespace-nowrap flex items-center gap-1 ${
                  isActive
                    ? 'bg-white text-primary border-t-2 border-primary shadow-sm font-bold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                }`}
              >
                <span>{route.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body - Tidy, compact padding */}
        <div className="p-3.5 sm:p-4 lg:p-4">
          <form onSubmit={handleSubmit} className="space-y-2.5">
            {/* Row 1: Origin & Destination (Two Columns on Desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {/* Origin */}
              <div>
                <Label htmlFor={fromCountryId} className="text-[11px] font-bold uppercase tracking-wider text-gray-700 block mb-1">
                  From (Origin)
                </Label>
                <div className="grid grid-cols-2 gap-1.5">
                  <select
                    id={fromCountryId}
                    value={fromCountry}
                    onChange={(e) => {
                      const newOrigin = e.target.value;
                      setFromCountry(newOrigin);
                      const locs = ORIGIN_LOCATIONS[newOrigin as keyof typeof ORIGIN_LOCATIONS];
                      if (locs && locs.length > 0) setFromCity(locs[0].name);
                      if (newOrigin === toCountry) {
                        setToCountry(newOrigin === 'Nigeria' ? 'United Kingdom' : 'Nigeria');
                      }
                    }}
                    className="h-9 px-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-xs font-semibold focus:ring-2 focus:ring-primary focus:border-primary truncate"
                  >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="United States">United States</option>
                  </select>

                  <select
                    id={fromCityId}
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="h-9 px-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-xs font-medium focus:ring-2 focus:ring-primary focus:border-primary truncate"
                  >
                    {currentHandoverLocations.map((loc) => (
                      <option key={loc.id} value={loc.name}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Destination */}
              <div>
                <Label htmlFor={toCountryId} className="text-[11px] font-bold uppercase tracking-wider text-gray-700 block mb-1">
                  To (Destination)
                </Label>
                <div className="grid grid-cols-2 gap-1.5">
                  <select
                    id={toCountryId}
                    value={toCountry}
                    onChange={(e) => {
                      const newDest = e.target.value;
                      setToCountry(newDest);
                      const cities = DESTINATION_CITIES[newDest] || ['Main City'];
                      setToCity(cities[0]);
                      if (newDest === fromCountry) {
                        setFromCountry(newDest === 'Nigeria' ? 'United Kingdom' : 'Nigeria');
                      }
                    }}
                    className="h-9 px-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-xs font-semibold focus:ring-2 focus:ring-primary focus:border-primary truncate"
                  >
                    {allCountries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  <select
                    id={toCityId}
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    className="h-9 px-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-xs font-medium focus:ring-2 focus:ring-primary focus:border-primary truncate"
                  >
                    {currentDestinationCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Row 2: Weight, Category, Handover Method, Calculate Button (Four Columns on Desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 items-end">
              {/* Weight */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label htmlFor={weightInputId} className="text-[11px] font-bold uppercase tracking-wider text-gray-700">
                    Weight (kg)
                  </Label>
                </div>
                <div className="relative flex items-center">
                  <Input
                    id={weightInputId}
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g. 10"
                    className="h-9 pr-10 text-xs font-bold text-gray-900 rounded-lg bg-gray-50 border-gray-300"
                    required
                  />
                  <span className="absolute right-2.5 text-[11px] font-bold text-gray-500 pointer-events-none">
                    KG
                  </span>
                </div>
              </div>

              {/* Package Category */}
              <div>
                <Label htmlFor={categoryId} className="text-[11px] font-bold uppercase tracking-wider text-gray-700 block mb-1">
                  Package Category
                </Label>
                <select
                  id={categoryId}
                  value={packageCategory}
                  onChange={(e) => setPackageCategory(e.target.value)}
                  className="w-full h-9 px-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-xs font-medium focus:ring-2 focus:ring-primary truncate"
                >
                  <option value="general">General Goods / Personal</option>
                  <option value="foodstuff">African Foodstuffs & Spices</option>
                  <option value="fashion">Fashion & Textiles</option>
                  <option value="documents">Urgent Documents</option>
                  <option value="commercial">Commercial Samples</option>
                  <option value="electronics">Electronics & Gadgets</option>
                </select>
              </div>

              {/* Handover Collection vs Dropoff */}
              <div>
                <Label className="text-[11px] font-bold uppercase tracking-wider text-gray-700 block mb-1">
                  Handover Method
                </Label>
                <div className="grid grid-cols-2 gap-1 h-9 bg-gray-100 p-0.5 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setCollectionType('dropoff')}
                    className={`text-[11px] font-bold rounded-md transition-all ${
                      collectionType === 'dropoff'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Depot Drop-Off
                  </button>
                  <button
                    type="button"
                    onClick={() => setCollectionType('collection')}
                    className={`text-[11px] font-bold rounded-md transition-all ${
                      collectionType === 'collection'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Doorstep Pickup
                  </button>
                </div>
              </div>

              {/* Calculate Quotes Button */}
              <div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-9 bg-[#0A2A5E] hover:bg-blue-900 text-white font-bold text-xs rounded-lg shadow transition-all flex items-center justify-center gap-1.5"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Calculating...</span>
                    </>
                  ) : (
                    <>
                      <span>Calculate Quotes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Subline: Volumetric Dimensions & Description */}
            <div className="pt-0.5 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowDimensions(!showDimensions)}
                  className="text-[11px] text-primary hover:text-blue-700 font-semibold inline-flex items-center gap-1"
                >
                  <Box className="w-3 h-3" />
                  <span>{showDimensions ? 'Hide Dimensions' : '+ Add Box Dimensions for Volumetric Check'}</span>
                </button>
                {volumetricWeight > 0 && (
                  <span className="text-[11px] text-amber-700 font-semibold">
                    Vol: {volumetricWeight} kg &bull; Billable: {effectiveChargeableWeight} kg
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 flex-1 max-w-[240px] ml-auto">
                <span className="text-[10.5px] text-gray-400 whitespace-nowrap">Item:</span>
                <input
                  type="text"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  placeholder="e.g. Clothes, foods, books"
                  className="h-6 px-2 text-[11px] bg-gray-50 border border-gray-200 rounded text-gray-800 w-full focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Expandable Dimensions */}
            {showDimensions && (
              <div className="p-2 rounded-lg bg-blue-50/70 border border-blue-100 grid grid-cols-3 gap-2 animate-in fade-in duration-150">
                <div>
                  <Label className="text-[10px] font-bold text-gray-600">Length (cm)</Label>
                  <Input
                    type="number"
                    min="1"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="cm"
                    className="h-7 text-xs bg-white mt-0.5"
                  />
                </div>
                <div>
                  <Label className="text-[10px] font-bold text-gray-600">Width (cm)</Label>
                  <Input
                    type="number"
                    min="1"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="cm"
                    className="h-7 text-xs bg-white mt-0.5"
                  />
                </div>
                <div>
                  <Label className="text-[10px] font-bold text-gray-600">Height (cm)</Label>
                  <Input
                    type="number"
                    min="1"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="cm"
                    className="h-7 text-xs bg-white mt-0.5"
                  />
                </div>
              </div>
            )}
          </form>

          {/* Error Message Notice */}
          {errorMessage && (
            <div className="mt-2 p-2 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <p className="font-semibold">{errorMessage}</p>
            </div>
          )}

          {/* QUOTATION RESULTS: COMPARISON CARDS IN ONE HORIZONTAL ROW */}
          {quoteResult && quoteResult.services.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-gray-100 animate-in fade-in duration-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                  <span>Available Shipping Services</span>
                  <span className="text-gray-400 font-normal">|</span>
                  <span className="text-primary font-bold">{quoteResult.fromCountry} → {quoteResult.toCountry}</span>
                </h3>
                <span className="text-[11px] text-gray-500 font-medium">
                  Billable Weight: <strong className="text-gray-900">{quoteResult.chargeableWeight} kg</strong>
                </span>
              </div>

              {/* Service Comparison Cards Grid: Exactly 1 horizontal row on desktop */}
              <div
                className={`grid gap-2.5 sm:gap-3 ${
                  quoteResult.services.length === 3
                    ? 'grid-cols-1 md:grid-cols-3'
                    : quoteResult.services.length === 2
                    ? 'grid-cols-1 md:grid-cols-2'
                    : 'grid-cols-1 max-w-sm mx-auto'
                }`}
              >
                {quoteResult.services.map((service) => {
                  const isSpecial = service.id === 'special_express';
                  const isExpress = service.id === 'express';
                  const isValue = service.id === 'value';

                  return (
                    <div
                      key={service.id}
                      className={`rounded-xl p-3 sm:p-3.5 flex flex-col justify-between transition-all relative h-full ${
                        isSpecial
                          ? 'bg-gradient-to-b from-blue-950 via-slate-900 to-blue-900 text-white shadow-md border-2 border-amber-400'
                          : isExpress
                          ? 'bg-white border-2 border-primary/50 shadow-sm text-gray-900'
                          : 'bg-gray-50 border border-gray-200/90 text-gray-900 hover:border-gray-300'
                      }`}
                    >
                      {/* Top Badge */}
                      {service.badge && (
                        <div
                          className={`absolute -top-2.5 right-3 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm ${
                            service.badge === 'Fastest'
                              ? 'bg-amber-400 text-gray-950'
                              : 'bg-emerald-600 text-white'
                          }`}
                        >
                          {service.badge}
                        </div>
                      )}

                      <div>
                        {/* Title */}
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <h4 className={`text-sm sm:text-base font-black leading-tight ${isSpecial ? 'text-white' : 'text-gray-900'}`}>
                            {service.name}
                          </h4>
                        </div>

                        {/* Delivery Time Badge */}
                        <div className="mb-2">
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${
                              isSpecial
                                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                                : isExpress
                                ? 'bg-blue-100 text-primary'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            <Clock className="w-3 h-3" />
                            <span>{service.estimatedDeliveryTime}</span>
                          </span>
                        </div>

                        {/* Price Display */}
                        <div className="my-1.5 pb-2 border-b border-gray-200/30">
                          <div
                            className={`text-2xl sm:text-[26px] font-black tracking-tight leading-none ${
                              isSpecial ? 'text-amber-400' : 'text-[#EA580C]'
                            }`}
                          >
                            {service.formattedTotal}
                          </div>
                          {service.convertedEstimate && (
                            <div className={`text-[11px] mt-0.5 font-semibold ${isSpecial ? 'text-blue-200' : 'text-gray-600'}`}>
                              {service.convertedEstimate}
                            </div>
                          )}
                          <div className={`text-[10px] mt-0.5 ${isSpecial ? 'text-gray-300' : 'text-gray-500'}`}>
                            Rate: <strong>{service.ratePerKgDisplay}</strong>
                            {service.handlingFee > 0 && ` + Fee: £${service.handlingFee}`}
                          </div>
                        </div>

                        {/* Key Features Bullet List */}
                        <ul className="space-y-1 mb-2.5 text-[11px]">
                          <li className="flex items-center gap-1.5">
                            <CheckCircle2 className={`w-3 h-3 shrink-0 ${isSpecial ? 'text-amber-400' : 'text-emerald-600'}`} />
                            <span className={isSpecial ? 'text-gray-200' : 'text-gray-700'}>
                              {isSpecial ? '48-hour scheduled direct flight' : isExpress ? '3 to 5 working days delivery' : '5 to 10 working days transit'}
                            </span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <CheckCircle2 className={`w-3 h-3 shrink-0 ${isSpecial ? 'text-amber-400' : 'text-emerald-600'}`} />
                            <span className={isSpecial ? 'text-gray-200' : 'text-gray-700'}>
                              {isSpecial ? 'Special UK ↔ NG priority lane' : isExpress ? 'DHL priority global network' : 'Consolidated air cargo'}
                            </span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <CheckCircle2 className={`w-3 h-3 shrink-0 ${isSpecial ? 'text-amber-400' : 'text-emerald-600'}`} />
                            <span className={isSpecial ? 'text-gray-200' : 'text-gray-700'}>
                              Full tracking &amp; doorstep delivery
                            </span>
                          </li>
                        </ul>

                        {/* Special Express Operational Terms */}
                        {isSpecial && service.termsAndConditions && (
                          <div className="p-1.5 mb-2 rounded bg-amber-500/10 border border-amber-400/20 text-amber-200 text-[10px] leading-tight">
                            <span className="font-bold text-amber-300">Note: </span>
                            48-hr countdown begins upon flight departure. Excludes weekends &amp; customs holds.
                          </div>
                        )}
                      </div>

                      {/* Action Booking Buttons */}
                      <div className="space-y-1.5 pt-1">
                        <Button
                          asChild
                          className={`w-full h-8 font-bold text-xs rounded-lg shadow-sm transition-all ${
                            isSpecial
                              ? 'bg-amber-400 hover:bg-amber-500 text-gray-950 font-black'
                              : isExpress
                              ? 'bg-primary hover:bg-blue-800 text-white'
                              : 'bg-[#0A2A5E] hover:bg-black text-white'
                          }`}
                        >
                          <a href={service.bookingUrl} target="_blank" rel="noopener noreferrer">
                            <span>Book Online</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </a>
                        </Button>

                        <a
                          href={service.whatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center w-full text-[11px] font-semibold py-1 rounded-lg transition-colors ${
                            isSpecial
                              ? 'bg-white/10 hover:bg-white/20 text-emerald-300'
                              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          <MessageCircle className="w-3 h-3 mr-1 text-emerald-600" />
                          <span>WhatsApp Quote</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Disclaimer */}
              <p className="text-center text-[10px] text-gray-400 mt-2 italic">
                *Final cost calculated upon warehouse check-in &amp; physical weigh-in.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
