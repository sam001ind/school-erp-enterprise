"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { IndianRupee, FileText, CreditCard, TrendingUp } from "lucide-react";

function PayrollContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "slips";

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold capitalize mb-2">
            {activeTab.replace("-", " ")} Payroll
          </h1>
          <p className="text-indigo-100 text-lg">Manage employee salaries and payslips.</p>
        </div>
        <IndianRupee className="absolute right-8 -bottom-8 w-48 h-48 text-white opacity-10 transform -rotate-12" />
      </header>

      {activeTab === "slips" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Last Salary", value: "₹45,000", icon: CreditCard, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
              { label: "Total Deductions", value: "₹2,500", icon: TrendingUp, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
              { label: "Total Slips", value: "24", icon: FileText, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-8 text-center">
             <div className="w-16 h-16 bg-gray-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
             </div>
             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Recent Payslips</h3>
             <p className="text-gray-500">Your payslips will appear here once generated.</p>
          </div>
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
