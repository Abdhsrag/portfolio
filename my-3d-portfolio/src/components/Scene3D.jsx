"use client";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Scene3D({ mousePosition, isMobile, ...props }) {
  const group = useRef();
  const { scene } = useGLTF("/models/scene.glb");

  useFrame((state) => {
    if (group.current) {
      // Smooth rotation based on mouse position (only on desktop)
      if (mousePosition && !isMobile) {
        group.current.rotation.y += (mousePosition.x * 0.5 - group.current.rotation.y) * 0.05;
        group.current.rotation.x += (mousePosition.y * 0.3 - group.current.rotation.x) * 0.05;
      }

      // Subtle floating animation
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={group} {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/scene.glb");