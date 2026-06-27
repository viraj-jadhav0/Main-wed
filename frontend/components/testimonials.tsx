"use client"

import { Star, Quote } from "lucide-react"
import { useApp } from "@/components/app-provider"
import { t } from "@/lib/translations"

export function Testimonials() {
  const { lang } = useApp()
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.testimonials.heading[lang]}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-muted-foreground">
            {t.testimonials.subheading[lang]}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.testimonials.items.map((item, i) => (
            <div
              key={i}
              className="relative flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-primary/10"
            >
              <Quote className="size-8 text-primary/25" />
              <div className="mt-2 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="size-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">{item.text[lang]}</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary/12 font-heading font-bold text-primary">
                  {item.name.charAt(0)}
                </span>
                <span className="font-semibold text-foreground">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
