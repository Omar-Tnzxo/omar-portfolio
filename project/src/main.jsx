import React, { Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { initializeGA, logPageView } from './utils/analytics'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

const App = React.lazy(() => import('./App'))

// تهيئة تحليلات جوجل
initializeGA();

// تتبع تغيير الصفحات
const RouteChangeTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    // تسجيل مشاهدة الصفحة
    logPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(registration => {
        console.log('SW registered:', registration)
      })
      .catch(error => {
        console.log('SW registration failed:', error)
      })
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <HelmetProvider>
          <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
          }>
            <RouteChangeTracker />
            <App />
          </Suspense>
        </HelmetProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)