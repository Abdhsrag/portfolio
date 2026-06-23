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
  const mounted = useRef(false);

  const handleMouseMove = useCallback((e) => {
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
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
    gsap.to(imageContainerRef.current, {
      height: 192,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
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
    gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(imageContainerRef.current, {
      height: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative h-full perspective-1000"
      style={{ opacity: 0, willChange: "transform, opacity" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => {
        setIsHovered(true);
        gsap.to(imageContainerRef.current, { height: 192, opacity: 1, duration: 0.5, ease: "power2.out" });
      }}
      onTouchEnd={() => {
        setTimeout(() => {
          setIsHovered(false);
          gsap.to(imageContainerRef.current, { height: 0, opacity: 0, duration: 0.4, ease: "power2.in" });
        }, 2000);
      }}
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
        className="relative glass-card h-full flex flex-col backdrop-blur-xl rounded-2xl border-2 border-transparent hover:border-cyan-400/30 transition-colors overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          ref={imageContainerRef}
          className="relative w-full overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="w-full h-48 bg-gradient-to-br from-gray-900 to-gray-800">
            {image && !imageError ? (
              <>
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
              </>
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
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </div>

        <div className="p-6 sm:p-8 flex flex-col flex-grow">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 sm:mb-6 shadow-lg`}
          >
            <i className={`${icon} text-white text-xl sm:text-2xl`} />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white group-hover:text-gradient transition-all">
            {title}
          </h3>

          <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 flex-grow leading-relaxed line-clamp-3">
            {desc}
          </p>

          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {tech.map((t) => (
              <span
                key={t}
                className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:bg-white/10 hover:border-cyan-400/30 transition-all"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="group/link inline-flex items-center gap-2 text-cyan-400 font-semibold mt-auto hover:gap-4 transition-all text-sm sm:text-base"
          >
            <span>View Project</span>
            <i className="fas fa-arrow-right group-hover/link:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default memo(ProjectCard);
