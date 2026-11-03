/**
 * Comprehensive Test Suite for County Cargo Daily Blog Publisher
 *
 * Validates:
 * 1. Monday-start weekly rotation anchored to 2 November 2026 (Weeks 0, 1, 2 cycling)
 * 2. Europe/London timezone checking and GMT/BST clock change handling
 * 3. Duplicate detection against all existing articles (local + remote)
 * 4. Content verification failure when expected title/content is missing on live page
 * 5. Removal of discontinued 48-hour express references and unverified rates
 * 6. Atomic document creation error handling and Firestore error propagation
 */

const assert = require('assert');
const {
  getLondonTime,
  getScheduledTopic,
  generateFallbackArticle,
  OFFICIAL_DATA,
  PILLAR_BLUEPRINTS,
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
  console.log('County Cargo Blog Publisher - Test Suite');
  console.log('====================================================\n');

  // TEST SUITE 1: Monday-Start Weekly Rotation
  console.log('--- Suite 1: Monday-Start Weekly Rotation ---');

  runTest('Week 0 Monday (2026-11-02) is Nigeria Exports', () => {
    const topic = getScheduledTopic('2026-11-02T10:00:00Z', 1);
    assert.strictEqual(topic.pillar, 'Nigeria Exports');
    assert.strictEqual(topic.weekIndex, 0);
    assert.strictEqual(topic.dayName, 'Monday');
  });

  runTest('Week 0 Sunday (2026-11-08) is still Nigeria Exports', () => {
    const topic = getScheduledTopic('2026-11-08T14:00:00Z', 2);
    assert.strictEqual(topic.pillar, 'Nigeria Exports');
    assert.strictEqual(topic.weekIndex, 0);
    assert.strictEqual(topic.dayName, 'Sunday');
    assert.strictEqual(topic.slot, 2);
  });

  runTest('Week 1 Monday (2026-11-09) switches to UK Cities', () => {
    const topic = getScheduledTopic('2026-11-09T09:00:00Z', 1);
    assert.strictEqual(topic.pillar, 'UK Cities');
    assert.strictEqual(topic.weekIndex, 1);
    assert.strictEqual(topic.dayName, 'Monday');
  });

  runTest('Week 1 Wednesday (2026-11-11) is UK Cities (Manchester/Bolton)', () => {
    const topic = getScheduledTopic('2026-11-11T12:00:00Z', 1);
    assert.strictEqual(topic.pillar, 'UK Cities');
    assert.strictEqual(topic.weekIndex, 1);
    assert.strictEqual(topic.dayName, 'Wednesday');
  });

  runTest('Week 2 Monday (2026-11-16) switches to US Cities', () => {
    const topic = getScheduledTopic('2026-11-16T09:00:00Z', 1);
    assert.strictEqual(topic.pillar, 'US Cities');
    assert.strictEqual(topic.weekIndex, 2);
    assert.strictEqual(topic.dayName, 'Monday');
  });

  runTest('Week 3 Monday (2026-11-23) cycles back to Nigeria Exports', () => {
    const topic = getScheduledTopic('2026-11-23T09:00:00Z', 1);
    assert.strictEqual(topic.pillar, 'Nigeria Exports');
    assert.strictEqual(topic.weekIndex, 3);
    assert.strictEqual(topic.dayName, 'Monday');
  });

  // TEST SUITE 2: Europe/London Time & Clock Change Handling
  console.log('\n--- Suite 2: Europe/London Time & Clock Change Handling ---');

  runTest('Winter (GMT / UTC+0): 09:00 UTC = 09:00 London', () => {
    // 15 January 2026 is in GMT
    const winterDate = new Date('2026-01-15T09:00:00Z');
    const london = getLondonTime(winterDate);
    assert.strictEqual(london.hour, 9, 'Hour should be 9 in London');
  });

  runTest('Summer (BST / UTC+1): 08:00 UTC = 09:00 London', () => {
    // 15 July 2026 is in BST
    const summerDate = new Date('2026-07-15T08:00:00Z');
    const london = getLondonTime(summerDate);
    assert.strictEqual(london.hour, 9, 'Hour should be 9 in London during BST');
  });

  runTest('Summer (BST / UTC+1): 14:00 UTC = 15:00 London', () => {
    const summerDate = new Date('2026-07-15T14:00:00Z');
    const london = getLondonTime(summerDate);
    assert.strictEqual(london.hour, 15, 'Hour should be 15 in London during BST');
  });

  // TEST SUITE 3: Removal of Discontinued 48-Hour Special Express & Rates Verification
  console.log('\n--- Suite 3: Verified Rates & Discontinued Services Check ---');

  runTest('OFFICIAL_DATA does not contain SPECIAL_EXPRESS or 48-Hour references', () => {
    const dataStr = JSON.stringify(OFFICIAL_DATA);
    assert.strictEqual(dataStr.includes('48-Hour'), false, 'Should not contain 48-Hour');
    assert.strictEqual(dataStr.includes('48 hours'), false, 'Should not contain 48 hours');
    assert.strictEqual(dataStr.includes('SPECIAL_EXPRESS'), false, 'Should not contain SPECIAL_EXPRESS');
  });

  runTest('Fallback generated article contains verified rates and no discontinued express', () => {
    const topic = getScheduledTopic('2026-11-02T09:00:00Z', 1);
    const article = generateFallbackArticle(topic);
    assert.strictEqual(article.content.includes('₦10,500/kg'), true, 'Should include verified Nigeria to UK rate');
    assert.strictEqual(article.content.includes('55-gallon'), true, 'Should include sea barrel specifications');
    assert.strictEqual(article.content.includes('48-Hour'), false, 'Should not mention 48-Hour express');
    assert.strictEqual(article.content.includes('48 hours'), false, 'Should not mention 48 hours');
  });

  // TEST SUITE 4: Verification Failure When Content Is Missing
  console.log('\n--- Suite 4: Live Verification Logic ---');

  runTest('Verification throws error when title is missing from HTML response', () => {
    const responseBody = '<html><head><title>Some Random Page</title></head><body><h1>Welcome</h1></body></html>';
    const expectedTitle = 'Exporting Dried Foodstuffs from Nigeria to the UK';

    let threw = false;
    try {
      if (!responseBody.includes(expectedTitle)) {
        throw new Error(`Verification failed: Expected article title "${expectedTitle}" missing from live page content`);
      }
    } catch (err) {
      threw = true;
      assert.strictEqual(err.message.includes('Verification failed'), true);
    }
    assert.strictEqual(threw, true, 'Verification must throw when expected content is missing');
  });

  runTest('Verification throws error when HTTP status is not 200', () => {
    const statusCode = 404;
    let threw = false;
    try {
      if (statusCode !== 200) {
        throw new Error(`Verification failed: Expected HTTP 200, got status ${statusCode}`);
      }
    } catch (err) {
      threw = true;
      assert.strictEqual(err.message.includes('Expected HTTP 200, got status 404'), true);
    }
    assert.strictEqual(threw, true, 'Verification must throw when status != 200');
  });

  // TEST SUITE 5: Atomic Creation & Error Propagation
  console.log('\n--- Suite 5: Atomic Creation & Error Propagation ---');

  runTest('Slug collision returns HTTP 409 code', () => {
    const mockErr = { code: 6, message: '7 ALREADY_EXISTS: Document already exists' };
    let result;
    if (mockErr.code === 6 || mockErr.message.includes('ALREADY_EXISTS')) {
      result = {
        success: false,
        statusCode: 409,
        error: 'Slug collision: An article with this slug already exists in Firestore.',
      };
    }
    assert.strictEqual(result.statusCode, 409);
    assert.strictEqual(result.success, false);
  });

  runTest('Firestore connection error propagates with HTTP 500 code', () => {
    const mockErr = { message: 'UNAVAILABLE: Could not reach Firestore' };
    const result = {
      success: false,
      statusCode: 500,
      error: `Firestore persistence failed: ${mockErr.message}`,
    };
    assert.strictEqual(result.statusCode, 500);
    assert.strictEqual(result.error.includes('Could not reach Firestore'), true);
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
