import { getAllWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";

export default async function Library() {
    const workouts = await getAllWorkouts();

    return (
        <section id="library" className="pt-10 md:pt-16">
            <h2 className="font-display font-bold text-white text-2xl md:text-3xl uppercase">
                THE LIBRARY
            </h2>
            <p className="text-[#9ca3af] text-sm mt-2">
                Twelve lifts covering every major muscle group.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {workouts.map((workout) => (
                    <WorkoutCard key={workout.id} workout={workout} />
                ))}
            </div>
        </section>
    );
}