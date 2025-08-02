import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import {
  About,
  Approach,
  BusinessCard,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  OpeningAnimation,
  WhatsAppButton,
  Projects,
} from "./components";
import Footer from "./components/footer";

// App
const App = () => {
  const [showOpeningAnimation, setShowOpeningAnimation] = useState(true);

  const handleAnimationComplete = () => {
    setShowOpeningAnimation(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/avenue-omar" element={<BusinessCard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/" element={
          <>
            {showOpeningAnimation ? (
              <OpeningAnimation onComplete={handleAnimationComplete} />
            ) : (
              <>
                <Navbar />
                <div className="relative z-0 bg-primary">
                  <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                    <Hero />
                  </div>
                  <About />
                  <Experience />
                  <Tech />
                  <Works />
                  <Approach />
                  <Feedbacks />
                  <div className="relative z-0">
                    <Contact />
                    <StarsCanvas />
                  </div>
                </div>
                <Footer />
                <WhatsAppButton />
              </>
            )}
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
