"use client";

import { useEffect } from "react";
import { RefreshCcw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    // Log the error for debugging (visible in browser console / server logs)
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="max-w-[1280px] mx-auto px-6 py-32 flex flex-col items-center text-center">
            <h1 className="font-display font-bold text-white text-3xl uppercase">
                Something went wrong
            </h1>
            <p className="text-[#9ca3af] text-base pt-3 max-w-[420px]">
                Couldn&apos;t load the data right now. This is usually temporary — try again in a moment.
            </p>
            <button
                onClick={() => reset()}
                className="mt-6 bg-[#c2f800] text-black text-sm font-semibold px-6 py-3 rounded-xl flex items-center gap-2"
            >
                <RefreshCcw size={16} />
                Try again
            </button>
        </main>
    );
}