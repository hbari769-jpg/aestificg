import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  X,
  MessageSquare,
  Code2,
  Search,
  Image as ImageIcon,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Check,
  Copy,
  Globe,
  ShieldCheck,
  Calendar,
  MapPin,
  GraduationCap,
  Layers,
  Terminal,
  Cpu,
  Compass,
} from 'lucide-react';
import { AestificArchIcon } from './AestificLogo';
import { AestificEnhanceLogo } from './AestificEnhanceLogo';
import { DotHandArtwork } from './DotHandArtwork';
import { DocumentsView, DocTab, DOC_ITEMS } from './DocumentsView';
import { WhatsNewBlankPage } from './WhatsNewBlankPage';
import { FounderProfilePage } from './FounderProfilePage';

interface StaticLandingPageProps {
  user: any;
  onGetStarted: () => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onStartWithPrompt: (prompt: string) => void;
  onSelectView: (view: any) => void;
}

export const StaticLandingPage: React.FC<StaticLandingPageProps> = ({
  user,
  onGetStarted,
  onOpenAuth,
  onStartWithPrompt,
  onSelectView,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [docModalTab, setDocModalTab] = useState<DocTab | null>('about');
  const [showDocModal, setShowDocModal] = useState(false);
  const [showWhatsNew, setShowWhatsNew] = useState(false);
  const [showMeetFounder, setShowMeetFounder] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openDoc = (tab: DocTab) => {
    setDocModalTab(tab);
    setShowDocModal(true);
  };
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStorySection, setActiveStorySection] = useState<'what-is-aestific' | 'enhance' | 'focus' | 'founder'>('what-is-aestific');

  // Interactive Demo States for "What is Aestific"
  const [activeCapability, setActiveCapability] = useState<'chat' | 'code' | 'research' | 'image'>('chat');

  // Interactive Demo States for "Aestific Enhance"
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedState, setEnhancedState] = useState<boolean[]>([false, false, false]);

  const enhanceExamples = [
    {
      title: 'Bengali Essay',
      rough: 'write an essay about cows.',
      enhanced:
        'write a well-organized bengali school essay about the cow (গরু). include an appropriate title, an introduction, the cow’s appearance, food and habitat, its importance in agriculture, the milk and other benefits it provides, its role in rural life, and a conclusion. use simple, grammatically correct bengali suitable for school students.',
    },
    {
      title: 'Fullstack System',
      rough: 'build a modern responsive landing page in react',
      enhanced:
        'architect a production-grade responsive landing page in React 19 and Tailwind CSS. prioritize minimal black-and-white visual identity, smooth scroll-driven storytelling, keyboard accessibility, mobile-friendly navigation, and zero layout shift.',
    },
    {
      title: 'Conceptual Physics',
      rough: 'explain black holes simply',
      enhanced:
        'explain the physics of black holes and spacetime curvature using intuitive, real-world analogies. break down the event horizon, gravitational pull, and Hawking radiation into lucid, structured sections suitable for curious learners without compromising scientific accuracy.',
    },
  ];

  // Interactive Demo States for "Aestific Focus"
  const [selectedFocusTerm, setSelectedFocusTerm] = useState<string | null>('event horizon');
  const [focusActiveAction, setFocusActiveAction] = useState<string | null>('explain');

  // Smooth scroll handler & section detection
  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    if (max > 0) {
      setScrollProgress(Math.min(1, Math.max(0, el.scrollTop / max)));
    }

    // Detect active section for subnav indicator
    const whatEl = el.querySelector('#section-what-is-aestific') as HTMLElement | null;
    const enhanceEl = el.querySelector('#section-enhance') as HTMLElement | null;
    const focusEl = el.querySelector('#section-focus') as HTMLElement | null;
    const founderEl = el.querySelector('#section-founder') as HTMLElement | null;

    const scrollPos = el.scrollTop + 260;

    if (founderEl && scrollPos >= founderEl.offsetTop) {
      setActiveStorySection('founder');
    } else if (focusEl && scrollPos >= focusEl.offsetTop) {
      setActiveStorySection('focus');
    } else if (enhanceEl && scrollPos >= enhanceEl.offsetTop) {
      setActiveStorySection('enhance');
    } else if (whatEl && scrollPos >= whatEl.offsetTop - 140) {
      setActiveStorySection('what-is-aestific');
    }
  }, []);

  const scrollToSection = (id: string) => {
    const el = containerRef.current;
    if (!el) return;
    const target = el.querySelector(`#${id}`) as HTMLElement;
    if (target) {
      el.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const navItems = [
    {
      id: 'explore',
      label: 'explore',
      links: [
        { label: 'ai chat', targetId: 'section-what-is-aestific' },
        { label: 'coding & reasoning', targetId: 'section-what-is-aestific' },
        { label: 'web research', targetId: 'section-what-is-aestific' },
        { label: 'image generation', targetId: 'section-what-is-aestific' },
      ],
    },
    {
      id: 'create',
      label: 'create',
      links: [
        { label: 'aestific enhance', targetId: 'section-enhance' },
        { label: 'prompt improvement', targetId: 'section-enhance' },
        { label: 'aestific focus', targetId: 'section-focus' },
      ],
    },
    {
      id: 'discover',
      label: 'discover',
      links: [
        { label: 'what is aestific?', action: () => openDoc('about') },
        { label: 'founder story', targetId: 'section-founder' },
        { label: "what's new", action: () => onSelectView?.('whatsNew') },
      ],
    },
  ];

  // Story sections config for sub-navigation below hero
  const storySubNav = [
    { id: 'section-what-is-aestific', key: 'what-is-aestific', label: 'what is aestific' },
    { id: 'section-enhance', key: 'enhance', label: 'aestific enhance' },
    { id: 'section-focus', key: 'focus', label: 'aestific focus' },
    { id: 'section-founder', key: 'founder', label: 'meet the founder' },
  ];

  const getSubNavIndex = () => {
    switch (activeStorySection) {
      case 'what-is-aestific':
        return 0;
      case 'enhance':
        return 1;
      case 'focus':
        return 2;
      case 'founder':
        return 3;
      default:
        return 0;
    }
  };

  const handleTriggerEnhance = () => {
    setIsEnhancing(true);
    setTimeout(() => {
      setEnhancedState((prev) => {
        const next = [...prev];
        next[selectedPromptIndex] = true;
        return next;
      });
      setIsEnhancing(false);
    }, 900);
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="fixed inset-0 w-full h-full bg-white text-zinc-950 font-['Comfortaa'] overflow-y-scroll overflow-x-hidden selection:bg-zinc-800 selection:text-white"
      style={{
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-y',
        scrollBehavior: 'smooth',
      }}
    >
      {/* 1px Minimal Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-zinc-200/50 z-50 pointer-events-none">
        <div
          className="h-full bg-black transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Persistent Top Navigation Bar */}
      <header className="fixed top-0 inset-x-0 h-20 px-6 sm:px-12 flex items-center justify-between z-40 bg-white/80 backdrop-blur-md border-b border-zinc-100 transition-all">
        {/* Brand Logo & Wordmark */}
        <div
          onClick={() => scrollToSection('scene-hero')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <img
            src="/aestific-icon-dark.png"
            alt="Aestific"
            className="w-6 h-6 object-contain transition-transform group-hover:scale-105"
          />
          <img
            src="/aestific-wordmark-dark.png"
            alt="aestific"
            className="h-4 sm:h-[18px] w-auto object-contain"
          />
        </div>

        {/* Desktop Navigation (Strictly Preserved for Desktop Accuracy) */}
        <nav className="hidden md:flex items-center gap-6 sm:gap-9">
          {navItems.map((item) => (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.id)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                className="text-sm font-medium lowercase text-zinc-600 hover:text-black transition-colors py-2 cursor-pointer flex items-center gap-1"
              >
                <span>{item.label}</span>
              </button>

              {/* Large, Comfortable Dropdown Menu */}
              <AnimatePresence>
                {openDropdown === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                  >
                    <div className="bg-white border border-zinc-200/90 rounded-2xl shadow-2xl w-64 p-2 overflow-hidden">
                      {item.links.map((link) => (
                        <button
                          key={link.label}
                          type="button"
                          onClick={() => {
                            if (link.action) {
                              link.action();
                            } else if (link.targetId) {
                              scrollToSection(link.targetId);
                            }
                            setOpenDropdown(null);
                          }}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-xs sm:text-sm text-zinc-700 hover:text-black hover:bg-zinc-100/80 lowercase transition-colors flex items-center justify-between ${
                            link.action || link.targetId ? 'cursor-pointer' : 'cursor-default'
                          }`}
                        >
                          <span>{link.label}</span>
                          {link.action && (
                            <span className="text-[10px] text-zinc-400 font-sans uppercase tracking-wider">view</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Primary Action Button */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={onGetStarted}
              className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              get started
            </button>
            <button
              type="button"
              onClick={() => onOpenAuth('login')}
              className="mt-1 text-[11px] text-zinc-400 hover:text-black transition-colors cursor-pointer lowercase select-none"
            >
              already have an account?
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Trigger & Action */}
        <div className="flex md:hidden items-center gap-3">
          <button
            type="button"
            onClick={onGetStarted}
            className="px-3.5 py-1.5 rounded-full bg-black text-white text-xs font-medium hover:bg-zinc-800 transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            get started
          </button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <span className="text-lg font-bold">×</span>
            ) : (
              <span className="flex flex-col gap-1 w-4">
                <span className="h-0.5 w-full bg-zinc-800 rounded-full" />
                <span className="h-0.5 w-full bg-zinc-800 rounded-full" />
                <span className="h-0.5 w-full bg-zinc-800 rounded-full" />
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Slide-Down Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 inset-x-0 bg-white border-b border-zinc-200 z-30 md:hidden overflow-hidden shadow-2xl"
          >
            <div className="p-6 space-y-6">
              {navItems.map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    {item.label}
                  </div>
                  <div className="grid grid-cols-1 gap-2 pl-2">
                    {item.links.map((link) => (
                      <button
                        key={link.label}
                        type="button"
                        onClick={() => {
                          if (link.action) {
                            link.action();
                          } else if (link.targetId) {
                            scrollToSection(link.targetId);
                          }
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-left text-sm font-medium text-zinc-800 hover:text-black py-1.5 lowercase"
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-zinc-100 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full py-2.5 rounded-xl text-center text-xs text-zinc-600 bg-zinc-100 font-medium lowercase"
                >
                  already have an account? sign in
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (PURE WHITE, AIRY, MINIMAL)                               */}
      {/* ========================================================================= */}
      <section
        id="scene-hero"
        className="relative min-h-[90dvh] w-full flex flex-col justify-between pt-16 pb-10 px-6 sm:px-12 bg-white"
      >
        {/* Subtle Signature Dotted Hand Silhouette Artwork */}
        <DotHandArtwork />

        {/* Center Hero Headlines */}
        <div className="my-auto flex flex-col items-center justify-center text-center max-w-2xl mx-auto z-10 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl md:text-[52px] font-light text-zinc-400 mb-1 sm:mb-2 lowercase tracking-[-0.02em] leading-[1.15]"
          >
            beyond intelligence.
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-[52px] font-medium text-black mb-6 lowercase tracking-[-0.02em] leading-[1.15]"
          >
            into possibility.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-zinc-500 mb-8 max-w-sm lowercase leading-relaxed font-light"
          >
            one place to think, create, and discover what's next.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <button
              type="button"
              onClick={onGetStarted}
              className="px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-black text-white text-sm sm:text-base font-medium hover:bg-zinc-800 transition-all active:scale-95 shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>open chat</span>
              <span className="text-zinc-400">↗</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('section-what-is-aestific')}
              className="px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-black text-white text-sm sm:text-base font-medium hover:bg-zinc-800 transition-all active:scale-95 shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>scroll to explore</span>
              <span className="text-zinc-400">↓</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Sticky Sub-Navigation Header Bar (Sticks to top-20 on scroll for both Phone & PC) */}
      <div className="sticky top-20 z-35 bg-white/95 backdrop-blur-md border-b border-zinc-100 shadow-xs py-3 px-6 sm:px-12 w-full">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-3 sm:gap-8 overflow-x-auto no-scrollbar px-2">
            {storySubNav.map((item) => {
              const isActive = activeStorySection === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-xs sm:text-sm font-medium lowercase tracking-wide transition-colors py-2 whitespace-nowrap cursor-pointer ${
                    isActive ? 'text-black font-semibold' : 'text-zinc-500 hover:text-black'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-px left-0 right-0 h-px bg-black"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Thin Progress Track & Moving Underline (dag) */}
          <div className="relative w-full h-[2px] bg-zinc-200/80 mt-1 rounded-full overflow-hidden">
            <div
              className="absolute top-0 bottom-0 bg-black transition-all duration-300 ease-out rounded-full"
              style={{
                left: `${getSubNavIndex() * 25}%`,
                width: '25%',
              }}
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. WHAT IS AESTIFIC? (DEEP BLACK CONTRAST SECTION)                         */}
      {/* ========================================================================= */}
      <section
        id="section-what-is-aestific"
        className="min-h-[100dvh] w-full flex flex-col justify-center py-28 px-6 sm:px-12 bg-black text-white relative transition-colors"
      >
        <div className="max-w-5xl mx-auto w-full">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-sans block mb-3 font-medium">
              platform architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white lowercase mb-5 tracking-tight">
              what is aestific?
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 lowercase leading-relaxed font-light">
              a single, unified intelligence platform bringing multi-turn ai chat, deep reasoning, precise code execution, verified web research, and high-fidelity image generation into one clean, sovereign workspace.
            </p>
          </div>

          {/* Cinematic Interactive Multi-Capability Showcase */}
          <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            {/* Capability Switcher Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-6 border-b border-zinc-800/80">
              {[
                { id: 'chat', label: 'ai chat & reasoning', icon: MessageSquare },
                { id: 'code', label: 'coding & architecture', icon: Code2 },
                { id: 'research', label: 'grounded web research', icon: Search },
                { id: 'image', label: 'picture studio', icon: ImageIcon },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeCapability === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCapability(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium lowercase transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white text-black shadow-lg shadow-white/5 font-semibold'
                        : 'bg-zinc-900/90 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Interactive Demonstration Display */}
            <AnimatePresence mode="wait">
              {activeCapability === 'chat' && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                >
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white lowercase mb-3">
                      conversational depth that never loses context.
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 lowercase leading-relaxed mb-6 font-light">
                      ask multi-layered questions, explore complex systems, or articulate thoughts in any language. aestific handles context continuity across long multi-turn sessions with rigorous accuracy.
                    </p>
                    <div className="flex flex-wrap gap-2 text-[11px] text-zinc-400 lowercase">
                      <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">bengali & english native</span>
                      <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">markdown tables</span>
                      <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">sub-second streaming</span>
                    </div>
                  </div>

                  <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-inner space-y-4 text-xs">
                    <div className="bg-zinc-950 p-4 rounded-xl text-zinc-300 border border-zinc-800/60">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-sans block mb-1">prompt</span>
                      "how do neural networks balance exploration versus exploitation in decision making?"
                    </div>
                    <div className="bg-zinc-950 border border-zinc-800/60 p-4 rounded-xl text-zinc-300 leading-relaxed space-y-2">
                      <div className="flex items-center justify-between text-[11px] pb-1 border-b border-zinc-800/40">
                        <span className="text-white font-medium flex items-center gap-1.5">
                          <AestificArchIcon size={12} className="text-white" />
                          aestific response
                        </span>
                        <span className="text-zinc-500">streaming</span>
                      </div>
                      <p className="text-zinc-300 text-xs leading-relaxed pt-1 font-light">
                        it is governed through policy entropy and temperature sampling. at higher temperatures, probability distributions flatten to explore stochastically; at lower temperatures, the network converges onto the global maximum reward path.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeCapability === 'code' && (
                <motion.div
                  key="code"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                >
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white lowercase mb-3">
                      algorithmic precision with verified code output.
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 lowercase leading-relaxed mb-6 font-light">
                      generate full TypeScript architectures, debug async state, and refactor complex systems step-by-step with clean formatting and no placeholder shortcuts.
                    </p>
                    <div className="flex flex-wrap gap-2 text-[11px] text-zinc-400 lowercase">
                      <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">strict typescript</span>
                      <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">zero lint warnings</span>
                      <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">single-click copy</span>
                    </div>
                  </div>

                  <div className="bg-zinc-950 text-white rounded-2xl p-5 font-mono text-xs shadow-xl border border-zinc-800">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80 text-[11px] text-zinc-400 font-sans">
                      <span className="font-mono text-zinc-300">pipeline.ts</span>
                      <span className="text-emerald-400 font-medium">0 errors</span>
                    </div>
                    <pre className="overflow-x-auto text-zinc-300 leading-relaxed">
                      <code>{`export async function orchestrateReasoning(
  intent: Intent,
  context: Context
): Promise<NeuralResolution> {
  const verifiedHypothesis = await evaluateGrounding(intent);
  return {
    state: "optimal",
    solution: synthesizeStepByStep(verifiedHypothesis),
  };
}`}</code>
                    </pre>
                  </div>
                </motion.div>
              )}

              {activeCapability === 'research' && (
                <motion.div
                  key="research"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                >
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white lowercase mb-3">
                      real-time live grounding without hallucinations.
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 lowercase leading-relaxed mb-6 font-light">
                      queries the web live to verify facts, cross-examine global publications, and present verified citation pills you can click and inspect instantly.
                    </p>
                    <div className="flex flex-wrap gap-2 text-[11px] text-zinc-400 lowercase">
                      <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">live web grounding</span>
                      <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">source citations</span>
                    </div>
                  </div>

                  <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 text-xs space-y-3">
                    <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
                      <Search className="w-3.5 h-3.5 text-zinc-300" />
                      <span>live query: "next-generation battery density solid-state 2026"</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-300 text-[10px] flex items-center gap-1">
                        nature.com <ExternalLink className="w-2.5 h-2.5" />
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-300 text-[10px] flex items-center gap-1">
                        mit.edu <ExternalLink className="w-2.5 h-2.5" />
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-300 text-[10px] flex items-center gap-1">
                        arxiv.org <ExternalLink className="w-2.5 h-2.5" />
                      </span>
                    </div>
                    <p className="text-zinc-300 text-xs leading-relaxed pt-2 font-light">
                      commercial qualification achieves 500 Wh/kg density with silicon-composite anodes and lithium metal architectures, maintaining thermal resilience up to 120°C.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeCapability === 'image' && (
                <motion.div
                  key="image"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                >
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white lowercase mb-3">
                      picture studio directly inside your conversation.
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 lowercase leading-relaxed mb-6 font-light">
                      no leaving the chat or using external tools. type `/image` with any descriptive prompt and receive high-resolution imagery rendered natively.
                    </p>
                    <div className="flex flex-wrap gap-2 text-[11px] text-zinc-400 lowercase">
                      <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">1:1 • 16:9 • 9:16</span>
                      <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">native in chat</span>
                    </div>
                  </div>

                  <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 text-xs space-y-3">
                    <div className="font-mono text-zinc-300 bg-zinc-950 p-3 rounded-xl text-[11px] border border-zinc-800/60">
                      <span className="text-zinc-500">/image </span>
                      a minimalist architectural pavilion in morning fog, clean geometric concrete, 8k
                    </div>
                    <div className="aspect-16/9 bg-zinc-950 rounded-xl flex items-center justify-center text-zinc-500 border border-zinc-800/60">
                      <div className="text-center">
                        <ImageIcon className="w-6 h-6 mx-auto mb-1 text-zinc-400" />
                        <span className="text-[10px] uppercase font-sans tracking-wider text-zinc-400 block">
                          high-resolution synthesis
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. AESTIFIC ENHANCE (PRISTINE WHITE SECTION)                              */}
      {/* ========================================================================= */}
      <section
        id="section-enhance"
        className="min-h-[100dvh] w-full flex flex-col justify-center py-28 px-6 sm:px-12 bg-white text-zinc-950 border-t border-zinc-100 relative"
      >
        <div className="max-w-5xl mx-auto w-full">
          {/* Section Header with Official Rotating O-Ring */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="mb-6 flex justify-center">
              <AestificEnhanceLogo
                size={76}
                isRotating={true}
                showRings={true}
                ringIntensity={1}
                theme="light"
                showWordmark={false}
              />
            </div>
            <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-sans block mb-2 font-medium">
              signature capability
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-black lowercase mb-4 tracking-tight">
              aestific enhance
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 lowercase leading-relaxed font-light">
              transforms rough, brief thoughts into comprehensive, context-aware prompts. it analyzes user intent, conversation history, and preferred communication style without ever fabricating requirements.
            </p>
          </div>

          {/* Interactive Transformation Station */}
          <div className="bg-zinc-50/70 border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            {/* Prompt Selector Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-zinc-200/80 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400 lowercase mr-1">sample prompt:</span>
                {enhanceExamples.map((ex, idx) => (
                  <button
                    key={ex.title}
                    type="button"
                    onClick={() => setSelectedPromptIndex(idx)}
                    className={`px-3 py-1 rounded-full text-xs font-medium lowercase transition-colors cursor-pointer ${
                      selectedPromptIndex === idx
                        ? 'bg-black text-white'
                        : 'bg-white text-zinc-600 hover:text-black border border-zinc-200'
                    }`}
                  >
                    {ex.title}
                  </button>
                ))}
              </div>

              {/* Trigger Button */}
              <button
                type="button"
                onClick={handleTriggerEnhance}
                disabled={isEnhancing}
                className="px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isEnhancing ? 'enhancing...' : 'click to enhance'}</span>
              </button>
            </div>

            {/* Before & After Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Rough Input */}
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-3 lowercase">
                    <span>before (rough prompt)</span>
                    <span>raw user input</span>
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-zinc-900 leading-relaxed">
                    "{enhanceExamples[selectedPromptIndex].rough}"
                  </p>
                </div>
                <div className="pt-4 text-[11px] text-zinc-400 lowercase border-t border-zinc-100 mt-4">
                  minimal context • vague requirements
                </div>
              </div>

              {/* Enhanced Output */}
              <div className="bg-zinc-950 text-white border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-md">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-blue-400 mb-3 lowercase">
                    <span className="flex items-center gap-1 font-semibold">
                      <Sparkles className="w-3 h-3" /> after (enhanced with context)
                    </span>
                    <span className="text-zinc-400 font-sans">ready to send</span>
                  </div>

                  <div className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-light">
                    {enhancedState[selectedPromptIndex] ? (
                      <p>{enhanceExamples[selectedPromptIndex].enhanced}</p>
                    ) : (
                      <div className="text-zinc-500 italic py-4 text-xs font-sans">
                        click "click to enhance" above to watch this prompt transform with structural depth, tone, and full semantic intent.
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between text-[11px] text-zinc-400 border-t border-zinc-800/80 mt-4 lowercase">
                  <span>preserves original meaning</span>
                  <span className="text-blue-400 font-medium">editable by user</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. AESTIFIC FOCUS (DEEP BLACK CONTRAST SECTION)                            */}
      {/* ========================================================================= */}
      <section
        id="section-focus"
        className="min-h-[100dvh] w-full flex flex-col justify-center py-28 px-6 sm:px-12 bg-black text-white border-t border-zinc-900 relative transition-colors"
      >
        <div className="max-w-5xl mx-auto w-full">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-sans block mb-2 font-medium">
              granular contextual inquiry
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white lowercase mb-4 tracking-tight">
              aestific focus
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 lowercase leading-relaxed font-light">
              select any word, sentence, or claim from an ai response to instantly reveal a contextual focus toolbar. explore, explain, translate, or fact-check that exact thought without breaking your conversation flow.
            </p>
          </div>

          {/* Interactive Aestific Focus Demonstration */}
          <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {/* Focus Step Description */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-zinc-800 mb-6 text-xs text-zinc-400 lowercase">
              <div>
                <span className="font-medium text-white">interactive simulation: </span>
                click a highlighted term below to see the real Aestific Focus toolbar trigger
              </div>
              <div className="flex items-center gap-1.5">
                {['event horizon', 'gravitational singularity', 'spacetime curvature'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setSelectedFocusTerm(term);
                      setFocusActiveAction('explain');
                    }}
                    className={`px-3 py-1 rounded-full text-[11px] transition-colors cursor-pointer ${
                      selectedFocusTerm === term
                        ? 'bg-white text-black font-semibold'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                    }`}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Mock Response with Floating Focus Toolbar */}
            <div className="relative bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-inner">
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-4 pb-2 border-b border-zinc-800/60">
                <span className="font-medium text-white flex items-center gap-1.5">
                  <AestificArchIcon size={12} className="text-white" />
                  aestific response
                </span>
                <span>focus active</span>
              </div>

              {/* Message text with active highlighted term */}
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed mb-6 font-light">
                in general relativity, the{' '}
                <span className="bg-blue-900/60 text-blue-200 border-b-2 border-blue-400 px-1.5 py-0.5 rounded font-medium cursor-pointer">
                  {selectedFocusTerm || 'event horizon'}
                </span>{' '}
                is the threshold beyond which gravity becomes so intense that nothing, not even photons, can escape. deep within lies the{' '}
                <span className="text-zinc-500">gravitational singularity</span>, where classical equations cease to describe{' '}
                <span className="text-zinc-500">spacetime curvature</span>.
              </p>

              {/* Exact Reproduction of Aestific Focus Floating Selection Toolbar */}
              <div className="inline-flex items-center gap-1 bg-zinc-950 text-white px-3 py-1.5 rounded-full shadow-2xl border border-zinc-700/80 mb-6">
                <button
                  type="button"
                  onClick={() => setFocusActiveAction('reply')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                    focusActiveAction === 'reply' ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-zinc-400'
                  }`}
                >
                  <span className="text-blue-400 font-bold">↩</span>
                  <span>reply</span>
                </button>

                <div className="w-px h-3 bg-zinc-800 mx-0.5" />

                <button
                  type="button"
                  onClick={() => setFocusActiveAction('explain')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                    focusActiveAction === 'explain' ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-zinc-400'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>explain this</span>
                </button>

                <div className="w-px h-3 bg-zinc-800 mx-0.5" />

                <button
                  type="button"
                  onClick={() => setFocusActiveAction('translate')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                    focusActiveAction === 'translate' ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-zinc-400'
                  }`}
                >
                  <Globe className="w-3 h-3 text-emerald-400" />
                  <span>translate</span>
                </button>

                <div className="w-px h-3 bg-zinc-800 mx-0.5" />

                <button
                  type="button"
                  onClick={() => setFocusActiveAction('verify')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                    focusActiveAction === 'verify' ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-zinc-400'
                  }`}
                >
                  <ShieldCheck className="w-3 h-3 text-red-400" />
                  <span>verify</span>
                </button>
              </div>

              {/* Result Preview Box reflecting the selected Focus Action */}
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-4 text-xs font-light">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-sans mb-1 font-medium">
                  focus action output: {focusActiveAction}
                </div>
                {focusActiveAction === 'explain' && (
                  <p className="text-zinc-300 leading-relaxed">
                    <strong className="text-white font-medium">"{selectedFocusTerm}" Explain this: </strong>
                    An event horizon acts as a one-way boundary. To an outside observer, an object falling inward appears to slow down infinitely due to gravitational redshift, never crossing in finite external time.
                  </p>
                )}
                {focusActiveAction === 'verify' && (
                  <p className="text-zinc-300 leading-relaxed">
                    <strong className="text-white font-medium">"{selectedFocusTerm}" Verify it: </strong>
                    <span className="text-emerald-400 font-medium">Factually Verified: </span>
                    According to Einstein's field equations and the Schwarzschild metric, the event horizon radius is strictly $r_s = 2GM/c^2$. The statement is scientifically sound and logically correct.
                  </p>
                )}
                {focusActiveAction === 'translate' && (
                  <p className="text-zinc-300 leading-relaxed">
                    <strong className="text-white font-medium">"{selectedFocusTerm}" Translated into Bengali: </strong>
                    "ঘটনা দিগন্ত" (Event Horizon) — ব্ল্যাক হোলের চারপাশের এমন এক অদৃশ্য সীমানা যেখান থেকে আলো পর্যন্ত বের হতে পারে না।
                  </p>
                )}
                {focusActiveAction === 'reply' && (
                  <p className="text-zinc-300 leading-relaxed">
                    <strong className="text-white font-medium">Quoted for reply: </strong>
                    `"{selectedFocusTerm}"` has been populated into your chat composer for direct follow-up inquiry.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FOUNDER SECTION (MINIMAL FACTUAL INTRODUCTION)                         */}
      {/* ========================================================================= */}
      <section
        id="section-founder"
        className="min-h-[100dvh] w-full flex flex-col justify-center py-28 px-6 sm:px-12 bg-white text-zinc-950 border-t border-zinc-100 relative"
      >
        <div className="max-w-2xl mx-auto w-full text-center">
          {/* Section Subtitle */}
          <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-sans block mb-5 font-medium">
            meet the founder
          </span>

          {/* Founder Photograph (Centered, small, refined) */}
          <div className="mb-6 flex justify-center">
            <div className="overflow-hidden rounded-2xl border border-zinc-200/80 shadow-md bg-zinc-100 w-40 sm:w-48 aspect-[4/3] group">
              <img
                src="/founder-colonnade.png"
                alt="Atif Al Wasi, Founder of Aestific"
                className="w-full h-full object-cover object-center grayscale contrast-[1.05] transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* Founder Identity */}
          <h2 className="text-3xl sm:text-5xl font-bold text-black lowercase mb-2 tracking-tight">
            Atif Al Wasi
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 lowercase font-medium mb-10">
            Founder of Aestific
          </p>

          {/* Clean, Minimal Facts Card */}
          <div className="bg-zinc-50/80 border border-zinc-200/80 rounded-3xl p-8 sm:p-10 shadow-xs text-left max-w-xl mx-auto">
            <ul className="space-y-4 text-sm sm:text-base text-zinc-800">
              <li className="flex items-start gap-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                <span className="leading-relaxed">Built Aestific at age 14.</span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                <span className="leading-relaxed">Student at Rajuk Uttara Model College.</span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                <span className="leading-relaxed">Based in Dhaka, Bangladesh.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FINAL SCENE — ESSENTIAL: WELCOME TO THE AESTIFIC ERA -> BRAND REVEAL   */}
      {/* ========================================================================= */}
      <section
        id="section-finale"
        className="min-h-[100dvh] w-full flex flex-col items-center justify-center py-32 px-6 sm:px-12 border-t border-zinc-100 text-center relative bg-white"
      >
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center my-auto">
          {/* Step 1: Elegant text reveal first */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="text-2xl sm:text-3xl md:text-4xl font-light text-zinc-400 lowercase mb-12 tracking-tight"
            style={{ fontFamily: "'Comfortaa', cursive, sans-serif" }}
          >
            welcome to the aestific era
          </motion.p>

          {/* Step 2: Smooth transition into final brand reveal (logo + wordmark) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center"
          >
            {/* Authentic Official Aestific Logo & Wordmark */}
            <div className="mb-8 flex flex-col items-center justify-center">
              <img
                src="/aestific-logo-dark.png"
                alt="aestific"
                className="w-48 sm:w-64 h-auto object-contain select-none"
              />
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onGetStarted}
              className="px-9 py-4 rounded-full bg-black text-white text-sm sm:text-base font-medium hover:bg-zinc-800 transition-all active:scale-95 shadow-lg cursor-pointer flex items-center gap-2.5 mb-6"
            >
              <span>open chat</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <span className="text-xs text-zinc-400 lowercase font-light">
              free guest session • sign in to save your thinking
            </span>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PREMIUM BLACK FOOTER                                                    */}
      {/* ========================================================================= */}
      <footer className="w-full bg-black text-white border-t border-zinc-900 pt-20 pb-14 px-6 sm:px-12 z-20 relative font-['Comfortaa']">
        <div className="max-w-6xl mx-auto w-full">
          {/* Top Brand Identity in Footer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-12 border-b border-zinc-900">
            <div
              onClick={() => scrollToSection('scene-hero')}
              className="flex items-center gap-3 cursor-pointer select-none group"
            >
              <img
                src="/aestific-icon-white.png"
                alt="Aestific"
                className="w-7 h-7 object-contain transition-transform group-hover:scale-105"
              />
              <img
                src="/aestific-wordmark-white.png"
                alt="aestific"
                className="h-5 sm:h-6 w-auto object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 lowercase max-w-sm font-light leading-relaxed">
              beyond intelligence. into possibility.
            </p>
          </div>

          {/* 4-Column Navigation Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 py-14">
            {/* Column 1: EXPLORE */}
            <div>
              <h3 className="text-[11px] uppercase font-sans tracking-[0.22em] text-zinc-400 font-semibold mb-5">
                explore
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('section-what-is-aestific')}
                    className="text-zinc-400 hover:text-white transition-colors lowercase cursor-pointer text-left"
                  >
                    what is aestific?
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('section-what-is-aestific')}
                    className="text-zinc-400 hover:text-white transition-colors lowercase cursor-pointer text-left"
                  >
                    ai capabilities
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('section-enhance')}
                    className="text-zinc-400 hover:text-white transition-colors lowercase cursor-pointer text-left"
                  >
                    aestific enhance
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('section-focus')}
                    className="text-zinc-400 hover:text-white transition-colors lowercase cursor-pointer text-left"
                  >
                    aestific focus
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: DISCOVER */}
            <div>
              <h3 className="text-[11px] uppercase font-sans tracking-[0.22em] text-zinc-400 font-semibold mb-5">
                discover
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => openDoc('about')}
                    className="text-zinc-400 hover:text-white transition-colors lowercase cursor-pointer text-left"
                  >
                    about aestific
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setShowMeetFounder(true)}
                    className="text-zinc-400 hover:text-white transition-colors lowercase cursor-pointer text-left"
                  >
                    meet the founder
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setShowWhatsNew(true)}
                    className="text-zinc-400 hover:text-white transition-colors lowercase cursor-pointer text-left"
                  >
                    what's new
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openDoc('about')}
                    className="text-zinc-400 hover:text-white transition-colors lowercase cursor-pointer text-left"
                  >
                    documentation
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: RESOURCES */}
            <div>
              <h3 className="text-[11px] uppercase font-sans tracking-[0.22em] text-zinc-400 font-semibold mb-5">
                resources
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm">
                <li>
                  <button
                    type="button"
                    onClick={onGetStarted}
                    className="text-zinc-400 hover:text-white transition-colors lowercase cursor-pointer text-left"
                  >
                    getting started
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectView) {
                        onSelectView('support');
                      }
                    }}
                    className="text-zinc-400 hover:text-white transition-colors lowercase cursor-pointer text-left"
                  >
                    help & support
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: LEGAL */}
            <div>
              <h3 className="text-[11px] uppercase font-sans tracking-[0.22em] text-zinc-400 font-semibold mb-5">
                legal
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => openDoc('privacy')}
                    className="text-zinc-400 hover:text-white transition-colors lowercase cursor-pointer text-left"
                  >
                    privacy policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openDoc('terms')}
                    className="text-zinc-400 hover:text-white transition-colors lowercase cursor-pointer text-left"
                  >
                    terms of service
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright and Subtle Divider */}
          <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 lowercase gap-4">
            <p>© {new Date().getFullYear()} aestific. all rights reserved.</p>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => scrollToSection('scene-hero')}
                className="hover:text-zinc-300 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>back to top</span>
                <span>↑</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* FULL-SCREEN DOCUMENTATION & LEGAL VIEWER OVERLAY                          */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showDocModal && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white text-zinc-950 flex flex-col overflow-hidden font-sans"
          >
            <header className="h-16 px-6 border-b border-zinc-200 bg-white/90 backdrop-blur-md flex items-center justify-between shrink-0 font-['Comfortaa']">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowDocModal(false)}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-700 hover:text-black hover:bg-zinc-100 transition-colors border border-zinc-200 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>back to landing</span>
                </button>
                <span className="text-sm font-medium lowercase tracking-wider text-zinc-400">
                  {docModalTab ? (DOC_ITEMS.find((d) => d.id === docModalTab)?.label.toLowerCase() || 'document') : 'documentation'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowDocModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-100 text-zinc-500 hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-6 sm:p-10 max-w-4xl mx-auto w-full">
              <DocumentsView
                initialDoc={docModalTab}
                currentDoc={docModalTab}
                onDocChange={(doc) => setDocModalTab(doc)}
                showHeader={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* What's New — Dedicated Blank Page Overlay */}
      <AnimatePresence>
        {showWhatsNew && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white"
          >
            <WhatsNewBlankPage onClose={() => setShowWhatsNew(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Meet the Founder — Dedicated Full-Screen Profile Page Overlay */}
      <AnimatePresence>
        {showMeetFounder && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white"
          >
            <FounderProfilePage onClose={() => setShowMeetFounder(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
