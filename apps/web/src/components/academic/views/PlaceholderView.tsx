"use client";

import React from "react";
import { Wrench } from "lucide-react";

export default function PlaceholderView({ title, description }: { title: string, description: string }) {
  return (
    <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 rounded-3xl p-12 flex flex-col items-center justify-center text-center min-h-[500px] shadow-sm">
      <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 rounded-full flex items-center justify-center mb-6">
        <Wrench className="w-10 h-10" />
      </div>
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{title}</h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-lg mb-8 text-lg">
        {description} This module is currently scheduled for the next development sprint.
      </p>
      
      <div className="bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 px-6 py-3 rounded-xl inline-flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
        </span>
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Under Construction</span>
      </div>
    </div>
  );
}
