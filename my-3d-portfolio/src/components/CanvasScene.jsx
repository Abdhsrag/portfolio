"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function RotatingCube() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#00ffff" wireframe />
    </mesh>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Test marker */}
      <div className="absolute top-4 left-4 text-cyan-400 text-sm z-50 bg-black/50 px-3 py-1 rounded">
        🌐 3D Active
      </div>

      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ width: "100%", height: "100vh", background: "#0a0a0a" }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={2} />
        
        {/* Simple cube that WILL be visible */}
        <RotatingCube />
      </Canvas>
    </div>
  );
}