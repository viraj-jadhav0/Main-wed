import { NextResponse } from 'next/server'
import { getDecorationsByServiceId } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ serviceId: string }> }
) {
  try {
    const { serviceId } = await params
    const decorations = getDecorationsByServiceId(parseInt(serviceId))
    return NextResponse.json({ decorations })
  } catch (error) {
    console.error('Error fetching decorations by service:', error)
    return NextResponse.json({ error: 'Failed to fetch decorations' }, { status: 500 })
  }
}
