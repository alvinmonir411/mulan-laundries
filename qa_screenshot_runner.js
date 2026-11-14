const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const baseDir = 'C:\\Users\\alvin monir\\.gemini\\antigravity\\scratch\\mulan-laundries';
const outDir = path.join(baseDir, 'qa_screenshots');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const targets = [
  { name: '01_homepage_hero.png', url: 'http://localhost:3005/', w: 1440, h: 900 },
  { name: '02_about_page.png', url: 'http://localhost:3005/about', w: 1440, h: 900 },
  { name: '03_commercial_page.png', url: 'http://localhost:3005/commercial-laundry', w: 1440, h: 900 },
  { name: '04_hotel_service.png', url: 'http://localhost:3005/services/hotel-laundry', w: 1440, h: 900 },
  { name: '05_pickup_request.png', url: 'http://localhost:3005/pickup-request', w: 1440, h: 900 },
  { name: '06_contact_page.png', url: 'http://localhost:3005/contact', w: 1440, h: 900 },
  { name: '07_admin_login.png', url: 'http://localhost:3005/admin', w: 1440, h: 900 },
  { name: '08_mobile_sticky_call.png', url: 'http://localhost:3005/', w: 390, h: 844 }
];

console.log('Capturing screenshots for QA visual audit...');

for (const t of targets) {
  const filePath = path.join(outDir, t.name);
  const cmd = `"${chromePath}" --headless=new --disable-gpu --window-size=${t.w},${t.h} --screenshot="${filePath}" "${t.url}"`;
  try {
    execSync(cmd, { stdio: 'ignore', timeout: 15000 });
    const exists = fs.existsSync(filePath);
    const size = exists ? fs.statSync(filePath).size : 0;
    console.log(`[CAPTURE] ${t.name} -> ${exists ? 'OK (' + size + ' bytes)' : 'FAILED'}`);
  } catch (err) {
    console.error(`[ERROR] ${t.name}:`, err.message);
  }
}

console.log('Visual screenshot suite completed.');
