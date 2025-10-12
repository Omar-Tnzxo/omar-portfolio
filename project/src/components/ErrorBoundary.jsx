import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // يمكن إضافة تسجيل الأخطاء هنا
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="mb-8">
              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">حدث خطأ غير متوقع</h1>
              <p className="text-gray-300 mb-6">
                نأسف لحدوث هذا الخطأ. يرجى تحديث الصفحة أو العودة للرئيسية.
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => window.location.reload()} 
                  className="btn-primary bg-primary hover:bg-primary/80 w-full"
                >
                  تحديث الصفحة
                </button>
                <a 
                  href="/" 
                  className="btn-primary bg-gray-600 hover:bg-gray-700 w-full block"
                >
                  العودة للرئيسية
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
