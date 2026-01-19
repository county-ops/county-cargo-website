'use client';

import { useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const terms = [
    { title: '1. General Disclaimer', content: <p>All information on the County Cargo website is for general informational purposes only. It does not constitute professional, legal, or financial advice. County Cargo and affiliates disclaim all liability for any loss, damage, or expense arising from reliance on website content.</p> },
    { title: '2. About County Cargo', content: <p>County Cargo is a company registered in England and Wales, providing international freight, shipping, and logistics services, including air freight, sea freight, and cargo delivery worldwide.</p> },
    { title: '3. Website Access', content: <p>Website access is temporary. County Cargo reserves the right to amend, suspend, or discontinue the website or services at any time without notice.</p> },
    { title: '4. Payment and Delivery Policies', content: <ul><li>Payments must be made in full before cargo is released.</li><li>Storage fees may apply if cargo is stored beyond the agreed period.</li><li>Uncollected items may be sold or disposed of to recover charges.</li></ul> },
    { title: '5. Packaging Requirements', content: <p>Customers are responsible for properly packing all cargo. County Cargo is not liable for damage caused by inadequate packaging. Professional packing is available by arrangement.</p> },
    { title: '6. Shipping from Overseas', content: <p>Customers shipping to our UK terminal must provide valid identification such as a passport and proof of address. Failure to provide required documents may result in cargo refusal.</p> },
    { title: '7. Prohibited and Restricted Items', content: <ul><li>Firearms, weapons, ammunition</li><li>Illegal drugs/substances</li><li>Counterfeit currency or documents</li><li>Expired medicines, hazardous materials</li><li>Perishable goods without arrangement</li></ul> },
    { title: '8. Fragile & High-Value Items', content: <p>Fragile and high-value items must be securely packed. County Cargo is not liable unless additional insurance is purchased.</p> },
    { title: '9. Service Availability', content: <p>Services may vary depending on destination, customs, and regulations. County Cargo is not liable for service disruptions caused by authorities.</p> },
    { title: '10. Pickup and Collection', content: <p>Payments must be through authorized channels. Customers are responsible for loading cargo unless prior arrangements are made.</p> },
    { title: '11. Liability and Insurance', content: <p>County Cargo’s liability per shipment is limited unless additional insurance is purchased. Items like jewelry, musical instruments, and fragile goods may be excluded unless insured.</p> },
    { title: '12. Vehicle Shipping', content: <p>Vehicles must be clean, free of fluids, and roadworthy. County Cargo is not responsible for internal contents or mechanical issues unless additional services are arranged.</p> },
    { title: '13. Delivery Times', content: <p>Delivery times are estimates and may be affected by weather, customs, or logistics delays. Guarantees are subject to these variables.</p> },
    { title: '14. Customs, Duties & Taxes', content: <p>Customers are responsible for all customs duties, taxes, and fees. County Cargo does not cover these charges.</p> },
    { title: '15. Intellectual Property', content: <p>All content on the County Cargo website is owned or licensed by us. Unauthorized use is prohibited.</p> },
    { title: '16. External Links', content: <p>County Cargo is not responsible for third-party websites. Linking does not imply endorsement.</p> },
    { title: '17. Governing Law', content: <p>These terms are governed by the laws of England and Wales. Disputes fall under the exclusive jurisdiction of its courts.</p> },
    { title: '18. Changes to Terms', content: <p>County Cargo reserves the right to update these Terms at any time. Updates are effective upon posting.</p> },
];

const privacy = [
    { title: '1. Information We Collect', content: <ul><li>Personal information: Name, email, phone, address, company details</li><li>Shipping information: Origin, destination, package contents, instructions</li><li>Payment information</li><li>Technical info: IP, browser, OS, browsing behavior</li></ul> },
    { title: '2. How We Use Your Information', content: <ul><li>Process shipments and track deliveries</li><li>Customer support and communication</li><li>Secure payment processing</li><li>Compliance with legal obligations</li><li>Service improvement and analytics</li></ul> },
    { title: '3. How We Share Your Information', content: <div><ul><li>Service providers: shipping partners, payment processors, IT vendors</li><li>Legal compliance</li><li>Business transactions: mergers, acquisitions</li><li>Protection of rights</li></ul><p>We do not sell or rent personal information.</p></div> },
    { title: '4. Data Security', content: <p>We implement encryption, access control, and secure storage. No method of internet transmission is 100% secure.</p> },
    { title: '5. Data Retention', content: <p>We retain personal data only as long as necessary to fulfill services and legal obligations.</p> },
    { title: '6. Your Rights', content: <ul><li>Access and correction</li><li>Deletion (with exceptions)</li><li>Opt-out of marketing</li><li>Data portability and restriction of processing</li></ul> },
    { title: '7. Cookies and Tracking', content: <p>We use cookies and similar technologies to enhance website experience. Some features may not function without them.</p> },
    { title: '8. International Data Transfers', content: <p>Your information may be transferred to countries with different privacy laws. County Cargo ensures appropriate safeguards.</p> },
    { title: '9. Changes to Privacy Policy', content: <p>We may update this Privacy Policy. Updates are posted here with the updated "Last Updated" date.</p> },
    { title: '10. Contact Information', content: <address className="not-italic">County Cargo<br />Asset Corp Plaza, C90, 21 Obafemi Awolowo Way, Ikeja, Lagos<br />Email: info@countycargo.com<br />Phone: +2348110000421, +2348110000423</address> },
];

export default function LegalPage() {
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

    const searchInput = document.getElementById('faq-search') as HTMLInputElement;
    const faqItems = document.querySelectorAll('.faq-item');

    // Store original content to prevent losing HTML tags during search highlighting
    faqItems.forEach(item => {
        const questionEl = item.querySelector('h3');
        const answerEl = item.querySelector('.faq-answer');
        if (questionEl && !(questionEl as HTMLElement).dataset.originalHtml) {
            (questionEl as HTMLElement).dataset.originalHtml = questionEl.innerHTML;
        }
        if (answerEl && !(answerEl as HTMLElement).dataset.originalHtml) {
            (answerEl as HTMLElement).dataset.originalHtml = answerEl.innerHTML;
        }
    });

    const handleSearch = () => {
      const query = searchInput.value.toLowerCase();
      faqItems.forEach(item => {
        const questionEl = item.querySelector('h3');
        const answerEl = item.querySelector('.faq-answer');

        if (questionEl && answerEl) {
          const originalQuestion = (questionEl as HTMLElement).dataset.originalHtml || '';
          const originalAnswer = (answerEl as HTMLElement).dataset.originalHtml || '';
          
          questionEl.innerHTML = originalQuestion;
          answerEl.innerHTML = originalAnswer;

          const questionText = questionEl.innerText.toLowerCase();
          const answerText = answerEl.innerText.toLowerCase();

          const isMatch = questionText.includes(query) || answerText.includes(query);
          (item as HTMLElement).style.display = isMatch ? '' : 'none';

          if (isMatch && query) {
            const regex = new RegExp(`(${query})`, 'gi');
            questionEl.innerHTML = originalQuestion.replace(regex, '<mark>$1</mark>');
            answerEl.innerHTML = originalAnswer.replace(regex, '<mark>$1</mark>');
          }
        }
      });
    };

    searchInput?.addEventListener('input', handleSearch);

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

    return () => {
      toggles.forEach(toggle => toggle.removeEventListener('click', toggleHandler));
      searchInput?.removeEventListener('input', handleSearch);
      window.removeEventListener('scroll', handleScroll);
      if(backToTopButton) {
        backToTopButton.removeEventListener('click', scrollToTop);
      }
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
              "@id": "https://countycargo.com/legal"
            }
          })
        }}
      />
      <Header />
      <main className="pt-20 faq-page">
        <div className="faq-container">
          <h1>County Cargo – Terms & Conditions & Privacy Policy</h1>
          <input type="text" id="faq-search" placeholder="Search terms in Terms & Privacy Policy..." />
          
          <h2>Terms & Conditions</h2>
          {terms.map((item, index) => (
            <div className="faq-item" key={`term-${index}`}>
              <h3 className="faq-toggle">{item.title}</h3>
              <div className="faq-answer">{item.content}</div>
            </div>
          ))}

          <h2 className="mt-12">Privacy Policy</h2>
          {privacy.map((item, index) => (
            <div className="faq-item" key={`privacy-${index}`}>
              <h3 className="faq-toggle">{item.title}</h3>
              <div className="faq-answer">{item.content}</div>
            </div>
          ))}

          <div id="backToTop">↑ Top</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
