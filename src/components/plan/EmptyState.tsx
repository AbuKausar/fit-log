import Link from "next/link";

export default function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20">
            <h2 className="font-display font-bold text-white text-lg uppercase">
                NOTHING HERE YET
            </h2>
            <p className="text-[#8a92a0] text-sm pt-2 max-w-[300px]">
                Browse the library and add a lift to get today moving.
            </p>
            <Link
                href="/"
                className="mt-4 bg-[#c2f800] text-black text-sm font-semibold px-6 py-2.5 rounded-lg"
            >
                Go to workouts
            </Link>
        </div>
    );
}