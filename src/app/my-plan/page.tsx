"use client";

import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import MetricsSummary from "@/components/plan/MetricsSummary";
import PlanCard from "@/components/plan/PlanCard";
import EmptyState from "@/components/plan/EmptyState";

type SortKey = "duration" | "caloriesBurned" | "rating";
type Tab = "plan" | "saved";

export default function MyPlanPage() {
    const { plan, saved, hasLoadedFromStorage, removeFromPlan, removeFromSaved, markAsDone } = usePlan();
    const [activeTab, setActiveTab] = useState<Tab>("plan");
    const [sortKey, setSortKey] = useState<SortKey>("duration");

    // Metrics always reflect Today's Plan, per the Figma design
    const currentList = activeTab === "plan" ? plan : saved;
    const totalMinutes = currentList.reduce((sum, w) => sum + w.duration, 0);
    const totalCalories = currentList.reduce((sum, w) => sum + w.caloriesBurned, 0);

    const sortedList = useMemo(() => {
        return [...currentList].sort((a, b) => b[sortKey] - a[sortKey]);
    }, [currentList, sortKey]);

    return (
        <main className="max-w-[1280px] mx-auto px-6 py-10 flex flex-col gap-6">
            <div>
                <h1 className="font-display font-bold text-white text-3xl tracking-[-0.75px] uppercase">
                    MY PLAN
                </h1>
                <p className="text-[#8a92a0] text-sm pt-1">
                    Cap of five lifts for today. Finish them, then load more.
                </p>
            </div>

            <MetricsSummary exercises={currentList.length} minutes={totalMinutes} calories={totalCalories} />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                {/* Tabs */}
                <div className="bg-[#151921] border border-[#232732] rounded-xl p-[5px] flex gap-1">
                    <button
                        onClick={() => setActiveTab("plan")}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold ${activeTab === "plan"
                                ? "bg-[#1f242d] border border-[#2b303d] text-white"
                                : "text-[#8a92a0]"
                            }`}
                    >
                        Today&apos;s Plan
                    </button>
                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold ${activeTab === "saved"
                                ? "bg-[#1f242d] border border-[#2b303d] text-white"
                                : "text-[#8a92a0]"
                            }`}
                    >
                        Saved
                    </button>
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-3">
                    <span className="text-[#8a92a0] text-xs">Sort By</span>
                    <div className="relative">
                        <select
                            value={sortKey}
                            onChange={(e) => setSortKey(e.target.value as SortKey)}
                            className="appearance-none bg-[#13161d] border border-[#232732] text-white text-xs rounded-lg pl-4 pr-8 py-2"
                        >
                            <option value="duration">Duration</option>
                            <option value="caloriesBurned">Calories</option>
                            <option value="rating">Rating</option>
                        </select>
                        <ChevronDown
                            size={14}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a92a0] pointer-events-none"
                        />
                    </div>
                </div>
            </div>

            {/* List */}
            {!hasLoadedFromStorage ? (
                <p className="text-[#8a92a0] text-sm py-10 text-center">Loading workouts…</p>
            ) : sortedList.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="flex flex-col gap-4">
                    {sortedList.map((workout) => (
                        <PlanCard
                            key={workout.id}
                            workout={workout}
                            variant={activeTab}
                            done={activeTab === "plan" ? (workout as typeof plan[number]).done : false}
                            onRemove={() =>
                                activeTab === "plan" ? removeFromPlan(workout.id) : removeFromSaved(workout.id)
                            }
                            onMarkDone={activeTab === "plan" ? () => markAsDone(workout.id) : undefined}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}