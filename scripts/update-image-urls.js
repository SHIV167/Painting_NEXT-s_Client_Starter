const fs = require('fs');
const path = require('path');

// Read the mapping file
const mappingPath = path.join(__dirname, '../cloudinary-mapping.json');

if (!fs.existsSync(mappingPath)) {
  console.error('cloudinary-mapping.json not found. Please run upload-images first.');
  process.exit(1);
}

const { urlMapping } = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// Files to update
const filesToUpdate = [
  {
    path: path.join(__dirname, '../src/app/page.tsx'),
    replacements: urlMapping,
  },
  {
    path: path.join(__dirname, '../src/lib/data.ts'),
    replacements: urlMapping,
  },
  {
    path: path.join(__dirname, '../src/app/gallery/page.tsx'),
    replacements: urlMapping,
  },
  {
    path: path.join(__dirname, '../src/app/exhibitions/page.tsx'),
    replacements: urlMapping,
  },
  {
    path: path.join(__dirname, '../src/app/contact/page.tsx'),
    replacements: urlMapping,
  },
];

// Function to update file content
function updateFileContent(content, replacements) {
  let updatedContent = content;
  
  for (const [oldUrl, newUrl] of Object.entries(replacements)) {
    // Escape special regex characters in the URL
    const escapedOldUrl = oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedOldUrl, 'g');
    updatedContent = updatedContent.replace(regex, newUrl);
  }
  
  return updatedContent;
}

// Update each file
console.log('Updating image URLs in files...\n');

filesToUpdate.forEach(({ path: filePath, replacements }) => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠ File not found: ${filePath}`);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = updateFileContent(content, replacements);
  
  // Check if any changes were made
  if (content === updatedContent) {
    console.log(`- No changes needed: ${filePath}`);
  } else {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`✓ Updated: ${filePath}`);
  }
});

console.log('\n=== Update Complete ===');
console.log('Image URLs have been updated to use Cloudinary.');
console.log('Please review the changes and restart your dev server.');
