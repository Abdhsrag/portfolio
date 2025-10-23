"use client";
import { useEffect, useState } from "react";
import FloatingNav from "../components/FloatingNav";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen text-white bg-black">
      {/* ParallaxBackground removed - now inside HeroSection */}
      <FloatingNav />
      
      <HeroSection mousePosition={mousePosition} />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />

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