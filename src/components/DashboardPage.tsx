import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from 'lucide-react';
import { cn, formatCurrency } from '../utils';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from 'motion/react';

const trendData = [
  { name: 'Mon', spending: 120 },
  { name: 'Tue', spending: 80 },
  { name: 'Wed', spending: 250 },
  { name: 'Thu', spending: 150 },
  { name: 'Fri', spending: 300 },
  { name: 'Sat', spending: 450 },
  { name: 'Sun', spending: 200 },
];

const categoryData = [
  { name: 'Food', value: 400, color: '#0ea5e9' },
  { name: 'Rent', value: 1200, color: '#6366f1' },
  { name: 'Transport', value: 300, color: '#f59e0b' },
  { name: 'Entertainment', value: 200, color: '#ec4899' },
];

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Spending', value: 2450.50, change: '+12%', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Remaining Budget', value: 850.00, change: '-5%', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Savings Progress', value: 12500.00, change: '+2%', icon: Target, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Income vs Expenses', value: 1550.20, change: '+8%', icon: TrendingDown, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((card, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={card.label} 
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg", card.bg)}>
                <card.icon className={cn("w-5 h-5", card.color)} />
              </div>
              <span className={cn("text-xs font-medium px-2 py-1 rounded-full", 
                card.change.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
              )}>
                {card.change}
              </span>
            </div>
            <p className="text-sm text-slate-500 font-medium">{card.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{formatCurrency(card.value)}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trend Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Spending Trend</h3>
              <p className="text-sm text-slate-500">Your daily spending habits over the last week</p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              {['Daily', 'Weekly', 'Monthly'].map((t) => (
                <button key={t} className={cn("px-3 py-1 text-xs font-medium rounded-md transition-all", t === 'Daily' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0ea5e9', fontWeight: 600 }}
                />
                <Line type="monotone" dataKey="spending" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-1">Category Breakdown</h3>
          <p className="text-sm text-slate-500 mb-8">Where your money goes</p>
          <div className="h-[240px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-slate-500 font-medium">Total</span>
              <span className="text-xl font-bold text-slate-900">₱2,100</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                  <span className="text-sm text-slate-600">{cat.name}</span>
                </div>
                <span className="text-sm font-semibold text-slate-900">{formatCurrency(cat.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Budget Progress */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Budget Progress</h3>
            <button className="text-sm text-brand-600 font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {[
              { name: 'Food & Dining', spent: 450, limit: 600, color: 'bg-blue-500' },
              { name: 'Entertainment', spent: 180, limit: 200, color: 'bg-pink-500' },
              { name: 'Shopping', spent: 550, limit: 500, color: 'bg-red-500' },
            ].map((budget) => {
              const percent = Math.min((budget.spent / budget.limit) * 100, 100);
              return (
                <div key={budget.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">{budget.name}</span>
                    <span className="text-slate-500">
                      <span className="font-bold text-slate-900">{formatCurrency(budget.spent)}</span> / {formatCurrency(budget.limit)}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={cn("h-full rounded-full", budget.color)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Insights Card */}
        <div className="bg-brand-600 p-6 rounded-2xl text-white shadow-lg shadow-brand-200 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-brand-200" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-100">AI Financial Insight</span>
            </div>
            <p className="text-lg font-medium leading-relaxed mb-6">
              "You've spent 15% more on Dining this week compared to last month. Consider cooking at home for the next 3 days to stay within your budget."
            </p>
            <button className="w-full bg-white text-brand-600 py-3 rounded-xl font-bold text-sm hover:bg-brand-50 transition-colors">
              View Full Report
            </button>
          </div>
          {/* Decorative elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-500 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-400 rounded-full blur-2xl opacity-30"></div>
        </div>
      </div>
    </div>
  );
};
