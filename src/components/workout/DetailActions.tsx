"use client";

import { CalendarPlus, Bookmark } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/lib/types";

export default function DetailActions({ workout }: { workout: Workout }) {
    const { addToPlan, addToSaved } = usePlan();

    return (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
            <button
                onClick={() => addToPlan(workout)}
                className="w-full sm:w-auto bg-[#c2f800] text-[#0f1115] text-sm font-semibold px-5 py-3 rounded-xl flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 transition-all"
            >
                <CalendarPlus size={16} className="shrink-0" />
                Add to today&apos;s plan
            </button>
            <button
                onClick={() => addToSaved(workout)}
                className="w-full sm:w-auto border border-[#374151] text-[#e5e7eb] text-sm font-medium px-5 py-3 rounded-xl flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 transition-all"
            >
                <Bookmark size={16} className="shrink-0" />
                Save for later
            </button>
        </div>
    );
}