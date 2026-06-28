"use client"

import Link from "next/link"
import { Phone, Mail, Flower2, MapPin } from "lucide-react"
import { useApp } from "@/components/app-provider"
import { t } from "@/lib/translations"
import { useEffect, useState } from "react"

interface Service {
  _id: string
  slug: string
  category: string
  title_en: string
  title_mr: string
  title_hi: string
}

const categoryRoute: Record<string, string> = {
  events: "events",
  pooja: "pooja",
  sahitya: "sahitya",
}

export function Footer() {
  const { lang } = useApp()
  const year = new Date().getFullYear()
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services")
        const data = await response.json()
        setServices(data.services || [])
      } catch (error) {
        console.error("Error fetching services:", error)
      }
    }
    fetchServices()
  }, [])

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Flower2 className="size-5" />
              </span>
              <span className="font-heading text-lg font-bold text-foreground">
                Guruji<span className="text-primary">for</span>Pooja
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{t.footer.tagline[lang]}</p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
              {t.footer.services[lang]}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {services.slice(0, 4).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${categoryRoute[s.category]}/${s.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {lang === "en" ? s.title_en : lang === "mr" ? s.title_mr : s.title_hi}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
              {t.footer.links[lang]}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {[
                { href: "/services", label: t.nav.services[lang] },
                { href: "/why-us", label: t.nav.whyUs[lang] },
                { href: "/how-it-works", label: t.nav.howItWorks[lang] },
                { href: "/faq", label: t.nav.faq[lang] },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
              {t.footer.contact[lang]}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href="tel:9356273613"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="size-4 text-primary" />
                  9356273613
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@GurujiforPooja.com"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="size-4 text-primary" />
                  info@GurujiforPooja.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="size-4 text-primary" />
                Maharashtra, India
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
              {lang === "en" ? "Follow Us" : lang === "mr" ? "आम्हाला फॉलो करा" : "हमें फॉलो करें"}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href="https://www.instagram.com/guruji4pooja?igsh=MTBpcXJvYWtuNWhsbQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-primary">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/share/1DvZcLB3DT/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-primary">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/gurujiforpooja/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-primary">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          &copy; {year} GurujiforPooja. {t.footer.rights[lang]}
        </div>
      </div>
    </footer>
  )
}
