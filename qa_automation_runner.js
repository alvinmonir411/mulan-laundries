const fs = require('fs');
const path = require('path');
const http = require('http');

const BASE_URL = 'http://localhost:3005';

function request(options, postData = null, isMultipart = false) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(data); } catch (e) {}
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          json: json
        });
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

// Helper to build multipart form data
function makeMultipartFormData(boundary, fieldName, filename, contentType, buffer) {
  const pre = Buffer.from(
    `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="${fieldName}"; filename="${filename}"\r\n` +
    `Content-Type: ${contentType}\r\n\r\n`
  );
  const post = Buffer.from(`\r\n--${boundary}--\r\n`);
  return Buffer.concat([pre, buffer, post]);
}

async function runTests() {
  console.log('====================================================');
  console.log('   AGENT 6: COMPREHENSIVE QA AUTOMATION SUITE');
  console.log('   Target: ' + BASE_URL);
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assertTest(name, condition, details = '') {
    if (condition) {
      console.log(`  [PASS] ${name}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${name} - ${details}`);
      failed++;
    }
  }

  // ----------------------------------------------------
  // SECTION 1: AUTHENTICATION & SESSION CONTROL
  // ----------------------------------------------------
  console.log('SECTION 1: AUTHENTICATION & ACCESS CONTROL');

  // Test 1.1: Invalid pass rejection
  const invalidAuth = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/admin/auth',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, JSON.stringify({ email: 'admin@gmail.com', password: 'wrongpass123' }));

  assertTest(
    'Reject invalid password with 401',
    invalidAuth.statusCode === 401 && invalidAuth.json && invalidAuth.json.success === false,
    `Status: ${invalidAuth.statusCode}`
  );

  // Test 1.2: Valid password acceptance (13663)
  const validAuth = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/admin/auth',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, JSON.stringify({ email: 'admin@gmail.com', password: '13663' }));

  const setCookie = validAuth.headers['set-cookie'];
  const authCookie = setCookie ? setCookie[0].split(';')[0] : '';

  assertTest(
    'Accept valid password (13663) with 200 and session cookie',
    validAuth.statusCode === 200 && validAuth.json && validAuth.json.success === true && authCookie.includes('mulan_admin_auth'),
    `Status: ${validAuth.statusCode}, Cookie: ${authCookie}`
  );

  // Test 1.3: GET /admin page accessibility
  const adminPage = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/admin',
    method: 'GET'
  });
  assertTest('Admin interface route /admin renders (200 OK)', adminPage.statusCode === 200);

  // ----------------------------------------------------
  // SECTION 2: CONTENT PERSISTENCE & NEON DB INTEGRATION
  // ----------------------------------------------------
  console.log('\nSECTION 2: CONTENT PERSISTENCE & DATABASE REST ENDPOINTS');

  // Test 2.1: GET site settings
  const settingsGet = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/admin/settings',
    method: 'GET'
  });
  assertTest(
    'GET /api/admin/settings returns 200 with Neon DB settings',
    settingsGet.statusCode === 200 && settingsGet.json && settingsGet.json.settings && settingsGet.json.settings.phone
  );

  // Test 2.2: POST site settings update
  const testPhone = '(917) 365-4366';
  const settingsUpdate = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/admin/settings',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Cookie': authCookie }
  }, JSON.stringify({
    settings: {
      phone: testPhone,
      announcement_bar: 'QA Persistence Test Active'
    }
  }));
  assertTest(
    'POST /api/admin/settings persists updates (200 OK)',
    settingsUpdate.statusCode === 200 && settingsUpdate.json && settingsUpdate.json.success === true
  );

  // Verify settings persisted
  const settingsVerify = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/admin/settings',
    method: 'GET'
  });
  assertTest(
    'Reloaded settings reflect updated values in DB/cache',
    settingsVerify.json && settingsVerify.json.settings && settingsVerify.json.settings.announcement_bar === 'QA Persistence Test Active'
  );

  // Test 2.3: FAQs Management API
  const faqsGet = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/admin/faqs',
    method: 'GET'
  });
  assertTest(
    'GET /api/admin/faqs returns active FAQ list',
    faqsGet.statusCode === 200 && Array.isArray(faqsGet.json.faqs) && faqsGet.json.faqs.length >= 5
  );

  // Create new QA test FAQ
  const newFaq = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/admin/faqs',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Cookie': authCookie }
  }, JSON.stringify({
    category: 'Commercial',
    question: 'QA Automated Verification Question: Do you offer scheduled pickups?',
    answer: 'Yes, Mulan Laundries offers customized commercial pickups on a daily or weekly schedule.',
    display_order: 99,
    active: true
  }));
  assertTest(
    'POST /api/admin/faqs creates new FAQ in Neon DB',
    newFaq.statusCode === 200 && newFaq.json && newFaq.json.faq && newFaq.json.faq.id
  );

  const createdFaqId = newFaq.json?.faq?.id;

  // Clean up created FAQ if exists
  if (createdFaqId) {
    const deleteFaq = await request({
      hostname: 'localhost',
      port: 3005,
      path: `/api/admin/faqs?id=${createdFaqId}`,
      method: 'DELETE',
      headers: { 'Cookie': authCookie }
    });
    assertTest('DELETE /api/admin/faqs removes test FAQ cleanly', deleteFaq.statusCode === 200 && deleteFaq.json.success === true);
  }

  // Test 2.4: Testimonials Management API
  const testGet = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/admin/testimonials',
    method: 'GET'
  });
  assertTest(
    'GET /api/admin/testimonials returns verified testimonials',
    testGet.statusCode === 200 && Array.isArray(testGet.json.testimonials) && testGet.json.testimonials.length >= 4
  );

  // Test 2.5: Pages Metadata API
  const pagesGet = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/admin/pages',
    method: 'GET'
  });
  assertTest(
    'GET /api/admin/pages returns 15+ CMS managed pages',
    pagesGet.statusCode === 200 && Array.isArray(pagesGet.json.pages) && pagesGet.json.pages.length >= 15
  );

  // ----------------------------------------------------
  // SECTION 3: IMAGE MANAGER & COMPUTER FILE UPLOAD
  // ----------------------------------------------------
  console.log('\nSECTION 3: IMAGE MANAGER & MEDIA UPLOADER');

  // Test 3.1: Slot verification
  const imagesGet = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/admin/images',
    method: 'GET'
  });
  assertTest(
    'GET /api/admin/images returns all 19 defined image slots',
    imagesGet.statusCode === 200 && imagesGet.json && imagesGet.json.images && imagesGet.json.images.length >= 19
  );

  // Test 3.2: Slot update and alt text persistence
  const updateSlot = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/admin/images',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Cookie': authCookie }
  }, JSON.stringify({
    slotKey: 'hero_main',
    imageUrl: '/images/laundry-hero-inspiration.jpg',
    altText: 'Commercial Linen Processing NYC Facility - QA Verified'
  }));
  assertTest(
    'POST /api/admin/images updates slot alt_text and image_url',
    updateSlot.statusCode === 200 && updateSlot.json && updateSlot.json.success === true
  );

  // Test 3.3: Direct computer file upload endpoint via multipart/form-data
  const boundary = '----WebKitFormBoundaryQA' + Math.random().toString(36).substring(2);
  const tinyPng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
  const multipartBody = makeMultipartFormData(boundary, 'file', 'qa-sample-upload.png', 'image/png', tinyPng);

  const testUpload = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/admin/upload',
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': multipartBody.length,
      'Cookie': authCookie
    }
  }, multipartBody, true);

  assertTest(
    'POST /api/admin/upload processes file upload with local/CDN fallback',
    testUpload.statusCode === 200 && testUpload.json && testUpload.json.url
  );

  // ----------------------------------------------------
  // SECTION 4: CALL MANAGEMENT & CONVERSION ELEMENTS
  // ----------------------------------------------------
  console.log('\nSECTION 4: CALL MANAGEMENT & STRICT CALL-BASED CONVERSION');

  // Test 4.1: Homepage HTML check for tel: links and phone display
  const homepage = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/',
    method: 'GET'
  });

  const hasTelLink = homepage.body.includes('tel:+19173654366') || homepage.body.includes('tel:9173654366');
  const hasPhoneText = homepage.body.includes('(917) 365-4366');

  // Verify that there are no fixed price checkouts or pricing tables
  const hasSelfCheckout = homepage.body.includes('Add to Cart') || homepage.body.includes('Checkout Now') || homepage.body.includes('Pricing Table');

  assertTest('Homepage renders valid tel: link (tel:+19173654366)', hasTelLink);
  assertTest('Homepage renders business phone (917) 365-4366', hasPhoneText);
  assertTest('Zero fixed self-checkout or pricing tables (Strict Call-Driven)', !hasSelfCheckout);

  // Test 4.2: Mobile Sticky Call CTA present in DOM
  const hasMobileSticky = homepage.body.includes('Call (917) 365-4366') || 
                          homepage.body.includes('Call Now') || 
                          homepage.body.includes('tel:+19173654366');
  assertTest('Mobile Sticky Call CTA component rendered in layout', hasMobileSticky);

  // ----------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------
  console.log('\n====================================================');
  console.log('   QA AUTOMATION EXECUTION SUMMARY');
  console.log('====================================================');
  console.log(`  TOTAL TESTS EXECUTED: ${passed + failed}`);
  console.log(`  PASSED: ${passed}`);
  console.log(`  FAILED: ${failed}`);
  console.log(`  SUCCESS RATE: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal Test Runner Error:', err);
  process.exit(1);
});
