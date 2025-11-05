# Adding Your Product Images

## Current Status
The components are now configured to display .tif files! However, we need to know where your images are located.

## Where to Place Images

### Option 1: Organize in subfolders (Recommended)
Move your .tif product images to:
```
public/images/giveaway/
├── prize-1.tif  (or any name - see below)
├── prize-2.tif
├── prize-3.tif
├── prize-4.tif
└── prize-5.tif
```

### Option 2: Direct in public folder
If your .tif files are directly in `/public/`, the component will automatically try to find them.

## What the Component Will Try

The component automatically tries multiple filename patterns for each prize:

**1st Prize (Humidor):**
- `/images/giveaway/prize-1.tif`
- `/images/giveaway/prize-1.jpg`
- `/images/giveaway/humidor.tif`
- `/images/giveaway/ambassador-humidor.tif`

**2nd Prize (Travel Humidor):**
- `/images/giveaway/prize-2.tif`
- `/images/giveaway/travel-humidor.tif`
- `/images/giveaway/travel-humidor-business.tif`

**3rd Prize (Ashtray):**
- `/images/giveaway/prize-3.tif`
- `/images/giveaway/ashtray.tif`
- `/images/giveaway/davidoff-ashtray.tif`

**4th Prize (Glass Set):**
- `/images/giveaway/prize-4.tif`
- `/images/giveaway/glass-set.tif`
- `/images/giveaway/churchill-glass.tif`
- `/images/giveaway/winston-churchill-glass.tif`

**5th Prize (Cigar Case):**
- `/images/giveaway/prize-5.tif`
- `/images/giveaway/cigar-case.tif`
- `/images/giveaway/iconic-xl-2.tif`
- `/images/giveaway/cigar-case-iconic.tif`

## Quick Fix

If you have .tif files with different names, you can either:
1. Rename them to match the patterns above, OR
2. Tell me the exact filenames and I'll update the code to use them

## Testing

After adding images:
1. Restart your dev server: `npm run dev`
2. Refresh the page
3. Images should appear automatically

If images still don't show, check the browser console for any error messages.

