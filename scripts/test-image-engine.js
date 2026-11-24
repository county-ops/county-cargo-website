const assert = require('assert');
const {
  resolveBlogImage,
  selectCuratedEditorialImage,
  extractArticleVisualContext,
  BLACKLISTED_IMAGES,
  CURATED_EDITORIAL_REGISTRY,
} = require('./blog-image-engine');

async function runTests() {
  console.log('Running Blog Image Engine Verification Suite...\n');

  // Test 1: Blacklist enforcement
  assert.ok(BLACKLISTED_IMAGES.has('/cargo-plane-hero.png'), 'Generic plane hero must be blacklisted');

  // Test 2: Visual context extraction
  const ctxAbujaUsa = extractArticleVisualContext({
    title: 'How to Export Agricultural Spices from Abuja to Dallas Texas',
    description: 'Guide for Abuja shippers sending dried foods to the USA',
  });
  assert.strictEqual(ctxAbujaUsa.isAbuja, true, 'Must detect Abuja');
  assert.strictEqual(ctxAbujaUsa.isUsa, true, 'Must detect USA');
  assert.strictEqual(ctxAbujaUsa.isAgro, true, 'Must detect Agricultural');

  // Test 3: Curated selection with route matching
  const used = new Set();
  const img1 = await resolveBlogImage({
    article: {
      title: 'Guide to Shipping Personal Luggage from Abuja to London',
      description: 'Step-by-step for UK university students from Abuja',
      slug: 'abuja-to-london-student-shipping',
    },
    pillarInfo: { pillar: 'Nigeria Exports', category: 'Export Services' },
    existingUsedImages: used,
    enableAiGeneration: false, // test curated fallback
  });

  console.log('Test 3 Result:', img1);
  assert.ok(!BLACKLISTED_IMAGES.has(img1.url), 'Image must not be blacklisted');
  assert.ok(img1.alt && img1.alt.length > 20, 'Image must have descriptive alt text');
  assert.ok(img1.url.includes('abuja') || img1.url.includes('uk'), 'Image must reflect Abuja/UK route');

  // Add img1 to used set and ensure next article gets a DIFFERENT image
  used.add(img1.url);

  const img2 = await resolveBlogImage({
    article: {
      title: 'Commercial Air Freight from Lagos Ladipo to London Heathrow',
      description: 'Sending auto spares and trade goods from Lagos to UK',
      slug: 'lagos-to-london-freight',
    },
    pillarInfo: { pillar: 'UK Cities', category: 'UK Shipping' },
    existingUsedImages: used,
    enableAiGeneration: false,
  });

  console.log('Test 4 Result (Uniqueness):', img2);
  assert.notStrictEqual(img1.url, img2.url, 'Consecutive articles must never share the same image');
  assert.ok(!used.has(img2.url), 'Selected image must not be in used set');

  // Test 5: Verify all registry images exist on disk in public/images/blog
  const fs = require('fs');
  const path = require('path');
  console.log('\nVerifying physical existence of all curated registry images on disk:');
  for (const entry of CURATED_EDITORIAL_REGISTRY) {
    const diskPath = path.resolve(__dirname, '..', 'public', entry.url.replace(/^\//, ''));
    const exists = fs.existsSync(diskPath);
    console.log(`  [${exists ? 'EXISTS' : 'MISSING'}] ${entry.url}`);
    assert.ok(exists, `Curated image file must physically exist: ${diskPath}`);
  }

  console.log('\n✅ All Image Engine Tests PASSED successfully!');
}

runTests().catch((err) => {
  console.error('Image Engine test failed:', err);
  process.exit(1);
});
