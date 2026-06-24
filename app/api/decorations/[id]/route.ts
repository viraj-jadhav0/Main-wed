import { NextResponse } from 'next/server'
import { getDecorationById, updateDecoration, deleteDecoration } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const decoration = getDecorationById(parseInt(id))
    if (!decoration) {
      return NextResponse.json({ error: 'Decoration not found' }, { status: 404 })
    }
    return NextResponse.json({ decoration })
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
    const success = updateDecoration(parseInt(id), body)
    if (!success) {
      return NextResponse.json({ error: 'Decoration not found' }, { status: 404 })
    }
    const decoration = getDecorationById(parseInt(id))
    return NextResponse.json({ decoration })
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
    const success = deleteDecoration(parseInt(id))
    if (!success) {
      return NextResponse.json({ error: 'Decoration not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting decoration:', error)
    return NextResponse.json({ error: 'Failed to delete decoration' }, { status: 500 })
  }
}
