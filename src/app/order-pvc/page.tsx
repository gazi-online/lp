"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  FileCheck,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  User,
  RotateCcw,
} from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useAdminStore } from "@/lib/store/useAdminStore";
import GlassBackButton from "@/components/GlassBackButton";
import AadhaarCard from "@/components/AadhaarCard";

// ─── Card Type Config ────────────────────────────────────────────────────────

type CardType = "aadhaar" | "pan" | "rc" | "dl" | "id";

const CARD_TYPES: { 
  value: CardType; 
  label: string; 
  labelBn: string; 
  frontPath: string;
  backPath: string;
  accentColor: string; 
}[] = [
  { value: "aadhaar", label: "Aadhaar PVC Card", labelBn: "আধার পিভিসি কার্ড",  frontPath: "/images/templates/aadhar_front.png",  backPath: "/images/templates/aadhar_back.png",  accentColor: "#FF6B35" },
  { value: "pan",     label: "PAN PVC Card",     labelBn: "প্যান পিভিসি কার্ড",  frontPath: "/images/templates/pan_front.png",    backPath: "/images/templates/pan_back.png",    accentColor: "#38ef7d" },
  { value: "rc",      label: "Ration PVC Card",  labelBn: "ডিজিটাল রেশন কার্ড", frontPath: "/images/templates/rason_front.png",   backPath: "/images/templates/rason_back.png",   accentColor: "#3b82f6" },
  { value: "dl",      label: "DL PVC Card",      labelBn: "ড্রাইভিং লাইসেন্স",  frontPath: "/images/templates/dl_front.png",     backPath: "/images/templates/dl_back.png",     accentColor: "#71b280" },
  { value: "id",      label: "ID Card",          labelBn: "আইডি কার্ড",         frontPath: "/images/templates/id_card.png",      backPath: "/images/templates/id_back.png",     accentColor: "#0b8793" },
];

const CARD_TYPE_LABELS: Record<CardType, string> = {
  aadhaar: "আধার কার্ড",
  pan:     "প্যান কার্ড",
  rc:      "রেশন কার্ড",
  dl:      "ড্রাইভিং লাইসেন্স",
  id:      "আইডি কার্ড",
};

const CARD_TYPE_NUMBERS: Record<CardType, string> = {
  aadhaar: "XXXX XXXX XXXX",
  pan:     "XXXXX XXXX X",
  rc:      "SPHH 1234567890",
  dl:      "DL-XXXXXXXXXX",
  id:      "ID-XXXXXXXX",
};

// ─── Utils ──────────────────────────────────────────────────────────────────

const autoFontSize = (text: string) => {
  if (!text) return "12px";
  if (text.length > 25) return "9px";
  if (text.length > 20) return "10px";
  if (text.length > 15) return "11px";
  return "12px";
};

// ─── Steps ───────────────────────────────────────────────────────────────────

const steps = [
  { id: "terms",  title: "শর্তাবলী",      icon: ShieldCheck, sub: "নিবন্ধন চুক্তি" },
  { id: "order",  title: "অর্ডার বিবরণ",  icon: CreditCard,  sub: "লাইভ প্রিভিউ"    },
  { id: "verify", title: "যাচাইকরণ",      icon: Smartphone,  sub: "সুরক্ষা প্রোটোকল" },
];

// ─── PVC Card Preview Component ──────────────────────────────────────────────

function PvcCardPreview({
  name,
  cardType,
  photoUrl,
}: {
  name: string;
  cardType: CardType;
  photoUrl: string | null;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const config = CARD_TYPES.find((c) => c.value === cardType)!;

  const displayName = name || "Rajesh Kumar";
  // When card type changes, reset to front
  useEffect(() => { setIsFlipped(false); }, [cardType]);

  const currentImg = isFlipped ? config.backPath : config.frontPath;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Flip Toggle */}
      <button
        onClick={() => setIsFlipped((p) => !p)}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--text-tertiary)] hover:text-[var(--accent-blue)] transition-all px-3 py-1.5 rounded-full border border-white/10 hover:border-[var(--accent-blue)]/30 bg-white/5 active:scale-95"
      >
        <RotateCcw size={11} className={isFlipped ? "rotate-180 transition-transform duration-500" : "transition-transform duration-500"} />
        {isFlipped ? "Show Front" : "Show Back"}
      </button>

      {/* Card — simple image swap */}
      <div className="relative select-none w-full max-w-[360px]" style={{ aspectRatio: "1.586 / 1" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImg}
            initial={{ opacity: 0, rotateY: isFlipped ? -90 : 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 rounded-[1.4rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)] ring-1 ring-white/10 cursor-pointer"
            onClick={() => setIsFlipped((p) => !p)}
          >
            <img
              src={currentImg}
              alt={isFlipped ? "Card Back" : "Card Front"}
              className="w-full h-full object-contain"
              style={{ background: "#f5f5f5" }}
            />
            {/* Shimmer */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: "linear-gradient(135deg, white 0%, transparent 50%, white 100%)" }} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Badge */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: config.accentColor }} />
        <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-tertiary)]">
          {isFlipped ? "ব্যাক সাইড" : "ফ্রন্ট সাইড"} • {config.labelBn}
        </span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function OrderPvcPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);
  const [otpValue, setOtpValue] = useState("");

  // Terms
  const [checkedTerms, setCheckedTerms] = useState<number[]>([]);
  const verifiedTermCount = checkedTerms.length;

  // Order form state (live preview state)
  const [cardName,   setCardName]   = useState("");
  const [cardType,   setCardType]   = useState<CardType>("aadhaar");

  const [photoUrl,   setPhotoUrl]   = useState<string | null>(null);
  const [docUploaded, setDocUploaded] = useState(false);

  const photoInputRef = useRef<HTMLInputElement>(null);

  const { addPanApplication, panQueue, updatePanOtp } = useAdminStore();
  const currentApp = useMemo(
    () => panQueue.find((p) => p.id === submittedAppId),
    [panQueue, submittedAppId]
  );

  // Photo preview handler
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
  };


  const onFinalSubmit = async () => {
    setIsSubmitting(true);
    const appId = `PVC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    addPanApplication({
      client: cardName || "Walk-in Customer",
      phone: "0000000000",
      type: `PVC Card – ${CARD_TYPE_LABELS[cardType]}`,
      source: "Portal Submission",
      status: "Verification Required",
      otpStatus: "None",
      photo: "pvc_attachment",
      signature: "pvc_attachment",
      aadhaarDoc: "pvc_attachment",
      additionalDoc: "pvc_attachment",
    });
    setSubmittedAppId(appId);
    await new Promise((r) => setTimeout(r, 2000));
    setIsSubmitting(false);
    setCurrentStep(2);
  };

  const handleOtpSubmit = () => {
    if (submittedAppId && otpValue.length === 6) {
      updatePanOtp(submittedAppId, otpValue);
    }
  };

  // ── StepIcon ────────────────────────────────────────────────────────────────
  const StepIcon = ({ step, idx }: { step: (typeof steps)[0]; idx: number }) => {
    const isActive    = currentStep === idx;
    const isCompleted = currentStep > idx;
    return (
      <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
        <div className={`w-full h-full rounded-xl flex items-center justify-center border-2 transition-all duration-500 relative z-10 ${
          isActive    ? "border-[var(--accent-blue)] bg-[var(--accent-blue)]/20 shadow-[0_0_20px_rgba(0,209,255,0.2)]"
          : isCompleted ? "border-[var(--accent-green)] bg-[var(--accent-green)] text-white"
          : "border-white/10 bg-white/5"
        }`}>
          {isCompleted ? <CheckCircle2 size={18} /> : <step.icon size={18} className={isActive ? "text-[var(--accent-blue)]" : ""} />}
        </div>
      </div>
    );
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-transparent transition-all duration-700 relative overflow-hidden flex flex-col py-6 md:py-10">
      <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col">
        <div className="mb-6">
          <Link href="/">
            <GlassBackButton>হোমপেজে ফিরে যান</GlassBackButton>
          </Link>
        </div>

        <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col lg:flex-row gap-8 min-h-0">

          {/* ── Left Sidebar: Progress ── */}
          <div className="lg:w-[280px] shrink-0 space-y-4 md:space-y-6 flex flex-col">
            {/* Mobile Stepper */}
            <div className="lg:hidden liquid-glass p-4 rounded-[2rem] border border-white/10 relative overflow-hidden">
              <div className="flex justify-between items-center gap-2 relative">
                {steps.map((step, idx) => {
                  const isActive    = currentStep === idx;
                  const isCompleted = currentStep > idx;
                  return (
                    <motion.div key={step.id} layout initial={false}
                      className={`relative z-10 flex items-center transition-all duration-500 ${isActive ? "bg-[var(--accent-blue)]/10 px-4 py-2.5 rounded-2xl ring-1 ring-[var(--accent-blue)]/30 gap-2.5" : "p-1"}`}
                    >
                      <div className={`relative shrink-0 flex items-center justify-center w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                        isActive ? "border-[var(--accent-blue)] bg-[var(--accent-blue)]/20" : isCompleted ? "border-[var(--accent-green)] bg-[var(--accent-green)] text-white" : "border-white/10 bg-white/5"
                      }`}>
                        {isCompleted ? <CheckCircle2 size={17} /> : <step.icon size={17} className={isActive ? "text-[var(--accent-blue)]" : "text-[var(--text-tertiary)]"} />}
                      </div>
                      {isActive && (
                        <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }}
                          className="overflow-hidden flex flex-col justify-center whitespace-nowrap pr-1"
                        >
                          <span className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-tighter block leading-none">{step.title}</span>
                          <span className="text-[7px] font-bold text-[var(--accent-blue)]/70 uppercase tracking-widest mt-1.5 leading-none">{step.sub}</span>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex liquid-glass p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden flex-1 flex-col">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent-blue)]/10 blur-[40px] pointer-events-none" />
              <div className="relative h-full flex flex-col">
                <div className="mb-10">
                  <h2 className="text-2xl font-black text-[var(--text-primary)] font-serif uppercase tracking-tighter leading-none" style={{ textShadow: "var(--liquid-text-shadow)" }}>
                    পিভিসি কার্ড অর্ডার
                  </h2>
                </div>
                <div className="flex-1 space-y-8 relative pr-2">
                  <div className="absolute left-[20px] top-4 bottom-4 w-px bg-white/5" />
                  {steps.map((step, idx) => {
                    const isActive    = currentStep === idx;
                    const isCompleted = currentStep > idx;
                    return (
                      <motion.div key={step.id} whileHover={{ x: 5 }}
                        className={`flex items-center gap-6 relative z-10 transition-all duration-500 group ${!isActive && !isCompleted ? "opacity-30 grayscale" : "opacity-100"}`}
                      >
                        <StepIcon step={step} idx={idx} />
                        <div className="py-2">
                          <h4 className={`text-[11px] font-black uppercase tracking-wider transition-colors duration-500 ${isActive ? "text-[var(--accent-blue)]" : "text-[var(--text-primary)]"}`}>
                            {step.title}
                          </h4>
                          <p className="text-[8px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest group-hover:text-[var(--text-secondary)] transition-colors">{step.sub}</p>
                          {isActive && (
                            <motion.div layoutId="stepIndicator"
                              className="absolute left-[19.5px] top-10 bottom-[-32px] w-px bg-gradient-to-b from-[var(--accent-blue)] to-transparent z-0"
                            />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── Main Console ── */}
          <div className="flex-1 flex flex-col min-w-0 h-full">
            <div className="liquid-glass flex-1 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 relative flex flex-col overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

              <AnimatePresence mode="wait">

                {/* ═══ STEP 0 – Terms ═══ */}
                {currentStep === 0 && (
                  <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
                    <div className="mb-6 md:mb-10">
                      <h3 className="text-2xl md:text-5xl font-black text-[var(--text-primary)] font-serif uppercase tracking-tighter leading-tight" style={{ textShadow: "var(--liquid-text-shadow)" }}>
                        নিবন্ধন চুক্তি
                      </h3>
                      <p className="text-[9px] md:text-[10px] text-[var(--text-primary)]/80 font-black uppercase tracking-[0.3em] mt-2 md:mt-3">আইনি অনুমোদন কেন্দ্র</p>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 md:pr-4 space-y-3 md:space-y-4">
                      <div className="flex items-center gap-2 mb-4 px-2">
                        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-[var(--accent-blue)] shadow-[0_0_10px_rgba(0,209,255,0.8)]" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--accent-blue)]">সব শর্ত সিলেক্ট করুন তারপর পরবর্তী ধাপে যান</span>
                      </div>
                      {[
                        "আমি আমার পিভিসি প্রিন্টেবল ডকুমেন্টগুলো পিডিএফ, জেপিজি, পিএনজি ফরম্যাটে হাই-রেজোলিউশনে প্রস্তুত রেখেছি।",
                        "আমি গাজী অনলাইন-এর পূর্ণ জ্ঞান এবং সম্মতিতে এই পিভিসি কার্ডটি অর্ডার করছি।",
                        "অনুরোধ করা পিভিসি কার্ডটি ওই কার্ডে নিবন্ধিত ঠিকানায় ডেলিভারি করা হবে।",
                        "আমি গাজী অনলাইন-এর এই পেইড পিভিসি কার্ড পরিষেবার জন্য ৪৯/- টাকা (জিএসটি সহ) দিতে রাজি আছি।",
                        "স্পিড পোস্ট পরিষেবার মাধ্যমে ডেলিভারি এবং ডিওপি স্ট্যাটাস ট্র্যাকিং।",
                      ].map((text, i) => {
                        const isChecked = checkedTerms.includes(i);
                        return (
                          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                            onClick={() => setCheckedTerms((prev) => prev.includes(i) ? prev.filter((id) => id !== i) : [...prev, i])}
                            className={`flex gap-3 md:gap-4 p-4 md:p-5 rounded-[1.2rem] md:rounded-[1.5rem] border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                              isChecked ? "bg-[var(--accent-blue)]/5 border-[var(--accent-blue)]/30 ring-1 ring-[var(--accent-blue)]/20" : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
                            }`}
                          >
                            <div className="pt-0.5">
                              <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center shrink-0 relative ${
                                isChecked ? "bg-[var(--accent-blue)] border-[var(--accent-blue)] shadow-[0_0_10px_rgba(0,209,255,0.4)]" : "bg-white/5 border-[var(--accent-blue)]/40 hover:border-[var(--accent-blue)]"
                              }`}>
                                {!isChecked && (
                                  <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }} transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-[-4px] border border-[var(--accent-blue)]/30 rounded-lg pointer-events-none" />
                                )}
                                {isChecked && <CheckCircle2 size={12} className="text-white" />}
                              </div>
                            </div>
                            <p className={`text-[10px] md:text-[13px] font-bold leading-relaxed transition-colors duration-300 ${isChecked ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)]"}`}>
                              {text}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="pt-6 md:pt-8 mt-4 md:mt-6 border-t border-white/10 flex justify-end">
                      <button
                        onClick={() => setCurrentStep(1)}
                        disabled={verifiedTermCount < 5}
                        className={`px-10 py-4 md:py-5 font-black rounded-xl md:rounded-3xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] md:text-[11px] ${
                          verifiedTermCount === 5
                            ? "bg-[var(--accent-blue)] text-white shadow-[0_20px_40px_-10px_rgba(0,209,255,0.3)] hover:scale-[1.02] active:scale-95 cursor-pointer"
                            : "bg-white/5 text-[var(--text-tertiary)] opacity-50 cursor-not-allowed"
                        }`}
                      >
                        {verifiedTermCount === 5
                          ? <><span>সম্মতি ও শুরু করুন</span><ArrowRight size={18} /></>
                          : <><span>নির্বাচনের অপেক্ষায়</span><div className="w-3 h-3 rounded-full border-2 border-[var(--text-tertiary)] border-t-transparent animate-spin" /></>
                        }
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ═══ STEP 1 – Order Form + Live Preview ═══ */}
                {currentStep === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
                    <div className="mb-6 md:mb-8">
                      <h3 className="text-2xl md:text-4xl font-black text-[var(--text-primary)] font-serif uppercase tracking-tighter leading-tight" style={{ textShadow: "var(--liquid-text-shadow)" }}>
                        অর্ডার বিবরণ
                      </h3>
                      <p className="text-[9px] md:text-[10px] text-[var(--text-primary)]/80 font-black uppercase tracking-[0.3em] mt-2">লাইভ কার্ড প্রিভিউ সিস্টেম</p>
                    </div>

                    {/* ── Split Layout: Form (left) | Preview (right) ── */}
                    <div className="flex-1 flex flex-col-reverse md:flex-row gap-6 md:gap-8 overflow-y-auto custom-scrollbar">

                      {/* LEFT – Form Fields */}
                      <div className="md:flex-1 space-y-4 md:space-y-5 min-w-0">

                        {/* Card Type */}
                        <div>
                          <label className="text-[11px] font-black uppercase tracking-[0.15em] text-[var(--text-primary)]/60 ml-1 mb-2 block">
                            কার্ডের ধরন
                          </label>
                          <div className="relative">
                            <select
                              value={cardType}
                              onChange={(e) => { setCardType(e.target.value as CardType); }}
                              className="w-full h-14 px-4 pr-10 rounded-2xl border-2 border-white/10 bg-white/5 text-[var(--text-primary)] font-bold text-sm focus:outline-none focus:border-[var(--accent-blue)]/50 focus:ring-4 focus:ring-[var(--accent-blue)]/10 transition-all appearance-none cursor-pointer hover:border-white/20"
                            >
                              {CARD_TYPES.map((ct) => (
                                <option key={ct.value} value={ct.value}>{ct.label} — {ct.labelBn}</option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Name */}
                        <div>
                          <label className="text-[11px] font-black uppercase tracking-[0.15em] text-[var(--text-primary)]/60 ml-1 mb-2 block">
                            কার্ডে নাম
                          </label>
                          <input
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="আপনার নাম লিখুন…"
                            className="w-full h-14 px-4 rounded-2xl border-2 border-white/10 bg-white/5 text-[var(--text-primary)] font-bold text-sm placeholder:text-[var(--text-tertiary)] placeholder:font-normal focus:outline-none focus:border-[var(--accent-blue)]/50 focus:ring-4 focus:ring-[var(--accent-blue)]/10 transition-all hover:border-white/20"
                          />
                        </div>

                         {/* Photo Upload */}
                         <div>
                          <label className="text-[11px] font-black uppercase tracking-[0.15em] text-[var(--text-primary)]/60 ml-1 mb-2 block">
                            ছবি আপলোড (ঐচ্ছিক)
                          </label>
                          <label className={`flex items-center gap-4 h-14 px-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            photoUrl ? "border-[var(--accent-green)]/50 bg-[var(--accent-green)]/5" : "border-dashed border-white/10 bg-white/5 hover:border-[var(--accent-blue)]/50 hover:bg-[var(--accent-blue)]/5"
                          }`}>
                            {photoUrl ? (
                              <>
                                <img src={photoUrl} alt="preview" className="w-8 h-8 rounded-lg object-cover ring-2 ring-[var(--accent-green)]/30" />
                                <span className="text-[11px] font-black uppercase tracking-wider text-[var(--accent-green)]">ছবি সংযুক্ত হয়েছে ✓</span>
                                <button type="button" onClick={(e) => { e.preventDefault(); setPhotoUrl(null); }} className="ml-auto text-[9px] font-black uppercase text-[var(--text-tertiary)] hover:text-red-500 transition-colors tracking-wider">মুছুন</button>
                              </>
                            ) : (
                              <>
                                <div className="w-8 h-8 rounded-lg bg-[var(--accent-blue)]/10 flex items-center justify-center shrink-0">
                                  <Upload size={16} className="text-[var(--accent-blue)]" />
                                </div>
                                <span className="text-[11px] font-bold text-[var(--text-tertiary)]">ছবি বেছে নিন (JPG, PNG)</span>
                              </>
                            )}
                            <input ref={photoInputRef} type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                          </label>
                        </div>

                        {/* Document Upload (required) */}
                        <div>
                          <label className="text-[11px] font-black uppercase tracking-[0.15em] text-[var(--text-primary)]/60 ml-1 mb-2 block">
                            ডকুমেন্ট আপলোড <span className="text-red-500">*</span>
                          </label>
                          <label className={`flex items-center gap-4 h-14 px-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            docUploaded ? "border-[var(--accent-green)]/50 bg-[var(--accent-green)]/5" : "border-dashed border-white/10 bg-white/5 hover:border-[var(--accent-blue)]/50 hover:bg-[var(--accent-blue)]/5"
                          }`}>
                            {docUploaded ? (
                              <>
                                <div className="w-8 h-8 rounded-lg bg-[var(--accent-green)]/10 flex items-center justify-center shrink-0">
                                  <FileCheck size={16} className="text-[var(--accent-green)]" />
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-wider text-[var(--accent-green)]">ডকুমেন্ট সংযুক্ত হয়েছে ✓</span>
                              </>
                            ) : (
                              <>
                                <div className="w-8 h-8 rounded-lg bg-[var(--accent-blue)]/10 flex items-center justify-center shrink-0">
                                  <Upload size={16} className="text-[var(--accent-blue)]" />
                                </div>
                                <span className="text-[11px] font-bold text-[var(--text-tertiary)]">মূল ডকুমেন্ট আপলোড করুন (PDF, JPG)</span>
                              </>
                            )}
                            <input type="file" className="hidden" accept="image/*,application/pdf" onChange={() => setDocUploaded(true)} />
                          </label>
                        </div>
                      </div>

                      {/* RIGHT – Live Preview */}
                      <div className="md:w-auto flex items-start justify-center md:sticky md:top-0">
                        <div className="flex flex-col items-center gap-4 w-full">
                          <PvcCardPreview
                            name={cardName}
                            cardType={cardType}
                            photoUrl={photoUrl}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action row */}
                    <div className="pt-6 md:pt-8 mt-4 md:mt-6 border-t border-white/10 flex flex-col md:flex-row gap-3">
                      <GlassBackButton onClick={() => setCurrentStep(0)}>
                        শর্তাবলী (Terms)
                      </GlassBackButton>
                      <button
                        onClick={onFinalSubmit}
                        disabled={isSubmitting || !docUploaded}
                        className={`w-full md:w-auto px-10 py-4 md:py-5 ${docUploaded ? "bg-[var(--accent-green)] shadow-[0_20px_40px_-10px_rgba(0,255,148,0.3)] hover:scale-[1.02]" : "bg-white/5 opacity-40"} text-white font-black rounded-xl md:rounded-3xl transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] md:text-[11px] ml-auto`}
                      >
                        {isSubmitting ? "প্রক্রিয়াকরণ চলছে..." : "অর্ডার নিশ্চিত করুন"}
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ═══ STEP 2 – OTP Verification ═══ */}
                {currentStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full px-2"
                  >
                    {!currentApp || currentApp.otpStatus === "None" ? (
                      <div className="space-y-6 md:space-y-10 text-center">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}
                          className="w-24 h-24 md:w-32 md:h-32 bg-[var(--accent-green)]/10 rounded-[2rem] md:rounded-[3rem] border border-[var(--accent-green)]/20 flex items-center justify-center mx-auto shadow-[0_32px_64px_-16px_rgba(0,255,148,0.2)] relative"
                        >
                          <CheckCircle2 size={40} className="md:size-14 text-[var(--accent-green)] z-10" />
                          <div className="absolute inset-0 bg-[var(--accent-green)]/20 blur-2xl animate-pulse" />
                        </motion.div>
                        <div className="space-y-2 md:space-y-4">
                          <h3 className="text-2xl md:text-5xl font-black text-[var(--text-primary)] font-serif uppercase tracking-tighter" style={{ textShadow: "var(--liquid-text-shadow)" }}>আবেদন গৃহীত হয়েছে</h3>
                          <p className="text-[8px] md:text-[10px] text-[var(--accent-green)] font-black uppercase tracking-[0.4em]">ব্যাচ সিরিয়াল: #{submittedAppId?.split("-").pop()}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6 md:space-y-10">
                        <div className="text-center space-y-4 md:space-y-6">
                          <div className="w-20 h-20 md:w-24 md:h-24 bg-[var(--accent-blue)]/10 rounded-2xl md:rounded-[2.5rem] border border-[var(--accent-blue)]/20 flex items-center justify-center mx-auto shadow-[0_32px_64px_-16px_rgba(0,209,255,0.3)]">
                            <Smartphone size={32} className="md:size-10 text-[var(--accent-blue)]" />
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-4xl font-black text-[var(--text-primary)] font-serif uppercase tracking-tighter" style={{ textShadow: "var(--liquid-text-shadow)" }}>ওটিপি হ্যান্ডশেক</h3>
                            <p className="text-[8px] md:text-[10px] text-[var(--accent-blue)] font-black uppercase tracking-[0.4em] mt-1 md:mt-2">মোবাইল যাচাইকরণ স্তর</p>
                          </div>
                        </div>
                        <div className="max-w-sm mx-auto space-y-4 md:space-y-6">
                          <input
                            maxLength={6}
                            value={otpValue}
                            onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                            placeholder="০০০ ০০০"
                            className="w-full bg-white/5 border-2 border-white/10 rounded-2xl md:rounded-3xl px-4 py-6 md:px-6 md:py-8 text-center text-3xl md:text-5xl font-black tracking-[0.3em] md:tracking-[0.4em] focus:outline-none focus:border-[var(--accent-blue)]/50 focus:ring-4 focus:ring-[var(--accent-blue)]/10 transition-all text-[var(--text-primary)] font-mono"
                          />
                          {currentApp.otpStatus === "Incorrect" && (
                            <div className="bg-red-500/10 border border-red-500/20 p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 md:gap-3 text-red-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                              <AlertCircle size={14} /> যাচাইকরণ ব্যর্থ হয়েছে। কোড চেক করুন।
                            </div>
                          )}
                          <button
                            onClick={handleOtpSubmit}
                            disabled={otpValue.length !== 6 || currentApp.otpStatus === "Submitted"}
                            className="w-full bg-[var(--accent-blue)] text-white font-black py-4 md:py-6 rounded-xl md:rounded-2xl shadow-[0_24px_48px_-12px_rgba(0,209,255,0.4)] transition-all hover:scale-[1.02] active:scale-95 text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em]"
                          >
                            {currentApp.otpStatus === "Submitted" ? "যাচাইকরণ চলছে..." : "এনক্রিপ্ট ও সাবমিট"}
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

