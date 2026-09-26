import { Workout } from "./types";

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getAllWorkouts(): Promise<Workout[]> {
    const res = await fetch(BASE_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch workouts");
    return res.json();
}

export async function getWorkoutById(id: string): Promise<Workout> {
    const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Workout not found");
    return res.json();
}