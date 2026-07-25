"use client";

import { ImageIcon, UploadCloud, Folder, MoreVertical } from "lucide-react";

export default function MediaView() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white dark:text-slate-100">Media Library</h1>
          <p className="text-slate-500 dark:text-slate-400">Centralized storage for all your institution's digital assets.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
          <UploadCloud className="h-4 w-4" /> Upload Files
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md p-4 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm flex items-center gap-4 hover:border-indigo-300 transition-colors cursor-pointer">
          <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
            <Folder className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white dark:text-slate-100 text-sm">Athletics Assets</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">24 files</p>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md p-4 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm flex items-center gap-4 hover:border-indigo-300 transition-colors cursor-pointer">
          <div className="h-10 w-10 bg-pink-50 text-pink-600 rounded-lg flex items-center justify-center">
            <Folder className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white dark:text-slate-100 text-sm">Campus Photos</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">142 files</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="group relative bg-slate-100 dark:bg-zinc-800 rounded-xl aspect-square border border-slate-200 dark:border-zinc-800 overflow-hidden flex items-center justify-center">
            <ImageIcon className="h-8 w-8 text-slate-300" />
            
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
              <div className="flex justify-end">
                <button className="h-8 w-8 rounded-md bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md/20 hover:bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md/40 text-white flex items-center justify-center backdrop-blur-sm transition-colors">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
              <p className="text-white text-xs font-medium truncate drop-shadow-md">image_asset_{i}.png</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
