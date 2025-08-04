"use client"

import { motion } from "framer-motion"
import { BookOpen, Users, Award, Clock, Globe, Headphones } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: BookOpen,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with years of real-world experience",
      color: "blue",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a thriving community of learners and get help when you need it",
      color: "indigo",
    },
    {
      icon: Award,
      title: "Certificates",
      description: "Earn recognized certificates to showcase your new skills to employers",
      color: "purple",
    },
    {
      icon: Clock,
      title: "Flexible Learning",
      description: "Study at your own pace with lifetime access to course materials",
      color: "green",
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Access courses from anywhere in the world, anytime you want",
      color: "orange",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Get help whenever you need it with our dedicated support team",
      color: "pink",
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
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Why Choose Our Platform?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We provide everything you need to succeed in your learning journey
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-lg transition-all duration-300 border border-slate-100"
              whileHover={{ y: -5 }}
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 bg-${feature.color}-100 rounded-xl mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
