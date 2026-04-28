import React from 'react';

export const LogoMark: React.FC<{ className?: string; glowing?: boolean }> = ({ className = "", glowing = false }) => {
  return (
    <div className={`relative ${className}`}>
      {/* High-End Background Aura */}
      {glowing && (
        <div className="absolute inset-x-[-20%] inset-y-[-20%] bg-indigo-500/20 blur-[50px] rounded-full animate-pulse z-0" />
      )}
      
      <svg viewBox="0 0 100 100" className="relative w-full h-full overflow-visible z-10 logo-svg">
        <style>{`
          .edge-draw {
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
            animation: drawEdge 3s cubic-bezier(0.4, 0, 0.2, 1) forwards infinite alternate;
          }
          @keyframes drawEdge {
            0% { stroke-dashoffset: 200; opacity: 0; }
            30% { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 1; }
          }
          .face-fade {
            animation: fadeInFace 3s ease-in-out infinite alternate;
          }
          @keyframes fadeInFace {
            0% { opacity: 0; }
            50% { opacity: 0.1; }
            100% { opacity: 0.3; }
          }
        `}</style>
        <defs>
          {/* Futuristic Gradient System */}
          <linearGradient id="cubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c7d2fe" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="cubeL" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>
          <linearGradient id="cubeR" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>

          {/* AI Core Pulse */}
          <radialGradient id="aiCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e0e7ff" />
            <stop offset="40%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        <g className="transition-all duration-700 ease-out group-hover:scale-105">
          {/* Faded Faces (Static) */}
          <path d="M50 15 L85 30 L50 45 L15 30 Z" fill="url(#cubeTop)" className="face-fade" />
          <path d="M50 45 L15 30 L15 75 L50 90 Z" fill="url(#cubeL)" className="face-fade" style={{ animationDelay: '0.5s' }} />
          <path d="M50 45 L85 30 L85 75 L50 90 Z" fill="url(#cubeR)" className="face-fade" style={{ animationDelay: '1s' }} />

          {/* The Ladder (Integrated into the drawing) */}
          <g transform="translate(20, 42)" className="edge-draw" style={{ animationDelay: '1.2s' }}>
            {[0, 8, 16, 24, 32].map((y) => (
              <line key={y} x1="0" y1={y} x2="8" y2={y + 4} stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
            ))}
            <line x1="0" y1="-5" x2="0" y2="35" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />
            <line x1="8" y1="-1" x2="8" y2="39" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />
          </g>

          {/* Isometric Edges (The Drawing Part) */}
          <g fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" className="edge-draw">
            {/* Top Square Edge */}
            <path d="M50 15 L85 30 L50 45 L15 30 Z" strokeOpacity="0.8" />
            
            {/* Vertical Pillars */}
            <path d="M15 30 L15 75" strokeOpacity="0.4" style={{ animationDelay: '0.2s' }} />
            <path d="M50 45 L50 90" strokeOpacity="0.6" style={{ animationDelay: '0.4s' }} />
            <path d="M85 30 L85 75" strokeOpacity="0.4" style={{ animationDelay: '0.6s' }} />

            {/* Bottom Edges */}
            <path d="M15 75 L50 90 L85 75" strokeOpacity="0.8" style={{ animationDelay: '0.8s' }} />
          </g>

          {/* Glowing Accents at Intersections */}
          <g className="animate-pulse">
            <circle cx="50" cy="15" r="1.5" fill="#fff" style={{ filter: 'drop-shadow(0 0 4px #818cf8)' }} />
            <circle cx="50" cy="45" r="1.5" fill="#fff" style={{ filter: 'drop-shadow(0 0 4px #818cf8)' }} />
            <circle cx="50" cy="90" r="1.5" fill="#fff" style={{ filter: 'drop-shadow(0 0 4px #818cf8)' }} />
          </g>

          {/* AI Core - Suspended in the Center */}
          <circle 
            cx="50" 
            cy="52" 
            r="8" 
            fill="url(#aiCore)" 
            opacity="0.3"
            className="animate-pulse"
          />
          <circle 
            cx="50" 
            cy="52" 
            r="1.5" 
            fill="#fff"
            style={{ filter: 'drop-shadow(0 0 8px #fff)' }}
          />
        </g>
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
