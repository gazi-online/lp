import { 
  Zap, 
  Smartphone, 
  QrCode, 
  Camera, 
  Scan, 
  Copy, 
  Globe, 
  University, 
  IndianRupee, 
  Wallet, 
  HandCoins, 
  CreditCard, 
  IdCard, 
  FileText,
  Activity,
  ShieldCheck,
  TrendingUp,
  Truck,
  ShoppingCart,
  Layers,
  Cpu
} from 'lucide-react';

export const SERVICE_PILLARS = [
  {
    id: 'banking',
    title: 'ব্যাংকিং ও নগদ (FinTech)',
    enTitle: 'Banking & Cash',
    description: 'নগদ তোলা/জমা, AEPS, অ্যাকাউন্ট খোলা ও লোন সেবা',
    icon: University,
    color: '#0033FF',
    gradient: 'from-blue-900/40 to-blue-600/40',
    badge: 'CORE',
    colSpan: 'md:col-span-8',
    rowSpan: 'row-span-2'
  },
  {
    id: 'utilities',
    title: 'বিল ও রিচার্জ (Utility)',
    enTitle: 'Bills & Recharge',
    description: 'ইলেকট্রিক বিল, মোবাইল ও DTH রিচার্জ খুব দ্রুত',
    icon: Zap,
    color: '#00B86C',
    gradient: 'from-emerald-900/40 to-emerald-600/40',
    badge: 'DAILY',
    colSpan: 'md:col-span-4',
    rowSpan: 'row-span-1'
  },
  {
    id: 'digital',
    title: 'ডিজিটাল ও প্রিন্টিং (IT)',
    enTitle: 'Digital & IT',
    description: 'ফটো, জেরক্স, প্যান কার্ড ও পিভিসি কার্ড সার্ভিস',
    icon: Camera,
    color: '#7B2FBE',
    gradient: 'from-purple-900/40 to-purple-600/40',
    badge: 'PREMIUM',
    colSpan: 'md:col-span-4',
    rowSpan: 'row-span-2'
  },
  {
    id: 'remort',
    title: 'রিমোট সেবা (Cloud)',
    enTitle: 'Remote Services',
    description: 'দোকানে না এসেই ঘরে বসে অনলাইনে সব কাজ',
    icon: Globe,
    color: '#00EDFF',
    gradient: 'from-cyan-900/40 to-cyan-600/40',
    badge: 'HOT',
    colSpan: 'md:col-span-8',
    rowSpan: 'row-span-1'
  }
];

export const SERVICE_CATALOG = [
  // Utilities
  { id: 'E1', pillarId: 'utilities', name: 'Electricity Bill', bnName: 'ইলেকট্রিক বিল', status: 'Active', revenue: 'Commission/txn', icon: Zap, color: '#00B86C', sla: '100%', subServices: ['WBSEDCL Payment', 'Non-WBSEDCL Bills'] },
  { id: 'R1', pillarId: 'utilities', name: 'Mobile/DTH Recharge', bnName: 'রিচার্জ', status: 'Active', revenue: '1.5-3%', icon: Smartphone, color: '#00B86C', sla: '99.9%', subServices: ['Prepaid/Postpaid', 'DTH Recharge'] },
  { id: 'I1', pillarId: 'utilities', name: 'Internet Services', bnName: 'ইন্টারনেট', status: 'Active', revenue: 'Hourly', icon: Globe, color: '#00B86C', sla: '95.0%', subServices: ['Browsing/Email', 'Form Filling'] },
  
  // FinTech
  { id: 'P1', pillarId: 'banking', name: 'PhonePe Agent', bnName: 'ফোনপে', status: 'Active', revenue: 'Commission', icon: QrCode, color: '#0033FF', sla: '100%', subServices: ['UPI QR Setup', 'Wallet Cashout'] },
  { id: 'G1', pillarId: 'banking', name: 'Google Pay Agent', bnName: 'গুগল পে', status: 'Active', revenue: 'Commission', icon: QrCode, color: '#0033FF', sla: '100%', subServices: ['Merchant Onboarding', 'Soundbox Setup'] },
  { id: 'B1', pillarId: 'banking', name: 'Account Opening', bnName: 'অ্যাকাউন্ট খোলা', status: 'Active', revenue: 'Fixed Comm', icon: University, color: '#0033FF', sla: '98.0%', subServices: ['CSP/BC Setup', 'PMJDY Savings'] },
  { id: 'C1', pillarId: 'banking', name: 'Cash Withdrawal', bnName: 'নগদ তোলা', status: 'Active', revenue: '0.5%', icon: HandCoins, color: '#0033FF', sla: '100%', subServices: ['AEPS Withdrawal', 'Debit Card ATM'] },
  { id: 'D1', pillarId: 'banking', name: 'Cash Deposit', bnName: 'জমা', status: 'Active', revenue: 'Fixed Fee', icon: Wallet, color: '#0033FF', sla: '99.8%', subServices: ['Bank Deposit', 'CDM Support'] },
  { id: 'L1', pillarId: 'banking', name: 'Loan Facilitation', bnName: 'ঋণ সেবা', status: 'Follow-up', revenue: '1-2% Ref', icon: IndianRupee, color: '#0033FF', sla: '92.0%', subServices: ['Personal Loan', 'MSME/KCC Loan'] },

  // Digital & IT
  { id: 'F1', pillarId: 'digital', name: 'Photography', bnName: 'ফটো', status: 'Active', revenue: 'Fixed Fee', icon: Camera, color: '#7B2FBE', sla: '100%', subServices: ['Passport Photo', 'Document Photos'] },
  { id: 'S1', pillarId: 'digital', name: 'Scanning', bnName: 'স্ক্যান', status: 'Active', revenue: 'Per Page', icon: Scan, color: '#7B2FBE', sla: '100%', subServices: ['High-Res Scanning', 'PDF Conversion'] },
  { id: 'X1', pillarId: 'digital', name: 'Xerox', bnName: 'জেরক্স', status: 'Active', revenue: 'Per Copy', icon: Copy, color: '#7B2FBE', sla: '100%', subServices: ['A4/A3 Copy', 'Color/B&W Xerox'] },
  { id: 'V1', pillarId: 'digital', name: 'PVC Card Print', bnName: 'PVC কার্ড', status: 'Active', revenue: 'Premium', icon: CreditCard, color: '#7B2FBE', sla: 'Same-day', subServices: ['Aadhaar/Voter PVC', 'Home Delivery'] },
  
  // Remote
  { id: 'N1', pillarId: 'remort', name: 'PAN Remote', bnName: 'প্যান (রিমোট)', status: 'Active', revenue: 'Service Fee', icon: IdCard, color: '#00EDFF', sla: 'Zero-Visit', subServices: ['Online App', 'e-PAN/Correction'] },
];

export const PARTNERS = [
  { id: 'p1', name: 'PhonePe Business', category: 'FinTech', status: 'Integrated', revenue: '₹4,200', rating: 4.8, icon: QrCode, color: '#5f259f' },
  { id: 'p2', name: 'Google Pay for Business', category: 'FinTech', status: 'Integrated', revenue: '₹3,800', rating: 4.9, icon: QrCode, color: '#1a73e8' },
  { id: 'p3', name: 'WBSEDCL', category: 'Utility', status: 'Active', revenue: '₹3,240', rating: 4.7, icon: Zap, color: '#00B86C' },
  { id: 'p4', name: 'NSDL PAN', category: 'Government', status: 'Integrated', revenue: '₹800', rating: 4.9, icon: IdCard, color: '#0033FF' },
  { id: 'p5', name: 'SBI CSP', category: 'Banking', status: 'Active', revenue: '₹12,400', rating: 4.6, icon: University, color: '#0033FF' },
];
