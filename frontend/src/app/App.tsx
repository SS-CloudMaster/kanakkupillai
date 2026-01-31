import { useState } from 'react';
import { Toaster } from '@/app/components/ui/sonner';
import { BottomNavigation } from '@/app/components/BottomNavigation';
import { Dashboard } from '@/app/components/screens/Dashboard';
import { ScanBill } from '@/app/components/screens/ScanBill';
import { Analytics } from '@/app/components/screens/Analytics';
import { AIInsights } from '@/app/components/screens/AIInsights';
import { Settings } from '@/app/components/screens/Settings';
import { AddExpense } from '@/app/components/screens/AddExpense';
import { IncomeInvestments } from '@/app/components/screens/IncomeInvestments';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showIncomeScreen, setShowIncomeScreen] = useState(false);

  const renderScreen = () => {
    if (showIncomeScreen) {
      return <IncomeInvestments onBack={() => setShowIncomeScreen(false)} />;
    }
    
    switch (activeTab) {
      case 'home':
        return <Dashboard onAddExpense={() => setShowAddExpense(true)} onViewIncome={() => setShowIncomeScreen(true)} />;
      case 'analytics':
        return <Analytics />;
      case 'scan':
        return <ScanBill />;
      case 'insights':
        return <AIInsights />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onAddExpense={() => setShowAddExpense(true)} onViewIncome={() => setShowIncomeScreen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-[375px] min-h-screen bg-[#F8FAFC] relative shadow-2xl">
        {/* Content Area with safe padding */}
        <div className="px-4 pt-6 pb-4">
          {renderScreen()}
        </div>

        {/* Bottom Navigation - hide when viewing income screen */}
        {!showIncomeScreen && (
          <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        )}

        {/* Add Expense Modal */}
        {showAddExpense && <AddExpense onClose={() => setShowAddExpense(false)} />}

        {/* Toast Notifications */}
        <Toaster position="top-center" />
      </div>
    </div>
  );
}