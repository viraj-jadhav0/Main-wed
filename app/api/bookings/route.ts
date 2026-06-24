import { NextRequest, NextResponse } from 'next/server'
import { createBooking, getAllBookings, Booking } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const booking: Booking = {
      user_id: body.user_id,
      name: body.name,
      email: body.email,
      phone: body.phone,
      service_type: body.service_type,
      service_slug: body.service_slug,
      service_name: body.service_name,
      preferred_date: body.preferred_date,
      preferred_time: body.preferred_time,
      address: body.address,
      city: body.city,
      notes: body.notes,
    }
    
    // Basic validation
    if (!booking.name || !booking.email || !booking.phone || !booking.preferred_date || !booking.preferred_time || !booking.address || !booking.city) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const createdBooking = createBooking(booking)
    
    return NextResponse.json(
      { success: true, booking: createdBooking },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const bookings = getAllBookings()
    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
