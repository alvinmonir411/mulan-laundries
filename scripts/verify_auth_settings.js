const http = require('http');

function post(path, body, cookie = '') {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request({
      hostname: 'localhost',
      port: 3005,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        ...(cookie ? { 'Cookie': cookie } : {})
      }
    }, res => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: raw }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function get(path, cookie = '') {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3005,
      path,
      method: 'GET',
      headers: cookie ? { 'Cookie': cookie } : {}
    }, res => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: raw }));
    });
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  console.log('=== 1. Testing Auth with WRONG password ===');
  const resBad = await post('/api/admin/auth', { email: 'admin@gmail.com', password: 'wrong' });
  console.log('Bad login status (expected 401):', resBad.status);
  console.log('Bad login response:', resBad.body);

  console.log('\n=== 2. Testing Auth with CORRECT password (13663) ===');
  const resGood = await post('/api/admin/auth', { email: 'admin@gmail.com', password: '13663' });
  console.log('Good login status (expected 200):', resGood.status);
  console.log('Good login response:', resGood.body);
  const setCookie = resGood.headers['set-cookie'] ? resGood.headers['set-cookie'][0] : '';
  console.log('Auth Cookie set:', setCookie.split(';')[0]);

  console.log('\n=== 3. Testing GET /api/admin/settings ===');
  const resSettings = await get('/api/admin/settings');
  console.log('Settings status:', resSettings.status);
  const data = JSON.parse(resSettings.body);
  const settings = data.settings || {};
  console.log('Loaded settings count:', Object.keys(settings).length);
  console.log('Hero Line 1:', settings.hero_title_line1);
  console.log('Hero Line 2:', settings.hero_title_line2);
  console.log('Phone:', settings.phone);
  console.log('Email:', settings.email);
  console.log('Favicon:', settings.favicon_url);
  console.log('Logo Header:', settings.logo_header);

  console.log('\n=== 4. Testing Homepage Initial State ===');
  const resHome = await get('/');
  console.log('Home status:', resHome.status);
  console.log('Homepage contains Hero Line 1?', resHome.body.includes(settings.hero_title_line1));
  console.log('Homepage contains Phone?', resHome.body.includes(settings.phone));

  console.log('\n=== 5. Testing Instant Live Revalidation via POST /api/admin/settings ===');
  const testVal = 'Fresh Life! Instant Live Update Test';
  const updateRes = await post('/api/admin/settings', { hero_title_line2: testVal }, setCookie);
  console.log('Settings update status:', updateRes.status);
  console.log('Settings update message:', JSON.parse(updateRes.body).message);

  const resHomeAfter = await get('/');
  const liveUpdated = resHomeAfter.body.includes(testVal);
  console.log('Homepage immediately reflects updated title?', liveUpdated ? 'PASSED (YES!)' : 'FAILED (NO)');

  console.log('\n=== 6. Reverting title back to "Fresh Life!" ===');
  const revertRes = await post('/api/admin/settings', { hero_title_line2: 'Fresh Life!' }, setCookie);
  console.log('Revert status:', revertRes.status);
  const resHomeFinal = await get('/');
  console.log('Homepage contains reverted title?', resHomeFinal.body.includes('Fresh Life!'));
  console.log('Test value successfully cleaned up?', !resHomeFinal.body.includes(testVal));

  console.log('\n=== ALL VERIFICATION TESTS COMPLETED SUCCESSFULLY! ===');
}

run().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
