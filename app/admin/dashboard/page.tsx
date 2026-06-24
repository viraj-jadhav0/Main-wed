"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useApp } from "@/components/app-provider"
import { LayoutDashboard, Calendar, Settings, LogOut, Plus, Edit, Trash2, ArrowLeft, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminDashboardPage() {
  const { lang } = useApp()
  const router = useRouter()
  const [admin, setAdmin] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin")
    if (!storedAdmin) {
      router.push("/admin/login")
      return
    }
    setAdmin(JSON.parse(storedAdmin))
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin")
    router.push("/admin/login")
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
          <div className="mb-8 flex items-center justify-between">
            <div>
              <button
                onClick={() => router.push("/")}
                className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="size-4" />
                {lang === "en" && "Back to Home"}
                {lang === "mr" && "घर पर परत जा"}
                {lang === "hi" && "घर वापस जाएं"}
              </button>
              <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                {lang === "en" && "Admin Dashboard"}
                {lang === "mr" && "एडमिन डॅशबोर्ड"}
                {lang === "hi" && "एडमिन डैशबोर्ड"}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {lang === "en" && "Manage your pooja services and bookings"}
                {lang === "mr" && "आपली पूजा सेवा आणि बुकिंग व्यवस्थापन करा"}
                {lang === "hi" && "अपनी पूजा सेवाएं और बुकिंग प्रबंधित करें"}
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="gap-2"
            >
              <LogOut className="size-4" />
              {lang === "en" && "Logout"}
              {lang === "mr" && "लॉगआउट"}
              {lang === "hi" && "लॉगआउट"}
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div
              onClick={() => router.push("/admin/bookings")}
              className="cursor-pointer rounded-3xl border border-border/60 bg-card/50 p-6 transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Calendar className="size-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {lang === "en" && "Bookings"}
                    {lang === "mr" && "बुकिंग"}
                    {lang === "hi" && "बुकिंग"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {lang === "en" && "Manage service bookings"}
                    {lang === "mr" && "सेवा बुकिंग व्यवस्थापन करा"}
                    {lang === "hi" && "सेवा बुकिंग प्रबंधित करें"}
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => router.push("/admin/services")}
              className="cursor-pointer rounded-3xl border border-border/60 bg-card/50 p-6 transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Settings className="size-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {lang === "en" && "Services"}
                    {lang === "mr" && "सेवा"}
                    {lang === "hi" && "सेवाएं"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {lang === "en" && "Add, edit, or delete services"}
                    {lang === "mr" && "सेवा जोडा, संपादित करा किंवा हटवा"}
                    {lang === "hi" && "सेवाएं जोड़ें, संपादित करें या हटाएं"}
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => router.push("/admin/decorations")}
              className="cursor-pointer rounded-3xl border border-border/60 bg-card/50 p-6 transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="size-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {lang === "en" && "Decorations"}
                    {lang === "mr" && "सजावट"}
                    {lang === "hi" ? "सजावट" : "Decorations"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {lang === "en" && "Manage event decorations"}
                    {lang === "mr" ? "कार्यक्रम सजावट व्यवस्थापन करा" : "इवेंट डेकोरेशन प्रबंधित करें"}
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => router.push("/admin/hero")}
              className="cursor-pointer rounded-3xl border border-border/60 bg-card/50 p-6 transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <LayoutDashboard className="size-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {lang === "en" && "Hero Section"}
                    {lang === "mr" && "हीरो सेक्शन"}
                    {lang === "hi" && "हीरो सेक्शन"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {lang === "en" && "Update hero images"}
                    {lang === "mr" && "हीरो प्रतिमा अपडेट करा"}
                    {lang === "hi" && "हीरो छवियां अपडेट करें"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
