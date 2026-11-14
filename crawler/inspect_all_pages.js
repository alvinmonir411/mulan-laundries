const fs = require('fs');
const path = require('path');

const audit = JSON.parse(fs.readFileSync(path.join(__dirname, 'audit_data.json'), 'utf8'));

console.log('Total pages crawled:', Object.keys(audit.pages).length);
for (const [url, data] of Object.entries(audit.pages)) {
  console.log('----------------------------------------------------');
  console.log(`PAGE: ${url}`);
  console.log(`TITLE: ${data.title}`);
  console.log(`CANONICAL: ${data.canonical}`);
  console.log(`META DESC: ${data.metaDescription}`);
  console.log(`HEADINGS:`);
  data.headings.forEach(h => console.log(`  [${h.tag.toUpperCase()}] ${h.text}`));
  console.log(`PARAGRAPHS SAMPLE:`);
  data.paragraphs.slice(0, 5).forEach(p => console.log(`  - ${p.slice(0, 120)}...`));
}
