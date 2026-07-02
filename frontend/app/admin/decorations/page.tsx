"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useApp } from "@/components/app-provider"
import { ArrowLeft, Save, Plus, Edit, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Decoration {
  _id?: string
  service_id: string
  name_en: string
  name_mr: string
  name_hi: string
  description_en: string
  description_mr: string
  description_hi: string
  price: string
  photos: string
}

interface Service {
  _id: string
  title_en: string
  title_mr: string
  title_hi: string
  category: string
}

export default function AdminDecorationsPage() {
  const { lang } = useApp()
  const router = useRouter()
  const [admin, setAdmin] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [decorations, setDecorations] = useState<Decoration[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingDecoration, setEditingDecoration] = useState<Decoration | null>(null)
  const [formData, setFormData] = useState<Decoration>({
    service_id: "",
    name_en: "",
    name_mr: "",
    name_hi: "",
    description_en: "",
    description_mr: "",
    description_hi: "",
    price: "",
    photos: "",
  })

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin")
    if (!storedAdmin) {
      router.push("/admin/login")
      return
    }
    setAdmin(JSON.parse(storedAdmin))
    fetchDecorations()
    fetchServices()
  }, [router])

  const fetchDecorations = async () => {
    try {
      const response = await fetch("/api/decorations")
      const data = await response.json()
      setDecorations(data.decorations || [])
      setLoading(false)
    } catch (error) {
      console.error("Error fetching decorations:", error)
      setLoading(false)
    }
  }

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services")
      const data = await response.json()
      setServices(data.services || [])
    } catch (error) {
      console.error("Error fetching services:", error)
    }
  }

  const handleEdit = (decoration: Decoration) => {
    setEditingDecoration(decoration)
    setFormData(decoration)
    setIsAdding(false)
  }

  const handleAdd = () => {
    setEditingDecoration(null)
    setFormData({
      service_id: "",
      name_en: "",
      name_mr: "",
      name_hi: "",
      description_en: "",
      description_mr: "",
      description_hi: "",
      price: "",
      photos: "",
    })
    setIsAdding(true)
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingDecoration(null)
    setFormData({
      service_id: "",
      name_en: "",
      name_mr: "",
      name_hi: "",
      description_en: "",
      description_mr: "",
      description_hi: "",
      price: "",
      photos: "",
    })
  }

  const handleSave = async () => {
    try {
      if (!formData.service_id) {
        alert("Please select a service")
        return
      }

      const url = editingDecoration ? `/api/decorations/${editingDecoration._id}` : "/api/decorations"
      const method = editingDecoration ? "PUT" : "POST"
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        fetchDecorations()
        handleCancel()
      } else {
        const errorData = await response.json()
        console.error("Failed to save decoration:", errorData)
        alert(`Failed to save decoration: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error("Error saving decoration:", error)
      alert("Failed to save decoration")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this decoration?")) return

    try {
      const response = await fetch(`/api/decorations/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchDecorations()
      } else {
        alert("Failed to delete decoration")
      }
    } catch (error) {
      console.error("Error deleting decoration:", error)
      alert("Failed to delete decoration")
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

  const getServiceName = (serviceId: string) => {
    const service = services.find((s) => s._id === serviceId)
    if (!service) return "Unknown Service"
    return lang === "en" ? service.title_en : lang === "mr" ? service.title_mr : service.title_hi
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
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
                {lang === "en" && "Manage Decorations"}
                {lang === "mr" && "सजावट व्यवस्थापन करा"}
                {lang === "hi" && "सजावट प्रबंधित करें"}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {lang === "en" && "Add, edit, or delete event decorations"}
                {lang === "mr" ? "कार्यक्रम सजावट जोडा, संपादित करा किंवा हटवा" : "इवेंट डेकोरेशन जोड़ें, संपादित करें या हटाएं"}
              </p>
            </div>
            <Button onClick={handleAdd} className="gap-2">
              <Plus className="size-4" />
              {lang === "en" && "Add Decoration"}
              {lang === "mr" ? "सजावट जोडा" : lang === "hi" ? "सजावट जोड़ें" : "Add Decoration"}
            </Button>
          </div>

          {(isAdding || editingDecoration) && (
            <div className="mb-8 rounded-3xl border border-border/60 bg-card/50 p-6">
              <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">
                {isAdding
                  ? (lang === "en" ? "Add New Decoration" : lang === "mr" ? "नवीन सजावट जोडा" : "नई सजावट जोड़ें")
                  : (lang === "en" ? "Edit Decoration" : lang === "mr" ? "सजावट संपादित करा" : "सजावट संपादित करें")}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Service" : lang === "mr" ? "सेवा" : "सेवा"}
                  </label>
                  <select
                    value={formData.service_id}
                    onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="">{lang === "en" ? "Select Service" : lang === "mr" ? "सेवा निवडा" : "सेवा चुनें"}</option>
                    {services.map((service) => (
                      <option key={service._id} value={service._id}>
                        {lang === "en" ? service.title_en : lang === "mr" ? service.title_mr : service.title_hi}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Name (English)" : lang === "mr" ? "नाव (इंग्रजी)" : "नाम (अंग्रेजी)"}
                  </label>
                  <input
                    type="text"
                    value={formData.name_en}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Name (Marathi)" : lang === "mr" ? "नाव (मराठी)" : "नाम (मराठी)"}
                  </label>
                  <input
                    type="text"
                    value={formData.name_mr}
                    onChange={(e) => setFormData({ ...formData, name_mr: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Name (Hindi)" : lang === "mr" ? "नाव (हिंदी)" : "नाम (हिंदी)"}
                  </label>
                  <input
                    type="text"
                    value={formData.name_hi}
                    onChange={(e) => setFormData({ ...formData, name_hi: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Price" : lang === "mr" ? "किंमत" : "कीमत"}
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    placeholder="₹10,000"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Description (English)" : lang === "mr" ? "वर्णन (इंग्रजी)" : "विवरण (अंग्रेजी)"}
                  </label>
                  <textarea
                    value={formData.description_en}
                    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Description (Marathi)" : lang === "mr" ? "वर्णन (मराठी)" : "विवरण (मराठी)"}
                  </label>
                  <textarea
                    value={formData.description_mr}
                    onChange={(e) => setFormData({ ...formData, description_mr: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Description (Hindi)" : lang === "mr" ? "वर्णन (हिंदी)" : "विवरण (हिंदी)"}
                  </label>
                  <textarea
                    value={formData.description_hi}
                    onChange={(e) => setFormData({ ...formData, description_hi: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Photos (comma-separated URLs)" : lang === "mr" ? "प्रतिमा (स्वल्प-विरामाने URL)" : "फ़ोटो (अल्पविराम से URL)"}
                  </label>
                  <input
                    type="text"
                    value={formData.photos}
                    onChange={(e) => setFormData({ ...formData, photos: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    placeholder="/images/deco1.jpg, /images/deco2.jpg"
                  />
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button onClick={handleSave} className="gap-2">
                  <Save className="size-4" />
                  {lang === "en" ? "Save" : lang === "mr" ? "जतन करा" : "सहेजें"}
                </Button>
                <Button onClick={handleCancel} variant="outline" className="gap-2">
                  <X className="size-4" />
                  {lang === "en" ? "Cancel" : lang === "mr" ? "रद्द करा" : "रद्द करें"}
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {decorations.map((decoration) => (
              <div key={decoration._id} className="rounded-3xl border border-border/60 bg-card/50 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                        {getServiceName(decoration.service_id)}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {lang === "en" ? decoration.name_en : lang === "mr" ? decoration.name_mr : decoration.name_hi}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {lang === "en" ? decoration.description_en : lang === "mr" ? decoration.description_mr : decoration.description_hi}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="font-medium text-foreground">{lang === "en" ? "Price:" : lang === "mr" ? "किंमत:" : "कीमत:"}</span>{" "}
                        <span className="text-muted-foreground">{decoration.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleEdit(decoration)} variant="outline" size="sm" className="gap-2">
                      <Edit className="size-4" />
                      {lang === "en" ? "Edit" : lang === "mr" ? "संपादित करा" : "संपादित करें"}
                    </Button>
                    <Button onClick={() => handleDelete(decoration._id!)} variant="destructive" size="sm" className="gap-2">
                      <Trash2 className="size-4" />
                      {lang === "en" ? "Delete" : lang === "mr" ? "हटवा" : "हटाएं"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
