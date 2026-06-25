"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";

const ENTRANCE_STYLES = [
  { x: -120, y: 0, rotation: -8, scale: 0.7 },
  { x: 120, y: 0, rotation: 8, scale: 0.7 },
  { x: 0, y: -80, rotation: 6, scale: 0.8 },
  { x: 0, y: 80, rotation: -6, scale: 0.8 },
  { x: -80, y: -60, rotation: -12, scale: 0.65 },
  { x: 80, y: 60, rotation: 12, scale: 0.65 },
];

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const headerBarRef = useRef(null);
  const gridRef = useRef(null);
  const footerRef = useRef(null);

  const projects = [
    {
      title: 'BM Electronics',
      desc: "BM Electronics is a website for the international company of electronic devices.",
      link: "https://www.bm-electrics.com/",
      tech: ["React", "Vite", "TailwindCSS", "TanStack-query", "axios", "Zustand"],
      gradient: "from-purple-500 to-pink-500",
      image: "/assets/bm-elctron.png",
      icon: "fas fa-laptop-code",
    },
    {
      title: "Connecto platform",
      desc: "Connecto is a Saas platform to connect multi-platforms togther in a single dashboard impored by strop Ai tools",
      link: "https://platform.connecto-me.com/",
      tech: ["React", "Vite", "TailwindCSS", "TanStack-query", "axios", "Zustand", "motion"],
      gradient: "from-blue-600 to-cyan-400",
      icon: "fas fa-network-wired",
      image: "/assets/connecto.png",
    },
    {
      title: "KaraKeeb",
      desc: "KaraKeeb is a website for a modern furnuter store with slick desgin and attractive colors",
      link: "https://www.karakeeb.com.eg/",
      tech: ["React", "Vite", "TailwindCSS", "TanStack-query", "axios", "Zustand"],
      gradient: "from-amber-500 to-orange-600",
      icon: "fas fa-chair",
      image: "/assets/karakeeb.png",
    },
    {
      title: "Connecto AM DashBoard",
      desc: "Connecto AM DashBoard is a dashboard for managing AM accounts",
      tech: ["React", "Vite", "TailwindCSS", "TanStack-query", "axios", "Zustand"],
      gradient: "from-teal-500 to-emerald-400",
      icon: "fas fa-users-cog",
      image: "/assets/am-connecto.png",
    },
    {
      title: "CRUD Store Manager",
      desc: "A comprehensive CRUD system mimicking store operations with full product management capabilities",
      link: "https://abdhsrag.github.io/Cruds/",
      tech: ["JavaScript", "LocalStorage", "CSS3"],
      gradient: "from-cyan-500 to-blue-600",
      icon: "fas fa-database",
      image: "/assets/1.png",
    },
    {
      title: "Restaurant Dark Mode",
      desc: "Modern restaurant page featuring dark mode toggle with smooth transitions and elegant design",
      link: "https://abdhsrag.github.io/darkmood/",
      tech: ["HTML5", "CSS3", "JavaScript"],
      gradient: "from-rose-500 to-red-600",
      icon: "fas fa-utensils",
      image: "/assets/2.png",
    },
    {
      title: "Rock Paper Scissors",
      desc: "Classic game with score tracking and smooth animations where you play against AI",
      link: "https://abdhsrag.github.io/Rock-Paper-Scissors/",
      tech: ["JavaScript", "Game Logic", "CSS3"],
      gradient: "from-yellow-400 to-amber-600",
      icon: "fas fa-gamepad",
      image: "/assets/3.png",
    },
    {
      title: "Solar Power Landing",
      desc: "Professional landing page for solar power company with fully responsive design",
      link: "https://abdhsrag.github.io/landing-page/",
      tech: ["HTML5", "CSS3", "Bootstrap"],
      gradient: "from-green-500 to-teal-400",
      icon: "fas fa-solar-panel",
      image: "/assets/4.png",
    },
    {
      title: "To-Do List App",
      desc: "Beautiful to-do list application with modern UI and calming background design",
      link: "https://abdhsrag.github.io/to-do-list/",
      tech: ["JavaScript", "LocalStorage", "CSS3"],
      gradient: "from-fuchsia-500 to-purple-600",
      icon: "fas fa-clipboard-list",
      image: "/assets/5.png",
    },
    {
      title: "Interior Design Landing",
      desc: "Elegant landing page for interior design company with sophisticated layout",
      link: "https://abdhsrag.github.io/landing-page-for-interior-design-company/",
      tech: ["HTML5", "CSS3", "JavaScript"],
      gradient: "from-indigo-500 to-violet-600",
      icon: "fas fa-couch",
      image: "/assets/6.png",
    },
    {
      title: "Animal Gallery",
      desc: "Calming and simple animal gallery featuring smooth animations and transitions",
      link: "https://abdhsrag.github.io/gallery/",
      tech: ["HTML5", "CSS3", "JavaScript"],
      gradient: "from-emerald-500 to-green-600",
      icon: "fas fa-paw",
      image: "/assets/7.png",
    },
    {
      title: "Shopping Cart",
      desc: "Small online shop with login system, shopping cart, and clean design",
      link: "https://abdhsrag.github.io/shopping-cart/",
      tech: ["JavaScript", "CSS3", "Bootstrap"],
      gradient: "from-orange-500 to-red-500",
      icon: "fas fa-shopping-cart",
      image: "/assets/8.png",
    },
    {
      title: "E-commerce Fullstack",
      desc: "Full-stack e-commerce platform with Django backend and modern frontend",
      link: "https://github.com/Abdhsrag/E-commer-fullstack-django-",
      tech: ["Django", "DjangoFastApi", "CSS3", "Bootstrap", "Python"],
      gradient: "from-sky-500 to-indigo-600",
      icon: "fas fa-store",
      image: "/assets/9.png",
    },
    {
      title: "Movies Site",
      desc: "Movie catalog website with ratings, reviews, and detailed information",
      link: "https://github.com/Abdhsrag/moviesite",
      tech: ["React", "CSS3", "Bootstrap", "JavaScript"],
      gradient: "from-violet-500 to-pink-500",
      icon: "fas fa-film",
      image: "/assets/10.png",
    },
    {
      title: "Charity Backend",
      desc: "Robust backend system for charity platform with API endpoints",
      link: "https://github.com/Abdhsrag/charity",
      tech: ["Django", "DjangoFastApi", "Python"],
      gradient: "from-red-400 to-rose-600",
      icon: "fas fa-server",
    },
    {
      title: "Charity Frontend",
      desc: "Modern frontend interface for charity platform with responsive design",
      link: "https://github.com/Abdhsrag/charity-front",
      tech: ["React", "JavaScript", "Bootstrap", "CSS"],
      gradient: "from-pink-500 to-rose-400",
      icon: "fas fa-hand-holding-heart",
      image: "/assets/11.png",
    },
    {
      title: "Hospital Management",
      desc: "Hospital management system built using Odoo ERP framework",
      link: "https://github.com/Abdhsrag/hospital-mangement-odoo",
      tech: ["Odoo", "Python"],
      gradient: "from-blue-500 to-indigo-500",
      icon: "fas fa-hospital",
      image: "/assets/12.png",
    },
    {
      title: "Bash Database System",
      desc: "Database management system mimicking SQL operations using Bash scripting",
      link: "https://github.com/Abdhsrag/bashProject",
      tech: ["Bash"],
      gradient: "from-slate-600 to-gray-800",
      icon: "fas fa-terminal",
    },
    {
      title: "Blood Donation System",
      desc: "Comprehensive blood donation matching system with AI-powered notifications and inventory management",
      link: "https://github.com/Abdhsrag/final-project",
      tech: ["DjangoFastApi", "React", "Django", "LangChain", "PostgreSQL", "GoogleMaps"],
      gradient: "from-red-600 to-pink-700",
      icon: "fas fa-heartbeat",
      image: "/assets/13.png",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        headerBarRef.current,
        { width: 0 },
        {
          width: "100%",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const cards = Array.from(gridRef.current?.children || []);
      if (cards.length) {
        cards.forEach((card, i) => {
          const s = ENTRANCE_STYLES[i % ENTRANCE_STYLES.length];
          gsap.set(card, { opacity: 0, x: s.x, y: s.y, rotation: s.rotation, scale: s.scale });
          gsap.to(card, {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              end: "top top+=100",
              scrub: true,
            },
          });
        });
      }

      gsap.fromTo(
        footerRef.current,
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={headerRef}
          className="text-center mb-12 sm:mb-20 opacity-0"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 px-4">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <div
            ref={headerBarRef}
            className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full mb-4 sm:mb-6"
            style={{ width: 0 }}
          />
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Here are some of my recent projects that showcase my skills and
            creativity
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {projects.length === 0 ? (
            <p className="col-span-full text-center text-gray-400 py-20 text-lg">
              Projects coming soon...
            </p>
          ) : (
            projects.map((project, index) => (
              <ProjectCard
                key={project.title.toLowerCase().replace(/\s+/g, "-")}
                index={index}
                {...project}
              />
            ))
          )}
        </div>

        <div
          ref={footerRef}
          className="text-center mt-12 sm:mt-16 px-4 opacity-0"
        >
          <a
            href="https://github.com/Abdhsrag"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full font-semibold text-sm sm:text-base lg:text-lg group hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            <i className="fab fa-github text-xl sm:text-2xl" />
            <span>View More on GitHub</span>
            <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
