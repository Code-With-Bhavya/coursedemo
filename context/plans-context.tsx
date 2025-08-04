"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { plans as initialPlans} from "@/data/plans"
import { Plan } from "@/types/plan"

interface PlansContextType {
  plans: Plan[]
  updatePlan: (planId: string, updatedPlan: Partial<Plan>) => void
  refreshPlans: () => void
  isLoading: boolean
}

const PlansContext = createContext<PlansContextType | undefined>(undefined)

export function PlansProvider({ children }: { children: React.ReactNode }) {
  const [plans, setPlans] = useState<Plan[]>(initialPlans)
  const [isLoading, setIsLoading] = useState(false)

  // Function to fetch plans from database (you'll implement this)
  const fetchPlansFromDB = async () => {
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/get_plans')
      // const data = await response.json()
      // if (data.success) {
      //   setPlans(data.plans)
      // }

      // For now, using initial plans
      setPlans(initialPlans)
    } catch (error) {
      console.error("Error fetching plans:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to save plan to database (you'll implement this)
  const savePlanToDB = async (planId: string, planData: Partial<Plan>) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/update_plan', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ id: planId, ...planData })
      // })
      // const data = await response.json()
      // return data.success

      console.log("Saving plan to DB:", { planId, planData })
      return true // Placeholder return
    } catch (error) {
      console.error("Error saving plan:", error)
      return false
    }
  }

  const updatePlan = async (planId: string, updatedPlan: Partial<Plan>) => {
    // Update local state immediately for optimistic updates
    setPlans((prevPlans) => prevPlans.map((plan) => (plan.id === planId ? { ...plan, ...updatedPlan } : plan)))

    // Save to database
    const success = await savePlanToDB(planId, updatedPlan)
    if (!success) {
      // Revert changes if save failed
      await refreshPlans()
    }
  }

  const refreshPlans = async () => {
    await fetchPlansFromDB()
  }

  useEffect(() => {
    fetchPlansFromDB()
  }, [])

  return (
    <PlansContext.Provider value={{ plans, updatePlan, refreshPlans, isLoading }}>{children}</PlansContext.Provider>
  )
}

export function usePlans() {
  const context = useContext(PlansContext)
  if (context === undefined) {
    throw new Error("usePlans must be used within a PlansProvider")
  }
  return context
}
