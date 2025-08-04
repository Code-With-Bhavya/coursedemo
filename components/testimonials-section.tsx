"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Developer",
      company: "Google",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "The web development course completely transformed my career. I went from a complete beginner to landing a job at Google in just 8 months!",
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      company: "Microsoft",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "The data science bootcamp was incredibly comprehensive. The instructors were knowledgeable and the projects were real-world applicable.",
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "Apple",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "I loved the UI/UX design course! The hands-on approach and feedback from instructors helped me build an amazing portfolio.",
    },
    {
      name: "David Kim",
      role: "Marketing Manager",
      company: "Netflix",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "The digital marketing course gave me practical skills I use every day. The ROI on this investment has been incredible.",
    },
    {
      name: "Lisa Thompson",
      role: "Product Manager",
      company: "Amazon",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Excellent course structure and amazing community support. I've recommended this platform to all my colleagues.",
    },
    {
      name: "James Wilson",
      role: "Blockchain Developer",
      company: "Coinbase",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "The blockchain development course was cutting-edge and practical. It opened up entirely new career opportunities for me.",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="testimonials" className="py-20 px-4 md:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">What Our Students Say</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our successful students have to say about their experience.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="relative mb-4">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-200" />
                <p className="text-slate-600 leading-relaxed pl-6">{testimonial.text}</p>
              </div>

              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">{testimonial.name}</div>
                  <div className="text-sm text-slate-600">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
