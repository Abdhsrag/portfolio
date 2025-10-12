"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Background3D from "../components/Background3D";
import NavBar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const { scrollYProgress } = useScroll();
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

  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <main className="relative min-h-screen text-white bg-black overflow-x-hidden">
      <Background3D />
      <NavBar />

      {/* 🚀 HERO SECTION */}
      <motion.section
        id="home"
        style={{ y, opacity }}
        className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 z-10"
      >
        <motion.div
          style={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          className="relative z-10"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, type: "spring" }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 p-1 animate-pulse-slow">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-6xl">
                👨‍💻
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-black mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">Hi, I'm </span>
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
              Abdelrahman Mohamed
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {["React", "Next.js", "TypeScript", "Angular", "Python", "Django", "JavaScript"].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="px-6 py-2 bg-white/5 backdrop-blur-xl border border-cyan-400/30 rounded-full text-sm font-semibold hover:bg-cyan-400/10 transition-all cursor-pointer"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <span className="text-cyan-400 font-bold">Fullstack Developer</span> crafting beautiful and functional web experiences 🚀
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex gap-6 justify-center flex-wrap"
          >
            <a href="#projects" className="btn-primary group">
              <span className="relative z-10">View Projects</span>
            </a>

            <a href="#contact" className="btn-secondary">
              Let's Talk
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-8 h-12 border-2 border-cyan-400 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-2 h-2 bg-cyan-400 rounded-full"
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* 💎 ABOUT & SKILLS SECTION */}
      <section id="about" className="relative py-32 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl md:text-7xl font-black mb-6">
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                About Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <p className="text-lg leading-relaxed text-gray-300 mb-6">
                Hey there! 👋 I'm{" "}
                <span className="text-cyan-400 font-bold">Abdelrahman Mohamed</span>, a passionate{" "}
                <span className="text-purple-400 font-bold">Fullstack Developer</span> from Egypt 🇪🇬
              </p>
              <p className="text-lg leading-relaxed text-gray-300 mb-6">
                I specialize in building modern, responsive web applications using{" "}
                <strong>HTML5, CSS3, JavaScript, Python, and Django</strong>. I love creating intuitive user interfaces and solving complex problems.
              </p>
              <p className="text-lg leading-relaxed text-gray-300">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or working on my next big idea 💡
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { label: "Projects", value: "20+" },
                { label: "Experience", value: "2Y+" },
                { label: "Technologies", value: "10+" },
                { label: "Coffee", value: "∞" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="glass-card p-6 text-center"
                >
                  <div className="text-4xl font-black text-gradient bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Skills Section */}
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="text-center"
>
  <h3 className="text-4xl font-black mb-12 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
    My Skills
  </h3>
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
    {[
      { icon: "fab fa-html5", name: "HTML5", color: "#E34F26", type: "icon" },
      { icon: "fab fa-css3-alt", name: "CSS3", color: "#1572B6", type: "icon" },
      { icon: "fab fa-js", name: "JavaScript", color: "#F7DF1E", type: "icon" },
      { icon: "fab fa-react", name: "React", color: "#61DAFB", type: "icon" },
      { icon: "fab fa-angular", name: "Angular", color: "#DD0031", type: "icon" },
      { 
        name: "Next.js", 
        color: "#FFFFFF", 
        type: "svg",
        svg: (
          <svg viewBox="0 0 180 180" fill="currentColor" className="w-12 h-12">
            <path d="M89.5 0C40.1 0 0 40.1 0 89.5S40.1 179 89.5 179 179 138.9 179 89.5 138.9 0 89.5 0zm41.2 142.5c-1.5 2.6-4.8 3.4-7.4 1.9l-38.4-22.2c-2.6-1.5-3.4-4.8-1.9-7.4 1.5-2.6 4.8-3.4 7.4-1.9l38.4 22.2c2.6 1.5 3.4 4.8 1.9 7.4zm13.5-23.3c-1.5 2.6-4.8 3.4-7.4 1.9L74.6 81.4c-2.6-1.5-3.4-4.8-1.9-7.4 1.5-2.6 4.8-3.4 7.4-1.9l62.2 39.7c2.6 1.5 3.4 4.8 1.9 7.4z"/>
          </svg>
        )
      },
      { 
        name: "TypeScript", 
        color: "#3178C6", 
        type: "svg",
        svg: (
          <svg viewBox="0 0 128 128" fill="currentColor" className="w-12 h-12">
            <path d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51.4 59h22z"/>
          </svg>
        )
      },
      { icon: "fab fa-bootstrap", name: "Bootstrap", color: "#7952B3", type: "icon" },
      { icon: "fas fa-database", name: "Database", color: "#4DB33D", type: "icon" },
      { icon: "fab fa-python", name: "Python", color: "#3776AB", type: "icon" },
      { icon: "fab fa-git-alt", name: "Git", color: "#F05032", type: "icon" },
      { icon: "fab fa-github", name: "GitHub", color: "#181717", type: "icon" },
      { icon: "fab fa-linux", name: "Linux", color: "#FCC624", type: "icon" },
    ].map((skill, i) => (
      <motion.div
        key={skill.name}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.05 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.15, rotate: 5 }}
        className="flex flex-col items-center gap-3 glass-card p-6 rounded-xl relative overflow-hidden group"
      >
        {/* Hover glow effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
          style={{ background: skill.color }}
        />
        
        {/* Icon or SVG */}
        {skill.type === "svg" ? (
          <div style={{ color: skill.color }} className="relative z-10">
            {skill.svg}
          </div>
        ) : (
          <i 
            className={`${skill.icon} text-5xl relative z-10`}
            style={{ color: skill.color }}
          ></i>
        )}
        
        {/* Name */}
        <span className="text-xs text-gray-400 relative z-10 font-medium">
          {skill.name}
        </span>
      </motion.div>
    ))}
  </div>
</motion.div>
        </div>
      </section>

      {/* 🔥 PROJECTS SECTION */}
      <section id="projects" className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-black mb-6">
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                Featured Projects
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Here are some of my projects that showcase my skills and creativity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              title="CRUD Store Manager"
              desc="A CRUD system made to mimic how a store site would operate with full product management"
              link="https://abdhsrag.github.io/Cruds/"
              tech={["JavaScript", "LocalStorage", "CSS3"]}
              gradient="from-cyan-400 to-blue-500"
            />
            <ProjectCard
              title="Restaurant Dark Mode"
              desc="A simple restaurant page with dark mode toggle and modern design"
              link="https://abdhsrag.github.io/darkmood/"
              tech={["HTML5", "CSS3", "JavaScript"]}
              gradient="from-purple-400 to-pink-500"
            />
            <ProjectCard
              title="Rock Paper Scissors"
              desc="The classic game where you can play against the PC with score tracking"
              link="https://abdhsrag.github.io/Rock-Paper-Scissors/"
              tech={["JavaScript", "Game Logic", "CSS3"]}
              gradient="from-yellow-400 to-orange-500"
            />
            <ProjectCard
              title="Solar Power Landing"
              desc="Landing page for a solar power company with responsive design"
              link="https://abdhsrag.github.io/landing-page/"
              tech={["HTML5", "CSS3", "Bootstrap"]}
              gradient="from-green-400 to-cyan-500"
            />
            <ProjectCard
              title="To-Do List App"
              desc="A to-do list with modern feel and calming background design"
              link="https://abdhsrag.github.io/to-do-list/"
              tech={["JavaScript", "LocalStorage", "CSS3"]}
              gradient="from-pink-400 to-red-500"
            />
            <ProjectCard
              title="Interior Design Landing"
              desc="Landing page for an interior design company with elegant layout"
              link="https://abdhsrag.github.io/landing-page-for-interior-design-company/"
              tech={["HTML5", "CSS3", "JavaScript"]}
              gradient="from-indigo-400 to-purple-500"
            />
            <ProjectCard
              title="Animal Gallery"
              desc="A calming and simple animal gallery with smooth animations"
              link="https://abdhsrag.github.io/gallery/"
              tech={["HTML5", "CSS3", "JavaScript"]}
              gradient="from-teal-400 to-green-500"
            />
            <ProjectCard
              title="Small Online Shop"
              desc="A small online shop with login, shopping cart, and simple design"
              link="https://abdhsrag.github.io/shopping-cart/"
              tech={["JavaScript", "CSS3", "Bootstrap"]}
              gradient="from-orange-400 to-red-500"
            />
            <ProjectCard
              title="Full stack E-commerce using django"
              desc="A small online shop with login, shopping cart, and simple design"
              link="https://github.com/Abdhsrag/E-commer-fullstack-django-"
              tech={["Django", "DjangoFastApi","CSS3", "Bootstrap", "python"]}
              gradient="from-red-400 to-blue-500"
            />
            <ProjectCard
              title="Movies Site"
              desc="A movie catalog site with ratings"
              link="https://github.com/Abdhsrag/moviesite"
              tech={["React","CSS3", "Bootstrap", "JS"]}
              gradient="from-blue-400 to-orange-500"
            />
            <ProjectCard
              title="Charity Backend site"
              desc="The backend of a charity site"
              link="https://github.com/Abdhsrag/charity"
              tech={["Django","DjangoFastApi", "Python"]}
              gradient="from-orange-400 to-pink-500"
            />
            <ProjectCard
              title="Charity Frontend site"
              desc="The Frontend of a charity site"
              link="https://github.com/Abdhsrag/charity-front"
              tech={["React","JS", "BootStrap", "CSS"]}
              gradient="from-orange-400 to-pink-500"
            />
            <ProjectCard
              title="Odoo hospital mangement system"
              desc="A system for manging hospitals made using Odoo Erp system"
              link="https://github.com/Abdhsrag/hospital-mangement-odoo"
              tech={["Odoo","Python"]}
              gradient="from-pink-400 to-purple-500"
            />
            <ProjectCard
              title="Bash dataBase mangement system"
              desc="A system for mimicking the mangement of a data base "
              link="https://github.com/Abdhsrag/bashProject"
              tech={["Bash"]}
              gradient="from-purple-400 to-black-500"
            />
            <ProjectCard
              title="Blood donations and Blood center mangement system"
              desc="A system for easy blood donation matching, notifications, filtration and blood center inventory mangement"
              link="https://github.com/Abdhsrag/final-project"
              tech={["DjangoFastApi", "React", "Django", "LangChain", "PostgreSql","GoogleMaps"]}
              gradient="from-pink-400 to-red-500"
            />
          </div>
        </div>
      </section>

      {/* ✉️ CONTACT SECTION */}
      <section id="contact" className="relative py-32 px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-6xl md:text-7xl font-black mb-6">
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                Let's Connect
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full mb-12"></div>

            <p className="text-2xl text-gray-300 mb-12">
              Have a project in mind? Let's build something{" "}
              <span className="text-cyan-400 font-bold">amazing</span> together! 🚀
            </p>

            <div className="flex justify-center gap-8 mb-12">
              {[
                { 
                  icon: "fab fa-github", 
                  label: "GitHub", 
                  href: "https://github.com/Abdhsrag",
                  color: "hover:text-gray-400"
                },
                { 
                  icon: "fab fa-linkedin", 
                  label: "LinkedIn", 
                  href: "https://www.linkedin.com/in/abdelrahmanmohamedosama",
                  color: "hover:text-blue-500"
                },
                { 
                  icon: "fab fa-whatsapp", 
                  label: "WhatsApp", 
                  href: "https://wa.me/201277116459",
                  color: "hover:text-green-500"
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-20 h-20 rounded-full glass-card flex flex-col items-center justify-center text-4xl transition-all ${social.color}`}
                  target="_blank"
                  rel="noreferrer"
                  title={social.label}
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </div>

            <div className="text-gray-400 text-lg">
              <p>📧 <a href="mailto:abdhsrag280@gmail.com" className="text-cyan-400 hover:underline">abdhsrag280@gmail.com</a></p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ⚡ FOOTER */}
      <footer className="relative py-12 px-6 border-t border-white/5 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <p className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
                Abdelrahman Mohamed
              </p>
              <p className="text-sm text-gray-400">
                                Fullstack Developer | Building the future, one line of code at a time
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Abdelrahman Mohamed. All Rights Reserved
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Crafted with 💙 using Next.js & Three.js
              </p>
            </motion.div>
          </div>
        </div>
      </footer>
    </main>
  );
}