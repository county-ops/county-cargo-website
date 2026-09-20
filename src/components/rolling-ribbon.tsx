'use client';

const ribbonItems = [
    '🚀 Express UK to Nigeria: 3–5 Working Days Delivery!',
    '📦 Ship Foodstuff Worldwide: UK, US & Canada with Ease.',
    '✈️ Weekly Air Freight to Lagos & Abuja.',
    '💰 Best Rates Guaranteed for All Shipments.',
    '✅ Your Trusted Partner for Secure & Reliable Cargo.',
];

// Duplicate items for a seamless loop
const duplicatedItems = [...ribbonItems, ...ribbonItems, ...ribbonItems, ...ribbonItems, ...ribbonItems];


export function RollingRibbon() {
    return (
        <div className="ticker-wrap">
            <div className="ticker">
                {duplicatedItems.map((item, index) => (
                     <div key={index} className="ticker-item">{item}</div>
                ))}
            </div>
        </div>
    );
}
