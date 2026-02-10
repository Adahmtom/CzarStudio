# 🚀 CZAR STUDIO - Complete Setup Guide

You have the database configured correctly! Now you just need to create the admin user.

## ⚡ Quick Setup (Recommended)

### Option 1: Automated Setup Script

```bash
# Make sure you're in the project directory
cd czar-studio-nextjs

# Run the setup script
./setup.sh
```

This will:
1. ✅ Install all dependencies
2. ✅ Generate Prisma Client
3. ✅ Push database schema to Supabase
4. ✅ Create admin user

---

## 🔧 Manual Setup (If Script Fails)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Generate Prisma Client
```bash
npx prisma generate
```

### Step 3: Push Database Schema
```bash
npx prisma db push
```

This creates all the tables in your Supabase database.

### Step 4: Create Admin User
```bash
node scripts/seed-admin.js
```

This creates the admin account with:
- **Email**: admin@czarstudio.com
- **Password**: admin123

---

## ✅ Verify Setup

### Check Database Tables in Supabase

1. Go to https://supabase.com
2. Open your project
3. Go to "Table Editor"
4. You should see these tables:
   - User
   - Photo
   - Video
   - Booking
   - Contact
   - Settings

### Check Admin User

1. Click on the **User** table
2. You should see one row:
   - email: admin@czarstudio.com
   - name: Admin User
   - role: admin

---

## 🎯 Start the Application

```bash
npm run dev
```

Visit:
- **Website**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin

### Login Credentials:
```
Email: admin@czarstudio.com
Password: admin123
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Cannot find module '@prisma/client'"

**Solution:**
```bash
npx prisma generate
```

### Issue 2: "Invalid credentials" after setup

**Solution:**
```bash
# Reset admin password
node scripts/seed-admin.js
```

### Issue 3: Database connection error

**Solution:**
Check your `.env` file:
```env
DATABASE_URL="postgresql://postgres:Adetomiwa11@@db.ecuyffdqcxkgpfojzono.supabase.co:5432/postgres"
JWT_SECRET="random-secret-key"
```

Make sure:
- No extra spaces
- Password is correct (has `@@` in it)
- Connection string is on one line

### Issue 4: "P2002: Unique constraint failed"

This means admin already exists. **This is OK!** Just try logging in.

If you forgot the password:
```bash
node scripts/seed-admin.js
```

This will reset it to `admin123`.

---

## 🔐 Security Notes

### ⚠️ IMPORTANT - Change Default Password!

After first login, you should:

1. Create a new admin user with a strong password
2. Delete the default admin@czarstudio.com account
3. Or at minimum, change the password from `admin123`

### Production Checklist:

- [ ] Change `JWT_SECRET` to a long random string
- [ ] Change admin password
- [ ] Enable SSL in Supabase
- [ ] Set up environment variables in deployment platform
- [ ] Add rate limiting to login endpoint

---

## 📊 Database Commands

### View Database in Browser
```bash
npx prisma studio
```

Opens a web interface at http://localhost:5555

### Reset Database (CAUTION - Deletes all data!)
```bash
npx prisma migrate reset
```

### View Database Schema
```bash
npx prisma db pull
```

---

## 🎨 What You Can Do Now

Once logged in to the admin dashboard, you can:

1. ✅ View statistics (bookings, photos, videos, messages)
2. ✅ Navigate to different sections (sidebar)
3. ✅ Logout

**Next Steps:**
- Complete the Bookings management page
- Complete the Photos management page  
- Complete the Videos management page
- Complete the Messages page
- Complete the Settings page

---

## 🆘 Still Having Issues?

### Get Detailed Error Info

If login fails, open browser console (F12) and check for:
- Network errors (Red in Network tab)
- Console errors (Red in Console tab)

### Check Server Logs

In your terminal where `npm run dev` is running, look for:
- Prisma errors
- Database connection errors
- API route errors

### Verify Environment Variables

```bash
# Print current environment (without showing password)
node -e "console.log(process.env.DATABASE_URL ? '✅ DATABASE_URL is set' : '❌ DATABASE_URL missing')"
node -e "console.log(process.env.JWT_SECRET ? '✅ JWT_SECRET is set' : '❌ JWT_SECRET missing')"
```

---

## 📝 Summary

Your `.env` file looks perfect! Just run:

```bash
# Quick setup
./setup.sh

# OR manual steps
npm install
npx prisma generate
npx prisma db push
node scripts/seed-admin.js
npm run dev
```

Then login at http://localhost:3000/admin with:
- Email: `admin@czarstudio.com`
- Password: `admin123`

**That's it!** 🎉
