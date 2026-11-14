const fs = require('fs');
const path = require('path');

const rawDir = path.join(__dirname, 'raw_pages');
const files = fs.readdirSync(rawDir);

const fullExtraction = {};

files.forEach(file => {
  const content = fs.readFileSync(path.join(rawDir, file), 'utf8');

  // Strip scripts, styles, comments
  let cleaned = content
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '');

  // Extract title
  const titleMatch = content.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : '';

  // Extract meta description
  const metaDescMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const metaDesc = metaDescMatch ? metaDescMatch[1].trim() : '';

  // Extract all sections, headings, paragraphs, lists
  const sections = [];
  
  // Find headings and their subsequent content
  const headingRegex = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
  let hMatch;
  const headings = [];
  while ((hMatch = headingRegex.exec(cleaned)) !== null) {
    const text = hMatch[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text) headings.push({ level: hMatch[1].toLowerCase(), text });
  }

  // Find paragraphs
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let pMatch;
  const paragraphs = [];
  while ((pMatch = pRegex.exec(cleaned)) !== null) {
    const text = pMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text && text.length > 3) paragraphs.push(text);
  }

  // Find list items
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let liMatch;
  const listItems = [];
  while ((liMatch = liRegex.exec(cleaned)) !== null) {
    const text = liMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text && !text.includes('Terms and Conditions') && !text.includes('Privacy Policy') && text.length > 2) {
      listItems.push(text);
    }
  }

  // Find images
  const imgRegex = /<img[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi;
  let imgMatch;
  const images = [];
  while ((imgMatch = imgRegex.exec(content)) !== null) {
    images.push({ src: imgMatch[1], alt: imgMatch[2] });
  }

  fullExtraction[file] = {
    title,
    metaDesc,
    headings,
    paragraphs,
    listItems,
    images
  };
});

fs.writeFileSync(path.join(__dirname, 'full_content_dump.json'), JSON.stringify(fullExtraction, null, 2), 'utf8');
console.log('Saved full_content_dump.json');
