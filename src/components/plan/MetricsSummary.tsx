export default function MetricsSummary({
    exercises,
    minutes,
    calories,
}: {
    exercises: number;
    minutes: number;
    calories: number;
}) {
    return (
        <div className="bg-[#13161d] border border-[#232732] rounded-2xl flex flex-col sm:flex-row items-start w-full">
            <div className="flex-1 w-full pr-0 sm:pr-6 py-4 sm:py-8 px-6 sm:pl-6">
                <p className="text-[#8a92a0] text-xs">Exercises</p>
                <p className="font-display font-bold text-[#c2f800] text-4xl pt-1">{exercises}</p>
            </div>
            <div className="flex-1 w-full border-t sm:border-t-0 sm:border-l border-[rgba(35,39,50,0.6)] px-6 sm:px-8 py-4 sm:py-8">
                <p className="text-[#8a92a0] text-xs">Minutes</p>
                <p className="font-display font-bold text-white text-4xl pt-1">{minutes}</p>
            </div>
            <div className="flex-1 w-full border-t sm:border-t-0 sm:border-l border-[rgba(35,39,50,0.6)] px-6 sm:pl-8 py-4 sm:py-8">
                <p className="text-[#8a92a0] text-xs">Calories</p>
                <p className="font-display font-bold text-white text-4xl pt-1">{calories}</p>
            </div>
        </div>
    );
}