import React from 'react';

export const LogoMark: React.FC<{ className?: string; glowing?: boolean }> = ({ className = "", glowing = false }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Background Atmosphere */}
      {glowing && (
        <div className="absolute inset-0 bg-indigo-500/10 blur-[40px] rounded-full animate-pulse" />
      )}
      
      <svg viewBox="0 0 100 100" className="relative w-full h-full overflow-visible">
        <defs>
          <linearGradient id="nexusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
          <filter id="ultraGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={glowing ? "4" : "2"} result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Outer Ring */}
        <circle 
          cx="50" cy="50" r="45" 
          fill="none" 
          stroke="url(#nexusGradient)" 
          strokeWidth="1" 
          strokeDasharray="1 4"
          className="opacity-40"
        />
        
        {/* Inner Nexus Shell */}
        <path 
          d="M50 20 A30 30 0 1 1 50 80 A30 30 0 1 1 50 20" 
          fill="none" 
          stroke="url(#nexusGradient)" 
          strokeWidth="4" 
          filter="url(#ultraGlow)"
          className="opacity-80"
          strokeLinecap="round"
        />

        {/* Core Synapse */}
        <circle cx="50" cy="50" r="6" fill="white" filter="url(#ultraGlow)">
          <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Static data bars */}
        <g stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6">
          <line x1="65" y1="40" x2="85" y2="40" />
          <line x1="65" y1="50" x2="90" y2="50" />
          <line x1="65" y1="60" x2="80" y2="60" />
        </g>
      </svg>
    </div>
  );
};

const BrandLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-4 group cursor-pointer ${className}`}>
      <LogoMark className="w-8 h-8 md:w-10 md:h-10" />
      
      <div className="flex flex-col -space-y-1">
        <span className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white leading-none">
          Hyza<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Labs</span>
        </span>
        <span className="text-[7px] font-black uppercase tracking-[0.4em] text-white/20 group-hover:text-indigo-400/50 transition-colors duration-500">
          Autonomous Systems
        </span>
      </div>
    </div>
  );
};

export default BrandLogo;
