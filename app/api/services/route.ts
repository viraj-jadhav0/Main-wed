import { NextRequest, NextResponse } from 'next/server'
import { getAllServices, createService } from '@/lib/db'

export async function GET() {
  try {
    const services = getAllServices()
    return NextResponse.json({ services })
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const service = createService(body)
    return NextResponse.json({ service }, { status: 201 })
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    )
  }
}
