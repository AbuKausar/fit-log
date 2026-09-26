"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import toast from "react-hot-toast";
import { Workout } from "@/lib/types";

interface PlannedWorkout extends Workout {
  done: boolean;
}

interface PlanContextType {
  plan: PlannedWorkout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  markAsDone: (id: number) => void;
  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const PLAN_LIMIT = 5;

export function PlanProvider({ children }: { children: ReactNode }) {
  // Read the plan from localStorage when the state is created
  const [plan, setPlan] = useState<PlannedWorkout[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const storedPlan = localStorage.getItem("fitlog-plan");

    return storedPlan ? JSON.parse(storedPlan) : [];
  });

  // Read saved workouts from localStorage when the state is created
  const [saved, setSaved] = useState<Workout[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const storedSaved = localStorage.getItem("fitlog-saved");

    return storedSaved ? JSON.parse(storedSaved) : [];
  });

  // Save the plan whenever it changes
  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  // Save saved workouts whenever they change
  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  const isInPlan = (id: number) => {
    return plan.some((workout) => workout.id === id);
  };

  const isInSaved = (id: number) => {
    return saved.some((workout) => workout.id === id);
  };

  const addToPlan = (workout: Workout) => {
    if (isInPlan(workout.id)) {
      toast.error("Already in today's plan");
      return;
    }

    if (plan.length >= PLAN_LIMIT) {
      toast.error("Plan is full (max 5 lifts today)");
      return;
    }

    setPlan((previousPlan) => [
      ...previousPlan,
      {
        ...workout,
        done: false,
      },
    ]);

    toast.success("Added to today's plan");
  };

  const removeFromPlan = (id: number) => {
    setPlan((previousPlan) =>
      previousPlan.filter((workout) => workout.id !== id)
    );

    toast.success("Removed from plan");
  };

  const markAsDone = (id: number) => {
    setPlan((previousPlan) =>
      previousPlan.map((workout) =>
        workout.id === id
          ? {
              ...workout,
              done: !workout.done,
            }
          : workout
      )
    );

    toast.success("Marked as done");
  };

  const addToSaved = (workout: Workout) => {
    if (isInSaved(workout.id)) {
      toast.error("Already saved");
      return;
    }

    setSaved((previousSaved) => [
      ...previousSaved,
      workout,
    ]);

    toast.success("Saved for later");
  };

  const removeFromSaved = (id: number) => {
    setSaved((previousSaved) =>
      previousSaved.filter((workout) => workout.id !== id)
    );

    toast.success("Removed from saved");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        markAsDone,
        addToSaved,
        removeFromSaved,
        isInPlan,
        isInSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
}
