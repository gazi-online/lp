"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Calendar as CalendarIcon, 
  Clock, 
  LayoutGrid, 
  List, 
  Plus, 
  MoreVertical, 
  CheckCircle2, 
  XCircle,
  ShieldCheck,
  Search,
  Settings,
  ArrowUpRight
} from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

type ViewMode = 'DASHBOARD' | 'CALENDAR' | 'TABLE' | 'SERVICES';

export default function AppointmentManager() {
  const [viewMode, setViewMode] = useState<ViewMode>('DASHBOARD');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, revenue: 0, growth: '+12%' });

  // Initial Data Mock (to be replaced by API calls)
  useEffect(() => {
    setAppointments([
      { id: 'GAZI-101', client: 'Ariful Islam', service: 'Aadhaar Link', date: '2026-03-18', time: '10:00 AM', status: 'confirmed', price: 100 },
      { id: 'GAZI-102', client: 'Sumit Das', service: 'New e-PAN', date: '2026-03-18', time: '11:45 AM', status: 'pending', price: 120 },
      { id: 'GAZI-103', client: 'Fatima Khatun', service: 'Passport Helper', date: '2026-03-19', time: '02:30 PM', status: 'confirmed', price: 500 },
    ]);
    setServices([
      { id: 1, name: 'Aadhaar Mobile Linking', price: 100, duration: 20 },
      { id: 2, name: 'New e-PAN Generation', price: 120, duration: 15 },
    ]);
    setStats({ total: 124, revenue: 12450, growth: '+18.4%' });
  }, []);

  return (
    <div className="space-y-10 pb-20">
      {/* Premium Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic flex items-center gap-4 text-[var(--text-primary)] transition-colors">
            Mission <span className="text-[var(--accent-blue)]">Scheduler</span>
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20 flex items-center justify-center animate-pulse">
               <ShieldCheck size={24} className="text-[var(--accent-blue)]" />
            </div>
          </h1>
          <p className="text-[var(--text-primary)]/40 text-xs font-black tracking-[0.3em] uppercase transition-colors">
             Appointment Protocol Hub // অ্যাপয়েন্টমেন্ট প্রোটোকল
          </p>
        </div>

        <div className="flex bg-white/5 p-1.5 rounded-[1.5rem] border border-white/10">
           {(['DASHBOARD', 'CALENDAR', 'TABLE', 'SERVICES'] as ViewMode[]).map((mode) => (
             <button
               key={mode}
               onClick={() => setViewMode(mode)}
               className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                 viewMode === mode ? 'bg-[var(--accent-blue)] text-white shadow-lg shadow-[var(--accent-blue)]/20' : 'text-white/40 hover:text-white/60'
               }`}
             >
               {mode}
             </button>
           ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {viewMode === 'DASHBOARD' && (
          <motion.div key="dash" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-8">
             {/* Stats Grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Total Missions', value: stats.total, icon: Users, color: 'blue', change: '+12.5%' },
                  { label: 'Total Revenue', value: `₹${stats.revenue}`, icon: TrendingUp, color: 'emerald', change: '+18.4%' },
                  { label: 'Slot Efficiency', value: '94%', icon: Clock, color: 'purple', change: '+1.2%' },
                ].map((stat, i) => (
                  <div key={i} className="admin-glass-card p-8 rounded-[2.5rem] border-white/10 group hover:border-[var(--accent-blue)]/20 transition-all">
                     <div className="flex justify-between items-start mb-6">
                        <div className={`p-4 rounded-2xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 text-${stat.color}-500`}>
                           <stat.icon size={24} />
                        </div>
                        <div className="flex items-center gap-1 text-[var(--accent-green)] text-xs font-black">
                           <ArrowUpRight size={14} /> {stat.change}
                        </div>
                     </div>
                     <div className="text-4xl font-black tracking-tighter text-[var(--text-primary)] mb-1">{stat.value}</div>
                     <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{stat.label}</div>
                  </div>
                ))}
             </div>

             {/* Recent Activity */}
             <div className="grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 admin-glass-card p-10 rounded-[3rem] border-white/10">
                   <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-black uppercase tracking-widest italic">Live <span className="text-[var(--accent-blue)]">Deployments</span></h3>
                      <button className="text-[10px] font-black uppercase tracking-widest px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">Audit Full Log</button>
                   </div>
                   <div className="space-y-4">
                      {appointments.map((app, i) => (
                         <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-xl bg-[var(--accent-blue)]/10 flex items-center justify-center font-black text-xs text-[var(--accent-blue)]">
                                  {app.client.split(' ').map((n:any)=>n[0]).join('')}
                               </div>
                               <div>
                                  <div className="font-black text-sm uppercase tracking-wide">{app.client}</div>
                                  <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{app.service} // {app.time}</div>
                               </div>
                            </div>
                            <div className="flex items-center gap-6">
                               <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
                                 app.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                               }`}>
                                 {app.status}
                               </span>
                               <MoreVertical size={16} className="text-white/20 group-hover:text-white transition-colors cursor-pointer" />
                            </div>
                         </div>
                      ))}
                   </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                   <div className="admin-glass-card p-8 rounded-[3rem] border-purple-500/20 bg-purple-500/5 h-full flex flex-col justify-between">
                      <div className="space-y-4">
                         <h3 className="text-lg font-black uppercase italic tracking-widest">Rapid <span className="text-purple-400">Launch</span></h3>
                         <p className="text-[10px] text-white/30 uppercase font-black leading-relaxed tracking-widest">Initialization Protocol for New Services & Slots</p>
                      </div>
                      <div className="space-y-3">
                         <button className="w-full py-4 rounded-2xl bg-white text-black font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all">
                            <Plus size={16} /> New Service Node
                         </button>
                         <button className="w-full py-4 rounded-2xl border border-white/10 text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/5 transition-all">
                            <Settings size={16} /> Temporal Settings
                         </button>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {viewMode === 'CALENDAR' && (
          <motion.div key="cal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="admin-glass-card p-10 rounded-[3rem] border-white/10">
             <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black uppercase tracking-widest italic">Temporal <span className="text-[var(--accent-blue)]">Grid</span></h3>
                <div className="flex items-center gap-6">
                   <div className="text-sm font-black uppercase tracking-[0.2em]">{format(new Date(), 'MMMM yyyy')}</div>
                   <div className="flex gap-2">
                      <button className="p-2 border border-white/10 rounded-xl hover:bg-white/5 transition-colors"><LayoutGrid size={18} /></button>
                   </div>
                </div>
             </div>
             
             <div className="grid grid-cols-7 gap-4">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
                  <div key={d} className="text-center text-[10px] font-black text-white/20 mb-4">{d}</div>
                ))}
                {eachDayOfInterval({ start: startOfMonth(new Date()), end: endOfMonth(new Date()) }).map((day, i) => (
                  <div key={i} className={`aspect-square rounded-2xl border p-3 flex flex-col justify-between transition-all group cursor-pointer ${
                    isSameDay(day, new Date()) ? 'border-[var(--accent-blue)] bg-[var(--accent-blue)]/10 shadow-lg' : 'border-white/5 bg-white/5 hover:border-white/20'
                  }`}>
                     <span className={`text-[11px] font-black ${isSameDay(day, new Date()) ? 'text-[var(--accent-blue)]' : 'text-white/40'}`}>
                        {format(day, 'd')}
                     </span>
                     <div className="flex flex-wrap gap-1">
                        {appointments.filter(a => isSameDay(new Date(a.date), day)).map((_, idx) => (
                           <div key={idx} className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)]" />
                        ))}
                     </div>
                  </div>
                ))}
             </div>
          </motion.div>
        )}

        {viewMode === 'TABLE' && (
           <motion.div key="table" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="admin-glass-card rounded-[3rem] border-white/10 overflow-hidden">
              <div className="p-10 border-b border-white/5 flex items-center justify-between">
                 <h3 className="text-xl font-black uppercase tracking-widest italic text-[var(--accent-blue)]">Mission Logs</h3>
                 <div className="flex gap-4">
                     <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                        <input className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3 text-[10px] font-bold tracking-widest uppercase focus:outline-none focus:border-[var(--accent-blue)]/50 transition-all w-64" placeholder="Search Registries..." />
                     </div>
                 </div>
              </div>
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-white/2">
                       <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Protocol</th>
                       <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Entity</th>
                       <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Service Classification</th>
                       <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Status</th>
                       <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-white/20 text-right">Operations</th>
                    </tr>
                 </thead>
                 <tbody>
                    {appointments.map((app, i) => (
                       <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                          <td className="px-10 py-6 text-[11px] font-black tracking-widest">{app.id}</td>
                          <td className="px-10 py-6">
                             <div className="font-bold text-sm uppercase tracking-wide">{app.client}</div>
                             <div className="text-[9px] text-white/20 font-black uppercase">{app.time}</div>
                          </td>
                          <td className="px-10 py-6 text-[10px] font-black text-white/50 uppercase tracking-widest">{app.service}</td>
                          <td className="px-10 py-6">
                             <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${
                               app.status === 'confirmed' ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-500' : 'border-amber-500/20 bg-amber-500/5 text-amber-500'
                             }`}>
                                <div className={`w-1 h-1 rounded-full ${app.status === 'confirmed' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                                <span className="text-[8px] font-black uppercase tracking-widest">{app.status}</span>
                             </div>
                          </td>
                          <td className="px-10 py-6 text-right">
                             <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                                <button className="p-2 border border-white/10 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-500 transition-all"><CheckCircle2 size={16} /></button>
                                <button className="p-2 border border-white/10 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all"><XCircle size={16} /></button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
