export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] bg-navy-900 flex flex-col items-center justify-center gap-6">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin" />
      </div>
      <div className="text-xl font-bold text-white tracking-widest animate-pulse">
        GAZI<span className="text-emerald-400">ONLINE</span>
      </div>
    </div>
  );
}
