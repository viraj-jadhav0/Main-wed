"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useApp } from "@/components/app-provider"
import { Calendar, Clock, MapPin, Phone, Mail, User, CheckCircle2, XCircle, Clock as Pending, Trash2, Filter, TrendingUp, Users, Calendar as CalendarIcon, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Booking {
  _id: string
  name: string
  email: string
  phone: string
  service_type: string
  service_slug: string
  service_name: string
  preferred_date: string
  preferred_time: string
  address: string
  city: string
  notes: string | null
  status: string
  created_at: string
  updated_at: string
}

interface BookingStats {
  total: number
  pending: number
  confirmed: number
  completed: number
  cancelled: number
}

export default function AdminBookingsPage() {
  const { lang } = useApp()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [stats, setStats] = useState<BookingStats>({ total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 })
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin")
    if (!storedAdmin) {
      router.push("/admin/login")
      return
    }
    fetchBookings()
  }, [router])

  useEffect(() => {
    if (filter === "all") {
      setFilteredBookings(bookings)
    } else {
      setFilteredBookings(bookings.filter(b => b.status === filter))
    }
  }, [filter, bookings])

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings")
      const data = await response.json()
      setBookings(data.bookings || [])
      setFilteredBookings(data.bookings || [])
      
      // Calculate stats
      const allBookings = data.bookings || []
      setStats({
        total: allBookings.length,
        pending: allBookings.filter((b: Booking) => b.status === "pending").length,
        confirmed: allBookings.filter((b: Booking) => b.status === "confirmed").length,
        completed: allBookings.filter((b: Booking) => b.status === "completed").length,
        cancelled: allBookings.filter((b: Booking) => b.status === "cancelled").length,
      })
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (response.ok) {
        fetchBookings()
      } else {
        const data = await response.json()
        alert(data.error || "Failed to update booking status")
      }
    } catch (error) {
      console.error("Error updating status:", error)
      alert("Failed to update booking status. Please try again.")
    }
  }

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        fetchBookings()
      }
    } catch (error) {
      console.error("Error deleting booking:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
      case "completed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
      default:
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="size-4" />
      case "cancelled":
        return <XCircle className="size-4" />
      case "completed":
        return <CheckCircle2 className="size-4" />
      default:
        return <Pending className="size-4" />
    }
  }

  const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: number; icon: any; color: string }) => (
    <div className="rounded-2xl border border-border/60 bg-card/50 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 font-heading text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className={cn("flex size-12 items-center justify-center rounded-xl", color)}>
          <Icon className="size-6" />
        </div>
      </div>
    </div>
  )

  const getStatTitle = (key: string): string => {
    const titles: Record<string, Record<string, string>> = {
      total: { en: "Total Bookings", mr: "एकूण बुकिंग", hi: "कुल बुकिंग" },
      pending: { en: "Pending", mr: "प्रलंबित", hi: "लंबित" },
      confirmed: { en: "Confirmed", mr: "पुष्टी झाले", hi: "पुष्टि" },
      completed: { en: "Completed", mr: "पूर्ण झाले", hi: "पूर्ण" },
      cancelled: { en: "Cancelled", mr: "रद्द केले", hi: "रद्द" },
    }
    return titles[key]?.[lang] || titles.total[lang]
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              {lang === "en" && "Admin Dashboard"}
              {lang === "mr" && "एडमिन डॅशबोर्ड"}
              {lang === "hi" && "एडमिन डैशबोर्ड"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {lang === "en" && "View and manage all service bookings"}
              {lang === "mr" && "सर्व सेवा बुकिंग पहा आणि व्यवस्थापन करा"}
              {lang === "hi" && "सभी सेवा बुकिंग देखें और प्रबंधित करें"}
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard
              title={getStatTitle("total")}
              value={stats.total}
              icon={CalendarIcon}
              color="bg-primary/10 text-primary"
            />
            <StatCard
              title={getStatTitle("pending")}
              value={stats.pending}
              icon={Pending}
              color="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
            />
            <StatCard
              title={getStatTitle("confirmed")}
              value={stats.confirmed}
              icon={CheckCircle}
              color="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
            />
            <StatCard
              title={getStatTitle("completed")}
              value={stats.completed}
              icon={CheckCircle2}
              color="bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
            />
            <StatCard
              title={getStatTitle("cancelled")}
              value={stats.cancelled}
              icon={XCircle}
              color="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
            />
          </div>

          {/* Filter */}
          <div className="mb-6 flex items-center gap-2">
            <Filter className="size-4 text-muted-foreground" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border border-border/60 bg-background/50 px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">{lang === "en" ? "All Status" : lang === "mr" ? "सर्व स्थिती" : "सभी स्थिति"}</option>
              <option value="pending">{lang === "en" ? "Pending" : lang === "mr" ? "प्रलंबित" : "लंबित"}</option>
              <option value="confirmed">{lang === "en" ? "Confirmed" : lang === "mr" ? "पुष्टी झाले" : "पुष्टि"}</option>
              <option value="completed">{lang === "en" ? "Completed" : lang === "mr" ? "पूर्ण झाले" : "पूर्ण"}</option>
              <option value="cancelled">{lang === "en" ? "Cancelled" : lang === "mr" ? "रद्द केले" : "रद्द"}</option>
            </select>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="mx-auto size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="mt-4 text-muted-foreground">
                  {lang === "en" && "Loading bookings..."}
                  {lang === "mr" && "बुकिंग लोड होत आहे..."}
                  {lang === "hi" && "बुकिंग लोड हो रही है..."}
                </p>
              </div>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="rounded-3xl border border-border/60 bg-card/50 p-12 text-center">
              <Calendar className="mx-auto size-16 text-muted-foreground/50" />
              <h3 className="mt-4 font-heading text-xl font-semibold text-foreground">
                {lang === "en" && "No bookings found"}
                {lang === "mr" && "बुकिंग सापडली नाहीत"}
                {lang === "hi" && "कोई बुकिंग नहीं मिली"}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {lang === "en" && "Bookings will appear here once customers submit them."}
                {lang === "mr" && "ग्राहक बुकिंग सादर केल्यावर ती येथे दिसतील."}
                {lang === "hi" && "ग्राहक बुकिंग जमा करने के बाद वे यहाँ दिखाई देंगी."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="rounded-3xl border border-border/60 bg-card/50 p-6 transition-all hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1 space-y-4">
                      {/* Header */}
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="font-heading text-lg font-semibold text-foreground">{booking.service_name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {lang === "en" && "Booking ID"} {lang === "mr" && "बुकिंग आयडी"} {lang === "hi" && "बुकिंग आईडी"}: #{booking._id}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                            getStatusColor(booking.status)
                          )}
                        >
                          {getStatusIcon(booking.status)}
                          {booking.status}
                        </span>
                      </div>

                      {/* Customer Info */}
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="size-4 text-primary" />
                          <span className="text-foreground">{booking.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="size-4 text-primary" />
                          <a href={`tel:${booking.phone}`} className="text-foreground hover:text-primary">
                            {booking.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="size-4 text-primary" />
                          <a href={`mailto:${booking.email}`} className="text-foreground hover:text-primary">
                            {booking.email}
                          </a>
                        </div>
                      </div>

                      {/* Schedule */}
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="size-4 text-primary" />
                          <span className="text-muted-foreground">
                            {new Date(booking.preferred_date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="size-4 text-primary" />
                          <span className="text-muted-foreground">{booking.preferred_time}</span>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="size-4 text-primary mt-0.5" />
                        <span className="text-muted-foreground">
                          {booking.address}, {booking.city}
                        </span>
                      </div>

                      {/* Notes */}
                      {booking.notes && (
                        <div className="rounded-xl bg-secondary/50 p-3 text-sm text-muted-foreground">
                          <strong className="text-foreground">
                            {lang === "en" && "Notes:"} {lang === "mr" && "टिप्पण्या:"} {lang === "hi" && "नोट्स:"}
                          </strong>{" "}
                          {booking.notes}
                        </div>
                      )}

                      {/* Timestamp */}
                      <p className="text-xs text-muted-foreground">
                        {lang === "en" && "Booked on"} {lang === "mr" && "बुक केले"} {lang === "hi" && "बुक किया गया"}{" "}
                        {new Date(booking.created_at).toLocaleString()}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 lg:min-w-[140px]">
                      {booking.status === "pending" && (
                        <>
                          <Button
                            onClick={() => updateStatus(booking._id, "confirmed")}
                            className="w-full"
                            size="sm"
                          >
                            {lang === "en" && "Confirm"} {lang === "mr" && "पुष्टी करा"} {lang === "hi" && "पुष्टि करें"}
                          </Button>
                          <Button
                            onClick={() => updateStatus(booking._id, "cancelled")}
                            variant="outline"
                            className="w-full"
                            size="sm"
                          >
                            {lang === "en" && "Cancel"} {lang === "mr" && "रद्द करा"} {lang === "hi" && "रद्द करें"}
                          </Button>
                        </>
                      )}
                      {booking.status === "confirmed" && (
                        <Button
                          onClick={() => updateStatus(booking._id, "completed")}
                          className="w-full"
                          size="sm"
                        >
                          {lang === "en" && "Mark Complete"} {lang === "mr" && "पूर्ण झाले"} {lang === "hi" && "पूर्ण चिह्नित करें"}
                        </Button>
                      )}
                      <Button
                        onClick={() => deleteBooking(booking._id)}
                        variant="destructive"
                        className="w-full"
                        size="sm"
                      >
                        <Trash2 className="mr-2 size-4" />
                        {lang === "en" && "Delete"} {lang === "mr" && "हटवा"} {lang === "hi" && "हटाएं"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
