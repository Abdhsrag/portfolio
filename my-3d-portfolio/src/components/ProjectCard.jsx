"use client";
import { memo, useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import Image from "next/image";

function ProjectCard({
  title,
  desc,
  link,
  tech,
  gradient,
  icon = "fas fa-rocket",
  image,
  index = 0,
}) {
  const cardRef = useRef(null);
  const innerRef = useRef(null);
  const glowRef = useRef(null);
  const imageContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
      setIsTouchDevice(isTouch);
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isTouchDevice) return;
    const card = innerRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -8;
    const rotateY = (x - centerX) / centerX * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
    });

    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    if (glowRef.current) {
      gsap.set(glowRef.current, {
        "--glow-x": `${glowX}%`,
        "--glow-y": `${glowY}%`,
      });
    }
  }, [isTouchDevice]);

  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovered(true);
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        height: 192,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovered(false);
    const card = innerRef.current;
    if (card) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [isTouchDevice]);

  const handleToggleTouch = useCallback(() => {
    if (!isTouchDevice) return;
    if (!imageContainerRef.current) return;
    const nextState = !isHovered;
    setIsHovered(nextState);
    gsap.to(imageContainerRef.current, {
      height: nextState ? 192 : 0,
      opacity: nextState ? 1 : 0,
      duration: 0.45,
      ease: nextState ? "power2.out" : "power2.in",
    });
  }, [isHovered, isTouchDevice]);

  return (
    <div
      ref={cardRef}
      className="group relative h-full perspective-1000"
      style={{ willChange: "transform, opacity" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleToggleTouch}
    >
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          mixBlendMode: "screen",
          background: "radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(0, 217, 255, 0.15), transparent 60%)",
        }}
      />

      <div
        ref={innerRef}
        className="relative brutal-card h-full flex flex-col rounded-xl border-[2.5px] border-black bg-white dark:bg-[#171821] shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#FFE600] overflow-hidden transition-all duration-200 cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Retro Window Titlebar */}
        <div className="window-bar">
          <div className="window-dots">
            <span className="window-dot bg-[#FF5F56]" />
            <span className="window-dot bg-[#FFBD2E]" />
            <span className="window-dot bg-[#27C93F]" />
          </div>
          <span className="font-mono text-[11px] text-gray-700 dark:text-gray-300 font-bold tracking-wider">PROJECT_{String(index + 1).padStart(2, "0")}</span>
          <span className="font-mono text-[10px] bg-[#FFE600] text-black font-bold px-1.5 py-0.5 rounded border border-black">LIVE</span>
        </div>

        <div
          ref={imageContainerRef}
          className="relative w-full overflow-hidden border-b-2 border-black"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="relative w-full h-48 bg-gray-100 dark:bg-[#0d0e12]">
            {image && !imageError ? (
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <i className={`${icon} text-6xl text-white/30 relative z-10`} />
              </div>
            )}
          </div>
        </div>

        <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
          <div>
            <div
              className={`w-12 h-12 sm:w-13 sm:h-13 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 border-2 border-black shadow-[2px_2px_0px_#000]`}
            >
              <i className={`${icon} text-white text-lg sm:text-xl`} />
            </div>

            <h3 className="text-xl sm:text-2xl font-black mb-2 text-black dark:text-white group-hover:text-[#FFE600] transition-colors">
              {title}
            </h3>

            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3 font-medium">
              {desc}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 bg-[#F4EFE6] dark:bg-[#20222e] text-black dark:text-gray-200 border border-black shadow-[1.5px_1.5px_0px_#000] hover:bg-[#00F0FF] hover:text-black transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="brutal-btn brutal-btn-cyan w-full py-2.5 rounded-lg text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-[2.5px_2.5px_0px_#000] min-h-[44px]"
              >
                <span>View Project</span>
                <i className="fas fa-arrow-right" />
              </a>
            ) : (
              <span className="w-full py-2.5 rounded-lg text-xs font-mono text-center text-gray-700 dark:text-gray-400 bg-gray-200 dark:bg-[#20222e] border border-black shadow-[1.5px_1.5px_0px_#000] min-h-[44px] inline-flex items-center justify-center">
                Private / Internal Project
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProjectCard);
