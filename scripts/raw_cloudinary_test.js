const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const cloudName = "dgaiqqh7k";
const apiKey = "673182877555238";
const apiSecret = "Lt98TBmqTdi3RGHIEr6xGv9KPxU";
const timestamp = Math.floor(Date.now() / 1000);

// Signature
const strToSign = `timestamp=${timestamp}${apiSecret}`;
const signature = crypto.createHash('sha1').update(strToSign).digest('hex');

console.log("Timestamp:", timestamp);
console.log("Signature:", signature);

// Read small image
const fileData = fs.readFileSync("public/images/washfold.jpg");
const boundary = "----WebKitFormBoundary" + Math.random().toString(36).substring(2);

let body = "";
body += `--${boundary}\r\n`;
body += `Content-Disposition: form-data; name="api_key"\r\n\r\n${apiKey}\r\n`;
body += `--${boundary}\r\n`;
body += `Content-Disposition: form-data; name="timestamp"\r\n\r\n${timestamp}\r\n`;
body += `--${boundary}\r\n`;
body += `Content-Disposition: form-data; name="signature"\r\n\r\n${signature}\r\n`;
body += `--${boundary}\r\n`;
body += `Content-Disposition: form-data; name="file"; filename="washfold.jpg"\r\n`;
body += `Content-Type: image/jpeg\r\n\r\n`;

const payloadHeader = Buffer.from(body, 'utf-8');
const payloadFooter = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8');
const fullPayload = Buffer.concat([payloadHeader, fileData, payloadFooter]);

const req = https.request({
  hostname: 'api.cloudinary.com',
  port: 443,
  path: `/v1_1/${cloudName}/image/upload`,
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    'Content-Length': fullPayload.length,
    'User-Agent': 'CloudinaryNodeJS/2.5.1',
  }
}, (res) => {
  let responseData = '';
  res.on('data', chunk => responseData += chunk);
  res.on('end', () => {
    console.log("Status Code:", res.statusCode);
    console.log("Headers:", res.headers);
    console.log("Response Body:", responseData);
  });
});

req.on('error', (e) => console.error(e));
req.write(fullPayload);
req.end();
