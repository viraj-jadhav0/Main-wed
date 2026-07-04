"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 600)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      {children}
    </div>
  )
}
