"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSaaS } from "@/lib/SaaSContext";
import { Server, ShieldCheck, Activity, Trash2, Globe, Database, Search, MoreVertical, PauseCircle, PlayCircle, Settings, ExternalLink, X } from "lucide-react";
import { updateTenant } from "@/app/actions/tenant";
import { LogoUploader } from "@/components/LogoUploader";

export default function TenantListView() {
  const { tenants, removeTenant, updateTenantStatus, updateTenantDetails } = useSaaS();
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  
  const [editingTenant, setEditingTenant] = useState<{ id: string; name: string; domain: string; logoUrl: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden min-h-[400px]">
      <div className="p-6 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Server className="h-5 w-5 text-indigo-500" /> Active Tenants
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage isolated databases and school instances.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40">
              <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tenant Name</th>
              <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Plan & Domain</th>
              <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Security</th>
              <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Storage</th>
              <th className="p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
            {filteredTenants.map(tenant => (
              <tr key={tenant.id} className={`hover:bg-slate-50 dark:hover:bg-zinc-800/40 transition-colors group \${tenant.status === 'Suspended' ? 'opacity-50 grayscale' : ''}`}>
                <td className="p-4 text-sm font-medium text-slate-900 dark:text-white">
                  <div className="flex flex-col">
                    <span>{tenant.name}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 dark:text-slate-500 font-mono mt-0.5">{tenant.id}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex flex-col gap-1.5 items-start">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm \${tenant.planType === 'Enterprise' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : tenant.planType === 'Pro' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-slate-300'}`}>
                      {tenant.planType || 'Free'}
                    </span>
                    <span className="flex items-center gap-1.5 w-fit">
                      <Globe className="w-3.5 h-3.5 text-slate-400" /> {tenant.domain}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  {tenant.status === 'Suspended' ? (
                     <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800">
                      <PauseCircle className="w-3.5 h-3.5" /> Suspended
                    </span>
                  ) : tenant.databaseStatus === 'Active' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      <Database className="w-3.5 h-3.5" /> Active
                    </span>
                  ) : tenant.databaseStatus === 'Provisioning' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                      <Activity className="w-3.5 h-3.5 animate-spin" /> Provisioning...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                      <Server className="w-3.5 h-3.5" /> {tenant.databaseStatus}
                    </span>
                  )}
                </td>
                <td className="p-4">
                  {tenant.securityLevel === 'Extreme' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                      <ShieldCheck className="w-3.5 h-3.5" /> Extreme
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-800">
                      <ShieldCheck className="w-3.5 h-3.5" /> Standard
                    </span>
                  )}
                </td>
                <td className="p-4 text-sm text-slate-500 dark:text-slate-400 font-mono">
                  {tenant.storageUsedGB.toFixed(1)} GB
                </td>
                <td className="p-4 text-right relative">
                  <button 
                    onClick={() => setOpenDropdownId(openDropdownId === tenant.id ? null : tenant.id)}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  
                  {openDropdownId === tenant.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownId(null)}></div>
                      <div className="absolute right-8 top-10 w-48 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-xl z-20 py-2 flex flex-col text-left">
                         <Link href="/" className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center gap-2">
                           <ExternalLink className="w-4 h-4" /> Open Dashboard
                         </Link>
                         <button 
                           onClick={() => {
                             setEditingTenant({ id: tenant.id, name: tenant.name, domain: tenant.domain, logoUrl: tenant.logoUrl || "" });
                             setOpenDropdownId(null);
                           }}
                           className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center gap-2"
                         >
                           <Settings className="w-4 h-4" /> Edit Configuration
                         </button>
                         <div className="h-px bg-slate-100 dark:bg-zinc-800 my-1"></div>
                         
                         {tenant.status === 'Suspended' ? (
                            <button 
                              onClick={() => { updateTenantStatus(tenant.id, tenant.databaseStatus, "Active"); setOpenDropdownId(null); }}
                              className="px-4 py-2 text-sm text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 flex items-center gap-2"
                            >
                              <PlayCircle className="w-4 h-4" /> Reactivate Tenant
                            </button>
                         ) : (
                            <button 
                              onClick={() => { updateTenantStatus(tenant.id, tenant.databaseStatus, "Suspended"); setOpenDropdownId(null); }}
                              className="px-4 py-2 text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 flex items-center gap-2"
                            >
                              <PauseCircle className="w-4 h-4" /> Suspend Tenant
                            </button>
                         )}

                         <button 
                           onClick={() => { removeTenant(tenant.id); setOpenDropdownId(null); }}
                           className="px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-2"
                         >
                           <Trash2 className="w-4 h-4" /> Terminate Instance
                         </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {filteredTenants.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500 dark:text-slate-400">
                  No active tenants found. Provision a new database to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editingTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !isSaving && setEditingTenant(null)}></div>
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl shadow-xl z-10 border border-slate-200 dark:border-zinc-800 flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Settings className="w-4 h-4" /> Edit Configuration
              </h3>
              <button onClick={() => !isSaving && setEditingTenant(null)} className="p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tenant Name</label>
                <input 
                  type="text" 
                  value={editingTenant.name} 
                  onChange={e => setEditingTenant({ ...editingTenant, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Domain</label>
                <input 
                  type="text" 
                  value={editingTenant.domain} 
                  onChange={e => setEditingTenant({ ...editingTenant, domain: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <LogoUploader 
                  tenantId={editingTenant.id} 
                  currentLogoUrl={editingTenant.logoUrl || null} 
                  onUploadSuccess={(url) => setEditingTenant({ ...editingTenant, logoUrl: url })}
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 dark:bg-zinc-800/50 border-t border-slate-100 dark:border-zinc-800 flex justify-end gap-3">
              <button 
                onClick={() => setEditingTenant(null)}
                disabled={isSaving}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-700 disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={async () => {
                  setIsSaving(true);
                  const res = await updateTenant(editingTenant.id, {
                    name: editingTenant.name,
                    domain: editingTenant.domain,
                    logoUrl: editingTenant.logoUrl
                  });
                  
                  if (res.success) {
                    updateTenantDetails(editingTenant.id, {
                      name: editingTenant.name,
                      domain: editingTenant.domain,
                      logoUrl: editingTenant.logoUrl
                    });
                    setEditingTenant(null);
                  } else {
                    alert("Failed to update tenant: " + (res.error || "Unknown error"));
                  }
                  setIsSaving(false);
                }}
                disabled={isSaving}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
