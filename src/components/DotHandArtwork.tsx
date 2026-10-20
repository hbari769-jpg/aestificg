import React, { useMemo } from 'react';

interface Dot {
  x: number;
  y: number;
  r: number;
  opacity: number;
}

const generateHandDots = (side: 'left' | 'right'): Dot[] => {
  const rows = 14;
  const cols = 9;
  const dots: Dot[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isThumb = side === 'left' ? (r >= 7 && r <= 9 && c >= 6) : (r >= 7 && r <= 9 && c <= 2);
      const isFingers = r >= 0 && r < 5 && c >= 1 && c <= 7;
      const isPalm = r >= 5 && r < 10 && c >= 1 && c <= 7;
      const isWrist = r >= 10 && r < 14 && c >= 2 && c <= 6;

      if (isThumb || isFingers || isPalm || isWrist) {
        // Deterministic hash based on r, c, and side
        const hash = Math.sin((r * 13 + c * 37 + (side === 'left' ? 19 : 71)) * 1.5) * 10000;
        const pseudoRand = hash - Math.floor(hash);

        const density = isFingers ? 0.8 : isPalm ? 0.65 : 0.5;
        if (pseudoRand < density) {
          const x = (side === 'left' ? c : cols - 1 - c) * 24 + 12;
          const y = r * 22 + 12;
          const radius = Number((0.8 + ((pseudoRand * 10) % 1) * 1.2).toFixed(2));
          const opacity = Number((0.25 + ((pseudoRand * 7) % 1) * 0.35).toFixed(2));
          dots.push({ x, y, r: radius, opacity });
        }
      }
    }
  }
  return dots;
};

const HandDots: React.FC<{ side: 'left' | 'right' }> = ({ side }) => {
  const dots = useMemo(() => generateHandDots(side), [side]);

  return (
    <svg
      className="w-full h-full overflow-visible"
      viewBox="0 0 240 330"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {dots.map((dot, idx) => (
        <circle
          key={`${side}-${idx}-${dot.x}-${dot.y}`}
          cx={dot.x}
          cy={dot.y}
          r={dot.r}
          fill="#71717a"
          opacity={dot.opacity}
        />
      ))}
    </svg>
  );
};

export const DotHandArtwork: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-between px-6 sm:px-16 md:px-24 overflow-hidden select-none">
      <div className="w-48 sm:w-64 h-72 sm:h-88 opacity-70">
        <HandDots side="left" />
      </div>
      <div className="w-48 sm:w-64 h-72 sm:h-88 opacity-70">
        <HandDots side="right" />
      </div>
    </div>
  );
};
