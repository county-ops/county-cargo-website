'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { electronicsPrices, nigerianShippingRates } from '@/lib/pricing-data';

export function DeliveryCalculator() {
  const [selectedState, setSelectedState] = useState('');
  const [weight, setWeight] = useState(1);
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);

  const handleCalculate = () => {
    if (!selectedState || !weight || weight <= 0) {
      alert("Please select a state and enter a valid weight.");
      return;
    }

    const stateData = nigerianShippingRates.find(p => p.destination === selectedState);
    if (!stateData) {
      alert("Invalid state selected.");
      return;
    }
    const extraPerKg = stateData.doorToDoor;

    let resultText = "";
    electronicsPrices.forEach(item => {
      const basePrice = item.price;
      const total = basePrice + (extraPerKg * weight);
      resultText += `${item.item}: £${total.toFixed(2)}\n`;
    });
    setDeliveryResult(resultText);
  };

  return (
    <>
      <h3 className="text-xl font-semibold text-secondary mt-8 mb-4">Calculate Final Delivery Cost to Your Destination</h3>
      <p className="text-lg text-gray-800 mb-4">Enter your Nigerian state and package weight to see total cost including delivery from Lagos office:</p>
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-gray-50 p-4 rounded-lg">
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full sm:w-1/3 p-2 border rounded-md"
        >
          <option value="">Select State</option>
          {nigerianShippingRates.map(p => (
            <option key={p.destination} value={p.destination}>
              {p.destination}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <Label htmlFor="package-weight">Package weight (kg):</Label>
          <Input
            id="package-weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            min="1"
            className="w-24"
          />
        </div>
        <Button onClick={handleCalculate}>Calculate Total Cost (£)</Button>
      </div>
      {deliveryResult && (
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">Estimated Delivery Costs to {selectedState}:</h4>
          <pre className="text-sm whitespace-pre-wrap font-sans">{deliveryResult}</pre>
        </div>
      )}
    </>
  );
}
