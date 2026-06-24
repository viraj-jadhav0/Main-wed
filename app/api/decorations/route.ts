import { NextResponse } from 'next/server'
import { getAllDecorations, createDecoration } from '@/lib/db'

export async function GET() {
  try {
    const decorations = getAllDecorations()
    return NextResponse.json({ decorations })
  } catch (error) {
    console.error('Error fetching decorations:', error)
    return NextResponse.json({ error: 'Failed to fetch decorations' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const decoration = createDecoration(body)
    return NextResponse.json({ decoration }, { status: 201 })
  } catch (error) {
    console.error('Error creating decoration:', error)
    return NextResponse.json({ error: 'Failed to create decoration' }, { status: 500 })
  }
}
