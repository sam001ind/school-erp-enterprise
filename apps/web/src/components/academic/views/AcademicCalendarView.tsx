"use client";

import React, { useState } from "react";
import { useAcademic } from "@/lib/AcademicContext";
import { Calendar as CalendarIcon, Clock, MapPin, Plus, List, Grid } from "lucide-react";

export default function AcademicCalendarView() {
  const { events, addEvent } = useAcademic();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  
  const getEventColor = (type: string) => {
    switch(type) {
      case "Holiday": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
      case "Examination": return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800";
      default: return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800";
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex justify-between items-center">
        <div className="flex gap-2 bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl">
          <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300 dark:text-slate-400'}`}>
            <List className="h-5 w-5" />
          </button>
          <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:bg-zinc-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300 dark:text-slate-400'}`}>
            <Grid className="h-5 w-5" />
          </button>
        </div>
        
        <button 
          onClick={() => addEvent({ title: "New Custom Event", date: new Date(), type: "Academic" })}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Event
        </button>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
        {viewMode === "list" ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Upcoming Events</h2>
            {events.sort((a, b) => a.date.getTime() - b.date.getTime()).map(event => (
              <div key={event.id} className="flex items-center gap-6 p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/30 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 shrink-0">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">{event.date.toLocaleString('default', { month: 'short' })}</span>
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{event.date.getDate()}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{event.title}</h3>
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-md border ${getEventColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> All Day</span>
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Main Campus</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <CalendarIcon className="h-16 w-16 text-slate-300 dark:text-zinc-700 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Grid View</h3>
            <p className="text-slate-500 dark:text-slate-400">Monthly calendar grid rendering goes here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
