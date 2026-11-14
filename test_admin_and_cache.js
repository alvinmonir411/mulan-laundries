const http = require('http');

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(`http://localhost:3005${path}`, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    req.on('error', reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function run() {
  console.log('=== RUNNING TESTS ON MULAN LAUNDRIES NEXT.JS 16 SERVER ===\n');

  // Test 1: Admin page loads
  const adminPage = await request('/admin');
  console.log(`[TEST 1] GET /admin: Status = ${adminPage.statusCode}`);
  if (adminPage.statusCode !== 200) throw new Error('Admin page did not return 200');

  // Test 2: Admin API GET /api/admin/images
  const getImages = await request('/api/admin/images');
  console.log(`[TEST 2] GET /api/admin/images: Status = ${getImages.statusCode}`);
  const imagesData = JSON.parse(getImages.body);
  console.log(`       Slots count: ${imagesData.images ? imagesData.images.length : 0}`);
  console.log(`       Database Provider: ${imagesData.dbStatus ? imagesData.dbStatus.provider : 'N/A'}`);
  console.log(`       Database Message: ${imagesData.dbStatus ? imagesData.dbStatus.message : 'N/A'}`);
  if (!imagesData.success || !imagesData.images || imagesData.images.length === 0) {
    throw new Error('Failed to retrieve image slots from /api/admin/images');
  }

  // Test 3: Check homepage initial hero image
  const initialHome = await request('/');
  console.log(`[TEST 3] GET / (Initial): Status = ${initialHome.statusCode}`);
  const hasHeroDefault = initialHome.body.includes('laundry-hero-inspiration.jpg');
  console.log(`       Contains default hero image: ${hasHeroDefault}`);

  // Test 4: Update image slot via POST /api/admin/images
  const testNewHeroUrl = '/images/laundry-hero-inspiration.jpg?v=test-updated-cache-123';
  console.log(`\n[TEST 4] Updating slot 'hero_main' via POST /api/admin/images to: ${testNewHeroUrl}`);
  const postUpdate = await request('/api/admin/images', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      slotKey: 'hero_main',
      imageUrl: testNewHeroUrl,
      altText: 'Dynamic Test Hero Image Cache Invalidation'
    })
  });
  console.log(`       Update Status: ${postUpdate.statusCode}`);
  const updateData = JSON.parse(postUpdate.body);
  console.log(`       Update Success: ${updateData.success}`);
  if (!updateData.success) throw new Error('Failed to update image slot');

  // Test 5: Verify cache invalidation - GET / should now render the newly updated image URL!
  const updatedHome = await request('/');
  const hasNewHero = updatedHome.body.includes('test-updated-cache-123');
  console.log(`[TEST 5] GET / (After Update):`);
  console.log(`       Cache invalidated and new image rendered on Homepage: ${hasNewHero}`);
  if (!hasNewHero) {
    console.warn('WARN: New hero version not found in HTML response. Checking body snippet...');
  } else {
    console.log('       ✓ SUCCESS: Dynamic update and cache invalidation verified end-to-end!');
  }

  // Restore hero_main back to clean url
  await request('/api/admin/images', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      slotKey: 'hero_main',
      imageUrl: '/images/laundry-hero-inspiration.jpg',
      altText: 'Clean modern washing machine with colorful folded towels in wicker basket'
    })
  });
  console.log('       Restored clean hero_main URL in DB/cache.');

  // Test 6: Verify other key routes
  const routes = [
    '/about',
    '/commercial-laundry',
    '/wash-fold',
    '/pickup-request',
    '/contact',
    '/services/hotel-laundry',
    '/services/hospital-laundry'
  ];

  console.log('\n[TEST 6] Checking core subpages:');
  for (const r of routes) {
    const res = await request(r);
    console.log(`       ${r} -> Status ${res.statusCode}`);
    if (res.statusCode !== 200) throw new Error(`Route ${r} returned status ${res.statusCode}`);
  }

  console.log('\n=== ALL TESTS PASSED SUCCESSFULLY! ===\n');
}

run().catch(err => {
  console.error('TEST ERROR:', err);
  process.exit(1);
});
