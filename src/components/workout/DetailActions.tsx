"use client";

import { CalendarPlus, Bookmark } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/lib/types";

export default function DetailActions({ workout }: { workout: Workout }) {
    const { addToPlan, addToSaved } = usePlan();

    return (
        <div className="flex gap-4">
            <button
                onClick={() => addToPlan(workout)}
                className="bg-[#c2f800] text-[#0f1115] text-sm font-semibold px-6 py-3 rounded-xl flex items-center gap-2"
            >
                <CalendarPlus size={16} />
                Add to today&apos;s plan
            </button>
            <button
                onClick={() => addToSaved(workout)}
                className="border border-[#374151] text-[#e5e7eb] text-sm font-medium px-6 py-3 rounded-xl flex items-center gap-2"
            >
                <Bookmark size={16} />
                Save for later
            </button>
        </div>
    );
}