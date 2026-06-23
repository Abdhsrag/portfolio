"use client";
import { memo, useEffect, useRef, useState } from "react";
import gsap from "gsap";

function BackToTop() {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    const el = document.getElementById("home");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      scale: visible ? 1 : 0,
      opacity: visible ? 1 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [visible]);

  return (
    <button
      ref={btnRef}
      onClick={() =>
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
      }
      aria-label="Back to top"
      className="fixed bottom-24 right-6 z-[9998] w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 flex items-center justify-center hover:scale-110 transition-transform"
      style={{ transform: "scale(0)", opacity: 0 }}
    >
      <i className="fas fa-arrow-up text-white text-lg" />
    </button>
  );
}

export default memo(BackToTop);
