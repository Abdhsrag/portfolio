"use client";
import { memo, useRef, useCallback } from "react";
import gsap from "gsap";

function SkillCard({ skill }) {
  const cardRef = useRef(null);
  const iconRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.06,
      duration: 0.25,
      ease: "power2.out"
    });

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1.15,
        rotationZ: rotateY * 0.4,
        duration: 0.25,
        ease: "power2.out"
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.45,
        ease: "power3.out"
      });
    }
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1,
        rotationZ: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="group flex flex-col items-center justify-center gap-3.5 p-4 sm:p-5 rounded-xl border-[2.5px] border-black bg-white dark:bg-[#171821] shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#FFE600] cursor-pointer transition-all duration-150"
      style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-12 h-12 flex items-center justify-center">
        <i
          ref={iconRef}
          className={`${skill.icon} text-3xl sm:text-4xl transition-transform duration-200`}
          style={{ color: skill.color }}
        />
      </div>
      <span className="text-xs text-black dark:text-gray-200 font-mono font-bold text-center pointer-events-none px-2 py-0.5 rounded bg-[#F4EFE6] dark:bg-[#20222e] border border-black shadow-[1.5px_1.5px_0px_#000] group-hover:bg-[#FFE600] group-hover:text-black transition-colors w-full truncate">
        {skill.name}
      </span>
    </div>
  );
}

export default memo(SkillCard);