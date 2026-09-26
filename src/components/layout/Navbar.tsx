"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
    const pathname = usePathname();
    const { plan, saved } = usePlan();

    const isActive = (path: string) => pathname === path;

    return (
        <header className="sticky top-0 z-50 backdrop-blur-[2px] bg-[rgba(12,13,16,0.95)] border-b border-[#1c1f26]">
            <div className="max-w-[1280px] mx-auto h-20 px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5">
                    <Image src="/assets/logo.png" alt="FitLog logo" width={28} height={28} />
                    <span className="font-display font-black text-lg tracking-[0.9px] uppercase text-white">
                        FITLOG
                    </span>
                </Link>

                {/* Center nav links */}
                <nav className="flex items-center">
                    <Link
                        href="/"
                        className={
                            isActive("/")
                                ? "bg-[#1a2312] text-[#c2f800] text-xs font-semibold rounded-full px-4 py-1.5"
                                : "text-[#9ca3af] text-xs font-medium px-4 py-1.5"
                        }
                    >
                        Workouts
                    </Link>
                    <Link
                        href="/my-plan"
                        className={
                            isActive("/my-plan")
                                ? "bg-[#1a2312] text-[#c2f800] text-xs font-semibold rounded-full px-4 py-1.5"
                                : "text-[#9ca3af] text-xs font-medium px-4 py-1.5"
                        }
                    >
                        My Plan
                    </Link>
                </nav>

                {/* Right side status badges */}
                <div className="flex items-center gap-6">
                    {/* Plan counter: label + filled circle */}
                    <Link href="/my-plan" className="flex items-center gap-2">
                        <span className="text-[#d1d5db] text-xs font-medium">Plan</span>
                        <span className="flex items-center justify-center size-5 rounded-full bg-[#c2f800] text-black text-[11px] font-bold">
                            {plan.length}
                        </span>
                    </Link>

                    {/* Saved counter: label + outlined circle */}
                    <Link href="/my-plan" className="flex items-center gap-2">
                        <span className="text-[#9ca3af] text-xs font-medium">Saved</span>
                        <span className="flex items-center justify-center size-5 rounded-full border border-[#2d313b] text-[#d1d5db] text-[11px] font-medium">
                            {saved.length}
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
}