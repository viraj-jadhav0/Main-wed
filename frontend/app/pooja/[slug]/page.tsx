import { notFound } from "next/navigation"
import { ServiceDetail } from "@/components/service-detail"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

async function getServiceBySlug(slug: string) {
  try {
    const response = await fetch(`${API_URL}/api/services/slug/${slug}`, {
      cache: 'no-store'
    })
    const data = await response.json()
    if (!response.ok) return null
    return data.service
  } catch (error) {
    console.error('Error fetching service:', error)
    return null
  }
}

export default async function PoojaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) notFound()
  return <ServiceDetail service={service} />
}
