"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center p-4">
      <div className="glass-panel p-10 rounded-3xl max-w-md w-full text-center space-y-6">
        <div className="inline-flex p-4 bg-red-500/10 rounded-full">
          <AlertCircle size={48} className="text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">কিছু ভুল হয়েছে (Something went wrong)</h2>
        <p className="text-gray-400">
          অ্যাপ্লিকেশনটি লোড করার সময় একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।
        </p>
        <button
          onClick={() => reset()}
          className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-navy-900 font-bold py-4 rounded-xl transition-all"
        >
          <RotateCcw size={20} />
          আবার চেষ্টা করুন
        </button>
      </div>
    </div>
  );
}
