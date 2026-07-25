"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import UserDirectoryView from "@/components/users/views/UserDirectoryView";
import RoleManagementView from "@/components/users/views/RoleManagementView";
import AuditLogView from "@/components/users/views/AuditLogView";
import SecuritySettingsView from "@/components/users/views/SecuritySettingsView";

function UsersModuleContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "directory";

  let content;
  switch (tab) {
    case "directory":
      content = <UserDirectoryView />;
      break;
    case "roles":
      content = <RoleManagementView />;
      break;
    case "audit":
      content = <AuditLogView />;
      break;
    case "security":
      content = <SecuritySettingsView />;
      break;
    default:
      content = <UserDirectoryView />;
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 md:p-8 pt-6 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Management & RBAC</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage user accounts, system access, and configure custom roles.</p>
          </div>
        </div>
        {content}
      </div>
    </div>
  );
}

export default function UsersPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 dark:text-slate-400">Loading module...</div>}>
      <UsersModuleContent />
    </Suspense>
  );
}
