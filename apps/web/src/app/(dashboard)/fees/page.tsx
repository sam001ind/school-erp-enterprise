"use client";
import React, { useState } from "react";

export default function FeesDashboard() {
  const [activeTab, setActiveTab] = useState("dues");

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fee Collection</h1>
        <p className="text-gray-500 mt-2">Manage fee invoices, payments, and receipts.</p>
      </header>

      <div className="flex border-b border-gray-200 dark:border-gray-800 mb-8 overflow-x-auto">
        <button onClick={() => setActiveTab("dues")} className={`py-3 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === "dues" ? "border-green-500 text-green-600 dark:text-green-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>Current Dues & Pay</button>
        <button onClick={() => setActiveTab("history")} className={`py-3 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === "history" ? "border-green-500 text-green-600 dark:text-green-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>Payment History</button>
        <button onClick={() => setActiveTab("structure")} className={`py-3 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === "structure" ? "border-green-500 text-green-600 dark:text-green-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>Fee Structure</button>
      </div>

      {activeTab === "dues" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-red-200 dark:border-red-900/50 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
            <h2 className="text-lg font-semibold mb-1 dark:text-white">Fall Term Tuition Fee</h2>
            <p className="text-sm text-gray-500 mb-4">Due on Sep 1, 2026</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-6">$1,250.00</p>
            <button className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors">
              Pay Now (Stripe / Razorpay)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
