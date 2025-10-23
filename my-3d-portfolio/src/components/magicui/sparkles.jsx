"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Sparkles({ density = "medium" }) {
  const [sparkles, setSparkles] = useState([]);
  
  const intervalTime = density === "high" ? 100 : density === "low" ? 500 : 300;

  useEffect(() => {
    const interval = setInterval(() => {
      const newSparkle = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        color: ["#00d9ff", "#a855f7", "#ec4899"][Math.floor(Math.random() * 3)],
      };
      setSparkles((prev) => [...prev.slice(-40), newSparkle]);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [intervalTime]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: sparkle.color,
            boxShadow: `0 0 ${sparkle.size * 3}px ${sparkle.color}`,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
