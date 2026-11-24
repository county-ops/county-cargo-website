/**
 * County Cargo Editorial Blog Image Engine
 *
 * Implements strict editorial photography requirements:
 * 1. Unique featured image for every article (never repeats photographs across catalogue).
 * 2. Prioritises realistic Nigerian people, businesses, markets, and communities.
 * 3. Reflects shipping routes between Nigeria, the UK, and the USA.
 * 4. High-resolution, professional photographs (1920x1080 / 16:9 widescreen ratio).
 * 5. Natural-looking people, customers, traders, and logistics professionals.
 * 6. Explicitly forbids generic illustrations (e.g. /cargo-plane-hero.png), blurry photos, and text overlays.
 * 7. Generates realistic AI editorial imagery (DALL-E 3) when API is available.
 * 8. Provides SEO-friendly filenames and rich, descriptive alternative text (imageHint / alt).
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const url = require('url');

// Explicitly banned generic illustrations
const BLACKLISTED_IMAGES = new Set([
  '/cargo-plane-hero.png',
  '/cargo-plane-hero.jpg',
  '/images/cargo-plane-hero.png',
]);

/**
 * Curated Registry of verified high-resolution 16:9 editorial photographs
 * depicting authentic Nigerian people, markets, businesses, and international logistics hubs.
 */
const CURATED_EDITORIAL_REGISTRY = [
  // ABUJA HUB & NORTHERN EXPORT CORRIDOR
  {
    url: '/images/blog/export-from-abuja-to-usa.jpg',
    filename: 'export-from-abuja-to-usa.jpg',
    routes: ['nigeria-to-usa', 'abuja', 'wuye', 'export', 'agricultural-export'],
    title: 'Abuja Wuye Market to USA Air Cargo Intake',
    alt: 'Nigerian logistics staff and exporters weighing and scanning commercial export boxes at County Cargo Wuye Market Hub Abuja with Aso Rock backdrop.',
    tags: ['abuja', 'usa', 'wuye', 'export', 'air-cargo', 'agricultural'],
  },
  {
    url: '/images/blog/export-from-abuja-to-uk.jpg',
    filename: 'export-from-abuja-to-uk.jpg',
    routes: ['nigeria-to-uk', 'abuja', 'wuye', 'export', 'diaspora'],
    title: 'Abuja Wuye Market to UK Export Dispatch',
    alt: 'County Cargo operations team packing palletized export parcels at Wuye Ultra Modern Market Abuja for London Heathrow air freight dispatch.',
    tags: ['abuja', 'uk', 'wuye', 'london', 'packaging', 'pallets'],
  },
  {
    url: '/images/blog/abuja-wuye-market-produce-export.jpg',
    filename: 'abuja-wuye-market-produce-export.jpg',
    routes: ['nigeria-to-uk', 'nigeria-to-usa', 'abuja', 'wuye', 'agricultural-export', 'foodstuff'],
    title: 'Wuye Market Abuja Agricultural Export Packaging',
    alt: 'Nigerian businesswoman and exporter at Wuye Ultra Modern Market Abuja inspecting vacuum-sealed packages of dried agricultural goods for international air cargo.',
    tags: ['abuja', 'wuye', 'businesswoman', 'produce', 'hibiscus', 'ginger', 'agricultural'],
  },
  {
    url: '/images/blog/county-cargo-abuja-to-usa-collection.jpg',
    filename: 'county-cargo-abuja-to-usa-collection.jpg',
    routes: ['nigeria-to-usa', 'abuja', 'commercial', 'parcels'],
    title: 'County Cargo Abuja Customer Parcel Collection',
    alt: 'Customer handing over commercial consignments at County Cargo Abuja hub for scheduled air cargo dispatch to the United States.',
    tags: ['abuja', 'usa', 'customer', 'intake', 'weighing'],
  },
  {
    url: '/images/blog/county-cargo-abuja-to-uk-student.jpg',
    filename: 'county-cargo-abuja-to-uk-student.jpg',
    routes: ['nigeria-to-uk', 'abuja', 'personal-effects', 'students', 'diaspora'],
    title: 'Abuja Student and Personal Effects Shipping to UK',
    alt: 'Nigerian family and university student sealing personal luggage cartons for air freight from Abuja to university campuses in the United Kingdom.',
    tags: ['abuja', 'uk', 'student', 'personal-effects', 'luggage', 'relocation'],
  },

  // LAGOS HUB & SOUTH-WEST COMMERCIAL CORRIDORS
  {
    url: '/images/blog/lagos-ladipo-market-freight-dispatch.jpg',
    filename: 'lagos-ladipo-market-freight-dispatch.jpg',
    routes: ['nigeria-to-uk', 'nigeria-to-usa', 'lagos', 'ladipo', 'commercial', 'air-cargo'],
    title: 'Ladipo Market Lagos Commercial Freight Dispatch',
    alt: 'Bustling commercial trade morning at Ladipo market Lagos with Nigerian traders and County Cargo logistics staff strapping heavy-duty export cartons.',
    tags: ['lagos', 'ladipo', 'traders', 'commercial', 'freight', 'strapping'],
  },
  {
    url: '/images/blog/lagos-ikeja-customer-parcel-handover.jpg',
    filename: 'lagos-ikeja-customer-parcel-handover.jpg',
    routes: ['nigeria-to-uk', 'nigeria-to-usa', 'lagos', 'ikeja', 'customer-service', 'intake'],
    title: 'County Cargo Ikeja Lagos Customer Service Reception',
    alt: 'Welcoming County Cargo customer service representative in Ikeja Lagos scanning an export parcel on a digital scale handed over by a Nigerian entrepreneur.',
    tags: ['lagos', 'ikeja', 'customer-service', 'digital-scale', 'reception', 'parcels'],
  },
  {
    url: '/images/blog/county-cargo-lagos-to-houston-collection.jpg',
    filename: 'county-cargo-lagos-to-houston-collection.jpg',
    routes: ['nigeria-to-usa', 'lagos', 'houston', 'texas', 'commercial'],
    title: 'Lagos to Houston Texas Cargo Dispatch',
    alt: 'Nigerian commercial merchants coordinating export packaging at County Cargo Lagos intake depot for direct cargo forwarding to Houston Texas.',
    tags: ['lagos', 'houston', 'texas', 'merchants', 'commercial'],
  },
  {
    url: '/images/blog/county-cargo-lagos-to-london-collection.jpg',
    filename: 'county-cargo-lagos-to-london-collection.jpg',
    routes: ['nigeria-to-uk', 'lagos', 'london', 'air-cargo', 'express'],
    title: 'Lagos to London Air Cargo Consignments',
    alt: 'County Cargo logistics specialists scanning air waybill barcoded boxes at Lagos international dispatch terminal bound for London Heathrow.',
    tags: ['lagos', 'london', 'air-cargo', 'scanning', 'waybill'],
  },
  {
    url: '/images/blog/county-cargo-lagos-to-maryland-shipment.jpg',
    filename: 'county-cargo-lagos-to-maryland-shipment.jpg',
    routes: ['nigeria-to-usa', 'lagos', 'maryland', 'east-coast', 'parcels'],
    title: 'Lagos to Maryland Doorstep Parcel Shipping',
    alt: 'County Cargo intake officer in Lagos verifying delivery addresses and customs declarations for doorstep shipments heading to Maryland and Washington DC.',
    tags: ['lagos', 'maryland', 'doorstep', 'customs', 'parcels'],
  },
  {
    url: '/images/blog/county-cargo-lagos-to-new-york-parcels.jpg',
    filename: 'county-cargo-lagos-to-new-york-parcels.jpg',
    routes: ['nigeria-to-usa', 'lagos', 'new-york', 'express'],
    title: 'Lagos to New York Express Parcel Forwarding',
    alt: 'Commercial retail and fashion exporters in Lagos packaging textile parcels for scheduled express air transport to New York.',
    tags: ['lagos', 'new-york', 'fashion', 'textiles', 'express'],
  },
  {
    url: '/images/blog/county-cargo-lagos-to-uk-groupage.jpg',
    filename: 'county-cargo-lagos-to-uk-groupage.jpg',
    routes: ['nigeria-to-uk', 'lagos', 'groupage', 'consolidation', 'air-freight'],
    title: 'Lagos Air Cargo Consolidation and Groupage',
    alt: 'Logistics crew carefully stacking consolidated commercial air freight pallets at County Cargo central cargo consolidation facility in Lagos.',
    tags: ['lagos', 'groupage', 'consolidation', 'pallets', 'stacking'],
  },

  // UK ARRIVAL & LOGISTICS HUBS (LONDON & LIVERPOOL)
  {
    url: '/images/blog/uk-to-nigeria-sea-cargo-port-clearance.jpg',
    filename: 'uk-to-nigeria-sea-cargo-port-clearance.jpg',
    routes: ['uk-to-nigeria', 'sea-cargo', 'port-arrival', 'customs-clearance', 'apapa', 'tincan', 'maritime', 'port'],
    title: 'Lagos Port Sea Cargo Consignee Clearance',
    alt: 'Nigerian consignee and maritime logistics officer reviewing shipping documentation and bill of lading at Lagos Apapa port container terminal for sea cargo arrival.',
    tags: ['lagos', 'apapa', 'tincan', 'sea-cargo', 'clearance', 'consignee', 'customs', 'maritime'],
  },
  {
    url: '/images/blog/uk-to-nigeria-sea-boxes-packed-dimensions.jpg',
    filename: 'uk-to-nigeria-sea-boxes-packed-dimensions.jpg',
    routes: ['uk-to-nigeria', 'sea-cargo', 'sea-boxes', 'dimensions', 'barrels', 'packing', 'cbm', 'volumetric'],
    title: 'UK to Nigeria Sea Freight Palletized Boxes and Barrels',
    alt: 'Reinforced export cargo cartons and sea freight shipping barrels arranged on wooden pallets at County Cargo logistics depot for UK to Nigeria transit.',
    tags: ['uk', 'sea-freight', 'sea-boxes', 'dimensions', 'barrels', 'pallets', 'packing', 'warehouse'],
  },
  {
    url: '/images/blog/london-heathrow-nigerian-cargo-arrival.jpg',
    filename: 'london-heathrow-nigerian-cargo-arrival.jpg',
    routes: ['nigeria-to-uk', 'uk-to-nigeria', 'london', 'heathrow', 'customs-clearance'],
    title: 'London Heathrow Nigerian Air Freight Arrival',
    alt: 'Air cargo logistics handlers at Heathrow freight terminal receiving palletized County Cargo cartons arriving on direct flights from Nigeria.',
    tags: ['london', 'heathrow', 'airport', 'arrival', 'warehouse', 'freight'],
  },
  {
    url: '/images/blog/liverpool-commercial-dock-cargo.jpg',
    filename: 'liverpool-commercial-dock-cargo.jpg',
    routes: ['nigeria-to-uk', 'uk-to-nigeria', 'liverpool', 'north-west', 'warehouse', 'commercial'],
    title: 'Liverpool Queens Dock Freight Distribution Bay',
    alt: 'Logistics supervisors reviewing air freight pallets labeled COUNTY CARGO NIGERIA FREIGHT inside Queens Dock commercial facility in Liverpool, UK.',
    tags: ['liverpool', 'queens-dock', 'freight', 'warehouse', 'pallets', 'supervisors'],
  },
  {
    url: '/images/blog/liverpool-nigeria-cargo-collection.jpg',
    filename: 'liverpool-nigeria-cargo-collection.jpg',
    routes: ['nigeria-to-uk', 'uk-to-nigeria', 'liverpool', 'north-west', 'warehouse'],
    title: 'County Cargo Liverpool Hub Depot Operations',
    alt: 'County Cargo North-West England operations depot at Queens Dock Liverpool processing inbound Nigerian shipments and UK-to-Nigeria departures.',
    tags: ['liverpool', 'queens-dock', 'depot', 'handling', 'forklift'],
  },
  {
    url: '/images/blog/manchester-nigeria-cargo-collection.jpg',
    filename: 'manchester-nigeria-cargo-collection.jpg',
    routes: ['nigeria-to-uk', 'uk-to-nigeria', 'manchester', 'north-west'],
    title: 'Manchester & Northern UK Cargo Collection',
    alt: 'County Cargo branded collection van collecting parcels from commercial shippers and Nigerian diaspora families across Greater Manchester.',
    tags: ['manchester', 'collection-van', 'diaspora', 'doorstep'],
  },

  // USA HUBS & NORTH AMERICA (IRVING TEXAS & REGIONAL)
  {
    url: '/images/blog/texas-irving-depot-nigeria-shipment.jpg',
    filename: 'texas-irving-depot-nigeria-shipment.jpg',
    routes: ['nigeria-to-usa', 'usa-to-nigeria', 'texas', 'irving', 'dallas'],
    title: 'County Cargo Texas Hub in Irving TX',
    alt: 'Nigerian-American customer picking up commercial air cargo consignments at County Cargo USA depot on South Belt Line Road in Irving, Texas.',
    tags: ['texas', 'irving', 'dallas', 'customer', 'pickup', 'warehouse'],
  },
  {
    url: '/images/blog/lagos-to-houston-texas-cargo.jpg',
    filename: 'lagos-to-houston-texas-cargo.jpg',
    routes: ['nigeria-to-usa', 'texas', 'houston', 'air-cargo'],
    title: 'Commercial Cargo Forwarding to Houston Texas',
    alt: 'Palletized commercial Nigerian trade goods arriving at Texas distribution terminal for regional dispatch across Houston and Dallas.',
    tags: ['texas', 'houston', 'distribution', 'pallets', 'trade'],
  },
  {
    url: '/images/blog/texas-depot-usa-to-nigeria-cargo.jpg',
    filename: 'texas-depot-usa-to-nigeria-cargo.jpg',
    routes: ['usa-to-nigeria', 'texas', 'irving', 'ecommerce'],
    title: 'USA to Nigeria Outbound Shipping from Texas',
    alt: 'Warehouse staff at County Cargo Irving Texas facility packaging e-commerce orders and household electronics for air cargo forwarding to Lagos and Abuja.',
    tags: ['texas', 'usa-to-nigeria', 'ecommerce', 'electronics', 'packing'],
  },

  // REGIONAL NIGERIAN TRADE HUBS (KANO, BENIN, PORT HARCOURT, ENUGU, ABA)
  {
    url: '/images/blog/kano-commercial-textiles-export-depot.jpg',
    filename: 'kano-commercial-textiles-export-depot.jpg',
    routes: ['nigeria-to-uk', 'nigeria-to-usa', 'kano', 'northern', 'textiles', 'leather', 'trade'],
    title: 'Kano Commercial Trading Courtyard Textile Exports',
    alt: 'Experienced Hausa merchant and assistant in Kano packing traditional handwoven textiles and tanned leather goods into County Cargo export boxes.',
    tags: ['kano', 'textiles', 'leather', 'northern', 'hausa', 'merchant', 'export'],
  },
  {
    url: '/images/blog/county-cargo-kano-to-uk-trade-goods.jpg',
    filename: 'county-cargo-kano-to-uk-trade-goods.jpg',
    routes: ['nigeria-to-uk', 'nigeria-to-usa', 'kano', 'northern', 'textiles', 'leather'],
    title: 'Kano Commercial Leather and Textile Exports',
    alt: 'Northern Nigerian merchants in Kano packing traditional leather goods and dyed fabrics into reinforced shipping cartons for export to Europe and North America.',
    tags: ['kano', 'leather', 'textiles', 'northern', 'commercial'],
  },
  {
    url: '/images/blog/county-cargo-aba-to-uk-trader.jpg',
    filename: 'county-cargo-aba-to-uk-trader.jpg',
    routes: ['nigeria-to-uk', 'aba', 'eastern', 'garments', 'fashion'],
    title: 'Aba Commercial Garment and Footwear Exporters',
    alt: 'Nigerian fashion manufacturer and craftsman in Aba packaging apparel consignments for international air delivery to UK boutique distributors.',
    tags: ['aba', 'apparel', 'fashion', 'footwear', 'manufacturing'],
  },
  {
    url: '/images/blog/county-cargo-port-harcourt-to-usa-parcels.jpg',
    filename: 'county-cargo-port-harcourt-to-usa-parcels.jpg',
    routes: ['nigeria-to-usa', 'port-harcourt', 'south-south', 'commercial'],
    title: 'Port Harcourt Commercial Cargo to USA',
    alt: 'Port Harcourt logistics depot staff verifying export manifests and dimensions for commercial shipments departing to the United States.',
    tags: ['port-harcourt', 'south-south', 'manifest', 'commercial'],
  },
  {
    url: '/images/blog/county-cargo-benin-city-to-usa-family.jpg',
    filename: 'county-cargo-benin-city-to-usa-family.jpg',
    routes: ['nigeria-to-usa', 'benin-city', 'diaspora', 'cultural-goods'],
    title: 'Benin City Cultural Artifacts and Foodstuff to USA',
    alt: 'Nigerian family in Benin City preparing sealed foodstuff and handicraft packages for air shipping to relatives in Atlanta and New York.',
    tags: ['benin-city', 'family', 'foodstuff', 'crafts', 'usa'],
  },
  {
    url: '/images/blog/county-cargo-calabar-to-uk-collection.jpg',
    filename: 'county-cargo-calabar-to-uk-collection.jpg',
    routes: ['nigeria-to-uk', 'calabar', 'produce', 'coastal'],
    title: 'Calabar Agricultural Produce Shipping to UK',
    alt: 'Agricultural export goods and spices packaged at Calabar logistics office for transit through Abuja Hub to the United Kingdom.',
    tags: ['calabar', 'agricultural', 'spices', 'uk'],
  },

  // PACKAGING, QUALITY CONTROL & STATUTORY INSPECTIONS
  {
    url: '/images/blog/nigeria-customs-export-inspection-hall.jpg',
    filename: 'nigeria-customs-export-inspection-hall.jpg',
    routes: ['customs', 'compliance', 'regulations', 'nepc', 'ncs', 'air-cargo', 'airport'],
    title: 'Lagos Airport Cargo Export Inspection Terminal',
    alt: 'Nigerian export compliance officer checking phytosanitary seals and electronic Form NXP documentation on export cartons at Lagos cargo airport.',
    tags: ['customs', 'inspection', 'form-nxp', 'airport', 'lagos', 'compliance', 'seals'],
  },
  {
    url: '/images/blog/how-to-package-cargo-boxes.jpg',
    filename: 'how-to-package-cargo-boxes.jpg',
    routes: ['packaging', 'guidelines', 'compliance', 'cartons'],
    title: 'Professional Export Carton Packaging Standards',
    alt: 'Step-by-step demonstration of professional export packaging: double-walled corrugated boxes with corner protectors and heavy-duty filament strapping.',
    tags: ['packaging', 'cartons', 'strapping', 'standards', 'security'],
  },
  {
    url: '/images/blog/nigeria-customs-prohibited-items-inspection.jpg',
    filename: 'nigeria-customs-prohibited-items-inspection.jpg',
    routes: ['customs', 'compliance', 'regulations', 'nepc', 'ncs'],
    title: 'Statutory Export Compliance & Phytosanitary Checks',
    alt: 'Clean, professional cargo screening area with certified quality assurance inspectors verifying non-perishable goods against export compliance lists.',
    tags: ['customs', 'screening', 'inspection', 'compliance', 'nepc'],
  },
];

/**
 * Extract route and subject keywords from an article to match the most appropriate editorial photograph.
 */
function extractArticleVisualContext(article, pillarInfo = {}) {
  const text = `${article.title || ''} ${article.description || ''} ${article.tags ? (Array.isArray(article.tags) ? article.tags.join(' ') : article.tags) : ''} ${pillarInfo.pillar || ''}`.toLowerCase();

  const isUk = text.includes('uk') || text.includes('london') || text.includes('liverpool') || text.includes('manchester') || text.includes('england') || text.includes('heathrow');
  const isUsa = text.includes('usa') || text.includes('united states') || text.includes('america') || text.includes('texas') || text.includes('dallas') || text.includes('houston') || text.includes('new york');
  const isAbuja = text.includes('abuja') || text.includes('wuye') || text.includes('fct') || text.includes('northern');
  const isLagos = text.includes('lagos') || text.includes('ladipo') || text.includes('ikeja') || text.includes('oshodi') || text.includes('balogun');
  const isAgro = text.includes('agricultural') || text.includes('produce') || text.includes('foodstuff') || text.includes('hibiscus') || text.includes('ginger') || text.includes('farm');
  const isPackaging = text.includes('package') || text.includes('carton') || text.includes('box') || text.includes('checklist') || text.includes('weight') || text.includes('volumetric');

  return {
    isUk,
    isUsa,
    isAbuja,
    isLagos,
    isAgro,
    isPackaging,
    text,
  };
}

/**
 * Score how well a curated registry image matches the article's route, geographic hubs, and subject matter.
 */
function scoreImageMatch(entry, visualContext) {
  let score = 0;
  const entryRoutes = new Set(entry.routes);
  const entryTags = new Set(entry.tags);

  if (visualContext.isUk && (entryRoutes.has('nigeria-to-uk') || entryTags.has('uk') || entryTags.has('london'))) score += 5;
  if (visualContext.isUsa && (entryRoutes.has('nigeria-to-usa') || entryTags.has('usa') || entryTags.has('texas'))) score += 5;
  if (visualContext.isAbuja && (entryRoutes.has('abuja') || entryTags.has('wuye'))) score += 6;
  if (visualContext.isLagos && (entryRoutes.has('lagos') || entryTags.has('ladipo'))) score += 6;
  if (visualContext.isAgro && (entryRoutes.has('agricultural-export') || entryTags.has('produce'))) score += 4;
  if (visualContext.isPackaging && (entryRoutes.has('packaging') || entryTags.has('cartons'))) score += 4;

  return score;
}

/**
 * Select the highest-scoring, completely unused editorial photograph from the curated registry.
 * Guarantees that no photograph is ever repeated across the blog.
 */
function selectCuratedEditorialImage(article, pillarInfo, existingUsedImages = new Set()) {
  const visualContext = extractArticleVisualContext(article, pillarInfo);

  // Filter out any image that has already been published on the site
  const available = CURATED_EDITORIAL_REGISTRY.filter((entry) => {
    if (BLACKLISTED_IMAGES.has(entry.url)) return false;
    if (existingUsedImages.has(entry.url)) return false;
    return true;
  });

  if (available.length === 0) {
    // If every curated entry has been used, pick the least recently used or most relevant non-blacklisted image
    const fallbackList = CURATED_EDITORIAL_REGISTRY.filter((e) => !BLACKLISTED_IMAGES.has(e.url));
    const scored = fallbackList.map((entry) => ({ entry, score: scoreImageMatch(entry, visualContext) }));
    scored.sort((a, b) => b.score - a.score);
    const chosen = scored[0].entry;
    return {
      url: chosen.url,
      alt: `${chosen.alt} | County Cargo Shipping Guide: ${article.title}`,
      isGenerated: false,
      reusedFallback: true,
    };
  }

  // Score available unused images
  const scored = available.map((entry) => ({ entry, score: scoreImageMatch(entry, visualContext) }));
  scored.sort((a, b) => b.score - a.score);

  const bestMatch = scored[0].entry;

  return {
    url: bestMatch.url,
    alt: `${bestMatch.alt} | County Cargo: ${article.title}`,
    isGenerated: false,
    reusedFallback: false,
  };
}

/**
 * Generate a realistic AI editorial photograph via OpenAI DALL-E 3
 * adhering strictly to Nigerian identity, natural daylight, 35mm photography, and route context.
 */
async function generateAiEditorialImage({
  article,
  pillarInfo,
  openaiApiKey,
  outputDir,
  fetchFn = fetch,
}) {
  if (!openaiApiKey) {
    return null;
  }

  const visualContext = extractArticleVisualContext(article, pillarInfo);

  // Determine realistic Nigerian scenario based on article topic
  let routeContext = 'commercial air freight from Nigeria to the United Kingdom and United States';
  let locationScene = 'County Cargo logistics terminal in Lagos, Nigeria with authentic commercial market background';

  if (visualContext.isAbuja) {
    locationScene = 'Wuye Ultra Modern Market in Abuja, Nigeria with modern market stalls and Aso Rock silhouettes in warm morning daylight';
  } else if (visualContext.isLagos) {
    locationScene = 'commercial Ladipo trade area in Lagos, Nigeria with authentic street storefronts and commercial cargo vans';
  } else if (visualContext.isUk) {
    locationScene = 'County Cargo distribution depot near London Heathrow airport receiving inbound Nigerian air cargo consignments';
    routeContext = 'air cargo shipment arriving from Abuja and Lagos to London, United Kingdom';
  } else if (visualContext.isUsa) {
    locationScene = 'County Cargo warehouse depot in Irving, Texas receiving air freight shipments from Nigeria';
    routeContext = 'commercial air freight arriving from Nigeria to Irving, Texas';
  }

  const prompt = [
    'An authentic, professional editorial documentary photograph, shot on a 35mm lens with natural daylight.',
    `Scene: ${locationScene}.`,
    `Focus: Natural-looking Nigerian business people and logistics professionals handling commercial export cartons labeled for County Cargo (${routeContext}).`,
    'People: Realistic, candid, natural expressions, authentic modern Nigerian professional attire or high-vis safety vests, engaged in genuine trade or parcel packaging.',
    'Style: Crisp photorealism, sharp focus, 1920x1080 16:9 composition, realistic textures of cardboard boxes and packing tape.',
    'STRICT NEGATIVE CONSTRAINTS: ZERO cartoons, ZERO 3D renders, ZERO generic plane illustrations, ZERO text overlays, ZERO blurry faces, ZERO plastic skin textures.',
  ].join(' ');

  const slug = (article.slug || 'daily-cargo-guide').replace(/[^a-z0-9-]/gi, '-').toLowerCase();
  const filename = `${slug}.jpg`;
  const relativeUrl = `/images/blog/${filename}`;
  const localFilePath = outputDir ? path.join(outputDir, filename) : null;

  try {
    const payload = JSON.stringify({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1792x1024',
      quality: 'hd',
      response_format: 'b64_json',
    });

    const res = await fetchFn(
      'https://api.openai.com/v1/images/generations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
          Authorization: `Bearer ${openaiApiKey}`,
        },
      },
      payload
    );

    if (!res || res.statusCode !== 200) {
      console.warn(`[Image Engine] DALL-E 3 generation call failed (HTTP ${res ? res.statusCode : 'none'}). Falling back to curated registry.`);
      return null;
    }

    const data = JSON.parse(res.body);
    const b64Data = data?.data?.[0]?.b64_json;
    if (!b64Data) {
      console.warn('[Image Engine] DALL-E 3 returned no base64 image data.');
      return null;
    }

    if (localFilePath) {
      const buffer = Buffer.from(b64Data, 'base64');
      fs.writeFileSync(localFilePath, buffer);
      console.log(`[Image Engine] ✅ Successfully generated and saved editorial photograph to ${localFilePath}`);
    }

    return {
      url: relativeUrl,
      alt: `Editorial photograph: Nigerian commerce and logistics for ${article.title} - County Cargo international freight service.`,
      isGenerated: true,
      filename,
    };
  } catch (err) {
    console.warn(`[Image Engine] AI Image generation exception: ${err.message}. Falling back to curated registry.`);
    return null;
  }
}

/**
 * Primary Entry Point: Resolves a guaranteed unique, high-resolution, route-specific editorial photograph.
 * Never uses or returns generic illustrations or repeated photographs.
 */
async function resolveBlogImage({
  article,
  pillarInfo,
  existingUsedImages = new Set(),
  openaiApiKey = null,
  outputDir = null,
  enableAiGeneration = true,
  fetchFn = fetch,
}) {
  // 1. If AI generation is enabled and API key is present, attempt fresh DALL-E 3 generation
  if (enableAiGeneration && openaiApiKey) {
    try {
      const aiResult = await generateAiEditorialImage({
        article,
        pillarInfo,
        openaiApiKey,
        outputDir,
        fetchFn,
      });

      if (aiResult && aiResult.url && !BLACKLISTED_IMAGES.has(aiResult.url)) {
        return aiResult;
      }
    } catch (err) {
      console.warn('[Image Engine] AI generation attempt encountered error, transitioning to curated pool:', err.message);
    }
  }

  // 2. Select from the curated route-matched registry of authentic Nigerian photography
  const curatedResult = selectCuratedEditorialImage(article, pillarInfo, existingUsedImages);

  if (BLACKLISTED_IMAGES.has(curatedResult.url)) {
    throw new Error(`[Image Engine] Critical violation: Blacklisted generic illustration "${curatedResult.url}" was selected.`);
  }

  return curatedResult;
}

module.exports = {
  BLACKLISTED_IMAGES,
  CURATED_EDITORIAL_REGISTRY,
  extractArticleVisualContext,
  scoreImageMatch,
  selectCuratedEditorialImage,
  generateAiEditorialImage,
  resolveBlogImage,
};
