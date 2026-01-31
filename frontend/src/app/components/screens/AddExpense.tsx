import { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface AddExpenseProps {
  onClose: () => void;
}

const API_URL = "http://127.0.0.1:8000";

export function AddExpense({ onClose }: AddExpenseProps) {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    paidBy: 'Yuvraj',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });
  const [splitExpense, setSplitExpense] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!formData.amount) {
      toast.error('Please enter an amount');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          category: formData.category,
          paid_by: formData.paidBy,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add expense');
      }

      toast.success('Expense added successfully!');
      onClose();
      // Reload the page to refresh dashboard data
      window.location.reload();
    } catch (error) {
      console.error('Error adding expense:', error);
      toast.error('Failed to add expense. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-[#F8FAFC] w-full max-w-[375px] rounded-t-[24px] pb-6 animate-slide-up max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E2E8F0] flex-shrink-0">
          <h2 className="text-[20px]" style={{ fontWeight: 600 }}>Add Expense</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#F1F5F9] rounded-full">
            <X className="w-5 h-5 text-[#64748B]" />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {/* Amount Input */}
          <div>
            <label className="text-[12px] text-[#64748B] block mb-2" style={{ fontWeight: 500 }}>
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[32px] text-[#64748B]">₹</span>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0"
                className="w-full pl-12 pr-4 py-4 bg-white rounded-[16px] text-[32px] border-2 border-transparent focus:border-[#2563EB] outline-none shadow-sm"
                style={{ fontWeight: 600 }}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-[12px] text-[#64748B] block mb-2" style={{ fontWeight: 500 }}>
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-white rounded-[16px] text-[14px] border-2 border-transparent focus:border-[#2563EB] outline-none shadow-sm"
            >
              <option>Food</option>
              <option>Transport</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Entertainment</option>
              <option>Health</option>
              <option>Education</option>
              <option>Others</option>
            </select>
          </div>

          {/* Paid By */}
          <div>
            <label className="text-[12px] text-[#64748B] block mb-2" style={{ fontWeight: 500 }}>
              Paid By
            </label>
            <select
              value={formData.paidBy}
              onChange={(e) => setFormData({ ...formData, paidBy: e.target.value })}
              className="w-full px-4 py-3 bg-white rounded-[16px] text-[14px] border-2 border-transparent focus:border-[#2563EB] outline-none shadow-sm"
            >
              <option>Yuvraj</option>
              <option>Roommate 1</option>
              <option>Roommate 2</option>
              <option>Friend</option>
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label className="text-[12px] text-[#64748B] block mb-2" style={{ fontWeight: 500 }}>
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 bg-white rounded-[16px] text-[14px] border-2 border-transparent focus:border-[#2563EB] outline-none shadow-sm"
              />
              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] pointer-events-none" />
            </div>
          </div>

          {/* Split Expense Toggle */}
          <div className="bg-white rounded-[16px] p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px]" style={{ fontWeight: 600 }}>Split Expense</p>
                <p className="text-[12px] text-[#64748B] mt-1">Divide with others</p>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={splitExpense}
                  onChange={(e) => setSplitExpense(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-[#CBD5E1] rounded-full peer-checked:bg-[#2563EB] transition-colors cursor-pointer" />
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
              </label>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-[12px] text-[#64748B] block mb-2" style={{ fontWeight: 500 }}>
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add a note..."
              rows={3}
              className="w-full px-4 py-3 bg-white rounded-[16px] text-[14px] border-2 border-transparent focus:border-[#2563EB] outline-none resize-none shadow-sm"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className="w-full bg-[#2563EB] text-white py-4 rounded-full text-[16px] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontWeight: 600 }}
          >
            {isSubmitting ? 'Saving...' : 'Save Expense'}
          </button>
        </div>
      </div>
    </div>
  );
}