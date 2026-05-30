"use client";
import React, { useState } from "react";

export default function LeaveDashboard() {
  const [activeTab, setActiveTab] = useState("my");

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leave Management</h1>
        <p className="text-gray-500 mt-2">Manage employee and student leave requests.</p>
      </header>

      <div className="flex border-b border-gray-200 dark:border-gray-800 mb-8 overflow-x-auto">
        <button onClick={() => setActiveTab("my")} className={`py-3 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === "my" ? "border-teal-500 text-teal-600 dark:text-teal-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>My Leaves</button>
        <button onClick={() => setActiveTab("apply")} className={`py-3 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === "apply" ? "border-teal-500 text-teal-600 dark:text-teal-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>Apply for Leave</button>
        <button onClick={() => setActiveTab("approvals")} className={`py-3 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === "approvals" ? "border-teal-500 text-teal-600 dark:text-teal-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>Pending Approvals (Manager)</button>
      </div>

      {activeTab === "my" && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6 text-center text-gray-500">
          No recent leave applications.
        </div>
      )}
    </div>
  );
}
