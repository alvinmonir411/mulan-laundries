const fs = require('fs');

async function checkNavbar() {
  const res = await fetch('http://localhost:3005/');
  const html = await res.text();
  const navMatches = html.match(/<nav[\s\S]*?<\/nav>/i);
  if (navMatches) {
    console.log('--- FOUND NAVBAR IN HOMEPAGE ---');
    const regex = /href="([^"]+)"/g;
    let m;
    const hrefs = [];
    while ((m = regex.exec(navMatches[0])) !== null) {
      hrefs.push(m[1]);
    }
    console.log('Unique Navbar HREFs:', Array.from(new Set(hrefs)));
  }
}

checkNavbar();
