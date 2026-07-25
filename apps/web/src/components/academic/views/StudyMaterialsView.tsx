"use client";

import React from "react";
import { useAcademic } from "@/lib/AcademicContext";
import { FileText, Video, Link as LinkIcon, Download, UploadCloud } from "lucide-react";

export default function StudyMaterialsView() {
  const { classes, activeClassId, setActiveClassId, activeSubjectId, setActiveSubjectId } = useAcademic();
  
  const activeClass = classes.find(c => c.id === activeClassId);
  const activeSubject = activeClass?.subjects.find(s => s.id === activeSubjectId);
  const materials = activeSubject?.studyMaterials || [];

  const getIcon = (type: string) => {
    switch(type) {
      case "PDF": return <FileText className="h-6 w-6 text-red-500" />;
      case "VIDEO": return <Video className="h-6 w-6 text-purple-500" />;
      default: return <LinkIcon className="h-6 w-6 text-blue-500" />;
    }
  };

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
          <UploadCloud className="h-5 w-5" /> Upload Material
        </button>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {materials.map(mat => (
          <div key={mat.id} className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 h-12 w-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {getIcon(mat.type)}
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1 line-clamp-1" title={mat.title}>{mat.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{mat.description}</p>
            </div>
            <div className="border-t border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/30 p-3 flex justify-between items-center">
               <span className="text-xs font-bold text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-500">{mat.type}</span>
               <button className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 p-1.5 rounded-lg transition-colors">
                 <Download className="h-4 w-4" />
               </button>
            </div>
          </div>
        ))}

        {materials.length === 0 && (
          <div className="col-span-full border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <FileText className="h-12 w-12 text-slate-300 dark:text-zinc-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Study Materials</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm">Upload notes, presentations, or video links to help your students prepare for upcoming examinations.</p>
          </div>
        )}
      </div>
    </div>
  );
}
