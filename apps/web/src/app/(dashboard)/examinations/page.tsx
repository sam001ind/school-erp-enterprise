"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ExaminationsContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "upcoming";

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
          {activeTab.replace("-", " ")}
        </h1>
        <p className="text-gray-500 mt-2">Manage schedules, grading, and report cards.</p>
      </header>

      {activeTab === "upcoming" && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-8">
          <h2 className="text-xl font-bold mb-6 dark:text-white">Mid-Term Examinations 2026</h2>
          <div className="space-y-4">
            <div className="p-5 border border-zinc-100 dark:border-zinc-800 rounded-xl flex justify-between items-center hover:shadow-md transition-shadow">
              <div>
                <p className="font-bold text-lg dark:text-white text-zinc-900">Mathematics</p>
                <p className="text-sm text-gray-500 font-medium">October 12, 2026 • 09:00 AM</p>
              </div>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full">Syllabus Available</span>
            </div>
            <div className="p-5 border border-zinc-100 dark:border-zinc-800 rounded-xl flex justify-between items-center hover:shadow-md transition-shadow">
              <div>
                <p className="font-bold text-lg dark:text-white text-zinc-900">Science</p>
                <p className="text-sm text-gray-500 font-medium">October 14, 2026 • 09:00 AM</p>
              </div>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full">Syllabus Available</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExaminationsDashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExaminationsContent />
    </Suspense>
  )
}
