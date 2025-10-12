import React, { Component, ErrorInfo, ReactNode } from 'react';
import FallbackCanvas from './FallbackCanvas';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    console.error('Canvas Error Boundary caught:', error);
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Canvas Error Details:', error, errorInfo);
    
    // Log specific errors for debugging
    if (error.message.includes('WebGL')) {
      console.error('WebGL Error detected - Device may not support WebGL or context was lost');
    }
    if (error.message.includes('GLTF') || error.message.includes('GLB')) {
      console.error('Model loading error - Check if model file exists and is valid');
    }
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <FallbackCanvas>
          <p className="text-xs text-white/60 mt-2">
            {this.state.error?.message?.includes('WebGL') 
              ? 'WebGL not supported on this device'
              : 'Failed to load 3D content'}
          </p>
        </FallbackCanvas>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
