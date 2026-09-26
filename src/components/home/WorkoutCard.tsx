import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/lib/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
    return (
        <Link
            href={`/workout/${workout.id}`}
            className="bg-[#15171d] border border-[#222630] rounded-2xl overflow-hidden flex flex-col hover:border-[#c2f800]/40 transition-colors"
        >
            <div className="relative h-[192px] w-full">
                <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 394px"
                    className="object-cover"
                />
            </div>

            <div className="p-6 flex flex-col gap-1">
                <div className="flex gap-2 flex-wrap">
                    {workout.muscleGroups.map((tag) => (
                        <span
                            key={tag}
                            className="bg-[#c2f800] text-black text-[11px] font-bold tracking-[0.55px] uppercase px-2.5 py-0.5 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="font-display font-bold text-white text-lg tracking-[0.45px] uppercase pt-2">
                    {workout.name}
                </h3>

                <p className="text-[#9ca3af] text-xs">{workout.equipment}</p>

                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#20242e]">
                    <span className="flex items-center gap-1.5 text-[#9ca3af] text-xs">
                        <Clock size={14} />
                        {workout.duration} min
                    </span>
                    <span className="flex items-center gap-1.5 text-[#9ca3af] text-xs">
                        <Flame size={14} />
                        {workout.caloriesBurned} kcal
                    </span>
                    <span className="flex items-center gap-1.5 text-[#9ca3af] text-xs">
                        <Star size={14} />
                        {workout.rating}
                    </span>
                </div>
            </div>
        </Link>
    );
}