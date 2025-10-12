"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProjectCard({ title, desc, link, tech, gradient }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>

      {/* Card Content */}
      <div className="relative glass-card p-8 h-full flex flex-col overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}></div>
        </div>

        {/* Icon/Badge */}
        <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl font-black mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <i className="fas fa-rocket text-white"></i>
        </div>

        {/* Title */}
        <h3 className="relative text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="relative text-gray-400 mb-6 flex-grow leading-relaxed text-sm">
          {desc}
        </p>

        {/* Tech Stack */}
        <div className="relative flex flex-wrap gap-2 mb-6">
          {tech.map((t) => (
            <span
              key={t}
              className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:bg-white/10 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="relative inline-flex items-center gap-2 text-cyan-400 font-semibold group/link"
          whileHover={{ x: 5 }}
        >
          <span>View Project</span>
          <motion.svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </motion.svg>
        </motion.a>
      </div>
    </motion.div>
  );
}