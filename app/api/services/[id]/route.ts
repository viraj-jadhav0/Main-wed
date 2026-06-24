import { NextRequest, NextResponse } from 'next/server'
import { getServiceById, updateService, deleteService } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const serviceId = parseInt(id)
    if (isNaN(serviceId)) {
      return NextResponse.json(
        { error: 'Invalid service ID' },
        { status: 400 }
      )
    }

    const service = getServiceById(serviceId)
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ service })
  } catch (error) {
    console.error('Error fetching service:', error)
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const serviceId = parseInt(id)
    if (isNaN(serviceId)) {
      return NextResponse.json(
        { error: 'Invalid service ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const updated = updateService(serviceId, body)
    if (!updated) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }

    const service = getServiceById(serviceId)
    return NextResponse.json({ service })
  } catch (error) {
    console.error('Error updating service:', error)
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const serviceId = parseInt(id)
    if (isNaN(serviceId)) {
      return NextResponse.json(
        { error: 'Invalid service ID' },
        { status: 400 }
      )
    }

    const deleted = deleteService(serviceId)
    if (!deleted) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting service:', error)
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    )
  }
}
