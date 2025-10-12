import React from 'react';

interface FallbackCanvasProps {
  children?: React.ReactNode;
  className?: string;
}

const FallbackCanvas: React.FC<FallbackCanvasProps> = ({ children, className = "" }) => {
  return (
    <div className={`flex items-center justify-center w-full h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-2xl border border-white/10 ${className}`}>
      <div className="text-center p-6">
        {/* Animated Earth Icon */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          {/* Outer glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse opacity-50 blur-xl"></div>
          
          {/* Earth sphere */}
          <div className="relative w-24 h-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-full shadow-2xl">
            {/* Continents (simplified) */}
            <div className="absolute top-4 left-6 w-8 h-6 bg-green-600/60 rounded-full blur-sm"></div>
            <div className="absolute top-10 right-4 w-6 h-4 bg-green-700/60 rounded-full blur-sm"></div>
            <div className="absolute bottom-6 left-8 w-5 h-5 bg-green-600/60 rounded-full blur-sm"></div>
            
            {/* Clouds */}
            <div className="absolute top-8 right-6 w-10 h-3 bg-white/30 rounded-full blur-sm animate-pulse"></div>
            <div className="absolute bottom-10 left-4 w-8 h-3 bg-white/20 rounded-full blur-sm animate-pulse"></div>
            
            {/* Shine effect */}
            <div className="absolute top-2 right-8 w-4 h-4 bg-white/40 rounded-full blur-md"></div>
          </div>
          
          {/* Orbit ring */}
          <div className="absolute inset-0 border-2 border-purple-500/30 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
        </div>
        
        <p className="text-white text-sm font-medium mb-1">Loading Earth Model</p>
        <p className="text-secondary text-xs">Preparing 3D visualization...</p>
        
        {children && (
          <div className="mt-3">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default FallbackCanvas;
