import { NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const response = await fetch(`${API_URL}/api/decorations/${id}`)
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Error fetching decoration:', error)
    return NextResponse.json({ error: 'Failed to fetch decoration' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const response = await fetch(`${API_URL}/api/decorations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Error updating decoration:', error)
    return NextResponse.json({ error: 'Failed to update decoration' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const response = await fetch(`${API_URL}/api/decorations/${id}`, {
      method: 'DELETE',
    })
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Error deleting decoration:', error)
    return NextResponse.json({ error: 'Failed to delete decoration' }, { status: 500 })
  }
}
