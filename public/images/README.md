# Images Directory

This directory is for storing all images used in the Davidoff Sweepstakes campaign.

## Recommended Structure

```
images/
├── hero/
│   └── hero-image.jpg (or .png)
├── logos/
│   └── davidoff-logo.png
├── giveaway/
│   └── prize-package.jpg
└── [any other images you need]
```

## Image Guidelines

- **Hero Images**: Recommended size 1920x1080px or larger (landscape orientation)
- **Logos**: Use PNG format with transparent backgrounds when possible
- **Prize Images**: Square format (1000x1000px minimum) recommended for best display
- **File Formats**: Use .jpg for photos, .png for logos and graphics with transparency

## Usage in Components

Images in this folder can be referenced using Next.js Image component:

```tsx
import Image from 'next/image';

<Image
  src="/images/hero/hero-image.jpg"
  alt="Description"
  width={1920}
  height={1080}
/>
```

Or in the public folder directly:

```tsx
src="/images/your-image.jpg"
```

