"use client";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

export function FloatingDock({ items, desktopClassName, mobileClassName }) {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
}

function FloatingDockDesktop({ items, className }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-lg border border-cyan-400/20 px-4 pb-3 shadow-lg shadow-cyan-500/20 ${className}`}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
}

function IconContainer({ mouseX, title, icon, href }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  const widthIcon = useSpring(widthTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  const heightIcon = useSpring(heightTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center relative"
      >
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-black border border-white/20 text-white absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs z-50"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </a>
  );
}

function FloatingDockMobile({ items, className }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`md:hidden ${className}`}>
      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.9 }}
        className="h-14 w-14 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-lg border-2 border-cyan-400/30 flex items-center justify-center shadow-lg shadow-cyan-500/20 relative z-50"
      >
        <motion.i 
          className={`fas ${open ? 'fa-times' : 'fa-bars'} text-white text-xl`}
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col gap-3 p-4 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-blue-500/10 backdrop-blur-lg border-2 border-cyan-400/30 shadow-2xl shadow-cyan-500/30 z-50"
            >
              {items.map((item, idx) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-12 w-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors relative group"
                >
                  {item.icon}
                  <span className="absolute left-16 bg-black/90 text-white px-3 py-1.5 rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {item.title}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}