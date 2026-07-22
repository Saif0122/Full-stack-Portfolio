"use client";

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface CodeCubeInstance {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  speed: number;
}

/**
 * FloatingCodeCubes
 * Renders glassmorphic wireframe code fragments/cubes floating in the background
 * with procedural rotation and depth layering.
 */
export const FloatingCodeCubes: React.FC<{ count?: number }> = ({ count = 6 }) => {
  const cubes = useMemo<CodeCubeInstance[]>(() => {
    const temp: CodeCubeInstance[] = [
      { position: [-6, 3, -4], rotation: [0.2, 0.5, 0], scale: 0.8, color: '#00F5FF', speed: 1.2 },
      { position: [7, -2, -6], rotation: [0.8, 0.1, 0.4], scale: 1.1, color: '#3B82F6', speed: 0.9 },
      { position: [-5, -3, -5], rotation: [0.4, 0.7, 0.2], scale: 0.6, color: '#10B981', speed: 1.5 },
      { position: [6, 4, -3], rotation: [0.1, 0.9, 0.3], scale: 0.7, color: '#A855F7', speed: 1.1 },
      { position: [3, 5, -8], rotation: [0.5, 0.3, 0.8], scale: 1.3, color: '#00F5FF', speed: 0.8 },
      { position: [-7, 0, -7], rotation: [0.9, 0.2, 0.1], scale: 0.9, color: '#3B82F6', speed: 1.0 },
    ];
    return temp.slice(0, count);
  }, [count]);

  return (
    <group>
      {cubes.map((cube, i) => (
        <SingleCube key={i} {...cube} />
      ))}
    </group>
  );
};

const SingleCube: React.FC<CodeCubeInstance> = ({ position, rotation, scale, color, speed }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.2 * speed;
    meshRef.current.rotation.y += delta * 0.3 * speed;
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* Outer Wireframe Glass Cube */}
        <mesh ref={meshRef}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            wireframe
            transparent
            opacity={0.35}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
        {/* Inner Core Point */}
        <mesh scale={0.2}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
      </group>
    </Float>
  );
};
