import { NextRequest, NextResponse } from 'next/server'
import { verifyUser } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify user
    const user = verifyUser(email, password)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Return user without password
    return NextResponse.json(
      { 
        success: true, 
        user: { id: user.id, name: user.name, email: user.email, phone: user.phone } 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error logging in:', error)
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    )
  }
}
