"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useApp } from "@/components/app-provider"
import { Lock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLoginPage() {
  const { lang } = useApp()
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("admin", JSON.stringify(data.admin))
        router.push("/admin/dashboard")
      } else {
        setError(data.error || "Login failed")
      }
    } catch (error) {
      setError("Failed to login. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 pt-24">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4" />
              {lang === "en" && "Back to Home"}
              {lang === "mr" && "घर पर परत जा"}
              {lang === "hi" && "घर वापस जाएं"}
            </button>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card/50 p-8">
            <div className="mb-6 flex justify-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Lock className="size-8" />
              </div>
            </div>

            <h1 className="mb-2 text-center font-heading text-2xl font-bold text-foreground">
              {lang === "en" && "Admin Login"}
              {lang === "mr" && "एडमिन लॉगिन"}
              {lang === "hi" && "एडमिन लॉगिन"}
            </h1>
            <p className="mb-6 text-center text-sm text-muted-foreground">
              {lang === "en" && "Enter your admin credentials to access the dashboard"}
              {lang === "mr" && "डॅशबोर्डमध्ये प्रवेश करण्यासाठी आपले एडमिन क्रेडेन्शियल्स प्रविष्ट करा"}
              {lang === "hi" && "डैशबोर्ड तक पहुंचने के लिए अपने एडमिन क्रेडेंशियल दर्ज करें"}
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  {lang === "en" && "Username"}
                  {lang === "mr" && "वापरकर्तानाव"}
                  {lang === "hi" && "उपयोगकर्ता नाम"}
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder={lang === "en" ? "Enter username" : lang === "mr" ? "वापरकर्तानाव प्रविष्ट करा" : "उपयोगकर्ता नाम दर्ज करें"}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  {lang === "en" && "Password"}
                  {lang === "mr" && "पासवर्ड"}
                  {lang === "hi" && "पासवर्ड"}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder={lang === "en" ? "Enter password" : lang === "mr" ? "पासवर्ड प्रविष्ट करा" : "पासवर्ड दर्ज करें"}
                  required
                />
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading
                  ? (lang === "en" ? "Logging in..." : lang === "mr" ? "लॉग इन होत आहे..." : "लॉग इन हो रहा है...")
                  : (lang === "en" ? "Login" : lang === "mr" ? "लॉग इन करा" : "लॉग इन करें")}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
