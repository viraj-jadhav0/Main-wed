import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Frontend API: Auth login request body:', body)
    
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
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
    nextResponse.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    nextResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    
    return nextResponse
  } catch (error) {
    console.error('Frontend API: Error logging in:', error)
    const errorResponse = NextResponse.json(
      { error: 'Failed to login', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
    errorResponse.headers.set('Access-Control-Allow-Origin', '*')
    return errorResponse
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 })
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  return response
}
