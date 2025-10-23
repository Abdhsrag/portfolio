"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Meteors({ number = 10 }) {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    const newMeteors = Array.from({ length: number }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
      size: Math.random() * 2 + 1,
    }));
    setMeteors(newMeteors);
  }, [number]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {meteors.map((meteor) => (
        <motion.div
          key={meteor.id}
          className="absolute rounded-full"
          style={{
            left: meteor.left,
            width: meteor.size,
            height: meteor.size,
            background: "radial-gradient(circle, rgba(0,217,255,1) 0%, rgba(0,217,255,0) 70%)",
            boxShadow: "0 0 10px 2px rgba(0,217,255,0.8)",
          }}
          initial={{ top: -100, opacity: 1 }}
          animate={{ top: "110vh", opacity: [1, 1, 0] }}
          transition={{
            duration: meteor.duration,
            delay: meteor.delay,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "linear",
          }}
        >
          <div 
            className="absolute top-0 left-0 w-20 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent"
            style={{ transform: "rotate(-45deg)", transformOrigin: "top left" }}
          />
        </motion.div>
      ))}
    </div>
  );
}
