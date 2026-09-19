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
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-md">
        {/* Quick Route Tabs */}
        <div className="bg-slate-50 border-b border-gray-200/80 px-3 pt-3 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {QUICK_ROUTES.map((route) => {
            const isActive = activeRouteTab === route.id;
            return (
              <button
                key={route.id}
                type="button"
                onClick={() => handleSelectRouteTab(route)}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
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

        {/* Form Body */}
        <div className="p-5 sm:p-7 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Route Row: Origin & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Origin */}
              <div className="space-y-1.5">
                <Label htmlFor={fromCountryId} className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  From (Origin)
                </Label>
                <div className="grid grid-cols-2 gap-2">
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
                    className="h-11 px-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="United States">United States</option>
                  </select>

                  <select
                    id={fromCityId}
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="h-11 px-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary truncate"
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
              <div className="space-y-1.5">
                <Label htmlFor={toCountryId} className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  To (Destination)
                </Label>
                <div className="grid grid-cols-2 gap-2">
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
                    className="h-11 px-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-primary focus:border-primary"
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
                    className="h-11 px-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary truncate"
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

            {/* Weight, Category & Dimensions Row */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-end">
              {/* Weight */}
              <div className="sm:col-span-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor={weightInputId} className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Weight (kg)
                  </Label>
                  <span className="text-[11px] text-gray-500 font-medium">Actual weight</span>
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
                    className="h-11 pr-12 text-sm sm:text-base font-bold text-gray-900 rounded-xl bg-gray-50 border-gray-300"
                    required
                  />
                  <span className="absolute right-3 text-xs font-bold text-gray-500 pointer-events-none">
                    KG
                  </span>
                </div>
              </div>

              {/* Package Category */}
              <div className="sm:col-span-4 space-y-1.5">
                <Label htmlFor={categoryId} className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Package Category
                </Label>
                <select
                  id={categoryId}
                  value={packageCategory}
                  onChange={(e) => setPackageCategory(e.target.value)}
                  className="w-full h-11 px-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-primary"
                >
                  <option value="general">General Goods / Personal Luggage</option>
                  <option value="foodstuff">African Foodstuffs & Spices</option>
                  <option value="fashion">African Fashion & Textiles</option>
                  <option value="documents">Urgent Business / Legal Documents</option>
                  <option value="commercial">Commercial Samples & Trade Goods</option>
                  <option value="electronics">Electronics & Gadgets</option>
                </select>
              </div>

              {/* Handover Collection vs Dropoff */}
              <div className="sm:col-span-4 space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Handover Method
                </Label>
                <div className="grid grid-cols-2 gap-1.5 h-11 bg-gray-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setCollectionType('dropoff')}
                    className={`text-xs font-bold rounded-lg transition-all ${
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
                    className={`text-xs font-bold rounded-lg transition-all ${
                      collectionType === 'collection'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Doorstep Pickup
                  </button>
                </div>
              </div>
            </div>

            {/* Optional Dimensions Toggle & Description */}
            <div className="pt-1">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowDimensions(!showDimensions)}
                  className="text-xs text-primary hover:text-blue-700 font-semibold inline-flex items-center gap-1"
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>{showDimensions ? 'Hide Dimensions (L×W×H)' : '+ Add Box Dimensions for Volumetric Check'}</span>
                </button>
                {volumetricWeight > 0 && (
                  <span className="text-xs text-amber-700 font-medium">
                    Volumetric: <strong>{volumetricWeight} kg</strong> &bull; Billable: <strong>{effectiveChargeableWeight} kg</strong>
                  </span>
                )}
              </div>

              {showDimensions && (
                <div className="mt-3 p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 grid grid-cols-3 gap-3 animate-in fade-in duration-200">
                  <div>
                    <Label className="text-[11px] font-bold text-gray-600">Length (cm)</Label>
                    <Input
                      type="number"
                      min="1"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="cm"
                      className="h-9 text-xs bg-white mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-[11px] font-bold text-gray-600">Width (cm)</Label>
                    <Input
                      type="number"
                      min="1"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="cm"
                      className="h-9 text-xs bg-white mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-[11px] font-bold text-gray-600">Height (cm)</Label>
                    <Input
                      type="number"
                      min="1"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="cm"
                      className="h-9 text-xs bg-white mt-1"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Item Description Input (Optional) */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-600">
                Item Description <span className="text-gray-400 font-normal">(Optional)</span>
              </Label>
              <Input
                type="text"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                placeholder="e.g. African fabrics, dried foods, books, personal clothing, cosmetics"
                className="h-10 text-xs sm:text-sm bg-gray-50 border-gray-300 rounded-xl"
              />
            </div>

            {/* Submit Calculate Action Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#0A2A5E] hover:bg-blue-900 text-white font-extrabold text-base rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Calculating Central Rates...</span>
                </>
              ) : (
                <>
                  <span>Calculate All Available Quotes</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Error Message Notice */}
          {errorMessage && (
            <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Quotation Alert</p>
                <p className="mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* QUOTATION RESULTS: COMPARISON CARDS ON SAME PAGE */}
          {quoteResult && quoteResult.services.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-5">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-gray-900">
                    Available Shipping Services ({quoteResult.fromCountry} → {quoteResult.toCountry})
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Entered: {quoteResult.enteredWeight} kg &bull; Chargeable Billable: {quoteResult.chargeableWeight} kg
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-primary rounded-full w-fit">
                  {quoteResult.services.length} Service{quoteResult.services.length > 1 ? 's' : ''} Configured
                </span>
              </div>

              {/* Service Comparison Cards Grid: Desktop side-by-side, mobile stacked */}
              <div
                className={`grid gap-5 ${
                  quoteResult.services.length === 3
                    ? 'grid-cols-1 lg:grid-cols-3'
                    : quoteResult.services.length === 2
                    ? 'grid-cols-1 lg:grid-cols-2'
                    : 'grid-cols-1 max-w-lg mx-auto'
                }`}
              >
                {quoteResult.services.map((service) => {
                  const isSpecial = service.id === 'special_express';
                  const isExpress = service.id === 'express';
                  const isValue = service.id === 'value';

                  return (
                    <div
                      key={service.id}
                      className={`rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all relative ${
                        isSpecial
                          ? 'bg-gradient-to-b from-blue-950 via-slate-900 to-blue-900 text-white shadow-xl border-2 border-amber-400'
                          : isExpress
                          ? 'bg-white border-2 border-primary/60 shadow-lg text-gray-900'
                          : 'bg-gray-50/80 border border-gray-200 shadow-sm text-gray-900 hover:border-gray-300'
                      }`}
                    >
                      {/* Top Badge */}
                      {service.badge && (
                        <div
                          className={`absolute -top-3 right-5 text-[11px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md ${
                            service.badge === 'Fastest'
                              ? 'bg-amber-400 text-gray-950'
                              : 'bg-emerald-600 text-white'
                          }`}
                        >
                          {service.badge}
                        </div>
                      )}

                      <div>
                        {/* Service Title & Tagline */}
                        <div className="mb-3">
                          <h4 className={`text-lg sm:text-xl font-black ${isSpecial ? 'text-white' : 'text-gray-900'}`}>
                            {service.name}
                          </h4>
                          <p className={`text-xs mt-1 leading-snug ${isSpecial ? 'text-blue-200' : 'text-gray-600'}`}>
                            {service.tagline}
                          </p>
                        </div>

                        {/* Price Display */}
                        <div className="my-4 pb-4 border-b border-gray-200/20">
                          <div
                            className={`text-3xl sm:text-4xl font-black tracking-tight ${
                              isSpecial ? 'text-amber-400' : 'text-[#EA580C]'
                            }`}
                          >
                            {service.formattedTotal}
                          </div>
                          {service.convertedEstimate && (
                            <div className={`text-xs mt-1 font-semibold ${isSpecial ? 'text-blue-200' : 'text-gray-500'}`}>
                              {service.convertedEstimate}
                            </div>
                          )}
                          <div className={`text-[11px] mt-1 ${isSpecial ? 'text-gray-300' : 'text-gray-500'}`}>
                            Rate: <strong>{service.ratePerKgDisplay}</strong>
                            {service.handlingFee > 0 && ` + Handling: £${service.handlingFee}`}
                            {service.collectionFee > 0 && ` + Collection: £${service.collectionFee}`}
                          </div>
                        </div>

                        {/* Key Specifications Table */}
                        <div className="space-y-2 mb-5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className={isSpecial ? 'text-gray-300' : 'text-gray-500'}>Delivery Time:</span>
                            <span className={`font-bold ${isSpecial ? 'text-white' : 'text-gray-900'}`}>
                              {service.estimatedDeliveryTime}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className={isSpecial ? 'text-gray-300' : 'text-gray-500'}>Chargeable Weight:</span>
                            <span className={`font-bold ${isSpecial ? 'text-white' : 'text-gray-900'}`}>
                              {service.chargeableWeight} kg (Min: {service.minimumWeight} kg)
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className={isSpecial ? 'text-gray-300' : 'text-gray-500'}>Tracking:</span>
                            <span className="font-bold text-emerald-500 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Full Online Live Tracking
                            </span>
                          </div>

                          <div className={`p-2.5 rounded-lg mt-3 ${isSpecial ? 'bg-white/10 text-blue-100' : 'bg-gray-100 text-gray-700'}`}>
                            <p className="font-semibold text-[11px] mb-0.5">Customs & Delivery:</p>
                            <p className="text-[11px] leading-tight">{service.customsInformation}</p>
                          </div>

                          {/* 48-Hour Special Conditions Note */}
                          {isSpecial && service.termsAndConditions && (
                            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-400/30 text-amber-200 text-[10.5px] leading-tight space-y-1">
                              <p className="font-bold text-amber-300">Operational Conditions:</p>
                              <p>{service.termsAndConditions}</p>
                              <p className="text-amber-100">{service.exclusions}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Booking Buttons */}
                      <div className="space-y-2 pt-2">
                        <Button
                          asChild
                          className={`w-full h-11 font-bold text-sm rounded-xl shadow-md transition-all ${
                            isSpecial
                              ? 'bg-amber-400 hover:bg-amber-500 text-gray-950 font-black'
                              : isExpress
                              ? 'bg-primary hover:bg-blue-800 text-white'
                              : 'bg-gray-900 hover:bg-black text-white'
                          }`}
                        >
                          <a href={service.bookingUrl} target="_blank" rel="noopener noreferrer">
                            Book This Service &rarr;
                          </a>
                        </Button>

                        <a
                          href={service.whatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center w-full text-xs font-semibold py-1 gap-1 transition-colors ${
                            isSpecial ? 'text-blue-300 hover:text-white' : 'text-emerald-700 hover:text-emerald-800'
                          }`}
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Book via WhatsApp Specialist</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Central Disclaimer Footnote */}
              <p className="text-center text-xs text-muted-foreground mt-6 italic">
                *Notice: The final shipping charge may adjust after your consignment has been physically weighed, measured, and inspected at the origin warehouse.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
