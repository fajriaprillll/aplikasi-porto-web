import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ProjectDetail from './pages/ProjectDetail';
import Footer, { SocialSidebar } from './components/Footer';
import { SpaceBackground } from './components/PremiumEffects';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen selection:bg-white/10">
        <SpaceBackground />
        <CustomCursor />
        
        {/* Global Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-white z-[100] origin-left"
          style={{ scaleX }}
        />

        <Navbar />
        
        <main className="relative z-10">
          <AnimatedRoutes />
        </main>

        <Footer />
        <BackToTop />
        <SocialSidebar />
      </div>
    </Router>
  );
}

export default App;
