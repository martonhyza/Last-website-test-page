import React, { useState, useEffect } from 'react';
import NeuralBrain from './components/NeuralBrain.tsx';
import SectionWrapper from './components/SectionWrapper.tsx';
import BackgroundParticles from './components/BackgroundParticles.tsx';
import { analyzeBottlenecks } from './services/geminiService.ts';
import { LeadFormData, AnalysisResponse } from './types.ts';

declare global {
  interface Window {
    Calendly: any;
  }
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    email: '',
    phone: '',
    budget: '',
    bottlenecks: ''
  });
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [showCookieNotice, setShowCookieNotice] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'disclaimer' | null>(null);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timezone.includes('Europe')) {
        setShowCookieNotice(true);
      } else {
        setShowCookieNotice(true);
      }
    }
  }, []);

  const handleCookieConsent = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowCookieNotice(false);
  };

  const BASE_CALENDLY_URL = 'https://calendly.com/marton-hyzalabs/15min';

  const triggerCalendly = () => {
    const safeEncode = (str: string) => encodeURIComponent(str.trim()).replace(/\+/g, '%20');
    // Using 'a2' instead of 'a1' as 'a1' was hitting the phone field.
    // This targets the "Please share anything that will help prepare..." section below phone.
    const queryString = `name=${safeEncode(formData.fullName)}&email=${safeEncode(formData.email)}&a2=${safeEncode(formData.bottlenecks)}`;
    const finalUrl = `${BASE_CALENDLY_URL}?${queryString}`;

    if (window.Calendly) {
      window.Calendly.showPopupWidget(finalUrl);
      setIsBooked(true);
    } else {
      window.open(finalUrl, '_blank');
      setIsBooked(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await analyzeBottlenecks(formData);
      setAnalysis(result);
      setIsSubmitting(false);
      setTimeout(() => triggerCalendly(), 1000);
    } catch (error) {
      console.error("Submission error", error);
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    if (e) e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 overflow-hidden font-inter relative">
      <BackgroundParticles />
      
      {/* Deep Atmosphere */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/5 rounded-full blur-[140px] animate-pulse" />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <NeuralBrain className="w-8 h-8 md:w-10 md:h-10" />
            <span className="text-xl md:text-2xl font-black tracking-tighter italic uppercase text-white">HyzaLabs</span>
          </div>
          <div className="flex items-center gap-8">
            <nav className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-white/40">
              <a href="#gaps" onClick={(e) => scrollToSection(e, 'gaps')} className="hover:text-white transition-all">Inefficiencies</a>
              <a href="#solutions" onClick={(e) => scrollToSection(e, 'solutions')} className="hover:text-white transition-all">Solutions</a>
            </nav>
            <button 
              onClick={(e) => scrollToSection(e, 'strategy')}
              className="px-6 py-2.5 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 text-[10px] font-black uppercase tracking-widest"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <SectionWrapper id="hero" className="pt-40 md:pt-56 pb-20 md:pb-32 px-6 text-center">
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
          
          {/* Central Nexus Visual */}
          <div className="mb-12 relative">
             <div className="absolute inset-0 bg-indigo-500/20 blur-[60px] rounded-full animate-pulse" />
             <NeuralBrain className="w-32 h-32 md:w-48 md:h-48 relative" glowing />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-[10px] font-bold text-indigo-300 mb-10 uppercase tracking-[0.3em]">
            Autonomous Enterprise Operating Systems
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-white">
            Build Once. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-400 to-indigo-500">Scale Automatically.</span>
          </h1>
          
          <p className="text-base md:text-xl text-white/50 max-w-2xl mx-auto mb-14 font-light leading-relaxed tracking-wide">
            The next generation of high-fidelity AI infrastructure for the fitness elite. <br className="hidden md:block"/> Engineered to eliminate manual friction and maximize revenue capture.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
            <button 
              onClick={(e) => scrollToSection(e, 'strategy')}
              className="w-full sm:w-auto px-12 py-5 bg-white text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-full hover:bg-indigo-400 hover:text-white hover:scale-105 hover:-translate-y-1 transition-all duration-500 shadow-2xl shadow-indigo-500/10"
            >
              Request Engineering Audit
            </button>
            <button 
              onClick={(e) => scrollToSection(e, 'gaps')}
              className="w-full sm:w-auto px-12 py-5 bg-white/5 border border-white/10 text-white font-black uppercase text-[11px] tracking-[0.2em] rounded-full hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all duration-500"
            >
              Explore the Stack
            </button>
          </div>
        </div>
      </SectionWrapper>

      {/* Gaps Section */}
      <SectionWrapper id="gaps" className="py-24 md:py-48 px-6 bg-[#030303]">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
            <div className="order-2 lg:order-1 text-left">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic leading-[0.9] mb-8 text-white">Friction Analysis.</h2>
              <p className="text-white/40 text-lg md:text-xl font-light mb-10 leading-relaxed">Most systems are siloed. We architect a unified neural circuit that captures every lead, recovers every payment, and automates every touchpoint.</p>
              
              <div className="space-y-10">
                {[
                  { title: "Revenue Recovery", desc: "Automated sequences that utilize AI to handle failed billing with member empathy." },
                  { title: "Predictive Intelligence", desc: "Identifying member churn signals before they result in a cancellation." },
                  { title: "Admin Offloading", desc: "Transitioning high-friction manual tasks to intelligent autonomous agents." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-2xl border border-indigo-500/20 flex-shrink-0 flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:border-indigo-500 transition-all duration-500">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full group-hover:scale-150 transition-transform" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg md:text-xl mb-2 text-white group-hover:text-indigo-300 transition-colors tracking-tight">{item.title}</h4>
                      <p className="text-sm text-white/30 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12">
                 <button 
                    onClick={(e) => scrollToSection(e, 'strategy')}
                    className="px-10 py-4 bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all rounded-full text-[10px] font-black uppercase tracking-[0.2em]"
                  >
                    Fix My Bottlenecks
                  </button>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-indigo-500/5 blur-[100px] rounded-full" />
              <div className="relative border border-white/5 bg-white/[0.02] p-10 md:p-14 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
                <div className="space-y-8">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">
                    <span className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                      Live Network Health
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl text-center group hover:bg-white/[0.05] transition-colors">
                      <span className="text-4xl md:text-5xl font-black text-indigo-300 block tracking-tighter mb-2 group-hover:scale-110 transition-transform">14%</span>
                      <span className="text-[9px] text-white/20 uppercase font-black tracking-widest">Average Revenue Leakage</span>
                    </div>
                    <div className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl text-center group hover:bg-white/[0.05] transition-colors">
                      <span className="text-4xl md:text-5xl font-black text-purple-400 block tracking-tighter mb-2 group-hover:scale-110 transition-transform">30h+</span>
                      <span className="text-[9px] text-white/20 uppercase font-black tracking-widest">Weekly Manual Ops</span>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                     <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[65%] animate-[shimmer_3s_infinite]" />
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Solutions */}
      <SectionWrapper id="solutions" className="py-24 md:py-48 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter italic text-white mb-6">Built Assets.</h2>
            <p className="text-white/40 text-lg font-light leading-relaxed">We don't rent you software. We build engineering assets that become permanent equity in your business model.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "AI Workflows", desc: "Qualify every lead and handle every inquiry 24/7 with human-level nuance and zero latency." },
              { title: "Bridge Infrastructure", desc: "Custom-built API layers that unify your CRM, billing, and access control into a single source of truth." },
              { title: "Telemetry Hubs", desc: "Enterprise-grade dashboards providing real-time operational visibility and predictive forecasting." }
            ].map((sol, idx) => (
              <div key={idx} className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all duration-700 group text-left">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                   <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full" />
                </div>
                <h3 className="text-2xl font-bold mb-5 tracking-tight uppercase text-white group-hover:text-indigo-300 transition-colors">{sol.title}</h3>
                <p className="text-white/30 text-sm leading-relaxed font-light mb-8">{sol.desc}</p>
                <button 
                  onClick={(e) => scrollToSection(e, 'strategy')}
                  className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors"
                >
                  View Blueprint +
                </button>
              </div>
            ))}
          </div>
          <div className="mt-20 text-center">
            <button 
              onClick={(e) => scrollToSection(e, 'strategy')}
              className="px-12 py-5 bg-white text-black font-black uppercase text-[11px] tracking-[0.3em] rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-500"
            >
              Build My System
            </button>
          </div>
        </div>
      </SectionWrapper>

      {/* Form Section */}
      <SectionWrapper id="strategy" className="py-24 md:py-48 px-6 bg-[#020202]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 md:gap-32 items-center relative z-10">
          <div className="text-left">
            <h2 className="text-4xl md:text-7xl font-black mb-10 tracking-tighter italic text-white leading-[0.9]">Initiate Audit.</h2>
            <p className="text-white/40 mb-12 text-lg font-light leading-relaxed">Submit your operational constraints. If there is a strategic alignment, we will invite you to a 1-on-1 engineering deep-dive.</p>
            <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-indigo-900/10 to-transparent border border-indigo-500/10 shadow-2xl">
              <p className="italic text-sm md:text-base text-indigo-200/50 leading-loose">
                "We don't optimize for software features. We optimize for your bottom line. Mature infrastructure is the only way to scale vertically without adding headcount."
              </p>
            </div>
          </div>

          <div className="bg-[#080808] p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full" />
            <h3 className="text-3xl font-bold mb-10 tracking-tight text-white text-left">System Assessment</h3>
            {!analysis ? (
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10 text-left">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-white/20 tracking-widest">Principal Name</label>
                    <input type="text" required placeholder="Alex Rivera" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500 outline-none transition-all" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-white/20 tracking-widest">Email Address</label>
                    <input type="email" required placeholder="alex@nexus.ai" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500 outline-none transition-all" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-white/20 tracking-widest">Operational Friction</label>
                  <textarea rows={4} required placeholder="Where is your circuit breaking?" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500 outline-none resize-none transition-all" value={formData.bottlenecks} onChange={e => setFormData({...formData, bottlenecks: e.target.value})} />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-6 bg-white text-black font-black uppercase text-[11px] tracking-[0.3em] rounded-2xl hover:bg-indigo-600 hover:text-white transition-all duration-500 shadow-xl shadow-white/5">
                  {isSubmitting ? "Processing Sequence..." : "Initiate Audit"}
                </button>
              </form>
            ) : (
              <div className="text-center py-10 animate-in fade-in duration-700">
                <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                   <div className="w-4 h-4 bg-indigo-500 rounded-full animate-ping" />
                </div>
                <h4 className="text-3xl font-black mb-6 text-white tracking-tighter italic">Analysis Complete.</h4>
                <p className="text-white/40 mb-10 text-sm font-light leading-relaxed">Your neural bottleneck report has been generated. Directing to the engineering calendar.</p>
                <button onClick={triggerCalendly} className="w-full py-6 bg-indigo-600 text-white font-black uppercase text-[11px] tracking-[0.3em] rounded-2xl hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/30">
                  Book Engineering Audit
                </button>
              </div>
            )}
          </div>
        </div>
      </SectionWrapper>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5 relative z-10 bg-black text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
          <div className="flex items-center gap-4">
            <NeuralBrain className="w-8 h-8" />
            <span className="text-2xl font-black tracking-tighter uppercase italic text-white">HyzaLabs</span>
          </div>
          <div className="text-[10px] text-white uppercase tracking-[0.5em] font-black max-w-lg leading-loose">
            High-Fidelity AI Infrastructure Laboratory. <br/>
            Engineered exclusively for the fitness industry elite.
          </div>
          <div className="flex flex-wrap justify-center gap-12 text-[9px] font-black uppercase tracking-widest text-white">
            <button onClick={() => setActiveModal('privacy')} className="hover:text-indigo-400 transition-colors">Privacy Policy</button>
            <button onClick={() => setActiveModal('disclaimer')} className="hover:text-indigo-400 transition-colors">Disclaimer</button>
            <a href="/logo.png" download="HyzaLabs-Logo.png" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download PNG Logo
            </a>
            <a href="mailto:info@hyzalabs.com" className="hover:text-indigo-400 transition-colors">Contact</a>
          </div>
          <div className="text-[8px] text-white uppercase tracking-[0.2em] mt-10 font-bold opacity-100">© 2024 Protocol Lab 01-X | Foldeaki Group LLC</div>
        </div>
      </footer>

      {/* Cookie Notice */}
      {showCookieNotice && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-96 z-[100] bg-zinc-900 border border-white/10 p-6 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h4 className="text-xs font-black uppercase tracking-widest mb-3">Cookie Notice</h4>
          <p className="text-[10px] text-white/50 leading-relaxed mb-6">
            Our website uses cookies to improve your browsing experience and analyze traffic. By continuing to use our website, you consent to the use of cookies. For more information, see our <button onClick={() => setActiveModal('privacy')} className="text-white underline">Privacy Policy</button>.
          </p>
          <button 
            onClick={handleCookieConsent}
            className="w-full py-3 bg-white text-black font-black uppercase text-[9px] tracking-widest rounded-lg hover:bg-indigo-500 hover:text-white transition-all"
          >
            I Consent
          </button>
        </div>
      )}

      {/* Legal Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-10 relative">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 text-white/20 hover:text-white text-2xl"
            >
              ×
            </button>
            
            {activeModal === 'privacy' && (
              <div className="text-left">
                <h2 className="text-2xl font-black italic mb-6">Privacy Policy</h2>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-8">Effective Date: February 20, 2026</p>
                <div className="space-y-6 text-sm text-white/60 leading-relaxed">
                  <p>Foldeaki Group LLC, a Wyoming limited liability company, respects your privacy. This Privacy Policy explains how we collect, use, and protect personal information on our website.</p>
                  
                  <h4 className="text-white font-bold uppercase text-[10px] tracking-widest">1. Information We Collect</h4>
                  <p>When you use our website contact or booking forms, we may collect: Name, Email address, Phone number (if included).</p>

                  <h4 className="text-white font-bold uppercase text-[10px] tracking-widest">2. How We Use Your Information</h4>
                  <p>We use collected information to respond to inquiries and booking requests, communicate updates related to our services, and improve our website and service offerings.</p>

                  <h4 className="text-white font-bold uppercase text-[10px] tracking-widest">3. Sharing of Information</h4>
                  <p>We do not sell, rent, or share your personal data with third parties.</p>

                  <h4 className="text-white font-bold uppercase text-[10px] tracking-widest">4. Data Security</h4>
                  <p>We take reasonable measures to protect your information. Data is stored securely and retained only as long as necessary.</p>

                  <h4 className="text-white font-bold uppercase text-[10px] tracking-widest">5. Your Rights</h4>
                  <p>For EU users (GDPR compliance), you have the right to access your personal data, correct inaccurate data, and request deletion of your data. To exercise your rights, contact us at info@hyzalabs.com.</p>

                  <h4 className="text-white font-bold uppercase text-[10px] tracking-widest">6. Business Contact Information</h4>
                  <p>Registered Office:<br/>Foldeaki Group LLC<br/>30 N Gould St Ste N<br/>Sheridan, WY 82801<br/>Email: info@hyzalabs.com</p>

                  <h4 className="text-white font-bold uppercase text-[10px] tracking-widest">7. Policy Updates</h4>
                  <p>We may update this policy occasionally. Updates will be posted on this page.</p>
                </div>
              </div>
            )}

            {activeModal === 'disclaimer' && (
              <div className="text-left">
                <h2 className="text-2xl font-black italic mb-6">Disclaimer</h2>
                <div className="space-y-6 text-sm text-white/60 leading-relaxed">
                  <p>The content and AI tools provided by Foldeaki Group LLC are for general informational purposes only.</p>
                  <ul className="list-disc pl-5 space-y-3">
                    <li>AI-generated outputs may not be fully accurate or complete.</li>
                    <li>Use of our website, tools, or advice is at your own risk.</li>
                    <li>We are not liable for any damages, losses, or misuse of the AI services.</li>
                    <li>This website does not provide professional, legal, or financial advice.</li>
                  </ul>
                </div>
              </div>
            )}
            
            <button 
              onClick={() => setActiveModal(null)}
              className="mt-10 w-full py-4 bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-white/10 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;