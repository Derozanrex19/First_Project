import React from 'react';
import { Bell, Search, Plus, User, Calendar } from 'lucide-react';
import { cn } from '../utils';

interface HeaderProps {
  onQuickAdd: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onQuickAdd }) => {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-bottom border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search transactions, insights..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
          <Calendar className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-medium text-slate-700">October 2023</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onQuickAdd}
          className="hidden md:flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm shadow-brand-200"
        >
          <Plus className="w-4 h-4" />
          Quick Add
        </button>
        
        <div className="relative">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>

        <div className="h-8 w-px bg-slate-200 mx-2"></div>

        <button className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-300">
            <User className="w-5 h-5 text-slate-500" />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-slate-900">Alex Johnson</p>
            <p className="text-[10px] text-slate-500">Premium Plan</p>
          </div>
        </button>
      </div>
    </header>
  );
};
