import React, { useEffect } from 'react';
import BrandLogo from '../components/BrandLogo.tsx';
import BackgroundParticles from '../components/BackgroundParticles.tsx';
import { Link } from 'react-router-dom';

const LegalLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 overflow-x-hidden font-inter relative">
      <BackgroundParticles />
      
      {/* Deep Atmosphere */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <Link to="/">
            <BrandLogo />
          </Link>
          <Link 
            to="/"
            className="px-6 py-2.5 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 text-[10px] font-black uppercase tracking-widest"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic mb-12 text-white">
            {title}
          </h1>
          <div className="prose prose-invert max-w-none prose-p:text-white/60 prose-headings:text-white prose-strong:text-white prose-li:text-white/60">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 relative z-10 bg-black text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <Link to="/">
            <BrandLogo />
          </Link>
          <div className="text-[8px] text-white uppercase tracking-[0.2em] font-bold opacity-40">
            © 2024 Protocol Lab 01-X | Foldeaki Group LLC
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LegalLayout;
