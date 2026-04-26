import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// 1. Spotlight Card
export const SpotlightCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(129,140,248,0.12), transparent 40%)`,
        }}
      />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};

// 2. Decrypted Text
const CHARS = '!<>-_\\\\/[]{}—=+*^?#_';
export const DecryptedText = ({ text, speed = 20, className = '' }: { text: string, speed?: number, className?: string }) => {
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current as any);
    
    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((_, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      
      if (iteration >= text.length) {
        clearInterval(intervalRef.current as any);
      }
      
      iteration += 1;
    }, speed);
  };

  useEffect(() => {
    scramble();
    return () => clearInterval(intervalRef.current as any);
  }, [text]);

  return (
    <span 
      onMouseEnter={scramble}
      className={`inline-block ${className}`}
    >
      {displayText}
    </span>
  );
};

// 3. BlurText Component (from React Bits)
const buildKeyframes = (from: any, steps: any[]) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes: any = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

export const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35
}: any) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = React.useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = React.useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  return (
    <span ref={ref} className={className} style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
      {elements.map((segment: string, index: number) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: any = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000
        };
        spanTransition.ease = easing;

        return (
          <motion.span
            className="inline-block"
            style={{ willChange: 'transform, filter, opacity' }}
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </span>
  );
};

// 4. Magnetic Element
export const MagneticElement = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// 6. Realistic Outer Space Background (Canvas + Nebula)
export const SpaceBackground = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: any[] = [];
    let meteors: any[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 2500);
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2,
          alpha: Math.random(),
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    const createMeteor = () => {
      meteors.push({
        x: Math.random() * canvas.width * 1.5,
        y: -100,
        length: Math.random() * 150 + 50,
        speed: Math.random() * 10 + 15,
        thickness: Math.random() * 1.5 + 0.5,
        opacity: 1,
        active: true,
      });
    };

    let meteorTimeout: number;
    const scheduleNextMeteor = () => {
      createMeteor();
      // Schedule the next meteor to appear anywhere between 0.3 to 1.5 seconds later
      const nextDelay = Math.random() * 1200 + 300;
      meteorTimeout = window.setTimeout(scheduleNextMeteor, nextDelay);
    };
    // Start the meteor cycle
    scheduleNextMeteor();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Stars
      stars.forEach(star => {
        star.alpha += star.twinkleSpeed * star.twinkleDir;
        if (star.alpha <= 0.1) {
          star.alpha = 0.1;
          star.twinkleDir = 1;
        } else if (star.alpha >= 1) {
          star.alpha = 1;
          star.twinkleDir = -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });

      // Draw Meteors
      meteors.forEach(meteor => {
        if (!meteor.active) return;
        
        meteor.x -= meteor.speed;
        meteor.y += meteor.speed;

        const tailX = meteor.x + meteor.length;
        const tailY = meteor.y - meteor.length;

        const gradient = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${meteor.opacity})`);
        gradient.addColorStop(0.1, `rgba(99, 102, 241, ${meteor.opacity * 0.8})`); // #6366F1
        gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);

        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = meteor.thickness;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Glowing head
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, meteor.thickness * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${meteor.opacity})`;
        ctx.fill();

        if (meteor.x < -100 || meteor.y > canvas.height + 100) {
          meteor.active = false;
        }
      });

      meteors = meteors.filter(m => m.active);
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(meteorTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-[#000000]">
      {/* Deep Space Nebula Blobs */}
      <div className="absolute inset-0 opacity-30">
        <motion.div 
          animate={{ 
            transform: ["translate(0%, 0%) scale(1)", "translate(10%, 15%) scale(1.1)", "translate(-5%, -5%) scale(0.9)", "translate(0%, 0%) scale(1)"]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#111827] blur-[150px] will-change-transform"
        />
        <motion.div 
          animate={{ 
            transform: ["translate(0%, 0%) scale(1)", "translate(-15%, 5%) scale(0.9)", "translate(10%, -10%) scale(1.1)", "translate(0%, 0%) scale(1)"]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#2C2C54] blur-[150px] will-change-transform"
        />
        <motion.div 
          animate={{ 
            transform: ["translate(0%, 0%) scale(1)", "translate(10%, -15%) scale(1.05)", "translate(-15%, 10%) scale(0.95)", "translate(0%, 0%) scale(1)"]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-[#0A0A0A] blur-[150px] will-change-transform"
        />
      </div>
      
      {/* Canvas Starfield & Meteors */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />
      
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.05] z-20 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
    </div>
  );
};

// 8. Premium Shimmer Button
export const ShimmerButton = ({ children, className = '', onClick, type = "button" }: any) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      type={type as any}
      className={`group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl hover:border-indigo-500/50 hover:bg-white/10 transition-all duration-300 ${className}`}
    >
      {/* Sweeping Light Reflection */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-2xl">
         <motion.div 
           animate={{ x: ["-300%", "300%"] }}
           transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", repeatDelay: 1 }}
           className="w-1/2 h-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
         />
      </div>
      <div className="relative z-10 flex items-center justify-center h-full w-full">
         {children}
      </div>
    </motion.button>
  );
};
