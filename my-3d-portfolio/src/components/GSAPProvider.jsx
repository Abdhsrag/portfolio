"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GSAPProvider({ children }) {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e) => {
      if (e.matches) {
        gsap.globalTimeline.timeScale(0);
        ScrollTrigger.getAll().forEach((st) => st.disable());
      } else {
        gsap.globalTimeline.timeScale(1);
        ScrollTrigger.getAll().forEach((st) => st.enable());
      }
    };
    
    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return children;
}