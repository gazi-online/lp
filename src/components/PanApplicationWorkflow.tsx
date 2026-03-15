"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import { useState } from "react";
import { AadhaarVerification } from "./AadhaarVerification";


const steps = [
  {
    id: 1,
    title: "আধার যাচাই",
    description: "Aadhaar API integration, OTP input with 30s countdown",
  },
  {
    id: 2,
    title: "ফটো আপলোড",
    description: "Camera capture + crop tool, 2MB limit",
  },
  {
    id: 3,
    title: "স্বাক্ষর আপলোড",
    description: "Canvas drawing pad + file upload dual mode",
  },
  {
    id: 4,
    title: "অতিরিক্ত নথি",
    description: "Conditional fields (Marriage cert, Annexure-A)",
  },
  {
    id: 5,
    title: "ঠিকানা নিশ্চিত",
    description: "Address autocomplete, pincode validation",
  },
];

export function PanApplicationWorkflow() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <section className="container mx-auto px-4 py-20 transition-colors">
      <div className="max-w-4xl mx-auto">
        
        {/* Premium Announcement Badge */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-4 bg-[var(--card-bg)] backdrop-blur-2xl px-8 py-3 rounded-full shadow-[var(--shadow-md)] border border-[var(--card-border)] ring-1 ring-[var(--border-subtle)] transition-all">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-blue)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--accent-blue)] shadow-[var(--shadow-glow)]"></span>
            </span>
            <h3 className="text-[var(--text-primary)] font-black tracking-[0.2em] text-xs md:text-sm uppercase flex items-center gap-4 m-0 transition-colors">
              সময় বাঁচান <span className="text-[var(--text-tertiary)]">•</span> ঝামেলা মুক্ত <span className="text-[var(--text-tertiary)]">•</span> নির্ভরযোগ্য সেবা
            </h3>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[var(--text-primary)] mb-4 font-black tracking-tight font-serif transition-colors">PVC কার্ডের <span className="text-[var(--accent-blue)] font-black">অর্ডার প্রক্রিয়া</span></h2>
          <p className="text-[var(--text-secondary)] font-bold text-lg transition-colors">
            ৫টি সহজ ধাপে ঘরে বসেই আপনার PVC কার্ডের অর্ডার সম্পন্ন করুন।
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-12">
          {/* Vertical Stepper Timeline */}
          <div className="md:col-span-4 relative">
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-[var(--border-subtle)] transition-colors" />
            
            <div className="absolute left-6 top-6 w-0.5 bg-gradient-to-b from-[var(--accent-blue)] to-[var(--accent-purple)] transition-all duration-500" style={{ height: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }} />

            <div className="space-y-8 relative z-10">
              {steps.map((step) => {
                const isCompleted = step.id < currentStep;
                const isCurrent = step.id === currentStep;
                const isLocked = step.id > currentStep;

                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-4 cursor-pointer transition-all ${isLocked ? 'opacity-40' : 'opacity-100'}`}
                    onClick={() => !isLocked && setCurrentStep(step.id)}
                  >
                    <div className="flex-shrink-0 bg-[var(--bg-primary)] rounded-full shadow-md transition-colors">
                      {isCompleted ? (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center shadow-lg">
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-12 h-12 rounded-full border-4 border-[var(--accent-blue)] flex items-center justify-center bg-[var(--accent-blue)]/10 shadow-lg shadow-[var(--accent-blue)]/20 transition-all">
                          <Circle className="w-4 h-4 text-[var(--accent-blue)] fill-[var(--accent-blue)] transition-colors" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full border-2 border-[var(--card-border)] flex items-center justify-center bg-[var(--bg-primary)] shadow-sm transition-colors">
                          <Lock className="w-5 h-5 text-[var(--text-tertiary)] transition-colors" />
                        </div>
                      )}
                    </div>
                    <div className="pt-2">
                      <h4 className={`text-lg font-black transition-colors ${isCurrent ? 'text-[var(--accent-blue)]' : isCompleted ? 'text-[var(--accent-green)]' : 'text-[var(--text-tertiary)]'}`}>
                        {step.title}
                      </h4>
                      {isCurrent && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-sm text-[var(--text-secondary)] font-bold mt-1 leading-relaxed transition-colors"
                        >
                          {step.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content Area */}
          <div className="md:col-span-8">
            <div className="relative p-10 rounded-3xl min-h-[400px] flex flex-col justify-between overflow-hidden bg-[var(--card-bg)] backdrop-blur-[60px] border border-[var(--card-border)] shadow-[var(--shadow-md)] ring-1 ring-inset ring-[var(--border-subtle)] transition-all">
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-[var(--text-primary)] mb-6 font-serif transition-colors">
                  {steps.find((s) => s.id === currentStep)?.title}
                </h3>
                
                {/* Placeholder for form content */}
                <div className="bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-2xl min-h-[200px] flex items-center justify-center border-dashed overflow-hidden transition-colors">
                  {currentStep === 1 ? (
                    <AadhaarVerification />
                  ) : (
                    <span className="text-[var(--text-secondary)] font-bold px-10 text-center transition-colors">
                      {steps.find(s => s.id === currentStep)?.description}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center mt-8 pt-6 border-t border-[var(--border-subtle)] transition-colors">
                <button
                  disabled={currentStep === 1}
                  onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                  className="px-8 py-3 rounded-xl text-[var(--text-primary)] font-black hover:bg-[var(--btn-secondary-bg)] transition-colors disabled:opacity-20 disabled:cursor-not-allowed text-sm uppercase tracking-wider ring-1 ring-[var(--border-subtle)] shadow-sm"
                >
                  ফিরে যান
                </button>
                <button
                  onClick={() => setCurrentStep((prev) => Math.min(steps.length, prev + 1))}
                  className="group relative px-8 py-3 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-black rounded-xl transition-all hover:scale-105 active:scale-95 overflow-hidden shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10">
                    {currentStep === steps.length ? 'জমা দিন' : 'পরবর্তী ধাপ'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
