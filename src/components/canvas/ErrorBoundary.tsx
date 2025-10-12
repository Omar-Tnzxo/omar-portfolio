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
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <FallbackCanvas />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
