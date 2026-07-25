"use client";

import React from "react";
import { useAcademic } from "@/lib/AcademicContext";
import { FileText, Clock, AlertCircle, Plus } from "lucide-react";

export default function AssignmentsView() {
  const { classes, activeClassId, setActiveClassId, activeSubjectId, setActiveSubjectId } = useAcademic();
  
  const activeClass = classes.find(c => c.id === activeClassId);
  const activeSubject = activeClass?.subjects.find(s => s.id === activeSubjectId);
  const assignments = activeSubject?.assignments || [];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Controls */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-4 w-full md:w-auto">
          <select 
            value={activeClassId}
            onChange={(e) => {
              setActiveClassId(e.target.value);
              const newClass = classes.find(c => c.id === e.target.value);
              if (newClass && newClass.subjects.length > 0) {
                setActiveSubjectId(newClass.subjects[0].id);
              }
            }}
            className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 text-slate-900 dark:text-white rounded-xl px-4 py-2 outline-none focus:border-indigo-500"
          >
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select 
            value={activeSubjectId}
            onChange={(e) => setActiveSubjectId(e.target.value)}
            className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 text-slate-900 dark:text-white rounded-xl px-4 py-2 outline-none focus:border-indigo-500"
          >
            {activeClass?.subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
            ))}
          </select>
        </div>
        
        <button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
          <Plus className="h-5 w-5" /> New Assignment
        </button>
      </div>

      {/* Kanban / Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Assignments Column */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Active (Due Soon)
          </h3>
          
          {assignments.filter(a => a.dueDate.getTime() >= Date.now()).map(assignment => (
            <div key={assignment.id} className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-3">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 p-2 rounded-lg">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {Math.ceil((assignment.dueDate.getTime() - Date.now()) / (1000 * 3600 * 24))} days left
                </span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{assignment.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{assignment.description}</p>
              
              <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-zinc-800">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{assignment.totalMarks} Marks</span>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline">View Submissions →</span>
              </div>
            </div>
          ))}

          {assignments.filter(a => a.dueDate.getTime() >= Date.now()).length === 0 && (
             <div className="border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                <AlertCircle className="h-8 w-8 text-slate-300 dark:text-zinc-600 mb-2" />
                <p className="text-sm text-slate-500 dark:text-slate-400">No active assignments.</p>
             </div>
          )}
        </div>

        {/* Past/Completed Column */}
        <div className="space-y-4 opacity-75">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-slate-400"></span> Past Assignments
          </h3>
          
          {assignments.filter(a => a.dueDate.getTime() < Date.now()).map(assignment => (
            <div key={assignment.id} className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-900/30 backdrop-blur-md p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
              <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-1">{assignment.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-1">{assignment.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500 bg-slate-200 dark:bg-zinc-800 px-2 py-1 rounded">Closed</span>
                <span className="text-xs text-slate-600 dark:text-slate-300 dark:text-slate-400 font-medium">Grade Submissions</span>
              </div>
            </div>
          ))}

          {assignments.filter(a => a.dueDate.getTime() < Date.now()).length === 0 && (
             <div className="border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">No past assignments.</p>
             </div>
          )}
        </div>

        {/* Analytics Summary */}
        <div className="space-y-4">
           <h3 className="font-bold text-slate-900 dark:text-white mb-4">Class Performance</h3>
           <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center text-center">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Average Submission Rate</p>
              <h4 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">84%</h4>
              <p className="text-xs text-emerald-500 font-medium">↑ 5% from last semester</p>
           </div>
        </div>

      </div>
    </div>
  );
}
