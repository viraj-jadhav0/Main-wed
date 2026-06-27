import { NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/decorations`)
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Error fetching decorations:', error)
    return NextResponse.json({ error: 'Failed to fetch decorations' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const response = await fetch(`${API_URL}/api/decorations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Error creating decoration:', error)
    return NextResponse.json({ error: 'Failed to create decoration' }, { status: 500 })
  }
}
