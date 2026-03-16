"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Clock, CheckCircle2, Truck, ArrowLeft, ShieldCheck, Activity } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const statuses = [
  { id: "submitted", label: "আবেদন জমা হয়েছে", sub: "ID VERIFIED", icon: Clock, color: "text-[var(--accent-saffron)]", bg: "bg-[var(--accent-saffron)]/10" },
  { id: "processing", label: "প্রক্রিয়াধীন", sub: "IN ANALYSIS", icon: Package, color: "text-[var(--accent-blue)]", bg: "bg-[var(--accent-blue)]/10" },
  { id: "ready", label: "প্রস্তুত", sub: "DISPATCH READY", icon: CheckCircle2, color: "text-[var(--accent-purple)]", bg: "bg-[var(--accent-purple)]/10" },
  { id: "delivered", label: "ডেলিভারি সম্পন্ন", sub: "SUCCESSFUL DELIVERY", icon: Truck, color: "text-[var(--accent-green)]", bg: "bg-[var(--accent-green)]/10" },
];

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return;

    setIsSearching(true);
    // Simulate lookup
    setTimeout(() => {
      setResult({
        id: trackingId.toUpperCase(),
        name: "GAZI USER",
        service: "PVC কার্ডের অর্ডার (PVC Card Order)",
        currentStatus: "processing",
        history: [
          { status: "submitted", time: "14 Mar 2026, 09:12 AM" },
          { status: "processing", time: "14 Mar 2026, 11:45 AM" },
        ]
      });
      setIsSearching(false);
    }, 1500);
  };

  return (
    <main className={`min-h-screen bg-[var(--bg-primary)] transition-all duration-700 relative overflow-hidden flex flex-col ${result ? 'py-6 md:py-10' : 'py-16 md:py-24'}`}>
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-gradient-to-b from-[var(--accent-blue)]/5 to-transparent pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-[var(--accent-blue)]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[30vw] h-[30vw] bg-[var(--accent-purple)]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col">
        {/* Compact Back Button */}
        <Link 
          href="/"
          className={`inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all group ${result ? 'mb-6' : 'mb-16'}`}
        >
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-[var(--accent-blue)]/50">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Hub</span>
        </Link>

        <div className={`w-full max-w-5xl mx-auto flex flex-col transition-all duration-700 ${result ? 'flex-1' : ''}`}>
          {/* Reactive Header */}
          <header className={`text-center transition-all duration-700 ${result ? 'mb-8 opacity-60 scale-95 origin-top' : 'mb-16 space-y-6'}`}>
            {!result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20 shadow-[0_0_20px_rgba(0,209,255,0.15)] mb-6"
              >
                <Activity size={12} className="text-[var(--accent-blue)] animate-pulse" />
                <span className="text-[9px] font-black text-[var(--accent-blue)] uppercase tracking-[0.2em]">Live Tracking Active</span>
              </motion.div>
            )}
            
            <div className="space-y-3">
              <h1 className={`${result ? 'text-2xl md:text-3xl' : 'text-4xl md:text-6xl'} font-black text-[var(--text-primary)] font-serif uppercase tracking-tighter leading-none transition-all duration-700`} style={{ textShadow: 'var(--liquid-text-shadow)' }}>
                {result ? "Tracking Console" : "আপনার আবেদনের অবস্থা জানুন"}
              </h1>
              {!result && (
                <p className="text-[var(--text-secondary)] font-bold text-lg max-w-xl mx-auto leading-relaxed">
                  আপনার ট্র্যাকিং আইডি ব্যবহার করে প্যান কার্ড বা অন্যান্য পরিষেবার অবস্থা পরীক্ষা করুন।
                </p>
              )}
            </div>
          </header>

          {/* Compact Form */}
          <motion.form 
            layout
            onSubmit={handleSearch} 
            className={`relative group transition-all duration-700 ${result ? 'mb-12 max-w-xl mx-auto w-full' : 'mb-20'}`}
          >
            <div className="absolute inset-0 bg-[var(--accent-blue)]/10 blur-[30px] opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
            <input 
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="ট্র্যাকিং আইডি লিখুন (e.g. GZ-12345)"
              className={`w-full bg-white/5 border border-white/10 rounded-2xl md:rounded-full transition-all duration-700 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-blue)]/10 font-black liquid-glass-button ${result ? 'pl-4 sm:pl-6 pr-[100px] sm:pr-[120px] py-4 text-sm sm:text-base' : 'pl-6 sm:pl-8 pr-[110px] sm:pr-[140px] py-5 sm:py-7 text-base sm:text-xl'}`}
            />
            <button 
              type="submit"
              disabled={isSearching}
              className={`absolute right-2 top-2 bottom-2 bg-[var(--accent-blue)] text-white font-black rounded-xl md:rounded-full transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_10px_20px_-5px_rgba(0,209,255,0.4)] active:scale-95 group/btn ${result ? 'w-[84px] sm:w-auto sm:px-6 text-[10px] sm:text-xs' : 'w-[94px] sm:w-auto sm:px-10 text-[11px] sm:text-sm'}`}
            >
              {isSearching ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Search size={result ? 16 : 20} className="group-hover/btn:scale-110 transition-transform shrink-0" />
                  <span className="uppercase tracking-widest hidden sm:inline-block">{result ? "Update" : "খুঁজুন"}</span>
                  <span className="uppercase tracking-widest sm:hidden">{result ? "Upd" : "খুঁজুন"}</span>
                </>
              )}
            </button>
          </motion.form>

          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="flex-1 flex flex-col md:flex-row gap-8 min-h-0"
              >
                {/* Identity Sidebar */}
                <div className="md:w-[320px] shrink-0 space-y-6">
                  <div className="liquid-glass p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent-blue)]/10 blur-[40px] pointer-events-none" />
                    <div className="relative space-y-6">
                      <div>
                        <p className="text-[9px] text-[var(--text-primary)]/40 font-black uppercase tracking-[0.4em] mb-2">Subject Name</p>
                        <h3 className="text-[var(--text-primary)] font-black text-2xl uppercase tracking-tighter leading-none">{result.name}</h3>
                      </div>
                      <div>
                        <p className="text-[9px] text-[var(--text-primary)]/40 font-black uppercase tracking-[0.4em] mb-2">Active Service</p>
                        <p className="text-[var(--accent-blue)] text-xs font-black uppercase tracking-[0.2em] bg-[var(--accent-blue)]/10 px-3 py-2 rounded-xl inline-block border border-[var(--accent-blue)]/20 shadow-[0_0_15px_rgba(0,209,255,0.1)]">
                          {result.service}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-[9px] text-[var(--text-primary)]/40 font-black uppercase tracking-[0.4em] mb-1">Session Token</p>
                        <p className="text-[var(--text-primary)] font-black text-xl tracking-[0.2em]">{result.id}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={18} className="text-[var(--accent-green)]" />
                      <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Secured Node</span>
                    </div>
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
                  </div>
                </div>

                {/* Timeline Main View */}
                <div className="flex-1 liquid-glass p-8 md:p-10 rounded-[3rem] border border-white/10 flex flex-col min-h-0 relative overflow-hidden">
                   <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--accent-blue)]/5 blur-[80px] pointer-events-none" />
                   
                   <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                      <h4 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-[0.4em]">Lifecycle Progress</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-[var(--accent-blue)] uppercase tracking-widest">Online</span>
                        <div className="w-1 h-1 rounded-full bg-[var(--accent-blue)] animate-ping" />
                      </div>
                   </div>

                   <div className="flex-1 overflow-y-auto custom-scrollbar-hidden space-y-1 relative pr-4">
                      {/* Vertical line with gradient */}
                      <div className="absolute left-[27px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[var(--accent-green)] via-[var(--accent-blue)]/20 to-transparent" />
                      
                      {statuses.map((status, idx) => {
                        const historyItem = result.history.find((h: any) => h.status === status.id);
                        const isActive = status.id === result.currentStatus;
                        const isPast = result.history.some((h: any) => h.status === status.id);

                        return (
                          <div 
                            key={status.id} 
                            className={`flex items-start gap-8 py-4 relative z-10 transition-all duration-500 ${!isPast && !isActive ? 'opacity-20 grayscale scale-95 origin-left' : 'opacity-100 scale-100'}`}
                          >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shrink-0 ${
                              isActive 
                                ? 'border-[var(--accent-blue)] bg-[var(--accent-blue)]/20 shadow-[0_0_30px_rgba(0,209,255,0.25)]' 
                                : isPast 
                                  ? 'border-[var(--accent-green)] bg-[var(--accent-green)] text-white' 
                                  : 'border-white/10 bg-white/5'
                            }`}>
                              {isPast && !isActive ? <CheckCircle2 size={24} className="text-white" /> : <status.icon size={26} className={isActive ? 'text-[var(--accent-blue)]' : 'text-[var(--text-tertiary)]'} />}
                            </div>
                            
                            <div className="pt-2">
                              <div className="flex items-center gap-3 mb-1">
                                <h4 className={`text-base font-black uppercase tracking-tight ${isActive ? 'text-[var(--accent-blue)]' : 'text-[var(--text-primary)]'}`}>
                                  {status.label}
                                </h4>
                                {isActive && (
                                  <div className="px-2 py-0.5 rounded-full bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20">
                                    <span className="text-[8px] text-[var(--accent-blue)] font-black uppercase tracking-widest">Active</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-[8px] text-[var(--text-primary)]/40 font-black uppercase tracking-[0.3em] mb-2">{status.sub}</p>
                              
                              {historyItem && (
                                <div className="text-[9px] text-[var(--text-secondary)] font-bold flex items-center gap-2">
                                  <Clock size={10} className="text-[var(--text-tertiary)]" />
                                  {historyItem.time}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
