"use client";
import { motion } from "framer-motion";

export default function DotPattern({ density = "medium" }) {
  const gridSize = density === "high" ? 20 : density === "low" ? 50 : 30;
  const dotSize = density === "high" ? 1 : density === "low" ? 2 : 1.5;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="dot-pattern"
            x="0"
            y="0"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <motion.circle
              cx={gridSize / 2}
              cy={gridSize / 2}
              r={dotSize}
              fill="currentColor"
              className="text-cyan-400"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.5, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>
    </div>
  );
}
