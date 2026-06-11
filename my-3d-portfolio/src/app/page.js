"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingNav from "../components/FloatingNav";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";
import CursorFollower from "../components/CursorFollower";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const progressRef = useRef(null);

  useEffect(() => {
    const _warn = console.warn.bind(console);
    console.warn = (...args) => {
      if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
      _warn(...args);
    };
    return () => { console.warn = _warn; };
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
    <main className="relative min-h-screen text-white bg-black">
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 z-[10000] origin-left"
        style={{ transform: "scaleX(0)" }}
      />

      <CursorFollower />
      <FloatingNav />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />

      <footer className="relative py-12 px-6 border-t border-white/5 bg-black/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-2xl font-bold text-gradient mb-2">
                Abdelrahman Mohamed
              </p>
              <p className="text-sm text-gray-400">
                Fullstack Developer | Building the future, one line of code at a
                time
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Abdelrahman Mohamed. All
                Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
