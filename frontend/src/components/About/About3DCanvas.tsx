"use client";

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { FloatingParticles, FloatingCodeCubes } from '@/three/components';
import { ViewportPauseController } from '@/three/utils/useViewportPause';

/**
 * About3DCanvas
 * Internal Three.js canvas component for the About page.
 * Renders lightweight ambient particles and code cubes with viewport occlusion pausing.
 */
export const About3DCanvas: React.FC = () => {
  return (
    <Canvas
      shadows={false}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ViewportPauseController />
      <fogExp2 attach="fog" args={['#070B14', 0.025]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[20, 20, 10]} intensity={1.5} color="#00F5FF" />
      <pointLight position={[-20, -10, -20]} intensity={1.2} color="#3B82F6" />

      {/* Lightweight 3D Depth Assets */}
      <FloatingParticles count={250} color="#00F5FF" />
      <FloatingCodeCubes count={4} />
    </Canvas>
  );
};

export default About3DCanvas;
