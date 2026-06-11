"use client";
import { useRef, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Billboard, Line } from "@react-three/drei";
import * as THREE from "three";

// 1. Quantum Reactor Core: A pulsing double-shelled core with internal lights
function ReactorCore() {
  const coreRef = useRef();
  const outerRef = useRef();
  const pointLightRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.15;
      coreRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
      
      // Pulse scale
      const scale = 1.0 + Math.sin(t * 1.5) * 0.04;
      coreRef.current.scale.setScalar(scale);
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = -t * 0.08;
      outerRef.current.rotation.z = Math.cos(t * 0.1) * 0.1;
    }
    if (pointLightRef.current) {
      pointLightRef.current.intensity = 5 + Math.sin(t * 3) * 1.5;
    }
  });

  return (
    <group>
      {/* Central Plasma Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshPhysicalMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={1.8}
          metalness={0.9}
          roughness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Outer Holographic Energy cage */}
      <mesh ref={outerRef}>
        <dodecahedronGeometry args={[1.05, 1]} />
        <meshPhysicalMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.35}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Core light source */}
      <pointLight
        ref={pointLightRef}
        position={[0, 0, 0]}
        intensity={6}
        color="#00d9ff"
        distance={10}
        decay={1.2}
      />
    </group>
  );
}

// 2. Orbital Ring with energy packet node
function OrbitalRing({ radius, speed, rotationAxis, color }) {
  const ringRef = useRef();
  const nodeRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringRef.current) {
      ringRef.current.rotation.x = rotationAxis[0] + Math.sin(t * 0.08) * 0.04;
      ringRef.current.rotation.y = rotationAxis[1] + t * speed * 0.1;
      ringRef.current.rotation.z = rotationAxis[2];
    }
    
    if (nodeRef.current) {
      const angle = t * speed * 1.5;
      nodeRef.current.position.x = Math.cos(angle) * radius;
      nodeRef.current.position.z = Math.sin(angle) * radius;
    }
  });

  return (
    <group ref={ringRef}>
      {/* The Torus Ring */}
      <mesh>
        <torusGeometry args={[radius, 0.012, 8, 128]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          transparent
          opacity={0.15}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Orbiting Energy Packet */}
      <mesh ref={nodeRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.5}
          metalness={0.9}
          roughness={0.05}
        />
      </mesh>
    </group>
  );
}

// 3. Floating Skill Nodes connected to the core by lasers
function SkillNode({ name, skill, startPos, color }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.4;
      meshRef.current.rotation.y = t * 0.25;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.25}
      floatIntensity={0.35}
      position={startPos}
    >
      {/* Skill Node Mesh */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.13]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.4}
          metalness={0.9}
          roughness={0.05}
        />
      </mesh>

      {/* Connection laser line back to Core origin [0,0,0] using Drei Line */}
      <Line
        points={[[0, 0, 0], [-startPos[0], -startPos[1], -startPos[2]]]}
        color={color}
        lineWidth={1}
        transparent
        opacity={0.2}
      />

      {/* Labels billboard facing camera */}
      <Billboard>
        <Text
          position={[0, 0.35, 0]}
          fontSize={0.14}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {name}
        </Text>
        <Text
          position={[0, 0.2, 0]}
          fontSize={0.085}
          color="#9ca3af"
          anchorX="center"
          anchorY="middle"
        >
          {skill}
        </Text>
      </Billboard>
    </Float>
  );
}

// 4. Drifting Matrix-like Code Runes
function CodeRune({ text, speed, startPos, size }) {
  const textRef = useRef();
  
  useFrame((state) => {
    if (!textRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Drifts upwards and loops relative to the billboard group
    const yOffset = (t * speed) % 7;
    textRef.current.position.y = yOffset - 3.5;
    
    // Rotate slowly
    textRef.current.rotation.x = Math.sin(t * 0.15) * 0.15;
    textRef.current.rotation.y = t * 0.08;
    
    // Fade at edges
    const currentY = startPos[1] + textRef.current.position.y;
    const opacityFactor = Math.max(0, 1 - Math.abs(currentY) / 3.2);
    if (textRef.current.material) {
      textRef.current.material.opacity = 0.25 * opacityFactor;
    }
  });
  
  return (
    <Billboard position={[startPos[0], startPos[1], startPos[2]]}>
      <Text
        ref={textRef}
        fontSize={size}
        color="#00d9ff"
        transparent
        opacity={0.2}
      >
        {text}
      </Text>
    </Billboard>
  );
}

// 5. Interactive Particle Swarm with dynamic wind/turbulence from mouse position
function InteractiveParticleSwarm({ mousePosition }) {
  const pointsRef = useRef();
  const particleCount = 450;

  const [positions, initialData] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const data = [];
    for (let i = 0; i < particleCount; i++) {
      // Swirling cylinder-helix distribution
      const radius = 1.3 + Math.random() * 2.7;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 4.0;
      
      const x = Math.cos(angle) * radius;
      const y = height;
      const z = Math.sin(angle) * radius;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      data.push({
        index: i,
        radius,
        angle,
        y: height,
        speed: 0.1 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2
      });
    }
    return [pos, data];
  }, []);

  // Safe direct initialization of position attribute on mount/update
  useEffect(() => {
    if (pointsRef.current && pointsRef.current.geometry) {
      pointsRef.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
    }
  }, [positions]);

  useFrame((state) => {
    if (!pointsRef.current || !pointsRef.current.geometry) return;
    const t = state.clock.elapsedTime;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute("position");
    if (!posAttr) return;

    // Tilts parent group based on mouse
    if (mousePosition) {
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -mousePosition.y * 0.18, 0.05);
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, mousePosition.x * 0.18 + t * 0.03, 0.05);
    } else {
      pointsRef.current.rotation.y = t * 0.03;
    }

    for (let i = 0; i < particleCount; i++) {
      const d = initialData[i];
      // Orbit path
      const currentAngle = d.angle + t * d.speed;
      let x = Math.cos(currentAngle) * d.radius;
      let z = Math.sin(currentAngle) * d.radius;
      let y = d.y + Math.sin(t + d.phase) * 0.12;

      // Mouse interactivity (turbulence/wind repeller)
      if (mousePosition) {
        const mx = mousePosition.x * 2.8;
        const my = mousePosition.y * 2.8;
        const dist = Math.sqrt((x - mx) * (x - mx) + (y - my) * (y - my));
        if (dist < 1.6) {
          const factor = (1.6 - dist) * 0.15;
          x += (mx - x) * factor;
          y += (my - y) * factor;
        }
      }

      posAttr.setXYZ(i, x, y, z);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial
        color="#00d9ff"
        size={0.035}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 6. Scene Content Wrapper to allow useFrame hook usage inside Canvas
function SceneContent({ mousePosition, skillNodes, runesList }) {
  const containerRef = useRef();

  useFrame((state) => {
    // Parallax on the entire container
    if (containerRef.current && mousePosition) {
      containerRef.current.rotation.y = THREE.MathUtils.lerp(
        containerRef.current.rotation.y,
        mousePosition.x * 0.1,
        0.05
      );
      containerRef.current.rotation.x = THREE.MathUtils.lerp(
        containerRef.current.rotation.x,
        -mousePosition.y * 0.1,
        0.05
      );
    }
  });

  return (
    <group ref={containerRef} scale={0.9}>
      {/* Central Quantum Reactor */}
      <ReactorCore />

      {/* Holographic Concentric Rings */}
      <OrbitalRing radius={1.35} speed={0.9} rotationAxis={[Math.PI / 4, 0, 0]} color="#00d9ff" />
      <OrbitalRing radius={1.65} speed={-0.75} rotationAxis={[0, Math.PI / 4, 0]} color="#a855f7" />
      <OrbitalRing radius={1.95} speed={0.5} rotationAxis={[Math.PI / 3, Math.PI / 3, 0]} color="#ec4899" />

      {/* Floating Skill Constellation Nodes */}
      {skillNodes.map((node, i) => (
        <SkillNode key={i} {...node} />
      ))}

      {/* Drifting Code Runes */}
      {runesList.map((rune, i) => (
        <CodeRune key={i} {...rune} />
      ))}

      {/* Swirling Interactive Particles */}
      <InteractiveParticleSwarm mousePosition={mousePosition} />
    </group>
  );
}

// 7. Main 3D Hero Scene
export default function HeroScene3D({ mousePosition, isMobile }) {
  const skillNodes = useMemo(() => [
    { name: "Frontend", skill: "React / Next.js / TS", startPos: [2.2, 0.9, 0.4], color: "#00d9ff" },
    { name: "Backend", skill: "Node.js / Django", startPos: [-2.2, -0.9, -0.4], color: "#a855f7" },
    { name: "Database", skill: "PostgreSQL / DBs", startPos: [1.3, -1.5, 0.8], color: "#ec4899" },
    { name: "Systems", skill: "Linux / Bash / Git", startPos: [-1.3, 1.5, -0.8], color: "#eab308" },
    { name: "Languages", skill: "Python / JS / TS", startPos: [0.3, 1.4, 1.6], color: "#22c55e" },
    { name: "AI & Cloud", skill: "APIs / AI Agents", startPos: [-0.3, -1.4, -1.6], color: "#f97316" }
  ], []);

  const runesList = useMemo(() => [
    { text: "<div />", speed: 0.18, startPos: [-2.8, 0, -2.0], size: 0.12 },
    { text: "import", speed: 0.22, startPos: [2.5, -2.0, -1.5], size: 0.11 },
    { text: "const", speed: 0.15, startPos: [-1.8, 3.0, -1.0], size: 0.10 },
    { text: "await", speed: 0.25, startPos: [1.8, 1.0, -2.5], size: 0.12 },
    { text: "async", speed: 0.20, startPos: [-2.2, -1.5, -1.2], size: 0.11 },
    { text: "=>", speed: 0.28, startPos: [2.0, -3.0, -0.8], size: 0.13 },
    { text: "{}", speed: 0.12, startPos: [-0.8, 2.0, -2.2], size: 0.10 },
    { text: "[]", speed: 0.16, startPos: [0.8, -2.5, -1.8], size: 0.10 },
    { text: "git push", speed: 0.24, startPos: [-3.2, 1.5, -0.5], size: 0.12 },
    { text: "npm dev", speed: 0.19, startPos: [3.0, 2.5, -1.2], size: 0.11 }
  ], []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: isMobile ? 65 : 45 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.4,
      }}
      dpr={[1, 1.5]}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      
      {/* Supplemental glowing spotlights */}
      <pointLight position={[3, 4, 3]} intensity={2} color="#00d9ff" distance={12} decay={1.5} />
      <pointLight position={[-3, -4, 2]} intensity={2.5} color="#a855f7" distance={12} decay={1.5} />

      <Suspense fallback={null}>
        <SceneContent
          mousePosition={mousePosition}
          skillNodes={skillNodes}
          runesList={runesList}
        />
      </Suspense>
    </Canvas>
  );
}
