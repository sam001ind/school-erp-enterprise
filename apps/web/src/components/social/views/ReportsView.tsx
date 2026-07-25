"use client";

import { FileText, Download, Filter, Calendar } from "lucide-react";

export default function ReportsView() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white dark:text-slate-100">Custom Reports</h1>
          <p className="text-slate-500 dark:text-slate-400">Generate, schedule, and export performance reports.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
          <FileText className="h-4 w-4" /> Create Report
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 flex gap-4">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md border border-slate-200 dark:border-zinc-800 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300">
            <Calendar className="h-4 w-4 text-slate-400 dark:text-slate-500 dark:text-slate-500" /> Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md border border-slate-200 dark:border-zinc-800 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300">
            <Filter className="h-4 w-4 text-slate-400 dark:text-slate-500 dark:text-slate-500" /> All Accounts
          </button>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-zinc-800 dark:divide-zinc-800">
          {[
            { name: "Monthly Executive Summary", format: "PDF", date: "June 1, 2026", status: "Ready" },
            { name: "Athletics Engagement Q2", format: "CSV", date: "May 28, 2026", status: "Ready" },
            { name: "Admissions Campaign ROI", format: "PDF", date: "May 15, 2026", status: "Ready" }
          ].map((report, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white dark:text-slate-100">{report.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Generated on {report.date} • {report.format}</p>
                </div>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-2 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors">
                <Download className="h-4 w-4" /> Export
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
