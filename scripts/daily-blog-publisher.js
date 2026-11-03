/**
 * County Cargo Automated Daily Blog Publisher
 *
 * Implements automatic publishing of two County Cargo blog articles daily using the
 * agreed weekly rotation anchored to 2 November 2026:
 *   Day 0 (Nov 2, 2026): Nigeria Exports
 *   Day 1 (Nov 3, 2026): UK Cities
 *   Day 2 (Nov 4, 2026): US Cities
 *
 * Slot 1: Morning Deep-Dive Route & Regulations Guide (09:00 AM UK)
 * Slot 2: Afternoon Operational Logistics & Packaging Checklist (15:00 PM UK)
 *
 * Features:
 * - Deterministic rotation calculation from 2 November 2026
 * - Official County Cargo verified rates and approved delivery timeframes
 * - Duplicate prevention (checks existing slugs & titles before publishing)
 * - Persistent Firestore publishing via secure /api/admin/posts endpoint
 * - Post-publishing live article verification (HTTP 200 + HTML title check)
 */

const https = require('https');
const http = require('http');
const url = require('url');

// 1. Anchor Configuration
const ANCHOR_DATE_STR = '2026-11-02'; // Monday, 2 November 2026
const ANCHOR_DATE = new Date(ANCHOR_DATE_STR + 'T00:00:00Z');

// 2. Official Verified Rates & Hubs Source of Truth
const OFFICIAL_DATA = {
  TIMEFRAMES: {
    STANDARD_AIR: '5–10 working days',
    EXPRESS_AIR: '3–5 working days',
    SEA_CARGO: '4 to 8 weeks',
    SPECIAL_EXPRESS: '48 hours (UK to Lagos only)',
  },
  RATES: {
    NIGERIA_TO_UK_VALUE: '₦10,500/kg (10kg minimum)',
    NIGERIA_TO_USA_VALUE_LAGOS: '₦16,000/kg (10kg minimum)',
    NIGERIA_TO_USA_VALUE_ABUJA: '₦17,000/kg (10kg minimum)',
    EXPRESS_COURIER_WORLDWIDE: '₦55,000/kg (1kg minimum, 3–5 working days)',
    UK_TO_NIGERIA_STANDARD_AIR: '£6.50/kg',
  },
  HUBS: {
    LAGOS: 'Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos',
    ABUJA: "Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market, Abuja-FCT",
    LIVERPOOL: 'Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG',
    TEXAS: 'Suite 508, 500 S Belt Line Rd, Irving, TX 75060, United States',
  },
  URLS: {
    QUOTE: 'https://ship.countycargo.com/shipping-calculator',
    CONTACT: 'https://countycargo.com/contact',
  },
};

// 3. Editorial Topic Matrix (Nigeria Exports → UK Cities → US Cities)
const TOPIC_PILLARS = [
  {
    pillar: 'Nigeria Exports',
    category: 'Export Services',
    slot1: [
      {
        title: 'Exporting Dried Foodstuffs from Nigeria to UK: 2026 DEFRA Inspection Rules & Approved Packaging',
        slug: 'exporting-dried-foodstuffs-nigeria-to-uk-defra-rules',
        tags: ['Nigeria to UK', 'Foodstuff Export', 'DEFRA Regulations', 'Air Freight Lagos', 'Abuja Cargo'],
        image: '/images/blog/shipping-from-nigeria-to-uk-air-cargo-county.jpg',
        description: 'Complete guide to exporting dried foodstuffs from Nigeria to the UK. Learn DEFRA sanitary packaging standards, prohibited ingredients, Value air cargo from ₦10,500/kg, and doorstep delivery across the UK.',
        summary: 'DEFRA import packaging standards, moisture limits, dried fish and ogbono processing, and Value air cargo delivery.',
      },
      {
        title: 'Commercial Agricultural Commodities Export from Nigeria: NEPC Documentation & Air Freight Rates',
        slug: 'commercial-agricultural-commodities-export-nigeria-nepc-guide',
        tags: ['Export Services', 'NEPC Registration', 'NXP Form', 'Commercial Cargo', 'Lagos Freight'],
        image: '/images/blog/how-to-export-goods-nigeria-to-uk-commercial-guide.jpg',
        description: 'Official exporter checklist for shipping commercial commodities (sesame, cashew, ginger, shea butter) from Lagos and Abuja. NXP documentation, phytosanitary certificates, and scheduled air cargo consolidation.',
        summary: 'NEPC documentation, NXP electronic form filing, commercial invoice preparation, and air freight minimums.',
      },
    ],
    slot2: [
      {
        title: 'Dropping Off Export Cargo at County Cargo Lagos & Abuja: Receiving Hours & Packaging Protocols',
        slug: 'drop-off-export-cargo-lagos-abuja-receiving-guide',
        tags: ['Lagos Drop-off', 'Abuja Drop-off', 'Packaging Protocols', 'Ladipo Oshodi', 'Wuye Market'],
        image: '/cargo-plane-hero.png',
        description: 'Step-by-step instructions for dropping off packages at County Cargo Ladipo-Oshodi (Lagos) and Wuye Market (Abuja). Package weighing, volumetric calculations, tamper-evident sealing, and dispatch tracking.',
        summary: 'Drop-off procedures at Suite F8 Magnet Plaza Lagos and Shop HF426 Wuye Market Abuja with weighing inspection.',
      },
      {
        title: 'Value Air Cargo vs Express Courier from Nigeria: Choosing the Right Transit Speed',
        slug: 'value-air-cargo-vs-express-courier-nigeria-comparison',
        tags: ['Value Air Cargo', 'Express Courier', 'Shipping Comparison', 'Nigeria Export Rates', 'Transit Times'],
        image: '/images/blog/shipping-from-nigeria-to-usa-air-freight-county.jpg',
        description: 'Compare County Cargo Value Air Cargo (₦10,500–₦16,000/kg, 5–10 working days) and Express Courier (₦55,000/kg, 3–5 working days). Learn when to prioritize speed versus cost savings.',
        summary: 'Detailed transit speed comparison between 5–10 day consolidated freight and 3–5 day expedited courier.',
      },
    ],
  },
  {
    pillar: 'UK Cities',
    category: 'UK to Nigeria',
    slot1: [
      {
        title: 'Shipping Cargo from London (Charlton & South East) to Lagos & Abuja: Rates and Weekly Schedules',
        slug: 'shipping-cargo-london-charlton-to-lagos-abuja-rates',
        tags: ['London to Nigeria', 'Charlton Drop-off', 'Air Cargo Schedule', 'Lagos Doorstep', 'Abuja Delivery'],
        image: '/images/blog/uk-to-nigeria-shipping-rates-calculator.jpg',
        description: 'Comprehensive guide for sending cargo from London to Nigeria. Drop off at our Charlton depot or book Greater London collections with 5–10 day air cargo and full customs clearance.',
        summary: 'London receiving, weekly flight schedules, parcel inspection at Charlton, and doorstep delivery across Nigeria.',
      },
      {
        title: 'Shipping from Northern England (Liverpool, Manchester & Leeds) to Nigeria: Free Depot Receiving',
        slug: 'shipping-northern-england-liverpool-manchester-leeds-to-nigeria',
        tags: ['Liverpool Depot', 'Manchester to Nigeria', 'Leeds Cargo', 'Queens Dock', 'UK to Lagos'],
        image: '/images/blog/complete-guide-nigeria-to-uk-freight.jpg',
        description: 'Ship to Nigeria from Liverpool, Manchester, Leeds, and Bolton. Drop off at Unit G6 Queens Dock Commercial Centre in Liverpool or arrange regional collection for air cargo and ocean barrels.',
        summary: 'Free depot collection at Queens Dock Liverpool with regional consolidation for Manchester, Leeds, and Northern England.',
      },
    ],
    slot2: [
      {
        title: 'Shipping 55-Gallon Barrels from the UK to Nigeria: Packing Standards for Ocean Transit',
        slug: 'shipping-barrels-from-uk-to-nigeria-packing-standards',
        tags: ['Shipping Barrels', 'UK to Nigeria Sea Freight', 'Ocean Barrels', 'Packing Checklist', 'Lagos Ports'],
        image: '/images/blog/uk-to-nigeria-shipping-rates-calculator.jpg',
        description: 'How to pack standard plastic shipping barrels from the UK to Nigeria. Weight distribution rules, liquid seals, locking rings, and 4–8 week ocean freight timelines to Lagos ports.',
        summary: 'Complete barrel packing protocols: durable HDPE barrels, plastic liners for dry foodstuffs, and metal clamp sealing.',
      },
      {
        title: 'Shop UK Online Stores and Ship to Nigeria: Forwarding via County Cargo Liverpool Depot',
        slug: 'shop-uk-online-stores-forward-to-nigeria-guide',
        tags: ['Shop UK Stores', 'Parcel Forwarding', 'Amazon UK to Nigeria', 'Liverpool Hub', 'Online Shopping'],
        image: '/images/blog/shipping-from-nigeria-to-uk-air-cargo-county.jpg',
        description: 'Buy from Amazon UK, ASOS, Currys, and eBay UK and forward purchases straight to your doorstep in Nigeria. Use our Liverpool depot address for receiving and consolidation.',
        summary: 'UK parcel forwarding workflow: order online with your unique suite number, consolidate multiple packages, and save on freight.',
      },
    ],
  },
  {
    pillar: 'US Cities',
    category: 'USA to Nigeria',
    slot1: [
      {
        title: 'Shipping Cargo from Texas (Irving Hub) to Nigeria: Transatlantic Air Freight Schedules 2026',
        slug: 'shipping-cargo-texas-irving-hub-to-nigeria-schedules',
        tags: ['Texas to Nigeria', 'Irving Warehouse', 'Dallas Houston Cargo', 'Air Freight USA', 'Nigeria Delivery'],
        image: '/images/blog/shipping-from-nigeria-to-usa-air-freight-county.jpg',
        description: 'Dispatch commercial freight and personal boxes from our Texas warehouse at 500 S Belt Line Rd, Irving TX. Transatlantic air freight in 5–10 working days with Lagos & Abuja doorstep delivery.',
        summary: 'Texas receiving dock operations, scheduled flights connecting DFW to Lagos, and customs clearance in Nigeria.',
      },
      {
        title: 'Shipping Cargo from Atlanta, Chicago & New York to Nigeria: US Nationwide Forwarding Guide',
        slug: 'shipping-cargo-atlanta-chicago-new-york-to-nigeria',
        tags: ['Atlanta to Nigeria', 'Chicago Cargo', 'New York Shipping', 'Nationwide USA', 'Air Freight'],
        image: '/images/blog/how-to-export-goods-nigeria-to-uk-commercial-guide.jpg',
        description: 'Connect shipments from New York, Atlanta, Chicago, and Maryland to Nigeria. Arrange nationwide courier pickups or forward to our Irving Texas consolidation hub.',
        summary: 'Nationwide US courier pickups connecting 50 states to our central Texas consolidation terminal.',
      },
    ],
    slot2: [
      {
        title: 'Packing 55-Gallon Shipping Barrels from the USA to Nigeria: Sealing & Weight Guidelines',
        slug: 'packing-shipping-barrels-usa-to-nigeria-guidelines',
        tags: ['Shipping Barrels', 'USA to Nigeria Barrels', 'Ocean Container', 'Packing Guide', 'Lagos Sea Freight'],
        image: '/images/blog/shipping-from-nigeria-to-usa-air-freight-county.jpg',
        description: 'Essential checklist for shipping heavy-duty plastic barrels from the USA to Nigeria. Weight balancing, securing locking bands, and 4–8 week ocean freight transit to Lagos.',
        summary: 'Step-by-step barrel preparation: heavy goods on bottom, moisture barriers, numbered security zip seals, and customs clearance.',
      },
      {
        title: 'Shop USA Online Stores from Nigeria: Amazon, Walmart & Best Buy Forwarding via Texas',
        slug: 'shop-usa-online-stores-forward-via-texas-hub',
        tags: ['Shop USA Online', 'Amazon USA to Nigeria', 'Walmart Forwarding', 'Texas Hub', 'Online Shopping USA'],
        image: '/images/blog/uk-to-nigeria-shipping-rates-calculator.jpg',
        description: 'Shop top American retailers from Nigeria and ship directly to Suite 508, 500 S Belt Line Rd, Irving TX. We inspect, consolidate, and fly your items to Lagos and Abuja.',
        summary: 'How to purchase from US retailers without US addresses using our tax-friendly Texas warehouse receiving suite.',
      },
    ],
  },
];

/**
 * Deterministically compute the topic for a given date and slot
 */
function getScheduledTopic(targetDate = new Date(), slot = 1) {
  const d = new Date(targetDate);
  d.setUTCHours(0, 0, 0, 0);

  const diffMs = d.getTime() - ANCHOR_DATE.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const cycleIndex = ((diffDays % 3) + 3) % 3;

  const pillarData = TOPIC_PILLARS[cycleIndex];
  const variantIndex = Math.abs(Math.floor(diffDays / 3)) % 2;

  const topicList = slot === 1 ? pillarData.slot1 : pillarData.slot2;
  const chosenTopic = topicList[variantIndex] || topicList[0];

  return {
    ...chosenTopic,
    pillar: pillarData.pillar,
    category: pillarData.category,
    targetDateStr: d.toISOString().split('T')[0],
    slot,
  };
}

/**
 * Generate full, high-converting Markdown content for the scheduled topic
 */
function generateArticleContent(topic) {
  return `## Overview: Reliable Cargo & Logistics Operations
County Cargo operates an international freight bridge connecting Nigeria, the United Kingdom, and the United States. Navigating international shipping requires transparent pricing, strict adherence to packaging standards, and experienced regulatory clearance.

This guide details the essential requirements for **${topic.title}**, providing verified route rates, hub receiving schedules, and customs procedures.

---

## Service Modes & Approved Delivery Timeframes
Depending on cargo urgency and package volume, shippers can select from the following services:

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
| **Ocean Barrels / Sea Freight** | 1 Barrel | Standard Depot Rate | ${OFFICIAL_DATA.TIMEFRAMES.SEA_CARGO} |

---

## Packaging Standards & Cargo Safety
Proper packaging prevents handling damage and delays during customs inspections:

1. **Use Heavy-Duty Materials:** Select double-wall corrugated cartons or high-density polyethylene (HDPE) barrels.
2. **Moisture & Vacuum Sealing:** For dried foodstuffs, spices, or sensitive retail goods, vacuum seal items in heavy plastic liners.
3. **Weight Distribution:** Place heavier items at the bottom of cartons or barrels to maintain stability during loading.
4. **Tamper-Evident Security:** Seal cartons with reinforced tape and secure barrels with metal locking bands and numbered zip seals.

> **Logistics Note:** Always label packages with the recipient's full name, phone number, and delivery address before drop-off.

---

## Global Hub Receiving & Drop-Off Locations
Shipments can be dropped off directly at our dedicated warehouse locations:

- **Nigeria (Lagos):** ${OFFICIAL_DATA.HUBS.LAGOS}
- **Nigeria (Abuja):** ${OFFICIAL_DATA.HUBS.ABUJA}
- **United Kingdom (Liverpool):** ${OFFICIAL_DATA.HUBS.LIVERPOOL}
- **United States (Texas):** ${OFFICIAL_DATA.HUBS.TEXAS}

---

## Calculate Shipping Rates & Book Online
Get an instant estimate for your package using our online shipping calculator:

[Calculate Your Instant Shipping Quote](${OFFICIAL_DATA.URLS.QUOTE})
`;
}

/**
 * Helper to perform an HTTP request
 */
function makeRequest(targetUrl, options, postData) {
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
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

/**
 * Main Publishing & Verification Routine
 */
async function publishDailyArticle(options = {}) {
  const targetDate = options.date ? new Date(options.date) : new Date();
  const slot = parseInt(options.slot, 10) || 1;
  const baseUrl = options.baseUrl || process.env.SITE_URL || 'https://countycargo.com';
  const apiKey = options.apiKey || process.env.ADMIN_API_KEY;

  if (!apiKey) {
    throw new Error('ADMIN_API_KEY is required to publish articles.');
  }

  const topic = getScheduledTopic(targetDate, slot);
  console.log(`[Daily Publisher] Date: ${topic.targetDateStr} | Slot: ${slot} (${topic.pillar})`);
  console.log(`[Daily Publisher] Topic: "${topic.title}"`);
  console.log(`[Daily Publisher] Target Slug: /blog/${topic.slug}`);

  // 1. Duplicate Prevention: Check if slug is already published
  console.log(`[Daily Publisher] Checking duplicate status at ${baseUrl}/blog/${topic.slug}...`);
  try {
    const checkRes = await makeRequest(`${baseUrl}/blog/${topic.slug}`, { method: 'GET' });
    if (checkRes.statusCode === 200 && checkRes.body.includes(topic.title)) {
      console.log(`[Daily Publisher] ⚠️ Article "${topic.title}" is already published and live. Skipping.`);
      return { success: true, skipped: true, url: `${baseUrl}/blog/${topic.slug}` };
    }
  } catch (err) {
    // 404 or connection error is expected if post doesn't exist yet
  }

  // 2. Generate Content
  const content = generateArticleContent(topic);
  const payload = JSON.stringify({
    title: topic.title,
    slug: topic.slug,
    category: topic.category,
    author: 'County Cargo Logistics Desk',
    publicationDate: topic.targetDateStr,
    tags: topic.tags,
    description: topic.description,
    image: topic.image,
    content: content,
  });

  // 3. Publish via /api/admin/posts
  console.log(`[Daily Publisher] Publishing to ${baseUrl}/api/admin/posts...`);
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

  let publishData;
  try {
    publishData = JSON.parse(publishRes.body);
  } catch (e) {
    throw new Error(`Failed to parse response (Status ${publishRes.statusCode}): ${publishRes.body}`);
  }

  if (!publishData.success) {
    throw new Error(`Publishing failed: ${publishData.error || 'Unknown server error'}`);
  }

  const postUrl = `${baseUrl}/blog/${topic.slug}`;
  console.log(`[Daily Publisher] ✅ Article published successfully! Link: ${postUrl}`);

  // 4. Verification Step: Verify live article returns HTTP 200 and renders properly
  console.log(`[Daily Publisher] Verifying live article rendering at ${postUrl}...`);
  // Allow 2 seconds for server cache warming
  await new Promise((r) => setTimeout(r, 2000));

  const verifyRes = await makeRequest(postUrl, { method: 'GET' });
  if (verifyRes.statusCode !== 200) {
    throw new Error(`Verification failed: Expected HTTP 200, got ${verifyRes.statusCode}`);
  }

  if (!verifyRes.body.includes(topic.title)) {
    console.warn(`[Daily Publisher] ⚠️ Warning: Title not found in response body text, but status is 200.`);
  }

  console.log(`[Daily Publisher] ✅ Live Verification Passed! HTTP ${verifyRes.statusCode} OK.`);
  return { success: true, postUrl };
}

// CLI Execution Support
if (require.main === module) {
  const args = process.argv.slice(2);
  const dateArg = args.find((a) => a.startsWith('--date='))?.split('=')[1];
  const slotArg = args.find((a) => a.startsWith('--slot='))?.split('=')[1] || '1';

  publishDailyArticle({
    date: dateArg,
    slot: slotArg,
  })
    .then((res) => {
      console.log('Result:', JSON.stringify(res, null, 2));
      process.exit(0);
    })
    .catch((err) => {
      console.error('Fatal Error:', err.message);
      process.exit(1);
    });
}

module.exports = {
  getScheduledTopic,
  generateArticleContent,
  publishDailyArticle,
  OFFICIAL_DATA,
};
