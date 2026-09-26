import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#090a0d] border-t border-[#1a1d24] pt-[41px] pb-10">
            <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/assets/logo.png" alt="FitLog logo" width={20} height={20} />
                    <span className="font-display font-bold text-white text-sm tracking-[0.7px] uppercase">
                        FITLOG
                    </span>
                </Link>

                <p className="text-[#6b7280] text-xs">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>
            </div>
        </footer>
    );
}