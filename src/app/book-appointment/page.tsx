"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CreditCard,
  FileCheck,
  Fingerprint,
  ShieldCheck,
  Store,
  Wallet,
  Bolt,
} from "lucide-react";
import { addDays, format, isSameDay } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ServiceItem = {
  id: number | string;
  name: string;
  description: string;
  price: string | number;
  icon_name?: string;
};

type SlotItem = {
  start: string;
  end?: string;
  isAvailable: boolean;
};

const formSchema = z.object({
  fullName: z.string().min(2, "Please enter full name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
});

type FormData = z.infer<typeof formSchema>;

const resolveIcon = (iconName?: string) => {
  switch (iconName) {
    case "Fingerprint":
      return Fingerprint;
    case "CreditCard":
      return CreditCard;
    case "FileCheck":
      return FileCheck;
    default:
      return Bolt;
  }
};

const to12Hour = (time24: string) => {
  const [h, m] = time24.split(":").map(Number);
  const hour = h % 12 || 12;
  const suffix = h >= 12 ? "PM" : "AM";
  return `${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")} ${suffix}`;
};

const formatPrice = (value: number) => `Rs.${value.toFixed(2)}`;

export default function AppointmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0); // 0=service,1=schedule,2=details,3=success
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<SlotItem[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<SlotItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [dateOffset, setDateOffset] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    setMounted(true);
    setSelectedDate(new Date());
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          setServices(data);
          return;
        }
      } catch {
        // fallback below
      }

      setServices([
        {
          id: 1,
          name: "Aadhar/Mobile Update",
          description: "Update your demographics or link your mobile number securely with official portals.",
          price: 100,
          icon_name: "Fingerprint",
        },
        {
          id: 2,
          name: "PAN Card",
          description: "New PAN application, corrections, or reprint requests processed with priority.",
          price: 120,
          icon_name: "CreditCard",
        },
        {
          id: 3,
          name: "Life Certificate",
          description: "Digital Jeevan Pramaan for pensioners. Fast and contactless biometric verification.",
          price: 50,
          icon_name: "FileCheck",
        },
        {
          id: 4,
          name: "Digital Services",
          description: "Online forms, printouts, document scanning, and other digital tasks.",
          price: 30,
          icon_name: "Bolt",
        },
      ]);
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (!selectedService || !selectedDate) return;

    const fetchSlots = async () => {
      setIsLoading(true);
      try {
        const dateStr = format(selectedDate, "yyyy-MM-dd");
        const res = await fetch(`/api/availability?serviceId=${selectedService.id}&date=${dateStr}`);
        if (res.ok) {
          const data = await res.json();
          setSlots((data.slots || data) as SlotItem[]);
          return;
        }
      } catch {
        // fallback below
      } finally {
        setIsLoading(false);
      }

      setSlots([
        { start: "10:00", isAvailable: true },
        { start: "11:30", isAvailable: true },
        { start: "14:00", isAvailable: true },
        { start: "15:30", isAvailable: true },
        { start: "16:30", isAvailable: true },
        { start: "17:00", isAvailable: false },
      ]);
    };

    fetchSlots();
  }, [selectedService, selectedDate]);

  const visibleDates = useMemo(
    () => Array.from({ length: 4 }, (_, i) => addDays(new Date(), dateOffset + i)),
    [dateOffset]
  );

  const morningSlots = slots.filter((slot) => Number(slot.start.split(":")[0]) < 12);
  const afternoonSlots = slots.filter((slot) => Number(slot.start.split(":")[0]) >= 12);

  const baseFare = Number(selectedService?.price ?? 0);
  const serviceFee = Math.round(baseFare * 0.12 * 100) / 100;
  const tax = Math.round(baseFare * 0.06 * 100) / 100;
  const total = baseFare + serviceFee + tax;

  const onFinalSubmit = async (_data: FormData) => {
    void _data;
    if (!selectedService || !selectedDate || !selectedSlot) return;
    setIsFinalizing(true);
    await new Promise((r) => setTimeout(r, 1400));
    setBookingId(`GAZI-${Math.floor(1000 + Math.random() * 9000)}`);
    setIsFinalizing(false);
    setCurrentStep(3);
  };

  const handleTopBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => Math.max(0, prev - 1));
      return;
    }
    router.push("/");
  };

  const isPrimaryDisabled =
    (currentStep === 0 && !selectedService) ||
    (currentStep === 1 && !selectedSlot) ||
    (currentStep === 2 && isFinalizing);

  const primaryActionLabel =
    currentStep === 0
      ? "Continue to Details"
      : currentStep === 1
        ? "Confirm Selection"
        : isFinalizing
          ? "Processing..."
          : "Confirm Booking";

  const handlePrimaryAction = () => {
    if (currentStep === 0) {
      if (!selectedService) return;
      setCurrentStep(1);
      return;
    }

    if (currentStep === 1) {
      if (!selectedSlot) return;
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      void handleSubmit(onFinalSubmit)();
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#ECEBF2] text-[#121623] pb-28 md:pb-32">
      <div className="mx-auto max-w-5xl px-4 md:px-8 pt-6 md:pt-10">
        <div className="px-2 md:px-4">
          <div className="mb-4 md:mb-6 flex items-center justify-between sticky top-3 z-20">
            <button
              type="button"
              onClick={handleTopBack}
              className="inline-flex items-center gap-2 rounded-full border border-[#9ad6e8] bg-white px-4 py-2 text-[#075985] font-black text-sm shadow-[0_10px_24px_-18px_rgba(7,113,145,0.65)] transition-all duration-300 hover:bg-[#f2fbff] hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_16px_34px_-18px_rgba(7,113,145,0.65)] active:scale-[0.98]"
              aria-label={currentStep > 0 ? "Go to previous step" : "Go to home page"}
            >
              <ArrowLeft size={16} />
              {currentStep > 0 ? "Back Step" : "Back Home"}
            </button>
            <div className="rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] font-black text-[#6b7280]">
              Step {currentStep + 1} / 4
            </div>
          </div>

          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.section
                key="service"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#111827]">Select Service</h1>
                  <p className="mt-3 text-sm md:text-base text-[#6b7280]">
                    Please choose the digital assistance you require today.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => {
                    const Icon = resolveIcon(service.icon_name);
                    const selected = selectedService?.id === service.id;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className={`w-full text-left rounded-[2.2rem] p-6 border transition-all duration-300 relative overflow-hidden hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.995] ${
                          selected
                            ? "border-[#9ad6e8] bg-white shadow-[0_20px_45px_-25px_rgba(6,90,117,0.35)]"
                            : "border-slate-200/80 bg-white/85 hover:border-[#8ecbde] hover:shadow-[0_18px_42px_-28px_rgba(6,90,117,0.35)]"
                        }`}
                      >
                        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-[#dff2f8] opacity-90" />
                        <div className="relative space-y-4">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${selected ? "bg-[#0d718f] text-white" : "bg-[#bfeaf5] text-[#075985]"}`}>
                            <Icon size={24} />
                          </div>
                          <h3 className="text-xl md:text-2xl font-black text-[#111827]">{service.name}</h3>
                          <p className="text-[14px] leading-relaxed text-[#374151]">{service.description}</p>
                          <div className="flex items-center justify-between pt-1">
                            <p className="text-2xl md:text-3xl font-black text-[#075985]">{formatPrice(Number(service.price))}</p>
                            <span className={`w-9 h-9 rounded-full border-2 flex items-center justify-center ${selected ? "border-[#0d718f] bg-[#0d718f] text-white" : "border-[#08b5e9] text-[#08b5e9] bg-white"}`}>
                              <Check size={16} />
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

              </motion.section>
            )}

            {currentStep === 1 && (
              <motion.section
                key="schedule"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-7"
              >
                <div>
                  <p className="text-[12px] tracking-[0.22em] font-black uppercase text-[#075985]">Booking</p>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#111827] mt-2">Pick a Time</h1>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-[#111827]">Select Date</h3>
                    <p className="text-[#4b5563] text-sm md:text-base mt-1">{format(visibleDates[0], "MMMM yyyy")}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => setDateOffset((prev) => Math.max(0, prev - 1))}
                        className="w-12 h-12 rounded-full bg-[#e4e5f2] flex items-center justify-center text-[#334155] transition-all hover:bg-[#d9dced] hover:scale-105 active:scale-95"
                      >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={() => setDateOffset((prev) => prev + 1)}
                        className="w-12 h-12 rounded-full bg-[#e4e5f2] flex items-center justify-center text-[#334155] transition-all hover:bg-[#d9dced] hover:scale-105 active:scale-95"
                      >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {visibleDates.map((date) => {
                    const selected = !!selectedDate && isSameDay(date, selectedDate);
                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        onClick={() => setSelectedDate(date)}
                        className={`rounded-[2rem] py-4 border-2 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] ${
                          selected
                            ? "bg-[#0c6e8c] text-white border-[#8bd5ec] shadow-[0_18px_35px_-20px_rgba(7,113,145,0.6)]"
                            : "bg-[#e8e7f3] border-transparent text-[#111827]"
                        }`}
                      >
                        <p className="text-[11px] font-black uppercase">{format(date, "EEE")}</p>
                        <p className="text-2xl md:text-3xl font-black mt-1">{format(date, "dd")}</p>
                        <span className={`mt-2 block w-1.5 h-1.5 rounded-full mx-auto ${selected ? "bg-white" : "bg-transparent"}`} />
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-5">
                  <h3 className="text-xl md:text-2xl font-black text-[#111827]">Available Slots</h3>

                  <div className="space-y-3">
                    <p className="text-[13px] uppercase tracking-[0.2em] font-black text-[#6b7280] flex items-center gap-2">
                      <Clock3 size={14} />
                      Morning
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {(isLoading ? [] : morningSlots).map((slot) => {
                        const selected = selectedSlot?.start === slot.start;
                        return (
                          <button
                            key={slot.start}
                            type="button"
                            onClick={() => slot.isAvailable && setSelectedSlot(slot)}
                            disabled={!slot.isAvailable}
                            className={`rounded-[2rem] py-4 border-2 transition-all duration-300 ${slot.isAvailable ? "hover:-translate-y-0.5 hover:scale-[1.015] active:scale-[0.985]" : ""} ${
                              !slot.isAvailable
                                ? "bg-[#eff1f6] border-[#eceff5] text-[#9ca3af] line-through"
                                : selected
                                  ? "bg-[#d8edf6] border-[#0d718f] text-[#0d718f]"
                                  : "bg-[#ececf7] border-transparent text-[#111827]"
                            }`}
                          >
                            <p className="text-lg md:text-xl font-black">{to12Hour(slot.start)}</p>
                            <p className="text-[11px] uppercase tracking-[0.2em] font-black mt-1">
                              {selected ? "Selected" : slot.isAvailable ? "Available" : "Booked"}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[13px] uppercase tracking-[0.2em] font-black text-[#6b7280] flex items-center gap-2">
                      <Clock3 size={14} />
                      Afternoon
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {(isLoading ? [] : afternoonSlots).map((slot) => {
                        const selected = selectedSlot?.start === slot.start;
                        return (
                          <button
                            key={slot.start}
                            type="button"
                            onClick={() => slot.isAvailable && setSelectedSlot(slot)}
                            disabled={!slot.isAvailable}
                            className={`rounded-[2rem] py-4 border-2 transition-all duration-300 ${slot.isAvailable ? "hover:-translate-y-0.5 hover:scale-[1.015] active:scale-[0.985]" : ""} ${
                              !slot.isAvailable
                                ? "bg-[#eff1f6] border-[#eceff5] text-[#9ca3af] line-through"
                                : selected
                                  ? "bg-[#d8edf6] border-[#0d718f] text-[#0d718f]"
                                  : "bg-[#ececf7] border-transparent text-[#111827]"
                            }`}
                          >
                            <p className="text-lg md:text-xl font-black">{to12Hour(slot.start)}</p>
                            <p className="text-[11px] uppercase tracking-[0.2em] font-black mt-1">
                              {selected ? "Selected" : slot.isAvailable ? "Available" : "Booked"}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {selectedDate && selectedSlot && (
                    <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-5 flex items-center justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-24px_rgba(9,30,66,0.35)]">
                      <div>
                        <p className="text-[12px] uppercase tracking-[0.2em] font-black text-[#6b7280]">Your Choice</p>
                        <p className="text-base md:text-lg font-black text-[#111827] mt-1">
                          {format(selectedDate, "EEEE, MMM dd")} at {to12Hour(selectedSlot.start)}
                        </p>
                        <p className="text-[#374151] mt-1">Standard Shop Visit - 60 min</p>
                      </div>
                      <div className="w-14 h-14 rounded-full bg-[#d6eef6] flex items-center justify-center text-[#075985]">
                        <CalendarDays size={24} />
                      </div>
                    </div>
                  )}
                </div>

              </motion.section>
            )}

            {currentStep === 2 && (
              <motion.section
                key="details"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#111827]">Confirm Details</h1>
                  <p className="text-[#4b5563] text-sm md:text-base mt-3">
                    Please review your journey details and provide contact information.
                  </p>
                </div>

                <div className="rounded-[2.2rem] border border-slate-200 bg-[#ececf8] p-6">
                  <h3 className="text-[#075985] text-xl md:text-2xl font-black">Guest Information</h3>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="text-sm font-bold text-[#111827]">Full Name</label>
                      <input
                        {...register("fullName")}
                        placeholder="John Doe"
                        className="mt-2 w-full h-12 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-[#111827] outline-none transition-all duration-200 hover:border-[#7ccfe5] hover:shadow-[0_12px_24px_-20px_rgba(13,113,143,0.55)] focus:border-[#0ea5c9] focus:ring-4 focus:ring-[#0ea5c9]/10"
                      />
                      {errors.fullName && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.fullName.message}</p>}
                    </div>

                    <div>
                      <label className="text-sm font-bold text-[#111827]">Email Address</label>
                      <input
                        {...register("email")}
                        placeholder="john@example.com"
                        className="mt-2 w-full h-12 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-[#111827] outline-none transition-all duration-200 hover:border-[#7ccfe5] hover:shadow-[0_12px_24px_-20px_rgba(13,113,143,0.55)] focus:border-[#0ea5c9] focus:ring-4 focus:ring-[#0ea5c9]/10"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="text-sm font-bold text-[#111827]">Phone Number</label>
                      <input
                        {...register("phone")}
                        placeholder="+91 98765 43210"
                        className="mt-2 w-full h-12 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-[#111827] outline-none transition-all duration-200 hover:border-[#7ccfe5] hover:shadow-[0_12px_24px_-20px_rgba(13,113,143,0.55)] focus:border-[#0ea5c9] focus:ring-4 focus:ring-[#0ea5c9]/10"
                      />
                      {errors.phone && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.phone.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-[#ececf8] p-5 flex items-center justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-24px_rgba(9,30,66,0.35)]">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#075985]">
                      <Wallet size={18} />
                    </div>
                    <div>
                      <p className="text-lg font-black text-[#111827]">Payment Method</p>
                      <p className="text-sm text-[#4b5563]">Pay upon arrival at destination</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-[#6b7280]" />
                </div>

                <div className="rounded-[2.2rem] border-2 border-[#d2d4e8] bg-white/85 p-6 space-y-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_-28px_rgba(9,30,66,0.35)]">
                  <div className="w-16 h-16 rounded-full bg-[#b9e9f5] mx-auto flex items-center justify-center text-[#075985]">
                    <Store size={30} />
                  </div>
                  <h3 className="text-center text-2xl md:text-3xl font-black text-[#111827]">Booking Summary</h3>

                  <div className="space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.2em] font-black text-[#9ca3af]">Service</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-lg md:text-xl font-black text-[#111827]">{selectedService?.name}</p>
                      <span className="px-3 py-1 rounded-full bg-[#e6f4f8] text-[#075985] text-[11px] font-black uppercase tracking-[0.15em]">
                        Priority
                      </span>
                    </div>
                    <p className="text-[#374151] text-sm">
                      {selectedDate ? format(selectedDate, "MMM dd, yyyy") : "-"} - {selectedSlot ? to12Hour(selectedSlot.start) : "-"}
                    </p>
                  </div>

                  <div className="border-t border-slate-200 pt-4 space-y-2 text-sm md:text-base text-[#111827]">
                    <div className="flex justify-between"><span>Base Fare</span><span>{formatPrice(baseFare)}</span></div>
                    <div className="flex justify-between"><span>Service Fee</span><span>{formatPrice(serviceFee)}</span></div>
                    <div className="flex justify-between"><span>Tourism Tax</span><span>{formatPrice(tax)}</span></div>
                  </div>

                  <div className="border-t border-slate-200 pt-4 flex items-end justify-between">
                    <div>
                      <p className="text-base md:text-lg font-black text-[#111827]">Total Amount</p>
                      <p className="text-xs text-[#9ca3af]">Incl. all taxes and fees</p>
                    </div>
                    <p className="text-2xl md:text-3xl font-black text-[#075985]">{formatPrice(total)}</p>
                  </div>

                  <p className="text-center text-[11px] uppercase tracking-[0.2em] font-black text-[#9ca3af]">
                    By confirming, you agree to Azure terms
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-[#075985] text-sm md:text-base font-bold pb-2">
                  <ShieldCheck size={18} />
                  <span>Secure SSL Encrypted Checkout</span>
                </div>
              </motion.section>
            )}

            {currentStep === 3 && (
              <motion.section
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center py-8"
              >
                <div className="w-24 h-24 rounded-full bg-[#c9eef8] border border-[#9edcf0] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={46} className="text-[#0d718f]" />
                </div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#111827]">Booking Confirmed</h1>
                <p className="text-[#4b5563] text-sm md:text-base">Your appointment has been successfully created.</p>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 max-w-sm mx-auto text-left space-y-2">
                  <p className="text-[12px] uppercase tracking-[0.2em] font-black text-[#6b7280]">Booking No</p>
                  <p className="text-xl md:text-2xl font-black text-[#075985]">{bookingId}</p>
                  <p className="text-sm text-[#374151]">{selectedService?.name}</p>
                  <p className="text-sm text-[#374151]">
                    {selectedDate ? format(selectedDate, "EEE, MMM dd") : ""} - {selectedSlot ? to12Hour(selectedSlot.start) : ""}
                  </p>
                </div>
                <div className="space-y-3 pt-2">
                  <Link href="/track" className="block">
                    <button type="button" className="w-full rounded-full py-3.5 md:py-4 bg-gradient-to-r from-[#0b7695] to-[#10bde8] text-white font-black text-base md:text-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]">
                      Track Booking
                    </button>
                  </Link>
                  <Link href="/" className="block">
                    <button type="button" className="w-full rounded-full py-3.5 md:py-4 border-2 border-[#0b7695] text-[#0b7695] font-black text-base md:text-lg bg-white/70 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] hover:bg-white">
                      Back to Home
                    </button>
                  </Link>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>

      {currentStep <= 2 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200/80 bg-white/95 backdrop-blur-md">
          <div className="mx-auto max-w-5xl px-4 md:px-8 py-3 md:py-4">
            <button
              type="button"
              onClick={handlePrimaryAction}
              disabled={isPrimaryDisabled}
              className="w-full rounded-full py-3.5 md:py-4 bg-gradient-to-r from-[#0b7695] to-[#10bde8] text-white text-base md:text-lg font-black tracking-tight shadow-[0_20px_40px_-20px_rgba(9,144,184,0.65)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:grayscale"
            >
              {primaryActionLabel}
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
