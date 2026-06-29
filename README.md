# Painting Gallery - Next.js Application

A modern, responsive art gallery website built with Next.js 16.2.9, featuring a beautiful UI with smooth animations, image gallery, contact form with email integration, and image upload capabilities.

![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)

## Features

- 🎨 **Modern UI Design** - Beautiful gradient styling with dark mode support
- 📱 **Fully Responsive** - Mobile-first design with hamburger menu and left slide navigation
- 🖼️ **Image Gallery** - LightGallery integration with lightbox functionality
- 📧 **Contact Form** - SMTP/Resend email integration for form submissions
- ☁️ **Cloudinary Integration** - Image upload and management
- 🔄 **Smooth Animations** - Framer Motion for stunning animations
- 🎯 **Scroll-to-Top** - Floating button that appears on scroll
- 🗺️ **Google Maps** - Integrated location map
- 📰 **Newsletter** - Email subscription functionality

## Tech Stack

- **Framework**: Next.js 16.2.9 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Image Gallery**: LightGallery
- **Smooth Scroll**: Lenis
- **Icons**: React Icons
- **Email**: Nodemailer + Resend
- **Image Upload**: Cloudinary
- **Slider**: Swiper

## Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

## Installation

1. Clone the repository:
```bash
git clone https://github.com/SHIV167/Painting_NEXT-s_Client_Starter.git
cd Painting_NEXT-s_Client_Starter
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables (see below)

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_ENABLED=true
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# Site Configuration
NEXT_PUBLIC_SITE_NAME=Painting Gallery
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# SMTP Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here
SMTP_FROM="Your Name <your_email@gmail.com>"
SUPPORT_EMAIL=your_email@gmail.com

# Resend API (Fallback for email)
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM=Your Name <your_email@domain.com>

# SMS Configuration (Twilio - Optional)
smsEnabled=true
smsProvider=twilio
smsApiKey=your_twilio_account_sid
smsApiSecret=your_twilio_auth_token
smsSenderPhone=+1234567890
```

### Getting Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Search for "App Passwords"
4. Create a new app password for "Next.js App"
5. Use the generated password in `SMTP_PASS`

### Getting Cloudinary Credentials

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Go to Dashboard → Settings
3. Copy your Cloud Name, API Key, and API Secret

### Getting Resend API Key

1. Sign up at [Resend](https://resend.com)
2. Go to API Keys section
3. Create a new API key

## Project Structure

```
painting-nextjs/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/          # Contact form API
│   │   │   └── upload/           # Image upload API
│   │   ├── contact/              # Contact page
│   │   ├── exhibitions/          # Exhibitions page
│   │   ├── gallery/              # Gallery page
│   │   ├── about/                # About page
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   ├── components/
│   │   ├── Header.tsx            # Header with navigation
│   │   ├── Footer.tsx            # Footer component
│   │   ├── ScrollToTop.tsx       # Scroll to top button
│   │   ├── ImageUpload.tsx       # Image upload component
│   │   └── SmoothScroll.tsx      # Smooth scroll wrapper
│   ├── lib/
│   │   ├── cloudinary.ts         # Cloudinary utilities
│   │   ├── email.ts              # Email service
│   │   └── data.ts               # Sample data
│   └── globals.css              # Global styles
├── public/
│   └── logo.png                  # Logo image
├── .env.example                  # Environment variables template
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints

### POST /api/contact
Send contact form email via SMTP/Resend.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Your message here"
}
```

### POST /api/upload
Upload image to Cloudinary.

**Request:** FormData with `file` field.

**Response:**
```json
{
  "url": "https://res.cloudinary.com/...",
  "publicId": "art-gallery/...",
  "width": 800,
  "height": 600
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Build the project:
```bash
npm run build
```

Start production server:
```bash
npm run start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Contact

For support, email support@shivjhawebtech.online or visit our website at shivjhawebtech.online

---

Built with ❤️ using Next.js
