import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Faq } from "@/components/faq"
import { CallToAction } from "@/components/call-to-action"

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <Faq />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
