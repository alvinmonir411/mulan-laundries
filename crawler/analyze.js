const fs = require('fs');
const path = require('path');

const audit = JSON.parse(fs.readFileSync(path.join(__dirname, 'audit_data.json'), 'utf8'));

console.log('--- PAGES CRAWLED ---');
Object.keys(audit.pages).forEach(url => {
  const p = audit.pages[url];
  console.log(`\nURL: ${url}`);
  console.log(`Title: ${p.title}`);
  console.log(`Meta Desc: ${p.metaDescription}`);
  console.log(`Headings:`, p.headings.map(h => `${h.tag.toUpperCase()}: ${h.text}`));
  console.log(`Paragraph count: ${p.paragraphs.length}`);
});

console.log('\n--- FORMS DETECTED ---');
console.log(JSON.stringify(audit.forms, null, 2));

console.log('\n--- EXTERNAL LINKS ---');
console.log(audit.externalLinks);

console.log('\n--- PHONES & EMAILS ---');
console.log('Phones:', audit.phoneNumbers);
console.log('Emails:', audit.emails);
