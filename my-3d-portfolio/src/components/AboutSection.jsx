"use client";
import { motion } from "framer-motion";
import FloatingParticles from "./magicui/floating-particles";

export default function AboutSection() {
  const skills = [
    { icon: "fab fa-html5", name: "HTML5", color: "#E34F26" },
    { icon: "fab fa-css3-alt", name: "CSS3", color: "#1572B6" },
    { icon: "fab fa-js", name: "JavaScript", color: "#F7DF1E" },
    { icon: "fab fa-react", name: "React", color: "#61DAFB" },
    { icon: "fab fa-angular", name: "Angular", color: "#DD0031" },
    { icon: "fab fa-node-js", name: "Node.js", color: "#339933" },
    { 
      icon: "fab fa-react", // Next.js uses React icon
      name: "Next.js", 
      color: "#FFFFFF",
    },
    { 
      icon: "fab fa-js-square", // TypeScript - using JS icon as fallback
      name: "TypeScript", 
      color: "#3178C6",
    },
    { icon: "fab fa-bootstrap", name: "Bootstrap", color: "#7952B3" },
    { icon: "fas fa-database", name: "PostgreSQL", color: "#4169E1" },
    { icon: "fab fa-python", name: "Python", color: "#3776AB" },
    { 
      icon: "fab fa-python", // Django uses Python icon
      name: "Django", 
      color: "#092E20",
    },
    { 
      icon: "fab fa-python", // Flask uses Python icon
      name: "Flask", 
      color: "#000000",
    },
    { 
      icon: "fas fa-terminal", // Bash
      name: "Bash", 
      color: "#4EAA25",
    },
    { icon: "fab fa-git-alt", name: "Git", color: "#F05032" },
    { icon: "fab fa-github", name: "GitHub", color: "#181717" },
    { icon: "fab fa-linux", name: "Linux", color: "#FCC624" },
  ];

  const stats = [
    { label: "Projects", value: "20+" },
    { label: "Experience", value: "2Y+" },
    { label: "Technologies", value: "17+" }, // Updated count
    { label: "Coffee", value: "∞" },
  ];

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Background Effects */}
      <FloatingParticles count={15} />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-black mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">About Me</span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card p-8 space-y-6"
          >
            <p className="text-lg leading-relaxed text-gray-300">
              Hey there! I&apos;m{" "}
              <span className="text-cyan-400 font-bold">Abdelrahman Mohamed</span>, a passionate{" "}
              <span className="text-purple-400 font-bold">Fullstack Developer</span> from Egypt 🇪🇬
            </p>
            <p className="text-lg leading-relaxed text-gray-300">
              I specialize in building modern, responsive web applications using{" "}
              <strong className="text-cyan-400">React, Next.js, TypeScript, Python, Django, and Flask</strong>. 
              I love creating intuitive user interfaces and solving complex problems with elegant solutions.
            </p>
            <p className="text-lg leading-relaxed text-gray-300">
              When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to 
              open-source projects, or working on my next big idea. I believe in continuous learning and 
              staying up-to-date with the latest industry trends.
            </p>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold mt-4"
            >
              Let's Work Together
              <i className="fas fa-arrow-right"></i>
            </motion.a>
          </motion.div>

          {/* Right: Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="glass-card p-6 text-center group cursor-default"
              >
                <div className="text-5xl font-black text-gradient mb-2 group-hover:scale-110 transition-transform">
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
          <h3 className="text-4xl md:text-5xl font-black mb-12">
            <span className="text-gradient">My Tech Stack</span>
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="flex flex-col items-center gap-3 glass-card p-6 rounded-xl relative overflow-hidden group cursor-pointer"
              >
                {/* Glow Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                  style={{ background: skill.color }}
                />
                
                {/* Icon */}
                <i 
                  className={`${skill.icon} text-4xl md:text-5xl relative z-10 transition-all duration-300 group-hover:scale-110`}
                  style={{ color: skill.color }}
                />
                
                {/* Name */}
                <span className="text-xs text-gray-400 relative z-10 font-medium group-hover:text-white transition-colors text-center">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}