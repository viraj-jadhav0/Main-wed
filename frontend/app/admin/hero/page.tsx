"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useApp } from "@/components/app-provider"
import { ArrowLeft, Save, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminHeroPage() {
  const { lang } = useApp()
  const router = useRouter()
  const [admin, setAdmin] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [heroImages, setHeroImages] = useState({
    desktop_image: "",
    mobile_image: "",
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin")
    if (!storedAdmin) {
      router.push("/admin/login")
      return
    }
    setAdmin(JSON.parse(storedAdmin))
    fetchHeroImages()
  }, [router])

  const fetchHeroImages = async () => {
    try {
      const response = await fetch("/api/hero")
      const data = await response.json()
      if (data.heroImages) {
        setHeroImages({
          desktop_image: data.heroImages.desktop_image,
          mobile_image: data.heroImages.mobile_image,
        })
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching hero images:", error)
      setLoading(false)
    }
  }

  const handleImageUpload = (type: "desktop" | "mobile", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, this would upload to a server
      // For now, just use the file name as a placeholder
      const imageUrl = `/images/${file.name}`
      if (type === "desktop") {
        setHeroImages({ ...heroImages, desktop_image: imageUrl })
      } else {
        setHeroImages({ ...heroImages, mobile_image: imageUrl })
      }
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(heroImages),
      })
      if (response.ok) {
        alert(lang === "en" ? "Hero images saved successfully!" : lang === "mr" ? "हीरो प्रतिमा यशस्वीरित्या जतन झाली!" : "हीरो छवियां सफलतापूर्वक सहेजी गईं!")
      } else {
        alert(lang === "en" ? "Failed to save hero images" : lang === "mr" ? "हीरो प्रतिमा जतन करण्यात अयशस्वी" : "हीरो छवियां सहेजने में विफल")
      }
    } catch (error) {
      console.error("Error saving hero images:", error)
      alert(lang === "en" ? "Failed to save hero images" : lang === "mr" ? "हीरो प्रतिमा जतन करण्यात अयशस्वी" : "हीरो छवियां सहेजने में विफल")
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 pt-24">
          <div className="text-center">
            <div className="mx-auto size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8">
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4" />
              {lang === "en" && "Back to Dashboard"}
              {lang === "mr" && "डॅशबोर्डवर परत जा"}
              {lang === "hi" && "डैशबोर्ड पर वापस जाएं"}
            </button>
            <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              {lang === "en" && "Hero Section Images"}
              {lang === "mr" && "हीरो सेक्शन प्रतिमा"}
              {lang === "hi" && "हीरो सेक्शन छवियां"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {lang === "en" && "Update the hero section background images"}
              {lang === "mr" && "हीरो सेक्शन पार्श्वभूमी प्रतिमा अपडेट करा"}
              {lang === "hi" && "हीरो सेक्शन बैकग्राउंड छवियां अपडेट करें"}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-border/60 bg-card/50 p-6">
              <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
                {lang === "en" ? "Desktop Hero Image" : lang === "mr" ? "डेस्कटॉप हीरो प्रतिमा" : "डेस्कटॉप हीरो छवि"}
              </h2>
              {heroImages.desktop_image && (
                <div className="mb-4 aspect-video rounded-2xl border border-border/60 bg-secondary/50 overflow-hidden">
                  <img
                    src={heroImages.desktop_image}
                    alt="Desktop Hero"
                    className="h-full w-full object-cover"
                    onError={() => setHeroImages({ ...heroImages, desktop_image: "" })}
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-foreground">
                  {lang === "en" ? "Image URL" : lang === "mr" ? "प्रतिमा URL" : "छवि URL"}
                </label>
                <input
                  type="text"
                  value={heroImages.desktop_image}
                  onChange={(e) => setHeroImages({ ...heroImages, desktop_image: e.target.value })}
                  className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                  placeholder="/images/hero-desktop.jpg"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/50 p-6">
              <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
                {lang === "en" ? "Mobile Hero Image" : lang === "mr" ? "मोबाईल हीरो प्रतिमा" : "मोबाइल हीरो छवि"}
              </h2>
              {heroImages.mobile_image && (
                <div className="mb-4 aspect-video rounded-2xl border border-border/60 bg-secondary/50 overflow-hidden">
                  <img
                    src={heroImages.mobile_image}
                    alt="Mobile Hero"
                    className="h-full w-full object-cover"
                    onError={() => setHeroImages({ ...heroImages, mobile_image: "" })}
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-foreground">
                  {lang === "en" ? "Image URL" : lang === "mr" ? "प्रतिमा URL" : "छवि URL"}
                </label>
                <input
                  type="text"
                  value={heroImages.mobile_image}
                  onChange={(e) => setHeroImages({ ...heroImages, mobile_image: e.target.value })}
                  className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                  placeholder="/images/hero-mobile.jpg"
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
              <Save className="size-4" />
              {isSaving
                ? (lang === "en" ? "Saving..." : lang === "mr" ? "जतन करत आहे..." : "सहेज रहा हूँ...")
                : (lang === "en" ? "Save Changes" : lang === "mr" ? "बदल जतन करा" : "परिवर्तन सहेजें")}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
