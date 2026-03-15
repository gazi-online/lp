"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip check for auth page itself
    if (pathname === '/admin/auth') {
      setAuthorized(true);
      return;
    }

    const token = localStorage.getItem('nexus-token');
    if (!token) {
      router.push('/admin/auth');
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  if (!authorized && pathname !== '/admin/auth') {
    return (
      <div className="fixed inset-0 bg-[#00011A] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center animate-pulse">
            <ShieldAlert size={32} className="text-red-500" />
          </div>
          <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.5em] animate-pulse">
            Establishing Secure Command Connection...
          </p>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
