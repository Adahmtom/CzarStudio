import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticateRequest, unauthorizedResponse, hashPassword } from '@/lib/auth'

// GET all users (protected - admin only)
export async function GET(request: NextRequest) {
  const auth = authenticateRequest(request)
  if (!auth) return unauthorizedResponse()

  // Check if user is admin
  if (auth.role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden - Admin access required' },
      { status: 403 }
    )
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        permissions: true,
        active: true,
        createdAt: true,
        createdBy: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST create new user (protected - admin only)
export async function POST(request: NextRequest) {
  const auth = authenticateRequest(request)
  if (!auth) return unauthorizedResponse()

  if (auth.role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden - Admin access required' },
      { status: 403 }
    )
  }

  try {
    const body = await request.json()
    const { email, password, name, role, permissions, active } = body

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || 'user',
        permissions: permissions || [],
        active: active !== false,
        createdBy: auth.userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        permissions: true,
        active: true,
        createdAt: true,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH update user (protected - admin only)
export async function PATCH(request: NextRequest) {
  const auth = authenticateRequest(request)
  if (!auth) return unauthorizedResponse()

  if (auth.role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden - Admin access required' },
      { status: 403 }
    )
  }

  try {
    const body = await request.json()
    const { id, email, name, role, permissions, active, password } = body

    if (!id) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    const updateData: any = {}
    if (email) updateData.email = email
    if (name) updateData.name = name
    if (role) updateData.role = role
    if (permissions !== undefined) updateData.permissions = permissions
    if (active !== undefined) updateData.active = active
    if (password) updateData.password = await hashPassword(password)

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        permissions: true,
        active: true,
        createdAt: true,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE user (protected - admin only)
export async function DELETE(request: NextRequest) {
  const auth = authenticateRequest(request)
  if (!auth) return unauthorizedResponse()

  if (auth.role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden - Admin access required' },
      { status: 403 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    // Don't allow deleting yourself
    if (id === auth.userId) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      )
    }

    await prisma.user.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
