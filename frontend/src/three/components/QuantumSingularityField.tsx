"use client";

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NUM_CURVES = 16;
const PACKETS_PER_CURVE = 6;
const TOTAL_PACKETS = NUM_CURVES * PACKETS_PER_CURVE;

interface CurveData {
  basePoints: THREE.Vector3[];
  dynamicPoints: THREE.Vector3[];
  curve: THREE.CatmullRomCurve3;
  geometry: THREE.BufferGeometry;
  lineObject: THREE.Line;
  color: string;
  speedMultiplier: number;
}

interface PacketData {
  curveIdx: number;
  u: number;
  speed: number;
  scale: number;
}

/**
 * QuantumSingularityField
 * An unprecedented N-Body Relativistic Gravitational Lensing Field & Neural Data Lattice.
 * Fiber-optic data threads bend and warp around the user's cursor and central core in real time,
 * while light-speed data pulses shoot along the Riemannian curves.
 */
export const QuantumSingularityField: React.FC = () => {
  const prefersReducedMotion = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const packetsMeshRef = useRef<THREE.InstancedMesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);

  /* eslint-disable react-hooks/purity */
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const cursorPos = useMemo(() => new THREE.Vector3(0, 0, -2), []);
  const corePos = useMemo(() => new THREE.Vector3(2, 0, -2), []);

  // Generate the 16 relativistic neural fiber curves
  const curvesData = useMemo<CurveData[]>(() => {
    const list: CurveData[] = [];
    for (let i = 0; i < NUM_CURVES; i++) {
      const yOffset = -4.5 + (i / (NUM_CURVES - 1)) * 9;
      const zOffset = -4 - Math.abs(yOffset) * 0.5;
      const wavePhase = i * 0.5;

      const basePoints = [
        new THREE.Vector3(-12, yOffset - Math.sin(wavePhase) * 1.5, zOffset - 2),
        new THREE.Vector3(-6, yOffset + Math.cos(wavePhase) * 1.0, zOffset),
        new THREE.Vector3(0, yOffset - Math.sin(wavePhase * 1.2) * 0.8, zOffset + 1),
        new THREE.Vector3(6, yOffset + Math.cos(wavePhase * 1.5) * 1.2, zOffset),
        new THREE.Vector3(12, yOffset - Math.sin(wavePhase) * 1.5, zOffset - 2),
      ];

      const dynamicPoints = basePoints.map((p) => p.clone());
      const curve = new THREE.CatmullRomCurve3(dynamicPoints);
      const points = curve.getPoints(40);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const isCyan = i % 2 === 0;
      const color = isCyan ? '#00F5FF' : '#3B82F6';
      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: i % 3 === 0 ? 0.35 : 0.18,
      });
      const lineObject = new THREE.Line(geometry, material);

      list.push({
        basePoints,
        dynamicPoints,
        curve,
        geometry,
        lineObject,
        color,
        speedMultiplier: 0.8 + Math.random() * 0.6,
      });
    }
    return list;
  }, []);

  // Generate the light-speed data packet instances
  const packetsData = useMemo<PacketData[]>(() => {
    const list: PacketData[] = [];
    for (let c = 0; c < NUM_CURVES; c++) {
      for (let p = 0; p < PACKETS_PER_CURVE; p++) {
        list.push({
          curveIdx: c,
          u: (p / PACKETS_PER_CURVE) + (Math.random() * 0.1),
          speed: 0.15 + Math.random() * 0.2,
          scale: 0.05 + Math.random() * 0.04,
        });
      }
    }
    return list;
  }, []);
  /* eslint-enable react-hooks/purity */

  useEffect(() => {
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

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const reduced = prefersReducedMotion.current;

    // 1. Update Gravitational Attractor Nodes from window tracker or fiber state
    const mouseX = mouseRef.current.x !== 0 ? mouseRef.current.x : state.pointer.x;
    const mouseY = mouseRef.current.y !== 0 ? mouseRef.current.y : state.pointer.y;
    const targetX = mouseX * 8.5;
    const targetY = mouseY * 5.0;
    cursorPos.set(
      THREE.MathUtils.lerp(cursorPos.x, targetX, 0.12),
      THREE.MathUtils.lerp(cursorPos.y, targetY, 0.12),
      -1.5
    );

    // 2. Animate Gravitational Lensing Rings around Core/Cursor
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.3 + mouseY * 0.6;
      ring1Ref.current.rotation.y = t * 0.4 + mouseX * 0.6;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.25 - mouseY * 0.5;
      ring2Ref.current.rotation.z = t * 0.35 + mouseX * 0.5;
    }

    // 3. N-Body Relativistic Curve Warping
    curvesData.forEach((item, idx) => {
      item.basePoints.forEach((baseP, pIdx) => {
        if (reduced) {
          item.dynamicPoints[pIdx].copy(baseP);
          return;
        }

        // Calculate gravitational pull from Cursor Attractor (boosted for dramatic space-time bending)
        const distToCursor = baseP.distanceTo(cursorPos);
        const cursorPull = Math.max(0, (5.5 - distToCursor) / 5.5);
        const warpCursor = cursorPos.clone().sub(baseP).normalize().multiplyScalar(cursorPull * 3.5);

        // Calculate gravitational pull from Singularity Core Attractor
        const distToCore = baseP.distanceTo(corePos);
        const corePull = Math.max(0, (5.0 - distToCore) / 5.0);
        const warpCore = corePos.clone().sub(baseP).normalize().multiplyScalar(corePull * 1.5);

        // Ambient relativistic ripple wave
        const rippleX = Math.sin(t * 1.5 * item.speedMultiplier + pIdx + idx) * 0.15;
        const rippleY = Math.cos(t * 1.2 * item.speedMultiplier + pIdx + idx) * 0.15;

        const targetP = baseP.clone().add(warpCursor).add(warpCore).add(new THREE.Vector3(rippleX, rippleY, 0));
        item.dynamicPoints[pIdx].lerp(targetP, 0.08);
      });

      // Update geometry vertices for each line
      const updatedPoints = item.curve.getPoints(40);
      item.geometry.setFromPoints(updatedPoints);
    });

    // 4. Update Light-Speed Data Packets moving along curved trajectories
    if (packetsMeshRef.current) {
      packetsData.forEach((packet, idx) => {
        const curveItem = curvesData[packet.curveIdx];
        const step = reduced ? delta * 0.05 : delta * packet.speed * curveItem.speedMultiplier;
        packet.u += step;
        if (packet.u > 1.0) packet.u -= 1.0;

        const pointOnCurve = curveItem.curve.getPointAt(packet.u);
        const tangent = curveItem.curve.getTangentAt(packet.u);

        // Check distance to cursor for high-voltage energy overdrive burst
        const distToCursor = pointOnCurve.distanceTo(cursorPos);
        const isBoosted = !reduced && distToCursor < 2.5;
        const currentScale = isBoosted ? packet.scale * 2.5 : packet.scale;

        dummy.position.copy(pointOnCurve);
        dummy.scale.set(currentScale, currentScale * (isBoosted ? 2.2 : 1.2), currentScale);
        
        // Align packet orientation with curve tangent
        const lookTarget = pointOnCurve.clone().add(tangent);
        dummy.lookAt(lookTarget);
        dummy.updateMatrix();

        packetsMeshRef.current.setMatrixAt(idx, dummy.matrix);
      });
      packetsMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Relativistic Gravitational Lensing Rings around Core [2, 0, -2] */}
      <group position={[2, 0, -2]}>
        <mesh ref={ring1Ref}>
          <torusGeometry args={[3.2, 0.012, 16, 128]} />
          <meshBasicMaterial color="#00F5FF" transparent opacity={0.35} />
        </mesh>
        <mesh ref={ring2Ref}>
          <torusGeometry args={[4.5, 0.008, 16, 128]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.25} />
        </mesh>
      </group>

      {/* 16 Relativistic Neural Fiber Curves via THREE.Line primitives */}
      {curvesData.map((item, idx) => (
        <primitive key={idx} object={item.lineObject} />
      ))}

      {/* Light-Speed Data Packets Shooting Along Riemannian Curves */}
      <instancedMesh
        ref={packetsMeshRef}
        args={[undefined, undefined, TOTAL_PACKETS]}
      >
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#00F5FF"
          emissive="#00F5FF"
          emissiveIntensity={1.2}
          transparent
          opacity={0.85}
          roughness={0.1}
          clearcoat={1}
        />
      </instancedMesh>
    </group>
  );
};

