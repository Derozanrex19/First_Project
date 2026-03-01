import React from 'react';
import { 
  User, 
  CreditCard, 
  Tag, 
  Moon, 
  Bell, 
  Database, 
  Shield, 
  ChevronRight,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Mail,
  Lock,
  Palette
} from 'lucide-react';
import { cn } from '../utils';
import { motion } from 'motion/react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <p className="text-sm text-slate-500">Manage your account and app preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Navigation Rail */}
        <nav className="space-y-1">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'accounts', label: 'Accounts', icon: CreditCard },
            { id: 'categories', label: 'Categories', icon: Tag },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'appearance', label: 'Appearance', icon: Palette },
            { id: 'data', label: 'Data & Privacy', icon: Database },
          ].map((item) => (
            <button key={item.id} className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
              item.id === 'profile' ? "bg-brand-50 text-brand-600" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-12">
          {/* Profile Settings */}
          <section className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-slate-400" />
              Profile Settings
            </h3>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center relative group cursor-pointer">
                  <User className="w-10 h-10 text-slate-400" />
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit2 className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Alex Johnson</h4>
                  <p className="text-sm text-slate-500">Joined October 2023</p>
                  <button className="mt-2 text-xs font-bold text-brand-600 hover:underline">Change Avatar</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                  <input type="text" defaultValue="Alex Johnson" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <input type="email" defaultValue="alex@example.com" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 transition-all" />
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <button className="px-6 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-bold hover:bg-brand-700 transition-all">Save Changes</button>
                <button className="px-6 py-2.5 bg-white text-slate-600 border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">Cancel</button>
              </div>
            </div>
          </section>

          {/* Account Management */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-slate-400" />
                Linked Accounts
              </h3>
              <button className="text-xs font-bold text-brand-600 flex items-center gap-1 hover:underline">
                <Plus className="w-3 h-3" /> Add Account
              </button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Chase Checking', type: 'Bank', balance: 4500.50, icon: '🏦' },
                { name: 'GCash Wallet', type: 'Digital Wallet', balance: 1250.00, icon: '📱' },
                { name: 'Physical Cash', type: 'Cash', balance: 320.00, icon: '💵' },
              ].map((acc) => (
                <div key={acc.name} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-xl">{acc.icon}</div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{acc.name}</h4>
                      <p className="text-xs text-slate-500">{acc.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">₱{acc.balance.toLocaleString()}</p>
                      <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Active</p>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Notification Preferences */}
          <section className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-slate-400" />
              Notifications
            </h3>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100">
                {[
                  { title: 'Weekly Summary', desc: 'Receive a weekly report of your spending habits.', enabled: true },
                  { title: 'Budget Alerts', desc: 'Get notified when you reach 80% of your budget.', enabled: true },
                  { title: 'Overspending Warning', desc: 'Immediate alert if a transaction exceeds your limit.', enabled: false },
                  { title: 'AI Insights', desc: 'Personalized financial advice based on your data.', enabled: true },
                ].map((pref) => (
                  <div key={pref.title} className="p-6 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{pref.title}</h4>
                      <p className="text-xs text-slate-500">{pref.desc}</p>
                    </div>
                    <button className={cn(
                      "w-11 h-6 rounded-full transition-all relative",
                      pref.enabled ? "bg-brand-600" : "bg-slate-200"
                    )}>
                      <div className={cn(
                        "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                        pref.enabled ? "right-1" : "left-1"
                      )}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Data Management */}
          <section className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-slate-400" />
              Privacy & Data
            </h3>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-slate-400" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Export All Data</h4>
                    <p className="text-xs text-slate-500">Download your entire history in CSV format.</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all">Export</button>
              </div>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-red-400" />
                  <div>
                    <h4 className="text-sm font-bold text-red-900">Delete Account</h4>
                    <p className="text-xs text-red-600">Permanently remove all your data and account.</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white border border-red-200 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-all">Delete</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
