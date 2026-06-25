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
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={headerRef} className="text-center mb-20 opacity-0">
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="text-gradient">About Me</span>
          </h2>
          <div
            ref={headerBarRef}
            className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"
            style={{ width: 0 }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div ref={bioRef} className="glass-card p-8 space-y-6 opacity-0">
            <h3 className="bio-item text-3xl md:text-4xl font-black opacity-0">
              <span className="text-gradient">Abdelrahman Mohamed</span>
            </h3>
            <p className="bio-item text-lg text-cyan-400 font-medium opacity-0">
              Frontend Developer · Egypt 🇪🇬
            </p>
            <p className="bio-item text-lg leading-relaxed text-gray-300 opacity-0">
              I build modern, responsive web applications with a focus on
              intuitive UI and clean code. When I&apos;m not shipping features, I&apos;m
              exploring new tools, contributing to open source, or working on my
              next idea. I believe in continuous learning and keeping up with the
              ever-moving frontend world.
            </p>
            <div className="bio-item opacity-0">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">
                Tech Stack
              </span>
              <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                React · JavaScript · Vite · TanStack · Zustand · GSAP · Python · Django · Flask · FastAPI
              </p>
            </div>
            <a
              href="#contact"
              className="bio-item inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold mt-4 hover:shadow-lg hover:shadow-cyan-500/30 transition-all opacity-0"
            >
              Let&apos;s Work Together
              <i className="fas fa-arrow-right" />
            </a>
          </div>

          <div ref={statsGridRef} className="grid grid-cols-2 gap-6">
            {statValues.map((stat) => (
              <div
                key={stat.label}
                className="glass-card p-6 text-center group cursor-default hover:scale-105 transition-transform"
              >
                <div className="stat-value text-5xl font-black text-gradient mb-2" />
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h3
            ref={skillsTitleRef}
            className="text-4xl md:text-5xl font-black mb-12 opacity-0"
          >
            <span className="text-gradient">My Tech Stack</span>
          </h3>

          <div
            ref={skillsGridRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
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
