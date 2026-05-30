"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Home Dashboard", path: "/", icon: "🏠" },
    { name: "Admissions", path: "/admissions", icon: "🎓" },
    { name: "Attendance", path: "/attendance", icon: "📅" },
    { name: "Examinations", path: "/examinations", icon: "📝" },
    { name: "Fee Collection", path: "/fees", icon: "💰" },
    { name: "Hostel", path: "/hostel", icon: "🏨" },
    { name: "Leave", path: "/leave", icon: "🏖️" },
    { name: "Library", path: "/library", icon: "📚" },
    { name: "Payroll", path: "/payroll", icon: "💵" },
    { name: "Transport", path: "/transport", icon: "🚌" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-950 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">School ERP</h2>
          <p className="text-xs text-gray-500 mt-1">Enterprise Edition</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium" 
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-xl cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-medium dark:text-white">Admin User</p>
              <p className="text-xs text-gray-500">Sign Out</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between px-6 md:hidden">
            <h1 className="font-bold text-lg dark:text-white">School ERP</h1>
            <Link href="/" className="text-blue-600 font-medium bg-blue-50 px-4 py-2 rounded-lg">Home</Link>
        </header>
        
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
