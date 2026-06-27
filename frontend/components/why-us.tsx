"use client"

import { ShieldCheck, BookOpen, Home, BadgeIndianRupee } from "lucide-react"
import { useApp } from "@/components/app-provider"
import { t } from "@/lib/translations"

const icons = [BookOpen, ShieldCheck, Home, BadgeIndianRupee]

export function WhyUs() {
  const { lang } = useApp()
  return (
    <section id="why-us" className="scroll-mt-24 bg-secondary/40 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.whyUs.heading[lang]}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-muted-foreground">{t.whyUs.subheading[lang]}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.whyUs.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <div
                key={i}
                className="group rounded-3xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/12 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-7" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-foreground">{item.title[lang]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc[lang]}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
