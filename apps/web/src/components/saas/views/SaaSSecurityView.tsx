"use client";

import React from "react";
import { ShieldCheck, Key, Lock, Network } from "lucide-react";

export default function SaaSSecurityView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Encryption At Rest */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
            <Key className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Transparent Data Encryption (TDE)</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Tenants flagged with "Extreme Security" have their isolated PostgreSQL databases encrypted at rest using AES-256. 
              The master keys are rotated every 30 days automatically by the AWS KMS cluster.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" /> KMS Integration Active
            </div>
          </div>
        </div>
      </div>

      {/* Network Isolation */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
            <Network className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">VPC & Network Isolation</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              All database connections are routed through a private Virtual Private Cloud (VPC). 
              Direct public internet access to the tenant databases is strictly prohibited by Security Groups.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" /> VPC Peering Enforced
            </div>
          </div>
        </div>
      </div>

      {/* Application Security */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
            <Lock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Row-Level Security (RLS)</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              For shared tables (like system-wide Audit Logs), PostgreSQL Row-Level Security policies ensure that queries automatically filter by `tenant_id`. 
              Application code cannot accidentally bypass this restriction.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" /> RLS Policies Active
            </div>
          </div>
        </div>
      </div>

      {/* Threat Monitoring Log */}
      <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden p-6 lg:col-span-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500" /> Active Threat Monitoring
        </h3>
        <div className="bg-zinc-950 rounded-xl p-4 font-mono text-xs overflow-y-auto max-h-48 border border-zinc-800 shadow-inner custom-scrollbar space-y-2">
          <div className="flex gap-4 items-start">
            <span className="text-zinc-500 w-24 shrink-0">10:42:05 UTC</span>
            <span className="text-rose-400 font-bold shrink-0">[BLOCKED]</span>
            <span className="text-zinc-300">SQL Injection attempt on t_101. IP: 192.168.1.45 (WAF Rule: 942100)</span>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-zinc-500 w-24 shrink-0">10:41:12 UTC</span>
            <span className="text-amber-400 font-bold shrink-0">[WARNING]</span>
            <span className="text-zinc-300">High rate of failed logins for tenant gia.erp.example.com. Rate limiting applied.</span>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-zinc-500 w-24 shrink-0">10:35:00 UTC</span>
            <span className="text-emerald-400 font-bold shrink-0">[SUCCESS]</span>
            <span className="text-zinc-300">Master KMS Key rotated for Extreme Security tenants.</span>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-zinc-500 w-24 shrink-0">10:30:11 UTC</span>
            <span className="text-blue-400 font-bold shrink-0">[INFO]</span>
            <span className="text-zinc-300">Database backup completed for all active tenants.</span>
          </div>
        </div>
      </div>

    </div>
  );
}
