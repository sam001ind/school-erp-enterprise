"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function AttendanceContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "my";

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
          {activeTab === "my" ? "My Attendance" : activeTab === "mark" ? "Mark Attendance (Teacher)" : "Reports"}
        </h1>
        <p className="text-gray-500 mt-2">Track student and employee presence.</p>
      </header>

      {activeTab === "my" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">92.5%</h2>
              <p className="text-gray-500 text-sm font-medium mt-1">Overall Attendance</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xl">
              A+
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm min-h-[400px] flex items-center justify-center text-gray-400">
            [Calendar View Component Will Be Here]
          </div>
        </div>
      )}

      {activeTab === "mark" && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex flex-wrap gap-4 bg-zinc-50/50 dark:bg-black/20">
             <select className="border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-xl px-4 py-2.5 outline-none dark:text-white font-medium">
                <option>Grade 10 - Section A</option>
             </select>
             <input type="date" className="border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-xl px-4 py-2.5 outline-none dark:text-white font-medium" />
          </div>
          <div className="p-12 text-center text-gray-500">
             Students list will populate here based on class selection.
          </div>
        </div>
      )}
    </div>
  );
}

export default function AttendanceDashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AttendanceContent />
    </Suspense>
  )
}
