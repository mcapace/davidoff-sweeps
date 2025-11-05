# Video Troubleshooting Guide

## Current Issue
The hero video (`davacc_humtravl_buss_vdo_1920x1080px.mp4`) is not displaying on the deployed site.

## Root Cause Analysis
1. **File Status**: ✅ Video file exists locally (54MB)
2. **Git LFS**: ✅ File is tracked in Git LFS
3. **Vercel Build**: ❌ Build logs show NO Git LFS activity
4. **Likely Issue**: Vercel is not pulling Git LFS files during build

## Debugging Steps

### 1. Check Browser Console
After deployment, open browser console and look for:
- `VIDEO: Load started`
- `VIDEO: Metadata loaded`
- `VIDEO ERROR:` (if file not found)

### 2. Test Video URL Directly
Try accessing the video directly:
```
https://your-domain.vercel.app/images/davacc_humtravl_buss_vdo_1920x1080px.mp4
```

**Expected Results:**
- ✅ **200 OK**: File exists, issue is in video element code
- ❌ **404 Not Found**: File not in deployment (Git LFS issue)

### 3. Check Vercel Build Logs
Look for:
- `git lfs pull` command execution
- Any Git LFS errors
- File size of deployed static assets

## Solutions

### Solution 1: Enable Git LFS in Vercel (Recommended)
1. Go to Vercel Dashboard → Project Settings
2. Navigate to **Git** settings
3. Enable **Git LFS** support
4. Or add environment variable: `GIT_LFS_ENABLED=true`

### Solution 2: Host Video Externally
If Git LFS continues to fail:
1. Upload video to:
   - AWS S3 + CloudFront
   - Cloudflare R2
   - Vercel Blob Storage
   - Cloudinary
2. Update `Hero.tsx` video `src` to external URL
3. This is more reliable for large files

### Solution 3: Use Smaller Video File
1. Compress the video to < 10MB
2. Commit directly to Git (not LFS)
3. This avoids Git LFS entirely

### Solution 4: Fallback to Static Image
As temporary solution:
1. Extract a frame from the video as fallback image
2. Show image if video fails to load
3. Update Hero component to use `poster` attribute

## Current Configuration
- Video file: `public/images/davacc_humtravl_buss_vdo_1920x1080px.mp4` (54MB)
- Git LFS tracked: Yes
- Fallback video: `public/images/AdobeStock_320845376.mp4` (7.5MB)
- Video element: Has comprehensive error handling and logging

## Next Steps
1. Check browser console for video errors
2. Test direct video URL access
3. If 404, configure Git LFS in Vercel or host externally
4. If video loads but doesn't play, check video element code

