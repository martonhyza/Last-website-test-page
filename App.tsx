import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivacyPolicyPage from './pages/PrivacyPolicy.tsx';
import TermsOfServicePage from './pages/TermsOfService.tsx';
import BrandLogo, { LogoMark } from './components/BrandLogo.tsx';
import { 
  Hexagon, 
  ArrowRight, 
  Play, 
  MessageSquare, 
  Zap, 
  ClipboardCheck, 
  Star, 
  ShieldCheck, 
  PhoneCall, 
  CheckCircle2, 
  Layers,
  BarChart3,
  Search,
  Menu,
  X
} from 'lucide-react';

// --- TYPEWRITER PHRASES ---
const PHRASES = [
  "capturing leads while you sleep",
  "responding to emergencies in 2 minutes",
  "turning missed calls into booked service jobs",
  "automating your follow-ups",
  "making you the first roofer they call"
];

// --- HOOKS ---

function useNeuralNetwork(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 40 : 100;
    const maxDistance = 120;
    const mouseRadius = 150;
    let mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = 2;
      }

      update() {
        // Mouse repulsion
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius;
          const ax = (dx / dist) * force * 1.2;
          const ay = (dy / dist) * force * 1.2;
          this.vx += ax;
          this.vy += ay;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Friction
        this.vx *= 0.95;
        this.vy *= 0.95;

        // Reset speed if too slow
        if (Math.abs(this.vx) < 0.1) this.vx += (Math.random() - 0.5) * 0.2;
        if (Math.abs(this.vy) < 0.1) this.vy += (Math.random() - 0.5) * 0.2;

        // Bounce off walls
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.6)';
        ctx.fill();
      }
    }

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / maxDistance)})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Disable interaction on mobile
      if (window.innerWidth < 1024) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
}

function useTypewriter(phrases: string[]) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(50);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentPhrase.substring(0, text.length + 1));
        setSpeed(50);
        if (text === currentPhrase) {
          setSpeed(2000); // Wait at end
          setIsDeleting(true);
        }
      } else {
        setText(currentPhrase.substring(0, text.length - 1));
        setSpeed(30);
        if (text === "") {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, speed, phrases]);

  return text;
}

// --- COMPONENTS ---

const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !shineRef.current || window.innerWidth < 1024) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    const rotateX = (y - centerY) / 15; // Max 8 degrees +/- rotate
    const rotateY = -(x - centerX) / 15;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    shineRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.08) 0%, transparent 80%)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !shineRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    shineRef.current.style.background = `transparent`;
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card relative transition-transform duration-500 ease-out preserve-3d group ${className}`}
    >
      <div ref={shineRef} className="absolute inset-0 pointer-events-none z-10 rounded-[14px]" />
      {children}
    </div>
  );
};

const StatCounter = ({ value, suffix = "" }: { value: number | string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
  const targetRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        let start = 0;
        const duration = 1800;
        const startTime = performance.now();

        const update = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          
          setCount(Math.floor(start + (numericValue - start) * easeOutQuart));

          if (progress < 1) requestAnimationFrame(update);
          else setCount(numericValue);
        };
        requestAnimationFrame(update);
      }
    }, { threshold: 0.1 });

    if (targetRef.current) observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [numericValue, hasAnimated]);

  return (
    <div ref={targetRef} className="font-mono text-5xl md:text-6xl font-bold text-accent-light tracking-tight">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number, key?: React.Key }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsRevealed(true), delay);
      }
    }, { threshold: 0.15 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${isRevealed ? 'revealed' : ''}`}>
      {children}
    </div>
  );
};

const MagneticButton = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || window.innerWidth < 1024) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    
    // Magnetic pull (max 8px)
    const pullX = (x / (width / 2)) * 8;
    const pullY = (y / (height / 2)) * 8;
    
    setPosition({ x: pullX, y: pullY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`btn-primary ${className}`}
    >
      <motion.span 
        className="flex items-center justify-center gap-2"
        whileTap={{ scale: 0.9 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStrategy = (e?: React.MouseEvent) => {
    e?.preventDefault();
    const element = document.getElementById('strategy');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-bg-void border-b border-border shadow-2xl py-2' : 'bg-bg-void/80 backdrop-blur-md py-3 md:py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2 md:gap-3 group">
          <LogoMark className="w-7 h-7 md:w-9 md:h-9 group-hover:scale-110 transition-transform" />
          <span className="text-xl md:text-2xl font-display font-bold tracking-tight whitespace-nowrap">HyzaLabs</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          {['Services', 'Case Studies', 'How It Works'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById(item.toLowerCase().replace(/ /g, '-'));
                if (target) {
                  window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                  });
                }
              }}
              className="hover:text-accent transition-colors"
            >
              {item}
            </a>
          ))}
          <a 
            href="#strategy" 
            onClick={scrollToStrategy}
            className="hover:text-accent transition-colors"
          >
            Audit Request
          </a>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={scrollToStrategy} className="btn-primary !px-4 md:!px-6 !py-2.5 md:!py-3 text-xs md:text-sm">
            <span className="hidden sm:inline">Book Free Call</span>
            <span className="sm:hidden">Book Call</span>
            <ArrowRight className="inline-block w-3.5 h-3.5 md:w-4 md:h-4 ml-1" />
          </button>
          <button className="md:hidden p-2 text-text-primary bg-white/5 rounded-lg border border-white/10" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop with Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#020202]/70 backdrop-blur-md z-[200]"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Side Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[360px] bg-[#050510] border-l border-white/10 z-[210] flex flex-col px-6 py-8 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-2">
                  <LogoMark className="w-8 h-8" />
                  <span className="text-xl font-display font-bold">HyzaLabs</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 bg-white/5 rounded-lg border border-white/10 text-text-primary"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {['Services', 'Case Studies', 'How It Works'].map((item, i) => (
                  <motion.a 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    key={item} 
                    href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      const target = document.getElementById(item.toLowerCase().replace(/ /g, '-'));
                      if (target) {
                        window.scrollTo({
                          top: target.offsetTop - 80,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="text-2xl font-display font-bold text-text-primary hover:text-accent transition-colors py-2 border-b border-white/5"
                  >
                    {item}
                  </motion.a>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 space-y-4"
                >
                  <button 
                    className="btn-primary w-full py-4 text-base"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      scrollToStrategy();
                    }}
                  >
                    Book Free Call
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                  
                  <div className="pt-8 border-t border-white/5">
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-4">Get in touch</p>
                    <a href="mailto:info@hyzalabs.com" className="text-lg font-bold text-accent-light hover:underline block mb-2">info@hyzalabs.com</a>
                    <p className="text-sm text-text-muted">Available 24/7 for AI strategy support.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- MAIN APP ---

const SCENARIOS = {
  storm: [
    { type: 'user', content: "My roof was hit by hail last night, it's leaking bad!" },
    { type: 'ai', content: "Hi! I'm your AI assistant. We can have an emergency team out first thing tomorrow. Can I get your address?" },
    { type: 'user', content: "4521 Elm St, Columbus OH" },
    { type: 'ai', content: "Perfect. I've scheduled you for an emergency inspection tomorrow at 8am. We handle the entire insurance claim for you. texting you our storm guide now." }
  ],
  insurance: [
    { type: 'user', content: "Does my insurance cover this?" },
    { type: 'ai', content: "If damage was caused by a storm, hail, or wind, your insurance typically covers roof replacement with only your deductible out of pocket. Want to schedule a free inspection to document the damage?" }
  ],
  cost: [
    { type: 'user', content: "How much does a new roof cost?" },
    { type: 'ai', content: "Roof costs vary based on size and materials — typically $8k–$18k for a standard home in Central Ohio. If damage is storm-related, insurance often covers most of it. Would you like a free inspection and estimate?" }
  ]
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      </Routes>
    </Router>
  );
}

function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useNeuralNetwork(canvasRef);
  const typewriterText = useTypewriter(PHRASES);

  // --- STATE ---
  const [activeScenario, setActiveScenario] = useState('storm');
  const [missedLeads, setMissedLeads] = useState(5);
  const [jobValue, setJobValue] = useState(10000);
  const [closeRate, setCloseRate] = useState(25);

  const scrollToStrategy = () => {
    const element = document.getElementById('strategy');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      <Navbar />

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative min-h-screen flex items-center justify-center pt-36 md:pt-48 overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-border-accent text-[11px] font-semibold text-accent-light tracking-widest uppercase mb-8"
              >
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Built for Roofing Contractors
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-tight mb-6"
              >
                Stop Losing Roofing Jobs <br />
                <span className="gradient-text">After Business Hours.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-2xl font-display font-semibold text-text-secondary mb-6 min-h-[4rem] md:h-12"
              >
                Your AI system works 24/7 — <br className="md:hidden" />
                <span className="gradient-text">{typewriterText}</span>
                <span className="inline-block w-1 h-5 md:h-6 ml-1 bg-accent mb-[-2px] animate-pulse" />
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-base md:text-lg text-text-muted leading-relaxed mb-10 max-w-xl"
              >
                Every night, homeowners with storm-damaged roofs search for a roofer. They call the first one who responds. HyzaLabs builds the AI system that makes sure that's always you — even at 2am, even during a hailstorm.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <div onClick={scrollToStrategy}>
                  <MagneticButton className="w-full sm:w-auto">
                    Book Free Strategy Call <ArrowRight className="w-5 h-5" />
                  </MagneticButton>
                </div>
                <button 
                  onClick={() => {
                    const el = document.getElementById('how-it-works');
                    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                  }}
                  className="btn-ghost w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  See How It Works <Play className="w-5 h-5 fill-current" />
                </button>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 text-xs font-medium text-text-muted flex items-center gap-1.5"
              >
                <span className="text-accent">★</span> Trusted by contractors in Columbus · Akron · Summit County · NE Ohio
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="relative mt-12 md:mt-0"
            >
              <div className="glass-card p-1 overflow-hidden max-w-sm mx-auto md:max-w-none">
                <div className="bg-[#050510] rounded-xl overflow-hidden aspect-[4/5] p-4 md:p-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    <div className="self-start max-w-[80%] bg-bg-card border border-border p-3 rounded-2xl rounded-tl-none text-sm">
                      My roof was hit by hail last night, it's leaking bad!
                    </div>
                    <div className="self-end max-w-[80%] bg-accent/20 border border-accent/30 p-3 rounded-2xl rounded-tr-none text-sm text-right">
                      Hi! I'm your AI assistant. We can have an emergency team out first thing tomorrow. Can I get your address?
                    </div>
                    <div className="self-start max-w-[80%] bg-bg-card border border-border p-3 rounded-2xl rounded-tl-none text-sm">
                      123 Oak St, Columbus OH
                    </div>
                    <div className="self-end max-w-[80%] bg-accent p-3 rounded-2xl rounded-tr-none text-sm text-right font-medium">
                      Confirmed. You're scheduled for 8am. I'm texting you our storm guide now!
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-[10px] text-text-muted uppercase tracking-widest font-semibold">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      AI Responded in 47s
                    </div>
                    <span>Live Session #492</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute -inset-10 bg-accent/20 blur-[100px] -z-10 rounded-full" />
            </motion.div>
          </div>
        </section>

        {/* --- LOGO BAR --- */}
        <section className="py-8 md:py-12 border-y border-border overflow-hidden bg-bg-void/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <p className="text-center text-[9px] md:text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-6 md:mb-8">
              Contractors who trust HyzaLabs
            </p>
            <div className="flex gap-4 items-center whitespace-nowrap animate-marquee">
              {[
                "Bronco Roofing", "Highbridge Restoration", "All Weather R&R", 
                "Summit Roofing Co.", "Storm Shield Contractors", "Franklin County Roofing",
                "Dustin Halsey R&R", "Peak Performers", "The Roof Guys"
              ].map((logo, i) => (
                <div key={i} className="px-6 py-2 rounded-full bg-bg-card border border-border text-xs font-semibold text-text-muted">
                  {logo}
                </div>
              ))}
              {/* Duplicate for infinite loop */}
              {[
                "Bronco Roofing", "Highbridge Restoration", "All Weather R&R", 
                "Summit Roofing Co.", "Storm Shield Contractors", "Franklin County Roofing",
                "Dustin Halsey R&R", "Peak Performers", "The Roof Guys"
              ].map((logo, i) => (
                <div key={`dup-${i}`} className="px-6 py-2 rounded-full bg-bg-card border border-border text-xs font-semibold text-text-muted">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 3: THE PROBLEM --- */}
        <section className="relative py-16 md:py-32 mesh-gradient overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center mb-12 md:mb-20">
            <Reveal>
              <p className="text-[10px] font-bold text-accent-light uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4 text-center">THE $12,000 PROBLEM HAPPENING EVERY NIGHT</p>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Right Now, A Homeowner Just <br className="hidden md:block" /> Chose Your Competitor.</h2>
            </Reveal>
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                label: "THE MOMENT",
                icon: <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />,
                title: "11:47 PM — Hail hits",
                desc: "A hailstorm hits Franklin County. A homeowner walks outside, sees their roof is damaged. They grab their phone and Google 'emergency roofer Columbus.'"
              },
              {
                label: "THE CHOICE",
                icon: <PhoneCall className="w-8 h-8 text-accent" />,
                title: "They find 3 companies",
                desc: "Two have contact forms: 'We'll respond in 1-2 business days.' The third has a chat widget that responds instantly. They call the third one."
              },
              {
                label: "THE COST",
                icon: <BarChart3 className="w-8 h-8 text-red-400" />,
                title: "Job worth $14,500",
                desc: "The roofer who won it was asleep. Their AI wasn't. How many times did this happen last month while you were sleeping?"
              }
            ].map((panel, i) => (
              <Reveal key={i} delay={i * 100}>
                <TiltCard className="p-8 h-full flex flex-col items-start text-left">
                  <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all">
                    {panel.icon}
                  </div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">{panel.label}</p>
                  <h3 className="text-xl font-bold mb-4">{panel.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{panel.desc}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Reveal delay={400}>
              <button 
                onClick={scrollToStrategy}
                className="btn-primary"
              >
                See How We Fix This <ArrowRight className="inline-block w-4 h-4 ml-1" />
              </button>
            </Reveal>
          </div>
        </section>

        {/* --- SECTION 4: ANIMATED STATS --- */}
        <section className="py-16 md:py-32 bg-bg-void relative border-y border-border">
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ backgroundImage: `radial-gradient(var(--color-border) 1px, transparent 1px)`, backgroundSize: '30px 30px' }} 
          />
          
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-12 md:mb-20">The Numbers Don't Lie</h2>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { value: 340, suffix: "%", label: "Average increase in captured leads within 60 days" },
                { value: 2, suffix: " min", label: "Average AI response time (industry average: 14+ hours)" },
                { value: 184000, prefix: "$", label: "Revenue generated for Bronco Roofing in first 90 days" },
                { value: 0, label: "After-hours leads lost once the AI system is active" }
              ].map((stat, i) => (
                <Reveal key={i} delay={i * 100}>
                  <TiltCard className="p-8 text-center h-full">
                    <div className="flex items-center justify-center gap-1 mb-2">
                       {stat.prefix && <span className="font-mono text-3xl text-accent-light">{stat.prefix}</span>}
                       <StatCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-xs font-medium text-text-muted leading-relaxed">{stat.label}</p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 5: SERVICES --- */}
        <section id="services" className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
            <Reveal>
              <p className="text-[10px] font-bold text-accent-light uppercase tracking-[0.3em] mb-4">WHAT WE BUILD FOR YOU</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold">Your Complete AI <br className="hidden md:block" /> System for Roofing</h2>
            </Reveal>
          </div>

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "24/7 AI CHATBOT",
                desc: "Never miss a lead again. Your AI responds to every website visitor in under 2 minutes — day or night, storm or sunshine. Captures name, phone, address, and service needed before you wake up.",
                tag: "Most Popular"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "STORM ALERT ENGINE",
                desc: "When hail hits your county, your AI automatically activates — sending messages to your lead list, updating your Google Business Profile, and routing emergency calls to the front of the queue.",
                tag: "Highest ROI"
              },
              {
                icon: <ClipboardCheck className="w-8 h-8" />,
                title: "INSURANCE AUTOMATION",
                desc: "Follow up with every insurance lead automatically. Our AI knows what adjusters need, when to follow up, and how to keep the homeowner engaged through the entire 6-8 week claims process.",
                tag: "Retention"
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "REVIEW GROWTH SYSTEM",
                desc: "From 23 reviews to 150+ in 90 days. Our AI sends perfectly timed review requests via text after every completed job — driving your Google Maps ranking above competitors.",
                tag: "Local SEO"
              }
            ].map((service, i) => (
              <Reveal key={i} delay={i * 100}>
                <TiltCard className="p-6 md:p-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent ring-8 ring-accent/5">
                      {service.icon}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-bold text-accent-light uppercase tracking-wider">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-text-muted leading-relaxed">{service.desc}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* --- SECTION 6: HOW IT WORKS --- */}
        <section id="how-it-works" className="py-24 md:py-32 bg-bg-deep relative overflow-hidden">
           <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 blur-[150px] -z-10 rounded-full" />
           
           <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-start">
             <div>
               <Reveal>
                 <p className="text-[10px] font-bold text-accent-light uppercase tracking-[0.3em] mb-4">THE PROCESS</p>
                 <h2 className="text-4xl md:text-5xl font-display font-bold mb-10">Live in 7 Days. <br /> Leads Coming in by Day 8.</h2>
                 
                 <div className="relative pl-10 border-l border-border space-y-16">
                    {[
                      { 
                        step: "01", 
                        title: "We Audit Your Lead Gaps", 
                        desc: "30-minute strategy call. We map every place you're losing leads: after-hours, storms, slow follow-up, low reviews. No sales pitch — just an honest gap analysis.",
                        sub: "Free. No commitment."
                      },
                      { 
                        step: "02", 
                        title: "We Build Your AI System", 
                        desc: "Our team builds and connects everything: AI chatbot, storm alert triggers, review system, and lead capture. We integrate with your existing tools.",
                        sub: "Zero work required from you."
                      },
                      { 
                        step: "03", 
                        title: "Leads Come In. You Focus on Roofing.", 
                        desc: "Your AI runs 24/7. We monitor, optimize, and send you a monthly report showing every lead captured, every job won from automation, and your ROI.",
                        sub: "Ongoing support included."
                      }
                    ].map((step, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[53px] top-0 w-6 h-6 rounded-full bg-accent border-[4px] border-bg-deep shadow-[0_0_20px_var(--color-accent)] z-10" />
                        <h4 className="text-xl font-bold mb-3 flex items-center gap-4">
                          <span className="text-accent underline underline-offset-4 decoration-2">{step.step}</span>
                          {step.title}
                        </h4>
                        <p className="text-text-muted leading-relaxed mb-2">{step.desc}</p>
                        <p className="text-[10px] font-bold text-accent-light uppercase tracking-widest">{step.sub}</p>
                      </div>
                    ))}
                 </div>

                 <div className="mt-16">
                   <button onClick={() => document.getElementById('strategy')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary">Start With a Free Discovery Call <ArrowRight className="inline-block w-4 h-4 ml-1" /></button>
                 </div>
               </Reveal>
             </div>

             <div className="hidden md:block sticky top-32">
                <Reveal delay={200}>
                  <div className="glass-card p-4">
                    <div className="bg-[#050510] rounded-xl p-8 border border-border">
                      <div className="flex items-center gap-4 mb-8">
                         <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">Hy</div>
                         <div>
                            <div className="text-sm font-bold">HyzaLabs Engine</div>
                            <div className="text-[10px] text-text-muted flex items-center gap-1">
                               <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                               OPTIMIZING PERFORMANCE
                            </div>
                         </div>
                      </div>
                      <div className="space-y-4">
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                           <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                           <motion.div initial={{ width: 0 }} whileInView={{ width: '60%' }} transition={{ duration: 1.5, delay: 0.7 }} className="h-full bg-accent-2 shadow-[0_0_10px_var(--color-accent-2)]" />
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                           <motion.div initial={{ width: 0 }} whileInView={{ width: '92%' }} transition={{ duration: 1.5, delay: 0.9 }} className="h-full bg-accent-light shadow-[0_0_10px_var(--color-accent-light)]" />
                        </div>
                      </div>
                      <div className="mt-12 grid grid-cols-2 gap-4">
                         <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <div className="text-[10px] text-text-muted uppercase mb-1">Leads Today</div>
                            <div className="text-xl font-mono font-bold">+12</div>
                         </div>
                         <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <div className="text-[10px] text-text-muted uppercase mb-1">Active AI</div>
                            <div className="text-xl font-mono font-bold">100%</div>
                         </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
             </div>
           </div>
        </section>

        {/* --- SECTION 7: CASE STUDIES --- */}
        <section id="case-studies" className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
            <Reveal>
              <p className="text-[10px] font-bold text-accent-light uppercase tracking-[0.3em] mb-4">REAL RESULTS. REAL ROOFERS.</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold">What Happens When <br className="hidden md:block" /> Roofing Contractors Go AI-First</h2>
            </Reveal>
          </div>

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
            {[
              {
                client: "BRONCO ROOFING",
                location: "Uniontown, OH",
                owner: "Dustin Halsey, Owner · Summit County",
                challenge: "23 Google reviews. No after-hours capture. Losing 3–5 leads per week to competitors after 6pm.",
                solution: "HyzaLabs AI chatbot + storm alert system + review automation",
                stats: [
                  { value: 23, label: "leads in first 30 days" },
                  { value: 184000, prefix: "$", label: "booked jobs (90 days)" },
                  { value: 67, label: "Google reviews (from 23)" }
                ],
                quote: "The AI responded to a storm damage inquiry at 2am and booked the inspection before I had my morning coffee."
              },
              {
                client: "HIGHBRIDGE RESTORATION",
                location: "Akron, OH",
                owner: "Michael Fondas, Owner · GAF + CertainTeed",
                challenge: "Hibu template website. Positioned as just a roofer despite 50+ services. Zero digital lead capture.",
                solution: "Full HyzaLabs AI system + insurance claim automation + website overhaul",
                stats: [
                  { value: 290, suffix: "%", label: "increase in service leads" },
                  { value: 8, suffix: "/mo", label: "kitchen remodel leads" },
                  { value: 100, suffix: "%", label: "Insurance follow-up automated" }
                ],
                quote: "I didn't realize how much revenue I was leaving on the table until HyzaLabs showed me the math."
              }
            ].map((study, i) => (
              <Reveal key={i} delay={i * 100}>
                <TiltCard className="p-6 md:p-10 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-xs font-bold text-accent-light tracking-widest">{study.client}</div>
                    <div className="text-[10px] text-text-muted">{study.location}</div>
                  </div>
                  <div className="text-sm font-bold mb-6 text-text-secondary">{study.owner}</div>
                  
                  <div className="space-y-6 mb-10 flex-grow">
                    <div>
                      <div className="text-[10px] font-bold text-text-muted uppercase mb-1">Challenge</div>
                      <p className="text-sm text-text-muted leading-relaxed italic">"{study.challenge}"</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-text-muted uppercase mb-1">Solution</div>
                      <p className="text-sm text-text-muted leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-10 border-y border-border py-6">
                     {study.stats.map((s, idx) => (
                       <div key={idx}>
                         <div className="text-xl md:text-2xl font-mono font-bold text-accent-light flex items-center">
                           {s.prefix}{s.value}{s.suffix}
                         </div>
                         <div className="text-[9px] font-bold text-text-muted uppercase mt-1 leading-tight">{s.label}</div>
                       </div>
                     ))}
                  </div>

                  <div className="relative pl-6">
                    <div className="absolute left-0 top-0 text-3xl text-accent font-display opacity-80 overflow-hidden leading-none h-6">"</div>
                    <p className="text-sm font-medium text-text-secondary leading-relaxed">
                      {study.quote}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>
        
        {/* --- SECTION 8: LIVE AI DEMO --- */}
        <section className="py-16 md:py-40 bg-bg-void overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <Reveal>
              <div className="text-center md:text-left">
                <p className="text-[10px] font-bold text-accent-light uppercase tracking-[0.3em] mb-4">TRY IT RIGHT NOW</p>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">This Is What Your <br className="hidden md:block" /> Customers Experience</h2>
                <p className="text-text-muted mb-10 leading-relaxed max-w-lg mx-auto md:mx-0">
                  Click a scenario below to see how our AI handles different inquiries instantly. Your leads never have to wait for a return call again.
                </p>
              </div>
              
              <div className="flex flex-col gap-3 max-w-md mx-auto md:mx-0">
                {[
                  { icon: "🌩️", label: "Storm Damage Inquiry", key: "storm" },
                  { icon: "💰", label: "Insurance Question", key: "insurance" },
                  { icon: "❓", label: "How Much Does a Roof Cost?", key: "cost" }
                ].map((scenario) => (
                  <button 
                    key={scenario.key}
                    onClick={() => setActiveScenario(scenario.key)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-300 text-left ${activeScenario === scenario.key ? 'bg-accent/10 border-accent text-accent-light shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'bg-bg-card border-border hover:border-accent/40'}`}
                  >
                    <span className="text-xl">{scenario.icon}</span>
                    <span className="font-semibold">{scenario.label}</span>
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="relative">
                <div className="glass-card p-1 rounded-[32px] overflow-hidden">
                  <div className="bg-[#050510] rounded-[30px] aspect-[9/16] p-6 flex flex-col">
                    {/* Phone Header */}
                    <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">AI</div>
                          <div>
                            <div className="text-xs font-bold">Roofing Expert AI</div>
                            <div className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Online Now</div>
                          </div>
                       </div>
                    </div>

                    {/* Chat Bubbles */}
                    <div className="flex-grow space-y-4 overflow-y-auto no-scrollbar">
                       <AnimatePresence mode="wait">
                          <motion.div 
                            key={activeScenario}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                          >
                             {SCENARIOS[activeScenario as keyof typeof SCENARIOS].map((msg, idx) => (
                               <motion.div 
                                 key={idx}
                                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                 animate={{ opacity: 1, y: 0, scale: 1 }}
                                 transition={{ delay: idx * 0.8 }}
                                 className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.type === 'user' ? 'bg-bg-card border border-border self-start mr-12' : 'bg-accent text-white self-end ml-12 shadow-[0_4px_15px_rgba(99,102,241,0.3)]'}`}
                               >
                                 {msg.content}
                               </motion.div>
                             ))}
                             
                             <motion.div 
                               initial={{ opacity: 0 }}
                               animate={{ opacity: 1 }}
                               transition={{ delay: SCENARIOS[activeScenario as keyof typeof SCENARIOS].length * 0.8 }}
                               className="flex items-center gap-2 p-4 pt-0"
                             >
                                <div className="text-[10px] text-text-muted italic flex items-center gap-2">
                                   <div className="w-1 h-1 rounded-full bg-green-500" />
                                   Lead captured and sent to CRM
                                </div>
                             </motion.div>
                          </motion.div>
                       </AnimatePresence>
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-20 bg-accent/10 blur-[100px] -z-10 rounded-full" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* --- SECTION 9: REVENUE CALCULATOR --- */}
        <section className="py-24 md:py-32 border-y border-border relative">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <div className="text-center mb-16">
                 <p className="text-[10px] font-bold text-accent-light uppercase tracking-[0.3em] mb-4">YOUR REVENUE LEAK</p>
                 <h2 className="text-4xl md:text-5xl font-display font-bold">How Much Are You <br /> Losing Right Now?</h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-16 items-center">
               <Reveal>
                 <div className="space-y-10">
                    <div>
                       <div className="flex justify-between items-center mb-4">
                          <label className="text-sm font-bold text-text-secondary">Calls/leads missed per week after 5pm</label>
                          <span className="font-mono text-accent-light text-lg">{missedLeads}</span>
                       </div>
                       <input 
                         type="range" min="1" max="20" 
                         value={missedLeads} 
                         onChange={(e) => setMissedLeads(parseInt(e.target.value))}
                         className="w-full accent-accent h-1.5 bg-bg-card rounded-full appearance-none cursor-pointer"
                       />
                    </div>
                    <div>
                       <div className="flex justify-between items-center mb-4">
                          <label className="text-sm font-bold text-text-secondary">Average job value ($)</label>
                          <span className="font-mono text-accent-light text-lg">${jobValue.toLocaleString()}</span>
                       </div>
                       <input 
                         type="range" min="3000" max="30000" step="500"
                         value={jobValue} 
                         onChange={(e) => setJobValue(parseInt(e.target.value))}
                         className="w-full accent-accent h-1.5 bg-bg-card rounded-full appearance-none cursor-pointer"
                       />
                    </div>
                    <div>
                       <div className="flex justify-between items-center mb-4">
                          <label className="text-sm font-bold text-text-secondary">Close rate on answered calls (%)</label>
                          <span className="font-mono text-accent-light text-lg">{closeRate}%</span>
                       </div>
                       <input 
                         type="range" min="10" max="60" 
                         value={closeRate} 
                         onChange={(e) => setCloseRate(parseInt(e.target.value))}
                         className="w-full accent-accent h-1.5 bg-bg-card rounded-full appearance-none cursor-pointer"
                       />
                    </div>
                 </div>
               </Reveal>

               <Reveal delay={200}>
                 <TiltCard className="p-6 md:p-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-accent to-accent-2" />
                    <p className="text-sm font-bold text-text-muted uppercase tracking-widest mb-6">Estimated Income Recovery</p>
                    <div className="font-mono text-5xl md:text-6xl font-bold bg-linear-to-r from-accent-light to-accent-2 bg-clip-text text-transparent mb-4">
                       ${Math.floor(missedLeads * 4 * (closeRate / 100) * jobValue).toLocaleString()}
                       <span className="text-2xl text-text-muted ml-2">/mo</span>
                    </div>
                    <p className="text-text-muted leading-relaxed">
                       That’s <span className="text-white font-bold">${Math.floor(missedLeads * 52 * (closeRate / 100) * jobValue).toLocaleString()}</span> per year — or <span className="text-white font-bold">{Math.floor(missedLeads * 52 * (closeRate / 100))}</span> missed jobs your AI would have won.
                    </p>
                    <button 
                      onClick={scrollToStrategy}
                      className="btn-primary w-full mt-10"
                    >
                      Book a Free Call to Fix This
                    </button>
                 </TiltCard>
               </Reveal>
            </div>
          </div>
        </section>

        {/* --- SECTION 10: WHY ROOFING ONLY --- */}
        <section className="py-24 md:py-32 mesh-gradient">
           <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
              <Reveal>
                 <p className="text-[10px] font-bold text-accent-light uppercase tracking-[0.3em] mb-4">OUR FOCUS</p>
                 <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">We Don't Do Everything. <br /> We Do Roofing.</h2>
                 <div className="space-y-6 text-text-muted leading-relaxed">
                    <p>
                      Most AI agencies sell generic chatbots to anyone who will pay. We made a different choice. We went deep on one industry — roofing — and learned everything: storm seasons, hail maps, insurance claim timelines, GAF certifications, and how homeowners choose a roofer at 11pm.
                    </p>
                    <p>
                      We know the difference between a Timberline HDZ and an Owens Corning Duration. We know what 'storm chaser' means to a reputable contractor. And we've built our AI systems around all of it.
                    </p>
                 </div>
              </Reveal>

              <Reveal delay={200}>
                 <TiltCard className="p-8">
                    <h4 className="text-sm font-bold mb-8 flex items-center gap-2">
                       <BarChart3 className="w-5 h-5 text-accent" />
                       Storm Season Lead Volume — Central Ohio
                    </h4>
                    <div className="flex items-end justify-between h-48 gap-2">
                       {[
                         { month: "J-F", h: "20%" },
                         { month: "M-A", h: "45%" },
                         { month: "M-J", h: "100%", label: "Hail Season", glow: true },
                         { month: "J-A", h: "75%" },
                         { month: "S-O", h: "90%", label: "Wind Season", glow: true },
                         { month: "N-D", h: "35%" }
                       ].map((bar, i) => (
                         <div key={i} className="flex-grow flex flex-col items-center">
                            <motion.div 
                              initial={{ height: 0 }}
                              whileInView={{ height: bar.h }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                              className={`w-full rounded-t-lg relative group ${bar.glow ? 'bg-accent shadow-[0_0_20px_var(--color-accent)]' : 'bg-white/10'}`}
                            >
                               {bar.label && (
                                 <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-bold text-accent-light bg-accent/20 px-2 py-1 rounded border border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {bar.label}
                                 </div>
                               )}
                            </motion.div>
                            <span className="text-[10px] font-bold text-text-muted mt-4">{bar.month}</span>
                         </div>
                       ))}
                    </div>
                    <p className="mt-8 text-[10px] text-text-muted text-center italic">
                      Our storm alert system is calibrated to Central Ohio and NE Ohio weather patterns — automatically.
                    </p>
                 </TiltCard>
              </Reveal>
           </div>
        </section>

        {/* --- SECTION 11: PRICING --- */}
        <section id="pricing" className="hidden">
           <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
              <Reveal>
                 <div className="text-center mb-12 md:mb-20">
                    <p className="text-[10px] font-bold text-accent-light uppercase tracking-[0.3em] mb-4">INVESTMENT</p>
                    <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">Transparent Pricing. <br /> No Contracts. Cancel Anytime.</h2>
                 </div>
              </Reveal>

              <div className="grid md:grid-cols-3 gap-8">
                 {[
                   {
                     tier: "STARTER", price: "$497", desc: "Best for: Solo operators, 1–2 trucks",
                     features: ["AI Lead Capture Chatbot", "24/7 lead response", "Email notification per lead", "Basic monthly report"]
                   },
                   {
                     tier: "GROWTH", price: "$997", desc: "Best for: Growing contractors, 3–10 trucks", highlight: true,
                     features: ["Everything in Starter", "Storm Alert Engine", "Insurance claim follow-up", "Review request system", "Monthly strategy call", "Priority support"]
                   },
                   {
                     tier: "FULL SYSTEM", price: "$1,997", desc: "Best for: $1M+ revenue contractors",
                     features: ["Everything in Growth", "Custom AI exact scripts", "CRM integrations", "Paid ads AI assistant", "Quarterly reviews", "Dedicated account manager"]
                   }
                 ].map((plan, i) => (
                   <Reveal key={i} delay={i * 100}>
                      <TiltCard className={`p-6 md:p-10 h-full flex flex-col items-center text-center ${plan.highlight ? 'ring-2 ring-accent shadow-[0_0_50px_rgba(99,102,241,0.2)]' : ''}`}>
                         {plan.highlight && <div className="bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">MOST POPULAR</div>}
                         <div className="text-xs font-bold text-text-muted tracking-widest mb-4 uppercase">{plan.tier}</div>
                         <div className="font-display text-5xl font-bold mb-4 tracking-tight">{plan.price}<span className="text-lg text-text-muted font-normal">/mo</span></div>
                         <p className="text-sm text-text-muted mb-10 h-10">{plan.desc}</p>
                         
                         <div className="w-full space-y-4 mb-10 flex-grow text-left">
                            {plan.features.map((f, idx) => (
                              <div key={idx} className="flex items-center gap-3 text-sm text-text-secondary">
                                 <CheckCircle2 className="w-4 h-4 text-accent" />
                                 {f}
                              </div>
                            ))}
                         </div>
                         
                         <button 
                            onClick={scrollToStrategy}
                            className={`btn-primary w-full py-4 !rounded-lg`}
                         >
                            Get Started
                         </button>
                      </TiltCard>
                   </Reveal>
                 ))}
              </div>
           </div>
        </section>

        {/* --- SECTION 12: FINAL CTA --- */}
        <section id="strategy" className="py-16 md:py-40 relative overflow-hidden bg-[#020202]">
           <div className="absolute inset-0 bg-radial-to-c from-accent/10 to-transparent -z-10" />
           <div className="max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <Reveal>
                 <div className="text-center md:text-left mb-8 md:mb-0">
                    <h2 className="text-3xl md:text-6xl font-display font-bold mb-8">Ready to Stop Losing Jobs After Business Hours?</h2>
                    <p className="text-text-secondary text-base md:text-lg mb-12">
                      Book a free 15-minute strategy call. We'll show you exactly how many leads you're losing right now and what it would cost to fix it. No pitch. No pressure. Just the math.
                    </p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                       <span className="flex items-center gap-2 hover:text-accent transition-colors"><Zap className="w-3 h-3" /> Setup takes 7 days</span>
                       <span className="flex items-center gap-2 hover:text-accent transition-colors"><ShieldCheck className="w-3 h-3" /> No long-term contracts</span>
                       <span className="flex items-center gap-2 hover:text-accent transition-colors"><PhoneCall className="w-3 h-3" /> Talk to a human</span>
                    </div>
                 </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="glass-card p-6 md:p-12 relative overflow-hidden">
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 blur-[100px] rounded-full" />
                  <h3 className="text-2xl font-bold mb-8 tracking-tight text-center md:text-left">Contact & Audit Request</h3>
                  
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const name = formData.get('fullName') as string;
                      const email = formData.get('email') as string;
                      const business = formData.get('businessName') as string;
                      const bottlenecks = formData.get('bottlenecks') as string;
                      
                      const url = `https://calendly.com/marton-hyzalabs/15min?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&a1=${encodeURIComponent(`Business: ${business}. Bottlenecks: ${bottlenecks}`)}`;
                      
                      if ((window as any).Calendly) {
                        (window as any).Calendly.initPopupWidget({ url });
                      } else {
                        window.open(url, '_blank');
                      }
                    }} 
                    className="space-y-4 text-left"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Full Name</label>
                        <input name="fullName" type="text" required placeholder="Alex Smith" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-accent outline-none transition-all" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Email</label>
                        <input name="email" type="email" required placeholder="alex@company.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-accent outline-none transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Phone</label>
                        <input name="phone" type="tel" required placeholder="+1 (555) 000-0000" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-accent outline-none transition-all" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Business Name</label>
                        <input name="businessName" type="text" required placeholder="Summit Roofing" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-accent outline-none transition-all" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Business Address</label>
                      <input name="address" type="text" required placeholder="123 Roofing Ave, Dallas, TX" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-accent outline-none transition-all" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Main Bottlenecks/Info</label>
                      <textarea name="bottlenecks" rows={3} required placeholder="What is slowing you down?" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-accent outline-none resize-none transition-all" />
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" id="smsConsent" required className="mt-1 accent-accent" />
                        <label htmlFor="smsConsent" className="text-[10px] text-text-muted leading-relaxed">
                          I consent to receive SMS communications from HyzaLabs regarding my audit request and service updates. Message frequency varies. Msg & data rates may apply. Reply STOP to opt-out.
                        </label>
                      </div>
                    </div>

                    <button type="submit" className="w-full py-4 bg-accent text-white font-bold uppercase text-[11px] tracking-widest rounded-lg hover:bg-accent-2 transition-all shadow-lg shadow-accent/20">
                      Initiate Audit & Book Call
                    </button>
                    
                    <p className="text-[9px] text-center text-text-muted mt-4">
                      By submitting, you agree to our <a href="/terms-of-service" className="text-accent underline">Terms</a> and <a href="/privacy-policy" className="text-accent underline">Privacy Policy</a>.
                    </p>
                  </form>
                </div>
              </Reveal>
           </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-16 md:py-20 bg-bg-void border-t border-border">
         <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="col-span-2 md:col-span-1">
               <a href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-4 mb-6 group cursor-pointer justify-center md:justify-start">
                 <LogoMark className="w-10 h-10" />
                 <div className="flex flex-col -space-y-1">
                    <span className="text-xl font-display font-bold tracking-tight">HyzaLabs</span>
                 </div>
               </a>
               <p className="text-sm text-text-muted mb-4">Strategic AI for Roofing Contractors</p>
               <a href="mailto:info@hyzalabs.com" className="text-sm font-bold text-accent-light hover:underline">info@hyzalabs.com</a>
            </div>
            
            {[
              { 
                title: "Services", 
                links: [
                  { name: "AI Chatbot", id: "services" },
                  { name: "Storm Alert", id: "services" },
                  { name: "Insurance Automation", id: "services" },
                  { name: "Review Growth", id: "services" }
                ] 
              },
              { 
                title: "Company", 
                links: [
                  { name: "About", id: "/" },
                  { name: "Case Studies", id: "case-studies" },
                  { name: "Audit Request", id: "strategy" },
                  { name: "Contact", id: "strategy" }
                ] 
              },
              { 
                title: "Resources", 
                links: [
                  { name: "Lead Loss Calculator", id: "how-it-works" },
                  { name: "Storm Season Guide", id: "how-it-works" },
                  { name: "Book a Call", id: "strategy" }
                ] 
              }
            ].map((col, i) => (
              <div key={i}>
                <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-text-secondary">{col.title}</h5>
                <ul className="space-y-4">
                   {col.links.map((link, idx) => (
                     <li key={idx}>
                        <a 
                          href={`#${link.id}`} 
                          onClick={(e) => {
                            e.preventDefault();
                            if (link.id === '/') {
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            } else {
                              const el = document.getElementById(link.id);
                              if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                            }
                          }}
                          className="text-sm text-text-muted hover:text-accent transition-colors"
                        >
                          {link.name}
                        </a>
                     </li>
                   ))}
                </ul>
              </div>
            ))}
         </div>
         <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold text-text-muted uppercase tracking-widest text-center md:text-left">
            <p>© 2026 HyzaLabs LLC · Foldeaki Group LLC · Operated by humans</p>
            <div className="flex gap-8">
               <a href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</a>
               <a href="/terms-of-service" className="hover:text-accent transition-colors">Terms</a>
               <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
               <a href="#" className="hover:text-accent transition-colors">Twitter/X</a>
            </div>
         </div>
      </footer>


      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
}
