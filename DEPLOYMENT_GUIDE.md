# 🚀 CZAR STUDIO - Complete Deployment Guide

## 📋 **Pre-Deployment Checklist**

Before deploying, ensure you have:
- ✅ Tested locally and everything works
- ✅ Have a domain name (e.g., czarstudio.com)
- ✅ Credit/debit card for cloud services (most have free tiers)
- ✅ Git repository (recommended)

---

## 🎯 **RECOMMENDED DEPLOYMENT STACK**

### **Best Option for CZAR STUDIO:**

**Frontend/Backend:** Vercel (Free tier available)
**Database:** Supabase (Free tier available)
**File Storage:** Cloudinary (Free tier available)

**Total Cost:** $0/month to start (can handle ~10,000 visitors/month)

---

## 📝 **STEP-BY-STEP DEPLOYMENT**

### **Phase 1: Database Setup (Supabase)**

#### 1. Create Supabase Account
```
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (recommended)
```

#### 2. Create New Project
```
1. Click "New Project"
2. Name: czar-studio
3. Database Password: [Generate strong password - SAVE THIS!]
4. Region: Choose closest to your target audience
5. Click "Create new project"
6. Wait 2-3 minutes for setup
```

#### 3. Get Database Connection String
```
1. Go to Settings → Database
2. Find "Connection string" section
3. Select "URI" tab
4. Copy the connection string
5. Replace [YOUR-PASSWORD] with your actual password
6. Save this - you'll need it!

Example:
postgresql://postgres.xyz:YOUR-PASSWORD@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

---

### **Phase 2: Prepare Your Code**

#### 1. Create `.env.production` File
```env
DATABASE_URL="your-supabase-connection-string-here"
JWT_SECRET="generate-random-32-character-string-here"
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
```

**Generate JWT Secret:**
```bash
# Run this in terminal to generate a secure random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 2. Update package.json Scripts
Make sure you have:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "postinstall": "prisma generate"
  }
}
```

#### 3. Create `.gitignore` (if not exists)
```
node_modules
.next
.env
.env.local
.env.production
*.log
.DS_Store
```

---

### **Phase 3: Push Code to GitHub**

#### 1. Initialize Git (if not done)
```bash
cd czar-studio-nextjs
git init
git add .
git commit -m "Initial commit - ready for deployment"
```

#### 2. Create GitHub Repository
```
1. Go to https://github.com
2. Click "New repository"
3. Name: czar-studio
4. Make it Private (recommended)
5. Don't initialize with README
6. Click "Create repository"
```

#### 3. Push Code
```bash
# Replace YOUR-USERNAME with your GitHub username
git remote add origin https://github.com/YOUR-USERNAME/czar-studio.git
git branch -M main
git push -u origin main
```

---

### **Phase 4: Deploy to Vercel**

#### 1. Create Vercel Account
```
1. Go to https://vercel.com
2. Click "Sign Up"
3. Use "Continue with GitHub" (easiest)
4. Authorize Vercel
```

#### 2. Import Project
```
1. Click "Add New..." → "Project"
2. Import your czar-studio repository
3. Click "Import"
```

#### 3. Configure Project
```
Framework Preset: Next.js (auto-detected)
Root Directory: ./
Build Command: npm run build (auto-filled)
Output Directory: .next (auto-filled)
Install Command: npm install (auto-filled)
```

#### 4. Add Environment Variables
```
Click "Environment Variables"

Add these ONE BY ONE:

Name: DATABASE_URL
Value: [Your Supabase connection string]

Name: JWT_SECRET  
Value: [Your generated JWT secret]

Name: NEXT_PUBLIC_SITE_URL
Value: https://czar-studio.vercel.app (we'll update this later)
```

#### 5. Deploy
```
1. Click "Deploy"
2. Wait 2-3 minutes
3. You'll see "Congratulations!" when done
4. Click "Visit" to see your live site!
```

---

### **Phase 5: Database Migration**

#### 1. Run Prisma Migration on Production Database
```bash
# In your local terminal, with production DATABASE_URL:
DATABASE_URL="your-production-database-url" npx prisma db push
```

#### 2. Create Admin User on Production
```bash
# Option A: Use Supabase SQL Editor
1. Go to Supabase Dashboard
2. Click SQL Editor
3. Click "New query"
4. Paste this:

-- First, hash the password
-- bcrypt hash of 'admin123' with 10 rounds:
-- $2a$10$YOUR_HASHED_PASSWORD_HERE

-- You need to generate this locally first:
-- node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('admin123', 10))"

-- Then insert:
INSERT INTO "User" (id, email, password, name, role, active, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'admin@czarstudio.com',
  '$2a$10$N9qo8uLOickgx2ZEEf86Oub2qsJOHJa/eoTlKQoQJrDzGX/eKp4Qu', -- This is 'admin123'
  'Admin User',
  'admin',
  true,
  NOW(),
  NOW()
);

5. Click "Run"
```

**Option B: Use your seed script (easier)**
```bash
# Update DATABASE_URL in .env to production
# Then run:
node scripts/seed-admin.js

# DON'T FORGET to change it back to local after!
```

---

### **Phase 6: Custom Domain (Optional but Recommended)**

#### 1. Buy a Domain
```
Recommended registrars:
- Namecheap (cheap, good UI)
- Google Domains (simple)
- GoDaddy (popular)

Search for: czarstudio.com
Cost: ~$10-15/year
```

#### 2. Add Domain to Vercel
```
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Enter your domain: czarstudio.com
4. Click "Add"
```

#### 3. Configure DNS
```
Vercel will show you DNS records to add.

Go to your domain registrar:
1. Find DNS settings
2. Add the records Vercel shows you
3. Usually takes 5-60 minutes to propagate

Common records:
A Record: @ → 76.76.21.21
CNAME: www → cname.vercel-dns.com
```

#### 4. Update Environment Variable
```
In Vercel:
1. Settings → Environment Variables
2. Edit NEXT_PUBLIC_SITE_URL
3. Change to: https://czarstudio.com
4. Save
5. Redeploy (Deployments → ⋯ → Redeploy)
```

---

## 🔐 **SECURITY CHECKLIST**

Before going live, complete these:

### **1. Change Default Credentials**
```
✅ Login to /admin with admin@czarstudio.com
✅ Go to /admin/users
✅ Create new admin with YOUR email
✅ Logout and login with new account
✅ Delete admin@czarstudio.com account
```

### **2. Update JWT Secret**
```
✅ Generated random 32+ character string
✅ Added to Vercel environment variables
✅ Never commit to Git
```

### **3. Database Security**
```
✅ Using strong database password
✅ Connection string in environment variables only
✅ Enable Row Level Security in Supabase (optional)
```

### **4. Environment Variables**
```
✅ All secrets in Vercel dashboard
✅ No secrets in code
✅ .env files in .gitignore
```

---

## 📊 **POST-DEPLOYMENT TASKS**

### **1. Test Everything**
```bash
# Your production URL
https://czarstudio.com/admin

Test:
✅ Admin login works
✅ Can create photos → appear on /photos
✅ Can create videos → appear on /videos
✅ Can create bookings
✅ Contact form sends to database
✅ User management works
```

### **2. Add Initial Content**
```
✅ Upload 10-20 photos
✅ Upload 5-10 videos
✅ Test booking flow
✅ Test contact form
```

### **3. Setup Google Analytics (Optional)**
```
1. Go to https://analytics.google.com
2. Create account
3. Get tracking ID
4. Add to your site (can add later)
```

### **4. Setup Email Notifications (Later)**
```
For booking confirmations:
- Resend.com (Free: 3,000 emails/month)
- SendGrid (Free: 100 emails/day)
```

---

## 💰 **COST BREAKDOWN**

### **Free Tier (Perfect for Starting)**
```
Vercel:     FREE (100GB bandwidth, unlimited deployments)
Supabase:   FREE (500MB database, 2GB bandwidth)
Cloudinary: FREE (25GB storage, 25GB bandwidth)
Domain:     $10-15/year

TOTAL:      ~$12/year
```

### **When You Grow (>10K visitors/month)**
```
Vercel Pro:     $20/month (better performance)
Supabase Pro:   $25/month (8GB database)
Cloudinary Pro: $99/month (lots of images)

TOTAL:          ~$144/month (but you're making money by then!)
```

---

## 🐛 **TROUBLESHOOTING DEPLOYMENT**

### **Build Fails on Vercel**
```
Error: "Module not found"
Fix: Check package.json has all dependencies

Error: "Prisma Client not generated"
Fix: Add "postinstall": "prisma generate" to scripts

Error: "DATABASE_URL not found"
Fix: Add DATABASE_URL in Vercel environment variables
```

### **Database Connection Issues**
```
Error: "Can't reach database"
Fix: 
1. Check DATABASE_URL is correct
2. Check Supabase project is running
3. Check password in connection string
4. Try direct connection string (not pooler)
```

### **Admin Login Not Working**
```
Error: "Invalid credentials"
Fix:
1. Check admin user exists in database
2. Run seed-admin.js script
3. Check JWT_SECRET is set in Vercel
```

---

## 📱 **MOBILE OPTIMIZATION**

Your site is already mobile-responsive, but test:
```
✅ Test on iPhone Safari
✅ Test on Android Chrome
✅ Test form submissions on mobile
✅ Test photo gallery on mobile
✅ Test video player on mobile
```

---

## 🎯 **QUICK DEPLOYMENT SUMMARY**

**Total Time: ~2 hours**

```
1. Create Supabase account (10 min)
2. Get database URL (5 min)
3. Push code to GitHub (10 min)
4. Deploy to Vercel (15 min)
5. Setup database (20 min)
6. Create admin user (5 min)
7. Buy domain (15 min) [OPTIONAL]
8. Configure DNS (10 min) [OPTIONAL]
9. Test everything (30 min)
10. Add initial content (30 min)
```

---

## ✅ **DEPLOYMENT COMPLETE!**

After following this guide, you'll have:
- ✅ Live website at your domain
- ✅ Working admin dashboard
- ✅ Database hosted on Supabase
- ✅ Automatic deployments from GitHub
- ✅ SSL certificate (HTTPS)
- ✅ Global CDN (fast worldwide)
- ✅ Production-ready system

---

## 🆘 **NEED HELP?**

Common issues:
1. Build errors → Check Vercel build logs
2. Database errors → Check Supabase logs
3. Domain not working → Wait 1 hour for DNS
4. Admin login fails → Re-run seed script

**You're ready to deploy! Let me know when you want to start!** 🚀
