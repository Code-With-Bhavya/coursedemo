"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, BookOpen, Award, Star, Globe } from "lucide-react"

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "50,000+",
      label: "Active Students",
      description: "Learning and growing every day",
    },
    {
      icon: BookOpen,
      value: "200+",
      label: "Expert Courses",
      description: "Across multiple disciplines",
    },
    {
      icon: Award,
      value: "95%",
      label: "Success Rate",
      description: "Students achieve their goals",
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Average Rating",
      description: "From student reviews",
    },
    {
      icon: Globe,
      value: "150+",
      label: "Countries",
      description: "Students from around the world",
    },
    {
      icon: TrendingUp,
      value: "85%",
      label: "Career Growth",
      description: "Students report career advancement",
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
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Trusted by Learners Worldwide</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join thousands of successful students who have transformed their careers with our courses
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <stat.icon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-slate-700 mb-2">{stat.label}</div>
              <div className="text-sm text-slate-600">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
