-- Painting Gallery Database Setup Script
-- PostgreSQL Database Schema

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS "AboutGallery" CASCADE;
DROP TABLE IF EXISTS "FeaturedWork" CASCADE;
DROP TABLE IF EXISTS "Page" CASCADE;
DROP TABLE IF EXISTS "Slider" CASCADE;
DROP TABLE IF EXISTS "Content" CASCADE;
DROP TABLE IF EXISTS "MenuItem" CASCADE;

-- Create MenuItem table for Header/Footer Menu Management
CREATE TABLE "MenuItem" (
    "id" SERIAL PRIMARY KEY,
    "label" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "order" INTEGER NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "position" VARCHAR(50) NOT NULL, -- 'header' or 'footer'
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Content table for Header/Footer content management
CREATE TABLE "Content" (
    "id" SERIAL PRIMARY KEY,
    "key" VARCHAR(255) UNIQUE NOT NULL, -- 'header_content', 'footer_content', etc.
    "html" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Slider table for Slider Management (desktop and mobile)
CREATE TABLE "Slider" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "subtitle" VARCHAR(500),
    "imageUrl" VARCHAR(500) NOT NULL,
    "mobileUrl" VARCHAR(500),
    "linkUrl" VARCHAR(500),
    "order" INTEGER NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "deviceType" VARCHAR(50) NOT NULL, -- 'desktop' or 'mobile'
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Page table for Dynamic Pages Management
CREATE TABLE "Page" (
    "id" SERIAL PRIMARY KEY,
    "slug" VARCHAR(255) UNIQUE NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "metaTitle" VARCHAR(255),
    "metaDesc" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create FeaturedWork table for Featured Works Management
CREATE TABLE "FeaturedWork" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "imageUrl" VARCHAR(500) NOT NULL,
    "artistName" VARCHAR(255),
    "year" INTEGER,
    "order" INTEGER NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create AboutGallery table for About Our Gallery Management
CREATE TABLE "AboutGallery" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" VARCHAR(500),
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX "MenuItem_position_order_idx" ON "MenuItem"("position", "order");
CREATE INDEX "MenuItem_isActive_idx" ON "MenuItem"("isActive");
CREATE INDEX "Slider_deviceType_order_idx" ON "Slider"("deviceType", "order");
CREATE INDEX "Slider_isActive_idx" ON "Slider"("isActive");
CREATE INDEX "Page_slug_idx" ON "Page"("slug");
CREATE INDEX "Page_isActive_idx" ON "Page"("isActive");
CREATE INDEX "FeaturedWork_order_idx" ON "FeaturedWork"("order");
CREATE INDEX "FeaturedWork_isActive_idx" ON "FeaturedWork"("isActive");
CREATE INDEX "AboutGallery_isActive_idx" ON "AboutGallery"("isActive");

-- Create function to auto-update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for auto-updating updatedAt
CREATE TRIGGER update_menuitem_updated_at BEFORE UPDATE ON "MenuItem"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON "Content"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_slider_updated_at BEFORE UPDATE ON "Slider"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_page_updated_at BEFORE UPDATE ON "Page"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_featuredwork_updated_at BEFORE UPDATE ON "FeaturedWork"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_aboutgallery_updated_at BEFORE UPDATE ON "AboutGallery"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data

-- Sample Menu Items
INSERT INTO "MenuItem" ("label", "url", "order", "isActive", "position") VALUES
('Home', '/', 1, true, 'header'),
('Gallery', '/gallery', 2, true, 'header'),
('Exhibitions', '/exhibitions', 3, true, 'header'),
('About', '/about', 4, true, 'header'),
('Contact', '/contact', 5, true, 'header'),
('Privacy Policy', '/privacy', 1, true, 'footer'),
('Terms of Service', '/terms', 2, true, 'footer'),
('Contact Us', '/contact', 3, true, 'footer');

-- Sample Content
INSERT INTO "Content" ("key", "html") VALUES
('header_content', '<div class="header-contact">Email: info@paintinggallery.com | Phone: +1 234 567 890</div>'),
('footer_content', '<p>&copy; 2024 Painting Gallery. All rights reserved.</p><p>123 Art Street, Creative City, AC 12345</p>');

-- Sample Sliders
INSERT INTO "Slider" ("title", "subtitle", "imageUrl", "mobileUrl", "linkUrl", "order", "isActive", "deviceType") VALUES
('Welcome to Our Gallery', 'Discover extraordinary art collections', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1920', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', '/gallery', 1, true, 'desktop'),
('Contemporary Art', 'Explore modern masterpieces', 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=1920', 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800', '/gallery', 2, true, 'desktop'),
('Classic Collection', 'Timeless beauty in every stroke', 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1920', 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800', '/gallery', 3, true, 'desktop'),
('Mobile Welcome', 'Art on the go', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', null, '/gallery', 1, true, 'mobile');

-- Sample Pages
INSERT INTO "Page" ("slug", "title", "content", "metaTitle", "metaDesc", "isActive") VALUES
('privacy-policy', 'Privacy Policy', '<h1>Privacy Policy</h1><p>This is our privacy policy content...</p>', 'Privacy Policy - Painting Gallery', 'Read our privacy policy to understand how we protect your data.', true),
('terms-of-service', 'Terms of Service', '<h1>Terms of Service</h1><p>These are our terms of service...</p>', 'Terms of Service - Painting Gallery', 'Read our terms of service to understand your rights and obligations.', true);

-- Sample Featured Works
INSERT INTO "FeaturedWork" ("title", "description", "imageUrl", "artistName", "year", "order", "isActive") VALUES
('Sunset Dreams', 'A beautiful representation of a sunset over the mountains', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600', 'Jane Artist', 2023, 1, true),
('Ocean Serenity', 'Peaceful ocean waves captured in oil paint', 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600', 'John Painter', 2022, 2, true),
('Forest Whispers', 'An abstract interpretation of a mystical forest', 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=600', 'Sarah Creator', 2024, 3, true),
('City Lights', 'Urban landscape at night with vibrant colors', 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600', 'Mike Urban', 2023, 4, true);

-- Sample About Gallery
INSERT INTO "AboutGallery" ("title", "content", "imageUrl", "isActive") VALUES
('About Our Gallery', '<h2>Welcome to Painting Gallery</h2><p>Founded in 2010, our gallery has been a beacon for art lovers and collectors alike. We showcase works from both established and emerging artists, providing a platform for creative expression and cultural exchange.</p><p>Our mission is to make art accessible to everyone, fostering appreciation and understanding of visual arts through exhibitions, educational programs, and community events.</p><h3>Our Vision</h3><p>We envision a world where art transcends boundaries and brings people together. Through our carefully curated collections, we aim to inspire, educate, and connect communities through the universal language of art.</p>', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200', true);

-- Grant necessary permissions (adjust user as needed)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_database_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_database_user;

COMMIT;
