import React, { useEffect, useCallback } from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
  minDuration?: number;
}

// Exact geometric contour of the Aestific mark forming the stylized lowercase 'a'
const AESTIFIC_PATH =
  'M 54 79.5 A 32 32 0 1 1 82 48 L 82 64 A 7.5 7.5 0 0 1 67 64 L 67 48 A 17 17 0 0 0 33 48 A 17 17 0 0 0 67 48';

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  minDuration = 3000,
}) => {
  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // Keyboard shortcut (Escape, Space, Enter to skip)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleComplete]);

  // Sequence timer to complete brand intro
  useEffect(() => {
    const timer = setTimeout(() => {
      handleComplete();
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, handleComplete]);

  return (
    <motion.div
      key="aestific-splash-cinematic"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 0.995,
        filter: 'blur(4px)',
      }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black select-none overflow-hidden cursor-default"
      style={{ backgroundColor: '#000000' }}
    >
      {/* 1. Skip control */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        whileHover={{ opacity: 0.95 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        onClick={handleComplete}
        className="absolute top-7 right-8 text-[11px] font-mono tracking-widest text-zinc-500 hover:text-zinc-200 transition-opacity cursor-pointer bg-transparent border-none p-0 focus:outline-none"
        aria-label="Skip intro"
      >
        esc / skip
      </motion.button>

      {/* Atmospheric Cinematic Ambient Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.45, 0.3, 0.35] }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      >
        <div
          className="w-[450px] h-[450px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(0,240,255,0.12) 0%, rgba(37,99,235,0.15) 45%, transparent 75%)',
            filter: 'blur(50px)',
          }}
        />
      </motion.div>

      {/* Main Brand Stage */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        {/* Original Aestific Logo Animation */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full relative z-10 overflow-visible"
            >
              <defs>
                {/* Silver-white to Electric Blue gradient reflecting premium design */}
                <linearGradient id="aestificLogoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#93C5FD" />
                  <stop offset="100%" stopColor="#00F0FF" />
                </linearGradient>

                {/* Soft cinematic glow filter */}
                <filter id="logoGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Faint dormant guide trace */}
              <motion.path
                d={AESTIFIC_PATH}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Precise Light Animation Tracing the Logo Shape */}
              <motion.path
                d={AESTIFIC_PATH}
                stroke="url(#aestificLogoGrad)"
                strokeWidth="7.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#logoGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0, 1, 0.9],
                }}
                transition={{
                  duration: 1.4,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />

              {/* Controlled Electric-Blue & Silver Traveling Accent Spark */}
              <motion.path
                d={AESTIFIC_PATH}
                fill="none"
                stroke="#00F0FF"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{
                  pathLength: 0.12,
                  pathOffset: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: [0.12, 0.22, 0.15, 0.02],
                  pathOffset: [0, 0.4, 0.8, 1.0],
                  opacity: [0, 1, 0.8, 0],
                }}
                transition={{
                  duration: 1.4,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                  times: [0, 0.4, 0.8, 1],
                }}
              />
            </svg>
          </div>
        </div>

        {/* Wordmark Reveal in exact Comfortaa font */}
        <motion.div
          initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.7,
            delay: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-7 flex items-center justify-center"
        >
          <span
            className="text-white text-3xl sm:text-[40px] font-medium lowercase leading-none select-none tracking-[0.28em]"
            style={{
              fontFamily: "'Comfortaa', cursive, sans-serif",
            }}
          >
            aestific
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.6,
            delay: 1.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-4 flex items-center justify-center"
        >
          <p
            className="text-zinc-400 text-xs sm:text-sm font-light tracking-[0.2em] select-none"
            style={{
              fontFamily: "'Comfortaa', sans-serif",
            }}
          >
            beyond intelligence. into possibility.
          </p>
        </motion.div>
      </div>

      {/* Bottom Electric-Blue / Silver Laser Accent Bar */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scaleX: 0.2 }}
          animate={{ opacity: [0, 0.9, 0.7], scaleX: 1 }}
          transition={{
            delay: 0.4,
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full h-[2px]"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(0,240,255,0.2) 20%, #00F0FF 50%, rgba(147,197,253,0.8) 80%, transparent 100%)',
            boxShadow: '0 -1px 20px rgba(0, 240, 255, 0.4)',
          }}
        />
      </div>
    </motion.div>
  );
};
