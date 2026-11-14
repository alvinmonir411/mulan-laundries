const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "dgaiqqh7k",
  api_key: "673182877555238",
  api_secret: "Lt98TBmqTdi3RGHIEr6xGv9KPxU",
  secure: true,
});

async function test() {
  console.log("Connecting to Cloudinary...");
  try {
    const res = await cloudinary.api.ping();
    console.log("Cloudinary Connection Successful! Ping result:", res);
  } catch (err) {
    console.error("Cloudinary connection failed:", err);
  }
}

test();
