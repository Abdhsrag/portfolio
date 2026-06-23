"use client";
import { memo, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

function SkillCard({ skill }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const iconRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out"
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.4,
        "--glow-x": `${glowX}%`,
        "--glow-y": `${glowY}%`,
        "--glow-color": skill.color,
        duration: 0.2
      });
    }

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1.15,
        rotationZ: rotateY * 0.5,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [skill.color]);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: "power3.out"
      });
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out"
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
      className="flex flex-col items-center gap-3 glass-card p-6 rounded-xl relative overflow-hidden cursor-pointer"
      style={{ opacity: 0, transformStyle: "preserve-3d", willChange: "transform, opacity" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={glowRef}
        className="skill-glow absolute inset-0 opacity-0 blur-xl pointer-events-none transition-opacity duration-300"
        style={{
          mixBlendMode: "screen",
          background: "radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), var(--glow-color, currentColor)88 0%, transparent 60%)",
        }}
      />
      <i
        ref={iconRef}
        className={`${skill.icon} text-4xl md:text-5xl relative z-10 transition-transform duration-200`}
        style={{ color: skill.color }}
      />
      <span className="text-xs text-gray-400 relative z-10 font-medium text-center pointer-events-none">
        {skill.name}
      </span>
    </div>
  );
}

export default memo(SkillCard);