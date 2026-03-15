import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-navy-900 selection:bg-emerald-500/30 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={18} />
          <span>ফিরে যান (Back to Home)</span>
        </Link>
        <div className="glass-panel p-8 md:p-12 rounded-3xl text-navy-900 prose prose-invert max-w-none">
          {children}
        </div>
      </div>
    </main>
  );
}
