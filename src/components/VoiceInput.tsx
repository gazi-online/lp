"use client";

import React, { useState, useEffect } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  placeholder?: string;
  lang?: string;
}

export default function VoiceInput({ onTranscript, placeholder, lang = "bn-BD" }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("ভিডিও রেকর্ডিং আপনার ব্রাউজারে চলবে না। (Speech Recognition not supported)");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onerror = (event: any) => {
      console.error(event.error);
      setError("বুঝতে পারিনি, আবার চেষ্টা করুন। (Error: Try again)");
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={startListening}
        disabled={isListening}
        className={`flex items-center justify-center gap-3 p-4 rounded-2xl transition-all shadow-lg min-h-[56px] ${
          isListening 
            ? "bg-red-500 text-white animate-pulse" 
            : "bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue)]/80"
        }`}
      >
        {isListening ? (
          <>
            <Loader2 className="animate-spin" size={24} />
            <span>বলুন... (Listening)</span>
          </>
        ) : (
          <>
            <Mic size={24} />
            <span>মুখে বলুন (Tap to Speak)</span>
          </>
        )}
      </button>
      {error && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest text-center">{error}</p>}
    </div>
  );
}
