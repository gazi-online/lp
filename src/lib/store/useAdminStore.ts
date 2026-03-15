import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AdminOrder {
  id: string;
  client: string;
  type: 'PVC Printing' | 'Home Delivery' | 'Digital IT';
  status: 'Pending' | 'In Production' | 'Out for Delivery' | 'Delivered';
  location: string;
  priority: 'Low' | 'Medium' | 'High';
  date: string;
}

export interface Appointment {
  id: string;
  time: string;
  client: string;
  service: string;
  status: 'Pending' | 'Confirmed' | 'Live' | 'Completed';
  type: 'Physical' | 'Virtual';
  location: string;
}

export interface PanApplication {
  id: string;
  client: string;
  phone?: string;
  aadhaarNumber?: string;
  photo: string;
  signature: string;
  aadhaarDoc: string;
  additionalDoc: string;
  annexureA?: string;
  otp?: string;
  otpStatus: 'None' | 'Requested' | 'Submitted' | 'Incorrect';
  type: string;
  source: string;
  status: 'Verification Required' | 'Processing' | 'Approved' | 'Rejected';
  priority: 'Low' | 'Normal' | 'High';
  days: string;
}

export interface Officer {
  id: string;
  name: string;
  role: string;
  status: 'On Mission' | 'Standby' | 'On Leave';
  efficiency: string;
  experience: string;
  specialty: string;
}

interface AdminState {
  revenue: number;
  orders: AdminOrder[];
  appointments: Appointment[];
  panQueue: PanApplication[];
  squadron: Officer[];
  
  // Actions
  addOrder: (order: AdminOrder) => void;
  updateOrderStatus: (id: string, status: AdminOrder['status']) => void;
  addAppointment: (app: Appointment) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  updatePanStatus: (id: string, status: PanApplication['status']) => void;
  addPanApplication: (app: Omit<PanApplication, 'id' | 'days' | 'priority'>) => void;
  updatePanOtp: (id: string, otp: string) => void;
  requestPanOtp: (id: string) => void;
  setPanOtpStatus: (id: string, status: PanApplication['otpStatus']) => void;
  updateOfficerStatus: (id: string, status: Officer['status']) => void;
  addOfficer: (officer: Officer) => void;
  increaseRevenue: (amount: number) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      revenue: 124500,
      orders: [
        { id: 'PVC-001', client: 'Ariful Islam', type: 'PVC Printing', status: 'In Production', location: 'Hasnabad', priority: 'High', date: '2026-03-14' },
        { id: 'DLV-082', client: 'Sumit Das', type: 'Home Delivery', status: 'Out for Delivery', location: 'Basirhat', priority: 'Medium', date: '2026-03-14' },
        { id: 'PVC-034', client: 'Fatima Khatun', type: 'PVC Printing', status: 'Pending', location: 'Taki', priority: 'Low', date: '2026-03-13' },
      ],
      appointments: [
        { id: 'APP-101', time: '10:00 AM', client: 'Bikramjit Sardar', service: 'Business Consultation', status: 'Confirmed', type: 'Physical', location: 'Hasnabad Hub' },
        { id: 'APP-102', time: '11:45 AM', client: 'Jesmin Ara', service: 'Document Verification', status: 'Pending', type: 'Physical', location: 'Hasnabad Hub' },
        { id: 'APP-103', time: '02:30 PM', client: 'Abdul Malek', service: 'Bank Account Setup', status: 'Live', type: 'Physical', location: 'Hasnabad Hub' },
      ],
      panQueue: [
        { id: 'PAN-2026-001', client: 'Subrata Roy', type: 'New e-PAN', source: 'Remote Portal', status: 'Verification Required', priority: 'High', days: '0 Days',    otpStatus: 'None',
    photo: 'placeholder',
    signature: 'placeholder',
    aadhaarDoc: 'placeholder',
    additionalDoc: 'placeholder',
  },
  {
    id: 'PAN-2024-002',
    client: 'SUBHASISH DAS',
    type: 'Update Request',
    source: 'Partner Portal',
    status: 'Processing',
    priority: 'Normal',
    days: '1',
    otpStatus: 'None',
    photo: 'placeholder',
    signature: 'placeholder',
    aadhaarDoc: 'placeholder',
    additionalDoc: 'placeholder',
  },
      ],
      squadron: [
        { id: 'OFR-01', name: 'Ariful Islam', role: 'Chief Operations Officer', status: 'On Mission', efficiency: '98%', experience: '5 Years', specialty: 'PAN Verification' },
        { id: 'OFR-02', name: 'Sumit Das', role: 'Logistics Supervisor', status: 'On Mission', efficiency: '94%', experience: '3 Years', specialty: 'Delivery Grid' },
        { id: 'OFR-03', name: 'Anisur Rahman', role: 'Support Specialist', status: 'Standby', efficiency: '92%', experience: '2 Years', specialty: 'Client Relations' },
        { id: 'OFR-04', name: 'Roushan Ali', role: 'Admin Officer', status: 'On Leave', efficiency: '96%', experience: '4 Years', specialty: 'Documentation' },
      ],

      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      updateOrderStatus: (id, status) => set((state) => ({
        orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
      })),
      addAppointment: (app) => set((state) => ({ appointments: [app, ...state.appointments] })),
      updateAppointmentStatus: (id, status) => set((state) => ({
        appointments: state.appointments.map((a) => (a.id === id ? { ...a, status } : a)),
      })),
      updatePanStatus: (id, status) => set((state) => ({
        panQueue: state.panQueue.map((p) => (p.id === id ? { ...p, status } : p)),
      })),
      addPanApplication: (app) => set((state) => ({
        panQueue: [{
          ...app,
          id: `PAN-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
          days: '0 Days',
          priority: 'Normal'
        }, ...state.panQueue]
      })),
      updatePanOtp: (id, otp) => set((state) => ({
        panQueue: state.panQueue.map((p) => (p.id === id ? { ...p, otp, otpStatus: 'Submitted' } : p)),
      })),
      requestPanOtp: (id) => set((state) => ({
        panQueue: state.panQueue.map((p) => (p.id === id ? { ...p, otpStatus: 'Requested' } : p)),
      })),
      setPanOtpStatus: (id, status) => set((state) => ({
        panQueue: state.panQueue.map((p) => (p.id === id ? { ...p, otpStatus: status } : p)),
      })),
      updateOfficerStatus: (id, status) => set((state) => ({
        squadron: state.squadron.map((o) => (o.id === id ? { ...o, status } : o)),
      })),
      addOfficer: (officer) => set((state) => ({ squadron: [officer, ...state.squadron] })),
      increaseRevenue: (amount) => set((state) => ({ revenue: state.revenue + amount })),
    }),
    {
      name: 'nexus-command-storage',
    }
  )
);
