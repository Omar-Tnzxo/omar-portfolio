// أدوات تحسين الصور للأداء

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

/**
 * تحويل URL الصورة إلى WebP إذا كان مدعوماً
 */
export function getOptimizedImageUrl(
  originalUrl: string, 
  options: ImageOptimizationOptions = {}
): string {
  const { width, height, quality = 80, format = 'webp' } = options;
  
  // إذا كان URL من Netlify، يمكن استخدام تحسيناتهم
  if (originalUrl.includes('netlify.app')) {
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    if (quality) params.append('q', quality.toString());
    if (format) params.append('fm', format);
    
    return `${originalUrl}?${params.toString()}`;
  }
  
  return originalUrl;
}

/**
 * تحميل الصورة بشكل تدريجي
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * تحميل مجموعة من الصور
 */
export function preloadImages(sources: string[]): Promise<void[]> {
  return Promise.all(sources.map(preloadImage));
}

/**
 * الحصول على حجم الصورة المناسب للشاشة
 */
export function getResponsiveImageSize(screenWidth: number): { width: number; height: number } {
  if (screenWidth < 640) {
    return { width: 400, height: 300 }; // Mobile
  } else if (screenWidth < 1024) {
    return { width: 800, height: 600 }; // Tablet
  } else {
    return { width: 1200, height: 900 }; // Desktop
  }
}

/**
 * تحسين الصور للشاشات المختلفة
 */
export function getResponsiveImageUrl(
  baseUrl: string, 
  screenWidth: number
): string {
  const size = getResponsiveImageSize(screenWidth);
  return getOptimizedImageUrl(baseUrl, {
    width: size.width,
    height: size.height,
    quality: 85,
    format: 'webp'
  });
}

/**
 * إنشاء placeholder للصورة
 */
export function createImagePlaceholder(width: number, height: number, color = '#f3f4f6'): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='${color.replace('#', '%23')}'/%3E%3C/svg%3E`;
}

/**
 * تحسين الصور في الموقع
 */
export const OPTIMIZED_IMAGES = {
  hero: {
    mobile: { width: 400, height: 300, quality: 80 },
    tablet: { width: 800, height: 600, quality: 85 },
    desktop: { width: 1200, height: 900, quality: 90 }
  },
  projects: {
    mobile: { width: 300, height: 200, quality: 75 },
    tablet: { width: 600, height: 400, quality: 80 },
    desktop: { width: 800, height: 600, quality: 85 }
  },
  tech: {
    mobile: { width: 100, height: 100, quality: 70 },
    tablet: { width: 150, height: 150, quality: 75 },
    desktop: { width: 200, height: 200, quality: 80 }
  }
};

/**
 * الحصول على إعدادات الصورة المحسنة حسب النوع والشاشة
 */
export function getImageSettings(
  type: keyof typeof OPTIMIZED_IMAGES, 
  screenWidth: number
): ImageOptimizationOptions {
  if (screenWidth < 640) {
    return OPTIMIZED_IMAGES[type].mobile;
  } else if (screenWidth < 1024) {
    return OPTIMIZED_IMAGES[type].tablet;
  } else {
    return OPTIMIZED_IMAGES[type].desktop;
  }
} 