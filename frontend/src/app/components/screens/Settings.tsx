import { useState } from 'react';
import { 
  Bell, 
  Shield, 
  Download, 
  ChevronRight, 
  Moon,
  Globe,
  CreditCard,
  UserCircle,
  HelpCircle
} from 'lucide-react';

export function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(true);
  const [riskProfile, setRiskProfile] = useState('moderate');

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[24px]" style={{ fontWeight: 600 }}>Settings</h1>
        <p className="text-[#64748B] text-[14px]">Manage your preferences</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-[16px] p-4 shadow-[0px_8px_24px_rgba(0,0,0,0.06)] mb-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E40AF] flex items-center justify-center text-white text-[24px]" style={{ fontWeight: 600 }}>
            Y
          </div>
          <div className="flex-1">
            <h3 className="text-[16px]" style={{ fontWeight: 600 }}>Yuvraj</h3>
            <p className="text-[13px] text-[#64748B]">yuvraj@example.com</p>
          </div>
          <button className="p-2">
            <ChevronRight className="w-5 h-5 text-[#64748B]" />
          </button>
        </div>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-[16px] p-4 shadow-[0px_8px_24px_rgba(0,0,0,0.06)] mb-4">
        <h3 className="text-[14px] text-[#64748B] mb-3" style={{ fontWeight: 600 }}>
          GENERAL
        </h3>
        
        <div className="space-y-4">
          {/* Notifications Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#DBEAFE] flex items-center justify-center">
                <Bell className="w-4 h-4 text-[#2563EB]" />
              </div>
              <div>
                <p className="text-[14px]" style={{ fontWeight: 500 }}>Notifications</p>
                <p className="text-[12px] text-[#64748B]">Receive spending alerts</p>
              </div>
            </div>
            <label className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-[#CBD5E1] rounded-full peer-checked:bg-[#2563EB] transition-colors cursor-pointer" />
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
            </label>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] flex items-center justify-center">
                <Moon className="w-4 h-4 text-[#64748B]" />
              </div>
              <div>
                <p className="text-[14px]" style={{ fontWeight: 500 }}>Dark Mode</p>
                <p className="text-[12px] text-[#64748B]">Switch to dark theme</p>
              </div>
            </div>
            <label className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-[#CBD5E1] rounded-full peer-checked:bg-[#2563EB] transition-colors cursor-pointer" />
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
            </label>
          </div>

          {/* Language */}
          <button className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#DCFCE7] flex items-center justify-center">
                <Globe className="w-4 h-4 text-[#16A34A]" />
              </div>
              <div className="text-left">
                <p className="text-[14px]" style={{ fontWeight: 500 }}>Language</p>
                <p className="text-[12px] text-[#64748B]">English</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#64748B]" />
          </button>

          {/* Currency */}
          <button className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FEE2E2] flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-[#DC2626]" />
              </div>
              <div className="text-left">
                <p className="text-[14px]" style={{ fontWeight: 500 }}>Currency</p>
                <p className="text-[12px] text-[#64748B]">INR (₹)</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#64748B]" />
          </button>
        </div>
      </div>

      {/* Risk Profile */}
      <div className="bg-white rounded-[16px] p-4 shadow-[0px_8px_24px_rgba(0,0,0,0.06)] mb-4">
        <h3 className="text-[14px] text-[#64748B] mb-3" style={{ fontWeight: 600 }}>
          INVESTMENT PROFILE
        </h3>
        
        <div className="space-y-2">
          {['conservative', 'moderate', 'aggressive'].map((profile) => (
            <button
              key={profile}
              onClick={() => setRiskProfile(profile)}
              className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                riskProfile === profile
                  ? 'border-[#2563EB] bg-[#DBEAFE]'
                  : 'border-[#E2E8F0] bg-white'
              }`}
            >
              <p 
                className={`text-[14px] capitalize ${
                  riskProfile === profile ? 'text-[#2563EB]' : 'text-[#0F172A]'
                }`}
                style={{ fontWeight: 600 }}
              >
                {profile}
              </p>
              <p className="text-[12px] text-[#64748B] mt-1">
                {profile === 'conservative' && 'Low risk, stable returns'}
                {profile === 'moderate' && 'Balanced risk and returns'}
                {profile === 'aggressive' && 'High risk, high returns'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-white rounded-[16px] p-4 shadow-[0px_8px_24px_rgba(0,0,0,0.06)] mb-4">
        <h3 className="text-[14px] text-[#64748B] mb-3" style={{ fontWeight: 600 }}>
          PRIVACY & SECURITY
        </h3>
        
        <div className="space-y-4">
          {/* Biometric */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FFEDD5] flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#EA580C]" />
              </div>
              <div>
                <p className="text-[14px]" style={{ fontWeight: 500 }}>Biometric Lock</p>
                <p className="text-[12px] text-[#64748B]">Use fingerprint/face</p>
              </div>
            </div>
            <label className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={biometric}
                onChange={(e) => setBiometric(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-[#CBD5E1] rounded-full peer-checked:bg-[#2563EB] transition-colors cursor-pointer" />
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
            </label>
          </div>

          {/* Change Password */}
          <button className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] flex items-center justify-center">
                <UserCircle className="w-4 h-4 text-[#64748B]" />
              </div>
              <p className="text-[14px]" style={{ fontWeight: 500 }}>Change Password</p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#64748B]" />
          </button>
        </div>
      </div>

      {/* Data Export */}
      <div className="bg-white rounded-[16px] p-4 shadow-[0px_8px_24px_rgba(0,0,0,0.06)] mb-4">
        <h3 className="text-[14px] text-[#64748B] mb-3" style={{ fontWeight: 600 }}>
          DATA
        </h3>
        
        <button className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#DBEAFE] flex items-center justify-center">
              <Download className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div className="text-left">
              <p className="text-[14px]" style={{ fontWeight: 500 }}>Export Data</p>
              <p className="text-[12px] text-[#64748B]">Download as CSV/PDF</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#64748B]" />
        </button>
      </div>

      {/* Help & Support */}
      <div className="bg-white rounded-[16px] p-4 shadow-[0px_8px_24px_rgba(0,0,0,0.06)]">
        <button className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#DCFCE7] flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-[#16A34A]" />
            </div>
            <div className="text-left">
              <p className="text-[14px]" style={{ fontWeight: 500 }}>Help & Support</p>
              <p className="text-[12px] text-[#64748B]">FAQs and contact us</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#64748B]" />
        </button>
      </div>

      {/* App Version */}
      <div className="mt-6 text-center">
        <p className="text-[12px] text-[#64748B]">Version 1.0.0</p>
      </div>
    </div>
  );
}
