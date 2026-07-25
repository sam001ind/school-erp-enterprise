"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search, Filter, ArrowUpRight, Clock, User, Globe, Layout, Palette, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { getWebsiteAuditLogs } from "@/actions/audit";

export default function WebsiteAuditLogView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLogs = useCallback(async () => {
    setIsLoading(true);
    const result = await getWebsiteAuditLogs();
    if (result.success && result.logs) {
      setAuditLogs(result.logs);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const filteredLogs = auditLogs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (type: string) => {
    switch(type) {
      case 'page': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'theme': return <Palette className="w-4 h-4 text-purple-500" />;
      case 'component': return <Layout className="w-4 h-4 text-amber-500" />;
      case 'config': return <Globe className="w-4 h-4 text-indigo-500" />;
      default: return <FileText className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'success': 
        return <span className="flex items-center gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded text-xs font-bold"><CheckCircle2 className="w-3 h-3"/> Success</span>;
      case 'warning':
        return <span className="flex items-center gap-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded text-xs font-bold"><AlertCircle className="w-3 h-3"/> Warning</span>;
      case 'error':
        return <span className="flex items-center gap-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-2 py-0.5 rounded text-xs font-bold"><AlertCircle className="w-3 h-3"/> Failed</span>;
      default:
        return <span className="flex items-center gap-1 bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400 px-2 py-0.5 rounded text-xs font-bold">{status}</span>;
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' 
    }).format(d);
  };

  return (
    <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden animate-in fade-in duration-500">
      
      {/* Header & Controls */}
      <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold dark:text-white text-zinc-900">Website Audit Logs</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Track all modifications, publishes, and configuration changes to your public site.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search logs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 transition-all"
            />
          </div>
          <button className="p-2 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-300">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Log List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-200 dark:border-zinc-800">
              <th className="py-3 px-6 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Event</th>
              <th className="py-3 px-6 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Resource</th>
              <th className="py-3 px-6 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">User</th>
              <th className="py-3 px-6 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Time</th>
              <th className="py-3 px-6 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-zinc-500">
                  <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                  Loading logs...
                </td>
              </tr>
            ) : filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      {getIcon(log.resourceType)}
                    </div>
                    <span className="font-bold text-sm text-zinc-900 dark:text-white">{log.action}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                    {log.resource}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <User className="w-3 h-3" />
                    {log.user}
                  </div>
                </td>
                <td className="py-4 px-6">
                  {getStatusBadge(log.status)}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500">
                    <Clock className="w-3 h-3" />
                    {formatDate(log.timestamp)}
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  {log.details && (
                    <button 
                      className="p-1.5 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                      title={log.details}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            
            {!isLoading && filteredLogs.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-zinc-500">
                  No logs found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
