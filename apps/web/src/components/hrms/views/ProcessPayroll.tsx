"use client";
import React, { useState } from "react";
import { processPayroll, getPayrolls } from "../../../actions/hrms";
import { PlayCircle, Download } from "lucide-react";

export default function ProcessPayroll() {
  const [loading, setLoading] = useState(false);
  const [payrolls, setPayrolls] = useState<any[]>([]);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  async function handleLoad() {
    setLoading(true);
    const res = await getPayrolls(month, year);
    if (res.success) {
      setPayrolls(res.payrolls || []);
    }
    setLoading(false);
  }

  async function handleProcess() {
    if (!confirm(`Are you sure you want to process payroll for ${month}/${year}?`)) return;
    setLoading(true);
    const res = await processPayroll(month, year);
    if (res.success) {
      alert("Payroll processed successfully!");
      setPayrolls(res.payrolls || []);
    } else {
      alert("Error: " + res.error);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row items-end gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Month</label>
          <input type="number" min={1} max={12} value={month} onChange={e => setMonth(Number(e.target.value))} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Year</label>
          <input type="number" min={2020} max={2030} value={year} onChange={e => setYear(Number(e.target.value))} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl" />
        </div>
        <button onClick={handleLoad} className="p-2.5 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded-xl font-medium transition-colors">
          View Existing
        </button>
        <button onClick={handleProcess} disabled={loading} className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors flex items-center gap-2 ml-auto shadow-lg shadow-blue-500/20 disabled:opacity-50">
          <PlayCircle className="w-5 h-5" /> {loading ? "Processing..." : "Run Payroll"}
        </button>
      </div>

      {/* Results Table */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-zinc-800 flex justify-between items-center">
          <h2 className="text-lg font-bold">Processed Payrolls ({payrolls.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-zinc-800/40 text-sm">
                <th className="p-4 font-semibold">Employee</th>
                <th className="p-4 font-semibold">Basic Pay</th>
                <th className="p-4 font-semibold">Allowances</th>
                <th className="p-4 font-semibold">Deductions</th>
                <th className="p-4 font-semibold">Net Pay</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Export</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-sm">
              {payrolls.map(p => (
                <tr key={p.id}>
                  <td className="p-4 font-bold">{p.employee?.user?.name || p.employeeId}</td>
                  <td className="p-4 text-slate-500">${p.basicPay.toFixed(2)}</td>
                  <td className="p-4 text-emerald-600">+${p.allowances.toFixed(2)}</td>
                  <td className="p-4 text-red-600">-${p.deductions.toFixed(2)}</td>
                  <td className="p-4 font-bold text-blue-600 dark:text-blue-400">${p.netPay.toFixed(2)}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">{p.status}</span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-blue-600 rounded-xl transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {payrolls.length === 0 && (
                <tr><td colSpan={7} className="p-8 text-center text-slate-500">No payrolls found for this period. Click "Run Payroll" to generate.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
