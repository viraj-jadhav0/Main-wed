import { NextRequest, NextResponse } from 'next/server'
import { getHeroImages, upsertHeroImages } from '@/lib/db'

export async function GET() {
  try {
    const heroImages = getHeroImages()
    return NextResponse.json({ heroImages })
  } catch (error) {
    console.error('Error fetching hero images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hero images' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const heroImages = upsertHeroImages(body)
    return NextResponse.json({ heroImages }, { status: 201 })
  } catch (error) {
    console.error('Error saving hero images:', error)
    return NextResponse.json(
      { error: 'Failed to save hero images' },
      { status: 500 }
    )
  }
}
