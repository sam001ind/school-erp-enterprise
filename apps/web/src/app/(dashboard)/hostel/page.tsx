"use client";
import React, { useState } from "react";

export default function HostelDashboard() {
  const [activeTab, setActiveTab] = useState("my-room");

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hostel Management</h1>
        <p className="text-gray-500 mt-2">Manage dormitory allocations and rules.</p>
      </header>

      <div className="flex border-b border-gray-200 dark:border-gray-800 mb-8 overflow-x-auto">
        <button onClick={() => setActiveTab("my-room")} className={`py-3 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === "my-room" ? "border-orange-500 text-orange-600 dark:text-orange-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>My Room</button>
        <button onClick={() => setActiveTab("apply")} className={`py-3 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === "apply" ? "border-orange-500 text-orange-600 dark:text-orange-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>Apply for Hostel</button>
        <button onClick={() => setActiveTab("complaints")} className={`py-3 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === "complaints" ? "border-orange-500 text-orange-600 dark:text-orange-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>Complaints & Requests</button>
      </div>

      {activeTab === "my-room" && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6 max-w-2xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold dark:text-white">Block A - Room 204</h2>
              <p className="text-gray-500 mt-1">Standard Double Room (AC)</p>
            </div>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">Allocated</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between p-4 bg-gray-50 dark:bg-zinc-950/50 rounded-lg">
              <span className="text-gray-500">Warden</span>
              <span className="font-medium dark:text-white">Mr. John Stevens</span>
            </div>
            <div className="flex justify-between p-4 bg-gray-50 dark:bg-zinc-950/50 rounded-lg">
              <span className="text-gray-500">Roommate</span>
              <span className="font-medium dark:text-white">David Miller</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
