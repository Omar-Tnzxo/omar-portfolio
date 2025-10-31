# 🚀 Netlify Environment Variables Setup

## Overview
This guide shows you how to configure environment variables in Netlify so your portfolio site can connect to Supabase.

---

## 📍 Where to Find Your Supabase Credentials

### 1. Login to Supabase
```
https://supabase.com/dashboard
```

### 2. Select Your Project
Click on your portfolio project

### 3. Get API Settings
- Click **Settings** (gear icon) in sidebar
- Click **API**
- You'll find:
  - **Project URL** (VITE_SUPABASE_URL)
  - **anon/public key** (VITE_SUPABASE_ANON_KEY)

---

## 🔧 Configure Netlify Environment Variables

### 1. Go to Netlify Dashboard
```
https://app.netlify.com
```

### 2. Open Your Site
- Click on your portfolio site

### 3. Go to Environment Variables
```
Site Settings → Environment variables → Add a variable
```

### 4. Add Each Variable

#### Variable 1: Supabase URL
```
Key:   VITE_SUPABASE_URL
Value: https://your-project-id.supabase.co
Scope: ✅ All deploys
```

#### Variable 2: Supabase Anon Key
```
Key:   VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cC... (your actual key)
Scope: ✅ All deploys
```

#### Variable 3-6: EmailJS (Optional)
```
Key:   VITE_APP_EMAILJS_KEY
Value: your-emailjs-key
Scope: ✅ All deploys

Key:   VITE_APP_SERVICE_ID
Value: service_xxxxx
Scope: ✅ All deploys

Key:   VITE_APP_TEMPLATE_ID
Value: template_xxxxx
Scope: ✅ All deploys

Key:   VITE_APP_EMAILJS_RECIEVER
Value: your-email@example.com
Scope: ✅ All deploys
```

---

## 🔄 Redeploy Your Site

After adding environment variables:

### Option 1: Trigger Deploy in Netlify
```
Deploys → Trigger deploy → Deploy site
```

### Option 2: Push to GitHub
```bash
git add .
git commit -m "Update environment variables"
git push
```

Netlify will automatically rebuild with new environment variables.

---

## ✅ Verify Configuration

### 1. Check Build Logs
```
Netlify Dashboard → Deploys → [Latest Deploy] → Deploy log
```

Look for:
```
✓ 2275 modules transformed.
✓ built in XX.XXs
✅ Copied _redirects to dist/
✅ Copied _headers to dist/
```

### 2. Test Admin Login
```
https://your-site.netlify.app/admin
```

Try logging in with your Supabase admin credentials.

### 3. Check Browser Console
Press `F12` → Console

You should NOT see:
```
❌ Supabase URL is not configured
❌ Supabase Anon Key is not configured
```

If everything is correct, you'll see successful connection.

---

## 🚨 Common Errors & Solutions

### Error 1: "Secrets scanning detected secrets in build"

**Problem:** Real API keys found in `.env.example` or documentation files.

**Solution:** Already fixed! The project now:
- Uses placeholder values in `.env.example`
- Has `.netlifyignore` to exclude docs
- Has `SECRETS_SCAN_OMIT_PATHS` in `netlify.toml`

### Error 2: "Missing to field" in redirects

**Problem:** Invalid `_redirects` syntax.

**Solution:** Already fixed! `public/_redirects` now uses correct format:
```
/admin          /index.html   200
/portfolio/*    /index.html   200
/*              /index.html   200
```

### Error 3: "supabaseUrl is required"

**Problem:** Environment variables not set in Netlify.

**Solution:**
1. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Netlify
2. Trigger a new deploy
3. Clear browser cache and reload

### Error 4: Build succeeds but admin panel doesn't work

**Problem:** Environment variables added after build.

**Solution:**
1. Go to Netlify → Deploys
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Wait for build to complete

---

## 📋 Checklist

Before deploying to Netlify, make sure:

- [ ] Supabase project is created
- [ ] Database schema is applied (`supabase-schema.sql`)
- [ ] Admin user is created in Supabase
- [ ] Environment variables are added in Netlify:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
  - [ ] `VITE_APP_EMAILJS_KEY` (optional)
  - [ ] `VITE_APP_SERVICE_ID` (optional)
  - [ ] `VITE_APP_TEMPLATE_ID` (optional)
  - [ ] `VITE_APP_EMAILJS_RECIEVER` (optional)
- [ ] Site is deployed successfully
- [ ] Admin login works at `/admin`
- [ ] Portfolio data loads from Supabase

---

## 🔐 Security Notes

### Safe to Share:
- ✅ `VITE_SUPABASE_URL` (Project URL)
- ✅ `VITE_SUPABASE_ANON_KEY` (Public/Anon key)

### Never Share:
- ❌ `SUPABASE_SERVICE_ROLE_KEY` (Admin key)
- ❌ Your admin password
- ❌ `.env.local` file

The `anon key` is safe to expose because:
- It's meant for public client-side use
- Row Level Security (RLS) protects your data
- Admin operations require authentication

---

## 📞 Support

### Need Help?

1. **Check Console:** Press F12 in browser
2. **Review Netlify Logs:** Deploys → [Latest] → Deploy log
3. **Verify Supabase:** Test queries in SQL Editor
4. **Check Environment Variables:** Site Settings → Environment variables

### Related Guides:
- `SUPABASE-SETUP-GUIDE.md` - Database setup
- `ADMIN-SETUP-GUIDE.md` - Create admin account (Arabic)
- `QUICK-ADMIN-SETUP.md` - Quick admin setup (English)

---

**Last Updated:** October 2025  
**Version:** 1.0
