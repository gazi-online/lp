"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowRight, 
  Calendar as CalendarIcon, 
  User, 
  Smartphone, 
  Globe,
  MonitorCheck,
  Fingerprint,
  CreditCard,
  CreditCard as PaymentIcon,
  FileCheck,
  ArrowLeft
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { format, addDays, isSameDay } from "date-fns";
import InputField from "@/components/InputField";
import GlassBackButton from "@/components/GlassBackButton";
import ServiceCard from "@/components/ServiceCard";
import SlotPicker from "@/components/SlotPicker";
import VoiceInput from "@/components/VoiceInput";

const formSchema = z.object({
  fullName: z.string().min(2, "আপনার নাম লিখুন (Write name)"),
  phone: z.string().regex(/^\d{10}$/, "সঠিক ১০ সংখ্যার নম্বর দিন (10 digits)"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const STEPS = [
  { id: "service", title: "কাজ বেছে নিন", sub: "Step 1: Kaaj", icon: Globe },
  { id: "schedule", title: "সময় ও তারিখ", sub: "Step 2: Somoy", icon: CalendarIcon },
  { id: "identity", title: "আপনার নাম", sub: "Step 3: Naam", icon: User },
  { id: "review", title: "মিলিয়ে দেখুন", sub: "Step 4: Check", icon: MonitorCheck },
  { id: "payment", title: "টাকা জমা", sub: "Step 5: Taka", icon: PaymentIcon }
];

export default function AppointmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    setMounted(true);
    setSelectedDate(new Date());
  }, []);

  // Load Services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        if (res.ok) {
          const data = await res.json();
          setServices(data);
        } else {
             setServices([
                { id: 1, name: 'আধার কার্ড/মোবাইল নম্বর', description: 'আধার কার্ডের ছবি বা ফোন নম্বর বদলান', price: '100', icon_name: 'Fingerprint' },
                { id: 2, name: 'নতুন প্যান কার্ড বানান', description: 'NSDL প্যান কার্ডের নতুন আবেদন করুন', price: '120', icon_name: 'CreditCard' },
                { id: 3, name: 'জীবন সংশয়পত্র (Life Cert)', description: 'পেনশনের জন্য ডিজিটাল লাইফ সার্টিফিকেট', price: '50', icon_name: 'FileCheck' },
                { id: 4, name: 'অন্যান্য ডিজিটাল কাজ', description: 'যেকোনো ফর্ম ফিলাপ বা প্রিন্টিং', price: '30', icon_name: 'Smartphone' },
             ]);
        }
      } catch (e) {
        console.error("API failed", e);
      }
    };
    fetchServices();
  }, []);

  // Load Slots when Date/Service changes
  useEffect(() => {
    if (selectedService && selectedDate) {
      const fetchSlots = async () => {
        setIsLoading(true);
        try {
          const dateStr = format(selectedDate, 'yyyy-MM-dd');
          const res = await fetch(`/api/availability?serviceId=${selectedService.id}&date=${dateStr}`);
          if (res.ok) {
            const data = await res.json();
            setSlots(data.slots || data);
          }
        } catch (e) {
          setSlots([]); 
        } finally {
          setIsLoading(false);
        }
      };
      fetchSlots();
    }
  }, [selectedService, selectedDate]);

  const onFinalSubmit = async (data: FormData) => {
    if (!selectedDate || !selectedSlot) return;
    setIsFinalizing(true);
    await new Promise(r => setTimeout(r, 2000));
    setBookingId(`GAZI-${Math.floor(1000 + Math.random() * 9000)}`);
    setIsFinalizing(false);
    setCurrentStep(5); // Success screen
  };

  const nextAvailableDates = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));
  }, [mounted]);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] flex flex-col pt-4 md:pt-10 pb-20">
      <div className="container mx-auto px-4 flex-1 flex flex-col">
        {/* Back Button */}
        <div className="mb-6 flex justify-between items-center">
          <Link href="/">
            <GlassBackButton>আগের পাতা (Back)</GlassBackButton>
          </Link>
          <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 text-[8px] font-black uppercase tracking-widest text-white/40">
            CSC Hub: Basirhat v2.0
          </div>
        </div>

        {/* Unified Mobile Stepper */}
        <div className="mb-8 flex justify-between items-center gap-2 max-w-2xl mx-auto w-full px-2">
            {STEPS.map((step, idx) => {
                const isActive = currentStep === idx;
                const isCompleted = currentStep > idx;
                return (
                    <div key={idx} className="flex flex-col items-center gap-2 flex-1 relative">
                        {idx !== 0 && (
                            <div className={`absolute right-1/2 translate-x-1/2 top-5 -left-1/2 h-1 w-full bg-white/5 -z-10 ${isCompleted ? 'bg-[var(--accent-blue)]' : ''}`} />
                        )}
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border-2 transition-all ${
                            isActive ? 'bg-[var(--accent-blue)] text-white scale-110 shadow-lg' : isCompleted ? 'bg-[var(--accent-green)] text-white' : 'bg-white/5 text-white/20 border-white/5'
                        }`}>
                            {isCompleted ? <CheckCircle2 size={18} /> : <step.icon size={18} />}
                        </div>
                    </div>
                );
            })}
        </div>

        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
          <div className="liquid-glass flex-1 p-6 md:p-12 rounded-[3.5rem] border border-white/10 flex flex-col shadow-2xl overflow-hidden relative">
             <AnimatePresence mode="wait">
                {currentStep === 0 && (
                    <motion.div key="step0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="text-center mb-10">
                        <h1 className="text-4xl font-black tracking-tighter text-[var(--text-primary)] font-serif italic mb-2">কাজ বেছে নিন (Select)</h1>
                        <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[var(--text-secondary)]">আপনার কী কাজ করতে হবে তা এখান থেকে ঠিক করুন</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-y-auto px-2 custom-scrollbar pb-6">
                        {services.map(s => (
                          <ServiceCard key={s.id} service={s} isSelected={selectedService?.id === s.id} onSelect={setSelectedService} />
                        ))}
                      </div>

                      <button 
                         onClick={() => setCurrentStep(1)} 
                         disabled={!selectedService}
                         className="mt-8 w-full py-6 md:py-8 bg-[var(--accent-blue)] text-white rounded-3xl font-black text-xl uppercase tracking-widest shadow-xl flex items-center justify-center gap-4 disabled:opacity-20 disabled:grayscale transition-all hover:scale-105 active:scale-95"
                      >
                         পরের ধাপ (Next) <ArrowRight size={28} />
                      </button>
                    </motion.div>
                )}

                {currentStep === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
                       <div className="text-center mb-10">
                          <h1 className="text-4xl font-black tracking-tighter text-[var(--text-primary)] font-serif italic mb-2">দিন ও সময় বাছুন</h1>
                          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[var(--text-secondary)]">আপনি কখন আমাদের কেন্দ্রে আসতে চান?</p>
                       </div>

                       <div className="flex-1 space-y-12 overflow-y-auto pr-2 custom-scrollbar pb-6">
                          <div className="flex gap-4 overflow-x-auto pb-4 px-2 no-scrollbar">
                             {nextAvailableDates.map((date, i) => (
                               <button 
                                 key={i} 
                                 onClick={() => setSelectedDate(date)} 
                                 className={`min-w-[120px] p-6 rounded-[2.5rem] border-4 transition-all flex flex-col items-center gap-1 ${
                                   selectedDate && isSameDay(date, selectedDate) ? 'border-[var(--accent-blue)] bg-[var(--accent-blue)] text-white shadow-xl' : 'border-white/5 bg-white/5'
                                 }`}
                               >
                                  <span className="text-xs font-black uppercase opacity-60">{format(date, 'EEE')}</span>
                                  <span className="text-3xl font-black italic">{format(date, 'dd')}</span>
                               </button>
                             ))}
                          </div>

                          <div className="px-2">
                             <SlotPicker slots={slots} selectedSlot={selectedSlot} onSelect={setSelectedSlot} isLoading={isLoading} />
                          </div>
                       </div>

                       <div className="mt-8 grid grid-cols-2 gap-4">
                          <button onClick={() => setCurrentStep(0)} className="py-6 rounded-3xl bg-white/5 border border-white/10 font-black text-md tracking-widest uppercase">পেছনে যান</button>
                          <button onClick={() => setCurrentStep(2)} disabled={!selectedSlot} className="py-6 rounded-3xl bg-[var(--accent-blue)] text-white shadow-xl font-black text-md tracking-widest uppercase flex items-center justify-center gap-3 disabled:opacity-20">এগিয়ে যান <ArrowRight size={24} /></button>
                       </div>
                    </motion.div>
                )}

                {currentStep === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col">
                       <div className="text-center mb-10">
                          <h1 className="text-4xl font-black tracking-tighter text-[var(--text-primary)] font-serif italic mb-2">আপনার নাম দিন</h1>
                          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[var(--text-secondary)]">আপনার নাম এবং মোবাইল নম্বর এখানে লিখুন</p>
                       </div>

                       <div className="flex-1 max-w-md mx-auto w-full space-y-10">
                          <div className="space-y-4">
                            <InputField label="নাম (Full Name)" placeholder="নাম লিখুন..." icon={User} {...register("fullName")} />
                            <VoiceInput onTranscript={(t) => setValue("fullName", t)} placeholder="মুখে নাম বলুন" />
                          </div>

                          <InputField label="মোবাইল নম্বর (Phone)" placeholder="১০ সংখ্যার নম্বর" icon={Smartphone} {...register("phone")} />
                          
                          <div className="space-y-4 pt-4 border-t border-white/10">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-6">অন্যান্য তথ্য (Notes)</label>
                            <VoiceInput onTranscript={(t) => setValue("notes", t)} placeholder="মুখে তথ্য বলুন" />
                            <textarea {...register("notes")} placeholder="কিছু বলতে চাইলে এখানে লিখুন..." className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-6 text-sm font-bold text-white focus:outline-none focus:border-[var(--accent-blue)]" rows={3} />
                          </div>
                       </div>

                       <div className="mt-10 grid grid-cols-2 gap-4">
                          <button onClick={() => setCurrentStep(1)} className="py-6 rounded-3xl bg-white/5 border border-white/10 font-black text-md tracking-widest uppercase text-white/40">পেছনে যান</button>
                          <button onClick={() => setCurrentStep(3)} className="py-6 rounded-3xl bg-[var(--accent-blue)] text-white shadow-xl font-black text-md tracking-widest uppercase flex items-center justify-center gap-3">মিলিয়ে দেখুন <ArrowRight size={24} /></button>
                       </div>
                    </motion.div>
                )}

                {currentStep === 3 && (
                   <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col text-center">
                       <div className="mb-12">
                          <h1 className="text-4xl font-black tracking-tighter text-[var(--text-primary)] font-serif italic mb-2">সব মিলিয়ে দেখুন</h1>
                          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[var(--text-secondary)]">বুকিং সম্পন্ন করার আগে একবার দেখুন</p>
                       </div>

                       <div className="max-w-md mx-auto w-full space-y-6 bg-white/5 p-10 rounded-[3rem] border border-white/10 text-left">
                          <div className="flex justify-between border-b border-white/10 pb-4">
                             <span className="text-[10px] font-black uppercase tracking-widest opacity-40">পরিষেবা (Work):</span>
                             <span className="text-sm font-black text-[var(--accent-blue)]">{selectedService?.name}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/10 pb-4">
                             <span className="text-[10px] font-black uppercase tracking-widest opacity-40">দিন ও সময়:</span>
                             <span className="text-sm font-black">{selectedDate && format(selectedDate, "dd MMM")} | {selectedSlot?.start}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/10 pb-4">
                             <span className="text-[10px] font-black uppercase tracking-widest opacity-40">টাকা (Charge):</span>
                             <span className="text-lg font-black italic text-emerald-400">₹{selectedService?.price}</span>
                          </div>
                       </div>

                       <div className="mt-12 grid grid-cols-2 gap-4">
                          <button onClick={() => setCurrentStep(2)} className="py-6 rounded-3xl bg-white/5 border border-white/10 font-black text-md tracking-widest uppercase text-white/40">ঠিক করুন</button>
                          <button onClick={() => setCurrentStep(4)} className="py-6 rounded-3xl bg-emerald-500 text-white shadow-xl font-black text-md tracking-widest uppercase flex items-center justify-center gap-3">ঠিক আছে <ArrowRight size={24} /></button>
                       </div>
                   </motion.div>
                )}

                {currentStep === 4 && (
                   <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col justify-center items-center">
                       <div className="w-40 h-40 bg-[var(--accent-blue)]/10 rounded-[4rem] border border-[var(--accent-blue)]/20 flex items-center justify-center mb-10 shadow-2xl relative">
                          <PaymentIcon size={64} className="text-[var(--accent-blue)] z-10" />
                          <div className="absolute inset-0 bg-[var(--accent-blue)]/20 blur-3xl animate-pulse" />
                       </div>
                       <h2 className="text-4xl font-black tracking-tighter text-white font-serif italic mb-4">বুকিং সম্পন্ন করুন</h2>
                       <button onClick={handleSubmit(onFinalSubmit)} disabled={isFinalizing} className="px-16 py-8 bg-[var(--accent-blue)] text-white rounded-3xl font-black text-2xl uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4">
                          {isFinalizing ? "অপেক্ষা করুন..." : "কনফার্ম করুন (Confirm)"}
                       </button>
                   </motion.div>
                )}

                {currentStep === 5 && (
                   <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center">
                       <div className="w-48 h-48 bg-emerald-500/10 rounded-[5rem] border border-emerald-500/20 flex items-center justify-center mb-10 shadow-2xl">
                          <CheckCircle2 size={96} className="text-emerald-500" />
                       </div>
                       <h1 className="text-5xl font-black tracking-tighter text-white font-serif italic mb-4">সফল হয়েছে!</h1>
                       <div className="px-8 py-3 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-8">
                          <span className="text-xs font-black uppercase text-emerald-500 tracking-widest">বুকিং নম্বর: {bookingId}</span>
                       </div>
                       <p className="text-lg font-bold text-white/60 max-w-md mx-auto mb-12">আপনার বুকিং সফল হয়েছে। নির্দিষ্ট সময়ে সেন্টারে চলে আসুন।</p>
                       <Link href="/track">
                         <button className="px-12 py-6 bg-white text-black rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-2xl">বুকিং দেখুন</button>
                       </Link>
                   </motion.div>
                )}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
