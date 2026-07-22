"use client";

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { DigitalCityScene } from './components/DigitalCityScene';
import { DigitalCityCameraController } from './controls/DigitalCityCameraController';
import { ViewportPauseController } from './utils/useViewportPause';

interface DigitalCityCanvasProps {
  scrollProgress?: number;
  isAutoTour?: boolean;
  onTourComplete?: () => void;
  onDestinationChange?: (destinationIndex: number) => void;
}

/**
 * DigitalCityCanvas
 * Master Three.js canvas wrapper inside our pinned ScrollToExploreExperience container (`absolute inset-0 z-0 h-full w-full pointer-events-none`).
 * Renders our 5-destination city scene, CatmullRom spline camera, atmospheric fog, and dynamic viewport occlusion pausing.
 */
export const DigitalCityCanvas: React.FC<DigitalCityCanvasProps> = ({
  scrollProgress = 0,
  isAutoTour = false,
  onTourComplete,
  onDestinationChange,
}) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full w-full">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ViewportPauseController />
        <fogExp2 attach="fog" args={['#070B14', 0.009]} />

        {/* Global City & Corridor Lighting Rig */}
        <ambientLight intensity={0.85} />
        <pointLight position={[30, 25, 20]} intensity={2.2} color="#00F5FF" />
        <pointLight position={[-30, -15, -60]} intensity={1.8} color="#3B82F6" />
        <directionalLight position={[0, 50, 10]} intensity={1.5} color="#FFFFFF" />
        <directionalLight position={[0, 40, -150]} intensity={1.2} color="#00F5FF" />

        <DigitalCityCameraController
          scrollProgress={scrollProgress}
          isAutoTour={isAutoTour}
          onTourComplete={onTourComplete}
          onDestinationChange={onDestinationChange}
        />

        <DigitalCityScene />
      </Canvas>
    </div>
  );
};
