"use client";
import React, { useEffect, useState } from "react";
import { getLeaveRequests, approveLeave } from "../../../actions/hrms";
import { Check, X, Clock } from "lucide-react";

export default function LeaveApprovals() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await getLeaveRequests();
    if (res.success) {
      setLeaves(res.leaves || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleStatus(id: string, status: "APPROVED" | "REJECTED") {
    const comments = prompt("Enter comments (optional):") || "";
    const res = await approveLeave(id, status, comments);
    if (res.success) {
      alert(`Leave ${status.toLowerCase()}!`);
      load();
    } else {
      alert("Error: " + res.error);
    }
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-zinc-800 flex justify-between items-center">
        <h2 className="text-lg font-bold">Pending Leave Approvals</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-zinc-800/40 text-sm">
              <th className="p-4 font-semibold">Employee</th>
              <th className="p-4 font-semibold">Type</th>
              <th className="p-4 font-semibold">Duration</th>
              <th className="p-4 font-semibold">Reason</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-sm">
            {leaves.map(leave => (
              <tr key={leave.id}>
                <td className="p-4">
                  <p className="font-bold">{leave.employee?.user?.name || 'Unknown'}</p>
                  <p className="text-xs text-slate-500">{leave.employeeId}</p>
                </td>
                <td className="p-4 font-medium">{leave.leaveType}</td>
                <td className="p-4">{new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</td>
                <td className="p-4 max-w-xs truncate" title={leave.reason}>{leave.reason}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    leave.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
                    leave.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {leave.status}
                  </span>
                </td>
                <td className="p-4 text-right flex justify-end gap-2">
                  {leave.status === 'PENDING' ? (
                    <>
                      <button onClick={() => handleStatus(leave.id, 'APPROVED')} className="p-2 bg-emerald-100 text-emerald-600 hover:bg-emerald-200 rounded-xl transition-colors">
                        <Check className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleStatus(leave.id, 'REJECTED')} className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-xl transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-slate-500">Processed</span>
                  )}
                </td>
              </tr>
            ))}
            {leaves.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-slate-500">No leaves to show.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
