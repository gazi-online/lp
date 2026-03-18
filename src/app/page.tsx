"use client";

import { ChevronRight, ArrowRight, CreditCard, Printer, Smartphone, Baby, ShoppingBag, QrCode, Menu, X } from 'lucide-react';
import { ServiceBentoGrid } from '@/components/ServiceBentoGrid';
import { PanApplicationWorkflow } from '@/components/PanApplicationWorkflow';
import { TrustAndAssurance } from '@/components/TrustAndAssurance';
import { Footer } from '@/components/Footer';
import { SERVICE_CATALOG } from "@/data/services";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const secondaryActions = [
    { label: "PhonePe Agent", icon: QrCode },
    { label: "Photo / Document Print", icon: Printer },
    { label: "Aadhar Mobile Link", icon: Smartphone },
    { label: "Child Aadhar Slot", icon: Baby },
    { label: "Products Page", icon: ShoppingBag },
  ];

  return (
    <main className="min-h-screen bg-transparent">


      {/* Header Container */}
      <header className="fixed top-0 w-full z-50 bg-white border-b border-[var(--border-subtle)] transition-all duration-400">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between relative z-50">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="Gazi Online Logo" 
              width={40} 
              height={40} 
              className="relative z-10 rounded-xl"
            />
            <div className="text-xl font-bold text-[var(--text-primary)] tracking-widest drop-shadow-sm transition-colors">
              GAZI<span className="text-[var(--accent-blue)]">ONLINE</span>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-[var(--text-primary)] text-sm font-black drop-shadow-sm items-center transition-colors">
            <span className="hover:text-[var(--accent-blue)] hover-text-glow cursor-pointer transition-colors">পরিষেবাসমূহ</span>
            <Link href="/track" className="hover:text-[var(--accent-blue)] hover-text-glow transition-colors">আবেদনের স্থিতি (Track Status)</Link>
            
            <div className="flex items-center gap-4 ml-4">
              <Link href="/admin" className="px-5 py-2.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-blue)] transition-all flex items-center gap-2 group shadow-xl">
                 <span className="text-[10px] tracking-widest uppercase font-black">Admin Login</span>
                 <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] group-hover:animate-pulse" />
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[var(--text-primary)] hover:border-[var(--accent-blue)]/50 transition-all active:scale-95"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-40 md:hidden bg-[var(--bg-primary)] pt-24 px-6"
            >

              <div className="flex flex-col gap-8 h-full">
                <div className="flex flex-col gap-6">
                  <span 
                    onClick={() => {
                        setIsMobileMenuOpen(false);
                        const servicesSection = document.getElementById('services');
                        if (servicesSection) servicesSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-2xl font-black text-[var(--text-primary)] hover:text-[var(--accent-blue)] flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <span>পরিষেবাসমূহ</span>
                    <ChevronRight size={24} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </span>

                  <Link 
                    href="/track" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-black text-[var(--text-primary)] hover:text-[var(--accent-blue)] flex items-center justify-between group transition-colors"
                  >
                    <span>আবেদনের স্থিতি</span>
                    <ChevronRight size={24} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link 
                    href="/order-pvc" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-black text-[var(--text-primary)] hover:text-[var(--accent-blue)] flex items-center justify-between group transition-colors"
                  >
                    <span>PVC Card Order</span>
                    <ChevronRight size={24} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>

                <div className="mt-auto pb-12 space-y-6">
                  <Link 
                    href="/admin" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-5 rounded-2xl bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center gap-4 group shadow-2xl transition-all hover:bg-[var(--accent-blue)] ring-1 ring-white/10"
                  >
                    <span className="text-sm tracking-[0.2em] font-black uppercase">Admin Login</span>
                    <div className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse" />
                  </Link>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-48 pb-32 min-h-screen flex flex-col justify-center relative z-10">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-12 lg:col-span-7 space-y-10"
          >
            <h1 className="text-hero font-black leading-tight drop-shadow-sm text-[var(--text-primary)] transition-colors">
              আপনার ডিজিটাল জীবন,{' '}
              <span
                className="bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] bg-clip-text text-transparent"
              >
                সহজ করা
              </span>
            </h1>
            
            <p className="text-body text-[var(--text-secondary)] font-semibold max-w-xl transition-colors">
              গাজী অনলাইন সবার জন্য ব্যাংকিং, সরকারি আইডি পরিষেবা এবং ইউটিলিটিগুলোতে সহজে অ্যাক্সেস প্রদান করে। অ্যাপলের মতো সহজ ব্যবহার এবং স্ট্রাইপের মতো নির্ভরযোগ্য নিরাপত্তা।
            </p>
 
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <Link 
                  href="/order-pvc"
                  className="group relative bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] text-white font-black px-10 py-5 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,102,255,0.3)] transition-all hover-scale-bounce ring-1 ring-white/20"
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10 flex items-center gap-3 text-lg tracking-widest uppercase">
                    PVC Card Order <CreditCard size={22} className="group-hover:rotate-12 transition-transform" />
                  </span>
                </Link>
                
                <Link
                  href="/book-appointment"
                  className="glass-panel text-[var(--btn-secondary-text)] font-black px-10 py-5 rounded-2xl hover:bg-[var(--btn-secondary-bg)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] shadow-xl hover-scale-bounce transition-all inline-block"
                >
                  অ্যাপয়েন্টমেন্ট বুক করুন
                </Link>
              </div>

              {/* Secondary Quick Actions Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 pt-8"
              >
                {secondaryActions.map((action, i) => (
                  <MagneticButton key={i} action={action} />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Stats Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-5 hidden md:block"
          >
            <div className="relative p-8 rounded-[2.5rem] space-y-6 overflow-hidden bg-[var(--card-bg)] backdrop-blur-[60px] border border-[var(--card-border)] shadow-[var(--shadow-md)] ring-1 ring-inset ring-[var(--border-subtle)] hover-glow-card transition-all">
              {/* Header */}
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-[var(--text-secondary)] bg-[var(--btn-secondary-bg)] px-3 py-1.5 rounded-full ring-1 ring-[var(--card-border)]">Quick Stats</span>
                <span className="flex items-center gap-2 text-[10px] font-black text-[var(--accent-green)] bg-[var(--accent-green)]/10 px-3 py-1.5 rounded-full ring-1 ring-[var(--accent-green)]/20">
                  <span className="w-2 h-2 bg-[var(--accent-green)] rounded-full animate-pulse" /> LIVE
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="group bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] p-5 rounded-2xl cursor-default transition-all">
                   <div className="text-4xl font-black text-white mb-1 tracking-tighter group-hover:scale-105 transition-transform origin-left">123+</div>
                   <div className="text-[10px] font-black text-white/70 uppercase tracking-widest leading-tight">আবেদন আজকে<br/>প্রক্রিয়াধীন</div>
                </div>
                <div className="group bg-[var(--bg-secondary)] p-5 rounded-2xl ring-1 ring-[var(--border-subtle)] cursor-default transition-all">
                   <div className="text-4xl font-black text-[var(--text-primary)] mb-1 tracking-tighter group-hover:scale-105 transition-transform origin-left">3-Day</div>
                   <div className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest leading-tight">Delivery<br/>Guarantee on PAN</div>
                </div>
                <div className="group col-span-2 bg-gradient-to-r from-[var(--accent-saffron)] to-[var(--accent-red)] p-5 rounded-2xl cursor-default transition-all">
                   <div className="text-4xl font-black text-white mb-1 tracking-tighter group-hover:scale-105 transition-transform origin-left">১২,৪৫০+</div>
                   <div className="text-[10px] font-black text-white/70 uppercase tracking-widest">সফল লেনদেন সম্পন্ন</div>
                </div>
              </div>

              {/* Service Badges */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5 transition-colors">
                {SERVICE_CATALOG.slice(0, 5).map((service) => (
                  <motion.span 
                    key={service.id} 
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="text-[9px] font-black text-[var(--text-secondary)] bg-white/5 px-4 py-2 rounded-full border border-white/5 uppercase tracking-[0.15em] transition-all hover:text-[var(--accent-blue)] hover:border-[var(--accent-blue)]/30 hover:shadow-[0_0_15px_rgba(0,209,255,0.2)] cursor-default liquid-glass-button"
                  >
                    {service.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* Service Bento Grid Section */}
      <ServiceBentoGrid onApply={() => router.push('/book-appointment')} />

      {/* PAN Application Workflow Section */}
      <PanApplicationWorkflow />

      {/* Trust & Assurance Section */}
      <TrustAndAssurance />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}

function MagneticButton({ action }: { action: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const dx = useSpring(x, springConfig);
  const dy = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-5 p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-[var(--accent-blue)]/50 hover:bg-white/[0.08] transition-all group liquid-glass-button shadow-2xl relative overflow-hidden"
    >
      <motion.div 
        style={{ x: dx, y: dy }}
        className="p-5 rounded-3xl bg-[var(--accent-blue)]/10 group-hover:bg-[var(--accent-blue)] transition-all duration-500 shadow-inner group-hover:shadow-[0_0_25px_rgba(0,209,255,0.4)] relative z-10"
      >
        <action.icon className="w-8 h-8 text-[var(--accent-blue)] group-hover:text-white transition-all duration-500 group-hover:scale-110" />
      </motion.div>
      <span className="relative z-10 text-xs sm:text-sm font-black text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] uppercase tracking-[0.15em] text-center leading-tight">
        {action.label}
      </span>
      
      {/* Radiant Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-blue)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.button>
  );
}
