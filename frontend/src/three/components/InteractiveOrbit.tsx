"use client";

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface InteractiveOrbitProps {
  radius?: number;
  colorPrimary?: string;
  colorSecondary?: string;
}

/**
 * InteractiveOrbit
 * Renders multi-ring energy bands that slowly gyrate and tilt around the abstract central core.
 */
export const InteractiveOrbit: React.FC<InteractiveOrbitProps> = ({
  radius = 3.6,
  colorPrimary = '#00F5FF',
  colorSecondary = '#3B82F6',
}) => {
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((state, delta) => {
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.15;
      ring1Ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 + 1.2 + my * 0.4;
      ring1Ref.current.rotation.y = mx * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.2;
      ring2Ref.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.4) * 0.3 + 0.5 + mx * 0.5;
      ring2Ref.current.rotation.x = -my * 0.3;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.1;
      ring3Ref.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.25 - 0.8 + my * 0.3;
      ring3Ref.current.rotation.y = -mx * 0.3;
    }
  });

  return (
    <group position={[2, 0, -2]}>
      {/* Primary Energy Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[radius, 0.015, 16, 128]} />
        <meshBasicMaterial color={colorPrimary} transparent opacity={0.45} wireframe={false} />
      </mesh>

      {/* Secondary Tilted Ring */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[radius * 1.15, 0.012, 16, 128]} />
        <meshBasicMaterial color={colorSecondary} transparent opacity={0.35} />
      </mesh>

      {/* Outer Dashed Orbit Ring */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[radius * 1.35, 0.008, 8, 64]} />
        <meshBasicMaterial color={colorPrimary} transparent opacity={0.2} wireframe />
      </mesh>
    </group>
  );
};
