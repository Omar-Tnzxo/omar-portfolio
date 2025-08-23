import React from 'react';

interface SafeCanvasRevealEffectProps {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}

const SafeCanvasRevealEffect: React.FC<SafeCanvasRevealEffectProps> = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName = "",
  dotSize = 3,
  showGradient = true,
}) => {
  // في بيئة الإنتاج، اعرض بديل بسيط
  const isProduction = import.meta.env.MODE === 'production';
  
  if (isProduction) {
    return (
      <div className={`h-full relative w-full ${containerClassName}`}>
        <div className="h-full w-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-sm font-medium">Interactive Effect</p>
          </div>
        </div>
        {showGradient && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        )}
      </div>
    );
  }

  // في بيئة التطوير، اعرض CanvasRevealEffect الأصلي
  const { CanvasRevealEffect } = require('./CanvasRevealEffect');
  return (
    <CanvasRevealEffect
      animationSpeed={animationSpeed}
      opacities={opacities}
      colors={colors}
      containerClassName={containerClassName}
      dotSize={dotSize}
      showGradient={showGradient}
    />
  );
};

export default SafeCanvasRevealEffect;
