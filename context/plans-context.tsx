"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { Plan } from "@/types/plan";

interface PlansContextType {
    plans: Plan[];
    updatePlan: (updatedPlan: Plan) => void;
    refreshPlans: () => void;
    isLoading: boolean;
}

const PlansContext = createContext<PlansContextType | undefined>(undefined);

export function PlansProvider({ children }: { children: React.ReactNode }) {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Function to fetch plans from database (you'll implement this)
    const fetchPlansFromDB = async () => {
        setIsLoading(true);
        try {
            // TODO: Replace with actual API call
            const response = await fetch("/api/get_plans");
            const data = await response.json();
            if (data.success) {
                setPlans(data.data); // This triggers UI update
                console.log("Plans fetched successfully:", data.data);
            } else {
                setPlans([]); // Clear plans if fetch fails
            }
        } catch (error) {
            console.error("Error fetching plans:", error);
            setPlans([]); // Clear plans on error
        } finally {
            setIsLoading(false);
        }
    };

    // Function to save plan to database (you'll implement this)
    const savePlanToDB = async ( planData: Plan) => {

        try {
            const response = await fetch("/api/update_plan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(planData ),
            });
            const data = await response.json();

            console.log("Saving plan to DB:", { planData });
            return data.success;
        } catch (error) {
            console.error("Error saving plan:", error);
            return false;
        }
    };

    const updatePlan = async ( updatedPlan: Plan) => {
        // Update local state immediately for optimistic updates
        setPlans((prevPlans) => prevPlans.map((plan) => (plan.id === updatedPlan.id ? { ...plan, ...updatedPlan } : plan)));

        // Save to database
        const success = await savePlanToDB( updatedPlan);
        if (!success) {
            // Revert changes if save failed
            await refreshPlans();
        }
    };

    const refreshPlans = async () => {
        await fetchPlansFromDB();
    };

    useEffect(() => {
        // Ensure fetchPlansFromDB is awaited to guarantee plans are set before first render
        (async () => {
            await fetchPlansFromDB();
        })();
    }, []);

    return <PlansContext.Provider value={{ plans, updatePlan, refreshPlans, isLoading }}>{children}</PlansContext.Provider>;
}

export function usePlans() {
    const context = useContext(PlansContext);
    if (context === undefined) {
        throw new Error("usePlans must be used within a PlansProvider");
    }
    return context;
}
