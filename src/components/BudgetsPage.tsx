import React from 'react';
import { 
  Plus, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp,
  ChevronRight,
  Edit3
} from 'lucide-react';
import { cn, formatCurrency } from '../utils';
import { motion } from 'motion/react';

const budgets = [
  { category: 'Food & Dining', allocated: 600, spent: 450, color: '#0ea5e9' },
  { category: 'Rent & Utilities', allocated: 1500, spent: 1500, color: '#6366f1' },
  { category: 'Entertainment', allocated: 200, spent: 180, color: '#ec4899' },
  { category: 'Shopping', allocated: 500, spent: 620, color: '#f43f5e' },
  { category: 'Transport', allocated: 300, spent: 120, color: '#f59e0b' },
];

export const BudgetsPage: React.FC = () => {
  const totalAllocated = budgets.reduce((acc, b) => acc + b.allocated, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const remaining = totalAllocated - totalSpent;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Budgets</h2>
          <p className="text-sm text-slate-500">Plan your spending and save more</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-brand-700 transition-all shadow-sm">
          <Plus className="w-4 h-4" />
          Add Budget
        </button>
      </div>

      {/* Monthly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Allocated</p>
          <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(totalAllocated)}</h3>
          <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-brand-500 w-full" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Spent</p>
          <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(totalSpent)}</h3>
          <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-brand-500" style={{ width: `${(totalSpent / totalAllocated) * 100}%` }} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Remaining</p>
          <h3 className={cn("text-2xl font-bold", remaining >= 0 ? "text-emerald-600" : "text-red-600")}>
            {formatCurrency(remaining)}
          </h3>
          <p className="text-xs text-slate-500 mt-2">You have {Math.round((remaining / totalAllocated) * 100)}% of your budget left</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Category Budget Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {budgets.map((budget, i) => {
            const percent = Math.min((budget.spent / budget.allocated) * 100, 100);
            const isOver = budget.spent > budget.allocated;
            return (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                key={budget.category} 
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: budget.color }}></div>
                    <h4 className="font-bold text-slate-900">{budget.category}</h4>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Spent</p>
                    <p className="text-lg font-bold text-slate-900">{formatCurrency(budget.spent)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Budget</p>
                    <p className="text-sm font-medium text-slate-600">{formatCurrency(budget.allocated)}</p>
                  </div>
                </div>

                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    className={cn("h-full rounded-full", isOver ? "bg-red-500" : "bg-brand-500")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide",
                    isOver ? "bg-red-50 text-red-600" : percent > 90 ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                  )}>
                    {isOver ? 'Over Limit' : percent > 90 ? 'Near Limit' : 'On Track'}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{Math.round(percent)}% used</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AI Suggestions Panel */}
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-brand-400" />
              <h3 className="text-lg font-bold">AI Budget Suggestions</h3>
            </div>
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-sm text-slate-300 mb-3">Based on your last 3 months, we suggest increasing your Groceries budget by ₱50 and reducing Entertainment by ₱30.</p>
                <button className="w-full py-2 bg-brand-600 hover:bg-brand-700 rounded-lg text-xs font-bold transition-colors">Apply Suggestion</button>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-sm text-slate-300 mb-3">You consistently spend less on Transport. You could reallocate ₱40 to your Savings Goal.</p>
                <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors">Learn More</button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Budget Alerts
            </h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-1 h-10 bg-red-500 rounded-full shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Shopping Limit Exceeded</p>
                  <p className="text-xs text-slate-500">You are ₱120 over your monthly limit.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-1 h-10 bg-amber-500 rounded-full shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Entertainment Near Limit</p>
                  <p className="text-xs text-slate-500">You have ₱20 left for this month.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
