const http = require('http');

http.get('http://localhost:3005', (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    console.log("Contains '$1.75':", body.includes('$1.75'));
    console.log("Contains '$18.00':", body.includes('$18.00'));
    console.log("Contains '$25.00':", body.includes('$25.00'));
    console.log("Contains '$36.00':", body.includes('$36.00'));
    console.log("Contains 'Laundry Rate Card':", body.includes('Laundry Rate Card'));
    console.log("Contains 'Turnaround & Delivery Options':", body.includes('Turnaround &amp; Delivery Options') || body.includes('Turnaround & Delivery Options'));
    console.log("Contains 'Scheduled Par Exchange':", body.includes('Scheduled Par Exchange'));
  });
});
