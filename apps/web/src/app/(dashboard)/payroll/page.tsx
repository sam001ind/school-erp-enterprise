"use client";
import React, { useState } from "react";

export default function PayrollDashboard() {
  const [activeTab, setActiveTab] = useState("slips");

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payroll</h1>
        <p className="text-gray-500 mt-2">Manage employee salaries and payslips.</p>
      </header>

      <div className="flex border-b border-gray-200 dark:border-gray-800 mb-8 overflow-x-auto">
        <button onClick={() => setActiveTab("slips")} className={`py-3 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === "slips" ? "border-emerald-500 text-emerald-600 dark:text-emerald-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>My Payslips</button>
        <button onClick={() => setActiveTab("process")} className={`py-3 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === "process" ? "border-emerald-500 text-emerald-600 dark:text-emerald-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>Process Payroll (Admin)</button>
      </div>

      {activeTab === "slips" && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6 text-center text-gray-500">
          No payslips available.
        </div>
      )}
    </div>
  );
}
