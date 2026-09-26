export default function LibrarySkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="bg-[#15171d] border border-[#222630] rounded-2xl h-[368px] animate-pulse"
                />
            ))}
        </div>
    );
}