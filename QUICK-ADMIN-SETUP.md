# 🔐 Quick Admin Account Setup

## Create Admin User in Supabase

### Method 1: Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**
   ```
   https://supabase.com/dashboard
   ```

2. **Navigate to Authentication**
   - Open your project
   - Click **Authentication** → **Users**

3. **Add New User**
   - Click **"Add user"** or **"Invite user"**
   - Select **"Create new user"**

4. **Enter Credentials**
   ```
   Email:    your-email@example.com
   Password: YourSecurePassword123!
   ```

5. **Confirm User**
   - Make sure user status is **"Confirmed"**
   - If not, click `...` → **"Confirm user"**

---

## Login to Admin Panel

### Local Development
```
http://localhost:5173/admin
```

### Production
```
https://your-site.netlify.app/admin
```

**Credentials:** Use the email and password you created above.

---

## Troubleshooting

### "Invalid login credentials"
- Verify email and password are correct
- Check user is **Confirmed** in Supabase
- Verify environment variables in `.env.local`

### "Supabase URL is not configured"
Create `.env.local` file:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Then rebuild:
```bash
npm run build
npm run dev
```

---

## Security Tips

✅ **DO:**
- Use strong password (12+ characters)
- Mix uppercase, lowercase, numbers, symbols
- Store credentials in password manager

❌ **DON'T:**
- Share login credentials
- Use weak passwords
- Commit `.env.local` to Git
- Post credentials publicly

---

## Next Steps

After login, you can:
- ✏️ Add new projects
- 🗂️ Manage categories
- 🖼️ Upload images
- 🔄 Update content
- 🗑️ Delete projects

---

**For detailed guide in Arabic, see:** `ADMIN-SETUP-GUIDE.md`
