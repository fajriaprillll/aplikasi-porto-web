import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mousePosition.x - 4, springConfig);
  const cursorY = useSpring(mousePosition.y - 4, springConfig);

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 8 : 1,
        }}
      />
      
      {/* Subtle Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white/20 rounded-full pointer-events-none z-[9998]"
        style={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
    </>
  );
};

export default CustomCursor;
