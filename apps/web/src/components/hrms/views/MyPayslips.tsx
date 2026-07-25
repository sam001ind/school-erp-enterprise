"use client";
import React, { useEffect, useState } from "react";
import { getPayrolls } from "../../../actions/hrms";
import { Download, FileText } from "lucide-react";

export default function MyPayslips() {
  const [payrolls, setPayrolls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // In a real app, this is fetched using session user id.
  // We use current month and year minus 1 to get latest for demo
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  useEffect(() => {
    async function load() {
      // In a real app we'd fetch ALL for the employee, but this demo fetches current month
      const res = await getPayrolls(month, year);
      if (res.success) {
        setPayrolls(res.payrolls || []);
      }
      setLoading(false);
    }
    load();
  }, [month, year]);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading payslips...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {payrolls.map(p => (
          <div key={p.id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl">
                <FileText className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                {p.status}
              </span>
            </div>
            
            <h3 className="text-xl font-bold mb-1">
              {new Date(p.year, p.month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <p className="text-sm text-slate-500 mb-6">Generated on {new Date(p.processedAt).toLocaleDateString()}</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Basic Pay</span>
                <span className="font-medium">${p.basicPay.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Allowances</span>
                <span className="font-medium text-emerald-600">+${p.allowances.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Deductions</span>
                <span className="font-medium text-red-600">-${p.deductions.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-slate-200 dark:border-zinc-800 flex justify-between font-bold text-lg text-blue-600 dark:text-blue-400">
                <span>Net Pay</span>
                <span>${p.netPay.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full py-2.5 bg-slate-50 dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        ))}
        {payrolls.length === 0 && (
          <div className="col-span-3 p-8 text-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl text-slate-500">
            No payslips available for this period.
          </div>
        )}
      </div>
    </div>
  );
}
