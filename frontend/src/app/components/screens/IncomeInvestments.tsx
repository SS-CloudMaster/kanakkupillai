import { TrendingUp, DollarSign, PiggyBank, TrendingDown, ArrowLeft } from 'lucide-react';

interface IncomeInvestmentsProps {
  onBack: () => void;
}

export function IncomeInvestments({ onBack }: IncomeInvestmentsProps) {
  const incomeSources = [
    { name: 'Salary', amount: 75000, color: '#2563EB', icon: DollarSign },
    { name: 'Side Income', amount: 8000, color: '#16A34A', icon: TrendingUp },
    { name: 'Interest', amount: 2000, color: '#EA580C', icon: PiggyBank },
  ];

  const investments = [
    { name: 'Fixed Deposit', amount: 250000, returns: 5.5, color: '#2563EB' },
    { name: 'Mutual Funds', amount: 150000, returns: 12.3, color: '#16A34A' },
    { name: 'Gold', amount: 80000, returns: 8.2, color: '#EA580C' },
  ];

  const totalIncome = incomeSources.reduce((sum, source) => sum + source.amount, 0);
  const totalInvestments = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const netWorth = totalInvestments + 100000; // Adding cash/savings

  return (
    <div className="pb-20">
      {/* Header with Back Button */}
      <div className="mb-6 flex items-center gap-3">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-[#0F172A]" />
        </button>
        <div>
          <h1 className="text-[24px]" style={{ fontWeight: 600 }}>Income & Investments</h1>
          <p className="text-[#64748B] text-[14px]">Your financial overview</p>
        </div>
      </div>

      {/* Net Worth Card */}
      <div className="bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-[16px] p-6 shadow-[0px_8px_24px_rgba(0,0,0,0.06)] mb-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5" />
          <span className="text-[14px] opacity-90" style={{ fontWeight: 500 }}>Net Worth</span>
        </div>
        <p className="text-[36px] mb-2" style={{ fontWeight: 700 }}>₹{(netWorth / 1000).toFixed(0)}k</p>
        <div className="flex items-center gap-2 text-[13px] opacity-90">
          <TrendingUp className="w-4 h-4" />
          <span>+12.5% from last month</span>
        </div>
      </div>

      {/* Income Sources Card */}
      <div className="bg-white rounded-[16px] p-4 shadow-[0px_8px_24px_rgba(0,0,0,0.06)] mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px]" style={{ fontWeight: 600 }}>Income Sources</h3>
          <span className="text-[14px] text-[#64748B]">
            Total: <span style={{ fontWeight: 600, color: '#0F172A' }}>₹{totalIncome.toLocaleString()}</span>
          </span>
        </div>

        <div className="space-y-3">
          {incomeSources.map((source) => {
            const Icon = source.icon;
            return (
              <div key={source.name} className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${source.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: source.color }} />
                  </div>
                  <div>
                    <p className="text-[14px]" style={{ fontWeight: 500 }}>{source.name}</p>
                    <p className="text-[12px] text-[#64748B]">Monthly</p>
                  </div>
                </div>
                <p className="text-[16px]" style={{ fontWeight: 600 }}>₹{source.amount.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Investments Card */}
      <div className="bg-white rounded-[16px] p-4 shadow-[0px_8px_24px_rgba(0,0,0,0.06)] mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px]" style={{ fontWeight: 600 }}>Investments</h3>
          <span className="text-[14px] text-[#64748B]">
            Total: <span style={{ fontWeight: 600, color: '#0F172A' }}>₹{(totalInvestments / 1000).toFixed(0)}k</span>
          </span>
        </div>

        <div className="space-y-3">
          {investments.map((investment) => (
            <div key={investment.name} className="p-3 bg-[#F8FAFC] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[14px]" style={{ fontWeight: 500 }}>{investment.name}</p>
                <p className="text-[16px]" style={{ fontWeight: 600 }}>₹{(investment.amount / 1000).toFixed(0)}k</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#64748B]">Current Value</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-[#16A34A]" />
                  <span className="text-[12px] text-[#16A34A]" style={{ fontWeight: 600 }}>
                    +{investment.returns}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Distribution */}
      <div className="bg-white rounded-[16px] p-4 shadow-[0px_8px_24px_rgba(0,0,0,0.06)]">
        <h3 className="text-[16px] mb-4" style={{ fontWeight: 600 }}>Portfolio Distribution</h3>
        
        <div className="space-y-3">
          {investments.map((investment) => {
            const percentage = ((investment.amount / totalInvestments) * 100).toFixed(1);
            return (
              <div key={investment.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-[#0F172A]">{investment.name}</span>
                  <span className="text-[13px] text-[#64748B]">{percentage}%</span>
                </div>
                <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: investment.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}