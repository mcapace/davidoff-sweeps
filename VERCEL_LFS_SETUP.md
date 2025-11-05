# Vercel Git LFS Setup

## Issue
The video file is tracked in Git LFS but may not be pulling correctly during Vercel builds.

## Solution
You need to configure Vercel to use Git LFS:

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Link your project** (if not already linked):
   ```bash
   vercel link
   ```

3. **Set Git LFS environment variable in Vercel Dashboard:**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add: `GIT_LFS_ENABLED=true`

4. **Or configure in vercel.json:**
   The build process should automatically handle Git LFS if configured correctly.

## Alternative: Check Vercel Build Logs
Check your Vercel deployment logs for errors related to:
- Git LFS not being installed
- Large file upload failures
- Missing video file in build output

## Manual Check
1. After deployment, try accessing the video directly:
   `https://your-domain.vercel.app/images/davacc_humtravl_buss_vdo_1920x1080px.mp4`

2. If you get a 404, the file isn't being included in the deployment
3. If you get the file but it's corrupted, Git LFS might not be pulling correctly

