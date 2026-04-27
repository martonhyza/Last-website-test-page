import React from 'react';

export const LogoMark: React.FC<{ className?: string; glowing?: boolean }> = ({ className = "", glowing = false }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Background Atmosphere */}
      {glowing && (
        <div className="absolute inset-0 bg-indigo-500/20 blur-[30px] rounded-full animate-pulse" />
      )}
      
      <svg viewBox="0 0 100 100" className="relative w-full h-full overflow-visible">
        <defs>
          <linearGradient id="roofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Isometric Cube - Top (Roof Shape) */}
        <path 
          d="M50 15 L85 32 L50 49 L15 32 Z" 
          fill="url(#roofGradient)" 
          className="drop-shadow-lg"
          filter="url(#logoGlow)"
        />
        
        {/* Isometric Cube - Right Face */}
        <path 
          d="M50 49 L85 32 L85 75 L50 92 Z" 
          fill="#312e81" 
          opacity="0.9"
        />
        
        {/* Isometric Cube - Left Face (With Ladder Detail) */}
        <path 
          d="M50 49 L15 32 L15 75 L50 92 Z" 
          fill="#4338ca" 
        />
        
        {/* Ladder Rungs */}
        <g stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4">
          <line x1="25" y1="45" x2="40" y2="53" />
          <line x1="25" y1="55" x2="40" y2="63" />
          <line x1="25" y1="65" x2="40" y2="73" />
        </g>
        
        {/* Central Vertical Connector */}
        <line x1="50" y1="49" x2="50" y2="92" stroke="white" strokeWidth="0.5" opacity="0.2" />
      </svg>
    </div>
  );
};

const BrandLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      <LogoMark className="w-8 h-8 md:w-9 md:h-9" />
      
      <div className="flex flex-col -space-y-1">
        <span className="text-xl md:text-2xl font-bold tracking-tight text-white leading-none">
          Hyza<span className="text-indigo-400">Labs</span>
        </span>
      </div>
    </div>
  );
};

export default BrandLogo;
