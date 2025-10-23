"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      
      {/* 1. Sky - Quick fade in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <img src="/assets/sky.png" alt="" className="w-full h-full object-cover" />
      </motion.div>

      {/* 2. Rocks-3 - Quick slide from bottom */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="absolute bottom-0 left-0 w-full h-2/3"
        style={{ transform: `translateY(${scrollY * 0.6}px)` }}
      >
        <img src="/assets/rocks-3.png" alt="" className="w-full h-full object-cover object-bottom" />
      </motion.div>

      {/* 3. Rocks-2 - Quick slide from bottom */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="absolute bottom-0 left-0 w-full h-full"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <img src="/assets/rocks-2.png" alt="" className="w-full h-full object-cover object-bottom" />
      </motion.div>

      {/* 4. Star-1 - Quick slide from right */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: "0%", opacity: 0.5 }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
      >
        <img 
          src="/assets/star-1.png" 
          alt="" 
          className="w-full h-full object-cover"
          style={{ mixBlendMode: "screen" }}
        />
      </motion.div>

      {/* 5. Star-2 - Quick slide from left */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "0%", opacity: 0.6 }}
        transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <img src="/assets/star-2.png" alt="" className="w-full h-full object-cover" />
      </motion.div>

      {/* 6. Rocks-1 - Quick drop from top */}
      <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 0.7 }}
        transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <img src="/assets/rocks-1.png" alt="" className="w-full h-full object-cover" />
      </motion.div>

      {/* 7. Wizard - Quick slide from bottom-left */}
      <motion.div
        initial={{ x: "-50%", y: "100%", opacity: 0 }}
        animate={{ x: "0%", y: "0%", opacity: 1 }}
        transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
        className="absolute bottom-0 left-0 w-full h-3/4"
        style={{ transform: `translateY(${scrollY * 0.55}px)` }}
      >
        <img src="/assets/wizared.png" alt="" className="w-full h-full object-contain object-bottom" />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
    </div>
  );
}