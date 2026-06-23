"use client";
import { useRef, useEffect, useMemo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const headerBarRef = useRef(null);
  const subtitleRef = useRef(null);
  const socialsRef = useRef(null);
  const emailRef = useRef(null);
  const ctaRef = useRef(null);
  const bgGlow1Ref = useRef(null);
  const bgGlow2Ref = useRef(null);

  const socialLinks = useMemo(
    () => [
      {
        icon: "fab fa-github",
        label: "GitHub",
        href: "https://github.com/Abdhsrag",
        color: "hover:text-gray-400",
        bgColor: "hover:bg-gray-400/10",
        glow: "rgba(255,255,255,0.15)",
      },
      {
        icon: "fab fa-linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/abdelrahmanmohamedosama",
        color: "hover:text-blue-500",
        bgColor: "hover:bg-blue-500/10",
        glow: "rgba(59,130,246,0.15)",
      },
      {
        icon: "fab fa-whatsapp",
        label: "WhatsApp",
        href: "https://wa.me/201277116459",
        color: "hover:text-green-500",
        bgColor: "hover:bg-green-500/10",
        glow: "rgba(34,197,94,0.15)",
      },
    ],
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CSS-based parallax for background glows (no GSAP onUpdate)
      const section = sectionRef.current;
      if (section) {
        const glow1 = bgGlow1Ref.current;
        const glow2 = bgGlow2Ref.current;
        
        const updateParallax = () => {
          const rect = section.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const start = -rect.height;
          const end = viewportHeight;
          const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
          
          if (glow1) {
            glow1.style.setProperty("--parallax-y", `${-progress * 100}%`);
            glow1.style.setProperty("--parallax-opacity", 0.05 + progress * 0.1);
          }
          if (glow2) {
            glow2.style.setProperty("--parallax-y", `${progress * 100}%`);
            glow2.style.setProperty("--parallax-opacity", 0.05 + progress * 0.1);
          }
        };

        // Throttle to 30fps
        let ticking = false;
        const onScroll = () => {
          if (!ticking) {
            requestAnimationFrame(() => {
              updateParallax();
              ticking = false;
            });
            ticking = true;
          }
        };
        
        window.addEventListener("scroll", onScroll, { passive: true });
        updateParallax(); // Initial
      }

      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0, scale: 0.8, rotateX: -20 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
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
          width: "100%",
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const words = subtitleRef.current?.querySelectorAll(".word");
      if (words) {
        gsap.fromTo(
          words,
          { y: 40, opacity: 0, rotation: 15 },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const items = socialsRef.current?.children;
      if (items) {
        gsap.fromTo(
          items,
          { scale: 0, opacity: 0, rotation: gsap.utils.wrap([-45, 45, -60, 60, -30, 30]) },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: socialsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      gsap.fromTo(
        emailRef.current,
        { y: 50, opacity: 0, scale: 0.8, rotation: -5 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.3,
          scrollTrigger: {
            trigger: emailRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    // Separate cleanup for parallax
    const section = sectionRef.current;
    let parallaxCleanup = () => {};
    if (section) {
      const glow1 = bgGlow1Ref.current;
      const glow2 = bgGlow2Ref.current;
      
      const updateParallax = () => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const start = -rect.height;
        const end = viewportHeight;
        const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
        
        if (glow1) {
          glow1.style.setProperty("--parallax-y", `${-progress * 100}%`);
          glow1.style.setProperty("--parallax-opacity", 0.05 + progress * 0.1);
        }
        if (glow2) {
          glow2.style.setProperty("--parallax-y", `${progress * 100}%`);
          glow2.style.setProperty("--parallax-opacity", 0.05 + progress * 0.1);
        }
      };

      let ticking = false;
      const onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            updateParallax();
            ticking = false;
          });
          ticking = true;
        }
      };
      
      window.addEventListener("scroll", onScroll, { passive: true });
      updateParallax();
      parallaxCleanup = () => window.removeEventListener("scroll", onScroll);
    }

    return () => {
      ctx.revert();
      parallaxCleanup();
    };
  }, []);

  const handleCtaMouseMove = useCallback((e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: x * 0.25,
      y: y * 0.25,
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(btn.querySelector(".btn-glow"), {
      x: x * 0.5,
      y: y * 0.5,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleCtaMouseLeave = useCallback((e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(e.currentTarget.querySelector(".btn-glow"), {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black" />

      <div
        ref={bgGlow1Ref}
        className="absolute top-1/2 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl"
        style={{
          transform: "translate(var(--parallax-y, 0%), -50%)",
          opacity: "var(--parallax-opacity, 0.05)",
        }}
      />
      <div
        ref={bgGlow2Ref}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"
        style={{
          transform: "translate(var(--parallax-y, 0%), 50%)",
          opacity: "var(--parallax-opacity, 0.05)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center">
          <div
            ref={headerRef}
            className="opacity-0"
            style={{ perspective: "1000px" }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 px-4">
              <span className="text-gradient">Let&apos;s Connect</span>
            </h2>
            <div
              ref={headerBarRef}
              className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full mb-8 sm:mb-12"
              style={{ width: 0 }}
            />
          </div>

          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 sm:mb-12 leading-relaxed px-4"
          >
            {"Have a project in mind? Let's build something amazing together!"
              .split(" ")
              .map((word, i) => (
                <span key={i} className="word inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
          </p>

          <div
            ref={socialsRef}
            className="grid grid-cols-3 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-6 mb-8 sm:mb-12 px-4"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className={`group relative w-full sm:w-24 h-20 sm:h-24 rounded-xl sm:rounded-2xl glass-card flex flex-col items-center justify-center transition-all ${social.color}`}
                title={social.label}
                aria-label={social.label}
              >
                <div
                  className={`absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 transition-opacity ${social.bgColor}`}
                />
                <i className={`${social.icon} text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 relative z-10`} />
                <span className="text-[10px] sm:text-xs text-gray-400 group-hover:text-current relative z-10 transition-colors">
                  {social.label}
                </span>
              </a>
            ))}
          </div>

          <div ref={emailRef} className="opacity-0">
            <a
              href="mailto:abdhsrag280@gmail.com?subject=Portfolio%20Inquiry"
              className="glass-card p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl mx-4 sm:mx-auto sm:inline-block max-w-full sm:max-w-none block hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
            >
              <p className="text-sm sm:text-base text-gray-400 mb-2 sm:mb-3">
                Or email me directly at:
              </p>
              <span className="text-base sm:text-xl md:text-2xl font-bold text-gradient hover:opacity-80 transition-opacity break-all sm:break-normal">
                abdhsrag280@gmail.com
              </span>
            </a>
          </div>

          <div
            ref={ctaRef}
            className="mt-8 sm:mt-12 px-4 opacity-0"
          >
            <a
              href="mailto:abdhsrag280@gmail.com?subject=Portfolio%20Inquiry"
              onMouseMove={handleCtaMouseMove}
              onMouseLeave={handleCtaMouseLeave}
              className="cta-btn relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-cyan-500/50 transition-shadow overflow-hidden"
            >
              <div className="btn-glow absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <i className="fas fa-envelope text-base sm:text-lg md:text-xl relative z-10" />
              <span className="whitespace-nowrap relative z-10">
                Send Me a Message
              </span>
              <i className="fas fa-arrow-right text-sm sm:text-base relative z-10" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
