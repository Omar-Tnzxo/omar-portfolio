import React from 'react';
import StaticCanvas from './StaticCanvas';

interface ProductionCanvasProps {
  children?: React.ReactNode;
  className?: string;
  type?: 'ball' | 'earth' | 'stars';
}

const ProductionCanvas: React.FC<ProductionCanvasProps> = ({ 
  children, 
  className = "",
  type = 'stars'
}) => {
  // في بيئة الإنتاج، اعرض StaticCanvas فقط
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    return <StaticCanvas type={type} className={className} />;
  }

  // في بيئة التطوير، اعرض المكون الأصلي
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ProductionCanvas;
