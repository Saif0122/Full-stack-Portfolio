"use client";

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MouseParallaxCameraProps {
  basePosition?: [number, number, number];
  intensity?: number;
  scrollIntensity?: number;
  damping?: number;
}

/**
 * MouseParallaxCamera
 * Smoothly interpolates camera coordinates based on mouse position and scroll depth.
 * Respects 'prefers-reduced-motion'.
 */
export const MouseParallaxCamera: React.FC<MouseParallaxCameraProps> = ({
  basePosition = [0, 0, 12],
  intensity = 1.2,
  scrollIntensity = 0.003,
  damping = 0.04,
}) => {
  const prefersReducedMotion = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check reduced motion accessibility setting
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;

    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };

    mediaQuery.addEventListener('change', handleChange);

    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  useFrame((state) => {
    const cam = state.camera;
    if (prefersReducedMotion.current) {
      // Keep static at base position if reduced motion is requested
      cam.position.x = THREE.MathUtils.lerp(cam.position.x, basePosition[0], damping);
      cam.position.y = THREE.MathUtils.lerp(cam.position.y, basePosition[1], damping);
      cam.position.z = THREE.MathUtils.lerp(cam.position.z, basePosition[2], damping);
      cam.lookAt(0, 0, 0);
      return;
    }

    const mouseX = mouseRef.current.x !== 0 ? mouseRef.current.x : state.mouse.x;
    const mouseY = mouseRef.current.y !== 0 ? mouseRef.current.y : state.mouse.y;
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;

    const targetX = basePosition[0] + mouseX * intensity;
    const targetY = basePosition[1] + mouseY * intensity - scrollY * scrollIntensity;
    const targetZ = basePosition[2] - Math.abs(mouseX * 0.3);

    cam.position.x = THREE.MathUtils.lerp(cam.position.x, targetX, damping);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, targetY, damping);
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, targetZ, damping);

    cam.lookAt(0, -scrollY * scrollIntensity * 0.5, 0);
  });


  return null;
};
