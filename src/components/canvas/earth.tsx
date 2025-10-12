import { OrbitControls, Sphere, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import CanvasLoader from "../loader";

// Simple Earth using Sphere with texture - guaranteed to work!
const Earth = () => {
  // Use a simple color/gradient for now - no external dependencies
  return (
    <Sphere args={[2.5, 64, 64]}>
      <meshStandardMaterial
        color="#2233aa"
        roughness={0.7}
        metalness={0.3}
        emissive="#001133"
        emissiveIntensity={0.2}
      />
      {/* Optional: Add subtle animation */}
      <meshStandardMaterial
        attach="material"
        color="#4a7dc9"
        roughness={0.5}
        metalness={0.5}
      />
    </Sphere>
  );
};

// Earth Canvas
const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
    >
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      {/* Suspense show Canvas Loader on fallback */}
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        {/* Earth */}
        <Earth />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
