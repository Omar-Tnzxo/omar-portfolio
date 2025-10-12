import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";

import CanvasLoader from "../loader";

// Check WebGL support
const checkWebGLSupport = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
};

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

// Fallback component when WebGL is not supported
const WebGLFallback = () => (
  <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-2xl border border-white/10">
    <div className="text-center p-6">
      <div className="w-24 h-24 mx-auto mb-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute inset-2 bg-gradient-to-br from-purple-900 to-blue-900 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <p className="text-white text-sm font-medium mb-2">3D Earth Model</p>
      <p className="text-secondary text-xs">Interactive globe visualization</p>
    </div>
  </div>
);

// Earth Canvas
const EarthCanvas = () => {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    setWebGLSupported(checkWebGLSupport());
  }, []);
  
  // Don't render on server
  if (!isClient) {
    return <CanvasLoader />;
  }
  
  // Show fallback if WebGL is not supported
  if (!webGLSupported) {
    return <WebGLFallback />;
  }
  
  // Detect if mobile for performance optimization
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <Canvas
      shadows
      frameloop="always"
      dpr={isMobile ? [1, 1] : [1, 2]}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: !isMobile,
        powerPreference: isMobile ? 'low-power' : 'high-performance',
        alpha: true,
        failIfMajorPerformanceCaveat: false,
      }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
      style={{ touchAction: 'none' }}
      onCreated={(state) => {
        // Handle WebGL context loss
        state.gl.domElement.addEventListener('webglcontextlost', (event) => {
          event.preventDefault();
          console.warn('WebGL context lost');
        });
        
        state.gl.domElement.addEventListener('webglcontextrestored', () => {
          console.log('WebGL context restored');
        });
      }}
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
