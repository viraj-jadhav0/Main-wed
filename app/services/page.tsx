import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Services } from "@/components/services"
import { CallToAction } from "@/components/call-to-action"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <Services />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
