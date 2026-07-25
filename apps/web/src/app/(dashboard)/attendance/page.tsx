"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AttendanceProvider } from "@/lib/AttendanceContext";
import MyAttendanceView from "@/components/attendance/views/MyAttendanceView";
import MarkAttendanceView from "@/components/attendance/views/MarkAttendanceView";
import ReportsView from "@/components/attendance/views/ReportsView";
import AuditLogView from "@/components/users/views/AuditLogView";

function AttendanceModuleContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "my";

  let content;
  switch (tab) {
    case "my":
      content = <MyAttendanceView />;
      break;
    case "mark":
      content = <MarkAttendanceView />;
      break;
    case "reports":
      content = <ReportsView />;
      break;
    case "audit":
      content = <AuditLogView resourceFilter="Attendance" />;
      break;
    default:
      content = <MyAttendanceView />;
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 md:p-8 pt-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Attendance Module</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage check-ins, leaves, and biometric logs.</p>
          </div>
        </div>
        {content}
      </div>
    </div>
  );
}

export default function AttendancePage() {
  return (
    <AttendanceProvider>
      <Suspense fallback={<div className="p-8 text-center text-slate-500 dark:text-slate-400">Loading module...</div>}>
        <AttendanceModuleContent />
      </Suspense>
    </AttendanceProvider>
  );
}
