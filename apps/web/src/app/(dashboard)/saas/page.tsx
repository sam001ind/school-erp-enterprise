"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SaaSProvider, useSaaS } from "@/lib/SaaSContext";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

import TenantListView from "@/components/saas/views/TenantListView";
import ProvisioningWizard from "@/components/saas/views/ProvisioningWizard";
import SaaSSecurityView from "@/components/saas/views/SaaSSecurityView";

function SaaSDashboardView() {
  const { globalMetrics, tenants } = useSaaS();
  const activeTenants = tenants.filter(t => t.databaseStatus === 'Active').length;
  const totalStorage = tenants.reduce((acc, t) => acc + t.storageUsedGB, 0).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Tenants</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{activeTenants}</p>
          <p className="text-xs text-emerald-500 mt-2 font-medium">+{tenants.length - activeTenants} pending provisioning</p>
        </div>
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Storage Provisioned</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{totalStorage} TB</p>
          <p className="text-xs text-amber-500 mt-2 font-medium">78% of cluster capacity</p>
        </div>
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">MRR (Monthly)</p>
          <p className="text-3xl font-bold text-emerald-500 mt-2">$34,200</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">+15.9% from last month</p>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-zinc-800 p-6 shadow-sm h-80">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Revenue Growth (MRR)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={globalMetrics.mrrHistory}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-zinc-800 p-6 shadow-sm h-80">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Database Cluster Load (Global)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={globalMetrics.serverLoad}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} tickFormatter={(value) => `${value}%`} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="load" stroke="#6366f1" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <TenantListView />
    </div>
  );
}

function SaaSModuleContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  let content;
  switch (tab) {
    case "dashboard":
      content = <SaaSDashboardView />;
      break;
    case "tenants":
      content = <TenantListView />;
      break;
    case "provisioning":
      content = <ProvisioningWizard />;
      break;
    case "security":
      content = <SaaSSecurityView />;
      break;
    default:
      content = <SaaSDashboardView />;
  }

  return (
    <div className="flex-1 overflow-y-auto relative">
      {/* SaaS Admin specific gradient background */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[50%] rounded-full bg-slate-900/20 dark:bg-slate-500/10 blur-3xl opacity-30 pointer-events-none" />
      
      <div className="p-6 md:p-8 pt-6 max-w-[1600px] mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">SaaS Control Panel</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Super Admin Dashboard for Multi-Tenant Database Provisioning.</p>
          </div>
        </div>
        {content}
      </div>
    </div>
  );
}

export default function SaaSPage() {
  return (
    <SaaSProvider>
      <Suspense fallback={<div className="p-8 text-center text-slate-500 dark:text-slate-400">Loading SaaS Module...</div>}>
        <SaaSModuleContent />
      </Suspense>
    </SaaSProvider>
  );
}
