# Davidoff Sweepstakes - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=Davidoff <noreply@yourdomain.com>
EMAIL_REPLY_TO=info@davidoff.com

# JWT Secret (generate a strong random string)
JWT_SECRET=your_secure_random_jwt_secret_key

# Test Email (optional - for testing submissions)
TEST_EMAIL=your_test_email@example.com
```

### 3. Set Up Supabase Database

1. Go to [Supabase](https://supabase.com) and create a new project
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-sweepstakes-schema.sql`
4. Run the SQL script to create the required tables

### 4. Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:4000`

## Git Repository Setup

### Initial Commit

```bash
git add .
git commit -m "Initial commit: Davidoff Accessories Sweepstakes"
```

### Create GitHub Repository

1. Go to GitHub and create a new repository
2. Don't initialize with README (we already have one)
3. Copy the repository URL
4. Add remote and push:

```bash
git remote add origin https://github.com/yourusername/davidoff-sweeps.git
git branch -M main
git push -u origin main
```

## Vercel Deployment

### Option 1: Deploy via Vercel Dashboard

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

5. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `EMAIL_REPLY_TO`
   - `JWT_SECRET`
   - `TEST_EMAIL` (optional)

6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts to link to your project
```

## Updating Terms & Conditions

Before launching, update `app/official-rules/page.tsx` with:
- Actual start and end dates
- Drawing date
- Prize ARV (Approximate Retail Values)
- Sponsor contact address
- Any other specific legal requirements

## Image Assets

Add your images to:
- `/public/images/hero/` - Hero section images
- `/public/images/logos/` - Logo files
- `/public/images/giveaway/` - Prize images (optional)

## Testing Checklist

- [ ] Form submission works
- [ ] Email verification flow works
- [ ] Supabase entries are being saved
- [ ] All links work correctly
- [ ] Mobile responsive design works
- [ ] Terms & Conditions page is complete
- [ ] All environment variables are set

## Support

For issues or questions, contact the development team.

