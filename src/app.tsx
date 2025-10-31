import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import {
  Hero,
  Navbar,
  WhatsAppButton,
} from "./components";

// Lazy load heavy components
const About = lazy(() => import("./components/about").then(m => ({ default: m.About })));
const Approach = lazy(() => import("./components/approach"));
const BusinessCard = lazy(() => import("./components/BusinessCard"));
const Contact = lazy(() => import("./components/contact").then(m => ({ default: m.Contact })));
const Experience = lazy(() => import("./components/experience").then(m => ({ default: m.Experience })));
const Feedbacks = lazy(() => import("./components/feedbacks").then(m => ({ default: m.Feedbacks })));
const Tech = lazy(() => import("./components/tech").then(m => ({ default: m.Tech })));
const Projects = lazy(() => import("./components/projects"));
const NotFound = lazy(() => import("./components/NotFound").then(m => ({ default: m.NotFound })));
const Footer = lazy(() => import("./components/footer"));
const SoftwarePreview = lazy(() => import("./components/SoftwarePreview").then(m => ({ default: m.SoftwarePreview })));

// Lazy load software pages
const SoftwareHub = lazy(() => import("./pages/SoftwareHub").then(m => ({ default: m.SoftwareHub })));
const CategoryDetail = lazy(() => import("./pages/CategoryDetail").then(m => ({ default: m.CategoryDetail })));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-primary">
    <div className="w-12 h-12 border-4 border-[#915EFF] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// App
const App = () => {

  return (
    <BrowserRouter>
      <div className="overflow-x-hidden max-w-full">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/avenue-omar" element={<BusinessCard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/software" element={<SoftwareHub />} />
            <Route path="/software/:slug" element={<CategoryDetail />} />
            <Route path="/" element={
              <>
                <Navbar />
                <div className="relative z-0 overflow-x-hidden">
                  {/* Hero Section - Dark Blue Background */}
                  <div className="bg-primary bg-hero-pattern bg-cover bg-no-repeat bg-center">
                    <Hero />
                  </div>
                  
                  {/* Gradient Transition from Dark Blue to Black */}
                  <div className="w-full h-32 bg-gradient-to-b from-primary to-black"></div>
                  
                  <Suspense fallback={<div className="min-h-screen" />}>
                    {/* About Section - Black Background */}
                    <div className="bg-black">
                      <About />
                    </div>
                    
                    {/* Gradient Transition from Black to Dark Blue */}
                    <div className="w-full h-32 bg-gradient-to-b from-black to-primary"></div>
                    
                    {/* Experience Section - Dark Blue Background */}
                    <div className="bg-primary">
                      <Experience />
                    </div>
                    
                    {/* Gradient Transition from Dark Blue to Black */}
                    <div className="w-full h-32 bg-gradient-to-b from-primary to-black"></div>
                    
                    {/* Tech Section - Black Background */}
                    <div className="bg-black">
                      <Tech />
                    </div>
                    
                    {/* Gradient Transition from Black to Dark Blue */}
                    <div className="w-full h-32 bg-gradient-to-b from-black to-primary"></div>
                    
                    {/* Approach Section - Dark Blue Background */}
                    <div className="bg-primary">
                      <Approach />
                    </div>
                    
                    {/* Gradient Transition from Dark Blue to Black */}
                    <div className="w-full h-32 bg-gradient-to-b from-primary to-black"></div>
                    
                    {/* Feedbacks Section - Black Background */}
                    <div className="bg-black">
                      <Feedbacks />
                    </div>
                    
                    {/* Gradient Transition from Black to Dark Blue */}
                    <div className="w-full h-32 bg-gradient-to-b from-black to-primary"></div>
                    
                    {/* Software Arsenal Preview Section - Dark Blue Background */}
                    <div className="bg-primary">
                      <SoftwarePreview />
                    </div>
                    
                    {/* Gradient Transition from Dark Blue to Black */}
                    <div className="w-full h-32 bg-gradient-to-b from-primary to-black"></div>
                    
                    {/* Contact Section - Black Background */}
                    <div className="relative z-0 bg-black">
                      <Contact />
                    </div>
                  </Suspense>
                </div>
                <Footer />
                <WhatsAppButton />
              </>
            } />
            {/* Catch-all route for 404 - MUST be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
