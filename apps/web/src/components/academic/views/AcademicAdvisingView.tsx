"use client";

import React, { useState } from "react";
import { useAcademic } from "@/lib/AcademicContext";
import { HeartHandshake, Search, Calendar as CalendarIcon, MessageSquare, Plus } from "lucide-react";

export default function AcademicAdvisingView() {
  const { faculty } = useAcademic();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500 dark:text-slate-500" />
          <input 
            type="text" 
            placeholder="Search mentors or students..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        
        <button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition-colors flex items-center justify-center gap-2">
          <Plus className="h-4 w-4" /> Schedule Session
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-8 rounded-3xl text-white shadow-lg relative overflow-hidden">
           <HeartHandshake className="absolute -bottom-6 -right-6 w-48 h-48 text-white opacity-10" />
           <h3 className="font-bold text-xl mb-2 relative z-10">Mentorship Program</h3>
           <p className="text-indigo-100 mb-6 relative z-10 max-w-sm">Assign faculty mentors to students for academic and personal guidance throughout the year.</p>
           <div className="flex gap-4 relative z-10">
             <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/20 backdrop-blur-sm rounded-xl p-4 flex-1">
               <p className="text-xs uppercase tracking-wider font-bold opacity-80">Mentors Assigned</p>
               <p className="text-3xl font-bold mt-1">45</p>
             </div>
             <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/20 backdrop-blur-sm rounded-xl p-4 flex-1">
               <p className="text-xs uppercase tracking-wider font-bold opacity-80">Pending Mentees</p>
               <p className="text-3xl font-bold mt-1 text-amber-300">12</p>
             </div>
           </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
           <div className="flex justify-between items-start mb-4">
             <h3 className="font-bold text-slate-900 dark:text-white text-lg">Upcoming Sessions</h3>
             <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">View Calendar</button>
           </div>
           
           <div className="space-y-4 flex-1">
             <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800 transition-colors border border-transparent hover:border-slate-200 dark:border-zinc-800 dark:hover:border-zinc-700">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold shrink-0">JD</div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">John Doe (10-A)</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1"><CalendarIcon className="h-3 w-3" /> Today, 2:00 PM</p>
                </div>
                <button className="p-2 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-lg"><MessageSquare className="h-4 w-4" /></button>
             </div>
             <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800 transition-colors border border-transparent hover:border-slate-200 dark:border-zinc-800 dark:hover:border-zinc-700">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold shrink-0">AS</div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Alice Smith (11-B)</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1"><CalendarIcon className="h-3 w-3" /> Tomorrow, 10:30 AM</p>
                </div>
                <button className="p-2 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-lg"><MessageSquare className="h-4 w-4" /></button>
             </div>
           </div>
        </div>
      </div>

      {/* Mentor Directory */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 shadow-sm rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/30 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Mentor Directory</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-zinc-800 dark:divide-zinc-800 dark:divide-zinc-800">
          {faculty.slice(0,3).map(f => (
            <div key={f.id} className="p-6">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400 flex items-center justify-center font-bold text-xl">{f.name.charAt(0)}</div>
                 <div>
                   <h3 className="font-bold text-slate-900 dark:text-white">{f.name}</h3>
                   <p className="text-xs text-slate-500 dark:text-slate-400">{f.department}</p>
                 </div>
              </div>
              <div className="flex justify-between items-center bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 rounded-xl p-3 mb-4 border border-slate-100 dark:border-zinc-800 dark:border-zinc-700">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Assigned Mentees</span>
                <span className="font-bold text-slate-900 dark:text-white">12</span>
              </div>
              <button className="w-full py-2 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800 transition-colors">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
