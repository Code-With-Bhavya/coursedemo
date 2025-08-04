"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users } from "lucide-react"

export default function CTASection() {
  const handleGetStarted = () => {
    const coursesSection = document.getElementById("courses-section")
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of successful students who have already started their journey. Your future self will thank
            you for taking action today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              onClick={handleGetStarted}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 rounded-full text-lg font-medium shadow-lg transition-all duration-300"
              size="lg"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Start Learning Today
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-6 rounded-full text-lg font-medium bg-transparent"
              size="lg"
            >
              <Users className="h-5 w-5 mr-2" />
              Join Community
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-blue-100">
            <div className="text-center">
              <div className="text-2xl font-bold">30-Day</div>
              <div className="text-sm">Money Back Guarantee</div>
            </div>
            <div className="w-px h-12 bg-blue-400"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm">Expert Support</div>
            </div>
            <div className="w-px h-12 bg-blue-400"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">Lifetime</div>
              <div className="text-sm">Course Access</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
