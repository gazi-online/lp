"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  Terminal, 
  Settings, 
  Database, 
  HardDrive, 
  Cpu, 
  Lock, 
  Zap,
  Activity,
  History,
  Trash2,
  RefreshCw,
  ChevronRight
} from 'lucide-react';

import { useAdminStore } from '@/lib/store/useAdminStore';
import { useRouter } from 'next/navigation';

export default function RootAccess() {
  const router = useRouter();

  const handleWipeCache = () => {
    localStorage.removeItem('nexus-command-storage');
    window.location.reload();
  };

  const handleReboot = () => {
    if (confirm('Initiate System Reboot? // সিস্টেম রিবুট শুরু করবেন?')) {
      window.location.reload();
    }
  };

  const handleLockdown = () => {
    if (confirm('EMERGENCY: Initiate System Lockdown? // জরুরি: সিস্টেম লকডাউন শুরু করবেন?')) {
      localStorage.removeItem('nexus-token');
      router.push('/admin/auth');
    }
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
          <h1 className="text-4xl font-black tracking-tighter uppercase italic flex items-center gap-4 text-red-500 transition-colors">
            Root <span className="text-[var(--text-primary)] transition-colors">Access</span>
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center transition-colors">
              <ShieldAlert size={24} className="text-red-500" />
            </div>
          </h1>
          <p className="text-[var(--text-primary)]/40 text-sm font-bold tracking-[0.2em] uppercase transition-colors">
            রুট অ্যাক্সেস // Deep System Core Control
          </p>
        </div>

        <div className="flex gap-4">
           <button 
              onClick={handleLockdown}
              className="bg-red-500/10 border border-red-500/30 px-6 py-3 rounded-2xl text-red-500 font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-[#00011A] transition-all flex items-center gap-2"
           >
              <Lock size={18} /> Initiate Lockdown / লকডাউন
           </button>
        </div>
      </motion.div>

      {/* System Core Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'CORE TEMP', value: '42°C', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10', sub: 'Optimal' },
           { label: 'DB UPTIME', value: '99.99%', icon: Database, color: 'text-blue-500', bg: 'bg-blue-500/10', sub: 'Healthy' },
           { label: 'CPU LOAD', value: '12.4%', icon: Cpu, color: 'text-emerald-500', bg: 'bg-emerald-500/10', sub: 'Normal' },
           { label: 'STORAGE', value: '2.4 TB', icon: HardDrive, color: 'text-purple-500', bg: 'bg-purple-500/10', sub: 'Free: 1.8 TB' }
         ].map((stat, i) => (
            <div key={i} className="admin-glass-card p-6 rounded-[2rem] space-y-4 hover:shadow-lg transition-all">
                <div className="flex justify-between items-start">
                   <div className={`p-3 rounded-xl ${stat.bg} border border-[var(--admin-border)] transition-colors`}>
                      <stat.icon className={stat.color} size={20} />
                   </div>
                   <span className="text-[9px] font-black uppercase text-[var(--text-primary)]/20 tracking-widest transition-colors">{stat.sub}</span>
                </div>
                <div className="space-y-1">
                   <div className="text-2xl font-black text-[var(--text-primary)] transition-colors">{stat.value}</div>
                   <div className="text-[10px] text-[var(--text-primary)]/40 font-black uppercase tracking-widest leading-none transition-colors">{stat.label}</div>
                </div>
            </div>
         ))}
      </div>

      {/* System Logs & Deep Tools */}
      <div className="grid lg:grid-cols-12 gap-8">
         {/* Live Command Log */}
         <div className="lg:col-span-8 space-y-6">
            <div className="admin-glass-card rounded-[3rem] overflow-hidden bg-[var(--admin-bg)]/50 transition-all">
               <div className="p-8 border-b border-[var(--admin-border)] bg-[var(--text-primary)]/5 flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-4">
                     <Terminal size={20} className="text-red-500" />
                     <h3 className="text-sm font-black uppercase tracking-[0.3em] italic text-[var(--text-primary)] transition-colors">System <span className="text-red-500">Core Logs</span></h3>
                  </div>
                  <div className="flex gap-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                     <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
                     <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                  </div>
               </div>
               
               <div className="p-8 font-mono text-[11px] space-y-3 h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--text-primary)]/10">
                  <div className="flex gap-4">
                     <span className="text-emerald-500/60 font-black">[OK]</span>
                     <span className="text-[var(--text-primary)]/40 transition-colors">11:36:12 - Authentication Gateway operational.</span>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-blue-500/60 font-black">[INFO]</span>
                     <span className="text-[var(--text-primary)]/40 transition-colors">11:36:14 - Syncing Logistics Hub with Hasnabad delivery node.</span>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-amber-500/60 font-black">[WARN]</span>
                     <span className="text-[var(--text-primary)]/60 italic transition-colors">11:36:20 - Legacy admin routes detected as "CLEANED".</span>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-red-500/60 font-black">[DB]</span>
                     <span className="text-[var(--text-primary)]/40 transition-colors">11:36:25 - New transaction entry: PAN-Remote-2026-004.</span>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-emerald-500/60 font-black">[OK]</span>
                     <span className="text-[var(--text-primary)]/40 transition-colors">11:37:01 - Intelligence Brain cache updated successfully.</span>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-blue-500/60 font-black">[SYSCALL]</span>
                     <span className="text-[var(--text-primary)]/20 italic transition-colors">11:37:05 - Pinging primary infrastructure nodes... responsive.</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Emergency Controls */}
         <div className="lg:col-span-4 space-y-6">
            <div className="admin-glass-card p-8 rounded-[3rem] space-y-8 bg-gradient-to-br from-red-500/10 to-transparent transition-all">
               <div className="space-y-2">
                  <h3 className="text-lg font-black italic uppercase tracking-widest text-red-500 transition-colors">Danger Zone</h3>
                  <p className="text-[10px] text-[var(--text-primary)]/30 uppercase font-black tracking-widest leading-tight transition-colors">বিপজ্জনক জোন // Restricted Tactical Commands</p>
               </div>

               <div className="space-y-4">
                  <button 
                     onClick={handleWipeCache}
                     className="w-full flex items-center justify-between p-5 bg-[var(--text-primary)]/5 border border-[var(--admin-border)] rounded-[2rem] hover:bg-red-500/20 hover:border-red-500/40 transition-all group"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-500 border border-red-500/20 transition-colors">
                           <Trash2 size={20} />
                        </div>
                        <div className="text-left">
                           <div className="text-[11px] font-black uppercase text-red-500 tracking-widest leading-none transition-colors">Wipe Cache</div>
                           <div className="text-[10px] text-[var(--text-primary)]/40 font-bold mt-1 transition-colors">ক্যাশ মুছুন</div>
                        </div>
                     </div>
                     <ChevronRight size={18} className="text-[var(--text-primary)]/20 group-hover:text-red-500 transition-colors" />
                  </button>

                  <button 
                     onClick={handleReboot}
                     className="w-full flex items-center justify-between p-5 bg-[var(--text-primary)]/5 border border-[var(--admin-border)] rounded-[2rem] hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all group"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 border border-emerald-500/20 transition-colors">
                           <RefreshCw size={20} />
                        </div>
                        <div className="text-left">
                           <div className="text-[11px] font-black uppercase text-emerald-500 tracking-widest leading-none transition-colors">Reboot System</div>
                           <div className="text-[10px] text-[var(--text-primary)]/40 font-bold mt-1 transition-colors">সিস্টেম রিবুট</div>
                        </div>
                     </div>
                     <ChevronRight size={18} className="text-[var(--text-primary)]/20 group-hover:text-emerald-500 transition-colors" />
                  </button>
               </div>
            </div>

            <div className="admin-glass-card p-8 rounded-[3rem] space-y-6 transition-all">
                <div className="flex items-center gap-3">
                   <Activity size={20} className="text-blue-500" />
                   <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--text-primary)]/60 transition-colors">Session Audit</h4>
                </div>
                <div className="space-y-4">
                   <div className="bg-[var(--admin-bg)] p-4 rounded-2xl border border-[var(--admin-border)] flex items-center justify-between transition-colors">
                      <div className="flex flex-col">
                         <span className="text-[9px] text-[var(--text-primary)]/30 uppercase font-bold tracking-widest uppercase transition-colors">Admin ID</span>
                         <span className="text-[10px] text-blue-500 font-bold transition-colors">GO-C1-HASNABAD-01</span>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
                   </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}
