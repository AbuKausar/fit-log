export interface Workout {
    id: number;
    name: string;
    image: string;
    muscleGroups: string[];   
    difficulty: string;
    duration: number;         
    caloriesBurned: number;
    sets: number;
    reps: string;
    rating: number;
    description: string;
    instructions: string[];
}