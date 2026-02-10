import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticateRequest, unauthorizedResponse } from '@/lib/auth'

// GET all videos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    
    const videos = await prisma.video.findMany({
      where: {
        ...(category && category !== 'All' ? { category } : {}),
        ...(featured ? { featured: featured === 'true' } : {}),
        published: true,
      },
      orderBy: { date: 'desc' },
    })

    return NextResponse.json(videos)
  } catch (error) {
    console.error('Error fetching videos:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST create new video (protected)
export async function POST(request: NextRequest) {
  const auth = authenticateRequest(request)
  if (!auth) return unauthorizedResponse()

  try {
    const body = await request.json()
    const { title, description, category, videoUrl, thumbnailUrl, duration, location, date, featured, published } = body

    if (!title || !category || !videoUrl || !thumbnailUrl || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const video = await prisma.video.create({
      data: {
        title,
        description,
        category,
        videoUrl,
        thumbnailUrl,
        duration,
        location,
        date: new Date(date),
        featured: featured || false,
        published: published !== false,
      },
    })

    return NextResponse.json(video, { status: 201 })
  } catch (error) {
    console.error('Error creating video:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH update video (protected)
export async function PATCH(request: NextRequest) {
  const auth = authenticateRequest(request)
  if (!auth) return unauthorizedResponse()

  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Video ID required' },
        { status: 400 }
      )
    }

    if (data.date) {
      data.date = new Date(data.date)
    }

    const video = await prisma.video.update({
      where: { id },
      data,
    })

    return NextResponse.json(video)
  } catch (error) {
    console.error('Error updating video:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE video (protected)
export async function DELETE(request: NextRequest) {
  const auth = authenticateRequest(request)
  if (!auth) return unauthorizedResponse()

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Video ID required' },
        { status: 400 }
      )
    }

    await prisma.video.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Video deleted successfully' })
  } catch (error) {
    console.error('Error deleting video:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
