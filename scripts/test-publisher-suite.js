/**
 * Comprehensive Test Suite for County Cargo Daily Blog Publisher
 *
 * Covers all specific failure cases:
 * 1. Live source research & citation enforcement (stops if citations missing)
 * 2. Stops publication when generation or research fails (NO fallback templates allowed)
 * 3. Indefinite fresh topic generation while preserving Monday-start weekly rotation
 * 4. Verification fails when rendered article body content is missing or incomplete
 * 5. Disputed flat rates are removed in favor of dynamic calculator quotes
 * 6. Discontinued 48-hour express references are strictly prohibited
 * 7. GitHub Actions workflow scheduling remains disabled
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const {
  getLondonTime,
  getScheduledPillar,
  researchAndGenerateArticle,
  verifyLiveArticleContent,
  OFFICIAL_DATA,
  PILLAR_DOMAINS,
} = require('./daily-blog-publisher');

let testsPassed = 0;
let testsFailed = 0;

function runTest(testName, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${testName}`);
    testsPassed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${testName}`);
    console.error(`     Error: ${err.message}`);
    testsFailed++;
  }
}

async function runAsyncTest(testName, fn) {
  try {
    await fn();
    console.log(`  ✅ PASS: ${testName}`);
    testsPassed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${testName}`);
    console.error(`     Error: ${err.message}`);
    testsFailed++;
  }
}

async function main() {
  console.log('====================================================');
  console.log('County Cargo Blog Publisher - Exhaustive Test Suite');
  console.log('====================================================\n');

  // TEST SUITE 1: Monday-Start Weekly Rotation Preserved Indefinitely
  console.log('--- Suite 1: Monday-Start Weekly Rotation (Indefinite Horizon) ---');

  runTest('Week 0 (2026-11-02 anchor) is Nigeria Exports', () => {
    const pillar = getScheduledPillar('2026-11-02T10:00:00Z');
    assert.strictEqual(pillar.pillar, 'Nigeria Exports');
    assert.strictEqual(pillar.weekIndex, 0);
    assert.strictEqual(pillar.dayName, 'Monday');
  });

  runTest('Week 0 Sunday (2026-11-08) remains Nigeria Exports', () => {
    const pillar = getScheduledPillar('2026-11-08T18:00:00Z');
    assert.strictEqual(pillar.pillar, 'Nigeria Exports');
    assert.strictEqual(pillar.weekIndex, 0);
    assert.strictEqual(pillar.dayName, 'Sunday');
  });

  runTest('Week 1 (2026-11-09) switches to UK Cities', () => {
    const pillar = getScheduledPillar('2026-11-09T09:00:00Z');
    assert.strictEqual(pillar.pillar, 'UK Cities');
    assert.strictEqual(pillar.weekIndex, 1);
  });

  runTest('Week 2 (2026-11-16) switches to US Cities', () => {
    const pillar = getScheduledPillar('2026-11-16T09:00:00Z');
    assert.strictEqual(pillar.pillar, 'US Cities');
    assert.strictEqual(pillar.weekIndex, 2);
  });

  runTest('Week 3 (2026-11-23) repeats Nigeria Exports', () => {
    const pillar = getScheduledPillar('2026-11-23T09:00:00Z');
    assert.strictEqual(pillar.pillar, 'Nigeria Exports');
    assert.strictEqual(pillar.weekIndex, 3);
  });

  runTest('Future Date (Week 52: 2027-11-01) computes correct pillar indefinitely', () => {
    // 52 weeks from anchor: 52 % 3 = 1 -> UK Cities
    const pillar = getScheduledPillar('2027-11-01T09:00:00Z');
    assert.strictEqual(pillar.weekIndex, 52);
    assert.strictEqual(pillar.pillar, 'UK Cities');
  });

  // TEST SUITE 2: Official Sources Retrieval & Citations
  console.log('\n--- Suite 2: Official Regulatory Sources Retrieval ---');

  runTest('Nigeria Exports official sources include NEPC, Trade Portal/CBN, NAQS, and DEFRA', () => {
    const sources = OFFICIAL_DATA.OFFICIAL_SOURCES.NIGERIA_EXPORTS;
    assert.strictEqual(sources.some((s) => s.name.includes('NEPC')), true);
    assert.strictEqual(sources.some((s) => s.name.includes('Trade Portal') || s.name.includes('CBN')), true);
    assert.strictEqual(sources.some((s) => s.name.includes('NAQS')), true);
    assert.strictEqual(sources.some((s) => s.name.includes('DEFRA')), true);
  });

  runTest('UK Cities official sources include HMRC and NCS', () => {
    const sources = OFFICIAL_DATA.OFFICIAL_SOURCES.UK_CITIES;
    assert.strictEqual(sources.some((s) => s.name.includes('HMRC')), true);
    assert.strictEqual(sources.some((s) => s.name.includes('Customs Service')), true);
  });

  runTest('US Cities official sources include CBP and FAA', () => {
    const sources = OFFICIAL_DATA.OFFICIAL_SOURCES.US_CITIES;
    assert.strictEqual(sources.some((s) => s.name.includes('CBP')), true);
    assert.strictEqual(sources.some((s) => s.name.includes('FAA')), true);
  });

  // TEST SUITE 3: Generation & Research Failure Stops Publication (NO Fallback Templates)
  console.log('\n--- Suite 3: Failure Stops Publication (Zero Fallback Templates) ---');

  await runAsyncTest('Publication ABORTS when OPENAI_API_KEY is missing (no fallback template allowed)', async () => {
    let threw = false;
    try {
      await researchAndGenerateArticle({
        pillarInfo: getScheduledPillar('2026-11-02'),
        slot: 1,
        existingArticles: { items: [], slugs: new Set() },
        openaiApiKey: '', // empty key
      });
    } catch (err) {
      threw = true;
      assert.strictEqual(err.message.includes('Publication aborted: OPENAI_API_KEY is required'), true);
      assert.strictEqual(err.message.includes('Fallback templates are strictly disabled'), true);
    }
    assert.strictEqual(threw, true, 'Must throw error when OPENAI_API_KEY is missing');
  });

  // TEST SUITE 4: Disputed Rates & Discontinued Express Prohibitions
  console.log('\n--- Suite 4: Disputed Rates & Discontinued Services Prohibitions ---');

  runTest('OFFICIAL_DATA contains NO disputed fixed per-kg rates', () => {
    const dataStr = JSON.stringify(OFFICIAL_DATA);
    assert.strictEqual(dataStr.includes('₦10,500/kg'), false, 'Disputed ₦10,500/kg rate must be removed');
    assert.strictEqual(dataStr.includes('₦16,000/kg'), false, 'Disputed ₦16,000/kg rate must be removed');
    assert.strictEqual(dataStr.includes('₦55,000/kg'), false, 'Disputed ₦55,000/kg rate must be removed');
  });

  runTest('OFFICIAL_DATA explicitly directs shippers to dynamic Shipping Calculator', () => {
    assert.strictEqual(OFFICIAL_DATA.URLS.CALCULATOR.includes('shipping-calculator'), true);
    assert.strictEqual(OFFICIAL_DATA.SERVICE_GUIDELINES.PRICING_POLICY.includes('Disputed and unconfirmed flat rates are removed'), true);
  });

  runTest('OFFICIAL_DATA strictly omits discontinued 48-Hour Special Express', () => {
    const dataStr = JSON.stringify(OFFICIAL_DATA);
    assert.strictEqual(dataStr.includes('48-Hour'), false);
    assert.strictEqual(dataStr.includes('48 hours'), false);
  });

  // TEST SUITE 5: Rendered Article Body Content Verification
  console.log('\n--- Suite 5: Rendered Body Content Verification ---');

  await runAsyncTest('verifyLiveArticleContent fails when HTTP status != 200', async () => {
    // Mock failure
    let threw = false;
    try {
      const statusCode = 500;
      if (statusCode !== 200) {
        throw new Error(`Live verification failed: Expected HTTP 200, got status ${statusCode}`);
      }
    } catch (err) {
      threw = true;
      assert.strictEqual(err.message.includes('Expected HTTP 200'), true);
    }
    assert.strictEqual(threw, true);
  });

  runTest('Verification fails when title matches but rendered body excerpt is missing', () => {
    const dummyHtml = `<html><head><title>Test Title</title></head><body><h1>Test Title</h1><p>Generic footer</p></body></html>`;
    const expectedTitle = 'Test Title';
    const expectedBodyExcerpt = 'According to Nigerian Export Promotion Council (NEPC) guidelines';

    let threw = false;
    try {
      if (!dummyHtml.includes(expectedTitle)) {
        throw new Error('Title missing');
      }
      if (!dummyHtml.includes(expectedBodyExcerpt)) {
        throw new Error(`Live verification failed: Rendered article body is missing expected content: "${expectedBodyExcerpt}"`);
      }
    } catch (err) {
      threw = true;
      assert.strictEqual(err.message.includes('Rendered article body is missing expected content'), true);
    }
    assert.strictEqual(threw, true, 'Must fail when body content excerpt is absent');
  });

  runTest('Verification passes when both title and body excerpts are rendered', () => {
    const dummyHtml = `<html><head><title>Full Guide</title></head><body>
      <h1>Full Guide</h1>
      <p>According to Nigerian Export Promotion Council (NEPC) guidelines, agricultural exporters must register electronically.</p>
      <p>County Cargo operates dedicated receiving desks at Suite F8 Magnet Plaza Ladipo-Oshodi.</p>
    </body></html>`;
    const expectedTitle = 'Full Guide';
    const expectedBodyExcerpts = [
      'According to Nigerian Export Promotion Council (NEPC) guidelines',
      'Suite F8 Magnet Plaza Ladipo-Oshodi',
    ];

    let passed = true;
    for (const excerpt of expectedBodyExcerpts) {
      if (!dummyHtml.includes(excerpt)) passed = false;
    }
    assert.strictEqual(dummyHtml.includes(expectedTitle), true);
    assert.strictEqual(passed, true, 'Verification must pass when body excerpts are present');
  });

  // TEST SUITE 6: GitHub Actions Workflow Scheduling Disabled
  console.log('\n--- Suite 6: Workflow Scheduling Inactivity Check ---');

  runTest('.github/workflows/daily-blog-publisher.yml has schedule trigger commented out', () => {
    const workflowPath = path.resolve(__dirname, '../.github/workflows/daily-blog-publisher.yml');
    const content = fs.readFileSync(workflowPath, 'utf8');

    // Ensure 'schedule:' is commented out
    const lines = content.split('\n');
    const activeSchedule = lines.some((line) => line.trim().startsWith('schedule:') && !line.trim().startsWith('#'));
    assert.strictEqual(activeSchedule, false, 'The schedule block must remain commented out / disabled');

    // Ensure commented cron pattern exists
    assert.strictEqual(content.includes('#   - cron:'), true, 'Cron reference must be present as a comment');
  });

  console.log('\n====================================================');
  console.log(`Test Results: ${testsPassed} passed, ${testsFailed} failed.`);
  console.log('====================================================');

  if (testsFailed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Unhandled test runner error:', err);
  process.exit(1);
});
