"use client";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import AnimatedGrid from "./magicui/animated-grid";
import { useMemo } from "react";

export default function ProjectsSection() {
  // Memoize projects array to prevent re-creation
  const projects = useMemo(() => [
    {
      title: "CRUD Store Manager",
      desc: "A comprehensive CRUD system mimicking store operations with full product management capabilities",
      link: "https://abdhsrag.github.io/Cruds/",
      tech: ["JavaScript", "LocalStorage", "CSS3"],
      gradient: "from-cyan-400 to-blue-500",
      icon: "fas fa-shopping-cart",
      image: "/assets/1.png",
    },
    {
      title: "Restaurant Dark Mode",
      desc: "Modern restaurant page featuring dark mode toggle with smooth transitions and elegant design",
      link: "https://abdhsrag.github.io/darkmood/",
      tech: ["HTML5", "CSS3", "JavaScript"],
      gradient: "from-purple-400 to-pink-500",
      icon: "fas fa-utensils",
      image: "/assets/2.png",
    },
    {
      title: "Rock Paper Scissors",
      desc: "Classic game with score tracking and smooth animations where you play against AI",
      link: "https://abdhsrag.github.io/Rock-Paper-Scissors/",
      tech: ["JavaScript", "Game Logic", "CSS3"],
      gradient: "from-yellow-400 to-orange-500",
      icon: "fas fa-hand-rock",
      image: "/assets/3.png",
    },
    {
      title: "Solar Power Landing",
      desc: "Professional landing page for solar power company with fully responsive design",
      link: "https://abdhsrag.github.io/landing-page/",
      tech: ["HTML5", "CSS3", "Bootstrap"],
      gradient: "from-green-400 to-cyan-500",
      icon: "fas fa-solar-panel",
      image: "/assets/4.png",
    },
    {
      title: "To-Do List App",
      desc: "Beautiful to-do list application with modern UI and calming background design",
      link: "https://abdhsrag.github.io/to-do-list/",
      tech: ["JavaScript", "LocalStorage", "CSS3"],
      gradient: "from-pink-400 to-red-500",
      icon: "fas fa-list-check",
      image: "/assets/5.png",
    },
    {
      title: "Interior Design Landing",
      desc: "Elegant landing page for interior design company with sophisticated layout",
      link: "https://abdhsrag.github.io/landing-page-for-interior-design-company/",
      tech: ["HTML5", "CSS3", "JavaScript"],
      gradient: "from-indigo-400 to-purple-500",
      icon: "fas fa-couch",
      image: "/assets/6.png",
    },
    {
      title: "Animal Gallery",
      desc: "Calming and simple animal gallery featuring smooth animations and transitions",
      link: "https://abdhsrag.github.io/gallery/",
      tech: ["HTML5", "CSS3", "JavaScript"],
      gradient: "from-teal-400 to-green-500",
      icon: "fas fa-image",
      image: "/assets/7.png",
    },
    {
      title: "Shopping Cart",
      desc: "Small online shop with login system, shopping cart, and clean design",
      link: "https://abdhsrag.github.io/shopping-cart/",
      tech: ["JavaScript", "CSS3", "Bootstrap"],
      gradient: "from-orange-400 to-red-500",
      icon: "fas fa-cart-shopping",
      image: "/assets/8.png",
    },
    {
      title: "E-commerce Fullstack",
      desc: "Full-stack e-commerce platform with Django backend and modern frontend",
      link: "https://github.com/Abdhsrag/E-commer-fullstack-django-",
      tech: ["Django", "DjangoFastApi", "CSS3", "Bootstrap", "Python"],
      gradient: "from-red-400 to-blue-500",
      icon: "fas fa-store",
      image: "/assets/9.png",
    },
    {
      title: "Movies Site",
      desc: "Movie catalog website with ratings, reviews, and detailed information",
      link: "https://github.com/Abdhsrag/moviesite",
      tech: ["React", "CSS3", "Bootstrap", "JavaScript"],
      gradient: "from-blue-400 to-orange-500",
      icon: "fas fa-film",
      image: "/assets/10.png",
    },
    {
      title: "Charity Backend",
      desc: "Robust backend system for charity platform with API endpoints",
      link: "https://github.com/Abdhsrag/charity",
      tech: ["Django", "DjangoFastApi", "Python"],
      gradient: "from-orange-400 to-pink-500",
      icon: "fas fa-hand-holding-heart",
    },
    {
      title: "Charity Frontend",
      desc: "Modern frontend interface for charity platform with responsive design",
      link: "https://github.com/Abdhsrag/charity-front",
      tech: ["React", "JavaScript", "Bootstrap", "CSS"],
      gradient: "from-pink-400 to-purple-500",
      icon: "fas fa-hands-helping",
      image: "/assets/11.png",
    },
    {
      title: "Hospital Management",
      desc: "Hospital management system built using Odoo ERP framework",
      link: "https://github.com/Abdhsrag/hospital-mangement-odoo",
      tech: ["Odoo", "Python"],
      gradient: "from-purple-400 to-indigo-500",
      icon: "fas fa-hospital",
      image: "/assets/12.png",
    },
    {
      title: "Bash Database System",
      desc: "Database management system mimicking SQL operations using Bash scripting",
      link: "https://github.com/Abdhsrag/bashProject",
      tech: ["Bash"],
      gradient: "from-gray-400 to-gray-600",
      icon: "fas fa-terminal",
    },
    {
      title: "Blood Donation System",
      desc: "Comprehensive blood donation matching system with AI-powered notifications and inventory management",
      link: "https://github.com/Abdhsrag/final-project",
      tech: ["DjangoFastApi", "React", "Django", "LangChain", "PostgreSQL", "GoogleMaps"],
      gradient: "from-red-500 to-pink-600",
      icon: "fas fa-droplet",
      image: "/assets/13.png",
    },
  ], []);

  return (
    <section id="projects" className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden">
      <AnimatedGrid />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 sm:mb-20"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">Featured Projects</span>
          </motion.h2>
          <motion.div 
            className="w-16 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full mb-4 sm:mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Here are some of my recent projects that showcase my skills and creativity
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} index={index} {...project} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16 px-4"
        >
          <motion.a
            href="https://github.com/Abdhsrag"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full font-semibold text-sm sm:text-base lg:text-lg group"
          >
            <i className="fab fa-github text-xl sm:text-2xl" />
            <span>View More on GitHub</span>
            <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}