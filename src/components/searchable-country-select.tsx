'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check, Globe } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

export const POPULAR_COUNTRIES = [
  'United Kingdom',
  'United States',
  'Australia',
  'Germany',
  'France',
  'Canada',
] as const;

interface SearchableCountrySelectProps {
  id?: string;
  value: string;
  onChange: (country: string) => void;
  countries: string[];
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export function SearchableCountrySelect({
  id,
  value,
  onChange,
  countries,
  placeholder = 'Select country',
  className = '',
  size = 'md',
  disabled = false,
}: SearchableCountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when popover opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [open]);

  // Separate popular countries and all remaining countries (preventing any duplicate)
  const { popularList, remainingList } = useMemo(() => {
    const popularSet = new Set(POPULAR_COUNTRIES as unknown as string[]);

    // 1. Popular countries in strict specified order
    const popular = POPULAR_COUNTRIES.filter((c) =>
      countries.length === 0 || countries.some((item) => item.toLowerCase() === c.toLowerCase())
    );

    // 2. Remaining supported countries in alphabetical order, excluding popular ones
    const remaining = countries
      .filter((c) => !popularSet.has(c))
      .sort((a, b) => a.localeCompare(b));

    return {
      popularList: popular,
      remainingList: remaining,
    };
  }, [countries]);

  // Filter based on search query
  const query = searchQuery.trim().toLowerCase();

  const filteredPopular = useMemo(() => {
    if (!query) return popularList;
    return popularList.filter((c) => c.toLowerCase().includes(query));
  }, [popularList, query]);

  const filteredRemaining = useMemo(() => {
    if (!query) return remainingList;
    return remainingList.filter((c) => c.toLowerCase().includes(query));
  }, [remainingList, query]);

  const handleSelect = (country: string) => {
    onChange(country);
    setOpen(false);
  };

  const hasMatches = filteredPopular.length > 0 || filteredRemaining.length > 0;

  const heightClasses =
    size === 'sm' ? 'h-9 text-xs px-2.5' : size === 'lg' ? 'h-12 text-sm px-3.5' : 'h-10 text-xs px-3';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <button
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-label={placeholder}
          className={`w-full flex items-center justify-between rounded-lg border border-gray-300 bg-gray-50 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-left truncate ${heightClasses} ${className} ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100/80'
          }`}
        >
          <span className="truncate flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-gray-500 shrink-0" />
            <span className="truncate">{value || placeholder}</span>
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500 shrink-0 ml-1 opacity-70" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={4}
        className="w-[280px] sm:w-[320px] p-0 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden text-gray-900"
      >
        {/* Search Input Box */}
        <div className="p-2 border-b border-gray-100 bg-gray-50/80 sticky top-0 z-10 flex items-center gap-2">
          <Search className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
          <Input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type country name..."
            className="h-8 text-xs bg-white border-gray-200 focus-visible:ring-primary"
          />
        </div>

        {/* Scrollable Country List */}
        <div className="max-h-64 sm:max-h-72 overflow-y-auto p-1 text-xs">
          {!hasMatches ? (
            <div className="p-4 text-center text-xs text-gray-500">
              No matching country found for &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            <>
              {/* 1. POPULAR COUNTRIES SECTION */}
              {filteredPopular.length > 0 && (
                <div className="mb-1">
                  <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-gray-500 flex items-center justify-between">
                    <span>Popular Countries</span>
                    <span className="text-[9px] font-normal text-gray-400">Top Routes</span>
                  </div>
                  <div className="space-y-0.5">
                    {filteredPopular.map((country, index) => {
                      const isSelected = value.toLowerCase() === country.toLowerCase();
                      return (
                        <button
                          key={`popular-${country}`}
                          type="button"
                          onClick={() => handleSelect(country)}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors font-medium ${
                            isSelected
                              ? 'bg-primary text-white font-bold'
                              : 'hover:bg-gray-100 text-gray-800'
                          }`}
                        >
                          <span className="flex items-center gap-2 truncate">
                            <span className="w-4 text-[10px] font-bold text-gray-400">{index + 1}.</span>
                            <span className="truncate">{country}</span>
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CLEAR DIVIDER */}
              {filteredPopular.length > 0 && filteredRemaining.length > 0 && (
                <div className="my-1.5 border-t border-gray-200 flex items-center justify-center relative">
                  <span className="bg-white px-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest absolute">
                    All Countries
                  </span>
                </div>
              )}

              {/* 2. ALL REMAINING COUNTRIES IN ALPHABETICAL ORDER */}
              {filteredRemaining.length > 0 && (
                <div className="mt-2 space-y-0.5">
                  {filteredPopular.length === 0 && (
                    <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-gray-500">
                      Remaining Countries
                    </div>
                  )}
                  {filteredRemaining.map((country) => {
                    const isSelected = value.toLowerCase() === country.toLowerCase();
                    return (
                      <button
                        key={`all-${country}`}
                        type="button"
                        onClick={() => handleSelect(country)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors font-medium ${
                          isSelected
                            ? 'bg-primary text-white font-bold'
                            : 'hover:bg-gray-100 text-gray-800'
                        }`}
                      >
                        <span className="truncate pl-6">{country}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
