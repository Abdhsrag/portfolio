"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function FloatingDock({ items }) {
  const mouseX = useMotionValue(Infinity);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      onMouseMove={(e) => !isMobile && mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-lg border border-cyan-400/20 shadow-lg shadow-cyan-500/20 ${
        isMobile 
          ? 'h-12 gap-2 px-2' 
          : 'h-16 gap-3 px-4'
      }`}
    >
      {items.map((item) => (
        <IconContainer 
          mouseX={mouseX} 
          key={item.title} 
          isMobile={isMobile}
          {...item} 
        />
      ))}
    </motion.div>
  );
}

function IconContainer({ mouseX, title, icon, href, isMobile }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Mobile: 32-48px, Desktop: 40-80px
  const widthTransform = useTransform(
    distance, 
    [-150, 0, 150], 
    isMobile ? [32, 48, 32] : [40, 80, 40]
  );
  const heightTransform = useTransform(
    distance, 
    [-150, 0, 150], 
    isMobile ? [32, 48, 32] : [40, 80, 40]
  );

  // Icon sizes
  const widthIcon = useTransform(
    distance, 
    [-150, 0, 150], 
    isMobile ? [14, 20, 14] : [18, 36, 18]
  );
  const heightIcon = useTransform(
    distance, 
    [-150, 0, 150], 
    isMobile ? [14, 20, 14] : [18, 36, 18]
  );

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const widthIconSpring = useSpring(widthIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  const heightIconSpring = useSpring(heightIcon, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <a href={href} className="relative flex items-center justify-center">
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => isMobile && setHovered(true)}
        onTouchEnd={() => isMobile && setTimeout(() => setHovered(false), 2000)}
        className="rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <motion.div
          style={{ 
            width: widthIconSpring, 
            height: heightIconSpring,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </motion.div>

        {/* Tooltip - desktop only */}
        {hovered && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-1/2 -translate-x-1/2 -top-10 px-2 py-1 bg-black/90 border border-white/20 rounded-md text-white text-xs whitespace-nowrap z-50"
          >
            {title}
          </motion.div>
        )}
      </motion.div>
    </a>
  );
}