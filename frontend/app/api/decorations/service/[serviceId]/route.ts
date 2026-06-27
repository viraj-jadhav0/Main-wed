import { NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ serviceId: string }> }
) {
  try {
    const { serviceId } = await params
    const response = await fetch(`${API_URL}/api/decorations/service/${serviceId}`)
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Error fetching decorations by service:', error)
    return NextResponse.json({ error: 'Failed to fetch decorations' }, { status: 500 })
  }
}
