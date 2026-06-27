import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhyUs } from "@/components/why-us"
import { Testimonials } from "@/components/testimonials"
import { CallToAction } from "@/components/call-to-action"

export default function WhyUsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <WhyUs />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
