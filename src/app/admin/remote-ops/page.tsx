"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  ShieldCheck, 
  Eye, 
  AlertCircle,
  FileSearch,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  History,
  Smartphone
} from 'lucide-react';

import { useAdminStore, PanApplication } from '@/lib/store/useAdminStore';

export default function RemoteOpsHub() {
  const { panQueue, updatePanStatus, requestPanOtp, setPanOtpStatus } = useAdminStore();
  const [selectedApp, setSelectedApp] = React.useState<PanApplication | null>(null);

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic flex items-center gap-4 text-cyan-500 transition-colors">
            Remote <span className="text-[var(--text-primary)] transition-colors">PAN Hub</span>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center animate-pulse transition-colors">
              <FileSearch size={24} className="text-cyan-400" />
            </div>
          </h1>
          <p className="text-[var(--text-primary)]/40 text-sm font-bold tracking-[0.2em] uppercase transition-colors">
            রিমোট প্যান হাব // Secure Document Verification Command
          </p>
        </div>

        <div className="flex gap-4">
           <div className="admin-glass-card px-6 py-3 rounded-2xl border-[var(--admin-border)] flex items-center gap-4 transition-all">
              <History size={20} className="text-[var(--text-primary)]/40 transition-colors" />
              <div className="flex flex-col">
                 <span className="text-[10px] text-[var(--text-primary)]/30 uppercase font-black transition-colors">History</span>
                 <span className="text-[var(--text-primary)] font-bold text-sm transition-colors">2,450 Total</span>
              </div>
           </div>
           <button className="bg-cyan-500 px-6 py-3 rounded-2xl text-[#00011A] font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2">
              Launch Processing / শুরু করুন
           </button>
        </div>
      </motion.div>

      {/* Stats Summary Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'SLA COMPLIANCE', value: '98.5%', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
           { label: 'PENDING VERIFICATION', value: `${panQueue.filter(p => p.status === 'Verification Required').length} Applications`, icon: Clock, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
           { label: 'PROCESSING VELOCITY', value: '4.2 Apps/Hr', icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/10' }
         ].map((stat, i) => (
            <div key={i} className="admin-glass-card p-6 rounded-[2.5rem] flex items-center gap-6 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] transition-all group liquid-glass-button">
                <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center border border-white/5 transition-colors group-hover:border-cyan-500/30`}>
                   <stat.icon className={stat.color} size={28} />
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black text-[var(--text-primary)] transition-colors" style={{ textShadow: 'var(--liquid-text-shadow)' }}>{stat.value}</div>
                  <div className="text-[10px] text-[var(--text-primary)]/40 font-black uppercase tracking-widest leading-none transition-colors">{stat.label}</div>
                </div>
            </div>
         ))}
      </div>

      {/* Main Verification Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="liquid-glass overflow-hidden rounded-[3rem] transition-all"
      >
        <div className="p-10 border-b border-white/5 flex items-center justify-between gap-6 bg-white/[0.02] transition-colors">
           <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--text-primary)]/40 flex items-center gap-3 transition-colors">
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#00D1FF]" />
              Operation Queue / অপারেশন তালিকা
           </h3>
           <div className="flex items-center gap-4 text-[10px] font-black tracking-widest text-[var(--text-primary)]/40 uppercase transition-colors">
              Filter by Status: 
              <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors">All</span> / 
              <span className="hover:text-cyan-400 cursor-pointer transition-colors">Pending</span> / 
              <span className="hover:text-cyan-400 cursor-pointer transition-colors">Review</span>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
             <thead className="bg-[#00011A]/50 border-b border-white/5 transition-colors">
                <tr>
                   <th className="px-10 py-6 text-[10px] uppercase font-black text-[var(--text-primary)]/40 tracking-[0.2em] transition-colors">Asset ID</th>
                   <th className="px-10 py-6 text-[10px] uppercase font-black text-[var(--text-primary)]/40 tracking-[0.2em] transition-colors">Operational Client</th>
                   <th className="px-10 py-6 text-[10px] uppercase font-black text-[var(--text-primary)]/40 tracking-[0.2em] transition-colors">Aadhaar</th>
                   <th className="px-10 py-6 text-[10px] uppercase font-black text-[var(--text-primary)]/40 tracking-[0.2em] transition-colors">OTP Status</th>
                   <th className="px-10 py-6 text-[10px] uppercase font-black text-[var(--text-primary)]/40 tracking-[0.2em] transition-colors">Command Status</th>
                   <th className="px-10 py-6 text-[10px] uppercase font-black text-[var(--text-primary)]/40 tracking-[0.2em] transition-colors text-right">Execution</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-white/5 transition-colors">
                {panQueue.map((pan, i) => (
                   <tr key={i} className="hover:bg-white/[0.03] transition-colors group">
                      <td className="px-10 py-8">
                         <span className="text-xs font-black text-cyan-500 italic opacity-60 group-hover:opacity-100 transition-opacity">#{pan.id.split('-').pop()}</span>
                      </td>
                      <td className="px-10 py-8">
                         <div className="flex flex-col">
                            <span className="text-sm font-bold text-[var(--text-primary)] uppercase group-hover:text-cyan-400 transition-colors tracking-tight">{pan.client}</span>
                            <span className="text-[10px] text-[var(--text-primary)]/30 uppercase mt-1 font-bold tracking-widest transition-colors">{pan.source}</span>
                         </div>
                      </td>
                      <td className="px-10 py-8 text-center sm:text-left">
                         <span className="text-[11px] font-black uppercase text-cyan-400 tracking-widest font-mono bg-cyan-400/5 px-3 py-1.5 rounded-lg border border-cyan-400/10">
                            {pan.aadhaarNumber || 'SENSITIVE_DATA'}
                         </span>
                      </td>
                      <td className="px-10 py-8">
                         <div className="flex flex-col">
                            <span className={`text-[10px] font-black uppercase tracking-widest ${
                               pan.otpStatus === 'Submitted' ? 'text-emerald-400' :
                               pan.otpStatus === 'Requested' ? 'text-amber-400' :
                               pan.otpStatus === 'Incorrect' ? 'text-red-400' :
                               'text-[var(--text-primary)]/20'
                            }`}>
                               {pan.otpStatus}
                            </span>
                            {pan.otp && <span className="text-[9px] font-bold text-cyan-400 mt-1.5 font-mono">CODE: {pan.otp}</span>}
                         </div>
                      </td>
                      <td className="px-10 py-8">
                         <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-xl ${
                               pan.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                               pan.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                               pan.status === 'Processing' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                               'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                               {pan.status === 'Approved' ? <CheckCircle2 size={18} /> :
                                pan.status === 'Rejected' ? <XCircle size={18} /> :
                                pan.status === 'Processing' ? <History size={18} /> :
                                <AlertCircle size={18} />}
                            </div>
                            <div className="flex flex-col">
                               <span className="text-xs font-bold text-[var(--text-primary)] transition-colors">{pan.status}</span>
                               <span className="text-[9px] text-[var(--text-primary)]/30 uppercase font-black italic transition-colors">
                                  {pan.status === 'Verification Required' ? 'অপেক্ষা করছে' : 'চলমান'}
                               </span>
                            </div>
                         </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                         <div className="flex items-center justify-end gap-3">
                            <button 
                               onClick={() => setSelectedApp(pan)}
                               className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all text-cyan-400 liquid-glass-button" title="View Docs"
                            >
                               <Eye size={18} />
                            </button>
                            
                            {pan.otpStatus === 'None' && pan.status === 'Verification Required' && (
                               <button 
                                 onClick={() => requestPanOtp(pan.id)}
                                 className="px-5 py-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:bg-amber-500/20 hover:border-amber-500/40 transition-all text-amber-500 text-[10px] font-black uppercase tracking-widest liquid-glass-button"
                               >
                                 Req OTP
                               </button>
                            )}

                            {pan.otpStatus === 'Submitted' && (
                               <div className="flex gap-2">
                                  <button 
                                    onClick={() => updatePanStatus(pan.id, 'Approved')}
                                    className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl hover:bg-emerald-500/20 text-emerald-500 liquid-glass-button"
                                  >
                                    <CheckCircle2 size={18} />
                                  </button>
                                  <button 
                                    onClick={() => setPanOtpStatus(pan.id, 'Incorrect')}
                                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-2xl hover:bg-red-500/20 text-red-500 liquid-glass-button"
                                  >
                                    <XCircle size={18} />
                                  </button>
                               </div>
                            )}

                            {pan.otpStatus === 'Incorrect' && (
                               <button 
                                 onClick={() => requestPanOtp(pan.id)}
                                 className="px-5 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl hover:bg-red-500/20 font-black text-red-500 text-[10px] uppercase tracking-widest liquid-glass-button"
                               >
                                 Retry
                               </button>
                            )}
                         </div>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
        </div>
      </motion.div>

      {/* Document Viewer Modal */}
      <AnimatePresence>
        {selectedApp && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00011A]/95 backdrop-blur-md"
           >
              <motion.div 
                initial={{ scale: 0.9, y: 40 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-5xl liquid-glass rounded-[4rem] overflow-hidden shadow-[0_64px_128px_-32px_rgba(0,0,0,0.7)]"
              >
                 <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-6 transition-colors">
                       <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20 shadow-[0_0_20px_rgba(0,209,255,0.15)]">
                          <FileText size={28} className="text-cyan-400" />
                       </div>
                       <div>
                          <h2 className="text-2xl font-black uppercase tracking-tighter transition-colors" style={{ textShadow: 'var(--liquid-text-shadow)' }}>Application Dossier</h2>
                          <p className="text-[10px] text-cyan-400 font-black uppercase tracking-[0.3em] mt-1">CLIENT // {selectedApp.client}</p>
                       </div>
                    </div>
                    <button onClick={() => setSelectedApp(null)} className="p-4 hover:bg-white/5 rounded-full transition-colors liquid-glass-button">
                       <XCircle size={32} />
                    </button>
                 </div>
                 
                 <div className="p-10 grid md:grid-cols-5 gap-10 h-[600px] overflow-y-auto custom-scrollbar">
                    <div className="md:col-span-2 space-y-8">
                       <div className="space-y-4">
                          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--text-primary)]/40 transition-colors ml-1">Identity Profile / পরিচয় প্রোফাইল</span>
                          <div className="p-8 bg-white/[0.03] rounded-[3rem] border border-white/5 space-y-6 transition-colors shadow-inner">
                             <div>
                                <div className="text-[10px] font-black text-[var(--text-primary)]/20 uppercase tracking-widest transition-colors mb-2">Legal Identity Name</div>
                                <div className="text-2xl font-bold text-cyan-400 tracking-tight transition-colors">{selectedApp.client}</div>
                             </div>
                             <div>
                                <div className="text-[10px] font-black text-[var(--text-primary)]/20 uppercase tracking-widest transition-colors mb-2">UID (Aadhaar Protocol)</div>
                                <div className="text-2xl font-bold font-mono text-[var(--text-primary)] tracking-widest transition-colors">{selectedApp.aadhaarNumber}</div>
                             </div>
                             <div>
                                <div className="text-[10px] font-black text-[var(--text-primary)]/20 uppercase tracking-widest transition-colors mb-2">Communication Link</div>
                                <div className="text-lg font-bold text-[var(--text-primary)]/60 transition-colors">{selectedApp.phone || 'N/A'}</div>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="md:col-span-3 space-y-4">
                       <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--text-primary)]/40 transition-colors ml-1 uppercase whitespace-nowrap">Asset Verification / সম্পদ যাচাইকরণ</span>
                       <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {[
                                   { id: 'photo', label: 'Applicant Photo', file: selectedApp.photo },
                                   { id: 'signature', label: 'Signature Asset', file: selectedApp.signature },
                                   { id: 'aadhaarDoc', label: 'Aadhaar Doc', file: selectedApp.aadhaarDoc },
                                   { id: 'additionalDoc', label: 'Additional Asset', file: selectedApp.additionalDoc },
                                   { id: 'annexureA', label: 'Annexure-A', file: selectedApp.annexureA },
                                ].map((doc) => (
                                   <div key={doc.id} className={`aspect-square relative group overflow-hidden bg-white/5 border ${doc.file ? 'border-cyan-500/20' : 'border-white/5'} rounded-[2.5rem] flex flex-col items-center justify-center p-6 transition-all liquid-glass-button`}>
                                      <div className={`w-full h-full ${doc.file ? 'bg-cyan-500/5' : 'bg-white/5'} rounded-3xl border ${doc.file ? 'border-cyan-500/10' : 'border-white/5'} flex items-center justify-center mb-4 transition-all group-hover:scale-105`}>
                                         <FileText size={doc.file ? 40 : 50} className={doc.file ? 'text-cyan-500' : 'text-white/5'} />
                                      </div>
                                      <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]/40 transition-colors uppercase leading-tight text-center">
                                         {doc.label}
                                         <br/>
                                         <span className={`text-[9px] mt-1 block ${doc.file ? 'text-cyan-500/60' : 'text-red-500/40'}`}>{doc.file ? 'ENCRYPTED_ASSET' : 'MISSING'}</span>
                                      </span>
                                      {doc.file && (
                                         <button className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="bg-cyan-500 text-[#00011A] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(0,209,255,0.4)]">View Decrypted</span>
                                         </button>
                                      )}
                                   </div>
                                ))}
                             </div>
                    </div>
                 </div>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>

      {/* Documentation Operational Warning */}
      <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-[2rem] flex items-start gap-4 mx-4 transition-all">
         <AlertCircle className="text-red-500 shrink-0" size={24} />
         <div className="space-y-1">
            <h4 className="text-sm font-black text-red-500 uppercase tracking-widest transition-colors">Protocol Guard / ডেটা নিরাপত্তা সতর্কতা</h4>
            <p className="text-[11px] text-[var(--text-primary)]/50 leading-relaxed italic transition-colors">
               "Warning: All downloaded Aadhaar and PAN documents must be purged from local cache within 90 minutes of processing. Command audit logs will track all access points."
            </p>
         </div>
      </div>
    </div>
  );
}
