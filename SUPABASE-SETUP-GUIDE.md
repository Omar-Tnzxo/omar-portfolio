# 🚀 SUPABASE PORTFOLIO SETUP GUIDE

**Complete Guide to Setup Dynamic Portfolio with Supabase Database**

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Quick Setup (5 Steps)](#quick-setup)
3. [Detailed Setup Instructions](#detailed-setup)
4. [Database Schema](#database-schema)
5. [Adding Content](#adding-content)
6. [Storage Setup](#storage-setup)
7. [Environment Variables](#environment-variables)
8. [Testing](#testing)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The portfolio system is now **fully dynamic** with Supabase integration. It features:

- ✅ **Dynamic Content**: All projects, categories, and content from database
- ✅ **Image Storage**: Supabase Storage for all images
- ✅ **SEO Optimization**: Dynamic meta tags from database
- ✅ **Analytics**: Built-in view tracking
- ✅ **Automatic Fallback**: Works with static data if Supabase not configured
- ✅ **Admin Ready**: Structure ready for admin panel

---

## ⚡ Quick Setup (5 Steps)

### Step 1: Create Supabase Project
```
1. Go to https://supabase.com
2. Sign up / Login
3. Click "New Project"
4. Fill in:
   - Name: omar-portfolio
   - Database Password: (save this!)
   - Region: Choose closest to Egypt
5. Click "Create new project"
6. Wait 2-3 minutes for setup
```

### Step 2: Run Database Schema
```
1. In Supabase Dashboard → Go to "SQL Editor"
2. Copy content from `supabase-schema.sql`
3. Paste into SQL Editor
4. Click "Run" button
5. Wait for success message
```

### Step 3: Add Sample Data
```
1. Still in SQL Editor
2. Copy content from `supabase-seed.sql`
3. Paste into editor
4. Click "Run"
5. Verify data in "Table Editor"
```

### Step 4: Setup Storage
```
1. Go to "Storage" in sidebar
2. Click "New bucket"
3. Name: portfolio-images
4. Make it PUBLIC
5. Click "Create bucket"
```

### Step 5: Configure Environment
```
1. Copy `.env.example` to `.env.local`
2. In Supabase Dashboard → "Settings" → "API"
3. Copy "Project URL" and "anon public" key
4. Paste into `.env.local`:
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
5. Restart dev server
```

✅ **Done! Your portfolio is now dynamic!**

---

## 📖 Detailed Setup Instructions

### 1. Supabase Project Creation

#### 1.1 Sign Up / Login
- Visit: https://supabase.com
- Click "Start your project"
- Sign up with GitHub (recommended) or email

#### 1.2 Create New Project
- Click "New Project"
- Choose organization (or create one)
- Project details:
  ```
  Name: omar-portfolio
  Database Password: [Create strong password]
  Region: Europe (West) - London [closest to Egypt]
  Pricing Plan: Free (sufficient for portfolio)
  ```
- Click "Create new project"
- **Save your database password safely!**

#### 1.3 Wait for Initialization
- Project takes 2-3 minutes to initialize
- You'll see "Setting up project..." message
- Don't close the window

---

### 2. Database Schema Setup

#### 2.1 Access SQL Editor
- In left sidebar → Click "SQL Editor"
- Click "New query"

#### 2.2 Run Schema Script
- Open `supabase-schema.sql` from project root
- Copy **entire** contents
- Paste into SQL Editor
- Click "Run" button (or Ctrl+Enter)
- Wait for completion

#### 2.3 Verify Tables Created
- Go to "Table Editor" in sidebar
- You should see 10 tables:
  ```
  ✓ portfolio_categories
  ✓ project_sub_categories
  ✓ portfolio_projects
  ✓ project_skills
  ✓ project_tech_stack
  ✓ project_gallery
  ✓ project_results
  ✓ project_case_content
  ✓ seo_metadata
  ✓ project_analytics
  ```

#### 2.4 Verify Views Created
- In SQL Editor, run:
  ```sql
  SELECT * FROM vw_category_summary;
  SELECT * FROM vw_featured_projects;
  ```
- Should return empty results (no data yet)

---

### 3. Seed Initial Data

#### 3.1 Run Seed Script
- In SQL Editor → New query
- Open `supabase-seed.sql`
- Copy entire contents
- Paste into SQL Editor
- Click "Run"

#### 3.2 Verify Data Inserted
- Go to "Table Editor"
- Click `portfolio_categories` → Should see 8 categories
- Click `portfolio_projects` → Should see 2 sample projects
- Click `project_skills` → Should see skills for projects

#### 3.3 Check Views
```sql
-- Should return 8 categories with project counts
SELECT * FROM vw_category_summary;

-- Should return featured projects
SELECT * FROM vw_featured_projects;
```

---

### 4. Storage Setup for Images

#### 4.1 Create Storage Bucket
- Go to "Storage" in sidebar
- Click "New bucket"
- Configuration:
  ```
  Name: portfolio-images
  Public bucket: YES (toggle ON)
  File size limit: 5MB (recommended)
  Allowed MIME types: Leave empty (all types)
  ```
- Click "Create bucket"

#### 4.2 Setup Bucket Policies
- Click bucket → "Policies"
- Add policy for public read:
  ```sql
  CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'portfolio-images' );
  ```

#### 4.3 Create Folder Structure
- Click bucket → "Upload" (just to enter)
- Create folders:
  ```
  portfolio-images/
  ├── mobile/
  ├── web/
  ├── social/
  ├── bots/
  ├── automation/
  └── scripts/
  ```

#### 4.4 Upload Images
- Navigate to each folder
- Upload corresponding project images
- Images will be accessible at:
  ```
  https://[project-id].supabase.co/storage/v1/object/public/portfolio-images/[path]
  ```

---

### 5. Environment Configuration

#### 5.1 Get API Credentials
- In Supabase Dashboard → "Settings" → "API"
- Copy these values:
  ```
  Project URL: https://[project-id].supabase.co
  anon public key: eyJ... (long string)
  ```

#### 5.2 Configure Local Environment
- In project root, copy `.env.example`:
  ```bash
  cp .env.example .env.local
  ```

#### 5.3 Add Supabase Config
- Open `.env.local`
- Add:
  ```env
  VITE_SUPABASE_URL=https://your-project-id.supabase.co
  VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```

#### 5.4 Restart Development Server
```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

## 🗄️ Database Schema

### Tables Overview

#### 1. `portfolio_categories`
Main category folders (Web Dev, Mobile Apps, etc.)
```sql
- id (UUID)
- name (VARCHAR)
- slug (VARCHAR) UNIQUE
- color (VARCHAR) - Hex color
- description (TEXT)
- display_order (INTEGER)
- is_active (BOOLEAN)
```

#### 2. `project_sub_categories`
Filter options within each category
```sql
- id (UUID)
- category_id (UUID FK)
- name (VARCHAR)
- slug (VARCHAR)
- display_order (INTEGER)
```

#### 3. `portfolio_projects`
Main projects table
```sql
- id (UUID)
- slug (VARCHAR) UNIQUE
- title (VARCHAR)
- client (VARCHAR)
- my_role (VARCHAR)
- category_id (UUID FK)
- sub_category_id (UUID FK)
- short_description (TEXT)
- full_description (TEXT)
- challenge (TEXT)
- solution (TEXT)
- cover_image_url (TEXT)
- video_url (TEXT)
- project_date (VARCHAR)
- github_link (TEXT)
- live_link (TEXT)
- is_featured (BOOLEAN)
- is_published (BOOLEAN)
- meta_title, meta_description (SEO)
```

#### 4. `project_skills`
Skills used in each project
```sql
- id (UUID)
- project_id (UUID FK)
- skill_name (VARCHAR)
- display_order (INTEGER)
```

#### 5. `project_tech_stack`
Tech stack breakdown
```sql
- id (UUID)
- project_id (UUID FK)
- category (VARCHAR) - frontend/backend/tools
- tech_name (VARCHAR)
- display_order (INTEGER)
```

#### 6. `project_gallery`
Project screenshots
```sql
- id (UUID)
- project_id (UUID FK)
- image_url (TEXT)
- caption (TEXT)
- display_order (INTEGER)
```

#### 7. `project_results`
Achievements and metrics
```sql
- id (UUID)
- project_id (UUID FK)
- result_text (TEXT)
- display_order (INTEGER)
```

#### 8. `project_case_content`
Special content (scripts, social media posts, etc.)
```sql
- id (UUID)
- project_id (UUID FK)
- content_type (VARCHAR)
- content_data (TEXT/JSON)
```

#### 9. `seo_metadata`
Advanced SEO data
```sql
- id (UUID)
- entity_type (VARCHAR)
- entity_id (UUID)
- og_title, og_description, og_image_url
- twitter_card, canonical_url, robots
```

#### 10. `project_analytics`
View tracking
```sql
- id (UUID)
- project_id (UUID FK)
- view_count (INTEGER)
- last_viewed_at (TIMESTAMP)
```

---

## ✏️ Adding Content

### Add New Category

```sql
INSERT INTO portfolio_categories (name, slug, color, description, display_order) 
VALUES (
  'Category Name',
  'category-slug',
  '#915EFF',
  'Category description',
  9
);
```

### Add New Project

```sql
-- 1. Insert project
INSERT INTO portfolio_projects (
  slug, title, client, my_role, 
  category_id, short_description, full_description,
  challenge, solution, cover_image_url, project_date,
  is_published, display_order
) VALUES (
  'project-slug',
  'Project Title',
  'Client Name',
  'Your Role',
  (SELECT id FROM portfolio_categories WHERE slug = 'web-development'),
  'Short description...',
  'Full description...',
  'The challenge...',
  'The solution...',
  '/portfolio/web/project-cover.webp',
  'January 2025',
  true,
  1
) RETURNING id;

-- 2. Add skills (use project ID from above)
INSERT INTO project_skills (project_id, skill_name, display_order) VALUES
((SELECT id FROM portfolio_projects WHERE slug = 'project-slug'), 'React', 1),
((SELECT id FROM portfolio_projects WHERE slug = 'project-slug'), 'TypeScript', 2);

-- 3. Add tech stack
INSERT INTO project_tech_stack (project_id, category, tech_name, display_order) VALUES
((SELECT id FROM portfolio_projects WHERE slug = 'project-slug'), 'frontend', 'React', 1),
((SELECT id FROM portfolio_projects WHERE slug = 'project-slug'), 'backend', 'Node.js', 1);

-- 4. Add gallery images
INSERT INTO project_gallery (project_id, image_url, display_order) VALUES
((SELECT id FROM portfolio_projects WHERE slug = 'project-slug'), '/portfolio/web/img1.webp', 1),
((SELECT id FROM portfolio_projects WHERE slug = 'project-slug'), '/portfolio/web/img2.webp', 2);

-- 5. Add results
INSERT INTO project_results (project_id, result_text, display_order) VALUES
((SELECT id FROM portfolio_projects WHERE slug = 'project-slug'), '1000+ users', 1),
((SELECT id FROM portfolio_projects WHERE slug = 'project-slug'), '5★ rating', 2);
```

### Update Project

```sql
UPDATE portfolio_projects 
SET 
  title = 'New Title',
  short_description = 'New description',
  updated_at = NOW()
WHERE slug = 'project-slug';
```

### Delete Project

```sql
-- This will cascade delete all related data (skills, gallery, etc.)
DELETE FROM portfolio_projects WHERE slug = 'project-slug';
```

---

## 📤 Storage Setup

### Upload Images via Dashboard

1. Go to Storage → portfolio-images
2. Navigate to folder (e.g., `mobile/`)
3. Click "Upload file"
4. Select image
5. Get URL:
   ```
   https://[project-id].supabase.co/storage/v1/object/public/portfolio-images/mobile/image.webp
   ```

### Upload Images via Code

```typescript
import { supabase, PORTFOLIO_BUCKET } from './lib/supabase';

const uploadImage = async (file: File, path: string) => {
  const { data, error } = await supabase.storage
    .from(PORTFOLIO_BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true
    });
  
  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from(PORTFOLIO_BUCKET)
    .getPublicUrl(path);
  
  return publicUrl;
};

// Usage
const url = await uploadImage(file, 'mobile/calcrealty-cover.webp');
```

---

## 🔧 Testing

### Test Database Connection

```bash
# In browser console (F12)
import { supabase } from './lib/supabase';

// Test connection
const { data, error } = await supabase
  .from('portfolio_categories')
  .select('*');

console.log('Categories:', data);
```

### Test API Functions

```typescript
import { portfolioApi } from './services/portfolio-api';

// Test fetching categories
const categories = await portfolioApi.fetchCategories();
console.log('Categories:', categories);

// Test fetching projects
const projects = await portfolioApi.fetchProjectsByCategory('mobile-apps');
console.log('Projects:', projects);

// Test fetching single project
const project = await portfolioApi.fetchProjectBySlug('mobile-apps', 'calcrealty');
console.log('Project:', project);
```

### Verify in App

1. Run dev server: `npm run dev`
2. Navigate to `/portfolio`
3. Check browser console for Supabase logs
4. Verify categories load from database
5. Click category → Check projects load
6. Click project → Check full details load

---

## 🐛 Troubleshooting

### Issue: "Supabase URL is not configured"

**Solution:**
- Check `.env.local` file exists
- Verify `VITE_SUPABASE_URL` is set
- Restart dev server
- Clear browser cache

### Issue: "Access denied" errors

**Solution:**
- Check RLS policies are created
- Verify bucket is PUBLIC
- Run:
  ```sql
  -- Check policies
  SELECT * FROM pg_policies;
  
  -- Recreate public read policies if needed
  CREATE POLICY "Public read categories" ON portfolio_categories
    FOR SELECT USING (is_active = true);
  ```

### Issue: Images not loading

**Solution:**
- Verify bucket name is `portfolio-images`
- Check bucket is PUBLIC
- Verify image URLs in database match storage paths
- Test direct URL in browser

### Issue: Data not appearing

**Solution:**
```sql
-- Check if data exists
SELECT COUNT(*) FROM portfolio_categories;
SELECT COUNT(*) FROM portfolio_projects;

-- Check if published
SELECT * FROM portfolio_projects WHERE is_published = false;

-- Re-run seed if needed
```

### Issue: Fallback to static data

**Cause:** Supabase not configured or erroring
**Solution:**
- This is intentional behavior
- Check browser console for errors
- Fix Supabase configuration
- App will automatically switch to database once fixed

---

## 📊 Performance Tips

### Enable Caching
```typescript
// Add to supabase.ts
const supabase = createClient(url, key, {
  global: {
    headers: {
      'cache-control': 'max-age=3600' // Cache for 1 hour
    }
  }
});
```

### Optimize Queries
```typescript
// Use views instead of joins
const { data } = await supabase
  .from('vw_complete_projects') // Pre-joined view
  .select('*');

// Limit fields
const { data } = await supabase
  .from('portfolio_projects')
  .select('id, title, slug'); // Only needed fields
```

### Image Optimization
- Use WebP format
- Compress images before upload
- Use responsive image sizes
- Enable Supabase Image Transformation

---

## 🎉 Next Steps

### Recommended Improvements

1. **Admin Panel**
   - Build admin interface for content management
   - Use Supabase Auth for admin login
   - Create forms for adding/editing projects

2. **Image Optimization**
   - Use Supabase Image Transformation
   - Auto-generate thumbnails
   - Implement lazy loading

3. **Advanced Features**
   - Full-text search
   - Project filtering
   - Related projects
   - Comments system
   - Analytics dashboard

4. **SEO Enhancement**
   - Dynamic sitemap generation
   - Automatic meta tag injection
   - Schema.org structured data
   - Social media preview cards

---

## 📚 Resources

- **Supabase Docs:** https://supabase.com/docs
- **Supabase Storage:** https://supabase.com/docs/guides/storage
- **SQL Reference:** https://www.postgresql.org/docs/
- **React Query (recommended):** https://tanstack.com/query

---

**Setup Complete! 🎉**

Your portfolio is now fully dynamic with Supabase!

For support or questions, check the Supabase Discord or documentation.
