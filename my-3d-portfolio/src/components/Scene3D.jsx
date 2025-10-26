"use client";
import { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Scene3D({ mousePosition, isMobile, ...props }) {
  const group = useRef();
  const { scene } = useGLTF("/models/scene.glb");
  
  // Optimize material
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = false;
        child.receiveShadow = false;
        child.material.needsUpdate = false;
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (!group.current) return;

    const time = state.clock.elapsedTime;
    
    // Mouse-based rotation (desktop only)
    if (mousePosition && !isMobile) {
      const targetRotationY = mousePosition.x * 0.5;
      const targetRotationX = mousePosition.y * 0.3;
      
      group.current.rotation.y += (targetRotationY - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (targetRotationX - group.current.rotation.x) * 0.05;
    }

    // Floating animation
    group.current.position.y = Math.sin(time * 0.3) * 0.2;
  });

  return (
    <group ref={group} {...props}>
      <primitive object={scene} />
    </group>
  );
}

// Preload with lower priority
if (typeof window !== 'undefined') {
  setTimeout(() => useGLTF.preload("/models/scene.glb"), 1000);
}