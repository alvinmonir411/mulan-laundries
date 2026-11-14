const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "dgaiqqh7k",
  api_key: "673182877555238",
  api_secret: "Lt98TBmqTdi3RGHIEr6xGv9KPxU",
  secure: true,
});

async function debugUpload() {
  try {
    const res = await cloudinary.uploader.upload("public/images/washfold.jpg", {
      folder: "test",
    });
    console.log("Upload Success:", res);
  } catch (err) {
    console.error("Cloudinary Upload Error Details:", JSON.stringify(err, null, 2));
    console.error("Message:", err.message);
    console.error("HTTP Code:", err.http_code);
  }
}

debugUpload();
