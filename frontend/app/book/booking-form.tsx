"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useApp } from "@/components/app-provider"
import { Calendar, Clock, MapPin, Phone, Mail, User, Loader2, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function BookingForm() {
  const { lang } = useApp()
  const router = useRouter()
  const searchParams = useSearchParams()

  if (!searchParams) return null;

  const serviceSlug = searchParams.get('service') || ''
  const serviceType = searchParams.get('type') || ''
  const serviceName = searchParams.get('name') || ''
  const packageType = searchParams.get('package') || 'basic'
  const packagePrice = searchParams.get('price') || ''
  const decorations = searchParams.get('decorations') || ''
  const decoPrices = searchParams.get('decoPrices') || ''
  const muhurta = searchParams.get('muhurta') || ''
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    alternate_phone: "",
    preferred_date: "",
    preferred_time: "",
    preferred_muhurta: "",
    address: "",
    city: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          user_id: null,
          service_type: serviceType,
          service_slug: serviceSlug,
          service_name: serviceName,
          package_type: packageType,
          package_price: packagePrice,
          decorations: decorations,
          deco_prices: decoPrices,
          muhurta: muhurta,
        }),
      })

      if (response.ok) {
        alert(lang === "en" ? "Booking submitted successfully! We will contact you soon." : lang === "mr" ? "बुकिंग यशस्वीरित्या सादर केली! आम्ही लवकरच संपर्क साधू." : "बुकिंग सफलतापूर्वक जमा हो गई! हम जल्द ही संपर्क करेंगे।")
        router.push('/')
      } else {
        alert("Failed to submit booking. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting booking:", error)
      alert("Failed to submit booking. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateTotalPrice = () => {
    let total = 0
    if (packagePrice) {
      const price = packagePrice.replace(/[^0-9]/g, '')
      total += parseInt(price) || 0
    }
    if (decoPrices) {
      const prices = decoPrices.split(',')
      prices.forEach(price => {
        const num = price.replace(/[^0-9]/g, '')
        total += parseInt(num) || 0
      })
    }
    return total
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <Link
            href="/#services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            {lang === "en" && "Back to Services"}
            {lang === "mr" && "सेवांकडे परत"}
            {lang === "hi" && "सेवाओं पर वापस"}
          </Link>

          <div className="mt-6 rounded-3xl border border-border/60 bg-card/50 p-8">
            <h1 className="font-heading text-3xl font-bold text-foreground">
              {lang === "en" && "Book Your Service"}
              {lang === "mr" && "तुमची सेवा बुक करा"}
              {lang === "hi" && "अपनी सेवा बुक करें"}
            </h1>
            
            {serviceName && (
              <div className="mt-2 rounded-xl bg-primary/10 px-4 py-2">
                <p className="text-sm font-medium text-primary">
                  {lang === "en" && "Service:"} {lang === "mr" && "सेवा:"} {lang === "hi" && "सेवा:"} {serviceName}
                </p>
              </div>
            )}

            <p className="mt-4 text-muted-foreground">
              {lang === "en" && "Fill in the details below and we'll contact you to confirm."}
              {lang === "mr" && "खालील तपशील भरा आणि आम्ही पुष्टीसाठी संपर्क साधू."}
              {lang === "hi" && "नीचे दिए गए विवरण भरें और हम पुष्टि के लिए संपर्क करेंगे."}
            </p>

            {packagePrice && (
              <div className="mt-4 rounded-xl bg-primary/10 px-4 py-2">
                <p className="text-sm font-medium text-primary">
                  {lang === "en" && "Package:"} {lang === "mr" ? "पॅकेज:" : "पैकेज:"} {packageType} - {packagePrice}
                </p>
              </div>
            )}

            {decorations && (
              <div className="mt-4 rounded-xl bg-primary/10 px-4 py-2">
                <p className="text-sm font-medium text-primary">
                  {lang === "en" ? "Selected Decorations:" : lang === "mr" ? "निवडलेली सजावट:" : "चयनित सजावट:"} {decorations.split(',').length}
                </p>
              </div>
            )}

            {(packagePrice || decoPrices) && (
              <div className="mt-4 rounded-xl border-2 border-primary bg-primary/5 px-4 py-3">
                <p className="text-sm font-medium text-primary">
                  {lang === "en" ? "Total Price:" : lang === "mr" ? "एकूण किंमत:" : "कुल कीमत:"} ₹{calculateTotalPrice().toLocaleString()}
                </p>
              </div>
            )}

            {muhurta && (
              <div className="mt-4 rounded-xl bg-primary/10 px-4 py-2">
                <p className="text-sm font-medium text-primary">
                  {lang === "en" ? "Selected Muhurta:" : lang === "mr" ? "निवडलेले मुहूर्त:" : "चयनित मुहूर्त:"} {muhurta}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <User className="size-4 text-primary" />
                    {lang === "en" && "Full Name"}
                    {lang === "mr" ? "पूर्ण नाव" : "पूरा नाम"}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder={lang === "en" ? "Enter your full name" : lang === "mr" ? "तुमचे पूर्ण नाव टाका" : "अपना पूरा नाम दर्ज करें"}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Mail className="size-4 text-primary" />
                    {lang === "en" && "Email"}
                    {lang === "mr" ? "ईमेल" : "ईमेल"}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder={lang === "en" ? "Enter your email" : lang === "mr" ? "तुमचा ईमेल टाका" : "अपना ईमेल दर्ज करें"}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Phone className="size-4 text-primary" />
                    {lang === "en" && "Phone Number"}
                    {lang === "mr" ? "फोन नंबर" : "फोन नंबर"}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder={lang === "en" ? "Enter your phone number" : lang === "mr" ? "तुमचा फोन नंबर टाका" : "अपना फोन नंबर दर्ज करें"}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="alternate_phone" className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Phone className="size-4 text-primary" />
                    {lang === "en" && "Alternate Phone (Optional)"}
                    {lang === "mr" ? "वैकल्पिक फोन (ऐच्छिक)" : "वैकल्पिक फोन (वैकल्पिक)"}
                  </label>
                  <input
                    type="tel"
                    id="alternate_phone"
                    name="alternate_phone"
                    value={formData.alternate_phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder={lang === "en" ? "Alternate phone number" : lang === "mr" ? "वैकल्पिक फोन नंबर" : "वैकल्पिक फोन नंबर"}
                  />
                </div>
              </div>

              {muhurta ? (
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Clock className="size-4 text-primary" />
                    {lang === "en" && "Select Muhurta"}
                    {lang === "mr" && "मुहूर्त निवडा"}
                    {lang === "hi" && "मुहूर्त चुनें"}
                  </label>
                  <select
                    name="preferred_muhurta"
                    required
                    value={formData.preferred_muhurta || ""}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">{lang === "en" ? "Select a muhurta" : lang === "mr" ? "मुहूर्त निवडा" : "मुहूर्त चुनें"}</option>
                    {muhurta.split(',').map((m, index) => (
                      <option key={index} value={m.trim()}>{m.trim()}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="preferred_date" className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Calendar className="size-4 text-primary" />
                      {lang === "en" && "Preferred Date"}
                      {lang === "mr" && "पसंतीची तारीख"}
                      {lang === "hi" && "पसंदीदा तिथि"}
                    </label>
                    <input
                      type="date"
                      id="preferred_date"
                      name="preferred_date"
                      required
                      value={formData.preferred_date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="preferred_time" className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Clock className="size-4 text-primary" />
                      {lang === "en" && "Preferred Time"}
                      {lang === "mr" && "पसंतीचा वेळ"}
                      {lang === "hi" && "पसंदीदा समय"}
                    </label>
                    <input
                      type="time"
                      id="preferred_time"
                      name="preferred_time"
                      required
                      value={formData.preferred_time}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="address" className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <MapPin className="size-4 text-primary" />
                  {lang === "en" && "Address"}
                  {lang === "mr" && "पत्ता"}
                  {lang === "hi" && "पता"}
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder={lang === "en" ? "Enter your address" : lang === "mr" ? "तुमचा पत्ता टाका" : "अपना पता दर्ज करें"}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="city" className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <MapPin className="size-4 text-primary" />
                  {lang === "en" && "City"}
                  {lang === "mr" && "शहर"}
                  {lang === "hi" && "शहर"}
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder={lang === "en" ? "Enter your city" : lang === "mr" ? "तुमचे शहर टाका" : "अपना शहर दर्ज करें"}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium text-foreground">
                  {lang === "en" && "Additional Notes (Optional)"}
                  {lang === "mr" && "अतिरिक्त टिप्पण्या (ऐच्छिक)"}
                  {lang === "hi" && "अतिरिक्त नोट्स (वैकल्पिक)"}
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder={lang === "en" ? "Any special requirements or notes" : lang === "mr" ? "कोणतेही विशेष आवश्यकता किंवा टिप्पण्या" : "कोई भी विशेष आवश्यकताएं या नोट्स"}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    {lang === "en" && "Submitting..."}
                    {lang === "mr" && "सादर करत आहे..."}
                    {lang === "hi" && "जमा कर रहे हैं..."}
                  </>
                ) : (
                  <>
                    {lang === "en" && "Submit Booking"}
                    {lang === "mr" && "बुकिंग सादर करा"}
                    {lang === "hi" && "बुकिंग जमा करें"}
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
