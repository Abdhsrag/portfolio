"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function NotFound() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current?.children, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div ref={containerRef} className="text-center">
        <h1 className="text-9xl font-black text-gradient mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/" className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold shadow-lg shadow-cyan-500/30">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
