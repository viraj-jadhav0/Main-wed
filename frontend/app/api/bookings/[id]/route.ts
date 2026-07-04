import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log('Frontend API: Fetching booking by id:', id)
    
    const response = await fetch(`${API_URL}/api/bookings/${id}`, {
      cache: 'no-store',
    })
    
    console.log('Frontend API: Backend response status:', response.status)
    
    const text = await response.text()
    console.log('Frontend API: Backend response text:', text)
    
    let data
    try {
      data = JSON.parse(text)
    } catch (e) {
      console.error('Frontend API: Failed to parse JSON:', text)
      data = { error: 'Invalid response from server' }
    }
    
    console.log('Frontend API: Backend response data:', data)
    
    const nextResponse = NextResponse.json(data, { status: response.status })
    nextResponse.headers.set('Access-Control-Allow-Origin', '*')
    nextResponse.headers.set('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, OPTIONS')
    nextResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    
    return nextResponse
  } catch (error) {
    console.error('Frontend API: Error fetching booking:', error)
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch booking', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
    errorResponse.headers.set('Access-Control-Allow-Origin', '*')
    return errorResponse
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    console.log('Frontend API: Update booking request body:', { id, body })
    
    const response = await fetch(`${API_URL}/api/bookings/${id}/status`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    })
    
    console.log('Frontend API: Backend response status:', response.status)
    
    const text = await response.text()
    console.log('Frontend API: Backend response text:', text)
    
    let data
    try {
      data = JSON.parse(text)
    } catch (e) {
      console.error('Frontend API: Failed to parse JSON:', text)
      data = { error: 'Invalid response from server' }
    }
    
    console.log('Frontend API: Backend response data:', data)
    
    const nextResponse = NextResponse.json(data, { status: response.status })
    nextResponse.headers.set('Access-Control-Allow-Origin', '*')
    nextResponse.headers.set('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, OPTIONS')
    nextResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    
    return nextResponse
  } catch (error) {
    console.error('Frontend API: Error updating booking:', error)
    const errorResponse = NextResponse.json(
      { error: 'Failed to update booking', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
    errorResponse.headers.set('Access-Control-Allow-Origin', '*')
    return errorResponse
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log('Frontend API: Delete booking request:', id)
    
    const response = await fetch(`${API_URL}/api/bookings/${id}`, {
      method: 'DELETE',
      cache: 'no-store',
    })
    
    console.log('Frontend API: Backend response status:', response.status)
    
    const text = await response.text()
    console.log('Frontend API: Backend response text:', text)
    
    let data
    try {
      data = JSON.parse(text)
    } catch (e) {
      console.error('Frontend API: Failed to parse JSON:', text)
      data = { error: 'Invalid response from server' }
    }
    
    console.log('Frontend API: Backend response data:', data)
    
    const nextResponse = NextResponse.json(data, { status: response.status })
    nextResponse.headers.set('Access-Control-Allow-Origin', '*')
    nextResponse.headers.set('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, OPTIONS')
    nextResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    
    return nextResponse
  } catch (error) {
    console.error('Frontend API: Error deleting booking:', error)
    const errorResponse = NextResponse.json(
      { error: 'Failed to delete booking', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
    errorResponse.headers.set('Access-Control-Allow-Origin', '*')
    return errorResponse
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 })
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  return response
}
