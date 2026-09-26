import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import React from 'react';

const Hero = () => {
  return (
    <section className="bg-[#15171d] border border-[#222630] rounded-2xl p-[57px] flex items-center justify-between">
          <div className="max-w-[576px] flex flex-col items-start gap-5">
        <span className="text-[#c2f800] text-[11px] font-bold tracking-[1.1px] uppercase">
          WORKOUT LIBRARY
        </span>

        <h1 className="font-display font-extrabold text-white text-[60px] leading-[60px] tracking-[-1.5px] uppercase">
          TRAIN WITH INTENT. LOG
          <br />
          EVERY SET.
        </h1>

        <p className="text-[#9ca3af] text-base leading-6 max-w-[512px]">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>

        <a
          href="#library"
          className="mt-2 inline-flex items-center gap-2 bg-[#c2f800] text-black text-xs font-bold uppercase tracking-[0.3px] px-6 py-3 rounded-md"
        >
          BROWSE WORKOUTS
          <ArrowRight size={14} />
        </a>
      </div>

      <div className="relative shrink-0 size-[334px]">
        <Image
          src="/assets/banner.png"
          alt="Fitness illustration"
          fill
          sizes='334px'
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;