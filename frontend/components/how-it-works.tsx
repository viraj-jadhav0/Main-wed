"use client"

import { useApp } from "@/components/app-provider"
import { t } from "@/lib/translations"

export function HowItWorks() {
  const { lang } = useApp()
  return (
    <section id="how-it-works" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.howItWorks.heading[lang]}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-muted-foreground">{t.howItWorks.subheading[lang]}</p>
        </div>

        <div className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* connector line on large screens */}
          <div className="absolute left-0 right-0 top-7 hidden border-t-2 border-dashed border-primary/30 lg:block" />
          {t.howItWorks.steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 flex size-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-lg shadow-primary/25 ring-8 ring-background">
                {i + 1}
              </div>
              <h3 className="mt-5 font-heading text-lg font-bold text-foreground">{step.title[lang]}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{step.desc[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
