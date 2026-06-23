"use client";
import { memo, useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

const links = [
  { title: "Home", icon: "fa-home", href: "#home", section: "home" },
  { title: "About", icon: "fa-user", href: "#about", section: "about" },
  { title: "Projects", icon: "fa-code", href: "#projects", section: "projects" },
  { title: "Contact", icon: "fa-envelope", href: "#contact", section: "contact" },
  { title: "GitHub", icon: "fa-github", href: "https://github.com/Abdhsrag", external: true },
  { title: "LinkedIn", icon: "fa-linkedin", href: "https://www.linkedin.com/in/abdelrahmanmohamedosama", external: true },
];

const sectionIds = links.filter((l) => l.section).map((l) => l.section);

function FloatingNav() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
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

  useEffect(() => {
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = useCallback((e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (!mounted) return null;

  const activeIdx = sectionIds.indexOf(activeSection);

  return createPortal(
    <div
      id="floating-dock-container"
      ref={dockRef}
    >
      <nav
        role="navigation"
        aria-label="Section navigation"
        className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-lg border border-cyan-400/20 shadow-lg shadow-cyan-500/20 h-12 md:h-16 gap-2 md:gap-3 px-2 md:px-4"
      >
        {links.map((item) => {
          const isExternal = item.external;
          const isSection = !!item.section;
          const isActive = isSection && item.section === activeSection;
          return (
            <a
              key={item.title}
              href={item.href}
              aria-label={item.title}
              aria-current={isActive ? "section" : undefined}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              onClick={(e) => handleClick(e, item.href)}
              className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <i className={`fas ${item.icon} text-white text-xl`} />
              {isActive && (
                <span className="absolute -bottom-1 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#00d9ff]" />
              )}
            </a>
          );
        })}
        {activeIdx >= 0 && (
          <span className="hidden md:inline text-[10px] text-gray-500 font-mono ml-1">
            {String(activeIdx + 1).padStart(2, "0")} / {String(sectionIds.length).padStart(2, "0")}
          </span>
        )}
      </nav>
    </div>,
    document.body
  );
}

export default memo(FloatingNav);
