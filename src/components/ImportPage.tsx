import React, { useState } from 'react';
import { 
  FileUp, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  Table as TableIcon,
  Map,
  FileText
} from 'lucide-react';
import { cn } from '../utils';
import { motion } from 'motion/react';

export const ImportPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Import Transactions</h2>
        <p className="text-sm text-slate-500">Upload your bank statements to automatically track expenses</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between px-4">
        {[
          { num: 1, label: 'Upload', icon: FileUp },
          { num: 2, label: 'Map Columns', icon: Map },
          { num: 3, label: 'Review', icon: TableIcon },
        ].map((s, i) => (
          <React.Fragment key={s.num}>
            <div className="flex flex-col items-center gap-2">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                step === s.num ? "bg-brand-600 text-white shadow-lg shadow-brand-200" : 
                step > s.num ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
              )}>
                {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
              </div>
              <span className={cn("text-xs font-bold uppercase tracking-wider", step === s.num ? "text-brand-600" : "text-slate-400")}>
                {s.label}
              </span>
            </div>
            {i < 2 && <div className={cn("flex-1 h-px mx-4", step > s.num ? "bg-emerald-500" : "bg-slate-200")}></div>}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); setStep(2); }}
            className={cn(
              "border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center transition-all cursor-pointer",
              isDragging ? "border-brand-500 bg-brand-50" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
              <Upload className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Drag and drop your CSV file</h3>
            <p className="text-sm text-slate-500 max-w-xs mx-auto mb-8">Support CSV, XLS, and XLSX files. Max file size 10MB.</p>
            <button 
              onClick={() => setStep(2)}
              className="px-6 py-3 bg-brand-600 text-white rounded-xl font-bold text-sm hover:bg-brand-700 transition-all shadow-sm"
            >
              Select File
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-lg"><FileText className="w-4 h-4 text-blue-600" /></div>
              <div>
                <p className="text-xs font-bold text-slate-900">Standard Format</p>
                <p className="text-[10px] text-slate-500">Download our template for easy mapping.</p>
              </div>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3">
              <div className="p-2 bg-emerald-50 rounded-lg"><CheckCircle2 className="w-4 h-4 text-emerald-600" /></div>
              <div>
                <p className="text-xs font-bold text-slate-900">Auto-Categorize</p>
                <p className="text-[10px] text-slate-500">Our AI will automatically tag your transactions.</p>
              </div>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3">
              <div className="p-2 bg-amber-50 rounded-lg"><AlertCircle className="w-4 h-4 text-amber-600" /></div>
              <div>
                <p className="text-xs font-bold text-slate-900">Secure Import</p>
                <p className="text-[10px] text-slate-500">Your data is encrypted and never shared.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">Map Columns</h3>
            <p className="text-sm text-slate-500">Match your CSV columns to our transaction fields</p>
          </div>
          <div className="p-6 space-y-6">
            {[
              { field: 'Date', required: true, csvColumn: 'Transaction Date' },
              { field: 'Description', required: true, csvColumn: 'Merchant Name' },
              { field: 'Amount', required: true, csvColumn: 'Value' },
              { field: 'Category', required: false, csvColumn: 'Tag' },
              { field: 'Account', required: false, csvColumn: 'None' },
            ].map((item) => (
              <div key={item.field} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-700">{item.field}</span>
                  {item.required && <span className="text-red-500">*</span>}
                </div>
                <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 transition-all">
                  <option>{item.csvColumn}</option>
                  <option>Date</option>
                  <option>Merchant</option>
                  <option>Amount</option>
                  <option>Category</option>
                  <option>None</option>
                </select>
              </div>
            ))}
          </div>
          <div className="p-6 bg-slate-50 flex justify-between">
            <button onClick={() => setStep(1)} className="px-6 py-2 text-sm font-bold text-slate-600 hover:text-slate-900">Back</button>
            <button onClick={() => setStep(3)} className="px-8 py-2 bg-brand-600 text-white rounded-xl font-bold text-sm hover:bg-brand-700 shadow-sm">Continue</button>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Review Import</h3>
                <p className="text-sm text-slate-500">We found 128 transactions in your file</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-600">All fields mapped</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Description</th>
                    <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                    <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Detected Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="text-sm">
                      <td className="p-4 text-slate-600">2023-10-2{i}</td>
                      <td className="p-4 font-semibold text-slate-900">Merchant Example {i}</td>
                      <td className="p-4 font-bold text-slate-900">-₱45.00</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-brand-50 text-brand-600 rounded-lg text-[10px] font-bold uppercase tracking-wide">Shopping</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-slate-50 flex justify-between">
              <button onClick={() => setStep(2)} className="px-6 py-2 text-sm font-bold text-slate-600 hover:text-slate-900">Back</button>
              <button className="px-8 py-2 bg-brand-600 text-white rounded-xl font-bold text-sm hover:bg-brand-700 shadow-sm flex items-center gap-2">
                Confirm Import
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
