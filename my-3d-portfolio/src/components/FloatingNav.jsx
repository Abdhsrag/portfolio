"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FloatingDock } from "./ui/floating-dock";

export default function FloatingNav() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      style={{
        position: "fixed",
        bottom: "24px",
        left: "0",
        right: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999999,
        pointerEvents: "none",
      }}
    >
      <div style={{ pointerEvents: "auto" }}>
        <FloatingDock items={links} />
      </div>
    </div>,
    document.body
  );
}