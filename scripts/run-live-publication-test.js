/**
 * Live Authenticated Publication & Idempotency Verification Script
 *
 * Runs:
 * 1. An authenticated publication test to /api/admin/posts with official source links
 * 2. Live verification of the rendered article (HTTP 200, title, and body content)
 * 3. A rerun of the exact same slot to confirm that no duplicate is created (409 Slot Collision)
 */

const https = require('https');
const http = require('http');
const url = require('url');

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
      reject(new Error(`Request timed out to ${targetUrl}`));
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runLiveTest(baseUrl, apiKey) {
  console.log(`====================================================`);
  console.log(`Running Live Authenticated Publication Test`);
  console.log(`Target URL: ${baseUrl}`);
  console.log(`====================================================\n`);

  const testSlotId = `live-test-${Date.now()}-slot1`;
  const testSlug = `live-audit-test-export-guidance-${Date.now()}`;
  const testTitle = `Live Audit Verification: Official Agricultural Export Compliance Protocols`;

  const payloadObj = {
    title: testTitle,
    slug: testSlug,
    category: 'Export Services',
    author: 'County Cargo Logistics Quality Desk',
    publicationDate: new Date().toISOString().split('T')[0],
    tags: ['Live Test', 'Nigeria Exports', 'NEPC Compliance', 'Verification'],
    description: 'Live authenticated publication testing atomic slot reservation and rendered body content verification.',
    image: '/cargo-plane-hero.png',
    slotId: testSlotId,
    content: `## Official Statutory Export Compliance Overview

Under statutory regulations established by the [Nigerian Export Promotion Council (NEPC)](https://nepc.gov.ng) and monitored through the [Nigeria Single Window Trade Portal](https://trade.gov.ng), all commercial freight shipments must adhere to electronic Form NXP processing and clean inspection standards.

### Dedicated Receiving Operations
County Cargo operates verified cargo intake facilities at our primary international dispatch terminals:
- **Lagos Receiving Hub:** Suite F8, Magnet Shopping Plaza, 525 Agege Motor Rd, Ladipo-Oshodi, Lagos
- **Abuja Receiving Hub:** Shop HF426, Turai Yar'adua Block, Wuye Ultra Modern Market, Abuja-FCT

### Regulatory Citations & Evidence
1. [Nigerian Export Promotion Council](https://nepc.gov.ng) - Mandates electronic exporter registration and commercial documentation.
2. [Nigeria Single Window Trade Portal](https://trade.gov.ng) - Authorizes electronic Form NXP submission through authorized dealer banks.

All freight charges are calculated dynamically using the official [County Cargo Shipping Calculator](https://ship.countycargo.com/shipping-calculator).
`.repeat(3),
  };

  const payloadStr = JSON.stringify(payloadObj);

  // STEP 1: Authenticated Publication
  console.log(`[Step 1] Publishing test article with slotId="${testSlotId}"...`);
  const pubRes = await makeRequest(
    `${baseUrl}/api/admin/posts`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payloadStr),
        'x-admin-api-key': apiKey,
      },
    },
    payloadStr
  );

  console.log(`[Step 1] Response Status: HTTP ${pubRes.statusCode}`);
  let pubData;
  try {
    pubData = JSON.parse(pubRes.body);
  } catch (e) {
    throw new Error(`Failed to parse response (HTTP ${pubRes.statusCode}): ${pubRes.body}`);
  }

  if (pubRes.statusCode !== 200 || !pubData.success) {
    throw new Error(`Publication failed: ${pubData.error || pubRes.body}`);
  }
  console.log(`[Step 1] ✅ Article published successfully! Slug: /blog/${testSlug}`);

  // STEP 2: Live Verification of Rendered Content
  console.log(`\n[Step 2] Verifying live rendered article at ${baseUrl}/blog/${testSlug}...`);
  await new Promise((r) => setTimeout(r, 2000));

  const verifyRes = await makeRequest(`${baseUrl}/blog/${testSlug}`, { method: 'GET' });
  console.log(`[Step 2] Live Page Status: HTTP ${verifyRes.statusCode}`);

  if (verifyRes.statusCode !== 200) {
    throw new Error(`Live verification failed: Expected HTTP 200, got ${verifyRes.statusCode}`);
  }

  const html = verifyRes.body;
  if (!html.includes(testTitle)) {
    throw new Error(`Live verification failed: Title "${testTitle}" not rendered in HTML.`);
  }

  const expectedBodyExcerpt = 'Nigerian Export Promotion Council (NEPC)';
  if (!html.includes(expectedBodyExcerpt)) {
    throw new Error(`Live verification failed: Body excerpt "${expectedBodyExcerpt}" missing from rendered HTML.`);
  }

  console.log(`[Step 2] ✅ Live verification passed! HTTP 200, title rendered, and body content verified.`);

  // STEP 3: Rerun That Slot to Confirm No Duplicate Is Created (Atomic Slot Idempotency)
  console.log(`\n[Step 3] Rerunning the exact same slotId="${testSlotId}" to verify atomic duplicate rejection...`);
  const rerunPayload = JSON.stringify({
    ...payloadObj,
    title: 'Different Title on Same Slot',
    slug: `different-slug-${Date.now()}`,
  });

  const rerunRes = await makeRequest(
    `${baseUrl}/api/admin/posts`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(rerunPayload),
        'x-admin-api-key': apiKey,
      },
    },
    rerunPayload
  );

  console.log(`[Step 3] Rerun Response Status: HTTP ${rerunRes.statusCode}`);
  const rerunData = JSON.parse(rerunRes.body);

  if (rerunRes.statusCode === 409 && rerunData.error && rerunData.error.includes('Slot collision')) {
    console.log(`[Step 3] ✅ Rerun correctly rejected with HTTP 409 Conflict: "${rerunData.error}"`);
    console.log(`[Step 3] ✅ Atomic slot reservation verified! Duplicate slot was prevented.`);
  } else {
    throw new Error(`Rerun idempotency check failed: Expected HTTP 409 Slot collision, got HTTP ${rerunRes.statusCode}: ${rerunRes.body}`);
  }

  console.log(`\n====================================================`);
  console.log(`✅ All Live Publication & Idempotency Tests PASSED!`);
  console.log(`====================================================`);
}

const targetBaseUrl = process.argv[2] || process.env.SITE_URL || 'https://countycargo.com';
const testApiKey = process.argv[3] || process.env.ADMIN_API_KEY || 'cc_live_api_key_2026_shipping_blog';

runLiveTest(targetBaseUrl, testApiKey)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Fatal live test failure:', err.message);
    process.exit(1);
  });
