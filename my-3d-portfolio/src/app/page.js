"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/HeroSection";
import MarqueeTicker from "@/components/MarqueeTicker";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import FloatingNav from "@/components/FloatingNav";
import CursorFollower from "@/components/CursorFollower";
import BackToTop from "@/components/BackToTop";
import GSAPProvider from "@/components/GSAPProvider";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

export default function Home() {
  const progressRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      mainRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (progressRef.current) {
          gsap.set(progressRef.current, {
            scaleX: self.progress,
          });
        }
      },
    });
  }, []);

  return (
    <main
      ref={mainRef}
      id="main-content"
      className="relative min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-200"
    >
      {/* Neobrutalist Progress Bar */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-[4px] bg-[#FFE600] border-b border-black z-[10000] origin-left shadow-[0_2px_0px_#000]"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Top Corner Theme Switcher */}
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-[9990]">
        <ThemeToggle />
      </div>

      <CursorFollower />
      <FloatingNav />
      <BackToTop />
      <GSAPProvider>
        <HeroSection />
        <MarqueeTicker />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </GSAPProvider>

      {/* Neobrutalist Footer */}
      <footer className="relative py-8 sm:py-12 px-4 sm:px-6 border-t-[3px] border-black bg-white dark:bg-[#171821] shadow-[0_-4px_0px_#000] text-black dark:text-white transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="inline-block px-2.5 py-0.5 mb-2 bg-[#FFE600] text-black font-mono font-bold text-xs uppercase border border-black shadow-[1.5px_1.5px_0px_#000]">
                PORTFOLIO V2 // 2026
              </div>
              <p className="text-2xl font-black">
                Abdelrahman <span className="text-gradient">Mohamed</span>
              </p>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 font-mono mt-1">
                Frontend Developer | Building high-impact web experiences
              </p>
            </div>
            <div className="text-center md:text-right font-mono text-xs">
              <p className="px-3 py-1.5 rounded-lg bg-[#F4EFE6] dark:bg-[#20222e] border border-black shadow-[2px_2px_0px_#000] text-gray-900 dark:text-gray-300">
                &copy; {new Date().getFullYear()} Abdelrahman Mohamed. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
