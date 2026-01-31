import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { User } from 'lucide-react';

export function Analytics() {
  const [activeTab, setActiveTab] = useState<'category' | 'person' | 'timeline'>('category');

  const categoryData = [
    { name: 'Food', amount: 15000, percentage: 29 },
    { name: 'Shopping', amount: 12000, percentage: 23 },
    { name: 'Bills', amount: 10000, percentage: 19 },
    { name: 'Transport', amount: 8500, percentage: 16 },
    { name: 'Others', amount: 6840, percentage: 13 },
  ];

  const categoryChartData = [
    { name: 'Food', value: 15000 },
    { name: 'Shop', value: 12000 },
    { name: 'Bills', value: 10000 },
    { name: 'Trans', value: 8500 },
    { name: 'Other', value: 6840 },
  ];

  const personData = [
    { name: 'Yuvraj', total: 32500, average: 10833, color: '#2563EB' },
    { name: 'Roommate 1', total: 12340, average: 4113, color: '#16A34A' },
    { name: 'Roommate 2', total: 7500, average: 2500, color: '#EA580C' },
  ];

  const timelineData = [
    { period: 'Week 1', amount: 8500 },
    { period: 'Week 2', amount: 12000 },
    { period: 'Week 3', amount: 15200 },
    { period: 'Week 4', amount: 16640 },
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[24px]" style={{ fontWeight: 600 }}>Analytics</h1>
        <p className="text-[#64748B] text-[14px]">January 2026 Overview</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-[#F1F5F9] p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('category')}
          className={`flex-1 py-2 px-4 rounded-lg text-[14px] transition-all ${
            activeTab === 'category'
              ? 'bg-white text-[#2563EB] shadow-sm'
              : 'text-[#64748B]'
          }`}
          style={{ fontWeight: 600 }}
        >
          Category
        </button>
        <button
          onClick={() => setActiveTab('person')}
          className={`flex-1 py-2 px-4 rounded-lg text-[14px] transition-all ${
            activeTab === 'person'
              ? 'bg-white text-[#2563EB] shadow-sm'
              : 'text-[#64748B]'
          }`}
          style={{ fontWeight: 600 }}
        >
          Person
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex-1 py-2 px-4 rounded-lg text-[14px] transition-all ${
            activeTab === 'timeline'
              ? 'bg-white text-[#2563EB] shadow-sm'
              : 'text-[#64748B]'
          }`}
          style={{ fontWeight: 600 }}
        >
          Timeline
        </button>
      </div>

      {/* Category Tab */}
      {activeTab === 'category' && (
        <>
          {/* Bar Chart */}
          <div className="bg-white rounded-[16px] p-4 shadow-[0px_8px_24px_rgba(0,0,0,0.06)] mb-4">
            <h3 className="text-[16px] mb-3" style={{ fontWeight: 600 }}>Spending by Category</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                  />
                  <YAxis 
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="value" fill="#2563EB" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category List */}
          <div className="bg-white rounded-[16px] p-4 shadow-[0px_8px_24px_rgba(0,0,0,0.06)]">
            <h3 className="text-[16px] mb-4" style={{ fontWeight: 600 }}>Category Breakdown</h3>
            <div className="space-y-3">
              {categoryData.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] text-[#0F172A]">{category.name}</span>
                    <div className="text-right">
                      <p className="text-[14px]" style={{ fontWeight: 600 }}>₹{category.amount.toLocaleString()}</p>
                      <p className="text-[12px] text-[#64748B]">{category.percentage}%</p>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#2563EB] rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Person Tab */}
      {activeTab === 'person' && (
        <div className="space-y-3">
          {personData.map((person) => (
            <div 
              key={person.name}
              className="bg-white rounded-[16px] p-4 shadow-[0px_8px_24px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${person.color}20` }}
                >
                  <User className="w-6 h-6" style={{ color: person.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[16px]" style={{ fontWeight: 600 }}>{person.name}</h3>
                  <p className="text-[12px] text-[#64748B]">Personal expenses</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[12px] text-[#64748B] mb-1">Total Spend</p>
                  <p className="text-[20px]" style={{ fontWeight: 600 }}>₹{person.total.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#64748B] mb-1">Monthly Avg</p>
                  <p className="text-[20px]" style={{ fontWeight: 600 }}>₹{person.average.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Timeline Tab */}
      {activeTab === 'timeline' && (
        <>
          <div className="bg-white rounded-[16px] p-4 shadow-[0px_8px_24px_rgba(0,0,0,0.06)] mb-4">
            <h3 className="text-[16px] mb-3" style={{ fontWeight: 600 }}>Weekly Spending</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="period" 
                    tick={{ fill: '#64748B', fontSize: 12 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                  />
                  <YAxis 
                    tick={{ fill: '#64748B', fontSize: 12 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="amount" fill="#16A34A" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-[16px] p-4 shadow-[0px_8px_24px_rgba(0,0,0,0.06)]">
            <h3 className="text-[16px] mb-4" style={{ fontWeight: 600 }}>Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-[#64748B]">Highest Week</span>
                <span className="text-[14px]" style={{ fontWeight: 600 }}>Week 4 - ₹16,640</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-[#64748B]">Lowest Week</span>
                <span className="text-[14px]" style={{ fontWeight: 600 }}>Week 1 - ₹8,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-[#64748B]">Average Weekly</span>
                <span className="text-[14px]" style={{ fontWeight: 600 }}>₹13,085</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
