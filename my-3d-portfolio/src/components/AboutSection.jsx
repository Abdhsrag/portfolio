"use client";
import { useRef, useEffect, useMemo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const headerBarRef = useRef(null);
  const bioRef = useRef(null);
  const statsRef = useRef(null);
  const statsGridRef = useRef(null);
  const skillsTitleRef = useRef(null);
  const skillsGridRef = useRef(null);

  const statValues = useMemo(
    () => [
      { label: "Projects", value: 20, suffix: "+" },
      { label: "Experience", value: 2, suffix: "Y+" },
      { label: "Technologies", value: 17, suffix: "+" },
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
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            headerRef.current,
            { y: 50, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" }
          );
          gsap.fromTo(
            headerBarRef.current,
            { width: 0 },
            { width: 96, duration: 0.8, delay: 0.2, ease: "power2.out" }
          );
        },
        once: true,
      });

      ScrollTrigger.create({
        trigger: bioRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            bioRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
          );
          gsap.fromTo(
            bioRef.current.querySelectorAll("p"),
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: "power2.out" },
            "-=0.4"
          );
        },
        once: true,
      });

      ScrollTrigger.create({
        trigger: statsGridRef.current,
        start: "top 80%",
        onEnter: () => {
          const statCards = statsGridRef.current?.children;
          if (!statCards) return;
          gsap.fromTo(
            statCards,
            { scale: 0.5, opacity: 0, rotateY: 30 },
            {
              scale: 1,
              opacity: 1,
              rotateY: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "back.out(1.7)",
              onComplete: () => {
                const statEls = statsGridRef.current?.querySelectorAll(".stat-value");
                if (statEls) {
                  statValues.forEach((stat, i) => {
                    if (statEls[i]) animateCounter(statEls[i], stat.value, stat.suffix);
                  });
                }
              },
            }
          );
        },
        once: true,
      });

      ScrollTrigger.create({
        trigger: skillsTitleRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(
            skillsTitleRef.current,
            { y: 50, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)" }
          );
        },
        once: true,
      });

      ScrollTrigger.create({
        trigger: skillsGridRef.current,
        start: "top 75%",
        onEnter: () => {
          const skillCards = Array.from(skillsGridRef.current?.children || []);
          if (!skillCards.length) return;

          gsap.set(skillCards, {
            opacity: 0,
            scale: 0.4,
            y: 80,
            rotationX: -60,
            rotationY: 15,
            transformOrigin: "50% 50% -100px"
          });

          gsap.to(skillCards, {
            opacity: 1,
            scale: 1,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            duration: 0.85,
            stagger: {
              grid: "auto",
              from: "center",
              each: 0.05
            },
            ease: "back.out(1.5)"
          });
        },
        once: true,
      });
    }, sectionRef);

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
            <p className="text-lg leading-relaxed text-gray-300 opacity-0">
              Hey there! I&apos;m{" "}
              <span className="text-cyan-400 font-bold">
                Abdelrahman Mohamed
              </span>
              , a passionate{" "}
              <span className="text-purple-400 font-bold">
                Fullstack Developer
              </span>{" "}
              from Egypt 🇪🇬
            </p>
            <p className="text-lg leading-relaxed text-gray-300 opacity-0">
              I specialize in building modern, responsive web applications using{" "}
              <strong className="text-cyan-400">
                React, Next.js, TypeScript, Python, Django, and Flask
              </strong>
              . I love creating intuitive user interfaces and solving complex
              problems with elegant solutions.
            </p>
            <p className="text-lg leading-relaxed text-gray-300 opacity-0">
              When I&apos;m not coding, you&apos;ll find me exploring new
              technologies, contributing to open-source projects, or working on
              my next big idea. I believe in continuous learning and staying
              up-to-date with the latest industry trends.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold mt-4 hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
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

function SkillCard({ skill }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const iconRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out"
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.4,
        background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${skill.color}88 0%, transparent 60%)`,
        duration: 0.2
      });
    }

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1.15,
        rotationZ: rotateY * 0.5,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [skill.color]);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: "power3.out"
      });
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1,
        rotationZ: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center gap-3 glass-card p-6 rounded-xl relative overflow-hidden cursor-pointer"
      style={{ opacity: 0, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={glowRef}
        className="skill-glow absolute inset-0 opacity-0 blur-xl pointer-events-none transition-opacity duration-300"
        style={{ mixBlendMode: "screen" }}
      />
      <i
        ref={iconRef}
        className={`${skill.icon} text-4xl md:text-5xl relative z-10 transition-transform duration-200`}
        style={{ color: skill.color }}
      />
      <span className="text-xs text-gray-400 relative z-10 font-medium text-center pointer-events-none">
        {skill.name}
      </span>
    </div>
  );
}
