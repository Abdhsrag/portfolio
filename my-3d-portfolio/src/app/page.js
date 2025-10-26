"use client";
import { useEffect, useState, lazy, Suspense } from "react";
import FloatingNav from "../components/FloatingNav";
import HeroSection from "../components/HeroSection";

// Lazy load heavy components
const AboutSection = lazy(() => import("../components/AboutSection"));
const ProjectsSection = lazy(() => import("../components/ProjectsSection"));
const ContactSection = lazy(() => import("../components/ContactSection"));

// Loading fallback
function SectionLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    let rafId;
    const handleMouseMove = (e) => {
      // Use RAF to throttle mouse updates
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
        rafId = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <main className="relative min-h-screen text-white bg-black">
      <FloatingNav />
      <HeroSection mousePosition={mousePosition} />
      
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ProjectsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ContactSection />
      </Suspense>

      <footer className="relative py-12 px-6 border-t border-white/5 z-10 bg-black/80 backdrop-blur-sm mb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-2xl font-bold text-gradient mb-2">
                Abdelrahman Mohamed
              </p>
              <p className="text-sm text-gray-400">
                Fullstack Developer | Building the future, one line of code at a time
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Abdelrahman Mohamed. All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}