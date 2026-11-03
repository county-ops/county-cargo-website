/**
 * County Cargo Automated Daily Blog Publisher
 *
 * Implements automated publishing of two County Cargo blog articles daily using the
 * agreed Monday-start weekly rotation anchored to 2 November 2026:
 *   Week 0 (starts Mon Nov 2, 2026): Nigeria Exports
 *   Week 1 (starts Mon Nov 9, 2026): UK Cities
 *   Week 2 (starts Mon Nov 16, 2026): US Cities
 *   (Cycles every 3 weeks)
 *
 * Daily Slots (Europe/London time):
 *   Slot 1: Morning In-Depth Shipping & Compliance Guide (09:00 Europe/London)
 *   Slot 2: Afternoon Logistics, Packaging & Forwarding Guide (15:00 Europe/London)
 *
 * Key Capabilities:
 * 1. Monday-start weekly rotation calculation anchored to 2 November 2026.
 * 2. Europe/London timezone checking (maintains 09:00 & 15:00 through GMT/BST clock changes).
 * 3. Compares against all existing articles (local blog-posts.json + Firestore collection).
 * 4. OpenAI API article generation with verified rates, hubs, and negative constraint enforcement.
 * 5. Strict live verification (fails if HTTP status != 200 or expected content is missing).
 * 6. Discontinued 48-hour express and unverified claims are strictly removed.
 */

const https = require('https');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// 1. Anchor Configuration: Monday, 2 November 2026
const ANCHOR_DATE_STR = '2026-11-02';
const ANCHOR_MONDAY = new Date('2026-11-02T00:00:00Z');

// 2. Official Verified Rates & Hubs Source of Truth
// Note: Discontinued 48-hour special express is removed completely.
const OFFICIAL_DATA = {
  TIMEFRAMES: {
    STANDARD_AIR: '5–10 working days',
    EXPRESS_AIR: '3–5 working days',
    SEA_CARGO: '4 to 8 weeks',
  },
  RATES: {
    NIGERIA_TO_UK_VALUE: '₦10,500/kg (10kg minimum, 5–10 working days)',
    NIGERIA_TO_USA_VALUE_LAGOS: '₦16,000/kg (10kg minimum, 5–10 working days)',
    NIGERIA_TO_USA_VALUE_ABUJA: '₦17,000/kg (10kg minimum, 5–10 working days)',
    EXPRESS_COURIER_WORLDWIDE: '₦55,000/kg (1kg minimum, 3–5 working days)',
    UK_TO_NIGERIA_STANDARD_AIR: '£6.50/kg (5–10 working days)',
    SEA_FREIGHT_BARRELS: '55-gallon polyethylene shipping drums (4–8 weeks to Lagos ports)',
  },
  HUBS: {
    LAGOS: 'Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos',
    ABUJA: "Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market, Abuja-FCT",
    LIVERPOOL: 'Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG',
    LONDON: 'Charlton receiving depot & Greater London collection service',
    TEXAS: 'Suite 508, 500 S Belt Line Rd, Irving, TX 75060, United States',
  },
  URLS: {
    CALCULATOR: 'https://ship.countycargo.com/shipping-calculator',
    CONTACT: 'https://countycargo.com/contact',
  },
};

// 3. Weekly Pillar Blueprints (7 days x 2 slots per pillar)
const PILLAR_BLUEPRINTS = [
  // Pillar 0: Nigeria Exports (Week 0)
  {
    name: 'Nigeria Exports',
    category: 'Export Services',
    days: [
      // Monday (Day index 0)
      {
        dayName: 'Monday',
        slot1: {
          title: 'Exporting Dried Foodstuffs from Nigeria to the UK: DEFRA Inspection Guidelines & Vacuum Packaging Standards',
          slug: 'exporting-dried-foodstuffs-nigeria-to-uk-defra-guidelines',
          focus: 'DEFRA sanitary inspections, permissible dried herbs and spices, moisture threshold, vacuum sealing, and Value air cargo from ₦10,500/kg to UK doorsteps.',
          tags: ['Nigeria to UK', 'Foodstuff Export', 'DEFRA Regulations', 'Air Freight Lagos', 'Abuja Cargo'],
        },
        slot2: {
          title: 'Dropping Off Export Cargo in Lagos & Abuja: Receiving Protocols at Ladipo-Oshodi and Wuye Market Hubs',
          slug: 'dropping-off-export-cargo-lagos-abuja-receiving-protocols',
          focus: 'Drop-off procedures at Suite F8 Magnet Plaza Lagos and Shop HF426 Wuye Market Abuja, package weighing, volumetric calculations, and dispatch tracking.',
          tags: ['Lagos Drop-off', 'Abuja Drop-off', 'Packaging Protocols', 'Ladipo Oshodi', 'Wuye Market'],
        },
      },
      // Tuesday (Day index 1)
      {
        dayName: 'Tuesday',
        slot1: {
          title: 'Commercial Agricultural Commodities Air Freight from Nigeria: NEPC Registration, NXP Forms & Clean Cargo Consolidation',
          slug: 'commercial-agricultural-commodities-air-freight-nigeria-nepc-guide',
          focus: 'Commercial export protocols for sesame, cashew, cocoa, and ginger: NEPC electronic registration, NXP e-form, phytosanitary certifications, and scheduled consolidations.',
          tags: ['Commercial Export', 'NEPC Registration', 'NXP Form', 'Agricultural Commodities', 'Lagos Freight'],
        },
        slot2: {
          title: 'Air Cargo Packaging Standards: Double-Wall Corrugation & Moisture Barrier Protection for Nigerian Exports',
          slug: 'air-cargo-packaging-standards-moisture-barrier-nigerian-exports',
          focus: 'Preventing handling damage and customs rejections: double-wall heavy cartons, food-grade poly liners, tamper-evident security taping, and clear address labelling.',
          tags: ['Cargo Packaging', 'Moisture Barrier', 'Export Security', 'Air Cargo Guidelines', 'Damage Prevention'],
        },
      },
      // Wednesday (Day index 2)
      {
        dayName: 'Wednesday',
        slot1: {
          title: 'Direct Air Cargo from Lagos & Abuja to Irving Texas: Transatlantic Consolidation & Clearance Times',
          slug: 'air-cargo-lagos-abuja-to-irving-texas-consolidation-times',
          focus: 'Transatlantic air route from MMIA Lagos to Irving TX hub (500 S Belt Line Rd): 5–10 working day transit, rates from ₦16,000/kg, and US customs procedures.',
          tags: ['Nigeria to USA', 'Texas Hub', 'Irving Warehouse', 'Air Cargo USA', 'Transatlantic Freight'],
        },
        slot2: {
          title: 'Volumetric vs Gross Weight Explained: How to Optimize Air Cargo Shipping Costs from Nigeria',
          slug: 'volumetric-vs-gross-weight-optimize-air-cargo-nigeria',
          focus: 'Understanding the IATA dimensional weight divisor (L x W x H in cm / 5000), reducing empty box volume, vacuum packing textiles, and calculating billable weight.',
          tags: ['Volumetric Weight', 'Shipping Costs', 'Air Freight Calculation', 'Logistics Guide', 'Packaging Optimization'],
        },
      },
      // Thursday (Day index 3)
      {
        dayName: 'Thursday',
        slot1: {
          title: 'Exporting Nigerian Fashion, Textiles & Aso-Oke to the UK and USA: Customs Codes and Commercial Invoicing',
          slug: 'exporting-nigerian-fashion-textiles-aso-oke-customs-guide',
          focus: 'Exporting ready-to-wear clothing, ankara prints, and traditional aso-oke: HS tariff classification, commercial invoice preparation, and UK/US clearance.',
          tags: ['Fashion Export', 'Textile Shipping', 'Aso-Oke Export', 'Customs Invoicing', 'Nigeria to UK'],
        },
        slot2: {
          title: 'Value Air Cargo vs Express Courier from Nigeria: Transit Speeds, Weight Thresholds and Cost Comparison',
          slug: 'value-air-cargo-vs-express-courier-nigeria-cost-comparison',
          focus: 'Comparing Value Air Cargo (₦10,500–₦16,000/kg, 5–10 working days, 10kg min) against Express Courier (₦55,000/kg, 3–5 working days, 1kg min) for urgent freight.',
          tags: ['Value Air Cargo', 'Express Courier', 'Transit Times', 'Shipping Comparison', 'Nigeria Export Rates'],
        },
      },
      // Friday (Day index 4)
      {
        dayName: 'Friday',
        slot1: {
          title: 'Shipping Personal Effects and Relocation Cargo from Nigeria to the UK & USA: Customs Declaration Guide',
          slug: 'shipping-personal-effects-relocation-cargo-nigeria-customs-guide',
          focus: 'Transfer of residence and personal effects: packing household goods, ToR1 declarations for the UK, customs documentation, and door-to-door delivery.',
          tags: ['Personal Effects', 'Relocation Cargo', 'UK Customs ToR1', 'Nigeria to USA', 'Household Freight'],
        },
        slot2: {
          title: 'Weekend Export Drop-Off Schedules & Cut-Off Windows at County Cargo Lagos and Abuja Hubs',
          slug: 'weekend-export-drop-off-schedules-lagos-abuja-hubs',
          focus: 'Operational operating hours, receiving cut-offs for upcoming flight manifests, security screening, and same-day receipt issuance in Lagos and Abuja.',
          tags: ['Lagos Receiving', 'Abuja Hub', 'Flight Cut-off', 'Drop-off Hours', 'Logistics Operations'],
        },
      },
      // Saturday (Day index 5)
      {
        dayName: 'Saturday',
        slot1: {
          title: 'Exporting Handcrafted Wood Carvings and Cultural Art from Nigeria: Forestry Clearances and Wooden Packaging Rules',
          slug: 'exporting-handcrafted-wood-carvings-cultural-art-nigeria-regulations',
          focus: 'Regulatory approvals for wooden artworks: forestry clearance certificates, museum documentation, ISPM 15 compliance, and cushioned crate packing.',
          tags: ['Art Export', 'Wood Carvings', 'Cultural Goods', 'ISPM 15', 'Export Regulations'],
        },
        slot2: {
          title: 'Mastering the Nigerian Export Electronic Manifest: NXP Form Tracking and Bank Endorsements',
          slug: 'mastering-nigerian-export-electronic-manifest-nxp-tracking',
          focus: 'Step-by-step navigation of the Nigeria Single Window Trade Portal, authorized dealer bank endorsements, and matching shipping documents.',
          tags: ['NXP Tracking', 'Trade Portal', 'Bank Endorsement', 'Export Documentation', 'Trade Compliance'],
        },
      },
      // Sunday (Day index 6)
      {
        dayName: 'Sunday',
        slot1: {
          title: 'Weekly Consolidation Flight Schedules: Dispatch Windows from Lagos MMIA to London & Texas',
          slug: 'weekly-consolidation-flight-schedules-lagos-london-texas',
          focus: 'Understanding County Cargo weekly flight rotations, airport security screening at MMIA cargo village, and tracking flight departures to destination hubs.',
          tags: ['Flight Schedules', 'Consolidation Windows', 'MMIA Lagos', 'Air Freight Tracking', 'International Cargo'],
        },
        slot2: {
          title: 'End-to-End Milestone Tracking: From Drop-Off in Nigeria to Final Doorstep Delivery in UK & US',
          slug: 'end-to-end-milestone-tracking-nigeria-uk-usa-cargo',
          focus: 'Digital tracking transparency: intake weighing, flight departure, customs clearance at arrival airport, depot sortation, and local courier courier dispatch.',
          tags: ['Milestone Tracking', 'Cargo Transparency', 'Doorstep Delivery', 'Courier Tracking', 'Supply Chain'],
        },
      },
    ],
  },

  // Pillar 1: UK Cities (Week 1)
  {
    name: 'UK Cities',
    category: 'UK to Nigeria',
    days: [
      // Monday
      {
        dayName: 'Monday',
        slot1: {
          title: 'Shipping from London (Charlton Depot & Greater London) to Lagos & Abuja: Rates and Weekly Flights',
          slug: 'shipping-cargo-london-charlton-to-lagos-abuja-rates',
          focus: 'London receiving operations at Charlton depot, Greater London doorstep parcel collections, weekly air cargo consolidations (£6.50/kg), and customs clearance in Nigeria.',
          tags: ['London to Nigeria', 'Charlton Depot', 'Greater London Collection', 'Air Cargo Lagos', 'Abuja Delivery'],
        },
        slot2: {
          title: 'Packing 55-Gallon Polyethylene Barrels in the UK: Securing Heavy-Duty Drums for Ocean Transit to Nigeria',
          slug: 'packing-55-gallon-polyethylene-barrels-uk-to-nigeria',
          focus: 'Step-by-step barrel preparation: durable HDPE barrels, inner plastic lining, weight balance, liquid item restrictions, metal clamp sealing, and 4–8 week ocean transit.',
          tags: ['Shipping Barrels', 'UK to Nigeria Sea Freight', 'Ocean Barrels', 'Packing Checklist', 'Lagos Ports'],
        },
      },
      // Tuesday
      {
        dayName: 'Tuesday',
        slot1: {
          title: 'Shipping Cargo from Liverpool & Merseyside to Nigeria: Free Depot Receiving at Queens Dock Commercial Centre',
          slug: 'shipping-cargo-liverpool-merseyside-to-nigeria-queens-dock',
          focus: 'Depot operations at Unit G6 Queens Dock Commercial Centre, 67–83 Norfolk St Liverpool L1 0BG: free parcel receiving, air cargo, and ocean barrel bookings.',
          tags: ['Liverpool Depot', 'Queens Dock', 'Merseyside Cargo', 'UK to Lagos', 'Air Freight'],
        },
        slot2: {
          title: 'Shop UK Online Retailers and Forward to Nigeria: Using the County Cargo Liverpool Depot Suite',
          slug: 'shop-uk-online-retailers-forward-to-nigeria-liverpool-depot',
          focus: 'Shopping Amazon UK, ASOS, Currys, and eBay: ordering to your dedicated suite at Queens Dock Liverpool, multi-package consolidation, and air forwarding to Nigeria.',
          tags: ['UK Parcel Forwarding', 'Shop UK Online', 'Amazon UK to Nigeria', 'Liverpool Hub', 'Package Consolidation'],
        },
      },
      // Wednesday
      {
        dayName: 'Wednesday',
        slot1: {
          title: 'Shipping from Manchester, Salford & Bolton to Nigeria: Weekly Regional Collections and Air Cargo Consolidation',
          slug: 'shipping-cargo-manchester-salford-bolton-to-nigeria',
          focus: 'Greater Manchester shipping options: arranging regional courier drop-offs, scheduled pickups across M postcodes, and fast dispatch to Lagos and Abuja.',
          tags: ['Manchester to Nigeria', 'Salford Shipping', 'Bolton Cargo', 'Air Freight UK', 'Nigeria Delivery'],
        },
        slot2: {
          title: 'Commercial Air Freight from UK Businesses to Nigerian Enterprises: Invoicing & Import Documentation',
          slug: 'commercial-air-freight-uk-businesses-to-nigeria-documentation',
          focus: 'B2B air cargo: commercial invoices, packing lists, Nigerian Form M compliance guidance, and seamless clearing at MMIA Lagos.',
          tags: ['B2B Cargo', 'Commercial Shipping', 'Form M Guidance', 'UK to Nigeria Trade', 'Air Consolidation'],
        },
      },
      // Thursday
      {
        dayName: 'Thursday',
        slot1: {
          title: 'Shipping from Leeds, Bradford & West Yorkshire to Nigeria: Regional Logistics and Fast Air Despatch',
          slug: 'shipping-cargo-leeds-bradford-west-yorkshire-to-nigeria',
          focus: 'Yorkshire cargo routes: drop-off coordination, freight consolidation via our Liverpool terminal, and 5–10 working day delivery to Nigerian destinations.',
          tags: ['Leeds to Nigeria', 'Bradford Cargo', 'West Yorkshire Shipping', 'Air Freight', 'Doorstep Delivery'],
        },
        slot2: {
          title: 'Shipping Electronics and Fragile Appliances from the UK to Nigeria: Anti-Static Packaging & Cushioning',
          slug: 'shipping-electronics-fragile-appliances-uk-to-nigeria-packaging',
          focus: 'Protecting computers, screens, and audio equipment: anti-static bubble wrap, double-boxing, corner protectors, and air freight handling standards.',
          tags: ['Electronics Shipping', 'Fragile Packaging', 'Appliance Cargo', 'UK to Lagos', 'Safe Transit'],
        },
      },
      // Friday
      {
        dayName: 'Friday',
        slot1: {
          title: 'Shipping from Birmingham & the West Midlands to Nigeria: Central England Consolidation & Doorstep Delivery',
          slug: 'shipping-cargo-birmingham-west-midlands-to-nigeria',
          focus: 'Midlands freight services: connecting Birmingham, Wolverhampton, and Coventry to our nationwide network with regular flights to Lagos and Abuja.',
          tags: ['Birmingham to Nigeria', 'West Midlands Cargo', 'Coventry Shipping', 'Air Freight', 'Nigeria Logistics'],
        },
        slot2: {
          title: 'How UK Senders Can Track Shipments to Nigeria: Step-by-Step Waybill Status Verification',
          slug: 'how-uk-senders-track-shipments-to-nigeria-waybill-guide',
          focus: 'Using County Cargo tracking tools, understanding flight departure notifications, customs status in Lagos, and recipient confirmation on arrival.',
          tags: ['UK Shipment Tracking', 'Waybill Verification', 'Status Updates', 'Doorstep Delivery', 'Cargo Transparency'],
        },
      },
      // Saturday
      {
        dayName: 'Saturday',
        slot1: {
          title: 'Shipping from Scotland & Wales to Nigeria: Glasgow, Edinburgh & Cardiff Freight Routes',
          slug: 'shipping-cargo-scotland-wales-glasgow-cardiff-to-nigeria',
          focus: 'Connecting Scottish and Welsh senders: domestic courier connections to our Liverpool terminal, air cargo rates, and ocean freight barrels.',
          tags: ['Scotland to Nigeria', 'Wales Shipping', 'Glasgow Cargo', 'Cardiff Freight', 'UK Logistics'],
        },
        slot2: {
          title: 'Ocean Barrel vs Air Cargo from the UK: Which Option Offers Better Value for Your Cargo Volume?',
          slug: 'ocean-barrel-vs-air-cargo-uk-to-nigeria-comparison',
          focus: 'Detailed cost-volume breakdown: when to choose 55-gallon ocean drums (bulk goods, non-perishables, 4–8 weeks) vs air cargo (£6.50/kg, 5–10 days).',
          tags: ['Ocean Barrel', 'Air Cargo Comparison', 'UK to Nigeria Rates', 'Bulk Freight', 'Transit Times'],
        },
      },
      // Sunday
      {
        dayName: 'Sunday',
        slot1: {
          title: 'UK to Nigeria Seasonal Freight Planning: Booking Ahead for Peak Consolidation Flights',
          slug: 'uk-to-nigeria-seasonal-freight-planning-peak-flights',
          focus: 'Planning shipments ahead of seasonal rushes: booking cut-offs, flight space allocation, packaging supplies, and avoiding destination port bottlenecks.',
          tags: ['Seasonal Shipping', 'Peak Freight Planning', 'Flight Schedules', 'UK to Nigeria', 'Logistics Strategy'],
        },
        slot2: {
          title: 'Clearing and Delivering Cargo Across Nigeria: Last-Mile Distribution from Lagos & Abuja Hubs',
          slug: 'clearing-and-delivering-cargo-across-nigeria-last-mile',
          focus: 'How County Cargo manages domestic logistics inside Nigeria: clearance at MMIA, secured warehousing, and insured transit to Port Harcourt, Ibadan, Enugu, and Kano.',
          tags: ['Last-Mile Delivery', 'Domestic Logistics', 'Lagos Abuja Distribution', 'Doorstep Delivery', 'Nigeria Transport'],
        },
      },
    ],
  },

  // Pillar 2: US Cities (Week 2)
  {
    name: 'US Cities',
    category: 'USA to Nigeria',
    days: [
      // Monday
      {
        dayName: 'Monday',
        slot1: {
          title: 'Shipping Cargo from Texas (Irving Hub) to Nigeria: Transatlantic Air Freight Schedules 2026',
          slug: 'shipping-cargo-texas-irving-hub-to-nigeria-schedules',
          focus: 'Texas hub operations at Suite 508, 500 S Belt Line Rd, Irving TX 75060: direct transatlantic air consolidations, 5–10 working day delivery to Lagos & Abuja.',
          tags: ['Texas to Nigeria', 'Irving Warehouse', 'Dallas Houston Cargo', 'Air Freight USA', 'Nigeria Delivery'],
        },
        slot2: {
          title: 'Packing 55-Gallon Shipping Barrels from the USA to Nigeria: Sealing, Weight Distribution & Port Transit',
          slug: 'packing-shipping-barrels-usa-to-nigeria-guidelines',
          focus: 'Detailed barrel packaging checklist: HDPE drums, heavy bottom packing, preventing liquid leaks, heavy-duty clamp seals, and 4–8 week ocean transit to Lagos.',
          tags: ['Shipping Barrels', 'USA to Nigeria Barrels', 'Ocean Container', 'Packing Guide', 'Lagos Sea Freight'],
        },
      },
      // Tuesday
      {
        dayName: 'Tuesday',
        slot1: {
          title: 'Shipping Cargo from Houston & Dallas to Lagos & Abuja: Texas Regional Logistics & Drop-Off Options',
          slug: 'shipping-cargo-houston-dallas-to-lagos-abuja-texas',
          focus: 'DFW and Houston shipping solutions: dropping off at Irving TX or scheduling regional courier pickups, air cargo rates, and fast Nigerian delivery.',
          tags: ['Houston to Nigeria', 'Dallas Cargo', 'Texas Shipping', 'Air Freight USA', 'Nigeria Logistics'],
        },
        slot2: {
          title: 'Shop USA Online Stores from Nigeria: Forwarding Amazon, Walmart & Best Buy Purchases via Texas Hub',
          slug: 'shop-usa-online-stores-forward-via-texas-hub',
          focus: 'Using your County Cargo Irving TX warehouse suite for online orders: package inspection, consolidation, repacking to reduce volume, and flying to Nigeria.',
          tags: ['Shop USA Online', 'Amazon USA to Nigeria', 'Walmart Forwarding', 'Texas Hub', 'Online Shopping USA'],
        },
      },
      // Wednesday
      {
        dayName: 'Wednesday',
        slot1: {
          title: 'Shipping Cargo from Atlanta & Georgia to Nigeria: Air Freight Consolidation & Doorstep Delivery',
          slug: 'shipping-cargo-atlanta-georgia-to-nigeria-air-freight',
          focus: 'Connecting Atlanta and the Southeast to Nigeria: regional consolidation, scheduled air freight to Lagos and Abuja, and transparent door-to-door tracking.',
          tags: ['Atlanta to Nigeria', 'Georgia Cargo', 'Southeast Air Freight', 'Lagos Delivery', 'USA to Nigeria'],
        },
        slot2: {
          title: 'Understanding US Export Customs Clearances: AES Filing & Commercial Invoices for Nigeria-Bound Shipments',
          slug: 'us-export-customs-clearances-aes-filing-commercial-invoices',
          focus: 'Navigating US automated export system (AES) requirements, commercial invoices for B2B cargo, declarations for electronics, and avoiding port holds.',
          tags: ['AES Filing', 'US Export Regulations', 'Commercial Invoices', 'Customs Compliance', 'Freight Forwarding'],
        },
      },
      // Thursday
      {
        dayName: 'Thursday',
        slot1: {
          title: 'Shipping Cargo from Chicago & the Midwest to Nigeria: Illinois Consolidation and Scheduled Air Cargo',
          slug: 'shipping-cargo-chicago-midwest-to-nigeria-consolidation',
          focus: 'Midwestern shippers guide: domestic courier forwarding to our Texas hub, consolidated flights, and delivery across Nigerian states.',
          tags: ['Chicago to Nigeria', 'Midwest Cargo', 'Illinois Shipping', 'Air Freight USA', 'Nigeria Delivery'],
        },
        slot2: {
          title: 'Air Freight vs Ocean Container Barrels from the USA: Selecting the Right Transit Speed & Budget',
          slug: 'air-freight-vs-ocean-barrels-usa-to-nigeria-transit-budget',
          focus: 'Comparing air freight (5–10 working days, time-critical boxes) against 55-gallon ocean drums (4–8 weeks, budget-friendly bulk freight) to Lagos ports.',
          tags: ['Air Freight vs Barrels', 'USA to Nigeria Comparison', 'Shipping Transit Times', 'Ocean Freight', 'Cargo Budget'],
        },
      },
      // Friday
      {
        dayName: 'Friday',
        slot1: {
          title: 'Shipping Cargo from New York, New Jersey & East Coast to Nigeria: Scheduled Transatlantic Air Cargo',
          slug: 'shipping-cargo-new-york-new-jersey-east-coast-to-nigeria',
          focus: 'Tri-state area shipping: connecting NYC, Newark, and Philadelphia to our nationwide forwarding network with seamless customs clearance in Nigeria.',
          tags: ['New York to Nigeria', 'New Jersey Cargo', 'East Coast Shipping', 'Air Freight USA', 'Nigeria Logistics'],
        },
        slot2: {
          title: 'Shipping Laptops, Phones & Industrial Equipment from the USA: Lithium Battery Regulations and Secure Packaging',
          slug: 'shipping-laptops-industrial-equipment-usa-lithium-regulations',
          focus: 'Safe transportation of tech devices: Section II lithium battery compliance, reinforced cushioning, insured transit, and tamper-evident packaging.',
          tags: ['Lithium Batteries', 'Electronics Shipping', 'Tech Cargo', 'Packaging Standards', 'USA to Lagos'],
        },
      },
      // Saturday
      {
        dayName: 'Saturday',
        slot1: {
          title: 'Shipping Cargo from California & the West Coast (Los Angeles & Bay Area) to Nigeria: Forwarding Strategies',
          slug: 'shipping-cargo-california-west-coast-los-angeles-to-nigeria',
          focus: 'West Coast logistics: forwarding from Los Angeles, San Francisco, and San Diego via domestic courier to our Texas hub for direct transatlantic departure.',
          tags: ['California to Nigeria', 'Los Angeles Cargo', 'Bay Area Shipping', 'West Coast Freight', 'USA to Nigeria'],
        },
        slot2: {
          title: 'Commercial Supply Chain Consolidation for US Retailers Supplying the Nigerian Market',
          slug: 'commercial-supply-chain-consolidation-us-retailers-nigeria',
          focus: 'B2B consolidation services: bulk warehousing in Texas, palletization, multi-vendor manifest combination, and customs brokering in Lagos.',
          tags: ['B2B Consolidation', 'Retail Supply Chain', 'Texas Warehousing', 'Pallet Freight', 'Trade USA Nigeria'],
        },
      },
      // Sunday
      {
        dayName: 'Sunday',
        slot1: {
          title: 'Transatlantic Air Cargo Tracking: From Texas Intake to Nigerian Doorstep Handover',
          slug: 'transatlantic-air-cargo-tracking-texas-to-nigeria-doorstep',
          focus: 'Detailed tracking visibility: Texas warehouse arrival, TSA screening, flight departure, customs release at MMIA Lagos, and regional dispatch.',
          tags: ['Air Cargo Tracking', 'Transatlantic Freight', 'Doorstep Delivery', 'Logistics Transparency', 'County Cargo Texas'],
        },
        slot2: {
          title: 'Preparing for Year-End & Seasonal Transatlantic Cargo Rushes: Cut-Off Dates & Booking Guidance',
          slug: 'preparing-year-end-transatlantic-cargo-rushes-cut-off-dates',
          focus: 'Managing transatlantic holiday freight: cut-off dates for barrels vs air cargo, securing cargo space, and ensuring guaranteed delivery in Nigeria.',
          tags: ['Seasonal Transatlantic Cargo', 'Peak Shipping USA', 'Holiday Cut-offs', 'Freight Planning', 'Ocean & Air Freight'],
        },
      },
    ],
  },
];

/**
 * Extract date and hour in the Europe/London timezone
 */
function getLondonTime(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(d);
  const map = {};
  for (const part of parts) {
    map[part.type] = part.value;
  }

  const year = parseInt(map.year, 10);
  const month = parseInt(map.month, 10);
  const day = parseInt(map.day, 10);
  const hour = parseInt(map.hour, 10);
  const minute = parseInt(map.minute, 10);
  const dateStr = `${map.year}-${map.month}-${map.day}`;

  // Find Monday of the current week (Monday-start)
  // In UTC day: 0=Sun, 1=Mon, ..., 6=Sat
  const utcDate = new Date(Date.UTC(year, month - 1, day));
  const dayOfWeek = (utcDate.getUTCDay() + 6) % 7; // 0=Mon, 1=Tue, ..., 6=Sun
  const mondayUtc = new Date(utcDate.getTime() - dayOfWeek * 86400000);

  return {
    year,
    month,
    day,
    hour,
    minute,
    dateStr,
    dayIndex: dayOfWeek,
    mondayUtc,
  };
}

/**
 * Deterministically compute the Monday-start weekly rotation topic
 *
 * Anchor: Monday, 2 November 2026 (Week 0: Nigeria Exports)
 * Week 1: UK Cities
 * Week 2: US Cities
 * Repeating every 3 weeks.
 */
function getScheduledTopic(targetDate = new Date(), requestedSlot = null) {
  const london = getLondonTime(targetDate);

  // Calculate week difference from anchor Monday (2026-11-02)
  const diffMs = london.mondayUtc.getTime() - ANCHOR_MONDAY.getTime();
  const weekDiff = Math.round(diffMs / (7 * 86400000));
  const pillarIndex = ((weekDiff % 3) + 3) % 3;

  const pillarData = PILLAR_BLUEPRINTS[pillarIndex];
  const dayBlueprint = pillarData.days[london.dayIndex];

  // Determine slot: use requestedSlot if provided, otherwise determine based on London hour
  let slot = 1;
  if (requestedSlot) {
    slot = parseInt(requestedSlot, 10);
  } else {
    slot = london.hour >= 13 ? 2 : 1;
  }

  const topicConfig = slot === 1 ? dayBlueprint.slot1 : dayBlueprint.slot2;

  return {
    ...topicConfig,
    pillar: pillarData.name,
    category: pillarData.category,
    dayName: dayBlueprint.dayName,
    targetDateStr: london.dateStr,
    londonHour: london.hour,
    slot,
    weekIndex: weekDiff,
  };
}

/**
 * HTTP/HTTPS Request Helper
 */
function makeRequest(targetUrl, options = {}, postData = null) {
  return new Promise((resolve, reject) => {
    const parsed = url.parse(targetUrl);
    const isHttps = parsed.protocol === 'https:';
    const client = isHttps ? https : http;

    const reqOptions = {
      hostname: parsed.hostname,
      port: parsed.port || (isHttps ? 443 : 80),
      path: parsed.path,
      method: options.method || 'GET',
      headers: options.headers || {},
    };

    const req = client.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    });

    req.on('error', reject);
    req.setTimeout(35000, () => {
      req.destroy();
      reject(new Error(`Request timed out after 35s to ${targetUrl}`));
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

/**
 * Load all existing articles to prevent duplicate topics or slugs:
 * 1. Reads local src/lib/blog-posts.json
 * 2. Fetches live custom articles from /api/admin/posts if apiKey is present
 */
async function loadAllExistingArticles(baseUrl, apiKey) {
  const existing = {
    slugs: new Set(),
    titles: new Set(),
    items: [],
  };

  // 1. Load local static core posts
  try {
    const jsonPath = path.resolve(__dirname, '../src/lib/blog-posts.json');
    if (fs.existsSync(jsonPath)) {
      const raw = fs.readFileSync(jsonPath, 'utf8');
      const corePosts = JSON.parse(raw);
      corePosts.forEach((p) => {
        const slug = (p.url || '').replace(/^\/blog\//, '').replace(/\/$/, '').toLowerCase();
        if (slug) existing.slugs.add(slug);
        if (p.title) existing.titles.add(p.title.trim().toLowerCase());
        existing.items.push({ title: p.title, slug, isCustom: false });
      });
    }
  } catch (err) {
    console.warn('[Publisher] Could not read local blog-posts.json:', err.message);
  }

  // 2. Fetch custom Firestore posts from live API
  if (baseUrl && apiKey) {
    try {
      const res = await makeRequest(`${baseUrl}/api/admin/posts`, {
        method: 'GET',
        headers: { 'x-admin-api-key': apiKey },
      });
      if (res.statusCode === 200) {
        const data = JSON.parse(res.body);
        if (data.customPosts && Array.isArray(data.customPosts)) {
          data.customPosts.forEach((p) => {
            const slug = (p.url || '').replace(/^\/blog\//, '').replace(/\/$/, '').toLowerCase();
            if (slug) existing.slugs.add(slug);
            if (p.title) existing.titles.add(p.title.trim().toLowerCase());
            existing.items.push({ title: p.title, slug, isCustom: true });
          });
        }
      }
    } catch (err) {
      console.warn('[Publisher] Could not fetch live custom posts:', err.message);
    }
  }

  return existing;
}

/**
 * Call OpenAI API to generate an original, deeply-researched article
 */
async function generateArticleWithOpenAI(topic, existingArticles, openaiApiKey) {
  const recentTitles = existingArticles.items.slice(0, 20).map((i) => `"${i.title}"`).join(', ');

  const systemPrompt = `You are a professional logistics journalist and senior freight operations director writing for County Cargo (countycargo.com).
Your mission is to produce authoritative, comprehensive, 100% original, and SEO-optimised shipping guides.

OFFICIAL COUNTY CARGO VERIFIED INFORMATION:
- Standard Air Cargo (5–10 working days):
  * Nigeria to UK: from ₦10,500/kg (10kg minimum)
  * Nigeria to USA: from ₦16,000/kg (Lagos, 10kg min) / ₦17,000/kg (Abuja, 10kg min)
  * UK to Nigeria: £6.50/kg
- Express Courier (Worldwide): ₦55,000/kg (1kg minimum, 3–5 working days)
- Ocean Barrels / Sea Freight: 55-gallon polyethylene shipping barrels (4–8 weeks transit to Lagos ports)
- Global Hubs & Warehouses:
  * Lagos Hub: ${OFFICIAL_DATA.HUBS.LAGOS}
  * Abuja Hub: ${OFFICIAL_DATA.HUBS.ABUJA}
  * Liverpool Hub: ${OFFICIAL_DATA.HUBS.LIVERPOOL}
  * London Depot: ${OFFICIAL_DATA.HUBS.LONDON}
  * Texas Warehouse: ${OFFICIAL_DATA.HUBS.TEXAS}
- Rate Calculator Link: ${OFFICIAL_DATA.URLS.CALCULATOR}

STRICT CONSTRAINTS:
1. NEVER mention or reference the discontinued "48-Hour Special Express" or "48-hour flight" service.
2. NEVER invent unverified rates, unrealistic claims, or unsupported services.
3. You must write an ORIGINAL article that does NOT duplicate any of the following recently published titles:
   [${recentTitles}]
4. Structure the article in clear, rich Markdown with:
   - Engaging introduction with real-world shipping context
   - Service tiers & verified rate table
   - Step-by-step packaging and regulatory checklist
   - Drop-off procedures with official hub addresses
   - Frequently Asked Questions (FAQ) section
   - Call to action pointing to the shipping calculator

Output valid JSON matching this exact structure:
{
  "title": "Article Title",
  "slug": "url-friendly-slug",
  "description": "150-160 character meta description",
  "tags": ["tag1", "tag2", "tag3"],
  "content": "Full markdown content"
}`;

  const userPrompt = `Write the daily shipping guide for County Cargo:
- Pillar: ${topic.pillar}
- Day of Week: ${topic.dayName}
- Slot: Slot ${topic.slot} (${topic.slot === 1 ? 'Morning 09:00 UK In-Depth Route Guide' : 'Afternoon 15:00 UK Logistics & Packaging Guide'})
- Assigned Focus: ${topic.focus}
- Suggested Title: ${topic.title}
- Target Date: ${topic.targetDateStr}

Ensure the article provides practical, actionable instructions for businesses and individuals shipping along this route.`;

  const payload = JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.7,
    response_format: { type: 'json_object' },
  });

  const res = await makeRequest(
    'https://api.openai.com/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'Authorization': `Bearer ${openaiApiKey}`,
      },
    },
    payload
  );

  if (res.statusCode !== 200) {
    throw new Error(`OpenAI API failed (HTTP ${res.statusCode}): ${res.body}`);
  }

  const completion = JSON.parse(res.body);
  const rawText = completion.choices?.[0]?.message?.content;
  if (!rawText) {
    throw new Error('OpenAI returned empty message content.');
  }

  const parsed = JSON.parse(rawText);
  return parsed;
}

/**
 * Deterministic fallback content generator when OpenAI API is not available
 * (e.g. during offline test execution)
 */
function generateFallbackArticle(topic) {
  const content = `## Overview: Reliable Cargo & Logistics Operations
County Cargo operates an international freight bridge connecting Nigeria, the United Kingdom, and the United States. Navigating international shipping requires transparent pricing, strict adherence to packaging standards, and experienced regulatory clearance.

This guide details the essential requirements for **${topic.title}**, providing verified route rates, hub receiving schedules, and customs procedures.

---

## Service Modes & Approved Delivery Timeframes
Depending on cargo urgency and package volume, shippers can select from the following verified services:

- **Standard Air Cargo (${OFFICIAL_DATA.TIMEFRAMES.STANDARD_AIR}):** Scheduled weekly consolidations for commercial merchandise, boxed cartons, and personal belongings.
- **Express Air Courier (${OFFICIAL_DATA.TIMEFRAMES.EXPRESS_AIR}):** Expedited priority shipping for critical documents, medical supplies, and high-value parcels.
- **Ocean Container Freight (${OFFICIAL_DATA.TIMEFRAMES.SEA_CARGO}):** Cost-effective bulk transport for 55-gallon plastic barrels, machinery, and consolidated crates.

### Current Verified Shipping Rates

| Route & Service | Minimum Weight | Standard Rate | Transit Timeline |
| --- | --- | --- | --- |
| **Nigeria to UK Air Cargo** | 10 kg | ${OFFICIAL_DATA.RATES.NIGERIA_TO_UK_VALUE} | ${OFFICIAL_DATA.TIMEFRAMES.STANDARD_AIR} |
| **Nigeria to USA Air Cargo** | 10 kg | ${OFFICIAL_DATA.RATES.NIGERIA_TO_USA_VALUE_LAGOS} | ${OFFICIAL_DATA.TIMEFRAMES.STANDARD_AIR} |
| **Express Courier (Worldwide)** | 1 kg | ${OFFICIAL_DATA.RATES.EXPRESS_COURIER_WORLDWIDE} | ${OFFICIAL_DATA.TIMEFRAMES.EXPRESS_AIR} |
| **UK to Nigeria Standard Air** | 1 kg | ${OFFICIAL_DATA.RATES.UK_TO_NIGERIA_STANDARD_AIR} | ${OFFICIAL_DATA.TIMEFRAMES.STANDARD_AIR} |
| **Ocean Barrels / Sea Freight** | 1 Barrel | ${OFFICIAL_DATA.RATES.SEA_FREIGHT_BARRELS} | ${OFFICIAL_DATA.TIMEFRAMES.SEA_CARGO} |

---

## Operational Logistics & Route Focus
${topic.focus}

### Recommended Packaging Standards
1. **Heavy-Duty Double-Wall Cartons:** Protect items against stacking pressure during transit.
2. **Moisture Barriers:** Ensure dried foodstuffs and delicate items are sealed with heavy poly liners.
3. **Weight Balancing:** Place dense items at the base and lighter items on top to avoid carton crushing.
4. **Tamper-Evident Security:** Apply reinforced packing tape along all box seams.

---

## Global Hub Receiving & Drop-Off Locations
Shipments can be dropped off directly at our dedicated warehouse locations:

- **Nigeria (Lagos):** ${OFFICIAL_DATA.HUBS.LAGOS}
- **Nigeria (Abuja):** ${OFFICIAL_DATA.HUBS.ABUJA}
- **United Kingdom (Liverpool):** ${OFFICIAL_DATA.HUBS.LIVERPOOL}
- **United Kingdom (London):** ${OFFICIAL_DATA.HUBS.LONDON}
- **United States (Texas):** ${OFFICIAL_DATA.HUBS.TEXAS}

---

## Frequently Asked Questions

### What are the cut-off times for weekly consolidation flights?
Parcels must be weighed, inspected, and processed at our Lagos, Abuja, Liverpool, or Texas depots at least 24 hours prior to scheduled flight departures.

### How do I track my shipment?
Each consignment is assigned a unique waybill number upon intake, allowing real-time tracking from flight departure to customs release and last-mile delivery.

---

## Calculate Shipping Rates & Book Online
Get an instant estimate for your package using our online shipping calculator:

[Calculate Your Instant Shipping Quote](${OFFICIAL_DATA.URLS.CALCULATOR})
`;

  return {
    title: topic.title,
    slug: topic.slug,
    description: `Complete guide on ${topic.title.toLowerCase()}. Learn verified shipping rates, packaging standards, and doorstep delivery with County Cargo.`,
    tags: topic.tags,
    content,
  };
}

/**
 * Main Publishing and Verification Routine
 */
async function publishDailyArticle(options = {}) {
  const targetDate = options.date ? new Date(options.date) : new Date();
  const baseUrl = options.baseUrl || process.env.SITE_URL || 'https://countycargo.com';
  const apiKey = options.apiKey || process.env.ADMIN_API_KEY;
  const openaiApiKey = options.openaiApiKey || process.env.OPENAI_API_KEY;

  const london = getLondonTime(targetDate);
  console.log(`[Publisher] Target Date: ${london.dateStr} | London Time: ${london.hour.toString().padStart(2, '0')}:${london.minute.toString().padStart(2, '0')} Europe/London`);

  // Check London time enforcement when running automatically (no explicit slot override)
  let requestedSlot = options.slot ? parseInt(options.slot, 10) : null;
  if (!requestedSlot && !options.force) {
    if (london.hour === 9) {
      requestedSlot = 1;
    } else if (london.hour === 15) {
      requestedSlot = 2;
    } else {
      console.log(`[Publisher] Current London time is ${london.hour}:00. Scheduled publishing slots are 09:00 (Slot 1) and 15:00 (Slot 2) Europe/London. Skipping.`);
      return { success: true, skipped: true, reason: `Outside publishing hours (current London hour: ${london.hour})` };
    }
  }

  const topic = getScheduledTopic(targetDate, requestedSlot || 1);
  console.log(`[Publisher] Week Rotation: Pillar "${topic.pillar}" (Week #${topic.weekIndex})`);
  console.log(`[Publisher] Day: ${topic.dayName} | Slot: ${topic.slot} | Topic: "${topic.title}"`);

  // 1. Check against ALL existing articles (local blog-posts.json + live Firestore)
  console.log(`[Publisher] Checking existing articles to avoid duplicates...`);
  const existing = await loadAllExistingArticles(baseUrl, apiKey);

  let finalSlug = topic.slug;
  if (existing.slugs.has(finalSlug.toLowerCase())) {
    console.log(`[Publisher] ℹ️ Article slug "${finalSlug}" already exists in library.`);
    // If the article is already live and published, check if live page returns 200 with title
    try {
      const checkRes = await makeRequest(`${baseUrl}/blog/${finalSlug}`, { method: 'GET' });
      if (checkRes.statusCode === 200 && checkRes.body.includes(topic.title)) {
        console.log(`[Publisher] ✅ Article is already live and verified on site: ${baseUrl}/blog/${finalSlug}. Skipping.`);
        return { success: true, skipped: true, postUrl: `${baseUrl}/blog/${finalSlug}` };
      }
    } catch (e) {
      // Ignore and proceed to create unique disambiguated slug
    }
    // Disambiguate slug with target date
    finalSlug = `${topic.slug}-${topic.targetDateStr}`;
    console.log(`[Publisher] Disambiguated slug to: ${finalSlug}`);
  }

  // 2. Generate Content: Use OpenAI if API key is present, otherwise fallback
  let articleData;
  if (openaiApiKey) {
    console.log(`[Publisher] Generating original, researched article via OpenAI (gpt-4o-mini)...`);
    try {
      articleData = await generateArticleWithOpenAI(topic, existing, openaiApiKey);
      if (!articleData.title || !articleData.content) {
        throw new Error('OpenAI returned invalid article payload.');
      }
    } catch (err) {
      console.warn(`[Publisher] OpenAI generation failed (${err.message}). Falling back to deterministic generator.`);
      articleData = generateFallbackArticle(topic);
    }
  } else {
    console.log(`[Publisher] No OPENAI_API_KEY provided. Using verified deterministic article template.`);
    articleData = generateFallbackArticle(topic);
  }

  // Use the verified slug
  articleData.slug = finalSlug;

  // 3. Authenticate and Publish via POST /api/admin/posts
  if (!apiKey) {
    throw new Error('ADMIN_API_KEY is required to publish articles to Firestore.');
  }

  const payload = JSON.stringify({
    title: articleData.title,
    slug: articleData.slug,
    category: topic.category,
    author: 'County Cargo Logistics Operations',
    publicationDate: topic.targetDateStr,
    tags: articleData.tags || topic.tags,
    description: articleData.description || topic.focus,
    image: '/cargo-plane-hero.png',
    content: articleData.content,
  });

  console.log(`[Publisher] Publishing article to ${baseUrl}/api/admin/posts...`);
  const publishRes = await makeRequest(
    `${baseUrl}/api/admin/posts`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'x-admin-api-key': apiKey,
      },
    },
    payload
  );

  let publishResult;
  try {
    publishResult = JSON.parse(publishRes.body);
  } catch (err) {
    throw new Error(`Failed to parse response (Status ${publishRes.statusCode}): ${publishRes.body}`);
  }

  if (!publishResult.success) {
    throw new Error(`Firestore publication failed (Status ${publishRes.statusCode}): ${publishResult.error || 'Unknown error'}`);
  }

  const postUrl = `${baseUrl}/blog/${articleData.slug}`;
  console.log(`[Publisher] ✅ Article published successfully to Firestore! Live URL: ${postUrl}`);

  // 4. Strict Live Verification: Check HTTP 200 AND verify expected title and content exist
  console.log(`[Publisher] Verifying live page at ${postUrl}...`);
  await new Promise((r) => setTimeout(r, 2000));

  const verifyRes = await makeRequest(postUrl, { method: 'GET' });
  if (verifyRes.statusCode !== 200) {
    throw new Error(`Verification failed: Expected HTTP 200 at ${postUrl}, got status ${verifyRes.statusCode}`);
  }

  // Verification must FAIL if expected content is missing
  if (!verifyRes.body.includes(articleData.title)) {
    throw new Error(`Verification failed: Expected article title "${articleData.title}" missing from live page content at ${postUrl}`);
  }

  console.log(`[Publisher] ✅ Live Verification Passed! HTTP 200 and expected content verified.`);
  return {
    success: true,
    postUrl,
    title: articleData.title,
    slug: articleData.slug,
    pillar: topic.pillar,
    slot: topic.slot,
  };
}

// CLI Execution Support
if (require.main === module) {
  const args = process.argv.slice(2);
  const dateArg = args.find((a) => a.startsWith('--date='))?.split('=')[1];
  const slotArg = args.find((a) => a.startsWith('--slot='))?.split('=')[1];
  const forceArg = args.includes('--force');

  publishDailyArticle({
    date: dateArg,
    slot: slotArg,
    force: forceArg,
  })
    .then((res) => {
      console.log('[Publisher] Execution Result:', JSON.stringify(res, null, 2));
      process.exit(0);
    })
    .catch((err) => {
      console.error('[Publisher] Fatal Error:', err.message);
      process.exit(1);
    });
}

module.exports = {
  getLondonTime,
  getScheduledTopic,
  generateFallbackArticle,
  publishDailyArticle,
  loadAllExistingArticles,
  OFFICIAL_DATA,
  PILLAR_BLUEPRINTS,
};
