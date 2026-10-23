import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export const WelcomeAnnouncement = ({ activeView }: { activeView: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (activeView === 'chat') {
      const hasDismissed = localStorage.getItem('aestific_welcome_dismissed');
      if (!hasDismissed) {
        setIsOpen(true);
      }
    }
  }, [activeView]);

  const handleClose = () => {
    localStorage.setItem('aestific_welcome_dismissed', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="w-full">
            <img
              src="https://ibb.co.com/8ghPWTtb"
              alt="Welcome to Aestific"
              className="w-full h-auto block"
              referrerPolicy="no-referrer"
              onError={(e) => {
                console.error("Image load failed", e);
                // Optionally hide the card or show a placeholder if image fails
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
