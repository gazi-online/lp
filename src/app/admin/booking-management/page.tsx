"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  CreditCard, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  User,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';

type BookingType = 'ALL' | 'APPOINTMENT' | 'PVC' | 'PAN';

export default function BookingManagement() {
  const { 
    appointments, 
    orders: pvcOrders, 
    panQueue, 
    updateAppointmentStatus,
    updateOrderStatus,
    updatePanStatus
  } = useAdminStore();

  const [filter, setFilter] = useState<BookingType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const consolidatedData = useMemo(() => {
    const data = [
      ...appointments.map(a => ({ ...a, bookingType: 'APPOINTMENT' as const })),
      ...pvcOrders.map(o => ({ ...o, bookingType: 'PVC' as const })),
      ...panQueue.map(p => ({ ...p, bookingType: 'PAN' as const })),
    ];

    return data
      .filter(item => {
        if (filter !== 'ALL' && item.bookingType !== filter) return false;
        
        const searchLower = searchQuery.toLowerCase();
        const clientMatch = 'client' in item && typeof item.client === 'string' && item.client.toLowerCase().includes(searchLower);
        const idMatch = item.id.toLowerCase().includes(searchLower);
        return clientMatch || idMatch;
      })
      .sort((a, b) => b.id.localeCompare(a.id)); // Simple sort by ID for now
  }, [appointments, pvcOrders, panQueue, filter, searchQuery]);

  const stats = {
    total: consolidatedData.length,
    pending: consolidatedData.filter(i => (i as any).status === 'Pending' || (i as any).status === 'Verification Required').length,
    active: consolidatedData.filter(i => (i as any).status === 'Live' || (i as any).status === 'In Production' || (i as any).status === 'Processing').length,
    completed: consolidatedData.filter(i => (i as any).status === 'Completed' || (i as any).status === 'Delivered' || (i as any).status === 'Approved').length,
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Tactical Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic flex items-center gap-4 text-emerald-500 transition-colors">
            Booking <span className="text-[var(--text-primary)] transition-colors">Management</span>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center transition-colors">
              <ShieldCheck size={24} className="text-emerald-500" />
            </div>
          </h1>
          <p className="text-[var(--text-primary)]/40 text-sm font-bold tracking-[0.2em] uppercase transition-colors">
            গ্লোবাল রেজিস্ট্রি প্রোটোকল // Global Registry Protocol
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-primary)]/20 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search IDs or Clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[var(--text-primary)]/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3 text-sm font-bold focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all w-64 uppercase tracking-widest placeholder:lowercase transition-colors"
            />
          </div>
        </div>
      </motion.div>

      {/* Unified Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Registry', value: stats.total, icon: FileText, color: 'emerald' },
          { label: 'Pending Ops', value: stats.pending, icon: Clock, color: 'amber' },
          { label: 'Active Missions', value: stats.active, icon: Smartphone, color: 'blue' },
          { label: 'Finalized', value: stats.completed, icon: CheckCircle2, color: 'purple' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="admin-glass-card p-6 rounded-3xl border-[var(--admin-border)] hover:border-[var(--text-primary)]/10 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 transition-colors`}>
                <stat.icon size={20} className={`text-${stat.color}-500`} />
              </div>
              <span className="text-[10px] font-black text-[var(--text-primary)]/20 uppercase tracking-[0.3em]">Snapshot</span>
            </div>
            <div className="text-3xl font-black tracking-tighter text-[var(--text-primary)] transition-colors">{stat.value}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]/40 mt-1 transition-colors">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Operations Console */}
      <div className="admin-glass-card rounded-[3rem] border-[var(--admin-border)] overflow-hidden transition-all">
        {/* Navigation Bar */}
        <div className="flex items-center px-8 border-b border-[var(--admin-border)] bg-white/2 transition-colors">
          {(['ALL', 'APPOINTMENT', 'PVC', 'PAN'] as BookingType[]).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-8 py-6 text-[10px] font-black uppercase tracking-[0.4em] relative transition-all ${
                filter === type ? 'text-emerald-500' : 'text-[var(--text-primary)]/40 hover:text-[var(--text-primary)]/60'
              }`}
            >
              {type}
              {filter === type && (
                <motion.div 
                  layoutId="active-tab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-t-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Global Registry List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--admin-border)] bg-[var(--text-primary)]/2 transition-colors">
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]/30">Protocol ID</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]/30">Entity</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]/30">Classification</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]/30">Operational Status</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]/30">Tactical Window</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]/30 text-right">Control</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {consolidatedData.length > 0 ? (
                  consolidatedData.map((item, idx) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-[var(--admin-border)] hover:bg-[var(--text-primary)]/2 group transition-colors"
                    >
                      <td className="px-8 py-5">
                         <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                              item.bookingType === 'APPOINTMENT' ? 'border-purple-500/20 bg-purple-500/10 text-purple-500' :
                              item.bookingType === 'PVC' ? 'border-blue-500/20 bg-blue-500/10 text-blue-500' :
                              'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
                            } transition-colors`}>
                               {item.bookingType === 'APPOINTMENT' ? <Calendar size={14} /> : 
                                item.bookingType === 'PVC' ? <CreditCard size={14} /> : <FileText size={14} />}
                            </div>
                            <span className="text-[11px] font-black tracking-widest text-[var(--text-primary)] transition-colors">{item.id}</span>
                         </div>
                      </td>
                      <td className="px-8 py-5">
                         <div className="flex flex-col">
                            <span className="text-[11px] font-black uppercase text-[var(--text-primary)] transition-colors">{(item as any).client}</span>
                            <span className="text-[8px] text-[var(--text-primary)]/30 font-bold tracking-widest uppercase transition-colors">
                               {'phone' in item ? item.phone : 'Authorized Identity'}
                            </span>
                         </div>
                      </td>
                      <td className="px-8 py-5">
                         <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-[var(--text-primary)] uppercase transition-colors">{(item as any).service || (item as any).type}</span>
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded-full inline-block mt-1 w-fit transition-all ${
                              item.bookingType === 'APPOINTMENT' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                              item.bookingType === 'PVC' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                              'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            }`}>
                               {item.bookingType} PROT.
                            </span>
                         </div>
                      </td>
                      <td className="px-8 py-5 text-[11px]">
                         <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              ['Pending', 'Verification Required'].includes((item as any).status) ? 'bg-amber-500 animate-pulse shadow-[0_0_8px_#F59E0B]' :
                              ['Delivered', 'Completed', 'Approved'].includes((item as any).status) ? 'bg-emerald-500 shadow-[0_0_8px_#10B981]' :
                              'bg-blue-500 animate-pulse shadow-[0_0_8px_#3B82F6]'
                            } transition-colors`} />
                            <span className="font-black uppercase tracking-widest text-[var(--text-primary)]/80 transition-colors">{(item as any).status}</span>
                         </div>
                      </td>
                      <td className="px-8 py-5">
                         <div className="flex flex-col">
                            <span className="text-[10px] font-black text-[var(--text-primary)]/60 transition-colors">{(item as any).time || (item as any).date || (item as any).days + ' Active'}</span>
                            <span className="text-[8px] text-[var(--text-primary)]/20 uppercase font-bold tracking-widest transition-colors">Tactical Window</span>
                         </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                         <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 border border-[var(--admin-border)] rounded-xl hover:bg-emerald-500/10 hover:text-emerald-400 transition-all">
                               <CheckCircle2 size={16} />
                            </button>
                            <button className="p-2 border border-[var(--admin-border)] rounded-xl hover:bg-white/10 transition-all text-[var(--text-primary)]/20 hover:text-[var(--text-primary)]">
                               <MoreVertical size={16} />
                            </button>
                         </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-8 py-20 text-center">
                       <div className="flex flex-col items-center gap-4">
                          <AlertCircle size={40} className="text-[var(--text-primary)]/10" />
                          <div className="space-y-1">
                             <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]/40">Nexus Hub Empty</p>
                             <p className="text-[8px] font-bold text-[var(--text-primary)]/20 uppercase tracking-widest">রেজিস্ট্রিতে কোনো তথ্য পাওয়া যায়নি</p>
                          </div>
                       </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
