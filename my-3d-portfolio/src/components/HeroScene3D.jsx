"use client";
import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Billboard, Line } from "@react-three/drei";
import * as THREE from "three";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = (e) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
}

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
  const groupRef = useRef();
  const materialRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const scaleRef = useRef(1.0);
  const emissiveRef = useRef(1.4);

  useEffect(() => {
    if (meshRef.current && meshRef.current.material) {
      materialRef.current = meshRef.current.material;
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.cursor = hovered ? "pointer" : "auto";
    }
    return () => {
      if (typeof window !== "undefined") {
        document.body.style.cursor = "auto";
      }
    };
  }, [hovered]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * (hovered ? 0.8 : 0.4);
      meshRef.current.rotation.y = t * (hovered ? 0.5 : 0.25);
    }
    
    // Smooth scale & emissive interpolation
    const targetScale = hovered ? 1.35 : 1.0;
    const targetEmissive = hovered ? 3.0 : 1.4;
    
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, targetScale, 0.12);
    emissiveRef.current = THREE.MathUtils.lerp(emissiveRef.current, targetEmissive, 0.12);

    if (groupRef.current) {
      groupRef.current.scale.setScalar(scaleRef.current);
    }
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = emissiveRef.current;
    }
  });

  return (
    <Float
      speed={hovered ? 0.6 : 2}
      rotationIntensity={hovered ? 0.1 : 0.25}
      floatIntensity={hovered ? 0.15 : 0.35}
      position={startPos}
    >
      <group
        ref={groupRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
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

        {/* Labels billboard facing camera */}
        <Billboard>
          <Text
            position={[0, 0.38, 0]}
            fontSize={0.15}
            color={hovered ? color : "#ffffff"}
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            {name}
          </Text>
          <Text
            position={[0, 0.22, 0]}
            fontSize={0.09}
            color={hovered ? "#ffffff" : "#9ca3af"}
            anchorX="center"
            anchorY="middle"
          >
            {skill}
          </Text>
        </Billboard>
      </group>

      {/* Connection laser line back to Core origin [0,0,0] */}
      <Line
        points={[[0, 0, 0], [-startPos[0], -startPos[1], -startPos[2]]]}
        color={color}
        lineWidth={hovered ? 2.5 : 1}
        transparent
        opacity={hovered ? 0.7 : 0.2}
      />
    </Float>
  );
}

// 4. Drifting Matrix-like Code Runes
function CodeRune({ text, speed, startPos, size }) {
  const textRef = useRef();
  const materialRef = useRef(null);

  useEffect(() => {
    if (textRef.current && textRef.current.material) {
      materialRef.current = textRef.current.material;
    }
  }, []);

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
    if (materialRef.current) {
      materialRef.current.opacity = 0.25 * opacityFactor;
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
function InteractiveParticleSwarm() {
  const pointsRef = useRef();
  const particleCount = 150;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const mobileCount = 50;
  const actualCount = isMobile ? mobileCount : particleCount;

  const [positions, initialData] = useMemo(() => {
    const pos = new Float32Array(actualCount * 3);
    const data = [];
    for (let i = 0; i < actualCount; i++) {
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
  }, [actualCount]);

  // Safe direct initialization of position attribute on mount/update
  useEffect(() => {
    if (pointsRef.current && pointsRef.current.geometry) {
      pointsRef.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
    }
  }, [positions]);

  const frameCounter = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!pointsRef.current || !pointsRef.current.geometry) return;
    const t = state.clock.elapsedTime;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute("position");
    if (!posAttr) return;

    pointsRef.current.rotation.y = t * 0.02;

    // Throttle mouse interaction to 30fps (every 2nd frame)
    frameCounter.current++;
    if (frameCounter.current % 2 === 0) {
      mousePos.current.x = state.pointer.x * 2.3;
      mousePos.current.y = state.pointer.y * 2.3;
    }
    const mx = mousePos.current.x;
    const my = mousePos.current.y;

    for (let i = 0; i < actualCount; i++) {
      const d = initialData[i];
      const currentAngle = d.angle + t * d.speed;
      let x = Math.cos(currentAngle) * d.radius;
      let z = Math.sin(currentAngle) * d.radius;
      let y = d.y + Math.sin(t + d.phase) * 0.12;

      // Mouse interactivity (throttled)
      const dx = x - mx;
      const dy = y - my;
      const distSq = dx * dx + dy * dy;
      if (distSq < 2.89) { // 1.7^2 = 2.89
        const dist = Math.sqrt(distSq);
        const factor = (1.7 - dist) * 0.12;
        x += (dx / (dist || 0.001)) * factor;
        y += (dy / (dist || 0.001)) * factor;
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
function SceneContent({ skillNodes, runesList, isMobile }) {
  const containerRef = useRef();

  useFrame((state) => {
    // Smooth, slow parallax using internal R3F state pointer (avoids React state update lag)
    const { x, y } = state.pointer;
    if (containerRef.current) {
      containerRef.current.rotation.y = THREE.MathUtils.lerp(
        containerRef.current.rotation.y,
        x * 0.22,
        0.04
      );
      containerRef.current.rotation.x = THREE.MathUtils.lerp(
        containerRef.current.rotation.x,
        -y * 0.18,
        0.04
      );
    }
  });

  return (
    <group ref={containerRef} scale={isMobile ? 0.75 : 1.35}>
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
      <InteractiveParticleSwarm />
    </group>
  );
}

// 7. Premium 2D Canvas Fallback for systems without WebGL support
function HeroScene2D({ isMobile, skillNodes, runesList }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove2D = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };
    window.addEventListener("mousemove", handleMouseMove2D, { passive: true });

    // Dynamic 2D Particles mapping
    const particleCount = isMobile ? 60 : 150;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.2 + Math.random() * 2.8;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.04 + Math.random() * 0.12;
      particles.push({
        radius,
        angle,
        speed,
        yOffset: (Math.random() - 0.5) * 220,
        size: 1 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Interactive 2D Skill nodes
    const activeSkills = skillNodes.map((node) => ({
      ...node,
      x: node.startPos[0],
      y: node.startPos[1],
      z: node.startPos[2],
      phase: Math.random() * Math.PI * 2,
    }));

    // Interactive 2D Runes
    const activeRunes = runesList.map((rune) => ({
      ...rune,
      x: rune.startPos[0],
      yOffset: (Math.random() - 0.5) * 320,
      speed: rune.speed * 28,
    }));

    let time = 0;
    let lerpedMouseX = 0;
    let lerpedMouseY = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Smoothly lerp mouse coordinates for buttery smooth motion
      lerpedMouseX = THREE.MathUtils.lerp(lerpedMouseX, mouseRef.current.x, 0.08);
      lerpedMouseY = THREE.MathUtils.lerp(lerpedMouseY, mouseRef.current.y, 0.08);

      // Parallax shift from mouse position
      const mx = lerpedMouseX * 25;
      const my = -lerpedMouseY * 25;

      const coreX = cx + mx;
      const coreY = cy + my;
      const coreScale = 1.0 + Math.sin(time * 1.5) * 0.04;
      const scaleFactor = Math.min(width, height) / (isMobile ? 6.5 : 4.8);

      // Absolute mouse coordinates in canvas space
      const mouseCanvasX = cx + lerpedMouseX * (width / 2);
      const mouseCanvasY = cy - lerpedMouseY * (height / 2);
      let hasAnyHovered = false;

      // Draw concentric holographic energy rings
      ctx.lineWidth = 1.5;

      // Ring 1 (Cyan)
      ctx.strokeStyle = "rgba(0, 217, 255, 0.18)";
      ctx.beginPath();
      ctx.ellipse(coreX, coreY, scaleFactor * 1.35 * coreScale, scaleFactor * 0.45 * coreScale, Math.PI / 4 + time * 0.02, 0, Math.PI * 2);
      ctx.stroke();

      // Ring 2 (Purple)
      ctx.strokeStyle = "rgba(168, 85, 247, 0.18)";
      ctx.beginPath();
      ctx.ellipse(coreX, coreY, scaleFactor * 1.65 * coreScale, scaleFactor * 0.55 * coreScale, -Math.PI / 4 + time * -0.015, 0, Math.PI * 2);
      ctx.stroke();

      // Ring 3 (Pink)
      ctx.strokeStyle = "rgba(236, 72, 153, 0.18)";
      ctx.beginPath();
      ctx.ellipse(coreX, coreY, scaleFactor * 1.95 * coreScale, scaleFactor * 0.65 * coreScale, Math.PI / 3 + time * 0.01, 0, Math.PI * 2);
      ctx.stroke();

      // Central core neon glow
      const grad = ctx.createRadialGradient(coreX, coreY, 2, coreX, coreY, 60 * coreScale);
      grad.addColorStop(0, "rgba(0, 217, 255, 0.7)");
      grad.addColorStop(0.3, "rgba(0, 217, 255, 0.35)");
      grad.addColorStop(0.6, "rgba(168, 85, 247, 0.15)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(coreX, coreY, 60 * coreScale, 0, Math.PI * 2);
      ctx.fill();

      // Inner plasma core
      ctx.fillStyle = "#00d9ff";
      ctx.shadowColor = "#00d9ff";
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(coreX, coreY, 18 * coreScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // reset

      // Draw particle swarm with mouse repulsion
      ctx.fillStyle = "rgba(0, 217, 255, 0.6)";
      particles.forEach((p) => {
        const currentAngle = p.angle + time * p.speed;
        let px = Math.cos(currentAngle) * (p.radius * scaleFactor);
        let py = Math.sin(currentAngle) * (p.radius * scaleFactor * 0.35) + p.yOffset;

        const mouseWorldX = lerpedMouseX * (width / 2);
        const mouseWorldY = -lerpedMouseY * (height / 2);
        const dx = px - mouseWorldX;
        const dy = py - mouseWorldY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const force = (130 - dist) * 0.08;
          px += (dx / dist) * force;
          py += (dy / dist) * force;
        }

        ctx.beginPath();
        ctx.arc(coreX + px, coreY + py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw matrix-like drifting code runes
      ctx.font = "11px monospace";
      activeRunes.forEach((r) => {
        r.yOffset -= r.speed * 0.05;
        if (r.yOffset < -height / 2) {
          r.yOffset = height / 2;
        }

        const rx = coreX + r.x * scaleFactor;
        const ry = coreY + r.yOffset;
        const opacity = Math.max(0, 1 - Math.abs(r.yOffset) / (height * 0.45)) * 0.28;
        ctx.fillStyle = `rgba(0, 217, 255, ${opacity})`;
        ctx.fillText(r.text, rx, ry);
      });

      // Draw floating skill nodes connected back to core by lasers
      activeSkills.forEach((node) => {
        const floatOffset = Math.sin(time * 2.2 + node.phase) * 12;
        const sx = coreX + node.x * scaleFactor;
        const sy = coreY - (node.y * scaleFactor) + floatOffset;

        // Hover detection in 2D space
        const dx = mouseCanvasX - sx;
        const dy = mouseCanvasY - sy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isHovered = dist < 45;

        if (isHovered) {
          hasAnyHovered = true;
        }

        // Interpolate scale dynamically
        node.currentScale = THREE.MathUtils.lerp(node.currentScale || 1.0, isHovered ? 1.35 : 1.0, 0.12);
        const ns = node.currentScale;

        // Laser line from core
        ctx.strokeStyle = isHovered ? `${node.color}a0` : `${node.color}2b`;
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.setLineDash(isHovered ? [] : [2, 3]);
        ctx.beginPath();
        ctx.moveTo(coreX, coreY);
        ctx.lineTo(sx, sy);
        ctx.stroke();
        ctx.setLineDash([]);

        // Glow node diamond
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isHovered ? 24 : 12;
        ctx.beginPath();
        ctx.moveTo(sx, sy - 7 * ns);
        ctx.lineTo(sx + 6 * ns, sy);
        ctx.lineTo(sx, sy + 7 * ns);
        ctx.lineTo(sx - 6 * ns, sy);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node Title text
        ctx.fillStyle = isHovered ? node.color : "#ffffff";
        ctx.font = `bold ${Math.round(13 * ns)}px Inter, system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(node.name, sx, sy - 22 * ns);

        // Node Skill detail
        ctx.fillStyle = isHovered ? "#ffffff" : "#9ca3af";
        ctx.font = `${Math.round(9 * ns)}px Inter, system-ui, sans-serif`;
        ctx.fillText(node.skill, sx, sy - 11 * ns);
      });

      if (typeof window !== "undefined") {
        document.body.style.cursor = hasAnyHovered ? "pointer" : "auto";
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove2D);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, skillNodes, runesList]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
        display: "block",
      }}
    />
  );
}

// 8. Main 3D Hero Scene
export default function HeroScene3D({ isMobile }) {
  const [hasWebGL] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch (e) {
      return false;
    }
  });

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

  if (!hasWebGL) {
    return (
      <HeroScene2D
        isMobile={isMobile}
        skillNodes={skillNodes}
        runesList={runesList}
      />
    );
  }

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
          skillNodes={skillNodes}
          runesList={runesList}
          isMobile={isMobile}
        />
      </Suspense>
    </Canvas>
  );
}
