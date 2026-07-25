"use client";

import { Briefcase, Users, Plus, CheckCircle2 } from "lucide-react";
import { useSocialHub } from "@/lib/SocialHubContext";

export default function BrandsView() {
  const { brands: departments } = useSocialHub();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white dark:text-slate-100">Departments & Accounts</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your institution's distinct departments or campuses.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
          <Plus className="h-4 w-4" /> Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                  {dept.logo}
                </div>
                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs font-medium">
                  <CheckCircle2 className="h-3 w-3" /> Active
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white dark:text-slate-100 mb-1">{dept.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{dept.industry}</p>
              
              <div className="mt-6 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-slate-400 dark:text-slate-500 dark:text-slate-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{dept.members} Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-slate-400 dark:text-slate-500 dark:text-slate-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{dept.connected} Profiles</span>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 flex gap-3">
              <button className="flex-1 px-3 py-1.5 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors">
                Manage
              </button>
              <button className="flex-1 px-3 py-1.5 bg-white dark:bg-zinc-900/50 backdrop-blur-md/50 dark:backdrop-blur-md border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:bg-zinc-800/50 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors">
                Settings
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
