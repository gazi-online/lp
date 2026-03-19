"use client";

import { motion } from "framer-motion";
import { Clock, CheckCircle2 } from "lucide-react";

interface Slot {
  start: string;
  end: string;
  isAvailable: boolean;
}

interface SlotPickerProps {
  slots: Slot[];
  selectedSlot: Slot | null;
  onSelect: (slot: Slot) => void;
  isLoading: boolean;
}

export default function SlotPicker({ slots, selectedSlot, onSelect, isLoading }: SlotPickerProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-16 bg-white/5 rounded-2xl border border-white/10" />
        ))}
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-[2rem] border border-dashed border-white/20">
        <Clock size={48} className="text-[var(--text-tertiary)] mb-4" />
        <p className="text-sm uppercase font-black tracking-widest text-[var(--text-secondary)]">আজ কোনো সময় ফাঁকা নেই (No Slots Available Today)</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {slots.map((slot, i) => {
        const isSelected = selectedSlot?.start === slot.start;
        return (
          <motion.button
            key={i}
            disabled={!slot.isAvailable}
            whileHover={slot.isAvailable ? { scale: 1.05 } : {}}
            whileTap={slot.isAvailable ? { scale: 0.95 } : {}}
            onClick={() => onSelect(slot)}
            className={`relative p-8 rounded-3xl font-black text-xl tracking-widest border-4 transition-all shadow-md ${
              isSelected
                ? "border-[var(--accent-blue)] bg-[var(--accent-blue)] text-white shadow-[0_20px_40px_-5px_rgba(0,209,255,0.4)] z-10"
                : slot.isAvailable
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500 hover:border-emerald-500"
                : "border-red-500/10 bg-red-500/5 text-red-500/30 cursor-not-allowed opacity-50"
            }`}
          >
            <div className="flex flex-col items-center gap-1">
               <span>{slot.start}</span>
               <span className="text-[9px] font-black uppercase tracking-widest">
                 {slot.isAvailable ? "ফাঁকা আছে (Open)" : "বুক করা আছে (Full)"}
               </span>
            </div>
            {isSelected && (
              <motion.div 
                layoutId="slot-accent"
                className="absolute top-2 right-2" 
              >
                <CheckCircle2 size={20} />
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
