import React, { Suspense, useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import FallbackCanvas from './FallbackCanvas';
import StaticCanvas from './StaticCanvas';

interface SafeCanvasProps {
  children: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
  type?: 'ball' | 'earth' | 'stars';
}

const SafeCanvas: React.FC<SafeCanvasProps> = ({ 
  children, 
  className = "", 
  fallback,
  type = 'stars'
}) => {
  const [isClient, setIsClient] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // إذا لم يتم تحميل الصفحة بعد، اعرض StaticCanvas
  if (!isClient) {
    return fallback || <StaticCanvas type={type} />;
  }

  // إذا كان هناك خطأ، اعرض StaticCanvas
  if (hasError) {
    return fallback || <StaticCanvas type={type} />;
  }

  return (
    <ErrorBoundary 
      fallback={fallback || <StaticCanvas type={type} />}
    >
      <Suspense fallback={fallback || <StaticCanvas type={type} />}>
        <div className={className}>
          {children}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default SafeCanvas;
