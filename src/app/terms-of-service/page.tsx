import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Terms of Service – County Cargo',
  description: 'Read the Terms of Service for using County Cargo\'s freight and logistics services.',
};

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="pt-24 bg-white">
        <section className="py-16 non-copyable">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-secondary mb-8 text-center">Terms of Service</h1>
             <p className="text-center text-gray-500 mb-12">Last Updated: November 04, 2024</p>
            <div className="prose lg:prose-xl max-w-none text-gray-800 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-secondary">1. Definitions:</h2>
                <p><strong>1.1.</strong> In this shipping agreement, “we”, “our”, “us”, and “County Cargo” refer to County Cargo, its subsidiary, and its branches.</p>
                <p><strong>1.2.</strong> “You” and “Your” refer to the shipper and its employees, principals and agents. The shipper in this agreement is the person or entity who delivered the cargo to County Cargo, and who requested that the shipment be transported, and/ or any person/entity having an interest in the shipment and/or who acts as an agent of the shipper.</p>
                <p><strong>1.3.</strong> “Package” means any pallet, container, envelope, etc, that we accept for delivery, and includes items tendered by you using our automated application, manifests, or airway bills.</p>
                <p><strong>1.4.</strong> “Shipment” means one or more packages moving on a single house airway, an airway bill, an invoice number, or a shipment number, or manifested from an automated shipping application and accepted by us.</p>
                <p><strong>1.5.</strong> “Dangerous Goods” means cargo that is noxious, hazardous, inflammable, explosive, or offensive (including radioactive materials) or may become noxious, hazardous, inflammable, explosive offensive, or radioactive or may become liable to cause damage to any person or property whatsoever whether prescribed by laws or otherwise.</p>
                <p><strong>1.6.</strong> Airfreight Convention” means whichever may be applicable of the: Convention for the Unification of Certain Rules for International Carriage by Air signed at Montreal on 28 May 1999; or</p>
                <p><strong>1.7.</strong> Convention for the Unification of Certain Rules relating to International Carriage by Air, signed at Warsaw on 12 October 1929; either unamended or amended by The Hague Protocol 1955; at Guatemala City 1971, by the additional Protocol No 3 of Montreal 1975 and/or by the additional Protocol No. 4 of Montreal 1975.</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary">2. Agreement to the Terms of Service:</h2>
                <p><strong>2.1.</strong> This Agreement is not negotiable and therefore binding on both parties once we accept your shipment. Thus, by dropping off your shipment with us or sending your shipment to us or authorising us to pick up your shipment, you agree to all the terms and conditions herein contained. It sets forth the rights, duties and obligations and in certain cases liabilities of parties having interest in any shipment.</p>
                <p><strong>2.2.</strong> You also agree and acknowledge that we reserve the right, at our sole discretion to change or modify these terms and conditions at any time. Please review these terms and conditions periodically, especially before sending your shipment, as your use of our service each time constitutes an acceptance of any modified terms and conditions.</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary">3. Your Obligations:</h2>
                <p><strong>3.1.</strong> The shipper warrants and undertakes that each item in the shipment is properly labeled and correctly described on the shipping document and that any export document, accepted for transport, is properly marked addressed, and packaged to protect the enclosed goods for safe transportation.</p>
                <p><strong>3.2.</strong> The shipper agrees that any delicate electrical equipment shall be declared, shown to be in good working condition properly packaged, and protected for safe transportation before it is handed over to us for carriage.</p>
                <p><strong>3.3.</strong> The shipper also warrants that the dimensions and weight of the packages as manifested in our automated shipping application are correct and that if such information is not correct, we reserve the right to weigh and measure the shipment and apply the appropriate charges.</p>
                <p><strong>3.4.</strong> You undertake that there are no dangerous goods in the shipment and that if there is any dangerous item as published by the Dangerous Goods Regulation from IATA, you have stated it in the applicable shipping documents to comply with all International Air Transport Association (“IATA”) regulations or other applicable law(s) for shipment of dangerous goods.</p>
                <p><strong>3.5.</strong> You agree that you are aware of our published shipping rates and charges at the time of dropping your shipment with us and that you are also aware that shipping rates are based on actual or volumetric weight, whichever is greater.</p>
                <p><strong>3.6.</strong> You agree to make payment in advance once you receive your invoice of shipment which comprises the actual weighted cost of your shipment and the handling charges for shipment from the UK to Nigeria.</p>
                <p><strong>3.7.</strong> You agree to make payment and clear your invoice for items shipped to our Lagos office before collection of such.</p>
                <p><strong>3.8.</strong> You agree that the shipment may be delayed or dropped totally if payment is not received 24 hours before estimated departure.</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary">4. Undertaking against illegal use/ Fraud:</h2>
                <p><strong>4.1.</strong> You undertake that the contents of all shipments are goods owned by you and obtained through legitimate means. You agree not to deliver any shipment to us that has a lien on it, or that is not lawfully owned by you.</p>
                <p><strong>4.2.</strong> You further undertake that any use of the Service and/or Account shall follow all applicable laws both local and international covering our areas of operation (Nigeria, United Kingdom, and USA) including laws related to the transportation and export of commercial matter, which may include without limitation laws related to banking, money laundering, trade sanctions and terrorist activities.</p>
                <p><strong>4.3.</strong> You agree that any goods delivered to us, later discovered to have been obtained through fraudulent or other unlawful or inappropriate means or in violation of this clause may result in the forfeiture, return to sender, or destruction of shipment, along with notification to the police and/or appropriate government authorities either in the country of departure or destination, and that such goods may only be released to you upon written authorization from the government agency.</p>
                <p><strong>4.4.</strong> You further agree that (in the event of a violation of any clause in this section) all shipping costs will still be paid by you and that any payment made to us for goods that are not shipped (as a result of the violation) will be used as the cost of fraud investigation. In that regard, you agree that your account will immediately be suspended, and you will be prosecuted in the law court of your locality.</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary">5. Responsibility for Payment:</h2>
                <p><strong>5.1.</strong> You will always be primarily responsible for all charges, including transportation charges, possible surcharges, customs charges, duties, and any other government-imposed taxes, levies, fines, and fees and our lawyers’ fees and other legal costs related to shipment, storage, handling, re-consignment, return of freight to shipper, disposition or other costs which we may incur because you violate this agreement or any of your default, default from the consignee or their agents.</p>
                <p><strong>5.2.</strong> You agree that we have a lien on any goods shipped where there is a failure to pay for charges under this agreement and therefore may refuse to surrender possession of the goods until such charges are paid.</p>
                <p><strong>5.3.</strong> You are meant to make an upfront payment for services provided. Where upfront payment is not applicable, you are meant to immediately make payment upon receipt of an invoice (by email) from county cargo.</p>
                <p><strong>5.4.</strong> Where payment is made upfront, you are required to pick up your shipment or package within two days of delivery to our UK or Nigeria office. Thereafter, we may move the package from our office back to the warehouse which shall attract a warehousing fee of (N1,000 or UK equivalent) per day if we have to warehouse same.</p>
                <p><strong>5.5.</strong> Where payment is not made upfront, you are required to make payment in full upon receipt of your invoice. Failure to make such payment within five working days of receipt of your invoice may attract a late payment fee of 10% of the value charged, this is in addition to the warehousing charge referred to in clause 5.4 above.</p>
                <p><strong>5.6.</strong> It is your responsibility to ensure that items being shipped to our UK, and USA addresses are weighed and labelled correctly.</p>
                <p><strong>5.7.</strong> You agree to make payment using only the approved payment method for your locations and agree not to use any fraudulent method to pay for your shipment. In any event, where we detect a potential fraudulent payment, we reserve the right to hold such shipments for up to 30 days until we have been able to fully verify the authenticity of such payment.</p>
                <p><strong>5.8. PLEASE NOTE:</strong>  All packages will be consolidated into a larger box and wrapped. This adds an extra 2kg to the weight of your packages.</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary">6. Prohibited Items Not Acceptable for Transportation:</h2>
                <p><strong>6.1.</strong> We do not ship prohibited/dangerous items, cash or equivalent (including but not to cash, coins, negotiable instruments that are equivalent to cash such as traveler’s cheques, money orders, etc.), originals of all forms of certificates (including educational/training certificates, share certificates, or any other forms of original certificates). We do not ship Mobile devices, Tablets, Laptops, and digital cameras. We exclude all liability for shipment of such items accepted by mistake.</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary">7. Inspection of Goods:</h2>
                <p><strong>7.1.</strong> Shipments are subject to inspection by government authorities or by County cargo without notice, for safety, security, customs, or other regulatory reasons. Inspection shall be by laid down security controls and procedures as provided by government authorities and/ or carriers. However, we are not obligated to perform such an inspection. You agree that we incur no liability for failing to carry out any inspection on your shipment.</p>
                <p><strong>7.2.</strong> We have the right to open and inspect any package or shipment without notice for safety, security, customs, or other regulatory reasons, but we are not obligated to open any goods or shipments for testing or checking if they are in good working condition.</p>
                <p><strong>7.3.</strong> Copies of all relevant shipping documents showing the cargo’s consignee, consignor, description, and other relevant data will be inspected and retained on file until the cargo completes its air or sea transportation and shall be retained for record purposes for as long as required by government authorities. We incur no liability for retaining the documents for the said and similar reasons.</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary">8. Liabilities Not Assumed:</h2>
                <p><strong>8.1.</strong> Subject to the service conditions contained in this agreement, we shall not be liable for any damage arising from your shipment, or loss of income or profit, whether such damage be direct, incidental, or consequential.</p>
                <p><strong>8.2.</strong> All other types of loss or damage are excluded (including but not limited to lost profits, income, interest, and future business), whether such loss or damage is special or indirect, and even if the risk of such loss or damage was brought to County Cargo’s attention.</p>
                <p><strong>8.3.</strong> You agree that we are not liable for your acts of incorrect declaration of cargo, improper or insufficient packing, securing, marking, or addressing of the shipment; or the acts or omissions of the recipient or anyone else with an interest in the shipment.</p>
                <p><strong>8.4.</strong> You agree that we are not liable for any loss, damage, delay, shortage, improper delivery, non-delivery, misinformation, or failure to provide information in connection with your shipments or shipment of any prohibited items, cash, currency equivalent, or other prohibited items.</p>
                <p><strong>8.5.</strong> You undertake to declare all fragile goods (glass materials like cups, plates, and other breakable household materials, and goods packaged in breakable materials) being sent from any of our locations (UK, USA, AND NIGERIA) properly.</p>
                <p><strong>8.6.</strong> You agree that any fragile goods that are sent to us that are not well labeled/declared appropriately at the point of delivery to us are entirely at the sender’s own risk.</p>
                <p><strong>8.7.</strong> It is the Shipper’s responsibility to declare, show to be in good working condition, and properly encase (at the point of delivery to us or pick up by us), any delicate electrical equipment or package, (same must be acknowledged in writing by us), as there may be need to make a special declaration of value and request insurance or review charges, failure to do so shall completely exclude County cargo of liability or claim for damage.</p>
                <p><strong>8.8.</strong> Where the Shipper makes use of our automated application or third parties for the delivery of any delicate electrical equipment or package to us, the Shipper agrees that County cargo shall be completely excluded from any form of liability or claim for damage except clause 8.7 above is complied with.</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary">9. Liability:</h2>
                <p><strong>9.1.</strong> Liability of County cargo in respect of any one Shipment or package shall be limited by the Montreal Convention or the Warsaw Convention (for convenience referred to as Convention Rules) or any national laws implementing or adopting these Convention Rules.</p>
                <p><strong>9.2.</strong> In the absence of the Convention Rules or other mandatory national laws, County Cargo’s liability shall only be restricted to failure to act with reasonable care and skill, and its liability shall be exclusively governed by these terms and limited to proven damages not exceeding the lower of either: (a) GBP 60 per shipment in the case of goods presented in the UK to County cargo for carriage (USD 67 in the United States of America), (NGN 27, 420 Nigeria) or; (b) 8.33 Special Drawing Rights (“SDRs”) per kilo of the goods affected, (Approximately GBP 8 per kilogram or USD 10 per LBS)</p>
                <p><strong>9.3.</strong> If the Shipper regards these limits as insufficient, it must make a special declaration of value and request insurance or make its insurance arrangements. County cargo’s liability is strictly limited to direct loss or damage to a Shipment only and to the per kilogram limits in this section.</p>
                <p><strong>9.4.</strong> If the Shipper (or any person from whom he derives his right to claim) has caused or contributed to any loss, damage, or delay to a shipment or package, any liability County cargo may incur in respect thereof (limited as above) may be reduced or extinguished by the law applicable to such contributory negligence.</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary">10. Force Majeure</h2>
                <p><strong>10.1.</strong> We are not liable for loss, damage, delay, shortage, non-delivery, misinformation, monetary losses of any type, or failure to provide information in connection with your shipment caused by events beyond our control including; public authorities/holidays; strikes; labor disputes; weather/natural disaster; mechanical failures; aircraft failures and/or delays; civil commotions; acts or omissions of customs or quarantine officials; war; acts of terrorism, defaults or omissions of the shipper or consignee or failure to observe the terms and -conditions of the agreement of carriage. In cases of delay by airlines or shipping lines, it shall be enough for us to show that your items arrived at the point of departure within a reasonable time.</p>
                <p><strong>10.2.</strong> In addition, notwithstanding our commitment to ensuring that your items are delivered to you on time and within the estimated time frames as seen on our website, whenever there’s a delay of any sort on our part, you will be notified automatically by us or upon your request.</p>
                <p><strong>10.3.</strong> You agree and are aware that all items are stored in a general and open warehouse, where conditions of storage may not be suitable for all categories of goods. You agree that we are not liable for any deterioration or depreciation in quality, changes in color, or appearance of items in the warehouse – whether of perishable or non-perishable items, caused by long storage,e, etc. Where a special storage condition is required for an item, you agree to notify us of such required/ special storage condition and to make the consequential payment (as may be agreed), before the arrival of the item to our warehouse, or to reimburse us for expenses reasonably incurred to preserve such items.</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary">11. No Warranties:</h2>
                <p>We make no warranties, express or implied, and expressly disclaim all warranties.</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary">12. Export Control and Customs Clearance:</h2>
                <p><strong>12.1.</strong> By giving us your shipment, you hereby appoint us your agent for the performance of customs clearance and certify us as the nominal consignee for designating a customs broker to perform customs clearance.</p>
                <p><strong>12.2.</strong> You are responsible for and warrant your compliance with all applicable laws, rules, and regulations, including but not to customs laws; import, export, and re-export laws, and governmental regulations in respect of your shipment in any country where the same may pass. You agree to furnish such information and documents as are necessary to comply with such laws, rules, and regulations.</p>
                <p><strong>12.3.</strong> We assume no liability to you or any other person for any loss or expenses due to failure to comply with any documentation with customs or other Government Agencies.</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary">13. Delivery of Shipment:</h2>
                <p><strong>13.1.</strong> The consignee must note at the point of delivery, on the delivery receipt, damage (if any), to the contents of the shipment, shortage in the shipment, or any other complaint. Such notations as “subject to inspection” and “subject to recount” are not exceptions. Any complaint not registered at the point of delivery shall be deemed waived.</p>
                <p><strong>13.2.</strong> You agree that in shipping your item, while we take all necessary steps within our power to ensure timely delivery, “time of delivery is not of the essence”, and it is agreed that no time is fixed for the completion of carriage and that we do not guarantee pick-ups, transportation or delivery on a special date or time, and shall not be liable for a failure to do so or consequences of the same.</p>
                <p><strong>13.3.</strong> For convenience, we show estimated delivery time frames on our website, and social media and we use our best efforts to deliver on or before these estimated dates. You nevertheless agree that these dates are estimates and we do not guarantee delivery by them as time is not of the essence in the delivery of your shipment.</p>
                <p><strong>13.4.</strong> You agree to elect two persons either of whom may accept shipment/delivery on your behalf and further agree that shipment accepted by either of these persons will be deemed to have been accepted by you and if accepted without noting any damage, or loss on the delivery record, such shipment shall be deemed to have been delivered in good condition and no claim shall be made thereon.</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary">14. Claims:</h2>
                <p><strong>14.1.</strong> You agree that no claims will be entertained until all transportation charges have been paid. The shipper agrees that Claims shall not be deducted from transportation or other charges due to carrier.</p>
                <p><strong>14.2.</strong> If the recipient accepts the shipment without noting any damage or loss on the delivery record, such shipment shall be deemed to be delivered in good condition and no claim shall be made thereon. For us to consider a claim, the contents, original shipping cartons, and packing must be available for us to inspect.</p>
                <p><strong>14.3.</strong> You agree that if you are not physically available to personally accept the shipment at the designated address and the shipment was accepted by either of two persons elected by you without noting any damage, or loss on the delivery record, no claim shall be made thereon.</p>
                <p><strong>14.4.</strong> In case of items that are misplaced while in the company’s custody and this is verified to be so after a proper investigation within a stated period a full refund of the purchase cost will be made to you once the original invoice of purchase is presented and you provide evidence to show that your item(s) were duly delivered to us by a delivery service which provides full tracking information and signature verification; we are not responsible or liable for items delivered without any proof of tracking and signature verification.</p>
                <p><strong>14.5.</strong> You agree to this and fully accept that on no account will we pay or refund you beyond the actual cost of paid-for transport of your package or packages</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary">15. Complaint:</h2>
                <p><strong>15.1.</strong> We will endeavor to respond to complaints within ten (10) business days.</p>
                <p><strong>15.2.</strong> Depending on the nature of the complaint, we will endeavor to action and resolve complaints within ten (10) business days and a maximum of four (4) calendar months.</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary">16. Data Protection:</h2>
                <p><strong>16.1.</strong> County Cargo has the right to process data provided by the shipper or receiver in connection with carriage by County Cargo, and to transfer such data to other group companies and contractors of County Cargo, including in other countries that may not have the same level of data protection as the country where the shipment is presented to County Cargo, and to have it processed there if and to the extent the transfer and processing of the data in such countries is required for performing the agreed shipment services. The shipper warrants that it: (i) has obtained personal data the shipper provided to County Cargo for the shipment lawfully. (ii) is authorized to provide such data to County Cargo if and to the extent the transfer and processing of the data in such countries is required for performing the agreed shipment services, and (iii) has obtained informed and specific consent from such receiver that County Cargo may send e-mail and other notifications related to the agreed shipment services to the receiver.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
