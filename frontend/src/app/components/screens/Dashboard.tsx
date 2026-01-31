import { TrendingUp, TrendingDown, ArrowUpRight, Plus } from 'lucide-react';
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

interface DashboardProps {
  onAddExpense: () => void;
  onViewIncome: () => void;
}

const API_URL = "http://127.0.0.1:8000";

export function Dashboard({ onAddExpense, onViewIncome }: DashboardProps) {

  // ------------------------
  // STATE (FROM BACKEND)
  // ------------------------
  const [summaryData, setSummaryData] = useState({
    income: 0,
    expense: 0,
    savings: 0,
  });

  const [expenseByCategory, setExpenseByCategory] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);

  const aiInsights = [
    {
      type: 'alert',
      title: 'High Spending Alert',
      message: 'Your shopping expenses are higher than usual',
      color: '#DC2626',
    },
    {
      type: 'recommendation',
      title: 'Save more this month',
      message: 'Reducing dining out can improve savings',
      color: '#16A34A',
    },
  ];

  // ------------------------
  // FETCH DASHBOARD DATA
  // ------------------------
  useEffect(() => {
    fetch(`${API_URL}/dashboard`)
      .then(res => res.json())
      .then(data => {
        setSummaryData(data.summary);

        setExpenseByCategory(
          data.expenseByCategory.map((item: any, index: number) => ({
            ...item,
            color: [
              '#2563EB',
              '#16A34A',
              '#EA580C',
              '#DC2626',
              '#8B5CF6',
            ][index % 5],
          }))
        );

        setTrendData(data.trend);
      });
  }, []);

  return (
    <div className="pb-20">

      {/* Top Bar */}
      <div className="mb-6">
        <h1 className="text-[24px] mb-1 font-semibold">Hi Sooraj 👋</h1>
        <p className="text-[#64748B] text-[14px]">January 2026</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white rounded-[16px] p-4 shadow">
          <div className="flex items-center gap-1 mb-2">
            <TrendingUp className="w-4 h-4 text-[#16A34A]" />
            <span className="text-[12px] text-[#64748B]">Income</span>
          </div>
          <p className="text-[20px] font-semibold">
            ₹{(summaryData.income / 1000).toFixed(0)}k
          </p>
        </div>

        <div className="bg-white rounded-[16px] p-4 shadow">
          <div className="flex items-center gap-1 mb-2">
            <TrendingDown className="w-4 h-4 text-[#DC2626]" />
            <span className="text-[12px] text-[#64748B]">Expense</span>
          </div>
          <p className="text-[20px] font-semibold">
            ₹{(summaryData.expense / 1000).toFixed(0)}k
          </p>
        </div>

        <div className="bg-white rounded-[16px] p-4 shadow">
          <div className="flex items-center gap-1 mb-2">
            <ArrowUpRight className="w-4 h-4 text-[#2563EB]" />
            <span className="text-[12px] text-[#64748B]">Savings</span>
          </div>
          <p className="text-[20px] font-semibold">
            ₹{(summaryData.savings / 1000).toFixed(0)}k
          </p>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="bg-white rounded-[16px] p-4 shadow mb-4">
        <h3 className="text-[16px] mb-3 font-semibold">Expense Breakdown</h3>

        <div className="h-[200px] mb-3">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseByCategory}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                paddingAngle={2}
              >
                {expenseByCategory.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {expenseByCategory.map((cat) => (
          <div key={cat.name} className="flex justify-between text-[14px] mb-1">
            <span>{cat.name}</span>
            <span className="font-semibold">
              ₹{(cat.value / 1000).toFixed(1)}k
            </span>
          </div>
        ))}
      </div>

      {/* Spending Trend */}
      <div className="bg-white rounded-[16px] p-4 shadow mb-4">
        <h3 className="text-[16px] mb-3 font-semibold">Spending Trend</h3>

        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(v: number) => `₹${v}`} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#2563EB"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div className="space-y-3 mb-4">
        {aiInsights.map((insight, index) => (
          <div
            key={index}
            className="bg-white rounded-[16px] p-4 shadow"
            style={{ borderLeft: `4px solid ${insight.color}` }}
          >
            <h4 className="font-semibold text-[14px]">{insight.title}</h4>
            <p className="text-[13px] text-[#64748B]">{insight.message}</p>
          </div>
        ))}
      </div>

      {/* Income & Investments */}
      <button
        onClick={onViewIncome}
        className="w-full bg-gradient-to-br from-[#16A34A] to-[#15803D] rounded-[16px] p-4 text-white mb-4"
      >
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-semibold text-[16px]">Income & Investments</h4>
            <p className="text-[13px] opacity-90">
              View your net worth and portfolio
            </p>
          </div>
          <ArrowUpRight />
        </div>
      </button>

      {/* Floating Add Button */}
      <button
        onClick={onAddExpense}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-[#2563EB] flex items-center justify-center shadow-lg"
      >
        <Plus className="text-white" />
      </button>
    </div>
  );
}