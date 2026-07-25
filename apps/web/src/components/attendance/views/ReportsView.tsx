"use client";

import React from "react";
import { Users, TrendingUp, AlertCircle, Calendar } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const monthlyData = [
  { name: 'Week 1', present: 92, absent: 5, late: 3 },
  { name: 'Week 2', present: 88, absent: 8, late: 4 },
  { name: 'Week 3', present: 95, absent: 3, late: 2 },
  { name: 'Week 4', present: 90, absent: 6, late: 4 },
];

const classData = [
  { name: '10-A', rate: 95 },
  { name: '10-B', rate: 88 },
  { name: '11-A', rate: 92 },
  { name: '11-B', rate: 85 },
  { name: 'Staff', rate: 98 },
];

export default function ReportsView() {
  return (
    <div className="space-y-6 pb-12">
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-5 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Present Today</h3>
            <Users className="h-5 w-5 text-indigo-500" />
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">1,245</p>
            <p className="text-xs text-emerald-500 font-medium mt-1">94% of total capacity</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-5 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Average Attendance</h3>
            <TrendingUp className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">92.4%</p>
            <p className="text-xs text-emerald-500 font-medium mt-1">+1.2% from last month</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-5 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Defaulters</h3>
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">24</p>
            <p className="text-xs text-red-500 font-medium mt-1">&gt; 3 days absent streak</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-5 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Working Days</h3>
            <Calendar className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">22</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 dark:text-slate-500 font-medium mt-1">This month</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend Chart */}
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Monthly Attendance Trend</h2>
            <select className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 text-slate-900 dark:text-white rounded text-xs px-2 py-1 outline-none">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: '1px solid #3f3f46', background: '#18181b', color: '#fff'}}
                />
                <Area type="monotone" dataKey="present" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorPresent)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Class-wise Bar Chart */}
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Attendance by Class/Dept</h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#3f3f46', opacity: 0.2}}
                  contentStyle={{borderRadius: '8px', border: '1px solid #3f3f46', background: '#18181b', color: '#fff'}}
                />
                <Bar dataKey="rate" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
