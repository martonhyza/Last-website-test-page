import React, { useEffect, useState } from 'react';

const BackgroundParticles: React.FC = () => {
  // We'll generate a few persistent "neural paths" that flash sporadically
  const [paths, setPaths] = useState<any[]>([]);

  useEffect(() => {
    const generatePaths = () => {
      return Array.from({ length: 12 }).map((_, i) => {
        const x1 = Math.random() * 100;
        const y1 = Math.random() * 100;
        // Create erratic points for a lightning look
        const midX = x1 + (Math.random() - 0.5) * 20;
        const midY = y1 + (Math.random() - 0.5) * 20;
        const x2 = midX + (Math.random() - 0.5) * 20;
        const y2 = midY + (Math.random() - 0.5) * 20;

        return {
          id: i,
          d: `M ${x1} ${y1} L ${midX} ${midY} L ${x2} ${y2}`,
          duration: Math.random() * 4 + 2,
          delay: Math.random() * 5,
          opacity: Math.random() * 0.4 + 0.1,
          width: Math.random() * 1.5 + 0.5
        };
      });
    };
    setPaths(generatePaths());
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-black">
      <style>
        {`
          @keyframes flash {
            0%, 100% { opacity: 0; stroke-dashoffset: 100; }
            10%, 15% { opacity: 0.8; stroke-dashoffset: 0; }
            20% { opacity: 0; }
            40% { opacity: 0.3; }
            50% { opacity: 0; stroke-dashoffset: -100; }
          }
          @keyframes ambient-pulse {
            0%, 100% { transform: scale(1); opacity: 0.1; }
            50% { transform: scale(1.1); opacity: 0.2; }
          }
          .neural-strike {
            stroke-dasharray: 100;
            animation: flash linear infinite;
          }
        `}
      </style>

      {/* Ambient background glows that pulse subtly */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] animate-[ambient-pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[120px] animate-[ambient-pulse_10s_ease-in-out_infinite_1s]" />
      </div>

      <svg className="w-full h-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="strike-glow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {paths.map((p) => (
          <path
            key={p.id}
            d={p.d}
            fill="none"
            stroke="#a855f7"
            strokeWidth={p.width}
            className="neural-strike"
            filter="url(#strike-glow)"
            style={{
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* Vertical subtle falling data particles (updated snowball) */}
        {Array.from({ length: 20 }).map((_, i) => (
          <circle
            key={`dot-${i}`}
            cx={Math.random() * 100}
            cy="-5"
            r={Math.random() * 0.4 + 0.1}
            fill="#6366f1"
            opacity="0.3"
          >
            <animate
              attributeName="cy"
              from="-5"
              to="105"
              dur={`${Math.random() * 10 + 10}s`}
              repeatCount="indefinite"
              begin={`${Math.random() * -20}s`}
            />
          </circle>
        ))}
      </svg>
    </div>
  );
};

export default BackgroundParticles;