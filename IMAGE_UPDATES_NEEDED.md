# Image Updates Required

## Winston Churchill Spirit Glass Set
**Current Image:** `/images/wscacc_sgls_mood_001.jpg`

**Client Request:**
- Remove background from the image
- Show two glasses: one standing, one showing the silhouette visible
- Display on transparent or white background

**Action Required:**
1. Image processing needed to remove background
2. Ensure both glasses are visible (one standing, one with silhouette)
3. Save as PNG with transparent background or JPG with white background
4. Update path in `PrizesSection.tsx` if file name changes

## Cigar Case Iconic XL-2
**Current Images:**
- `/images/giveaway/51003711_davacc_cigcaslther_x2_ico_blue_001-1.jpg`
- `/images/giveaway/51003711_davacc_cigcaslther_x2_ico_blue_002-1.jpg`

**Client Request:**
- Show on white background
- If zoomed out makes case look too small, consider showing opened case
- Or show both opened and closed views
- Fix color/texture issue (currently looks glittery/different from original)

**Action Required:**
1. Process images to have white background
2. Consider creating opened case view if needed
3. Ensure accurate color representation
4. Update image paths in `PrizesSection.tsx` (lines 78-85)

## Notes
- All product images should be optimized for web
- Maintain aspect ratios
- Ensure images are high quality but web-optimized
- Check image dimensions match other prize images for consistency

