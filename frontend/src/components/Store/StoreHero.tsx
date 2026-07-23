'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// 3D Scene Component
function Scene() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    // Smoothly interpolate mouse position for the light
    const x = (state.pointer.x * state.viewport.width) / 2;
    const y = (state.pointer.y * state.viewport.height) / 2;
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, x, 0.1);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, y, 0.1);
    }
  });

  const material = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    metalness: 0.1,
    roughness: 0.1,
    transmission: 0.9,
    ior: 1.5,
    thickness: 0.5,
    envMapIntensity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  });

  return (
    <>
      {/* Procedural Environment to avoid external HDR fetch errors */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh position={[10, 10, 10]} scale={2}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[-10, -10, -10]} scale={2}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial color="#00F5FF" />
          </mesh>
          <mesh position={[0, 5, -9]} scale={5}>
            <planeGeometry args={[10, 10]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      </Environment>
      <ambientLight intensity={0.5} />
      <pointLight ref={lightRef} intensity={5} color="#00F5FF" distance={10} position={[0, 0, 2]} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2} position={[-4, 1, -2]}>
        <mesh material={material}>
          <icosahedronGeometry args={[1, 0]} />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5} position={[4, -1, -3]}>
        <mesh material={material}>
          <torusGeometry args={[1, 0.3, 16, 32]} />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={1} floatIntensity={2.5} position={[0, -2, -5]}>
        <mesh material={material}>
          <sphereGeometry args={[1.5, 32, 32]} />
        </mesh>
      </Float>
      
      <Sparkles count={100} scale={12} size={2} speed={0.4} opacity={0.2} color="#00F5FF" />
    </>
  );
}

// Magnetic Button Component
function MagneticButton({ children, className, primary = false }: { children: React.ReactNode, className?: string, primary?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className={`relative overflow-hidden group ${className}`}
    >
      <span className="relative z-10">{children}</span>
      {primary && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </motion.button>
  );
}

export default function StoreHero() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-background">
      {/* 3D Background */}
      {mounted && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Scene />
          </Canvas>
        </div>
      )}

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative inline-flex items-center justify-center p-[1px] rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary animate-[spin_4s_linear_infinite]" />
              <div className="absolute inset-[1px] bg-background rounded-full" />
              <span className="relative px-6 py-2 rounded-full text-sm font-medium tracking-wide bg-background/50 backdrop-blur-sm text-foreground flex items-center">
                <span className="text-primary mr-2 text-lg leading-none">✦</span> Premium Developer Tools
              </span>
            </div>
          </motion.div>
          
          <motion.h1
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Elevate your <br className="hidden md:block" />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-blue-400 to-secondary blur-2xl opacity-50" />
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary animate-[textGradient_4s_linear_infinite] bg-[length:200%_auto]">
                Workflow
              </span>
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Enterprise-grade boilerplates, UI kits, and plugins designed to save you hundreds of hours of development time.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton 
              primary 
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold shadow-[0_0_40px_rgba(0,245,255,0.3)] w-full sm:w-auto"
            >
              Explore Products
            </MagneticButton>
            <MagneticButton 
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-foreground font-bold backdrop-blur-md border border-white/10 transition-colors w-full sm:w-auto"
            >
              Read Documentation
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
