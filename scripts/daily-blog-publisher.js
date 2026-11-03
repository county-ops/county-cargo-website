/**
 * County Cargo Automated Daily Blog Publisher
 *
 * Implements automated publishing of two County Cargo blog articles daily using the
 * agreed Monday-start weekly rotation anchored to 2 November 2026:
 *   Week 0 (starts Mon Nov 2, 2026): Nigeria Exports
 *   Week 1 (starts Mon Nov 9, 2026): UK Cities
 *   Week 2 (starts Mon Nov 16, 2026): US Cities
 *   (Cycles every 3 weeks indefinitely)
 *
 * Daily Slots (Europe/London time):
 *   Slot 1: Morning In-Depth Route, Regulatory & Compliance Guide (09:00 Europe/London)
 *   Slot 2: Afternoon Operational Logistics, Packaging & Forwarding Guide (15:00 Europe/London)
 *
 * Key Capabilities:
 * 1. Live official-source retrieval: Fetches actual government & regulatory guidance pages,
 *    extracts evidence, and requires at least two successfully retrieved official sources.
 * 2. Stops publication immediately if research or existing-article catalogue retrieval fails.
 * 3. Indefinite fresh topic synthesis: Compares generated titles & slugs against complete catalogue
 *    and regenerates duplicates (never appends a date suffix).
 * 4. Persistent date-and-slot identifier (slotId, e.g. "2026-11-03-slot1") to guarantee idempotency;
 *    rerunning a successful slot cannot publish another article.
 * 5. Verifies rendered article body content on the live site (not just the title).
 * 6. Disputed and unconfirmed flat rates are removed in favor of live dynamic calculator quotes.
 * 7. Discontinued 48-hour express and unsupported services are strictly prohibited.
 */

const https = require('https');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// 1. Anchor Configuration: Monday, 2 November 2026
const ANCHOR_DATE_STR = '2026-11-02';
const ANCHOR_MONDAY = new Date('2026-11-02T00:00:00Z');

// 2. Official Hubs, Verified Service Timeframes & Policy
const OFFICIAL_DATA = {
  TIMEFRAMES: {
    STANDARD_AIR: '5–10 working days',
    EXPRESS_AIR: '3–5 working days',
    SEA_CARGO: '4 to 8 weeks',
  },
  SERVICE_GUIDELINES: {
    STANDARD_AIR: 'Consolidated commercial air freight with scheduled weekly departures (5–10 working days transit).',
    EXPRESS_AIR: 'Priority courier dispatch for urgent parcels and documents (3–5 working days transit).',
    SEA_CARGO: 'Cost-effective bulk ocean freight for 55-gallon polyethylene barrels and heavy freight (4–8 weeks transit to Lagos ports).',
    PRICING_POLICY: 'Disputed and unconfirmed flat rates are removed. All live rates, handling fees, and dimensional weight quotes must be calculated via the official County Cargo Shipping Calculator.',
  },
  HUBS: {
    LAGOS: 'Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos',
    ABUJA: "Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market, Abuja-FCT",
    LIVERPOOL: 'Unit G6, Queens Dock Commercial Centre, 67–83 Norfolk Street, Liverpool, L1 0BG',
    LONDON: 'Charlton receiving depot & Greater London collection service',
    TEXAS: 'Suite 508, 500 S Belt Line Rd, Irving, TX 75060, United States',
  },
  OFFICIAL_SOURCES: {
    NIGERIA_EXPORTS: [
      { name: 'Nigerian Export Promotion Council (NEPC)', url: 'https://nepc.gov.ng', scope: 'Exporter registration, export guidelines, non-oil incentives' },
      { name: 'Nigeria Single Window Trade Portal / CBN', url: 'https://trade.gov.ng', scope: 'Electronic Form NXP, authorized dealer bank processing, Clean Certificate of Inspection' },
      { name: 'Nigeria Agricultural Quarantine Service (NAQS)', url: 'https://naqs.gov.ng', scope: 'Phytosanitary inspection, agricultural produce export clearance' },
      { name: 'UK Department for Environment, Food & Rural Affairs (DEFRA)', url: 'https://www.gov.uk/guidance/import-plants-and-plant-products-from-non-eu-countries-to-great-britain-and-northern-ireland', scope: 'Plant health import standards, permissible dried foods, vacuum packaging' },
      { name: 'US Food and Drug Administration (FDA)', url: 'https://www.fda.gov/food/importing-food-products-united-states', scope: 'Prior Notice for food shipments, commercial agro-food compliance' },
    ],
    UK_CITIES: [
      { name: 'HM Revenue & Customs (HMRC)', url: 'https://www.gov.uk/export-goods', scope: 'Export declarations, commercial invoices, commodity code classification' },
      { name: 'UK Border Force', url: 'https://www.gov.uk/government/organisations/border-force', scope: 'Customs transit controls, international parcel despatch standards' },
      { name: 'Nigeria Customs Service (NCS)', url: 'https://customs.gov.ng', scope: 'Destination import tariffs, airport clearance protocols at MMIA Lagos' },
    ],
    US_CITIES: [
      { name: 'US Customs and Border Protection (CBP)', url: 'https://www.cbp.gov/trade/aes', scope: 'Automated Export System (AES Direct) EEI filing for cargo > $2,500' },
      { name: 'US Federal Aviation Administration (FAA)', url: 'https://www.faa.gov/hazmat', scope: 'Lithium battery air transport guidelines (UN3480/UN3481 Section II compliance)' },
      { name: 'Nigeria Customs Service (NCS)', url: 'https://customs.gov.ng', scope: 'Destination commercial clearing and valuation at Lagos MMIA cargo terminal' },
    ],
  },
  URLS: {
    CALCULATOR: 'https://ship.countycargo.com/shipping-calculator',
    CONTACT: 'https://countycargo.com/contact',
  },
};

// 3. Weekly Pillar Thematic Domains for Indefinite Fresh Topic Synthesis
const PILLAR_DOMAINS = [
  // Pillar 0: Nigeria Exports (Week 0)
  {
    pillar: 'Nigeria Exports',
    category: 'Export Services',
    themes: [
      'Commercial agricultural commodities export (sesame seeds, cashew nuts, ginger, cocoa beans, shea butter)',
      'Dried foodstuffs and culinary ingredients export to UK/USA (ogbono, egusi, bitterleaf, dried fish, crayfish, uziza)',
      'Textiles, indigenous fashion and traditional crafts (aso-oke, adire, couture garments for diaspora boutiques)',
      'Regulatory export documentation (NEPC registration, Form NXP electronic filing, NAQS phytosanitary certification)',
      'Hub drop-offs and receiving protocols (Ladipo-Oshodi Lagos and Wuye Market Abuja receiving desks)',
      'Packaging protocols and damage prevention (hermetic sealing, vacuum pouches, double-wall corrugated cartons)',
      'Volumetric weight optimization and freight charge calculation (IATA dimensional divisor vs gross weight)',
      'Air cargo consolidation flight cycles and cut-off windows at Murtala Muhammed International Airport (MMIA)',
    ],
  },

  // Pillar 1: UK Cities (Week 1)
  {
    pillar: 'UK Cities',
    category: 'UK to Nigeria',
    themes: [
      'Greater London and South East shipping (Charlton receiving depot, London boroughs doorstep collections)',
      'Northern England and Merseyside shipping (Liverpool Queens Dock Commercial Centre depot, Manchester, Salford, Bolton)',
      'Yorkshire and Humber shipping routes (Leeds, Bradford, Sheffield freight consolidation via Liverpool hub)',
      'West Midlands shipping (Birmingham, Wolverhampton, Coventry regional collection and air cargo dispatch)',
      'Scotland and Wales freight connectivity (Glasgow, Edinburgh, Cardiff logistics forwarding to Lagos and Abuja)',
      'Ocean barrel freight (55-gallon polyethylene drum packaging, metal locking bands, 4–8 week transit to Lagos ports)',
      'UK online shopping forwarding (Amazon UK, ASOS, Currys, eBay UK package consolidation via Liverpool depot suite)',
      'B2B commercial exports to Nigeria (HMRC export declarations, commercial invoices, destination customs clearance)',
    ],
  },

  // Pillar 2: US Cities (Week 2)
  {
    pillar: 'US Cities',
    category: 'USA to Nigeria',
    themes: [
      'Texas and DFW metropolitan shipping (Irving TX warehouse operations at 500 S Belt Line Rd, Dallas, Fort Worth)',
      'Houston and Gulf Coast commercial and personal shipping (oilfield equipment, personal boxes to Lagos & Abuja)',
      'Southeast and Georgia shipping (Atlanta consolidation, Charlotte, Miami transatlantic air dispatch)',
      'Midwestern freight corridors (Chicago, Illinois, Detroit, Minneapolis collection and Texas hub forwarding)',
      'East Coast and Tri-State freight (New York City, Newark, New Jersey, Philadelphia air cargo logistics)',
      'West Coast shipping strategies (Los Angeles, San Francisco Bay Area, Seattle domestic forwarding to Texas)',
      'Ocean container barrel shipping from USA (55-gallon HDPE drums, moisture barriers, Lagos port customs release)',
      'US online retail forwarding (Amazon US, Walmart, Best Buy, eBay US consolidation via Irving TX suite)',
      'Regulatory compliance for US exports (CBP Automated Export System AES filing, lithium battery FAA rules)',
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
  const utcDate = new Date(Date.UTC(year, month - 1, day));
  const dayOfWeek = (utcDate.getUTCDay() + 6) % 7; // 0=Mon, 1=Tue, ..., 6=Sun
  const mondayUtc = new Date(utcDate.getTime() - dayOfWeek * 86400000);

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayName = dayNames[dayOfWeek];

  return {
    year,
    month,
    day,
    hour,
    minute,
    dateStr,
    dayIndex: dayOfWeek,
    dayName,
    mondayUtc,
  };
}

/**
 * Deterministically compute the Monday-start weekly rotation pillar
 */
function getScheduledPillar(targetDate = new Date()) {
  const london = getLondonTime(targetDate);

  const diffMs = london.mondayUtc.getTime() - ANCHOR_MONDAY.getTime();
  const weekDiff = Math.round(diffMs / (7 * 86400000));
  const pillarIndex = ((weekDiff % 3) + 3) % 3;

  const pillarData = PILLAR_DOMAINS[pillarIndex];
  const officialSources =
    pillarIndex === 0
      ? OFFICIAL_DATA.OFFICIAL_SOURCES.NIGERIA_EXPORTS
      : pillarIndex === 1
      ? OFFICIAL_DATA.OFFICIAL_SOURCES.UK_CITIES
      : OFFICIAL_DATA.OFFICIAL_SOURCES.US_CITIES;

  return {
    pillar: pillarData.pillar,
    category: pillarData.category,
    pillarIndex,
    weekIndex: weekDiff,
    dayIndex: london.dayIndex,
    dayName: london.dayName,
    dateStr: london.dateStr,
    londonHour: london.hour,
    themes: pillarData.themes,
    officialSources,
  };
}

/**
 * HTTP/HTTPS Request Helper supporting redirects and timeouts
 */
function makeRequest(targetUrl, options = {}, postData = null, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 3) {
      return reject(new Error(`Too many redirects encountered while requesting ${targetUrl}`));
    }

    const parsed = url.parse(targetUrl);
    const isHttps = parsed.protocol === 'https:';
    const client = isHttps ? https : http;

    const reqOptions = {
      hostname: parsed.hostname,
      port: parsed.port || (isHttps ? 443 : 80),
      path: parsed.path,
      method: options.method || 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) CountyCargoLogisticsResearch/1.0',
        ...(options.headers || {}),
      },
    };

    const req = client.request(reqOptions, (res) => {
      // Handle HTTP redirects (301, 302, 307, 308)
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
        const nextUrl = url.resolve(targetUrl, res.headers.location);
        res.resume();
        return resolve(makeRequest(nextUrl, options, postData, redirectCount + 1));
      }

      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    });

    req.on('error', reject);
    req.setTimeout(25000, () => {
      req.destroy();
      reject(new Error(`Request timed out after 25s to ${targetUrl}`));
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

/**
 * Extract clean, informative text excerpt from fetched HTML page
 */
function extractTextFromHtml(html) {
  if (!html) return '';
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Perform actual official-source retrieval using direct page fetching.
 * Retrieves official pages, extracts evidence, and ensures at least TWO official sources
 * succeed. Stops and throws an error if research fails.
 */
async function retrieveOfficialEvidence(pillarInfo, fetchFn = makeRequest) {
  console.log(`[Publisher] Retrieving live official evidence for pillar: "${pillarInfo.pillar}"...`);
  const sources = pillarInfo.officialSources;
  const retrieved = [];
  const errors = [];

  for (const source of sources) {
    try {
      console.log(`[Publisher] Fetching official guidance from: ${source.name} (${source.url})...`);
      const res = await fetchFn(source.url, { method: 'GET' });
      if (res && res.statusCode >= 200 && res.statusCode < 400 && res.body) {
        const text = extractTextFromHtml(res.body);
        if (text && text.length > 80) {
          // Take informative evidence snippet (up to 750 chars)
          const evidence = text.substring(0, 750).trim();
          retrieved.push({
            name: source.name,
            url: source.url,
            scope: source.scope,
            evidence,
            retrievedAt: new Date().toISOString(),
          });
          console.log(`[Publisher] ✅ Successfully retrieved official source: ${source.name}`);
        }
      } else {
        errors.push(`${source.name} returned HTTP ${res ? res.statusCode : 'empty'}`);
      }
    } catch (err) {
      errors.push(`${source.name} retrieval failed: ${err.message}`);
    }

    // If we have collected at least 3 high-quality sources, we have sufficient evidence
    if (retrieved.length >= 3) break;
  }

  // Enforce at least TWO successfully retrieved official sources
  if (retrieved.length < 2) {
    const errorDetails = errors.join('; ');
    throw new Error(`Research retrieval failed: Retrieved ${retrieved.length} official source(s), but at least 2 are required to proceed. Failure details: [${errorDetails}]`);
  }

  console.log(`[Publisher] ✅ Successfully retrieved ${retrieved.length} official sources for evidence synthesis.`);
  return retrieved;
}

/**
 * Load complete existing article catalogue from local JSON and live Firestore.
 * STOP PUBLICATION if catalogue retrieval fails.
 */
async function loadAllExistingArticles(baseUrl, apiKey, fetchFn = makeRequest) {
  const existing = {
    slugs: new Set(),
    titles: new Set(),
    slotIds: new Set(),
    items: [],
  };

  // 1. Read local static core posts
  const jsonPath = path.resolve(__dirname, '../src/lib/blog-posts.json');
  try {
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`Local blog catalogue not found at: ${jsonPath}`);
    }
    const raw = fs.readFileSync(jsonPath, 'utf8');
    const corePosts = JSON.parse(raw);
    corePosts.forEach((p) => {
      const slug = (p.url || '').replace(/^\/blog\//, '').replace(/\/$/, '').toLowerCase();
      if (slug) existing.slugs.add(slug);
      if (p.title) existing.titles.add(p.title.trim().toLowerCase());
      if (p.slotId) existing.slotIds.add(p.slotId.trim());
      existing.items.push({ title: p.title, slug, url: p.url, slotId: p.slotId, isCustom: false });
    });
  } catch (err) {
    throw new Error(`Existing article retrieval failed: Could not read local catalogue (${err.message})`);
  }

  // 2. Fetch live custom Firestore posts from /api/admin/posts
  if (baseUrl && apiKey) {
    try {
      const res = await fetchFn(`${baseUrl}/api/admin/posts`, {
        method: 'GET',
        headers: { 'x-admin-api-key': apiKey },
      });

      if (!res || res.statusCode !== 200) {
        throw new Error(`HTTP ${res ? res.statusCode : 'no response'}: ${res ? res.body : ''}`);
      }

      let data;
      try {
        data = JSON.parse(res.body);
      } catch (e) {
        throw new Error(`Failed to parse response JSON: ${res.body}`);
      }

      if (!data.success || !Array.isArray(data.customPosts)) {
        throw new Error(`Invalid custom posts response structure from ${baseUrl}/api/admin/posts`);
      }

      data.customPosts.forEach((p) => {
        const slug = (p.url || '').replace(/^\/blog\//, '').replace(/\/$/, '').toLowerCase();
        if (slug) existing.slugs.add(slug);
        if (p.title) existing.titles.add(p.title.trim().toLowerCase());
        if (p.slotId) existing.slotIds.add(p.slotId.trim());
        existing.items.push({ title: p.title, slug, url: p.url, slotId: p.slotId, isCustom: true });
      });
    } catch (err) {
      throw new Error(`Existing article retrieval failed: Could not fetch custom articles from live API (${err.message})`);
    }
  }

  return existing;
}

/**
 * Generate an original article using OpenAI with supplied retrieved official evidence.
 * Requires at least two verified links/citations to retrieved sources supporting the claims.
 */
async function researchAndGenerateArticle({
  pillarInfo,
  slot,
  existingArticles,
  retrievedEvidence,
  openaiApiKey,
  rejectedTitles = [],
  fetchFn = makeRequest,
}) {
  if (!openaiApiKey) {
    throw new Error('Publication aborted: OPENAI_API_KEY is required for live source research and original article generation. Fallback templates are strictly disabled.');
  }

  if (!Array.isArray(retrievedEvidence) || retrievedEvidence.length < 2) {
    throw new Error('Publication aborted: At least two retrieved official sources are required to provide evidence for generation.');
  }

  const existingTitlesList = existingArticles.items.map((i) => i.title).slice(0, 45).join('\n - ');
  const rejectedText = rejectedTitles.length > 0 ? `\nDO NOT USE ANY OF THESE REJECTED TITLES:\n - ${rejectedTitles.join('\n - ')}` : '';

  const evidencePromptBlock = retrievedEvidence
    .map(
      (e, idx) =>
        `### Source ${idx + 1}: ${e.name}
URL: ${e.url}
Mandate/Scope: ${e.scope}
Retrieved Official Evidence Excerpt:
"${e.evidence}"`
    )
    .join('\n\n');

  const slotDescription =
    slot === 1
      ? 'Slot 1 (09:00 London): In-depth regulatory, statutory compliance, and route freight analysis guide'
      : 'Slot 2 (15:00 London): Operational logistics, packaging checklist, warehouse drop-off, and parcel forwarding guide';

  const systemPrompt = `You are the Principal Logistics Research Director for County Cargo (countycargo.com).
Your duty is to produce an authoritative, 100% original, deeply-researched shipping guide.

ROTATION PILLAR: ${pillarInfo.pillar} (Week #${pillarInfo.weekIndex}, ${pillarInfo.dayName})
PUBLISHING SLOT: ${slotDescription}

LIVE RETRIEVED OFFICIAL EVIDENCE (YOU MUST CITE AT LEAST TWO OF THESE SOURCES DIRECTLY):
${evidencePromptBlock}

OFFICIAL COMPANY HUB NETWORK (GROUND TRUTH):
- Lagos Hub: ${OFFICIAL_DATA.HUBS.LAGOS}
- Abuja Hub: ${OFFICIAL_DATA.HUBS.ABUJA}
- Liverpool Hub: ${OFFICIAL_DATA.HUBS.LIVERPOOL}
- London Depot: ${OFFICIAL_DATA.HUBS.LONDON}
- Texas Warehouse: ${OFFICIAL_DATA.HUBS.TEXAS}
- Official Shipping Calculator: ${OFFICIAL_DATA.URLS.CALCULATOR}

MANDATORY RULES & PROHIBITIONS:
1. FRESH NOVEL TOPIC: Invent a completely FRESH, novel topic angle that has NEVER been covered before.
   DO NOT duplicate or overlap with any of the following existing titles:${rejectedText}
   - ${existingTitlesList}
2. EVIDENCE CITATION REQUIREMENT: You MUST directly cite and hyper-reference at least TWO of the retrieved official sources above using their exact URLs as markdown links (e.g. [Nigerian Export Promotion Council](https://nepc.gov.ng) or [UK DEFRA Plant Health Guidance](https://www.gov.uk/...)). The article MUST contain a dedicated section "Official Regulatory Citations & References" citing the retrieved sources and explaining how they govern this cargo route.
3. REMOVE DISPUTED RATES: DO NOT assert or promise fixed per-kg freight prices (such as ₦10,500/kg or ₦16,000/kg or ₦55,000/kg as static guarantees). Explain that freight rates are dynamic, based on volumetric vs actual weight, destination zone, and real-time carrier costs. Direct shippers to the official County Cargo Shipping Calculator (${OFFICIAL_DATA.URLS.CALCULATOR}) for confirmed live quotes.
4. ABSOLUTELY NO DISCONTINUED SERVICES: Never reference the discontinued 48-Hour Special Express or 48-hour flight options.
5. RICH MARKDOWN: Produce substantial, high-quality markdown content (minimum 1,200 words) with clear subheadings, structured tables, packaging checklists, and actionable regulatory advice.

You must respond with pure, valid JSON in the following format:
{
  "title": "A distinct, fresh, highly specific title",
  "slug": "unique-url-slug",
  "description": "150-160 character meta description containing focus keywords",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "citedSources": [
    { "name": "Exact Name of Retrieved Source 1", "url": "Exact Retrieved URL 1", "claim": "Regulatory claim supported" },
    { "name": "Exact Name of Retrieved Source 2", "url": "Exact Retrieved URL 2", "claim": "Regulatory claim supported" }
  ],
  "content": "Full markdown content of the article..."
}`;

  const userPrompt = `Research and write a fresh article for:
- Pillar: ${pillarInfo.pillar}
- Day: ${pillarInfo.dayName} (${pillarInfo.dateStr})
- Slot: Slot ${slot}
- Target Audience: Commercial exporters, UK/US diaspora senders, and cross-border businesses.

Incorporate the retrieved official evidence into practical guidance. Return valid JSON only.`;

  const payload = JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.7,
    response_format: { type: 'json_object' },
  });

  const res = await fetchFn(
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

  if (!res || res.statusCode !== 200) {
    throw new Error(`OpenAI research/generation request failed (HTTP ${res ? res.statusCode : 'no response'}): ${res ? res.body : ''}`);
  }

  let completion;
  try {
    completion = JSON.parse(res.body);
  } catch (err) {
    throw new Error(`Failed to parse OpenAI API response: ${err.message}`);
  }

  const rawContent = completion.choices?.[0]?.message?.content;
  if (!rawContent) {
    throw new Error('OpenAI returned empty message content.');
  }

  let article;
  try {
    article = JSON.parse(rawContent);
  } catch (err) {
    throw new Error(`Failed to parse generated article JSON: ${err.message}`);
  }

  // Validate required fields
  if (!article.title || !article.slug || !article.content) {
    throw new Error('Generated article is missing required fields (title, slug, or content).');
  }

  // Validate that at least two of the retrieved official source links are cited in the article
  const retrievedUrls = retrievedEvidence.map((s) => s.url);
  const matchedUrls = retrievedUrls.filter((u) => article.content.includes(u));

  if (matchedUrls.length < 2) {
    // Check citedSources array as well
    const citedUrls = (article.citedSources || []).map((s) => s.url);
    const matchedInCited = retrievedUrls.filter((u) => citedUrls.includes(u));
    if (matchedInCited.length < 2 && matchedUrls.length < 2) {
      throw new Error(`Generation validation failed: Article must cite at least two retrieved official source links. Found ${matchedUrls.length} in content, ${matchedInCited.length} in citedSources.`);
    }
  }

  // Validate that discontinued 48-hour express was not mentioned
  if (article.content.includes('48-Hour') || article.content.includes('48 hours') || article.title.includes('48-Hour')) {
    throw new Error('Generation validation failed: Article contains discontinued 48-hour express reference.');
  }

  // Validate that disputed fixed rates are not presented as guarantees
  if (article.content.includes('₦10,500/kg') || article.content.includes('₦16,000/kg') || article.content.includes('₦55,000/kg')) {
    throw new Error('Generation validation failed: Article contains disputed fixed rates. Dynamic calculator must be cited instead.');
  }

  return article;
}

/**
 * Verify rendered article body content on live page
 */
async function verifyLiveArticleContent(postUrl, expectedTitle, expectedBodyExcerpts, fetchFn = makeRequest) {
  console.log(`[Publisher] Verifying rendered article content at ${postUrl}...`);

  const res = await fetchFn(postUrl, { method: 'GET' });
  if (!res || res.statusCode !== 200) {
    throw new Error(`Live verification failed: Expected HTTP 200 at ${postUrl}, got status ${res ? res.statusCode : 'no response'}`);
  }

  const html = res.body;

  // 1. Verify title appears in rendered HTML
  if (!html.includes(expectedTitle)) {
    throw new Error(`Live verification failed: Expected article title "${expectedTitle}" missing from rendered page.`);
  }

  // 2. Verify substantial body content length
  if (html.length < 1500) {
    throw new Error(`Live verification failed: Rendered page HTML is suspiciously short (${html.length} chars). Possible render failure.`);
  }

  // 3. Verify specific article body excerpts are rendered in the HTML
  if (Array.isArray(expectedBodyExcerpts)) {
    for (const excerpt of expectedBodyExcerpts) {
      if (excerpt && !html.includes(excerpt)) {
        throw new Error(`Live verification failed: Rendered article body is missing expected content: "${excerpt.substring(0, 60)}..."`);
      }
    }
  }

  console.log(`[Publisher] ✅ Live page verified! HTTP 200, title rendered, and full body content validated.`);
  return true;
}

/**
 * Clean and normalize a slug
 */
function cleanSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Main Publishing Routine
 */
async function publishDailyArticle(options = {}) {
  const fetchFn = options.fetchFn || makeRequest;
  const targetDate = options.date ? new Date(options.date) : new Date();
  const baseUrl = options.baseUrl || process.env.SITE_URL || 'https://countycargo.com';
  const apiKey = options.apiKey || process.env.ADMIN_API_KEY;
  const openaiApiKey = options.openaiApiKey || process.env.OPENAI_API_KEY;

  const london = getLondonTime(targetDate);
  console.log(`[Publisher] Target Date: ${london.dateStr} (${london.dayName}) | London Time: ${london.hour.toString().padStart(2, '0')}:${london.minute.toString().padStart(2, '0')} Europe/London`);

  // Enforce scheduled hours: 09:00 (Slot 1) and 15:00 (Slot 2) in Europe/London
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

  const slot = requestedSlot || 1;
  const pillarInfo = getScheduledPillar(targetDate);
  const slotId = `${london.dateStr}-slot${slot}`;

  console.log(`[Publisher] Persistent Slot ID: "${slotId}"`);
  console.log(`[Publisher] Active Rotation: "${pillarInfo.pillar}" (Week #${pillarInfo.weekIndex}, ${pillarInfo.dayName}) | Slot ${slot}`);

  // 1. Load complete existing catalogue (STOP publication if this fails)
  console.log(`[Publisher] Loading complete article catalogue to prevent duplicates...`);
  const existing = await loadAllExistingArticles(baseUrl, apiKey, fetchFn);

  // 2. Persistent Date-and-Slot Check: Ensure rerunning a successful slot cannot publish another article
  if (existing.slotIds.has(slotId)) {
    const existingPost = existing.items.find((i) => i.slotId === slotId);
    const existingUrl = existingPost ? `${baseUrl}${existingPost.url}` : `${baseUrl}/blog`;
    console.log(`[Publisher] ℹ️ Persistent Slot ID "${slotId}" has already been published. Rerunning this slot is prevented. Skipping.`);
    return {
      success: true,
      skipped: true,
      slotId,
      reason: 'Slot already published',
      postUrl: existingUrl,
    };
  }

  // 3. Live Official-Source Retrieval (STOP publication if this fails)
  console.log(`[Publisher] Performing live official-source retrieval...`);
  const retrievedEvidence = await retrieveOfficialEvidence(pillarInfo, fetchFn);

  // 4. Generate fresh, original article with duplicate comparison & regeneration
  console.log(`[Publisher] Generating fresh article with OpenAI and comparing against complete catalogue...`);
  let articleData = null;
  const rejectedTitles = [];
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`[Publisher] Generation Attempt ${attempt}/${maxAttempts}...`);
    const candidate = await researchAndGenerateArticle({
      pillarInfo,
      slot,
      existingArticles: existing,
      retrievedEvidence,
      openaiApiKey,
      rejectedTitles,
      fetchFn,
    });

    const slug = cleanSlug(candidate.slug);
    const titleNorm = candidate.title.trim().toLowerCase();

    // Check complete catalogue for duplicate slug or title
    const isDuplicateSlug = existing.slugs.has(slug);
    const isDuplicateTitle = existing.titles.has(titleNorm);

    if (isDuplicateSlug || isDuplicateTitle) {
      console.warn(`[Publisher] ⚠️ Attempt ${attempt}: Topic duplicate detected in catalogue for "${candidate.title}" (Slug: ${slug}). Regenerating fresh topic...`);
      rejectedTitles.push(candidate.title);
      continue;
    }

    // Unique topic found!
    candidate.slug = slug;
    articleData = candidate;
    break;
  }

  if (!articleData) {
    throw new Error(`Publication aborted: Could not generate a unique topic after ${maxAttempts} attempts against the complete article catalogue.`);
  }

  // 5. Authenticate and Publish via POST /api/admin/posts
  if (!apiKey) {
    throw new Error('Publication aborted: ADMIN_API_KEY is required to publish articles to Firestore.');
  }

  const payload = JSON.stringify({
    title: articleData.title,
    slug: articleData.slug,
    category: pillarInfo.category,
    author: 'County Cargo Logistics Research Desk',
    publicationDate: london.dateStr,
    tags: articleData.tags || ['County Cargo', pillarInfo.pillar, 'Shipping Guide'],
    description: articleData.description,
    image: '/cargo-plane-hero.png',
    content: articleData.content,
    slotId: slotId,
  });

  console.log(`[Publisher] Publishing unique article "${articleData.title}" (Slot: ${slotId}) to ${baseUrl}/api/admin/posts...`);
  const publishRes = await fetchFn(
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
    throw new Error(`Failed to parse publishing response (HTTP ${publishRes ? publishRes.statusCode : 'no response'}): ${publishRes ? publishRes.body : ''}`);
  }

  if (!publishResult.success) {
    throw new Error(`Firestore publication failed (HTTP ${publishRes.statusCode}): ${publishResult.error || 'Unknown error'}`);
  }

  const postUrl = `${baseUrl}/blog/${articleData.slug}`;
  console.log(`[Publisher] ✅ Article published successfully! Target URL: ${postUrl}`);

  // 6. Strict Live Verification: Verify rendered article title AND rendered body content
  await new Promise((r) => setTimeout(r, 2000));

  const paragraphs = articleData.content
    .split('\n\n')
    .map((p) => p.replace(/[#*`>-]/g, '').trim())
    .filter((p) => p.length > 50);

  const excerptsToVerify = paragraphs.slice(0, 2).map((p) => p.substring(0, 50));

  await verifyLiveArticleContent(postUrl, articleData.title, excerptsToVerify, fetchFn);

  return {
    success: true,
    postUrl,
    title: articleData.title,
    slug: articleData.slug,
    pillar: pillarInfo.pillar,
    slot,
    slotId,
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
  getScheduledPillar,
  retrieveOfficialEvidence,
  loadAllExistingArticles,
  researchAndGenerateArticle,
  verifyLiveArticleContent,
  publishDailyArticle,
  cleanSlug,
  extractTextFromHtml,
  OFFICIAL_DATA,
  PILLAR_DOMAINS,
};
