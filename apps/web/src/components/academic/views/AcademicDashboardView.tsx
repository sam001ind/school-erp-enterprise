"use client";

import React from "react";
import { BookOpen, Users, Clock, CheckCircle2, TrendingUp, Calendar, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const completionData = [
  { name: '10-A', completed: 85 },
  { name: '10-B', completed: 78 },
  { name: '11-A', completed: 92 },
  { name: '11-B', completed: 88 },
  { name: '12-A', completed: 95 },
  { name: '12-B', completed: 91 },
];

const facultyLoadData = [
  { name: 'Math Dept', value: 120 },
  { name: 'Science Dept', value: 150 },
  { name: 'Arts Dept', value: 80 },
  { name: 'Language Dept', value: 90 },
];
const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6'];

export default function AcademicDashboardView() {
  return (
    <div className="space-y-6 pb-12">
      {/* Top KPI row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Classes</h3>
            <Users className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">48</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Across 4 programs</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Overall Syllabus</h3>
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">88%</p>
            <p className="text-xs text-emerald-500 font-medium mt-1">On track for Term 2</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Faculty</h3>
            <BookOpen className="h-5 w-5 text-indigo-500" />
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">112</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Full allocation</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Upcoming Exams</h3>
            <Calendar className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">14</p>
            <p className="text-xs text-amber-500 font-medium mt-1">Days until Mid-Terms</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Syllabus Completion Chart */}
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Syllabus Completion by Class</h2>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} domain={[0, 100]} />
                <Tooltip 
                  cursor={{fill: '#3f3f46', opacity: 0.1}}
                  contentStyle={{borderRadius: '8px', border: '1px solid #3f3f46', background: '#18181b', color: '#fff'}}
                />
                <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Faculty Workload Pie Chart */}
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Faculty Workload Distribution</h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Total teaching hours scheduled per week</p>
          <div className="h-[250px] w-full flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={facultyLoadData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {facultyLoadData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: '1px solid #3f3f46', background: '#18181b', color: '#fff'}}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-1/2 space-y-3">
              {facultyLoadData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{entry.name}</span>
                  <span className="ml-auto text-slate-500 dark:text-slate-400">{entry.value}h</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Alerts and Action items */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Academic Alerts</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl">
            <AlertCircle className="h-6 w-6 text-amber-500 shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-bold text-amber-900 dark:text-amber-500">Syllabus Laging Behind</h4>
              <p className="text-xs text-amber-700 dark:text-amber-600/80 mt-1">Class 10-B Mathematics is currently 15% behind the Master Lesson Plan.</p>
            </div>
            <button className="px-4 py-1.5 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-sm font-semibold rounded-lg hover:bg-amber-200 transition-colors">Review</button>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-900/30 rounded-xl">
            <Clock className="h-6 w-6 text-indigo-500 shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-400">Timetable Conflict Detected</h4>
              <p className="text-xs text-indigo-700 dark:text-indigo-600/80 mt-1">Room 304 is double-booked on Wednesday at 10:00 AM.</p>
            </div>
            <button className="px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-sm font-semibold rounded-lg hover:bg-indigo-200 transition-colors">Resolve</button>
          </div>
        </div>
      </div>
    </div>
  );
}
