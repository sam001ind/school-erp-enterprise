"use client";

import React, { useState } from "react";
import { useAcademic } from "@/lib/AcademicContext";
import { DoorOpen, Users, Wifi, Plus, Search, MapPin } from "lucide-react";

export default function ClassroomManagementView() {
  const { rooms } = useAcademic();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRooms = rooms.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500 dark:text-slate-500" />
          <input 
            type="text" 
            placeholder="Search rooms by name or type..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        
        <button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition-colors flex items-center justify-center gap-2">
          <Plus className="h-4 w-4" /> Add Classroom
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map(room => (
          <div key={room.id} className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm p-6 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-6">
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${room.type === 'Laboratory' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'}`}>
                <DoorOpen className="h-7 w-7" />
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${room.type === 'Laboratory' ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800' : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-zinc-800 dark:bg-zinc-800 dark:text-slate-300 dark:border-zinc-700'}`}>
                  {room.type}
                </span>
                {room.isSmart && (
                  <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 flex items-center gap-1 uppercase tracking-wider">
                    <Wifi className="h-3 w-3" /> Smart
                  </span>
                )}
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{room.name}</h3>
            
            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Block A</span>
            </div>

            <div className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 p-4 rounded-xl flex justify-between items-center border border-slate-100 dark:border-zinc-800 dark:border-zinc-700">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-lg shadow-sm">
                   <Users className="h-5 w-5 text-slate-400 dark:text-slate-500 dark:text-slate-500" />
                 </div>
                 <div>
                   <p className="text-xs font-bold text-slate-400 dark:text-slate-500 dark:text-slate-500 uppercase tracking-wider">Capacity</p>
                   <p className="text-lg font-bold text-slate-900 dark:text-white">{room.capacity} Seats</p>
                 </div>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 text-sm font-semibold">View Schedule</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
