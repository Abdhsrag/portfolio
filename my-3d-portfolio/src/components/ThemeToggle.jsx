"use client";
import { useEffect, useState, useCallback } from "react";

export function useTheme() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    const initial = saved || "light";
    setTheme(initial);
    if (initial === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("portfolio-theme", next);
      if (next === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme, mounted };
}

export default function ThemeToggle({ className = "", compact = false }) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === "dark";

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        className={`relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg border-2 border-black bg-[#FFE600] text-black shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer flex-shrink-0 before:absolute before:-inset-1.5 sm:before:-inset-2 before:content-[''] ${className}`}
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        <i className={`fas ${!mounted ? "fa-moon text-black" : (isDark ? "fa-sun text-black" : "fa-moon text-black")} text-xs sm:text-sm md:text-base`} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border-2 border-black font-mono font-black text-[11px] sm:text-xs uppercase tracking-wider bg-[#FFE600] text-black shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer select-none ${className}`}
    >
      <i className={`fas ${!mounted ? "fa-moon" : (isDark ? "fa-sun" : "fa-moon")} text-xs sm:text-sm`} />
      <span>{!mounted ? "DARK" : (isDark ? "LIGHT" : "DARK")}</span>
    </button>
  );
}
