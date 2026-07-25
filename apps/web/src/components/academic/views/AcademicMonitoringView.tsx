"use client";

import React, { useState } from "react";
import { useAcademic } from "@/lib/AcademicContext";
import { Activity, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";

export default function AcademicMonitoringView() {
  const { classes } = useAcademic();
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-2">
          <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === 'all' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800'}`}>All Classes</button>
          <button onClick={() => setFilter("critical")} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === 'critical' ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-300 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800'}`}>Needs Attention</button>
        </div>
        
        <button className="w-full md:w-auto bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700">
          <RefreshCw className="h-4 w-4" /> Refresh Data
        </button>
      </div>

      {/* Grid of Class Trackers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {classes.map(c => {
          // Calculate overall syllabus completion for this class based on lesson plans
          let totalPlans = 0;
          let completedPlans = 0;
          c.subjects.forEach(sub => {
            totalPlans += sub.lessonPlans.length;
            completedPlans += sub.lessonPlans.filter(lp => lp.completed).length;
          });
          const completionPercentage = totalPlans === 0 ? 0 : Math.round((completedPlans / totalPlans) * 100);
          
          // Determine status color
          const isCritical = completionPercentage < 50 && totalPlans > 0;
          const statusColor = isCritical ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';

          if (filter === "critical" && !isCritical) return null;

          return (
            <div key={c.id} className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{c.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Class Incharge: Prof. Michael Chang</p>
                </div>
                <div className={`p-2 rounded-xl flex items-center gap-2 font-bold ${statusColor}`}>
                  {isCritical ? <AlertTriangle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                  {completionPercentage}%
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Subject Breakdown</p>
                {c.subjects.map(sub => {
                  const subTotal = sub.lessonPlans.length;
                  const subCompleted = sub.lessonPlans.filter(lp => lp.completed).length;
                  const subPct = subTotal === 0 ? 0 : Math.round((subCompleted / subTotal) * 100);
                  
                  return (
                    <div key={sub.id} className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 p-4 rounded-xl border border-slate-100 dark:border-zinc-800 dark:border-zinc-700">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-bold text-slate-900 dark:text-white">{sub.name}</span>
                        <span className="text-slate-500 dark:text-slate-400 font-semibold">{subCompleted}/{subTotal} Plans</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-zinc-900 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${subPct < 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                          style={{ width: `${subPct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                 <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                   <Activity className="h-4 w-4 text-indigo-500" /> Last updated: 2 hours ago
                 </div>
                 <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">View Detailed Report</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
