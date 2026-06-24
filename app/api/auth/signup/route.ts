import { NextRequest, NextResponse } from 'next/server'
import { createUser, getUserByEmail, User } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, password } = body

    // Basic validation
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Create user
    const user: User = {
      name,
      email,
      phone,
      password, // In production, this should be hashed
    }

    const createdUser = createUser(user)

    return NextResponse.json(
      { success: true, user: { id: createdUser.id, name: createdUser.name, email: createdUser.email, phone: createdUser.phone } },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
