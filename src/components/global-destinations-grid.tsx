'use client';

import React from 'react';
import { Globe, ArrowRight } from 'lucide-react';

interface DestinationItem {
  name: string;
  queryName: string;
  flag: string;
  svgPath: string; // SVG path data representing country silhouette
  viewBox: string;
  hubNote: string;
}

// Clean SVG silhouettes approximating country outlines for visual clarity
const DESTINATIONS: DestinationItem[] = [
  {
    name: 'China',
    queryName: 'China',
    flag: '🇨🇳',
    viewBox: '0 0 100 70',
    svgPath: 'M 10,20 Q 30,10 50,15 T 80,18 Q 95,25 90,45 T 75,65 Q 50,68 35,55 T 15,50 Q 8,35 10,20 Z',
    hubNote: 'Guangzhou, Shenzhen, Beijing, Shanghai',
  },
  {
    name: 'Germany',
    queryName: 'Germany',
    flag: '🇩🇪',
    viewBox: '0 0 70 90',
    svgPath: 'M 25,10 Q 45,8 55,18 T 58,45 Q 65,65 50,82 T 25,85 Q 12,65 18,40 T 25,10 Z',
    hubNote: 'Frankfurt, Berlin, Hamburg, Munich',
  },
  {
    name: 'Dubai (UAE)',
    queryName: 'United Arab Emirates',
    flag: '🇦🇪',
    viewBox: '0 0 90 70',
    svgPath: 'M 15,35 Q 35,15 65,22 T 85,38 Q 80,55 55,58 T 25,50 Q 15,45 15,35 Z',
    hubNote: 'Dubai Airport Hub, Abu Dhabi, Sharjah',
  },
  {
    name: 'Canada',
    queryName: 'Canada',
    flag: '🇨🇦',
    viewBox: '0 0 100 80',
    svgPath: 'M 10,45 Q 25,15 60,12 T 92,25 Q 95,50 80,68 T 45,72 Q 20,70 10,45 Z',
    hubNote: 'Toronto, Calgary, Vancouver, Montreal',
  },
  {
    name: 'Australia',
    queryName: 'Australia',
    flag: '🇦🇺',
    viewBox: '0 0 90 75',
    svgPath: 'M 20,25 Q 45,18 70,22 T 85,45 Q 75,65 50,68 T 18,58 Q 12,40 20,25 Z',
    hubNote: 'Sydney, Melbourne, Brisbane, Perth',
  },
  {
    name: 'India',
    queryName: 'India',
    flag: '🇮🇳',
    viewBox: '0 0 70 90',
    svgPath: 'M 35,8 Q 55,20 52,38 T 62,55 Q 50,75 38,88 T 22,65 Q 15,45 25,25 T 35,8 Z',
    hubNote: 'Mumbai, New Delhi, Bangalore, Chennai',
  },
  {
    name: 'South Africa',
    queryName: 'South Africa',
    flag: '🇿🇦',
    viewBox: '0 0 85 70',
    svgPath: 'M 25,15 Q 55,10 75,25 T 78,50 Q 55,68 35,65 T 12,50 Q 15,30 25,15 Z',
    hubNote: 'Johannesburg, Cape Town, Durban, Pretoria',
  },
  {
    name: 'Italy',
    queryName: 'Italy',
    flag: '🇮🇹',
    viewBox: '0 0 70 95',
    svgPath: 'M 20,15 Q 45,12 55,22 T 48,45 Q 55,60 52,72 T 38,90 Q 28,80 32,65 T 28,35 Z',
    hubNote: 'Milan, Rome, Naples, Bologna',
  },
  {
    name: 'United States',
    queryName: 'United States',
    flag: '🇺🇸',
    viewBox: '0 0 100 70',
    svgPath: 'M 10,25 Q 40,15 80,18 T 95,35 Q 90,62 70,65 T 30,62 Q 10,55 10,25 Z',
    hubNote: 'Houston, Dallas, Atlanta, New York, Chicago',
  },
  {
    name: 'United Kingdom',
    queryName: 'United Kingdom',
    flag: '🇬🇧',
    viewBox: '0 0 70 95',
    svgPath: 'M 40,10 Q 55,15 48,32 T 58,55 Q 55,75 42,88 T 25,80 Q 28,50 35,30 T 40,10 Z',
    hubNote: 'London, Liverpool (L1 0BG), Manchester, Leeds',
  },
];

export function GlobalDestinationsGrid() {
  const handleCountryClick = (countryName: string) => {
    // Dispatch custom event to auto-fill the calculator
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('selectExportCountry', { detail: countryName });
      window.dispatchEvent(event);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50/60 via-slate-50/40 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-primary mb-4 shadow-sm">
            <Globe className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Unmatched Global Reach
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed">
            Our Express Export air cargo network covers over 230 countries and territories worldwide.
            We connect Nigerian businesses, cross-border traders, and diaspora families directly to international
            markets with priority flight dispatches and trusted doorstep delivery.
          </p>
        </div>

        {/* 8-10 Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.name}
              onClick={() => handleCountryClick(dest.queryName)}
              className="group relative bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer flex flex-col items-center justify-between overflow-hidden min-h-[190px] sm:min-h-[220px]"
            >
              {/* Top Name & Flag */}
              <div className="text-center z-10 w-full">
                <div className="text-2xl mb-1.5 transform group-hover:scale-110 transition-transform">
                  {dest.flag}
                </div>
                <h3 className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-primary transition-colors">
                  {dest.name}
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                  {dest.hubNote}
                </p>
              </div>

              {/* Country Silhouette SVG */}
              <div className="my-3 flex items-center justify-center w-full h-20 sm:h-24 z-0">
                <svg
                  viewBox={dest.viewBox}
                  className="w-full h-full max-h-20 text-gray-300 group-hover:text-blue-200 transition-colors duration-300 fill-current opacity-70 group-hover:opacity-100"
                >
                  <path d={dest.svgPath} />
                </svg>
              </div>

              {/* Bottom Quick Action */}
              <div className="z-10 mt-auto pt-2 w-full flex items-center justify-center">
                <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all inline-flex items-center gap-1 -translate-y-1 group-hover:translate-y-0">
                  <span>Get Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Global Hub Subtext */}
        <div className="mt-10 text-center">
          <p className="text-sm font-medium text-gray-500">
            Plus over <span className="font-bold text-gray-800">190 other countries</span> directly connected to our{' '}
            <span className="text-primary font-semibold">Lagos</span> and{' '}
            <span className="text-primary font-semibold">Abuja</span> export hubs.
          </p>
        </div>
      </div>
    </section>
  );
}
