"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useApp } from "@/components/app-provider"
import { Plus, Edit, Trash2, ArrowLeft, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Service {
  id?: number
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
  image: string
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
  sahitya_en: string
  sahitya_mr: string
  sahitya_hi: string
  muhurta?: string
}

export default function AdminServicesPage() {
  const { lang } = useApp()
  const router = useRouter()
  const [admin, setAdmin] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [serviceList, setServiceList] = useState<Service[]>([])
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState<Partial<Service>>({
    category: "pooja",
    title_en: "",
    title_mr: "",
    title_hi: "",
    description_en: "",
    description_mr: "",
    description_hi: "",
    short_en: "",
    short_mr: "",
    short_hi: "",
    image: "",
    duration: "",
    basic_price: "",
    basic_includes_en: "",
    basic_includes_mr: "",
    basic_includes_hi: "",
    standard_price: "",
    standard_includes_en: "",
    standard_includes_mr: "",
    standard_includes_hi: "",
    premium_price: "",
    premium_includes_en: "",
    premium_includes_mr: "",
    premium_includes_hi: "",
    sahitya_en: "",
    sahitya_mr: "",
    sahitya_hi: "",
    muhurta: "",
  })

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin")
    if (!storedAdmin) {
      router.push("/admin/login")
      return
    }
    setAdmin(JSON.parse(storedAdmin))
    fetchServices()
  }, [router])

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services")
      const data = await response.json()
      setServiceList(data.services || [])
      setLoading(false)
    } catch (error) {
      console.error("Error fetching services:", error)
      setLoading(false)
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData(service)
    setIsAdding(false)
  }

  const handleAdd = () => {
    setEditingService(null)
    setFormData({
      slug: "",
      category: "pooja",
      title_en: "",
      title_mr: "",
      title_hi: "",
      description_en: "",
      description_mr: "",
      description_hi: "",
      short_en: "",
      short_mr: "",
      short_hi: "",
      image: "",
      duration: "",
      basic_price: "",
      basic_includes_en: "",
      basic_includes_mr: "",
      basic_includes_hi: "",
      standard_price: "",
      standard_includes_en: "",
      standard_includes_mr: "",
      standard_includes_hi: "",
      premium_price: "",
      premium_includes_en: "",
      premium_includes_mr: "",
      premium_includes_hi: "",
      sahitya_en: "",
      sahitya_mr: "",
      sahitya_hi: "",
      muhurta: "",
    })
    setIsAdding(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        fetchServices()
      } else {
        alert("Failed to delete service")
      }
    } catch (error) {
      console.error("Error deleting service:", error)
      alert("Failed to delete service")
    }
  }

  const handleSave = async () => {
    try {
      // Generate slug from title if not provided
      const dataToSave = { ...formData }
      if (!dataToSave.slug && dataToSave.title_en) {
        dataToSave.slug = dataToSave.title_en
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      }

      if (isAdding) {
        const response = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSave),
        })
        if (response.ok) {
          fetchServices()
          setEditingService(null)
          setIsAdding(false)
        } else {
          const errorData = await response.json()
          console.error("Failed to create service:", errorData)
          alert(`Failed to create service: ${errorData.error || 'Unknown error'}`)
        }
      } else if (editingService?.id) {
        const response = await fetch(`/api/services/${editingService.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSave),
        })
        if (response.ok) {
          fetchServices()
          setEditingService(null)
          setIsAdding(false)
        } else {
          const errorData = await response.json()
          console.error("Failed to update service:", errorData)
          alert(`Failed to update service: ${errorData.error || 'Unknown error'}`)
        }
      }
    } catch (error) {
      console.error("Error saving service:", error)
      alert("Failed to save service")
    }
  }

  const handleCancel = () => {
    setEditingService(null)
    setIsAdding(false)
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
                onClick={() => router.push("/admin/dashboard")}
                className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="size-4" />
                {lang === "en" && "Back to Dashboard"}
                {lang === "mr" && "डॅशबोर्डवर परत जा"}
                {lang === "hi" && "डैशबोर्ड पर वापस जाएं"}
              </button>
              <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                {lang === "en" && "Manage Services"}
                {lang === "mr" && "सेवा व्यवस्थापन करा"}
                {lang === "hi" && "सेवाएं प्रबंधित करें"}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {lang === "en" && "Add, edit, or delete pooja, events, and sahitya services with packages"}
                {lang === "mr" && "पॅकेजसह पूजा, कार्यक्रम आणि साहित्य सेवा जोडा, संपादित करा किंवा हटवा"}
                {lang === "hi" && "पैकेज के साथ पूजा, कार्यक्रम और साहित्य सेवाएं जोड़ें, संपादित करें या हटाएं"}
              </p>
            </div>
            <Button
              onClick={handleAdd}
              className="gap-2"
            >
              <Plus className="size-4" />
              {lang === "en" && "Add Service"}
              {lang === "mr" ? "सेवा जोडा" : lang === "hi" ? "सेवा जोड़ें" : "Add Service"}
            </Button>
          </div>

          {(isAdding || editingService) && (
            <div className="mb-8 rounded-3xl border border-border/60 bg-card/50 p-6">
              <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">
                {isAdding
                  ? (lang === "en" ? "Add New Service" : lang === "mr" ? "नवीन सेवा जोडा" : "नई सेवा जोड़ें")
                  : (lang === "en" ? "Edit Service" : lang === "mr" ? "सेवा संपादित करा" : "सेवा संपादित करें")}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Category" : lang === "mr" ? "श्रेणी" : "श्रेणी"}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="pooja">Pooja</option>
                    <option value="events">Events</option>
                    <option value="sahitya">Sahitya</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Slug" : lang === "mr" ? "स्लग" : "स्लग"}
                  </label>
                  <input
                    type="text"
                    value={formData.slug || ""}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    placeholder="service-slug"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Title (English)" : lang === "mr" ? "शीर्षक (इंग्रजी)" : "शीर्षक (अंग्रेजी)"}
                  </label>
                  <input
                    type="text"
                    value={formData.title_en || ""}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Title (Marathi)" : lang === "mr" ? "शीर्षक (मराठी)" : "शीर्षक (मराठी)"}
                  </label>
                  <input
                    type="text"
                    value={formData.title_mr || ""}
                    onChange={(e) => setFormData({ ...formData, title_mr: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Title (Hindi)" : lang === "mr" ? "शीर्षक (हिंदी)" : "शीर्षक (हिंदी)"}
                  </label>
                  <input
                    type="text"
                    value={formData.title_hi || ""}
                    onChange={(e) => setFormData({ ...formData, title_hi: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Duration" : lang === "mr" ? "कालावधी" : "अवधि"}
                  </label>
                  <input
                    type="text"
                    value={formData.duration || ""}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    placeholder="2-3 hours"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Image URL" : lang === "mr" ? "प्रतिमा URL" : "छवि URL"}
                  </label>
                  <input
                    type="text"
                    value={formData.image || ""}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    placeholder="/images/service.jpg"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Muhurta (Optional)" : lang === "mr" ? "मुहूर्त (ऐच्छिक)" : "मुहूर्त (वैकल्पिक)"}
                  </label>
                  <input
                    type="text"
                    value={formData.muhurta || ""}
                    onChange={(e) => setFormData({ ...formData, muhurta: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    placeholder="e.g., Shubh Muhurta: 9:00 AM - 12:00 PM"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Short Description (English)" : lang === "mr" ? "थोडे वर्णन (इंग्रजी)" : "थोड़ा विवरण (अंग्रेजी)"}
                  </label>
                  <textarea
                    value={formData.short_en || ""}
                    onChange={(e) => setFormData({ ...formData, short_en: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    rows={2}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Short Description (Marathi)" : lang === "mr" ? "थोडे वर्णन (मराठी)" : "थोड़ा विवरण (मराठी)"}
                  </label>
                  <textarea
                    value={formData.short_mr || ""}
                    onChange={(e) => setFormData({ ...formData, short_mr: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    rows={2}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Short Description (Hindi)" : lang === "mr" ? "थोडे वर्णन (हिंदी)" : "थोड़ा विवरण (हिंदी)"}
                  </label>
                  <textarea
                    value={formData.short_hi || ""}
                    onChange={(e) => setFormData({ ...formData, short_hi: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    rows={2}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Description (English)" : lang === "mr" ? "वर्णन (इंग्रजी)" : "विवरण (अंग्रेजी)"}
                  </label>
                  <textarea
                    value={formData.description_en || ""}
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
                    value={formData.description_mr || ""}
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
                    value={formData.description_hi || ""}
                    onChange={(e) => setFormData({ ...formData, description_hi: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    rows={3}
                  />
                </div>
                
                <div className="md:col-span-2 border-t border-border/60 pt-4">
                  <h3 className="mb-4 font-heading text-lg font-semibold text-foreground">
                    {lang === "en" ? "Basic Package" : lang === "mr" ? "मूलभूत पॅकेज" : "बेसिक पैकेज"}
                  </h3>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Basic Price" : lang === "mr" ? "मूलभूत किंमत" : "बेसिक कीमत"}
                  </label>
                  <input
                    type="text"
                    value={formData.basic_price || ""}
                    onChange={(e) => setFormData({ ...formData, basic_price: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    placeholder="₹3,000"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Basic Includes (English)" : lang === "mr" ? "मूलभूत समाविष्टी (इंग्रजी)" : "बेसिक शामिल (अंग्रेजी)"}
                  </label>
                  <textarea
                    value={formData.basic_includes_en || ""}
                    onChange={(e) => setFormData({ ...formData, basic_includes_en: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    rows={2}
                    placeholder="Item 1, Item 2, Item 3"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Basic Includes (Marathi)" : lang === "mr" ? "मूलभूत समाविष्टी (मराठी)" : "बेसिक शामिल (मराठी)"}
                  </label>
                  <textarea
                    value={formData.basic_includes_mr || ""}
                    onChange={(e) => setFormData({ ...formData, basic_includes_mr: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    rows={2}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Basic Includes (Hindi)" : lang === "mr" ? "मूलभूत समाविष्टी (हिंदी)" : "बेसिक शामिल (हिंदी)"}
                  </label>
                  <textarea
                    value={formData.basic_includes_hi || ""}
                    onChange={(e) => setFormData({ ...formData, basic_includes_hi: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    rows={2}
                  />
                </div>

                <div className="md:col-span-2 border-t border-border/60 pt-4">
                  <h3 className="mb-4 font-heading text-lg font-semibold text-foreground">
                    {lang === "en" ? "Standard Package" : lang === "mr" ? "मानक पॅकेज" : "स्टैंडर्ड पैकेज"}
                  </h3>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Standard Price" : lang === "mr" ? "मानक किंमत" : "स्टैंडर्ड कीमत"}
                  </label>
                  <input
                    type="text"
                    value={formData.standard_price || ""}
                    onChange={(e) => setFormData({ ...formData, standard_price: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    placeholder="₹5,000"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Standard Includes (English)" : lang === "mr" ? "मानक समाविष्टी (इंग्रजी)" : "स्टैंडर्ड शामिल (अंग्रेजी)"}
                  </label>
                  <textarea
                    value={formData.standard_includes_en || ""}
                    onChange={(e) => setFormData({ ...formData, standard_includes_en: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    rows={2}
                    placeholder="Item 1, Item 2, Item 3"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Standard Includes (Marathi)" : lang === "mr" ? "मानक समाविष्टी (मराठी)" : "स्टैंडर्ड शामिल (मराठी)"}
                  </label>
                  <textarea
                    value={formData.standard_includes_mr || ""}
                    onChange={(e) => setFormData({ ...formData, standard_includes_mr: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    rows={2}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Standard Includes (Hindi)" : lang === "mr" ? "मानक समाविष्टी (हिंदी)" : "स्टैंडर्ड शामिल (हिंदी)"}
                  </label>
                  <textarea
                    value={formData.standard_includes_hi || ""}
                    onChange={(e) => setFormData({ ...formData, standard_includes_hi: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    rows={2}
                  />
                </div>

                <div className="md:col-span-2 border-t border-border/60 pt-4">
                  <h3 className="mb-4 font-heading text-lg font-semibold text-foreground">
                    {lang === "en" ? "Premium Package" : lang === "mr" ? "प्रीमियम पॅकेज" : "प्रीमियम पैकेज"}
                  </h3>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Premium Price" : lang === "mr" ? "प्रीमियम किंमत" : "प्रीमियम कीमत"}
                  </label>
                  <input
                    type="text"
                    value={formData.premium_price || ""}
                    onChange={(e) => setFormData({ ...formData, premium_price: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    placeholder="₹8,000"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Premium Includes (English)" : lang === "mr" ? "प्रीमियम समाविष्टी (इंग्रजी)" : "प्रीमियम शामिल (अंग्रेजी)"}
                  </label>
                  <textarea
                    value={formData.premium_includes_en || ""}
                    onChange={(e) => setFormData({ ...formData, premium_includes_en: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    rows={2}
                    placeholder="Item 1, Item 2, Item 3"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Premium Includes (Marathi)" : lang === "mr" ? "प्रीमियम समाविष्टी (मराठी)" : "प्रीमियम शामिल (मराठी)"}
                  </label>
                  <textarea
                    value={formData.premium_includes_mr || ""}
                    onChange={(e) => setFormData({ ...formData, premium_includes_mr: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    rows={2}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Premium Includes (Hindi)" : lang === "mr" ? "प्रीमियम समाविष्टी (हिंदी)" : "प्रीमियम शामिल (हिंदी)"}
                  </label>
                  <textarea
                    value={formData.premium_includes_hi || ""}
                    onChange={(e) => setFormData({ ...formData, premium_includes_hi: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    rows={2}
                  />
                </div>

                <div className="md:col-span-2 border-t border-border/60 pt-4">
                  <h3 className="mb-4 font-heading text-lg font-semibold text-foreground">
                    {lang === "en" ? "Sahitya (Materials Provided)" : lang === "mr" ? "साहित्य (पुरवट सामग्री)" : "साहित्य (प्रदान सामग्री)"}
                  </h3>
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Sahitya (English)" : lang === "mr" ? "साहित्य (इंग्रजी)" : "साहित्य (अंग्रेजी)"}
                  </label>
                  <textarea
                    value={formData.sahitya_en || ""}
                    onChange={(e) => setFormData({ ...formData, sahitya_en: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    rows={2}
                    placeholder="Item 1, Item 2, Item 3"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Sahitya (Marathi)" : lang === "mr" ? "साहित्य (मराठी)" : "साहित्य (मराठी)"}
                  </label>
                  <textarea
                    value={formData.sahitya_mr || ""}
                    onChange={(e) => setFormData({ ...formData, sahitya_mr: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    rows={2}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Sahitya (Hindi)" : lang === "mr" ? "साहित्य (हिंदी)" : "साहित्य (हिंदी)"}
                  </label>
                  <textarea
                    value={formData.sahitya_hi || ""}
                    onChange={(e) => setFormData({ ...formData, sahitya_hi: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    rows={2}
                  />
                </div>

                <div className="md:col-span-2 border-t border-border/60 pt-4">
                  <h3 className="mb-4 font-heading text-lg font-semibold text-foreground">
                    {lang === "en" ? "Muhurta (Recommended Auspicious Times)" : lang === "mr" ? "मुहूर्त (शुभ वेळ)" : "मुहूर्त (शुभ समय)"}
                  </h3>
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {lang === "en" ? "Muhurta Options (comma-separated)" : lang === "mr" ? "मुहूर्त पर्याय (स्वल्प-विरामाने)" : "मुहूर्त विकल्प (अल्पविराम से)"}
                  </label>
                  <textarea
                    value={formData.muhurta || ""}
                    onChange={(e) => setFormData({ ...formData, muhurta: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                    rows={3}
                    placeholder="Jan 15, 2025 10:00 AM, Jan 16, 2025 9:30 AM, Jan 17, 2025 11:00 AM"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {lang === "en" ? "Enter multiple muhurta options separated by commas" : lang === "mr" ? "स्वल्प-विरामाने वेगवेगळे मुहूर्त पर्याय टाका" : "अल्पविराम से अलग-अलग मुहूर्त विकल्प दर्ज करें"}
                  </p>
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
            {serviceList.map((service) => (
              <div
                key={service.id}
                className="rounded-3xl border border-border/60 bg-card/50 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                        {service.category}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {lang === "en" ? service.title_en : lang === "mr" ? service.title_mr : service.title_hi}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {lang === "en" ? service.short_en : lang === "mr" ? service.short_mr : service.short_hi}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="font-medium text-foreground">{lang === "en" ? "Basic:" : lang === "mr" ? "मूलभूत:" : "बेसिक:"}</span>{" "}
                        <span className="text-muted-foreground">{service.basic_price}</span>
                      </div>
                      <div>
                        <span className="font-medium text-foreground">{lang === "en" ? "Standard:" : lang === "mr" ? "मानक:" : "स्टैंडर्ड:"}</span>{" "}
                        <span className="text-muted-foreground">{service.standard_price}</span>
                      </div>
                      <div>
                        <span className="font-medium text-foreground">{lang === "en" ? "Premium:" : lang === "mr" ? "प्रीमियम:" : "प्रीमियम:"}</span>{" "}
                        <span className="text-muted-foreground">{service.premium_price}</span>
                      </div>
                      {service.muhurta && (
                        <div>
                          <span className="font-medium text-foreground">{lang === "en" ? "Muhurta:" : lang === "mr" ? "मुहूर्त:" : "मुहूर्त:"}</span>{" "}
                          <span className="text-muted-foreground">{service.muhurta}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(service)}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Edit className="size-4" />
                      {lang === "en" ? "Edit" : lang === "mr" ? "संपादित करा" : "संपादित करें"}
                    </Button>
                    <Button
                      onClick={() => handleDelete(service.id!)}
                      variant="destructive"
                      size="sm"
                      className="gap-2"
                    >
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
