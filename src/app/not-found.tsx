import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <main className="max-w-[1280px] mx-auto px-6 py-32 flex flex-col items-center text-center">
            <Image src="/assets/logo.png" alt="FitLog logo" width={40} height={40} className="pb-3"/>
            <h1 className="font-display font-bold text-white text-5xl uppercase tracking-[-1px]">
                404
            </h1>
            <p className="text-[#9ca3af] text-base pt-3 max-w-[420px]">
                This page skipped leg day and wandered off. The workout you're looking for doesn't exist.
            </p>
            <Link
                href="/"
                className="mt-6 bg-[#c2f800] text-black text-sm font-semibold px-6 py-3 rounded-xl"
            >
                Back to Library
            </Link>
        </main>
    );
}