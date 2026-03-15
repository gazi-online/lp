"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ThemeToggle } from '../ThemeToggle';
import { 
  LayoutDashboard, 
  Truck, 
  Calendar, 
  FileText, 
  Users, 
  ShieldAlert, 
  Settings,
  LogOut,
  ChevronRight,
  CreditCard
} from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const NAV_ITEMS = [
  {
    id: 'brain',
    label: 'Intelligence Brain',
    bnLabel: 'মেধা কেন্দ্র',
    path: '/admin',
    icon: LayoutDashboard,
    color: '#00B86C'
  },
  {
    id: 'logistics',
    label: 'Logistics Fleet',
    bnLabel: 'পরিবহন বহর',
    path: '/admin/logistics-fleet',
    icon: Truck,
    color: '#0033FF'
  },
  {
    id: 'schedule',
    label: 'Schedule Master',
    bnLabel: 'সময়সূচী মাস্টার',
    path: '/admin/schedule-master',
    icon: Calendar,
    color: '#7B2FBE'
  },
  {
    id: 'pan',
    label: 'Remote PAN Hub',
    bnLabel: 'রিমোট প্যান হাব',
    path: '/admin/remote-ops',
    icon: FileText,
    color: '#00EDFF'
  },
  {
    id: 'squadron',
    label: 'Squadron Command',
    bnLabel: 'স্কোয়াড্রন কমান্ড',
    path: '/admin/squadron',
    icon: Users,
    color: '#F59E0B'
  },
  {
    id: 'treasury',
    label: 'Treasury Command',
    bnLabel: 'কোষাগার কমান্ড',
    path: '/admin/treasury-command',
    icon: CreditCard,
    color: '#10B981'
  },
  {
    id: 'root',
    label: 'Root Access',
    bnLabel: 'রুট অ্যাক্সেস',
    path: '/admin/root-access',
    icon: ShieldAlert,
    color: '#EF4444'
  }
];

export function CommandSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('nexus-token');
    router.push('/admin/auth');
  };

  return (
    <aside className="w-72 border-r border-[var(--admin-border)] bg-[var(--admin-sidebar)] flex flex-col z-30 relative transition-colors duration-400">
      {/* Sidebar Header */}
      <div className="p-8 border-b border-[var(--admin-border)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 group">
            <div className="absolute inset-0 bg-emerald-500 rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
            <Image 
              src="/logo.png" 
              alt="Gazi Online Logo" 
              width={40} 
              height={40} 
              className="relative z-10 rounded-xl"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-[var(--text-primary)] uppercase italic transition-colors">
              GAZI<span className="text-emerald-500">ONLINE</span>
            </span>
            <span className="text-[8px] text-[var(--text-primary)]/40 font-black uppercase tracking-[0.4em] mt-0.5 ml-0.5 leading-none transition-colors">
              Enterprise Hub
            </span>
          </div>
        </div>
        <ThemeToggle />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto scrollbar-none">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.id} href={item.path} className="block group">
              <div className={`relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 border ${
                isActive 
                  ? 'bg-[var(--text-primary)]/5 border-[var(--admin-border)] shadow-sm' 
                  : 'border-transparent hover:bg-[var(--text-primary)]/5 hover:border-[var(--admin-border)]'
              }`}>
                {isActive && (
                   <motion.div 
                     layoutId="sidebar-active"
                     className="absolute left-0 w-1 h-2/3 bg-emerald-500 rounded-r-full shadow-[0_0_10px_#10B981]"
                   />
                )}
                
                <item.icon size={22} className={isActive ? 'text-emerald-500' : 'text-[var(--text-primary)]/40 group-hover:text-[var(--text-primary)]/80 transition-colors'} />
                
                <div className="flex flex-col min-w-0">
                  <span className={`text-[11px] font-black uppercase tracking-widest leading-none transition-colors ${
                    isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-primary)]/40 group-hover:text-[var(--text-primary)]/60'
                  }`}>
                    {item.label}
                  </span>
                  <span className={`text-[12px] font-bold mt-0.5 truncate transition-colors ${
                    isActive ? 'text-emerald-500' : 'text-[var(--text-primary)]/20 group-hover:text-[var(--text-primary)]/30'
                  }`}>
                    {item.bnLabel}
                  </span>
                </div>

                {isActive && <ChevronRight size={14} className="ml-auto text-emerald-500" />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-6 border-t border-[var(--admin-border)] space-y-4">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-all border border-transparent hover:border-red-500/20 group"
        >
          <LogOut size={20} className="group-hover:translate-x-0.5 transition-transform" />
          <div className="flex flex-col items-start transition-opacity">
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Termination</span>
            <span className="text-[11px] font-bold mt-0.5">লগ আউট</span>
          </div>
        </button>
      </div>
    </aside>
  );
}
