import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticateRequest, unauthorizedResponse } from '@/lib/auth'

// GET all contacts (protected)
export async function GET(request: NextRequest) {
  const auth = authenticateRequest(request)
  if (!auth) return unauthorizedResponse()

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    const contacts = await prisma.contact.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST create new contact (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        message,
        status: 'new',
      },
    })

    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    console.error('Error creating contact:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH update contact status (protected)
export async function PATCH(request: NextRequest) {
  const auth = authenticateRequest(request)
  if (!auth) return unauthorizedResponse()

  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const contact = await prisma.contact.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Error updating contact:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE contact (protected)
export async function DELETE(request: NextRequest) {
  const auth = authenticateRequest(request)
  if (!auth) return unauthorizedResponse()

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Contact ID required' },
        { status: 400 }
      )
    }

    await prisma.contact.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Contact deleted successfully' })
  } catch (error) {
    console.error('Error deleting contact:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
