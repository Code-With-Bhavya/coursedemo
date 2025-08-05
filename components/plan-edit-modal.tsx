"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Save, Loader2, Plus, Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Plan } from "@/types/plan"
import { usePlans } from "@/context/plans-context"

interface PlanEditModalProps {
  plan: Plan
  isOpen: boolean
  onClose: () => void
}

export default function PlanEditModal({ plan, isOpen, onClose }: PlanEditModalProps) {
  const { updatePlan } = usePlans()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Plan>(plan)
  const [newFeature, setNewFeature] = useState("")

  useEffect(() => {
    setFormData(plan)
  }, [plan])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "originalPrice" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  const handleCheckboxChange = (field: keyof Plan, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked,
    }))
  }

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }))
      setNewFeature("")
    }
  }

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await updatePlan( formData)
      toast({
        title: "Plan Updated",
        description: "Plan has been successfully updated!",
      })
      onClose()
    } catch (error) {
      console.error("Error updating plan:", error)
      toast({
        title: "Error",
        description: "Failed to update plan. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.8, opacity: 0, y: 20 },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Edit Plan</h2>
                <p className="text-slate-600">Update your {plan.name} plan details</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Plan Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="mt-1 h-20"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="originalPrice">Original Price ($)</Label>
                        <Input
                          id="originalPrice"
                          name="originalPrice"
                          type="number"
                          value={formData.originalPrice || ""}
                          onChange={handleInputChange}
                          className="mt-1"
                          placeholder="Optional"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="buttonText">Button Text</Label>
                        <Input
                          id="buttonText"
                          name="buttonText"
                          value={formData.buttonText}
                          onChange={handleInputChange}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="badge">Badge Text</Label>
                      <Input
                        id="badge"
                        name="badge"
                        value={formData.badge || ""}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Optional (e.g., BEST VALUE)"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="popular"
                        checked={formData.popular}
                        onCheckedChange={(checked) => handleCheckboxChange("popular", checked as boolean)}
                      />
                      <Label htmlFor="popular" className="cursor-pointer">
                        Mark as Popular Plan
                      </Label>
                    </div>
                  </div>

                  {/* Right Column - Features */}
                  <div className="space-y-4">
                    <div>
                      <Label>Plan Features</Label>
                      <div className="mt-2 space-y-3">
                        {formData.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <span className="flex-1 text-sm">{feature}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveFeature(index)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </div>

                      {/* Add Feature */}
                      <div className="mt-4 flex gap-2">
                        <Input
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          placeholder="Add new feature..."
                          className="flex-1"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              handleAddFeature()
                            }
                          }}
                        />
                        <Button type="button" onClick={handleAddFeature} variant="outline" size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Color and Gradient Info */}
                    <div className="p-4 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2">Plan Theme</h4>
                      <div className="space-y-2 text-sm text-slate-600">
                        <div>
                          Color: <span className="font-medium">{formData.color}</span>
                        </div>
                        <div>
                          Gradient: <span className="font-medium">{formData.gradient}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className={`w-4 h-4 bg-gradient-to-r ${formData.gradient} rounded`} />
                          <span>Preview</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
                  <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
