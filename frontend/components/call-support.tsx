"use client"

import { Phone, X } from "lucide-react"
import { useState } from "react"
import { useApp } from "@/components/app-provider"
import { cn } from "@/lib/utils"

export function CallSupport() {
  const { lang } = useApp()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Call Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-primary/40 sm:bottom-8 sm:right-8 sm:size-16",
          isOpen && "rotate-45"
        )}
        aria-label="Call Support"
      >
        {isOpen ? <X className="size-6 sm:size-7" /> : <Phone className="size-6 sm:size-7" />}
      </button>

      {/* Call Support Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-72 overflow-hidden rounded-2xl border border-border bg-popover p-4 shadow-xl shadow-primary/10 sm:bottom-28 sm:right-8">
          <h3 className="font-heading text-lg font-bold text-foreground">
            {lang === "en" ? "Instant Call Support" : lang === "mr" ? "त्वरित कॉल सपोर्ट" : "त्वरित कॉल सहायता"}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {lang === "en" 
              ? "Need help? Call our customer care for instant assistance." 
              : lang === "mr" 
              ? "मदत हवी का? त्वरित सहायतेसाठी आमच्या ग्राहक सेवेला कॉल करा." 
              : "मदद चाहिए? तत्काल सहायता के लिए हमारी ग्राहक सेवा को कॉल करें."}
          </p>
          <a
            href="tel:9356273613"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Phone className="size-4" />
            9356273613
          </a>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            {lang === "en" ? "Available 24/7" : lang === "mr" ? "२४/७ उपलब्ध" : "२४/७ उपलब्ध"}
          </p>
        </div>
      )}
    </>
  )
}
