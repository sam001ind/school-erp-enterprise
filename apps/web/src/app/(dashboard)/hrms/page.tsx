"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Briefcase, Search, Filter, Plus, ArrowUpRight, ArrowDownRight, MoreVertical } from "lucide-react";
import MyLeaves from "../../../components/hrms/views/MyLeaves";
import ApplyLeave from "../../../components/hrms/views/ApplyLeave";
import LeaveApprovals from "../../../components/hrms/views/LeaveApprovals";
import ProcessPayroll from "../../../components/hrms/views/ProcessPayroll";
import MyPayslips from "../../../components/hrms/views/MyPayslips";
import EmployeeDirectory from "../../../components/hrms/views/EmployeeDirectory";

function HRMSContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white capitalize flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
              <Briefcase className="w-6 h-6" />
            </div>
            HRMS (Human Resources)
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Manage employee records, payroll, and leaves.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors flex items-center gap-2 dark:text-white">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create New
          </button>
        </div>
      </div>

      {activeTab === "overview" && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Total Active", value: "1,248", trend: "+12%", up: true },
              { label: "Pending Review", value: "42", trend: "-5%", up: false },
              { label: "Completed", value: "892", trend: "+18%", up: true },
              { label: "Alerts", value: "3", trend: "Needs attention", up: false, alert: true },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Briefcase className="w-16 h-16" />
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</p>
                <div className={`flex items-center text-sm font-medium ${stat.alert ? 'text-red-500' : stat.up ? 'text-emerald-500' : 'text-slate-500 dark:text-slate-400'}`}>
                  {!stat.alert && (stat.up ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />)}
                  {stat.trend}
                </div>
              </div>
            ))}
          </div>

          {/* Main Data Table Area */}
          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Records</h2>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search records..." 
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-zinc-800/40 border-b border-slate-200 dark:border-zinc-800">
                    <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">ID</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Details</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr key={item} className="hover:bg-slate-50 dark:hover:bg-zinc-800/40 transition-colors group">
                      <td className="p-4 text-sm font-medium text-slate-900 dark:text-slate-200">#REC-00{item}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                            {item}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">Sample Record {item}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Related to category {item}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${item % 2 === 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                          {item % 2 === 0 ? 'Active' : 'Pending'}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-slate-500 dark:text-slate-400">Oct {10 + item}, 2026</td>
                      <td className="p-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/20 text-center">
              <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">View All Records</button>
            </div>
          </div>
        </>
      )}

      {activeTab === "directory" && <EmployeeDirectory />}
      {activeTab === "my-leaves" && <MyLeaves />}
      {activeTab === "apply-leave" && <ApplyLeave />}
      {activeTab === "approvals" && <LeaveApprovals />}
      {activeTab === "process" && <ProcessPayroll />}
      {activeTab === "slips" && <MyPayslips />}

    </div>
  );
}

export default function HRMSDashboard() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading module...</div>}>
      <HRMSContent />
    </Suspense>
  )
}
