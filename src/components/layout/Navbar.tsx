"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
    const pathname = usePathname();
    const { plan, saved } = usePlan();
    const [menuOpen, setMenuOpen] = useState(false);

    const isActive = (path: string) => pathname === path;

    const linkClasses = (path: string) =>
        isActive(path)
            ? "bg-[#1a2312] text-[#c2f800] text-xs font-semibold rounded-full px-4 py-1.5"
            : "text-[#9ca3af] text-xs font-medium px-4 py-1.5";

    return (
        <header className="sticky top-0 z-50 backdrop-blur-[2px] bg-[rgba(12,13,16,0.95)] border-b border-[#1c1f26]">
            <div className="max-w-[1280px] mx-auto h-20 px-4 md:px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5">
                    <Image src="/assets/logo.png" alt="FitLog logo" width={28} height={28} />
                    <span className="font-display font-black text-lg tracking-[0.9px] uppercase text-white">
                        FITLOG
                    </span>
                </Link>

                {/* Desktop nav links — hidden on mobile */}
                <nav className="hidden md:flex items-center">
                    <Link href="/" className={linkClasses("/")}>Workouts</Link>
                    <Link href="/my-plan" className={linkClasses("/my-plan")}>My Plan</Link>
                </nav>

                {/* Badges — always visible, smaller gap on mobile */}
                <div className="flex items-center gap-3 md:gap-6">
                    <Link href="/my-plan" className="flex items-center gap-1.5 md:gap-2">
                        <span className="hidden sm:inline text-[#d1d5db] text-xs font-medium">Plan</span>
                        <span className="flex items-center justify-center size-5 rounded-full bg-[#c2f800] text-black text-[11px] font-bold">
                            {plan.length}
                        </span>
                    </Link>
                    <Link href="/my-plan" className="flex items-center gap-1.5 md:gap-2">
                        <span className="hidden sm:inline text-[#9ca3af] text-xs font-medium">Saved</span>
                        <span className="flex items-center justify-center size-5 rounded-full border border-[#2d313b] text-[#d1d5db] text-[11px] font-medium">
                            {saved.length}
                        </span>
                    </Link>

                    {/* Hamburger — only on mobile */}
                    <button onClick={() => setMenuOpen((v) => !v)} className="md:hidden text-white">
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <nav className="md:hidden flex flex-col gap-1 px-4 pb-4">
                    <Link href="/" onClick={() => setMenuOpen(false)} className={linkClasses("/")}>
                        Workouts
                    </Link>
                    <Link href="/my-plan" onClick={() => setMenuOpen(false)} className={linkClasses("/my-plan")}>
                        My Plan
                    </Link>
                </nav>
            )}
        </header>
    );
}