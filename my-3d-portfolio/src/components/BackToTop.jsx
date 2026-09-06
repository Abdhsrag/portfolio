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
      className="fixed bottom-20 right-3.5 sm:bottom-24 sm:right-6 z-[9998] w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FFE600] text-black border-[2.5px] border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] flex items-center justify-center hover:shadow-[5px_5px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
      style={{ transform: "scale(0)", opacity: 0 }}
    >
      <i className="fas fa-arrow-up text-black font-black text-sm sm:text-lg" />
    </button>
  );
}

export default memo(BackToTop);
