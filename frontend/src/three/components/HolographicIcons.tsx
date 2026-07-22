"use client";

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface HolographicIconProps {
  position: [number, number, number];
  rotationSpeed?: number;
  color?: string;
  shape?: 'torus' | 'octahedron' | 'icosahedron' | 'dodecahedron';
  scale?: number;
  orbitRadius?: number;
  orbitSpeed?: number;
  orbitOffset?: number;
}

const HolographicSymbol: React.FC<HolographicIconProps> = ({
  position,
  rotationSpeed = 1,
  color = '#00F5FF',
  shape = 'octahedron',
  scale = 0.5,
  orbitRadius = 0,
  orbitSpeed = 0.5,
  orbitOffset = 0,
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * rotationSpeed;
      meshRef.current.rotation.y += 0.015 * rotationSpeed;
    }

    if (groupRef.current && orbitRadius > 0) {
      const angle = t * orbitSpeed + orbitOffset;
      groupRef.current.position.x = Math.cos(angle) * orbitRadius;
      groupRef.current.position.z = Math.sin(angle) * orbitRadius;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.5 + orbitOffset) * 0.4;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'torus':
        return <torusGeometry args={[0.6, 0.15, 16, 32]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[0.6, 0]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[0.6, 0]} />;
      case 'octahedron':
      default:
        return <octahedronGeometry args={[0.6, 0]} />;
    }
  }, [shape]);

  return (
    <group ref={groupRef} position={orbitRadius > 0 ? [0, position[1], 0] : position}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh ref={meshRef} scale={scale}>
          {geometry}
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.9}
            wireframe
            transparent
            opacity={0.65}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        {/* Inner solid glow nucleus */}
        <mesh scale={scale * 0.5}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.2} />
        </mesh>
      </Float>
    </group>
  );
};

/**
 * HolographicIcons
 * Modular system of orbiting and floating holographic geometry symbols representing the MERN stack.
 */
export const HolographicIcons: React.FC = () => {
  const symbols: HolographicIconProps[] = useMemo(() => [
    { position: [0, 1.5, 0], orbitRadius: 4.5, orbitSpeed: 0.35, orbitOffset: 0, shape: 'octahedron', color: '#00F5FF', scale: 0.7 },
    { position: [0, -1.2, 0], orbitRadius: 5.2, orbitSpeed: 0.25, orbitOffset: Math.PI * 0.5, shape: 'torus', color: '#3B82F6', scale: 0.65 },
    { position: [0, 0.8, 0], orbitRadius: 6.0, orbitSpeed: 0.3, orbitOffset: Math.PI, shape: 'icosahedron', color: '#10B981', scale: 0.75 },
    { position: [0, -0.5, 0], orbitRadius: 4.0, orbitSpeed: 0.4, orbitOffset: Math.PI * 1.5, shape: 'dodecahedron', color: '#A855F7', scale: 0.6 },
  ], []);

  return (
    <group>
      {symbols.map((item, index) => (
        <HolographicSymbol key={index} {...item} />
      ))}
    </group>
  );
};
