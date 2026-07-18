"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useApp } from "@/components/app-provider"
import { t } from "@/lib/translations"
import { useState, useEffect } from "react"

interface Service {
  _id?: string
  slug: string
  category: string
  title_en: string
  title_mr: string
  title_hi: string
  short_en: string
  short_mr: string
  short_hi: string
  images?: string[]
  image?: string
}

const popularSlugs = ["satyanarayan-pooja", "griha-pravesh", "rudra-abhishek"]

const categoryRoute: Record<string, string> = {
  events: "events",
  pooja: "pooja",
  sahitya: "sahitya",
}

export function Popular() {
  const { lang } = useApp()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services")
        const data = await response.json()
        setServices(data.services || [])
      } catch (error) {
        console.error("Error fetching services:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  const items = popularSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean) as Service[]

  const getTitle = (service: Service) => lang === "en" ? service.title_en : lang === "mr" ? service.title_mr : service.title_hi
  const getShort = (service: Service) => lang === "en" ? service.short_en : lang === "mr" ? service.short_mr : service.short_hi

  return (
    <section className="bg-secondary/40 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.popular.heading[lang]}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-muted-foreground">{t.popular.subheading[lang]}</p>
        </div>

        {loading ? (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 animate-pulse rounded-3xl bg-muted" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="mt-12 text-center text-muted-foreground">
            {lang === "en" ? "No popular services available." : lang === "mr" ? "लोकप्रिय सेवा उपलब्ध नाही." : "लोकप्रिय सेवाएं उपलब्ध नहीं हैं."}
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {items.map((s) => (
              <Link
                key={s.slug}
                href={`/${categoryRoute[s.category]}/${s.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-border shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={s.images?.[0] || s.image || "/placeholder.svg"}
                    alt={getTitle(s)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                    <h3 className="font-heading text-xl font-bold text-white">{getTitle(s)}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-white/80">{getShort(s)}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                      {t.categories.viewDetails[lang]}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
