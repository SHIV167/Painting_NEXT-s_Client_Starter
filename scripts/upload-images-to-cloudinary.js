const v2 = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const https = require('https');

// Load environment variables from .env file
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

// Configure Cloudinary
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// All images to upload
const imagesToUpload = [
  // From data.ts
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  // From page.tsx - category items
  'https://cdn.shopify.com/s/files/1/1194/1498/files/Cropped_Image_1.jpg',
  'https://cdn.shopify.com/s/files/1/1194/1498/files/phad1.png?v=1771499101&width=450&quality=80',
  'https://cdn.shopify.com/s/files/1/1194/1498/files/st-2.png?v=1771411864&width=450&quality=80',
  'https://cdn.shopify.com/s/files/1/1194/1498/files/1-1new.png?v=1771411863&width=450&quality=80',
  // From page.tsx - hero slides
  'https://www.memeraki.com/cdn/shop/files/budget_artworks_desktop.jpg?v=1765877233&width=2600',
  'https://www.memeraki.com/cdn/shop/files/budget_artworks_mobile_2.jpg?v=1765877217&width=768',
  'https://www.memeraki.com/cdn/shop/files/shark_wall-5.png?v=1770962098&width=2600',
  'https://www.memeraki.com/cdn/shop/files/bannerm10.png?v=1780300712&width=768',
  'https://www.memeraki.com/cdn/shop/files/banner10.png?v=1780300730&width=2600',
  'https://www.memeraki.com/cdn/shop/files/tree_of_life_m.jpg?v=1749111765&width=768',
  'https://www.memeraki.com/cdn/shop/files/tree_of_life.jpg?v=1749111765&width=2600',
  'https://www.memeraki.com/cdn/shop/files/pooja_room_banner-mobile_version.png?v=1775040175&width=768',
  'https://www.memeraki.com/cdn/shop/files/gallery_walls_m.jpg?v=1749111765&width=768',
  // From other pages
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1920&q=80',
];

// Function to download image from URL
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      } else {
        reject(new Error(`Failed to download image: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

// Function to upload buffer to Cloudinary
async function uploadToCloudinary(buffer, publicId) {
  return new Promise((resolve, reject) => {
    v2.uploader.upload_stream(
      {
        public_id: publicId,
        folder: 'art-gallery',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });
}

// Generate public ID from URL
function generatePublicId(url) {
  const filename = url.split('/').pop().split('?')[0];
  const cleanName = filename.replace(/[^a-zA-Z0-9-_]/g, '_');
  return cleanName;
}

// Main upload function
async function uploadAllImages() {
  const results = [];
  const urlMapping = {};

  console.log('Starting image upload to Cloudinary...\n');

  for (let i = 0; i < imagesToUpload.length; i++) {
    const url = imagesToUpload[i];
    const publicId = generatePublicId(url);
    
    try {
      console.log(`[${i + 1}/${imagesToUpload.length}] Downloading: ${url}`);
      const buffer = await downloadImage(url);
      
      console.log(`[${i + 1}/${imagesToUpload.length}] Uploading to Cloudinary...`);
      const result = await uploadToCloudinary(buffer, publicId);
      
      console.log(`✓ Uploaded: ${publicId}`);
      console.log(`  Cloudinary URL: ${result.secure_url}`);
      
      results.push({
        originalUrl: url,
        publicId: result.public_id,
        cloudinaryUrl: result.secure_url,
        success: true,
      });
      
      urlMapping[url] = result.secure_url;
    } catch (error) {
      console.error(`✗ Failed: ${url}`);
      console.error(`  Error: ${error.message}`);
      
      results.push({
        originalUrl: url,
        error: error.message,
        success: false,
      });
    }
    
    console.log('');
  }

  // Save results to JSON file
  const outputPath = path.join(__dirname, '../cloudinary-mapping.json');
  fs.writeFileSync(outputPath, JSON.stringify({ results, urlMapping }, null, 2));
  
  console.log('\n=== Upload Complete ===');
  console.log(`Successfully uploaded: ${results.filter(r => r.success).length}/${results.length}`);
  console.log(`Mapping saved to: ${outputPath}`);
  
  return { results, urlMapping };
}

// Run the upload
uploadAllImages().catch(console.error);
