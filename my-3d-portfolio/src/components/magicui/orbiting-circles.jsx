"use client";
import { motion } from "framer-motion";

export default function OrbitingCircles({ icons = [], radius = 180 }) {
  const iconCount = icons.length;

  if (iconCount === 0) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central Glow Effect */}
      <div className="absolute z-0 w-48 h-48 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
      
      {/* Central Circle */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="absolute z-10 w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center shadow-2xl"
      >
        <span className="text-4xl font-black text-white">AM</span>
      </motion.div>

      {/* Outer Ring */}
      <motion.div
        className="absolute rounded-full border-2 border-cyan-400/20"
        style={{ width: radius * 2, height: radius * 2 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Orbiting Icons */}
      {icons.map((icon, i) => {
        const angle = (i / iconCount) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={i}
            className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl hover:scale-110 hover:border-cyan-400/50 transition-all cursor-pointer group"
            style={{
              left: "50%",
              top: "50%",
              marginLeft: "-40px", // Half of width
              marginTop: "-40px",  // Half of height
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: x,
              y: y,
              opacity: 1,
              scale: 1,
            }}
            transition={{
              opacity: { delay: i * 0.1, duration: 0.5 },
              scale: { delay: i * 0.1, duration: 0.5, type: "spring" },
              x: { delay: i * 0.1, duration: 1, type: "spring" },
              y: { delay: i * 0.1, duration: 1, type: "spring" },
            }}
            whileHover={{ scale: 1.2 }}
          >
            <i className={`${icon} text-2xl md:text-3xl text-cyan-400 group-hover:text-cyan-300 transition-colors`} />
          </motion.div>
        );
      })}
    </div>
  );
}