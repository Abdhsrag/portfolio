"use client";
import { useRef, useEffect, useMemo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillCard from "./SkillCard";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const headerBarRef = useRef(null);
  const bioRef = useRef(null);
  const statsGridRef = useRef(null);
  const skillsTitleRef = useRef(null);
  const skillsGridRef = useRef(null);
  const countedRef = useRef(false);

  const statValues = useMemo(
    () => [
      { label: "Projects", value: 20, suffix: "+" },
      { label: "Experience", value: 2, suffix: "Y+" },
      { label: "Technologies", value: 22, suffix: "+" },
      { label: "Coffee", value: null, suffix: "∞" },
    ],
    []
  );

  const skills = useMemo(
    () => [
      { icon: "fab fa-html5", name: "HTML5", color: "#E34F26" },
      { icon: "fab fa-css3-alt", name: "CSS3", color: "#1572B6" },
      { icon: "fab fa-js", name: "JavaScript", color: "#F7DF1E" },
      { icon: "fab fa-react", name: "React", color: "#61DAFB" },
      { icon: "fab fa-angular", name: "Angular", color: "#DD0031" },
      { icon: "fab fa-node-js", name: "Node.js", color: "#339933" },
      { icon: "fab fa-react", name: "Next.js", color: "#FFFFFF" },
      { icon: "fab fa-js-square", name: "TypeScript", color: "#3178C6" },
      { icon: "fab fa-bootstrap", name: "Bootstrap", color: "#7952B3" },
      { icon: "fas fa-database", name: "PostgreSQL", color: "#4169E1" },
      { icon: "fab fa-python", name: "Python", color: "#3776AB" },
      { icon: "fab fa-python", name: "Django", color: "#092E20" },
      { icon: "fab fa-python", name: "Flask", color: "#000000" },
      { icon: "fas fa-bolt", name: "Vite", color: "#646CFF" },
      { icon: "fas fa-cubes", name: "TanStack", color: "#FF4154" },
      { icon: "fas fa-crown", name: "Zustand", color: "#443E38" },
      { icon: "fas fa-play", name: "GSAP", color: "#88CE02" },
      { icon: "fas fa-rocket", name: "FastAPI", color: "#009688" },
      { icon: "fas fa-terminal", name: "Bash", color: "#4EAA25" },
      { icon: "fab fa-git-alt", name: "Git", color: "#F05032" },
      { icon: "fab fa-github", name: "GitHub", color: "#181717" },
      { icon: "fab fa-linux", name: "Linux", color: "#FCC624" },
    ],
    []
  );

  const animateCounter = useCallback((el, target, suffix) => {
    if (target === null) {
      el.textContent = suffix;
      return;
    }
    el.textContent = "0";
    gsap.to(el, {
      textContent: target,
      duration: 1.8,
      ease: "power2.out",
      snap: { textContent: 1 },
      onUpdate: () => {
        el.textContent = Math.round(parseFloat(el.textContent)) + suffix;
      },
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        headerBarRef.current,
        { width: 0 },
        {
          width: 96,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const bioTl = gsap.timeline({
        scrollTrigger: {
          trigger: bioRef.current,
          start: "top bottom",
          end: "top top+=100",
          scrub: true,
        },
      });
      bioTl.fromTo(
        bioRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      ).fromTo(
        bioRef.current.querySelectorAll(".bio-item"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        0.35
      );

      const statCards = statsGridRef.current?.children;
      if (statCards) {
        const statTl = gsap.timeline({
          scrollTrigger: {
            trigger: statsGridRef.current,
            start: "top bottom",
            end: "top top+=100",
            scrub: true,
          },
        });
        statTl.fromTo(
          statCards,
          { scale: 0.5, opacity: 0, rotateY: 30 },
          {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            stagger: 0.08,
            ease: "back.out(1.7)",
          }
        );
        statTl.call(() => {
          if (countedRef.current) return;
          countedRef.current = true;
          const statEls = statsGridRef.current?.querySelectorAll(".stat-value");
          if (statEls) {
            statValues.forEach((stat, i) => {
              if (statEls[i]) animateCounter(statEls[i], stat.value, stat.suffix);
            });
          }
        }, [], 0.85);
      }

      gsap.fromTo(
        skillsTitleRef.current,
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsTitleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const skillCards = Array.from(skillsGridRef.current?.children || []);
      if (skillCards.length) {
        skillCards.forEach((card) => {
          gsap.set(card, { opacity: 0, scale: 0.4, y: 60, rotationX: -40, rotationY: 10 });
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              end: "top top+=100",
              scrub: true,
            },
          });
        });
      }
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [animateCounter, statValues]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={headerRef} className="text-center mb-10 sm:mb-16 opacity-0">
          <div className="inline-block px-3.5 py-1 mb-3 sm:mb-4 bg-[#FFE600] text-black font-mono font-black text-[11px] sm:text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#000] -rotate-1">
            01 // PROFILE & STATS
          </div>
          <h2 className="text-3xl min-[400px]:text-4xl sm:text-5xl md:text-7xl font-black text-black dark:text-white">
            About <span className="text-gradient">Me</span>
          </h2>
          <div
            ref={headerBarRef}
            className="h-1.5 bg-[#FFE600] border border-black mx-auto mt-3 sm:mt-4 max-w-xs"
            style={{ width: 0 }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-stretch mb-16 sm:mb-24">
          {/* OS Window Style Bio Card */}
          <div
            ref={bioRef}
            className="brutal-card flex flex-col overflow-hidden opacity-0 border-[2.5px] border-black bg-white dark:bg-[#171821] shadow-[4px_4px_0px_#FFE600] sm:shadow-[6px_6px_0px_#FFE600]"
          >
            <div className="window-bar">
              <div className="window-dots">
                <span className="window-dot bg-[#FF5F56]" />
                <span className="window-dot bg-[#FFBD2E]" />
                <span className="window-dot bg-[#27C93F]" />
              </div>
              <span className="text-gray-500 dark:text-gray-400 font-mono text-[11px] sm:text-xs">developer_profile.sh</span>
              <span className="text-[#FFE600] font-mono text-[11px] sm:text-xs font-bold">[ACTIVE]</span>
            </div>

            <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 flex-grow flex flex-col justify-between">
              <div className="space-y-3 sm:space-y-4">
                <div className="bio-item opacity-0">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black dark:text-white">
                    Abdelrahman Mohamed
                  </h3>
                  <div className="inline-block mt-1.5 sm:mt-2 px-2.5 py-0.5 sm:py-1 bg-[#00F0FF] text-black font-mono font-bold text-[10px] sm:text-xs uppercase border border-black shadow-[2px_2px_0px_#000]">
                    Frontend Developer · Egypt 🇪🇬
                  </div>
                </div>

                <p className="bio-item text-xs sm:text-base lg:text-lg leading-relaxed text-gray-700 dark:text-gray-200 opacity-0 font-normal">
                  I build modern, responsive web applications with a focus on
                  intuitive UI and clean code. When I&apos;m not shipping features, I&apos;m
                  exploring new tools, contributing to open source, or working on my
                  next idea. I believe in continuous learning and keeping up with the
                  ever-moving frontend world.
                </p>

                <div className="bio-item opacity-0 pt-1 sm:pt-2">
                  <span className="text-[11px] sm:text-xs text-[#000000] dark:text-[#FFE600] font-mono font-bold uppercase tracking-wider block mb-1.5 sm:mb-2">
                    // Core Stack
                  </span>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {["React", "Next.js", "JavaScript", "TypeScript", "GSAP", "Three.js", "Tailwind", "Python", "FastAPI"].map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-xs font-mono font-semibold px-2 py-0.5 bg-[#F4EFE6] dark:bg-[#20222e] text-black dark:text-gray-200 border border-black shadow-[1.5px_1.5px_0px_#000]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bio-item opacity-0 pt-3 sm:pt-4 flex flex-col min-[480px]:flex-row gap-2.5 sm:gap-3">
                <a
                  href="/assets/Abdelrahman_Mohamed_CV.pdf"
                  download="Abdelrahman_Mohamed_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-btn brutal-btn-cyan flex-1 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm inline-flex items-center justify-center gap-2"
                >
                  <i className="fas fa-file-arrow-down text-xs sm:text-sm" />
                  <span>Download CV</span>
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="brutal-btn brutal-btn-yellow flex-1 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Let&apos;s Work Together</span>
                  <i className="fas fa-arrow-right text-xs sm:text-sm" />
                </a>
              </div>
            </div>
          </div>

          {/* Color-Blocked Neobrutalist Stats Grid */}
          <div ref={statsGridRef} className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            {statValues.map((stat, i) => {
              const theme = [
                { border: "border-black", shadow: "shadow-[4px_4px_0px_#FFE600] sm:shadow-[5px_5px_0px_#FFE600]", labelBg: "bg-[#FFE600] text-black", textCol: "text-black dark:text-[#FFE600]" },
                { border: "border-black", shadow: "shadow-[4px_4px_0px_#00F0FF] sm:shadow-[5px_5px_0px_#00F0FF]", labelBg: "bg-[#00F0FF] text-black", textCol: "text-black dark:text-[#00F0FF]" },
                { border: "border-black", shadow: "shadow-[4px_4px_0px_#FF4088] sm:shadow-[5px_5px_0px_#FF4088]", labelBg: "bg-[#FF4088] text-white", textCol: "text-[#FF4088] dark:text-[#FF4088]" },
                { border: "border-black", shadow: "shadow-[4px_4px_0px_#22C55E] sm:shadow-[5px_5px_0px_#22C55E]", labelBg: "bg-[#22C55E] text-black", textCol: "text-[#16a34a] dark:text-[#22C55E]" },
              ][i % 4];

              return (
                <div
                  key={stat.label}
                  className={`brutal-card p-3.5 sm:p-5 lg:p-6 text-center group cursor-default flex flex-col justify-center items-center bg-white dark:bg-[#171821] border-[2.5px] ${theme.border} ${theme.shadow} hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform`}
                >
                  <div className={`stat-value text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl font-black ${theme.textCol} mb-2 sm:mb-3 font-mono`} />
                  <div className={`text-[10px] min-[400px]:text-xs sm:text-sm font-mono font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border border-black shadow-[1.5px_1.5px_0px_#000] sm:shadow-[2px_2px_0px_#000] ${theme.labelBg}`}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <div className="inline-block px-3.5 py-1 mb-2.5 sm:mb-3 bg-[#00F0FF] text-black font-mono font-black text-[11px] sm:text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#000] rotate-1">
            02 // TOOLKIT & TECHNOLOGIES
          </div>
          <h3
            ref={skillsTitleRef}
            className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl font-black mb-8 sm:mb-12 opacity-0 text-black dark:text-white"
          >
            My <span className="text-gradient">Tech Stack</span>
          </h3>

          <div
            ref={skillsGridRef}
            className="grid grid-cols-2 min-[440px]:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-4 md:gap-5"
            style={{ perspective: "1200px" }}
          >
            {skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
