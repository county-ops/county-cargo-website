
'use client';

import { useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function FaqPage() {

  useEffect(() => {
    // FAQ Toggle Logic
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
    toggles.forEach(toggle => {
      toggle.addEventListener('click', toggleHandler);
    });

    // FAQ Search Logic
    const searchInput = document.getElementById('faq-search') as HTMLInputElement;
    const faqItems = document.querySelectorAll('.faq-item');

    const handleSearch = () => {
      const query = searchInput.value.toLowerCase();
      faqItems.forEach(item => {
        const questionEl = item.querySelector('h3');
        const answerEl = item.querySelector('p');

        if (questionEl && answerEl) {
          // Reset highlighting
          questionEl.innerHTML = questionEl.innerText;
          answerEl.innerHTML = answerEl.innerText;
          
          const questionText = questionEl.innerText.toLowerCase();
          const answerText = answerEl.innerText.toLowerCase();

          const isMatch = questionText.includes(query) || answerText.includes(query);
          (item as HTMLElement).style.display = isMatch ? '' : 'none';

          if (isMatch && query) {
            const regex = new RegExp(`(${query})`, 'gi');
            questionEl.innerHTML = questionEl.innerText.replace(regex, '<mark>$1</mark>');
            answerEl.innerHTML = answerEl.innerText.replace(regex, '<mark>$1</mark>');
          }
        }
      });
    };

    searchInput?.addEventListener('input', handleSearch);

    // Back to Top button logic
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

    // Cleanup function
    return () => {
      toggles.forEach(toggle => {
        toggle.removeEventListener('click', toggleHandler);
      });
      searchInput?.removeEventListener('input', handleSearch);
      window.removeEventListener('scroll', handleScroll);
      if(backToTopButton) {
        backToTopButton.removeEventListener('click', scrollToTop);
      }
    };
  }, []);

  return (
    <>
      <Header />
      <main className="pt-20 faq-page">
        <div className="faq-container">
          <h1>County Cargo – Frequently Asked Questions</h1>
          <input type="text" id="faq-search" placeholder="Search for a question..." />

          <div className="faq-item"><h3 className="faq-toggle">What items are prohibited from shipping?</h3><p className="faq-answer">Prohibited items include hazardous materials, flammable liquids, explosives, illegal substances, and live animals. Please check our detailed guidelines for a complete list.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">How do I track my package?</h3><p className="faq-answer">Once your package is dispatched, you will receive a tracking number via email. You can use this number on our website's tracking page to monitor its journey in real-time.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">What are your shipping rates?</h3><p className="faq-answer">Our shipping rates vary based on the destination, package weight, and dimensions. You can get a quote by contacting our support team.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">Can I Send Food Produce with County Cargo?</h3><p className="faq-answer">Yes, County Cargo accepts non-perishable food items. Ensure all food products are safely and securely packaged. Fresh or frozen food is not accepted without prior approval. Always check import requirements for your destination country.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">Do You Only Ship Goods from the UK?</h3><p className="faq-answer">Yes. County Cargo operates exclusively from the United Kingdom to destinations worldwide.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">Do You Re-Pack My Cargo?</h3><p className="faq-answer">For boxed items, ensure cargo is properly packed. County Cargo can repack unboxed items for an additional fee.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">Can I Ship Furniture with County Cargo?</h3><p className="faq-answer">Yes. County Cargo accepts flat-packed furniture and boxed electrical items, provided they are properly packaged for transport.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">What Shipping Methods Are Available?</h3><p className="faq-answer">County Cargo offers Air Freight (fast delivery) and Sea Freight (affordable, slower delivery).</p></div>
          <div className="faq-item"><h3 className="faq-toggle">How Long Will Shipping Take?</h3><p className="faq-answer">Air Freight takes approximately 7–10 working days. Sea Freight takes approximately 5–6 weeks. Transit times may vary due to customs and destination processing.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">What Are the Weight and Size Limits for Cargo?</h3><p className="faq-answer">Air Freight: Minimum 10 kg to Lagos, 25 kg to other Nigerian destinations. Sea Freight: Minimum 50 kg for all Nigerian destinations.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">Can I Get a Quote Before Shipping?</h3><p className="faq-answer">Yes. Air freight quotes are available online instantly. Sea freight quotes are provided based on cargo size, weight, and destination.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">Will I Pay Customs Duty When Shipping to Nigeria?</h3><p className="faq-answer">Yes. Customs duties may apply depending on the type of goods. Personal effects and gifts are generally included in our quotes. High-value or commercial cargo may require extra documentation or fees.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">Are There Additional Charges?</h3><p className="faq-answer">Additional charges may include clearance fees, delivery fees within Nigeria, and destination handling fees, determined by local authorities.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">Are Packages Checked in the UK?</h3><p className="faq-answer">Yes. All packages are subject to security screening, including X-ray scans. Unauthorized items may be removed or destroyed.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">Can I Use My Own Boxes?</h3><p className="faq-answer">Yes. Boxes must be strong and secure. County Cargo also provides packaging materials upon request.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">Can I Send Excess Luggage?</h3><p className="faq-answer">Yes. Excess luggage can be shipped under the unboxed items category.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">Do I Need to Be Present on Collection Day?</h3><p className="faq-answer">No, but someone must be present to hand over the package to our driver. Missing the collection may result in additional fees.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">What Should I Do if My Cargo Is Damaged or Missing?</h3><p className="faq-answer">Check your shipment carefully before signing. Once accepted, County Cargo’s liability is limited. Report any damage or missing items immediately.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">Can I Ship Dangerous or Hazardous Goods?</h3><p className="faq-answer">Yes, but only with correct documentation and safety data sheets (MSDS). Contact our team for guidance.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">Can I Send Vehicle Parts by Air Freight?</h3><p className="faq-answer">Yes. Parts must be clean, drip-free, and not classified as dangerous goods. Some components may require an MSDS.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">What If I Am Shipping as a Business?</h3><p className="faq-answer">Commercial shipments follow different rules than personal shipments. Contact our team for custom business quotes.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">Can I Send Phones, Laptops & Gadgets?</h3><p className="faq-answer">Yes. Electronics including phones, laptops, tablets, and consoles are accepted. Discounts may apply for bulk shipments.</p></div>
          <div className="faq-item"><h3 className="faq-toggle">Which Ports in Nigeria Do You Ship To?</h3><p className="faq-answer">Primary sea freight destination is Tin Can Island Port, Apapa, Lagos, with service to many other Nigerian cities.</p></div>

          <div id="backToTop">↑ Top</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
