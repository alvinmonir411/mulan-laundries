const https = require('https');
const fs = require('fs');

async function testUnsigned(preset) {
  return new Promise((resolve) => {
    const boundary = "----WebKitFormBoundary" + Math.random().toString(36).substring(2);
    let body = "";
    body += `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="upload_preset"\r\n\r\n${preset}\r\n`;
    body += `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="file"; filename="test.jpg"\r\n`;
    body += `Content-Type: image/jpeg\r\n\r\n`;

    const payloadHeader = Buffer.from(body, 'utf-8');
    const fileData = fs.readFileSync("public/images/washfold.jpg");
    const payloadFooter = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8');
    const fullPayload = Buffer.concat([payloadHeader, fileData, payloadFooter]);

    const req = https.request({
      hostname: 'api.cloudinary.com',
      port: 443,
      path: `/v1_1/dgaiqqh7k/image/upload`,
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': fullPayload.length,
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ preset, status: res.statusCode, body: data });
      });
    });
    req.on('error', (e) => resolve({ preset, error: e.message }));
    req.write(fullPayload);
    req.end();
  });
}

async function checkPresets() {
  const presets = ['ml_default', 'unsigned', 'mulan', 'mulan_laundries', 'default'];
  for (const p of presets) {
    const r = await testUnsigned(p);
    console.log(`Preset ${p}: Status ${r.status} -> ${r.body}`);
  }
}

checkPresets();
