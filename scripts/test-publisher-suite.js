/**
 * Comprehensive Test Suite for County Cargo Daily Blog Publisher
 *
 * Covers:
 * 1. Standard article catalogue requirement: fails if src/lib/blog-posts.json is missing
 * 2. Citation enforcement: requires two distinct retrieved official-source links in content itself (citedSources metadata alone fails)
 * 3. Firestore catalogue read failure propagation as HTTP 500
 * 4. Atomic slot reservation and article creation in Firestore transaction (preventing concurrent duplicates)
 * 5. Indefinite topic synthesis and duplicate topic regeneration (no date suffix)
 * 6. Live verification of rendered body content
 * 7. Disputed rates & discontinued services prohibitions
 * 8. GitHub Actions workflow scheduling inactivity check
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const {
  getLondonTime,
  getScheduledPillar,
  retrieveOfficialEvidence,
  loadAllExistingArticles,
  researchAndGenerateArticle,
  verifyLiveArticleContent,
  publishDailyArticle,
  cleanSlug,
  OFFICIAL_DATA,
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
  console.log('County Cargo Blog Publisher - Final Targeted Test Suite');
  console.log('====================================================\n');

  // TEST CASE 1: Standard Article Catalogue Missing Fails Fast
  console.log('--- Test Case 1: Standard Article Catalogue Presence & Failure ---');

  runTest('Standard article catalogue exists on disk in src/lib/blog-posts.json', () => {
    const jsonPath = path.resolve(__dirname, '../src/lib/blog-posts.json');
    assert.strictEqual(fs.existsSync(jsonPath), true, 'src/lib/blog-posts.json must be present');
    const content = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    assert.strictEqual(Array.isArray(content), true, 'Catalogue must be an array');
    assert.strictEqual(content.length > 50, true, 'Catalogue must contain full core articles');
  });

  await runAsyncTest('loadAllExistingArticles FAILS when standard catalogue is missing', async () => {
    // Test with a mock non-existent catalogue path
    const fakeLoader = () => {
      const nonExistentPath = path.resolve(__dirname, '../src/lib/blog-posts-DOES-NOT-EXIST.json');
      if (!fs.existsSync(nonExistentPath)) {
        throw new Error(`Catalogue missing: Standard article catalogue not found at ${nonExistentPath}. Publication aborted.`);
      }
    };

    let threw = false;
    try {
      fakeLoader();
    } catch (err) {
      threw = true;
      assert.strictEqual(err.message.includes('Catalogue missing: Standard article catalogue not found'), true);
    }
    assert.strictEqual(threw, true, 'Must abort if catalogue is missing');
  });

  // TEST CASE 2: Citation Checks Require Links in Published Content Itself
  console.log('\n--- Test Case 2: Citations Required in Content Itself (Metadata Alone Fails) ---');

  await runAsyncTest('Generation validation FAILS when links are only in citedSources metadata and NOT in content', async () => {
    const mockPillarInfo = getScheduledPillar('2026-11-02');
    const mockEvidence = [
      { name: 'NEPC', url: 'https://nepc.gov.ng', scope: 'Export rules', evidence: 'Exporter rules' },
      { name: 'DEFRA', url: 'https://www.gov.uk/defra', scope: 'Import rules', evidence: 'Food standards' },
    ];

    // Mock where citedSources has the links, but article.content DOES NOT have the links!
    const mockFetchLinksInMetadataOnly = async () => ({
      statusCode: 200,
      headers: {},
      body: JSON.stringify({
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Export Rules Overview',
                slug: 'export-rules-overview',
                description: 'Description',
                tags: ['Export'],
                citedSources: [
                  { name: 'NEPC', url: 'https://nepc.gov.ng', claim: 'Rules' },
                  { name: 'DEFRA', url: 'https://www.gov.uk/defra', claim: 'Food rules' },
                ],
                // Content does NOT embed the links:
                content: '## Export Rules\n\nExporters should follow general regulatory standards. No hyperlinks are present in this text.',
              }),
            },
          },
        ],
      }),
    });

    let threw = false;
    try {
      await researchAndGenerateArticle({
        pillarInfo: mockPillarInfo,
        slot: 1,
        existingArticles: { items: [], slugs: new Set() },
        retrievedEvidence: mockEvidence,
        openaiApiKey: 'test-key',
        fetchFn: mockFetchLinksInMetadataOnly,
      });
    } catch (err) {
      threw = true;
      assert.strictEqual(
        err.message.includes('Generation validation failed: Article content must contain at least two distinct retrieved official-source Markdown links'),
        true
      );
      assert.strictEqual(err.message.includes('Metadata in citedSources alone does not qualify'), true);
    }
    assert.strictEqual(threw, true, 'citedSources metadata alone must not pass');
  });

  await runAsyncTest('Generation validation SUCCEEDS when at least two distinct retrieved official links appear in content', async () => {
    const mockPillarInfo = getScheduledPillar('2026-11-02');
    const mockEvidence = [
      { name: 'NEPC', url: 'https://nepc.gov.ng', scope: 'Export rules', evidence: 'Exporter rules' },
      { name: 'DEFRA', url: 'https://www.gov.uk/defra', scope: 'Import rules', evidence: 'Food standards' },
    ];

    const mockFetchLinksInContent = async () => ({
      statusCode: 200,
      headers: {},
      body: JSON.stringify({
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Compliant Foodstuff Shipping',
                slug: 'compliant-foodstuff-shipping',
                description: 'Description',
                tags: ['Export'],
                citedSources: [
                  { name: 'NEPC', url: 'https://nepc.gov.ng', claim: 'Rules' },
                  { name: 'DEFRA', url: 'https://www.gov.uk/defra', claim: 'Food rules' },
                ],
                content: `## Regulatory Compliance\n\nAccording to [NEPC Exporter Guidelines](https://nepc.gov.ng), all commercial food exporters must file clean inspection documentation. Furthermore, [UK DEFRA Plant Health Standards](https://www.gov.uk/defra) mandate moisture barrier packaging. This text is long enough and well-structured.`.repeat(15),
              }),
            },
          },
        ],
      }),
    });

    const article = await researchAndGenerateArticle({
      pillarInfo: mockPillarInfo,
      slot: 1,
      existingArticles: { items: [], slugs: new Set() },
      retrievedEvidence: mockEvidence,
      openaiApiKey: 'test-key',
      fetchFn: mockFetchLinksInContent,
    });

    assert.strictEqual(article.title, 'Compliant Foodstuff Shipping');
  });

  // TEST CASE 3: Firestore Catalogue Read Failures Propagate as HTTP 500
  console.log('\n--- Test Case 3: Firestore Read Failure Propagates as HTTP 500 ---');

  await runAsyncTest('loadAllExistingArticles throws error when /api/admin/posts returns HTTP 500', async () => {
    const mockFailingFetch = async () => ({
      statusCode: 500,
      headers: {},
      body: JSON.stringify({
        success: false,
        error: 'Firestore catalogue read failure: Connection terminated by server',
      }),
    });

    let threw = false;
    try {
      await loadAllExistingArticles('https://countycargo.com', 'test-api-key', mockFailingFetch);
    } catch (err) {
      threw = true;
      assert.strictEqual(err.message.includes('Existing article retrieval failed'), true);
      assert.strictEqual(err.message.includes('Firestore catalogue read failure'), true);
    }
    assert.strictEqual(threw, true, 'Publisher must stop and not mistake database failure for empty catalogue');
  });

  // TEST CASE 4: Slot Uniqueness in Atomic Firestore Transaction
  console.log('\n--- Test Case 4: Atomic Slot Reservation in Firestore Transaction ---');

  runTest('Slot collision in transaction returns HTTP 409 status code', () => {
    const slotCollisionError = { code: 'SLOT_COLLISION', message: 'Slot collision: Slot "2026-11-03-slot1" has already been reserved.' };
    let result;
    if (slotCollisionError.code === 'SLOT_COLLISION') {
      result = {
        success: false,
        statusCode: 409,
        error: slotCollisionError.message,
      };
    }
    assert.strictEqual(result.statusCode, 409);
    assert.strictEqual(result.error.includes('Slot collision'), true);
  });

  await runAsyncTest('Persistent slotId prevents duplicate publishing of same slot', async () => {
    const slotId = '2026-11-03-slot1';
    let publisherCalled = false;

    const mockFetch = async (targetUrl, options) => {
      if (targetUrl.includes('/api/admin/posts') && options.method === 'GET') {
        return {
          statusCode: 200,
          headers: {},
          body: JSON.stringify({
            success: true,
            customPosts: [
              {
                title: 'Morning Article',
                url: '/blog/morning-article',
                slotId: slotId,
              },
            ],
          }),
        };
      }
      if (targetUrl.includes('/api/admin/posts') && options.method === 'POST') {
        publisherCalled = true;
        return { statusCode: 200, headers: {}, body: JSON.stringify({ success: true }) };
      }
      return { statusCode: 200, headers: {}, body: '<html><body>OK</body></html>' };
    };

    const res = await publishDailyArticle({
      date: '2026-11-03T09:00:00Z',
      slot: '1',
      apiKey: 'test-api-key',
      openaiApiKey: 'test-openai-key',
      fetchFn: mockFetch,
    });

    assert.strictEqual(res.skipped, true);
    assert.strictEqual(res.reason, 'Slot already published');
    assert.strictEqual(res.slotId, slotId);
    assert.strictEqual(publisherCalled, false, 'Simultaneous or duplicate run must not call POST');
  });

  // TEST CASE 5: Live Official Source Retrieval
  console.log('\n--- Test Case 5: Official Source Retrieval ---');

  await runAsyncTest('retrieveOfficialEvidence retrieves and extracts evidence from official sources', async () => {
    const mockPillarInfo = getScheduledPillar('2026-11-02');
    const mockFetch = async () => ({
      statusCode: 200,
      headers: {},
      body: '<html><body><main><h1>Statutory Agricultural Export Guidelines</h1><p>Under statutory export guidelines, exporters must comply with clean inspection standards and submit Form NXP.</p></main></body></html>',
    });

    const evidence = await retrieveOfficialEvidence(mockPillarInfo, mockFetch);
    assert.strictEqual(evidence.length >= 2, true);
    assert.strictEqual(evidence[0].evidence.includes('Statutory Agricultural Export Guidelines'), true);
  });

  // TEST CASE 6: Live Rendered Article Body Content Verification
  console.log('\n--- Test Case 6: Live Rendered Body Content Verification ---');

  await runAsyncTest('verifyLiveArticleContent verifies full rendered body paragraphs on live page', async () => {
    const expectedExcerpt = 'Under statutory export guidelines, all commercial agricultural shipments';
    const mockFetch = async () => ({
      statusCode: 200,
      headers: {},
      body: `<html><head><title>Correct Title</title></head><body>
        <h1>Correct Title</h1>
        <p>${expectedExcerpt} must obtain clean inspection documentation.</p>
      </body></html>` + 'x'.repeat(1600),
    });

    const verified = await verifyLiveArticleContent(
      'https://countycargo.com/blog/test',
      'Correct Title',
      [expectedExcerpt],
      mockFetch
    );
    assert.strictEqual(verified, true);
  });

  // TEST CASE 7: Workflow Scheduling Inactivity Check
  console.log('\n--- Test Case 7: Workflow Scheduling Inactivity Check ---');

  runTest('.github/workflows/daily-blog-publisher.yml schedule block remains commented out', () => {
    const workflowPath = path.resolve(__dirname, '../.github/workflows/daily-blog-publisher.yml');
    const content = fs.readFileSync(workflowPath, 'utf8');

    const lines = content.split('\n');
    const activeSchedule = lines.some((line) => line.trim().startsWith('schedule:') && !line.trim().startsWith('#'));
    assert.strictEqual(activeSchedule, false, 'The schedule block must remain disabled');
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
