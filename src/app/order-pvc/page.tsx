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
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useAdminStore } from "@/lib/store/useAdminStore";

const formSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  phone: z.string().regex(/^\d{10}$/, "Invalid Phone Number (10 digits required)"),
  village: z.string().min(2, "Village is required"),
  postOffice: z.string().min(2, "Post Office is required"),
  policeStation: z.string().min(2, "Police Station is required"),
  district: z.string().min(2, "District is required"),
  pinCode: z.string().regex(/^\d{6}$/, "Invalid PIN (6 digits required)"),
  email: z.string().email().optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

interface UploadedFiles {
  document: boolean;
}

const steps = [
  { id: "terms", title: "Terms of Service", icon: ShieldCheck, sub: "Legal Agreement" },
  { id: "identity", title: "Identity Info", icon: User, sub: "Personal Details" },
  { id: "assets", title: "Asset Upload", icon: Upload, sub: "Document Dispatch" },
  { id: "verify", title: "Verification", icon: Smartphone, sub: "Security Protocol" },
];

export default function OrderPvcPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);
  const [otpValue, setOtpValue] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({
    document: false,
  });

  const { addPanApplication, panQueue, updatePanOtp } = useAdminStore();
  const currentApp = useMemo(() => panQueue.find(p => p.id === submittedAppId), [panQueue, submittedAppId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

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
    <main className="min-h-screen bg-[var(--bg-primary)] transition-all duration-700 relative overflow-hidden flex flex-col py-6 md:py-10">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-gradient-to-b from-[var(--accent-blue)]/5 to-transparent pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-[var(--accent-blue)]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[30vw] h-[30vw] bg-[var(--accent-purple)]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col">
        {/* Compact Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all group mb-6"
        >
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-[var(--accent-blue)]/50">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Hub</span>
        </Link>

        <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
          
          {/* Progress Tracker - Responsive Design */}
          <div className="lg:w-[320px] shrink-0 space-y-4 md:space-y-6 flex flex-col">
            {/* Mobile/Tablet Horizontal Stepper */}
            <div className="lg:hidden liquid-glass p-6 rounded-[2rem] border border-white/10 relative overflow-hidden">
               <div className="flex justify-between items-center relative gap-2">
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-white/5 z-0" />
                  {steps.map((step, idx) => {
                    const isActive = currentStep === idx;
                    const isCompleted = currentStep > idx;
                    return (
                      <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 group">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-500 ${
                          isActive 
                            ? 'border-[var(--accent-blue)] bg-[var(--accent-blue)]/20 shadow-[0_0_15px_rgba(0,209,255,0.2)]' 
                            : isCompleted 
                              ? 'border-[var(--accent-green)] bg-[var(--accent-green)] text-white' 
                              : 'border-white/10 bg-white/5'
                        }`}>
                          {isCompleted ? <CheckCircle2 size={14} /> : <step.icon size={14} className={isActive ? 'text-[var(--accent-blue)]' : 'text-[var(--text-tertiary)]'} />}
                        </div>
                        {isActive && (
                          <motion.span 
                            layoutId="activeStep"
                            className="absolute -bottom-1 w-1 h-1 rounded-full bg-[var(--accent-blue)] shadow-[0_0_5px_var(--accent-blue)]" 
                          />
                        )}
                      </div>
                    );
                  })}
               </div>
               <div className="mt-4 text-center">
                  <p className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest">{steps[currentStep].title}</p>
               </div>
            </div>

            {/* Desktop Vertical Sidebar */}
            <div className="hidden lg:flex liquid-glass p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden flex-1 flex-col">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent-blue)]/10 blur-[40px] pointer-events-none" />
              
              <div className="relative h-full flex flex-col">
                <div className="mb-10">
                  <h2 className="text-2xl font-black text-[var(--text-primary)] font-serif uppercase tracking-tighter leading-none" style={{ textShadow: 'var(--liquid-text-shadow)' }}>
                    PVC Card Order
                  </h2>
                  <p className="text-[9px] text-[var(--text-primary)]/40 font-black uppercase tracking-[0.4em] mt-2">Deployment Protocol</p>
                </div>

                <div className="flex-1 space-y-8 relative pr-2">
                  <div className="absolute left-[20px] top-4 bottom-4 w-px bg-white/5" />
                  
                  {steps.map((step, idx) => {
                    const isActive = currentStep === idx;
                    const isCompleted = currentStep > idx;

                    return (
                      <div key={step.id} className={`flex items-start gap-6 relative z-10 transition-all duration-500 ${!isActive && !isCompleted ? 'opacity-30 grayscale' : 'opacity-100'}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-500 shrink-0 ${
                          isActive 
                            ? 'border-[var(--accent-blue)] bg-[var(--accent-blue)]/20 shadow-[0_0_20px_rgba(0,209,255,0.2)]' 
                            : isCompleted 
                              ? 'border-[var(--accent-green)] bg-[var(--accent-green)] text-white' 
                              : 'border-white/10 bg-white/5'
                        }`}>
                          {isCompleted ? <CheckCircle2 size={18} /> : <step.icon size={18} className={isActive ? 'text-[var(--accent-blue)]' : ''} />}
                        </div>
                        <div className="pt-1">
                          <h4 className={`text-[11px] font-black uppercase tracking-wider ${isActive ? 'text-[var(--accent-blue)]' : 'text-[var(--text-primary)]'}`}>
                            {step.title}
                          </h4>
                          <p className="text-[8px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest">{step.sub}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-8 border-t border-white/10 mt-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[var(--accent-blue)] animate-pulse" />
                        <p className="text-[9px] font-black text-[var(--text-primary)]/40 uppercase tracking-[0.3em]">System Identity: Live</p>
                    </div>
                </div>
              </div>
            </div>

            <div className="liquid-glass bg-white/5 border border-white/10 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-[var(--accent-green)]" />
                <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest">End-to-End Encryption</span>
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
                          Deployment Agreement
                        </h3>
                        <p className="text-[9px] md:text-[10px] text-[var(--text-primary)]/40 font-black uppercase tracking-[0.3em] mt-2 md:mt-3">Legal Clearance Hub</p>
                      </div>

                      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 md:pr-4 space-y-3 md:space-y-4">
                        {[
                          "আমি আমার PVC প্রিন্টেবল ডকুমেন্টগুলো PDF, JPG, PNG ফরম্যাটে হাই-রেজোলিউশনে প্রস্তুত রেখেছি। (I have prepared my PVC Printable Documents in High Resolution).",
                          "আমি GAZI ONLINE-এর পূর্ণ জ্ঞান এবং সম্মতিতে এই PVC কার্ডটি অর্ডার করছি। (Ordering of PVC Card is being made with full consent).",
                          "অনুরোধ করা PVC কার্ডটি ওই কার্ডে নিবন্ধিত ঠিকানায় ডেলিভারি করা হবে। (Delivery to registered address only).",
                          "আমি GAZI ONLINE-এর এই পেইড PVC কার্ড পরিষেবার জন্য ৪৯/- টাকা (GST সহ) দিতে রাজি আছি। (I agree to pay Rs 49/- incl GST).",
                          "SPEED POST পরিষেবার মাধ্যমে ডেলিভারি এবং DoP স্ট্যাটাস ট্র্যাকিং। (Delivery via Speed Post; Fully Trackable)."
                        ].map((text, i) => (
                          <div key={i} className="flex gap-3 md:gap-4 p-4 md:p-5 rounded-[1.2rem] md:rounded-[1.5rem] bg-white/5 border border-white/5 hover:border-[var(--accent-blue)]/20 transition-all group">
                             <div className="w-5 h-5 rounded-full bg-[var(--accent-blue)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent-blue)]/20 transition-colors">
                               <CheckCircle2 size={12} className="text-[var(--accent-blue)]" />
                             </div>
                             <p className={`text-[10px] md:text-sm font-bold leading-relaxed ${i === 3 ? 'text-[var(--accent-green)]' : 'text-[var(--text-secondary)]'}`}>{text}</p>
                          </div>
                        ))}
                      </div>

                      <div className="pt-6 md:pt-8 mt-4 md:mt-6 border-t border-white/10 flex">
                        <button 
                          onClick={() => setCurrentStep(1)}
                          className="w-full md:w-auto px-10 py-4 md:py-5 bg-[var(--accent-blue)] text-white font-black rounded-xl md:rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,209,255,0.3)] transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] md:text-[11px] ml-auto"
                        >
                          Accept & Initialize <ArrowRight size={18} />
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
                          Identity Enrollment
                        </h3>
                        <p className="text-[9px] md:text-[10px] text-[var(--text-primary)]/40 font-black uppercase tracking-[0.3em] mt-2 md:mt-3">Subject Identification Nodes</p>
                      </div>

                      <form id="order-form" onSubmit={handleSubmit(() => setCurrentStep(2))} className="flex-1 space-y-4 md:space-y-6 overflow-y-auto custom-scrollbar px-2 md:px-6 pr-4 md:pr-8 pb-4 md:pb-6 mt-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8 md:gap-y-6 pb-2">
                          <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-primary)]/40 ml-1">Full Identity (নাম)</label>
                            <input 
                              {...register("fullName")}
                              placeholder="Legal Full Name"
                              className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-blue)]/10 transition-all font-black text-[12px] md:text-sm liquid-glass-button box-border overflow-visible"
                            />
                            {errors.fullName && <p className="text-[9px] text-[var(--accent-saffron)] font-black uppercase tracking-widest flex items-center gap-2 mt-1"><AlertCircle size={10}/> {errors.fullName.message}</p>}
                          </div>
                          
                          <div className="space-y-2">
                             <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-primary)]/40 ml-1">Contact (ফোন নম্বর)</label>
                             <input 
                               {...register("phone")}
                               placeholder="10 digit mobile"
                               className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-blue)]/10 transition-all font-black text-[12px] md:text-sm liquid-glass-button box-border overflow-visible"
                             />
                             {errors.phone && <p className="text-[9px] text-[var(--accent-saffron)] font-black uppercase tracking-widest flex items-center gap-2 mt-1"><AlertCircle size={10}/> {errors.phone.message}</p>}
                          </div>
                        </div>

                        <div className="space-y-4 md:space-y-6 pt-4 md:pt-6 border-t border-white/5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8 md:gap-y-6">
                            <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-primary)]/40 ml-1">Village/Locality (গ্রাম)</label>
                              <input 
                                {...register("village")}
                                placeholder="Enter Village Name"
                                className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-blue)]/10 transition-all font-black text-[12px] md:text-sm liquid-glass-button box-border overflow-visible"
                              />
                              {errors.village && <p className="text-[9px] text-[var(--accent-saffron)] font-black uppercase tracking-widest flex items-center gap-2 mt-1"><AlertCircle size={10}/> {errors.village.message}</p>}
                            </div>

                            <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-primary)]/40 ml-1">Post Office (ডাকঘর)</label>
                              <input 
                                {...register("postOffice")}
                                placeholder="Post Office Name"
                                className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-blue)]/10 transition-all font-black text-[12px] md:text-sm liquid-glass-button box-border overflow-visible"
                              />
                              {errors.postOffice && <p className="text-[9px] text-[var(--accent-saffron)] font-black uppercase tracking-widest flex items-center gap-2 mt-1"><AlertCircle size={10}/> {errors.postOffice.message}</p>}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8 md:gap-y-6">
                            <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-primary)]/40 ml-1">Police Station (থানা)</label>
                              <input 
                                {...register("policeStation")}
                                placeholder="Police Station Name"
                                className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-blue)]/10 transition-all font-black text-[12px] md:text-sm liquid-glass-button box-border overflow-visible"
                              />
                              {errors.policeStation && <p className="text-[9px] text-[var(--accent-saffron)] font-black uppercase tracking-widest flex items-center gap-2 mt-1"><AlertCircle size={10}/> {errors.policeStation.message}</p>}
                            </div>

                            <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-primary)]/40 ml-1">District (জেলা)</label>
                              <input 
                                {...register("district")}
                                placeholder="Enter District"
                                className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-blue)]/10 transition-all font-black text-[12px] md:text-sm liquid-glass-button box-border overflow-visible"
                              />
                              {errors.district && <p className="text-[9px] text-[var(--accent-saffron)] font-black uppercase tracking-widest flex items-center gap-2 mt-1"><AlertCircle size={10}/> {errors.district.message}</p>}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-x-8 md:gap-y-6">
                            <div className="space-y-2 lg:col-span-2">
                               <label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-primary)]/40 ml-1">Security PIN (পিন)</label>
                               <input 
                                 {...register("pinCode")}
                                 placeholder="6 Digits"
                                 className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-blue)]/10 transition-all font-black text-[12px] md:text-sm tracking-widest liquid-glass-button box-border overflow-visible"
                               />
                               {errors.pinCode && <p className="text-[9px] text-[var(--accent-saffron)] font-black uppercase tracking-widest flex items-center gap-2 mt-1"><AlertCircle size={10}/> {errors.pinCode.message}</p>}
                            </div>
                          </div>
                        </div>
                      </form>

                      <div className="pt-6 md:pt-8 mt-4 md:mt-6 border-t border-white/10 flex flex-col md:flex-row gap-3">
                        <button 
                          onClick={() => setCurrentStep(0)}
                          className="w-full md:w-auto px-8 py-4 md:py-5 bg-white/5 text-[var(--text-primary)] font-black rounded-xl md:rounded-2xl border border-white/10 transition-all hover:bg-white/10 active:scale-95 uppercase tracking-widest text-[9px] md:text-[10px] order-2 md:order-1"
                        >
                          Back
                        </button>
                        <button 
                          form="order-form"
                          type="submit"
                          className="w-full md:w-auto px-10 py-4 md:py-5 bg-[var(--accent-blue)] text-white font-black rounded-xl md:rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,209,255,0.3)] transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] md:text-[11px] ml-auto order-1 md:order-2"
                        >
                          Proceed to Assets <ArrowRight size={18} />
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
                          Asset Dispatch
                        </h3>
                        <p className="text-[9px] md:text-[10px] text-[var(--text-primary)]/40 font-black uppercase tracking-[0.3em] mt-2 md:mt-3">Document Verification Grid</p>
                      </div>

                      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 md:pr-2 pb-4 md:pb-6">
                        <div className="flex-1 flex flex-col max-w-lg mx-auto w-full mt-2 md:mt-4">
                          <label className={`aspect-[16/11] md:aspect-[16/11] min-h-[280px] md:min-h-[340px] relative overflow-hidden bg-white/5 border-2 border-dashed ${uploadedFiles.document ? 'border-[var(--accent-green)] text-[var(--accent-green)]' : 'border-[var(--accent-blue)]/30 text-[var(--text-tertiary)] hover:border-[var(--accent-blue)]'} rounded-[1.8rem] md:rounded-[2.5rem] flex flex-col items-center justify-start pt-10 md:pt-16 transition-all cursor-pointer p-6 md:p-8 text-center group liquid-glass-button`}>
                              {uploadedFiles.document ? (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="space-y-3 md:space-y-4">
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
                                      <span className="text-[8px] md:text-[10px] opacity-40 font-black uppercase tracking-[0.3em] block">(Upload Document)</span>
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
                        <button 
                          onClick={() => setCurrentStep(1)}
                          className="w-full md:w-auto px-8 py-4 md:py-5 bg-white/5 text-[var(--text-primary)] font-black rounded-xl md:rounded-2xl border border-white/10 transition-all hover:bg-white/10 active:scale-95 uppercase tracking-widest text-[9px] md:text-[10px] order-2 md:order-1"
                        >
                          Identity
                        </button>
                        <button 
                          onClick={handleSubmit(onFinalSubmit)}
                          disabled={isSubmitting || !isDocsStepValid}
                          className={`w-full md:w-auto px-10 py-4 md:py-5 ${isDocsStepValid ? 'bg-[var(--accent-green)] shadow-[0_20px_40px_-10px_rgba(0,255,148,0.3)]' : 'bg-white/5 opacity-40'} text-white font-black rounded-xl md:rounded-3xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] md:text-[11px] ml-auto order-1 md:order-2`}
                        >
                          {isSubmitting ? "Processing Flow..." : "Finalize Order"} <ArrowRight size={18} />
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
                               <h3 className="text-2xl md:text-5xl font-black text-[var(--text-primary)] font-serif uppercase tracking-tighter" style={{ textShadow: 'var(--liquid-text-shadow)' }}>Payload Received</h3>
                               <p className="text-[8px] md:text-[10px] text-[var(--accent-green)] font-black uppercase tracking-[0.4em]">Batch Serial: #{submittedAppId?.split('-').pop()}</p>
                            </div>

                            <p className="text-[12px] md:text-sm text-[var(--text-secondary)] font-bold max-w-xs md:max-w-sm mx-auto leading-relaxed">
                                Your application has been encrypted and pooled for validation. A secure agent will initiate the OTP handshake shortly.
                            </p>

                            <div className="bg-white/5 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 inline-flex items-center gap-3 md:gap-4 px-6 md:px-10">
                                <div className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]/40">Waiting for Handshake Response...</span>
                            </div>
                         </div>
                       ) : (
                         <div className="space-y-6 md:space-y-10">
                            <div className="text-center space-y-4 md:space-y-6">
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-[var(--accent-blue)]/10 rounded-2xl md:rounded-[2.5rem] border border-[var(--accent-blue)]/20 flex items-center justify-center mx-auto shadow-[0_32px_64px_-16px_rgba(0,209,255,0.3)]">
                                    <Smartphone size={32} className="md:size-10 text-[var(--accent-blue)]" />
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-4xl font-black text-[var(--text-primary)] font-serif uppercase tracking-tighter" style={{ textShadow: 'var(--liquid-text-shadow)' }}>OTP Handshake</h3>
                                    <p className="text-[8px] md:text-[10px] text-[var(--accent-blue)] font-black uppercase tracking-[0.4em] mt-1 md:mt-2">Mobile Verification Layer</p>
                                </div>
                            </div>

                            <div className="max-w-sm mx-auto space-y-4 md:space-y-6">
                                <div className="relative group">
                                  <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-[var(--accent-blue)]/50 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                  <input 
                                     maxLength={6}
                                     value={otpValue}
                                     onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                                     placeholder="000 000"
                                     className="w-full bg-white/5 border-2 border-white/10 rounded-2xl md:rounded-3xl px-4 py-6 md:px-6 md:py-8 text-center text-3xl md:text-5xl font-black tracking-[0.3em] md:tracking-[0.4em] focus:outline-none focus:border-[var(--accent-blue)]/50 focus:ring-4 focus:ring-[var(--accent-blue)]/10 transition-all text-[var(--text-primary)] font-mono liquid-glass-button"
                                  />
                                </div>

                                {currentApp.otpStatus === 'Incorrect' && (
                                   <div className="bg-red-500/10 border border-red-500/20 p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 md:gap-3 text-red-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest animate-shake">
                                      <AlertCircle size={14} /> Verification Failed. Check Code.
                                   </div>
                                )}

                                <button 
                                   onClick={handleOtpSubmit}
                                   disabled={otpValue.length !== 6 || currentApp.otpStatus === 'Submitted'}
                                   className="w-full bg-[var(--accent-blue)] text-white font-black py-4 md:py-6 rounded-xl md:rounded-2xl shadow-[0_24px_48px_-12px_rgba(0,209,255,0.4)] transition-all hover:scale-[1.02] active:scale-95 text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em]"
                                >
                                   {currentApp.otpStatus === 'Submitted' ? 'Validating Payload...' : 'Encrypt & Submit'}
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
