const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.mulanlaundries.com';
const outputDir = path.join(__dirname, 'raw_pages');
const imgDir = path.join(__dirname, 'images');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

const visited = new Set();
const queue = [
  'https://www.mulanlaundries.com/',
  'https://www.mulanlaundries.com/about.php',
  'https://www.mulanlaundries.com/commercial-laundry.php',
  'https://www.mulanlaundries.com/wash-fold.php',
  'https://www.mulanlaundries.com/contact.php',
  'https://www.mulanlaundries.com/pickuprequest.php',
];

const auditResults = {
  pages: {},
  allLinks: new Set(),
  externalLinks: new Set(),
  brokenLinks: [],
  allImages: new Map(),
  phoneNumbers: new Set(),
  emails: new Set(),
  addresses: new Set(),
  forms: [],
  ctas: []
};

function normalizeUrl(url, base = BASE_URL) {
  try {
    const parsed = new URL(url, base);
    if (parsed.origin !== new URL(BASE_URL).origin) return null;
    parsed.hash = '';
    return parsed.href;
  } catch (e) {
    return null;
  }
}

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });
    return {
      status: res.status,
      statusText: res.statusText,
      headers: Object.fromEntries(res.headers.entries()),
      html: await res.text()
    };
  } catch (err) {
    return { error: err.message };
  }
}

function parseHTML(html, currentUrl) {
  const result = {
    url: currentUrl,
    title: '',
    metaDescription: '',
    metaKeywords: '',
    ogTags: {},
    canonical: '',
    headings: [],
    paragraphs: [],
    links: [],
    images: [],
    forms: [],
    textBlocks: []
  };

  // Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) result.title = titleMatch[1].replace(/\s+/g, ' ').trim();

  // Meta tags
  const metaRegex = /<meta\s+([^>]+)>/gi;
  let metaMatch;
  while ((metaMatch = metaRegex.exec(html)) !== null) {
    const attrs = metaMatch[1];
    const nameMatch = attrs.match(/name=["']([^"']+)["']/i);
    const propMatch = attrs.match(/property=["']([^"']+)["']/i);
    const contentMatch = attrs.match(/content=["']([^"']*)["']/i);
    const key = (nameMatch ? nameMatch[1] : (propMatch ? propMatch[1] : '')).toLowerCase();
    const val = contentMatch ? contentMatch[1] : '';

    if (key === 'description') result.metaDescription = val;
    if (key === 'keywords') result.metaKeywords = val;
    if (key.startsWith('og:')) result.ogTags[key] = val;
  }

  // Canonical
  const canonMatch = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  if (canonMatch) result.canonical = canonMatch[1];

  // Headings h1-h6
  const hRegex = /<(h[1-6])([^>]*)>([\s\S]*?)<\/\1>/gi;
  let hMatch;
  while ((hMatch = hRegex.exec(html)) !== null) {
    const tag = hMatch[1].toLowerCase();
    const cleanText = hMatch[3].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (cleanText) result.headings.push({ tag, text: cleanText });
  }

  // Paragraphs
  const pRegex = /<p([^>]*)>([\s\S]*?)<\/p>/gi;
  let pMatch;
  while ((pMatch = pRegex.exec(html)) !== null) {
    const cleanText = pMatch[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (cleanText && cleanText.length > 5) result.paragraphs.push(cleanText);
  }

  // Links
  const aRegex = /<a\s+([^>]+)>([\s\S]*?)<\/a>/gi;
  let aMatch;
  while ((aMatch = aRegex.exec(html)) !== null) {
    const attrs = aMatch[1];
    const innerText = aMatch[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const hrefMatch = attrs.match(/href=["']([^"']*)["']/i);
    const href = hrefMatch ? hrefMatch[1].trim() : '';

    if (href) {
      result.links.push({ href, text: innerText });
      if (href.startsWith('tel:')) {
        auditResults.phoneNumbers.add(href.replace('tel:', '').trim());
      } else if (href.startsWith('mailto:')) {
        auditResults.emails.add(href.replace('mailto:', '').trim());
      } else if (href.startsWith('http://') || href.startsWith('https://')) {
        const parsed = normalizeUrl(href, currentUrl);
        if (parsed) {
          auditResults.allLinks.add(parsed);
        } else {
          auditResults.externalLinks.add(href);
        }
      } else if (!href.startsWith('#') && !href.startsWith('javascript:')) {
        const full = normalizeUrl(href, currentUrl);
        if (full) auditResults.allLinks.add(full);
      }
    }
  }

  // Images
  const imgRegex = /<img\s+([^>]+)>/gi;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(html)) !== null) {
    const attrs = imgMatch[1];
    const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
    const altMatch = attrs.match(/alt=["']([^"']*)["']/i);
    const widthMatch = attrs.match(/width=["']([^"']*)["']/i);
    const heightMatch = attrs.match(/height=["']([^"']*)["']/i);

    if (srcMatch) {
      const src = srcMatch[1].trim();
      const alt = altMatch ? altMatch[1].trim() : '';
      const fullSrc = new URL(src, currentUrl).href;
      result.images.push({ src, fullSrc, alt });
      if (!auditResults.allImages.has(fullSrc)) {
        auditResults.allImages.set(fullSrc, {
          src,
          fullSrc,
          alt,
          foundOn: [currentUrl]
        });
      } else {
        auditResults.allImages.get(fullSrc).foundOn.push(currentUrl);
      }
    }
  }

  // Forms
  const formRegex = /<form\s+([^>]*)>([\s\S]*?)<\/form>/gi;
  let fMatch;
  while ((fMatch = formRegex.exec(html)) !== null) {
    const fAttrs = fMatch[1];
    const fBody = fMatch[2];
    const actionMatch = fAttrs.match(/action=["']([^"']*)["']/i);
    const methodMatch = fAttrs.match(/method=["']([^"']*)["']/i);
    const idMatch = fAttrs.match(/id=["']([^"']*)["']/i);
    const action = actionMatch ? actionMatch[1] : '';
    const method = methodMatch ? methodMatch[1] : 'GET';
    const formId = idMatch ? idMatch[1] : '';

    const inputs = [];
    const inputRegex = /<(input|textarea|select)\s+([^>]*)(?:\/?>|>([\s\S]*?)<\/\1>)/gi;
    let iMatch;
    while ((iMatch = inputRegex.exec(fBody)) !== null) {
      const tag = iMatch[1].toLowerCase();
      const iAttrs = iMatch[2];
      const name = (iAttrs.match(/name=["']([^"']*)["']/i) || [])[1] || '';
      const type = (iAttrs.match(/type=["']([^"']*)["']/i) || [])[1] || (tag === 'textarea' ? 'textarea' : tag === 'select' ? 'select' : 'text');
      const placeholder = (iAttrs.match(/placeholder=["']([^"']*)["']/i) || [])[1] || '';
      const required = /required/i.test(iAttrs);
      const value = (iAttrs.match(/value=["']([^"']*)["']/i) || [])[1] || '';
      inputs.push({ tag, name, type, placeholder, required, value });
    }

    result.forms.push({
      page: currentUrl,
      action,
      method,
      formId,
      inputs
    });
    auditResults.forms.push({
      page: currentUrl,
      action,
      method,
      formId,
      inputs
    });
  }

  // Detect phone/email in text
  const phoneRegex = /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  let phMatch;
  while ((phMatch = phoneRegex.exec(html)) !== null) {
    auditResults.phoneNumbers.add(phMatch[0].trim());
  }

  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  let emMatch;
  while ((emMatch = emailRegex.exec(html)) !== null) {
    if (!emMatch[0].endsWith('.png') && !emMatch[0].endsWith('.jpg')) {
      auditResults.emails.add(emMatch[0].trim());
    }
  }

  return result;
}

async function downloadAsset(url, destPath) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    if (!res.ok) return false;
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (e) {
    return false;
  }
}

async function main() {
  console.log('Starting full crawl of Mulan Laundries...');

  while (queue.length > 0) {
    const currentUrl = queue.shift();
    if (visited.has(currentUrl)) continue;
    visited.add(currentUrl);

    console.log(`Crawling: ${currentUrl}`);
    const res = await fetchPage(currentUrl);

    if (res.error || res.status !== 200) {
      console.warn(`Failed or non-200 for ${currentUrl}:`, res.error || res.status);
      auditResults.brokenLinks.push({ url: currentUrl, error: res.error || res.status });
      continue;
    }

    // Save raw HTML
    const urlObj = new URL(currentUrl);
    let filename = urlObj.pathname.replace(/^\//, '').replace(/\//g, '_') || 'index';
    if (!filename.endsWith('.html') && !filename.endsWith('.php')) filename += '.html';
    fs.writeFileSync(path.join(outputDir, filename), res.html, 'utf8');

    const parsed = parseHTML(res.html, currentUrl);
    auditResults.pages[currentUrl] = parsed;

    // Add unvisited internal links to queue
    for (const link of parsed.links) {
      const normalized = normalizeUrl(link.href, currentUrl);
      if (normalized && !visited.has(normalized) && !queue.includes(normalized)) {
        // filter out static assets, mailto, etc
        if (!normalized.match(/\.(pdf|jpg|jpeg|png|gif|svg|css|js|zip)$/i)) {
          queue.push(normalized);
        }
      }
    }
  }

  console.log(`\nVisited ${visited.size} pages.`);
  console.log(`Discovered ${auditResults.allImages.size} unique images.`);
  console.log(`Discovered ${auditResults.phoneNumbers.size} phone numbers:`, Array.from(auditResults.phoneNumbers));
  console.log(`Discovered ${auditResults.emails.size} emails:`, Array.from(auditResults.emails));

  // Download all images
  console.log('\nDownloading images...');
  let downloadedCount = 0;
  for (const [imgUrl, imgData] of auditResults.allImages.entries()) {
    try {
      const u = new URL(imgUrl);
      const ext = path.extname(u.pathname) || '.jpg';
      let safeName = path.basename(u.pathname) || `img_${downloadedCount}${ext}`;
      // clean name
      safeName = safeName.replace(/[^a-zA-Z0-9._-]/g, '_');
      const dest = path.join(imgDir, safeName);
      const ok = await downloadAsset(imgUrl, dest);
      imgData.localFile = ok ? safeName : null;
      if (ok) downloadedCount++;
    } catch (e) {
      imgData.localFile = null;
    }
  }
  console.log(`Downloaded ${downloadedCount}/${auditResults.allImages.size} images.`);

  // Save audit data JSON
  const serialized = {
    pages: auditResults.pages,
    visitedUrls: Array.from(visited),
    allLinks: Array.from(auditResults.allLinks),
    externalLinks: Array.from(auditResults.externalLinks),
    brokenLinks: auditResults.brokenLinks,
    allImages: Array.from(auditResults.allImages.values()),
    phoneNumbers: Array.from(auditResults.phoneNumbers),
    emails: Array.from(auditResults.emails),
    forms: auditResults.forms
  };

  fs.writeFileSync(path.join(__dirname, 'audit_data.json'), JSON.stringify(serialized, null, 2), 'utf8');
  console.log('Saved audit_data.json successfully!');
}

main().catch(err => {
  console.error('Fatal crawler error:', err);
});
