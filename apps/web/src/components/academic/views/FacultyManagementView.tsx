"use client";

import React, { useState } from "react";
import { useAcademic } from "@/lib/AcademicContext";
import { Users, Search, Briefcase, Plus } from "lucide-react";

export default function FacultyManagementView() {
  const { faculty } = useAcademic();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaculty = faculty.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500 dark:text-slate-500" />
          <input 
            type="text" 
            placeholder="Search faculty by name or department..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        
        <button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition-colors flex items-center justify-center gap-2">
          <Plus className="h-4 w-4" /> Allocate Workload
        </button>
      </div>

      {/* Faculty List */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 border-b border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Faculty Name</th>
                <th className="px-6 py-4 font-bold">Department</th>
                <th className="px-6 py-4 font-bold">Workload Status</th>
                <th className="px-6 py-4 font-bold">Teaching Hours</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-zinc-800 dark:divide-zinc-800 dark:divide-zinc-800">
              {filteredFaculty.map(fac => {
                const loadPercent = Math.round((fac.currentHours / fac.maxHours) * 100);
                const isOverloaded = loadPercent >= 100;
                
                return (
                  <tr key={fac.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                          {fac.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{fac.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{fac.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 dark:bg-zinc-800 dark:text-slate-300">
                        <Briefcase className="h-3 w-3" /> {fac.department}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden max-w-[120px]">
                          <div 
                            className={`h-full rounded-full ${isOverloaded ? 'bg-red-500' : loadPercent > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${Math.min(loadPercent, 100)}%` }}
                          ></div>
                        </div>
                        <span className={`text-xs font-bold ${isOverloaded ? 'text-red-500' : 'text-slate-600 dark:text-slate-300 dark:text-slate-400'}`}>
                          {loadPercent}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{fac.currentHours} / {fac.maxHours} hrs</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-semibold">
                        Edit Schedule
                      </button>
                    </td>
                  </tr>
                );
              })}
              
              {filteredFaculty.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    <Users className="h-10 w-10 mx-auto mb-3 text-slate-300 dark:text-zinc-600" />
                    No faculty found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
