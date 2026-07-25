"use client";

import { ChevronLeft, ChevronRight, Plus, Filter } from "lucide-react";
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { useState } from "react";
import { useSocialHub } from "@/lib/SocialHubContext";

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { posts, setComposerOpen, setEditingPost } = useSocialHub();

  // Filter posts to only show scheduled ones
  const calendarPosts = posts.filter(p => p.status === 'scheduled');

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 dark:text-slate-200 dark:text-slate-200">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <div className="flex items-center rounded-md border border-slate-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md">
            <button className="px-3 py-1 bg-slate-100 dark:bg-zinc-800 text-sm font-medium text-slate-700 dark:text-slate-300">Month</button>
            <button className="px-3 py-1 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 text-sm font-medium text-slate-500 dark:text-slate-400">Week</button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="p-1.5 border border-slate-200 dark:border-zinc-800 rounded text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1.5 border border-slate-200 dark:border-zinc-800 rounded text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50"
          >
            Today
          </button>
          <button 
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="p-1.5 border border-slate-200 dark:border-zinc-800 rounded text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEEE";
    const days = [];
    const startDate = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-semibold text-sm py-3 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-zinc-800">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        
        // Find posts for this day
        const dayPosts = calendarPosts.filter(p => isSameDay(new Date(p.date), cloneDay));

        days.push(
          <div
            key={day.toString()}
            className={`min-h-[120px] p-2 border-b border-r border-slate-100 dark:border-zinc-800 transition-colors ${
              !isSameMonth(day, monthStart)
                ? "bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50/50 text-slate-400 dark:text-slate-500 dark:text-slate-500"
                : isSameDay(day, new Date())
                ? "bg-indigo-50/30 text-indigo-600"
                : "bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md text-slate-700 dark:text-slate-300"
            }`}
          >
            <div className="flex justify-between items-start">
              <span className={`text-sm font-medium ${isSameDay(day, new Date()) ? 'bg-indigo-600 text-white h-6 w-6 rounded-full flex items-center justify-center' : ''}`}>
                {formattedDate}
              </span>
              {isSameMonth(day, monthStart) && (
                <button 
                  onClick={() => setComposerOpen(true)}
                  className="text-slate-300 hover:text-indigo-500 opacity-0 hover:opacity-100 transition-opacity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="mt-2 flex flex-col gap-1">
              {dayPosts.map((post, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    setEditingPost(post);
                    setComposerOpen(true);
                  }}
                  className={`text-xs p-1.5 rounded border ${post.color || 'bg-indigo-50 text-indigo-700 border-indigo-200'} truncate cursor-pointer hover:shadow-sm transition-shadow`}
                >
                  <span className="font-bold mr-1">{post.platforms[0] ? post.platforms[0].substring(0, 2) : ''}</span>
                  {post.time}
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="border-l border-t border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md rounded-b-xl overflow-hidden">{rows}</div>;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white dark:text-slate-100">Content Calendar</h1>
          <p className="text-slate-500 dark:text-slate-400">Plan, schedule, and visualize your social media strategy.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 transition-colors shadow-sm text-sm font-medium">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button 
            onClick={() => setComposerOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            Schedule Post
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm flex-1 flex flex-col p-6">
        {renderHeader()}
        <div className="flex-1 flex flex-col rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
          <div className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50">
            {renderDays()}
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {renderCells()}
          </div>
        </div>
      </div>
    </div>
  );
}
