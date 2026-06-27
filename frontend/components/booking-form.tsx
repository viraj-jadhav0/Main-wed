"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Phone, Mail, User, CheckCircle2, Loader2 } from "lucide-react"
import { useApp } from "@/components/app-provider"
import { t } from "@/lib/translations"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface BookingFormProps {
  serviceType: string
  serviceSlug: string
  serviceName: string
  serviceNameMr?: string
  serviceNameHi?: string
}

export function BookingForm({ serviceType, serviceSlug, serviceName, serviceNameMr, serviceNameHi }: BookingFormProps) {
  const { lang } = useApp()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferred_date: "",
    preferred_time: "",
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          service_type: serviceType,
          service_slug: serviceSlug,
          service_name: lang === "mr" ? (serviceNameMr || serviceName) : lang === "hi" ? (serviceNameHi || serviceName) : serviceName,
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          preferred_date: "",
          preferred_time: "",
          address: "",
          city: "",
          notes: "",
        })
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (isSuccess) {
    return (
      <div className="rounded-3xl border border-border/60 bg-card/50 p-8 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="mt-4 font-heading text-2xl font-bold text-foreground">
          {lang === "en" && "Booking Submitted!"}
          {lang === "mr" && "बुकिंग सादर केली!"}
          {lang === "hi" && "बुकिंग जमा हो गई!"}
        </h3>
        <p className="mt-2 text-muted-foreground">
          {lang === "en" && "We'll contact you shortly to confirm your booking."}
          {lang === "mr" && "आम्ही तुमची बुकिंग पुष्टी करण्यासाठी लवकरच संपर्क साधू."}
          {lang === "hi" && "हम आपकी बुकिंग की पुष्टि करने के लिए जल्द ही संपर्क करेंगे."}
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          className="mt-6"
        >
          {lang === "en" && "Book Another"}
          {lang === "mr" && "दुसरी बुक करा"}
          {lang === "hi" && "दूसरी बुक करें"}
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border/60 bg-card/50 p-8">
      <h3 className="font-heading text-2xl font-bold text-foreground">
        {lang === "en" && "Book This Service"}
        {lang === "mr" && "ही सेवा बुक करा"}
        {lang === "hi" && "यह सेवा बुक करें"}
      </h3>
      <p className="mt-2 text-muted-foreground">
        {lang === "en" && "Fill in the details below and we'll contact you to confirm."}
        {lang === "mr" && "खालील तपशील भरा आणि आम्ही पुष्टीसाठी संपर्क साधू."}
        {lang === "hi" && "नीचे दिए गए विवरण भरें और हम पुष्टि के लिए संपर्क करेंगे."}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-foreground">
              <User className="size-4 text-primary" />
              {lang === "en" && "Full Name"}
              {lang === "mr" && "पूर्ण नाव"}
              {lang === "hi" && "पूरा नाम"}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder={lang === "en" ? "Enter your name" : lang === "mr" ? "तुमचे नाव टाका" : "अपना नाम दर्ज करें"}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Phone className="size-4 text-primary" />
              {lang === "en" && "Phone Number"}
              {lang === "mr" && "फोन नंबर"}
              {lang === "hi" && "फोन नंबर"}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder={lang === "en" ? "Enter phone number" : lang === "mr" ? "फोन नंबर टाका" : "फोन नंबर दर्ज करें"}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Mail className="size-4 text-primary" />
            {lang === "en" && "Email Address"}
            {lang === "mr" && "ईमेल पत्ता"}
            {lang === "hi" && "ईमेल पता"}
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
  )
}
