"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShieldCheck, UserCheck, CreditCard, Star, Activity, Award, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

function CountUp({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const endValue = value;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * endValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{count.toLocaleString('bn-BD')}</span>;
}

const testimonials = [
  {
    name: "অনির্বাণ ঘোষ",
    role: "ছোট ব্যবসায়ী",
    text: "খুব দ্রুত প্যান কার্ড পেয়েছি। ওদের সার্ভিস দারুণ এবং ব্যবহার খুব ভালো।",
    rating: 5,
  },
  {
    name: "সুস্মিতা প্রধান",
    role: "গৃহবধূ",
    text: "বাড়ির কাছেই ব্যাংকিং সুবিধা পেয়ে আমার খুব উপকার হয়েছে। ধন্যবাদ গাজী অনলাইন।",
    rating: 5,
  },
  {
    name: "রাহুল মন্ডল",
    role: "ছাত্র",
    text: "অনলাইন ফর্ম ফিলাপ আর জেরক্সের জন্য আমি সবসময় এখানেই আসি। নির্ভরযোগ্য জায়গা।",
    rating: 4,
  },
];

const partners = [
  { name: "NSDL", icon: Award },
  { name: "UTIITSL", icon: Award },
  { name: "Digital India", icon: Award },
  { name: "GSTn", icon: Award },
];

export function TrustAndAssurance() {
  return (
    <section className="py-20 relative overflow-hidden transition-colors">
      
      <div className="container mx-auto px-4">
        
        {/* Trust Badge Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div 
            className="p-6 rounded-2xl flex items-center gap-4 bg-[var(--card-bg)] border border-[var(--card-border)] ring-1 ring-[var(--border-subtle)] shadow-xl hover-glow-card transition-all"
          >
            <div className="bg-[var(--accent-blue)]/10 p-3 rounded-xl ring-1 ring-[var(--accent-blue)]/20 transition-colors">
              <ShieldCheck className="w-8 h-8 text-[var(--accent-blue)] transition-colors" />
            </div>
            <div>
              <h4 className="text-[var(--text-primary)] font-black text-lg transition-colors">3-Day Delivery</h4>
              <p className="text-[var(--text-secondary)] text-sm font-bold transition-colors">প্যান কার্ডের দ্রুততম পরিষেবা</p>
            </div>
          </motion.div>

          <motion.div 
            className="p-6 rounded-2xl flex items-center gap-4 bg-[var(--card-bg)] border border-[var(--card-border)] ring-1 ring-[var(--border-subtle)] shadow-xl hover-glow-card transition-all"
          >
            <div className="bg-[var(--accent-saffron)]/10 p-3 rounded-xl ring-1 ring-[var(--accent-saffron)]/20 transition-colors">
              <UserCheck className="w-8 h-8 text-[var(--accent-saffron)] transition-colors" />
            </div>
            <div>
              <h4 className="text-[var(--text-primary)] font-black text-lg transition-colors">Aadhaar Verified</h4>
              <p className="text-[var(--text-secondary)] text-sm font-bold transition-colors">সম্পূর্ণ নিরাপদ সরকারি পদ্ধতি</p>
            </div>
          </motion.div>

          <motion.div 
            className="p-6 rounded-2xl flex items-center gap-4 bg-[var(--card-bg)] border border-[var(--card-border)] ring-1 ring-[var(--border-subtle)] shadow-xl hover-glow-card transition-all"
          >
            <div className="bg-[var(--accent-green)]/10 p-3 rounded-xl ring-1 ring-[var(--accent-green)]/20 transition-colors">
              <CreditCard className="w-8 h-8 text-[var(--accent-green)] transition-colors" />
            </div>
            <div>
              <h4 className="text-[var(--text-primary)] font-black text-lg transition-colors">No Hidden Fees</h4>
              <p className="text-[var(--text-secondary)] text-sm font-bold transition-colors">স্বচ্ছ এবং সঠিক মূল্য</p>
            </div>
          </motion.div>
        </div>

        {/* Social Proof & Live Activity */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl text-[var(--text-primary)] mb-8 font-black tracking-tight font-serif transition-colors">
              আমাদের 
              <span className="relative mx-4 inline-block px-6 py-2">
                <motion.span 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="absolute inset-0 bg-[var(--accent-blue)] rounded-2xl -rotate-2"
                />
                <span className="relative z-10 text-white italic drop-shadow-sm">
                  "গ্রাহকরা"
                </span>
              </span>
              যা বলেন
            </h2>
            <div className="space-y-6">
              {testimonials.map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-3xl transition-all group bg-[var(--card-bg)] border border-[var(--card-border)] ring-1 ring-[var(--border-subtle)] hover:bg-[var(--bg-secondary)] hover-glow-card"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[var(--accent-saffron)] fill-[var(--accent-saffron)] transition-colors" />
                    ))}
                  </div>
                  <p className="text-[var(--text-secondary)] italic mb-6 font-bold text-lg leading-relaxed transition-colors">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--btn-secondary-bg)] flex items-center justify-center font-black text-[var(--accent-blue)] ring-1 ring-[var(--border-subtle)] uppercase transition-colors">
                      {t.name[0]}
                    </div>
                    <div>
                      <span className="text-[var(--text-primary)] font-black block text-base transition-colors">{t.name}</span>
                      <span className="text-[var(--text-tertiary)] text-sm font-bold uppercase tracking-widest transition-colors">{t.role}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <LiveActivityCard />

            {/* Partner Wall */}
            <div className="pt-10">
              <p className="text-center text-[10px] font-black text-[var(--text-tertiary)] uppercase tracking-[0.3em] mb-8 transition-colors">Official Partners & Providers</p>
              <div className="flex flex-wrap justify-center gap-12 transition-all duration-700">
                 {partners.map((p, i) => (
                   <div key={i} className="flex items-center gap-3 text-[var(--text-primary)] opacity-40 hover:opacity-100 font-black text-2xl tracking-tighter group cursor-default hover-scale-bounce transition-all">
                     <p.icon className="w-7 h-7 text-[var(--accent-blue)] transition-colors" />
                     {p.name}
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function LiveActivityCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative p-12 rounded-[3.5rem] overflow-hidden bg-white border border-[var(--border-subtle)] shadow-sm ring-1 ring-inset ring-black/5 cursor-pointer transition-all duration-300 group"
    >
      <div 
        className="absolute inset-0 bg-gray-50"
        style={{ transform: "translateZ(-20px)" }}
      />
      
      <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
        <div className="absolute top-0 right-0">
          <Activity className="w-16 h-16 text-white/10 animate-pulse" />
        </div>
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-xl font-black text-[var(--text-primary)]/70 mb-4 uppercase tracking-[0.2em]"
        >
          লাইভ অ্যাক্টিভিটি
        </motion.h3>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-7xl font-black text-[var(--accent-blue)] mb-6 tracking-tighter"
        >
          <CountUp value={12450} />+
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[var(--text-primary)]/90 text-lg font-black leading-relaxed max-w-xs"
        >
          সফলভাবে সম্পন্ন করা ডিজিটাল লেনদেন ও আবেদন
        </motion.p>
        
        <div className="mt-12 bg-white/10 backdrop-blur-xl rounded-2xl p-6 flex items-center justify-between ring-1 ring-white/20 overflow-hidden">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.1, zIndex: 10 }}
                className="w-12 h-12 rounded-full border-4 border-black/20 bg-white/20 backdrop-blur-md relative cursor-help"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent" />
              </motion.div>
            ))}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 rounded-full border-4 border-black/20 bg-[var(--accent-saffron)] flex items-center justify-center text-xs text-white font-black shadow-lg"
            >
              +50
            </motion.div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-ping" />
              Active Now
            </span>
          </div>
        </div>
      </div>

      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />
    </motion.div>
  );
}
