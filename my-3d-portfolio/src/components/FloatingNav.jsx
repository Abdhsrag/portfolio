"use client";
import { memo, useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import ThemeToggle from "./ThemeToggle";

const links = [
  { title: "Home", icon: "fas fa-home", href: "#home", section: "home" },
  { title: "About", icon: "fas fa-user", href: "#about", section: "about" },
  { title: "Projects", icon: "fas fa-code", href: "#projects", section: "projects" },
  { title: "Contact", icon: "fas fa-envelope", href: "#contact", section: "contact" },
  { title: "Download CV", icon: "fas fa-file-arrow-down", href: "/assets/Abdelrahman_Mohamed_CV.pdf", external: true, download: true },
  { title: "GitHub", icon: "fab fa-github", href: "https://github.com/Abdhsrag", external: true },
  { title: "LinkedIn", icon: "fab fa-linkedin", href: "https://www.linkedin.com/in/abdelrahmanmohamedosama", external: true },
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
        delay: 2.2,
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
        className="flex items-center justify-center rounded-xl bg-white dark:bg-[#171821] border-2 sm:border-[2.5px] border-black shadow-[2.5px_2.5px_0px_#FFE600] sm:shadow-[4px_4px_0px_#FFE600] h-10 min-[360px]:h-11 sm:h-12 md:h-14 gap-0.5 min-[360px]:gap-1 sm:gap-1.5 md:gap-2 px-1 min-[360px]:px-1.5 sm:px-2.5 md:px-4 transition-colors max-w-[calc(100vw-1rem)]"
      >
        {links.map((item) => {
          const isExternal = item.external;
          const isSection = !!item.section;
          const isActive = isSection && item.section === activeSection;
          return (
            <a
              key={item.title}
              href={item.href}
              download={item.download ? "Abdelrahman_Mohamed_CV.pdf" : undefined}
              aria-label={item.title}
              aria-current={isActive ? "section" : undefined}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              onClick={(e) => handleClick(e, item.href)}
              className={`relative flex items-center justify-center w-[26px] h-[26px] min-[360px]:w-7 min-[360px]:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg border-1.5 sm:border-2 border-black transition-all flex-shrink-0 before:absolute before:-inset-1.5 sm:before:-inset-2 before:content-[''] ${
                isActive
                  ? "bg-[#00F0FF] text-black shadow-[1.5px_1.5px_0px_#000] sm:shadow-[2px_2px_0px_#000] translate-x-[-1px] translate-y-[-1px]"
                  : "bg-gray-100 dark:bg-[#20222e] text-gray-800 dark:text-gray-200 hover:bg-[#FFE600] hover:text-black shadow-[1px_1px_0px_#000] sm:shadow-[1.5px_1.5px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px]"
              }`}
            >
              <i className={`${item.icon} text-[11px] min-[360px]:text-xs sm:text-sm md:text-base`} />
              {isActive && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FFE600] border border-black rounded-full" />
              )}
            </a>
          );
        })}
        <div className="w-[1.5px] h-6 bg-black/30 dark:bg-white/20 mx-0.5" />
        <ThemeToggle compact={true} />
        {activeIdx >= 0 && (
          <span className="hidden md:inline text-[11px] font-mono font-bold bg-black text-[#FFE600] px-2 py-0.5 rounded border border-black ml-1">
            {String(activeIdx + 1).padStart(2, "0")}/{String(sectionIds.length).padStart(2, "0")}
          </span>
        )}
      </nav>
    </div>,
    document.body
  );
}

export default memo(FloatingNav);
