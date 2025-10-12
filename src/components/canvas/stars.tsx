import { Points, PointMaterial, Preload } from "@react-three/drei";
import { Canvas, type PointsProps, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useRef, Suspense, useState, useEffect } from "react";
import type { Points as PointsType } from "three";

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

// Stars
const Stars = (props: PointsProps) => {
  const ref = useRef<PointsType | null>(null);
  // Detect if mobile for performance optimization
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // For each star - reduce count on mobile
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(isMobile ? 3000 : 6000), { radius: 1.2 }),
  );

  // Rotate multiple stars
  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {/* Points */}
      <Points
        ref={ref}
        positions={new Float32Array(sphere)}
        stride={3}
        frustumCulled
        {...props}
      >
        {/* Each point material */}
        <PointMaterial
          transparent
          color="#f272c8"
          size={isMobile ? 0.003 : 0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// Stars Canvas
const StarsCanvas = () => {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    setWebGLSupported(checkWebGLSupport());
  }, []);
  
  // Don't render on server or if WebGL not supported
  if (!isClient || !webGLSupported) {
    return null;
  }
  
  // Detect if mobile for performance optimization
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      {/* Canvas */}
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        dpr={isMobile ? [1, 1] : [1, 2]}
        gl={{ 
          antialias: false,
          powerPreference: isMobile ? 'low-power' : 'default',
          alpha: true,
          failIfMajorPerformanceCaveat: false,
        }}
        frameloop="always"
        onCreated={(state) => {
          // Handle WebGL context loss
          state.gl.domElement.addEventListener('webglcontextlost', (event) => {
            event.preventDefault();
            console.warn('WebGL context lost for stars');
          });
          
          state.gl.domElement.addEventListener('webglcontextrestored', () => {
            console.log('WebGL context restored for stars');
          });
        }}
      >
        {/* Show stars if not fallback */}
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        {/* preload all */}
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
