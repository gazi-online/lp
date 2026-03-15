"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, CheckCircle2, AlertCircle, Smartphone, FileCheck, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAdminStore } from "@/lib/store/useAdminStore";

const formSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  aadhaarNumber: z.string().regex(/^\d{12}$/, "Invalid Aadhaar Number (12 digits required)"),
  phone: z.string().regex(/^\d{10}$/, "Invalid Phone Number (10 digits required)"),
  email: z.string().email().optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

interface UploadedFiles {
  photo: boolean;
  signature: boolean;
  aadhaarDoc: boolean;
  additionalDoc: boolean;
  annexureA: boolean;
}

export function EPanApplicationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);
  const [otpValue, setOtpValue] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({
    photo: false,
    signature: false,
    aadhaarDoc: false,
    additionalDoc: false,
    annexureA: false,
  });

  const { addPanApplication, panQueue, updatePanOtp } = useAdminStore();

  const currentApp = panQueue.find(p => p.id === submittedAppId);

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

  const isDocsStepValid = uploadedFiles.photo && uploadedFiles.signature && uploadedFiles.aadhaarDoc && uploadedFiles.additionalDoc;

  const onSubmit = async (data: FormData) => {
    if (!isDocsStepValid) return;

    setIsSubmitting(true);
    
    const appId = `PAN-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    
    addPanApplication({
      client: data.fullName,
      phone: data.phone,
      aadhaarNumber: data.aadhaarNumber,
      type: 'New e-PAN',
      source: 'Portal Submission',
      status: 'Verification Required',
      otpStatus: 'None',
      photo: 'uploaded_photo',
      signature: 'uploaded_signature',
      aadhaarDoc: 'uploaded_aadhaar',
      additionalDoc: 'uploaded_additional',
      annexureA: uploadedFiles.annexureA ? 'uploaded_annexure' : undefined,
    });
    
    setSubmittedAppId(appId); 
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setStep(3);
  };

  const handleOtpSubmit = () => {
    const app = panQueue.find(p => p.client === currentApp?.client && p.otpStatus === 'Requested');
    if (app && otpValue.length === 6) {
      updatePanOtp(app.id, otpValue);
    } else if (submittedAppId && otpValue.length === 6) {
      updatePanOtp(submittedAppId, otpValue);
    }
  };

  const closeModal = () => {
    onClose();
    setTimeout(() => {
      setStep(0);
      setSubmittedAppId(null);
      setOtpValue("");
      setUploadedFiles({
        photo: false,
        signature: false,
        aadhaarDoc: false,
        additionalDoc: false,
        annexureA: false,
      });
      reset();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[var(--bg-primary)]/80 backdrop-blur-xl transition-colors"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-2xl max-h-[85vh] liquid-glass rounded-[2rem] md:rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative transition-all flex flex-col overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 md:top-8 md:right-8 p-3 rounded-xl hover:bg-white/10 transition-colors z-20 liquid-glass-button"
            >
              <X size={20} className="text-[var(--text-primary)] transition-colors" />
            </button>

            {/* Header */}
            <div className="p-8 md:p-12 pb-0 relative">
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] transition-colors font-serif uppercase tracking-tighter leading-none" style={{ textShadow: 'var(--liquid-text-shadow)' }}>
                  ই-প্যান কার্ড আবেদন (e-PAN Application)
                </h2>
                <p className="text-[10px] text-[var(--text-primary)]/40 transition-colors font-black uppercase tracking-[0.2em]">
                  NSDL PROTOCOL // Dynamic Identity Vault
                </p>
              </div>
            </div>

            {/* Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 pt-6">
              {step === 0 && (
                <div className="space-y-6 md:space-y-10">
                  <div className="space-y-4 md:space-y-6 bg-white/5 p-5 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 relative overflow-hidden group">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-blue)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-[var(--accent-blue)]/10 flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle2 size={14} className="text-[var(--accent-blue)]" />
                      </div>
                      <p className="text-sm font-semibold text-[var(--text-secondary)] leading-relaxed">
                        আমি আমার আধার নম্বর এবং আধার-সংযুক্ত মোবাইল নম্বর প্রস্তুত রেখেছি। (I have my Aadhaar and Aadhaar-linked mobile ready).
                      </p>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-[var(--accent-blue)]/10 flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle2 size={14} className="text-[var(--accent-blue)]" />
                      </div>
                      <p className="text-sm font-semibold text-[var(--text-secondary)] leading-relaxed">
                        আমি ই-কেওয়াইসি (e-KYC) প্রক্রিয়ার মাধ্যমে আমার প্যান কার্ডের আবেদন করতে সম্মত। (I agree to apply for PAN via e-KYC process).
                      </p>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-[var(--accent-blue)]/10 flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle2 size={14} className="text-[var(--accent-blue)]" />
                      </div>
                      <p className="text-sm font-semibold text-[var(--text-secondary)] leading-relaxed">
                        আবেদনের ৩-৫ কার্যদিবসের মধ্যে ই-প্যান কার্ডটি ইমেইলে প্রদান করা হবে। (e-PAN will be delivered within 3-5 working days).
                      </p>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-[var(--accent-blue)]/10 flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle2 size={14} className="text-[var(--accent-blue)]" />
                      </div>
                      <p className="text-sm font-black text-[var(--accent-green)] leading-relaxed">
                        ই-প্যান আবেদনের জন্য মোট ১০৭/- টাকা (GST সহ) চার্জ প্রযোজ্য হবে। (Total charge Rs 107/- incl GST for e-PAN application).
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-8 pb-4">
                  <form id="application-form" onSubmit={handleSubmit(() => setStep(2))} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]/40 transition-colors ml-1">নাম (Full Name)</label>
                      <input 
                        {...register("fullName")}
                        placeholder="আপনার পূর্ণ নাম লিখুন"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]/50 transition-all font-bold text-lg liquid-glass-button"
                      />
                      {errors.fullName && <p className="text-xs text-[var(--accent-saffron)] flex items-center gap-1 transition-colors font-bold"><AlertCircle size={12}/> {errors.fullName.message}</p>}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]/40 transition-colors ml-1">আধার নম্বর (Aadhaar Number)</label>
                        <input 
                          {...register("aadhaarNumber")}
                          placeholder="XXXX XXXX XXXX"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]/50 transition-all font-bold tracking-[0.2em] text-lg liquid-glass-button"
                        />
                        {errors.aadhaarNumber && <p className="text-xs text-[var(--accent-saffron)] flex items-center gap-1 transition-colors font-bold"><AlertCircle size={12}/> {errors.aadhaarNumber.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]/40 transition-colors ml-1">ফোন নম্বর (Phone Number)</label>
                        <input 
                          {...register("phone")}
                          placeholder="১০ সংখ্যার নম্বর"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]/50 transition-all font-bold text-lg liquid-glass-button"
                        />
                        {errors.phone && <p className="text-xs text-[var(--accent-saffron)] flex items-center gap-1 transition-colors font-bold"><AlertCircle size={12}/> {errors.phone.message}</p>}
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-4xl font-serif font-black text-[var(--text-primary)] transition-colors uppercase tracking-tighter leading-none" style={{ textShadow: 'var(--liquid-text-shadow)' }}>নথি আপলোড করুন</h2>
                    <p className="text-[10px] text-[var(--text-primary)]/40 font-black transition-colors uppercase tracking-[0.2em] mt-2">ASSET DISPATCH // Required Legal Documentation</p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {(['photo', 'signature', 'aadhaarDoc', 'additionalDoc', 'annexureA'] as const).map((docId) => {
                      const labels: Record<string, string> = {
                        photo: 'আপনার ছবি',
                        signature: 'আপনার স্বাক্ষর',
                        aadhaarDoc: 'আধার কার্ড',
                        additionalDoc: 'অতিরিক্ত নথি',
                        annexureA: 'Anuxre -A'
                      };
                      const subs: Record<string, string> = {
                        photo: 'Photo',
                        signature: 'Signature',
                        aadhaarDoc: 'Your Aadhaar',
                        additionalDoc: 'Additional',
                        annexureA: 'Annexure-A'
                      };
                      const isRequired = docId !== 'annexureA';
                      
                      return (
                        <label 
                          key={docId}
                          className={`aspect-square relative overflow-hidden bg-white/5 border-2 border-dashed ${uploadedFiles[docId] ? 'border-[var(--accent-green)] text-[var(--accent-green)]' : isRequired ? 'border-[var(--accent-saffron)]/30 text-[var(--text-tertiary)] hover:border-[var(--accent-saffron)]' : 'border-white/10 text-[var(--text-tertiary)] hover:border-[var(--accent-blue)]'} rounded-[2rem] flex flex-col items-center justify-center transition-all cursor-pointer p-6 text-center group liquid-glass-button`}
                        >
                          {uploadedFiles[docId] ? <FileCheck size={40} /> : <Upload size={40} className="group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500" />}
                          <span className="text-xs font-black mt-4 border-t border-white/5 pt-3 w-full">
                            {labels[docId]} 
                            {isRequired && <span className="text-[var(--accent-saffron)] ml-1">*</span>}
                            <br/>
                            <span className="text-[9px] opacity-40 font-bold uppercase tracking-widest block mt-1">({subs[docId]})</span>
                          </span>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*,application/pdf"
                            onChange={() => handleFileUpload(docId)}
                          />
                        </label>
                      );
                    })}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={() => setStep(1)}
                      className="flex-1 bg-white/5 text-[var(--text-primary)] font-black py-5 rounded-2xl hover:bg-white/10 transition-colors border border-white/10 uppercase tracking-widest text-[10px] liquid-glass-button"
                    >
                      ফিরে যান
                    </button>
                    <button 
                      onClick={handleSubmit(onSubmit)}
                      disabled={isSubmitting || !isDocsStepValid}
                      className={`flex-[2] ${isDocsStepValid ? 'bg-[var(--accent-green)] shadow-[0_20px_40px_-10px_rgba(0,255,148,0.3)]' : 'bg-white/5 opacity-50 cursor-not-allowed border border-white/10'} text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] active:scale-95`}
                    >
                      {isSubmitting ? "প্রক্রিয়াধীন..." : "আবেদন সম্পন্ন করুন"}
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-10 py-10 overflow-hidden relative">
                   {(!currentApp) || (currentApp.otpStatus === 'None') ? (
                     <div className="flex flex-col items-center justify-center text-center space-y-6">
                        <motion.div 
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="w-32 h-32 bg-[var(--accent-green)]/10 rounded-[3rem] border border-[var(--accent-green)]/20 flex items-center justify-center shadow-[0_32px_64px_-16px_rgba(0,255,148,0.3)] relative"
                        >
                          <div className="absolute inset-0 bg-[var(--accent-green)] blur-3xl opacity-20" />
                          <CheckCircle2 size={64} className="text-[var(--accent-green)] relative z-10" />
                        </motion.div>
                        <div className="space-y-2">
                           <h2 className="text-5xl font-serif font-black text-[var(--text-primary)] uppercase tracking-tighter" style={{ textShadow: 'var(--liquid-text-shadow)' }}>আবেদন জমা হয়েছে</h2>
                           <p className="text-[10px] text-[var(--accent-green)] font-black uppercase tracking-[0.3em]">CONFIRMATION // Submission Token: #{submittedAppId?.split('-').pop()}</p>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] font-bold max-w-sm mx-auto leading-relaxed">
                          আপনার নথিগুলি যাচাই করা হচ্ছে। আমাদের অপারেটর শীঘ্রই ওটিপি (OTP) প্রোটোকল শুরু করবেন।
                        </p>
                        <div className="w-full max-w-md bg-white/5 p-6 rounded-[2rem] border border-white/10 flex items-center gap-6 liquid-glass-button">
                           <div className="relative">
                              <div className="w-4 h-4 rounded-full bg-amber-500 animate-ping absolute opacity-70" />
                              <div className="w-4 h-4 rounded-full bg-amber-400 relative border-2 border-white/20" />
                           </div>
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-primary)]/50">অপারেটর রেসপন্সের জন্য অপেক্ষা করা হচ্ছে...</span>
                        </div>
                     </div>
                   ) : (
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-10"
                     >
                        <div className="text-center space-y-4">
                           <div className="w-24 h-24 bg-[var(--accent-blue)]/10 rounded-[2.5rem] border border-[var(--accent-blue)]/20 flex items-center justify-center mx-auto shadow-[0_32px_64px_-16px_rgba(0,209,255,0.3)]">
                              <Smartphone size={48} className="text-[var(--accent-blue)]" />
                           </div>
                           <div>
                              <h2 className="text-4xl font-serif font-black text-[var(--text-primary)] uppercase tracking-tighter" style={{ textShadow: 'var(--liquid-text-shadow)' }}>ওটিপি কোড লিখুন</h2>
                              <p className="text-[10px] text-[var(--accent-blue)] font-black mt-1 uppercase tracking-[0.3em]">
                                 SECURE PAYLOAD // Enter Device Verification Code
                              </p>
                           </div>
                        </div>

                        <div className="space-y-6 max-w-sm mx-auto">
                           <div className="relative group">
                              <div className="absolute inset-0 bg-[var(--accent-blue)] blur-2xl opacity-10 group-focus-within:opacity-20 transition-opacity" />
                              <input 
                                 type="text"
                                 maxLength={6}
                                 value={otpValue}
                                 onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                                 placeholder="000000"
                                 className="w-full bg-white/5 border-2 border-white/10 rounded-3xl px-6 py-6 text-center text-5xl font-black tracking-[0.6em] focus:outline-none focus:border-[var(--accent-blue)]/50 focus:ring-4 focus:ring-[var(--accent-blue)]/10 transition-all text-[var(--text-primary)] relative z-10 liquid-glass-button"
                              />
                           </div>
                           
                           {currentApp?.otpStatus === 'Incorrect' && (
                              <motion.div 
                                 initial={{ x: -10 }}
                                 animate={{ x: 0 }}
                                 className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center justify-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-widest"
                              >
                                 <AlertCircle size={16} />
                                 আপনি ভুল ওটিপি দিয়েছেন। সঠিক ওটিপি দিন।
                              </motion.div>
                           )}

                           <button 
                              onClick={handleOtpSubmit}
                              disabled={otpValue.length !== 6 || currentApp?.otpStatus === 'Submitted'}
                              className="w-full bg-[var(--accent-blue)] text-white font-black py-5 rounded-2xl hover:opacity-90 disabled:opacity-50 transition-all shadow-[0_24px_48px_-12px_rgba(0,209,255,0.4)] uppercase tracking-widest text-xs active:scale-95"
                           >
                              {currentApp?.otpStatus === 'Submitted' ? 'যাচাই করা হচ্ছে...' : 'প্রমাণীকরণ সম্পন্ন করুন'}
                           </button>
                        </div>
                     </motion.div>
                   )}
                </div>
              )}
            </div>

            {/* Footer */}
            {(step === 0 || step === 1) && (
              <div className="p-8 md:p-12 pt-0 relative z-10 bg-gradient-to-t from-[var(--bg-primary)]/80 to-transparent">
                {step === 0 && (
                  <button 
                    onClick={() => setStep(1)}
                    className="w-full bg-[var(--accent-blue)] text-white font-black py-5 rounded-2xl hover:opacity-90 transition-all shadow-[0_20px_40px_-10px_rgba(0,209,255,0.3)] uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 active:scale-95 group"
                  >
                    Accept & Continue <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                )}
                {step === 1 && (
                  <div className="space-y-3">
                    <button 
                      form="application-form"
                      type="submit"
                      className="w-full bg-[var(--accent-blue)] text-white font-black py-5 rounded-2xl hover:opacity-90 transition-all shadow-[0_20px_40px_-10px_rgba(0,209,255,0.3)] uppercase tracking-widest text-xs flex items-center justify-center gap-3 active:scale-95"
                    >
                      পরবর্তী ধাপ (Next Step) <Smartphone size={18} />
                    </button>
                    <button 
                      type="button"
                      onClick={() => setStep(0)}
                      className="w-full text-[var(--text-secondary)] font-black py-2 rounded-2xl hover:text-[var(--text-primary)] transition-all uppercase tracking-widest text-[9px] flex items-center justify-center gap-2"
                    >
                      ফিরে যান (Back to Terms)
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
