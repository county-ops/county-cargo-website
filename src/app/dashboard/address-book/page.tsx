
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Copy, MapPin } from "lucide-react";
import { useProfile } from "@/components/profile-provider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { trackMetaEvent } from "@/lib/meta-pixel";

export default function AddressBookPage() {
  const { profile } = useProfile();

  useEffect(() => {
    document.title = "Address Book | County Cargo";
    trackMetaEvent('ViewContent', { content_name: 'Address Book' });
  }, []);

  const userName = profile ? `${profile.firstname} ${profile.lastname}` : 'FirstName LastName';

  const usAddress = {
    line1: `${userName} (County Cargo)`,
    line2: '1234 N Belt Line Road',
    cityStateZip: 'lrving, Texas 75061',
    country: 'USA'
  };

  const ukAddress = {
    line1: `${userName}, Unit G6 (County Cargo)`,
    line2: '67-83 Queens Dock Commercial Centre',
    line3: 'Norfolk Street',
    cityPostcode: 'Liverpool, L1 0BG',
    country: 'United Kingdom'
  };
  
  const lagosAddress = {
    line1: "Suite F8, Magnet Shopping Plaza",
    line2: "525 Agege Motor Rd, Ladipo-Oshodi",
    cityStateZip: "Lagos 102214, Lagos",
  };

  const abujaAddress = {
    line1: "Shop HF426, Turai Yar'adua Block",
    line2: "Wuye Ultra Modern Market",
    line3: "697 Idris Gidado Street",
    cityStateZip: "Abuja-FCT",
  };

  const usAddressString = `${usAddress.line1}\n${usAddress.line2}\n${usAddress.cityStateZip}\n${usAddress.country}`;
  const ukAddressString = `${ukAddress.line1}\n${ukAddress.line2}\n${ukAddress.line3}\n${ukAddress.cityPostcode}\n${ukAddress.country}`;
  const lagosAddressString = `${lagosAddress.line1}\n${lagosAddress.line2}\n${lagosAddress.cityStateZip}`;
  const abujaAddressString = `${abujaAddress.line1}\n${abujaAddress.line2}\n${abujaAddress.line3}\n${abujaAddress.cityStateZip}`;


  const handleCopy = (textToCopy: string, addressType: string) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
        title: `${addressType} Address Copied!`,
      });
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-4 bg-blue-50/10 p-2 md:p-4 rounded-[2.5rem] border border-blue-200/50 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <h1 className="font-black text-2xl text-blue-950 tracking-tightest">Address Book</h1>
          <p className="text-blue-700/70 font-semibold text-[10px] uppercase tracking-wider">Official County Cargo Warehouse Addresses</p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* UK Address */}
        <div className="rounded-[2rem] border-2 border-blue-100 bg-white shadow-2xl shadow-blue-50/50 overflow-hidden flex flex-col hover:shadow-blue-100 transition-all duration-500 group">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 text-white relative">
            <h2 className="font-black text-lg flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              UK Warehouse
            </h2>
          </div>
          <div className="p-4 flex flex-col flex-1 bg-white">
            <div className="flex items-start justify-between gap-3 rounded-xl border border-blue-50 bg-blue-50/20 p-4">
               <div className="text-[11px] font-medium text-slate-700 space-y-1">
                <p className="font-black text-blue-950 text-sm leading-tight">{ukAddress.line1}</p>
                <p className="text-slate-600 font-bold leading-tight">{ukAddress.line2}</p>
                <p className="text-slate-600 font-bold leading-tight">{ukAddress.line3}</p>
                <p className="text-slate-600 font-black text-blue-600 uppercase tracking-tighter">{ukAddress.cityPostcode}</p>
                <div className="pt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black bg-blue-100 text-blue-800 uppercase tracking-widest shadow-sm">
                    {ukAddress.country}
                  </span>
                </div>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-10 w-10 flex-shrink-0 text-blue-600 hover:text-blue-700 hover:bg-white shadow-md border border-blue-50 rounded-xl transition-all active:scale-95 bg-white"
                      onClick={() => handleCopy(ukAddressString, 'UK')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="rounded-lg font-black bg-blue-950 border-0 px-3 py-1">
                    <p className="uppercase tracking-widest text-[9px]">Copy UK</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
             <div className="mt-4 flex items-start gap-2 bg-red-50/40 p-3 rounded-xl border border-red-100/50">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-1 shrink-0 animate-pulse"></div>
              <p className="text-[9px] leading-tight text-slate-700 font-semibold">
                <span className="font-black text-red-600 uppercase tracking-tighter mr-1">Mandatory:</span>
                Name + <code className="bg-red-600 px-1 rounded font-black text-white">(County Cargo)</code>
              </p>
            </div>
          </div>
        </div>

        {/* US Address */}
        <div className="rounded-[2rem] border-2 border-indigo-100 bg-white shadow-2xl shadow-indigo-50/50 overflow-hidden flex flex-col hover:shadow-indigo-100 transition-all duration-500 group">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-4 text-white relative">
            <h2 className="font-black text-lg flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              USA Warehouse
            </h2>
          </div>
          <div className="p-4 flex flex-col flex-1 bg-white">
            <div className="flex items-start justify-between gap-3 rounded-xl border border-indigo-50 bg-indigo-50/20 p-4">
               <div className="text-[11px] font-medium text-slate-700 space-y-1">
                <p className="font-black text-indigo-950 text-sm leading-tight">{usAddress.line1}</p>
                <p className="text-slate-600 font-bold leading-tight">{usAddress.line2}</p>
                <p className="text-slate-600 font-black text-indigo-600 uppercase tracking-tighter">{usAddress.cityStateZip}</p>
                <div className="pt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black bg-indigo-100 text-indigo-800 uppercase tracking-widest shadow-sm">
                    {usAddress.country}
                  </span>
                </div>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-10 w-10 flex-shrink-0 text-indigo-600 hover:text-indigo-700 hover:bg-white shadow-md border border-indigo-50 rounded-xl transition-all active:scale-95 bg-white"
                      onClick={() => handleCopy(usAddressString, 'US')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="rounded-lg font-black bg-indigo-950 border-0 px-3 py-1">
                    <p className="uppercase tracking-widest text-[9px]">Copy US</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="mt-4 flex items-start gap-2 bg-red-50/40 p-3 rounded-xl border border-red-100/50">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-1 shrink-0 animate-pulse"></div>
              <p className="text-[9px] leading-tight text-slate-700 font-semibold">
                <span className="font-black text-red-600 uppercase tracking-tighter mr-1">Mandatory:</span>
                Name + <code className="bg-red-600 px-1 rounded font-black text-white">(County Cargo)</code>
              </p>
            </div>
          </div>
        </div>

        {/* Lagos Address */}
        <div className="rounded-[2rem] border-2 border-emerald-100 bg-white shadow-2xl shadow-emerald-50/50 overflow-hidden flex flex-col hover:shadow-emerald-100 transition-all duration-500 group">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-4 text-white relative">
            <h2 className="font-black text-lg flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Lagos Hub
            </h2>
          </div>
          <div className="p-4 flex flex-col flex-1 bg-white">
            <div className="flex items-start justify-between gap-3 rounded-xl border border-emerald-50 bg-emerald-50/20 p-4">
               <div className="text-[11px] font-medium text-slate-700 space-y-1">
                <p className="font-black text-emerald-950 text-sm leading-tight">{lagosAddress.line1}</p>
                <p className="text-slate-600 font-bold leading-tight">{lagosAddress.line2}</p>
                <p className="text-slate-600 font-black text-emerald-600 uppercase tracking-tighter">{lagosAddress.cityStateZip}</p>
                <div className="pt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-100 text-emerald-800 uppercase tracking-widest shadow-sm">
                    LAGOS, NIGERIA
                  </span>
                </div>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-10 w-10 flex-shrink-0 text-emerald-600 hover:text-emerald-700 hover:bg-white shadow-md border border-emerald-50 rounded-xl transition-all active:scale-95 bg-white"
                      onClick={() => handleCopy(lagosAddressString, 'Lagos')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="rounded-lg font-black bg-emerald-950 border-0 px-3 py-1">
                    <p className="uppercase tracking-widest text-[9px]">Copy Lagos</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
             <div className="mt-4 flex items-center gap-2 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 shadow-inner">
                <MapPin className="h-3 w-3 text-emerald-700" />
                <span className="text-[9px] font-black text-emerald-800 uppercase tracking-widest">Export Drop-Off</span>
            </div>
          </div>
        </div>

        {/* Abuja Address */}
        <div className="rounded-[2rem] border-2 border-amber-100 bg-white shadow-2xl shadow-amber-50/50 overflow-hidden flex flex-col hover:shadow-amber-100 transition-all duration-500 group">
          <div className="bg-gradient-to-br from-amber-500 to-orange-700 p-4 text-white relative">
            <h2 className="font-black text-lg flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Abuja Hub
            </h2>
          </div>
          <div className="p-4 flex flex-col flex-1 bg-white">
            <div className="flex items-start justify-between gap-3 rounded-xl border border-amber-50 bg-amber-50/20 p-4">
               <div className="text-[11px] font-medium text-slate-700 space-y-1">
                <p className="font-black text-amber-950 text-sm leading-tight">{abujaAddress.line1}</p>
                <p className="text-slate-600 font-bold leading-tight">{abujaAddress.line2}</p>
                <p className="text-slate-600 font-bold leading-tight">{abujaAddress.line3}</p>
                <p className="text-slate-600 font-black text-amber-600 uppercase tracking-tighter">{abujaAddress.cityStateZip}</p>
                <div className="pt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-100 text-amber-800 uppercase tracking-widest shadow-sm">
                    ABUJA, NIGERIA
                  </span>
                </div>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-10 w-10 flex-shrink-0 text-amber-600 hover:text-amber-700 hover:bg-white shadow-md border border-amber-50 rounded-xl transition-all active:scale-95 bg-white"
                      onClick={() => handleCopy(abujaAddressString, 'Abuja')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="rounded-lg font-black bg-amber-950 border-0 px-3 py-1">
                    <p className="uppercase tracking-widest text-[9px]">Copy Abuja</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
             <div className="mt-4 flex items-center gap-2 bg-amber-50/50 p-3 rounded-xl border border-amber-100 shadow-inner">
                <MapPin className="h-3 w-3 text-amber-700" />
                <span className="text-[9px] font-black text-amber-800 uppercase tracking-widest">Export Drop-Off</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
