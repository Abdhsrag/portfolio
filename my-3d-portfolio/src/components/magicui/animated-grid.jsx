"use client";
import { motion } from "framer-motion";

export default function AnimatedGrid() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-30">
      <div className="grid-pattern absolute inset-0" />
      
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          style={{ top: `${i * 20 + 10}%` }}
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
