"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroScene3D = dynamic(() => import("./HeroScene3D"), {
  ssr: false,
  loading: () => null,
});

function splitText(text) {
  return text.split("").map((char, i) => ({
    char: char === " " ? "\u00A0" : char,
    key: `c-${i}`,
    isSpace: char === " ",
  }));
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleContainerRef = useRef(null);
  const nameContainerRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const socialsRef = useRef(null);
  const scrollRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [startTypewriter, setStartTypewriter] = useState(false);

  const hiChars = splitText("Hi, I'm");
  const nameChars = splitText("Abdelrahman");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShow3D(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!startTypewriter || !subtitleRef.current) return;

    const fullText = "Fullstack Developer";
    const el = subtitleRef.current;
    el.textContent = "";

    const tl = gsap.timeline();
    fullText.split("").forEach((char, i) => {
      tl.call(() => { el.textContent += char; }, [], i * 0.035);
    });

    tl.set(el, { borderRight: "3px solid #00d9ff" });
    tl.to(el, {
      borderRightColor: "transparent",
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "power1.inOut",
    });

    return () => tl.kill();
  }, [startTypewriter]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(badgeRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      }).from(
        titleContainerRef.current?.querySelectorAll(".split-char"),
        {
          y: (i) => [-80, 80, -60, 60, -100, 100][i % 6],
          x: (i) => [-50, 50, -70, 70, -40, 40][i % 6],
          rotation: (i) => [-40, 40, -50, 50, -30, 30][i % 6],
          opacity: 0,
          duration: 0.7,
          stagger: { each: 0.03, from: "random" },
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

      const nameSpans = nameContainerRef.current?.querySelectorAll(".scramble-char");
      if (nameSpans?.length) {
        tl.addLabel("nameShow", "-=0.2");
        tl.from(nameSpans, {
          opacity: 0,
          scale: 0.4,
          y: (i) => [-20, 20, -15, 15, -10, 10, -25, 25, -18, 18, -12][i % 11],
          duration: 0.6,
          stagger: 0.04,
          ease: "back.out(2)",
          clearProps: "transform,opacity,y,scale",
        }, "nameShow");

        nameSpans.forEach((span, i) => {
          tl.to(span, {
            textShadow: "0 0 15px #00d9ff, 0 0 30px #00d9ff",
            duration: 0.15,
            onComplete: () => {
              gsap.to(span, {
                textShadow: "none",
                duration: 0.5,
                ease: "power2.out",
                clearProps: "textShadow",
              });
            },
          }, `nameShow+=${i * 0.04 + 0.1}`);
        });

        tl.call(() => setStartTypewriter(true), [], "+=0.1");
      }

      tl.from(
        descRef.current,
        { y: 30, opacity: 0, duration: 0.7 },
        "-=0.2"
      ).from(
        buttonsRef.current?.children,
        { y: 50, opacity: 0, scale: 0.8, stagger: 0.12, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.2"
      ).from(
        socialsRef.current?.children,
        {
          y: 30,
          opacity: 0,
          rotation: (i) => [-30, 30, -45, 45, -20, 20][i % 6],
          stagger: 0.08,
          duration: 0.5,
        },
        "-=0.2"
      ).from(
        scrollRef.current,
        { opacity: 0, y: 20, duration: 0.5 },
        "-=0.1"
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          const heroScene = sectionRef.current?.querySelector(".hero-scene");
          if (heroScene) {
            gsap.set(heroScene, {
              opacity: 1 - self.progress * 1.2,
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);



  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 pt-20 pb-24"
    >
      {show3D && (
        <div className="hero-scene absolute inset-0 z-0">
          <HeroScene3D isMobile={isMobile} />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40 z-[5]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-full w-full bg-cyan-500" />
            </span>
            <span className="text-xs sm:text-sm text-cyan-400 font-medium">
              Available for work
            </span>
          </div>

          <div className="space-y-2 sm:space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight drop-shadow-2xl">
              <span ref={titleContainerRef}>
                {hiChars.map((c) => (
                  <span
                    key={c.key}
                    className="split-char inline-block"
                    style={c.isSpace ? { width: "0.35em" } : {}}
                  >
                    {c.char}
                  </span>
                ))}
              </span>
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
              <span
                ref={nameContainerRef}
                className="text-gradient drop-shadow-2xl inline-block"
              >
                {nameChars.map((c) => (
                  <span
                    key={c.key}
                    className="scramble-char inline-block"
                    style={c.isSpace ? { width: "0.35em" } : {}}
                  >
                    {c.char}
                  </span>
                ))}
              </span>
            </h1>
          </div>

          <h2
            ref={subtitleRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-300 drop-shadow-lg"
          />

          <p
            ref={descRef}
            className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-xl drop-shadow-lg"
          >
            I build exceptional digital experiences that live on the web.
            Specializing in creating interactive, accessible, and performant
            applications.
          </p>

          <div ref={buttonsRef} className="flex gap-3 sm:gap-4 flex-wrap">
            <a
              href="#projects"
              className="hero-btn px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-sm sm:text-base shadow-lg shadow-cyan-500/30 inline-flex items-center gap-2"
            >
              View My Work
              <i className="fas fa-arrow-right" />
            </a>
            <a
              href="#contact"
              className="hero-btn px-6 py-3 sm:px-8 sm:py-4 border-2 border-cyan-500 rounded-full font-semibold hover:bg-cyan-500/10 text-sm sm:text-base backdrop-blur-sm"
            >
              Let&apos;s Talk
            </a>
          </div>

          <div ref={socialsRef} className="flex gap-3 sm:gap-4 pt-4">
            {[
              { icon: "fab fa-github", href: "https://github.com/Abdhsrag", label: "GitHub", color: "hover:text-gray-400" },
              { icon: "fab fa-linkedin", href: "https://www.linkedin.com/in/abdelrahmanmohamedosama", label: "LinkedIn", color: "hover:text-blue-500" },
              { icon: "fab fa-whatsapp", href: "https://wa.me/201277116459", label: "WhatsApp", color: "hover:text-green-500" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm transition-all shadow-lg ${social.color} social-icon`}
                title={social.label}
              >
                <i className={`${social.icon} text-xl sm:text-2xl`} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 hidden sm:block"
      >
        <div
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() =>
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="text-sm text-gray-300 drop-shadow-lg">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full p-1">
            <div className="scroll-dot w-1.5 h-3 bg-cyan-400 rounded-full mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
