"use client";
import React, { useEffect, useState } from "react";
import { getLeaveRequests, getLeaveBalances } from "../../../actions/hrms";
import { Calendar, Clock, CheckCircle2, XCircle } from "lucide-react";

export default function MyLeaves() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [balances, setBalances] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded for demo/test school user
  const employeeId = "test-emp-1"; 

  useEffect(() => {
    async function load() {
      const res = await getLeaveRequests();
      if (res.success) {
        // filter by employee id in a real app, here we just show all for demo
        setLeaves(res.leaves || []);
      }
      const balRes = await getLeaveBalances(employeeId, new Date().getFullYear());
      if (balRes.success) {
        setBalances(balRes.balances || []);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="p-8 animate-pulse flex space-x-4"><div className="flex-1 space-y-4 py-1"><div className="h-4 bg-slate-200 rounded w-3/4"></div></div></div>;

  return (
    <div className="space-y-6">
      {/* Balances */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {balances.length > 0 ? balances.map(b => (
          <div key={b.id} className="p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl">
            <h3 className="text-sm font-semibold text-slate-500 uppercase">{b.leaveType}</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold">{b.totalDays - b.usedDays}</span>
              <span className="text-slate-500">days left</span>
            </div>
            <div className="mt-4 w-full bg-slate-100 dark:bg-zinc-800 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(b.usedDays / b.totalDays) * 100}%` }}></div>
            </div>
          </div>
        )) : (
          <div className="col-span-3 p-6 text-center text-slate-500 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800">
            No leave balances found for current year.
          </div>
        )}
      </div>

      {/* History */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-zinc-800">
          <h2 className="text-lg font-bold">Leave History</h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-zinc-800/40 text-sm">
              <th className="p-4 font-semibold">Type</th>
              <th className="p-4 font-semibold">Duration</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Applied On</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-sm">
            {leaves.map(leave => (
              <tr key={leave.id}>
                <td className="p-4 font-medium">{leave.leaveType}</td>
                <td className="p-4">{new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max ${
                    leave.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
                    leave.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {leave.status === 'APPROVED' && <CheckCircle2 className="w-3 h-3" />}
                    {leave.status === 'REJECTED' && <XCircle className="w-3 h-3" />}
                    {leave.status === 'PENDING' && <Clock className="w-3 h-3" />}
                    {leave.status}
                  </span>
                </td>
                <td className="p-4 text-slate-500">{new Date(leave.appliedAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {leaves.length === 0 && (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">No leave requests found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
