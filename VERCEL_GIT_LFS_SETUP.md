# Vercel Git LFS Setup Instructions

## Problem
The video file is tracked in Git LFS but may not be pulled during Vercel builds, causing 404 errors.

## Solution

### Option 1: Vercel Dashboard Settings (Recommended)
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Git**
3. Ensure Git LFS is enabled
4. Check **Build & Development Settings**
5. Add environment variable: `GIT_LFS_ENABLED=true`

### Option 2: Vercel CLI Configuration
If using Vercel CLI, you may need to configure Git LFS:
```bash
vercel env add GIT_LFS_ENABLED production
# Set value to: true
```

### Option 3: Manual Check
After deployment:
1. Check if the video file is accessible: `https://your-domain.vercel.app/images/davacc_humtravl_buss_vdo_1920x1080px.mp4`
2. If 404, the file isn't in the deployment
3. Check Vercel build logs for Git LFS errors

### Current Configuration
- `package.json` has `postinstall` script to pull LFS files
- `.gitattributes` tracks `.mp4` files with LFS
- Video file is confirmed in Git LFS

### Alternative: Host Video Externally
If Git LFS continues to cause issues, consider:
- Uploading video to a CDN (Cloudflare, AWS S3, etc.)
- Using a video hosting service (Vimeo, Cloudinary)
- Updating the video `src` to point to the external URL

