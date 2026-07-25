"use client";

import React, { useState } from "react";
import { Layers, Library, Users, Network, ChevronDown, Check, Plus, Calendar as CalendarIcon, Trash2, Power } from "lucide-react";
import { useGlobalSystem } from "@/lib/GlobalSystemContext";

export default function AcademicStructureView() {
  const [activeTab, setActiveTab] = useState("terms");
  const { academicYears, activeYearId, addAcademicYear, deleteAcademicYear, markYearAsCurrent } = useGlobalSystem();
  const [showAddYear, setShowAddYear] = useState(false);
  const [newYear, setNewYear] = useState({ name: "", startDate: "", endDate: "" });

  const handleAddYear = () => {
    if (newYear.name && newYear.startDate && newYear.endDate) {
      addAcademicYear(newYear);
      setShowAddYear(false);
      setNewYear({ name: "", startDate: "", endDate: "" });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header / Navigation */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab("hierarchy")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'hierarchy' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800'}`}
          >
            Academic Hierarchy
          </button>
          <button 
            onClick={() => setActiveTab("departments")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'departments' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800'}`}
          >
            Departments & Programs
          </button>
          <button 
            onClick={() => setActiveTab("terms")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'terms' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800'}`}
          >
            Terms & Semesters
          </button>
        </div>
        
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-md transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Structure Node
        </button>
      </div>

      {activeTab === "hierarchy" && (
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row gap-8">
          
          {/* Visual Hierarchy Tree Mockup */}
          <div className="flex-1 border-r border-slate-100 dark:border-zinc-800 pr-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Network className="h-6 w-6 text-indigo-500" />
              Global Hierarchy Map
            </h2>
            
            <div className="space-y-4 font-medium text-sm">
              {/* Level 1 */}
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">1</div>
                <div className="flex-1 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 p-3 rounded-xl border border-slate-200 dark:border-zinc-800 dark:border-zinc-700">Institution: Enterprise School</div>
              </div>
              
              {/* Level 2 */}
              <div className="flex items-center gap-3 ml-6">
                <div className="w-4 border-t-2 border-slate-200 dark:border-zinc-800 dark:border-zinc-700"></div>
                <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">2</div>
                <div className="flex-1 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 p-3 rounded-xl border border-slate-200 dark:border-zinc-800 dark:border-zinc-700">Program: Senior Secondary (CBSE)</div>
              </div>

              {/* Level 3 */}
              <div className="flex items-center gap-3 ml-12">
                <div className="w-4 border-t-2 border-slate-200 dark:border-zinc-800 dark:border-zinc-700"></div>
                <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">3</div>
                <div className="flex-1 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 p-3 rounded-xl border border-slate-200 dark:border-zinc-800 dark:border-zinc-700">Department: Science Stream</div>
              </div>

              {/* Level 4 */}
              <div className="flex items-center gap-3 ml-18">
                <div className="w-4 border-t-2 border-slate-200 dark:border-zinc-800 dark:border-zinc-700"></div>
                <div className="h-8 w-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">4</div>
                <div className="flex-1 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 p-3 rounded-xl border border-slate-200 dark:border-zinc-800 dark:border-zinc-700">Class: 11th Grade</div>
              </div>

              {/* Level 5 */}
              <div className="flex items-center gap-3 ml-24">
                <div className="w-4 border-t-2 border-slate-200 dark:border-zinc-800 dark:border-zinc-700"></div>
                <div className="h-8 w-8 rounded-lg bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">5</div>
                <div className="flex-1 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 p-3 rounded-xl border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 flex justify-between">
                  <span>Section: 11-A (Batch 2026)</span>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Setup Guidelines */}
          <div className="w-80">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Structure Configuration</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              The hierarchy defined here will automatically propagate across the entire ERP, affecting fee structures, timetables, and exam generation.
            </p>
            
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 p-4 rounded-xl border border-slate-200 dark:border-zinc-800 dark:border-zinc-700">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Academic Year Sync</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Ensure current active year matches.</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 2026-2027 Active
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 p-4 rounded-xl border border-slate-200 dark:border-zinc-800 dark:border-zinc-700">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Batch Promotions</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Automated end-of-year promotion rules.</p>
                <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Configure Rules →</button>
              </div>
            </div>
          </div>

        </div>
      )}

      {activeTab === "terms" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Academic Years Configuration</h2>
              <button onClick={() => setShowAddYear(true)} className="px-4 py-2 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-indigo-100 transition-colors">
                <Plus className="h-4 w-4" /> Add Academic Year
              </button>
            </div>

            {showAddYear && (
              <div className="mb-8 p-6 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl bg-indigo-50/50 dark:bg-indigo-900/10">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Create New Academic Year</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Year Name</label>
                    <input type="text" value={newYear.name} onChange={e => setNewYear({...newYear, name: e.target.value})} placeholder="e.g. AY 2027-2028" className="w-full bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Start Date</label>
                    <input type="date" value={newYear.startDate} onChange={e => setNewYear({...newYear, startDate: e.target.value})} className="w-full bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">End Date</label>
                    <input type="date" value={newYear.endDate} onChange={e => setNewYear({...newYear, endDate: e.target.value})} className="w-full bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-500" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleAddYear} className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-md hover:bg-indigo-700">Save Academic Year</button>
                  <button onClick={() => setShowAddYear(false)} className="px-4 py-2 bg-slate-200 text-slate-700 dark:text-slate-300 dark:bg-zinc-800 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-300 transition-colors">Cancel</button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {academicYears.map(year => (
                <div key={year.id} className={`p-6 border rounded-2xl relative overflow-hidden transition-all ${year.isCurrent ? 'border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-900/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'border-slate-200 dark:border-zinc-800 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50'}`}>
                  {year.isCurrent && <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl"></div>}
                  
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                      <CalendarIcon className={`h-5 w-5 ${year.isCurrent ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-500 dark:text-slate-500'}`} />
                      {year.name}
                    </h3>
                    {year.isCurrent && (
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 text-xs font-bold rounded flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                    {year.startDate} to {year.endDate}
                  </p>

                  <div className="flex gap-2">
                    {!year.isCurrent && (
                      <button onClick={() => markYearAsCurrent(year.id)} className="flex-1 py-2 bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 flex items-center justify-center gap-1 transition-colors">
                        <Power className="h-3 w-3" /> Set as Default
                      </button>
                    )}
                    <button onClick={() => deleteAcademicYear(year.id)} className="p-2 bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl text-slate-400 dark:text-slate-500 dark:text-slate-500 hover:text-rose-500 hover:border-rose-200 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm opacity-50 pointer-events-none">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Term Configurations (Locked)</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Please set an Academic Year as default to configure its internal terms.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 rounded-2xl bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
                 <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Term 1 (Fall)</h3>
                 <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">August 15, 2026 - December 20, 2026</p>
                 <div className="flex gap-2">
                   <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg">90 Working Days</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
