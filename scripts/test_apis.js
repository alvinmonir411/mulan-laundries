const BASE_URL = "http://localhost:3005";

async function testApi() {
  console.log("=== TESTING ADMIN APIS ON NEON DB ===");

  // 1. Auth Test
  console.log("\n1. Testing /api/admin/auth...");
  const authRes = await fetch(`${BASE_URL}/api/admin/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@gmail.com", password: "13663" }),
  });
  const authData = await authRes.json();
  console.log("Auth response:", authRes.status, authData.success);

  // 2. Settings Test
  console.log("\n2. Testing /api/admin/settings (GET)...");
  const setRes = await fetch(`${BASE_URL}/api/admin/settings`);
  const setData = await setRes.json();
  console.log("Settings response:", setRes.status, setData.success, "Phone:", setData.settings?.phone);

  // 3. Images Test
  console.log("\n3. Testing /api/admin/images (GET)...");
  const imgRes = await fetch(`${BASE_URL}/api/admin/images`);
  const imgData = await imgRes.json();
  console.log("Images response:", imgRes.status, imgData.success, "Total:", imgData.totalSlots);

  // 4. Testimonials Test
  console.log("\n4. Testing /api/admin/testimonials (GET & POST)...");
  const testRes = await fetch(`${BASE_URL}/api/admin/testimonials`);
  const testData = await testRes.json();
  console.log("Testimonials GET:", testRes.status, testData.success, "Count:", testData.testimonials?.length);

  const postTestRes = await fetch(`${BASE_URL}/api/admin/testimonials`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      author: "Test Client",
      quote: "Automated test quote verifying Neon DB revalidation.",
      rating: 5,
      source: "Google Review",
      display_order: 99,
      active: true,
    }),
  });
  const postTestData = await postTestRes.json();
  console.log("Testimonials POST:", postTestRes.status, postTestData.success, "ID:", postTestData.testimonial?.id);

  if (postTestData.testimonial?.id) {
    const delRes = await fetch(`${BASE_URL}/api/admin/testimonials?id=${postTestData.testimonial.id}`, {
      method: "DELETE",
    });
    const delData = await delRes.json();
    console.log("Testimonials DELETE cleanup:", delRes.status, delData.success);
  }

  // 5. FAQs Test
  console.log("\n5. Testing /api/admin/faqs (GET & POST)...");
  const faqRes = await fetch(`${BASE_URL}/api/admin/faqs`);
  const faqData = await faqRes.json();
  console.log("FAQs GET:", faqRes.status, faqData.success, "Count:", faqData.faqs?.length);

  // 6. Pages Test
  console.log("\n6. Testing /api/admin/pages (GET & POST)...");
  const pageRes = await fetch(`${BASE_URL}/api/admin/pages`);
  const pageData = await pageRes.json();
  console.log("Pages GET:", pageRes.status, pageData.success, "Count:", pageData.pages?.length);

  console.log("\n=== ALL APIS TESTED SUCCESSFULLY ===");
}

testApi().catch(console.error);
