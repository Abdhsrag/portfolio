"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

export default function FloatingNav() {
  const [mounted, setMounted] = useState(false);
  const dockRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    gsap.fromTo(
      dockRef.current,
      { y: 80, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 2.5,
        ease: "back.out(1.7)",
      }
    );
  }, [mounted]);

  const links = [
    {
      title: "Home",
      icon: <i className="fas fa-home text-white text-xl" />,
      href: "#home",
    },
    {
      title: "About",
      icon: <i className="fas fa-user text-white text-xl" />,
      href: "#about",
    },
    {
      title: "Projects",
      icon: <i className="fas fa-code text-white text-xl" />,
      href: "#projects",
    },
    {
      title: "Contact",
      icon: <i className="fas fa-envelope text-white text-xl" />,
      href: "#contact",
    },
    {
      title: "GitHub",
      icon: <i className="fab fa-github text-white text-xl" />,
      href: "https://github.com/Abdhsrag",
    },
    {
      title: "LinkedIn",
      icon: <i className="fab fa-linkedin text-white text-xl" />,
      href: "https://www.linkedin.com/in/abdelrahmanmohamedosama",
    },
  ];

  if (!mounted) return null;

  return createPortal(
    <div
      id="floating-dock-container"
      ref={dockRef}
    >
      <div className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-lg border border-cyan-400/20 shadow-lg shadow-cyan-500/20 h-12 md:h-16 gap-2 md:gap-3 px-2 md:px-4">
        {links.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            title={item.title}
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>,
    document.body
  );
}
