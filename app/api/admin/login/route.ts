import { NextRequest, NextResponse } from 'next/server'

const ADMIN_USERNAME = 'zrf'
const ADMIN_PASSWORD = 'zrfviraj'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return NextResponse.json({ 
        success: true, 
        admin: { username: ADMIN_USERNAME }
      })
    }
    
    return NextResponse.json(
      { error: 'Invalid admin credentials' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    )
  }
}
