const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'full_content_dump.json'), 'utf8'));

console.log('=== INDEX.HTML ===');
console.log('Title:', data['index.html'].title);
console.log('MetaDesc:', data['index.html'].metaDesc);
console.log('Headings:', data['index.html'].headings);
console.log('Paragraphs:');
data['index.html'].paragraphs.forEach(p => console.log('  * ', p));
console.log('Images:');
data['index.html'].images.forEach(img => console.log('  - ', img.src, ' | alt:', img.alt));
