
'use client';

import { useEffect, useRef, useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


const terms = [
    { title: '1. General Disclaimer', content: <p>All information on the County Cargo website is for general informational purposes only. It does not constitute professional, legal, or financial advice. County Cargo and affiliates disclaim all liability for any loss, damage, or expense arising from reliance on website content.</p> },
    { title: '2. About County Cargo', content: <p>County Cargo is a company registered in England and Wales, providing international freight, shipping, and logistics services, including air freight, sea freight, and cargo delivery worldwide.</p> },
    { title: '3. Payment & Delivery Policies', content: <p>Payments must be made in full before cargo is released. Storage fees may apply for uncollected cargo. Minimum weight requirements apply per shipment.</p> },
    { title: '4. Packaging & Shipping', content: <p>Customers must properly pack cargo. Fragile items and high-value goods require secure packaging and additional insurance if desired.</p> },
];

const privacy = [
    { title: '1. Information We Collect', content: <ul><li>Personal information: Name, email, phone, address, company details</li><li>Shipping information: Origin, destination, package contents, instructions</li><li>Payment information</li><li>Technical info: IP, browser, OS, browsing behavior</li></ul> },
    { title: '2. How We Use Your Information', content: <ul><li>Process shipments and track deliveries</li><li>Customer support and communication</li><li>Secure payment processing</li><li>Compliance with legal obligations</li><li>Service improvement and analytics</li></ul> },
    { title: '3. Sharing & Security', content: <div><ul><li>Service providers: shipping partners, payment processors, IT vendors</li><li>Legal compliance</li><li>Business transactions: mergers, acquisitions</li><li>Protection of rights</li></ul><p>We do not sell or rent personal information.</p></div> },
    { title: '4. Your Rights', content: <ul><li>Access and correction</li><li>Deletion (with exceptions)</li><li>Opt-out of marketing</li><li>Data portability and restriction of processing</li></ul> },
    { title: '5. Contact', content: <address className="not-italic">County Cargo<br />Asset Corp Plaza, C90, 21 Obafemi Awolowo Way, Ikeja, Lagos<br />Email: info@countycargo.com<br />Phone: +2348110000421, +2348110000423</address> },
];

const prices = [
    { destination: 'Abia', doorToDoor: '6.20', collection: '6.20', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Adamawa', doorToDoor: '7.00', collection: '7.00', minWeight: '30', avgDelivery: '5-10' },
    { destination: 'Akwa Ibom', doorToDoor: '6.20', collection: '6.20', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Anambra', doorToDoor: '6.20', collection: '6.20', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Bauchi', doorToDoor: '7.00', collection: '7.00', minWeight: '30', avgDelivery: '5-10' },
    { destination: 'Bayelsa', doorToDoor: '7.00', collection: '7.00', minWeight: '30', avgDelivery: '5-10' },
    { destination: 'Benue', doorToDoor: '6.20', collection: '6.20', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Borno', doorToDoor: '7.50', collection: '7.50', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Cross River', doorToDoor: '6.20', collection: '6.20', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Delta', doorToDoor: '6.20', collection: '6.20', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Ebonyi', doorToDoor: '6.20', collection: '6.20', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Edo', doorToDoor: '6.20', collection: '6.20', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Ekiti', doorToDoor: '5.50', collection: '5.50', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Enugu', doorToDoor: '6.20', collection: '6.20', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Gombe', doorToDoor: '7.50', collection: '7.50', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Imo', doorToDoor: '6.20', collection: '6.20', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Jigawa', doorToDoor: '7.50', collection: '7.50', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Kaduna', doorToDoor: '6.20', collection: '6.20', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Kano', doorToDoor: '6.50', collection: '6.50', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Katsina', doorToDoor: '6.50', collection: '6.50', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Kebbi', doorToDoor: '7.00', collection: '7.00', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Kogi', doorToDoor: '6.20', collection: '6.20', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Kwara', doorToDoor: '6.20', collection: '6.20', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Lagos', doorToDoor: '5.20', collection: '5.20', minWeight: '10', avgDelivery: '5-10' },
    { destination: 'Nassarawa', doorToDoor: '7.00', collection: '7.00', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Niger', doorToDoor: '6.20', collection: '6.20', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Ogun', doorToDoor: '5.50', collection: '5.50', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Ondo', doorToDoor: '5.50', collection: '5.50', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Osun', doorToDoor: '5.50', collection: '5.50', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Oyo', doorToDoor: '5.50', collection: '5.50', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Plateau', doorToDoor: '6.50', collection: '6.50', minWeight: '30', avgDelivery: '5-10' },
    { destination: 'Rivers', doorToDoor: '6.20', collection: '6.20', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Sokoto', doorToDoor: '7.50', collection: '7.50', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Taraba', doorToDoor: '7.50', collection: '7.50', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Yobe', doorToDoor: '7.50', collection: '7.50', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Zamfara', doorToDoor: '7.50', collection: '7.50', minWeight: '20', avgDelivery: '5-10' },
    { destination: 'Federal Capital Territory (Abuja)', doorToDoor: '6.20', collection: '6.20', minWeight: '20', avgDelivery: '5-10' },
];

const electronicsPrices = [
    { item: '19″ TV', price: '120' },
    { item: '24″ TV', price: '160' },
    { item: '32″ TV', price: '180' },
    { item: '37″ TV', price: '200' },
    { item: '40″ TV', price: '230' },
    { item: '42″ TV', price: '260' },
    { item: '46″ TV', price: '300' },
    { item: '50″ TV', price: '350' },
    { item: '55″ TV', price: '400' },
    { item: '65″ TV', price: '450' },
    { item: '75″ TV', price: '550' },
    { item: 'Laptop (15–17″)', price: '100' },
    { item: 'Computer / Desktop', price: '150' },
    { item: 'Mobile Phone (per unit)', price: '30' },
    { item: 'iPad / Tablet', price: '60' },
];

export default function InfoPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedState, setSelectedState] = useState('');
    const [weight, setWeight] = useState(1);
    const [deliveryResult, setDeliveryResult] = useState<string | null>(null);

    const handleCalculate = () => {
        if (!selectedState || !weight || weight <= 0) {
            alert("Please select a state and enter a valid weight.");
            return;
        }

        const stateData = prices.find(p => p.destination === selectedState);
        if (!stateData) {
            alert("Invalid state selected.");
            return;
        }
        const extraPerKg = parseFloat(stateData.doorToDoor);

        let resultText = "";
        electronicsPrices.forEach(item => {
            const basePrice = parseFloat(item.price);
            const total = basePrice + (extraPerKg * weight);
            resultText += `${item.item}: £${total.toFixed(2)}\n`;
        });
        setDeliveryResult(resultText);
    };

  useEffect(() => {
    const toggles = document.querySelectorAll('.faq-toggle');
    const toggleHandler = (event: Event) => {
      const toggle = event.currentTarget as HTMLElement;
      toggle.classList.toggle('active');
      const answer = toggle.nextElementSibling as HTMLElement;
      if (answer.style.maxHeight) {
        answer.style.maxHeight = '';
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    };
    toggles.forEach(toggle => toggle.addEventListener('click', toggleHandler));

    const backToTopButton = document.getElementById('backToTop');
    const handleScroll = () => {
      if (backToTopButton) {
        backToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
      }
    };
    window.addEventListener('scroll', handleScroll);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if(backToTopButton) {
        backToTopButton.addEventListener('click', scrollToTop);
    }
    
    const searchInput = document.getElementById('search-bar') as HTMLInputElement;

    const handleSearch = () => {
        const query = searchInput.value.toLowerCase().trim();
        const terms = query.split(/\s+/).filter(Boolean);

        // FAQ Items
        document.querySelectorAll('.faq-item').forEach(item => {
            const questionEl = item.querySelector('h3');
            const answerEl = item.querySelector('.faq-answer');
            if (!questionEl || !answerEl) return;

            const originalQuestion = (questionEl as HTMLElement).dataset.originalHtml || questionEl.innerHTML;
            const originalAnswer = (answerEl as HTMLElement).dataset.originalHtml || answerEl.innerHTML;
            (questionEl as HTMLElement).dataset.originalHtml = originalQuestion;
            (answerEl as HTMLElement).dataset.originalHtml = originalAnswer;

            questionEl.innerHTML = originalQuestion;
            answerEl.innerHTML = originalAnswer;
            
            if (!query) {
                (item as HTMLElement).style.display = '';
                return;
            }

            const text = (questionEl.innerText + ' ' + answerEl.innerText).toLowerCase();
            const isMatch = terms.some(term => text.includes(term));

            if (isMatch) {
                (item as HTMLElement).style.display = '';
                terms.forEach(term => {
                    const regex = new RegExp(`(${term})`, 'gi');
                    questionEl.innerHTML = questionEl.innerHTML.replace(regex, '<mark>$1</mark>');
                    answerEl.innerHTML = answerEl.innerHTML.replace(regex, '<mark>$1</mark>');
                });
            } else {
                (item as HTMLElement).style.display = 'none';
            }
        });

        // Table Rows
        document.querySelectorAll('#price-table tbody tr, #electronics-price-table tbody tr').forEach(row => {
            const rowText = (row as HTMLElement).innerText.toLowerCase();
            
            row.querySelectorAll('td').forEach(td => {
                if (!(td as HTMLElement).dataset.originalHtml) {
                    (td as HTMLElement).dataset.originalHtml = td.innerHTML;
                }
                td.innerHTML = (td as HTMLElement).dataset.originalHtml || '';
            });

            if (!query) {
                (row as HTMLElement).style.display = '';
                return;
            }

            const isMatch = terms.some(term => rowText.includes(term));
            
            if (isMatch) {
                 (row as HTMLElement).style.display = '';
                terms.forEach(term => {
                    const regex = new RegExp(`(${term})`, 'gi');
                    row.querySelectorAll('td').forEach(td => {
                        td.innerHTML = td.innerHTML.replace(regex, '<mark>$1</mark>');
                    });
                });
            } else {
                 (row as HTMLElement).style.display = 'none';
            }
        });

    };

    searchInput?.addEventListener('input', handleSearch);


    return () => {
      toggles.forEach(toggle => toggle.removeEventListener('click', toggleHandler));
      window.removeEventListener('scroll', handleScroll);
      if(backToTopButton) {
        backToTopButton.removeEventListener('click', scrollToTop);
      }
      searchInput?.removeEventListener('input', handleSearch);
    };
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            "name": "County Cargo",
            "url": "https://countycargo.com",
            "areaServed": "Worldwide",
            "legalName": "County Cargo",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+2348110000421",
              "email": "info@countycargo.com",
              "contactType": "customer service"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://countycargo.com/info"
            }
          })
        }}
      />
      <Header />
      <main className="info-page">
        <div className="info-container" ref={containerRef}>
          <h1>County Cargo – Info Page</h1>
          <input type="text" id="search-bar" placeholder="Search terms across Terms, Privacy &amp; Price List..." />
          
          <h2 id="terms">Terms & Conditions</h2>
          {terms.map((item, index) => (
            <div className="faq-item" key={`term-${index}`}>
              <h3 className="faq-toggle">{item.title}</h3>
              <div className="faq-answer">{item.content}</div>
            </div>
          ))}

          <h2 id="privacy" className="mt-12">Privacy Policy</h2>
          {privacy.map((item, index) => (
            <div className="faq-item" key={`privacy-${index}`}>
              <h3 className="faq-toggle">{item.title}</h3>
              <div className="faq-answer">{item.content}</div>
            </div>
          ))}

          <h2 id="prices" className="mt-12">Shipping Price List – All Nigerian States</h2>
            <table id="price-table">
                <thead>
                    <tr>
                        <th>State / FCT</th>
                        <th>Door-to-Door (£/kg)</th>
                        <th>Collection (£/kg)</th>
                        <th>Min Weight (kg) for delivery</th>
                        <th>Avg Delivery (working day)</th>
                    </tr>
                </thead>
                <tbody>
                    {prices.map((price, index) => (
                        <tr key={index}>
                            <td>{price.destination}</td>
                            <td>{price.doorToDoor}</td>
                            <td>{price.collection}</td>
                            <td>{price.minWeight}</td>
                            <td>{price.avgDelivery}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 id="electronics" className="mt-12">Fixed‑Item Electronics Price List</h2>
            <p>Door-to-door fixed prices for common electronics and devices. <strong>Note:</strong> All electronics shipments are to our <u>Lagos office</u> only. Delivery to your final destination in Nigeria will incur additional charges.</p>
            <table id="electronics-price-table">
                <thead>
                    <tr>
                        <th>Item Description</th>
                        <th>Price (£)</th>
                    </tr>
                </thead>
                <tbody>
                    {electronicsPrices.map((item, index) => (
                        <tr key={`electronics-${index}`}>
                            <td>{item.item}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <h3 className="text-xl font-semibold text-secondary mt-8 mb-4">Calculate Final Delivery Cost to Your Destination</h3>
            <p className="text-lg text-gray-800 mb-4">Enter your Nigerian state and package weight to see total cost including delivery from Lagos office:</p>
            <div className="flex flex-col sm:flex-row gap-4 items-center bg-gray-50 p-4 rounded-lg">
                <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full sm:w-1/3 p-2 border rounded-md"
                >
                    <option value="">Select State</option>
                    {prices.map(p => <option key={p.destination} value={p.destination}>{p.destination}</option>)}
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


          <div id="backToTop">↑ Top</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
