"use client";

import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useReducedMotionCheck } from '@/animations/hooks/useReducedMotionCheck';

interface DigitalCityCameraControllerProps {
  scrollProgress?: number;
  isAutoTour?: boolean;
  onTourComplete?: () => void;
  onDestinationChange?: (destinationIndex: number) => void;
}

/**
 * DigitalCityCameraController
 * Smooth CatmullRomCurve3 spline camera controller flying across our 5 Storytelling Destinations:
 * Destination 01 (0.0 -> 0.2): Developer Studio (Z: 15 to -10)
 * Destination 02 (0.2 -> 0.4): AI Laboratory (Z: -45 to -65)
 * Destination 03 (0.4 -> 0.6): Project Vault (Z: -105 to -125)
 * Destination 04 (0.6 -> 0.8): Innovation Center (Z: -165 to -185)
 * Destination 05 (0.8 -> 1.0): Command Hub (Z: -225 to -245)
 */
export const DigitalCityCameraController: React.FC<DigitalCityCameraControllerProps> = ({
  scrollProgress = 0,
  isAutoTour = false,
  onTourComplete,
  onDestinationChange,
}) => {
  const { camera } = useThree();
  const { shouldReduceMotion } = useReducedMotionCheck();

  // Spline curves for camera positions and look-at targets across all 5 destinations
  const { cameraCurve, targetCurve } = useMemo(() => {
    const camPoints = [
      new THREE.Vector3(0, 1.5, 15),    // Dest 1: Developer Studio Approach
      new THREE.Vector3(0, -1, -45),    // Dest 2: AI Laboratory Corridor
      new THREE.Vector3(0, -1, -105),   // Dest 3: Project Vault Exhibition
      new THREE.Vector3(0, 1, -165),    // Dest 4: Innovation Operations Center
      new THREE.Vector3(0, 7, -225),    // Dest 5: Command Hub Skyscraper Deck
    ];

    const lookPoints = [
      new THREE.Vector3(0, -1, -10),    // Dest 1 Target
      new THREE.Vector3(0, -2, -65),    // Dest 2 Target
      new THREE.Vector3(0, -1, -125),   // Dest 3 Target
      new THREE.Vector3(0, 2, -185),    // Dest 4 Target
      new THREE.Vector3(0, 5, -245),    // Dest 5 Target
    ];

    return {
      cameraCurve: new THREE.CatmullRomCurve3(camPoints),
      targetCurve: new THREE.CatmullRomCurve3(lookPoints),
    };
  }, []);

  const currentProgress = useRef(0);
  const autoTourProgress = useRef(0);
  const currentLookAt = useRef(new THREE.Vector3(0, -1, -10));
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastReportedDestination = useRef(1);

  // Track mouse coordinates for subtle parallax tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Reset auto tour progress when starting auto tour
  useEffect(() => {
    if (isAutoTour) {
      autoTourProgress.current = currentProgress.current;
    }
  }, [isAutoTour]);

  useFrame((_, delta) => {
    let targetP = scrollProgress;

    // 1. If Auto Tour is running, increment progress smoothly across 30 seconds
    if (isAutoTour) {
      autoTourProgress.current += delta / 30;
      if (autoTourProgress.current >= 1) {
        autoTourProgress.current = 1;
        if (onTourComplete) onTourComplete();
      }
      targetP = autoTourProgress.current;
    }

    // Clamp between 0 and 1
    targetP = THREE.MathUtils.clamp(targetP, 0, 1);

    // 2. Smooth damping interpolation toward target progress
    const dampingFactor = shouldReduceMotion ? 0.2 : 0.08;
    currentProgress.current = THREE.MathUtils.lerp(
      currentProgress.current,
      targetP,
      dampingFactor
    );

    // 3. Determine active destination number (1 through 5) and report
    const activeDestinationIndex = Math.min(5, Math.max(1, Math.floor(currentProgress.current * 4.99) + 1));
    if (activeDestinationIndex !== lastReportedDestination.current) {
      lastReportedDestination.current = activeDestinationIndex;
      if (onDestinationChange) onDestinationChange(activeDestinationIndex);
    }

    // 4. Sample position and look-at target from our CatmullRom curves
    const sampledPosition = cameraCurve.getPointAt(currentProgress.current);
    const sampledTarget = targetCurve.getPointAt(currentProgress.current);

    // Apply subtle mouse parallax shift unless reduced motion is active
    if (!shouldReduceMotion) {
      const parallaxX = mouseRef.current.x * 0.8;
      const parallaxY = mouseRef.current.y * 0.5;
      sampledPosition.x += parallaxX;
      sampledPosition.y += parallaxY;
    }

    // Smoothly apply position and lookAt vector
    camera.position.lerp(sampledPosition, dampingFactor * 2);
    currentLookAt.current.lerp(sampledTarget, dampingFactor * 2);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
