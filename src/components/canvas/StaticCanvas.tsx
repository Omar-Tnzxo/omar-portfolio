import React from 'react';

interface StaticCanvasProps {
  children?: React.ReactNode;
  className?: string;
  type?: 'ball' | 'earth' | 'stars';
}

const StaticCanvas: React.FC<StaticCanvasProps> = ({ 
  children, 
  className = "",
  type = 'stars'
}) => {
  const getBackground = () => {
    switch (type) {
      case 'ball':
        return 'bg-gradient-to-br from-purple-600 to-blue-600';
      case 'earth':
        return 'bg-gradient-to-br from-green-600 to-blue-600';
      case 'stars':
      default:
        return 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900';
    }
  };

  const getContent = () => {
    switch (type) {
      case 'ball':
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-white rounded-full shadow-2xl animate-pulse mb-4"></div>
            <p className="text-white text-sm font-medium">3D Ball</p>
          </div>
        );
      case 'earth':
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-green-400 rounded-full shadow-2xl animate-spin mb-4"></div>
            <p className="text-white text-sm font-medium">3D Earth</p>
          </div>
        );
      case 'stars':
      default:
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="grid grid-cols-8 gap-1 mb-4">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${1 + Math.random() * 2}s`
                  }}
                ></div>
              ))}
            </div>
            <p className="text-white text-sm font-medium">3D Stars</p>
          </div>
        );
    }
  };

  return (
    <div className={`flex items-center justify-center w-full h-full ${getBackground()} ${className}`}>
      <div className="text-center">
        {getContent()}
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaticCanvas;
