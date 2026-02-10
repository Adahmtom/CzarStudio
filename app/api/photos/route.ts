import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticateRequest, unauthorizedResponse } from '@/lib/auth'

// GET all photos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    
    const photos = await prisma.photo.findMany({
      where: {
        ...(category && category !== 'All' ? { category } : {}),
        ...(featured ? { featured: featured === 'true' } : {}),
        published: true,
      },
      orderBy: { date: 'desc' },
    })

    return NextResponse.json(photos)
  } catch (error) {
    console.error('Error fetching photos:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST create new photo (protected)
export async function POST(request: NextRequest) {
  const auth = authenticateRequest(request)
  if (!auth) return unauthorizedResponse()

  try {
    const body = await request.json()
    const { title, description, category, imageUrl, location, date, featured, published } = body

    if (!title || !category || !imageUrl || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const photo = await prisma.photo.create({
      data: {
        title,
        description,
        category,
        imageUrl,
        location,
        date: new Date(date),
        featured: featured || false,
        published: published !== false,
      },
    })

    return NextResponse.json(photo, { status: 201 })
  } catch (error) {
    console.error('Error creating photo:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH update photo (protected)
export async function PATCH(request: NextRequest) {
  const auth = authenticateRequest(request)
  if (!auth) return unauthorizedResponse()

  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Photo ID required' },
        { status: 400 }
      )
    }

    if (data.date) {
      data.date = new Date(data.date)
    }

    const photo = await prisma.photo.update({
      where: { id },
      data,
    })

    return NextResponse.json(photo)
  } catch (error) {
    console.error('Error updating photo:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE photo (protected)
export async function DELETE(request: NextRequest) {
  const auth = authenticateRequest(request)
  if (!auth) return unauthorizedResponse()

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Photo ID required' },
        { status: 400 }
      )
    }

    await prisma.photo.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Photo deleted successfully' })
  } catch (error) {
    console.error('Error deleting photo:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
