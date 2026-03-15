"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Package, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';

import { useAdminStore, AdminOrder } from '@/lib/store/useAdminStore';

export default function LogisticsFleet() {
  const { orders, updateOrderStatus, addOrder } = useAdminStore();

  const handleNewDeployment = () => {
    const newOrder: AdminOrder = {
      id: `DLV-${Math.floor(Math.random() * 1000)}`,
      client: 'Quick Mission',
      type: 'Home Delivery',
      status: 'Pending',
      location: 'Local Sector',
      priority: 'Medium',
      date: new Date().toISOString().split('T')[0]
    };
    addOrder(newOrder);
  };

  const handleStatusUpdate = (id: string, currentStatus: AdminOrder['status']) => {
    const statuses: AdminOrder['status'][] = ['Pending', 'In Production', 'Out for Delivery', 'Delivered'];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    updateOrderStatus(id, nextStatus);
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
          <h1 className="text-4xl font-black tracking-tighter uppercase italic flex items-center gap-4 text-secondary/80 transition-colors">
            Logistics <span className="text-accent">Fleet</span>
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center transition-colors">
              <Truck size={24} className="text-secondary" />
            </div>
          </h1>
          <p className="text-[var(--text-primary)]/40 text-sm font-bold tracking-[0.2em] uppercase transition-colors">
            পরিবহন বহর // Distribution & Delivery Network
          </p>
        </div>

        <div className="flex gap-4">
           <div className="admin-glass-card px-6 py-3 rounded-2xl border-[var(--admin-border)] flex items-center gap-4 transition-all">
              <Package size={20} className="text-[var(--text-primary)]/40 transition-colors" />
              <div className="flex flex-col">
                 <span className="text-[10px] text-[var(--text-primary)]/30 uppercase font-black transition-colors">Stock Status</span>
                 <span className="text-[var(--text-primary)] font-bold text-sm transition-colors">450 Units</span>
              </div>
           </div>
           <button 
              onClick={handleNewDeployment}
              className="bg-accent px-6 py-3 rounded-2xl text-[#00011A] font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2"
           >
              New Deployment / নতুন অর্ডার
           </button>
        </div>
      </motion.div>

      {/* Deployment Table (Mission Log) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="admin-glass-card overflow-hidden border-[var(--admin-border)] rounded-[3rem] transition-all"
      >
        {/* Table Controls */}
        <div className="p-8 border-b border-[var(--admin-border)] flex flex-wrap items-center justify-between gap-6 bg-[var(--text-primary)]/5 transition-colors">
           <div className="relative flex-1 max-w-md group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-primary)]/20 group-hover:text-[var(--text-primary)]/40 transition-colors" />
              <input 
                type="text" 
                placeholder="Search Fleet Ops / কোড দিয়ে খুঁজুন..." 
                className="w-full bg-[var(--admin-bg)] border border-[var(--admin-border)] rounded-xl py-3 pl-12 pr-4 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/20 focus:border-accent/40 focus:ring-1 focus:ring-accent/20 outline-none transition-all"
              />
           </div>
           
           <div className="flex items-center gap-4">
              <button className="p-3 bg-[var(--text-primary)]/5 border border-[var(--admin-border)] rounded-xl hover:bg-[var(--text-primary)]/10 transition-colors">
                 <Filter size={18} className="text-[var(--text-primary)]/60 transition-colors" />
              </button>
              <div className="h-8 w-px bg-[var(--admin-border)] mx-2 transition-colors" />
              <span className="text-[10px] font-black uppercase text-[var(--text-primary)]/40 tracking-widest transition-colors">Showing: {orders.length} Active Missions</span>
           </div>
        </div>

        {/* The Grid / Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
             <thead className="bg-[var(--admin-bg)] border-b border-[var(--admin-border)] transition-colors">
                <tr>
                   <th className="px-8 py-5 text-[10px] uppercase font-black text-[var(--text-primary)]/40 tracking-[0.2em] transition-colors">Deployment ID</th>
                   <th className="px-8 py-5 text-[10px] uppercase font-black text-[var(--text-primary)]/40 tracking-[0.2em] transition-colors">Asset Origin / Client</th>
                   <th className="px-8 py-5 text-[10px] uppercase font-black text-[var(--text-primary)]/40 tracking-[0.2em] transition-colors">Mission Type</th>
                   <th className="px-8 py-5 text-[10px] uppercase font-black text-[var(--text-primary)]/40 tracking-[0.2em] transition-colors">Operation Status</th>
                   <th className="px-8 py-5 text-[10px] uppercase font-black text-[var(--text-primary)]/40 tracking-[0.2em] transition-colors">Priority</th>
                   <th className="px-8 py-5 text-[10px] uppercase font-black text-[var(--text-primary)]/40 tracking-[0.2em] transition-colors">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-[var(--admin-border)] transition-colors">
                {orders.map((op, i) => (
                   <tr key={i} className="hover:bg-[var(--text-primary)]/5 transition-colors group">
                      <td className="px-8 py-6">
                         <span className="text-xs font-black text-accent tracking-tighter">{op.id}</span>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex flex-col">
                            <span className="text-sm font-bold text-[var(--text-primary)] leading-none transition-colors">{op.client}</span>
                            <span className="text-[10px] text-[var(--text-primary)]/30 uppercase mt-1 flex items-center gap-1 transition-colors">
                               <MapPin size={10} /> {op.location}
                            </span>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-md ${
                               op.type === 'PVC Printing' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'
                            }`}>
                               <Package size={14} />
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-primary)] transition-colors">{op.type}</span>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ring-4 ${
                               op.status === 'Delivered' ? 'bg-emerald-500 ring-emerald-500/10' :
                               op.status === 'Pending' ? 'bg-red-400 ring-red-400/10 animate-pulse' :
                               'bg-blue-400 ring-blue-400/10'
                            }`} />
                            <div className="flex flex-col">
                               <span className="text-xs font-bold text-[var(--text-primary)] transition-colors">{op.status}</span>
                               <span className="text-[9px] text-[var(--text-primary)]/30 uppercase font-black italic transition-colors">
                                  {op.status === 'Delivered' ? 'স্থায়ী সমাধান' : 'অপারেশনাল'}
                                </span>
                            </div>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md border ${
                               op.priority === 'High' ? 'border-red-500/10 bg-red-500/5 text-red-500' :
                               op.priority === 'Medium' ? 'border-amber-500/10 bg-amber-500/5 text-amber-500' :
                               'border-blue-500/10 bg-blue-500/5 text-blue-500'
                            }`}>
                               {op.priority}
                            </span>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <button 
                            onClick={() => handleStatusUpdate(op.id, op.status)}
                            className="p-2 border border-[var(--admin-border)] rounded-lg hover:border-accent/30 hover:bg-accent/10 transition-all text-[var(--text-primary)]/40 hover:text-accent flex items-center gap-2 transition-colors"
                         >
                            <span className="text-[9px] font-black uppercase">Next Status</span>
                            <ArrowRight size={14} />
                         </button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
