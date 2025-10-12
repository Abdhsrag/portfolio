"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import { Suspense, useRef } from "react";

// Big visible sphere
function GlowingSphere() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.008;
      meshRef.current.rotation.x += 0.004;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[2.5, 64, 64]} position={[0, 0, -2]}>
        <MeshDistortMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={2}
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
}

// Smaller floating orbs
function FloatingOrb({ position, color, size = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

// Rotating ring
function TorusRing() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <torusGeometry args={[3, 0.4, 16, 100]} />
      <meshStandardMaterial
        color="#ff00ff"
        emissive="#ff00ff"
        emissiveIntensity={1}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 w-full h-full" style={{ zIndex: 0 }}>
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        {/* Solid black background */}
        <color attach="background" args={["#000000"]} />

        {/* BRIGHT lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[10, 10, 10]} intensity={3} color="#00ffff" />
        <pointLight position={[-10, -10, -5]} intensity={2} color="#ff00ff" />
        <pointLight position={[0, 0, 10]} intensity={2} color="#ffffff" />

        <Suspense fallback={null}>
          {/* Background stars - FIXED SETTINGS */}
          <Stars
            radius={120}        // Increased radius
            depth={80}          // Increased depth
            count={7000}        // More stars
            factor={6}          // Bigger stars
            saturation={1}      // Changed from 0 - adds color
            fade={true}         // Keep fade
            speed={1.5}         // Faster movement
          />

          {/* Main glowing sphere */}
          <GlowingSphere />

          {/* Floating orbs */}
          <FloatingOrb position={[-4, 1, -3]} color="#00ffff" size={0.8} />
          <FloatingOrb position={[4, -1, -4]} color="#ff00ff" size={1} />
          <FloatingOrb position={[0, 3, -6]} color="#ffff00" size={0.6} />

          {/* Rotating ring */}
          <TorusRing />
        </Suspense>
      </Canvas>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black pointer-events-none" />
    </div>
  );
}