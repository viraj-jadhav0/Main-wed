import { NextRequest, NextResponse } from 'next/server'
import { getBookingsByUserId } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params
    const userIdNum = parseInt(userId)
    if (isNaN(userIdNum)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }
    
    const bookings = getBookingsByUserId(userIdNum)
    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Error fetching user bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
