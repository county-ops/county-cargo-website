/**
 * Comprehensive Test Suite for County Cargo Daily Blog Publisher
 *
 * Tests the required behaviours using mocked network responses:
 * 1. Actual official-source retrieval (and halting when < 2 sources succeed)
 * 2. Stopping publication when existing-article catalogue retrieval fails
 * 3. Indefinite topic synthesis: regenerating duplicates instead of adding date suffixes
 * 4. Persistent date-and-slot identifier (slotId) preventing duplicate runs
 * 5. Supplying retrieved evidence and requiring at least two retrieved official source links
 * 6. Live verification of rendered article body content (not just title)
 * 7. Disputed flat rate removal & discontinued 48-hour express prohibition
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
  console.log('County Cargo Blog Publisher - Mocked Test Suite');
  console.log('====================================================\n');

  // TEST SUITE 1: Actual Official-Source Retrieval with Mocked Responses
  console.log('--- Suite 1: Live Official Source Retrieval (Mocked Network) ---');

  await runAsyncTest('retrieveOfficialEvidence succeeds when at least 2 sources return HTML guidance', async () => {
    const mockPillarInfo = getScheduledPillar('2026-11-02');
    const mockFetch = async (targetUrl) => {
      return {
        statusCode: 200,
        headers: {},
        body: `<html><head><title>Official Guidelines</title></head><body>
          <main>
            <h1>Exporter Registration and Phytosanitary Protocols</h1>
            <p>Under statutory export guidelines, all commercial agricultural shipments must obtain clean inspection documentation and Form NXP filing.</p>
          </main>
        </body></html>`,
      };
    };

    const evidence = await retrieveOfficialEvidence(mockPillarInfo, mockFetch);
    assert.strictEqual(evidence.length >= 2, true, 'Must retrieve at least 2 sources');
    assert.strictEqual(evidence[0].evidence.includes('Exporter Registration'), true);
  });

  await runAsyncTest('retrieveOfficialEvidence FAILS and HALTS publication when < 2 sources succeed', async () => {
    const mockPillarInfo = getScheduledPillar('2026-11-02');
    let callCount = 0;
    const failingFetch = async () => {
      callCount++;
      if (callCount === 1) {
        // Only 1 succeeds, others fail
        return {
          statusCode: 200,
          headers: {},
          body: '<html><body><main><h1>Statutory Guidance</h1><p>Under statutory export guidelines, exporters must comply with clean inspection standards and submit Form NXP.</p></main></body></html>',
        };
      }
      throw new Error('Connection refused / 503 Service Unavailable');
    };

    let threw = false;
    try {
      await retrieveOfficialEvidence(mockPillarInfo, failingFetch);
    } catch (err) {
      threw = true;
      assert.strictEqual(err.message.includes('Research retrieval failed: Retrieved 1 official source(s), but at least 2 are required'), true);
    }
    assert.strictEqual(threw, true, 'Must abort publication when research yields fewer than 2 sources');
  });

  // TEST SUITE 2: Stopping Publication When Catalogue Retrieval Fails
  console.log('\n--- Suite 2: Existing Catalogue Retrieval Failure Halts Publication ---');

  await runAsyncTest('loadAllExistingArticles throws and aborts when live API returns 500 error', async () => {
    const mockFailingFetch = async () => ({
      statusCode: 500,
      headers: {},
      body: JSON.stringify({ success: false, error: 'Database unavailable' }),
    });

    let threw = false;
    try {
      await loadAllExistingArticles('https://countycargo.com', 'test-api-key', mockFailingFetch);
    } catch (err) {
      threw = true;
      assert.strictEqual(err.message.includes('Existing article retrieval failed'), true);
    }
    assert.strictEqual(threw, true, 'Must throw when live catalogue retrieval fails');
  });

  await runAsyncTest('loadAllExistingArticles succeeds and populates slotIds when API succeeds', async () => {
    const mockSuccessFetch = async () => ({
      statusCode: 200,
      headers: {},
      body: JSON.stringify({
        success: true,
        customPosts: [
          {
            title: 'Custom Test Post',
            url: '/blog/custom-test-post',
            slotId: '2026-11-02-slot1',
          },
        ],
      }),
    });

    const catalogue = await loadAllExistingArticles('https://countycargo.com', 'test-api-key', mockSuccessFetch);
    assert.strictEqual(catalogue.slotIds.has('2026-11-02-slot1'), true, 'Must register existing slotId');
    assert.strictEqual(catalogue.titles.has('custom test post'), true);
  });

  // TEST SUITE 3: Persistent Date-and-Slot Identifier (Idempotency)
  console.log('\n--- Suite 3: Persistent Date-and-Slot Idempotency (slotId) ---');

  await runAsyncTest('Rerunning a previously published slot is detected and cleanly skipped', async () => {
    const existingSlotId = '2026-11-03-slot1';
    let publisherCalled = false;

    const mockFetch = async (targetUrl, options, payload) => {
      if (targetUrl.includes('/api/admin/posts') && options.method === 'GET') {
        return {
          statusCode: 200,
          headers: {},
          body: JSON.stringify({
            success: true,
            customPosts: [
              {
                title: 'Morning Guide',
                url: '/blog/morning-guide',
                slotId: existingSlotId,
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
    assert.strictEqual(res.slotId, existingSlotId);
    assert.strictEqual(publisherCalled, false, 'Must NOT attempt to publish again when slotId already exists');
  });

  // TEST SUITE 4: Fresh Topic Regeneration on Duplicate (NO Date Suffix)
  console.log('\n--- Suite 4: Topic Duplicate Comparison & Regeneration (NO Date Suffix) ---');

  await runAsyncTest('Duplicate title/slug triggers regeneration instead of appending date suffix', async () => {
    const duplicateTitle = 'Exporting Dried Foodstuffs from Nigeria to the UK';
    const uniqueTitle = 'Novel Industrial Cashew and Cocoa Export Compliance from Lagos';
    let generationAttempts = 0;

    const mockPillarInfo = getScheduledPillar('2026-11-02');
    const mockEvidence = [
      { name: 'NEPC', url: 'https://nepc.gov.ng', scope: 'Export rules', evidence: 'Statutory exporter rules' },
      { name: 'DEFRA', url: 'https://www.gov.uk/defra', scope: 'Import rules', evidence: 'Food packaging standards' },
    ];

    const mockFetch = async (targetUrl, options, payload) => {
      // Mock OpenAI completions
      if (targetUrl.includes('openai.com')) {
        generationAttempts++;
        if (generationAttempts === 1) {
          // Attempt 1: Return duplicate title that already exists in catalogue
          return {
            statusCode: 200,
            headers: {},
            body: JSON.stringify({
              choices: [
                {
                  message: {
                    content: JSON.stringify({
                      title: duplicateTitle,
                      slug: 'exporting-dried-foodstuffs-nigeria-to-uk',
                      description: 'A duplicate article description',
                      tags: ['Export'],
                      citedSources: [
                        { name: 'NEPC', url: 'https://nepc.gov.ng', claim: 'Rules' },
                        { name: 'Trade Portal', url: 'https://trade.gov.ng', claim: 'Form NXP' },
                      ],
                      content: `## Guidelines\n\nAccording to [NEPC](https://nepc.gov.ng) and [Trade Portal](https://trade.gov.ng), food exports require clean inspection and Form NXP filing. Detailed procedures here with sufficient length.`.repeat(15),
                    }),
                  },
                },
              ],
            }),
          };
        } else {
          // Attempt 2: Return fresh unique title
          return {
            statusCode: 200,
            headers: {},
            body: JSON.stringify({
              choices: [
                {
                  message: {
                    content: JSON.stringify({
                      title: uniqueTitle,
                      slug: 'novel-industrial-cashew-cocoa-export-compliance',
                      description: 'A unique article description',
                      tags: ['Cashew', 'Cocoa'],
                      citedSources: [
                        { name: 'NEPC', url: 'https://nepc.gov.ng', claim: 'Rules' },
                        { name: 'Trade Portal', url: 'https://trade.gov.ng', claim: 'Form NXP' },
                      ],
                      content: `## Industrial Cocoa\n\nAccording to [NEPC](https://nepc.gov.ng) and [Trade Portal](https://trade.gov.ng), commodity cargo requires special inspection and electronic NXP processing. Detailed procedures with rich content.`.repeat(15),
                    }),
                  },
                },
              ],
            }),
          };
        }
      }

      // Mock catalogue
      if (targetUrl.includes('/api/admin/posts') && options.method === 'GET') {
        return {
          statusCode: 200,
          headers: {},
          body: JSON.stringify({
            success: true,
            customPosts: [
              {
                title: duplicateTitle,
                slug: 'exporting-dried-foodstuffs-nigeria-to-uk',
                url: '/blog/exporting-dried-foodstuffs-nigeria-to-uk',
                slotId: '2026-10-01-slot1',
              },
            ],
          }),
        };
      }

      // Mock POST publication
      if (targetUrl.includes('/api/admin/posts') && options.method === 'POST') {
        const body = JSON.parse(payload);
        // Ensure no date suffix was added!
        assert.strictEqual(body.slug.includes('2026-11-02'), false, 'Must NOT append date suffix to slug');
        assert.strictEqual(body.title, uniqueTitle);
        return { statusCode: 200, headers: {}, body: JSON.stringify({ success: true, post: body }) };
      }

      // Mock live verification
      if (targetUrl.includes('/blog/')) {
        return {
          statusCode: 200,
          headers: {},
          body: `<html><head><title>${uniqueTitle}</title></head><body>
            <h1>${uniqueTitle}</h1>
            <p>According to [NEPC](https://nepc.gov.ng) and [Trade Portal](https://trade.gov.ng), commodity cargo requires special inspection and electronic NXP processing.</p>
          </body></html>` + 'x'.repeat(1500),
        };
      }

      // Default mock for source retrieval
      return {
        statusCode: 200,
        headers: {},
        body: '<html><body><h1>Official Guidance</h1><p>Under statutory export guidelines, exporters must comply with clean inspection.</p></body></html>',
      };
    };

    const res = await publishDailyArticle({
      date: '2026-11-02T09:00:00Z',
      slot: '1',
      apiKey: 'test-api-key',
      openaiApiKey: 'test-openai-key',
      fetchFn: mockFetch,
    });

    assert.strictEqual(res.success, true);
    assert.strictEqual(res.title, uniqueTitle);
    assert.strictEqual(res.slug, 'novel-industrial-cashew-cocoa-export-compliance');
    assert.strictEqual(generationAttempts, 2, 'Should have regenerated on attempt 2 without adding date suffix');
  });

  // TEST SUITE 5: Evidence & Retrieved Official Links Requirement
  console.log('\n--- Suite 5: Evidence & Retrieved Source Links Enforcement ---');

  await runAsyncTest('Generation validation FAILS when generated article omits retrieved source links', async () => {
    const mockPillarInfo = getScheduledPillar('2026-11-02');
    const mockEvidence = [
      { name: 'NEPC', url: 'https://nepc.gov.ng', scope: 'Export rules', evidence: 'Exporter rules' },
      { name: 'DEFRA', url: 'https://www.gov.uk/defra', scope: 'Import rules', evidence: 'Food standards' },
    ];

    const mockFetchMissingLinks = async () => ({
      statusCode: 200,
      headers: {},
      body: JSON.stringify({
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Guide without Links',
                slug: 'guide-without-links',
                description: 'Description',
                tags: ['Export'],
                citedSources: [], // No retrieved source links cited!
                content: '## Guide\n\nThis article talks about shipping but provides zero links to retrieved official sources.',
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
        fetchFn: mockFetchMissingLinks,
      });
    } catch (err) {
      threw = true;
      assert.strictEqual(err.message.includes('Generation validation failed: Article must cite at least two retrieved official source links'), true);
    }
    assert.strictEqual(threw, true, 'Must fail when retrieved official source links are omitted');
  });

  // TEST SUITE 6: Rendered Article Body Content Verification
  console.log('\n--- Suite 6: Rendered Body Content Verification ---');

  await runAsyncTest('verifyLiveArticleContent fails when title matches but body excerpt is missing', async () => {
    const mockFetchTitleOnly = async () => ({
      statusCode: 200,
      headers: {},
      body: `<html><head><title>Correct Title</title></head><body><h1>Correct Title</h1><p>Completely blank body content</p></body></html>` + 'x'.repeat(1600),
    });

    let threw = false;
    try {
      await verifyLiveArticleContent(
        'https://countycargo.com/blog/test',
        'Correct Title',
        ['Under statutory export guidelines, all commercial agricultural shipments'],
        mockFetchTitleOnly
      );
    } catch (err) {
      threw = true;
      assert.strictEqual(err.message.includes('Live verification failed: Rendered article body is missing expected content'), true);
    }
    assert.strictEqual(threw, true, 'Must fail when body excerpt is missing');
  });

  await runAsyncTest('verifyLiveArticleContent succeeds when title AND body excerpts are rendered', async () => {
    const expectedExcerpt = 'Under statutory export guidelines, all commercial agricultural shipments';
    const mockFetchFull = async () => ({
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
      mockFetchFull
    );
    assert.strictEqual(verified, true);
  });

  // TEST SUITE 7: Disputed Rates and Discontinued Express Check
  console.log('\n--- Suite 7: Disputed Rates & Discontinued Express Prohibitions ---');

  runTest('OFFICIAL_DATA strictly omits disputed per-kg rates and references calculator', () => {
    const dataStr = JSON.stringify(OFFICIAL_DATA);
    assert.strictEqual(dataStr.includes('₦10,500/kg'), false);
    assert.strictEqual(dataStr.includes('₦16,000/kg'), false);
    assert.strictEqual(dataStr.includes('₦55,000/kg'), false);
    assert.strictEqual(dataStr.includes('48-Hour'), false);
    assert.strictEqual(dataStr.includes('48 hours'), false);
    assert.strictEqual(OFFICIAL_DATA.URLS.CALCULATOR.includes('shipping-calculator'), true);
  });

  // TEST SUITE 8: Workflow Scheduling Inactivity Check
  console.log('\n--- Suite 8: Workflow Scheduling Inactivity Check ---');

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
