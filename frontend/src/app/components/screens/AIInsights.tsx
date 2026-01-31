import { AlertCircle, Lightbulb, TrendingUp, Target, DollarSign, ShoppingBag } from 'lucide-react';

export function AIInsights() {
  const insights = [
    {
      type: 'alert',
      icon: AlertCircle,
      color: '#DC2626',
      bgColor: '#FEE2E2',
      title: 'High Spending Alert',
      description: 'Your shopping expenses are 23% higher than last month. Consider reducing non-essential purchases.',
      action: 'View Details',
    },
    {
      type: 'recommendation',
      icon: Lightbulb,
      color: '#16A34A',
      bgColor: '#DCFCE7',
      title: 'Save ₹5,000 this month',
      description: 'Based on your spending pattern, reducing dining out by 30% can help you reach your savings goal.',
      action: 'Set Reminder',
    },
    {
      type: 'prediction',
      icon: TrendingUp,
      color: '#2563EB',
      bgColor: '#DBEAFE',
      title: 'Monthly Forecast',
      description: 'At your current spending rate, you\'ll likely spend ₹54,200 by month end. That\'s ₹4,200 over budget.',
      action: 'Adjust Budget',
    },
    {
      type: 'recommendation',
      icon: Target,
      color: '#16A34A',
      bgColor: '#DCFCE7',
      title: 'Goal Progress: 65%',
      description: 'You\'re on track to save ₹32,500 this month. Keep up the good work! Just ₹10,000 more to reach your goal.',
      action: null,
    },
    {
      type: 'alert',
      icon: DollarSign,
      color: '#EA580C',
      bgColor: '#FFEDD5',
      title: 'Unusual Transaction Detected',
      description: 'A transaction of ₹12,500 at Electronics Store is higher than your usual spending pattern.',
      action: 'Review',
    },
    {
      type: 'recommendation',
      icon: ShoppingBag,
      color: '#16A34A',
      bgColor: '#DCFCE7',
      title: 'Cashback Opportunity',
      description: 'You can save ₹850 by using your credit card for grocery shopping. 5% cashback available.',
      action: 'Learn More',
    },
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[24px]" style={{ fontWeight: 600 }}>AI Insights</h1>
        <p className="text-[#64748B] text-[14px]">Smart recommendations for you</p>
      </div>

      {/* Insights Grid */}
      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-[16px] p-4 shadow-[0px_8px_24px_rgba(0,0,0,0.06)]"
              style={{ borderLeft: `4px solid ${insight.color}` }}
            >
              <div className="flex gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: insight.bgColor }}
                >
                  <Icon className="w-5 h-5" style={{ color: insight.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] mb-1" style={{ fontWeight: 600 }}>
                    {insight.title}
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    {insight.description}
                  </p>
                  {insight.action && (
                    <button
                      className="text-[13px] px-4 py-2 rounded-lg"
                      style={{
                        color: insight.color,
                        backgroundColor: insight.bgColor,
                        fontWeight: 600,
                      }}
                    >
                      {insight.action}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Card */}
      <div className="mt-6 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-[16px] p-4 text-white shadow-[0px_8px_24px_rgba(0,0,0,0.06)]">
        <h3 className="text-[16px] mb-2" style={{ fontWeight: 600 }}>
          💡 Pro Tip
        </h3>
        <p className="text-[13px] opacity-90 leading-relaxed">
          Based on your spending habits, setting up automatic transfers of ₹10,000 to savings
          on the 1st of every month can help you build wealth consistently.
        </p>
      </div>
    </div>
  );
}
