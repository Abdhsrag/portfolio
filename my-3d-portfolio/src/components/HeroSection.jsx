"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect, useRef, useCallback } from "react";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { Scene3D } from "./Scene3D";
import * as THREE from "three";

export default function HeroSection() {
  const [text, setText] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const fullText = "Fullstack Developer";
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const sceneOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Detect mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mouse movement tracking
  const handleMouseMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 pt-20 pb-24"
    >
      {/* 3D Scene Background - FULL SCREEN WITH MOVEMENT */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ opacity: sceneOpacity }}
      >
        <Canvas
          camera={{
            position: isMobile ? [0, 1, 8] : [0, 2, 5],
            fov: isMobile ? 85 : 75,
          }}
          gl={{
            alpha: true,
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.5,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          dpr={[1, 2]}
        >
          <PerspectiveCamera
            makeDefault
            position={isMobile ? [0, 1, 8] : [0, 2, 5]}
            fov={isMobile ? 75 : 75}
          />

          {/* ENHANCED LIGHTING - MUCH BRIGHTER */}
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2.5} castShadow />
          <directionalLight position={[-10, 10, 5]} intensity={1.5} />
          <directionalLight position={[0, 10, -5]} intensity={1.2} />
          <pointLight position={[0, 5, 0]} intensity={2} color="#ffffff" />
          <spotLight
            position={[0, 15, 10]}
            angle={0.5}
            penumbra={1}
            intensity={2}
            castShadow
          />
          <hemisphereLight
            skyColor="#ffffff"
            groundColor="#444444"
            intensity={1}
          />

          <Suspense fallback={null}>
            <Scene3D
              mousePosition={mousePosition}
              isMobile={isMobile}
              position={[0, 0, 0]}
              scale={isMobile ? 0.4 : 0.4}
            />
          </Suspense>

          {/* OrbitControls - Disabled on mobile for better performance */}
          {!isMobile && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={!isMobile}
              autoRotate={true}
              autoRotateSpeed={isMobile ? 1.0 : 0.5} // Faster on mobile
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
          )}
        </Canvas>
      </motion.div>

      {/* Lighter overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 z-[5]" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-4 sm:space-y-6 lg:space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-cyan-500"></span>
            </span>
            <span className="text-xs sm:text-sm text-cyan-400 font-medium">
              Available for work
            </span>
          </motion.div>

          <div className="space-y-2 sm:space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight drop-shadow-2xl">
                Hi, I'm
              </h1>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
                <span className="text-gradient drop-shadow-2xl">
                  Abdelrahman
                </span>
              </h1>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-300 drop-shadow-lg"
            >
              {text}
              <span className="animate-pulse text-cyan-400">|</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-xl drop-shadow-lg"
          >
            I build exceptional digital experiences that live on the web.
            Specializing in creating interactive, accessible, and performant
            applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex gap-3 sm:gap-4 flex-wrap"
          >
            <motion.a
              href="#projects"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(0, 217, 255, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-sm sm:text-base shadow-lg shadow-cyan-500/30"
            >
              <span className="flex items-center gap-2">
                View My Work
                <motion.i
                  className="fas fa-arrow-right"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </span>
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-cyan-500 rounded-full font-semibold hover:bg-cyan-500/10 text-sm sm:text-base backdrop-blur-sm"
            >
              Let's Talk
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="flex gap-3 sm:gap-4 pt-4"
          >
            {[
              {
                icon: "fab fa-github",
                href: "https://github.com/Abdhsrag",
                label: "GitHub",
                color: "hover:text-gray-400",
              },
              {
                icon: "fab fa-linkedin",
                href: "https://www.linkedin.com/in/abdelrahmanmohamedosama",
                label: "LinkedIn",
                color: "hover:text-blue-500",
              },
              {
                icon: "fab fa-whatsapp",
                href: "https://wa.me/201277116459",
                label: "WhatsApp",
                color: "hover:text-green-500",
              },
            ].map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + i * 0.1 }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm transition-all shadow-lg ${social.color}`}
                title={social.label}
              >
                <i className={`${social.icon} text-xl sm:text-2xl`} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="text-sm text-gray-300 drop-shadow-lg">
            Scroll Down
          </span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-cyan-400 rounded-full mx-auto"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
