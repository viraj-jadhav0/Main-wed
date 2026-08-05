"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useApp } from "@/components/app-provider"
import { t } from "@/lib/translations"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"

interface Service {
  _id?: string
  slug: string
  category: string
  title_en: string
  title_mr: string
  title_hi: string
  description_en: string
  description_mr: string
  description_hi: string
  short_en: string
  short_mr: string
  short_hi: string
  images?: string[]
  image?: string
}

export default function SearchPage() {
  const { lang } = useApp()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
        
        const response = await fetch("/api/services", { 
          signal: controller.signal,
          cache: 'no-store'
        })
        clearTimeout(timeoutId)
        
        if (!response.ok) throw new Error('Failed to fetch')
        
        const data = await response.json()
        setServices(data.services || [])
      } catch (error) {
        console.error("Error fetching services:", error)
        setServices([]) // Set empty array on error to prevent hanging
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  const filtered = services.filter((s) => {
    const searchLower = query.toLowerCase()
    const title = lang === "en" ? s.title_en : lang === "mr" ? s.title_mr : s.title_hi
    const description = lang === "en" ? s.description_en : lang === "mr" ? s.description_mr : s.description_hi
    const short = lang === "en" ? s.short_en : lang === "mr" ? s.short_mr : s.short_hi
    
    return (
      title.toLowerCase().includes(searchLower) ||
      description.toLowerCase().includes(searchLower) ||
      short.toLowerCase().includes(searchLower)
    )
  })

  const getCategoryRoute = (category: string) => {
    if (category === "pooja") return "pooja"
    if (category === "events") return "events"
    if (category === "sahitya") return "sahitya"
    return "services"
  }

  const getTitle = (service: Service) => lang === "en" ? service.title_en : lang === "mr" ? service.title_mr : service.title_hi
  const getShort = (service: Service) => lang === "en" ? service.short_en : lang === "mr" ? service.short_mr : service.short_hi

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {lang === "en" ? "Search Results" : lang === "mr" ? "शोध परिणाम" : "खोज परिणाम"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {lang === "en" ? `Showing ${filtered.length} results for "${query}"` : lang === "mr" ? `"${query}" साठी ${filtered.length} परिणाम` : `"${query}" के लिए ${filtered.length} परिणाम`}
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 animate-pulse rounded-3xl bg-muted" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">
              {lang === "en" ? "No services found matching your search." : lang === "mr" ? "तुमच्या शोधाशी जुळणारी कोणतीही सेवा सापडली नाही." : "आपकी खोज से मेल खाने वाली कोई सेवा नहीं मिली."}
            </p>
            <Link
              href="/services"
              className="mt-4 inline-flex items-center gap-2 text-primary hover:underline"
            >
              {lang === "en" ? "Browse all services" : lang === "mr" ? "सर्व सेवा पहा" : "सभी सेवाएं देखें"}
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <Link
                key={s.slug}
                href={`/${getCategoryRoute(s.category)}/${s.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.images?.[0] || s.image || "/placeholder.svg"}
                    alt={getTitle(s)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-lg font-bold text-foreground">{getTitle(s)}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{getShort(s)}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    {t.categories.viewDetails[lang]}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
