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
  hasLoadedFromStorage: boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const PLAN_LIMIT = 5;

export function PlanProvider({ children }: { children: ReactNode }) {

  const [plan, setPlan] = useState<PlannedWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);

  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }

    setHasLoadedFromStorage(true);
  }, []);

  // Save the plan whenever it changes
  useEffect(() => {
    if (hasLoadedFromStorage) {
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    }
  }, [plan, hasLoadedFromStorage]);

  // Save saved workouts whenever they change
  useEffect(() => {
    if (hasLoadedFromStorage) {
      localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    }
  }, [saved, hasLoadedFromStorage]);

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
        hasLoadedFromStorage,
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