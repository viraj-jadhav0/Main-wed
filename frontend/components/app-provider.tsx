"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Language } from "@/lib/translations"

type Theme = "light" | "dark"

interface AppContextValue {
  lang: Language
  setLang: (l: Language) => void
  theme: Theme
  toggleTheme: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en")
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document !== "undefined" && document.documentElement.classList.contains("dark")) {
      return "dark"
    }
    return "light"
  })

  // hydrate from storage
  useEffect(() => {
    const savedLang = (typeof window !== "undefined" && localStorage.getItem("gfp-lang")) as Language | null
    const savedTheme = (typeof window !== "undefined" && localStorage.getItem("gfp-theme")) as Theme | null
    if (savedLang) setLangState(savedLang)
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    }
  }, [])

  // apply theme to <html>
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
    root.classList.toggle("light", theme === "light")
    localStorage.setItem("gfp-theme", theme)
  }, [theme])

  const setLang = (l: Language) => {
    setLangState(l)
    localStorage.setItem("gfp-lang", l)
  }

  const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"))

  return (
    <AppContext.Provider value={{ lang, setLang, theme, toggleTheme }}>{children}</AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
