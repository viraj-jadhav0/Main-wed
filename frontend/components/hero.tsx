"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { useApp } from "@/components/app-provider"
import { t } from "@/lib/translations"
import { cn } from "@/lib/utils"

const slides = [
  { src: "/images/hero-wide-pooja.png", alt: "Priest performing a sacred pooja ceremony" },
  { src: "/images/hero-wide-diya.png", alt: "Rows of glowing diya oil lamps" },
  { src: "/images/hero-wide-havan.png", alt: "Sacred havan fire ritual" },
  { src: "/images/hero-wide-temple.png", alt: "Ornate temple interior with garlands" },
]

export function Hero() {
  const { lang } = useApp()
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % slides.length), 4500)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
      {/* full-bleed slides */}
      {slides.map((s, i) => (
        <Image
          key={s.src}
          src={s.src || "/placeholder.svg"}
          alt={s.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className={cn(
            "object-cover transition-opacity duration-[1400ms] ease-in-out",
            i === active ? "opacity-100" : "opacity-0",
          )}
        />
      ))}

      {/* readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-black/30" />

      {/* rotating chakra glow */}
      <div className="pointer-events-none absolute right-6 top-24 size-28 sm:right-12 sm:size-40 lg:size-48">
        <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl" />
        <Image
          src="/images/chakra.png"
          alt=""
          aria-hidden
          width={200}
          height={200}
          className="animate-spin-slow drop-shadow-2xl"
        />
      </div>

      {/* content */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-4 sm:px-6">
        <div className="animate-fade-in max-w-2xl text-center sm:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
            <Sparkles className="size-4" />
            {t.hero.tagline[lang]}
          </span>
          <h1 className="mt-5 text-balance font-heading text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-7xl">
            {t.hero.heading[lang]}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/85 drop-shadow sm:mx-0 lg:text-lg">
            {t.hero.description[lang]}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
            <a
              href="#cta"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-xl active:translate-y-px sm:w-auto"
            >
              {t.hero.cta[lang]}
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#services"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:w-auto"
            >
              {t.hero.secondaryCta[lang]}
            </a>
          </div>
        </div>
      </div>

      {/* slide dots */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:left-auto sm:right-12 sm:translate-x-0">
        {slides.map((s, i) => (
          <button
            key={s.src}
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1}`}
            className={cn(
              "h-2 rounded-full transition-all",
              i === active ? "w-8 bg-primary" : "w-2 bg-white/60 hover:bg-white",
            )}
          />
        ))}
      </div>
    </section>
  )
}
