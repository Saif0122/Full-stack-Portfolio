"use client";

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  SceneEnvironment, 
  FloatingParticles, 
  AbstractCore, 
  HolographicIcons, 
  FloatingCodeCubes, 
  InteractiveOrbit,
  QuantumSingularityField
} from './components';
import { MouseParallaxCamera } from './controls/MouseParallaxCamera';
import { ViewportPauseController } from './utils/useViewportPause';

/**
 * HeroScene
 * Main 3D Canvas wrapper combining modular 3D systems, interactive lighting rigs,
 * camera parallax, orbiting rings, and off-screen viewport pausing for high-performance 95+ Lighthouse score.
 */
export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        performance={{ min: 0.5 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
        eventPrefix="client"
      >
        <ViewportPauseController />
        <fogExp2 attach="fog" args={["#070B14", 0.035]} />
        <MouseParallaxCamera basePosition={[0, 0, 12]} intensity={1.5} damping={0.04} />
        
        <SceneEnvironment />
        
        <FloatingParticles count={400} color="var(--primary, #00F5FF)" />
        <FloatingCodeCubes count={5} />
        <HolographicIcons />
        <InteractiveOrbit radius={3.6} colorPrimary="#00F5FF" colorSecondary="#3B82F6" />
        <QuantumSingularityField />
        <AbstractCore color="var(--primary, #00F5FF)" />
      </Canvas>
    </div>
  );
};


