import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  WhatsAppButton,
  Projects,
} from "./components";
import Footer from "./components/footer";

// App
const App = () => {

  return (
    <BrowserRouter>
      <div className="overflow-x-hidden max-w-full">
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
        } />
      </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
