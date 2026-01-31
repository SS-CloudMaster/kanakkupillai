import { useState } from 'react';
import { Camera, Check, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function ScanBill() {
  const [scanned, setScanned] = useState(false);
  const [formData, setFormData] = useState({
    vendor: '',
    amount: '',
    date: '',
    category: '',
    paidBy: '',
  });
  const [splitWith, setSplitWith] = useState<Array<{ name: string; amount: string }>>([]);

  const handleScan = () => {
    // Simulate OCR scan
    setScanned(true);
    setFormData({
      vendor: 'Starbucks Coffee',
      amount: '850',
      date: new Date().toISOString().split('T')[0],
      category: 'Food',
      paidBy: 'Yuvraj',
    });
    toast.success('Bill scanned successfully!');
  };

  const handleAddSplit = () => {
    setSplitWith([...splitWith, { name: '', amount: '' }]);
  };

  const handleRemoveSplit = (index: number) => {
    setSplitWith(splitWith.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    toast.success('Expense saved successfully!');
    // Reset form
    setScanned(false);
    setFormData({
      vendor: '',
      amount: '',
      date: '',
      category: '',
      paidBy: '',
    });
    setSplitWith([]);
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[24px]" style={{ fontWeight: 600 }}>Scan Bill</h1>
        <p className="text-[#64748B] text-[14px]">Capture receipt to auto-fill details</p>
      </div>

      {/* Camera Preview */}
      <div className="bg-[#1E293B] rounded-[16px] h-[320px] mb-6 flex items-center justify-center relative overflow-hidden">
        {!scanned ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-48 h-48 border-2 border-dashed border-[#64748B] rounded-lg flex items-center justify-center">
              <Camera className="w-16 h-16 text-[#64748B]" />
            </div>
            <button
              onClick={handleScan}
              className="bg-[#2563EB] text-white px-6 py-3 rounded-full text-[14px] flex items-center gap-2"
              style={{ fontWeight: 600 }}
            >
              <Camera className="w-4 h-4" />
              Capture Receipt
            </button>
          </div>
        ) : (
          <div className="w-full h-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/20 to-[#16A34A]/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3">
                <Check className="w-6 h-6 text-[#16A34A]" />
                <span className="text-[14px]" style={{ fontWeight: 600 }}>Bill Detected!</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detected Fields Card */}
      {scanned && (
        <div className="bg-white rounded-[16px] p-4 shadow-[0px_8px_24px_rgba(0,0,0,0.06)] mb-4">
          <h3 className="text-[16px] mb-4" style={{ fontWeight: 600 }}>Detected Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-[12px] text-[#64748B] block mb-1" style={{ fontWeight: 500 }}>
                Vendor
              </label>
              <input
                type="text"
                value={formData.vendor}
                onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                className="w-full px-3 py-2 bg-[#F1F5F9] rounded-lg text-[14px] border border-transparent focus:border-[#2563EB] outline-none"
              />
            </div>

            <div>
              <label className="text-[12px] text-[#64748B] block mb-1" style={{ fontWeight: 500 }}>
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]">₹</span>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 bg-[#F1F5F9] rounded-lg text-[14px] border border-transparent focus:border-[#2563EB] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[12px] text-[#64748B] block mb-1" style={{ fontWeight: 500 }}>
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 bg-[#F1F5F9] rounded-lg text-[14px] border border-transparent focus:border-[#2563EB] outline-none"
              />
            </div>

            <div>
              <label className="text-[12px] text-[#64748B] block mb-1" style={{ fontWeight: 500 }}>
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-[#F1F5F9] rounded-lg text-[14px] border border-transparent focus:border-[#2563EB] outline-none"
              >
                <option>Food</option>
                <option>Transport</option>
                <option>Shopping</option>
                <option>Bills</option>
                <option>Entertainment</option>
                <option>Health</option>
              </select>
            </div>

            <div>
              <label className="text-[12px] text-[#64748B] block mb-1" style={{ fontWeight: 500 }}>
                Paid By
              </label>
              <select
                value={formData.paidBy}
                onChange={(e) => setFormData({ ...formData, paidBy: e.target.value })}
                className="w-full px-3 py-2 bg-[#F1F5F9] rounded-lg text-[14px] border border-transparent focus:border-[#2563EB] outline-none"
              >
                <option>Yuvraj</option>
                <option>Roommate 1</option>
                <option>Roommate 2</option>
                <option>Friend</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Split Section */}
      {scanned && (
        <div className="bg-white rounded-[16px] p-4 shadow-[0px_8px_24px_rgba(0,0,0,0.06)] mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px]" style={{ fontWeight: 600 }}>Split Expense</h3>
            <button
              onClick={handleAddSplit}
              className="text-[#2563EB] text-[12px] flex items-center gap-1"
              style={{ fontWeight: 600 }}
            >
              <Plus className="w-4 h-4" />
              Add Person
            </button>
          </div>

          {splitWith.length === 0 ? (
            <p className="text-[13px] text-[#64748B] text-center py-4">
              No split added. This is a personal expense.
            </p>
          ) : (
            <div className="space-y-3">
              {splitWith.map((split, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Person name"
                    value={split.name}
                    onChange={(e) => {
                      const newSplits = [...splitWith];
                      newSplits[index].name = e.target.value;
                      setSplitWith(newSplits);
                    }}
                    className="flex-1 px-3 py-2 bg-[#F1F5F9] rounded-lg text-[14px] border border-transparent focus:border-[#2563EB] outline-none"
                  />
                  <div className="relative w-24">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-[12px]">₹</span>
                    <input
                      type="number"
                      placeholder="0"
                      value={split.amount}
                      onChange={(e) => {
                        const newSplits = [...splitWith];
                        newSplits[index].amount = e.target.value;
                        setSplitWith(newSplits);
                      }}
                      className="w-full pl-6 pr-2 py-2 bg-[#F1F5F9] rounded-lg text-[14px] border border-transparent focus:border-[#2563EB] outline-none"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveSplit(index)}
                    className="p-2 text-[#DC2626] hover:bg-[#FEE2E2] rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Save Button */}
      {scanned && (
        <button
          onClick={handleSave}
          className="w-full bg-[#2563EB] text-white py-3 rounded-full text-[16px]"
          style={{ fontWeight: 600 }}
        >
          Save Expense
        </button>
      )}
    </div>
  );
}
