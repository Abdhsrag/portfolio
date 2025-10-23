"use client";
import { FloatingDock } from "./ui/floating-dock";

export default function FloatingNav() {
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
      title: "Skills",
      icon: <i className="fas fa-tools text-white text-xl" />,
      href: "#about",
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
    {
      title: "WhatsApp",
      icon: <i className="fab fa-whatsapp text-white text-xl" />,
      href: "https://wa.me/201277116459",
    },
  ];

  return (
    <div className="fixed bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <FloatingDock items={links} />
    </div>
  );
}