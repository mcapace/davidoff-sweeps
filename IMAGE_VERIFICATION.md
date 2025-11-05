# Image and Video Path Verification

## Current Status

### ✅ Files in Git:
- Hero video: `public/images/davacc_humtravl_buss_vdo_1920x1080px.mp4` (in Git LFS)
- Ashtray image: `public/images/davacc_ashprcl_clas_mood_002.jpg`
- Glass image: `public/images/wscacc_sgls_mood_001.jpg`

### ✅ Code References:
- Hero video path: `/images/davacc_humtravl_buss_vdo_1920x1080px.mp4` ✓
- Ashtray image path: `/images/davacc_ashprcl_clas_mood_002.jpg` ✓
- Glass image path: `/images/wscacc_sgls_mood_001.jpg` ✓

### ⚠️ Logo Issue:
- Current code uses: `/images/logos/davidoff-logo.png`
- White logo file: `dav_tbf_logo_luxgld_white_cmyk.ai` (needs conversion to PNG/JPG)
- Temporary solution: Could use `dav_tbf_logo_gld_blck_cmyk-removebg-preview.png` but it's not the white version

## Troubleshooting Steps

1. **Clear browser cache** - Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
2. **Restart dev server** - Stop and restart `npm run dev`
3. **Check Vercel deployment** - Images should be available after deployment
4. **Verify file paths** - All paths are correct in code

## Next Steps

1. Convert `.ai` logo file to PNG with white "Time Beautifully Filled" text
2. Save as `/public/images/logos/davidoff-logo-white.png`
3. Update Hero component to use white logo path

