import React from 'react';

const NeuralBrain: React.FC<{ className?: string; glowing?: boolean }> = ({ className = "w-10 h-10", glowing = false }) => {
  return (
    <div className={`relative ${className} group`}>
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
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
        
        {/* Outer Ring - Rotation Removed as requested */}
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

export default NeuralBrain;