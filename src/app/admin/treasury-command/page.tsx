"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  PieChart, 
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  History,
  Download,
  AlertCircle
} from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';

export default function TreasuryCommand() {
  const { revenue } = useAdminStore();

  const FINANCIAL_STATS = [
    { label: 'Total Revenue', value: `₹${revenue.toLocaleString()}`, change: '+12.5%', trend: 'up', color: 'text-emerald-500' },
    { label: 'Profit Margin', value: '62.4%', change: '+2.1%', trend: 'up', color: 'text-blue-500' },
    { label: 'Operational Cost', value: '₹42,800', change: '+5.2%', trend: 'down', color: 'text-red-500' },
    { label: 'Projected Q1', value: '₹2.4L', change: '+18%', trend: 'up', color: 'text-purple-500' },
  ];

  const INCOME_STREAMS = [
    { category: 'PVC Printing', amount: '₹45,200', percentage: 35, color: 'bg-blue-500' },
    { category: 'PAN Services', amount: '₹38,900', percentage: 30, color: 'bg-cyan-500' },
    { category: 'IT Solutions', amount: '₹32,100', percentage: 25, color: 'bg-emerald-500' },
    { category: 'Other Ops', amount: '₹8,300', percentage: 10, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic flex items-center gap-4 text-emerald-500 transition-colors">
            Treasury <span className="text-[var(--text-primary)] transition-colors">Command</span>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center transition-colors">
              <Wallet size={24} className="text-emerald-500" />
            </div>
          </h1>
          <p className="text-[var(--text-primary)]/40 text-sm font-bold tracking-[0.2em] uppercase transition-colors">
            কোষাগার কমান্ড // Direct Financial Intelligence
          </p>
        </div>

        <div className="flex gap-4">
           <button className="bg-[var(--text-primary)]/5 border border-[var(--admin-border)] px-6 py-3 rounded-2xl text-[var(--text-primary)] font-black text-xs uppercase tracking-widest hover:bg-[var(--text-primary)]/10 transition-all flex items-center gap-2 transition-colors">
              <Download size={18} /> Export Reports
           </button>
        </div>
      </motion.div>

      {/* Financial Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {FINANCIAL_STATS.map((stat, i) => (
            <div key={i} className="admin-glass-card p-8 rounded-[2.5rem] space-y-4 hover:shadow-lg transition-all">
               <div className="flex justify-between items-start">
                  <div className="text-[10px] text-[var(--text-primary)]/40 font-black uppercase tracking-widest transition-colors">{stat.label}</div>
                  <div className={`flex items-center gap-1 text-xs font-black ${stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                     {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                     {stat.change}
                  </div>
               </div>
               <div className="text-3xl font-black tracking-tighter text-[var(--text-primary)] transition-colors">{stat.value}</div>
               <div className="h-1 w-full bg-[var(--admin-bg)] rounded-full overflow-hidden transition-colors">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '70%' }}
                    className={`h-full ${stat.trend === 'up' ? 'bg-emerald-500' : 'bg-red-500'}`}
                  />
               </div>
            </div>
         ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
         {/* Income Distribution */}
         <div className="lg:col-span-4 space-y-6">
            <div className="admin-glass-card p-8 rounded-[3rem] space-y-8 h-full transition-all">
               <div className="space-y-2">
                  <h3 className="text-lg font-black italic uppercase tracking-widest text-[var(--text-primary)] transition-colors">Revenue <span className="text-emerald-500">Flux</span></h3>
                  <p className="text-[10px] text-[var(--text-primary)]/30 uppercase font-black transition-colors">আয় বন্টন // Sector Analysis</p>
               </div>

               <div className="space-y-6">
                  {INCOME_STREAMS.map((stream, i) => (
                     <div key={i} className="space-y-2">
                        <div className="flex justify-between items-end">
                           <span className="text-[11px] font-bold text-[var(--text-primary)]/60 uppercase transition-colors">{stream.category}</span>
                           <span className="text-xs font-black text-[var(--text-primary)] transition-colors">{stream.amount}</span>
                        </div>
                        <div className="h-1.5 w-full bg-[var(--admin-bg)] rounded-full overflow-hidden border border-[var(--admin-border)] transition-colors">
                           <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${stream.percentage}%` }}
                               className={`h-full ${stream.color}`} 
                           />
                        </div>
                     </div>
                  ))}
               </div>

               <div className="pt-6 border-t border-[var(--admin-border)]">
                  <div className="flex items-center justify-between">
                     <PieChart size={24} className="text-[var(--text-primary)]/20 transition-colors" />
                     <span className="text-[9px] font-black text-[var(--text-primary)]/20 uppercase tracking-[0.3em] transition-colors">Total Mission Yield</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Transaction Ledger */}
         <div className="lg:col-span-8 space-y-6">
            <div className="admin-glass-card rounded-[3rem] overflow-hidden transition-all">
               <div className="p-8 border-b border-[var(--admin-border)] bg-[var(--text-primary)]/5 flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-4">
                     <History size={20} className="text-emerald-500" />
                     <h3 className="text-sm font-black uppercase tracking-[0.3em] italic text-[var(--text-primary)] transition-colors">Tactical <span className="text-emerald-500">Ledger</span></h3>
                  </div>
                  <button className="text-[10px] font-black uppercase text-[var(--text-primary)]/40 hover:text-[var(--text-primary)] transition-colors">Clear Logs</button>
               </div>
               
               <div className="p-0 overflow-x-auto">
                  <table className="w-full text-left">
                     <thead className="bg-[var(--admin-bg)] border-b border-[var(--admin-border)] transition-colors">
                        <tr>
                           <th className="px-8 py-4 text-[9px] uppercase font-black text-[var(--text-primary)]/30 tracking-widest transition-colors">Entry UID</th>
                           <th className="px-8 py-4 text-[9px] uppercase font-black text-[var(--text-primary)]/30 tracking-widest transition-colors">Sector</th>
                           <th className="px-8 py-4 text-[9px] uppercase font-black text-[var(--text-primary)]/30 tracking-widest transition-colors">Yield</th>
                           <th className="px-8 py-4 text-[9px] uppercase font-black text-[var(--text-primary)]/30 tracking-widest transition-colors">Timestamp</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-[var(--admin-border)] text-[11px] font-mono transition-colors">
                        {[
                           { id: 'TX-8821', sector: 'PVC-Ops', amount: '+ ₹450', time: '11:24:01' },
                           { id: 'TX-8820', sector: 'PAN-Remote', amount: '+ ₹1,200', time: '10:52:15' },
                           { id: 'TX-8819', sector: 'IT Support', amount: '+ ₹3,500', time: '09:12:44' },
                           { id: 'TX-8818', sector: 'Home Delivery', amount: '+ ₹150', time: '08:45:30' },
                           { id: 'TX-8817', sector: 'PVC-Ops', amount: '+ ₹900', time: '07:30:12' },
                        ].map((tx, i) => (
                           <tr key={i} className="hover:bg-[var(--text-primary)]/5 transition-colors">
                              <td className="px-8 py-4 text-[var(--text-primary)]/60">#{tx.id}</td>
                              <td className="px-8 py-4 text-emerald-500 font-black">{tx.sector}</td>
                              <td className="px-8 py-4 text-[var(--text-primary)] font-black">{tx.amount}</td>
                              <td className="px-8 py-4 text-[var(--text-primary)]/20">{tx.time}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            <div className="bg-[var(--admin-bg)] p-6 rounded-[2.5rem] border border-[var(--admin-border)] flex items-center gap-6 transition-colors">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center transition-colors">
                  <AlertCircle size={24} className="text-amber-500" />
               </div>
               <div className="space-y-1">
                  <h4 className="text-[11px] font-black uppercase text-amber-500 tracking-widest transition-colors">Audit Protocol</h4>
                  <p className="text-[10px] text-[var(--text-primary)]/40 leading-relaxed italic transition-colors">
                     "Notice: Weekly balance synchronization with CSC main gateway is scheduled for 24 hours from mission start."
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
