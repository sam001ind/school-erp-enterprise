"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PayrollContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "slips";

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
          {activeTab.replace("-", " ")}
        </h1>
        <p className="text-gray-500 mt-2">Manage employee salaries and payslips.</p>
      </header>

      {activeTab === "slips" && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-8 text-center text-gray-500 font-medium">
          No payslips available.
        </div>
      )}
    </div>
  );
}

export default function PayrollDashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PayrollContent />
    </Suspense>
  )
}
