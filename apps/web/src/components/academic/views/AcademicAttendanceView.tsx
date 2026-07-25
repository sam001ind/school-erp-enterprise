"use client";

import React, { useState } from "react";
import { useAcademic } from "@/lib/AcademicContext";
import { Users, AlertTriangle, ShieldCheck, Search, Download } from "lucide-react";

export default function AcademicAttendanceView() {
  const { classes } = useAcademic();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500 dark:text-slate-500" />
          <input 
            type="text" 
            placeholder="Search defaulters by name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button className="bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700">
            <Download className="h-4 w-4" /> Export Defaulter List
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-2xl"><Users className="h-8 w-8" /></div>
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Class Strength</p>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">1,420</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-2xl"><ShieldCheck className="h-8 w-8" /></div>
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Avg Attendance</p>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">88.5%</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-2xl"><AlertTriangle className="h-8 w-8" /></div>
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Defaulters (&lt; 75%)</p>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">42</p>
          </div>
        </div>
      </div>

      {/* Defaulter Table */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 shadow-sm rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-zinc-800 flex justify-between items-center bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/30">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Attendance Defaulters</h2>
          <select className="bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 text-sm rounded-lg px-3 py-1.5 outline-none">
            <option>All Classes</option>
            {classes.map(c => <option key={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white dark:bg-zinc-900/50 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Student Name</th>
                <th className="px-6 py-4 font-bold">Class</th>
                <th className="px-6 py-4 font-bold">Overall %</th>
                <th className="px-6 py-4 font-bold">Worst Subject</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 dark:divide-zinc-800 dark:divide-zinc-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40/50 dark:hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">John Doe <span className="block text-xs font-normal text-slate-500 dark:text-slate-400">STU-1029</span></td>
                <td className="px-6 py-4 text-sm">10-A</td>
                <td className="px-6 py-4"><span className="text-red-500 font-bold bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">68%</span></td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 dark:text-slate-400">Mathematics (60%)</td>
                <td className="px-6 py-4 text-right">
                   <button className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 text-sm font-semibold">Send Warning</button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40/50 dark:hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Jane Smith <span className="block text-xs font-normal text-slate-500 dark:text-slate-400">STU-1144</span></td>
                <td className="px-6 py-4 text-sm">11-B</td>
                <td className="px-6 py-4"><span className="text-red-500 font-bold bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">71%</span></td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 dark:text-slate-400">Physics (65%)</td>
                <td className="px-6 py-4 text-right">
                   <button className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 text-sm font-semibold">Send Warning</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
