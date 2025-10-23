"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function ProjectCard({ title, desc, link, tech, gradient, icon = "fas fa-rocket", image, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full"
    >
      {/* Glow Effect */}
      <motion.div 
        className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
      />
      
      {/* Card Content */}
      <div className="relative glass-card h-full flex flex-col backdrop-blur-xl rounded-2xl border-2 border-transparent group-hover:border-cyan-400/30 transition-all overflow-hidden">
        
        {/* Image Preview - Expands on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="relative w-full h-48 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 192, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {image && !imageError ? (
                // Show actual image if available
                <>
                  <Image 
                    src={image} 
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </>
              ) : (
                // Show gradient placeholder if no image or image error
                <>
                  <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
                    {/* Animated background pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-20"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                      style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    
                    {/* Large icon */}
                    <i className={`${icon} text-6xl text-white/30 relative z-10`} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-6 sm:p-8 flex flex-col flex-grow">
          {/* Icon Badge */}
          <motion.div 
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 sm:mb-6 shadow-lg`}
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <i className={`${icon} text-white text-xl sm:text-2xl`} />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white group-hover:text-gradient transition-all">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 flex-grow leading-relaxed line-clamp-3">
            {desc}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {tech.map((t, techIndex) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (index * 0.1) + (techIndex * 0.05) }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:bg-white/10 hover:border-cyan-400/30 transition-all"
              >
                {t}
              </motion.span>
            ))}
          </div>

          {/* CTA Link */}
          <motion.a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="group/link inline-flex items-center gap-2 text-cyan-400 font-semibold mt-auto hover:gap-4 transition-all text-sm sm:text-base"
            whileHover={{ x: 5 }}
          >
            <span>View Project</span>
            <motion.i 
              className="fas fa-arrow-right"
              animate={{ x: isHovered ? [0, 5, 0] : 0 }}
              transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
            />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}