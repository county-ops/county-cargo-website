'use client';

import { useState } from 'react';
import { Calculator, Truck, Plane, Ship, CheckCircle2, AlertCircle, ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ShippingCalculatorProps {
  defaultDestination?: 'Lagos' | 'Abuja' | 'Port Harcourt' | 'Other';
  defaultService?: 'standard_air' | 'express_air' | 'sea_cargo';
  title?: string;
  subtitle?: string;
}

export function ShippingCalculator({
  defaultDestination = 'Lagos',
  defaultService = 'standard_air',
  title = 'UK to Nigeria Shipping Cost Calculator',
  subtitle = 'Get an instant, transparent price estimate for your shipment with zero personal info required.'
}: ShippingCalculatorProps) {
  // Input states
  const [originType, setOriginType] = useState<'depot_london' | 'depot_liverpool' | 'doorstep_london' | 'doorstep_uk'>('depot_london');
  const [destination, setDestination] = useState<'Lagos' | 'Abuja' | 'Port Harcourt' | 'Ibadan' | 'Enugu' | 'Other'>(
    defaultDestination as any
  );
  const [deliveryMethod, setDeliveryMethod] = useState<'depot_pickup' | 'doorstep'>('depot_pickup');
  const [service, setService] = useState<'standard_air' | 'express_air' | 'sea_cargo'>(defaultService);
  
  // Dimensions & Weight
  const [weight, setWeight] = useState<number>(10);
  const [length, setLength] = useState<number>(40);
  const [width, setWidth] = useState<number>(30);
  const [height, setHeight] = useState<number>(30);
  const [barrelCount, setBarrelCount] = useState<number>(1);

  // Volumetric calculation: (L x W x H in cm) / 5000
  const volumetricWeight = (length > 0 && width > 0 && height > 0)
    ? Math.round(((length * width * height) / 5000) * 100) / 100
    : 0;
  const chargeableWeight = Math.max(weight || 0, volumetricWeight, 1);

  // Calculation Logic
  let ratePerKg = 6.0;
  let handlingFee = 15;
  let seaRate = 0;
  let collectionFee = 0;
  let deliveryFee = 0;
  const promoNotes: string[] = [];

  // Service base rates
  if (service === 'standard_air') {
    if (destination === 'Lagos') {
      ratePerKg = 6.0;
    } else if (destination === 'Abuja') {
      ratePerKg = 6.5;
    } else {
      ratePerKg = 7.5; // Other states connecting via Lagos
    }
  } else if (service === 'express_air') {
    ratePerKg = 22.0; // 48-hour express to Lagos/Abuja
    handlingFee = 20;
  } else if (service === 'sea_cargo') {
    // Standard jumbo barrel (£190 to Lagos, £220 to Abuja)
    seaRate = destination === 'Lagos' ? 190 * barrelCount : 220 * barrelCount;
    handlingFee = 0; // Included in flat barrel rate
  }

  // Collection Fee logic
  if (originType === 'depot_london' || originType === 'depot_liverpool') {
    collectionFee = 0;
  } else if (originType === 'doorstep_london') {
    if (service === 'standard_air' && chargeableWeight >= 30) {
      collectionFee = 0;
      promoNotes.push('Free London Doorstep Collection applied (Air cargo 30kg+)');
    } else {
      collectionFee = 20;
    }
  } else if (originType === 'doorstep_uk') {
    // Nationwide UK courier collection
    collectionFee = 25;
  }

  // Nigerian Delivery Fee logic
  if (deliveryMethod === 'depot_pickup') {
    deliveryFee = 0;
  } else {
    if (destination === 'Abuja' && chargeableWeight >= 10 && service === 'standard_air') {
      deliveryFee = 0;
      promoNotes.push('Free Abuja Doorstep Delivery applied (10kg+ promo currently active)');
    } else if (destination === 'Lagos') {
      deliveryFee = 15; // Mainland/Island standard doorstep delivery
    } else if (destination === 'Abuja') {
      deliveryFee = 20; // Under 10kg doorstep delivery
    } else {
      deliveryFee = 25; // Nationwide delivery outside Lagos/Abuja
    }
  }

  // Total calculation
  let totalEstimated = 0;
  if (service === 'sea_cargo') {
    totalEstimated = seaRate + collectionFee;
  } else {
    const freightSubtotal = chargeableWeight * ratePerKg;
    totalEstimated = freightSubtotal + handlingFee + collectionFee + deliveryFee;
  }

  // Pre-filled WhatsApp link
  const waText = encodeURIComponent(
    `Hello County Cargo, I calculated a quote on CountyCargo.com:\n` +
    `- Service: ${service.replace('_', ' ').toUpperCase()}\n` +
    `- Origin: ${originType.replace('_', ' ')}\n` +
    `- Destination: ${destination} (${deliveryMethod.replace('_', ' ')})\n` +
    `- Weight: ${weight}kg (Volumetric: ${volumetricWeight}kg -> Chargeable: ${chargeableWeight}kg)\n` +
    `- Estimated Total: £${totalEstimated.toFixed(2)}\n` +
    `Please assist me in booking this shipment.`
  );

  return (
    <div id="quote-calculator" className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden my-8">
      <div className="bg-gradient-to-r from-gray-900 via-primary to-gray-900 text-white p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-sm">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-full border border-yellow-400/20">
            Instant Rate Engine • Zero Sign-Up Required
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{title}</h2>
        <p className="text-gray-200 text-sm sm:text-base mt-1 max-w-2xl">{subtitle}</p>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Service Selection */}
          <div>
            <Label className="text-sm font-bold text-gray-800 block mb-2">1. Select Shipping Service</Label>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => setService('standard_air')}
                className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all ${
                  service === 'standard_air'
                    ? 'border-primary bg-primary/5 text-primary font-bold shadow-sm ring-1 ring-primary'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <Plane className="w-5 h-5 mb-1.5" />
                <span className="text-xs sm:text-sm font-semibold">Standard Air</span>
                <span className="text-[11px] text-gray-500 mt-0.5">£6.00–£6.50/kg</span>
              </button>

              <button
                type="button"
                onClick={() => setService('express_air')}
                className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all ${
                  service === 'express_air'
                    ? 'border-primary bg-primary/5 text-primary font-bold shadow-sm ring-1 ring-primary'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <Truck className="w-5 h-5 mb-1.5 text-amber-500" />
                <span className="text-xs sm:text-sm font-semibold">Special Express</span>
                <span className="text-[11px] text-gray-500 mt-0.5">48-Hr (£22/kg + £20)</span>
              </button>

              <button
                type="button"
                onClick={() => setService('sea_cargo')}
                className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all ${
                  service === 'sea_cargo'
                    ? 'border-primary bg-primary/5 text-primary font-bold shadow-sm ring-1 ring-primary'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <Ship className="w-5 h-5 mb-1.5 text-blue-600" />
                <span className="text-xs sm:text-sm font-semibold">Sea Cargo</span>
                <span className="text-[11px] text-gray-500 mt-0.5">Barrels & CBM</span>
              </button>
            </div>
          </div>

          {/* UK Origin & Collection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-bold text-gray-800 block mb-2">2. UK Drop-off or Pickup</Label>
              <select
                value={originType}
                onChange={(e) => setOriginType(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-sm font-medium focus:ring-2 focus:ring-primary focus:outline-none transition-colors"
              >
                <option value="depot_london">Drop off: London Charlton Depot (SE7 8NF) - Free</option>
                <option value="depot_liverpool">Drop off: Liverpool Depot (L1 0BG) - Free</option>
                <option value="doorstep_london">Doorstep Pickup: London & SE (Free on 30kg+)</option>
                <option value="doorstep_uk">Doorstep Pickup: Nationwide UK Courier (£25)</option>
              </select>
            </div>

            {/* Destination Hub */}
            <div>
              <Label className="text-sm font-bold text-gray-800 block mb-2">3. Destination in Nigeria</Label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-sm font-medium focus:ring-2 focus:ring-primary focus:outline-none transition-colors"
              >
                <option value="Lagos">Lagos (Airport Hub / Ladipo Oshodi) - £6.00/kg</option>
                <option value="Abuja">Abuja (Wuye Ultra Modern Market) - £6.50/kg</option>
                <option value="Port Harcourt">Port Harcourt (Via Lagos Transfer) - £7.50/kg</option>
                <option value="Ibadan">Ibadan (Via Lagos Transfer) - £7.50/kg</option>
                <option value="Enugu">Enugu (Via Lagos Transfer) - £7.50/kg</option>
                <option value="Other">Other States Nationwide - £7.50/kg</option>
              </select>
            </div>
          </div>

          {/* Destination Delivery Method */}
          {service !== 'sea_cargo' && (
            <div>
              <Label className="text-sm font-bold text-gray-800 block mb-2">4. Nigeria Handover Option</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('depot_pickup')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    deliveryMethod === 'depot_pickup'
                      ? 'border-primary bg-primary/5 text-primary font-bold shadow-sm ring-1 ring-primary'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-semibold block">Pickup at County Hub</span>
                  <span className="text-[11px] text-gray-500 block mt-0.5">
                    {destination === 'Lagos' ? 'Ladipo Oshodi Hub (Free)' : destination === 'Abuja' ? 'Wuye Market Hub (Free)' : 'Regional Hub (Free)'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('doorstep')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    deliveryMethod === 'doorstep'
                      ? 'border-primary bg-primary/5 text-primary font-bold shadow-sm ring-1 ring-primary'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-semibold block">Door-to-Door Delivery</span>
                  <span className="text-[11px] text-gray-500 block mt-0.5">
                    {destination === 'Abuja' ? 'Free on 10kg+ promo' : 'Direct home/office delivery'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Weight and Dimensions */}
          {service !== 'sea_cargo' ? (
            <div className="space-y-4 pt-2">
              <Label className="text-sm font-bold text-gray-800 block">5. Package Weight & Dimensions</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <span className="text-xs text-gray-500 block mb-1 font-medium">Actual Weight (kg)</span>
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={weight || ''}
                    onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                    className="font-semibold text-gray-800"
                  />
                </div>
                <div>
                  <span className="text-xs text-gray-500 block mb-1 font-medium">Length (cm)</span>
                  <Input
                    type="number"
                    min="1"
                    value={length || ''}
                    onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                    className="text-gray-800"
                  />
                </div>
                <div>
                  <span className="text-xs text-gray-500 block mb-1 font-medium">Width (cm)</span>
                  <Input
                    type="number"
                    min="1"
                    value={width || ''}
                    onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                    className="text-gray-800"
                  />
                </div>
                <div>
                  <span className="text-xs text-gray-500 block mb-1 font-medium">Height (cm)</span>
                  <Input
                    type="number"
                    min="1"
                    value={height || ''}
                    onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                    className="text-gray-800"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>Volumetric formula: <code>(L × W × H) / 5000</code>. Airlines bill by whichever is greater.</span>
              </p>
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              <Label className="text-sm font-bold text-gray-800 block">Number of Jumbo Shipping Barrels</Label>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  min="1"
                  max="50"
                  value={barrelCount}
                  onChange={(e) => setBarrelCount(parseInt(e.target.value) || 1)}
                  className="w-32 font-semibold text-gray-800 text-lg"
                />
                <span className="text-xs text-gray-500">
                  Standard 55-gallon jumbo heavy-duty drum. Includes port handling & clearance.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Cost Summary Card */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gray-50 p-6 sm:p-7 rounded-2xl border border-gray-200">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="text-xs uppercase tracking-wider font-bold text-gray-500">Estimated Total Cost</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                Customs Included
              </span>
            </div>

            <div className="my-5">
              <div className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight flex items-baseline gap-1">
                <span>£{totalEstimated.toFixed(2)}</span>
                <span className="text-sm font-normal text-gray-500">GBP</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {service === 'sea_cargo'
                  ? `Based on ${barrelCount} Jumbo Drum(s) to ${destination}`
                  : `Chargeable weight: ${chargeableWeight.toFixed(1)}kg (${weight}kg actual vs ${volumetricWeight.toFixed(1)}kg volume)`}
              </p>
            </div>

            {/* Breakdown Items */}
            <div className="space-y-2 text-xs text-gray-600 border-t border-gray-200 pt-4">
              {service !== 'sea_cargo' ? (
                <>
                  <div className="flex justify-between py-1">
                    <span>Air Freight Subtotal ({chargeableWeight.toFixed(1)}kg @ £{ratePerKg.toFixed(2)}/kg):</span>
                    <span className="font-semibold text-gray-900">£{(chargeableWeight * ratePerKg).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Export Customs & Documentation:</span>
                    <span className="font-semibold text-gray-900">£{handlingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>UK Collection:</span>
                    <span className="font-semibold text-gray-900">
                      {collectionFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `£${collectionFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Nigeria Handover / Doorstep:</span>
                    <span className="font-semibold text-gray-900">
                      {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `£${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between py-1">
                    <span>Sea Freight ({barrelCount} Drum{barrelCount > 1 ? 's' : ''}):</span>
                    <span className="font-semibold text-gray-900">£{seaRate.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>UK Collection:</span>
                    <span className="font-semibold text-gray-900">
                      {collectionFee === 0 ? <span className="text-emerald-600 font-bold">FREE (Drop-off)</span> : `£${collectionFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Port Clearance:</span>
                    <span className="text-emerald-600 font-bold">Included</span>
                  </div>
                </>
              )}
            </div>

            {/* Special Express 48-Hour Conditions Banner */}
            {service === 'express_air' && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1 text-xs text-amber-900">
                <p className="font-bold text-amber-800">Special Express 48-Hour Conditions:</p>
                <p>The 48-hour delivery countdown begins once the consignment has cleared export security scanning and departed on the scheduled direct flight from London.</p>
                <p className="text-[11px] text-amber-700 italic">Operational exclusions: Excludes weekends, bank holidays, and statutory customs clearance holds.</p>
              </div>
            )}

            {/* Active Promotions / Highlights */}
            {promoNotes.length > 0 && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                {promoNotes.map((note, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="mt-6 space-y-2.5">
            <a
              href={`https://ship.countycargo.com/login?redirect=/book-shipment&service=${service}&from=UK&to=${destination}&weight=${chargeableWeight}&price=${totalEstimated}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all text-sm"
            >
              <span>Book Online (Client Portal)</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={`https://wa.me/2348110000421?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm transition-all text-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Or Book via WhatsApp Specialist</span>
            </a>

            <div className="pt-2 text-center">
              <a
                href="/#quote-calculator"
                className="text-xs text-primary hover:underline font-semibold"
              >
                Need quotes for USA, Canada, or Worldwide Export? Use Central Calculator &rarr;
              </a>
            </div>

            <a
              href="https://ship.countycargo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-semibold py-2.5 px-4 rounded-xl transition-all text-xs"
            >
              <span>Track or Manage Shipment</span>
            </a>

            <p className="text-[11px] text-gray-400 text-center leading-normal pt-1">
              *Rate estimate based on current tariffs. Volumetric checks performed upon depot receipt. Standard air £15 handling applies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
