const { getScheduledTopic, generateArticleContent } = require('./daily-blog-publisher.js');

console.log('Testing weekly rotation anchored to 2 November 2026:');
const testDates = [
  { date: '2026-11-02', expected: 'Nigeria Exports' },
  { date: '2026-11-03', expected: 'UK Cities' },
  { date: '2026-11-04', expected: 'US Cities' },
  { date: '2026-11-05', expected: 'Nigeria Exports' },
  { date: '2026-11-06', expected: 'UK Cities' },
  { date: '2026-11-07', expected: 'US Cities' },
];

let allPassed = true;
testDates.forEach(({ date, expected }) => {
  const t1 = getScheduledTopic(date, 1);
  const t2 = getScheduledTopic(date, 2);
  const passed = t1.pillar === expected;
  if (!passed) allPassed = false;
  console.log(`${date}: ${t1.pillar} (Matches: ${passed})`);
  console.log(`   Slot 1 (09:00 AM): ${t1.title}`);
  console.log(`   Slot 2 (15:00 PM): ${t2.title}`);
});

console.log('\nTesting content generation:');
const sample = getScheduledTopic('2026-11-02', 1);
const content = generateArticleContent(sample);
console.log('Generated content length:', content.length, 'chars');
console.log('Contains official rates:', content.includes('₦10,500/kg') && content.includes('₦16,000/kg'));
console.log('Contains quote calculator link:', content.includes('https://ship.countycargo.com/shipping-calculator'));

console.log('\nAll rotation tests passed:', allPassed);
process.exit(allPassed ? 0 : 1);
