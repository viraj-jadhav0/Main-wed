import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/hero`)
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
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
    const response = await fetch(`${API_URL}/api/hero`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Error saving hero images:', error)
    return NextResponse.json(
      { error: 'Failed to save hero images' },
      { status: 500 }
    )
  }
}
