const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const baseDir = 'C:\\Users\\alvin monir\\.gemini\\antigravity\\scratch\\mulan-laundries';
const outDir = path.join(baseDir, 'qa_screenshots');

const targets = [
  { name: '09_video_hero_desktop.png', url: 'http://localhost:3005/', w: 1440, h: 900 },
  { name: '10_video_hero_mobile.png', url: 'http://localhost:3005/', w: 390, h: 844 },
  { name: '11_admin_hero_editor.png', url: 'http://localhost:3005/admin', w: 1440, h: 900 }
];

console.log('Capturing video hero screenshots...');
for (const t of targets) {
  const filePath = path.join(outDir, t.name);
  const cmd = `"${chromePath}" --headless=new --disable-gpu --window-size=${t.w},${t.h} --screenshot="${filePath}" "${t.url}"`;
  try {
    execSync(cmd, { stdio: 'ignore', timeout: 20000 });
    const exists = fs.existsSync(filePath);
    const size = exists ? fs.statSync(filePath).size : 0;
    console.log(`[CAPTURE] ${t.name} -> ${exists ? 'OK (' + size + ' bytes)' : 'FAILED'}`);
  } catch (err) {
    console.error(`[ERROR] ${t.name}:`, err.message);
  }
}
console.log('All hero screenshots captured.');
