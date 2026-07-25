"use client";

import React, { useState } from "react";
import { useAcademic } from "@/lib/AcademicContext";
import { BookOpen, Search, Plus, Filter, Edit2, Trash2 } from "lucide-react";

export default function CurriculumManagementView() {
  const { classes } = useAcademic();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Flatten all subjects for the master view
  const allSubjects = classes.flatMap(c => c.subjects.map(s => ({ ...s, className: c.name })));
  
  const filteredSubjects = allSubjects.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header Controls */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500 dark:text-slate-500" />
          <input 
            type="text" 
            placeholder="Search subjects or codes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700">
            <Filter className="h-4 w-4" /> Filter
          </button>
          <button className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition-colors flex items-center justify-center gap-2">
            <Plus className="h-4 w-4" /> Add Subject
          </button>
        </div>
      </div>

      {/* Curriculum Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map(subject => (
          <div key={subject.id} className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
            <div className={`h-2 w-full ${subject.type === 'Core' ? 'bg-indigo-500' : 'bg-emerald-500'}`}></div>
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className={`px-2 py-1 text-xs font-bold rounded-md border ${subject.type === 'Core' ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800' : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800'}`}>
                  {subject.type}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{subject.name}</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">{subject.code} • {subject.className}</p>
              
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">Credits</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{subject.credits}</span>
                </div>
                <div className="w-px bg-slate-200 dark:bg-zinc-700"></div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">Topics</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{subject.lessonPlans.length}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/30 p-4 flex justify-between items-center">
               <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                 Manage Syllabus →
               </button>
               <div className="flex gap-2">
                 <button className="p-1.5 text-slate-400 dark:text-slate-500 dark:text-slate-500 hover:text-indigo-600 transition-colors"><Edit2 className="h-4 w-4" /></button>
                 <button className="p-1.5 text-slate-400 dark:text-slate-500 dark:text-slate-500 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
               </div>
            </div>
          </div>
        ))}

        {filteredSubjects.length === 0 && (
          <div className="col-span-full border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <BookOpen className="h-12 w-12 text-slate-300 dark:text-zinc-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Subjects Found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your search filters or add a new subject.</p>
          </div>
        )}
      </div>
    </div>
  );
}
