"use client";
import React, { useState } from "react";

export default function AttendanceDashboard() {
  const [activeTab, setActiveTab] = useState("my");

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Attendance</h1>
        <p className="text-gray-500 mt-2">Track student and employee presence.</p>
      </header>

      <div className="flex border-b border-gray-200 dark:border-gray-800 mb-8 overflow-x-auto">
        <button onClick={() => setActiveTab("my")} className={`py-3 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === "my" ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>My Attendance</button>
        <button onClick={() => setActiveTab("mark")} className={`py-3 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === "mark" ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>Mark Attendance (Teacher)</button>
        <button onClick={() => setActiveTab("reports")} className={`py-3 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === "reports" ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>Reports</button>
      </div>

      {activeTab === "my" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">92.5%</h2>
              <p className="text-gray-500 text-sm">Overall Attendance</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl">
              A+
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-200 dark:border-zinc-800 shadow-sm min-h-[400px] flex items-center justify-center text-gray-400">
            [Calendar View Component Will Be Here]
          </div>
        </div>
      )}

      {activeTab === "mark" && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex gap-4">
             <select className="border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black rounded-lg px-4 py-2 outline-none dark:text-white">
                <option>Grade 10 - Section A</option>
             </select>
             <input type="date" className="border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black rounded-lg px-4 py-2 outline-none dark:text-white" />
          </div>
          <div className="p-8 text-center text-gray-500">
             Students list will populate here based on class selection.
          </div>
        </div>
      )}
    </div>
  );
}
