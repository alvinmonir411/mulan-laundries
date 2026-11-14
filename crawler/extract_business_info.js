const fs = require('fs');
const path = require('path');

const rawDir = path.join(__dirname, 'raw_pages');
const files = fs.readdirSync(rawDir);

console.log('Inspecting raw HTML files:', files.length);

const contactDetails = {
  addresses: new Set(),
  phones: new Set(),
  emails: new Set(),
  hours: new Set(),
  social: new Set(),
  testimonials: []
};

files.forEach(file => {
  const content = fs.readFileSync(path.join(rawDir, file), 'utf8');

  // Look for address blocks
  const addrRegex = /(?:address|location|headquarters)[^<]*<[^>]*>([\s\S]*?)<\/(?:div|p|span|li|address)>/gi;
  let match;
  while ((match = addrRegex.exec(content)) !== null) {
    const clean = match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (clean.length > 5 && clean.length < 200) contactDetails.addresses.add(clean);
  }

  // Look for any street / NYC mentions
  const lines = content.split('\n');
  lines.forEach(l => {
    if (/Bronx|New York|Street|Avenue|Blvd|Suite|NY\s*\d{5}/i.test(l)) {
      const clean = l.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      if (clean.length > 5 && clean.length < 150) contactDetails.addresses.add(clean);
    }
  });

  // Testimonials / Charles N. Rock
  if (content.includes('Charles N. Rock')) {
    const testMatch = content.match(/Charles N\. Rock[\s\S]*?<\/(?:div|p|blockquote|section)>/i);
    if (testMatch) {
      contactDetails.testimonials.push(testMatch[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
    }
  }
});

console.log('ADDRESS CANDIDATES:');
contactDetails.addresses.forEach(a => console.log('  -', a));

console.log('\nTESTIMONIAL CANDIDATES:');
console.log(contactDetails.testimonials);
