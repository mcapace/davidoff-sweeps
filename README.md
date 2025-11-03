# Davidoff Sweepstakes

A beautiful, responsive sweepstakes landing page built with Next.js 15, featuring email verification and Supabase integration.

## 🎨 Project Overview

This Next.js 15 application features:
- Full-screen hero section with elegant typography
- Sweepstakes entry form with validation
- Email verification flow
- Responsive design optimized for all devices
- Smooth animations using Framer Motion
- Supabase backend integration

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for database)
- Resend account (for email sending)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   RESEND_API_KEY=your_resend_api_key
   EMAIL_FROM=Davidoff <noreply@yourdomain.com>
   EMAIL_REPLY_TO=info@davidoff.com
   JWT_SECRET=your_jwt_secret_key
   TEST_EMAIL=your_test_email@example.com
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Run the SQL schema from `supabase-sweepstakes-schema.sql` in your Supabase SQL editor

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:4000`

## 📁 Project Structure

```
davidoff-sweeps/
├── app/
│   ├── api/
│   │   ├── sweepstakes-entry/    # Entry submission endpoint
│   │   └── verify-email/         # Email verification endpoint
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                 # Main page
│   ├── globals.css               # Global styles
│   ├── verification-success/    # Success page
│   ├── verification-failed/      # Failure page
│   └── official-rules/           # Rules page
├── components/
│   ├── Hero.tsx                 # Hero section
│   ├── SweepstakesSection.tsx   # Entry form
│   ├── Navbar.tsx               # Navigation
│   └── Footer.tsx                # Footer
└── lib/
    ├── supabase.ts              # Supabase client
    ├── sweepstakes-entries.ts    # Entry management
    ├── email-verification.ts     # Email verification
    ├── email-templates.tsx       # Email templates
    └── resend.ts                # Email service
```

## 🎯 Features

### 1. Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Optimized typography scaling

### 2. Animations
- Framer Motion for smooth scroll-triggered animations
- Hover effects on cards and buttons
- Staggered entrance animations

### 3. Email Verification
- Secure JWT-based verification tokens
- 24-hour expiration
- Automatic confirmation emails

### 4. Form Validation
- Client-side validation with Zod
- Server-side validation
- Age verification (21+)
- Duplicate entry prevention

## 🔧 Customization

### Updating Colors
Modify colors in `app/globals.css`:

```css
:root {
  --davidoff-black: #1a1a1a;
  --gold: #d4af37;
  /* Add your custom colors */
}
```

### Updating Content
- Edit `components/Hero.tsx` for hero section content
- Edit `components/SweepstakesSection.tsx` for form and prize details
- Update metadata in `app/layout.tsx`

## 📦 Dependencies

- **Next.js 15** - React framework
- **React 19** - UI library
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **TypeScript** - Type safety
- **Supabase** - Database backend
- **Resend** - Email service
- **Zod** - Validation

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Vercel will auto-detect Next.js and deploy

### Build for Production

```bash
npm run build
npm start
```

## 📝 Notes

- The project uses port 4000 for development
- Email verification links expire in 24 hours
- All form data is validated both client and server-side
- Supabase is used for persistent storage

## 📄 License

© 2025 Davidoff. All rights reserved.

