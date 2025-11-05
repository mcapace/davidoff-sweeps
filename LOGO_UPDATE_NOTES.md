# Logo Update Notes

## White Logo with "Time Beautifully Filled" Text

The client has provided a white version of the Davidoff logo with "Time Beautifully Filled" text:
- File location: `/public/images/dav_tbf_logo_luxgld_white_cmyk.ai`

**Action Required:**
1. The `.ai` (Adobe Illustrator) file needs to be converted to a web-compatible format (PNG or JPG)
2. Recommended format: PNG with transparent background (for dark hero background)
3. Recommended size: Similar dimensions to current logo (360x108px or proportional)
4. Once converted, save as: `/public/images/logos/davidoff-logo-white.png`

**Usage:**
- The Hero component (`components/Hero.tsx`) currently uses `/images/logos/davidoff-logo.png`
- Update to use the white logo version for better visibility on dark background
- The logo path is on line 79 of `Hero.tsx`

**Note:** The current implementation will fall back to text if the logo fails to load, but we should ensure the white logo is properly converted and added to the repository.

