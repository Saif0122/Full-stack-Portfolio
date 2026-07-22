"use client";

import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

/**
 * ViewportPauseController
 * Automatically pauses the Three.js render loop when the <Canvas> is scrolled off-screen
 * or when the browser tab is inactive/hidden.
 * 
 * Why: Keeps Lighthouse scores above 95+ and preserves user GPU/battery resources.
 */
export const ViewportPauseController: React.FC = () => {
  const { gl, setFrameloop } = useThree();

  useEffect(() => {
    const canvasElement = gl.domElement;
    if (!canvasElement) return;

    let isVisibleInViewport = true;
    let isDocumentVisible = !document.hidden;

    const updateFrameloop = () => {
      if (isVisibleInViewport && isDocumentVisible) {
        setFrameloop('always');
      } else {
        setFrameloop('never');
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry) {
          isVisibleInViewport = entry.isIntersecting;
          updateFrameloop();
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(canvasElement);

    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      updateFrameloop();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      setFrameloop('always'); // ensure clean restoration on unmount
    };
  }, [gl, setFrameloop]);

  return null;
};

/**
 * Hook variant if used inside a custom R3F component
 */
export function useViewportPause() {
  const { gl, setFrameloop } = useThree();

  useEffect(() => {
    const canvasElement = gl.domElement;
    if (!canvasElement) return;

    let isVisibleInViewport = true;
    let isDocumentVisible = !document.hidden;

    const updateFrameloop = () => {
      if (isVisibleInViewport && isDocumentVisible) {
        setFrameloop('always');
      } else {
        setFrameloop('never');
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry) {
          isVisibleInViewport = entry.isIntersecting;
          updateFrameloop();
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(canvasElement);

    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      updateFrameloop();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      setFrameloop('always');
    };
  }, [gl, setFrameloop]);
}
