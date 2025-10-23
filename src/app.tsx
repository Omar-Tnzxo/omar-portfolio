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
            <Route path="/" element={
              <>
                <Navbar />
                <div className="relative z-0 bg-primary overflow-x-hidden">
                  <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                    <Hero />
                  </div>
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <About />
                    <Experience />
                    <Tech />
                    <Approach />
                    <Feedbacks />
                    <div className="relative z-0">
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
