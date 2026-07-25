"use client";

import React, { useState } from "react";
import { useAcademic } from "@/lib/AcademicContext";
import { BookOpen, Calendar, Clock, Plus, Target, CheckCircle2, Circle } from "lucide-react";

export default function LessonPlanningView() {
  const { classes, activeClassId, setActiveClassId, activeSubjectId, setActiveSubjectId, toggleLessonPlan } = useAcademic();
  const [viewMode, setViewMode] = useState<"monthly" | "weekly">("monthly");
  
  const activeClass = classes.find(c => c.id === activeClassId);
  const activeSubject = activeClass?.subjects.find(s => s.id === activeSubjectId);
  const lessonPlans = activeSubject?.lessonPlans || [];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Controls */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex gap-4 w-full md:w-auto">
          <select 
            value={activeClassId}
            onChange={(e) => {
              setActiveClassId(e.target.value);
              const newClass = classes.find(c => c.id === e.target.value);
              if (newClass && newClass.subjects.length > 0) setActiveSubjectId(newClass.subjects[0].id);
            }}
            className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 text-slate-900 dark:text-white rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500"
          >
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select 
            value={activeSubjectId}
            onChange={(e) => setActiveSubjectId(e.target.value)}
            className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 text-slate-900 dark:text-white rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500"
          >
            {activeClass?.subjects.map(s => <option key={s.id} value={s.id}>{s.name} ({s.code})</option>)}
          </select>
        </div>

        <div className="flex gap-3">
           <div className="flex bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl">
              <button onClick={() => setViewMode("monthly")} className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-colors ${viewMode === 'monthly' ? 'bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`}>Monthly</button>
              <button onClick={() => setViewMode("weekly")} className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-colors ${viewMode === 'weekly' ? 'bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`}>Weekly</button>
           </div>
           <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition-colors flex items-center justify-center gap-2">
             <Plus className="h-4 w-4" /> New Plan
           </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-3xl text-white shadow-lg flex flex-col justify-between">
          <h3 className="font-bold opacity-90 mb-4 flex items-center gap-2"><Target className="h-5 w-5" /> Target Coverage</h3>
          <div>
            <p className="text-4xl font-extrabold mb-1">45 Hrs</p>
            <p className="text-sm font-medium opacity-80">Planned for this term</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500" /> Completed</h3>
          <div>
            <p className="text-4xl font-extrabold text-slate-900 dark:text-white mb-1">12 Hrs</p>
            <p className="text-sm font-medium text-emerald-500">28% of term target</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2"><Clock className="h-5 w-5 text-amber-500" /> Pending Approval</h3>
          <div>
            <p className="text-4xl font-extrabold text-slate-900 dark:text-white mb-1">3 Plans</p>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Waiting for HOD review</p>
          </div>
        </div>
      </div>

      {/* Plan List */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 shadow-sm rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/30">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Detailed Lesson Plans</h2>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-zinc-800 dark:divide-zinc-800 dark:divide-zinc-800">
          {lessonPlans.map(plan => (
            <div key={plan.id} className="p-6 flex flex-col md:flex-row md:items-center gap-6 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40/50 dark:hover:bg-zinc-800/20 transition-colors">
               <div className="flex-1">
                 <div className="flex items-center gap-3 mb-2">
                   <h3 className={`text-lg font-bold ${plan.completed ? 'text-slate-500 dark:text-slate-400 line-through dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>{plan.topic}</h3>
                   <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">Theory</span>
                 </div>
                 <p className="text-sm text-slate-600 dark:text-slate-300 dark:text-slate-400 max-w-3xl">{plan.description}</p>
                 
                 <div className="flex items-center gap-4 mt-4">
                   <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded"><Calendar className="h-3.5 w-3.5" /> {plan.targetDate.toLocaleDateString()}</span>
                   <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded"><Clock className="h-3.5 w-3.5" /> 2 Hours</span>
                 </div>
               </div>

               <div className="flex items-center gap-4">
                  <button onClick={() => toggleLessonPlan(activeSubjectId, plan.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${plan.completed ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:bg-zinc-800 dark:text-slate-400 dark:hover:bg-zinc-700'}`}>
                    {plan.completed ? <><CheckCircle2 className="h-4 w-4" /> Completed</> : <><Circle className="h-4 w-4" /> Mark Complete</>}
                  </button>
                  <button className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 text-sm font-semibold">Edit</button>
               </div>
            </div>
          ))}

          {lessonPlans.length === 0 && (
            <div className="p-12 text-center text-slate-500 dark:text-slate-400">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-slate-300 dark:text-zinc-700" />
              <p className="text-lg font-bold text-slate-900 dark:text-white mb-1">No Lesson Plans</p>
              <p>Create your first lesson plan to start tracking syllabus coverage.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
