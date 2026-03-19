"use client";

import { motion } from "framer-motion";
import { Smartphone, QrCode, CreditCard, ShieldCheck } from "lucide-react";

interface PaymentModalProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PaymentModal({ amount, onSuccess, onCancel }: PaymentModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl" 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg liquid-glass p-8 md:p-12 rounded-[3.5rem] border border-white/10 shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-12 bg-[var(--accent-blue)]/10 blur-[60px] pointer-events-none" />
        
        <div className="text-center space-y-2 mb-10">
           <h3 className="text-3xl font-black uppercase italic tracking-tighter text-[var(--text-primary)] transition-colors">Tactical <span className="text-[var(--accent-blue)]">Clearance</span></h3>
           <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em]">Transaction Protocol Hub</p>
        </div>

        <div className="bg-white/5 rounded-3xl p-8 border border-white/5 mb-10 text-center">
           <span className="text-[10px] uppercase font-black tracking-widest text-white/40 block mb-2">Amount to be Authorized</span>
           <div className="text-5xl font-black italic tracking-tighter text-white">₹{amount}</div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
           <button 
             onClick={onSuccess}
             className="flex flex-col items-center gap-4 p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-[var(--accent-blue)]/50 hover:bg-[var(--accent-blue)]/10 transition-all group"
           >
              <Smartphone size={32} className="text-white/20 group-hover:text-[var(--accent-blue)] transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">UPI / GPay Intent</span>
           </button>
           <button 
             className="flex flex-col items-center gap-4 p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group opacity-50 cursor-not-allowed"
           >
              <CreditCard size={32} className="text-white/10" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Card (Disabled)</span>
           </button>
        </div>

        <div className="flex items-center gap-4 px-6 py-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-500 mb-8">
           <ShieldCheck size={20} />
           <span className="text-[9px] font-black uppercase tracking-widest">PCI-DSS Encrypted Pipeline</span>
        </div>

        <button 
          onClick={onCancel}
          className="w-full text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors"
        >
          Cancel Transaction Protocol
        </button>
      </motion.div>
    </div>
  );
}
