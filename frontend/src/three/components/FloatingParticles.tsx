import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const FloatingParticles = ({ count = 600, color = "#00F5FF" }) => {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const mouseRef = useRef({ x: 0, y: 0 });
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { mouse } = useThree();

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  /* eslint-disable react-hooks/purity */
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.005 + Math.random() / 500;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor });
    }
    return temp;
  }, [count]);
  /* eslint-enable react-hooks/purity */

  useFrame(() => {
    particles.forEach((particle, i) => {
      const { factor, speed, xFactor, yFactor, zFactor } = particle;
      const t = (particle.t += speed);
      const s = Math.cos(t);
      const mx = (mouseRef.current.x !== 0 ? mouseRef.current.x : mouse.x) * 3;
      const my = (mouseRef.current.y !== 0 ? mouseRef.current.y : mouse.y) * 3;

      dummy.position.set(
        (mx) + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 15,
        (my) + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 15,
        (my) + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 15
      );
      dummy.scale.set(s * 0.5, s * 0.5, s * 0.5);
      dummy.updateMatrix();
      if (mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} />
    </instancedMesh>
  );
};
