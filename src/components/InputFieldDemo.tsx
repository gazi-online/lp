"use client";

import React from "react";
import InputField from "./InputField";
import { User, Mail, Lock, Eye, EyeOff, Search } from "lucide-react";

export function InputFieldDemo() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="p-10 space-y-8 bg-white min-h-screen max-w-2xl mx-auto rounded-[3rem] shadow-2xl border border-slate-100 my-10">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Premium Input System</h2>
        <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">Fintech-Grade UI Components</p>
      </div>

      <div className="grid gap-8">
        {/* Default State */}
        <InputField
          label="Full Name"
          placeholder="e.g. John Doe"
          icon={User}
          helperText="Enter your legal name as per ID"
        />

        {/* Focus / Active State */}
        <InputField
          label="Search Database"
          placeholder="Start typing to search..."
          icon={Search}
          className="shadow-inner"
        />

        {/* Error State */}
        <InputField
          label="Email Address"
          placeholder="john@example.com"
          icon={Mail}
          error="Please enter a valid email address"
          defaultValue="invalid-email"
        />

        {/* Password with Right Action */}
        <InputField
          label="Secure Password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          icon={Lock}
          rightIcon={
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-blue-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        {/* Disabled State */}
        <InputField
          label="API Key (Read Only)"
          defaultValue="sk_test_51MzS2..."
          icon={Lock}
          disabled
          helperText="Contact admin to regenerate"
        />
      </div>
    </div>
  );
}
