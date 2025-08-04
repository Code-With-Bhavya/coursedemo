"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import WhyChooseUsSection from "@/components/why-choose-us-section"
import AboutUsSection from "@/components/about-us-section"
import PlansSection from "@/components/plans-section"
import ContactSection from "@/components/contact-section"


export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 overflow-x-hidden">
      <Navigation />

      <AnimatePresence>
        {isLoaded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Hero />
            <WhyChooseUsSection />
            <AboutUsSection />
            <PlansSection />
            <ContactSection />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
