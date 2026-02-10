#!/bin/bash

echo "🚀 CZAR STUDIO - Quick Setup Script"
echo "===================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file with your database credentials"
    exit 1
fi

echo "✅ Found .env file"
echo ""

# Step 1: Install dependencies
echo "📦 Step 1: Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Step 2: Generate Prisma Client
echo "🔧 Step 2: Generating Prisma Client..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma Client"
    exit 1
fi

echo "✅ Prisma Client generated"
echo ""

# Step 3: Push database schema
echo "📊 Step 3: Pushing database schema to Supabase..."
npx prisma db push

if [ $? -ne 0 ]; then
    echo "❌ Failed to push database schema"
    echo "Please check your DATABASE_URL in .env"
    exit 1
fi

echo "✅ Database schema created"
echo ""

# Step 4: Seed admin user
echo "👤 Step 4: Creating admin user..."
node scripts/seed-admin.js

if [ $? -ne 0 ]; then
    echo "❌ Failed to create admin user"
    exit 1
fi

echo ""
echo "============================================"
echo "✅ Setup Complete!"
echo "============================================"
echo ""
echo "You can now run the application:"
echo "  npm run dev"
echo ""
echo "Admin Login Credentials:"
echo "  Email: admin@czarstudio.com"
echo "  Password: admin123"
echo ""
echo "Visit: http://localhost:3000/admin"
echo "============================================"
