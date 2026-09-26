import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
import DetailActions from "@/components/workout/DetailActions";

export default async function WorkoutDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    let workout;
    try {
        workout = await getWorkoutById(id);
    } catch {
        notFound();
    }

    return (
        <main className="max-w-[1280px] mx-auto px-4 md:px-6 py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left column — image */}
                <div className="relative rounded-2xl overflow-hidden h-[280px] md:h-[450px] lg:h-[735px]">
                    <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 588px"
                        className="object-cover"
                        loading="eager"
                    />
                </div>

                {/* Right column — info */}
                <div>
                    <h1 className="font-display font-bold text-white text-2xl md:text-3xl lg:text-4xl tracking-[-0.9px] uppercase pb-3">
                        {workout.name}
                    </h1>
                    <p className="text-[#9ca3af] text-base pb-5 max-w-[576px]">
                        {workout.description}
                    </p>

                    <div className="flex gap-2.5 pb-7">
                        {workout.muscleGroups.map((tag) => (
                            <span
                                key={tag}
                                className="bg-[#c2f800] text-[#0f1115] text-xs font-semibold px-3.5 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="bg-[#151922] border border-[#232834] rounded-2xl overflow-hidden mb-9">
                        <SpecRow label="EQUIPMENT" value={workout.equipment} first />
                        <SpecRow label="DIFFICULTY" value={workout.difficulty} />
                        <SpecRow label="SETS" value={String(workout.sets)} />
                        <SpecRow label="REPS" value={workout.reps} />
                        <SpecRow label="DURATION" value={`${workout.duration} min`} />
                        <SpecRow label="CALORIES" value={`${workout.caloriesBurned} kcal`} />
                        <SpecRow label="RATING" value={String(workout.rating)} />
                    </div>

                    <div className="pb-9">
                        <h2 className="font-extrabold text-white text-base tracking-[0.8px] uppercase pb-4">
                            INSTRUCTIONS
                        </h2>
                        <ol className="flex flex-col gap-3">
                            {workout.instructions.map((step, i) => (
                                <li key={i} className="flex gap-2 text-sm">
                                    <span className="text-[#9ca3af]">{i + 1}.</span>
                                    <span className="text-[#d1d5db]">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <DetailActions workout={workout} />
                </div>
            </div>
        </main>
    );
}

function SpecRow({
    label,
    value,
    first = false,
}: {
    label: string;
    value: string;
    first?: boolean;
}) {
    return (
        <div
            className={`flex items-center justify-between px-6 py-3.5 ${first ? "" : "border-t border-[#1e2330]"
                }`}
        >
            <span className="text-[#9ca3af] text-xs font-bold tracking-[0.6px] uppercase">
                {label}
            </span>
            <span className="text-[#e5e7eb] text-sm">{value}</span>
        </div>
    );
}