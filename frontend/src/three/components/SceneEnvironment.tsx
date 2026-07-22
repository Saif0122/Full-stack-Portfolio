import React from 'react';
import { PerspectiveCamera, Stars, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';

export const SceneEnvironment: React.FC = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={2} color="var(--primary, #00F5FF)" />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={3} color="#FFFFFF" />
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  );
};
