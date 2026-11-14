const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'full_content_dump.json'), 'utf8'));

const subservices = [
  'hospital-laundry-services.php',
  'laundry-services-short-term-residential-buildings.php',
  'laundry-services-health-clubs.php',
  'laundry-services-schools-dorms.php',
  'laundry-services-shelter-homes.php',
  'laundry-services-salons-spas.php',
  'laundry-services-gyms.php',
  'hotel-laundry-services.php',
  'bed-and-breakfast-laundry-services.php'
];

subservices.forEach(file => {
  const p = data[file];
  console.log(`\n================================================================`);
  console.log(`FILE: ${file}`);
  console.log(`TITLE: ${p.title}`);
  console.log(`META: ${p.metaDesc}`);
  console.log(`HEADINGS:`);
  p.headings.forEach(h => console.log(`  [${h.level}] ${h.text}`));
  console.log(`PARAGRAPHS (${p.paragraphs.length}):`);
  p.paragraphs.forEach(t => console.log(`  * ${t}`));
});
