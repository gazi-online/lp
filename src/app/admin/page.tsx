"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  Zap,
  ShieldCheck,
  Target,
  FileText,
  Settings
} from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';
import Link from 'next/link';

export default function IntelligenceBrain() {
  const { revenue, orders, appointments, panQueue } = useAdminStore();

  const STATS = [
    {
      id: 'rev',
      label: 'Total Revenue',
      bnLabel: 'মোট রাজস্ব',
      value: `₹${revenue.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: TrendingUp,
      color: '#00B86C'
    },
    {
      id: 'customers',
      label: 'Active Missions',
      bnLabel: 'সক্রিয় মিশন',
      value: (orders.length + appointments.length + panQueue.length).toString(),
      change: '+3.2%',
      trend: 'up',
      icon: Users,
      color: '#0033FF'
    },
    {
      id: 'pending',
      label: 'Operations Pending',
      bnLabel: 'অপারেশন পেন্ডিং',
      value: [
        ...orders.filter(o => o.status === 'Pending'),
        ...appointments.filter(a => a.status === 'Pending'),
        ...panQueue.filter(p => p.status === 'Verification Required')
      ].length.toString(),
      change: '-5.1%',
      trend: 'down',
      icon: Clock,
      color: '#F59E0B'
    },
    {
      id: 'success',
      label: 'Mission Success',
      bnLabel: 'মিশন সাকসেস',
      value: '98.4%',
      change: '+0.4%',
      trend: 'up',
      icon: ShieldCheck,
      color: '#00EDFF'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero / Page Title */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic flex items-center gap-4 text-[var(--text-primary)] transition-colors">
            Intelligence <span className="text-emerald-500">Brain</span>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center animate-pulse">
              <Zap size={24} className="text-emerald-500" />
            </div>
          </h1>
          <p className="text-[var(--text-primary)]/40 text-sm font-bold tracking-[0.2em] uppercase transition-colors">
            মেধা কেন্দ্র // Strategic Mission Overview
          </p>
        </div>

        <div className="admin-glass-card px-6 py-4 rounded-2xl flex items-center gap-6 transition-all">
           <div className="flex flex-col">
             <span className="text-[10px] text-[var(--text-primary)]/30 uppercase font-black tracking-widest transition-colors">Operation Status</span>
             <span className="text-emerald-500 font-bold text-sm tracking-widest">ACTIVE / সক্রিয়</span>
           </div>
           <div className="w-px h-8 bg-[var(--admin-border)]" />
           <div className="flex flex-col">
             <span className="text-[10px] text-[var(--text-primary)]/30 uppercase font-black tracking-widest transition-colors">System Load</span>
             <span className="text-blue-500 font-bold text-sm tracking-widest">12.4%</span>
           </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group cursor-default"
          >
            <div className="admin-glass-card p-8 rounded-[2.5rem] space-y-4 hover:shadow-lg transition-all duration-500">
               <div className="flex justify-between items-start">
                 <div className="p-3 rounded-2xl bg-[var(--admin-bg)] border border-[var(--admin-border)] shadow-sm transition-colors">
                   <stat.icon size={20} style={{ color: stat.color }} />
                 </div>
                 <div className={`flex items-center gap-1 text-xs font-black ${
                   stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'
                 }`}>
                   {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                   {stat.change}
                 </div>
               </div>
               
               <div className="space-y-1">
                 <div className="text-3xl font-black tracking-tighter text-[var(--text-primary)] transition-colors">{stat.value}</div>
                 <div className="flex flex-col">
                   <span className="text-[10px] text-[var(--text-primary)]/40 uppercase font-black tracking-[0.2em] leading-none transition-colors">
                     {stat.label}
                   </span>
                   <span className="text-[11px] text-[var(--text-primary)]/20 font-bold mt-1 uppercase transition-colors">
                     {stat.bnLabel}
                   </span>
                 </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Secondary Intelligence Area */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Production Stream */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-8 glass-panel p-8 rounded-[3rem] border-white/10 space-y-6"
        >
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Activity size={20} className="text-blue-500" />
                </div>
                <div>
                   <h3 className="text-lg font-black uppercase tracking-widest italic">Mission <span className="text-blue-500">Timeline</span></h3>
                   <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">মিশন টাইমলাইন // Last 24 Hours</p>
                </div>
             </div>
             <button className="text-[10px] font-black uppercase tracking-widest px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
               Expand Command / আরও দেখুন
             </button>
          </div>

          <div className="h-64 flex items-end gap-3 px-4">
             {[45, 67, 34, 89, 120, 56, 78, 45, 98, 110, 85, 95].map((val, i) => (
               <div key={i} className="flex-1 flex flex-col justify-end gap-2 group cursor-pointer">
                 <div className="relative w-full rounded-full transition-all duration-500 group-hover:glow-blue" style={{ 
                   height: `${val}%`, 
                   background: `linear-gradient(to top, #0033FF, transparent)`,
                   opacity: 0.2 + (val/150)
                 }}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/40 rounded-full group-hover:bg-white transition-colors" />
                 </div>
               </div>
             ))}
          </div>
        </motion.div>

        {/* Quick Actions / Target */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-4 space-y-6"
        >
          {/* Revenue Target Card */}
          <div className="admin-glass-card p-8 rounded-[3rem] border-emerald-500/20 bg-emerald-500/5 space-y-6 transition-all">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center transition-colors">
                 <Target size={20} className="text-emerald-500" />
               </div>
               <div>
                  <h3 className="text-lg font-black tracking-widest italic uppercase text-[var(--text-primary)] transition-colors">Revenue <span className="text-emerald-500">Target</span></h3>
                  <p className="text-[10px] text-[var(--text-primary)]/30 uppercase font-black tracking-widest transition-colors">লক্ষ্য নির্ধারণ // Month-to-Date</p>
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                  <span className="text-[var(--text-primary)]/60 transition-colors">Execution Progress</span>
                  <span className="text-emerald-500">78%</span>
               </div>
               <div className="h-2 w-full bg-[#00011A] rounded-full overflow-hidden border border-[var(--admin-border)] transition-colors">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '78%' }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  />
               </div>
               <p className="text-[10px] text-[var(--text-primary)]/40 leading-relaxed italic transition-colors">
                 "Command: Maintain current processing trajectory to exceed Q1 targets by 15%."
               </p>
            </div>
          </div>

          {/* Quick Launch Card */}
          <div className="admin-glass-card p-6 rounded-[2.5rem] space-y-4 transition-all">
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]/40 block transition-colors">Quick Launch / দ্রুত লঞ্চ</span>
             <div className="grid grid-cols-2 gap-3">
                <Link href="/admin/treasury-command" className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[var(--text-primary)]/5 border border-[var(--admin-border)] hover:border-accent/30 hover:bg-accent/10 transition-all duration-300 group">
                   <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center transition-colors">
                     <FileText size={16} className="text-accent group-hover:scale-110 transition-transform" />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]/60 group-hover:text-accent transition-colors">Reports</span>
                </Link>
                <Link href="/admin/root-access" className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[var(--text-primary)]/5 border border-[var(--admin-border)] hover:border-secondary/30 hover:bg-secondary/10 transition-all duration-300 group">
                   <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center transition-colors">
                     <Settings size={16} className="text-secondary group-hover:rotate-45 transition-transform" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]/60 group-hover:text-secondary transition-colors">Command</span>
                </Link>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
