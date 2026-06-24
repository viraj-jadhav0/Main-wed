"use client"

import Image from "next/image"
import { Phone, ArrowRight } from "lucide-react"
import { useApp } from "@/components/app-provider"
import { t } from "@/lib/translations"

export function CallToAction() {
  const { lang } = useApp()
  return (
    <section id="cta" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/20 bg-primary px-6 py-14 text-center shadow-2xl shadow-primary/20 sm:px-12">
          {/* rotating chakra accents */}
          <div className="pointer-events-none absolute -left-10 -top-10 size-40 opacity-20">
            <Image src="/images/chakra.png" alt="" aria-hidden width={160} height={160} className="animate-spin-slow" />
          </div>
          <div className="pointer-events-none absolute -bottom-12 -right-8 size-44 opacity-20">
            <Image src="/images/chakra.png" alt="" aria-hidden width={176} height={176} className="animate-spin-slow" />
          </div>

          <div className="relative">
            <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              {t.cta.heading[lang]}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/90">
              {t.cta.desc[lang]}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="tel:9356273613"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-lg transition-all hover:bg-card active:translate-y-px sm:w-auto"
              >
                <Phone className="size-4 text-primary" />
                {t.cta.call[lang]}
              </a>
              <a
                href="/services"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10 sm:w-auto"
              >
                {t.cta.button[lang]}
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
