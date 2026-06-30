-- Insert sample menu items for header
INSERT INTO "MenuItem" ("label", "url", "order", "isActive", "position", "createdAt", "updatedAt") VALUES
('Home', '/', 1, true, 'header', NOW(), NOW()),
('Gallery', '/gallery', 2, true, 'header', NOW(), NOW()),
('Artists', '/artists', 3, true, 'header', NOW(), NOW()),
('Exhibitions', '/exhibitions', 4, true, 'header', NOW(), NOW()),
('Contact', '/contact', 5, true, 'header', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert sample menu items for footer
INSERT INTO "MenuItem" ("label", "url", "order", "isActive", "position", "createdAt", "updatedAt") VALUES
('About Us', '/about', 1, true, 'footer', NOW(), NOW()),
('Privacy Policy', '/privacy', 2, true, 'footer', NOW(), NOW()),
('Terms of Service', '/terms', 3, true, 'footer', NOW(), NOW()),
('FAQ', '/faq', 4, true, 'footer', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert sample desktop sliders
INSERT INTO "Slider" ("title", "subtitle", "imageUrl", "mobileUrl", "linkUrl", "order", "isActive", "deviceType", "createdAt", "updatedAt") VALUES
('Welcome to Our Gallery', 'Discover extraordinary art collections from renowned artists', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1920&h=800&fit=crop', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1200&fit=crop', '/gallery', 1, true, 'desktop', NOW(), NOW()),
('Contemporary Art Exhibition', 'Experience the beauty of modern artistic expressions', 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1920&h=800&fit=crop', 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=1200&fit=crop', '/exhibitions', 2, true, 'desktop', NOW(), NOW()),
('Featured Artists', 'Meet the talented artists behind our masterpieces', 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1920&h=800&fit=crop', 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=1200&fit=crop', '/artists', 3, true, 'desktop', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert sample mobile sliders
INSERT INTO "Slider" ("title", "subtitle", "imageUrl", "mobileUrl", "linkUrl", "order", "isActive", "deviceType", "createdAt", "updatedAt") VALUES
('Art on the Go', 'Explore our collection anywhere', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1200&fit=crop', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1200&fit=crop', '/gallery', 1, true, 'mobile', NOW(), NOW()),
('Mobile Gallery', 'Beautiful art at your fingertips', 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=1200&fit=crop', 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=1200&fit=crop', '/exhibitions', 2, true, 'mobile', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert sample featured works
INSERT INTO "FeaturedWork" ("title", "description", "imageUrl", "artistName", "year", "order", "isActive", "createdAt", "updatedAt") VALUES
('Sunset Dreams', 'A stunning representation of nature''s beauty at dusk', 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&h=600&fit=crop', 'John Smith', 2023, 1, true, NOW(), NOW()),
('Urban Symphony', 'An abstract interpretation of city life', 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=600&fit=crop', 'Sarah Johnson', 2024, 2, true, NOW(), NOW()),
('Ocean Whispers', 'Peaceful waves captured in oil on canvas', 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=600&h=600&fit=crop', 'Michael Brown', 2022, 3, true, NOW(), NOW()),
('Mountain Majesty', 'Grand mountain landscapes in watercolor', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop', 'Emily Davis', 2023, 4, true, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert sample page
INSERT INTO "Page" ("title", "slug", "content", "isActive", "createdAt", "updatedAt") VALUES
('About Our Gallery', 'about', '<h1>About Our Gallery</h1><p>Welcome to our prestigious art gallery, where creativity meets excellence. Founded in 2010, we have been dedicated to showcasing the finest contemporary and classical art from around the world.</p><h2>Our Mission</h2><p>To inspire and educate through the power of visual arts, creating meaningful connections between artists and art enthusiasts.</p>', true, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert sample about gallery content
INSERT INTO "AboutGallery" ("title", "content", "imageUrl", "isActive", "createdAt", "updatedAt") VALUES
('About Our Gallery', '<p>Welcome to our prestigious art gallery, where creativity meets excellence. Founded in 2010, we have been dedicated to showcasing the finest contemporary and classical art from around the world.</p><p>Our collection features over 5000 artworks spanning various periods and styles, from Renaissance masterpieces to cutting-edge contemporary installations.</p><h2>Our Mission</h2><p>To inspire and educate through the power of visual arts, creating meaningful connections between artists and art enthusiasts.</p>', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1920&h=600&fit=crop', true, NOW(), NOW())
ON CONFLICT DO NOTHING;
