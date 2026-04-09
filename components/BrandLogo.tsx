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
          <filter id="coreGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Orbital Rings - Representing Systems & Infrastructure */}
        <circle 
          cx="50" cy="50" r="45" 
          fill="none" 
          stroke="url(#nexusGradient)" 
          strokeWidth="0.5" 
          strokeDasharray="2 8"
          className="opacity-20"
        >
          <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="30s" repeatCount="indefinite" />
        </circle>

        {/* The Nexus Shards - Geometric & Unique */}
        <g className="opacity-90">
          {/* Top Shard */}
          <path 
            d="M50 15 L65 35 L50 42 L35 35 Z" 
            fill="url(#nexusGradient)" 
            className="group-hover:translate-y-[-2px] transition-transform duration-500"
          />
          {/* Bottom Shard */}
          <path 
            d="M50 85 L65 65 L50 58 L35 65 Z" 
            fill="url(#nexusGradient)" 
            className="group-hover:translate-y-[2px] transition-transform duration-500"
          />
          {/* Left Shard */}
          <path 
            d="M15 50 L35 35 L42 50 L35 65 Z" 
            fill="url(#nexusGradient)" 
            className="group-hover:translate-x-[-2px] transition-transform duration-500"
          />
          {/* Right Shard */}
          <path 
            d="M85 50 L65 35 L58 50 L65 65 Z" 
            fill="url(#nexusGradient)" 
            className="group-hover:translate-x-[2px] transition-transform duration-500"
          />
        </g>

        {/* The Intelligence Core */}
        <circle 
          cx="50" cy="50" r="12" 
          fill="white" 
          filter="url(#coreGlow)"
          className="opacity-90"
        >
          <animate attributeName="r" values="11;13;11" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* Neural Synapse Points */}
        <g fill="white">
          <circle cx="50" cy="15" r="2" className="animate-pulse" />
          <circle cx="50" cy="85" r="2" className="animate-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="15" cy="50" r="2" className="animate-pulse" style={{ animationDelay: '2s' }} />
          <circle cx="85" cy="50" r="2" className="animate-pulse" style={{ animationDelay: '3s' }} />
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
