import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  ArrowRight,
  Download,
  Calendar,
  Zap,
  Target,
  ShieldCheck
} from 'lucide-react';
import { cn, formatCurrency } from '../utils';
import { motion } from 'motion/react';

export const InsightsPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Financial Insights</h2>
          <p className="text-sm text-slate-500">AI-powered analysis of your spending habits</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-slate-200 p-1 rounded-xl">
            {['Weekly', 'Monthly'].map((t) => (
              <button key={t} className={cn("px-4 py-1.5 text-xs font-bold rounded-lg transition-all", t === 'Monthly' ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:text-slate-700")}>
                {t}
              </button>
            ))}
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* AI Report Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden"
      >
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-brand-500/20 rounded-lg border border-brand-500/30">
                <Sparkles className="w-5 h-5 text-brand-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-400">Monthly Report Summary</span>
            </div>
            <h3 className="text-3xl font-bold leading-tight">Your financial health is <span className="text-emerald-400">improving</span>. You saved ₱450 more than last month.</h3>
            <p className="text-slate-400 leading-relaxed">
              Overall, your spending is well-managed. However, we've detected a significant increase in "Subscription" costs which might need your attention. Your savings rate has increased to 22% of your net income.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Savings Rate</p>
                <p className="text-xl font-bold text-emerald-400">22.4%</p>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Net Worth Growth</p>
                <p className="text-xl font-bold text-emerald-400">+4.2%</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6 space-y-4">
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Key Metrics</h4>
            <div className="space-y-4">
              {[
                { label: 'Avg. Daily Spend', value: '₱82.50', change: '-12%', positive: true },
                { label: 'Fixed Costs', value: '₱1,200.00', change: '0%', positive: true },
                { label: 'Variable Costs', value: '₱950.20', change: '+8%', positive: false },
              ].map((m) => (
                <div key={m.label} className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">{m.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold">{m.value}</span>
                    <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded", m.positive ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400")}>
                      {m.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-600 rounded-full blur-[120px] opacity-20"></div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Spending Changes */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-slate-900">Spending Anomalies & Changes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-red-50 rounded-lg"><TrendingUp className="w-4 h-4 text-red-600" /></div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Increase</span>
              </div>
              <h4 className="font-bold text-slate-900 mb-1">Dining Out</h4>
              <p className="text-sm text-slate-500 mb-4">You spent ₱150 more on restaurants this week compared to your average.</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-400">Impact: High</span>
                <button className="text-xs font-bold text-brand-600 flex items-center gap-1">View Details <ArrowRight className="w-3 h-3" /></button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-emerald-50 rounded-lg"><TrendingDown className="w-4 h-4 text-emerald-600" /></div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Decrease</span>
              </div>
              <h4 className="font-bold text-slate-900 mb-1">Utilities</h4>
              <p className="text-sm text-slate-500 mb-4">Great job! Your electricity bill was 20% lower this month.</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-400">Impact: Medium</span>
                <button className="text-xs font-bold text-brand-600 flex items-center gap-1">View Details <ArrowRight className="w-3 h-3" /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendation Cards */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-900">Recommendations</h3>
          <div className="space-y-4">
            {[
              { title: 'Subscription Alert', desc: 'You have 3 streaming services. Canceling one could save you ₱180/year.', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
              { title: 'Savings Goal', desc: 'Increase your "Vacation" goal by ₱50/mo to reach it by Summer.', icon: Target, color: 'text-blue-600', bg: 'bg-blue-50' },
              { title: 'Security Check', desc: 'We noticed a recurring charge from a service you haven\'t used in 3 months.', icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map((rec) => (
              <div key={rec.title} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex gap-4">
                <div className={cn("p-2 h-fit rounded-lg", rec.bg)}>
                  <rec.icon className={cn("w-4 h-4", rec.color)} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{rec.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{rec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
