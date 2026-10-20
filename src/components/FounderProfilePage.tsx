import React from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { AestificArchIcon } from './AestificLogo';

interface FounderProfilePageProps {
  onClose: () => void;
}

export const FounderProfilePage: React.FC<FounderProfilePageProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white text-zinc-950 flex flex-col overflow-hidden font-['Comfortaa'] selection:bg-zinc-800 selection:text-white">
      {/* Top Navigation Bar with Back/Exit controls and Official Branding */}
      <header className="h-20 px-6 sm:px-12 border-b border-zinc-100 bg-white/90 backdrop-blur-md flex items-center justify-between shrink-0 z-10">
        {/* Subtle Back Button */}
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-600 hover:text-black hover:bg-zinc-100 transition-colors border border-zinc-200/80 cursor-pointer"
          aria-label="Back to landing page"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>back</span>
        </button>

        {/* Center: Official Logo Icon and Wordmark */}
        <div className="flex items-center gap-2.5 select-none">
          <img
            src="/aestific-icon-dark.png"
            alt="Aestific"
            className="w-6 h-6 object-contain"
          />
          <img
            src="/aestific-wordmark-dark.png"
            alt="aestific"
            className="h-4 sm:h-[18px] w-auto object-contain"
          />
        </div>

        {/* Subtle Exit (Close) Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-100 text-zinc-400 hover:text-black transition-colors cursor-pointer"
          aria-label="Exit"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* Scrollable Editorial Content Area */}
      <main
        className="flex-1 overflow-y-auto w-full"
        style={{
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-12 py-10 sm:py-16">
          {/* Top Hero Image: Exact Colonnade Photograph (Monochrome, Cinematic) */}
          <div className="w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-200/70 shadow-sm bg-zinc-950">
            <img
              src="/founder-colonnade.png"
              alt="Atif Al Wasi, Founder of Aestific AI"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[75vh] object-contain sm:object-cover mx-auto"
            />
          </div>

          {/* Founder Content Beneath the Image */}
          <div className="mt-12 sm:mt-16 max-w-2xl">
            {/* Small Introductory Heading */}
            <p className="text-xs sm:text-sm font-semibold text-zinc-400 lowercase tracking-widest uppercase font-sans mb-3">
              meet the founder
            </p>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-medium text-black lowercase tracking-tight mb-2 leading-tight">
              Atif Al Wasi
            </h1>

            {/* Role Subtitle */}
            <p className="text-sm sm:text-base text-zinc-500 font-light lowercase mb-10">
              Founder of Aestific AI
            </p>

            {/* Emphasized Philosophy Quote */}
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-950 leading-snug tracking-tight mb-10 pl-5 sm:pl-6 border-l-2 border-black">
              “AI should be easier to use, not harder to understand.”
            </blockquote>

            {/* Readable Editorial Paragraphs */}
            <div className="space-y-6 text-sm sm:text-base text-zinc-700 leading-relaxed font-light">
              <p>
                I started Aestific with a simple vision: to bring multiple AI capabilities into one place and make them easier for everyone to use.
              </p>

              <p>
                Building Aestific has been a journey of learning, experimenting, and turning an idea into something real. Working independently, I use AI tools and my own ideas to build toward a future where people can focus on what they want to achieve—not which AI tool they need.
              </p>

              <p className="text-zinc-900 font-normal">
                This is just the beginning.
              </p>
            </div>

            {/* Location & Status Line */}
            <div className="mt-12 pt-8 border-t border-zinc-100 text-xs sm:text-sm text-zinc-400 font-light lowercase">
              Building Aestific AI · Bangladesh
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
