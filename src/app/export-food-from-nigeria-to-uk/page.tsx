import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedGuides } from '@/components/related-guides';
import { JsonLd } from '@/components/json-ld';
import { SocialShare } from '@/components/social-share';
import {
  Utensils,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Plane,
  Clock,
  MapPin,
  FileText,
  Package,
  Boxes,
  UserCheck,
  Calendar,
  HelpCircle,
  MessageSquare,
  Sparkles,
  Ban,
  Scale,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Export Food From Nigeria to the UK | DEFRA & Port Health Guide | County Cargo',
  description:
    'Legally export authentic Nigerian foodstuffs to the UK. Permitted items (garri, egusi, ogbono, dried fish, crayfish, yam flour), DEFRA & Port Health rules, vacuum packaging standards, and express air cargo.',
  keywords:
    'export food from Nigeria to UK, send foodstuffs from Lagos to London, UK port health regulations Nigerian food, send egusi ogbono to UK, vacuum seal food shipping Nigeria to UK, freight dried fish Nigeria to UK, send garri to London, Nigerian food import UK',
  alternates: {
    canonical: 'https://countycargo.com/export-food-from-nigeria-to-uk',
  },
  openGraph: {
    title: 'Export Food From Nigeria to the UK | DEFRA & Port Health Guide | County Cargo',
    description:
      'Learn which Nigerian foodstuffs are permitted into the UK, strict DEFRA packaging rules, prohibited items, and how County Cargo delivers food safely from Lagos & Abuja to your UK doorstep.',
    url: 'https://countycargo.com/export-food-from-nigeria-to-uk',
    siteName: 'County Cargo',
    images: [
      {
        url: 'https://countycargo.com/service-nigeria-uk-enhanced.png',
        width: 1200,
        height: 630,
        alt: 'Exporting Nigerian foodstuffs to the United Kingdom',
      },
    ],
  },
};

const permittedFoods = [
  {
    name: 'Garri (White & Yellow)',
    condition: 'Completely dried, free from weevils, sealed in airtight food-grade poly bags.',
    status: 'Permitted',
  },
  {
    name: 'Egusi (Melon Seeds) & Ogbono',
    condition: 'Milled or whole seeds; must be thoroughly dried and vacuum-sealed.',
    status: 'Permitted',
  },
  {
    name: 'Dried Fish & Stockfish',
    condition: 'Oven-dried or smoked (catfish, mangala, stockfish); zero moisture, double vacuum-packed.',
    status: 'Permitted',
  },
  {
    name: 'Dried Crayfish & Prawns',
    condition: 'Ground or whole; must be bone-dry and sealed in thick vacuum pouches to contain aroma.',
    status: 'Permitted',
  },
  {
    name: 'Yam Flour (Elubo) & Plantain Flour',
    condition: 'Clean, commercially milled, moisture-free in sealed multi-ply packaging.',
    status: 'Permitted',
  },
  {
    name: 'Dried Snails',
    condition: 'Thoroughly oven-dried and crisp; no fresh slime or moisture; vacuum-sealed.',
    status: 'Permitted',
  },
  {
    name: 'Spices & Seasonings',
    condition: 'Suya pepper, uda, uziza, ehuru, cameroon pepper in sealed labelled pouches.',
    status: 'Permitted',
  },
  {
    name: 'Pure Palm Oil',
    condition: 'Must be packed in tamper-proof, leak-tested screw-cap containers and boxed securely.',
    status: 'Permitted with Special Packing',
  },
];

const prohibitedFoods = [
  {
    item: 'Dried Beans (Cowpeas)',
    reason: 'Subject to a strict UK/EU import restriction due to past agricultural pesticide (dichlorvos) concerns. Seized immediately by Border Force if uncertified.',
  },
  {
    item: 'Fresh / Raw Meat & Bushmeat',
    reason: 'Strictly banned under UK biosecurity legislation to prevent foot-and-mouth and foreign animal diseases.',
  },
  {
    item: 'Fresh Vegetables with Soil',
    reason: 'Raw roots, leaves, or tubers bearing live soil or foreign pests are prohibited to protect UK plant ecosystems.',
  },
  {
    item: 'Unpasteurised Dairy & Wet Foods',
    reason: 'Non-shelf-stable perishables that spoil without refrigeration during international transit.',
  },
];

const foodFaqs = [
  {
    question: 'Can I legally export food from Nigeria to the UK in 2026?',
    answer:
      'Yes! You can legally ship dried, shelf-stable Nigerian food items to the UK for personal consumption or commercial distribution. However, all goods must comply with UK Department for Environment, Food & Rural Affairs (DEFRA) and UK Port Health regulations. Meat, uninspected dairy, and uncertified dried beans are strictly prohibited.',
  },
  {
    question: 'Why are Nigerian dried beans banned from UK import?',
    answer:
      'Dried beans (brown beans, honey beans/ewa oloyin) are subject to specific UK import restrictions due to pesticide residues (dichlorvos) historically used during grain storage in West Africa. Unless accompanied by accredited laboratory health certifications for commercial trade, personal shipments of dried beans are seized by UK Border Force at the port of entry.',
  },
  {
    question: 'How must foodstuffs be packaged to avoid customs seizure?',
    answer:
      'Food must be 100% dry and vacuum-sealed in heavy-gauge polythene pouches (minimum 70–100 microns). Vacuum packaging removes air, suppresses aroma that could attract sniffer dogs, and guarantees the food remains moisture-free and insect-free during flight. County Cargo provides industrial vacuum-sealing at our Lagos and Abuja hubs.',
  },
  {
    question: 'Can I send dried fish and crayfish without foul odor?',
    answer:
      'Yes. When dried catfish, stockfish, or crayfish are oven-dried to eliminate moisture and heat-sealed in airtight vacuum bags, they emit zero smell. We then double-box or pack in airtight heavy-duty shipping cartons to ensure seamless airline handling and swift customs clearance.',
  },
  {
    question: 'How long does food shipping take from Nigeria to the UK?',
    answer:
      'With our Express Air Courier service, food cargo arrives in the UK within 3 to 5 business days. Our Standard Consolidated Air Freight service takes 5–10 working days from flight departure in Lagos. Both options include UK customs clearance and direct delivery to your address.',
  },
  {
    question: 'Can I send food for an African restaurant or grocery shop in the UK?',
    answer:
      'Yes. For commercial quantities of foodstuffs, you will need an itemised commercial invoice, packing list, UK GB EORI number, and where applicable, phytosanitary or health certificates. County Cargo assists commercial agro-exporters with documentation and Port Health clearance.',
  },
  {
    question: 'Where can I drop off food cargo in Nigeria, and how is it delivered in the UK?',
    answer:
      'You can drop off your foodstuffs at our Lagos hub (Ladipo-Oshodi) or Abuja office (Wuye Ultra Modern Market), or schedule a home pickup anywhere in Nigeria. In the UK, you can collect directly from our Liverpool depot (Unit G6, Queens Dock Commercial Centre, L1 0BG) or receive courier delivery straight to your doorstep in London, Manchester, Birmingham, Leeds, Glasgow, and all UK postcodes.',
  },
];

export default function ExportFoodFromNigeriaToUkPage() {
  const pageUrl = 'https://countycargo.com/export-food-from-nigeria-to-uk';

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: 'Nigerian Foodstuff Export & Air Cargo to the UK',
        serviceType: 'Specialized Food Freight Forwarding & UK Port Health Clearance',
        provider: {
          '@type': 'Organization',
          name: 'County Cargo',
          url: 'https://countycargo.com',
          logo: 'https://countycargo.com/county-logo.png',
        },
        areaServed: [
          { '@type': 'Country', name: 'Nigeria' },
          { '@type': 'Country', name: 'United Kingdom' },
        ],
        description:
          'Specialized air cargo service exporting authentic dry Nigerian foodstuffs (garri, egusi, dried fish, crayfish, yam flour, seasonings) from Lagos and Abuja to London, Liverpool, and nationwide UK with DEFRA compliance.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Food Export Shipping Options',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Express Food Cargo (3–5 Working Days)',
                description: 'Fastest air delivery for food items with zero smell vacuum sealing.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Standard Food Freight (5–7 Working Days)',
                description: 'Consolidated air cargo for food packages weighing 10kg and above.',
              },
            },
          ],
        },
      },
      {
        '@type': 'HowTo',
        '@id': `${pageUrl}#howto`,
        name: 'How to Export Foodstuffs from Nigeria to the UK without Customs Delay',
        description:
          'Step-by-step regulatory instructions for packaging, declaring, and exporting dry African foodstuffs from Nigeria to the UK.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Check Permitted Items Against DEFRA Standards',
            text: 'Ensure all food items are shelf-stable and dry. Strictly avoid fresh meat, raw poultry, and uncertified dried beans.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Dehydrate and Vacuum-Seal All Products',
            text: 'Ensure all fish, snails, and crayfish are oven-dried to 0% moisture and vacuum-sealed in heavy-duty food bags.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Label Each Package Accurately',
            text: 'Label each item with its common English and local name (e.g., Milled Melon Seed - Egusi; Cassava Flakes - Garri).',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Drop Off at County Cargo Lagos or Abuja Hub',
            text: 'Bring your goods to County Cargo for inspection, weighing, and export packing, or request doorstep pickup in Nigeria.',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Express Flight and UK Port Health Clearance',
            text: 'Shipment flies via scheduled air cargo to the UK, clears UK customs and Port Health checks, and is delivered to your UK address.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: foodFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://countycargo.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Export From Nigeria',
            item: 'https://countycargo.com/export-from-nigeria',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Export Food from Nigeria to UK',
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={schemaData} />
      <Header />
      <main className="pt-16 bg-white">
        <Breadcrumbs
          items={[
            { label: 'Export From Nigeria', href: '/export-from-nigeria' },
            { label: 'Export Food from Nigeria to the UK' },
          ]}
        />

        {/* Hero Section */}
        <section
          className="py-12 md:py-16 text-white relative"
          style={{
            background: `linear-gradient(rgba(10, 25, 47, 0.90), rgba(15, 23, 42, 0.95)), url('/service-nigeria-uk-enhanced.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-4">
              <Utensils className="w-3.5 h-3.5" /> Authentic African Foodstuff Logistics
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-text-glow leading-tight">
              Export Food From Nigeria to the UK in 2026
            </h1>
            <p className="text-lg md:text-xl mt-4 text-blue-100 font-light max-w-3xl mx-auto">
              How to legally ship dried fish, egusi, ogbono, garri, yam flour, snails, and spices to family, restaurants, and retail stores across the United Kingdom without customs delays or confiscation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200 mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-green-400" /> Inspected by Food Cargo Specialists
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> DEFRA &amp; UK Port Health Compliant
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-yellow-400" /> Updated September 2026
              </span>
            </div>
          </div>
        </section>

        {/* Article & Service Body */}
        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed space-y-10">

            {/* Answer-First Summary Box */}
            <div className="p-6 bg-emerald-50 border-l-4 border-emerald-600 rounded-r-2xl not-prose shadow-2xs">
              <h2 className="text-xs uppercase font-bold tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Answer-First Summary: Exporting Nigerian Food to the UK
              </h2>
              <p className="text-base sm:text-lg text-emerald-950 font-medium leading-relaxed">
                You can legally export shelf-stable, dry Nigerian food items (garri, egusi, ogbono, dried catfish/stockfish, crayfish, yam flour, dried snails, and spices) to the United Kingdom. All food products must be thoroughly dehydrated and vacuum-sealed in leak-proof, odor-free packaging to pass UK Port Health and DEFRA inspections. Fresh meat, uninspected dairy, and uncertified dried beans are strictly prohibited. County Cargo operates scheduled weekly air cargo from Lagos and Abuja with delivery across London, Liverpool, Manchester, and the entire UK in 3 to 7 working days.
              </p>
            </div>

            {/* Shortcut Buttons to Related Services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
              <Link
                href="/export-from-nigeria-to-uk"
                className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-primary hover:shadow-sm transition-all flex items-center justify-between group"
              >
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-primary text-sm">
                    General Nigeria to UK Export Guide
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Personal luggage, electronics, fashion &amp; documents.
                  </p>
                </div>
                <span className="text-primary font-bold text-sm">→</span>
              </Link>
              <Link
                href="/blog/how-to-export-goods-from-nigeria-to-the-uk-complete-guide"
                className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-primary hover:shadow-sm transition-all flex items-center justify-between group"
              >
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-primary text-sm">
                    Commercial Agro-Export Guide
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    NEPC registration, Form NXP, and DCTS zero tariffs.
                  </p>
                </div>
                <span className="text-primary font-bold text-sm">→</span>
              </Link>
            </div>

            {/* Permitted Foodstuffs Table */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" /> Permitted Nigerian Foodstuffs for UK Export
              </h2>
              <p className="text-gray-700 mt-2 text-sm sm:text-base">
                The UK Department for Environment, Food &amp; Rural Affairs (DEFRA) and UK Port Health allow dry, non-perishable plant products and fully processed dried seafood when prepared according to standard hygiene controls:
              </p>

              <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-100 text-secondary uppercase text-xs font-bold border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3">Food Item</th>
                      <th className="px-4 py-3">Packaging &amp; Condition Requirement</th>
                      <th className="px-4 py-3">UK Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {permittedFoods.map((food, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/80">
                        <td className="px-4 py-3 font-semibold text-secondary whitespace-nowrap">
                          {food.name}
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-xs sm:text-sm">
                          {food.condition}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                            {food.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Prohibited Foods Warning Callout */}
            <div className="p-6 bg-red-50 border-2 border-red-200 rounded-2xl not-prose space-y-4">
              <h3 className="text-xl font-bold text-red-950 flex items-center gap-2">
                <Ban className="w-5 h-5 text-red-600" /> Strictly Prohibited Food Items (Do Not Pack!)
              </h3>
              <p className="text-sm text-red-900 leading-relaxed">
                UK Border Force and Port Health authorities enforce strict biological security checks at London Heathrow, Manchester, and all international entry points. The following goods will be confiscated and destroyed immediately:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {prohibitedFoods.map((item, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-red-200">
                    <h4 className="font-bold text-red-950 text-sm flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" /> {item.item}
                    </h4>
                    <p className="text-xs text-red-800 mt-1 leading-relaxed">
                      {item.reason}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-red-700 italic">
                Important note on beans: Personal luggage containing brown beans, honey beans, or cowpeas from Nigeria is routinely intercepted. If you require commercial legume exports, contact our compliance team for mandatory NAFDAC laboratory export certification.
              </p>
            </div>

            {/* Vacuum Sealing and Packaging Protocol */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" /> The County Cargo Food Packaging Standard
              </h2>
              <p className="text-gray-700 text-sm sm:text-base">
                Improper packaging is the single greatest reason food parcels face delays, odor complaints by airlines, or rejection by UK Port Health. We enforce a four-step packaging protocol:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose mt-4">
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mb-3">1</span>
                  <h3 className="font-bold text-secondary text-base mb-1">Total Moisture Elimination</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Food items must be sun-dried or oven-baked until completely crisp. Damp fish or soft snails will ferment inside cargo holds, causing container bloating and bacterial spoilage.
                  </p>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mb-3">2</span>
                  <h3 className="font-bold text-secondary text-base mb-1">Industrial Vacuum Sealing</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    All dried fish, crayfish, spices, and garri must be placed inside heavy-gauge vacuum pouches and sealed using commercial vacuum sealers to eliminate 100% of air and aroma.
                  </p>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mb-3">3</span>
                  <h3 className="font-bold text-secondary text-base mb-1">Clear English Labeling</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Every bag must be clearly labeled with both its generic English description and African name (e.g. "Processed Dried Cassava Flakes - Garri"). This facilitates instant clearance by HMRC officers.
                  </p>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mb-3">4</span>
                  <h3 className="font-bold text-secondary text-base mb-1">Double-Walled Outer Cartons</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    All sealed food pouches are packed inside reinforced 5-ply corrugated export cartons or heavy-duty plastic shipping barrels, securely strapped and waterproofed.
                  </p>
                </div>
              </div>
            </div>

            {/* Transit Times & Service Levels */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
                Air Freight Transit Times for Food Export
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white inline-block mb-3">
                      Fastest Option
                    </span>
                    <h3 className="text-xl font-bold text-secondary">Express Food Courier</h3>
                    <p className="text-sm font-semibold text-primary mt-1 flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> 3 – 5 Working Days
                    </p>
                    <ul className="text-xs text-gray-700 mt-4 space-y-2 list-disc list-inside">
                      <li>1 kg minimum chargeable weight (ideal for urgent parcels)</li>
                      <li>Priority handling and fast-track customs clearance</li>
                      <li>Direct door-to-door courier delivery anywhere in the UK</li>
                      <li>Daily dispatch from Lagos (LOS) hub</li>
                    </ul>
                  </div>
                  <Button asChild className="mt-6 w-full bg-primary hover:bg-primary/90 text-white font-bold">
                    <Link href="/shipping-from-nigeria-to-uk">Book Express Food Cargo</Link>
                  </Button>
                </div>

                <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-700 text-white inline-block mb-3">
                      Best Value for Large Orders
                    </span>
                    <h3 className="text-xl font-bold text-secondary">Standard Consolidated Food Cargo</h3>
                    <p className="text-sm font-semibold text-secondary mt-1 flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> 5 – 7 Working Days
                    </p>
                    <ul className="text-xs text-gray-700 mt-4 space-y-2 list-disc list-inside">
                      <li>10kg minimum weight requirement</li>
                      <li>Most economical per-kg freight rate for personal &amp; commercial shipments</li>
                      <li>Collection available at our Liverpool Depot (L1 0BG) or UK door delivery</li>
                      <li>Weekly Friday consolidation flights</li>
                    </ul>
                  </div>
                  <Button asChild variant="outline" className="mt-6 w-full border-primary text-primary hover:bg-primary/10 font-bold">
                    <Link href="/shipping-from-nigeria-to-uk">Book Standard Food Cargo</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Drop-off & UK Delivery Hubs */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl not-prose space-y-4">
              <h3 className="text-xl font-bold text-secondary flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Where to Drop Off Food &amp; How It Reaches the UK
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">🇳🇬 Nigeria Drop-off &amp; Sealing Hubs</h4>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    <strong>Lagos Main Depot:</strong> Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos.<br />
                    <strong>Abuja Office:</strong> Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market, Abuja.<br />
                    <strong>Pickup Service:</strong> We arrange courier pickup from your home or farm across Lagos, Ibadan, Port Harcourt, and Benin City.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">🇬🇧 UK Receiving Depot &amp; Delivery</h4>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    <strong>UK Warehouse:</strong> Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG.<br />
                    <strong>Door Delivery:</strong> Nationwide dispatch via tracked courier to London, Manchester, Birmingham, Coventry, Leeds, Glasgow, and all mainland UK addresses.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div className="p-6 bg-emerald-900 text-white rounded-2xl text-center space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold">Ready to Ship Foodstuffs from Nigeria to the UK?</h3>
              <p className="text-sm text-emerald-100 max-w-xl mx-auto">
                Get an instant quote, advice on permitted foods, and professional vacuum packaging from our logistics team.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Button asChild className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                  <Link href="/shipping-from-nigeria-to-uk">Get a Shipping Quote</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 font-bold">
                  <a
                    href="https://wa.me/2348110000421?text=Hello%20County%20Cargo%2C%20I%20want%20to%20export%20foodstuffs%20from%20Nigeria%20to%20the%20UK"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp Food Freight Team
                  </a>
                </Button>
              </div>
            </div>

            <SocialShare title="Export Food From Nigeria to the UK in 2026 | DEFRA & Port Health Guide" />

            <RelatedGuides currentHref="/export-food-from-nigeria-to-uk" />
          </div>
        </article>

        {/* FAQs Section */}
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions: Nigerian Food Export to UK</h2>
            </div>
            <Accordion type="single" collapsible className="w-full bg-white rounded-xl border border-gray-200 p-4 shadow-2xs">
              {foodFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold text-secondary hover:text-primary text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 text-sm leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
