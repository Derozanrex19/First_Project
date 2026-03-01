import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  ChevronDown,
  Calendar,
  Tag,
  CreditCard
} from 'lucide-react';
import { cn, formatCurrency } from '../utils';
import { Transaction } from '../types';
import { motion } from 'motion/react';

const mockTransactions: Transaction[] = [
  { id: '1', date: '2023-10-24', merchant: 'Starbucks', category: 'Food', account: 'Chase Bank', amount: -12.50, status: 'completed' },
  { id: '2', date: '2023-10-23', merchant: 'Apple Store', category: 'Electronics', account: 'Apple Card', amount: -1299.00, status: 'completed' },
  { id: '3', date: '2023-10-22', merchant: 'Salary Deposit', category: 'Income', account: 'Chase Bank', amount: 4500.00, status: 'completed' },
  { id: '4', date: '2023-10-21', merchant: 'Netflix', category: 'Entertainment', account: 'GCash', amount: -15.99, status: 'pending' },
  { id: '5', date: '2023-10-20', merchant: 'Shell Gas', category: 'Transport', account: 'Cash', amount: -45.00, status: 'completed' },
  { id: '6', date: '2023-10-19', merchant: 'Whole Foods', category: 'Groceries', account: 'Chase Bank', amount: -156.20, status: 'flagged' },
];

export const TransactionsPage: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Transactions</h2>
          <p className="text-sm text-slate-500">Manage and categorize your spending</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-xl text-sm font-medium hover:bg-brand-700 transition-all shadow-sm">
            Add Transaction
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search merchant, category..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100">
            <Calendar className="w-3.5 h-3.5" />
            Last 30 Days
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100">
            <Tag className="w-3.5 h-3.5" />
            Category
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100">
            <CreditCard className="w-3.5 h-3.5" />
            Account
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedRows.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-50 border border-brand-100 p-3 rounded-xl flex items-center justify-between"
        >
          <span className="text-sm font-medium text-brand-700">{selectedRows.length} transactions selected</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-white text-slate-700 rounded-lg text-xs font-bold border border-slate-200 hover:bg-slate-50">Re-categorize</button>
            <button className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-bold hover:bg-red-600">Delete</button>
          </div>
        </motion.div>
      )}

      {/* Transaction Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="p-4 w-10">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" 
                    onChange={(e) => setSelectedRows(e.target.checked ? mockTransactions.map(t => t.id) : [])}
                    checked={selectedRows.length === mockTransactions.length}
                  />
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Merchant</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Account</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                  <td className="p-4">
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" 
                      checked={selectedRows.includes(t.id)}
                      onChange={() => toggleSelect(t.id)}
                    />
                  </td>
                  <td className="p-4 text-sm text-slate-600">{t.date}</td>
                  <td className="p-4 text-sm font-semibold text-slate-900">{t.merchant}</td>
                  <td className="p-4">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide",
                      t.category === 'Income' ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-600"
                    )}>
                      {t.category}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-500">{t.account}</td>
                  <td className={cn("p-4 text-sm font-bold", t.amount > 0 ? "text-emerald-600" : "text-slate-900")}>
                    {formatCurrency(t.amount)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <div className={cn("w-1.5 h-1.5 rounded-full", 
                        t.status === 'completed' ? "bg-emerald-500" : t.status === 'pending' ? "bg-amber-500" : "bg-red-500"
                      )}></div>
                      <span className="text-xs text-slate-500 capitalize">{t.status}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
          <span className="text-sm text-slate-500">Showing 1-10 of 128 transactions</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
