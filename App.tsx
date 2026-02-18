
import React, { useState } from 'react';
import NeuralBrain from './components/NeuralBrain.tsx';
import SectionWrapper from './components/SectionWrapper.tsx';
import { analyzeBottlenecks } from './services/geminiService.ts';
import { LeadFormData, AnalysisResponse } from './types.ts';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await analyzeBottlenecks(formData);
    setAnalysis(result);
    setIsSubmitting(false);
  };

  const handleBookingRedirect = () => {
    // Redirects to strategy calendar as a next step
    window.open('https://calendly.com/hyzalabs-strategy/session', '_blank');
    setIsBooked(true);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 overflow-hidden font-inter">
      {/* Background Neural Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[30%] w-[20%] h-[20%] bg-indigo-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <NeuralBrain className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight">HyzaLabs</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <a href="#gaps" onClick={(e) => scrollToSection(e, 'gaps')} className="hover:text-white transition-colors">Inefficiencies</a>
            <a href="#solutions" onClick={(e) => scrollToSection(e, 'solutions')} className="hover:text-white transition-colors">Our Solutions</a>
            <a href="#partnership" onClick={(e) => scrollToSection(e, 'partnership')} className="hover:text-white transition-colors">Onboarding</a>
            <a href="#strategy" onClick={(e) => scrollToSection(e, 'strategy')} className="px-5 py-2.5 bg-white text-black rounded-full hover:bg-white/90 transition-all font-semibold">Strategy Session</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <SectionWrapper id="hero" className="pt-48 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-indigo-400 mb-8 uppercase tracking-widest">
            Strategic Fitness Infrastructure
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
            Build Once. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 italic">Scaled Automatically.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            HyzaLabs builds custom AI systems and automation infrastructure designed around your specific operational bottlenecks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#strategy" onClick={(e) => scrollToSection(e, 'strategy')} className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
              Request a Strategy Session
            </a>
            <a href="#gaps" onClick={(e) => scrollToSection(e, 'gaps')} className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all">
              Explore Our Approach
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* Gaps Section */}
      <SectionWrapper id="gaps" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The Hidden Operational Gaps in Modern Gyms</h2>
              <p className="text-white/50 text-lg mb-8 font-light">
                Standard software works for everyone, which means it doesn't truly optimize for anyone. We identify the friction points you've learned to tolerate.
              </p>
              <ul className="space-y-6">
                {[
                  { title: "Failed Payment Leakage", desc: "Automated recovery sequences that actually understand member intent." },
                  { title: "Churn Blind Spots", desc: "Predictive intelligence identifying at-risk members before they cancel." },
                  { title: "Manual Admin Overload", desc: "Offloading low-value repetitive tasks to intelligent neural agents." },
                  { title: "Underutilized Data", desc: "Turning your raw member data into actionable strategic insights." }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 group">
                    <div className="w-6 h-6 rounded-full border border-indigo-500/50 flex-shrink-0 mt-1 flex items-center justify-center group-hover:bg-indigo-500 transition-all">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full group-hover:bg-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-white/40">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full" />
              <div className="relative border border-white/10 bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="h-2 w-2/3 bg-white/10 rounded" />
                  <div className="h-2 w-full bg-white/10 rounded" />
                  <div className="h-2 w-1/2 bg-indigo-500/40 rounded" />
                  <div className="h-2 w-5/6 bg-white/10 rounded" />
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="h-24 rounded-lg bg-white/5 border border-white/5 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-indigo-400">14%</span>
                      <span className="text-[10px] text-white/30 uppercase tracking-widest">Avg. Rev Leakage</span>
                    </div>
                    <div className="h-24 rounded-lg bg-white/5 border border-white/5 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-purple-400">30h+</span>
                      <span className="text-[10px] text-white/30 uppercase tracking-widest">Weekly Manual Ops</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Solutions Section */}
      <SectionWrapper id="solutions" className="py-32 bg-zinc-950/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 italic">What We Actually Build</h2>
            <p className="text-white/40 max-w-xl mx-auto">We don't sell software licenses. We build custom-engineered solutions that integrate with your existing tech stack.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Custom AI Workflows", desc: "Intelligent agents that handle inquiries, lead qualifying, and member follow-ups with human-like nuance." },
              { title: "Automation Systems", desc: "Cross-platform bridges that sync your CRM, billing, and access control without human intervention." },
              { title: "Intelligence Dashboards", desc: "Real-time visibility into operational health, LTV metrics, and performance forecast models." },
              { title: "Process Optimization", desc: "Mapping your business logic into code to ensure every lead is handled with perfection." },
              { title: "Neural Support Agents", desc: "24/7 intelligent member support that handles 80% of routine technical or account questions." },
              { title: "Infrastructure Scaling", desc: "Systems that allow you to double your member count without doubling your administrative staff." }
            ].map((sol, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:translate-y-[-4px] transition-all">
                <div className="w-10 h-10 rounded-lg bg-indigo-900/30 flex items-center justify-center mb-6">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                </div>
                <h3 className="text-xl font-bold mb-4">{sol.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Comparison Section */}
      <SectionWrapper id="comparison" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Why Generic Software Falls Short</h2>
          <div className="grid md:grid-cols-2 gap-12 text-left">
            <div className="p-8 bg-zinc-900/30 rounded-2xl">
              <h4 className="text-indigo-400 font-bold mb-4">SaaS Platforms</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li>• Rigid features you can't change</li>
                <li>• High monthly fees per user/member</li>
                <li>• Siloed data that doesn't talk to other tools</li>
                <li>• Generic support that doesn't know your gym</li>
              </ul>
            </div>
            <div className="p-8 bg-indigo-900/10 rounded-2xl border border-indigo-500/20">
              <h4 className="text-indigo-400 font-bold mb-4">HyzaLabs Custom Infrastructure</h4>
              <ul className="space-y-4 text-sm text-white/90">
                <li>• 100% tailored to your specific logic</li>
                <li>• One-time build or partner model</li>
                <li>• Deep integration with your existing stack</li>
                <li>• Dedicated strategic engineering support</li>
              </ul>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Partnership Section */}
      <SectionWrapper id="partnership" className="py-32 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-indigo-900/20 to-purple-900/20 p-12 text-center border border-white/10">
          <h2 className="text-3xl font-bold mb-6">Early Partner Invitation</h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            We are not a mass-market software vendor. We only take on 2 new fitness partners per month to ensure deep strategic integration and flawless engineering. This is a selective onboarding process designed for gym owners ready for mature infrastructure.
          </p>
          <div className="flex justify-center gap-8 text-sm font-medium uppercase tracking-widest text-indigo-400">
            <div className="flex flex-col">
              <span className="text-3xl text-white font-bold">1/2</span>
              <span>Available Slots</span>
            </div>
            <div className="w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="text-3xl text-white font-bold">14d</span>
              <span>Avg. Setup Time</span>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Strategy Session & Lead Form */}
      <SectionWrapper id="strategy" className="py-32 px-6 bg-zinc-950/80">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold mb-8 italic">Secure Your Strategy Session.</h2>
            <p className="text-white/50 mb-12">
              Tell us about your current bottlenecks. If there is a strategic fit, we will schedule a deep-dive call to map out your custom infrastructure.
            </p>
            
            <div className="p-6 bg-white/5 border border-white/5 rounded-2xl mb-8">
              <h4 className="text-sm font-bold text-white/30 uppercase tracking-widest mb-4">Typical Partner Profile</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2"><span>✔</span> 150+ active members</li>
                <li className="flex gap-2"><span>✔</span> Existing CRM/Billing in place</li>
                <li className="flex gap-2"><span>✔</span> Ready to automate manual friction</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-8 rounded-2xl border border-white/5">
              <h4 className="font-bold mb-2">Our Workflow</h4>
              <p className="text-sm text-white/40 leading-relaxed">
                Once you submit your assessment, our neural engine analyzes the data and provides immediate strategic insights. The next step is a 1-on-1 engineering audit to map your future stack.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-8">Bottleneck Assessment</h3>
              {!analysis ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-white/40 tracking-wider">Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Alex Rivera"
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-indigo-500 transition-all outline-none"
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-white/40 tracking-wider">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="alex@fitnesshub.com"
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-indigo-500 transition-all outline-none"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-white/40 tracking-wider">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-indigo-500 transition-all outline-none"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-white/40 tracking-wider">Monthly Budget Range</label>
                      <select 
                        required
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-indigo-500 transition-all outline-none appearance-none"
                        value={formData.budget}
                        onChange={e => setFormData({...formData, budget: e.target.value})}
                      >
                        <option value="">Select range...</option>
                        <option value="$1k - $3k">$1,000 - $3,000 /mo</option>
                        <option value="$3k - $10k">$3,000 - $10,000 /mo</option>
                        <option value="$10k+">$10,000+ /mo</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-white/40 tracking-wider">Main Business Bottlenecks</label>
                    <textarea 
                      rows={4}
                      required
                      placeholder="Where is your team spending most of their manual time?"
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-indigo-500 transition-all outline-none resize-none"
                      value={formData.bottlenecks}
                      onChange={e => setFormData({...formData, bottlenecks: e.target.value})}
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "Engine Analyzing..." : "Generate Neural Insight Report"}
                  </button>
                </form>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="p-6 bg-indigo-900/20 border border-indigo-500/30 rounded-2xl mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <NeuralBrain className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">HyzaLabs Intelligence Report</span>
                    </div>
                    <ul className="space-y-4 mb-6">
                      {analysis.strategicInsights.map((insight, i) => (
                        <li key={i} className="text-sm text-white/80 flex gap-3">
                          <span className="text-indigo-400">•</span>
                          {insight}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs font-bold text-white/40 uppercase mb-2">Primary Infrastructure Focus:</p>
                      <p className="text-sm italic text-indigo-200">"{analysis.recommendedFocus}"</p>
                    </div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <h4 className="text-xl font-bold">Analysis Complete.</h4>
                    <p className="text-white/40 text-sm">Based on your report, we recommend immediate technical auditing.</p>
                    <button 
                      onClick={handleBookingRedirect}
                      className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                    >
                      {isBooked ? "Booking Page Opened" : "Access Strategy Calendar"}
                    </button>
                    <button 
                      onClick={() => setAnalysis(null)}
                      className="text-xs text-white/20 hover:text-white/40 underline"
                    >
                      Redo Assessment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <NeuralBrain className="w-6 h-6" />
            <span className="text-lg font-bold tracking-tight">HyzaLabs</span>
          </div>
          <div className="flex gap-8 text-xs font-medium text-white/30 uppercase tracking-widest">
            <span>© 2024 HyzaLabs Infrastructure</span>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Intelligence Log</a>
          </div>
          <div className="text-xs text-white/20">
            Engineered for the elite fitness industry.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
