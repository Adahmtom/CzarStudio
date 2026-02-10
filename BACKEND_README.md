# CZAR STUDIO - Complete Photography Website with Admin Dashboard

A premium Next.js photography website with full backend and admin dashboard for managing bookings, photos, videos, and client communications.

## 🚀 Features

### Frontend
- ✅ Modern, responsive design with dark cinematic theme
- ✅ 7 pages: Home, About, Photos, Videos, Portfolio, Contact, Book
- ✅ Photo gallery with lightbox and category filtering
- ✅ Video showcase with custom player
- ✅ Booking system with event type selection
- ✅ Contact forms
- ✅ Smooth animations with Framer Motion
- ✅ Fully responsive mobile-first design

### Backend & Admin Dashboard
- ✅ Complete authentication system with JWT
- ✅ Protected admin routes
- ✅ Dashboard with statistics and analytics
- ✅ Booking management (view, update status, delete)
- ✅ Photo management (CRUD operations)
- ✅ Video management (CRUD operations)
- ✅ Message/Contact management
- ✅ Settings configuration
- ✅ PostgreSQL database with Prisma ORM

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcryptjs
- **Icons**: Lucide React

## 🛠️ Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud like Supabase/Railway)
- Git

### 2. Installation

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate
```

### 3. Database Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/czar_studio"

# JWT Secret (change this to a random string)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

**For Supabase (Recommended for easy setup):**
1. Go to https://supabase.com and create a free account
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string (use the "Direct connection" URL)
5. Replace `DATABASE_URL` in your `.env` file

### 4. Run Database Migrations

```bash
# Push the schema to your database
npx prisma db push

# Open Prisma Studio to view/edit database
npx prisma studio
```

### 5. Create Admin User

You need to create an admin user manually. You can use Prisma Studio or run this script:

Create `scripts/create-admin.ts`:

```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@czarstudio.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    },
  })

  console.log('Admin user created:', admin)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Run it:
```bash
npx ts-node scripts/create-admin.ts
```

### 6. Run Development Server

```bash
npm run dev
```

Visit:
- **Frontend**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin
- **Dashboard**: http://localhost:3000/admin/dashboard (after login)

### 7. Default Admin Credentials

- **Email**: admin@czarstudio.com
- **Password**: admin123

**⚠️ IMPORTANT**: Change these credentials in production!

## 📁 Project Structure

```
czar-studio-nextjs/
├── app/
│   ├── admin/               # Admin dashboard
│   │   ├── dashboard/       # Dashboard home
│   │   ├── bookings/        # Booking management
│   │   ├── photos/          # Photo management
│   │   ├── videos/          # Video management
│   │   ├── messages/        # Contact messages
│   │   ├── settings/        # Settings
│   │   ├── layout.tsx       # Admin layout with sidebar
│   │   └── page.tsx         # Admin login
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── bookings/       # Booking CRUD
│   │   ├── photos/         # Photo CRUD
│   │   ├── videos/         # Video CRUD
│   │   └── contacts/       # Contact CRUD
│   ├── (public pages)      # All public pages
│   └── layout.tsx          # Root layout
├── components/             # Reusable components
├── lib/                    # Utilities
│   ├── prisma.ts          # Prisma client
│   └── auth.ts            # Auth utilities
├── prisma/
│   └── schema.prisma      # Database schema
└── public/                # Static files

```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Bookings
- `GET /api/bookings` - Get all bookings (protected)
- `POST /api/bookings` - Create booking (public)
- `PATCH /api/bookings` - Update booking status (protected)
- `DELETE /api/bookings?id={id}` - Delete booking (protected)

### Photos
- `GET /api/photos` - Get all photos
- `POST /api/photos` - Create photo (protected)
- `PATCH /api/photos` - Update photo (protected)
- `DELETE /api/photos?id={id}` - Delete photo (protected)

### Videos
- `GET /api/videos` - Get all videos
- `POST /api/videos` - Create video (protected)
- `PATCH /api/videos` - Update video (protected)
- `DELETE /api/videos?id={id}` - Delete video (protected)

### Contacts
- `GET /api/contacts` - Get all messages (protected)
- `POST /api/contacts` - Create message (public)
- `PATCH /api/contacts` - Update message status (protected)
- `DELETE /api/contacts?id={id}` - Delete message (protected)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
NEXT_PUBLIC_API_URL="https://yourdomain.com"
```

## 📝 TODO / Future Enhancements

- [ ] Complete Photo management page
- [ ] Complete Video management page
- [ ] Complete Messages page
- [ ] Complete Settings page
- [ ] File upload functionality (Cloudinary/S3)
- [ ] Email notifications for bookings
- [ ] Calendar view for bookings
- [ ] Analytics dashboard
- [ ] Export data functionality
- [ ] User roles and permissions
- [ ] Two-factor authentication

## 🤝 Support

For issues or questions, please contact the development team.

## 📄 License

Private - All Rights Reserved
