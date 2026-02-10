const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🔄 Creating admin user...')

  // Hash the password
  const hashedPassword = await bcrypt.hash('admin123', 10)

  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@czarstudio.com' },
    })

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!')
      console.log('Email:', existingAdmin.email)
      console.log('Updating password...')
      
      // Update existing admin
      await prisma.user.update({
        where: { email: 'admin@czarstudio.com' },
        data: { password: hashedPassword },
      })
      
      console.log('✅ Admin password updated!')
    } else {
      // Create new admin
      const admin = await prisma.user.create({
        data: {
          email: 'admin@czarstudio.com',
          password: hashedPassword,
          name: 'Admin User',
          role: 'admin',
        },
      })

      console.log('✅ Admin user created successfully!')
      console.log('📧 Email:', admin.email)
      console.log('🔑 Password: admin123')
    }

    console.log('\n🎉 You can now login with:')
    console.log('Email: admin@czarstudio.com')
    console.log('Password: admin123')
  } catch (error) {
    console.error('❌ Error:', error.message)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
