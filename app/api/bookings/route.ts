import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticateRequest, unauthorizedResponse } from '@/lib/auth'

// GET all bookings (protected)
export async function GET(request: NextRequest) {
  const auth = authenticateRequest(request)
  if (!auth) return unauthorizedResponse()

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    const bookings = await prisma.booking.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST create new booking (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, eventType, eventDate, eventTime, location, message } = body

    if (!name || !email || !eventType || !eventDate || !eventTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        phone,
        eventType,
        eventDate: new Date(eventDate),
        eventTime,
        location,
        message,
        status: 'pending',
      },
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH update booking status (protected)
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

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE booking (protected)
export async function DELETE(request: NextRequest) {
  const auth = authenticateRequest(request)
  if (!auth) return unauthorizedResponse()

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Booking ID required' },
        { status: 400 }
      )
    }

    await prisma.booking.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Booking deleted successfully' })
  } catch (error) {
    console.error('Error deleting booking:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
