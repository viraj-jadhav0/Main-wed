"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Moon, Sun, Globe, Menu, X, Phone, Check } from "lucide-react"
import { useApp } from "@/components/app-provider"
import { languages, t } from "@/lib/translations"
import { cn } from "@/lib/utils"

export function Navbar() {
  const { lang, setLang, theme, toggleTheme } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  const navLinks = [
    { href: "/services", label: t.nav.services[lang] },
    { href: "/why-us", label: t.nav.whyUs[lang] },
    { href: "/how-it-works", label: t.nav.howItWorks[lang] },
    { href: "/about-us", label: t.nav.aboutUs[lang] },
    { href: "/faq", label: t.nav.faq[lang] },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-border/60 px-3 py-2 transition-all duration-300 sm:px-4",
          scrolled ? "glass shadow-lg shadow-primary/5" : "bg-background/40 backdrop-blur-md",
        )}
      >
        <Link href="/" className="flex items-center gap-2 pl-1" aria-label="GurujiforPooja home">
          <div className="relative size-12 overflow-hidden rounded-full bg-primary/10">
            <Image
              src="/images/logo.png"
              alt="GurujiforPooja Logo"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <span className="font-heading text-lg font-bold tracking-tight text-foreground">
            Guruji<span className="text-primary">for</span>Pooja
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          {/* Language selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1.5 rounded-full border border-border/70 bg-background/60 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label="Select language"
            >
              <Globe className="size-4 text-primary" />
              <span className="hidden sm:inline">{languages.find((x) => x.code === lang)?.native}</span>
            </button>
            {langOpen && (
              <div
                role="listbox"
                className="absolute right-0 mt-2 w-40 overflow-hidden rounded-2xl border border-border bg-popover p-1.5 shadow-xl shadow-primary/10"
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    role="option"
                    aria-selected={lang === l.code}
                    onClick={() => {
                      setLang(l.code)
                      setLangOpen(false)
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors hover:bg-secondary",
                      lang === l.code ? "font-semibold text-primary" : "text-foreground",
                    )}
                  >
                    <span>{l.native}</span>
                    {lang === l.code && <Check className="size-4" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/60 text-foreground transition-colors hover:bg-secondary"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          {/* Book Now */}
          <a
            href="#cta"
            className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 active:translate-y-px sm:flex"
          >
            <Phone className="size-4" />
            {t.bookNow[lang]}
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/60 text-foreground transition-colors hover:bg-secondary lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-border bg-popover p-3 shadow-xl shadow-primary/10 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors hover:bg-secondary text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="#cta"
              onClick={() => setMobileOpen(false)}
              className="mt-1 flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Phone className="size-4" />
              {t.bookNow[lang]}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
