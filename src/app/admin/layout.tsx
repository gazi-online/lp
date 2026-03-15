"use client";

import React from 'react';
import { CommandSidebar } from '@/components/admin/CommandSidebar';
import { AuthGuard } from '@/components/admin/AuthGuard';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/admin/auth';

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[var(--admin-bg)] text-[var(--text-primary)] font-sans selection:bg-accent/30 selection:text-white transition-colors duration-400">
        {/* Background Cyber-Grid Effect */}
        <div className="fixed inset-0 pointer-events-none opacity-20 transition-opacity">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--admin-bg)] via-transparent to-[var(--admin-bg)]"></div>
        </div>

        {!isAuthPage ? (
          <div className="relative flex h-screen overflow-hidden">
            {/* Navigation Sidebar */}
            <div className="border-r border-white/10 bg-[var(--admin-sidebar)] transition-colors duration-400">
               <CommandSidebar />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
              {/* Top Status Bar */}
              <header className="h-16 flex items-center justify-between px-8 border-b border-white/10 bg-white/5 backdrop-blur-xl z-20 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black text-emerald-500/80">
                    System Active // সিস্টেম সক্রিয়
                  </span>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-[10px] text-right">
                    <div className="text-[var(--text-primary)]/40 uppercase tracking-widest font-bold">Commander</div>
                    <div className="text-[var(--admin-accent)] uppercase tracking-widest font-black">GAZI ONLINE</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-accent p-[1px] shadow-lg">
                    <div className="w-full h-full rounded-[10px] bg-[var(--admin-bg)] flex items-center justify-center font-black text-xs transition-colors">
                      GO
                    </div>
                  </div>
                </div>
              </header>

              {/* Scrollable Workspace */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 relative scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {children}
              </div>
            </main>
          </div>
        ) : (
          <div className="relative h-screen">
            {children}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}

