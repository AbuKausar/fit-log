import Hero from "@/components/home/Hero";
import Library from "@/components/home/Library";
import LibrarySkeleton from "@/components/home/LibrarySkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="max-w-[1280px] mx-auto px-6 py-12">
      <Hero />
      <Suspense fallback={<div id="library" className="pt-16"><LibrarySkeleton /></div>}>
        <Library />
      </Suspense>
    </main>
  );
}