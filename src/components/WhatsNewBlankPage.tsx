import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, Sparkles, Calendar, Clock, ExternalLink } from 'lucide-react';
import { authFetch, getAuthMediaUrl } from '../lib/api';

interface WhatsNewItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  status: 'draft' | 'published' | 'unpublished';
  createdAt: string;
  publishedAt?: string;
  updatedAt: string;
}

interface WhatsNewBlankPageProps {
  onClose: () => void;
}

export const WhatsNewBlankPage: React.FC<WhatsNewBlankPageProps> = ({ onClose }) => {
  const [items, setItems] = useState<WhatsNewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublishedUpdates();
  }, []);

  const fetchPublishedUpdates = async () => {
    try {
      setLoading(true);
      const res = await authFetch('/api/whats-new/public');
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (err) {
      console.error('Failed to load published updates:', err);
    } finally {
      setLoading(false);
    }
  };

  const featuredItem = items.length > 0 ? items[0] : null;
  const olderItems = items.length > 1 ? items.slice(1) : [];

  return (
    <div className="fixed inset-0 z-50 bg-white text-zinc-950 flex flex-col overflow-y-auto font-['Comfortaa'] selection:bg-zinc-800 selection:text-white">
      {/* Top Header with Back/Exit controls and Official Aestific Branding */}
      <header className="sticky top-0 h-20 px-6 sm:px-12 border-b border-zinc-100 bg-white/90 backdrop-blur-md flex items-center justify-between shrink-0 z-40">
        {/* Back Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-600 hover:text-black hover:bg-zinc-100 transition-colors border border-zinc-200/80 cursor-pointer"
            aria-label="Back to previous screen"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>back</span>
          </button>
        </div>

        {/* Center: Exact Aestific Logo Icon & Lowercase Wordmark */}
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

        {/* Exit (Close) Button */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-100 text-zinc-400 hover:text-black transition-colors cursor-pointer"
            aria-label="Exit"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-medium lowercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>product releases & updates</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-black lowercase mb-4">
            What's New
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 lowercase leading-relaxed font-light">
            explore the latest architectural refinements, capability upgrades, and intelligence releases from aestific.
          </p>
        </div>

        {loading ? (
          <div className="py-24 text-center text-zinc-400 text-sm lowercase animate-pulse">
            loading updates...
          </div>
        ) : items.length === 0 ? (
          /* Empty State */
          <div className="py-24 text-center border border-zinc-200/80 rounded-3xl bg-zinc-50/50 max-w-xl mx-auto p-10">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center mx-auto mb-4 text-zinc-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 lowercase mb-2">
              Something new is on its way.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 lowercase font-light leading-relaxed">
              we are crafting significant updates. check back soon for our latest releases and notes.
            </p>
          </div>
        ) : (
          <div className="space-y-24">
            {/* 1. FEATURED LATEST UPDATE — FULL-SCREEN FIRST IMPRESSION */}
            {featuredItem && (
              <section className="relative bg-zinc-50/80 border border-zinc-200/90 rounded-3xl overflow-hidden shadow-sm p-6 sm:p-12 transition-all">
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-6 pb-4 border-b border-zinc-200 lowercase">
                  <span className="flex items-center gap-1.5 text-black font-semibold">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    latest release
                  </span>
                  <span className="font-mono">
                    {new Date(featuredItem.publishedAt || featuredItem.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                  {/* Image Display */}
                  {featuredItem.imageUrl ? (
                    <div className="rounded-2xl border border-zinc-200 shadow-md bg-white relative group">
                      <img
                        src={getAuthMediaUrl(featuredItem.imageUrl)}
                        alt={featuredItem.title}
                        className="w-full h-auto rounded-2xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-100 aspect-[16/10] flex items-center justify-center text-zinc-400">
                      <Sparkles className="w-10 h-10" />
                    </div>
                  )}

                  {/* Title & Description */}
                  <div className="flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-4xl font-bold text-black lowercase tracking-tight mb-4 leading-tight">
                      {featuredItem.title}
                    </h2>
                    <div className="text-sm sm:text-base text-zinc-600 lowercase leading-relaxed font-light whitespace-pre-wrap">
                      {featuredItem.description}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 2. PREVIOUS UPDATES BELOW */}
            {olderItems.length > 0 && (
              <section className="space-y-10">
                <h3 className="text-xl font-bold text-black lowercase tracking-tight pb-4 border-b border-zinc-200">
                  previous updates
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {olderItems.map((item) => (
                    <article
                      key={item.id}
                      className="bg-white border border-zinc-200/90 rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between p-6 sm:p-8"
                    >
                      <div>
                        {item.imageUrl && (
                          <div className="rounded-2xl border border-zinc-200/80 mb-6 bg-white">
                            <img
                              src={getAuthMediaUrl(item.imageUrl)}
                              alt={item.title}
                              className="w-full h-auto rounded-2xl"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                            />
                          </div>
                        )}

                        <div className="text-[11px] font-mono text-zinc-400 mb-2">
                          {new Date(item.publishedAt || item.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>

                        <h4 className="text-xl font-bold text-black lowercase mb-3 tracking-tight">
                          {item.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-zinc-600 lowercase leading-relaxed font-light line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400">
                        <span>aestific release note</span>
                        <span className="text-black font-medium lowercase">read official</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-10 px-6 sm:px-12 border-t border-zinc-100 text-center text-xs text-zinc-400 lowercase">
        <p>© {new Date().getFullYear()} aestific. all rights reserved.</p>
      </footer>
    </div>
  );
};
