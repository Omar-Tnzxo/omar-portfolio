import React from 'react';

interface FallbackCanvasProps {
  children?: React.ReactNode;
  className?: string;
}

const FallbackCanvas: React.FC<FallbackCanvasProps> = ({ children, className = "" }) => {
  return (
    <div className={`flex items-center justify-center w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 ${className}`}>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white text-sm font-medium">Loading 3D Content...</p>
        {children && (
          <div className="mt-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default FallbackCanvas;
