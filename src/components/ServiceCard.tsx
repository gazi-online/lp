"use client";

import { motion } from "framer-motion";
import { LucideIcon, CheckCircle2 } from "lucide-react";
import * as Icons from "lucide-react";

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  icon_name: string;
}

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onSelect: (service: Service) => void;
}

export default function ServiceCard({ service, isSelected, onSelect }: ServiceCardProps) {
  const Icon = (Icons as any)[service.icon_name] || Icons.HelpCircle;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(service)}
      className={`relative p-8 rounded-[2.5rem] border-4 transition-all cursor-pointer group flex flex-col items-center text-center gap-6 ${
        isSelected 
          ? "border-[var(--accent-blue)] bg-[var(--accent-blue)]/10 shadow-[0_30px_60px_-15px_rgba(0,209,255,0.4)]" 
          : "border-white/10 bg-white/5 hover:border-white/20"
      }`}
    >
      <div className={`w-24 h-24 rounded-3xl flex items-center justify-center transition-all ${
        isSelected ? "bg-[var(--accent-blue)] text-white shadow-lg" : "bg-white/5 text-[var(--text-tertiary)] group-hover:bg-white/10"
      }`}>
        <Icon size={48} strokeWidth={2.5} />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-black uppercase tracking-widest text-[var(--text-primary)]">
          {service.name}
        </h3>
        <p className="text-xs text-[var(--text-tertiary)] font-bold uppercase tracking-[0.2em] opacity-60">
           {service.description}
        </p>
      </div>

      <div className="mt-4 flex flex-col items-center gap-2">
        <div className="text-3xl font-black italic tracking-tighter text-[var(--text-primary)]">
          ₹{service.price}
        </div>
        {isSelected && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 text-[var(--accent-blue)]">
            <CheckCircle2 size={32} />
            <span className="text-[10px] font-black uppercase tracking-widest">বেছে নেওয়া হয়েছে (Selected)</span>
          </motion.div>
        )}
      </div>

      {!isSelected && (
        <div className="px-6 py-2 rounded-full border border-white/5 bg-white/2 text-[9px] font-black uppercase tracking-[0.3em] opacity-30">
          বেছে নিন (Select)
        </div>
      )}
    </motion.div>
  );
}
