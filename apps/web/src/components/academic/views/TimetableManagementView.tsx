"use client";

import React, { useState } from "react";
import { useAcademic } from "@/lib/AcademicContext";
import { Calendar, Clock, MapPin, Search, ChevronLeft, ChevronRight, Settings, Plus } from "lucide-react";

export default function TimetableManagementView() {
  const { classes } = useAcademic();
  const [activeClassId, setActiveClassId] = useState(classes[0]?.id);

  // A basic mock timetable structure for demonstration
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM"];
  
  const mockSchedule: Record<string, any> = {
    "Monday-08:00 AM": { subject: "Mathematics", teacher: "Prof. Michael Chang", room: "Room 101", type: "Core" },
    "Monday-09:00 AM": { subject: "Physics", teacher: "Dr. Sarah Jenkins", room: "Chemistry Lab", type: "Lab" },
    "Tuesday-10:00 AM": { subject: "Biology", teacher: "Dr. Emily Blunt", room: "Room 102", type: "Core" },
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Controls */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex gap-4 items-center">
          <select 
            value={activeClassId}
            onChange={(e) => setActiveClassId(e.target.value)}
            className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 text-slate-900 dark:text-white rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 font-bold"
          >
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl">
             <button className="p-1.5 hover:bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:hover:bg-zinc-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"><ChevronLeft className="h-5 w-5" /></button>
             <span className="text-sm font-bold px-2">Week 12</span>
             <button className="p-1.5 hover:bg-white dark:bg-zinc-900/50 backdrop-blur-md dark:hover:bg-zinc-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700">
            <Settings className="h-4 w-4" /> Config
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition-colors flex items-center justify-center gap-2">
             Auto-Generate
          </button>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 shadow-sm rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-900/80 p-4 border-b border-r border-slate-200 dark:border-zinc-800 w-24 text-center">
                  <Clock className="h-5 w-5 mx-auto text-slate-400 dark:text-slate-500 dark:text-slate-500" />
                </th>
                {days.map(day => (
                  <th key={day} className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-900/80 p-4 border-b border-r border-slate-200 dark:border-zinc-800 text-center text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, idx) => (
                <tr key={time}>
                  <td className="p-4 border-b border-r border-slate-200 dark:border-zinc-800 text-xs font-bold text-slate-500 dark:text-slate-400 text-center bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40/50 dark:bg-zinc-900/30">
                    {time}
                    {idx === 4 && <div className="mt-2 text-[10px] text-amber-500 bg-amber-50 dark:bg-amber-900/20 py-1 rounded">BREAK</div>}
                  </td>
                  
                  {days.map(day => {
                    const key = `${day}-${time}`;
                    const slot = mockSchedule[key];
                    
                    if (idx === 4) {
                      // Lunch break row styling
                      return <td key={key} className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40/50 dark:bg-zinc-800/30 border-b border-r border-slate-200 dark:border-zinc-800"></td>;
                    }

                    return (
                      <td key={key} className="p-2 border-b border-r border-slate-200 dark:border-zinc-800 h-28 align-top relative group">
                        {slot ? (
                          <div className={`h-full p-3 rounded-xl border flex flex-col ${slot.type === 'Lab' ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800/50' : 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800/50'} cursor-pointer hover:shadow-md transition-shadow`}>
                            <h4 className={`text-sm font-bold mb-1 ${slot.type === 'Lab' ? 'text-purple-900 dark:text-purple-300' : 'text-indigo-900 dark:text-indigo-300'}`}>{slot.subject}</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 dark:text-slate-400 mt-auto">{slot.teacher}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {slot.room}</p>
                          </div>
                        ) : (
                          <div className="h-full w-full rounded-xl border-2 border-dashed border-transparent hover:border-slate-300 dark:hover:border-zinc-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40/0 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40/50 dark:hover:bg-zinc-800/30">
                            <Plus className="h-6 w-6 text-slate-400 dark:text-slate-500 dark:text-slate-500" />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
