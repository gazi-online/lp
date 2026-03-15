"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Phone,
  Video,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

import { useAdminStore, Appointment } from '@/lib/store/useAdminStore';

export default function ScheduleMaster() {
  const { appointments, updateAppointmentStatus } = useAdminStore();

  const handleStatusToggle = (id: string, currentStatus: Appointment['status']) => {
    const statuses: Appointment['status'][] = ['Pending', 'Confirmed', 'Live', 'Completed'];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    updateAppointmentStatus(id, nextStatus);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic flex items-center gap-4 text-purple-400 transition-colors">
            Schedule <span className="text-[var(--text-primary)] transition-colors">Master</span>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center transition-colors">
              <Calendar size={24} className="text-purple-400" />
            </div>
          </h1>
          <p className="text-[var(--text-primary)]/40 text-sm font-bold tracking-[0.2em] uppercase transition-colors">
            সময়সূচী মাস্টার // Master Appointment Grid
          </p>
        </div>

        <div className="admin-glass-card px-6 py-3 rounded-2xl border-[var(--admin-border)] flex items-center gap-6 transition-all">
           <div className="flex flex-col items-center">
              <span className="text-[10px] text-[var(--text-primary)]/30 uppercase font-black transition-colors">March 2026</span>
              <span className="text-[var(--text-primary)] font-black text-xl tracking-tighter transition-colors">14 SAT</span>
           </div>
           <div className="w-px h-10 bg-[var(--admin-border)] transition-colors" />
           <div className="flex gap-2">
              <button className="p-2 border border-[var(--admin-border)] rounded-xl hover:bg-[var(--text-primary)]/5 transition-colors text-[var(--text-primary)] transition-colors"><ChevronLeft size={18} /></button>
              <button className="p-2 border border-[var(--admin-border)] rounded-xl hover:bg-[var(--text-primary)]/5 transition-colors text-[var(--text-primary)] transition-colors"><ChevronRight size={18} /></button>
           </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-8">
         {/* Main Tactical Grid (Queue) */}
         <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between px-4">
               <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--text-primary)]/40 flex items-center gap-2 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
                  Active Queue / আজকের সূচী
               </h3>
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80 bg-emerald-500/5 px-3 py-1.5 rounded-full ring-1 ring-emerald-500/20 transition-all">
                  {appointments.length} Tasks Loaded
               </span>
            </div>

            <div className="space-y-4">
               {appointments.map((app, i) => (
                  <motion.div
                     key={app.id}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className="admin-glass-card p-6 rounded-3xl border-[var(--admin-border)] bg-[var(--text-primary)]/2 hover:bg-[var(--text-primary)]/5 transition-all group overflow-hidden relative"
                  >
                     <div className="relative z-10 grid md:grid-cols-12 items-center gap-6">
                         {/* Time Slot */}
                         <div className="md:col-span-2">
                            <div className="text-lg font-black tracking-tighter text-[var(--text-primary)] transition-colors">{app.time}</div>
                            <div className="text-[10px] text-[var(--text-primary)]/30 uppercase font-bold transition-colors">{app.status === 'Confirmed' ? 'Scheduled' : app.status}</div>
                         </div>

                         {/* Client & Service */}
                         <div className="md:col-span-5 flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs ${
                               app.status === 'Live' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                               app.status === 'Completed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                               'bg-[var(--text-primary)]/5 text-[var(--text-primary)]/60 border border-[var(--admin-border)]'
                            } transition-colors`}>
                               {app.client.split(' ').map((n: string) => n[0]).join('')}
                            </div>
                            <div className="flex flex-col">
                               <span className="text-sm font-bold text-[var(--text-primary)] group-hover:text-emerald-400 transition-colors uppercase tracking-wide transition-colors">{app.client}</span>
                               <span className="text-[10px] text-[var(--text-primary)]/40 uppercase font-bold mt-1 italic transition-colors">{app.service} // {app.service === 'Business Consultation' ? 'ব্যবসায়িক পরামর্শ' : 'ডকুমেন্ট ভেরিফিকেশন'}</span>
                            </div>
                         </div>

                         {/* Modality & Location */}
                         <div className="md:col-span-3">
                            <div className="flex flex-col gap-1">
                               <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)]/60 transition-colors">
                                  {app.type === 'Physical' ? <MapPin size={14} className="text-secondary" /> : <Video size={14} className="text-accent" />}
                                  {app.type}
                               </div>
                               <span className="text-[9px] text-[var(--text-primary)]/20 uppercase font-black transition-colors">{app.location}</span>
                            </div>
                         </div>

                         {/* Status & Actions */}
                         <div className="md:col-span-2 flex items-center justify-end gap-3">
                            <button 
                               onClick={() => handleStatusToggle(app.id, app.status)}
                               className={`p-2 border rounded-xl transition-all ${
                                 app.status === 'Completed' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'border-[var(--admin-border)] text-[var(--text-primary)]/20 hover:bg-emerald-500/10 hover:text-emerald-400'
                               } transition-colors`}
                            >
                               <CheckCircle2 size={18} />
                            </button>
                            <button className="p-2 border border-[var(--admin-border)] rounded-xl hover:bg-[var(--text-primary)]/10 transition-all text-[var(--text-primary)]/20 transition-colors">
                               <MoreVertical size={18} />
                            </button>
                         </div>
                     </div>
                     
                     {/* Dynamic Indicator for Live status */}
                     {app.status === 'Live' && (
                        <div className="absolute top-0 right-0 p-4">
                           <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-lg border border-red-500/20 transition-colors">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                              <span className="text-[8px] font-black uppercase text-red-500 tracking-widest">In Progress</span>
                           </div>
                        </div>
                     )}
                     {app.status === 'Completed' && (
                        <div className="absolute top-0 right-0 p-4">
                           <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/20 transition-colors">
                              <span className="text-[8px] font-black uppercase text-emerald-500 tracking-widest">Mission Complete</span>
                           </div>
                        </div>
                     )}
                  </motion.div>
               ))}
            </div>
         </div>

         {/* Sidebar Stats & Alerts */}
         <div className="lg:col-span-4 space-y-6">
            <div className="admin-glass-card p-8 rounded-[3rem] border-purple-500/20 bg-purple-500/5 space-y-8 transition-all">
               <div className="space-y-2">
                  <h3 className="text-lg font-black italic uppercase tracking-widest text-[var(--text-primary)] transition-colors">Squadron <span className="text-purple-400">Load</span></h3>
                  <p className="text-[10px] text-[var(--text-primary)]/30 uppercase font-black tracking-widest transition-colors">সক্ষমতা পরীক্ষা // Workforce Allocation</p>
               </div>

               <div className="space-y-6">
                  {/* Visual allocation chart (simplified) */}
                  <div className="flex items-end justify-between h-32 gap-4 px-2">
                     {[80, 45, 90, 60, 30].map((h, i) => (
                        <div key={i} className="flex-1 bg-purple-500/10 rounded-t-xl relative group transition-colors">
                           <div 
                              className="absolute bottom-0 w-full bg-gradient-to-t from-purple-800 to-purple-400 rounded-t-xl transition-all duration-700"
                              style={{ height: `${h}%` }}
                           >
                              <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[8px] font-black uppercase text-purple-200">
                                 {h}% Utilized
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="flex justify-between text-[9px] font-black uppercase text-[var(--text-primary)]/20 pt-2 border-t border-[var(--admin-border)] transition-colors">
                     <span>Mon</span>
                     <span>Tue</span>
                     <span>Wed</span>
                     <span>Thu</span>
                     <span>Fri</span>
                  </div>
               </div>
            </div>

            <div className="admin-glass-card p-8 rounded-[3rem] border-[var(--admin-border)] space-y-6 transition-all">
                <div className="flex items-center gap-3">
                   <AlertCircle size={20} className="text-[var(--text-primary)]/40 transition-colors" />
                   <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--text-primary)]/60 transition-colors">Operational Briefing</h4>
                </div>
                <div className="space-y-4">
                   <div className="bg-[var(--admin-bg)] p-4 rounded-2xl border border-[var(--admin-border)] relative overflow-hidden group hover:border-[var(--text-primary)]/10 transition-colors">
                      <div className="relative z-10 flex items-start gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shadow-[0_0_8px_#3B82F6]" />
                         <p className="text-[10px] text-[var(--text-primary)]/50 leading-relaxed italic transition-colors">
                            "System detected 2 physical appointment overlaps in Hasnabad hub at 11:00 AM. Resolution required."
                         </p>
                      </div>
                   </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}
