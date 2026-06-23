"use client";
import { memo, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

function throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function CursorFollower() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  const mouseMove = useCallback(
    throttle((e) => {
      const cursor = cursorRef.current;
      const trail = trailRef.current;
      if (!cursor || !trail) return;
      
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
    }, 16),
    []
  );

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    gsap.set(cursor, { x: -100, y: -100 });
    gsap.set(trail, { x: -100, y: -100 });

    window.addEventListener("mousemove", mouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", mouseMove);
  }, [mouseMove]);

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

export default memo(CursorFollower);