"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, Clock, Phone, Tag, Sparkles, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useApp } from "@/components/app-provider"
import { t } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface Service {
  _id?: string
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
  images: string[]
  duration: string
  basic_price: string
  basic_includes_en: string
  basic_includes_mr: string
  basic_includes_hi: string
  standard_price: string
  standard_includes_en: string
  standard_includes_mr: string
  standard_includes_hi: string
  premium_price: string
  premium_includes_en: string
  premium_includes_mr: string
  premium_includes_hi: string
  sahitya: Array<{ en: string; mr: string; hi: string }>
  muhurta?: string
}

interface Decoration {
  id: number
  name_en: string
  name_mr: string
  name_hi: string
  description_en: string
  description_mr: string
  description_hi: string
  price: string
  photos: string
}

export function ServiceDetail({ service }: { service: Service }) {
  const { lang } = useApp()
  const router = useRouter()
  const [decorations, setDecorations] = useState<Decoration[]>([])
  const [loadingDecorations, setLoadingDecorations] = useState(false)
  const [selectedDecorations, setSelectedDecorations] = useState<number[]>([])
  const [expandedImage, setExpandedImage] = useState<string | null>(null)
  const [selectedMuhurta, setSelectedMuhurta] = useState<string>("")

  useEffect(() => {
    if (service.category === "events" && service._id) {
      fetchDecorations()
    }
  }, [service.category, service._id])

  const fetchDecorations = async () => {
    if (!service._id) return
    setLoadingDecorations(true)
    try {
      const response = await fetch(`/api/decorations/service/${service._id}`)
      const data = await response.json()
      setDecorations(data.decorations || [])
    } catch (error) {
      console.error("Error fetching decorations:", error)
    } finally {
      setLoadingDecorations(false)
    }
  }

  const handleBookNow = (packageType: string, price: string) => {
    const title = lang === "en" ? service.title_en : lang === "mr" ? service.title_mr : service.title_hi
    const selectedDecoPrices = selectedDecorations.map(id => {
      const deco = decorations.find(d => d.id === id)
      return deco?.price || "0"
    })
    const totalDecorationPrice = selectedDecoPrices.join(',')
    router.push(`/book?service=${service.slug}&type=${service.category}&name=${encodeURIComponent(title)}&package=${packageType}&price=${encodeURIComponent(price)}&decorations=${selectedDecorations.join(',')}&decoPrices=${encodeURIComponent(totalDecorationPrice)}&muhurta=${encodeURIComponent(selectedMuhurta)}`)
  }

  const handleBookNowEvent = () => {
    const title = lang === "en" ? service.title_en : lang === "mr" ? service.title_mr : service.title_hi
    const selectedDecoPrices = selectedDecorations.map(id => {
      const deco = decorations.find(d => d.id === id)
      return deco?.price || "0"
    })
    const totalDecorationPrice = selectedDecoPrices.join(',')
    router.push(`/book?service=${service.slug}&type=${service.category}&name=${encodeURIComponent(title)}&package=base&price=0&decorations=${selectedDecorations.join(',')}&decoPrices=${encodeURIComponent(totalDecorationPrice)}&muhurta=${encodeURIComponent(selectedMuhurta)}`)
  }

  const toggleDecoration = (id: number) => {
    setSelectedDecorations(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    )
  }

  const handleImageClick = (e: React.MouseEvent, imageUrl: string) => {
    e.stopPropagation()
    setExpandedImage(imageUrl)
  }

  const closeExpandedImage = () => {
    setExpandedImage(null)
  }

  const calculateTotalDecorationPrice = () => {
    return selectedDecorations.reduce((total, id) => {
      const deco = decorations.find(d => d.id === id)
      const price = deco?.price.replace(/[^0-9]/g, '') || "0"
      return total + parseInt(price)
    }, 0)
  }

  const getTitle = () => lang === "en" ? service.title_en : lang === "mr" ? service.title_mr : service.title_hi
  const getDescription = () => lang === "en" ? service.description_en : lang === "mr" ? service.description_mr : service.description_hi
  const getIncludes = (includes: string) => includes.split(',').map(item => item.trim()).filter(item => item)
  const getBasicIncludes = () => getIncludes(lang === "en" ? service.basic_includes_en : lang === "mr" ? service.basic_includes_mr : service.basic_includes_hi)
  const getStandardIncludes = () => getIncludes(lang === "en" ? service.standard_includes_en : lang === "mr" ? service.standard_includes_mr : service.standard_includes_hi)
  const getPremiumIncludes = () => getIncludes(lang === "en" ? service.premium_includes_en : lang === "mr" ? service.premium_includes_mr : service.premium_includes_hi)
  const getSahitya = () => {
    return service.sahitya?.map(item => lang === "en" ? item.en : lang === "mr" ? item.mr : item.hi).filter(item => item) || []
  }
  const getDecorationName = (deco: Decoration) => lang === "en" ? deco.name_en : lang === "mr" ? deco.name_mr : deco.name_hi
  const getDecorationDescription = (deco: Decoration) => lang === "en" ? deco.description_en : lang === "mr" ? deco.description_mr : deco.description_hi
  const getDecorationPhotos = (deco: Decoration) => deco.photos.split(',').map(p => p.trim()).filter(p => p)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16 sm:pt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Link
            href="/#services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            {t.detail.back[lang]}
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-2">
            {/* Image / gallery */}
            <div>
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-border shadow-xl shadow-primary/10 cursor-pointer" onClick={(e) => handleImageClick(e, service.images[0] || "/placeholder.svg")}>
                <Image
                  src={service.images[0] || "/placeholder.svg"}
                  alt={getTitle()}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {service.images.length > 1 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {service.images.slice(1, 4).map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-square overflow-hidden rounded-2xl border border-border opacity-90 cursor-pointer"
                      onClick={(e) => handleImageClick(e, img)}
                    >
                      <Image
                        src={img || "/placeholder.svg"}
                        alt=""
                        aria-hidden
                        fill
                        sizes="20vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                {service.category}
              </span>
              <h1 className="mt-4 text-balance font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {getTitle()}
              </h1>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{getDescription()}</p>

              {/* Duration */}
              <div className="mt-6">
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3">
                  <Clock className="size-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t.detail.duration[lang]}</p>
                    <p className="font-heading text-lg font-bold text-foreground">{service.duration}</p>
                  </div>
                </div>
              </div>

              {service.muhurta && (
                <div className="mt-4">
                  <div className="rounded-2xl border border-border bg-card px-5 py-3">
                    <p className="text-xs text-muted-foreground">{lang === "en" ? "Select Muhurta" : lang === "mr" ? "मुहूर्त निवडा" : "मुहूर्त चुनें"}</p>
                    <select
                      value={selectedMuhurta}
                      onChange={(e) => setSelectedMuhurta(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                    >
                      <option value="">{lang === "en" ? "Select a muhurta" : lang === "mr" ? "मुहूर्त निवडा" : "मुहूर्त चुनें"}</option>
                      {service.muhurta.split(',').map((muhurta, i) => (
                        <option key={i} value={muhurta.trim()}>
                          {muhurta.trim()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Packages - Hide for events */}
              {service.category !== "events" && (
                <div className="mt-8 space-y-4">
                  <h2 className="font-heading text-lg font-bold text-foreground">{lang === "en" ? "Choose Package" : lang === "mr" ? "पॅकेज निवडा" : "पैकेज चुनें"}</h2>
                  
                  {/* Basic Package */}
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading text-lg font-bold text-foreground">{lang === "en" ? "Basic" : lang === "mr" ? "मूलभूत" : "बेसिक"}</h3>
                        <p className="font-heading text-2xl font-bold text-primary">{service.basic_price}</p>
                      </div>
                      <Button onClick={() => handleBookNow('basic', service.basic_price)}>
                        {t.bookNow[lang]}
                      </Button>
                    </div>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {getBasicIncludes().map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-foreground">
                          <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                            <Check className="size-3.5" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Standard Package */}
                  <div className="rounded-2xl border-2 border-primary bg-card p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading text-lg font-bold text-foreground">{lang === "en" ? "Standard" : lang === "mr" ? "मानक" : "स्टैंडर्ड"}</h3>
                        <p className="font-heading text-2xl font-bold text-primary">{service.standard_price}</p>
                      </div>
                      <Button onClick={() => handleBookNow('standard', service.standard_price)}>
                        {t.bookNow[lang]}
                      </Button>
                    </div>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {getStandardIncludes().map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-foreground">
                          <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                            <Check className="size-3.5" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Premium Package */}
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading text-lg font-bold text-foreground">{lang === "en" ? "Premium" : lang === "mr" ? "प्रीमियम" : "प्रीमियम"}</h3>
                        <p className="font-heading text-2xl font-bold text-primary">{service.premium_price}</p>
                      </div>
                      <Button onClick={() => handleBookNow('premium', service.premium_price)}>
                        {t.bookNow[lang]}
                      </Button>
                    </div>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {getPremiumIncludes().map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-foreground">
                          <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                            <Check className="size-3.5" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Sahitya */}
              {getSahitya().length > 0 && (
                <div className="mt-8">
                  <h2 className="font-heading text-lg font-bold text-foreground">{lang === "en" ? "Sahitya (Materials Provided)" : lang === "mr" ? "साहित्य (पुरवट सामग्री)" : "साहित्य (प्रदान सामग्री)"}</h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {getSahitya().map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-foreground">
                        <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                          <Check className="size-3.5" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Decorations (for events) */}
              {service.category === "events" && decorations.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="size-5 text-primary" />
                    {lang === "en" ? "Decoration Options" : lang === "mr" ? "सजावट पर्याय" : "सजावट विकल्प"}
                  </h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {decorations.map((deco) => (
                      <div 
                        key={deco.id} 
                        className={`rounded-2xl border bg-card p-4 cursor-pointer transition-all ${
                          selectedDecorations.includes(deco.id) 
                            ? "border-primary ring-2 ring-primary/20" 
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => toggleDecoration(deco.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          {getDecorationPhotos(deco).length > 0 && (
                            <div 
                              className="aspect-video overflow-hidden rounded-xl flex-1 mr-3 cursor-pointer"
                              onClick={(e) => handleImageClick(e, getDecorationPhotos(deco)[0])}
                            >
                              <Image
                                src={getDecorationPhotos(deco)[0]}
                                alt={getDecorationName(deco)}
                                width={400}
                                height={225}
                                className="h-full w-full object-cover hover:scale-105 transition-transform"
                              />
                            </div>
                          )}
                          <div className={`flex size-6 items-center justify-center rounded-full border-2 ${
                            selectedDecorations.includes(deco.id)
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border"
                          }`}>
                            {selectedDecorations.includes(deco.id) && (
                              <Check className="size-3.5" />
                            )}
                          </div>
                        </div>
                        <h3 className="font-heading text-base font-semibold text-foreground">{getDecorationName(deco)}</h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{getDecorationDescription(deco)}</p>
                        <p className="mt-2 font-heading text-lg font-bold text-primary">{deco.price}</p>
                      </div>
                    ))}
                  </div>
                  
                  {selectedDecorations.length > 0 && (
                    <div className="mt-6 rounded-2xl border border-primary bg-primary/5 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {lang === "en" ? "Selected Decorations:" : lang === "mr" ? "निवडलेली सजावट:" : "चयनित सजावट:"}
                          </p>
                          <p className="font-heading text-2xl font-bold text-primary">
                            ₹{calculateTotalDecorationPrice().toLocaleString()}
                          </p>
                        </div>
                        <Button onClick={handleBookNowEvent} size="lg" className="gap-2">
                          {t.bookNow[lang]}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <a
                href="tel:9309106750"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border/60 bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-secondary sm:w-auto"
              >
                <Phone className="size-4" />
                {lang === "en" && "Call"} {lang === "mr" && "कॉल करा"} {lang === "hi" && "कॉल करें"} — 9309106750
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Image Expansion Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeExpandedImage}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <Image
              src={expandedImage}
              alt="Expanded decoration"
              width={1200}
              height={800}
              className="max-h-[90vh] w-auto object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={closeExpandedImage}
              className="absolute -top-4 -right-4 flex size-10 items-center justify-center rounded-full bg-white text-foreground shadow-lg hover:bg-gray-100"
            >
              <X className="size-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
