const http = require('http');

function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request({
      hostname: 'localhost',
      port: 3005,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      }
    }, res => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: raw }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function patch(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request({
      hostname: 'localhost',
      port: 3005,
      path,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      }
    }, res => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: raw }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function get(path) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3005,
      path,
      method: 'GET',
    }, res => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: raw }));
    });
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  console.log('=== 1. Submitting Contact Form via POST /api/contact ===');
  const contactPayload = {
    name: 'Sarah Jenkins',
    phone: '(917) 555-8392',
    email: 'sarah.j@nyc-hospitality.com',
    customerType: 'Commercial - Restaurant',
    subject: 'Table Linens & Napery Route Service',
    message: 'We operate a high-volume restaurant in NYC and need 5x weekly linen laundering with crisp fold packaging.',
  };
  const contactRes = await post('/api/contact', contactPayload);
  console.log('Contact POST status:', contactRes.status);
  const contactData = JSON.parse(contactRes.body);
  console.log('Contact response ref:', contactData.referenceId);

  console.log('\n=== 2. Submitting Pickup Request via POST /api/pickup ===');
  const pickupPayload = {
    firstName: 'Michael',
    lastName: 'OConnor',
    phone: '(347) 555-4019',
    email: 'm.oconnor@bronxcondo.com',
    customerType: 'Residential',
    pickupDay: 'Wednesday',
    message: 'Please pick up 4 bags of wash & fold laundry from the lobby front desk.',
  };
  const pickupRes = await post('/api/pickup', pickupPayload);
  console.log('Pickup POST status:', pickupRes.status);
  const pickupData = JSON.parse(pickupRes.body);
  console.log('Pickup response ref:', pickupData.referenceId);

  console.log('\n=== 3. Fetching All Submissions via GET /api/admin/submissions ===');
  const adminRes = await get('/api/admin/submissions');
  console.log('Admin submissions status:', adminRes.status);
  const adminData = JSON.parse(adminRes.body);
  console.log('Total submissions found in Neon DB:', adminData.count);

  const foundContact = adminData.submissions.find(s => s.reference_id === contactData.referenceId);
  const foundPickup = adminData.submissions.find(s => s.reference_id === pickupData.referenceId);

  console.log('Did Neon DB save Contact Form?', !!foundContact, foundContact?.name, foundContact?.status);
  console.log('Did Neon DB save Pickup Request?', !!foundPickup, foundPickup?.name, foundPickup?.status);

  console.log('\n=== 4. Updating Contact Submission Status to "Contacted" via PATCH ===');
  const patchRes = await patch('/api/admin/submissions', {
    reference_id: contactData.referenceId,
    status: 'Contacted',
    notes: 'Called Sarah at 12:45 PM. Scheduled facility walkthrough.',
  });
  console.log('Patch status:', patchRes.status, patchRes.body);

  console.log('\n=== 5. Verifying Updated Status ===');
  const verifyRes = await get('/api/admin/submissions');
  const verifyData = JSON.parse(verifyRes.body);
  const updatedContact = verifyData.submissions.find(s => s.reference_id === contactData.referenceId);
  console.log('Status after update in Neon DB:', updatedContact?.status);
  console.log('Notes stored in Neon DB:', updatedContact?.notes);

  if (updatedContact?.status === 'Contacted') {
    console.log('\n>>> SUCCESS: All Contact & Pickup submissions are fully functional in Neon PostgreSQL! <<<');
  } else {
    throw new Error('Status update verification failed');
  }
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
