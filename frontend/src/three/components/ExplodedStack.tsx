"use client";

import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export type StackTier = 'frontend' | 'api' | 'database' | 'caching';

export interface ExplodedStackProps {
  selectedTier: StackTier;
  onSelectTier: (tier: StackTier) => void;
  isOverdrive: boolean;
}

/**
 * ExplodedStack
 * A monumental 3D representation of the 4-tier MERN stack suspended in zero gravity.
 * Interactive rotation, tier highlighting, and high-voltage simulation overdrive.
 */
export const ExplodedStack: React.FC<ExplodedStackProps> = ({
  selectedTier,
  onSelectTier,
  isOverdrive,
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const frontendRef = useRef<THREE.Mesh>(null!);
  const apiRef = useRef<THREE.Mesh>(null!);
  const dbGroupRef = useRef<THREE.Group>(null!);
  const redisRingRef = useRef<THREE.Mesh>(null!);
  const streamParticlesRef = useRef<THREE.InstancedMesh>(null!);
  const tubeRef = useRef<THREE.Mesh>(null!);
  const overdriveRingRef1 = useRef<THREE.Mesh>(null!);
  const overdriveRingRef2 = useRef<THREE.Mesh>(null!);

  const [hoveredTier, setHoveredTier] = useState<StackTier | null>(null);

  /* eslint-disable react-hooks/purity */
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const streamData = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 80; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 2,
        y: -3 + Math.random() * 6,
        z: (Math.random() - 0.5) * 2,
        speed: 0.02 + Math.random() * 0.04,
        scale: 0.04 + Math.random() * 0.06,
      });
    }
    return arr;
  }, []);
  /* eslint-enable react-hooks/purity */

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const speedMultiplier = isOverdrive ? 4.5 : 1;

    // Gentle global orbit rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      t * 0.15 * speedMultiplier + (state.pointer.x * 0.5),
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      Math.sin(t * 0.3) * 0.15 + (state.pointer.y * 0.3),
      0.05
    );

    // Tier 1: Frontend Dodecahedron
    if (frontendRef.current) {
      frontendRef.current.rotation.x += delta * 0.6 * speedMultiplier;
      frontendRef.current.rotation.y += delta * 0.8 * speedMultiplier;
      const targetScale = selectedTier === 'frontend' || hoveredTier === 'frontend' ? 1.25 : 1;
      frontendRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }

    // Tier 2: API Cyber-Prism
    if (apiRef.current) {
      apiRef.current.rotation.y -= delta * 1.0 * speedMultiplier;
      apiRef.current.rotation.z += delta * 0.4 * speedMultiplier;
      const targetScale = selectedTier === 'api' || hoveredTier === 'api' ? 1.25 : 1;
      apiRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }

    // Tier 3: Database Emerald Cluster
    if (dbGroupRef.current) {
      dbGroupRef.current.rotation.y += delta * 0.7 * speedMultiplier;
      const targetScale = selectedTier === 'database' || hoveredTier === 'database' ? 1.25 : 1;
      dbGroupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }

    // Tier 4: Redis Orbiting Ring
    if (redisRingRef.current) {
      redisRingRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 2) * 0.2;
      redisRingRef.current.rotation.z += delta * 2.5 * speedMultiplier;
      const targetScale = selectedTier === 'caching' || hoveredTier === 'caching' ? 1.25 : 1;
      redisRingRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }

    // Pulse central tube and rotate high-speed overdrive orbital rings when Overdrive is active
    if (tubeRef.current) {
      const scaleXZ = isOverdrive ? 1.0 + Math.sin(t * 15) * 0.4 : 1.0;
      tubeRef.current.scale.set(scaleXZ, 1, scaleXZ);
    }
    if (overdriveRingRef1.current) {
      overdriveRingRef1.current.rotation.y += delta * (isOverdrive ? 8 : 1);
      overdriveRingRef1.current.rotation.z = Math.sin(t * 3) * 0.4;
    }
    if (overdriveRingRef2.current) {
      overdriveRingRef2.current.rotation.y -= delta * (isOverdrive ? 10 : 1.2);
      overdriveRingRef2.current.rotation.x = Math.cos(t * 3) * 0.4;
    }

    // Animate downward data stream particles
    if (streamParticlesRef.current) {
      streamData.forEach((p, idx) => {
        p.y -= p.speed * speedMultiplier;
        if (p.y < -3) p.y = 3; // Loop from top to bottom

        dummy.position.set(p.x, p.y, p.z);
        dummy.scale.set(p.scale, p.scale * (isOverdrive ? 3.5 : 1.8), p.scale);
        dummy.updateMatrix();
        streamParticlesRef.current.setMatrixAt(idx, dummy.matrix);
      });
      streamParticlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Data Stream Tube Light */}
      <mesh ref={tubeRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 6.5, 16]} />
        <meshBasicMaterial color={isOverdrive ? "#00F5FF" : "#3B82F6"} transparent opacity={isOverdrive ? 0.75 : 0.25} />
      </mesh>

      {/* High-Voltage Overdrive Orbital Accelerator Rings */}
      <mesh ref={overdriveRingRef1} position={[0, 0.5, 0]}>
        <torusGeometry args={[2.0, isOverdrive ? 0.04 : 0.015, 16, 64]} />
        <meshBasicMaterial color={isOverdrive ? "#10B981" : "#3B82F6"} transparent opacity={isOverdrive ? 0.85 : 0.2} />
      </mesh>
      <mesh ref={overdriveRingRef2} position={[0, -0.8, 0]}>
        <torusGeometry args={[2.4, isOverdrive ? 0.03 : 0.012, 16, 64]} />
        <meshBasicMaterial color={isOverdrive ? "#00F5FF" : "#3B82F6"} transparent opacity={isOverdrive ? 0.8 : 0.15} />
      </mesh>

      {/* Instanced Data Particles Flowing Between Tiers */}
      <instancedMesh ref={streamParticlesRef} args={[undefined, undefined, streamData.length]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={isOverdrive ? "#10B981" : "#00F5FF"} transparent opacity={isOverdrive ? 0.95 : 0.7} />
      </instancedMesh>

      {/* TIER 1: FRONTEND (React 19 / Next.js Dodecahedron) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <group position={[0, 2.3, 0]}>
          <mesh
            ref={frontendRef}
            onClick={(e) => { e.stopPropagation(); onSelectTier('frontend'); }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredTier('frontend');
              if (typeof document !== 'undefined') document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              setHoveredTier(null);
              if (typeof document !== 'undefined') document.body.style.cursor = 'auto';
            }}
          >
            <dodecahedronGeometry args={[1.0, 0]} />
            <meshPhysicalMaterial
              color="#00F5FF"
              emissive="#00F5FF"
              emissiveIntensity={selectedTier === 'frontend' ? 0.8 : 0.3}
              transparent
              opacity={0.85}
              roughness={0.1}
              wireframe={selectedTier !== 'frontend'}
            />
          </mesh>
          <mesh>
            <dodecahedronGeometry args={[0.6, 0]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.5} />
          </mesh>
        </group>
      </Float>

      {/* TIER 2: API & GATEWAY (Node.js / Express Cyber-Prism) */}
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.9}>
        <group position={[0, 0.75, 0]}>
          <mesh
            ref={apiRef}
            onClick={(e) => { e.stopPropagation(); onSelectTier('api'); }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredTier('api');
              if (typeof document !== 'undefined') document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              setHoveredTier(null);
              if (typeof document !== 'undefined') document.body.style.cursor = 'auto';
            }}
          >
            <octahedronGeometry args={[1.0, 0]} />
            <meshPhysicalMaterial
              color="#3B82F6"
              emissive="#3B82F6"
              emissiveIntensity={selectedTier === 'api' ? 0.9 : 0.35}
              transparent
              opacity={0.9}
              roughness={0.15}
              clearcoat={1}
            />
          </mesh>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[1.3, 0.03, 16, 64]} />
            <meshBasicMaterial color="#3B82F6" transparent opacity={0.6} />
          </mesh>
        </group>
      </Float>

      {/* TIER 3: DATABASE CLUSTER (MongoDB Atlas Emerald Shards) */}
      <Float speed={1.8} rotationIntensity={0.7} floatIntensity={1.1}>
        <group
          ref={dbGroupRef}
          position={[0, -0.75, 0]}
          onClick={(e) => { e.stopPropagation(); onSelectTier('database'); }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredTier('database');
            if (typeof document !== 'undefined') document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHoveredTier(null);
            if (typeof document !== 'undefined') document.body.style.cursor = 'auto';
          }}
        >
          {/* 3 Crystalline Emerald Shards in a Cluster */}
          {[-0.6, 0.6, 0].map((xOffset, i) => (
            <mesh key={i} position={[xOffset, i === 2 ? 0.4 : -0.2, i === 2 ? 0.5 : -0.3]}>
              <icosahedronGeometry args={[0.6, 0]} />
              <meshPhysicalMaterial
                color="#10B981"
                emissive="#10B981"
                emissiveIntensity={selectedTier === 'database' ? 0.8 : 0.3}
                transparent
                opacity={0.85}
                roughness={0.1}
              />
            </mesh>
          ))}
        </group>
      </Float>

      {/* TIER 4: CACHING LAYER (Redis Orbit Ring Accelerator) */}
      <Float speed={3} rotationIntensity={0.4} floatIntensity={0.6}>
        <group position={[0, -2.3, 0]}>
          <mesh
            ref={redisRingRef}
            onClick={(e) => { e.stopPropagation(); onSelectTier('caching'); }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredTier('caching');
              if (typeof document !== 'undefined') document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              setHoveredTier(null);
              if (typeof document !== 'undefined') document.body.style.cursor = 'auto';
            }}
          >
            <torusGeometry args={[1.5, 0.18, 16, 64]} />
            <meshPhysicalMaterial
              color="#00F5FF"
              emissive="#00F5FF"
              emissiveIntensity={selectedTier === 'caching' ? 1.0 : 0.4}
              transparent
              opacity={0.9}
              roughness={0.05}
            />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial color="#3B82F6" transparent opacity={0.7} />
          </mesh>
        </group>
      </Float>
    </group>
  );
};
