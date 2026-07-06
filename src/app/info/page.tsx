
'use client';

import { useEffect, useRef, useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { electronicsPrices, nigerianShippingRates } from '@/lib/pricing-data';


const terms = [
  {
    title: '1. Definitions',
    content: (
      <div>
        <p>For the purposes of these Terms and Conditions:</p>
        <p className="mt-2"><strong>1.1 “County Cargo”, “we”, “our” or “us”</strong> means County Cargo, its parent company, subsidiaries, affiliates, directors, employees, contractors, agents and authorised representatives.</p>
        <p className="mt-2"><strong>1.2 “Customer”, “Shipper”, “Sender”, “You” or “Your”</strong> means any individual or business that delivers goods to County Cargo, requests collection or shipment, books a shipment through any County Cargo platform or has any legal or beneficial interest in the goods.</p>
        <p className="mt-2"><strong>1.3 “Shipment”</strong> means one or more packages accepted by County Cargo under a single shipment reference, invoice, airway bill or booking.</p>
        <p className="mt-2"><strong>1.4 “Goods”</strong> includes parcels, cartons, pallets, documents, freight, cargo and any other item accepted by County Cargo.</p>
        <p className="mt-2"><strong>1.5 “Warehouse”</strong> includes any County Cargo warehouse, office, storage facility or any third-party warehouse used by County Cargo.</p>
        <p className="mt-2"><strong>1.6 “Charges”</strong> include shipping fees, handling fees, customs charges, duties, taxes, storage fees, administration charges, legal costs, recovery costs and all other amounts payable by the Customer.</p>
      </div>
    )
  },
  {
    title: '2. Acceptance of these Terms',
    content: (
      <div>
        <p><strong>2.1</strong> By delivering goods to County Cargo, requesting collection, booking a shipment, using the County Cargo website, mobile application or customer portal, or otherwise instructing County Cargo to provide services, you confirm that you have read, understood and accepted these Terms and Conditions.</p>
        <p className="mt-2"><strong>2.2</strong> These Terms constitute the entire agreement between the Customer and County Cargo unless otherwise agreed in writing by a Director of County Cargo.</p>
        <p className="mt-2"><strong>2.3</strong> County Cargo reserves the right to amend these Terms and Conditions at any time. The version published on the Company’s website at the date of booking shall apply.</p>
        <p className="mt-2"><strong>2.4</strong> No employee, representative or agent has authority to vary these Terms unless such variation is made in writing and signed by a Director of County Cargo.</p>
      </div>
    )
  },
  {
    title: '3. Customer Obligations',
    content: (
      <div>
        <p>The Customer warrants and agrees that:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>all information supplied is true and accurate;</li>
          <li>all goods are legally owned by the Customer or the Customer has authority to ship them;</li>
          <li>all customs declarations are complete and accurate;</li>
          <li>all goods are properly packed for international transportation;</li>
          <li>fragile items are clearly declared before acceptance;</li>
          <li>electrical goods have been tested and are in good working order before shipment;</li>
          <li>all prohibited or restricted items have been disclosed;</li>
          <li>all shipping charges will be paid when due.</li>
        </ul>
        <p className="mt-2">The Customer accepts full responsibility for any loss, damage, delay, customs penalties or additional costs resulting from inaccurate information or failure to comply with these obligations.</p>
      </div>
    )
  },
  {
    title: '4. Payment Terms',
    content: (
      <div>
        <p><strong>4.1</strong> All invoices issued by County Cargo become immediately due unless otherwise agreed in writing.</p>
        <p className="mt-2"><strong>4.2</strong> County Cargo reserves the right to refuse shipment, refuse delivery or withhold release of any goods until every outstanding balance has been paid in full.</p>
        <p className="mt-2"><strong>4.3</strong> Interest may be charged on overdue accounts at the maximum rate permitted by law.</p>
        <p className="mt-2"><strong>4.4</strong> The Customer shall reimburse County Cargo for all reasonable costs incurred in recovering overdue amounts, including:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>solicitor’s fees;</li>
          <li>debt collection agency fees;</li>
          <li>court fees;</li>
          <li>enforcement costs;</li>
          <li>tracing fees;</li>
          <li>administrative expenses;</li>
          <li>interest.</li>
        </ul>
      </div>
    )
  },
  {
    title: '5. County Cargo’s Lien',
    content: (
      <div>
        <p>Until every outstanding amount has been paid in full, County Cargo shall have a continuing contractual lien over every shipment belonging to the Customer.</p>
        <p className="mt-2">County Cargo may retain possession of any goods until payment has been received.</p>
        <p className="mt-2">The Customer agrees that County Cargo may exercise this right even where the outstanding debt relates to a different shipment.</p>
      </div>
    )
  },
  {
    title: '6. Storage Charges',
    content: (
      <div>
        <p>Where goods remain in any County Cargo warehouse after notification of arrival:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>storage charges begin immediately after any applicable free storage period;</li>
          <li>storage charges continue daily until collection;</li>
          <li>storage charges continue even where legal proceedings are ongoing;</li>
          <li>storage charges form part of the outstanding debt recoverable by County Cargo.</li>
        </ul>
        <p className="mt-2">Failure to collect goods does not suspend storage charges.</p>
      </div>
    )
  },
  {
    title: '7. Abandoned, Unpaid and Uncollected Goods',
    content: (
      <div>
        <p><strong>7.1</strong> All goods remain subject to County Cargo’s contractual lien until every outstanding charge has been paid in full.</p>
        <p className="mt-2"><strong>7.2</strong> Where any shipment remains unpaid or uncollected for more than 30 days after the Customer has been notified that the shipment is ready for collection or delivery, County Cargo reserves the right, subject to applicable law, to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>continue charging daily storage fees;</li>
          <li>refuse collection or delivery;</li>
          <li>transfer the goods to another storage facility;</li>
          <li>appoint debt recovery agents;</li>
          <li>commence legal proceedings;</li>
          <li>dispose of, auction or otherwise realise the goods to recover outstanding charges.</li>
        </ul>
        <p className="mt-2"><strong>7.3</strong> Any proceeds received from the disposal or sale of goods shall first be applied towards:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>shipping charges;</li>
          <li>storage fees;</li>
          <li>customs charges;</li>
          <li>handling charges;</li>
          <li>legal fees;</li>
          <li>debt recovery costs;</li>
          <li>administrative costs;</li>
          <li>any other outstanding sums due to County Cargo.</li>
        </ul>
        <p className="mt-2"><strong>7.4</strong> Where the proceeds of sale are insufficient to satisfy the outstanding debt, the Customer shall remain liable for the balance.</p>
        <p className="mt-2"><strong>7.5</strong> County Cargo accepts no responsibility for any reduction in value, deterioration or depreciation of goods during storage.</p>
      </div>
    )
  },
  {
    title: '8. Debt Recovery and Legal Costs',
    content: (
      <div>
        <p><strong>8.1</strong> Where payment is overdue, County Cargo may recover all outstanding amounts through any lawful means available.</p>
        <p className="mt-2"><strong>8.2</strong> The Customer agrees to indemnify County Cargo against all costs incurred in recovering any outstanding debt, including but not limited to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>solicitor’s fees;</li>
          <li>barristers’ fees;</li>
          <li>court fees;</li>
          <li>enforcement fees;</li>
          <li>debt collection charges;</li>
          <li>tracing agent fees;</li>
          <li>administrative costs;</li>
          <li>interest;</li>
          <li>enforcement officer fees;</li>
          <li>overseas recovery costs.</li>
        </ul>
        <p className="mt-2"><strong>8.3</strong> These costs shall become immediately payable by the Customer upon demand.</p>
      </div>
    )
  },
  {
    title: '9. Customs, Government Authorities and Regulatory Delays',
    content: (
      <div>
        <p><strong>9.1</strong> County Cargo acts solely as a freight forwarder and customs agent where authorised.</p>
        <p className="mt-2"><strong>9.2</strong> County Cargo shall not be liable for any delay, seizure, inspection, detention, confiscation, destruction or additional charges imposed by:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Customs Authorities;</li>
          <li>Border Force;</li>
          <li>HM Revenue & Customs;</li>
          <li>Nigeria Customs Service;</li>
          <li>airport authorities;</li>
          <li>port authorities;</li>
          <li>airlines;</li>
          <li>shipping lines;</li>
          <li>security agencies;</li>
          <li>police;</li>
          <li>government departments.</li>
        </ul>
        <p className="mt-2"><strong>9.3</strong> Any customs duties, taxes, penalties, fines, storage charges or inspection fees remain entirely the responsibility of the Customer.</p>
      </div>
    )
  },
  {
    title: '10. Insurance',
    content: (
      <div>
        <p><strong>10.1</strong> County Cargo does not automatically insure any shipment.</p>
        <p className="mt-2"><strong>10.2</strong> Customers are strongly advised to obtain adequate transit insurance before shipping valuable goods.</p>
        <p className="mt-2"><strong>10.3</strong> Where a Customer elects not to obtain insurance, all risks associated with loss, theft, misplacement, damage or deterioration shall remain solely with the Customer.</p>
        <p className="mt-2"><strong>10.4</strong> County Cargo shall not be responsible for uninsured losses except where liability cannot legally be excluded.</p>
      </div>
    )
  },
  {
    title: '11. Inspection of Goods',
    content: (
      <div>
        <p>County Cargo reserves the right, without prior notice, to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>open any package;</li>
          <li>inspect contents;</li>
          <li>photograph goods;</li>
          <li>verify descriptions;</li>
          <li>verify weights and dimensions;</li>
          <li>refuse shipment;</li>
          <li>report suspicious goods to law enforcement.</li>
        </ul>
        <p className="mt-2">Inspection does not create any duty upon County Cargo to discover defects or prohibited items.</p>
      </div>
    )
  },
  {
    title: '12. Prohibited and Restricted Goods',
    content: (
      <div>
        <p>County Cargo reserves the absolute right to refuse any shipment.</p>
        <p className="mt-2">Without limitation, prohibited items include:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>firearms;</li>
          <li>ammunition;</li>
          <li>explosives;</li>
          <li>narcotics;</li>
          <li>counterfeit goods;</li>
          <li>hazardous chemicals;</li>
          <li>dangerous goods;</li>
          <li>illegal wildlife products;</li>
          <li>stolen goods;</li>
          <li>cash;</li>
          <li>precious metals;</li>
          <li>negotiable instruments;</li>
          <li>prohibited batteries;</li>
          <li>any goods prohibited by the laws of the country of origin, transit or destination.</li>
        </ul>
        <p className="mt-2">If prohibited goods are discovered, County Cargo may:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>refuse shipment;</li>
          <li>surrender the goods to authorities;</li>
          <li>destroy the goods where legally authorised;</li>
          <li>recover all associated costs from the Customer.</li>
        </ul>
      </div>
    )
  },
  {
    title: '13. Limitation of Liability',
    content: (
      <div>
        <p>To the fullest extent permitted by law, County Cargo shall not be liable for:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>delays;</li>
          <li>missed deadlines;</li>
          <li>customs delays;</li>
          <li>airline delays;</li>
          <li>shipping line delays;</li>
          <li>warehouse congestion;</li>
          <li>acts of government;</li>
          <li>theft;</li>
          <li>misplacement;</li>
          <li>deterioration;</li>
          <li>weather;</li>
          <li>strikes;</li>
          <li>civil unrest;</li>
          <li>cyber incidents;</li>
          <li>force majeure;</li>
          <li>supplier delays;</li>
          <li>courier delays.</li>
        </ul>
        <p className="mt-2">County Cargo shall also not be liable for:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>loss of profits;</li>
          <li>business interruption;</li>
          <li>loss of contracts;</li>
          <li>loss of goodwill;</li>
          <li>consequential loss;</li>
          <li>indirect loss;</li>
          <li>emotional distress;</li>
          <li>sentimental value.</li>
        </ul>
        <p className="mt-2">Where liability cannot legally be excluded, County Cargo’s liability shall be limited to the lower of:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>the actual shipping charges paid for the shipment; or</li>
          <li>the maximum amount required by applicable mandatory law.</li>
        </ul>
      </div>
    )
  },
  {
    title: '14. Weight Verification',
    content: (
      <div>
        <p>The weight recorded by County Cargo at its warehouse shall be deemed accurate and final unless the Customer provides clear documentary evidence demonstrating a material error.</p>
        <p className="mt-2">County Cargo reserves the right to reweigh any shipment and amend charges accordingly.</p>
      </div>
    )
  },
  {
    title: '15. Delivery',
    content: (
      <div>
        <p>Estimated delivery dates are estimates only.</p>
        <p className="mt-2">County Cargo does not guarantee delivery by any particular date or time.</p>
        <p className="mt-2">Time shall not be of the essence in relation to the transportation of any shipment.</p>
      </div>
    )
  },
  {
    title: '16. Claims',
    content: (
      <div>
        <p><strong>16.1</strong> No claim shall be considered unless every outstanding invoice has first been paid.</p>
        <p className="mt-2"><strong>16.2</strong> Any claim must be submitted in writing within 7 days of delivery.</p>
        <p className="mt-2"><strong>16.3</strong> Claims submitted outside this period shall be deemed waived.</p>
        <p className="mt-2"><strong>16.4</strong> County Cargo may require photographs, invoices, proof of value and inspection of the original packaging before considering any claim.</p>
        <p className="mt-2"><strong>16.5</strong> County Cargo’s decision following investigation shall be final unless otherwise determined by a court of competent jurisdiction.</p>
      </div>
    )
  },
  {
    title: '17. Force Majeure',
    content: (
      <div>
        <p>County Cargo shall not be liable for any failure or delay caused by events beyond its reasonable control, including but not limited to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>acts of God;</li>
          <li>flood;</li>
          <li>fire;</li>
          <li>pandemic;</li>
          <li>epidemic;</li>
          <li>war;</li>
          <li>terrorism;</li>
          <li>riots;</li>
          <li>strikes;</li>
          <li>industrial action;</li>
          <li>airline disruption;</li>
          <li>shipping line disruption;</li>
          <li>customs action;</li>
          <li>government restrictions;</li>
          <li>port congestion;</li>
          <li>fuel shortages;</li>
          <li>cyber attacks;</li>
          <li>power failures.</li>
        </ul>
      </div>
    )
  },
  {
    title: '18. Electronic Acceptance',
    content: (
      <div>
        <p>The Customer accepts these Terms and Conditions by:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>booking online;</li>
          <li>using the County Cargo App;</li>
          <li>using the Customer Portal;</li>
          <li>sending goods to any County Cargo address;</li>
          <li>requesting collection;</li>
          <li>paying an invoice;</li>
          <li>authorising another person to act on their behalf.</li>
        </ul>
        <p className="mt-2">No physical signature shall be required for these Terms to become legally binding.</p>
      </div>
    )
  },
  {
    title: '19. Governing Law',
    content: (
      <div>
        <p>These Terms and Conditions shall be governed by the laws applicable in the jurisdiction in which the relevant County Cargo contracting entity provides the service. Where permitted by law, the parties submit to the exclusive jurisdiction of the competent courts of that jurisdiction.</p>
      </div>
    )
  },
  {
    title: '20. Severability',
    content: (
      <div>
        <p>If any provision of these Terms and Conditions is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>
      </div>
    )
  },
  {
    title: '21. Entire Agreement',
    content: (
      <div>
        <p>These Terms and Conditions constitute the entire agreement between County Cargo and the Customer and supersede all previous agreements, understandings, representations and communications relating to the services provided by County Cargo.</p>
      </div>
    )
  },
  {
    title: '22. Customer Indemnity',
    content: (
      <div>
        <p><strong>22.1</strong> The Customer agrees to indemnify, defend and hold harmless County Cargo, its directors, officers, employees, agents, contractors and affiliates from and against all claims, losses, liabilities, damages, penalties, fines, legal proceedings, judgments, costs and expenses arising directly or indirectly from:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>any breach of these Terms and Conditions;</li>
          <li>inaccurate or false declarations;</li>
          <li>prohibited or restricted goods;</li>
          <li>infringement of intellectual property rights;</li>
          <li>breach of customs or import/export regulations;</li>
          <li>negligent or unlawful acts or omissions of the Customer;</li>
          <li>claims made by the sender, consignee or any third party relating to the shipment.</li>
        </ul>
        <p className="mt-2"><strong>22.2</strong> This indemnity survives completion of the shipment and termination of the agreement.</p>
      </div>
    )
  },
  {
    title: '23. Fraudulent Payments and Chargebacks',
    content: (
      <div>
        <p><strong>23.1</strong> County Cargo reserves the right to suspend any shipment where payment is suspected to be fraudulent.</p>
        <p className="mt-2"><strong>23.2</strong> Where a Customer initiates a chargeback or payment reversal without lawful justification, County Cargo may immediately:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>suspend the Customer’s account;</li>
          <li>retain possession of any goods;</li>
          <li>recover all outstanding charges;</li>
          <li>recover all chargeback fees imposed by the payment provider;</li>
          <li>commence legal proceedings.</li>
        </ul>
        <p className="mt-2"><strong>23.3</strong> The Customer shall remain liable for all shipping charges, storage charges and recovery costs notwithstanding any chargeback or payment dispute.</p>
      </div>
    )
  },
  {
    title: '24. Returned and Undeliverable Shipments',
    content: (
      <div>
        <p><strong>24.1</strong> Where a shipment cannot be delivered because of an incorrect address, refusal by the recipient, customs refusal or any other reason outside County Cargo’s control, the shipment may be:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>returned to the sender;</li>
          <li>held in storage;</li>
          <li>redirected;</li>
          <li>disposed of where permitted by law.</li>
        </ul>
        <p className="mt-2"><strong>24.2</strong> All additional transport, storage, customs and administrative costs shall be payable by the Customer before release of the shipment.</p>
      </div>
    )
  },
  {
    title: '25. Packaging',
    content: (
      <div>
        <p><strong>25.1</strong> The Customer is solely responsible for ensuring that goods are adequately packaged for international transportation.</p>
        <p className="mt-2"><strong>25.2</strong> County Cargo accepts no responsibility for damage resulting from inadequate, defective or unsuitable packaging.</p>
        <p className="mt-2"><strong>25.3</strong> Where County Cargo provides additional wrapping or repackaging, this is done solely as a convenience and does not constitute a guarantee against damage.</p>
      </div>
    )
  },
  {
    title: '26. Warehouse Conditions',
    content: (
      <div>
        <p><strong>26.1</strong> Goods may be stored with other customers’ shipments in shared warehouse facilities.</p>
        <p className="mt-2"><strong>26.2</strong> County Cargo does not guarantee temperature-controlled, humidity-controlled or specialist storage unless expressly agreed in writing.</p>
        <p className="mt-2"><strong>26.3</strong> The Customer accepts all risks associated with ordinary warehouse storage where specialist storage has not been requested and paid for.</p>
      </div>
    )
  },
  {
    title: '27. CCTV, Photographs and Electronic Records',
    content: (
      <div>
        <p><strong>27.1</strong> County Cargo may use CCTV, body cameras, warehouse cameras, barcode scans, electronic signatures, photographs and digital records for operational, security and evidential purposes.</p>
        <p className="mt-2"><strong>27.2</strong> Such electronic records shall constitute prima facie evidence of receipt, handling, storage and delivery of the shipment unless proven otherwise.</p>
        <p className="mt-2"><strong>27.3</strong> County Cargo is not obliged to photograph every shipment and the absence of photographs shall not give rise to any presumption of negligence.</p>
      </div>
    )
  },
  {
    title: '28. Communication',
    content: (
      <div>
        <p><strong>28.1</strong> County Cargo may communicate with Customers by:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>email;</li>
          <li>SMS;</li>
          <li>WhatsApp;</li>
          <li>telephone;</li>
          <li>mobile application notifications;</li>
          <li>customer portal notifications;</li>
          <li>any other contact details provided by the Customer.</li>
        </ul>
        <p className="mt-2"><strong>28.2</strong> Notices shall be deemed received when sent to the last contact details supplied by the Customer.</p>
        <p className="mt-2"><strong>28.3</strong> It is the Customer’s responsibility to ensure that their contact details remain accurate and up to date.</p>
      </div>
    )
  },
  {
    title: '29. Third-Party Carriers',
    content: (
      <div>
        <p><strong>29.1</strong> County Cargo may appoint airlines, shipping lines, courier companies, warehouse operators and other subcontractors to perform all or part of the services.</p>
        <p className="mt-2"><strong>29.2</strong> County Cargo shall not be liable for delays, acts, omissions or defaults of third-party carriers except where liability cannot legally be excluded.</p>
      </div>
    )
  },
  {
    title: '30. High-Value Goods',
    content: (
      <div>
        <p><strong>30.1</strong> Customers shipping jewellery, watches, artwork, antiques, collectibles, luxury goods or other high-value items must declare the value before shipment.</p>
        <p className="mt-2"><strong>30.2</strong> Failure to declare the value and arrange suitable insurance shall be entirely at the Customer’s risk.</p>
        <p className="mt-2"><strong>30.3</strong> County Cargo reserves the right to refuse shipment of any high-value item.</p>
      </div>
    )
  },
  {
    title: '31. Right to Refuse Service',
    content: (
      <div>
        <p>County Cargo reserves the absolute right to refuse to accept, transport, store or deliver any shipment where it reasonably believes that:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>the shipment breaches any law;</li>
          <li>the shipment presents a safety risk;</li>
          <li>the Customer has outstanding debts;</li>
          <li>fraudulent activity is suspected;</li>
          <li>inaccurate information has been provided;</li>
          <li>shipment may expose County Cargo to legal or financial risk.</li>
        </ul>
        <p className="mt-2">County Cargo shall not be liable for any losses arising from exercising this right.</p>
      </div>
    )
  },
  {
    title: '32. Account Suspension and Termination',
    content: (
      <div>
        <p>County Cargo may suspend or permanently terminate any customer account without prior notice where the Customer:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>commits fraud;</li>
          <li>repeatedly fails to make payment;</li>
          <li>abuses staff;</li>
          <li>breaches these Terms and Conditions;</li>
          <li>uses County Cargo’s services unlawfully.</li>
        </ul>
        <p className="mt-2">Termination does not affect County Cargo’s right to recover outstanding debts.</p>
      </div>
    )
  },
  {
    title: '33. Intellectual Property',
    content: (
      <div>
        <p>All logos, trademarks, software, mobile applications, documents, photographs, website content and branding remain the exclusive property of County Cargo.</p>
        <p className="mt-2">No Customer may reproduce or use County Cargo’s intellectual property without prior written consent.</p>
      </div>
    )
  },
  {
    title: '34. Privacy',
    content: (
      <div>
        <p>County Cargo may collect, store and process personal information for the purpose of providing shipping services, complying with legal obligations, preventing fraud and improving customer service.</p>
        <p className="mt-2">Information may be shared with customs authorities, regulators, law enforcement agencies and authorised service providers where required by law or necessary for the performance of the services.</p>
      </div>
    )
  },
  {
    title: '35. Amendment of Services',
    content: (
      <div>
        <p>County Cargo reserves the right to amend, suspend or discontinue any shipping route, pricing structure, warehouse location, service or operational procedure without prior notice where reasonably necessary.</p>
      </div>
    )
  },
  {
    title: '36. No Waiver',
    content: (
      <div>
        <p>Failure by County Cargo to enforce any provision of these Terms and Conditions shall not constitute a waiver of that provision or any other right.</p>
      </div>
    )
  },
  {
    title: '37. Survival',
    content: (
      <div>
        <p>Clauses relating to payment, indemnity, storage charges, legal costs, debt recovery, limitation of liability, privacy and governing law shall survive completion of the shipment and termination of the agreement.</p>
      </div>
    )
  },
  {
    title: '38. Acknowledgement',
    content: (
      <div>
        <p>By delivering goods to County Cargo, booking a shipment, creating an account, using the County Cargo website or mobile application, paying an invoice or authorising County Cargo to handle any shipment, the Customer acknowledges that they have read, understood and agreed to be bound by these Terms and Conditions.</p>
      </div>
    )
  }
];

const privacy = [
    { title: '1. Information We Collect', content: <ul><li>Personal information: Name, email, phone, address, company details</li><li>Shipping information: Origin, destination, package contents, instructions</li><li>Payment information</li><li>Technical info: IP, browser, OS, browsing behavior</li></ul> },
    { title: '2. How We Use Your Information', content: <ul><li>Process shipments and track deliveries</li><li>Customer support and communication</li><li>Secure payment processing</li><li>Compliance with legal obligations</li><li>Service improvement and analytics</li></ul> },
    { title: '3. Sharing & Security', content: <div><ul><li>Service providers: shipping partners, payment processors, IT vendors</li><li>Legal compliance</li><li>Business transactions: mergers, acquisitions</li><li>Protection of rights</li></ul><p>We do not sell or rent personal information.</p></div> },
    { title: '4. Your Rights', content: <ul><li>Access and correction</li><li>Deletion (with exceptions)</li><li>Opt-out of marketing</li><li>Data portability and restriction of processing</li></ul> },
    { title: '5. Contact', content: <address className="not-italic">County Cargo<br />Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos 102214, Lagos, Nigeria<br />Phone: +2348110000421, +2348110000423</address> },
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
            const questionEl = item.querySelector('h3') as HTMLElement | null;
            const answerEl = item.querySelector('.faq-answer') as HTMLElement | null;
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

  useEffect(() => {
    // Disable right click (context menu) on the entire page
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    
    // Disable copy, cut, paste on the entire page
    const handleCopyCutPaste = (e: ClipboardEvent) => {
      e.preventDefault();
    };
    
    // Disable common keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const isMetaOrCtrl = e.ctrlKey || e.metaKey;
      
      // Block Ctrl+C, Ctrl+X, Ctrl+A, Ctrl+S, Ctrl+P
      if (isMetaOrCtrl && (key === 'c' || key === 'x' || key === 'a' || key === 's' || key === 'p')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopyCutPaste);
    document.addEventListener('cut', handleCopyCutPaste);
    document.addEventListener('paste', handleCopyCutPaste);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopyCutPaste);
      document.removeEventListener('cut', handleCopyCutPaste);
      document.removeEventListener('paste', handleCopyCutPaste);
      document.removeEventListener('keydown', handleKeyDown);
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
          
          <div className="protected-warning-box">
            <p className="text-sm font-semibold text-red-700">
              This document is the property of County Cargo. It is provided for customer information only. Copying, reproduction, distribution or unauthorised use is strictly prohibited.
            </p>
          </div>

          <div className="protected-document-viewer protected-watermark-bg select-none">
            {terms.map((item, index) => (
              <div className="faq-item" key={`term-${index}`}>
                <h3 className="faq-toggle">{item.title}</h3>
                <div className="faq-answer">{item.content}</div>
              </div>
            ))}
            
            <div className="protected-copyright-box">
              <p>
                © County Cargo. All rights reserved. This document is provided for viewing only and must not be copied, reproduced, distributed or reused without written permission from County Cargo.
              </p>
            </div>
          </div>

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
                        <th>Min Weight (kg) for FREE delivery</th>
                        <th>Avg Delivery (working day)</th>
                    </tr>
                </thead>
                <tbody>
                    {nigerianShippingRates.map((price, index) => (
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
                    {nigerianShippingRates.map(p => <option key={p.destination} value={p.destination}>{p.destination}</option>)}
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
