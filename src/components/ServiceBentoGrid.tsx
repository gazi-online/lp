import { motion, LayoutGroup, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { SERVICE_PILLARS, SERVICE_CATALOG } from "@/data/services";
import Link from "next/link";

const services = SERVICE_PILLARS.map(pillar => ({
  ...pillar,
  subServices: SERVICE_CATALOG
    .filter(cat => cat.pillarId === pillar.id)
    .flatMap(cat => cat.subServices)
}));

function StatCard({ label, value, subtext }: { label: string; value: string; subtext: string; icon?: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const dx = useSpring(x, springConfig);
  const dy = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.2);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -5, scale: 1.05 }}
      className="text-center px-8 py-4 rounded-3xl transition-all group cursor-default relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        <div className="text-[var(--text-primary)]/40 text-[9px] uppercase font-black tracking-[0.3em] mb-3 transition-colors group-hover:text-[var(--accent-blue)] flex items-center justify-center gap-2">
          {label}
        </div>
        <motion.div 
          className="text-4xl font-black text-[var(--text-primary)] mb-1 tracking-tighter transition-colors group-hover:scale-110 duration-500" 
          style={{ textShadow: 'var(--liquid-text-shadow)', x: dx, y: dy }}
        >
          {value}
        </motion.div>
        <div className="text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-widest transition-colors group-hover:text-[var(--text-primary)]">{subtext}</div>
      </div>
    </motion.div>
  );
}

export function ServiceBentoGrid({ onApply }: { onApply?: () => void }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="container mx-auto px-4 py-32 relative z-10">
      {/* Global Impact Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mb-24 liquid-glass rounded-[3.5rem] p-4 border border-white/5 flex flex-wrap justify-center md:justify-around gap-4 transition-all shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]"
      >
        <StatCard label="Infrastructure" value="400K+" subtext="Centers Across Bharat" />
        <div className="hidden md:block w-px h-12 bg-white/5 self-center" />
        <StatCard label="Impact" value="500M+" subtext="Annual Transactions" />
        <div className="hidden md:block w-px h-12 bg-white/5 self-center" />
        <StatCard label="Investment" value="$1.2B" subtext="Injected for CSC 2.0" />
        <div className="hidden md:block w-px h-12 bg-white/5 self-center" />
        <StatCard label="Speed" value="<30s" subtext="AI-Enabled Delivery" />
      </motion.div>

      <div className="mb-24 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[var(--accent-blue)]/10 blur-[120px] -z-10 transition-colors" />
        
        <h2 className="text-5xl md:text-7xl text-[var(--text-primary)] mb-8 font-black tracking-tight font-serif drop-shadow-sm transition-colors">
          আমাদের <span className="bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] bg-clip-text text-transparent">পরিসেবাসমূহ</span>
        </h2>
        <p className="text-lg md:text-2xl text-[var(--text-secondary)] font-bold max-w-3xl mx-auto leading-relaxed transition-colors">
          ভারত ডিজিটাল গ্রিড উদ্যোগের অধীনে পরিচালিত <br className="hidden md:block" /> 
          বিশ্বের বৃহত্তম গ্রামীণ ডিজিটাল ইনফ্রাস্ট্রাকচার। 
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[minmax(280px,auto)]">
        <LayoutGroup>
          {services.map((service) => {
            const isExpanded = expandedId === service.id;
            const Icon = service.icon;

            return (
              <motion.div
                layout
                key={service.id}
                onClick={() => setExpandedId(isExpanded ? null : service.id)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
                className={`group relative cursor-pointer rounded-[3.5rem] overflow-hidden border border-white/5 hover:border-[var(--accent-blue)]/40 hover-glow-card transition-all duration-500 ${service.colSpan} ${isExpanded ? 'md:col-span-12 row-span-2 shadow-2xl z-20' : service.rowSpan + ' z-10'}`}
                whileHover={{ scale: isExpanded ? 1 : 1.01 }}
                transition={{ 
                  layout: { duration: 0.6, type: "spring", bounce: 0.2 },
                  opacity: { duration: 0.2 }
                }}
              >
                {/* Dynamic Glass Glow Interaction */}
                <div className="absolute inset-0 glass-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-[var(--bg-primary)]/20 backdrop-blur-xl transition-colors" />
              
                <div className="relative h-full p-10 flex flex-col z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="relative">
                      <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl ring-1 ring-white/20 relative flex items-center justify-center transition-all group-hover:scale-110 duration-500 group-hover:bg-[var(--accent-blue)]">
                        <Icon className="w-8 h-8 text-[var(--text-primary)] group-hover:text-white transition-colors" />
                      </div>
                    </div>
                    {service.badge && (
                      <span className="bg-[var(--accent-blue)] text-white text-[10px] font-black tracking-widest px-4 py-2 rounded-full ring-1 ring-white/20 shadow-xl uppercase transition-colors">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto">
                    <motion.h3 layout="position" className="text-3xl text-[var(--text-primary)] mb-3 font-black drop-shadow-xl transition-colors">
                      {service.title}
                    </motion.h3>
                    
                    {!isExpanded && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[var(--text-secondary)] font-bold text-sm line-clamp-2 transition-colors"
                      >
                        {service.description}
                      </motion.p>
                    )}

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 border-t border-white/5 pt-8 transition-colors"
                      >
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {service.subServices.map((sub, idx) => (
                            <li key={idx} className="flex items-center gap-4 text-[var(--text-primary)] font-black group/item transition-colors">
                              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center ring-1 ring-white/10 group-hover/item:bg-[var(--accent-blue)] transition-all duration-300">
                                <ChevronRight className="w-5 h-5 text-[var(--text-primary)] group-hover/item:text-white transition-colors" />
                              </div>
                              <span className="text-lg">{sub}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-12 flex justify-end">
                          {service.id === 'digital' ? (
                            <Link 
                              href="/order-pvc"
                              className="liquid-glass-button text-[var(--text-primary)] font-black px-12 py-5 rounded-2xl uppercase tracking-wider text-sm shadow-2xl inline-block"
                            >
                              পরিষেবা শুরু করুন
                            </Link>
                          ) : (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                if ((service.id === 'remort' || service.id === 'pan') && onApply) onApply();
                              }}
                              className="liquid-glass-button text-[var(--text-primary)] font-black px-12 py-5 rounded-2xl uppercase tracking-wider text-sm shadow-2xl"
                            >
                              পরিষেবা শুরু করুন
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </LayoutGroup>
      </div>
    </section>
  );
}
