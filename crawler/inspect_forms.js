const fs = require('fs');
const path = require('path');

const contactHtml = fs.readFileSync(path.join(__dirname, 'raw_pages', 'contact.php'), 'utf8');
const pickupHtml = fs.readFileSync(path.join(__dirname, 'raw_pages', 'pickuprequest.php'), 'utf8');
const indexHtml = fs.readFileSync(path.join(__dirname, 'raw_pages', 'index.html'), 'utf8');

console.log('=== CONTACT.PHP FORM ===');
const contactFormMatch = contactHtml.match(/<form[\s\S]*?<\/form>/i);
console.log(contactFormMatch ? contactFormMatch[0] : 'None');

console.log('\n=== CONTACT.PHP CONTENT ===');
const bodyMatch = contactHtml.match(/<body[\s\S]*?<\/body>/i);
if (bodyMatch) {
  console.log(bodyMatch[0].replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 2000));
}

console.log('\n=== PICKUPREQUEST.PHP FORM ===');
const pickupFormMatch = pickupHtml.match(/<form[\s\S]*?<\/form>/i);
console.log(pickupFormMatch ? pickupFormMatch[0] : 'None');

console.log('\n=== FOOTER FROM INDEX.HTML ===');
const footerMatch = indexHtml.match(/<footer[\s\S]*?<\/footer>/i);
console.log(footerMatch ? footerMatch[0] : 'None');
