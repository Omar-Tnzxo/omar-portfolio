# Software Arsenal - Quick Start Guide

## 🚀 Getting Started

The Software Arsenal has been fully implemented and integrated into your portfolio. Here's how to get it running:

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### 3. Navigate to Software Arsenal

You can access the Software Arsenal in three ways:

1. **Homepage Section**: Scroll down to the "My Software Arsenal" section
2. **Navbar**: Click "Software" in the navigation menu
3. **Direct URL**: Visit `/software`

---

## 🗂️ Folder Structure Explained

```
Software Arsenal (/software)
├── Tools (/software/tools)
│   ├── LinkedIn Automation Chrome Extension
│   ├── Data Scraper Pro
│   ├── Code Snippet Manager
│   └── DevOps CLI Helper
├── Programs (/software/programs)
│   ├── Marketing Automation Suite
│   ├── Real Estate CRM System
│   └── Content Management Platform
└── Apps (/software/apps)
    ├── CalcRealty
    ├── Social Media Dashboard
    └── Lead Generation Tracker
```

---

## ✏️ How to Add New Software

### Step 1: Add Your Software Item

Edit `src/constants/software.ts` and add a new item to the `SOFTWARE_ITEMS` array:

```typescript
{
  id: "my-new-tool",
  image: "/software/my-tool.svg",  // Add your image to public/software/
  title: "My Awesome Tool",
  description: "A brief one-sentence description of what it does.",
  type: "Browser Extension",  // Or "Python Script", "Mobile App", etc.
  priceModel: "Free",  // "Free", "Paid", or "Both"
  category: "tools",  // "tools", "programs", or "apps"
  link: "https://example.com",  // Optional external link
},
```

### Step 2: Add Software Image

Place your image (preferably SVG or WebP) in:
```
public/software/my-tool.svg
```

Or use the placeholder generator:
```bash
node generate-software-placeholders.cjs
```

---

## 🎨 Customizing Categories

### Change Category Colors

Edit `src/constants/software.ts`:

```typescript
export const SOFTWARE_CATEGORIES: SoftwareCategory[] = [
  {
    id: "tools",
    name: "Tools",
    slug: "tools",
    color: "#915EFF",  // Change this color
    description: "Your custom description",
  },
  // ...
];
```

### Add a New Category

1. Add to `SOFTWARE_CATEGORIES`:
```typescript
{
  id: "plugins",
  name: "Plugins",
  slug: "plugins",
  color: "#FFD700",
  description: "Custom plugins and extensions",
}
```

2. Update TypeScript type in `src/types/software.ts`:
```typescript
category: "tools" | "programs" | "apps" | "plugins";
```

3. Add items with `category: "plugins"`

---

## 🎭 Customizing Price Model Badges

Edit `src/components/SoftwareCard.tsx`:

```typescript
const priceModelColors = {
  Free: "bg-green-500/20 text-green-400 border-green-500/30",
  Paid: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Both: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  // Add more price models here
};
```

---

## 📱 Responsive Breakpoints

The grid automatically adjusts:
- **Mobile** (< 768px): 1 column
- **Tablet** (768px - 1024px): 2 columns
- **Desktop** (> 1024px): 3 columns

To customize, edit the grid classes in:
- `SoftwareHub.tsx`: `grid-cols-1 md:grid-cols-3`
- `CategoryDetail.tsx`: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- `SoftwarePreview.tsx`: `grid-cols-1 md:grid-cols-3`

---

## 🔧 Troubleshooting

### Build Issues

If you encounter build errors:

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear cache
npm cache clean --force

# Rebuild
npm run build
```

### Images Not Loading

1. Ensure images are in `public/software/`
2. Check image paths start with `/software/` (not `./software/`)
3. Verify image files exist and have correct names

### TypeScript Errors

Run type check:
```bash
npx tsc --noEmit
```

---

## 🎯 Best Practices

### Image Optimization
- Use WebP format for photos
- Use SVG for logos and icons
- Keep images under 200KB
- Use 16:9 or 4:3 aspect ratio

### Content Guidelines
- **Title**: Keep under 50 characters
- **Description**: One sentence, under 100 characters
- **Type**: Be specific (e.g., "Chrome Extension" not just "Tool")

### Adding External Links
```typescript
link: "https://github.com/username/repo",  // GitHub
link: "https://play.google.com/...",       // Play Store
link: "https://your-website.com",          // Website
link: "#",                                  // Placeholder
```

---

## 🚀 Deployment

The Software Arsenal is fully integrated and will deploy with your portfolio:

```bash
# Build for production
npm run build

# Preview build
npm run preview

# Deploy to Netlify (automatic from README)
```

---

## 📊 Analytics (Optional)

To track clicks on software items, add analytics to `SoftwareCard.tsx`:

```typescript
onClick={() => {
  // Track with your analytics provider
  analytics.track('Software Viewed', {
    name: item.title,
    category: item.category,
  });
}}
```

---

## 🎨 Theming

The Software Arsenal uses your existing theme:
- Primary color: `#050816`
- Accent colors: Category-specific
- Fonts: Inherited from main app
- Dark mode: Built-in (matches your portfolio)

---

## 📝 Component API Reference

### CategoryFolder

```typescript
<CategoryFolder
  category={SoftwareCategory}  // Required
  index={number}               // Required for animations
  basePath="/software"         // Optional, default: "/software"
/>
```

### SoftwareCard

```typescript
<SoftwareCard
  item={SoftwareItem}  // Required
  index={number}       // Required for stagger animations
/>
```

---

## 🔗 Important Files

- **Data**: `src/constants/software.ts`
- **Types**: `src/types/software.ts`
- **Routes**: `src/app.tsx`
- **Hub Page**: `src/pages/SoftwareHub.tsx`
- **Detail Page**: `src/pages/CategoryDetail.tsx`
- **Preview**: `src/components/SoftwarePreview.tsx`
- **Card**: `src/components/SoftwareCard.tsx`

---

## 💡 Tips

1. **Placeholder Generator**: Use `generate-software-placeholders.cjs` for quick SVG placeholders
2. **Color Consistency**: Use category colors throughout for brand consistency
3. **Load Times**: Lazy load heavy images with React Suspense
4. **SEO**: Add meta tags for each software category page
5. **Animations**: Adjust animation delays in Framer Motion props

---

## 🆘 Need Help?

Check these files for examples:
- Sample data structure: `src/constants/software.ts`
- Card styling: `src/components/SoftwareCard.tsx`
- Animation patterns: `src/pages/SoftwareHub.tsx`

---

**Happy Building! 🚀**
