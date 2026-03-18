import { motion, useMotionValue, useSpring } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Copy, Check } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const address = "শ্বেতপুর, নিউ হাজী মার্কেট, পাইকপাড়া, বসিরহাট, উত্তর ২৪ পরগণা, পিন: ৭৪৩৪২২";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-transparent pt-20 pb-10 relative overflow-hidden transition-colors">
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & Stats */}
          <div className="lg:col-span-4 space-y-6">
            <div className="text-3xl font-bold text-[var(--text-primary)] tracking-widest drop-shadow-sm transition-colors">
              GAZI<span className="text-[var(--accent-blue)]">ONLINE</span>
            </div>
            <p className="text-[var(--text-secondary)] max-w-sm font-semibold italic transition-colors">
              বসিরহাটের নির্ভরযোগ্য ডিজিটাল পরিষেবা কেন্দ্র। আপনার সরকারি আইডি থেকে শুরু করে ব্যাংকিং সমাধান—সবই এক ছাদের নিচে।
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={Facebook} />
              <SocialIcon icon={Instagram} />
            </div>
          </div>

          {/* Quick Links / Services */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[var(--text-primary)] font-bold text-lg mb-6 drop-shadow-sm border-b-2 border-[var(--accent-blue)]/20 pb-2 transition-colors">পরিষেবা</h4>
            <ul className="space-y-3 text-[var(--text-secondary)] font-bold">
              <li className="hover:text-[var(--accent-blue)] transition-colors">
                <Link href="/order-pvc" className="hover-text-glow">PVC কার্ডের অর্ডার</Link>
              </li>
              <li className="hover:text-[var(--accent-blue)] hover-text-glow cursor-pointer transition-colors">ব্যাংকিং ও লোন</li>
              <li className="hover:text-[var(--accent-blue)] hover-text-glow cursor-pointer transition-colors">মোবাইল রিচার্জ</li>
              <li className="hover:text-[var(--accent-blue)] transition-colors">
                <Link href="/order-pvc" className="hover-text-glow">পিভিসি কার্ড প্রিন্ট</Link>
              </li>
            </ul>
          </div>

          {/* Contact Card Area */}
          <div className="lg:col-span-6">
             <div className="relative p-8 rounded-[2.5rem] overflow-hidden bg-white/[0.03] border border-white/5 shadow-2xl ring-1 ring-inset ring-white/5 transition-all liquid-glass">
                <div className="relative z-10 grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="text-[var(--text-primary)] font-black text-xl transition-colors">যোগাযোগ করুন</h4>
                    <div className="space-y-4">
                      <a href="tel:+916295051584" className="flex items-center gap-3 text-[var(--accent-blue)] font-black text-lg hover:underline transition-colors group">
                        <div className="bg-[var(--accent-blue)]/10 p-2 rounded-lg ring-1 ring-[var(--accent-blue)]/20 group-hover:bg-[var(--accent-blue)] group-hover:text-white transition-all">
                          <Phone size={20} />
                        </div>
                        +91 62950 51584
                      </a>
                      <a href="mailto:info@gazionline.com" className="flex items-center gap-3 text-[var(--text-secondary)] font-bold hover:text-[var(--accent-blue)] transition-colors group">
                        <div className="bg-white/5 p-2 rounded-lg ring-1 ring-white/10 group-hover:bg-[var(--accent-blue)] group-hover:text-white transition-all">
                          <Mail size={18} />
                        </div>
                        info@gazionline.com
                      </a>
                      <div className="flex items-start gap-3 text-[var(--text-primary)]/90 transition-colors">
                        <div className="bg-white/5 p-2 rounded-lg flex-shrink-0 ring-1 ring-white/10 transition-all">
                          <MapPin size={18} />
                        </div>
                        <span className="text-sm leading-relaxed font-bold">
                          {address}
                        </span>
                      </div>
                      <button 
                        onClick={handleCopy}
                        className="flex items-center gap-2 text-xs text-[var(--text-tertiary)] hover:text-[var(--accent-blue)] transition-colors uppercase tracking-widest font-black"
                      >
                        <div className="bg-white/5 p-1.5 rounded-md transition-all">
                          {copied ? <Check size={14} className="text-[var(--accent-green)]" /> : <Copy size={14} />}
                        </div>
                        {copied ? 'Copied' : 'Copy Address'}
                      </button>
                    </div>
                  </div>

                  {/* Map Embed (Styled Placeholder) */}
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=22.613537,88.840279"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[2rem] overflow-hidden h-48 md:h-full bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] border border-white/20 group cursor-pointer relative shadow-inner block"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="flex flex-col items-center justify-center h-full text-white/80 gap-2 relative z-20"
                    >
                       <MapPin size={32} className="group-hover:text-white transition-colors" />
                       <span className="text-[10px] uppercase font-bold tracking-widest group-hover:text-white transition-colors">Open in Google Maps</span>
                    </motion.div>
                    
                  </a>
                </div>
             </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[var(--text-tertiary)] text-[10px] font-bold uppercase tracking-widest transition-colors">
          <p>© 2026 Gazi Online. All rights reserved.</p>
          <div className="flex gap-6">
             <Link href="/privacy" className="hover:text-[var(--accent-blue)] transition-colors">Privacy Policy</Link>
             <Link href="/terms" className="hover:text-[var(--accent-blue)] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Action Button */}
      <motion.a 
        href="https://wa.me/916295051584"
        target="_blank"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        className="fixed bottom-8 right-8 z-[100] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] p-4 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center justify-center hover:bg-[var(--accent-blue)] hover:text-white transition-all border border-white/10"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-pulse" />
        <MessageCircle size={28} />
      </motion.a>
    </footer>
  );
}

function SocialIcon({ icon: Icon }: { icon: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const dx = useSpring(x, springConfig);
  const dy = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.5);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.1 }}
      className="p-3 rounded-xl bg-white/5 hover:bg-[var(--accent-blue)] hover:text-white text-[var(--text-primary)] transition-all border border-white/5 shadow-xl relative overflow-hidden group"
    >
      <motion.div style={{ x: dx, y: dy }}>
        <Icon size={20} />
      </motion.div>
    </motion.button>
  );
}
