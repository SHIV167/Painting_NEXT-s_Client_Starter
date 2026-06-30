# Admin Dashboard Setup Guide

This document provides instructions for setting up the admin dashboard for the Painting Gallery website.

## Database Setup

### Step 1: Set DATABASE_URL

Add your PostgreSQL connection string to `.env`:
```
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
```

### Option 1: Using the SQL Script (Recommended for Manual Setup)

1. Create a PostgreSQL database
2. Import the SQL script:
   ```bash
   psql -U your_username -d your_database -f database-setup.sql
   ```

### Option 2: Using Prisma Migrations

1. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

2. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

## Admin Dashboard Features

The admin dashboard is located at `/admin` and includes:

### 1. **Menu Management** (`/admin/menu`)
- Create, edit, delete menu items
- Set menu position (header/footer)
- Control order and active status
- API: `/api/admin/menu`

### 2. **Content Management** (`/admin/content`)
- Edit header/footer content with HTML editor
- Dynamic content keys for different sections
- API: `/api/admin/content`

### 3. **Slider Management** (`/admin/sliders`)
- Create sliders for desktop and mobile
- Set images, titles, subtitles, and links
- Control order and active status
- API: `/api/admin/sliders`

### 4. **Pages Management** (`/admin/pages`)
- Create dynamic pages with custom URLs
- Full HTML editor for page content
- SEO meta tags support
- Pages accessible at `/slug`
- API: `/api/admin/pages`

### 5. **Featured Works** (`/admin/featured`)
- Add featured artwork with images
- Include artist name, year, and descriptions
- Control display order
- API: `/api/admin/featured`

### 6. **About Gallery** (`/admin/about`)
- Edit about section with HTML editor
- Add featured image
- Single record management
- API: `/api/admin/about`

## Public API Endpoints

The following endpoints are available for the frontend to fetch dynamic content:

- `GET /api/public/menu` - Get active menu items
- `GET /api/public/sliders?deviceType=desktop|mobile` - Get active sliders
- `GET /api/public/featured` - Get active featured works
- `GET /api/public/about` - Get about gallery content

## Frontend Integration

To display dynamic content on your frontend:

### Example: Fetch Menu Items
```typescript
const response = await fetch('/api/public/menu')
const menuItems = await response.json()
```

### Example: Fetch Sliders
```typescript
const response = await fetch('/api/public/sliders?deviceType=desktop')
const sliders = await response.json()
```

### Example: Dynamic Pages
Dynamic pages created in the admin are automatically accessible at their slug URL (e.g., `/privacy-policy`).

## Environment Variables

Add these to your `.env` file:

```
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
```

## Authentication (Future Enhancement)

Currently, the admin dashboard does not have authentication. To add authentication:

1. Install NextAuth.js:
   ```bash
   npm install next-auth @auth/prisma-adapter
   ```

2. Create auth configuration in `src/app/api/auth/[...nextauth]/route.ts`

3. Add session check in `src/app/admin/layout.tsx`

## Image Upload

Currently, the system uses image URLs. To add image upload functionality:

1. Integrate with Cloudinary (already installed)
2. Add image upload component to forms
3. Store uploaded image URLs in the database

## Sample Data

The SQL script includes sample data for:
- 8 menu items (5 header, 3 footer)
- 4 sliders (3 desktop, 1 mobile)
- 2 pages (privacy policy, terms)
- 4 featured works
- 1 about gallery entry

## Troubleshooting

### Prisma Client Not Generated
```bash
npx prisma generate
```

### Database Connection Issues
- Verify `DATABASE_URL` is correct in `.env`
- Ensure PostgreSQL is running
- Check database credentials

### TypeScript Errors
- Ensure Prisma Client is generated
- Run `npx prisma generate` after schema changes

## Development

To run the development server:
```bash
npm run dev
```

Access the admin dashboard at: `http://localhost:3000/admin`
