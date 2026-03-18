"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Smartphone, 
  FileCheck, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Truck,
  FileText,
  User
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useAdminStore } from "@/lib/store/useAdminStore";
import InputField from "@/components/InputField";
import GlassBackButton from "@/components/GlassBackButton";
import { MapPin, Mail, Shield, Map } from "lucide-react";


const formSchema = z.object({
  fullName: z.string().min(3, "পুরো নাম প্রয়োজন"),
  phone: z.string().regex(/^\d{10}$/, "সঠিক ১০ ডিজিটের মোবাইল নম্বর দিন"),
  village: z.string().min(2, "গ্রামের নাম প্রয়োজন"),
  postOffice: z.string().min(2, "ডাকঘরের নাম প্রয়োজন"),
  policeStation: z.string().min(2, "থানার নাম প্রয়োজন"),
  district: z.string().min(2, "জেলার নাম প্রয়োজন"),
  pinCode: z.string().regex(/^\d{6}$/, "সঠিক ৬ ডিজিটের পিন কোড দিন"),
  email: z.string().email("সঠিক ইমেল দিন").optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

interface UploadedFiles {
  document: boolean;
}

const steps = [
  { id: "terms", title: "শর্তাবলী", icon: ShieldCheck, sub: "নিবন্ধন চুক্তি" },
  { id: "identity", title: "পরিচয় তথ্য", icon: User, sub: "ব্যক্তিগত তথ্য" },
  { id: "assets", title: "ডকুমেন্ট আপলোড", icon: Upload, sub: "নথি পাঠান" },
  { id: "verify", title: "যাচাইকরণ", icon: Smartphone, sub: "সুরক্ষা প্রোটোকল" },
];

export default function OrderPvcPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);
  const [otpValue, setOtpValue] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({
    document: false,
  });

  const [checkedTerms, setCheckedTerms] = useState<number[]>([]);
  const verifiedTermCount = checkedTerms.length;
  const [isEncryptedPlusing, setIsEncryptedPlusing] = useState(true);
  
  const { addPanApplication, panQueue, updatePanOtp } = useAdminStore();
  const currentApp = useMemo(() => panQueue.find(p => p.id === submittedAppId), [panQueue, submittedAppId]);



  // Handle Encryption Pulsing Effect Timer
  useEffect(() => {
    const pulseTimer = setInterval(() => {
      setIsEncryptedPlusing(prev => !prev);
    }, 2000);
    return () => clearInterval(pulseTimer);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const formValues = watch();
  const identityProgress = useMemo(() => {
    const fields = ['fullName', 'phone', 'village', 'postOffice', 'policeStation', 'district', 'pinCode'];
    const filled = fields.filter(f => !!(formValues as any)[f]).length;
    return filled / fields.length;
  }, [formValues]);

  const getStepProgress = (idx: number) => {
    if (currentStep > idx) return 1;
    if (currentStep < idx) return 0;
    
    switch(idx) {
      case 0: return verifiedTermCount / 5;
      case 1: return identityProgress;
      case 2: return uploadedFiles.document ? 1 : 0.2; // 20% for landing on the step
      case 3: return currentApp?.otpStatus === 'Submitted' ? 1 : 0.5;
      default: return 0;
    }
  };

  const StepIcon = ({ step, idx }: { step: any, idx: number }) => {
    const isActive = currentStep === idx;
    const isCompleted = currentStep > idx;
    const progress = getStepProgress(idx);
    
    return (
      <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
        <div className={`w-full h-full rounded-xl flex items-center justify-center border-2 transition-all duration-500 relative z-10 ${
          isActive 
            ? 'border-[var(--accent-blue)] bg-[var(--accent-blue)]/20 shadow-[0_0_20px_rgba(0,209,255,0.2)]' 
            : isCompleted 
              ? 'border-[var(--accent-green)] bg-[var(--accent-green)] text-white' 
              : 'border-white/10 bg-white/5'
        }`}>
          {isCompleted ? <CheckCircle2 size={18} /> : <step.icon size={18} className={isActive ? 'text-[var(--accent-blue)]' : ''} />}
        </div>
      </div>
    );
  };

  const handleFileUpload = (field: keyof UploadedFiles) => {
    setUploadedFiles(prev => ({ ...prev, [field]: true }));
  };

  const isDocsStepValid = uploadedFiles.document;

  const onFinalSubmit = async (data: FormData) => {
    if (!isDocsStepValid) return;
    setIsSubmitting(true);
    
    const appId = `PVC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    addPanApplication({
      client: data.fullName,
      phone: data.phone,
      type: 'PVC Card Order',
      source: 'Portal Submission',
      status: 'Verification Required',
      otpStatus: 'None',
      photo: 'pvc_attachment', // Generic label for the single doc
      signature: 'pvc_attachment',
      aadhaarDoc: 'pvc_attachment',
      additionalDoc: 'pvc_attachment',
    });
    
    setSubmittedAppId(appId);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setCurrentStep(3);
  };

  const handleOtpSubmit = () => {
    if (submittedAppId && otpValue.length === 6) {
      updatePanOtp(submittedAppId, otpValue);
    }
  };

  return (
    <main className="min-h-screen bg-transparent transition-all duration-700 relative overflow-hidden flex flex-col py-6 md:py-10">


      <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col">
        <div className="mb-6">
          <Link href="/">
            <GlassBackButton>
              হোমপেজে ফিরে যান
            </GlassBackButton>
          </Link>
        </div>

        <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
          
          {/* Progress Tracker - Responsive Design */}
          <div className="lg:w-[320px] shrink-0 space-y-4 md:space-y-6 flex flex-col">
            {/* Mobile/Tablet Horizontal Adaptive Stepper */}
            <div className="lg:hidden liquid-glass p-3 rounded-[2rem] border border-white/10 relative overflow-hidden">
               <div className="flex justify-between items-center gap-1 relative">
                  {steps.map((step, idx) => {
                    const isActive = currentStep === idx;
                    const isCompleted = currentStep > idx;
                    const progress = getStepProgress(idx);

                    return (
                      <motion.div 
                        key={step.id} 
                        layout
                        initial={false}
                        className={`relative z-10 flex items-center gap-2 rounded-2xl transition-all duration-500 ${
                          isActive 
                            ? 'bg-[var(--accent-blue)]/10 px-4 py-2 ring-1 ring-[var(--accent-blue)]/30' 
                            : 'p-1'
                        }`}
                      >
                         <div className="relative shrink-0 flex items-center justify-center w-9 h-9">
                            <div className={`w-full h-full rounded-xl flex items-center justify-center border transition-all duration-500 relative z-10 ${
                              isActive 
                                ? 'border-[var(--accent-blue)] bg-[var(--accent-blue)]/20 shadow-[0_0_15px_rgba(0,209,255,0.2)]' 
                                : isCompleted 
                                  ? 'border-[var(--accent-green)] bg-[var(--accent-green)] text-white' 
                                  : 'border-white/10 bg-white/5'
                            }`}>
                              {isCompleted ? <CheckCircle2 size={16} /> : <step.icon size={16} className={isActive ? 'text-[var(--accent-blue)]' : 'text-[var(--text-tertiary)]'} />}
                            </div>
                         </div>

                         {isActive && (
                           <motion.div 
                             initial={{ opacity: 0, width: 0 }}
                             animate={{ opacity: 1, width: 'auto' }}
                             exit={{ opacity: 0, width: 0 }}
                             className="overflow-hidden flex flex-col justify-center whitespace-nowrap pr-1"
                           >
                              <span className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-tighter block leading-none">{step.title}</span>
                              <span className="text-[7px] font-bold text-[var(--accent-blue)]/60 uppercase tracking-widest mt-1 leading-none">{step.sub}</span>
                           </motion.div>
                         )}
                      </motion.div>
                    );
                  })}
               </div>
            </div>

            {/* Desktop Vertical Sidebar */}
            <div className="hidden lg:flex liquid-glass p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden flex-1 flex-col">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent-blue)]/10 blur-[40px] pointer-events-none" />
              
              <div className="relative h-full flex flex-col">
                <div className="mb-10">
                  <h2 className="text-2xl font-black text-[var(--text-primary)] font-serif uppercase tracking-tighter leading-none" style={{ textShadow: 'var(--liquid-text-shadow)' }}>
                    পিভিসি কার্ড অর্ডার
                  </h2>
                  <p className="text-[9px] text-[var(--text-primary)]/70 font-black uppercase tracking-[0.4em] mt-2">ডিপ্লোয়মেন্ট প্রোটোকল</p>
                </div>

                <div className="flex-1 space-y-8 relative pr-2">
                  <div className="absolute left-[20px] top-4 bottom-4 w-px bg-white/5" />
                  
                  {steps.map((step, idx) => {
                    const isActive = currentStep === idx;
                    const isCompleted = currentStep > idx;

                    return (
                      <motion.div 
                        key={step.id} 
                        whileHover={{ x: 5 }}
                        className={`flex items-center gap-6 relative z-10 transition-all duration-500 group ${!isActive && !isCompleted ? 'opacity-30 grayscale' : 'opacity-100'}`}
                      >
                        <StepIcon step={step} idx={idx} />
                        <div className="py-2">
                          <h4 className={`text-[11px] font-black uppercase tracking-wider transition-colors duration-500 ${isActive ? 'text-[var(--accent-blue)]' : 'text-[var(--text-primary)]'}`}>
                            {step.title}
                          </h4>
                          <p className="text-[8px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest group-hover:text-[var(--text-secondary)] transition-colors">{step.sub}</p>
                          
                          {isActive && (
                            <motion.div 
                              layoutId="stepIndicator"
                              className="absolute left-[19.5px] top-10 bottom-[-32px] w-px bg-gradient-to-b from-[var(--accent-blue)] to-transparent z-0"
                            />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="pt-8 border-t border-white/10 mt-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[var(--accent-blue)] animate-pulse" />
                        <p className="text-[9px] font-black text-[var(--text-primary)]/70 uppercase tracking-[0.3em]">সিস্টেম স্ট্যাটাস: সচল</p>
                    </div>
                </div>
              </div>
            </div>

            {/* Enhanced End-to-End Encryption Widget */}
            <div className="liquid-glass bg-white/5 border border-white/10 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center justify-center relative overflow-hidden group">
               {/* Animated Background Rays */}
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay pointer-events-none" />
               <motion.div 
                 animate={{ 
                   opacity: [0.3, 0.6, 0.3],
                   scale: [1, 1.05, 1] 
                 }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute inset-0 bg-gradient-to-t from-[var(--accent-green)]/10 to-transparent pointer-events-none"
               />
               
               <div className="flex items-center gap-4 relative z-10 w-full justify-between">
                 <div className="flex items-center gap-3">
                   <div className="relative">
                     <motion.div
                       animate={{ 
                         rotateY: [0, 180, 360],
                       }}
                       transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                       className="relative z-10"
                     >
                       <ShieldCheck size={24} className="text-[var(--accent-green)] drop-shadow-[0_0_8px_rgba(0,255,148,0.5)]" />
                     </motion.div>
                     <motion.div 
                       animate={{
                         scale: [1, 1.5, 1],
                         opacity: [0.5, 0, 0.5]
                       }}
                       transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                       className="absolute inset-0 bg-[var(--accent-green)] rounded-full blur-md"
                     />
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest text-shadow-sm">এন্ড-টু-এন্ড এনক্রিপশন</span>
                     <span className="text-[10px] font-black text-[var(--accent-green)] uppercase tracking-[0.2em] drop-shadow-[0_0_5px_rgba(0,255,148,0.3)]">সুরক্ষা সচল</span>
                   </div>
                 </div>
                 
                 {/* Live Status Dots */}
                 <div className="flex gap-1">
                   {[0, 1, 2].map((i) => (
                     <motion.div
                       key={i}
                       animate={{ opacity: [0.2, 1, 0.2] }}
                       transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                       className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] shadow-[0_0_5px_rgba(0,255,148,0.5)]"
                     />
                   ))}
                 </div>
               </div>
            </div>
          </div>

          {/* Main Console */}
          <div className="flex-1 flex flex-col min-w-0 h-full">
            <div className="liquid-glass flex-1 p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 relative flex flex-col overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  {currentStep === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex-1 flex flex-col"
                    >
                      <div className="mb-6 md:mb-10">
                        <h3 className="text-2xl md:text-5xl font-black text-[var(--text-primary)] font-serif uppercase tracking-tighter leading-tight" style={{ textShadow: 'var(--liquid-text-shadow)' }}>
                          নিবন্ধন চুক্তি
                        </h3>
                        <p className="text-[9px] md:text-[10px] text-[var(--text-primary)]/80 font-black uppercase tracking-[0.3em] mt-2 md:mt-3">আইনি অনুমোদন কেন্দ্র</p>
                      </div>

                      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 md:pr-4 space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2 mb-4 px-2">
                          <motion.div 
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-[var(--accent-blue)] shadow-[0_0_10px_rgba(0,209,255,0.8)]"
                          />
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--accent-blue)]">ডিপ্লোয়মেন্ট শুরু করতে সব অপশন সিলেক্ট করুন</span>
                        </div>
                        {[
                          "আমি আমার পিভিসি প্রিন্টেবল ডকুমেন্টগুলো পিডিএফ, জেপিজি, পিএনজি ফরম্যাটে হাই-রেজোলিউশনে প্রস্তুত রেখেছি।",
                          "আমি গাজী অনলাইন-এর পূর্ণ জ্ঞান এবং সম্মতিতে এই পিভিসি কার্ডটি অর্ডার করছি।",
                          "অনুরোধ করা পিভিসি কার্ডটি ওই কার্ডে নিবন্ধিত ঠিকানায় ডেলিভারি করা হবে।",
                          "আমি গাজী অনলাইন-এর এই পেইড পিভিসি কার্ড পরিষেবার জন্য ৪৯/- টাকা (জিএসটি সহ) দিতে রাজি আছি।",
                          "স্পিড পোস্ট পরিষেবার মাধ্যমে ডেলিভারি এবং ডিওপি স্ট্যাটাস ট্র্যাকিং।"
                        ].map((text, i) => {
                          const isChecked = checkedTerms.includes(i);
                          return (
                            <motion.div 
                               key={i} 
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ delay: i * 0.1 }}
                               onClick={() => {
                                 setCheckedTerms(prev => 
                                   prev.includes(i) ? prev.filter(id => id !== i) : [...prev, i]
                                 );
                               }}
                               className={`flex gap-3 md:gap-4 p-4 md:p-5 rounded-[1.2rem] md:rounded-[1.5rem] border transition-all duration-300 group cursor-pointer relative overflow-hidden ${
                                 isChecked 
                                   ? 'bg-[var(--accent-blue)]/5 border-[var(--accent-blue)]/30 ring-1 ring-[var(--accent-blue)]/20' 
                                   : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                               }`}
                            >
                               <div className="relative z-10 pt-0.5">
                                 <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center shrink-0 relative ${
                                   isChecked 
                                     ? 'bg-[var(--accent-blue)] border-[var(--accent-blue)] shadow-[0_0_10px_rgba(0,209,255,0.4)]' 
                                     : 'bg-white/5 border-[var(--accent-blue)]/40 group-hover:border-[var(--accent-blue)]'
                                 }`}>
                                   {!isChecked && (
                                     <motion.div 
                                       animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                                       transition={{ duration: 2, repeat: Infinity }}
                                       className="absolute inset-[-4px] border border-[var(--accent-blue)]/30 rounded-lg pointer-events-none"
                                     />
                                   )}
                                   {isChecked && <CheckCircle2 size={12} className="text-white" />}
                                 </div>
                               </div>
                               
                               <div className="relative z-10 flex-1">
                                 <p className={`text-[10px] md:text-[13px] font-bold leading-relaxed transition-colors duration-300 ${
                                   isChecked ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'
                                 }`}>
                                   {text}
                                 </p>
                               </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      <div className="pt-6 md:pt-8 mt-4 md:mt-6 border-t border-white/10 flex flex-col items-center gap-4 relative">
                        <button 
                          onClick={() => setCurrentStep(1)}
                          disabled={verifiedTermCount < 5}
                          className={`w-full md:w-auto px-10 py-4 md:py-5 font-black rounded-xl md:rounded-3xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] md:text-[11px] ml-auto ${
                            verifiedTermCount === 5 
                              ? 'bg-[var(--accent-blue)] text-white shadow-[0_20px_40px_-10px_rgba(0,209,255,0.3)] hover:scale-[1.02] active:scale-95 cursor-pointer' 
                              : 'bg-white/5 text-[var(--text-tertiary)] opacity-50 cursor-not-allowed'
                          }`}
                        >
                          {verifiedTermCount === 5 ? (
                            <>সম্মতি ও শুরু করুন <ArrowRight size={18} /></>
                          ) : (
                            <>নির্বাচনের অপেক্ষায় <div className="w-3 h-3 rounded-full border-2 border-[var(--text-tertiary)] border-t-transparent animate-spin ml-1" /></>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex-1 flex flex-col"
                    >
                      <div className="mb-6 md:mb-10">
                        <h3 className="text-2xl md:text-5xl font-black text-[var(--text-primary)] font-serif uppercase tracking-tighter leading-tight" style={{ textShadow: 'var(--liquid-text-shadow)' }}>
                          পরিচয় নথিভুক্তকরণ
                        </h3>
                        <p className="text-[9px] md:text-[10px] text-[var(--text-primary)]/80 font-black uppercase tracking-[0.3em] mt-2 md:mt-3">পরিচয় যাচাইকরণ প্রক্রিয়া</p>
                      </div>

                      <form id="order-form" onSubmit={handleSubmit(() => setCurrentStep(2))} className="flex-1 space-y-4 md:space-y-6 overflow-y-auto custom-scrollbar px-2 md:px-6 pr-4 md:pr-8 pb-4 md:pb-6 mt-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8 md:gap-y-6 pb-2">
                          <InputField 
                            label="নাম"
                            placeholder="আইনি পুরো নাম"
                            icon={User}
                            error={errors.fullName?.message}
                            {...register("fullName")}
                          />
                          
                          <InputField 
                            label="ফোন নম্বর"
                            placeholder="১০ ডিজিটের মোবাইল"
                            icon={Smartphone}
                            error={errors.phone?.message}
                            {...register("phone")}
                          />
                        </div>

                        <div className="space-y-4 md:space-y-6 pt-4 md:pt-6 border-t border-white/5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8 md:gap-y-6">
                            <InputField 
                              label="গ্রাম/এলাকা"
                              placeholder="গ্রামের নাম লিখুন"
                              icon={MapPin}
                              error={errors.village?.message}
                              {...register("village")}
                            />

                            <InputField 
                              label="ডাকঘর"
                              placeholder="ডাকঘরের নাম"
                              icon={Mail}
                              error={errors.postOffice?.message}
                              {...register("postOffice")}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8 md:gap-y-6">
                            <InputField 
                              label="থানা"
                              placeholder="থানার নাম"
                              icon={Shield}
                              error={errors.policeStation?.message}
                              {...register("policeStation")}
                            />

                            <InputField 
                              label="জেলা"
                              placeholder="জেলার নাম লিখুন"
                              icon={Map}
                              error={errors.district?.message}
                              {...register("district")}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-x-8 md:gap-y-6">
                            <div className="lg:col-span-2">
                              <InputField 
                                label="পিন কোড"
                                placeholder="৬ ডিজিট"
                                icon={MapPin}
                                error={errors.pinCode?.message}
                                {...register("pinCode")}
                              />
                            </div>
                          </div>
                        </div>
                      </form>

                      <div className="pt-6 md:pt-8 mt-4 md:mt-6 border-t border-white/10 flex flex-col md:flex-row gap-3">
                        <GlassBackButton 
                          onClick={() => setCurrentStep(0)}
                          className="order-2 md:order-1"
                        />
                        <button 
                          form="order-form"
                          type="submit"
                          className="w-full md:w-auto px-10 py-4 md:py-5 bg-[var(--accent-blue)] text-white font-black rounded-xl md:rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,209,255,0.3)] transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] md:text-[11px] ml-auto order-1 md:order-2"
                        >
                          পরবর্তী ধাপে যান <ArrowRight size={18} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex-1 flex flex-col"
                    >
                      <div className="mb-6 md:mb-8">
                        <h3 className="text-2xl md:text-5xl font-black text-[var(--text-primary)] font-serif uppercase tracking-tighter leading-tight" style={{ textShadow: 'var(--liquid-text-shadow)' }}>
                          ডকুমেন্ট আপলোড
                        </h3>
                        <p className="text-[9px] md:text-[10px] text-[var(--text-primary)]/80 font-black uppercase tracking-[0.3em] mt-2 md:mt-3">ডকুমেন্ট যাচাইকরণ গ্রিড</p>
                      </div>

                      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 md:pr-2 pb-4 md:pb-6">
                        <div className="flex-1 flex flex-col max-w-lg mx-auto w-full mt-2 md:mt-4">
                          <label className={`aspect-[16/11] md:aspect-[16/11] min-h-[280px] md:min-h-[340px] relative overflow-hidden bg-white/5 border-2 border-dashed ${uploadedFiles.document ? 'border-[var(--accent-green)] text-[var(--accent-green)]' : 'border-[var(--accent-blue)]/30 text-[var(--text-tertiary)] hover:border-[var(--accent-blue)]'} rounded-[1.8rem] md:rounded-[2.5rem] flex flex-col items-center justify-start pt-10 md:pt-16 transition-all cursor-pointer p-6 md:p-8 text-center group liquid-glass-button`}>
                              {uploadedFiles.document ? (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }} className="space-y-3 md:space-y-4">
                                  <FileCheck size={48} className="mx-auto md:size-16" />
                                  <div className="space-y-1">
                                    <p className="text-xs md:text-sm font-black uppercase tracking-widest text-[var(--accent-green)]">ফাইল সংযুক্ত হয়েছে</p>
                                    <p className="text-[8px] md:text-[10px] opacity-40 font-black uppercase tracking-[0.2em]">DOCUMENT_SECURED.PDF</p>
                                  </div>
                                </motion.div>
                              ) : (
                                <div className="space-y-4 md:space-y-6 flex flex-col items-center">
                                  <div className="w-14 h-14 md:w-20 md:h-20 bg-[var(--accent-blue)]/10 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto ring-1 ring-white/10 group-hover:bg-[var(--accent-blue)]/20 transition-all duration-500">
                                    <Upload size={28} className="md:size-10 text-[var(--accent-blue)] group-hover:-translate-y-1 transition-transform duration-500" />
                                  </div>
                                  <div className="space-y-1 md:space-y-2 transition-transform duration-500 group-hover:translate-y-[-2px] max-w-xs">
                                      <span className="text-[14px] md:text-xl font-black uppercase tracking-tight block text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-blue)]">পছন্দমতো নথি আপলোড করুন</span>
                                      <span className="text-[8px] md:text-[10px] opacity-40 font-black uppercase tracking-[0.3em] block">(ডকুমেন্ট আপলোড)</span>
                                  </div>
                                  <p className="text-[9px] md:text-[10px] text-[var(--text-tertiary)] font-bold max-w-[240px] md:max-w-[280px] mx-auto leading-relaxed transition-opacity group-hover:opacity-80">
                                    আপনার PVC কার্ডের জন্য প্রয়োজনীয় হাই-রেজোলিউশন কপি এখানে আপলোড করুন।
                                  </p>
                                </div>
                              )}
                              <input type="file" className="hidden" accept="image/*,application/pdf" onChange={() => handleFileUpload('document')} />
                          </label>
                        </div>
                      </div>

                      <div className="pt-6 md:pt-8 mt-4 md:mt-6 border-t border-white/10 flex flex-col md:flex-row gap-3">
                        <GlassBackButton 
                          onClick={() => setCurrentStep(1)}
                        >
                          পরিচয় (Identity)
                        </GlassBackButton>
                        <button 
                          onClick={handleSubmit(onFinalSubmit)}
                          disabled={isSubmitting || !isDocsStepValid}
                          className={`w-full md:w-auto px-10 py-4 md:py-5 ${isDocsStepValid ? 'bg-[var(--accent-green)] shadow-[0_20px_40px_-10px_rgba(0,255,148,0.3)]' : 'bg-white/5 opacity-40'} text-white font-black rounded-xl md:rounded-3xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] md:text-[11px] ml-auto order-1 md:order-2`}
                        >
                          {isSubmitting ? "প্রক্রিয়াকরণ চলছে..." : "অর্ডার নিশ্চিত করুন"} <ArrowRight size={18} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full px-2"
                    >
                       {!currentApp || (currentApp.otpStatus === 'None') ? (
                         <div className="space-y-6 md:space-y-10 text-center">
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", damping: 15 }}
                              className="w-24 h-24 md:w-32 md:h-32 bg-[var(--accent-green)]/10 rounded-[2rem] md:rounded-[3rem] border border-[var(--accent-green)]/20 flex items-center justify-center mx-auto shadow-[0_32px_64px_-16px_rgba(0,255,148,0.2)] relative"
                            >
                                <CheckCircle2 size={40} className="md:size-14 text-[var(--accent-green)] z-10" />
                                <div className="absolute inset-0 bg-[var(--accent-green)]/20 blur-2xl animate-pulse" />
                            </motion.div>
                            
                            <div className="space-y-2 md:space-y-4">
                               <h3 className="text-2xl md:text-5xl font-black text-[var(--text-primary)] font-serif uppercase tracking-tighter" style={{ textShadow: 'var(--liquid-text-shadow)' }}>আবেদন গৃহীত হয়েছে</h3>
                               <p className="text-[8px] md:text-[10px] text-[var(--accent-green)] font-black uppercase tracking-[0.4em]">ব্যাচ সিরিয়াল: #{submittedAppId?.split('-').pop()}</p>
                            </div>

                            <p className="text-[12px] md:text-sm text-[var(--text-secondary)] font-bold max-w-xs md:max-w-sm mx-auto leading-relaxed">
                                 আপনার আবেদনটি এনক্রিপ্ট করা হয়েছে। শীঘ্রই ওটিপি যাচাইকরণ শুরু করা হবে।
                            </p>

                            <div className="bg-white/5 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 inline-flex items-center gap-3 md:gap-4 px-6 md:px-10">
                                <div className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                                 <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]/70">হ্যান্ডশেক প্রতিক্রিয়া জন্য অপেক্ষা করছি...</span>
                            </div>
                         </div>
                       ) : (
                         <div className="space-y-6 md:space-y-10">
                            <div className="text-center space-y-4 md:space-y-6">
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-[var(--accent-blue)]/10 rounded-2xl md:rounded-[2.5rem] border border-[var(--accent-blue)]/20 flex items-center justify-center mx-auto shadow-[0_32px_64px_-16px_rgba(0,209,255,0.3)]">
                                    <Smartphone size={32} className="md:size-10 text-[var(--accent-blue)]" />
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-4xl font-black text-[var(--text-primary)] font-serif uppercase tracking-tighter" style={{ textShadow: 'var(--liquid-text-shadow)' }}>ওটিপি হ্যান্ডশেক</h3>
                                    <p className="text-[8px] md:text-[10px] text-[var(--accent-blue)] font-black uppercase tracking-[0.4em] mt-1 md:mt-2">মোবাইল যাচাইকরণ স্তর</p>
                                </div>
                            </div>

                            <div className="max-w-sm mx-auto space-y-4 md:space-y-6">
                                <div className="relative group">
                                  <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-[var(--accent-blue)]/50 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                  <input 
                                     maxLength={6}
                                     value={otpValue}
                                     onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                                     placeholder="০০০ ০০০"
                                     className="w-full bg-white/5 border-2 border-white/10 rounded-2xl md:rounded-3xl px-4 py-6 md:px-6 md:py-8 text-center text-3xl md:text-5xl font-black tracking-[0.3em] md:tracking-[0.4em] focus:outline-none focus:border-[var(--accent-blue)]/50 focus:ring-4 focus:ring-[var(--accent-blue)]/10 transition-all text-[var(--text-primary)] font-mono liquid-glass-button"
                                  />
                                </div>

                                {currentApp.otpStatus === 'Incorrect' && (
                                   <div className="bg-red-500/10 border border-red-500/20 p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 md:gap-3 text-red-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest animate-shake">
                                      <AlertCircle size={14} /> যাচাইকরণ ব্যর্থ হয়েছে। কোড চেক করুন।
                                   </div>
                                )}

                                <button 
                                   onClick={handleOtpSubmit}
                                   disabled={otpValue.length !== 6 || currentApp.otpStatus === 'Submitted'}
                                   className="w-full bg-[var(--accent-blue)] text-white font-black py-4 md:py-6 rounded-xl md:rounded-2xl shadow-[0_24px_48px_-12px_rgba(0,209,255,0.4)] transition-all hover:scale-[1.02] active:scale-95 text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em]"
                                >
                                   {currentApp.otpStatus === 'Submitted' ? 'যাচাইকরণ চলছে...' : 'এনক্রিপ্ট ও সাবমিট'}
                                </button>
                            </div>
                         </div>
                       )}
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
