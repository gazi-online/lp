"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  ShieldCheck, 
  Clock, 
  Activity, 
  Star, 
  MessageCircle, 
  Settings,
  MoreVertical,
  ChevronRight,
  UserPlus
} from 'lucide-react';

import { useAdminStore, Officer } from '@/lib/store/useAdminStore';

export default function SquadronCommand() {
  const { squadron, updateOfficerStatus } = useAdminStore();

  const handleStatusToggle = (id: string, currentStatus: Officer['status']) => {
    const statuses: Officer['status'][] = ['Standby', 'On Mission', 'On Leave'];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    updateOfficerStatus(id, nextStatus);
  };

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic flex items-center gap-4 text-amber-500 transition-colors">
            Squadron <span className="text-[var(--text-primary)] transition-colors">Command</span>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center transition-colors">
              <Users size={24} className="text-amber-500" />
            </div>
          </h1>
          <p className="text-[var(--text-primary)]/40 text-sm font-bold tracking-[0.2em] uppercase transition-colors">
            স্কোয়াড্রন কমান্ড // Workforce & Performance Monitoring
          </p>
        </div>

        <button className="bg-amber-500 px-6 py-3 rounded-2xl text-[#00011A] font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2">
           <UserPlus size={18} /> Recruit Personnel / নিয়োগ করুন
        </button>
      </motion.div>

      {/* Ranks & Performance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {squadron.map((officer, i) => (
            <motion.div
               key={officer.id}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               className="admin-glass-card p-8 rounded-[3rem] border-[var(--admin-border)] hover:bg-[var(--text-primary)]/5 transition-all group overflow-hidden relative"
            >
               <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                  {/* Personnel Profile Image / Icon */}
                  <div 
                    className="relative shrink-0 cursor-pointer"
                    onClick={() => handleStatusToggle(officer.id, officer.status)}
                  >
                     <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[var(--text-primary)]/10 to-transparent p-[1px] shadow-2xl transition-all">
                        <div className="w-full h-full rounded-[23px] bg-[var(--admin-bg)] flex items-center justify-center font-black text-2xl text-[var(--text-primary)]/20 group-hover:text-amber-500/40 transition-colors">
                           {officer.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                     </div>
                     <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-lg border-2 border-[var(--admin-bg)] flex items-center justify-center transition-colors ${
                        officer.status === 'On Mission' ? 'bg-emerald-500' : 
                        officer.status === 'Standby' ? 'bg-amber-400' : 'bg-red-500'
                     }`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                     </div>
                  </div>

                  {/* Personnel Intel */}
                  <div className="flex-1 space-y-4">
                     <div className="flex justify-between items-start">
                        <div>
                           <h3 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight group-hover:text-amber-500 transition-colors leading-none transition-colors">{officer.name}</h3>
                           <p className="text-[10px] text-[var(--text-primary)]/30 font-black uppercase tracking-widest mt-1.5 transition-colors">{officer.role} // পদবী</p>
                        </div>
                        <div className="flex gap-2">
                           <button className="p-2 border border-[var(--admin-border)] rounded-xl hover:bg-[var(--text-primary)]/5 transition-colors text-[var(--text-primary)]/20 hover:text-[var(--text-primary)] transition-colors"><MessageCircle size={16}/></button>
                           <button className="p-2 border border-[var(--admin-border)] rounded-xl hover:bg-[var(--text-primary)]/5 transition-colors text-[var(--text-primary)]/20 hover:text-[var(--text-primary)] transition-colors"><MoreVertical size={16}/></button>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[var(--text-primary)]/5 p-4 rounded-2xl border border-[var(--admin-border)] group-hover:border-[var(--text-primary)]/10 transition-colors">
                           <div className="flex items-center gap-2 mb-1">
                              <Activity size={14} className="text-emerald-500" />
                              <span className="text-[9px] font-black uppercase text-[var(--text-primary)]/30 tracking-widest leading-none transition-colors">Efficiency</span>
                           </div>
                           <div className="text-lg font-black text-emerald-500">{officer.efficiency}</div>
                        </div>
                        <div className="bg-[var(--text-primary)]/5 p-4 rounded-2xl border border-[var(--admin-border)] group-hover:border-[var(--text-primary)]/10 transition-colors">
                           <div className="flex items-center gap-2 mb-1">
                              <Star size={14} className="text-blue-500" />
                              <span className="text-[9px] font-black uppercase text-[var(--text-primary)]/30 tracking-widest leading-none transition-colors">Loyalty</span>
                           </div>
                           <div className="text-lg font-black text-blue-500">{officer.experience}</div>
                        </div>
                     </div>

                     <div className="flex items-center gap-3 pt-2">
                        <span className="text-[9px] font-black uppercase px-2 py-1 bg-[var(--text-primary)]/10 rounded-lg text-[var(--text-primary)]/40 border border-[var(--admin-border)] transition-all group-hover:border-amber-500/20 group-hover:text-amber-500/60 uppercase tracking-widest line-clamp-1 transition-colors">
                           Core: {officer.specialty}
                        </span>
                        <div className="flex-1 h-px bg-[var(--admin-border)] transition-colors" />
                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-colors ${
                           officer.status === 'On Mission' ? 'text-emerald-500' : 
                           officer.status === 'Standby' ? 'text-amber-400' : 'text-red-400'
                        }`}>
                           {officer.status}
                        </span>
                     </div>
                  </div>
               </div>
               
               {/* Abstract Background Decoration */}
               <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-amber-500/5 blur-3xl rounded-full" />
            </motion.div>
         ))}
      </div>

      {/* Workforce Deployment Metrics */}
      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.4 }}
         className="admin-glass-card p-8 rounded-[3rem] border-[var(--admin-border)] space-y-8 transition-all"
      >
         <div>
            <h3 className="text-lg font-black uppercase italic tracking-widest text-[var(--text-primary)] transition-colors">Command <span className="text-amber-500">Utilization</span></h3>
            <p className="text-[10px] text-[var(--text-primary)]/30 uppercase font-black tracking-widest mt-1 transition-colors">কর্মশক্তি ব্যবহার // Operational Distribution</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
            {[
               { label: 'FinTech OPS', value: '42%', color: 'from-blue-600 to-blue-400' },
               { label: 'Logistics / PVC', value: '38%', color: 'from-emerald-600 to-emerald-400' },
               { label: 'Client Support', value: '20%', color: 'from-amber-600 to-amber-400' }
            ].map((metric, i) => (
               <div key={i} className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest transition-colors">
                     <span className="text-[var(--text-primary)]/60 transition-colors">{metric.label}</span>
                     <span className="text-[var(--text-primary)] transition-colors">{metric.value}</span>
                  </div>
                  <div className="h-2 w-full bg-[var(--admin-bg)] rounded-full overflow-hidden border border-[var(--admin-border)] shadow-inner transition-colors">
                     <div 
                        className={`h-full bg-gradient-to-r ${metric.color} transition-all duration-1000`} 
                        style={{ width: metric.value }} 
                     />
                  </div>
               </div>
            ))}
         </div>
      </motion.div>
    </div>
  );
}
