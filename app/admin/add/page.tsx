"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { motion, AnimatePresence } from "framer-motion"
import { Edit, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { usePlans } from "@/context/plans-context"
import PlanEditModal from "@/components/plan-edit-modal"
import type { Plan } from "@/data/plans"

export default function AdminAddPage() {
  const router = useRouter()
  const { plans, isLoading } = usePlans()
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  useEffect(() => {
    // Check admin authentication
    const adminAuth = Cookies.get("admin-auth")
    if (!adminAuth) {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogout = () => {
    Cookies.remove("admin-auth")
    router.push("/admin/login")
  }

  const handleEditPlan = (plan: Plan) => {
    setSelectedPlan(plan)
    setIsEditModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsEditModalOpen(false)
    setSelectedPlan(null)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, type: "spring", stiffness: 100 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Plans Management
            </h1>
            <p className="text-slate-600">Manage your pricing plans and features</p>
          </div>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
          >
            Logout
          </Button>
        </div>

        {/* Plans Section */}
        <div className="relative overflow-hidden">
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-10 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-200/20 rounded-full blur-xl"
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="relative z-10">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <Sparkles className="h-4 w-4" />
                Admin Panel
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Current Plans
                </span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Click the edit button on any plan to modify its details, pricing, and features.
              </p>
            </motion.div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="text-lg text-slate-600">Loading plans...</div>
              </div>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
              >
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    variants={item}
                    className={`relative group ${plan.popular ? "md:-mt-8" : ""}`}
                    onMouseEnter={() => setHoveredPlan(plan.id)}
                    onMouseLeave={() => setHoveredPlan(null)}
                    whileHover={{ y: -10 }}
                  >
                    {/* Popular Badge */}
                    {plan.badge && (
                      <motion.div
                        className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5 + index * 0.2, type: "spring", stiffness: 200 }}
                      >
                        <div
                          className={`bg-gradient-to-r ${plan.gradient} text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg`}
                        >
                          {plan.badge}
                        </div>
                      </motion.div>
                    )}

                    {/* Edit Button */}
                    <motion.div
                      className="absolute top-4 right-4 z-30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Button
                        onClick={() => handleEditPlan(plan)}
                        size="sm"
                        className="bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-white hover:text-blue-600 shadow-lg border border-slate-200"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </motion.div>

                    {/* Card */}
                    <motion.div
                      className={`relative bg-white rounded-3xl p-8 shadow-lg border-2 transition-all duration-300 overflow-hidden ${
                        plan.popular
                          ? "border-blue-200 shadow-blue-100/50"
                          : hoveredPlan === plan.id
                            ? "border-blue-200 shadow-xl"
                            : "border-slate-100 hover:border-slate-200"
                      } ${plan.popular ? "scale-105" : ""}`}
                      animate={{
                        boxShadow:
                          hoveredPlan === plan.id
                            ? "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                            : "0 10px 25px -3px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {/* Background Gradient */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 transition-opacity duration-300`}
                        animate={{
                          opacity: hoveredPlan === plan.id ? 0.05 : 0,
                        }}
                      />

                      {/* Icon */}
                      <motion.div
                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl mb-6 relative z-10`}
                        animate={{
                          rotate: hoveredPlan === plan.id ? 360 : 0,
                          scale: hoveredPlan === plan.id ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <plan.icon className="h-8 w-8 text-white" />
                      </motion.div>

                      {/* Plan Name */}
                      <h3 className="text-2xl font-bold text-slate-800 mb-2 relative z-10">{plan.name}</h3>
                      <p className="text-slate-600 mb-6 relative z-10">{plan.description}</p>

                      {/* Pricing */}
                      <div className="mb-8 relative z-10">
                        <div className="flex items-baseline gap-2">
                          {plan.originalPrice && (
                            <span className="text-lg text-slate-400 line-through">${plan.originalPrice}</span>
                          )}
                          <span className="text-4xl font-bold text-slate-800">${plan.price}</span>
                          <span className="text-slate-600">/{plan.duration}</span>
                        </div>
                        {plan.originalPrice && (
                          <motion.div
                            className="text-sm text-green-600 font-medium mt-1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                          >
                            Save ${plan.originalPrice - plan.price}/month
                          </motion.div>
                        )}
                      </div>

                      {/* Features */}
                      <div className="space-y-4 mb-8 relative z-10">
                        <AnimatePresence>
                          {plan.features.slice(0, 5).map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              className="flex items-start gap-3"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * featureIndex }}
                            >
                              <motion.div
                                className={`flex-shrink-0 w-5 h-5 bg-gradient-to-br ${plan.gradient} rounded-full flex items-center justify-center mt-0.5`}
                                whileHover={{ scale: 1.2 }}
                              >
                                <Check className="h-3 w-3 text-white" />
                              </motion.div>
                              <span className="text-slate-600 text-sm leading-relaxed">{feature}</span>
                            </motion.div>
                          ))}
                          {plan.features.length > 5 && (
                            <div className="text-sm text-slate-500 pl-8">+{plan.features.length - 5} more features</div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* CTA Button */}
                      <motion.div className="relative z-10" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          className={`w-full py-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                            plan.popular
                              ? `bg-gradient-to-r ${plan.gradient} hover:shadow-lg text-white`
                              : `border-2 border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:bg-slate-50`
                          }`}
                          size="lg"
                          disabled
                        >
                          {plan.buttonText}
                        </Button>
                      </motion.div>

                      {/* Hover Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl pointer-events-none"
                        animate={{
                          background:
                            hoveredPlan === plan.id
                              ? `linear-gradient(135deg, ${plan.gradient.includes("blue") ? "rgba(59, 130, 246, 0.1)" : plan.gradient.includes("purple") ? "rgba(147, 51, 234, 0.1)" : "rgba(245, 158, 11, 0.1)"}, transparent)`
                              : "transparent",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {selectedPlan && <PlanEditModal plan={selectedPlan} isOpen={isEditModalOpen} onClose={handleCloseModal} />}
    </div>
  )
}
