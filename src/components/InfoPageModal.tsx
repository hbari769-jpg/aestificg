import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, X, MessageSquare, Code2, Search, Image as ImageIcon, Sparkles, Cpu } from 'lucide-react';
import { AestificArchIcon } from './AestificLogo';

export type InfoPageType = 'capabilities' | 'enhance' | 'focus' | 'founder' | 'whats-new';

interface InfoPageModalProps {
  pageType: InfoPageType | null;
  onClose: () => void;
}

export const InfoPageModal: React.FC<InfoPageModalProps> = ({ pageType, onClose }) => {
  if (!pageType) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-white text-zinc-950 flex flex-col overflow-y-auto selection:bg-zinc-800 selection:text-white"
      >
        {/* Shared Consistent Header */}
        <header className="sticky top-0 h-20 px-6 sm:px-12 border-b border-zinc-200/80 bg-white/95 backdrop-blur-md flex items-center justify-between z-20 shrink-0">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-600 hover:text-black hover:bg-zinc-100 transition-colors border border-zinc-200 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>back to website</span>
            </button>

            <div className="flex items-center gap-2.5 pl-2 border-l border-zinc-200">
              <img
                src="/aestific-icon-dark.png"
                alt="Aestific"
                className="w-5 h-5 object-contain"
              />
              <div className="flex flex-col">
                <img
                  src="/aestific-wordmark-dark.png"
                  alt="aestific"
                  className="h-3.5 w-auto object-contain"
                />
                <span className="text-[10px] text-zinc-400 lowercase font-sans tracking-wider pt-0.5">
                  Aestific Platform
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-zinc-100 text-zinc-400 hover:text-black transition-colors cursor-pointer"
            aria-label="Close page"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* Content Container */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-6 sm:px-12 py-16 sm:py-20">
          {/* AI CAPABILITIES PAGE */}
          {pageType === 'capabilities' && (
            <div className="space-y-16">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-sans block mb-3 font-semibold">
                  product overview
                </span>
                <h1
                  className="text-4xl sm:text-5xl font-medium tracking-tight text-black mb-6"
                  style={{ fontFamily: "'Comfortaa', cursive, sans-serif" }}
                >
                  AI Capabilities
                </h1>
                <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-light">
                  Aestific brings together foundational artificial intelligence capabilities into one coherent, distraction-free environment. From intuitive dialogue and step-by-step reasoning to code generation, live web research, and visual synthesis, each capability is engineered to work seamlessly as a unified whole.
                </p>
              </div>

              {/* Five Specific Capability Sections */}
              <div className="space-y-12 border-t border-zinc-100 pt-12">
                {/* 1. AI Chat */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-black">
                    <MessageSquare className="w-5 h-5 text-black" />
                    <h2
                      className="text-2xl font-medium tracking-tight"
                      style={{ fontFamily: "'Comfortaa', cursive, sans-serif" }}
                    >
                      AI Chat
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-light pl-7">
                    Multi-turn conversational intelligence designed to understand nuanced questions, context shifts, and long dialogue histories across languages. Whether exploring creative ideas or analyzing complex queries, AI Chat provides structured, coherent responses.
                  </p>
                </div>

                {/* 2. Reasoning */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-black">
                    <Cpu className="w-5 h-5 text-black" />
                    <h2
                      className="text-2xl font-medium tracking-tight"
                      style={{ fontFamily: "'Comfortaa', cursive, sans-serif" }}
                    >
                      Reasoning
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-light pl-7">
                    Step-by-step logical analysis for intricate problems. Reasoning helps deconstruct complex questions into logical sequences, evaluate trade-offs, and explain conceptual problems with rigor and clarity.
                  </p>
                </div>

                {/* 3. Coding */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-black">
                    <Code2 className="w-5 h-5 text-black" />
                    <h2
                      className="text-2xl font-medium tracking-tight"
                      style={{ fontFamily: "'Comfortaa', cursive, sans-serif" }}
                    >
                      Coding
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-light pl-7">
                    Assistance with software engineering across modern programming languages. Generate code, debug syntax and logic errors, refactor algorithms, and inspect implementations with clean syntax highlighting and practical explanations.
                  </p>
                </div>

                {/* 4. Web Research */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-black">
                    <Search className="w-5 h-5 text-black" />
                    <h2
                      className="text-2xl font-medium tracking-tight"
                      style={{ fontFamily: "'Comfortaa', cursive, sans-serif" }}
                    >
                      Web Research
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-light pl-7">
                    Real-time information retrieval that searches the live web for verified data. Synthesizes knowledge across current publications, provides clickable source citations, and reduces guesswork when researching timely topics.
                  </p>
                </div>

                {/* 5. Image Generation */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-black">
                    <ImageIcon className="w-5 h-5 text-black" />
                    <h2
                      className="text-2xl font-medium tracking-tight"
                      style={{ fontFamily: "'Comfortaa', cursive, sans-serif" }}
                    >
                      Image Generation
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-light pl-7">
                    Native visual synthesis directly within your workspace. Generate high-resolution imagery, diagrams, and artistic concepts using descriptive text prompts in customizable aspect ratios without switching to external tools.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* AESTIFIC ENHANCE PAGE */}
          {pageType === 'enhance' && (
            <div className="space-y-8">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-sans block mb-3 font-semibold">
                  feature documentation
                </span>
                <h1
                  className="text-4xl sm:text-5xl font-medium tracking-tight text-black mb-8"
                  style={{ fontFamily: "'Comfortaa', cursive, sans-serif" }}
                >
                  Aestific Enhance
                </h1>
              </div>

              <div className="space-y-6 text-base sm:text-lg text-zinc-700 leading-relaxed font-light">
                <p>
                  Great ideas deserve to be understood. But turning an idea into the perfect prompt can often be complicated, time-consuming, and frustrating.
                </p>

                <p>
                  Aestific Enhance is designed to bridge that gap. It transforms rough, incomplete, or unclear prompts into more refined, structured, and effective instructions—helping you communicate what you really want with greater clarity.
                </p>

                <p>
                  Whether you are asking a question, writing code, researching a topic, or creating something new, Enhance helps improve how you express your intent. Instead of making you struggle to find the right words, it helps shape your request into a clearer direction while preserving your original meaning, preferences, tone, and style.
                </p>

                <p>
                  The goal is simple: let people focus on their ideas, not the complexity of prompt engineering. You bring the intention. Aestific Enhance helps refine the expression.
                </p>

                <p className="font-medium text-black pt-4">
                  Less time refining prompts. More time bringing ideas to life.
                </p>
              </div>
            </div>
          )}

          {/* AESTIFIC FOCUS PAGE */}
          {pageType === 'focus' && (
            <div className="space-y-8">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-sans block mb-3 font-semibold">
                  feature documentation
                </span>
                <h1
                  className="text-4xl sm:text-5xl font-medium tracking-tight text-black mb-8"
                  style={{ fontFamily: "'Comfortaa', cursive, sans-serif" }}
                >
                  Aestific Focus
                </h1>
              </div>

              <div className="space-y-6 text-base sm:text-lg text-zinc-700 leading-relaxed font-light">
                <p>
                  Sometimes, an AI response contains one sentence, one unfamiliar term, or one important idea that deserves a closer look. Asking about it separately can interrupt your workflow or require you to explain the context all over again.
                </p>

                <p>
                  Aestific Focus is designed to make that exploration more natural. It lets you focus on a specific word, sentence, or part of an AI response and ask a follow-up question about it, helping you explore the exact detail that matters to you.
                </p>

                <p>
                  Instead of starting over, you can continue from the point that caught your attention. Understand a concept more clearly, examine an explanation in greater depth, or ask why a particular statement matters—all while keeping the original conversation in context.
                </p>

                <p>
                  Focus is about making curiosity effortless. Every answer can become a starting point for a deeper question, and every question can lead to a clearer understanding.
                </p>

                <p className="font-medium text-black pt-4">
                  Don't just read the answer. Explore what lies within it.
                </p>
              </div>
            </div>
          )}

          {/* MEET THE FOUNDER PAGE (Blank content as requested) */}
          {pageType === 'founder' && (
            <div className="space-y-8 min-h-[50vh]">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-sans block mb-3 font-semibold">
                  leadership
                </span>
                <h1
                  className="text-4xl sm:text-5xl font-medium tracking-tight text-black mb-8"
                  style={{ fontFamily: "'Comfortaa', cursive, sans-serif" }}
                >
                  Meet the Founder
                </h1>
              </div>
              {/* Content intentionally kept blank without invented biography or placeholder text */}
            </div>
          )}

          {/* WHAT'S NEW PAGE (Blank content as requested) */}
          {pageType === 'whats-new' && (
            <div className="space-y-8 min-h-[50vh]">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-sans block mb-3 font-semibold">
                  updates & releases
                </span>
                <h1
                  className="text-4xl sm:text-5xl font-medium tracking-tight text-black mb-8"
                  style={{ fontFamily: "'Comfortaa', cursive, sans-serif" }}
                >
                  What's New
                </h1>
              </div>
              {/* Content intentionally kept blank without invented announcements or placeholder text */}
            </div>
          )}
        </main>
      </motion.div>
    </AnimatePresence>
  );
};
