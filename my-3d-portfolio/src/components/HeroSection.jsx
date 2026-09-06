"use client";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ErrorBoundary from "./ErrorBoundary";

const HeroScene3D = dynamic(() => import("./HeroScene3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full loading-skeleton" />
  ),
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

  const hiChars = useMemo(() => splitText("Hi, I'm"), []);
  const nameChars = useMemo(() => splitText("Abdelrahman"), []);

  const scrollToSection = useCallback((e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setShow3D(true);
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

    tl.set(el, { borderRight: "3.5px solid #FFE600" });
    tl.to(el, {
      borderRightColor: "transparent",
      repeat: -1,
      yoyo: true,
      duration: 0.45,
      ease: "power1.inOut",
    });

    return () => tl.kill();
  }, [startTypewriter]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)", clearProps: "all" }
      ).fromTo(
        titleContainerRef.current?.querySelectorAll(".split-char"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.02, ease: "power2.out", clearProps: "all" },
        "-=0.2"
      );

      const nameSpans = nameContainerRef.current?.querySelectorAll(".scramble-char");
      if (nameSpans?.length) {
        tl.fromTo(
          nameSpans,
          { opacity: 0, scale: 0.8, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.02, ease: "back.out(1.7)", clearProps: "all" },
          "-=0.1"
        );
        tl.call(() => setStartTypewriter(true), [], "+=0.1");
      }

      tl.fromTo(
        descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, clearProps: "all" },
        "-=0.2"
      ).fromTo(
        buttonsRef.current?.children,
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.45,
          ease: "back.out(1.7)",
          clearProps: "all",
        },
        "-=0.1"
      ).fromTo(
        socialsRef.current?.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, clearProps: "all" },
        "-=0.1"
      ).fromTo(
        scrollRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, clearProps: "all" },
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
      className="relative min-h-screen flex items-center justify-center px-3 min-[360px]:px-4 sm:px-6 pt-12 min-[360px]:pt-16 sm:pt-20 pb-16 min-[360px]:pb-20 sm:pb-24 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-5 min-[360px]:gap-6 lg:gap-12 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 space-y-3 min-[360px]:space-y-3.5 sm:space-y-4 lg:space-y-5">
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 min-[360px]:gap-2.5 px-2.5 min-[360px]:px-3.5 py-1 min-[360px]:py-1.5 bg-[#FFE600] text-black font-mono font-black text-[10px] min-[360px]:text-xs sm:text-sm uppercase tracking-wider border-2 sm:border-[2.5px] border-black shadow-[2.5px_2.5px_0px_#000] sm:shadow-[3px_3px_0px_#000] -rotate-1"
            >
              <span className="w-2 h-2 min-[360px]:w-2.5 min-[360px]:h-2.5 rounded-full bg-black border border-white animate-pulse" />
              <span>Available for work</span>
            </div>

            <div className="space-y-0.5 sm:space-y-1.5">
              <h1 className="text-2xl min-[360px]:text-[1.75rem] min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black dark:text-white leading-tight">
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
              <h1 className="text-2xl min-[360px]:text-[1.75rem] min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
                <span
                  ref={nameContainerRef}
                  className="text-gradient inline-block whitespace-nowrap"
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

            <div className="inline-flex items-center gap-1.5 sm:gap-2 font-mono max-w-full">
              <span className="text-[#00F0FF] font-black text-base min-[360px]:text-lg sm:text-2xl flex-shrink-0">&gt;</span>
              <h2
                ref={subtitleRef}
                className="text-xs min-[340px]:text-sm min-[380px]:text-base min-[440px]:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black text-black dark:text-white truncate"
              />
            </div>

            <div className="max-w-xl p-3 min-[360px]:p-3.5 sm:p-5 brutal-card rounded-xl border-2 sm:border-[2.5px] border-black bg-white dark:bg-[#171821] shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000]">
              <p
                ref={descRef}
                className="text-[11px] min-[360px]:text-xs sm:text-base lg:text-lg leading-relaxed font-medium text-gray-800 dark:text-gray-200"
              >
                I build exceptional digital experiences that live on the web.
                Specializing in creating interactive, accessible, and performant
                applications.
              </p>
            </div>

            <div ref={buttonsRef} className="flex flex-col min-[480px]:flex-row flex-wrap gap-2 min-[360px]:gap-2.5 sm:gap-4 pt-1 sm:pt-2 w-full">
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, "projects")}
                className="hero-btn w-full min-[480px]:w-auto px-3.5 min-[360px]:px-5 py-2.5 min-[360px]:py-3 sm:py-3.5 bg-[#FFE600] text-black border-2 sm:border-[2.5px] border-black rounded-xl font-black text-xs sm:text-sm md:text-base shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] hover:shadow-[5px_5px_0px_#000] inline-flex items-center justify-center gap-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] cursor-pointer"
              >
                <span>View My Work</span>
                <i className="fas fa-arrow-right text-[10px] sm:text-sm" />
              </a>
              <a
                href="/assets/Abdelrahman_Mohamed_CV.pdf"
                download="Abdelrahman_Mohamed_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn w-full min-[480px]:w-auto px-3.5 min-[360px]:px-5 py-2.5 min-[360px]:py-3 sm:py-3.5 bg-[#00F0FF] text-black border-2 sm:border-[2.5px] border-black rounded-xl font-black text-xs sm:text-sm md:text-base shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] hover:shadow-[5px_5px_0px_#000] inline-flex items-center justify-center gap-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] cursor-pointer"
              >
                <i className="fas fa-file-arrow-down text-[10px] sm:text-sm" />
                <span>Download CV</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className="hero-btn w-full min-[480px]:w-auto px-3.5 min-[360px]:px-5 py-2.5 min-[360px]:py-3 sm:py-3.5 bg-[#FFFFFF] text-black border-2 sm:border-[2.5px] border-black rounded-xl font-black text-xs sm:text-sm md:text-base shadow-[3px_3px_0px_#FF4088] sm:shadow-[4px_4px_0px_#FF4088] hover:shadow-[5px_5px_0px_#FF4088] inline-flex items-center justify-center gap-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] cursor-pointer"
              >
                <span>Let&apos;s Talk</span>
              </a>
            </div>

            <div ref={socialsRef} className="flex gap-2 min-[360px]:gap-3 sm:gap-4 pt-1 sm:pt-2">
              {[
                { icon: "fab fa-github", href: "https://github.com/Abdhsrag", label: "GitHub", hoverBg: "hover:bg-white hover:text-black" },
                { icon: "fab fa-linkedin", href: "https://www.linkedin.com/in/abdelrahmanmohamedosama", label: "LinkedIn", hoverBg: "hover:bg-[#00F0FF] hover:text-black" },
                { icon: "fab fa-whatsapp", href: "https://wa.me/201277116459", label: "WhatsApp", hoverBg: "hover:bg-[#22C55E] hover:text-black" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-9 h-9 min-[360px]:w-11 min-[360px]:h-11 sm:w-13 sm:h-13 rounded-xl brutal-card border-2 sm:border-[2.5px] border-black flex items-center justify-center shadow-[2.5px_2.5px_0px_#000] sm:shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#FFE600] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] transition-all bg-white dark:bg-[#171821] text-black dark:text-white ${social.hoverBg} social-icon`}
                  title={social.label}
                  aria-label={social.label}
                >
                  <i className={`${social.icon} text-sm min-[360px]:text-lg sm:text-2xl`} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Framed Neobrutalist 3D Terminal Viewport */}
          <div className="lg:col-span-5 w-full flex justify-center pt-2 sm:pt-4 lg:pt-0">
            <div className="w-full max-w-md lg:max-w-none h-[300px] min-[360px]:h-[340px] min-[400px]:h-[380px] sm:h-[420px] lg:h-[460px] xl:h-[500px] rounded-xl border-2 sm:border-[2.5px] border-black shadow-[3px_3px_0px_#FFE600] sm:shadow-[6px_6px_0px_#FFE600] bg-white dark:bg-[#0a0b10] overflow-hidden flex flex-col relative">
              <div className="window-bar !px-2 min-[360px]:!px-3 sm:!px-3.5 !py-1.5 bg-[#F4EFE6] dark:bg-[#20222e] text-black dark:text-white border-b-2 border-black flex items-center justify-between">
                <div className="window-dots flex gap-1 sm:gap-1.5 items-center">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-black bg-[#FF5F56]" />
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-black bg-[#FFBD2E]" />
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-black bg-[#27C93F]" />
                </div>
                <span className="font-mono text-[10px] min-[360px]:text-xs font-bold text-black dark:text-[#00F0FF] truncate max-w-[130px] min-[360px]:max-w-none">QUANTUM_CORE.EXE</span>
                <span className="hidden min-[340px]:inline-block font-mono text-[9px] min-[360px]:text-[10px] sm:text-xs font-bold text-black dark:text-[#FFE600] bg-[#FFE600] dark:bg-transparent px-1.5 py-0.5 rounded border border-black dark:border-0 whitespace-nowrap">[LIVE 3D]</span>
              </div>
              <div className="w-full h-full relative flex-grow">
                {show3D && (
                  <ErrorBoundary>
                    <HeroScene3D isMobile={isMobile} />
                  </ErrorBoundary>
                )}
                {/* HUD Overlay Crosshairs */}
                <span className="absolute top-2 left-2 text-[10px] font-mono text-cyan-700 dark:text-cyan-400/50 pointer-events-none">[+]</span>
                <span className="absolute top-2 right-2 text-[10px] font-mono text-cyan-700 dark:text-cyan-400/50 pointer-events-none">[+]</span>
                <span className="absolute bottom-2 left-2 text-[10px] font-mono text-cyan-700 dark:text-cyan-400/50 pointer-events-none">[+]</span>
                <span className="absolute bottom-2 right-2 text-[10px] font-mono text-cyan-700 dark:text-cyan-400/50 pointer-events-none">[+]</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 hidden sm:block"
      >
        <button
          type="button"
          className="flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-[#171821] text-black dark:text-white border-2 border-black rounded-lg shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#FFE600] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer transition-all"
          onClick={() =>
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="text-xs font-mono font-bold text-black dark:text-gray-200 uppercase tracking-wider">Scroll Down</span>
          <i className="fas fa-arrow-down text-xs text-[#FFE600] animate-bounce" />
        </button>
      </div>
    </section>
  );
}
