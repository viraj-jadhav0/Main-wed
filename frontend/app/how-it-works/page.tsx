import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HowItWorks } from "@/components/how-it-works"
import { CallToAction } from "@/components/call-to-action"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
