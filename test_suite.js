const assert = require('assert');

const BASE_URL = 'http://localhost:3005';

const ROUTES_TO_TEST = [
  '/',
  '/about',
  '/commercial-laundry',
  '/wash-fold',
  '/contact',
  '/pickup-request',
  '/privacy',
  '/terms',
  '/sitemap.xml',
  '/robots.txt',
  '/services/hospital-laundry',
  '/services/short-term-rentals',
  '/services/health-clubs',
  '/services/schools-dorms',
  '/services/shelter-homes',
  '/services/salons-spas',
  '/services/gyms',
  '/services/hotel-laundry',
  '/services/bed-and-breakfast'
];

const REDIRECTS_TO_TEST = [
  { legacy: '/index.php', target: '/' },
  { legacy: '/about.php', target: '/about' },
  { legacy: '/commercial-laundry.php', target: '/commercial-laundry' },
  { legacy: '/wash-fold.php', target: '/wash-fold' },
  { legacy: '/contact.php', target: '/contact' },
  { legacy: '/pickuprequest.php', target: '/pickup-request' },
  { legacy: '/hospital-laundry-services.php', target: '/services/hospital-laundry' },
  { legacy: '/laundry-services-short-term-residential-buildings.php', target: '/services/short-term-rentals' },
  { legacy: '/laundry-services-health-clubs.php', target: '/services/health-clubs' },
  { legacy: '/laundry-services-schools-dorms.php', target: '/services/schools-dorms' },
  { legacy: '/laundry-services-shelter-homes.php', target: '/services/shelter-homes' },
  { legacy: '/laundry-services-salons-spas.php', target: '/services/salons-spas' },
  { legacy: '/laundry-services-gyms.php', target: '/services/gyms' },
  { legacy: '/hotel-laundry-services.php', target: '/services/hotel-laundry' },
  { legacy: '/bed-and-breakfast-laundry-services.php', target: '/services/bed-and-breakfast' }
];

const IMAGES_TO_TEST = [
  '/images/new-logo.webp',
  '/images/new-logo-footer1.webp',
  '/images/about-us.webp',
  '/images/about-4.jpg',
  '/images/commercial-laundry.jpg',
  '/images/washfold.jpg',
  '/images/free-pickup.jpg',
  '/images/hospitals1.jpg',
  '/images/residential-services.jpg',
  '/images/health-clubs.jpg',
  '/images/schools.jpg',
  '/images/shelterHomes.jpg',
  '/images/salons-_-spas.jpg',
  '/images/gym.jpg',
  '/images/hotels.jpg',
  '/images/bedbreakfast.jpg',
  '/images/slide1.webp',
  '/images/slide2.webp',
  '/images/slide3.jpg',
  '/images/slide4.webp'
];

const results = {
  passed: 0,
  failed: 0,
  details: []
};

function pass(testName, info = '') {
  results.passed++;
  console.log(`  [PASS] ${testName} ${info ? '(' + info + ')' : ''}`);
  results.details.push({ test: testName, status: 'PASS', info });
}

function fail(testName, err) {
  results.failed++;
  console.error(`  [FAIL] ${testName}:`, err);
  results.details.push({ test: testName, status: 'FAIL', error: err.message || String(err) });
}

async function run() {
  console.log('====================================================');
  console.log('   MULAN LAUNDRIES REBUILD — QA TEST SUITE');
  console.log('====================================================\n');

  // TEST SUITE 1: Route HTTP Status and HTML Rendering
  console.log('TEST SUITE 1: Testing Route Accessibility (200 OK)');
  const titles = new Set();
  const descriptions = new Set();

  for (const route of ROUTES_TO_TEST) {
    try {
      const res = await fetch(`${BASE_URL}${route}`);
      assert.strictEqual(res.status, 200, `Expected status 200 for ${route}, got ${res.status}`);
      const text = await res.text();

      if (route.endsWith('.xml') || route.endsWith('.txt')) {
        pass(`Route: ${route}`, `status: 200, length: ${text.length}`);
        continue;
      }

      // Check title
      const titleMatch = text.match(/<title>([^<]+)<\/title>/i);
      assert(titleMatch && titleMatch[1].trim().length > 0, `Missing or empty <title> in ${route}`);
      const title = titleMatch[1].trim();

      // Check meta description
      const descMatch = text.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
      assert(descMatch && descMatch[1].trim().length > 10, `Missing or short meta description in ${route}`);
      const desc = descMatch[1].trim();

      // Check for tel: link presence
      assert(text.includes('href="tel:'), `No tel: link found in ${route}`);

      // Check for mailto: link presence
      assert(text.includes('href="mailto:'), `No mailto: link found in ${route}`);

      // Check for Schema.org in HTML
      if (route === '/') {
        assert(text.includes('application/ld+json'), 'Schema.org JSON-LD missing from homepage');
        assert(text.includes('DryCleaningOrLaundry'), 'DryCleaningOrLaundry type missing from schema');
      }

      titles.add(title);
      descriptions.add(desc);

      pass(`Route: ${route}`, `Title: "${title.slice(0, 35)}..."`);
    } catch (e) {
      fail(`Route: ${route}`, e);
    }
  }

  // Verify unique titles and descriptions (No duplication)
  console.log('\nTEST SUITE 2: Verifying SEO Uniqueness (No Duplication)');
  try {
    const htmlPageCount = ROUTES_TO_TEST.filter(r => !r.includes('.')).length;
    assert.strictEqual(titles.size, htmlPageCount, `Expected ${htmlPageCount} unique titles, got ${titles.size}`);
    pass('All Page Titles are Unique', `Total: ${titles.size}`);
  } catch (e) {
    fail('Page Titles Uniqueness', e);
  }

  try {
    const htmlPageCount = ROUTES_TO_TEST.filter(r => !r.includes('.')).length;
    assert.strictEqual(descriptions.size, htmlPageCount, `Expected ${htmlPageCount} unique meta descriptions, got ${descriptions.size}`);
    pass('All Meta Descriptions are Unique', `Total: ${descriptions.size}`);
  } catch (e) {
    fail('Meta Descriptions Uniqueness', e);
  }

  // TEST SUITE 3: 301 Permanent Redirects for Legacy URLs
  console.log('\nTEST SUITE 3: Testing 301 Permanent Redirects for Legacy PHP URLs');
  for (const { legacy, target } of REDIRECTS_TO_TEST) {
    try {
      const res = await fetch(`${BASE_URL}${legacy}`, { redirect: 'manual' });
      assert.strictEqual(res.status, 308, `Expected 308/301 redirect for ${legacy}, got ${res.status}`);
      const location = res.headers.get('location');
      assert.strictEqual(location, target, `Expected redirect target ${target}, got ${location}`);
      pass(`Redirect: ${legacy} -> ${target}`, `Status: ${res.status}`);
    } catch (e) {
      fail(`Redirect: ${legacy}`, e);
    }
  }

  // TEST SUITE 4: Static Images Availability
  console.log('\nTEST SUITE 4: Testing Image Assets (200 OK)');
  for (const imgPath of IMAGES_TO_TEST) {
    try {
      const res = await fetch(`${BASE_URL}${imgPath}`);
      assert.strictEqual(res.status, 200, `Expected 200 for image ${imgPath}, got ${res.status}`);
      const buffer = await res.arrayBuffer();
      assert(buffer.byteLength > 1000, `Image ${imgPath} is corrupted or empty (${buffer.byteLength} bytes)`);
      pass(`Image: ${imgPath}`, `${buffer.byteLength} bytes`);
    } catch (e) {
      fail(`Image: ${imgPath}`, e);
    }
  }

  // TEST SUITE 5: API Form Submission & Validation
  console.log('\nTEST SUITE 5: Testing API Endpoints & Form Submissions');

  // 5.1 Valid Contact Form Submission
  try {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alexander Hamilton',
        phone: '(917) 555-0199',
        email: 'alexander@hamiltonhotel.com',
        message: 'Inquiring about daily commercial hotel linen swaps and rotary pressing for 120 rooms.',
        honeypot: ''
      })
    });
    const data = await res.json();
    assert.strictEqual(res.status, 200, 'Expected 200 for valid contact form');
    assert.strictEqual(data.success, true, 'Expected success: true');
    assert(data.referenceId && data.referenceId.startsWith('ML-CT-'), 'Missing valid referenceId');
    pass('POST /api/contact (Valid Submission)', `Ref: ${data.referenceId}`);
  } catch (e) {
    fail('POST /api/contact (Valid Submission)', e);
  }

  // 5.2 Invalid Contact Form Submission (Validation Errors)
  try {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '',
        phone: '123',
        email: 'invalid-email',
        message: '',
        honeypot: ''
      })
    });
    const data = await res.json();
    assert.strictEqual(res.status, 422, 'Expected 422 for invalid contact form');
    assert.strictEqual(data.success, false, 'Expected success: false');
    assert(data.errors && data.errors.name && data.errors.email, 'Expected validation error fields');
    pass('POST /api/contact (Validation Rejection)', '422 Unprocessable Entity with field errors');
  } catch (e) {
    fail('POST /api/contact (Validation Rejection)', e);
  }

  // 5.3 Honeypot Bot Rejection for Contact Form
  try {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Spam Bot',
        phone: '1234567890',
        email: 'bot@spam.com',
        message: 'Spam message',
        honeypot: 'http://spam-site.com'
      })
    });
    assert.strictEqual(res.status, 400, 'Expected 400 for honeypot spam detection');
    pass('POST /api/contact (Honeypot Bot Rejection)', '400 Bad Request');
  } catch (e) {
    fail('POST /api/contact (Honeypot Bot Rejection)', e);
  }

  // 5.4 Valid Pickup Request Submission
  try {
    const res = await fetch(`${BASE_URL}/api/pickup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Sarah',
        lastName: 'Connor',
        phone: '(917) 365-4366',
        email: 'sarah.connor@metrogyms.nyc',
        customerType: 'Commercial',
        pickupDay: 'Wednesday',
        message: 'Commercial fitness center towel exchange, 300 lbs twice weekly.',
        honeypot: ''
      })
    });
    const data = await res.json();
    assert.strictEqual(res.status, 200, 'Expected 200 for valid pickup request');
    assert.strictEqual(data.success, true, 'Expected success: true');
    assert(data.referenceId && data.referenceId.startsWith('ML-PU-'), 'Missing valid referenceId');
    assert.strictEqual(data.details.clientName, 'Sarah Connor', 'Client name mismatch');
    pass('POST /api/pickup (Valid Submission)', `Ref: ${data.referenceId}, Client: ${data.details.clientName}`);
  } catch (e) {
    fail('POST /api/pickup (Valid Submission)', e);
  }

  // 5.5 Invalid Pickup Request Submission
  try {
    const res = await fetch(`${BASE_URL}/api/pickup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        customerType: 'InvalidType',
        pickupDay: 'Someday',
        message: '',
        honeypot: ''
      })
    });
    const data = await res.json();
    assert.strictEqual(res.status, 422, 'Expected 422 for invalid pickup request');
    assert.strictEqual(data.success, false, 'Expected success: false');
    assert(data.errors && data.errors.firstName && data.errors.customerType, 'Missing validation fields');
    pass('POST /api/pickup (Validation Rejection)', '422 Unprocessable Entity with field errors');
  } catch (e) {
    fail('POST /api/pickup (Validation Rejection)', e);
  }

  // 5.6 Honeypot Bot Rejection for Pickup Form
  try {
    const res = await fetch(`${BASE_URL}/api/pickup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Bot',
        lastName: 'Spammer',
        phone: '1234567890',
        email: 'spam@bot.com',
        customerType: 'Commercial',
        pickupDay: 'Monday',
        message: 'Spam text',
        honeypot: 'http://malicious-link.com'
      })
    });
    assert.strictEqual(res.status, 400, 'Expected 400 for honeypot bot detection');
    pass('POST /api/pickup (Honeypot Bot Rejection)', '400 Bad Request');
  } catch (e) {
    fail('POST /api/pickup (Honeypot Bot Rejection)', e);
  }

  // SUMMARY REPORT
  console.log('\n====================================================');
  console.log('   QA TEST SUITE EXECUTION SUMMARY');
  console.log('====================================================');
  console.log(`  TOTAL TESTS EXECUTED: ${results.passed + results.failed}`);
  console.log(`  PASSED: ${results.passed}`);
  console.log(`  FAILED: ${results.failed}`);
  console.log(`  SUCCESS RATE: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);
  console.log('====================================================\n');

  if (results.failed > 0) {
    process.exit(1);
  }
}

run().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
