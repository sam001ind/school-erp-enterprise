"use client";
import React, { useState } from "react";
import { applyLeave } from "../../../actions/hrms";

export default function ApplyLeave() {
  const [loading, setLoading] = useState(false);
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    
    const data = {
      employeeId: "test-emp-1", // hardcoded for demo
      leaveType: fd.get("leaveType") as string,
      startDate: new Date(fd.get("startDate") as string),
      endDate: new Date(fd.get("endDate") as string),
      reason: fd.get("reason") as string,
    };

    const res = await applyLeave(data);
    if (res.success) {
      alert("Leave applied successfully!");
      (e.target as HTMLFormElement).reset();
    } else {
      alert("Error: " + res.error);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 shadow-sm">
      <h2 className="text-xl font-bold mb-6">Apply for Leave</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Leave Type</label>
          <select name="leaveType" required className="w-full p-3 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500">
            <option value="SICK">Sick Leave</option>
            <option value="CASUAL">Casual Leave</option>
            <option value="ANNUAL">Annual Leave</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <input type="date" name="startDate" required className="w-full p-3 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">End Date</label>
            <input type="date" name="endDate" required className="w-full p-3 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Reason</label>
          <textarea name="reason" rows={4} required className="w-full p-3 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500"></textarea>
        </div>

        <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50">
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
