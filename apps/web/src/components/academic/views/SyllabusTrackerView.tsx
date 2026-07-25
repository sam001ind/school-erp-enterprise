"use client";

import React, { useState } from "react";
import { useAcademic, Subject, LessonPlan } from "@/lib/AcademicContext";
import { CheckCircle2, Circle, BookOpen, Clock, Calendar as CalendarIcon, ChevronDown } from "lucide-react";

export default function SyllabusTrackerView() {
  const { classes, activeClassId, setActiveClassId, activeSubjectId, setActiveSubjectId, toggleLessonPlan } = useAcademic();
  
  const activeClass = classes.find(c => c.id === activeClassId);
  const activeSubject = activeClass?.subjects.find(s => s.id === activeSubjectId);
  const lessonPlans = activeSubject?.lessonPlans || [];

  const completedCount = lessonPlans.filter(lp => lp.completed).length;
  const totalCount = lessonPlans.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Filters & KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Class & Subject Selector */}
        <div className="md:col-span-2 bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-6 w-6 text-indigo-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Curriculum Selector</h2>
          </div>
          <div className="flex gap-4">
            <select 
              value={activeClassId}
              onChange={(e) => {
                setActiveClassId(e.target.value);
                const newClass = classes.find(c => c.id === e.target.value);
                if (newClass && newClass.subjects.length > 0) {
                  setActiveSubjectId(newClass.subjects[0].id);
                }
              }}
              className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500 flex-1"
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <select 
              value={activeSubjectId}
              onChange={(e) => setActiveSubjectId(e.target.value)}
              className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500 flex-1"
            >
              {activeClass?.subjects.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Syllabus Progress */}
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">{activeSubject?.name} Progress</h3>
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Simple circular progress visualization */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100 dark:text-zinc-800"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-indigo-500"
                strokeDasharray={`${progressPercent}, 100`}
                strokeWidth="3"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">{progressPercent}%</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 font-medium">{completedCount} of {totalCount} Topics Completed</p>
        </div>
      </div>

      {/* Lesson Plan Timeline */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-zinc-800 flex justify-between items-center bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/30">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Lesson Plans & Syllabus</h3>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-colors">
            + Add Topic
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {lessonPlans.map((plan, index) => (
              <div key={plan.id} className="relative flex gap-4">
                {/* Timeline Line */}
                {index !== lessonPlans.length - 1 && (
                  <div className="absolute top-8 left-3.5 bottom-[-16px] w-px bg-slate-200 dark:bg-zinc-700"></div>
                )}
                
                {/* Checkbox Icon */}
                <div 
                  className="mt-1 shrink-0 cursor-pointer" 
                  onClick={() => toggleLessonPlan(activeSubjectId, plan.id)}
                >
                  {plan.completed ? (
                    <CheckCircle2 className="h-7 w-7 text-emerald-500" />
                  ) : (
                    <Circle className="h-7 w-7 text-slate-300 dark:text-zinc-600 hover:text-indigo-400 transition-colors" />
                  )}
                </div>
                
                {/* Content */}
                <div className={`flex-1 p-4 rounded-xl border ${plan.completed ? 'bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 border-slate-200 dark:border-zinc-800 dark:bg-zinc-800/30 dark:border-zinc-700/50 opacity-75' : 'bg-white dark:bg-zinc-900/50 backdrop-blur-md border-slate-200 dark:border-zinc-800 dark:bg-zinc-900 dark:border-zinc-700 shadow-sm'} transition-all`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={`text-base font-bold ${plan.completed ? 'text-slate-600 dark:text-slate-300 dark:text-slate-400 line-through' : 'text-slate-900 dark:text-white'}`}>
                      {plan.topic}
                    </h4>
                    <span className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded">
                      <CalendarIcon className="h-3 w-3" />
                      {plan.targetDate.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 dark:text-slate-400">{plan.description}</p>
                </div>
              </div>
            ))}

            {lessonPlans.length === 0 && (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                No lesson plans created for this subject yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
