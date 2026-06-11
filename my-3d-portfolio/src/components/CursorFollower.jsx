"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorFollower() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    gsap.set(cursor, { x: -100, y: -100 });
    gsap.set(trail, { x: -100, y: -100 });

    const mouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
      gsap.to(trail, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[99999] w-4 h-4 bg-cyan-400 rounded-full mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={trailRef}
        className="pointer-events-none fixed z-[99998] w-8 h-8 border border-cyan-400/50 rounded-full"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
