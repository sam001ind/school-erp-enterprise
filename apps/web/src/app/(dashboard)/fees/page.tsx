"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function FeesContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "dues";

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
          {activeTab.replace("-", " ")}
        </h1>
        <p className="text-gray-500 mt-2">Manage fee invoices, payments, and receipts.</p>
      </header>

      {activeTab === "dues" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-red-200 dark:border-red-900/50 shadow-sm p-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent dark:from-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-1 dark:text-white text-zinc-900">Fall Term Tuition Fee</h2>
              <p className="text-sm text-gray-500 font-medium mb-6">Due on Sep 1, 2026</p>
              <p className="text-4xl font-extrabold text-zinc-900 dark:text-white mb-8">$1,250.00</p>
              <button className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-lg shadow-blue-500/30">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FeesDashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FeesContent />
    </Suspense>
  )
}
