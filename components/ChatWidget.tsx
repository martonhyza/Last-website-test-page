import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, AlertCircle } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hey, I'm Cole, Sales Strategy Partner at HyzaLabs. What's on your mind? Ask me literally anything—roofing strategy, automated systems, or even some wild science stuff. Let's chat."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll logic
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Keep track of unread bubble
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setHasNewMessage(true);
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    if (!textToSend) setInput('');
    
    const userMsg: ChatMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error('Network response failed');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
    } catch (err) {
      console.error('Chat widget communication error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry about that, had a quick connection blip on my end. What were we talking about?"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickPrompts = [
    { title: "How do AI agents scale roofing businesses?", text: "How do your AI systems and phone dispatchers help roofing companies scale?" },
    { title: "Is it really Cole or AI?", text: "Are you an artificial intelligence or a real person?" },
    { title: "Solve a complex question", text: "Explain how relativity affects GPS satellite design, but keep it punchy." }
  ];

  return (
    <>
      {/* TRIGGER FLOATING BUBBLE */}
      <div className="fixed bottom-6 right-6 z-[150] pointer-events-auto">
        <button
          id="chat-toggle-btn"
          onClick={() => {
            setIsOpen(!isOpen);
            setHasNewMessage(false);
          }}
          className={`relative group p-4 flex items-center justify-center rounded-full bg-accent hover:bg-accent-2 text-white shadow-2xl shadow-accent/40 cursor-pointer overflow-visible transition-transform hover:scale-110 active:scale-95 duration-250`}
          aria-label="Open Chat Strategy Agent"
        >
          {/* Unread Alert Glow */}
          {hasNewMessage && (
            <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 z-20">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-indigo-500 border border-black flex items-center justify-center text-[8px] font-black">1</span>
            </span>
          )}

          {/* Subtly Animated Online green dot */}
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#020204] rounded-full z-10" />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="message"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <MessageSquare className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Hover invitation badge */}
        {!isOpen && !hasNewMessage && (
          <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-[#020204]/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-text-primary whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 md:group-hover:opacity-100 lg:block hidden transition-all shadow-xl">
            Ask Cole Anything
          </div>
        )}
      </div>

      {/* CHAT PANEL INTERFACE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 w-[90vw] sm:w-[410px] h-[550px] max-h-[75vh] bg-[#0c0c10]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-[150] overflow-hidden flex flex-col"
          >
            {/* Ambient Inner Lights */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-36 h-36 bg-indigo-500/5 blur-[50px] rounded-full pointer-events-none" />

            {/* HEADER */}
            <div className="relative p-4 border-b border-white/10 flex items-center justify-between bg-[#0e0e14]/50 z-10">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-accent/20 to-indigo-500/20 border border-white/10 flex items-center justify-center font-display font-medium text-text-primary overflow-hidden">
                  <div className="absolute inset-0 bg-accent/5 animate-pulse" />
                  <span>C</span>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-black rounded-full" />
                </div>
                
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-text-primary">Cole</span>
                    <span className="text-[9px] font-black uppercase tracking-widest bg-accent/20 text-accent-light px-1.5 py-0.5 rounded-md flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Strategist
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-medium">Online & answering anything</span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-all"
                aria-label="Minimize Chat Window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CHAT MESSAGES BODY */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin z-10"
            >
              {messages.map((msg, i) => {
                const isCole = msg.role === 'assistant';
                return (
                  <div
                    key={i}
                    className={`flex ${isCole ? 'justify-start' : 'justify-end'} group`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        isCole
                          ? 'bg-[#15151e]/80 border border-white/5 text-text-primary rounded-tl-sm'
                          : 'bg-accent text-white rounded-tr-sm shadow-md shadow-accent/10'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}

              {/* Loader Typing State */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#15151e]/80 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 text-sm flex items-center gap-1.5">
                    <span className="text-xs text-text-muted mr-1">Cole is typing</span>
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* FOOTER / INPUT */}
            <div className="relative p-4 border-t border-white/10 bg-[#0e0e14]/50 z-10 space-y-3">
              {/* Quick suggestion prompt pills shown initially or dynamically when chat is short */}
              {messages.length <= 2 && !isLoading && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Suggested:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickPrompts.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(q.text)}
                        className="text-left text-[11px] px-3 py-1.5 rounded-xl bg-white/5 hover:bg-accent/10 hover:text-accent-light border border-white/5 hover:border-accent/20 text-text-secondary font-medium transition-all max-w-full truncate"
                      >
                        {q.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Text Input Row */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask Cole about our systems, roofing or anything..."
                  className="flex-1 bg-[#121218] border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-text-muted/60"
                  disabled={isLoading}
                />
                
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className={`p-3 rounded-xl bg-accent hover:bg-accent-2 text-white transition-all shadow-lg flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:pointer-events-none active:scale-95`}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Note */}
              <p className="text-[9px] text-center text-text-muted">
                HyzaLabs AI Strategy Suite · High Fidelity Systems for Roofing Scale
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
