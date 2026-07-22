"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIChatResponse } from '@/services/aiService';

// Logic for a Zod-like validation schema
const validateForm = (data: any) => {
  const errors: Record<string, string> = {};
  if (!data.name || data.name.length < 2) errors.name = "Identifier required (min 2 chars).";
  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) errors.email = "Valid digital address required.";
  if (!data.message || data.message.length < 10) errors.message = "Message depth insufficient.";
  return errors;
};

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'SaaS Platform',
    budget: '$5k - $15k',
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  // AI Assistant State
  const [aiInput, setAiInput] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiDescribe = async () => {
    if (!aiInput.trim()) return;
    setIsAiLoading(true);
    try {
      const prompt = `Help me describe a project professionaly based on these keywords: ${aiInput}. Keep it technical and concise for a developer.`;
      const result = await getAIChatResponse([{ role: 'user', content: prompt }]);
      setAiSuggestion(result);
    } catch {
      setAiSuggestion("Neural link failed. Please try manual entry.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formState);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    setStatus('submitting');
    
    // Simulate API Transmission
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background selection:bg-primary/30 selection:text-primary overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden -z-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-primary rounded-full blur-[200px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, 100, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[200px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section 1: Hero */}
        <section className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase">
              LET&apos;S BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">SOMETHING POWERFUL.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              I help startups and businesses build scalable Project&apos;s using MERN and Full stack with high-performance engineering.
            </p>
          </motion.div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Section 2: Contact Methods */}
          <aside className="lg:col-span-4 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-8">Communication Channels</h3>
            
            <ContactMethod 
              title="Email Transmission" 
              value="saifulislamshams37@gmail.com"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>}
              onClick={() => window.location.href = 'mailto:saifulislamshams37@gmail.com'}
            />

            <ContactMethod 
              title="WhatsApp Direct" 
              value="+92 3169751636"
              accent="bg-[#25D366]"
              icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>}
              onClick={() => window.open('https://wa.me/923169751636?text=Hi%20Saiful,%20I%20want%20to%20discuss%20a%20project', '_blank')}
            />

            <ContactMethod 
              title="Scheduling Node" 
              value="Book an Architecture Review"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>}
              onClick={() => {}}
            />

            <div className="pt-12">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#00F5FF]"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">System Status: ONLINE</span>
               </div>
               <div className="p-6 bg-card border border-white/5 rounded-2xl">
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Availability Protocol</p>
                  <p className="text-sm text-gray-400 font-light">Available for Q3/Q4 2026 enterprise projects. Usually responds in &lt; 2 hours.</p>
               </div>
            </div>
          </aside>

          {/* Section 3: Contact Form */}
          <main className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-white/5 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="py-24 text-center"
                  >
                    <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
                       <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <h2 className="text-3xl font-black text-white mb-4">TRANSMISSION SUCCESSFUL</h2>
                    <p className="text-gray-400 mb-8">Your project architecture has been queued for review. Stand by for contact.</p>
                    <button onClick={() => setStatus('idle')} className="text-primary text-xs font-black uppercase tracking-widest underline">Reset Terminal</button>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormInput 
                        label="Identifier (Name)" 
                        error={errors.name}
                        value={formState.name}
                        onChange={(v) => setFormState({...formState, name: v})}
                        placeholder="Project Stakeholder"
                      />
                      <FormInput 
                        label="Digital Address (Email)" 
                        error={errors.email}
                        value={formState.email}
                        onChange={(v) => setFormState({...formState, email: v})}
                        placeholder="contact@domain.com"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black">Project Vertical</label>
                        <select 
                          value={formState.projectType}
                          onChange={(e) => setFormState({...formState, projectType: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all appearance-none text-sm"
                        >
                          {['SaaS Platform', 'E-commerce Engine', 'AI/ML Integration', 'Mobile Hybrid', 'Custom Architecture'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black">Fiscal Allocation (Budget)</label>
                        <select 
                          value={formState.budget}
                          onChange={(e) => setFormState({...formState, budget: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all appearance-none text-sm"
                        >
                          {['< $5k', '$5k - $15k', '$15k - $50k', '$50k+'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-end mb-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black">Logic Breakdown (Message)</label>
                        {errors.message && <span className="text-rose-500 text-[10px] font-bold uppercase">{errors.message}</span>}
                      </div>
                      <textarea 
                        rows={6}
                        value={formState.message}
                        onChange={(e) => setFormState({...formState, message: e.target.value})}
                        placeholder="Describe the technical scope and scaling requirements..."
                        className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-primary/50 transition-all text-sm resize-none"
                      />
                    </div>

                    {/* Section 5: AI Assistance */}
                    <div className="p-8 bg-primary/5 border border-primary/20 rounded-2xl">
                       <div className="flex flex-col md:flex-row gap-6 items-center">
                          <div className="flex-1">
                             <h4 className="text-white text-xs font-black uppercase mb-1">AI Project Descriptor</h4>
                             <p className="text-[10px] text-gray-500 uppercase tracking-widest">Not sure how to describe the stack? Let AI bridge the gap.</p>
                             <div className="mt-4 flex gap-2">
                                <input 
                                  type="text" 
                                  value={aiInput}
                                  onChange={(e) => setAiInput(e.target.value)}
                                  placeholder="Keywords: Scalable, React, Redis..."
                                  className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-primary/50"
                                />
                                <button 
                                  type="button"
                                  onClick={handleAiDescribe}
                                  disabled={isAiLoading}
                                  className="px-4 py-2 bg-primary text-black text-[10px] font-black uppercase rounded-lg hover:scale-105 transition-transform"
                                >
                                  {isAiLoading ? 'SYNCING...' : 'GENERATE'}
                                </button>
                             </div>
                          </div>
                          {aiSuggestion && (
                            <div className="flex-1 p-4 bg-black/50 rounded-xl border border-white/5 text-[11px] text-gray-400 italic">
                               {aiSuggestion}
                               <button 
                                 type="button"
                                 onClick={() => setFormState({...formState, message: aiSuggestion})}
                                 className="block mt-2 text-primary font-bold uppercase hover:underline"
                               >
                                 USE SUGGESTION
                               </button>
                            </div>
                          )}
                       </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-5 bg-primary text-black font-black uppercase tracking-[0.2em] rounded-2xl shadow-[0_0_30px_rgba(0,245,255,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {status === 'submitting' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                          UPLOADING DATA...
                        </>
                      ) : 'INITIATE PROJECT HANDSHAKE'}
                    </button>
                    
                    <p className="text-center text-[9px] text-gray-600 uppercase font-black tracking-widest">
                      <svg className="w-3 h-3 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                      Secure Connection • Zero-Knowledge Policy
                    </p>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

const FormInput: React.FC<{ 
  label: string, 
  error?: string, 
  value: string, 
  onChange: (v: string) => void,
  placeholder: string
}> = ({ label, error, value, onChange, placeholder }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end mb-2">
      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black">{label}</label>
      {error && <span className="text-rose-500 text-[10px] font-bold uppercase">{error}</span>}
    </div>
    <input 
      type="text" 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-black/50 border ${error ? 'border-rose-500' : 'border-white/10'} rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all text-sm`}
    />
  </div>
);

const ContactMethod: React.FC<{ 
  title: string, 
  value: string, 
  icon: React.ReactNode, 
  accent?: string,
  onClick: () => void 
}> = ({ title, value, icon, accent = "bg-white/5", onClick }) => (
  <button 
    onClick={onClick}
    className="w-full p-6 bg-card border border-white/10 rounded-2xl group flex items-center gap-6 hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
  >
    <div className={`w-12 h-12 ${accent} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1">{title}</p>
      <p className="text-white font-bold text-sm tracking-tight">{value}</p>
    </div>
    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
       <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
    </div>
  </button>
);

export default Contact;
