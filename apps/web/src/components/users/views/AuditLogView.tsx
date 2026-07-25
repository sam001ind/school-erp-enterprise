"use client";

import React from "react";
import { useUserManagement, AuditLog } from "@/lib/UserManagementContext";
import { Shield, Clock, ShieldAlert, CheckCircle2, XCircle } from "lucide-react";

export default function AuditLogView({ resourceFilter }: { resourceFilter?: string }) {
  const { auditLogs, users } = useUserManagement();

  const filteredLogs = resourceFilter 
    ? auditLogs.filter(log => log.resource.toLowerCase().includes(resourceFilter.toLowerCase()))
    : auditLogs;

  return (
    <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-800/30 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-500" /> {resourceFilter ? `${resourceFilter} Audit Logs` : 'System Audit Logs'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {resourceFilter ? `Monitor all actions within the ${resourceFilter} module.` : 'Monitor all administrative actions and system access.'}
          </p>
        </div>
        <button className="px-4 py-2 bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200 dark:border-zinc-800 dark:border-zinc-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800 transition-colors">
          Export Report
        </button>
      </div>
      
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 dark:bg-zinc-900/40 dark:bg-zinc-900">
              <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Timestamp</th>
              <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
              <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Action</th>
              <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Resource</th>
              <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">IP Address</th>
              <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 dark:divide-zinc-800 dark:divide-zinc-800">
            {filteredLogs.map(log => {
              const user = users.find(u => u.id === log.userId);
              return (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/40 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="p-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {log.timestamp.toLocaleString()}
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-900 dark:text-white">
                    {user ? user.name : <span className="text-rose-500 font-bold">System / Unknown</span>}
                  </td>
                  <td className="p-4 text-sm text-slate-700 dark:text-slate-300">
                    {log.action}
                  </td>
                  <td className="p-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="px-2 py-1 bg-slate-100 dark:bg-zinc-800 rounded-md text-xs font-medium">
                      {log.resource}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-500 dark:text-slate-400 font-mono text-xs">
                    {log.ip}
                  </td>
                  <td className="p-4">
                    {log.status === 'Success' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Success
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                        <XCircle className="w-3.5 h-3.5" /> Failed
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
