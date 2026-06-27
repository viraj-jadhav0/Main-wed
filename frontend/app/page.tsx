import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { WhyUs } from "@/components/why-us"
import { HowItWorks } from "@/components/how-it-works"
import { Popular } from "@/components/popular"
import { Testimonials } from "@/components/testimonials"
import { CallToAction } from "@/components/call-to-action"
import { Faq } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <HowItWorks />
        <Popular />
        <Testimonials />
        <CallToAction />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
