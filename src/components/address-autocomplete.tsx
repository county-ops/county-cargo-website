
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { suggestAddresses, AddressSuggestion } from '@/ai/flows/suggest-addresses-flow';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce'; 

export type AddressObject = {
  description: string;
  countryCode?: string;
};

interface AddressAutocompleteProps {
  onAddressSelect: (address: AddressObject) => void;
  country?: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
}

export function AddressAutocomplete({
  onAddressSelect,
  country,
  placeholder,
  defaultValue = '',
  disabled = false,
}: AddressAutocompleteProps) {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedSearchTerm = useDebounce(inputValue, 400);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Ref to track if the input change was from a user typing vs. a programmatic change
  const isUserInput = useRef(false); 
  // Ref to track if the value was set by selecting a suggestion
  const isSuggestionSelected = useRef(false);

  // When the external defaultValue changes (like on form reset), update the internal state
  useEffect(() => {
    if (defaultValue !== inputValue) {
        setInputValue(defaultValue);
        isUserInput.current = false; // This change is not from the user typing
        isSuggestionSelected.current = true; // Treat it like a selection to prevent fetching
    }
  }, [defaultValue, inputValue]);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    const result = await suggestAddresses({ query, country });
    setIsLoading(false);
    if (result.suggestions) {
      setSuggestions(result.suggestions);
      if(result.suggestions.length > 0) {
        setShowSuggestions(true);
      }
    } else {
      console.error(result.error);
      setSuggestions([]);
    }
  }, [country]);

  useEffect(() => {
    // Only fetch if the change was from user input and not a programmatic selection
    if (isUserInput.current && !isSuggestionSelected.current && debouncedSearchTerm) {
        fetchSuggestions(debouncedSearchTerm);
    }
    // After the effect runs, reset the suggestion flag so the next debounced term can be fetched
    isSuggestionSelected.current = false;
  }, [debouncedSearchTerm, fetchSuggestions]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    isUserInput.current = true; // This is a user typing
    isSuggestionSelected.current = false; // Reset selection flag
    onAddressSelect({ description: value, countryCode: undefined });
  };
  
  const handleSelect = (suggestion: AddressSuggestion) => {
    const displayValue = suggestion.description;

    isSuggestionSelected.current = true; // Flag that this change is from a suggestion
    isUserInput.current = false; // Not a direct typing change
    setInputValue(displayValue);
    setSuggestions([]);
    setShowSuggestions(false);
    onAddressSelect(suggestion);
  };

  const handleBlur = () => {
    // Give time for the click event on a suggestion to process
    setTimeout(() => {
      setShowSuggestions(false);
    }, 150);
  }

  const getDisplaySuggestion = (suggestion: AddressSuggestion) => {
      return suggestion.description;
  }

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <Input
        type="text"
        placeholder={placeholder || 'Start typing an address'}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => {
          if (suggestions.length > 0) setShowSuggestions(true);
        }}
        onBlur={handleBlur}
        autoComplete="off"
        disabled={disabled}
      />
      {isLoading && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      )}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg">
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-muted"
                onMouseDown={() => handleSelect(suggestion)} // use onMouseDown to fire before onBlur
              >
                {getDisplaySuggestion(suggestion)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
