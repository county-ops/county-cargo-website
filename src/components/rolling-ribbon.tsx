'use client';

const ribbonItems = [
    '🚀 Express shipments from UK to Nigeria now available! 1-2 Business Days Delivery.',
    '📦 Ship your foodstuff to the UK, US and Canada with ease.',
    '✈️ Weekly Air Freight departures from UK to Lagos.',
    '💰 Best rates guaranteed.',
    '✈️ Weekly Air Freight departures from UK to Abuja.',
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
