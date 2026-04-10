import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3 group", className)}>
      <div className="relative h-12 w-14 flex-shrink-0">
        {/* Subtle background glow behind the icon */}
        <div className="absolute inset-0 bg-brand/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <svg
          viewBox="0 0 120 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full relative z-10 drop-shadow-[0_0_12px_rgba(0,255,163,0.4)] group-hover:drop-shadow-[0_0_20px_rgba(0,255,163,0.6)] transition-all duration-500 animate-glow-pulse"
        >
          <defs>
            <linearGradient id="tg-gradient-new" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFA3" />
              <stop offset="50%" stopColor="#00D084" />
              <stop offset="100%" stopColor="#009E66" />
            </linearGradient>
          </defs>

          {/* High-Fidelity TG Monogram */}
          <g transform="skewX(-10) translate(10, 10)">
            {/* The 'T' and 'G' Integrated Shape */}
            <path
              d="M0 0 H85 L80 18 H50 V80 H32 V18 H0 V0ZM55 30 H95 V80 H40 V62 H75 V52 H55 V30Z"
              fill="url(#tg-gradient-new)"
              className="transition-all duration-500"
            />
            
            {/* Pixel Dissolve Effect - Top Right of T-bar */}
            <g className="pixel-dissolve">
              {/* Cluster of squares with varying sizes and opacities */}
              <rect x="88" y="-2" width="6" height="6" fill="#00FFA3" className="animate-pulse opacity-90" />
              <rect x="98" y="2" width="4" height="4" fill="#00D084" className="animate-pulse delay-75 opacity-70" />
              <rect x="92" y="10" width="5" height="5" fill="#00FFA3" className="animate-pulse delay-150 opacity-50" />
              <rect x="106" y="8" width="3" height="3" fill="#009E66" className="animate-pulse delay-300 opacity-40" />
              <rect x="85" y="-12" width="4" height="4" fill="#00FFA3" className="animate-pulse delay-500 opacity-60" />
              <rect x="112" y="-2" width="5" height="5" fill="#00D084" className="animate-pulse delay-200 opacity-30" />
              <rect x="102" y="-8" width="3" height="3" fill="#00FFA3" className="animate-pulse delay-100 opacity-20" />
              <rect x="118" y="4" width="4" height="4" fill="#00FFA3" className="animate-pulse delay-400 opacity-15" />
              <rect x="95" y="-15" width="2" height="2" fill="#00FFA3" className="animate-pulse delay-700 opacity-10" />
            </g>
          </g>
        </svg>
      </div>

      {showText && (
        <div className="hidden md:flex flex-col justify-center -space-y-2 transform skew-x-[-10deg] origin-left transition-all duration-500 group-hover:translate-x-1 group-hover:skew-x-[-12deg]">
          <span className="text-[12px] font-heading font-black tracking-[0.4em] text-white uppercase opacity-90 group-hover:opacity-100 transition-all duration-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            THE CAPITAL
          </span>
          <span className="text-4xl font-heading font-black tracking-tighter text-white uppercase leading-none drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] group-hover:text-brand transition-colors duration-500">
            GURU
          </span>
        </div>
      )}
    </div>
  );
}
