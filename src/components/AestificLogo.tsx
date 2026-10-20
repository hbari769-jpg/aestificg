import React from 'react';

export interface AestificLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'hero' | 'sidebar';
  variant?: 'auto' | 'stacked' | 'horizontal' | 'mark-only' | 'hero';
  glow?: boolean;
  showTagline?: boolean;
  showSubtitle?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  color?: string;
}

/**
 * Exact Aestific Brand Icon Emblem from authentic official asset:
 * - Dynamic color: pure black on white backgrounds, pure white on black/dark backgrounds
 */
export const AestificArchIcon: React.FC<{
  className?: string;
  size?: number | string;
  color?: string;
}> = ({ className = '', size = 24, color }) => {
  const isDark = color === 'white' || className.includes('text-white') || className.includes('fill-white');
  const sizeVal = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{
        width: sizeVal,
        height: sizeVal,
        ...(color ? { color } : {}),
      }}
    >
      {/* Light theme: crisp black icon */}
      <img
        src="/aestific-icon-dark.png"
        alt="Aestific"
        className={`w-full h-full object-contain pointer-events-none ${
          isDark ? 'hidden' : 'block dark:hidden'
        }`}
      />
      {/* Dark theme or white requested: crisp white icon */}
      <img
        src="/aestific-icon-white.png"
        alt="Aestific"
        className={`w-full h-full object-contain pointer-events-none ${
          isDark ? 'block' : 'hidden dark:block'
        }`}
      />
    </div>
  );
};

export const AestificMarkIcon = AestificArchIcon;

/**
 * Authentic Aestific lowercase wordmark from the user's official logo image.
 * Renders in pure black in light mode and pure white in dark mode.
 */
export const AestificWordmark: React.FC<{
  className?: string;
  height?: number | string;
  color?: string;
}> = ({ className = '', height = 18, color }) => {
  const isDark = color === 'white' || className.includes('text-white');
  const hStyle = typeof height === 'number' ? `${height}px` : height;

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <img
        src="/aestific-wordmark-dark.png"
        alt="aestific"
        style={{ height: hStyle }}
        className={`w-auto object-contain pointer-events-none ${
          isDark ? 'hidden' : 'block dark:hidden'
        }`}
      />
      <img
        src="/aestific-wordmark-white.png"
        alt="aestific"
        style={{ height: hStyle }}
        className={`w-auto object-contain pointer-events-none ${
          isDark ? 'block' : 'hidden dark:block'
        }`}
      />
    </div>
  );
};

/**
 * Master Aestific Logo Component
 * - Exact reproduction of the brand logo from official asset
 * - Responsive to light/dark themes:
 *   - Background white -> logo & text are pure BLACK
 *   - Background black -> logo & text are pure WHITE
 */
export const AestificLogo: React.FC<AestificLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'auto',
  showSubtitle = false,
  showTagline = false,
  onClick,
  style,
  color,
}) => {
  const isHero = size === 'hero' || variant === 'hero';
  const isLg = size === 'lg';
  const isSm = size === 'sm';
  const isXs = size === 'xs';
  const isSidebar = size === 'sidebar';
  const isMarkOnly = variant === 'mark-only';
  const isStacked = variant === 'stacked' || isHero || isLg;
  const isDark = color === 'white' || className.includes('text-white');

  // Mark-only mode (for compact badges, avatars, quick icons)
  if (isMarkOnly || isXs) {
    return (
      <div
        onClick={onClick}
        style={{ color, ...style }}
        className={`relative inline-flex items-center justify-center select-none ${
          onClick ? 'cursor-pointer' : ''
        } ${className}`}
      >
        <AestificArchIcon
          size={isXs ? 18 : isSm ? 22 : 28}
          color={color}
          className="shrink-0"
        />
      </div>
    );
  }

  // Stacked layout (hero, large badges, modal headers)
  if (isStacked) {
    const imgHeight = isHero ? 'h-24 sm:h-28' : isLg ? 'h-16 sm:h-20' : 'h-12 sm:h-14';
    return (
      <div
        onClick={onClick}
        style={{ color, ...style }}
        className={`relative inline-flex flex-col items-center justify-center select-none transition-transform ${
          onClick ? 'cursor-pointer active:scale-95' : ''
        } ${className}`}
      >
        <img
          src="/aestific-logo-dark.png"
          alt="Aestific"
          className={`${imgHeight} w-auto object-contain pointer-events-none ${
            isDark ? 'hidden' : 'block dark:hidden'
          }`}
        />
        <img
          src="/aestific-logo-white.png"
          alt="Aestific"
          className={`${imgHeight} w-auto object-contain pointer-events-none ${
            isDark ? 'block' : 'hidden dark:block'
          }`}
        />
        {(showSubtitle || showTagline) && (
          <div className="mt-1 flex items-center justify-center">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500">
              AI
            </span>
          </div>
        )}
      </div>
    );
  }

  // Horizontal layout (standard top bars, headers, sidebar)
  const iconSize = isSidebar ? 21 : isSm ? 20 : isLg ? 28 : 24;
  const wordmarkHeight = isSidebar ? 'h-[13.5px]' : isSm ? 'h-3.5' : isLg ? 'h-5' : 'h-4';

  return (
    <div
      onClick={onClick}
      style={{ color, ...style }}
      className={`relative inline-flex flex-row items-center justify-center gap-2 sm:gap-2.5 select-none transition-colors ${
        onClick ? 'cursor-pointer active:scale-95' : ''
      } ${className}`}
    >
      <AestificArchIcon size={iconSize} color={color} />
      <div className="relative flex flex-col items-start justify-center">
        <img
          src="/aestific-wordmark-dark.png"
          alt="aestific"
          className={`${wordmarkHeight} w-auto object-contain pointer-events-none ${
            isDark ? 'hidden' : 'block dark:hidden'
          }`}
        />
        <img
          src="/aestific-wordmark-white.png"
          alt="aestific"
          className={`${wordmarkHeight} w-auto object-contain pointer-events-none ${
            isDark ? 'block' : 'hidden dark:block'
          }`}
        />
        {(showSubtitle || showTagline) && (
          <div className="mt-0.5 flex items-center">
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-500">
              AI
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AestificLogo;
