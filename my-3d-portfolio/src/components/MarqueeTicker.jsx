"use client";
import { memo } from "react";

function MarqueeTicker() {
  const items = [
    "⚡ FULLSTACK DEVELOPER",
    "★ REACT & NEXT.JS EXPERT",
    "⚡ 3D WEB & THREE.JS",
    "★ GSAP ANIMATIONS",
    "⚡ FASTAPI & DJANGO",
    "★ UI/UX OBSESSED",
    "⚡ AVAILABLE FOR FREELANCE",
    "★ HIGH PERFORMANCE CODE",
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#FFE600] border-y-3 border-black py-3.5 select-none shadow-[0px_4px_0px_#000] z-20">
      <div className="flex w-max animate-marquee">
        <div className="flex items-center gap-8 text-black font-black text-sm sm:text-base tracking-widest uppercase font-mono px-4">
          {items.map((text, i) => (
            <span key={`t1-${i}`} className="inline-flex items-center gap-4 whitespace-nowrap">
              <span>{text}</span>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-8 text-black font-black text-sm sm:text-base tracking-widest uppercase font-mono px-4" aria-hidden="true">
          {items.map((text, i) => (
            <span key={`t2-${i}`} className="inline-flex items-center gap-4 whitespace-nowrap">
              <span>{text}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(MarqueeTicker);
