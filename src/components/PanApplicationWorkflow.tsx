"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import { useState } from "react";
import { AadhaarVerification } from "./AadhaarVerification";
import GlassBackButton from "./GlassBackButton";


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
    <section id="process" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-6">PVC কার্ডের <span className="text-[var(--accent-blue)]">অর্ডার প্রক্রিয়া</span></h2>
            <p className="text-[var(--text-secondary)] font-bold text-lg">৫টি সহজ ধাপে ঘরে বসেই আপনার PVC কার্ডের অর্ডার সম্পন্ন করুন।</p>
          </div>

          <div className="grid md:grid-cols-12 gap-12">
            {/* Vertical Stepper Timeline */}
            <div className="md:col-span-4 relative">
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200" />
              <div className="absolute left-6 top-6 w-0.5 bg-[var(--accent-blue)] transition-all duration-500" style={{ height: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }} />

              <div className="space-y-8 relative z-10">
                {steps.map((step) => {
                  const isCompleted = step.id < currentStep;
                  const isCurrent = step.id === currentStep;
                  const isLocked = step.id > currentStep;

                  return (
                    <div
                      key={step.id}
                      className={`flex items-start gap-4 cursor-pointer transition-all ${isLocked ? 'opacity-70' : 'opacity-100'}`}
                      onClick={() => !isLocked && setCurrentStep(step.id)}
                    >
                      <div className="flex-shrink-0 bg-white rounded-full shadow-md">
                        {isCompleted ? (
                          <div className="w-12 h-12 rounded-full bg-[var(--accent-blue)] flex items-center justify-center shadow-md">
                            <CheckCircle2 className="w-6 h-6 text-white" />
                          </div>
                        ) : isCurrent ? (
                          <div className="w-12 h-12 rounded-full border-4 border-[var(--accent-blue)] flex items-center justify-center bg-white shadow-lg">
                            <Circle className="w-4 h-4 text-[var(--accent-blue)] fill-[var(--accent-blue)]" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center bg-white shadow-sm">
                            <Lock className="w-5 h-5 text-slate-300" />
                          </div>
                        )}
                      </div>
                      <div className="pt-2">
                        <h4 className={`text-lg font-black ${isCurrent ? 'text-[var(--accent-blue)]' : isCompleted ? 'text-[var(--accent-green)]' : 'text-slate-600'}`}>
                          {step.title}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Content Area */}
            <div className="md:col-span-8">
              <div className="relative p-10 rounded-3xl min-h-[400px] flex flex-col justify-between overflow-hidden bg-white border border-slate-200 shadow-xl ring-1 ring-inset ring-black/5">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-[var(--text-primary)] mb-6">
                    {steps.find((s) => s.id === currentStep)?.title}
                  </h3>
                  
                  {/* Form Step Content */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl min-h-[200px] flex items-center justify-center overflow-hidden">
                    {currentStep === 1 ? (
                      <AadhaarVerification />
                    ) : (
                      <div className="text-center p-10 space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-[var(--accent-blue)]/10 flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-8 h-8 text-[var(--accent-blue)]" />
                        </div>
                        <p className="text-slate-700 font-bold">ধাপ সম্পন্ন করুন। আমাদের সিস্টেম আপনার ডেটা এনক্রিপ্ট করছে।</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
                  <GlassBackButton
                    disabled={currentStep === 1}
                    onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                  />
                  <button
                    onClick={() => setCurrentStep((prev) => Math.min(steps.length, prev + 1))}
                    className="group relative px-8 py-3 bg-[var(--btn-primary-bg)] text-white font-black rounded-xl transition-all hover:scale-105 active:scale-95 overflow-hidden shadow-xl"
                  >
                    <div className="absolute inset-0 bg-[var(--accent-blue)]" />
                    <span className="relative z-10">
                      {currentStep === steps.length ? 'জমা দিন' : 'পরবর্তী ধাপ'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
