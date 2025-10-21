import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import CanvasLoader from "../loader";

// Earth component - using GLB format (single file, most reliable)
const Earth = () => {
  // Load GLB model from public/models folder
  const earth = useGLTF("/models/earth.glb");

  return (
    <primitive 
      object={earth.scene} 
      scale={2.5} 
      position-y={0} 
      rotation-y={0} 
    />
  );
};

// Preload the model for better performance
useGLTF.preload("/models/earth.glb");

// Earth Canvas
const EarthCanvas = () => {
  // Detect if mobile for performance optimization
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <Canvas
      shadows
      frameloop="always"
      dpr={isMobile ? [1, 1] : [1, 2]}
      gl={{
        preserveDrawingBuffer: false,
        antialias: !isMobile,
        powerPreference: isMobile ? 'low-power' : 'high-performance',
        alpha: true,
        failIfMajorPerformanceCaveat: false,
      }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
      style={{ touchAction: 'none' }}
    >
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Suspense show Canvas Loader on fallback */}
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={isMobile ? 2 : 4}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enablePan={false}
        />

        {/* Earth */}
        <Earth />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
