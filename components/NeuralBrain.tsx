
import React from 'react';

const NeuralBrain: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`relative ${className} group`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer Brain Shape */}
        <path 
          d="M50 20 C30 20 15 35 15 55 C15 75 30 85 50 85 C70 85 85 75 85 55 C85 35 70 20 50 20 Z" 
          fill="none" 
          stroke="url(#brainGradient)" 
          strokeWidth="2.5"
          className="animate-pulse"
        />
        
        {/* Neural Connections */}
        <path 
          d="M35 40 Q50 30 65 40 M30 55 Q50 45 70 55 M35 70 Q50 80 65 70" 
          fill="none" 
          stroke="url(#brainGradient)" 
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />
        
        {/* Central Core */}
        <circle cx="50" cy="55" r="4" fill="url(#brainGradient)">
          <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Floating Nodes */}
        <circle cx="25" cy="50" r="1.5" fill="#a855f7" className="animate-bounce" style={{ animationDelay: '0.2s' }} />
        <circle cx="75" cy="50" r="1.5" fill="#6366f1" className="animate-bounce" style={{ animationDelay: '0.5s' }} />
        <circle cx="50" cy="30" r="1.5" fill="#a855f7" className="animate-bounce" style={{ animationDelay: '0.8s' }} />
      </svg>
    </div>
  );
};

export default NeuralBrain;
