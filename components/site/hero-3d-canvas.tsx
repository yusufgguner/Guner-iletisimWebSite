"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

function Phone() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.35) * 0.35 + state.pointer.x * 0.25;
    group.current.rotation.x = Math.cos(t * 0.3) * 0.08 - state.pointer.y * 0.15;
  });

  return (
    <group ref={group}>
      {/* body */}
      <RoundedBox args={[1.5, 3.1, 0.16]} radius={0.09} smoothness={6}>
        <meshStandardMaterial color="#d6d3d1" metalness={0.7} roughness={0.35} />
      </RoundedBox>
      {/* screen */}
      <RoundedBox args={[1.38, 2.98, 0.02]} radius={0.07} smoothness={6} position={[0, 0, 0.085]}>
        <meshStandardMaterial color="#16181d" metalness={0.1} roughness={0.25} />
      </RoundedBox>
      {/* screen glow accents */}
      <mesh position={[0, 0.55, 0.1]}>
        <circleGeometry args={[0.16, 48]} />
        <meshBasicMaterial color="#ea580c" />
      </mesh>
      <mesh position={[0, 0.05, 0.1]}>
        <planeGeometry args={[0.9, 0.045]} />
        <meshBasicMaterial color="#3f3f46" />
      </mesh>
      <mesh position={[0, -0.12, 0.1]}>
        <planeGeometry args={[0.62, 0.045]} />
        <meshBasicMaterial color="#3f3f46" />
      </mesh>
      {/* camera island */}
      <RoundedBox args={[0.52, 0.52, 0.05]} radius={0.12} smoothness={4} position={[-0.4, 1.15, -0.1]}>
        <meshStandardMaterial color="#c9c5c2" metalness={0.6} roughness={0.4} />
      </RoundedBox>
    </group>
  );
}

export default function Hero3DCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 35 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} />
      <directionalLight position={[-5, -2, 3]} intensity={0.5} />
      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.7}>
        <Phone />
      </Float>
      <ContactShadows position={[0, -2, 0]} opacity={0.28} scale={7} blur={2.6} far={3} />
    </Canvas>
  );
}
