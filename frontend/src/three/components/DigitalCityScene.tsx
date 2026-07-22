"use client";

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import { useReducedMotionCheck } from '@/animations/hooks/useReducedMotionCheck';

/**
 * DigitalCityScene
 * Modular, instanced, low-poly AAA-grade 3D environment builder representing our 5 scroll destinations along a 260m cybernetic highway:
 * Destination 01 (Z: -10) -> Developer Studio (Where Ideas Become Reality)
 * Destination 02 (Z: -65) -> AI Laboratory (Engineering Intelligence)
 * Destination 03 (Z: -125) -> Project Vault (Ideas Turned Into Products)
 * Destination 04 (Z: -185) -> Innovation Center (Building for Scale)
 * Destination 05 (Z: -245) -> Command Hub (Let's Build the Future Together)
 */
export const DigitalCityScene: React.FC = () => {
  const { shouldReduceMotion } = useReducedMotionCheck();

  // References for instanced and real-time animations
  const buildingsRef = useRef<THREE.InstancedMesh>(null);
  const dronesRef = useRef<THREE.InstancedMesh>(null);
  const coreRef = useRef<THREE.Group>(null);
  const globeRef = useRef<THREE.Group>(null);
  const studioMonitorsRef = useRef<THREE.Group>(null);
  const skillOrbsRef = useRef<THREE.Group>(null);

  // Pure deterministic pseudo-random generator based on index to satisfy strict React 19 purity checks
  const getPseudoRand = (index: number, offset = 0) => {
    const x = Math.sin(index * 12.9898 + offset * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };

  // 1. Instanced City Buildings Setup (150 buildings along the Z corridor from Z=30 to Z=-280)
  const { buildingMatrices, buildingColors } = useMemo(() => {
    const count = 150;
    const matrices = new Array<THREE.Matrix4>(count);
    const colors = new Float32Array(count * 3);
    const dummy = new THREE.Object3D();
    const colorObj = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Spread buildings on left and right sides of our central highway (X: -40 to -8, and 8 to 40)
      const side = i % 2 === 0 ? -1 : 1;
      const x = side * (10 + getPseudoRand(i, 1) * 30);
      const z = 25 - (i / count) * 300 + (getPseudoRand(i, 2) - 0.5) * 15;
      const height = 8 + getPseudoRand(i, 3) * 35;
      const y = -10 + height / 2;
      const width = 3 + getPseudoRand(i, 4) * 4.5;
      const depth = 3 + getPseudoRand(i, 5) * 4.5;

      dummy.position.set(x, y, z);
      dummy.scale.set(width, height, depth);
      dummy.updateMatrix();
      matrices[i] = dummy.matrix.clone();

      // Cyberpunk palette: dark slate with occasional cyan (#00F5FF) and blue (#3B82F6) neon tints
      const colorChance = getPseudoRand(i, 6);
      const colorTint = getPseudoRand(i, 7);
      if (colorChance > 0.85) {
        colorObj.set('#00F5FF').multiplyScalar(0.85);
      } else if (colorTint > 0.85) {
        colorObj.set('#3B82F6').multiplyScalar(0.85);
      } else {
        colorObj.set('#0D1322').multiplyScalar(0.5 + getPseudoRand(i, 8) * 0.4);
      }
      colors[i * 3] = colorObj.r;
      colors[i * 3 + 1] = colorObj.g;
      colors[i * 3 + 2] = colorObj.b;
    }
    return { buildingMatrices: matrices, buildingColors: colors };
  }, []);

  // 2. Instanced Traffic Hover Drones (60 units along highway lanes)
  const { droneMatrices, droneSpeeds } = useMemo(() => {
    const count = 60;
    const matrices = new Array<THREE.Matrix4>(count);
    const speeds = new Float32Array(count);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const lane = (i % 4) - 1.5; // -1.5, -0.5, 0.5, 1.5
      const x = lane * 3.5;
      const y = -6 + (i % 3) * 2.5; // layered altitudes
      const z = 15 - getPseudoRand(i, 10) * 270;

      dummy.position.set(x, y, z);
      dummy.scale.set(0.6, 0.2, 1.6);
      dummy.updateMatrix();
      matrices[i] = dummy.matrix.clone();
      speeds[i] = 16 + getPseudoRand(i, 11) * 26; // units per second
    }
    return { droneMatrices: matrices, droneSpeeds: speeds };
  }, []);

  // Apply matrices and colors once on mount
  React.useEffect(() => {
    if (buildingsRef.current) {
      buildingMatrices.forEach((mat, i) => {
        buildingsRef.current?.setMatrixAt(i, mat);
      });
      buildingsRef.current.instanceMatrix.needsUpdate = true;
      buildingsRef.current.geometry.setAttribute(
        'color',
        new THREE.InstancedBufferAttribute(buildingColors, 3)
      );
    }
    if (dronesRef.current) {
      droneMatrices.forEach((mat, i) => {
        dronesRef.current?.setMatrixAt(i, mat);
      });
      dronesRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [buildingMatrices, buildingColors, droneMatrices]);

  // Real-time animations for drones and scene components
  useFrame((state, delta) => {
    if (shouldReduceMotion) return;

    const time = state.clock.getElapsedTime();

    // Animate traffic drones moving along highway
    if (dronesRef.current) {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < droneMatrices.length; i++) {
        dummy.matrix.copy(droneMatrices[i]);
        dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);

        const direction = i % 2 === 0 ? -1 : 1;
        dummy.position.z += direction * droneSpeeds[i] * delta;

        // Wrap around corridor bounds [-275, 20]
        if (dummy.position.z < -275) dummy.position.z = 20;
        if (dummy.position.z > 20) dummy.position.z = -275;

        dummy.updateMatrix();
        dronesRef.current.setMatrixAt(i, dummy.matrix);
        droneMatrices[i].copy(dummy.matrix);
      }
      dronesRef.current.instanceMatrix.needsUpdate = true;
    }

    // Destination 1 Studio monitors floating pulse
    if (studioMonitorsRef.current) {
      studioMonitorsRef.current.position.y = -2 + Math.sin(time * 1.5) * 0.2;
      studioMonitorsRef.current.rotation.y = Math.sin(time * 0.5) * 0.05;
    }

    // Destination 2 AI Core rotation
    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.45;
      coreRef.current.rotation.y = time * 0.65;
    }

    // Destination 2 Orbiting Tech Nodes
    if (skillOrbsRef.current) {
      skillOrbsRef.current.rotation.y = time * 0.35;
    }

    // Destination 4 Holographic Globe rotation
    if (globeRef.current) {
      globeRef.current.rotation.y = time * 0.28;
    }
  });

  const aiTelemetryNodes = ['Neural Networks', 'AI Automation', 'Deep Learning', 'LLM Agents', 'Vector Search', 'Microservices'];

  return (
    <group>
      {/* =========================================================================
          GLOBAL CITY INFRASTRUCTURE & HIGHWAY
          ========================================================================= */}
      {/* 150 Instanced Skyscrapers */}
      <instancedMesh
        ref={buildingsRef}
        args={[undefined, undefined, 150]}
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]}>
          <instancedBufferAttribute attach="attributes-color" args={[buildingColors, 3]} />
        </boxGeometry>
        <meshStandardMaterial vertexColors roughness={0.2} metalness={0.8} />
      </instancedMesh>

      {/* 60 Instanced Traffic Drones */}
      <instancedMesh ref={dronesRef} args={[undefined, undefined, 60]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#00F5FF" toneMapped={false} />
      </instancedMesh>

      {/* Highway Grid Road Base */}
      <mesh position={[0, -9.8, -130]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 330]} />
        <meshStandardMaterial color="#050811" roughness={0.9} metalness={0.1} />
      </mesh>
      {/* Glowing Highway Laser Side Rails */}
      <mesh position={[-7.5, -9.6, -130]}>
        <boxGeometry args={[0.2, 0.2, 330]} />
        <meshBasicMaterial color="#00F5FF" toneMapped={false} />
      </mesh>
      <mesh position={[7.5, -9.6, -130]}>
        <boxGeometry args={[0.2, 0.2, 330]} />
        <meshBasicMaterial color="#3B82F6" toneMapped={false} />
      </mesh>


      {/* =========================================================================
          DESTINATION 01 — DEVELOPER STUDIO (Where Ideas Become Reality / Z: -10)
          ========================================================================= */}
      <group position={[0, -1, -10]}>
        {/* Studio Glass Workspace Frame */}
        <mesh position={[0, 3, 0]}>
          <boxGeometry args={[18, 12, 14]} />
          <meshPhysicalMaterial
            color="#0A0F1D"
            transparent
            opacity={0.18}
            roughness={0.1}
            metalness={0.9}
            wireframe
          />
        </mesh>

        {/* Desk Platform */}
        <mesh position={[0, -2.5, 0]}>
          <boxGeometry args={[12, 0.4, 6]} />
          <meshStandardMaterial color="#111827" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Multi-Monitor Rig */}
        <group ref={studioMonitorsRef} position={[0, -0.5, -1.8]}>
          {/* Center Ultra-Wide Monitor */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[5.2, 2.8, 0.2]} />
            <meshBasicMaterial color="#00F5FF" toneMapped={false} />
          </mesh>
          <mesh position={[0, 0, 0.11]}>
            <planeGeometry args={[5.0, 2.6]} />
            <meshBasicMaterial color="#050B14" />
          </mesh>
          <Text
            position={[0, 0.45, 0.15]}
            fontSize={0.28}
            color="#00F5FF"
            anchorX="center"
            anchorY="middle"
          >
            const engineer = new FullStackDeveloper();
          </Text>
          <Text
            position={[0, -0.35, 0.15]}
            fontSize={0.22}
            color="#3B82F6"
            anchorX="center"
            anchorY="middle"
          >
            engineer.build({'{'} quality: &apos;Awwwards&apos;, mern: true {'}'});
          </Text>

          {/* Left Angle Monitor */}
          <mesh position={[-3.8, 0, 0.6]} rotation={[0, 0.4, 0]}>
            <boxGeometry args={[2.6, 2.6, 0.2]} />
            <meshBasicMaterial color="#3B82F6" toneMapped={false} />
          </mesh>

          {/* Right Angle Monitor */}
          <mesh position={[3.8, 0, 0.6]} rotation={[0, -0.4, 0]}>
            <boxGeometry args={[2.6, 2.6, 0.2]} />
            <meshBasicMaterial color="#10B981" toneMapped={false} />
          </mesh>
        </group>

        {/* RGB Keyboard on Desk */}
        <mesh position={[0, -2.2, 0.8]}>
          <boxGeometry args={[3.2, 0.15, 1.2]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        <mesh position={[0, -2.1, 0.8]}>
          <boxGeometry args={[3.0, 0.05, 1.0]} />
          <meshBasicMaterial color="#00F5FF" toneMapped={false} />
        </mesh>

        {/* Laptop to the right on Desk */}
        <group position={[3.8, -2.2, 0.6]} rotation={[0, -0.2, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.0, 0.08, 1.4]} />
            <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.6, -0.65]} rotation={[-0.4, 0, 0]}>
            <boxGeometry args={[2.0, 1.2, 0.06]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.6, -0.62]} rotation={[-0.4, 0, 0]}>
            <planeGeometry args={[1.85, 1.05]} />
            <meshBasicMaterial color="#3B82F6" toneMapped={false} />
          </mesh>
        </group>

        {/* Cyber Coffee Mug to the left on Desk */}
        <group position={[-3.5, -2.0, 0.6]}>
          <mesh>
            <cylinderGeometry args={[0.35, 0.35, 0.7, 16]} />
            <meshStandardMaterial color="#0D1322" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.36, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.02, 16]} />
            <meshBasicMaterial color="#00F5FF" toneMapped={false} />
          </mesh>
        </group>

        {/* Floating 3D Technology Badges around the Studio */}
        {[-6, 6].map((xOffset, idx) => {
          const badgeNames = idx === 0 ? ['React 19', 'Next.js 15', 'TypeScript'] : ['Node.js', 'MongoDB', 'GraphQL / AI'];
          const badgeColors = idx === 0 ? ['#00F5FF', '#3B82F6', '#60A5FA'] : ['#10B981', '#A855F7', '#00F5FF'];
          return (
            <group key={idx} position={[xOffset, 1, 1.5]}>
              {badgeNames.map((badge, bIndex) => (
                <Float key={badge} speed={2 + bIndex * 0.5} rotationIntensity={0.2} floatIntensity={0.6}>
                  <group position={[0, (bIndex - 1) * 1.8, 0]}>
                    <mesh>
                      <boxGeometry args={[2.8, 1.0, 0.15]} />
                      <meshPhysicalMaterial
                        color={badgeColors[bIndex]}
                        transparent
                        opacity={0.22}
                        roughness={0.1}
                        wireframe
                      />
                    </mesh>
                    <Text
                      position={[0, 0, 0.1]}
                      fontSize={0.28}
                      color={badgeColors[bIndex]}
                      anchorX="center"
                      anchorY="middle"
                    >
                      {badge}
                    </Text>
                  </group>
                </Float>
              ))}
            </group>
          );
        })}

        {/* Studio Identifier Sign */}
        <Text
          position={[0, 6.5, 0]}
          fontSize={0.8}
          color="#00F5FF"
          anchorX="center"
          anchorY="middle"
        >
          DESTINATION 01: DEVELOPER STUDIO
        </Text>
      </group>


      {/* =========================================================================
          DESTINATION 02 — AI LABORATORY (Engineering Intelligence / Z: -65)
          ========================================================================= */}
      <group position={[0, -2, -65]}>
        {/* Central Quantum Energy Core */}
        <group ref={coreRef} position={[0, 3, 0]}>
          <mesh>
            <torusKnotGeometry args={[2.4, 0.5, 96, 16]} />
            <meshBasicMaterial color="#00F5FF" wireframe transparent opacity={0.65} />
          </mesh>
          <mesh>
            <sphereGeometry args={[1.3, 32, 32]} />
            <meshBasicMaterial color="#3B82F6" toneMapped={false} />
          </mesh>
        </group>

        {/* Rotating Orbiting AI Badges */}
        <group ref={skillOrbsRef} position={[0, 3, 0]}>
          {aiTelemetryNodes.map((node, index) => {
            const angle = (index / aiTelemetryNodes.length) * Math.PI * 2;
            const radius = 6.8;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            return (
              <group key={node} position={[x, 0, z]} rotation={[0, -angle + Math.PI / 2, 0]}>
                <mesh>
                  <boxGeometry args={[3.0, 1.3, 0.15]} />
                  <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.2} />
                </mesh>
                <mesh position={[0, 0, 0.08]}>
                  <planeGeometry args={[2.9, 1.2]} />
                  <meshBasicMaterial color="#00F5FF" wireframe opacity={0.4} transparent />
                </mesh>
                <Text
                  position={[0, 0, 0.12]}
                  fontSize={0.34}
                  color="#FFFFFF"
                  anchorX="center"
                  anchorY="middle"
                >
                  {node}
                </Text>
              </group>
            );
          })}
        </group>

        {/* Server Rack Columns */}
        {[-9, 9].map((xSide, i) => (
          <mesh key={i} position={[xSide, 2, 0]}>
            <boxGeometry args={[2.5, 14, 3]} />
            <meshStandardMaterial color="#090E17" roughness={0.4} metalness={0.8} />
          </mesh>
        ))}

        <Text
          position={[0, 9.5, 0]}
          fontSize={0.8}
          color="#3B82F6"
          anchorX="center"
          anchorY="middle"
        >
          DESTINATION 02: AI LABORATORY
        </Text>
      </group>


      {/* =========================================================================
          DESTINATION 03 — PROJECT VAULT (Ideas Turned Into Products / Z: -125)
          ========================================================================= */}
      <group position={[0, -1, -125]}>
        {/* Exhibition Pedestals & Hologram Showcases */}
        {[-8, 0, 8].map((xOffset, index) => {
          const titles = ['AI DASHBOARD PRO', 'SAAS E-COMMERCE', 'NEURAL BANKING'];
          const colors = ['#00F5FF', '#A855F7', '#3B82F6'];
          return (
            <group key={index} position={[xOffset, 0, 0]}>
              {/* Glowing Floor Pedestal */}
              <mesh position={[0, -4, 0]}>
                <cylinderGeometry args={[2.6, 3.3, 1, 32]} />
                <meshStandardMaterial color="#0B132B" roughness={0.3} metalness={0.9} />
              </mesh>
              <mesh position={[0, -3.45, 0]}>
                <cylinderGeometry args={[2.4, 2.4, 0.1, 32]} />
                <meshBasicMaterial color={colors[index]} toneMapped={false} />
              </mesh>

              {/* Floating Hologram Display Platform */}
              <Float speed={2.2} rotationIntensity={0.25} floatIntensity={0.8}>
                <group position={[0, 0.6, 0]}>
                  <mesh>
                    <boxGeometry args={[4.4, 3.4, 0.2]} />
                    <meshPhysicalMaterial
                      color={colors[index]}
                      transparent
                      opacity={0.28}
                      roughness={0.1}
                      wireframe
                    />
                  </mesh>
                  <Text
                    position={[0, 0.7, 0.15]}
                    fontSize={0.38}
                    color={colors[index]}
                    anchorX="center"
                    anchorY="middle"
                  >
                    {titles[index]}
                  </Text>
                  <Text
                    position={[0, -0.3, 0.15]}
                    fontSize={0.22}
                    color="#D1D5DB"
                    anchorX="center"
                    anchorY="middle"
                  >
                    Live 3D Holographic Mockup
                  </Text>
                </group>
              </Float>
            </group>
          );
        })}

        <Text
          position={[0, 7.5, 0]}
          fontSize={0.8}
          color="#00F5FF"
          anchorX="center"
          anchorY="middle"
        >
          DESTINATION 03: PROJECT VAULT
        </Text>
      </group>


      {/* =========================================================================
          DESTINATION 04 — INNOVATION CENTER (Building for Scale / Z: -185)
          ========================================================================= */}
      <group position={[0, 1, -185]}>
        {/* Massive Spinning Holographic Globe */}
        <group ref={globeRef} position={[0, 3, 0]}>
          <mesh>
            <sphereGeometry args={[5.2, 24, 24]} />
            <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.38} />
          </mesh>
          <mesh>
            <sphereGeometry args={[5.0, 32, 32]} />
            <meshPhysicalMaterial color="#050C1A" roughness={0.1} metalness={0.9} transparent opacity={0.82} />
          </mesh>
        </group>

        {/* Orbiting Satellite Telemetry Rings */}
        <mesh position={[0, 3, 0]} rotation={[0.4, 0.2, 0]}>
          <torusGeometry args={[7.2, 0.08, 16, 100]} />
          <meshBasicMaterial color="#00F5FF" toneMapped={false} />
        </mesh>
        <mesh position={[0, 3, 0]} rotation={[-0.3, 0.5, 0]}>
          <torusGeometry args={[8.8, 0.06, 16, 100]} />
          <meshBasicMaterial color="#10B981" toneMapped={false} />
        </mesh>

        {/* Vertical Energy Laser Columns */}
        {[-7.5, 7.5].map((xBeam, i) => (
          <mesh key={i} position={[xBeam, 2, -3]}>
            <cylinderGeometry args={[0.35, 0.35, 22, 16]} />
            <meshBasicMaterial color="#00F5FF" transparent opacity={0.45} toneMapped={false} />
          </mesh>
        ))}

        <Text
          position={[0, 11.8, 0]}
          fontSize={0.8}
          color="#3B82F6"
          anchorX="center"
          anchorY="middle"
        >
          DESTINATION 04: INNOVATION CENTER
        </Text>
      </group>


      {/* =========================================================================
          DESTINATION 05 — COMMAND HUB (Let's Build the Future Together / Z: -245)
          ========================================================================= */}
      <group position={[0, 5, -245]}>
        {/* Skyscraper Top Floor Observation Deck */}
        <mesh position={[0, -4.5, 0]}>
          <cylinderGeometry args={[16.5, 16.5, 1, 32]} />
          <meshStandardMaterial color="#0A0F1D" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[0, -3.9, 0]}>
          <ringGeometry args={[12.2, 16.2, 32]} />
          <meshBasicMaterial color="#00F5FF" wireframe transparent opacity={0.35} />
        </mesh>

        {/* Executive Command Hologram Desk */}
        <mesh position={[0, -2, 0]}>
          <cylinderGeometry args={[4.2, 3.6, 1.2, 32]} />
          <meshStandardMaterial color="#111827" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, -1.35, 0]}>
          <cylinderGeometry args={[4.0, 4.0, 0.1, 32]} />
          <meshBasicMaterial color="#00F5FF" toneMapped={false} />
        </mesh>

        {/* Floating Transmission Sign */}
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
          <group position={[0, 2.8, 0]}>
            <Text
              position={[0, 0.9, 0]}
              fontSize={0.85}
              color="#00F5FF"
              anchorX="center"
              anchorY="middle"
            >
              DESTINATION 05: COMMAND HUB
            </Text>
            <Text
              position={[0, 0, 0]}
              fontSize={0.48}
              color="#FFFFFF"
              anchorX="center"
              anchorY="middle"
            >
              LET&apos;S BUILD THE FUTURE TOGETHER
            </Text>
          </group>
        </Float>
      </group>
    </group>
  );
};
