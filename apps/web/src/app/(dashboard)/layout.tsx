"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

// Define the sub-menus for each module
const moduleMenus: Record<string, { title: string, id: string }[]> = {
  "/website": [
    { title: "Pages & Routing", id: "pages" },
    { title: "Theme & Appearance", id: "theme" },
    { title: "Media Library", id: "media" },
    { title: "Site Settings", id: "settings" },
  ],
  "/admissions": [
    { title: "Dashboard & Analytics", id: "dashboard" },
    { title: "Campaigns & Leads", id: "campaigns" },
    { title: "Enquiry Management", id: "enquiry" },
    { title: "Application Management", id: "applications" },
    { title: "Document Verification", id: "documents" },
    { title: "Entrance & Interviews", id: "assessments" },
    { title: "Merit Lists & Approvals", id: "approvals" },
    { title: "Fee Collection", id: "fees" },
    { title: "Enrollment & Allocation", id: "enrollment" },
    { title: "Reports & Configuration", id: "reports" },
  ],
  "/attendance": [
    { title: "My Attendance", id: "my" },
    { title: "Mark Attendance", id: "mark" },
    { title: "Reports", id: "reports" },
  ],
  "/examinations": [
    { title: "Upcoming Exams", id: "upcoming" },
    { title: "My Results & Grades", id: "results" },
    { title: "Download Admit Card", id: "admit" },
  ],
  "/fees": [
    { title: "Current Dues & Pay", id: "dues" },
    { title: "Payment History", id: "history" },
    { title: "Fee Structure", id: "structure" },
  ],
  "/hostel": [
    { title: "My Room", id: "my-room" },
    { title: "Apply for Hostel", id: "apply" },
    { title: "Complaints & Requests", id: "complaints" },
  ],
  "/leave": [
    { title: "My Leaves", id: "my" },
    { title: "Apply for Leave", id: "apply" },
    { title: "Pending Approvals", id: "approvals" },
  ],
  "/library": [
    { title: "My Borrowed Books", id: "borrowed" },
    { title: "Search Catalogue", id: "search" },
    { title: "Overdue Fines", id: "fines" },
  ],
  "/payroll": [
    { title: "My Payslips", id: "slips" },
    { title: "Process Payroll", id: "process" },
  ],
  "/transport": [
    { title: "My Bus Route", id: "my" },
    { title: "Live Tracking", id: "track" },
    { title: "Apply for Transport", id: "apply" },
  ]
};

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Determine current active module and its menus
  const activeModulePath = Object.keys(moduleMenus).find(path => pathname.startsWith(path)) || "";
  const currentMenus = activeModulePath ? moduleMenus[activeModulePath] : [];
  
  // Default to the first tab if no query param is present
  const currentTab = searchParams.get("tab") || (currentMenus.length > 0 ? currentMenus[0].id : "");

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      
      {/* Context-Aware Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col hidden md:flex shadow-sm">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-blue-600 dark:bg-blue-900/20 text-white">
          <h2 className="text-xl font-bold tracking-tight">My Institution</h2>
          <p className="text-blue-200 dark:text-blue-400 text-xs font-medium mt-1 uppercase tracking-wider">
            {activeModulePath.replace("/", "") || "Module"}
          </p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {currentMenus.length === 0 && (
            <p className="text-sm text-zinc-500 px-4 py-2">No menus available.</p>
          )}
          {currentMenus.map((menu) => {
            const isActive = currentTab === menu.id;
            return (
              <Link
                key={menu.id}
                href={`${activeModulePath}?tab=${menu.id}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold shadow-sm border border-blue-100 dark:border-blue-800/50" 
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 font-medium"
                }`}
              >
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />}
                {menu.title}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Sticky Top Header */}
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 shadow-sm z-20">
            <div className="flex items-center gap-4">
              <h1 className="font-bold text-lg text-zinc-900 dark:text-white capitalize hidden md:block">
                {activeModulePath.replace("/", "")}
              </h1>
              <h1 className="font-bold text-lg text-zinc-900 dark:text-white md:hidden">
                My Institution
              </h1>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Home Icon */}
              <Link href="/" className="flex items-center gap-2 text-zinc-600 hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400 transition-colors bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-3 py-2 rounded-lg font-medium text-sm">
                <span>🏠</span> Home
              </Link>

              <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-700 hidden sm:block"></div>

              {/* User Profile & Logout */}
              <div className="hidden sm:flex items-center gap-3 cursor-pointer group">
                <div className="text-right">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">Admin User</p>
                  <p className="text-xs text-red-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Logout</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md transform group-hover:scale-105 transition-transform">
                  A
                </div>
              </div>
            </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-black">
          {children}
        </main>
      </div>
    </div>
  );
}

// Wrap in Suspense because useSearchParams triggers de-opt warnings in Next.js if missing
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading Module...</div>}>
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  )
}
