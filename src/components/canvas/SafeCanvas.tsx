import React, { Suspense, useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import FallbackCanvas from './FallbackCanvas';

interface SafeCanvasProps {
  children: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
}

const SafeCanvas: React.FC<SafeCanvasProps> = ({ 
  children, 
  className = "", 
  fallback 
}) => {
  const [isClient, setIsClient] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // إذا لم يتم تحميل الصفحة بعد، اعرض fallback
  if (!isClient) {
    return fallback || <FallbackCanvas />;
  }

  // إذا كان هناك خطأ، اعرض fallback
  if (hasError) {
    return fallback || <FallbackCanvas />;
  }

  return (
    <ErrorBoundary 
      fallback={fallback || <FallbackCanvas />}
    >
      <Suspense fallback={fallback || <FallbackCanvas />}>
        <div className={className}>
          {children}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default SafeCanvas;
