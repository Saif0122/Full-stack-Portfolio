import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const AbstractCore = ({ color = "#00F5FF" }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { mouse } = useThree();

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const mx = mouseRef.current.x !== 0 ? mouseRef.current.x : mouse.x;
    const my = mouseRef.current.y !== 0 ? mouseRef.current.y : mouse.y;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, t * 0.1 + my * 0.6, 0.08);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, t * 0.15 + mx * 0.6, 0.08);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[2, 0, -2]}>
        <torusKnotGeometry args={[2.5, 0.7, 256, 64]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.4}
          speed={2}
          distort={0.3}
        />
      </mesh>
    </Float>
  );
};
