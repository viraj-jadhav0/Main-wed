"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import { useApp } from "@/components/app-provider"
import { t } from "@/lib/translations"
import { cn } from "@/lib/utils"

interface Service {
  id?: number
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
  image: string
  duration: string
  basic_price: string
  standard_price: string
  premium_price: string
}

const tabs: { key: string; label: keyof typeof t.categories }[] = [
  { key: "events", label: "events" },
  { key: "pooja", label: "pooja" },
  { key: "sahitya", label: "sahitya" },
]

export function Services() {
  const { lang } = useApp()
  const [active, setActive] = useState<string>("pooja")
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services")
      const data = await response.json()
      setServices(data.services || [])
      setLoading(false)
    } catch (error) {
      console.error("Error fetching services:", error)
      setLoading(false)
    }
  }

  const getCategoryRoute = (category: string) => {
    if (category === "pooja") return "pooja"
    if (category === "events") return "events"
    if (category === "sahitya") return "sahitya"
    return "services"
  }

  const filtered = services.filter((s) => s.category === active)

  const getTitle = (service: Service) => lang === "en" ? service.title_en : lang === "mr" ? service.title_mr : service.title_hi
  const getShort = (service: Service) => lang === "en" ? service.short_en : lang === "mr" ? service.short_mr : service.short_hi

  return (
    <section id="services" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.categories.heading[lang]}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-muted-foreground">
            {t.categories.subheading[lang]}
          </p>
        </div>

        {/* Category toggle */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-border bg-secondary/50 p-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActive(tab.key)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold transition-all cursor-pointer",
                  active === tab.key
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.categories[tab.label][lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <Link
              key={s.slug}
              href={`/${getCategoryRoute(s.category)}/${s.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={s.image || "/placeholder.svg"}
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
      </div>
    </section>
  )
}
