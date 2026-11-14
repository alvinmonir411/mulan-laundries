const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'full_content_dump.json'), 'utf8'));

['about.php', 'commercial-laundry.php', 'wash-fold.php'].forEach(key => {
  console.log(`\n================= ${key} =================`);
  console.log('Title:', data[key].title);
  console.log('MetaDesc:', data[key].metaDesc);
  console.log('Headings:', data[key].headings);
  console.log('Paragraphs:');
  data[key].paragraphs.forEach(p => console.log('  * ', p));
  console.log('List Items:');
  data[key].listItems.forEach(li => console.log('  - ', li));
});
