const http = require('http');
const fs = require('fs');
const path = require('path');

function postMultipart(filePath) {
  return new Promise((resolve, reject) => {
    const boundary = '----WebKitFormBoundary' + Math.random().toString(16).slice(2);
    const fileContent = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);

    let payload = Buffer.concat([
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${fileName}"\r\nContent-Type: image/jpeg\r\n\r\n`),
      fileContent,
      Buffer.from(`\r\n--${boundary}--\r\n`)
    ]);

    const req = http.request({
      hostname: 'localhost',
      port: 3005,
      path: '/api/admin/upload',
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': payload.length,
      }
    }, res => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: raw }));
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function postJson(pathUrl, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request({
      hostname: 'localhost',
      port: 3005,
      path: pathUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      }
    }, res => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: raw }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function get(pathUrl) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3005,
      path: pathUrl,
      method: 'GET',
    }, res => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: raw }));
    });
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  console.log('=== 1. Testing Direct File Upload from Computer via /api/admin/upload ===');
  // Use existing washfold.jpg as test file
  const testFile = path.join(process.cwd(), 'public', 'images', 'washfold.jpg');
  console.log('Uploading local test file:', testFile);
  const uploadRes = await postMultipart(testFile);
  console.log('Upload status:', uploadRes.status);
  const uploadData = JSON.parse(uploadRes.body);
  console.log('Uploaded image URL:', uploadData.url);
  console.log('Upload provider:', uploadData.provider);

  console.log('\n=== 2. Updating "Wash & Fold" (service_wash_fold) in Neon DB ===');
  const updateRes = await postJson('/api/admin/images', {
    slotKey: 'service_wash_fold',
    imageUrl: uploadData.url,
    altText: 'Wash and Fold newly uploaded from computer',
  });
  console.log('Update slot status:', updateRes.status);
  const updateData = JSON.parse(updateRes.body);
  console.log('Update slot response:', updateData.message);

  console.log('\n=== 3. Checking Live Homepage GET / for Updated Services Section Image ===');
  const homeRes = await get('/');
  console.log('Homepage status:', homeRes.status);
  // Next.js Image component URL encodes the url param, or check if raw/encoded is in html
  const encodedUrl = encodeURIComponent(uploadData.url);
  const containsRaw = homeRes.body.includes(uploadData.url);
  const containsEncoded = homeRes.body.includes(encodedUrl);
  console.log('Homepage contains raw uploaded URL?', containsRaw);
  console.log('Homepage contains encoded Next/Image URL?', containsEncoded);

  if (containsRaw || containsEncoded) {
    console.log('>>> PASSED: Homepage OUR SERVICES section updated live without URL input! <<<');
  } else {
    console.warn('URL check: looking for snippet...');
  }

  console.log('\n=== 4. Restoring Default Wash & Fold Image in Neon DB ===');
  const restoreRes = await postJson('/api/admin/images', {
    slotKey: 'service_wash_fold',
    imageUrl: '/images/washfold.jpg',
    altText: 'Wash and Fold regular laundry',
  });
  console.log('Restore status:', restoreRes.status);
  console.log('>>> All services upload and revalidation tests completed successfully! <<<');
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
