import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { Privacy, Terms, DeleteAccount, Blog, BlogPost, BlogEnglish } from './routes';
import Faq from './pages/Faq';
import FloatingHeader from './components/FloatingHeader';

function App() {
  return (
    <>
      <FloatingHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/blog" element={
          <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
          }>
            <Blog />
          </Suspense>
        } />
        <Route path="/blog/:slug" element={
          <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
          }>
            <BlogPost />
          </Suspense>
        } />
        <Route path="/blog-en" element={
          <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
          }>
            <BlogEnglish />
          </Suspense>
        } />
        <Route path="/privacy" element={
          <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
          }>
            <Privacy />
          </Suspense>
        } />
        <Route path="/terms" element={
          <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
          }>
            <Terms />
          </Suspense>
        } />
        <Route path="/delete-account" element={
          <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
          }>
            <DeleteAccount />
          </Suspense>
        } />
        {/* Catch-all route for 404 pages */}
        <Route path="*" element={
          <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">404 - الصفحة غير موجودة</h1>
              <p className="text-gray-300 mb-6">الصفحة التي تبحث عنها غير موجودة</p>
              <a href="/" className="btn-primary bg-primary hover:bg-primary/80">العودة للرئيسية</a>
            </div>
          </div>
        } />
      </Routes>
    </>
  );
}

export default App;