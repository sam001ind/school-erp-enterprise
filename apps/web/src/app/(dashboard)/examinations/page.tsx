"use client";
import React, { useState } from "react";

export default function ExaminationsDashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Examinations</h1>
        <p className="text-gray-500 mt-2">Manage schedules, grading, and report cards.</p>
      </header>

      <div className="flex border-b border-gray-200 dark:border-gray-800 mb-8 overflow-x-auto">
        <button onClick={() => setActiveTab("upcoming")} className={`py-3 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === "upcoming" ? "border-indigo-500 text-indigo-600 dark:text-indigo-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>Upcoming Exams</button>
        <button onClick={() => setActiveTab("results")} className={`py-3 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === "results" ? "border-indigo-500 text-indigo-600 dark:text-indigo-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>My Results & Grades</button>
        <button onClick={() => setActiveTab("admit")} className={`py-3 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === "admit" ? "border-indigo-500 text-indigo-600 dark:text-indigo-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>Download Admit Card</button>
      </div>

      {activeTab === "upcoming" && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Mid-Term Examinations 2026</h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-100 dark:border-zinc-800 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium dark:text-white">Mathematics</p>
                <p className="text-sm text-gray-500">October 12, 2026 • 09:00 AM</p>
              </div>
              <span className="text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">Syllabus Available</span>
            </div>
            <div className="p-4 border border-gray-100 dark:border-zinc-800 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium dark:text-white">Science</p>
                <p className="text-sm text-gray-500">October 14, 2026 • 09:00 AM</p>
              </div>
              <span className="text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">Syllabus Available</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
