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
        <div className="bg-[#13161d] border border-[#232732] rounded-2xl flex items-start w-full">
            <div className="flex-1 pr-6 py-8 pl-6">
                <p className="text-[#8a92a0] text-xs">Exercises</p>
                <p className="font-display font-bold text-[#c2f800] text-4xl pt-1">{exercises}</p>
            </div>
            <div className="flex-1 border-l border-[rgba(35,39,50,0.6)] px-8 py-8">
                <p className="text-[#8a92a0] text-xs">Minutes</p>
                <p className="font-display font-bold text-white text-4xl pt-1">{minutes}</p>
            </div>
            <div className="flex-1 border-l border-[rgba(35,39,50,0.6)] pl-8 py-8">
                <p className="text-[#8a92a0] text-xs">Calories</p>
                <p className="font-display font-bold text-white text-4xl pt-1">{calories}</p>
            </div>
        </div>
    );
}