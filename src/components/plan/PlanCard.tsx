"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, Check, X } from "lucide-react";
import { Workout } from "@/lib/types";

interface PlanCardProps {
    workout: Workout;
    done?: boolean;
    variant: "plan" | "saved";
    onRemove: () => void;
    onMarkDone?: () => void;
}

export default function PlanCard({
    workout,
    done = false,
    variant,
    onRemove,
    onMarkDone,
}: PlanCardProps) {
    return (
        <div className="bg-[#14171e] border border-[#232732] rounded-2xl flex items-center justify-between p-[17px]">
            {/* Thumbnail + description */}
            <div className="flex gap-4 items-center">
                <div className="relative h-20 w-36 rounded-xl overflow-hidden shrink-0 bg-[#1f2937]">
                    <Image src={workout.image} alt={workout.name} fill sizes="144px" className="object-cover" />
                </div>

                <div>
                    <h3
                        className={`font-display font-bold text-white text-base tracking-[0.4px] uppercase `}
                    >
                        {workout.name}
                    </h3>
                    <p className="text-[#8a92a0] text-xs font-semibold pt-0.5">{workout.equipment}</p>
                    <div className="flex items-center gap-3 pt-1.5">
                        <span className="flex items-center gap-1 text-[#d1d5db] text-xs">
                            <Clock size={14} />
                            {workout.duration} min
                        </span>
                        <span className="flex items-center gap-1 text-[#d1d5db] text-xs">
                            <Flame size={14} />
                            {workout.caloriesBurned} kcal
                        </span>
                        <span className="flex items-center gap-1 text-[#d1d5db] text-xs">
                            <Star size={14} />
                            {workout.rating}
                        </span>
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 shrink-0">
                <Link
                    href={`/workout/${workout.id}`}
                    className="border border-[#374151] text-white text-xs px-6 py-2.5 rounded-full"
                >
                    View Details
                </Link>

                {variant === "plan" && onMarkDone && (
                    <button
                        onClick={onMarkDone}
                        className="bg-[#c2f800] text-black text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5"
                    >
                        <Check size={14} />
                        Mark as Done
                    </button>
                )}

                <button onClick={onRemove} className="p-1.5 text-[#8a92a0] hover:text-white">
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}