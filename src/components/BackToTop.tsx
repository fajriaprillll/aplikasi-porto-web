import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-indigo-500/40 hover:shadow-[0_8px_32px_rgba(99,102,241,0.2)] transition-all duration-300 group"
          aria-label="Back to top"
        >
          <ArrowUp size={18} className="group-hover:text-indigo-400 transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
