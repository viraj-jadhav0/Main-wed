"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useApp } from "@/components/app-provider"
import { t } from "@/lib/translations"
import { cn } from "@/lib/utils"

export function Faq() {
  const { lang } = useApp()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-24 bg-secondary/40 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.faq.heading[lang]}
          </h2>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-base font-semibold text-foreground">{item.q[lang]}</span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-primary transition-transform duration-300",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{item.a[lang]}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
