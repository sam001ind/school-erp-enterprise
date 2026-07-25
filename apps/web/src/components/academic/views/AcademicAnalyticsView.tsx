"use client";

import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Download, Filter, TrendingUp, Users, BookOpen } from "lucide-react";

const attendanceData = [
  { month: 'Jan', grade10: 92, grade11: 88, grade12: 95 },
  { month: 'Feb', grade10: 90, grade11: 85, grade12: 94 },
  { month: 'Mar', grade10: 85, grade11: 80, grade12: 96 }, // exam prep dip
  { month: 'Apr', grade10: 95, grade11: 92, grade12: 98 },
];

const gradeData = [
  { subject: 'Math', avg: 78, max: 100 },
  { subject: 'Physics', avg: 72, max: 100 },
  { subject: 'Chemistry', avg: 81, max: 100 },
  { subject: 'Biology', avg: 85, max: 100 },
  { subject: 'English', avg: 88, max: 100 },
];

export default function AcademicAnalyticsView() {
  const [timeRange, setTimeRange] = useState("term");

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-2">
          <button onClick={() => setTimeRange("month")} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${timeRange === 'month' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800'}`}>This Month</button>
          <button onClick={() => setTimeRange("term")} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${timeRange === 'term' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800'}`}>Term to Date</button>
          <button onClick={() => setTimeRange("year")} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${timeRange === 'year' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800'}`}>Academic Year</button>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700">
            <Filter className="h-4 w-4" /> Filter
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition-colors flex items-center justify-center gap-2">
            <Download className="h-4 w-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Line Chart: Attendance Trends */}
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Attendance Trends</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Monthly averages across grades</p>
            </div>
            <Users className="h-6 w-6 text-indigo-500" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.2} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} domain={[0, 100]} />
                <RechartsTooltip 
                  contentStyle={{borderRadius: '12px', border: '1px solid #3f3f46', background: '#18181b', color: '#fff'}}
                  itemStyle={{color: '#fff'}}
                />
                <Line type="monotone" dataKey="grade10" name="Grade 10" stroke="#6366f1" strokeWidth={3} dot={{r: 4, fill: '#6366f1'}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="grade11" name="Grade 11" stroke="#ec4899" strokeWidth={3} dot={{r: 4, fill: '#ec4899'}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="grade12" name="Grade 12" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Grade Performance */}
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Average Exam Scores</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Mid-term results by subject</p>
            </div>
            <BookOpen className="h-6 w-6 text-emerald-500" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#3f3f46" opacity={0.2} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} domain={[0, 100]} />
                <YAxis type="category" dataKey="subject" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} width={80} />
                <RechartsTooltip 
                  cursor={{fill: '#3f3f46', opacity: 0.1}}
                  contentStyle={{borderRadius: '12px', border: '1px solid #3f3f46', background: '#18181b', color: '#fff'}}
                />
                <Bar dataKey="avg" name="Class Average" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
