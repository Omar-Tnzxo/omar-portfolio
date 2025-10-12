import { OrbitControls, useGLTF, Sphere } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import CanvasLoader from "../loader";

// Simple fallback Earth sphere
const FallbackEarth = () => {
  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Sphere args={[2.5, 32, 32]}>
        <meshStandardMaterial
          color="#4a90e2"
          roughness={0.5}
          metalness={0.8}
        />
      </Sphere>
    </group>
  );
};

// Earth component with proper error handling
const Earth = () => {
  try {
    // Use absolute path for production
    const earth = useGLTF("/planet/scene.gltf");
    
    if (earth && earth.scene) {
      return (
        <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
      );
    }
    
    return <FallbackEarth />;
  } catch (error) {
    console.warn("Failed to load Earth model:", error);
    return <FallbackEarth />;
  }
};

// Preload the model
useGLTF.preload("/planet/scene.gltf");

// Earth Canvas
const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
      onError={(error) => console.warn("Canvas error:", error)}
    >
      {/* Ambient light */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Suspense with fallback */}
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
