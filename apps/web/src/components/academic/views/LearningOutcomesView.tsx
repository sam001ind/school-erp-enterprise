"use client";

import React, { useState } from "react";
import { useAcademic } from "@/lib/AcademicContext";
import { Target, Search, Plus, Network } from "lucide-react";

export default function LearningOutcomesView() {
  const { outcomes, classes } = useAcademic();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOutcomes = outcomes.filter(o => 
    o.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500 dark:text-slate-500" />
          <input 
            type="text" 
            placeholder="Search outcomes by code or description..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button className="bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700">
            <Network className="h-4 w-4" /> View Mapping Matrix
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition-colors flex items-center justify-center gap-2">
            <Plus className="h-4 w-4" /> Add Outcome
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOutcomes.map(outcome => (
          <div key={outcome.id} className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                {outcome.code}
              </span>
              <button className="text-slate-400 dark:text-slate-500 dark:text-slate-500 hover:text-indigo-600 transition-colors"><Target className="h-5 w-5" /></button>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 line-clamp-2 min-h-[56px]">{outcome.description}</h3>
            
            <div className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 rounded-2xl p-4 border border-slate-100 dark:border-zinc-800 dark:border-zinc-700/50">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Mapped Subjects</p>
              <div className="flex flex-wrap gap-2">
                {outcome.mappedSubjects.map(subCode => {
                  return (
                    <span key={subCode} className="px-2.5 py-1 text-xs font-bold rounded-md bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 text-slate-700 dark:text-slate-300 shadow-sm">
                      {subCode}
                    </span>
                  );
                })}
                {outcome.mappedSubjects.length === 0 && (
                  <span className="text-sm text-slate-400 dark:text-slate-500 dark:text-slate-500 italic">No subjects mapped yet.</span>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-full bg-slate-100 dark:bg-zinc-800 rounded-full h-2 min-w-[100px]">
                   <div className="bg-emerald-500 h-2 rounded-full w-[75%]"></div>
                </div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">75% Attained</span>
              </div>
              <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">Edit Mapping</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
