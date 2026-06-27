import { notFound } from "next/navigation"
import { ServiceDetail } from "@/components/service-detail"
import { getServiceBySlug } from "@/lib/db"

export default async function PoojaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()
  return <ServiceDetail service={service} />
}
